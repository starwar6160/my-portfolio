---
title: "分散リアルタイム IM プラットフォーム"
date: 2026-06-16
categories: ["Case Studies"]
tags: ["Go", "Microservices", "Kafka", "MQTT", "Redis", "WebSocket", "Distributed Systems", "Real-time Messaging"]
description: "Go マイクロサービスで社内 IM 基盤を自社開発し、Kafka / EMQX / Redis / MySQL / MongoDB / WebSocket を組み合わせて、1 ノードあたり 16,000+ 同時接続と百ミリ秒未満の遅延を実現した事例。"
---

# 分散リアルタイム IM プラットフォーム

<a href="https://r2.st6160.click/616GolangIM_Large.jpg" target="_blank" rel="noopener noreferrer">
  <img alt="分散リアルタイム IM プラットフォーム" loading="lazy" decoding="async" src="https://r2.st6160.click/616GolangIM_Large.jpg">
</a>

## まず適した職種

この案件は、営業・採用担当がまず次の職種に当てやすい内容です。

```text
Go バックエンドエンジニア
Platform Engineer
SRE
分散システムエンジニア
リアルタイム通信基盤エンジニア
メッセージング基盤エンジニア
Tech Lead 候補
```

技術責任者向けにも、単なる CRUD ではなく、分散システム・高並列・イベント駆動の案件として読めます。

## 営業・採用担当向け要約

- 既存の外部 IM サービス依存を減らし、自社で制御できる IM 基盤を Go で構築した案件です。
- 単聊、群聊、ファイル転送、Web リアルタイムチャットを対象にしています。
- 1 ノードあたり 16,000+ 同時接続、遅延は百ミリ秒未満を目標に設計しました。
- 主な技術は Go、Kafka、EMQX(MQTT)、Redis、MySQL、MongoDB、WebSocket です。
- 詳細な技術説明は以下をご確認ください。

## エグゼクティブサマリ

会社では、外部 IM サービスへの依存が続いていました。

そのため、コストとカスタマイズ性の両面で制約があり、自社で制御できる企業向け IM 基盤の開発が始まりました。

私は Go マイクロサービスを中心とした分散 IM プラットフォームの設計・開発に参画しました。

想定していた対象範囲は次の通りです。

```text
1 対 1 チャット
グループチャット
ファイル転送
Web リアルタイムチャット
マイクロサービス構成
将来的な音声・動画拡張
10 万+ ユーザー規模
メッセージ遅延 100ms 未満
```

## 役割と構成

Tech Lead と一緒に、主要サービスの境界設計と実装を進めました。

```text
user-service
message-service
group-service
file-service
gateway-service
realtime-service
```

フロントエンドは次の構成でした。

```text
Vue 3
TypeScript
```

バックエンドと基盤は次の構成でした。

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

## 技術的な担当内容

### リアルタイム通信

私は次のリアルタイム経路の設計・実装に関わりました。

```text
WebSocket 長接続
オンライン状態管理
ハートビート検知
非同期メッセージ配信
```

Kafka と EMQX を使い、メッセージの非同期 fan-out とサービス分離を実現しました。

結果として、次の状態を目標にできました。

```text
1 ノードあたり 16,000+ 同時接続
百ミリ秒未満の遅延
8GB メモリ環境での安定稼働
```

### 分散整合性

この案件の技術的な核の一つは、イベント駆動の整合性確保でした。

Group Service では次を導入・適用しました。

```text
Outbox Pattern
Event Forwarder
Redis Pub/Sub 配信
```

これにより、次の業務操作とイベント送信の整合性を保てるようにしました。

```text
グループ作成
グループ更新
グループアイコン更新
```

処理の流れは次の通りです。

```text
MySQL Transaction
↓
業務データ書き込み
↓
Outbox Event 書き込み
↓
Commit
↓
Event Forwarder
↓
Kafka / Redis
↓
下流 Consumer
```

### Group 機能の実装

グループアイコン更新 API も担当しました。

```http
PUT /api/v1/groups/:id/avatar
```

含まれる作業は次の通りです。

```text
グループオーナー権限チェック
管理者権限チェック
トランザクション処理
Event 発行
CI テスト修正
```

### CI/CD と技術負債整理

プロジェクトには、開発を妨げる既存課題もありました。

```text
gRPC 依存競合
Git 履歴の汚染
CI/CD ビルド失敗
壊れたテストケース
```

これに対して、次の整理を進めました。

```text
テスト修復
Makefile 改善
クリーンブランチへの移行
PR Ready での納品
```

## 技術責任者向けの見せ方

この案件の価値は、単に「Go が書ける」ではありません。

次の要素が同時にある点が強いです。

```text
Go マイクロサービス
リアルタイム通信
Kafka
MQTT
Redis
WebSocket
分散整合性
イベント駆動設計
高並列 IM
```

技術責任者には、次のように読まれやすい案件です。

```text
分散システムを自分で設計・実装し、
実運用の制約下で安定化し、
高負荷でも破綻しない構成へ持っていける人
```

## 面談向け要約

> Co-designed and implemented a distributed real-time messaging platform using Go microservices, Kafka, EMQX (MQTT), Redis, MySQL and MongoDB. Designed event-driven workflows with Outbox Pattern and Event Forwarder to guarantee transactional consistency. Delivered group management, real-time messaging and WebSocket services supporting 16,000+ concurrent connections per node with sub-100ms latency under constrained 8GB memory environments.
