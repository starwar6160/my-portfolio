---
title: "AI Application / Backend / Complex Systems Engineer"
date: 2026-05-20
description: "AI Application、LLM Integration、Workflow Automation、複雑システム、Backend、Infra、Embedded に強みを持つシニアエンジニアの技術ポートフォリオ。"
layout: "simple"
---

# AI Application / Backend / Complex Systems Engineer
## 複雑システム背景の AI 工程化エンジニア

### Quick Navigation

- [ホーム](/ja/)
- [高難度実績索引](/ja/docs/high-difficulty-ses-index/)
- [技術プロジェクト](/ja/projects/)
- [技術ブログ](/docs/)

### 1. 職務要約 / Executive Summary
23年の実務経験を持つシニアソフトウェアエンジニア／アーキテクトです。低レイヤ（C/C++）、ファームウェア、Legacy modernization、Infra、Embedded、分散バックエンドに加え、近年は AI Application、LLM Integration、AI Workflow Automation の実運用にも継続して取り組んでいます。

強みは、コード・ログ・挙動から構造を逆算し、再現、切り分け、修正、再発防止までを一貫して扱うことです。AI についてもデモ止まりではなく、入力整形、モデル選択、Token 最適化、バッチ化、監視、失敗時の制御まで含めて、既存システムに安全に組み込むことを重視しています。

ドキュメントが不足している大規模環境でも、技術的な論点を整理し、実務で前に進める形へ落とし込みます。障害調査、性能改善、移行リスク低減、AI ワークフローの工程化など、技術負債が蓄積した現場で価値を発揮します。

チーム開発では、コード品質・レビュー基準・手順化を重視し、継続的に保守可能な状態を作ることを意識しています。日本語での技術文書確認・設計レビュー・チャット対応が可能で、実務では非同期コミュニケーションを重視しています。

---

### 2. 核となる技術力 / Core Competencies
- **AI Application Engineering**: 生成 AI を単体デモではなく、既存業務フローへ安全に組み込む設計と実装。
- **LLM Integration**: OpenRouter / Gemini / GLM / Kimi などの API を前提に、モデル選択、入出力整形、失敗時の分岐を設計。
- **Automation & Workflow**: n8n などを使った AI Workflow、バッチ処理、通知、オペレーション自動化の構築と改善。
- **Production Reliability**: 本番で必要な監視、異常検知、再実行、フェイルセーフ、品質確認を含めた運用設計。
- **Backend Engineering**: 高並列 API、リアルタイム通信、長接続、非同期処理、データ整形、状態管理。
- **Complex Systems Troubleshooting**: 再現性の低い障害、性能劣化、依存関係の崩れ、API 制約、WAF 対応の切り分け。
- **Legacy Modernization**: 長く運用されたシステムの構造把握、リスク分解、段階的移行、手順標準化。
- **Infra / Distributed Systems**: Linux、deployment、observability、WebSocket / MQTT / Kafka、OAuth2 / JWT を含む分散基盤。
- **Runtime Validation**: Zod などによる入力検証、E2E 自動化、ログ品質の維持、データ境界の保護。

---

### 3. Main Stack
- Go / Python / TypeScript
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

主な関心領域は以下です。

- n8n AI Workflow の設計と最適化
- 双モデルルーティング（Kimi K2 + GLM）
- LLM Token Optimization
- AI Prediction Pipeline
- データ清掃と構造化処理
- AI Workflow Batching
- Telegram 自動告警
- OAuth2 / Security Hardening
- AI-assisted Development とデバッグ支援
- 自動化 E2E テストと Runtime Validation

実運用では、500 件規模の予測タスクを対象に、Batching、入力圧縮、双モデルルーティング、処理手順の再構成を組み合わせ、全体の実行時間を約 3 時間から 70-120 分へ短縮し、Token 消費も抑制しました。

AI に寄せるほど重要になるのは、モデルそのものよりも周辺の設計です。私は、AI を「置けば動くもの」とは見ず、既存の複雑系バックエンドの一部として、監視可能で、保守可能で、壊れ方が読める形にすることを重視しています。

---

### 5. AI Solution Engineering
LLM、Workflow Automation、AI-assisted Development を使い、複雑な技術案の分析、商用向けの抽象化、交付材料の生成を短時間でまとめることができます。

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
- 500 件規模の AI 予測ワークフローを約 3 時間から 70-120 分へ短縮
- Batching、入力圧縮、双モデルルーティングによる Token 消費最適化
- High-concurrency MQTT / Kafka / WebSocket を前提にしたリアルタイム処理
- Retry、fail-safe、runtime validation を含む production-oriented design

---

### 7. 実績・対応事例 / Proven Track Records

#### ① 24年運用のPHP製レガシーモノリス解析と安定化支援
- **問題**: 仕様書と実装が乖離し、長年の変更で障害原因の切り分けが困難になっていた巨大レガシーシステム。
- **対応**: 静的解析ツールとログ解析を組み合わせ、複雑に絡み合った状態遷移と依存関係を可視化。短期間で重大障害レベルの論理デッドロック条件を特定。
- **結果**: 開発チームが保守しやすい形に整理し、段階的移行と再発防止のロードマップ作成を支援。ブラックボックス化した領域の可視化に貢献。

#### ② ハードウェアウォレット領域におけるファームウェア境界不整合問題の解析支援
- **問題**: Python製パーサーとC言語製ファームウェアの境界で、メモリ破損を引き起こす境界不整合が発生していた。
- **対応**: 実行パスを追跡し、11ステップに及ぶ不整合の流れを分解。再現条件を明確化して、脆弱性の成立条件を実証。
- **結果**: 分析結果を開発元へ共有し、パッチ適用と修正判断を後押し。技術的に難しい境界バグでも、原因を構造化して扱えることを示した事例。

#### ③ 車載リアルタイム音声分析システムの同期崩れ最適化
- **問題**: リアルタイム音声ストリーム処理で、タイムスタンプのずれと同期崩壊が起きていた。
- **対応**: WebSockets、AWS Lambda、Azure/AWSの連携を前提に、ナノ秒単位のTickと秒単位の時刻差、無音区間による非線形ドリフトを補正する仕組みを実装。
- **結果**: リアルタイム同期とデータ整合性を安定化し、不要なAPI呼び出しを削減。運用時の信頼性とコストの両面を改善。

---

### 8. 推奨する表示順 / Project Ordering
営業・技術責任者に最初に見せる順番としては、以下を推奨します。

1. AI-assisted Pre-sales & Solution Design
1. n8n AI Workflow / 双モデルルーティング / Token 最適化
1. 高並発 WebSocket / MQTT / Kafka / リアルタイムメッセージ基盤
1. Go-IM 分散システムと実運用の安定化
1. Merge-Sport のデータ融合・整形・自動化パイプライン
1. Legacy modernization と障害解析の代表事例
1. 自動化 E2E テスト、Runtime Validation、Zod による入力防御

この順番にすると、AI だけの人ではなく、複雑システムを本番で扱えるエンジニアとして見せやすくなります。

---

### 9. コミュニケーションスタイル / Working Style
- **技術ドキュメント・チャットベース中心**: 口頭会議だけに依存せず、設計書・ログ・差分・チケットを軸に合意形成します。
- **非同期連携に強い**: GitHub、Slack、Jira、Teams を使った確認・レビュー・課題管理に対応します。
- **海外資料も扱える**: 英文技術資料、ベンダードキュメント、OSSの実装差分を読みながら進めることができます。
- **現場適応**: 要件が曖昧な段階でも、論点整理と再現性の確保から入る進め方を得意とします。

### 10. 対応スタイル / Engagement Preference
- **稼働形態**: リモートまたはハイブリッドを優先。
- **得意領域**: AI Application、Infra / Platform、金融系 Legacy modernization、Embedded / Edge、Security / Protocol analysis、高信頼性・分散バックエンド。
- **補足**: 技術課題の重い現場ほど、価値を出しやすいタイプです。

### 11. 対応しやすい領域 / Suitable Areas
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
