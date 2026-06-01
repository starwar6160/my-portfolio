---
title: "Frontend Stabilization Under Production Pressure"
date: 2025-12-18
categories: ["Case Studies"]
tags: ["Vue 3", "TypeScript", "WebSocket", "Cypress", "Vitest", "Reliability", "Debugging", "AI-assisted engineering"]
description: "Stabilizing an inherited Vue 3 and TypeScript IM frontend by tracing runtime failures, fixing auth and websocket races, and removing precision and testing blockers."
---

# Frontend Stabilization Under Production Pressure

## Context

In late 2025, I temporarily took over a problematic Vue 3 + TypeScript IM frontend after the previous frontend developer left.

The system had accumulated several P0/P1 issues that were blocking business-side testing and making the client experience unpredictable:

- Refresh triggered forced logout
- WebSocket connections were unstable
- UI flows deadlocked during loading and retry transitions
- Random white screens appeared under normal usage
- Cypress automation failed intermittently
- Authentication state raced against async UI updates
- Frontend state diverged from backend contracts
- Int64 and Snowflake IDs were at risk of precision loss in JavaScript

## Constraints

I was not the dedicated frontend specialist on this project.

I also did not have time to manually read the entire codebase line by line. The work had to be done under production pressure, with limited context and a need to keep the system moving.

## Debugging Method

Instead of starting with a large refactor, I worked from runtime evidence:

- Production logs and error traces
- Browser behavior during failure reproduction
- Network timing and request ordering
- State transition inspection in the client
- Cypress failures and their point of divergence

I treated the frontend like a backend incident:

- Reproduce the failure
- Identify the state transition boundary
- Validate the contract at runtime
- Apply a small isolated patch
- Re-test the exact path before moving on

## Engineering Approach

I used AI as a code analysis and implementation accelerator, not as a source of truth.

The workflow was:

1. Inspect logs, traces, and runtime behavior first
2. Give multiple LLMs precise engineering instructions
3. Review the proposed patch against the observed failure mode
4. Apply atomic commits with narrow scope
5. Re-run automated tests and browser checks

This mattered because the codebase had multiple coupled failure modes. A broad rewrite would have introduced more instability than it removed.

## Stabilization Work

### Auth and session flow

- Fixed forced logout paths during refresh
- Synchronized authentication state with async UI initialization
- Removed races between token refresh, route guards, and in-memory session state

### WebSocket lifecycle

- Cleaned up connection lifecycle handling
- Closed stale sockets explicitly
- Prevented duplicate subscriptions and inconsistent reconnect behavior

### UI state reliability

- Stabilized loading and retry transitions
- Removed deadlock conditions in long-running screens
- Tightened async state updates so the UI stayed consistent with request state

### Contract validation

- Added runtime schema checks around unsafe payloads
- Normalized data at the boundary instead of trusting UI-local assumptions
- Introduced an ID normalization layer for Snowflake-safe handling

### Test stabilization

- Hardened Cypress flows around timing-sensitive screens
- Stabilized Vitest coverage for the logic paths that were failing most often
- Used failing tests as regression locks after each fix

## Architecture Notes

The main lesson was that the frontend was not failing because of one isolated bug. It was failing because several layers had drifted out of sync:

- Authentication state was not a single source of truth
- WebSocket lifecycle behavior was not deterministic
- Async UI transitions were not guarded at the contract boundary
- Numeric identity values were being handled too loosely for the system's backend format

The fixes followed backend-style reliability thinking:

- Define the boundary
- Normalize data at the edge
- Make state transitions explicit
- Keep patches small enough to validate quickly

## Results

- More than 70 critical issues were stabilized within several days
- Frontend tests became significantly more reliable
- Random failures dropped sharply
- UI behavior became predictable enough for further QA and testing
- Major blockers for business-side verification were removed

## Tags / Keywords

- Vue 3
- TypeScript
- WebSocket reliability
- authentication race conditions
- runtime schema validation
- Cypress stabilization
- Vitest
- frontend incident response
- AI-assisted code review
- atomic patch workflow
- Snowflake ID precision
- production debugging

