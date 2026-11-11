---
title: "周伟｜资深后端与复杂系统工程师"
date: 2026-11-10
draft: false
hidemeta: true
comments: false
description: "23年软件工程经验：复杂系统诊断与改造、性能优化、AI 工程化。常驻日本，可与中文团队远程协作。"
disableShare: true
disableHLJS: false
---

# 周伟｜资深后端与复杂系统工程师

**23年软件工程经验 · 复杂系统诊断与改造 · 性能优化 · AI 工程化**

常驻日本横滨，长期从事后端平台、分布式系统、工业软件、嵌入式及复杂既有系统的开发与维护。擅长接手缺少文档的陌生系统，从运行时行为、数据链路、协议边界和架构约束入手，解决性能、稳定性、兼容性和技术债务问题。

可与中文团队开展远程开发、技术攻坚和长期工程合作。合作咨询请见 **[联系方式 →](/zh/contact/)**

### 关注领域

- 后端平台与分布式系统
- 生产系统故障定位与性能优化
- AI / LLM 工作流工程化
- 复杂既有系统接管与现代化

## 代表性成果

各案例为相互独立的项目，数字对应各自的场景，不可合并理解。暂无中文版的页面会标注语言。

- **[Spring Boot 数据同步性能优化](/zh/cases/spring-boot-data-ingestion-acceleration/)**<br>
  500 条记录同步耗时约 70 秒 → 1.5 秒。批量 Upsert、复合唯一索引、策略模式拆分。
- **[工业遥测平台（Elasticsearch）](/zh/cases/energy-cloud-governance/)**<br>
  107 亿+ 条记录规模下，查询延迟由数秒级降至 65–137ms。通过跨层性能分析定位存储虚拟化瓶颈。
- **[Go 分布式实时 IM 平台](/zh/cases/distributed-real-time-im-platform/)**<br>
  单节点 16,000+ 并发连接（8GB 内存环境）。Go 微服务、Kafka、EMQX、Outbox Pattern。
- **[AI 工作流重构](/zh/cases/ai-pipeline-re-architecture/)**<br>
  约 500 条记录的单次运行由约 160–180 分钟缩短至约 8 分钟。批处理、输入压缩、模型路由、死信队列。
- **[Vue 3 / TypeScript 生产系统稳定化](/zh/cases/frontend-stabilization-production-pressure/)**<br>
  数天内稳定 74+ 项关键问题，提交 120+ 个原子化修复。运行时调试、状态归属梳理、Cypress 回归测试。
- **[遗留平台发现与现代化](/zh/cases/legacy-platform-discovery-modernization/)**<br>
  为运行 20 年以上的外汇交易平台的 HP-UX → RHEL 迁移重建系统知识模型。
- **[工业 SCADA 系统稳定化](/cases/industrial-qt-system-development/)（英文）**<br>
  恢复 Qt 4.7 / VS2003 构建链，绘图容量约 3 万点 → 约 10 万点。

## 核心能力

**后端平台与分布式系统**
微服务边界设计、事件驱动架构、Outbox Pattern、消息队列与实时推送。
<small>Go · Java / Spring Boot · Kafka · EMQX (MQTT) · WebSocket · Redis · Docker / Kubernetes</small>

**生产系统故障定位与性能优化**
从日志、网络时序和状态流转中定位根因；数据库往返、锁竞争和存储 I/O 瓶颈分析。
<small>MySQL · Elasticsearch · Esrally · fio · Linux</small>

**AI / LLM 工作流工程化**
将原型级 LLM 工作流改造为可运维的生产流水线：批处理、模型路由、数据血缘保持、失败隔离与告警。
<small>n8n · LLM API · MySQL · 实时语音 / 事件驱动平台</small>

**复杂既有系统接管与现代化**
文档缺失环境下的系统行为重建、依赖梳理和迁移风险评估；优先渐进式改造而非重写。
<small>HP-UX / RHEL · Oracle · Shell · C · Qt</small>

**数据库、检索与高吞吐数据处理**
批量写入、索引设计、分片与存储布局治理。
<small>MySQL · MongoDB · Elasticsearch · Redis</small>

**C/C++、嵌入式、工业协议与底层系统**
受限内存下的密码算法实现、USB HID 协议、ABI / 链接兼容性、Linux 内核裁剪。
<small>C/C++ · Win32 / MFC / COM · 嵌入式 · [SM9 低资源实现（英文）](/projects/sm9-low-level/) · [USB HID 协议（英文）](/projects/usb-hid-protocol/)</small>

**Web3 基础设施及安全分析**
硬件钱包固件架构审查、RWA 协议设计审计、恶意招聘代码分析、链上数据索引。
<small>[OneKey 固件审计（英文）](/cases/onekey-hardware-wallet-firmware-audit/) · [RWA 协议审计（英文）](/cases/web3-rwa-audit/) · [Web3 Indexer（英文）](/projects/web3-indexer/)</small>

## 工作方式

- 先理解系统再动手：在缺少文档或技术债务较重的系统中，通过代码、日志和运行时行为重建实际结构。
- 以证据定位根因：复现 → 观察 → 确定故障边界 → 修复 → 验证，并用性能测量确认效果。
- 优先可验证、低风险、可回滚的改动：小步原子提交，避免高风险整体重写。
- 用 AI 工具提高分析、开发和测试效率，技术判断和最终结论由人工负责。
- 通过 Git、Issue、PR、文档、自动化测试和 CI/CD 进行协作。

## 合作方式

- 常驻日本，时区 JST（UTC+9）。
- 中文母语；可阅读英文技术文档并以英文进行书面协作。
- 偏好远程或远程优先的工程合作，习惯基于文档和代码评审的异步沟通。
- 可讨论长期开发、项目制交付及技术顾问等合作形式。

## 延伸阅读

- [技术案例（中文）](/zh/cases/)
- [技术项目](/zh/projects/)
- [技术文档](/zh/docs/)
- [英文简历 / Professional Dossier](/cv/)
- [English Home](/) · [日本語ホーム](/ja/)

## 联系

详细联系方式集中在 [联系方式](/zh/contact/) 页面。欢迎就远程开发、技术攻坚或长期合作进行沟通。
