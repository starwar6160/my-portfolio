---
title: "Technical Audit: Toyoko INN Performance & Security"
date: 2026-03-25
description: "External performance auditing of a massive reservation system (143.9B JPY scale), identifying 800M JPY in potential salvageable revenue through architectural optimization."
categories: ["Case Studies"]
tags: ["Audit", "Performance", "Security", "Hash Chain", "Architecture"]
---

# Performance Audit: Toyoko INN Reservation System

This external audit was conducted to identify mission-critical performance bottlenecks and security vulnerabilities in a major hospitality reservation system. Operating with zero internal access, I developed automated Python probes to quantify the system's performance from a "real-world" user perspective.

## 1. Executive Summary: The Revenue Leak
The audit revealed a **Desktop LCP (Largest Contentful Paint) of 3.72s**, significantly exceeding the 2.5s industry standard. Under weak network conditions (representative of many travelers), this latency spikes to **16.0s**, leading to extreme churn risk.
- **Estimated Commercial Impact**: Conservative modeling suggests that optimizing LCP to under 2.0s could salvage **500M to 800M JPY** in annually lost bookings.

## 2. Key Technical Findings

### Finding #1: Image Optimization Misconfiguration
- **Observation**: The system requested lossless images (`q=100`) via the Next.js optimizer.
- **Impact**: A single desktop hero image weighed **757.8KB**, which is 5.6x larger than necessary.
- **Solution**: Implement WebP format with capped quality (q=75) and responsive `srcset` mechanims.

### Finding #2: Synchronous GDPR Payload Overhead
- **Observation**: A **933KB** `external_services.json` file was being loaded comprehensively across all regions, including Japan and China where EU GDPR logic is non-applicable.
- **Impact**: This blocks the main thread during parsing, exponentially amplifying "white screen" delays in weak signal areas.

### Finding #3: JavaScript Bundle Inflation
- **Observation**: The JS bundle size expanded from 528KB (transfer) to **2.07MB (decoded)**.
- **Impact**: This 3.95x expansion indicates redundant libraries and failed tree-shaking, causing "main thread lockups" on slower mobile devices.

## 3. High-Security Proposal: Hash Chain-based Secure Ledger
Beyond frontend performance, I proposed a "mathematically honest" foundation for the 7-million-member loyalty points system.

### The Problem
Traditional points systems rely on "numbers in a database" protected by passwords. They remain vulnerable to internal database manipulation (insider threat) and clock drift in distributed cloud environments.

### The Solution: "Data that Defends Itself"
- **Hash Chain Architecture**: Implement an immutable ledger where every transaction is cryptographically linked to the previous one.
- **Sidecar Sentinel**: A modernized Go-based microservice that calculates hashes independently of the legacy Java backend.
- **Immutable Storage**: Persist the Hash Chain in AWS S3 Object Lock, ensuring 99.9999% immutability.

## 4. Architectural Vision
This audit proves the value of **External Technical Due Diligence**. By applying modern SRE methodologies to legacy enterprise systems, we can uncover massive cost savings and security hardening opportunities without requiring a full, risky system rewrite.

## Commercial Value Delivered
This approach bridges the critical gap between deep technical troubleshooting and C-level revenue protection. By proactively identifying these performance bottlenecks before they are dismissed as generic "user drop-off", organizations can preemptively secure targeted digital revenue (conservatively ~800M JPY) and protect long-term brand equity without undertaking massive, risky capital expenditures.
