---
title: "Complex Systems & AI Engineering Case Index"
date: 2026-05-25
description: "AI Engineering、Backend、Distributed Systems、Legacy Modernization、Embedded を含む実務実績を、営業・技術担当が説明しやすい形で整理したケースインデックス。"
---

# Complex Systems & AI Engineering Case Index

AI Engineering、Backend、Distributed Systems、Legacy Modernization、低レイヤ解析を含む実務実績を整理した一覧です。  
営業・技術担当が顧客へ説明しやすいように、AI 工程化、Backend / Infra、高信頼性システム、Legacy / Embedded、障害解析の観点でまとめています。

### Quick Navigation

- [ホーム](/ja/)
- [AIポートフォリオ](/ja/portfolio-ses/)
- [プロジェクト一覧](/ja/projects/)
- [技術ブログ](/docs/)

必要なら、最初に [技術ポートフォリオ](/ja/portfolio-ses/) を見せてから、この一覧で事例を補強してください。

## 1. AI / Workflow / Backend

- [AI Solution Engineering / Pre-sales](/ja/portfolio-ses/): AI Workflow、Solution Design、多言語提案、多バージョン文書生成。中小企業向けの短納期提案や AI 工程化、営業と技術の橋渡しに使いやすい。
- [技術的負債のガバナンス](/cases/nb-tech-debt/): AI-assisted code auditing、Zod、Cypress、WebSocket 修復。AI を実装・検証・安定化に使う実務例として見せやすい。
- [フロントエンド安定化](/ja/cases/frontend-stabilization-production-pressure/): Vue 3、TypeScript、認証競合、WebSocket、Cypress、ID 精度対策。本番障害からの復旧と安定化を説明しやすい。
- [産業用 SCADA 安定化](/ja/cases/industrial-qt-system-development/): Qt 4.7.3、VS2003、SCADA、GDI crash、描画性能改善。レガシー産業システムの救火と近代化を説明しやすい。
- [Spring Bootデータ取り込み高速化](/cases/spring-boot-data-ingestion-acceleration/): バッチUPSERT、70秒→1.5秒、データ同期の高速化。速度・安定性・保守性のバランスを説明しやすい。

## 2. Distributed / Infra / Reliability

- [Web3 Indexer: Goによる高信頼アーキテクチャ](/projects/web3-indexer/): 高並列処理、EVM データ処理、99.9% データ耐久性、Reorg 対応。分散処理と高信頼データパイプラインの実例として説明しやすい。
- [電力クラウド・ガバナンス](/cases/energy-cloud-governance/): 107億件規模、Elasticsearch 最適化、ネットワークチューニング。大規模データ基盤と高負荷運用の実例として説明しやすい。
- [言語境界の防崩設計](/cases/cross-language-bridge/): C++ × C#/Java、WebSocket 境界、heap corruption、JNI/SWIG/JNA。異言語連携と障害切り分けの実務として伝えやすい。

## 3. Legacy / Embedded / Low-level

- [SM9 低レイヤ実装](/projects/sm9-low-level/): 8KB RAM、ASN.1、TRNG、JNI、ドライバ連携。組み込み暗号や制約の厳しい現場での基礎体力を示せる。
- [12KB の戦壕](/cases/system-sovereignty-12kb/): 12KB RAM、`MR_STATIC`、`mrkill`、MicroLib。制約下での安定実装を説明しやすい。
- [USB HID プロトコル](/projects/usb-hid-protocol/): 64バイト制約、Report ID、Windows ドライバ互換性。デバイス制御やプロトコル境界の理解を見せられる。
- [VC6 / ABI互換性対応](/projects/vc6-linker-surgery/): VC6/VS混在、`LNK2005`、`__cdecl`/`__stdcall`。古い資産の延命、互換性問題、移行支援に使いやすい。
- [オフライン要塞化](/projects/kernel-hardening/): Linuxカーネル削減、air-gapped、起動最適化。閉域網、要塞化、保守困難環境への対応として使いやすい。
- [3DES/AES レガシー救済](/cases/legacy-3des-hardening/): 3DES→AES-GCM、非破壊移行、鍵ローテーション。金融・産業機器の更新不能案件で説明しやすい。

## 4. 使い分け

- `1` は、AI 工程化と solution design を見せたいときの主力です。
- `2` は、分散・運用・高信頼性を見せたいときの主力です。
- `3` は、低レイヤ・レガシー・制約条件への対応力を見せたいときの補強です。
- 初回提示では、まず `1` から 1〜2 本、必要に応じて `2` を足すのが自然です。
- 顧客が「普通の開発」を求めている場合は、`3` を前面に出しすぎない方が安全です。

## 5. Continue Exploring

- [ホーム](/ja/)
- [AIポートフォリオ](/ja/portfolio-ses/)
- [プロジェクト一覧](/ja/projects/)
- [技術ブログ](/docs/)

## 6. 参照の切り分け

- AI / Workflow / Pre-sales
- Distributed / Infra / Reliability
- Legacy / Embedded / Low-level

必要なら、同内容の中国語参考版は別ファイルに分離して保持できます。
