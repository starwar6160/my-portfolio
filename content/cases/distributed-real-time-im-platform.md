---
title: "Distributed Real-Time IM Platform"
date: 2026-06-16
categories: ["Case Studies"]
tags: ["Go", "Microservices", "Kafka", "MQTT", "Redis", "WebSocket", "Distributed Systems", "Real-time Messaging"]
description: "Designed and implemented a Go-based distributed IM platform with microservices, Kafka, EMQX, Redis, MySQL, MongoDB, and WebSocket support, reaching 16,000+ concurrent connections per node under constrained memory."
---

# Distributed Real-Time IM Platform

<a href="https://r2.st6160.click/616GolangIM_Large.jpg" target="_blank" rel="noopener noreferrer">
  <img alt="Distributed Real-Time IM Platform" loading="lazy" decoding="async" src="https://r2.st6160.click/616GolangIM_Large.jpg">
</a>

## Executive Summary

The company originally depended on a third-party IM provider. That made the business expensive to operate and limited how much the messaging experience could be customized.

I worked on a self-owned enterprise IM platform built with Go microservices so the team could control the stack directly and extend the system over time.

The target scope included:

```text
1-on-1 chat
Group chat
File transfer
Web real-time messaging
Microservice architecture
Future audio/video expansion
100,000+ user design target
Sub-100ms message latency
```

## What I Built

I co-designed the platform architecture and worked with the Tech Lead on the main service boundaries:

```text
user-service
message-service
group-service
file-service
gateway-service
realtime-service
```

The frontend stack used:

```text
Vue 3
TypeScript
```

The backend and infrastructure stack used:

```text
Go
MySQL
Redis
MongoDB
Kafka
EMQX (MQTT)
WebSocket
Docker
Kubernetes
```

## Core Engineering Work

### Realtime Messaging

I helped design and implement the realtime path for:

```text
WebSocket long connections
Online status management
Heartbeat detection
Asynchronous message push
```

Kafka and EMQX were used to fan out messages asynchronously and reduce coupling between services.

The result was:

```text
16,000+ concurrent connections per node
Sub-100ms latency
Stable operation in an 8GB memory environment
```

### Distributed Consistency

One of the most important parts of the project was ensuring consistency in event-driven workflows.

In Group Service, I introduced and applied:

```text
Outbox Pattern
Event Forwarder
Redis Pub/Sub delivery
```

This was used to keep business operations and event publication aligned for operations such as:

```text
Group creation
Group updates
Group avatar changes
```

The flow looked like this:

```text
MySQL transaction
↓
Business data write
↓
Outbox event write
↓
Commit
↓
Event Forwarder
↓
Kafka / Redis
↓
Downstream consumers
```

### Group Module Delivery

I also worked on the group avatar update API:

```http
PUT /api/v1/groups/:id/avatar
```

That work included:

```text
Owner permission checks
Admin permission checks
Transaction handling
Event publishing
CI test fixes
```

### Engineering Cleanup

The project also had a lot of legacy engineering friction:

```text
gRPC dependency conflicts
Git history contamination
CI/CD build failures
Broken tests
```

I helped clean that up through:

```text
Test repairs
Makefile improvements
Clean-branch migration
PR-ready delivery
```

## Why This Case Matters

This is not a simple CRUD project.

It combines:

```text
Go microservices
Realtime messaging
Kafka
MQTT
Redis
WebSocket
Distributed consistency
Event-driven architecture
High-concurrency IM
```

For backend and platform teams, the useful signal is not just "can code in Go."

The stronger signal is that I can help design, implement, stabilize, and ship a distributed realtime system under real constraints.

## Interview-Friendly Summary

> Co-designed and implemented a distributed real-time messaging platform using Go microservices, Kafka, EMQX (MQTT), Redis, MySQL and MongoDB. Designed event-driven workflows with Outbox Pattern and Event Forwarder to guarantee transactional consistency. Delivered group management, realtime messaging and WebSocket services supporting 16,000+ concurrent connections per node with sub-100ms latency under constrained 8GB memory environments.

