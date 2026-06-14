---
title: "OneKey Hardware Wallet Firmware Audit"
date: 2026-06-14
categories: ["Case Studies", "Security"]
tags: ["Cyber Security", "Firmware", "Hardware Wallet", "Forensics", "Reverse Engineering", "Supply Chain"]
description: "Originally published on Medium and later featured in CoinsBench, this audit examines a mainstream hardware wallet firmware through the lens of build-chain determinism, state-machine isolation, entropy validation, and boundary safety."
---

# OneKey Hardware Wallet Firmware Audit

## Publication Lineage

- Originally published on Medium
- Featured in CoinsBench
- Technical audit / anonymized security review

## Executive Summary

This audit examines a mainstream hardware wallet firmware through an engineering lens rather than a marketing lens.

The core issue was not a single bug. It was the accumulation of weak boundaries across the build chain, the secure-element boundary, entropy handling, and path-validation logic.

For teams building hardware wallets or security-sensitive firmware, the lesson is simple: if trust is not deterministic at every layer, the device is not actually a security boundary.

## Why This Case Matters

Hardware wallets are supposed to be the last line of defense for user sovereignty.

In practice, that guarantee depends on four things:

- reproducible builds
- non-bypassable state transitions
- entropy validation, not blind trust
- strict boundary checks between protocol and memory models

This audit shows how a product can look secure at the product layer while still carrying architectural risk underneath.

## 1. Build Chain Crisis

The first issue was determinism.

The build chain had to be trustworthy enough that the shipped firmware could be traced back to source code without ambiguity. Hidden repository structure, asynchronous release propagation, and opaque supply-chain behavior all weaken verifiability.

The engineering requirement is straightforward:

- one source of truth
- reproducible binaries
- traceable release state
- no hidden path from source to device

## 2. State Machine Tearing

The second issue was the secure-element boundary.

In a healthy design, the secure element enforces policy and the main MCU cannot silently override it. In the audited architecture, the logical state of the MCU could undermine the isolation that the secure element was supposed to provide.

That kind of architecture turns a hardware security feature into a synchronization artifact.

## 3. Cryptographic Engineering Debt

The third issue was entropy handling.

Validating only the size of returned random data is not enough. Security-critical firmware must also validate that entropy is actually healthy.

The audit also surfaced legacy cryptographic patterns that should not survive in modern hardware-wallet systems, including weak boundary assumptions and storage-layer weaknesses that can leak structure even when data appears encrypted.

## 4. Boundary Mismatch

The fourth issue was the mismatch between protocol depth and memory layout.

If a parser accepts deeper derivation paths than the underlying C structure can safely hold, then the system is vulnerable to out-of-bounds behavior.

That is not a language problem. It is a contract problem.

## Selected Findings

- build-chain determinism was weaker than the security story implied
- secure-element state could be subordinated to MCU logic
- entropy handling lacked health validation
- path-depth and buffer-size assumptions were inconsistent
- boundary checks were too dependent on upstream behavior

## Practical Takeaway

For hardware wallets, security is not a single feature.

It is the combination of reproducible builds, deterministic policy enforcement, validated entropy, and memory-safe contracts across every layer.

## Links

- Original Medium publication: https://medium.com/coinsbench/the-deconstruction-of-trust-architectural-boundary-mismatch-in-hybrid-firmware-environments-8dc5a1506d32
- CoinsBench feature: https://coinsbench.com/the-deconstruction-of-trust-an-architectural-audit-of-modern-hardware-wallet-firmware-9923115d97fd

