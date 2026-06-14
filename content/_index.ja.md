---
title: "複雑システムを扱う AI / Backend エンジニア"
date: 2026-05-27
draft: false
hidemeta: true
comments: false
description: "技術担当者向けに、AI Engineering、Backend、Reliability、Distributed Systems の実績を簡潔に見せる日本語ホーム。"
disableShare: true
disableHLJS: false
---

# 複雑システムを扱う AI / Backend エンジニア

技術担当者が最初に見ることを意識した、日本語の入口ページです。  
AI Engineering、Backend、Reliability、Distributed Systems を中心に、実務で何をやってきたかを短く整理しています。

### Quick Navigation

- [About](#about)
- [希望条件](#希望条件)
- [技術スタック](#技術スタック)
- [職務経歴](#職務経歴)
- [GitHub](#github)
- [個人ホームページ](#個人ホームページ)
- [代表ケース](#代表ケース)

## About

複雑な既存システムの整理、安定化、近代化を得意とするエンジニアです。  
最近は AI Workflow、Backend、Platform、Legacy Modernization を一体で扱う案件が中心です。

コード、ログ、実行時挙動から構造を逆算し、再現、切り分け、修正、再発防止までを一貫して扱います。  
AI についても、デモではなく production workflow として、入力整形、モデル選択、失敗時制御、監視まで含めて設計します。

## 希望条件

- Platform / Backend
- SRE / Reliability
- AI Platform / AI Workflow
- Legacy Modernization
- Distributed Systems
- Technical Lead 寄りの立ち位置

## 技術スタック

- Go / Python / TypeScript
- Linux / Docker / AWS
- Kafka / MQTT / WebSocket
- MySQL / Redis
- n8n / AI Workflow
- OAuth2 / JWT
- Cypress / E2E
- GitHub / CI/CD

## 職務経歴

### AI ワークフロー最適化

n8n + LLM を使った大規模予測ワークフローの最適化。

- Payload reduction: 14KB → 5KB
- batching を使った workflow 再設計
- Dual-model routing (Kimi K2 + GLM)
- Token cost reduction
- Runtime reduction: 3h → 70-120min
- Telegram auto-alert integration
- Retry / fail-safe を含む workflow 最適化

AI を demo ではなく production workflow として扱う実務ケースです。

### フロントエンド安定化 / 本番障害対応

引き継ぎ直後の Vue 3 + TypeScript 製 IM フロントエンドを、実行時解析と原子的修正で安定化。

- Refresh 時の強制ログアウト修正
- WebSocket ライフサイクル整理
- Cypress / Vitest の安定化
- Snowflake ID の精度対策
- 70 件超の critical issue を数日で安定化

### レガシー産業システム救火 / 本番安定化

Qt 4.7.3 + VS2003 ベースのレガシー SCADA システム。UI よりも build recovery、GDI crash 解析、運用安定性を重視。

- Linux / Windows 混在の本番環境
- SCADA テレメトリと可視化
- マルチスレッドと長時間稼働の安定性
- レガシー OCX / Formula One 依存
- build chain 復旧とトラブルシュート

### SD-WAN アーキテクチャ調査 / 制御プレーン設計

エッジ機器とクラウド制御系をつなぐ SD-WAN 基盤の実現可能性調査。

- OpenDDS, RabbitMQ, EMQX/MQTT の用途分離
- TLS-PSK と active-online control による安全な接続
- YANG ベースの interface model 化
- VPP / DPDK / QUIC / BBR による転送最適化

### Spring Boot データ取り込み高速化

スポーツデータ同期基盤を、バッチ UPSERT と索引設計で再構成し、500件同期を 70 秒から 1.5 秒へ短縮。

- バッチ UPSERT
- 索引最適化
- Strategy Pattern による分離
- MDC / Testcontainers による可観測性と検証

### Toyota OMRM / リアルタイム AI プラットフォーム

AWS + Azure のハイブリッド構成で、リアルタイム音声解析、話者属性、会話インテリジェンスを統合した AI プラットフォーム。

- WebSocket / Serverless streaming
- ハイブリッドクラウド AI オーケストレーション
- クロスクラウドのタイムライン整合
- ライブコーチング + 通話後分析

語音認識だけでなく、複数 AI サービスの協調と分散整合性を扱う事例です。

### レガシープラットフォーム発掘と近代化

20年以上運用された外為トレーディング基盤を逆解析し、HP-UX から RHEL への移行に向けたシステム知識モデルを再構築。

- 逆解析
- データリネージ再構築
- 依存関係発見
- 移行リスク低減

ドキュメントと現実が乖離したレガシー基盤で、発掘から近代化までを支えた事例です。

## GitHub

- [starwar6160 / GitHub](https://github.com/starwar6160)
- [プロジェクトソース例: web3-indexer-go](https://github.com/starwar6160/web3-indexer-go)

## 個人ホームページ

- [https://portfolio.st6160.click/](https://portfolio.st6160.click/)
- [日本語ポートフォリオ](/ja/portfolio-ses/)
- [高難度実績索引](/ja/docs/high-difficulty-ses-index/)

## 代表ケース

技術担当者が見たときに、背景の広さと深さが伝わりやすい順に並べています。

- [AI パイプライン再設計](/ja/cases/ai-pipeline-re-architecture/)
- [フロントエンド安定化事例](/ja/cases/frontend-stabilization-production-pressure/)
- [産業用 Qt システム事例](/ja/cases/industrial-qt-system-development/)
- [SD-WAN 事例](/ja/cases/sdwan-architecture-feasibility/)
- [Spring Boot データ取り込み高速化](/ja/cases/spring-boot-data-ingestion-acceleration/)
- [Toyota OMRM / リアルタイム AI プラットフォーム](/ja/cases/toyota-omrm-ai-platform/)
- [レガシープラットフォーム発掘と近代化](/ja/cases/legacy-platform-discovery-modernization/)

## Why This Matters

技術プロフィールでは、営業経由の言い回しよりも、工程化された技術情報のほうが先に効きます。  
そのためこのページでは、次の順番で伝わるようにしています。

1. まず About で、何のタイプのエンジニアかを示す
1. 次に 希望条件 で、受けたい領域を明示する
1. 技術スタック で、現実的な接続点を見せる
1. 職務経歴 で、実際の改善・安定化実績を置く
1. GitHub と 個人ホームページ で、詳細を自分で確認できるようにする

## Continue Exploring

- [ポートフォリオ詳細](/ja/portfolio-ses/)
- [実績索引](/ja/docs/high-difficulty-ses-index/)
- [プロジェクト一覧](/ja/projects/)
- [技術ブログ](/docs/)
- [フロントエンド安定化事例](/ja/cases/frontend-stabilization-production-pressure/)
- [産業用 Qt システム事例](/ja/cases/industrial-qt-system-development/)
