---
title: "ETL Stabilization: 70s to 1.5s"
date: 2026-03-10
description: "Re-architecting a Spring Boot ETL pipeline to improve stability and processing efficiency with batch upserts, index tuning, and strategy patterns."
categories: ["Case Studies"]
tags: ["Java", "Spring Boot", "MySQL", "Architecture", "Optimization"]
---

# ETL Stabilization: Batch Processing from 70s to 1.5s

## Background
The system was a multi-source sports data integration platform built with **Spring Boot 3**, **Java 17**, **MyBatis**, and **MySQL**. It aggregated and normalized large volumes of external data, but the synchronization pipeline had become the bottleneck as traffic increased.

## Core Challenges
- **Excessive database round trips**: The legacy flow processed records one by one, so a routine 500-record batch took more than **70 seconds**.
- **N+1-style persistence behavior**: Deduplication and update logic repeatedly hit the database instead of working in batches.
- **Lock contention under concurrency**: Missing indexes on key identity fields caused full table scans and increased deadlock risk.
- **Monolithic service design**: A single service had grown to 1200+ lines, mixing cleansing, mapping, and merge rules into one hard-to-maintain unit.

## Architectural Solutions

### 1. Batch Upsert Engine
I replaced per-record persistence with batch-oriented writes using MyBatis and MySQL.
- **Strategy**: Used `INSERT ... ON DUPLICATE KEY UPDATE` for atomic batch upserts.
- **Effect**: Collapsed many small writes into a single batch operation and cut network overhead sharply.

### 2. Precision Index Engineering
I profiled the deduplication path and identified missing indexes on the critical identity-mapping fields.
- **Action**: Added composite unique indexes to remove full table scans.
- **Effect**: Reduced lock duration and improved stability under concurrent updates.

### 3. Strategy-Based Data Processing
The platform consumed more than 10 external data sources, each with slightly different cleansing and merge rules.
- **Refactoring**: Introduced Strategy Pattern implementations for source-specific logic.
- **Result**: Broke the monolithic service into smaller focused components, making the code easier to test and extend.

### 4. Reliability and Observability
I added production-safe diagnostics so performance gains did not come at the cost of traceability.
- **MDC tracing**: Added request-level trace context for full-path debugging.
- **Smart log sampling**: Printed detailed logs for early records and periodic summaries to avoid log storms.
- **Testcontainers coverage**: Added isolated integration tests to validate migration behavior and prevent regressions.

## Key Outcomes
- **Processing time**: Reduced core batch latency from **70 seconds to 1.5 seconds**.
- **Stability**: Lowered deadlock risk and made concurrent updates far more predictable.
- **Scalability**: The redesigned pipeline handled a **10x increase in traffic** without horizontal pod scaling.
- **Maintainability**: Replaced a 1200+ line monolith with modular strategy-based components.

## Commercial Value Delivered
This was not just a speed improvement. The redesign made data available sooner, reduced operational risk, and improved delivery predictability for downstream users. By fixing the bottleneck at the architecture level, the platform could absorb future growth without immediate infrastructure expansion.
