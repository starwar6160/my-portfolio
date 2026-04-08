---
title: "USB HID Protocols: Solving the 'Sacrificial Byte' & F&R Challenges"
date: 2026-03-27
description: "Designing a custom fragmentation protocol for USB HID and debugging low-level Windows driver quirks that 'swallowed' critical data bytes."
categories: ["Tech Projects"]
tags: ["C", "Embedded", "USB", "HID", "Protocol Design", "Reverse Engineering"]
---

# USB HID Protocol Engineering: Beyond the 64-Byte Barrier

When designing secure communication for encrypted hardware (such as electronic smart locks), the physical layer often imposes rigid constraints that conflict with modern data formats (JSON/XML). This project involved architecting a custom **Fragmentation & Reassembly (F&R)** protocol for USB HID and resolving a high-stakes "Ghost Byte" bug in the OS driver stack.

## 1. Fragmentation & Reassembly (F&R) Design

USB HID is physically limited to **64-byte packets** (Reports). To transmit complex payloads (700B+ security manifests), I designed a private application-layer protocol:

- **The 6-Byte Control Header**:
  - `Total Length` (16-bit): The total size of the logical message.
  - `Current Offset` (16-bit): Position of the fragment in the global reconstruction buffer.
  - `Block Index` (16-bit): Sequence number for arrival verification.
- **The 58-Byte Payload**: Each frame delivers a maximum of 58 bytes of actual data, ensuring 100% deterministic assembly.

### Architecture Evolution
Originally limited to 8 blocks, I scaled the reassembly buffer to **12 blocks** and introduced **Session Handles** to isolate concurrent data packets in multi-threaded environments, preventing race conditions during high-concurrency stress tests.

---

## 2. The "Sacrificial Byte" Hack: Fighting Windows Drivers

During integration testing with a major state-owned infrastructure enterprise, we encountered a "Missing Byte" phenomenon: when the host sent a 6-byte header, the MCU firmware consistently saw only 5 bytes.

### The Root Cause
A deep-dive investigation into the Windows HID driver stack revealed a hidden behavior: the OS interprets the **0th byte** of a control transfer as a **Report ID**. Since our custom firmware did not explicitly define a Report ID, the driver "swallowed" the first byte of our header.

### The Solution: The 65-Byte Buffer
Instead of refactoring the frozen hardware firmware, I implemented a surgical "Sacrificial Byte" hack on the host side:
1. Expanded the host transmission buffer from 64 to **65 bytes**.
2. Placed a `0x00` dummy byte at **Offset 0**.
3. The Windows driver "consumed" the `0x00` byte as a Report ID, leaving the actual 64-byte protocol structure (starting at Offset 1) to pass through to the hardware perfectly aligned.

---

## 3. The "Ghost of 127 Bytes": ASN.1 Encoding Overflow

In a separate but related incident involving 14MB hex dumps from a legacy banking terminal, I isolated a "Ghost" bug causing intermittent authentication failures.

Through binary reversing of the protocol stack, I identified an **ASN.1 Length Field Overflow** at the 127-byte boundary. In BER/DER encoding, lengths > 127 require a multi-byte format. The legacy middleware was improperly truncating the length bit, causing systematic decryption failures for any payload larger than a single-byte length prefix.

I implemented a **Custom Protocol Validator** within our middleware to intercept and normalize these malformed ASN.1 structures before they reached the core logic, stabilizing the system without requiring an expensive rewrite of the bank's legacy host software.

---

## Key Outcomes

- **100% Data Integrity**: Achieved zero packet loss across the OS-Hardware boundary for 700B+ secure commands.
- **Legacy Stabilization**: Resolved a decade-old "intermittent" failure in a national bank's terminal by identifying the 127-byte boundary condition.
- **Engineering ROI**: Avoided massive hardware recall/firmware updates by implementing host-side buffer hacks and middleware validators.

---

> [!TIP]
> **Architectural Insight**: In low-level engineering, the "truth" is often hidden in the drivers, not the code. When the hardware and software disagree, the architect must become a digital archaeologist.
