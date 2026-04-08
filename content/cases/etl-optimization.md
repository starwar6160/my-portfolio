---
title: "ETL Performance Optimization: 70s to 1.5s"
date: 2026-03-10
description: "Re-architecting a Spring Boot ETL pipeline to achieve 50x throughput gain using high-performance Batch Upserts and Strategy Patterns."
categories: ["Case Studies"]
tags: ["Java", "Spring Boot", "MySQL", "Architecture", "Optimization"]
---

# ETL Performance Optimization: 50x Throughput Boost

## Background
The system was a data fusion platform built with **Spring Boot 3** and **Java 17**, designed to handle massive multi-source heterogeneous sports data. The legacy implementation suffered from extreme performance degradation as data volume scaled.

## Core Challenges
- **N+1 Query Bottleneck**: The legacy logic processed records individually, leading to massive database round-trip overhead. A 500-record batch took over **70 seconds**.
- **Database Deadlocks**: High-concurrency environments triggered frequent lock contention and deadlocks due to non-indexed deduplication queries.
- **Architectural Bloat**: The core service had swelled to 1200+ lines, making it a "distributed monolith" that was impossible to maintain.

## High-Performance Architectural Solutions

### 1. Batch Upsert Engine
I refactored the persistence layer, moving away from automated ORM patterns to **raw MyBatis XML**.
- **Strategy**: Leveraged MySQL's `INSERT ... ON DUPLICATE KEY UPDATE` to perform atomic batch operations.
- **Result**: Reduced network overhead by O(N).

### 2. Precision Index Engineering
Conducted deep-dive query analysis to identify missing indexes on critical deduplication fields.
- **Action**: Implemented unique composite indexes for identity mapping, eliminating full table scans.

### 3. Decoupling with Strategy Patterns
- **Abstraction**: Introduced a **Strategy Pattern** to standardize the cleansing and merging logic for over 10 different data sources.
- **Refactoring**: Decomposed the monolithic service into highly cohesive Helper classes (~100 lines each), significantly improving code readability and testability.

### 4. Observability and I/O Governance
- **MDC Traceability**: Implemented full-link tracing using MDC (Mapped Diagnostic Context).
- **Log Sampling**: Designed a "Smart Sampling" strategy that prints full traces for the first record and periodic summaries, preventing log storms while maintaining diagnostic visibility.

## Key Outcomes
- **50x Performance Gain**: Core task latency dropped from 70s to **1.5s**.
- **Reliability**: Established an isolated integration test suite using **Testcontainers**, ensuring zero regression during high-volume data migrations.
- **Scalability**: The new architecture handled a 10x increase in traffic without requiring horizontal pod scaling.

## Commercial Value Delivered
Beyond the raw technical metrics, this architectural overhaul directly drives business velocity. By reducing processing latency by 98%, the platform shifted from delayed batch reporting to **real-time data availability** for end-users, significantly enhancing product competitiveness. Furthermore, eliminating the crippling database load allows the business to scale transaction volumes 10x without incurring proportional, expensive cloud infrastructure upgrades (OPEX). This is technical debt resolution successfully translated into tangible business leverage.
