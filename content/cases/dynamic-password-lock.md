---
title: "Offline ATM Security Lock with Dynamic Password Authentication"
date: 2026-06-06
categories: ["Case Studies"]
tags: ["Cryptography", "Embedded Systems", "AES", "PSK", "HMAC", "ECDH", "ATM Security", "Offline Authentication", "Hash Chain", "HID", "STM32"]
description: "Design and implementation of an offline ATM security lock using dynamic passwords, chained state transitions, embedded cryptography, and host-device integration under tight hardware constraints."
---

# Offline ATM Security Lock with Dynamic Password Authentication

## Project Overview

I designed and implemented the security and communication layer for an electronic lock used in ATM maintenance and controlled access workflows.

The system had to work in environments where continuous network access could not be assumed. In normal operation, the lock needed to generate and verify short-lived dynamic passwords. In initialization and maintenance flows, it also had to support secure host-device communication, device onboarding, and controlled key exchange.

The main constraint was that this was not a server-side security problem. The device ran on resource-limited embedded hardware, and the host side had to integrate with multiple languages and legacy transport layers. The design had to be secure, fast enough for operators, and stable enough to survive real hardware disconnects and message-ordering problems.

My role covered the cryptographic design, the host-device protocol, the embedded implementation, and the troubleshooting of the integration layer.

## Technical Challenges

The hardest problem was building a password flow that remained safe even when the device was offline. A simple time-based one-time password was not enough, because a captured code could still be replayed during its validity window. The unlock process had to depend on the previous successful state so that each step became part of a chained authentication flow rather than a standalone code check.

The second challenge was cryptographic performance on embedded hardware. The target platform was constrained enough that algorithm choice mattered. I needed security primitives that were strong enough for the use case, but still efficient on low-memory, low-CPU devices. That included hash-based authentication, symmetric encryption for protected data, and elliptic-curve key exchange where secure initialization was required.

The third challenge was host-device reliability. The lock was not a single monolithic application. It involved C++ DLLs, HID communication, Python tooling, Java and C# wrappers, and multi-threaded request handling. In that environment, transport bugs, thread timing, and message ordering are part of the security problem, because an unstable integration layer can break a correct authentication design.

The fourth challenge was throughput. The system had to stay responsive for real operators, which meant reducing packet count, cutting transport overhead, and tightening the critical path from request to unlock response.

## My Contributions

I defined the architecture for the lock’s authentication flow and made the unlock process stateful by design. Each password depended on the prior close state, which made replay attacks much harder and prevented the system from treating old packets as valid independent inputs.

I selected and validated the cryptographic building blocks for the platform. The implementation used a mix of hash-based authentication, pre-shared-key flows, symmetric encryption, and elliptic-curve key exchange. Where the deployment required local cryptographic variants, I adapted the design so that the security model stayed consistent without overloading the embedded target.

I implemented the host-side algorithm layer in C++ and exposed it through DLL boundaries for other applications to consume. That included wrapper and interop work for Java, C#, and Python, plus the message-formatting logic needed for the ATMC and lock-control workflows.

I also worked on communication and serialization optimizations. In the ATMC path, I reduced the number of HID packets needed for a request, trimmed unnecessary round trips, and reorganized the threading model so that the UI and transport layer did not block each other. When message ordering or timeout behavior caused the lock to appear unstable, I traced the issue through the transport layer and fixed the actual state handling rather than masking the symptom.

I treated troubleshooting as part of the security work. A lock that behaves correctly only in the lab is not production-ready. I debugged disconnects, delayed responses, packet ordering issues, and wrapper-level crashes until the end-to-end workflow was stable enough for real use.

## Results

The project produced a working offline authentication design for ATM-style physical access control.

Key outcomes:

- the unlock flow moved from a simple code check to a chained state-based authentication model
- replay and clone resistance improved because each step depended on prior successful state
- the embedded design stayed practical on constrained hardware
- host-device integration became stable enough to support real maintenance workflows
- the transport path became faster and less fragile under multi-threaded use

Measured improvements from the implementation work included:

- lock communication time reduced from roughly 10-16 seconds to 2-3 seconds in one ATMC integration path
- a delayed report flow improved from about 6.1 seconds to 0.9 seconds
- HID packet latency reduced from about 1.6 ms to roughly 1.0-1.1 ms per packet
- one request path was reduced from 11 HID packets to 3 packets after serialization and flow tuning
- elliptic-curve initialization on ARM-class hardware was optimized to about 0.75 seconds with roughly 10 KB of memory use in the embedded path

## Technologies

- C++
- Embedded ARM / STM32-class hardware
- Offline authentication
- Dynamic password / OTP-style flows
- Hash chaining
- Pre-shared keys (PSK)
- AES
- HMAC
- Elliptic-curve key exchange (ECDH)
- HID device communication
- DLL integration
- Python
- Java
- C#
- Protobuf
- ZeroMQ
- TCP/IP
- Boost
- SWIG
- MIRACL
- Local hash and block-cipher variants used in the deployment (for example, SM3 / SM4)
