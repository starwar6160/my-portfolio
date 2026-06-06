---
title: "SD-WAN アーキテクチャの実現可能性調査と制御プレーン設計"
date: 2026-06-06
categories: ["Case Studies"]
tags: ["SD-WAN", "Network Architecture", "Zero Trust", "MQTT", "RabbitMQ", "OpenDaylight", "YANG", "VPP", "DPDK", "QUIC", "BBR"]
description: "エッジ機器とクラウド制御系をつなぐ SD-WAN プラットフォームについて、メッセージング、ゼロトラスト接続、YANG によるモデル化、弱いネットワーク下での転送性能を検証した事例。"
---

# SD-WAN アーキテクチャの実現可能性調査と制御プレーン設計

## 1. Project Context

SD-WAN プロジェクトの初期 3 か月で、私は実現可能性調査、アーキテクチャ選定、プロトタイプ検証を担当しました。

対象は、数多くのエッジ機器をクラウド側の制御システムへ接続する基盤でした。単なる実装ではなく、次のような制約の中で設計を決める仕事でした。

- 機器の識別とクローン対策
- 証明書管理に依存しすぎない安全な接続方式
- 複数言語・複数チームで破綻しない制御プレーン
- 弱いネットワークや高損失環境でも耐えられる転送経路
- 曖昧な Excel 定義に頼らないインターフェース仕様

この調査を通じて、クラウド制御 + エッジ転送の SD-WAN 基盤を組み立てました。

## 2. Messaging Backbone and Control-Plane Selection

最初の論点は、クラウド制御系とエッジ間で何を使って情報を流すかでした。

### OpenDDS: 技術的には興味深いが、運用コストが高すぎる

RTPS ベースのハードリアルタイム通信として OpenDDS を調査しました。理論上は有望でしたが、WAN 向けの基盤としては次の理由で重すぎました。

- 学習コストが高い
- IDL による結合が強い
- クロスプラットフォームの build が重い
- 俊敏な反復開発に向かない

OpenDDS は LAN / 特殊環境向けの候補としては残せますが、この SD-WAN の土台には採用しませんでした。

### RabbitMQ と EMQX/MQTT の使い分け

責務を用途ごとに分けました。

- `RabbitMQ` は設定同期向け
- `EMQX` + `MQTT` は軽量な状態報告向け

1 つの仕組みで全部を賄うより、メッセージ特性に応じて分離した方が実装も運用も安定します。

### コンテナネットワークの最適化

Docker の bridge モードでは NAT がボトルネックになりました。そこで host ネットワークを使い、単一ノードの API Gateway のスループットを約 5 万 QPS から 15 万 QPS 超まで引き上げました。

制御プレーンは「ネットワーク転送コストは無視できない」という前提で設計する必要がありました。

## 3. Security Architecture and Device Identity

次の課題は信頼モデルでした。

### VSA と active-online control

分散認証サーバ `VSA` を設計し、active-online control の方針を採りました。

- 新しい機器がオンラインになったら古いセッションを切る
- クローン機器や重複 ID を検出しやすくする
- 大規模展開でも管理しやすい信頼モデルにする

根鍵の保護には `Shamir` threshold secret sharing を組み合わせました。

### mTLS ではなく TLS-PSK

mTLS も検討しましたが、証明書の発行・更新・管理はエッジ機器には重すぎました。最終的には `TLS-PSK` を採用しました。

- X.509 ベースより CPU 負荷が低い
- 証明書ライフサイクル管理が不要
- 組み込み機器で扱いやすい
- それでも暗号化通信と共有鍵認証は維持できる

この用途では、PSK の方が現実的なトレードオフでした。

### OpenDaylight の検証

SDN 制御系の方向性を確認するため、`OpenDaylight` のコンテナ展開と southbound interface を検証しました。

`Karaf` ベースのモジュール構造により、特定ベンダーに閉じない軽量な制御プレーンの抽象化が可能だと確認できました。

## 4. Data Modeling and Interface Standardization

分散システムで長期的に効くのは、インターフェースを曖昧にしないことです。

### Excel -> YANG -> JSON Schema

仕様の流れを次の形に整理しました。

`Excel -> YANG -> JSON Schema`

`pyang` と `libyang` を使い、制御プレーンと転送プレーンの定義を機械的に扱えるようにしました。その結果、解釈違いが減り、コミュニケーションコストを約 40% 削減できました。

## 5. Edge Forwarding and Transport Resilience

エッジ側は単にパケットを運ぶだけでは足りません。悪いネットワークでも動き続ける必要がありました。

### VPP と DPDK

高性能転送面には `FD.io VPP` と `DPDK` を採用しました。カーネル経由の無駄を減らし、パケット処理を効率化するためです。

さらに `Intel QAT` を使って暗号処理をオフロードし、RSA 検証のボトルネックを抑えました。

### 弱いネットワークへの対応

国際回線や不安定なリンクでは `UDP/QUIC` と `BBR` を検証しました。弱いネットワークでは、TCP 前提の設計より QUIC の方が扱いやすいことが分かりました。

中継経路には `Ali-HK` を使い、クロスボーダー開発と運用の安定性を高めました。

## 6. Architecture Summary

この調査で収束した構成は次の通りです。

- クラウド集中制御
- エッジ高性能転送
- 軽量な安全接続
- 明確な interface model
- 弱いネットワークを前提にした transport 選定

単なる技術寄せ集めではなく、責務が分かれたシステム設計になりました。

## 7. What This Work Proved

この実現可能性調査で確認できたのは、理想論ではなく運用可能な SD-WAN 設計です。

- `OpenDDS` は WAN 制御には重すぎた
- `RabbitMQ` と `EMQX/MQTT` は用途分離した方が自然だった
- `TLS-PSK` は証明書重視の mTLS より現実的だった
- `YANG` は仕様の曖昧さを減らした
- `VPP + DPDK + QAT` でエッジ転送が現実的になった
- `QUIC + BBR` は弱い回線で強かった

## 8. 簡潔な職務経歴向け要約

- エッジ機器とクラウド制御系を結ぶ SD-WAN 基盤の実現可能性調査とアーキテクチャ選定を主導。
- `OpenDDS`, `RabbitMQ`, `EMQX/MQTT`, `OpenDaylight`, `YANG`, `VPP`, `DPDK`, `QUIC`, `BBR` を比較し、実用的な制御プレーンと転送プレーンを定義。
- `TLS-PSK`、active-online control、`Shamir` threshold secret sharing を組み合わせ、クローン対策と再生攻撃対策を設計。
- `Excel -> YANG -> JSON Schema` のモデル化フローを構築し、仕様の曖昧さを減らして約 40% の調整コスト削減に寄与。

## 9. ホームページ用サマリーカード

クラウド制御、ゼロトラスト接続、YANG ベースの仕様モデル化、弱いネットワーク環境での高性能転送をまとめた SD-WAN の実現可能性調査。

## 10. 技術タグ

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
