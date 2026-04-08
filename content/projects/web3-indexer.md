---
title: "Web3 Indexer: Go Engine Architecture"
date: 2026-03-20
description: "Re-engineering a high-availability EVM blockchain indexer from TypeScript to Go, achieving 10x throughput and 99.9% data durability."
categories: ["Tech Projects"]
tags: ["Go", "EVM", "Blockchain", "Concurrency", "SRE"]
---

# Web3 Indexer: Industrial-Grade Go Engine

This project involved evolving a high-availability EVM blockchain data indexing engine from a TypeScript prototype into a robust, industrial-grade production system using **Golang**.

## Core Challenges
- **Precision Risk**: TypeScript's handling of `uint256` large integers was prone to critical precision loss.
- **Concurrency Bottlenecks**: The single-threaded Node.js event loop struggled to handle thousands of concurrent RPC requests.
- **Resilience Issues**: Unstable RPC nodes (Rate limits, 5xx errors) frequently caused data collection gaps.
- **Deployment Complexity**: Large image sizes (~200MB) and complex dependency management slowed down CI/CD.

## Architectural Solutions

### 1. Native EVM Support
Re-engineered the entire pipeline in Go using the `holiman/uint256` library. This ensures memory-level compatibility with EVM math, eliminating precision truncation risks.

### 2. Three-Stage Decoupled Pipeline
I designed a highly scalable architectural pattern:
- **Fetcher**: Concurrent RPC data retrieval.
- **Sequencer**: Corrects out-of-order data streams.
- **Processor**: Atomic database persistence and validation.

### 3. Deterministic Concurrency Model
Leveraged Goroutines and Buffered Channels to implement **Backpressure Control**. This prevented memory overflows during massive catch-up synchronization by dynamically throttling the `Fetcher` based on `Processor` latency.

### 4. SRE & Resilience Engineering
- **Failover Connection Pool**: Implemented a multi-node proxy with **Exponential Backoff** logic.
- **Traffic Shaping**: Used **Token Bucket** algorithms for precise RPC rate limiting.
- **Reorg Self-Healing**: Designed an automatic rollback mechanism based on `ParentHash` validation to handle chain reorganizations gracefully.

## Key Outcomes
- **10x Throughput Boost**: The Go engine supported 50+ concurrent synchronization routines on a single instance.
- **Ultra-Lightweight Deployment**: Reduced Docker image size from ~200MB to **~20MB** through multi-stage builds and zero-dependency binaries.
- **High Availability**: Maintained **99.9% data durability** even when operating under unstable public RPC endpoints.

## Commercial Value Delivered
In decentralized finance, data ingestion latency and inaccuracy translate directly into user financial loss and catastrophic brand mistrust. By guaranteeing 99.9% data durability and precision, this architecture safeguards the integrity of trading algorithms and prevents multi-million dollar clearing discrepancies. Additionally, slashing the deployment bloat enables the engineering team to iterate rapidly, maintaining agility in a hyper-competitive market while significantly reducing cloud hosting costs.
