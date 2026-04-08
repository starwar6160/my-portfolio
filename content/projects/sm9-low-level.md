---
title: "Hand-rolling SM9 (IBC) Cryptography for 8KB RAM Environments"
date: 2026-04-01
tags: ["Cryptography", "C", "Embedded", "SM9", "Optimization"]
description: "A technical deep dive into the 2013-2014 implementation of Identity-Based Cryptography (SM9) on resource-constrained microcontrollers, achieving bank-grade security under 10KB of peak memory."
---

## The Challenge: The "Terror" of IBC on Bare Metal

In 2013, implementing the **SM9 (Identity-Based Cryptography)** standard on an **ARM Cortex-M3 (STM32F2)** was considered a "mission impossible" by many. Unlike standard ECC, SM9 requires **Pairing-friendly curves**, which involve massive field expansions (mapping 256-bit coordinates to 1536-bit structures).

Standard cryptographic libraries (OpenSSL, MIRACL) were designed for servers, not for embedded systems where every byte of RAM is a precious resource. My task was to take a "bloated" implementation and squeeze it into the **<8KB RAM** constraints required for a secure USBKey and an **Offline ATM Dynamic Lock** system.

---

## 1. Surgical Architecture: Erasing the "Metadata Bloat"

The first discovery during my 2013 audit was that 70% of the memory footprint wasn't the algorithm—it was the **infrastructure**.
*   **ASN.1 Encoding/Decoding**: A massive consumer of heap space.
*   **OpenSSL Dependency**: Thousands of lines of code intended for X.509 certificates that had no place on a microcontroller.

### The Strategy: "Pure Algorithm" Extraction
I led the effort to strip the implementation down to its **Bare-Metal C primitives**. We switched from complex ASN.1 to **Protobuf** and eventually to static, fixed-size structures. This eliminated the risk of "Memory Drift" and reduced the heap footprint by over 60%.

---

## 2. Memory Mastery: The `mralloc.c` Breakthrough

To achieve the 8KB limit, we couldn't rely on the standard `malloc`. I modified the underlying MIRACL memory allocator (`mralloc.c`) to include strict statistical tracking of peak heap usage.

```c
/* 
 * Snippet from my 2014 8KB RAM Optimization Work 
 * Aim: Capping peak memory for ECDH/SM9 key exchange
 */
static size_t peak_memory_usage = 0;
static size_t current_usage = 0;

void* mr_alloc(size_t size) {
    current_usage += size;
    if (current_usage > peak_memory_usage) {
        peak_memory_usage = current_usage;
    }
    // Strict enforcement for resource-constrained targets
    if (peak_memory_usage > MAX_RAM_BUDGET_BYTES) {
        log_critical("Memory violation! Budget exceeded: %zu", peak_memory_usage);
        return NULL; 
    }
    return standard_malloc(size);
}
```

**Result**: Through exhaustive refinement, we reached a peak allocation of **9,300 bytes** for the full ECDH stack, proving that a "Scientist" with a surgical focus on memory can outperform generic libraries.

---

## 3. Hardware-Anchored Determinism

A cryptographic algorithm is only as strong as its **Entropy**. On standard hardware, software-based random number generators (PRNGs) are predictable. 

I architected the transition to **Hardware-Anchored Security**:
1.  **TRNG Integration**: Rewrote the core random sequence generator to pull directly from the **True Random Number Generator (TRNG)** of the secure chip (FMCOS) and hardware encryption cards (漁翁).
2.  **Kernel-Level Drivers**: Implemented the JNI and Linux drivers to bridge the "Silicon Truth" to the user-space SM9 library.

---

## 4. The "Dirty Hands" Proof

While others discuss architecture on whiteboards, I spent 2014 in the lab solving **Coordinate Transformation** issues. For SM9, the 6x field expansion meant that a single point on the curve represented a significant memory block. 

I manually optimized the **Jacobian Coordinates** math to minimize temporary objects, ensuring that intermediate calculations stayed within the L1/L3 cache bounds of the high-end targets or the tight RAM of the low-end ones.

```text
[ High-Level Crypto Lib ]  ⮕  [ Memory Bloat (ASN.1, Heap Fragmentation) ]
           │
           ▼  Surgical Removal (2014 Audit)
           │
[ Hand-Rolled C Algorithm ] ⮕  [ 9,300 Bytes Static Heap (mralloc.c) ]
           │
           ▼  Direct Hardware Hook
           │
[ STM32F2 (Cortex-M3) ] ⮕  [ Hardware TRNG ] ⮕ [ Bank-Grade Robustness ]
```

---

## Conclusion: The Architect as a Scientist

This project redefined the **Atm Lock System** for China Construction Bank (CCB) and others. It proved that in high-stakes security, the difference between a "Bricklayer" and a "Scientist" is the ability to write code that respects the laws of the physical hardware.

*Looking for a Principal Architect who understands every bit of your protocol's memory? Let's talk.*
