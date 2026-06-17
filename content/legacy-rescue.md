---
title: "Wei ZHOU — VC++ Legacy Rescue Portfolio 2026"
date: 2026-06-17
description: "Legacy Systems Rescue & Modernization | VC++ / WinCE / Qt | Embedded Security & Platform Migration — 20-year compiler gap bridged, 125 environments reverse-engineered, $15.4M recall cost avoided"
layout: "simple"
categories: ["Resume"]
tags: ["Visual C++", "Legacy Systems", "WinCE", "Embedded Security", "Platform Migration", "Reverse Engineering"]
---

# Wei ZHOU

**Legacy Systems Rescue & Modernization | VC++ / WinCE / Qt | Embedded Security & Platform Migration**

<a href="https://r2.st6160.click/617HUPX_Large.jpg" target="_blank">
  <img src="https://r2.st6160.click/617HUPX_Large.jpg" alt="HP-UX Legacy System Archaeology — Platform Discovery & Migration" style="max-width:100%; border-radius:12px; box-shadow:0 4px 16px rgba(0,0,0,0.15);">
</a>

Location: Yokohama, Japan
Work authorization: Engineer/Specialist in Humanities/International Services (through Apr 2028)

**Representative outcomes:** 20-year compiler gap bridged · 125 environments reverse-engineered · 61 interfaces mapped · $15.4M recall cost avoided · 94% memory reduction · 6.8x ATM communication acceleration

## Executive Summary

20+ years recovering, bridging, and modernizing legacy systems that others consider unapproachable — from 20-year undocumented HP-UX trading platforms to 12KB SRAM cryptographic devices.

This is not a skills-based portfolio. It is about **system discovery, build chain recovery, cross-language interop, and embedded security engineering**, demonstrated through:

- **Platform Discovery**: 125 environments, 61 interfaces reverse-engineered from a 20-year HP-UX FX trading system — no docs, no team, just code and operational artifacts
- **Build Chain Recovery**: 20-year compiler gap bridged (VC6 1998 → VS2015) through symbol-level linker surgery without a rewrite
- **Cross-Language Interop**: 5-mechanism boundary enforcement producing a zero-dep DLL with proven zero-deadlock operation under sustained load
- **Embedded Security**: OpenSSL + SM9 cryptographic stack ported to ARM WinCE; MIRACL compressed under 12KB SRAM constraints
- **Cost Impact**: $15.4M recall cost avoided, 82% payload reduction, 6.8x ATM communication acceleration

Rare combination of VC++, WinCE, ARM, cryptography, and platform modernization experience — a skillset that has become extremely scarce in the market.

## Relevance to Legacy Systems Rescue

| What I Deliver | Evidence From Source Material | Why It Matters to Your Team |
|---|---|---|
| Platform Discovery & Reverse Engineering | 125 environments, 61 interfaces reconstructed from 20-year undocumented HP-UX trading system | Can understand systems where docs are wrong, the team is gone, and code is the only source of truth |
| Build Chain Recovery & ABI Bridging | VC6→VS2015 linker hijack, symbol-level compatibility bridging a 20-year compiler gap | Can extend legacy system life and inject modern capabilities without expensive rewrites |
| Cross-Language Interop Hardening | C++/C#/Java 5-mechanism boundary, zero-dep DLL, zero-deadlock under sustained load | Bridges legacy C++ with modern managed code without fragile wrapper layers |
| Industrial Legacy Modernization | Qt 4.7/VS2003 SCADA: 30K→100K points, GDI crash elimination, build chain recovery | Modernizes long-running industrial systems without destabilizing production |
| Embedded Security Engineering | SM9 on WinCE ARM, MIRACL under 12KB SRAM constraints, $15.4M recall avoided via crypto proxy | Cryptography under extreme hardware constraints; compliance-driven rescue engineering |
| Platform Migration & Risk Reduction | HP-UX→RHEL, 125 envs automated, undocumented DR dependencies discovered pre-execution | De-risks migration through evidence-based discovery before committing resources |

## Selected Experience

### 1. Mission-Critical FX Platform Archaeology & Migration

- Supported migration of a 20-year foreign-exchange trading platform from HP-UX/Itanium to RHEL for SMBC, where documentation no longer matched operational reality.
- Reconstructed actual production behavior from Shell scripts, binaries, and operational procedures — operating with only grep, vi, and shell utilities in a restricted banking environment.
- Reverse-engineered DR switching, mapped 61 external interfaces (SWIFT, HULFT, MQ, OBS, SFTP, SSH), and reworked scripts into parameter-driven Bash automation for 125 environments.
- Developed Java/Spring Batch validation tool for automated comparison of millions of records across database instances.
- Result: 70-90 server platform mapped, ~9TB Oracle + 4.1TB file data catalogued, 125 environments automated, undocumented dependencies discovered before migration execution.

### 2. VC6 Linker Surgery: Cross-Temporal ABI Compatibility

- Solved LNK2005 symbol collisions in legacy banking infrastructure mixing VC6 (1998) and VS2015 runtimes, where standard approaches failed.
- Implemented symbol hijacking: explicitly ignored `MSVCRT.LIB` and `LIBCMT.LIB` during final link, manually re-linking required symbols.
- Reduced delivery footprint by 82%, producing a micro-DLL encapsulating modern security logic.
- Binary-searched version history to isolate an invisible deadlock in Version 391 (global `send_mutex`), fixed with a thread-affinity queue.
- Result: cross-temporal compatibility bridging a 20-year compiler gap, stabilizing a national banking terminal network.

### 3. Engineering the Unbreakable Bridge: Hardening Cross-Language Interfaces

- Designed five hardened mechanisms for C++/C#/Java interop across DLL boundaries: (1) type reduction to C primitives, (2) calling convention enforcement via .DEF file pinning, (3) forced explicit lifecycle management eliminating GC finalization deadlocks, (4) catch-all exception bulkheading at every DLL boundary, (5) SWIG typemaps for binary-safe crypto payload transport.
- Delivered a single zero-dep DLL loaded in IE6, VC6 address space, and OCX containers with zero external dependencies.
- Debugged `time_t` bit-width mismatch causing 30-year timestamp rollback across JNI boundary.
- Result: port deadlock eliminated; zero crashes under sustained authentication load. Device Open: 10ms, Authentication: 70ms.

### 4. Stabilizing Legacy Industrial SCADA Platform (Qt 4.7 / VS2003)

- Recovered a broken Qt 4.7.3 / Visual Studio 2003 build chain for a power/wind energy SCADA platform, repairing MOC, QMake, and linker compatibility issues.
- Investigated Windows GDI handle exhaustion causing production crashes under long-running operation, correlated with Qt repaint lifecycle.
- Refactored the visualization layer from ~30,000 points to ~100,000 points using Python/PyQt/embedded browser rendering.
- Result: 3x improvement in plotting capacity, reduced crash risk, build chain recoverable for repeatable production fixes.

### 5. Offline ATM Security Lock with Dynamic Password Authentication

- Designed security and communication layer for an electronic lock used in ATM maintenance, operating in environments without continuous network access.
- Implemented chained state-based authentication using AES, HMAC, ECDH, and PSK flows on STM32-class embedded hardware.
- Built host-side C++ DLL exposed to Python, Java, and C# via SWIG wrappers and Protobuf serialization.
- HID packet optimization: one request path reduced from 11 packets to 3 packets.
- Result: lock communication time reduced to 2-3 seconds, delayed report flow improved 6.8x.

### 6. Legacy Security Hardening: 3DES/AES Rescue Layer

- Designed a cryptographic proxy/sidecar layer wrapping thousands of legacy terminal units using aging 3DES schemes that no longer met compliance standards.
- Dual-path encryption: legacy 3DES maintained for heartbeats/low-sensitivity telemetry; high-sensitivity control commands wrapped in AES-256 GCM.
- Key rotation governed by unique physical terminal IDs + centralized HSM, enabling phased zero-downtime migration.
- Result: $15.4M estimated savings from avoided hardware recall, evidence durability guaranteed through authenticated encryption.

## Technical Skills

| Area | Representative Technologies |
|---|---|
| Languages | C/C++, C#, Assembly (x86/ARM), Java, Python |
| Windows Legacy | VC6/VS2003/VS2005/VS2008/VS2010, Win32, MFC, ATL, WinCE 5.0/6.0, EVC4 |
| GUI / SCADA | Qt 4.x (4.7.3), GDI, ActiveX/COM/OCX, OpenGL, MFC |
| Interop | JNI/JNA, SWIG, COM, DLL boundaries, calling conventions, .DEF files |
| Embedded | STM32, ARM Cortex-M3, SSX45, bare-metal, USB HID, 1-Wire |
| Legacy Platforms | HP-UX 11.3/Itanium, Oracle 11g/19c/21c, RHEL, Tuxedo, Shell |
| Cryptography | SM2/3/4/9, RSA, ECC, AES-GCM, 3DES, HMAC, ECDH, MIRACL |
| Linker / Build | Linker hijacking, static linking, ABI compatibility, build chain recovery, .MAP file forensics |
| Migration | System reverse engineering, DR automation, platform discovery, Oracle migration |

## Professional Focus

I work best where the system has been running for 15+ years, the original team is gone, documentation no longer matches reality, and the only way forward is careful analysis rather than rewriting from scratch.

The most relevant engineering pattern for legacy rescue roles is:

**Legacy → Discovery → Bridge → Stabilization → Migration**

---

# Technical Case Appendix

The seven cases below are the strongest evidence for legacy rescue, VC++ interop, and platform modernization roles. They map directly to platform discovery, linker/ABI engineering, cross-language interop, industrial SCADA, and embedded security.

| Priority Evidence | Why It Matters to Legacy Rescue |
|---|---|
| SMBC FOX FX Trading Modernization | 125 environments, 61 interfaces, mission-critical archaeology |
| VC6 Linker Surgery | 20-year compiler gap bridged, 1.3MB→33KB micro-payload |
| Engineering the Unbreakable Bridge | C++/C#/Java 5-mechanism interop, 931KB zero-dep DLL |
| Stabilizing Legacy Industrial SCADA | Qt 4.7/VS2003 build recovery, GDI crash, 3x visualization |
| ATM Security Lock | C++ DLL→SWIG, HID optimization, 11→3 packets, 6.8x |
| Legacy 3DES/AES Rescue Layer | Cryptographic proxy, zero-downtime, $15.4M recall avoided |
| 12KB System Sovereignty: MIRACL | Memory 10KB→576 bytes, 0xE3 hardware ghost, 10yr zero-incident |

Compact signal for legacy rescue roles:
- Platform discovery: reverse-engineering 20-year systems where only code survives
- Build chain recovery and cross-temporal compiler compatibility
- Linker/ABI engineering at the symbol level
- Cross-language interop across C++, C#, Java, and COM
- Embedded cryptography under extreme memory and CPU constraints

The common technical pattern across the selected work is:

**Legacy → Discovery → Bridge → Stabilization → Migration**

The source material shows repeated work at the boundary between legacy systems, constrained environments, and modernization objectives:
- System discovery through operational evidence rather than documentation
- Build chain recovery and toolchain bridging across compiler generations
- Linker-level ABI compatibility and symbol hijacking
- Cross-language interop hardening at DLL boundaries
- Embedded systems engineering under extreme memory constraints

---

## SMBC FOX FX Trading System Modernization

### Background

A high-reliability banking core system project requiring legacy archaeology, migration engineering, and operational rescue for a platform with 20+ years of accumulated complexity. Client: SMBC. System: FOX foreign exchange / financial derivatives trading platform. Environment: DXC Technology.

### The Real Challenge

This was not an infrastructure migration. It was a system-discovery problem.

The platform had evolved continuously for more than two decades. Documentation was missing, stale, or inconsistent with the real system. Business logic existed only as shell scripts or compiled binaries. The migration could not safely proceed until the system was understood.

Operating inside a restricted banking environment with only grep, vi, and shell utilities — no IDE, no source indexing, no automated analysis tools.

### System Complexity

| Dimension | Scale |
|---|---|
| Server Count | 70-90 HP-UX/Itanium servers |
| Data Volume | ~9TB Oracle, ~4.1TB file data |
| Environments | 125 Base + 125 database instances automated |
| External Interfaces | 61 mapped (SWIFT, HULFT, MQ, OBS, SFTP, SSH) |
| Platform Age | 20+ years of continuous evolution |

### Investigation Strategy

Rather than treating migration as an infrastructure exercise, the work began as evidence-based system discovery:

```
Observed Behavior
    ↓
Shell Execution Path
    ↓
Application Logic
    ↓
Database Activity
    ↓
Dependency Mapping
    ↓
Operational Model
```

### Engineering Contributions

- **Legacy System Reverse Engineering**: Reconstructed business-critical workflows across HP-UX shell environments, Oracle workflows, C applications, and batch orchestration layers without requiring source-system modification.
- **DR Switching Discovery**: Reverse-engineered disaster recovery procedures by analyzing Shell scripts, Oracle control tables, and FTP control tables — revealing undocumented switching dependencies.
- **125-Environment Automation**: Reworked original ad-hoc scripts into parameter-driven Bash automation covering 125 Base environments plus 125 database instances.
- **Validation Tooling**: Developed Java / Spring Batch validation tool for automated comparison of millions of records across database instances, reducing validation effort by ~30%.
- **Interface Mapping**: Documented all 61 external interfaces by switching dependency category — SWIFT for financial messaging, HULFT for file transfer, MQ for message queuing, OBS for object storage, SFTP/SSH for secure file transfer.

### Results

| Metric | Outcome |
|---|---|
| Server Scale | 70-90 HP-UX/Itanium servers mapped |
| Data Volume | ~9TB Oracle + ~4.1TB file data catalogued |
| Environments | 125 + 125 database instances automated |
| External Interfaces | 61 mapped with dependency categories |
| Validation Effort | ~30% reduction via automated tooling |
| DB Compatibility | Oracle 11g/19c/21c analyzed across CDB/PDB |
| Primary Deliverable | Authoritative System Knowledge Model |
| Migration Planning | Assumption-driven → Evidence-driven |

### Why This Case Matters

Although the visible objective was platform migration, the underlying challenge was knowledge extraction from a complex legacy system.

The work required:
- Reverse engineering and dependency analysis
- Data lineage reconstruction across multiple technology layers
- Migration risk assessment and operational modeling
- Production-system reasoning under extreme tooling constraints

These same skills apply directly to cloud migration programs, monolith decomposition, enterprise platform modernization, and AI-assisted legacy transformation.

---

## VC6 Linker Surgery: Cross-Temporal ABI Compatibility

### Background

Legacy banking infrastructure (Windows XP / Visual C++ 6.0) where modern cryptographic requirements clashed with ancient ABI constraints. The task was to inject modern cryptographic primitives without massive redistribution packages or SxS Manifest crashes.

### Technical Challenges

- LNK2005 symbol collisions when mixing VC6 and VS2015 static/dynamic libraries
- SxS Manifest checks on Windows XP causing intermittent application crashes
- OS-level security filters flagging UPX-compressed files
- "Invisible Deadlock" in Version 391 — no logs, no crashes, just a frozen UI

### Engineering Decisions

- **Symbol Hijacking:** Ignored standard `MSVCRT.LIB` and `LIBCMT.LIB` during final link, manually re-linked required symbols
- **Static Linking Everything** with `/MT` flag, then stripping unnecessary symbols
- **Micro-Payload Architecture:** 33KB DLL encapsulating modern security logic
- **UPX Stripping:** Removed compression for 100% throughput across network filters
- **Binary Search on Version History** isolating failure to Version 391's global `send_mutex`
- Refactored synchronization into a Thread-Affinity Queue

### Results

| Metric | Outcome |
|---|---|
| Delivery Footprint | 1.3MB → 230KB (82% reduction) |
| Micro-Payload DLL | 33KB |
| Compiler Gap Bridged | 20 years (VC6 1998 → VS2015) |
| Network Filter Throughput | 100% (after UPX stripping) |
| Deadlock Resolution | Thread-Affinity Queue |
| Business Impact | National banking terminal network stabilized |

---

## Engineering the Unbreakable Bridge: Hardening Cross-Language Interfaces

### Background

A senior architect's field manual for hardening the most fragile layer in enterprise systems: the boundary between C++ and managed languages (C#/.NET, Java/JNI). Over a decade building cross-language bridges in banking ATM terminals, embedded HSMs, national-standard cryptographic SDKs (SM9/IBC), and ActiveX controls inside Internet Explorer on Windows XP.

### Technical Challenges

- Heap corruption from different CRT allocators (VS2010 DLL + VC6 MFC app)
- Calling convention mismatch (`__cdecl` vs `__stdcall`) causing silent stack corruption (`0xC0000005`)
- Non-deterministic GC finalization causing hardware handle deadlocks on USB HID devices
- Uncaught C++ exceptions escaping DLL boundaries killing host processes (IE, Tomcat)
- Cross-compiler time warp: injecting modern C++ (VS2010, Boost 1.56, Poco 1.4.6) into Windows XP / IE6 / VC6 host
- `time_t` bit-width mismatch causing 30-year timestamp rollback in JNI (1375891200 → 424567760)

### Five Engineering Mechanisms

**Mechanism 1 — Dimensional Reduction:** Never pass complex C++ objects across DLL boundary; reduce to `const char*`, Protobuf serialization, integer error codes.

**Mechanism 2 — Calling Convention Enforcement:** Explicit `__stdcall` declaration + .DEF file symbol pinning; consistency trumps convention.

**Mechanism 3 — Explicit Lifecycle:** Forced Open → Authenticate → [Logic] → Close; removed all automatic resource release from finalizers. Port deadlock at ~130-140 operations eliminated.

**Mechanism 4 — Exception Silo:** Total-catch handlers on every thread function boundary; error codes starting from 16 to avoid collision with underlying DLL.

**Mechanism 5 — SWIG Typemaps:** Explicit `time_t` → `jlong` mapping for timestamp safety; binary-safe `(char*, size_t)` for crypto payloads.

### Results

| Metric | Outcome |
|---|---|
| DLL Size | 931 KB single DLL, zero external dependencies |
| Port Deadlock | ~130-140 ops → 1,513 loops, 4,500+ auth cycles at zero crashes |
| Device Open | 10ms |
| Authentication | 70ms |
| Poco Logging Overhead | 20ms per entry → printf/OutputDebugString at 0.4ms |
| Log Compression | 45MB → 1.5MB .gz |
| Concurrent Threads | 100 `boost::thread` hit without failure |

---

## Stabilizing Legacy Industrial SCADA Platform (Qt 4.7 / VS2003)

### Background

Around 2017, a large industrial SCADA platform used in the power and wind energy industry. Built on Qt 4.7.3 and Visual Studio 2003, running inside a legacy Windows environment with heavy operational constraints. Part of a larger production system including realtime telemetry, backend services, industrial communication, and long-running operational clients.

### Technical Challenges

- Qt 4.7.3 and VS2003 toolchain dependence with broken build paths
- Loosely maintained modules and partial build documentation
- Hardcoded paths and fragile deployment assumptions
- Legacy OCX and Formula One component dependencies
- Qt4 / Qt5 compatibility gaps
- Windows GDI handle exhaustion under long-running operation
- Production systems that could not tolerate broad refactors

### Engineering Decisions

- Recovered broken Qt 4.7.3 build paths and repaired MOC / QMake compatibility
- Debugged VS2003 linker and toolchain issues
- Investigated GDI handle exhaustion correlated with Qt repaint lifecycle
- Designed alternative visualization path using Python / PyQt / embedded browser

### Results

- Increased plotting capacity from ~30,000 points to ~100,000 points (3x improvement)
- Reduced crash risk in GDI-heavy rendering paths
- Build chain recoverable for repeatable production fixes
- Partial modernization without forcing a full rewrite

---

## Offline ATM Security Lock with Dynamic Password Authentication

### Background

Designed the security and communication layer for an electronic lock used in ATM maintenance and controlled access workflows. System had to work in environments without continuous network access. Device ran on resource-limited embedded hardware.

### Technical Challenges

- Password flow had to remain safe offline — time-based OTP could be replayed within validity window
- Cryptographic performance on constrained embedded hardware
- Host-device reliability across C++ DLLs, HID communication, Python, Java, and C# wrappers
- Multi-threaded request handling; transport bugs and thread timing as security problems

### Architecture

- **Cryptographic Building Blocks:** Hash-based auth, PSK flows, AES symmetric encryption, ECDH key exchange
- **Host-Side:** C++ algorithm layer exposed through DLL boundaries, SWIG wrappers for Python/Java/C#
- **Device-Side:** STM32-class ARM hardware, HID communication protocol
- **Stateful Authentication:** Each password depended on prior close state, preventing replay

### Results

| Metric | Before | After |
|---|---|---|
| Lock Communication Time | ~10-16 seconds | 2-3 seconds |
| Delayed Report Flow | ~6.1 seconds | 0.9 seconds (6.8x) |
| HID Packet Latency | ~1.6ms per packet | ~1.0-1.1ms per packet |
| Request Path HID Packets | 11 packets | 3 packets |
| EC Init on ARM | — | ~0.75 sec, ~10KB memory |

---

## Legacy Security Hardening: 3DES/AES Rescue Layer

### Background

In 2014, a major state-owned infrastructure provider faced a critical security crisis. Thousands of legacy terminal units deployed nationwide used aging 3DES cryptographic schemes failing modern compliance standards. Hardware was "frozen" — firmware updates were high-risk, total replacement cost estimated in millions of dollars.

### Technical Challenges

- 3DES susceptible to modern brute-force and meet-in-the-middle attacks
- Any change to packet structure would break legacy parsing logic on thousands of nodes
- Full rewrite would lead to "Migration Paralysis"
- Fixed-size payload constraints in legacy protocol
- Zero-downtime requirement for phased upgrade

### Architecture

- **Dual-Path Encryption:** Legacy 3DES path maintained for heartbeats/low-sensitivity telemetry; hardened AES-256 GCM path for high-sensitivity control commands
- **Cryptographic Proxy / Sidecar:** Intercepted and re-encrypted traffic between legacy terminals and backend
- **Key Rotation Governance:** Unique physical terminal IDs + centralized HSM for key management
- **Phased Migration:** Rescue layer seamlessly handled both 3DES and AES during transition

### Results

| Metric | Outcome |
|---|---|
| Migration | Zero downtime, phased seamless transition |
| Cost Savings | ~$15.4M avoided hardware recall and labor |
| Evidence Durability | 99.9999% ("6-nines") via authenticated encryption |
| Architecture | Non-invasive cryptographic proxy/sidecar |

---

## 12KB System Sovereignty: MIRACL Memory War

### Background

In 2013, building the foundational security layer for an ultra-high-security commercial cryptographic device (UKey). Core hardware: domestic SSX45 chip with C\*Core C340 processor (32-bit RISC) and 12KB of SRAM. Had to execute complex ECC and Chinese national SM9 algorithm based on Tate Pairing within this constraint.

### Technical Challenges

- 12KB SRAM total — MIRACL library initialization consumed 8K-9.5K, leaving sub-3KB
- No MMU, no modern OS protections — heap fragmentation was a ticking kernel panic
- MicroLib `time()` returned values 8 hours off (28800-second timezone drift), causing PC jump
- Compiler `-O0` generated incorrect SHA-256 stack frames
- Hardware ghost `0xE3`: data byte matched adapter's hardcoded "Global Reset" command (in-band signaling)
- Calling convention mismatch causing `0xC0000005` at z=7 (28 bytes cumulative stack leak)
- FreeLibrary trap: `boost::thread` log thread killed asynchronously on DLL unload

### Engineering Decisions

- **Global ban on dynamic allocation:** `#define MR_STATIC 32` forced MIRACL into all-stack mode
- **Manual mrkill insertion:** Hand-placed memory release after every Big Number operation
- **Abandoned MicroLib time:** Wrote pure mathematical Greenwich Mean Time; carved independent memory for timezone
- **USB HID camouflage:** Borrowed legitimate keyboard VID/PID to bypass ATM driver whitelist
- **Forced escaping and physical stepping** in driver layer to strangle `0xE3` hardware ghost
- **Unified `__stdcall` export** + `[UnmanagedFunctionPointer(CallingConvention.Cdecl)]` for calling convention fix

### Results

| Metric | Outcome |
|---|---|
| Memory Footprint | 10KB → 576 bytes (94% reduction) |
| SRAM Utilization | 99.9% with 100% determinism |
| Operational Record | Zero downtime, zero incidents over 10 years |
| 1-Wire Read Timeout | Physical redline at 40ms (30ms failed, 50ms worked) |
| SHA-256 | Adopted over SHA-1 despite 2x energy cost |

---

## WinCE Platform Engineering: OpenSSL + SM9 Cryptographic Stack

### Background

Around 2012-2013, part of the Beijing Jiuqi Government (Cryptographic Lock Division) team building bank ATM security locks and financial terminal embedded devices. The task was to bring a full cryptographic stack to ARM-based Windows CE platforms — including OpenSSL, MIRACL, and the Chinese national SM9 Identity-Based Cryptography standard.

### Technical Challenges

- WinCE 5.0/6.0 on ARMV4I architecture with no standard toolchain compatibility
- OpenSSL 0.9.8w/1.0.0/1.0.1c required cross-compilation from x86 to ARM
- 116 unresolved symbols during initial OpenSSL link — CRT mismatches, socket API differences (WS2.dll), ARM runtime missing functions
- DLL loading failures from PE header version incompatibility
- MIRACL library had x86 assembly optimizations that had to be replaced with pure C (`MR_NOASM`)
- ARM runtime function gaps: `__rt_udiv64by64`, `__rt_sdiv`, `__rt_urem64by64` missing in the target environment
- Random number generator crashes, divide-by-zero exceptions, thread safety analysis across multiple library versions

### Engineering Work

- **Cross-Compilation Environment:** Set up EVC4 / VS2005 / VS2008 toolchains targeting WinCE 5.0 and 6.0 on ARMV4I
- **OpenSSL Porting:** Resolved 116+ linker/runtime issues spanning CRT compatibility, socket layer adaptation, ARM runtime function bridging, and PE header compatibility
- **MIRACL Porting:** Disabled assembly paths (`MR_NOASM`), replaced x86-optimized primitives with pure C implementations for ECC, Big Number, and Pairing operations
- **SM9 Cryptographic Stack:** Ported full SM9 Identity-Based Cryptography library including IBC algorithm engineering, WinCE adaptation, and ARM optimization
- **System-Level Debugging:** DLL dependency analysis using dumpbin/depends, PE header forensics, static/dynamic library conflict resolution (LNK2005/2019/2001)

### Results

- OpenSSL 0.9.8w/1.0.0/1.0.1c successfully ported to ARM WinCE platforms
- MIRACL with ECC + Pairing running on ARM without assembly dependencies
- Full SM9 cryptographic stack operational on WinCE embedded terminals
- Applied in production banking security terminals and embedded cryptographic devices
- Rare skill combination: VC++ + WinCE + ARM + Cryptography — a market combination that has become extremely scarce

*This appendix prioritizes the highest-signal evidence for legacy rescue, VC++ interop, platform modernization, and embedded systems roles: platform discovery, build chain recovery, linker/ABI engineering, cross-language bridging, and embedded security engineering.*
