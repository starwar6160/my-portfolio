---
title: "SD-WAN Architecture Feasibility Study and Control-Plane Design"
date: 2026-06-06
categories: ["Case Studies"]
tags: ["SD-WAN", "Network Architecture", "Zero Trust", "MQTT", "RabbitMQ", "OpenDaylight", "YANG", "VPP", "DPDK", "QUIC", "BBR"]
description: "Feasibility research for an SD-WAN platform, covering control-plane messaging, zero-trust access, YANG-based interface modeling, and edge forwarding performance tuning."
---

# SD-WAN Architecture Feasibility Study and Control-Plane Design

## 1. Project Context

In the first three months of the SD-WAN effort, I was responsible for feasibility research, architecture selection, and prototype validation for a platform that had to connect a large number of edge devices to a cloud-side control system.

The work was not a single implementation task. It was an architecture selection problem under real constraints:

- device identity and anti-clone protection
- secure transport without heavy certificate management
- control-plane consistency across multiple languages and teams
- edge forwarding performance under weak or high-loss networks
- interface definitions that could not rely on ambiguous spreadsheets

The result was a practical architecture foundation for a cloud-controlled, edge-forwarding SD-WAN design.

## 2. Messaging Backbone and Control-Plane Selection

The first question was how to move configuration and state between the cloud control plane and the edge.

### OpenDDS: technically interesting, operationally too heavy

I researched OpenDDS for hard-realtime communication and RTPS-based transport. The protocol stack was promising in theory, especially for very low-latency communication, but the build and integration path was too expensive for a WAN-oriented system:

- steep learning curve
- complex IDL-driven coupling
- difficult cross-platform build and toolchain management
- too much implementation cost for an environment that needed fast iteration

OpenDDS remained a possible fit for constrained or LAN-style scenarios, but it was not the right base for this SD-WAN design.

### RabbitMQ and EMQX: split by workload

I then separated the messaging responsibilities by use case:

- `RabbitMQ` for configuration synchronization, where delivery semantics and atomicity mattered most
- `EMQX` with `MQTT` for lightweight device state reporting, where scale and low overhead mattered more than heavy transaction semantics

That split matched the system better than forcing one queueing model to carry every kind of traffic.

### Container networking cleanup

I also validated container networking overhead and found that Docker bridge-mode NAT became a bottleneck under concurrency. Moving the gateway layer to host networking removed that cost and raised single-node API gateway throughput from around 50k QPS to 150k+ QPS.

That decision was simple, but important: the control plane could not be designed as if network translation were free.

## 3. Security Architecture and Device Identity

The second problem was trust.

The target environment needed a secure access model that avoided the operational weight of full certificate lifecycle management while still preventing cloning and replay attacks.

### VSA and active-online control

I designed a distributed authentication server layer, referred to in the study as `VSA`, with an active-online control policy:

- when a new device comes online, the old session is displaced
- the system can detect and suppress duplicate or cloned device identity
- the trust model stays simple enough for large-scale edge deployment

To protect root secrets, I combined that with `Shamir` threshold secret sharing. The goal was not academic elegance. The goal was to keep the root key difficult to extract or duplicate while preserving operational manageability.

### TLS-PSK over mTLS

I evaluated mTLS, but certificate management and CPU cost were a poor fit for embedded edge devices.

I settled on `TLS-PSK` instead:

- lower CPU overhead than X.509-heavy TLS
- no certificate issuance and renewal workflow for every device
- lighter implementation cost on constrained hardware
- still provides encrypted transport and shared-secret authentication

For this use case, PSK was the better engineering tradeoff.

### OpenDaylight validation

To confirm the SDN control-plane direction, I tested `OpenDaylight` containerized deployment and southbound interface feasibility, including `OpenFlow` and `NETCONF`.

The key result was not just "it runs." It was that the modular `Karaf`-based structure made it practical to validate a lightweight control-plane abstraction without locking the architecture into a single vendor model.

## 4. Data Modeling and Interface Standardization

One of the fastest ways to create long-term pain in a distributed system is to let interface definitions live in spreadsheets.

I treated that as a design smell and replaced it with explicit modeling.

### Excel to YANG to JSON Schema

The workflow became:

`Excel -> YANG -> JSON Schema`

This let the team move from informal interface descriptions to a machine-readable model that could be validated and reused across components.

Using `pyang` and `libyang`, I built a pipeline that reduced ambiguity and kept control-plane and forwarding-plane definitions aligned. The practical result was a reported 40% reduction in communication cost because developers no longer had to reinterpret every field manually.

That was the main value of the modeling layer: fewer arguments, fewer mismatches, fewer hidden assumptions.

## 5. Edge Forwarding and Transport Resilience

The edge data plane had to do real work. It was not enough to move packets. It had to keep moving them under imperfect network conditions.

### VPP and DPDK for high-performance forwarding

On the forwarding side, I validated `FD.io VPP` with `DPDK` to remove avoidable kernel overhead and keep the packet path efficient.

This was paired with `Intel QAT` hardware acceleration to offload expensive cryptographic work where possible. In the study, RSA verification reached about 55k ops/s with QAT acceleration, which directly addressed the bottleneck that a software-only forwarding path would have hit.

### Weak-network transport

For cross-border or otherwise unstable links, I evaluated `UDP/QUIC` transport and `BBR` congestion control.

The practical finding was that QUIC handled weak-network conditions better than a plain TCP-based assumption set. The architecture also used an `Ali-HK` transit node to provide a more reliable path for cross-border development and operations.

The core idea was simple:

- let the control plane be precise
- let the edge plane be fast
- let the transport layer survive bad networks instead of pretending they do not exist

## 6. Architecture Summary

The research converged on a coherent SD-WAN shape:

- cloud-centralized control
- edge high-performance forwarding
- lightweight secure access
- explicit interface modeling
- transport choices tuned for weak or lossy links

In other words, this was not just a collection of technologies. It was a system design with clear separation of concerns.

## 7. What This Work Proved

This feasibility study proved that the SD-WAN architecture could be built around practical engineering constraints instead of idealized assumptions.

- `OpenDDS` was not the right fit for the WAN control path
- `RabbitMQ` and `EMQX/MQTT` fit different message classes better than a single transport everywhere
- `TLS-PSK` was a more operationally realistic access model than certificate-heavy mTLS
- `YANG` brought needed discipline to interface definition
- `VPP + DPDK + QAT` made the edge forwarding path viable
- `QUIC + BBR` improved the story for weak or unstable links

## 8. Concise Resume Bullets

- Led feasibility research and architecture selection for an SD-WAN platform connecting edge devices to a cloud control plane.
- Evaluated `OpenDDS`, `RabbitMQ`, `EMQX/MQTT`, `OpenDaylight`, `YANG`, `VPP`, `DPDK`, `QUIC`, and `BBR` to define a practical control-plane and forwarding-plane architecture.
- Designed a zero-trust access approach using `TLS-PSK`, active-online device control, and `Shamir` threshold secret sharing to reduce clone and replay risk.
- Built an `Excel -> YANG -> JSON Schema` interface modeling workflow that reduced ambiguity and cut communication cost by about 40%.

## 9. Homepage Summary Card

SD-WAN feasibility and architecture work focused on cloud control, secure edge onboarding, YANG-based interface modeling, and high-performance forwarding under weak-network conditions.

## 10. Technical Tags

- SD-WAN
- Network architecture
- Zero trust
- RabbitMQ
- EMQX
- MQTT
- OpenDaylight
- YANG
- VPP
- DPDK
- Intel QAT
- QUIC
- BBR
- TLS-PSK

## 11. SEO Keywords

- SD-WAN architecture feasibility study
- cloud control plane design
- edge forwarding performance tuning
- zero trust device onboarding
- YANG interface modeling
- OpenDaylight validation
- VPP DPDK edge routing
- QUIC weak network transport
- TLS-PSK device authentication
- network control-plane design
