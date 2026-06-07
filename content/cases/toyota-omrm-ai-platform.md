---
title: "Toyota OMRM: Building a Hybrid-Cloud Real-Time AI Platform"
date: 2026-06-07
categories: ["Case Studies"]
tags: ["AI Platform", "Serverless", "WebSocket", "AWS", "Azure", "Speech", "Event-Driven", "Reliability"]
description: "Designing a hybrid AWS + Azure real-time AI platform for live coaching and post-call analytics, with serverless streaming, cross-cloud timeline alignment, and event-driven reliability."
---

# Toyota OMRM: Building a Hybrid-Cloud Real-Time AI Platform

## Executive Summary

Designed and delivered a real-time AI-assisted sales coaching platform for a global automotive manufacturer.

The platform analyzed live customer conversations, generated in-call recommendations, and produced structured post-call records for training, quality assurance, and operational analytics.

Key capabilities included:

```text
Real-Time Speech Intelligence

Hybrid AWS + Azure AI Pipeline

Speaker Attribution

Intent Extraction

Event-Driven Processing

Serverless Scalability
```

The primary engineering challenge was not speech recognition.

It was orchestrating multiple AI systems, streaming infrastructure, and distributed processing pipelines into a coherent real-time platform.

## Architecture Overview

```text
Audio Stream
↓
WebSocket Gateway
↓
Serverless Streaming Pipeline
↓
Azure Speech + CLU
↓
AWS Transcribe
↓
Timeline Alignment Engine
↓
Conversation Intelligence
↓
Real-Time Coaching
```

The system combined:

* AWS Lambda
* API Gateway WebSocket
* EventBridge
* S3
* RDS MySQL
* Azure Speech Services
* Azure CLU
* AWS Transcribe

into a unified event-driven architecture.

## Challenge #1

### Real-Time Audio Processing on Stateless Infrastructure

Audio arrived as:

```text
WebM / Opus
```

while downstream AI services expected:

```text
PCM / WAV
```

The processing pipeline had to operate entirely inside AWS Lambda, where execution environments are ephemeral and traditional streaming infrastructure was unavailable.

### Engineering Solution

* Built a serverless WebSocket streaming architecture using API Gateway and Lambda.
* Implemented binary WebM payload extraction and audio reconstruction directly within Lambda.
* Leveraged Lambda warm-container reuse to preserve short-lived conversational context across streaming requests.
* Added end-of-session persistence safeguards to prevent data loss during container recycling.

## Challenge #2

### No Single AI Provider Could Solve the Problem

Evaluation showed:

```text
Azure
↓
Best Japanese Recognition

AWS
↓
Best Speaker Diarization
```

Neither service alone could satisfy business requirements.

### Engineering Solution

Designed a hybrid-cloud "dual-brain" architecture.

Azure handled:

* Speech Recognition
* Intent Analysis

AWS handled:

* Speaker Identification
* Conversation Structure

This combined the strongest capabilities of both providers while maintaining a unified downstream processing model.

## Challenge #3

### Cross-Cloud Timeline Consistency

The most difficult engineering problem emerged after integration.

Azure and AWS used incompatible timing models:

```text
Azure
100ns Ticks

AWS
Seconds
```

In addition, different silence-handling behaviors introduced approximately:

```text
3.5 Seconds
```

of timeline drift.

Without correction:

* speaker attribution failed
* transcript ownership became unreliable
* recommendation quality degraded

### Engineering Solution

Developed a timeline-alignment engine that:

* normalized heterogeneous timestamp formats
* compensated for provider-specific drift
* statistically matched transcript windows to speaker segments
* reconstructed reliable conversation ownership

This enabled accurate attribution of customer and sales-representative speech across the entire conversation lifecycle.

## Reliability Engineering

The platform required substantial operational hardening.

### Database Recovery

Resolved:

* connection leaks
* lock wait timeouts
* long-running transaction stalls

through connection lifecycle and transaction-management improvements.

### Event-Driven Decoupling

Implemented asynchronous processing:

```text
Audio Upload
↓
S3 Event
↓
Transcription
↓
Speaker Attribution
↓
Intent Analysis
↓
Persistence
```

This reduced coupling between AI processing stages and improved resilience.

### Failure Prevention

Implemented:

* idempotent processing
* quota-aware execution
* S3 trigger-loop prevention

to reduce operational and cost risks.

## Results

| Metric | Outcome |
| --- | --- |
| Architecture | Hybrid AWS + Azure |
| Processing Model | Real-Time Streaming |
| Speech Recognition | Live Japanese Transcription |
| Speaker Attribution | Automated |
| Intent Analysis | Real-Time |
| Session Finalization | ~2.5 Seconds |
| Lambda Warm Execution | ~20ms |
| Business Outcome | Live Coaching + Post-Call Analytics |

These metrics come from project runtime records and performance analysis.

## Why This Case Matters

This project was fundamentally an AI platform engineering challenge.

The hardest problems involved:

* real-time event processing
* hybrid-cloud orchestration
* streaming architectures
* distributed consistency
* AI workflow integration
* reliability engineering

The same architectural patterns apply directly to:

* AI Agents
* LLM Platforms
* AI Copilots
* Real-Time Analytics
* Event-Driven AI Systems
