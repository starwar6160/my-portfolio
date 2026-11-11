---
title: "Go 分布式实时 IM 平台"
date: 2026-06-16
categories: ["Case Studies"]
tags: ["Go", "Microservices", "Kafka", "MQTT", "Redis", "WebSocket", "Distributed Systems", "Real-time Messaging"]
description: "参与设计并开发基于 Go 微服务的自研 IM 平台，结合 Kafka、EMQX、Redis、MySQL、MongoDB 和 WebSocket，单节点在 8GB 内存环境下支持 16,000+ 并发连接。"
---

<a href="https://r2.st6160.click/616GolangIM_Large.jpg" target="_blank" rel="noopener noreferrer">
  <img alt="Go 分布式实时 IM 平台" loading="lazy" decoding="async" src="https://r2.st6160.click/616GolangIM_Large.jpg">
</a>

## 结果摘要

- 单节点 **16,000+ 并发连接**，在 **8GB 内存**环境下稳定运行
- 消息延迟低于 100ms（与设计目标一致）
- 在群组服务中引入 Outbox Pattern + Event Forwarder，保证业务写入与事件发布的一致性
- 清理 gRPC 依赖冲突、CI 构建失败和失效测试，以干净分支交付可合并的 PR

> 角色说明：与 Tech Lead 共同推进架构设计，负责实时通信链路、群组模块和工程清理等部分的设计与实现。

## 项目背景与约束

公司原本依赖第三方 IM 服务，运营成本高、定制空间有限，因此启动自研企业级 IM 平台，目标是由团队直接掌控技术栈并持续扩展。

目标范围：

- 单聊、群聊、文件传输、Web 实时消息
- 微服务架构，后续可扩展音视频
- 设计目标：10 万+ 用户规模、消息延迟 <100ms

## 系统结构

服务划分：

```text
user-service / message-service / group-service
file-service / gateway-service / realtime-service
```

技术栈：后端 Go，前端 Vue 3 + TypeScript；MySQL、Redis、MongoDB、Kafka、EMQX (MQTT)、WebSocket；Docker、Kubernetes 部署。

## 关键问题与技术方案

### 1. 实时消息链路

负责设计和实现 WebSocket 长连接、在线状态管理、心跳检测和异步消息推送。通过 Kafka 和 EMQX 异步扇出消息，降低服务间耦合。

### 2. 分布式一致性

事件驱动架构的核心风险是：业务数据已提交但事件未发出，或事件已发出但业务回滚。在 Group Service 中引入：

- **Outbox Pattern**：业务数据与 Outbox 事件在同一个 MySQL 事务中写入
- **Event Forwarder**：事务提交后读取 Outbox，投递到 Kafka / Redis Pub/Sub

```text
MySQL 事务 → 业务数据写入 → Outbox 事件写入 → 提交
→ Event Forwarder → Kafka / Redis → 下游消费者
```

应用于群组创建、群组更新、群头像变更等操作。

### 3. 群组模块交付

实现 `PUT /api/v1/groups/:id/avatar`：群主 / 管理员权限校验、事务处理、事件发布，并修复相关 CI 测试。

### 4. 工程清理

项目存在 gRPC 依赖冲突、Git 历史污染、CI/CD 构建失败和失效测试。通过修复测试、改进 Makefile、迁移到干净分支，恢复了可交付的 PR 流程。

## 验证与结果

| 指标 | 类型 | 数值 |
| --- | --- | --- |
| 用户规模 | 设计目标 | 10 万+ |
| 消息延迟 | 设计目标 | <100ms |
| 单节点并发连接 | 项目结果 | 16,000+（8GB 内存） |
| 消息延迟 | 项目结果 | 低于 100ms |

项目结果的测试环境及测量条件未公开。

## 适用场景与工程价值

适用于即时通讯、实时推送、在线状态等长连接系统，以及需要保证“数据库写入 + 事件发布”一致性的事件驱动微服务。这个案例体现的不只是 Go 编码能力，而是在真实约束下参与设计、实现、稳定并交付分布式实时系统的能力。
