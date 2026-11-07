---
title: "AI Application / Backend / Complex Systems Engineer"
date: 2026-05-20
description: "AI Application、LLM Integration、Workflow Automation、複雑システム、Backend、Infra、Embedded に強みを持つシニアエンジニアの日本語ポートフォリオ。"
layout: "simple"
---

# AI Application / Backend / Complex Systems Engineer
## 複雑システム背景の AI 工程化エンジニア

### Quick Navigation

- [ホーム](/ja/)
- [高難度実績索引](/ja/docs/high-difficulty-ses-index/)
- [技術プロジェクト](/ja/projects/)
- [技術ブログ](/docs/)

## 営業・採用担当向け要約

- 23年以上の経験を持ち、C/C++、Go、Python、Backend、Embedded、Legacy を横断してきたシニアエンジニアです。
- 複雑な既存システムの構造把握、障害原因の特定、性能改善、安定化を得意とします。
- 調査・根本原因の分析から修正、動作確認、再発防止まで一貫して対応します。
- 70秒→1.5秒の同期改善、74+ 件の安定化など、ケースページで確認できる実績があります。
- AI はコード・ログ分析、文書整理、分類、テストの効率を高める手段として活用し、結果は技術判断と検証で確かめます。
- 詳細な技術説明は下記の各章とケースリンクをご確認ください。

技術文書、コード、ログ、チケット、チャットを中心とした非同期連携で、調査から実装・検証まで進めます。

### 1. 職務要約 / Executive Summary
23年以上の実務経験を持つシニアソフトウェアエンジニア／アーキテクトです。低レイヤ（C/C++）、ファームウェア、Legacy modernization、Infra、Embedded、分散バックエンドに加え、近年は AI Application、LLM Integration、AI Workflow Automation を実運用に落とし込む案件に継続して取り組んでいます。

強みは、コード・ログ・挙動から構造を逆算し、再現、切り分け、修正、再発防止までを一貫して扱うことです。AI についてもデモ止まりではなく、入力整形、モデル選択、Token 最適化、バッチ化、監視、失敗時の制御まで含めて、既存システムに安全に組み込むことを重視しています。

ドキュメントが不足している大規模環境でも、依存関係と共通原因を整理し、問題を段階的に解決へ導きます。障害調査、性能改善、移行リスク低減、AI ワークフローの工程化など、技術負債が蓄積した現場で価値を発揮します。仕様や引継ぎ資料が不十分な案件でも、既存資産を活かしながら問題を整理し、限られた体制で改善を進めることを得意とします。中小規模のチームでは、課題の調査と実装を自立して進め、判断根拠と検証結果を共有することで、手戻りや運用負担を抑えることに貢献します。

チーム開発では、コード品質・レビュー基準・手順化を重視し、継続的に保守可能な状態を作ることを意識しています。日本語の技術文書を読み、設計レビューやチャットで書面の技術連携を行い、英語技術資料や OSS の実装差分も確認しながら進めます。

---

### 2. 核となる技術力 / Core Competencies
- **AI Application Engineering**: 生成 AI を単体デモではなく、既存業務フローへ安全に組み込む設計と実装。
- **LLM Integration**: OpenRouter / Gemini / GLM / Kimi などの API を前提に、モデル選択、入出力整形、失敗時の分岐を設計。
- **Automation & Workflow**: n8n などを使い、AI Workflow の batching 最適化や通知、オペレーション自動化を進めます。
- **Production Reliability**: 本番で必要な監視、異常検知、再実行、フェイルセーフ、品質確認を含めた運用設計。
- **Backend Engineering**: 高並列 API、リアルタイム通信、長接続、非同期処理、データ整形、状態管理。
- **Complex Systems Troubleshooting**: 再現性の低い障害、性能劣化、依存関係の崩れ、API 制約、WAF 対応の切り分け。
- **Legacy Modernization**: 長く運用されたシステムの構造把握、リスク分解、段階的移行、手順標準化。
- **Infra / Distributed Systems**: Linux、deployment、observability、WebSocket / MQTT / Kafka、OAuth2 / JWT を含む分散基盤。
- **Runtime Validation（実行時入力検証）**: Zod などによる入力検証、E2E 自動化、ログ品質の維持、データ境界の保護。

---

### 3. Main Stack
- C/C++ / Go / Python / TypeScript
- Linux / Docker / AWS
- Kafka / MQTT / WebSocket
- MySQL / Redis
- n8n / AI Workflow
- OAuth2 / JWT
- Cypress / E2E
- GitHub / CI/CD

---

### 4. AI / LLM Engineering Experience
近年は、AI Application、LLM Integration、Workflow Automation、Backend Engineering を一体で扱う実務に継続して関わっています。

半分実験、半分運用のような曖昧な状態ではなく、実際の業務フローに入れて壊れにくくすることを重視しています。特に、入力データの整形、モデルの使い分け、処理の分割、失敗時の制御、再実行、通知までを含めて工程として設計します。

AI は従来のシステム解析・設計・検証を置き換えるものではなく、その効率を高める手段として活用します。コードやログの分析、技術文書・インターフェースの整合確認、故障分類と共通原因の整理、テスト・検証の自動化では、出力を確認し、既存システムの制約に照らして判断します。

主な関心領域は以下です。

- n8n AI Workflow の設計と最適化
- 双モデルルーティング（Kimi K2 + GLM）
- LLM Token Optimization
- AI Prediction Pipeline
- データ清掃と構造化処理
- AI Workflow の batching 最適化
- Telegram 自動告警
- OAuth2 / Security Hardening
- AI-assisted Development とデバッグ支援
- 自動化 E2E テストと Runtime Validation（実行時入力検証）

実運用では、500 件規模の予測タスクを対象に、Batching、入力圧縮、双モデルルーティング、処理手順の再構成を組み合わせ、典型的な処理時間を約 160 分（約 2 時間 40 分）から約 8 分へ短縮し、Token 消費も抑制しました。

AI に寄せるほど重要になるのは、モデルそのものよりも周辺の設計です。私は、AI を「置けば動くもの」とは見ず、既存の複雑系バックエンドの一部として、監視可能で、保守可能で、壊れ方が読める形にすることを重視しています。

---

### 5. AI Solution Engineering
LLM、Workflow Automation、AI-assisted Development を使い、技術案の整理、商用向けの言い換え、交付材料の生成を短時間でまとめることができます。

中小企業向けの AI Workflow / AI 自動化の PoC、業務改善、pre-sales 支援にも対応します。

実際のケースでは、AI 電話自動接待 / 自動客服の設計、複数ロールをまたぐ商業提案の整理、中文 / 日本語 / PDF の複数版出力、Prompt-driven な文書生成と構造再編、技術案と商業価値の同時表現などを扱ってきました。

これは単なる API 呼び出しではなく、AI を使って solution design と pre-sales material を実際に前へ進める工程化能力です。

主に扱う成果物は以下です。

- 技術アーキテクチャ
- 商業価値の整理
- リスク分析
- コスト制御
- システム境界の明確化
- 自動化フローの設計
- 多言語・多形式の文書生成

---

### 6. Selected Engineering Metrics
- 16K+ realtime WebSocket connections を維持する分散バックエンド経験
- 500 件規模の AI 予測ワークフローを典型値で約 160 分から約 8 分へ短縮
- Batching、入力圧縮、双モデルルーティングによる Token 消費最適化
- High-concurrency MQTT / Kafka / WebSocket を前提にしたリアルタイム処理
- Retry、fail-safe、Runtime Validation を含む本番運用前提の設計

---

### 7. 実績・対応事例 / Proven Track Records

#### ① レガシー金融基盤の発掘と近代化（HP-UX → RHEL）
[事例を見る](/ja/cases/legacy-platform-discovery-modernization/)。20年以上運用された外為基盤で、既存コード・運用成果物から業務フローと依存関係を再構築し、移行に必要な知識モデルの整備を支援しました。

#### ② Spring Boot データ同期の性能改善（70秒 → 1.5秒）
[事例を見る](/ja/cases/spring-boot-data-ingestion-acceleration/)。500件同期のボトルネックを調査し、バッチ UPSERT などで処理経路を改善しました。

#### ③ Vue 3 / TypeScript 本番障害の安定化（重大問題 74+ 件）
[事例を見る](/ja/cases/frontend-stabilization-production-pressure/)。認証、WebSocket、状態管理などにまたがる問題を調査し、重大問題 74 件以上の安定化に取り組みました。

#### ④ Toyota OMRM ハイブリッドクラウド音声処理
[事例を見る](/ja/cases/toyota-omrm-ai-platform/)。AWS と Azure の時間軸・音声データの差異を扱い、リアルタイム処理の同期と運用安定性を改善しました。

#### ⑤ Elasticsearch / telemetry 基盤の性能ガバナンス（107億件超）
[事例を見る](/ja/cases/energy-cloud-governance/)。107億件超の基盤で性能劣化の原因を特定し、検索遅延を数秒台から 65～137ms へ改善しました。

#### ⑥ Go 分散リアルタイム IM プラットフォーム
[事例を見る](/ja/cases/distributed-real-time-im-platform/)。Kafka、EMQX、Redis、WebSocket などを組み合わせ、1ノードあたり 16,000+ 同時接続を扱う設計・開発に参画しました。

#### ⑦ AI パイプラインの再設計
[事例を見る](/ja/cases/ai-pipeline-re-architecture/)。Batching、モデルルーティング、データ系譜の維持などにより、500件規模の処理時間を 160～180 分から約 8 分へ短縮しました。

#### ⑧ C/C++・Qt・組み込み・異言語境界
Qt / SCADA の安定化、WinCE・組み込み領域、C++ と C#/Java のインターフェースなど、低レイヤや技術境界の事例は[高難度実績索引](/ja/docs/high-difficulty-ses-index/)をご覧ください。

---

### 8. コミュニケーションスタイル / Working Style
- **技術ドキュメント・チャットベース中心**: 口頭会議だけに依存せず、設計書・ログ・差分・チケットを軸に合意形成します。
- **非同期連携に強い**: GitHub、Slack、Jira、Teams を使った確認・レビュー・課題管理に対応します。
- **海外資料も扱える**: 英文技術資料、ベンダードキュメント、OSSの実装差分を読みながら進めることができます。
- **現場適応**: 要件が曖昧な段階でも、論点整理と再現性の確保から入る進め方を得意とします。

### 9. 対応スタイル / Engagement Preference
- **稼働形態**: リモートまたはハイブリッドを優先。
- **得意領域**: AI Application、Infra / Platform、金融系 Legacy modernization、Embedded / Edge、Security / Protocol analysis、高信頼性・分散バックエンド。
- **補足**: 技術課題の重い現場ほど、価値を出しやすいタイプです。

### 10. 対応しやすい領域 / Suitable Areas
- AI / LLM Integration
- AI Solution Engineering / Pre-sales
- Automation / Workflow Optimization
- レガシーシステム刷新
- 原因不明障害の解析
- 高負荷システムの性能改善
- 基盤更改・移行支援
- 分散システム・リアルタイム処理
- プロトコル解析・低レイヤ調査
- 保守困難コードの構造整理
- 仕様が曖昧なまま進む現場の整理

**Portfolio & Insight Hub:**
- **Professional Website**: https://portfolio.st6160.click/
- **Medium Column**: https://medium.com/@zhouwei6160
- **Zenn Dev Blog**: https://zenn.dev/zhouwei6160

## Continue Exploring

- [ホーム](/ja/)
- [高難度実績索引](/ja/docs/high-difficulty-ses-index/)
- [技術プロジェクト](/ja/projects/)
- [技術ブログ](/docs/)
