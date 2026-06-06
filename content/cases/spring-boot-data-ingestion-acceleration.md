---
title: "Merge-Sport: Spring Boot Data Ingestion Acceleration"
date: 2026-06-06
categories: ["Case Studies"]
tags: ["Java", "Spring Boot", "Spring Boot 3", "MySQL", "Redis", "MQTT", "WebSocket", "MyBatis", "Testcontainers", "Performance Optimization"]
description: "A Spring Boot 3 sports-data ingestion platform rebuilt for higher throughput, lower latency, and more reliable synchronization across external feeds and downstream services."
---

# Merge-Sport: Spring Boot Data Ingestion Acceleration

## Project Overview

In September and October 2025, I worked on a Spring Boot 3 / Java 17 sports data synchronization platform that ingested match data from external providers and pushed it into downstream services.

The business problem was simple: the platform needed fresher data, but the original ingestion path was too slow and too fragile. The first version relied heavily on HTTP polling, single-row persistence, and a tightly coupled service layout that made failures hard to isolate. Under load, it hit authorization errors, rate limits, and database bottlenecks that delayed downstream availability.

This was not just a backend refactor. The system had to support real-time use cases, survive unstable third-party feeds, and keep the data pipeline testable while the team continued shipping new features.

## Technical Challenges

The hardest problem was the ingestion path itself. The original pipeline processed records one by one, which made small batches far slower than they should have been. A 500-record synchronization task took about 70 seconds, which was too slow for a feed-driven product that needed timely updates.

The second problem was transport reliability. Polling third-party APIs repeatedly caused avoidable failures, including authorization errors and rate limiting. The system needed a way to move from repeated fetch cycles to a more stable data-stream model.

The third problem was database pressure. The ingestion logic depended on queries and writes that were not shaped for high-frequency deduplication. That created lock contention, poor write performance, and fragile integration tests when scheduled tasks ran during test startup.

## My Contributions

I reworked the data ingestion architecture around a more efficient synchronization flow. Instead of relying on repeated HTTP polling, I moved the system toward long-lived push-based transport using WebSocket and MQTT where appropriate. That reduced the amount of wasted request traffic and made the feed pipeline more resilient to provider-side throttling.

I rebuilt the persistence layer around batch operations instead of row-by-row writes. Using native MyBatis XML and MySQL batch upsert patterns, I removed the N+1-style overhead that was dominating the critical path. I also added the missing indexes needed for de-duplication and identity matching, which reduced full-table scans and made the write path more predictable.

I cleaned up the Spring Boot execution model so the service could be tested and deployed more safely. Scheduled jobs were separated from the main boot path, conditional configuration was added to prevent test-time deadlocks, and integration tests were isolated with `@SpringBootTest` and Testcontainers so the pipeline could be validated without polluting shared state.

I also improved observability. MDC-based trace IDs were added so data sync requests could be followed across logs, making it much easier to diagnose delayed or partial updates.

## Results

The most visible result was a major latency drop in the core sync path:

- 500-record synchronization time improved from about 70 seconds to about 1.5 seconds
- the system became much less sensitive to repeated HTTP polling failures
- batch upserts and index tuning reduced database round-trip overhead
- integration tests became more reliable after scheduled jobs were separated from test startup
- traceability improved through end-to-end request IDs in the logs

The practical business result was faster data freshness with less operational risk. Downstream consumers saw data sooner, and the backend could absorb higher update volume without immediately needing more infrastructure.

## Technologies

- Java 17
- Spring Boot 3
- MySQL
- MyBatis
- Redis
- WebSocket
- MQTT
- Testcontainers
- JUnit 5
- MDC logging
- Docker

