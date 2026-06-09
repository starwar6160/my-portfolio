---
title: "VC Experience / Windows Legacy Systems"
date: 2026-06-09
description: "Windows C++ experience across Win32, MFC, ATL, ActiveX/COM, WinCE, Qt, embedded security, industrial communication, and legacy modernization."
categories: ["Documents"]
tags: ["Visual C++", "Windows", "Legacy", "Embedded", "Security"]
---

# VC Experience / Windows Legacy Systems

This page is the compact proof layer for my Visual C++ background.

It covers more than a decade of Windows and embedded C++ work across desktop clients, device integration, security products, industrial systems, and legacy recovery.

## Executive Summary

- 15+ years across Visual C++ 6 through VS2010
- Roughly 2005 to 2020
- Focused on financial systems, industrial equipment, SCADA, and embedded security, with frequent legacy-system analysis and extension work.
- Win32 / MFC / ATL / COM / ActiveX / OCX
- WinCE / ARM / embedded security
- Qt / SCADA / industrial visualization
- CNC trajectory visualization and legacy system recovery
- Source-code analysis and non-rewrite rescue work

I am not just a Windows application developer. The broader fit is legacy system analysis, embedded security, industrial systems, cryptographic products, and vehicle-adjacent Qt/C++ work.

## High Consequence Systems

The stronger summary of my career is that I have spent most of it in systems where failure is expensive.

Industries I have worked across:

- Telecom switching
- Cryptography
- Banking
- Power SCADA
- Energy internet
- Securities
- Foreign exchange
- Vehicle systems
- AI voice analytics

The common pattern is not feature velocity. It is designing for reserve capacity, recovery, traceability, and no-false-action behavior under abnormal conditions.

That means paying attention to:

- Whether the state machine closes cleanly
- Whether data stays consistent
- Whether abnormal paths are covered
- Whether restart, resend, and rollback are safe
- Whether failures can be traced after the fact

This mindset maps naturally to telecom, power, SCADA, vehicle systems, and authentication platforms, where conservative behavior is usually the correct default.

## Core Positioning

- Senior C++ / Visual C++ engineer
- Windows client and legacy system specialist
- ActiveX / COM / OCX implementation and integration
- WinCE and embedded security engineering
- Industrial communication and protocol boundary work
- Legacy modernization and rescue of aging production systems

## What I Worked On

- Win32 API applications
- MFC and ATL-based desktop software
- ActiveX / OCX controls
- COM interface design and integration
- Windows services
- USB / HID device communication
- Serial communication
- SQLite and SQL Server client software
- Embedded cryptography and secure device software
- Qt-based industrial applications
- Legacy build recovery and migration support

## Representative Projects

### Aerospace CNC System

VC6, MFC, ActiveX, OpenGL, and ANSI C were used to build an industrial CNC trajectory visualization tool.

What that means in practice:

- OpenGL embedded into an ActiveX viewport
- High-precision curve generation algorithms
- Curve smoothing
- Floating-point optimization in C
- Real-time machining-path rendering
- Used in a live aerospace CNC machining simulation workflow

This is materially stronger than generic "I can draw 3D graphics" experience. It sits on the chain from algorithm to embedded viewport integration.

### Embedded Security Products

WinCE and ARM-based security work with cryptography and authentication products.

- RSA / ECC / SM2 / SM3 / SM4 / SM9
- OTP dynamic passwords
- Secure device software
- ARM runtime debugging

### Financial Authentication Systems

VC++ work for banking security products, PKI-related tooling, and authentication platforms.

- RSA
- ECC
- OTP
- PKI
- Banking security
- Authentication infrastructure

### Industrial SCADA / Visualization

Qt 4.x and legacy Windows environments for long-running monitoring and visualization systems.

- Wind power monitoring systems
- Long-running continuous operation environments
- OpenGL visualization
- Large-scale data rendering performance improvements
- Legacy code analysis and stabilization

### Financial / Authentication Systems

VC++ work for financial authentication products, cryptography libraries, and banking security products.

- RSA
- ECC
- OTP
- PKI
- WinCE
- ARM

### Legacy Windows Rescue

Old VC6 through VS2010 assets that needed analysis, recovery, and risk reduction rather than rewrites.

- Source-code analysis
- Black-box investigation
- Build-chain recovery
- Avoiding full rewrites

## Representative Experience Clusters

### Windows Desktop and Client Development

Long-running Visual C++ work across VC6, VS2003, VS2005, VS2008, and VS2010.

Typical topics:

- Win32 application design
- MFC / ATL client development
- Multi-threaded desktop software
- Browser integration with ActiveX
- Device management tools
- Security client applications

### ActiveX / COM / OCX

This is one of the rarest parts of the background.

Typical work:

- In-house OCX control development
- COM interface design
- ATL and MFC framework selection
- IE integration
- JavaScript and ActiveX interoperability
- USB security device wrapper design

Representative artifacts:

- `JCELock16.ocx`
- Bank control replacement work
- IE6 to IE11 compatibility handling
- COM event handling and BSTR / VARIANT debugging

### WinCE and Embedded Security

From 2005 through the early 2010s, a large part of the work sat in the WinCE and embedded security layer.

Typical topics:

- VS2005 / VS2008 / EVC4
- WinCE 5.0 / WinCE 6.0
- ARM cross-compilation
- OpenSSL and MIRACL porting
- SM9 implementation
- DLL and static library builds
- CRT compatibility layers
- ARM runtime debugging

Representative systems:

- SM9 cryptography library
- Identity-based cryptography systems
- WinCE security terminals
- ARM-based secure devices

### Cryptography and Security Products

Visual C++ was the main implementation layer for security-oriented products.

Typical topics:

- RSA
- ECC
- ECIES
- SM2
- SM3
- SM4
- SM9
- OTP dynamic passwords

Representative systems:

- Banking dynamic password authentication
- ATM authentication systems
- Offline password lock management
- PKI-related tooling
- Key management platforms

### Qt and Legacy Industrial Systems

Later work moved into Qt-based systems while still staying close to Visual C++ and legacy Windows environments.

Typical topics:

- Qt 4.7.3 / Qt 4.8 / Qt 5
- Qt Widgets and signal-slot architecture
- OpenGL-based visualization
- MFC and Qt hybrid systems
- Legacy SCADA recovery

Representative systems:

- Industrial SCADA platforms
- Wind power monitoring systems
- Large-scale real-time visualization
- Offline lock management systems

### Industrial Communication and Device Control

Many projects involved direct interaction with devices and long-lived field equipment.

Typical topics:

- TCP/IP
- UDP
- USB HID
- Serial ports
- CAN
- FTP / SFTP
- Firmware upgrade flows
- Board control and device monitoring
- State machine design for protocol workflows

### Legacy Rescue and Migration

This is the work pattern that still matters in current markets.

Typical tasks:

- Source-code analysis
- Black-box investigation
- Analyzing million-line C++ codebases
- Maintaining VS2003-era systems
- Repairing build chains
- Restoring lost build environments
- Qt 4 to Qt 5 migration support
- Debugging release/debug differences
- Reducing risk without a full rewrite

## Why This Experience Still Sells

The market value is not just "I know MFC."

The stronger signal is that I can work across:

- Legacy Windows client recovery
- ActiveX / COM boundary debugging
- Source-code analysis and black-box recovery
- WinCE and ARM embedded constraints
- Security product implementation
- Industrial communication and device control
- Qt-based modernization without destabilizing operations

That combination is hard to find, and it maps well to teams that inherit old code, old toolchains, and old operational risk.

## Read This First

If you want to present this experience quickly, lead with:

1. Legacy Windows client recovery
1. ActiveX / COM / OCX
1. WinCE and embedded security
1. Qt and industrial systems
1. Device communication and protocol boundaries

Then add the concrete stack only after the reader understands the category.

## Vehicle and Embedded Hooks

This background also maps naturally to vehicle and embedded work.

- Vehicle Linux
- CAN
- Embedded C++
- Long-life system maintenance
- Industrial control integration

The marketable message is not "I know old tools." It is that I can keep important legacy systems working without destabilizing production.

## Suggested Keywords

- Visual C++
- Win32
- MFC
- ATL
- ActiveX
- COM
- OCX
- WinCE
- Embedded Security
- Qt
- SCADA
- Industrial Communication
- Legacy Modernization
- Windows Services
- USB HID
- ARM

## Continue Exploring

- [Deep Technical Archive](/docs/deep-technical-archive/)
- [Homepage](/)
- [Case Index](/docs/high-difficulty-ses-index/)
