---
title: "Deep Technical Archive"
date: 2026-06-01
description: "Selected deep technical work on embedded cryptography, protocol analysis, deterministic runtime design, and constrained system recovery."
categories: ["Documents"]
tags: ["Cryptography", "Embedded", "Protocol", "Infrastructure", "Architecture"]
---

# Deep Technical Archive

This section is for readers who already know they want the hard proof.

It collects the work that sits below the homepage sales layer: embedded cryptography, protocol analysis, deterministic runtime design, constrained-memory engineering, and boundary-level debugging.

## What you will find here

- SM9 and pairing-heavy cryptography under extreme memory constraints
- Protocol reverse engineering and firmware boundary analysis
- Deterministic runtime design and hardware-software co-design
- Legacy migration and security hardening for fragile production systems
- Deep system recovery work where observability, precision, and execution discipline matter

## Selected Deep Dives

### VC Experience / Windows Legacy Systems

- [VC Experience / Windows Legacy Systems](/docs/vc-experience/)

This page summarizes the Windows and embedded C++ background behind the deeper low-level work.

### Engineering Cryptographic Systems in 13KB RAM

- [Hand-rolling SM9 (IBC) Cryptography for 8KB RAM Environments](/projects/sm9-low-level/)
- [System Sovereignty Under 12KB Constraints](/cases/system-sovereignty-12kb/)
- [Technical Whitepaper: Deterministic Computing](/docs/technical-whitepaper/)

This cluster covers pairing optimization, stack discipline, deterministic memory layout, and the realities of cryptographic implementation under severe embedded constraints.

### Protocol and Boundary Analysis

- [Cross-Language Bridge Engineering](/cases/cross-language-bridge/)
- [USB HID Protocol Boundary Fixes](/projects/usb-hid-protocol/)
- [Legacy 3DES Hardening](/cases/legacy-3des-hardening/)
- [Web3 Scam Exposure](/cases/web3-scam-exposure/)

This cluster shows how I work across protocol internals, firmware boundaries, host-device mismatches, and security-sensitive integration points.

### Cryptographic Control and Offline Authorization

- [Designing a Dynamic Password Lock for Offline ATM Operations](/cases/dynamic-password-lock/)

This case covers offline unlock design, hash-chained challenge-response, replay resistance, and embedded crypto tradeoffs for secured access hardware.

### Network Control Plane and Edge Forwarding

- [SD-WAN Architecture Feasibility Study and Control-Plane Design](/cases/sdwan-architecture-feasibility/)

This case covers secure device onboarding, YANG-based interface modeling, OpenDaylight validation, and transport choices for weak-network environments.

### Data Ingestion and Batch Performance

- [Merge-Sport: Spring Boot Data Ingestion Acceleration](/cases/spring-boot-data-ingestion-acceleration/)

This case covers Spring Boot 3 ingestion tuning, batch upserts, transport migration, and integration-test hardening for a feed-driven sports data platform.

### Systems Under Operational Pressure

- [Frontend Stabilization Under Production Pressure](/cases/frontend-stabilization-production-pressure/)
- [Stabilizing and Modernizing a Legacy Industrial SCADA Platform (Qt 4.7 / VS2003)](/cases/industrial-qt-system-development/)
- [Technical Debt Governance: Dismantling the "Microservice Tax"](/cases/nb-tech-debt/)
- [Reliability Audit: Toyoko INN Reservation System](/cases/toyoko-inn-audit/)
- [Merge-Sport: Spring Boot Data Ingestion Acceleration](/cases/spring-boot-data-ingestion-acceleration/)

This cluster demonstrates the same engineering discipline in backend, reliability, and modernization work.

## Reading Order

If you want the shortest route:

1. Start with the homepage for role fit and positioning.
2. Read the case studies for applied delivery evidence.
3. Read the deep archive when you want the low-level proof.
