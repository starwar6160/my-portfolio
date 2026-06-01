---
title: "シニア AI / バックエンド / プラットフォーム エンジニア"
date: 2026-04-08
description: "Production AI、バックエンド信頼性、プラットフォーム設計、複雑系システム復旧を専門とする、20年の経験を持つ現役エンジニアの職務経歴。"
layout: "simple"
---

# 職務経歴書: シニア AI / バックエンド / プラットフォーム エンジニア

**エキスパート IC (Individual Contributor) | Production AI、バックエンド信頼性、プラットフォーム設計**

**Writer @ CoinsBench (Web3 Security & Infrastructure)**

- **Email:** zhouwei6160@gmail.com
- **GitHub:** [https://github.com/starwar6160](https://github.com/starwar6160)
- **LinkedIn:** [https://www.linkedin.com/in/zhouwei6160/](https://www.linkedin.com/in/zhouwei6160/)

---

## エグゼクティブ・サマリー (EXECUTIVE SUMMARY)

**20年の経験を持つ現役エンジニア**として、管理業務に寄りすぎることなく、複雑かつミッションクリティカルなボトルネックを直接解決し、エンジニアリング ROI を高めます。Production AI、バックエンド信頼性、プラットフォーム設計、複雑系システム復旧を横断し、運用リスクを増やさずに改善を進めることを重視しています。

### 「レスキュー・エンジニア」としての強み
分散プラットフォームのスループットが物理的な限界に達した際、あるいは AI ワークフローが本番運用に耐えないほど脆くなった際、私は最終的な技術的解決ポイント（Escalation Point）として機能します。14MB の16進ダンプから消失したバイト単位のハードウェアバグを追跡し、未ドキュメントのカーネルパニックを診断して、ダウンタイムゼロのホットフィックスを実装してきた実績があります。

---

## 専門領域と強み (CORE STRENGTHS)

### 柱 1: Production AI と Workflow Engineering
- **AI ワークフロー統合**: batching、routing、runtime control を備えた Production AI を実運用へ接続。
- **Token Economics**: AI フローのコスト、レイテンシ、運用品質を最適化。
- **安全な自動化**: 可観測で監査可能、障害時に復旧しやすい AI 支援ワークフローを設計。

### 柱 2: 高信頼性インフラストラクチャ (Reliable Infrastructure)
- **決定論的コンピューティング**: バイトコードのレイアウトとメモリ・アライメントを熟知し、運用の絶対的な決定論を追求。
- **I/O エンジニアリング**: **107億件のレコード** を処理するクラスターのベンチマークを実施し、20倍の遅延悪化を特定・解決。
- **カーネル・サージェリー**: Linuxカーネル・チューニング（eBPF, Cgroups）およびサブマイクロ秒のIPC（レイテンシ **200ns**）。

### 柱 3: 分散システム & 並列処理 (Distributed Systems & Parallelism)
- **SD-WAN コントロールプレーン**: Go + Neo4j ルーティングエンジンを構築し、**帯域幅を90%削減**。
- **分散整合性**: 「分散モノリス」の危機を解消し、WebSocketイベントレイヤーを最適化。

### 柱 4: 暗号セキュリティ & 低レイヤー
- **手作り暗号プリミティブ**: ARM Cortex-M3上の **8KB以下のRAM** 環境でSMシリーズ（国密）アルゴリズムを実装。
- **閾値秘密分散**: 本番環境における **(5,3) シャミアの秘密分散法** スキームのデプロイ。
- **サイドチャネル攻撃耐性**: 定数時間実行パスの強制およびハイブリッド・エントロピー（TRNG）の設計。

---

## 主な経歴 (PROFESSIONAL EXPERIENCE)

### プロトコルレイヤー・システムアーキテクト / プリンシパル IC | 2021年 – 現在
- **麻痺したHPUXインフラの復旧**: ドキュメント皆無の環境で未ドキュメントのデータリンク制約をリバースエンジニアリング。
- **Web3 Indexer (Go) の構築**: バックプレッシャー制御を備えた3ステージ・パイプライン（Fetcher → Sequencer → Processor）の設計。
- **分散データパイプラインを50倍に最適化**: 同期処理を非同期バッチアップサート（70s → 1.5s）に再設計。
- **AI 拡張エンジニアリング**: AIエージェント（Claude Code/DeepSeek等）を活用し、3時間の分析ワークロードを8分に圧縮。
- **Production 制御の追加**: runtime check、batching、observability を追加し、複雑系システムの regression risk を低減。

### シニア・ソフトウェアアーキテクト | iSoftStone | 2019年 – 2021年
- **SD-WAN コントロールプレーン**: Hash-Diff同期を備えた復元力の高い Go+Neo4j ルーティングエンジンを構築。
- **超低遅延 IPC**: ゼロコピー共有メモリにより、決定論的な **200ns** のプロセス間通信を実現。

### シニア・システムアーキテクト | Goldwind | 2017年 – 2019年
- **グローバルな電力網運用の安定化**: 破損したOSネットワークスタックをバイパスするため、現場でGoバイナリをクロスコンパイルして注入。
- **ハイパースケール I/O レスキュー**: NVMeへの移行により、107億件のレコードに対するElasticsearchの崩壊を解決。

---

## 特許 (PATENTS)

- **時間決定論的チャレンジレスポンス・プロトコル** (*CN107633588A*)
- **本人確認のための動的エントロピー注入** (*CN103530924B*)

---

## テクニカルスキル (TECHNICAL SKILLS)

- **言語**: C/C++ (15年以上), Go, Python (Async/FastAPI), Assembly.
- **ドメイン**: Linux Kernel Tuning, eBPF, Cryptography (SMシリーズ), Zero-copy IPC, Distributed Systems.
- **AIツール**: 自律型コードベース監査 (Claude Code / DeepSeek / Gemini).
