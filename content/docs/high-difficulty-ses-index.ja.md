---
title: "日本IT派遣向け 高難度案件索引"
date: 2026-05-25
description: "サイト内のmdから、日本の営業・部長に先に見せやすい高難度案件だけを抽出した索引。低レイヤ、暗号、レガシー救済、言語境界、カーネル調整を中心に整理。"
---

# 日本IT派遣向け 高難度案件索引

このページは、サイト内の `md` から「日本語の第一印象より先に技術価値が伝わる」案件だけを抜き出した索引です。  
営業が顧客へ回しやすいように、各案件を `何が強いか` `どこで刺さるか` だけに絞っています。

## 営業向け一覧

| 優先 | ページ | 何が強いか | 日本の現場で刺さる理由 | 中文要点 |
|---|---|---|---|---|
| A | [SM9 低レイヤ実装](/projects/sm9-low-level/) | 8KB RAM、ASN.1、TRNG、JNI、ドライバ連携 | 組み込み暗号、低RAM制約、ハードウェア直結の難案件に強い | 8KB RAM、ASN.1、真随机数、JNI、驱动 |
| A | [12KB の戦壕](/cases/system-sovereignty-12kb/) | 12KB RAM、`MR_STATIC`、`mrkill`、MicroLib、物理制約下の暗号実装 | 低レイヤ、ベアメタル、資源制約が厳しい現場で差が出る | 12KB RAM、裸机、内存极限、密钥/加密 |
| A | [USB HID プロトコル](/projects/usb-hid-protocol/) | 64バイト制約、Report ID、65バイト回避、Windowsドライバ癖 | プロトコル境界、Windows周辺、デバイス制御で強い | 64字节限制、Report ID、Windows驱动怪癖 |
| A | [VC6 連結器手術](/projects/vc6-linker-surgery/) | VC6/VS混在、`LNK2005`、`__cdecl`/`__stdcall`、静的リンク | 古い銀行・装置系の延命、ABI衝突、互換性問題に効く | VC6、ABI冲突、LNK2005、静态链接 |
| A | [言語境界の防崩設計](/cases/cross-language-bridge/) | C++ × C#/Java、heap corruption、GC、呼び出し規約、JNI/SWIG/JNA | DLL境界、異言語連携、メモリ破損の解析で強い | 跨语言边界、堆破坏、GC、JNI/SWIG/JNA |
| A | [オフライン要塞化](/projects/kernel-hardening/) | Linuxカーネル削減、attack surface最小化、air-gapped、起動最適化 | セキュリティ基盤、閉域網、要塞化、保守困難環境に合う | 内核裁剪、攻击面缩小、离线环境、启动优化 |
| A | [3DES/AES レガシー救済](/cases/legacy-3des-hardening/) | 3DES→AES-GCM、非破壊移行、鍵ローテーション、既存資産延命 | 金融・産業機器の更新不能案件で営業しやすい | 3DES到AES-GCM、非破坏迁移、密钥轮换 |
| B | [技術的負債のガバナンス](/cases/nb-tech-debt/) | モジュラーモノリス、ETL 50倍改善、P0バグ100件超の整理 | 改修・性能改善・保守性改善の説明に使いやすい | 模块化单体、ETL提速、技术债治理 |

## 使い分け

- `A` は、営業が「技術的に重い現場」を説明するときの主力候補です。
- `B` は、技術難度に加えて「改善成果」を見せたいときの補助候補です。
- 日本向けの初回提示では、まず `A` から 2〜3 本だけ選ぶのが安全です。

---

## 中文参考

下面是给自己看的中文摘要，便于后续继续加工成更强的日文版或简历版。

1. [SM9 低层实现](/projects/sm9-low-level/)：8KB RAM、ASN.1、TRNG、JNI、驱动联动，属于典型的低资源加密和硬件直连难题。
2. [12KB 的战壕](/cases/system-sovereignty-12kb/)：12KB RAM、裸机、`MR_STATIC`、`mrkill`、MicroLib，强调极端资源约束下的加密和系统主权。
3. [USB HID 协议](/projects/usb-hid-protocol/)：64 字节限制、Report ID、65 字节绕过、Windows 驱动行为，适合讲低层协议和设备控制。
4. [VC6 连接器手术](/projects/vc6-linker-surgery/)：VC6/VS 混编、`LNK2005`、`__cdecl` / `__stdcall`、静态链接，适合老系统延寿和 ABI 冲突处理。
5. [跨语言边界防崩设计](/cases/cross-language-bridge/)：C++ × C# / Java、heap corruption、GC、调用约定、JNI / SWIG / JNA，适合讲 DLL 边界和跨语言集成。
6. [离线要塞化](/projects/kernel-hardening/)：Linux 内核裁剪、攻击面最小化、air-gapped、启动优化，适合安全基建和闭网环境。
7. [3DES/AES 遗留救援](/cases/legacy-3des-hardening/)：3DES 到 AES-GCM 的非破坏迁移、密钥轮换、保留旧硬件，适合金融和工业遗留系统。
8. [技术债治理](/cases/nb-tech-debt/)：模块化单体、ETL 提速 50 倍、P0 缺陷治理，适合讲工程治理和性能改善，但技术锋利度略低于前面几项。

后续如果要继续加工，我建议把 `A` 级内容再拆成：

- 低レイヤ / 組み込み系
- レガシー救済 / 互換性系
- 言語境界 / ドライバ系
- セキュリティ基盤系

这样更适合日本営業分发给客户部长。
