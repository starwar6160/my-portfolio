---
title: "複雑システム対応 技術実績一覧"
date: 2026-05-25
description: "日本の営業・技術担当に先に見せやすい複雑システムの実績を、レガシー刷新・障害解析・境界制御・低レイヤ調査・AI工程化の観点で整理した一覧。"
---

# 複雑システム対応 技術実績一覧

このページは、営業が顧客へ先に回しやすいように、`複雑度が高い実績` だけを抜き出した一覧です。  
一般的な CRUD や会議型案件ではなく、Legacy、Infra、Embedded、プロトコル、低レイヤ、AI 工程化の価値が伝わるものに絞っています。

必要なら、最初に [技術ポートフォリオ](/ja/portfolio-ses/) を見せてから、この一覧で事例を補強してください。

## 営業向け一覧

| 優先 | ページ | 何が強いか | 日本の現場で刺さる理由 |
|---|---|---|---|---|
| A | [AI-assisted Pre-sales & Solution Design](/ja/portfolio-ses/) | AI Workflow、Solution Design、多言語提案、多バージョン文書生成 | 中小企業の短納期提案、AI 工程化、営業と技術の橋渡しに使いやすい |
| A | [SM9 低レイヤ実装](/projects/sm9-low-level/) | 8KB RAM、ASN.1、TRNG、JNI、ドライバ連携 | 組み込み暗号、低RAM制約、ハードウェア直結の難案件に強い |
| A | [12KB の戦壕](/cases/system-sovereignty-12kb/) | 12KB RAM、`MR_STATIC`、`mrkill`、MicroLib、物理制約下の暗号実装 | 低レイヤ、ベアメタル、資源制約が厳しい現場で差が出る |
| A | [USB HID プロトコル](/projects/usb-hid-protocol/) | 64バイト制約、Report ID、65バイト回避、Windowsドライバ互換性 | プロトコル境界、Windows周辺、デバイス制御で強い |
| A | [VC6 / ABI互換性対応](/projects/vc6-linker-surgery/) | VC6/VS混在、`LNK2005`、`__cdecl`/`__stdcall`、静的リンク | 古い銀行・装置系の延命、ABI衝突、互換性問題に効く |
| A | [言語境界の防崩設計](/cases/cross-language-bridge/) | C++ × C#/Java、heap corruption、GC、呼び出し規約、JNI/SWIG/JNA | DLL境界、異言語連携、メモリ破損の解析で強い |
| A | [オフライン要塞化](/projects/kernel-hardening/) | Linuxカーネル削減、attack surface最小化、air-gapped、起動最適化 | セキュリティ基盤、閉域網、要塞化、保守困難環境に合う |
| A | [3DES/AES レガシー救済](/cases/legacy-3des-hardening/) | 3DES→AES-GCM、非破壊移行、鍵ローテーション、既存資産延命 | 金融・産業機器の更新不能案件で営業しやすい |
| B | [技術的負債のガバナンス](/cases/nb-tech-debt/) | モジュラーモノリス、ETL 50倍改善、P0バグ100件超の整理 | 改修・性能改善・保守性改善の説明に使いやすい |

## 使い分け

- `A` は、営業が「技術的に重い現場」を説明するときの主力候補です。
- `B` は、技術難度に加えて「改善成果」を見せたいときの補助候補です。
- `AI` は、AI Engineering と pre-sales engineering を同時に見せたいときの主力候補です。
- 日本向けの初回提示では、まず `A` から 2〜3 本だけ選ぶのが安全です。
- 顧客が「普通の開発」を求めている場合は、無理にこの一覧を押さず、適合領域を先に確認してください。

## 参照の切り分け

- 低レイヤ / 組み込み系
- レガシー救済 / 互換性系
- 言語境界 / ドライバ系
- セキュリティ基盤系

必要なら、同内容の中国語参考版は別ファイルに分離して保持できます。
