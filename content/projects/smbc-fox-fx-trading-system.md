---
title: "SMBC FOX FX Trading System Modernization"
date: 2026-06-09
description: "Reverse-engineering and modernizing SMBC's legacy FOX foreign-exchange trading platform, including HP-UX to RHEL migration, DR automation, database validation, and interface governance."
categories: ["Tech Projects"]
tags: ["Oracle", "HP-UX", "RHEL", "Shell", "Banking", "Legacy Systems", "Migration", "SRE"]
---

# SMBC FOX FX Trading System Modernization

This project was not ordinary FX application development. It was a high-reliability banking core system project that required legacy archaeology, migration engineering, and operational rescue for a platform with more than 20 years of accumulated complexity.

## Executive Summary

- Client: SMBC
- System: FOX foreign exchange / financial derivatives trading platform
- Period: 2023-06 to 2024-01
- Environment: DXC Technology
- Scale: 70-90 servers, ~9TB Oracle data, ~4.1TB file data
- Target migration: HP-UX 11.3 / Itanium IA64 to RHEL 8.2 x86_64

## 30-Second Interview Summary

This was SMBC's FOX foreign exchange and financial derivatives platform modernization project.

The core job was to migrate a 20+ year old HP-UX / Itanium environment to RHEL 8 while analyzing legacy Shell scripts, Oracle control data, and interface behavior. I worked on DR failover automation, migration validation tooling, and large-scale data consistency checks.

The main value was legacy asset analysis and risk reduction in an environment where documentation was incomplete and operational failure was expensive.

## What Made It Hard

- Core business logic had been built over two decades
- Much of the original logic existed only as shell scripts or compiled binaries
- Documentation was missing, stale, or inconsistent with the real system
- The platform carried operational risk because it supported a banking core
- Migration had to preserve availability, interfaces, and DR behavior

## Core Workstreams

### Legacy Archaeology and Reverse Engineering

I reconstructed system behavior from Shell scripts, binaries, and operational procedures.

- Analyzed scripts such as `Ext_ScnCng.sh` and `OpeSetDrExtlNode.sh`
- Traced compiled C programs such as `SysSetScnStsDb`
- Identified that DR switching was not just a host change, but a database/control-table driven process

This changed the migration strategy. Instead of treating the system as a black box, I turned undocumented behavior into actionable operational knowledge.

### Hardest Technical Problem

The hardest part was that the real DR switching behavior was not documented.

I reverse-engineered Shell scripts, Oracle control tables, FTP control tables, and multiple operational procedures to determine which parameters actually controlled the switch.

That allowed the DR process to be reorganized into a safer, repeatable flow and fed into later automation work.

### Oracle Migration and Capacity Planning

The database migration work covered Oracle 11g, 19c, and 21c compatibility analysis.

- Reviewed cross-version compatibility risks
- Evaluated CDB/PDB adaptation requirements
- For an Oracle base of ~9TB, identified capacity pressure risks
- Supported post-migration expansion planning
- Worked with databases running near 89% utilization in critical areas
- Helped design migration validation to reduce cutover risk

### Automated Environment Reconstruction

The platform had 125 Base environments and 125 corresponding database instances.

I reworked the original scripts into a parameter-driven Bash automation framework that could:

- Create users
- Create schemas
- Initialize Oracle instances
- Apply repeated deployment steps at scale

This replaced manual repetition with a repeatable operational pipeline.

### Data Migration Validation

I developed a Java / Spring Batch validation tool for large-scale migration verification.

- Automated comparison of millions of records between old and new systems
- Detected migration differences automatically
- Reduced manual verification effort by about 30%

This optimized a traditionally manual validation process and cut migration test effort by about 30%.

This was a practical safeguard, not a reporting toy. It was used to prove that migration results were consistent enough for banking operations.

### Disaster Recovery Automation

The FOX system depended on high-risk DR switching flows.

I analyzed and automated parts of the DR process around:

- DRLiveRun
- Standby and active node behavior
- Oracle control tables
- FTP control tables

The result was a safer, more repeatable failover workflow for a banking core platform.

### Interface Governance

The system had about 61 external interfaces.

Examples included:

- SWIFT
- HULFT
- MQ
- OBS
- SFTP
- SSH

I mapped which interfaces depended on host switching, which depended on database parameter switching, and which needed special protocol handling.

### Middleware and Security Review

I also participated in evaluating Tuxedo encryption-related tradeoffs, especially:

- TLS impact
- Encryption overhead
- High-throughput transaction performance

That meant balancing security with latency on a live financial platform.

## Why This Project Matters

The main value is not the individual tools. It is the ability to work on a core financial system where:

- The codebase is old
- The documentation is incomplete
- The system is huge
- The migration risk is real
- Failure affects banking operations

This was not just a migration task. It combined:

- Legacy asset analysis in a documentation-poor environment
- Large-scale platform migration
- Oracle modernization
- DR automation
- Migration quality assurance

## Applicable Project Types

- Banking and financial core systems
- Oracle platform modernization
- HP-UX / AIX / Linux migration
- DR / BCP support
- Legacy system analysis
- Large-scale data migration
- Maintenance and improvement in documentation-poor environments

## Marketable Summary

If I had to compress this into one line for recruiters or clients, it would be:

> Reverse-engineered and modernized a 20-year-old mission-critical FX trading platform at SMBC, migrating 70-90 HP-UX/Itanium servers and 9TB Oracle databases to RHEL 8.2 while building automated DR workflows and large-scale data validation tooling.

## Continue Exploring

- [Technical Projects](/projects/)
- [Deep Technical Archive](/docs/deep-technical-archive/)
- [Homepage](/)
