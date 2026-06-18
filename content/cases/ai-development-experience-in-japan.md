---
title: "AI Development Experience in Japan"
date: 2026-06-18
categories: ["Case Studies"]
tags: ["AI Platform", "LLM", "Workflow Engineering", "Real-Time Systems", "Speech", "Backend"]
description: "Production AI work in Japan across real-time speech systems, n8n + LLM workflow optimization, and LLM-driven engineering for large systems."
hero_image: "https://r2.st6160.click/618AIProg_Large.jpg"
hero_caption: "AI development work in Japan"
---

# AI Development Experience in Japan

## Executive Summary

Senior Software Engineer with hands-on experience building production AI systems, LLM workflows, and AI-augmented engineering solutions across automotive and enterprise domains.

## Focus Areas

- Production AI Systems
- LLM Integration
- AI Workflow Engineering
- Real-Time AI Applications
- AI-Augmented Software Engineering

## 1. Toyota AI Voice Sales Assistant
**Period:** 2022.11 - 2023.01

Designed a real-time AI assistant for sales conversations.
The system analyzed customer speech during the call and surfaced key signals such as:

- budget
- family situation
- target vehicle
- financing intent

### System Architecture

- Frontend: PowerApps / Flutter
- API gateway: WebSocket
- Backend: Lambda (Python)
- Speech processing: Azure Speech SDK
- Morphological analysis: MeCab
- Text analysis: Azure Text Analytics
- Storage: RDS / S3
- Output: live indicators on the frontend

### Key Technologies

- AWS Lambda
- Azure Speech SDK
- Azure Text Analytics
- Python
- WebSocket
- MeCab
- RDS

### Engineering Challenges

- Real-time speech streaming
- Speaker separation
- Timestamp alignment across services
- Lambda lifecycle recovery
- Multi-service orchestration

### Technical Highlights

- Combined speech recognition and language analysis in a streaming workflow
- Used a hybrid cloud setup with Azure Speech for transcription and AWS Transcribe for speaker diarization
- Aligned results from multiple speech services using timestamp-based fusion
- Normalized timestamp differences between 100ns ticks and second-based outputs
- Distinguished customer speech from salesperson speech
- Designed checkpoint-based recovery for unstable Lambda lifecycles
- Decoupled high-frequency audio streaming from lower-frequency business logic
- Reassembled WebM audio chunks inside Lambda and converted them into continuous streams for recognition
- Defined a message protocol for multi-Lambda coordination
- Stored aggregated results in RDS

### Business Result

The sales team could see live indicators on the tablet while speaking with the customer.
This made the assistant useful as a real-time sales copilot.

## 2. AI Workflow Refactoring for n8n + LLM
**Period:** 2025 Q3

I refactored a prediction workflow for better maintainability, observability, and cost control.

### Technical Work

- Split large workflows into smaller stages
- Reduced workflow execution time from hours to minutes
- Lowered token consumption and operating cost
- Improved observability and maintainability
- Moved complex business logic into backend services for better scalability
- Added automation around repeatable steps

### Architecture Notes

- Replaced serial, one-record-at-a-time processing with staged batch execution
- Moved payload thinning and validation into the backend layer before model calls
- Used workflow nodes for orchestration, not for heavy business logic

### Technical Outcome

The implementation reduced end-to-end execution time from roughly 3 hours to about 8 minutes and lowered operating cost to around $0.13 per run.
The workflow also became easier to operate, debug, and extend.

## 3. LLM-Driven Engineering for Large Systems
**Period:** 2025.08 - 2026.01

I used LLM tools to accelerate understanding and delivery across backend, web, network, and cloud systems.

### Main Activities

- Accelerated understanding of unfamiliar codebases
- Decomposed large tasks into executable engineering steps
- Troubleshot across backend, frontend, and infrastructure boundaries
- Used LLM-based tools to speed up code comprehension and implementation
- Recovered system context faster during multi-project delivery
- Kept the AI role as an engineering multiplier, not a replacement for design judgment

### Tooling

- Claude Code
- OpenAI models
- Kilo Code
- GLM

### Practical Positioning

I worked as a senior backend engineer and used AI tools to accelerate implementation, explanation, and learning.
In practice, this meant I could handle backend work and the necessary frontend or integration work when needed.

## Summary

My AI experience focuses on production AI systems and AI-enabled software engineering.

The common pattern across these projects is:

- combining AI services, cloud platforms, and real-time systems
- integrating speech, text, workflow, and backend components
- solving reliability, latency, and maintainability problems
- delivering production-grade systems
- using AI as a force multiplier for software engineering
