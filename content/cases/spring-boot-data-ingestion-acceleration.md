---
title: "Merge-Sport: Spring Boot Data Ingestion Acceleration"
date: 2026-06-06
categories: ["Case Studies"]
tags: ["Java", "Spring Boot", "Spring Boot 3", "MySQL", "Redis", "MQTT", "WebSocket", "MyBatis", "Testcontainers", "Performance Optimization"]
description: "Re-architecting a Spring Boot 3 sports-data ingestion pipeline with batch upserts, index engineering, strategy patterns, and transport modernization to cut 500-record sync time from 70 seconds to 1.5 seconds."
---

# Merge-Sport: Spring Boot Data Ingestion Acceleration

## Project Overview

I worked on a Spring Boot 3 / Java 17 sports-data integration platform responsible for synchronizing external match data into downstream services.

As traffic increased, the ingestion pipeline became the primary bottleneck. The system relied on HTTP polling, row-by-row persistence, and tightly coupled business logic, resulting in poor throughput, lock contention, and increasing operational risk.

The objective was not merely to improve performance, but to make the synchronization pipeline scalable, reliable, and maintainable for future growth.

## Core Challenges

### Excessive Database Round Trips

The original implementation processed records individually.

A routine 500-record synchronization required more than 70 seconds, with most time spent on repetitive database interactions.

### N+1 Persistence Pattern

Deduplication and update logic repeatedly queried and updated records one at a time, creating unnecessary latency and lock contention.

### Database Scalability Issues

Critical identity-matching fields lacked proper indexes, causing full-table scans and increasing deadlock risk under concurrent workloads.

### Monolithic Processing Logic

More than ten external providers were handled by a single 1200+ line service that mixed cleansing, mapping, merging, and persistence concerns.

## Architecture Improvements

### 1. Batch Upsert Engine

Replaced row-by-row persistence with MyBatis batch operations and MySQL upsert patterns.

* Used `INSERT ... ON DUPLICATE KEY UPDATE`
* Collapsed hundreds of write operations into a single transaction
* Significantly reduced network and database overhead

### 2. Index Engineering

Profiled the critical deduplication path and introduced composite unique indexes for identity matching.

Results:

* Eliminated full-table scans
* Reduced lock duration
* Improved concurrent-update stability

### 3. Strategy-Based Processing

Refactored source-specific processing into Strategy Pattern implementations.

Results:

* Replaced a 1200+ line monolithic service
* Improved maintainability and testability
* Simplified onboarding of new data providers

### 4. Reliability & Observability

Introduced production-grade diagnostics and validation mechanisms.

* MDC trace IDs for end-to-end request tracking
* Log sampling to avoid log storms
* Testcontainers-based integration testing
* Isolation of scheduled jobs from test startup

### 5. Transport Modernization

Where appropriate, moved synchronization flows away from repeated HTTP polling toward long-lived push-based transport using WebSocket and MQTT.

This reduced provider throttling issues and improved data freshness.

## Results

### Performance

* 500-record synchronization reduced from approximately 70 seconds to 1.5 seconds

### Scalability

* Sustained roughly 10× higher synchronization volume without horizontal scaling

### Reliability

* Lower deadlock probability
* Improved behavior under concurrent updates
* More predictable synchronization outcomes

### Maintainability

* Replaced a tightly coupled monolith with modular processing components
* Simplified testing and future feature development

## Business Impact

The redesign improved data freshness, reduced operational risk, and increased delivery predictability for downstream consumers.

By eliminating architectural bottlenecks rather than simply adding infrastructure, the platform was able to absorb future growth without immediate capacity expansion.

## Technologies

Java 17 · Spring Boot 3 · MyBatis · MySQL · Redis · WebSocket · MQTT · Testcontainers · Docker · JUnit 5 · MDC logging
