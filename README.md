# KITA! LINE専用モード（静的版）

iPhone だけで「LINE の返信で目が覚める」ための、設定ガイド＋待機画面アプリ。
サーバー不要（データは端末のブラウザ内のみ）。GitHub Pages などの静的ホスティングで動きます。

## 仕組み（Appleの制限への正しい答え）

iPhone ではアプリが LINE の中身を読めない（Apple が全アプリに禁止）ため、
「LINE 自身＋iPhone 本体が大きく鳴らす」方式を使います。
設定は LINE アプリの中で3タップ:

1. 相手のトーク画面 → 右上（≡）
2. 「通知」→「通知音」
3. 「アラーム」系の大きい音にする（音量も最大）

KITA! はその夜の「見張り」として、相手の名前と待機タイマーを表示します。

## GitHub Pages での公開手順（約2分・新規リポジトリのみ）

1. GitHub で新しいリポジトリを作成（例: `kita-line`、Public）
2. このフォルダの中身（index.html, app.html, styles.css, app.js, sounds/, icons/）を
   リポジトリのルートにアップロード（Add file → Upload files でも可）
3. リポジトリの Settings → Pages → Build and deployment で
   Source: `Deploy from a branch` → Branch: `main` / `(root)` を選んで Save
4. 1〜2分で公開されます: `https://<あなたのID>.github.io/kita-line/`

## ファイル構成

| ファイル | 内容 |
|---|---|
| index.html | トップ＋LINEの3タップ手順 |
| app.html | 相手の登録／待機画面（タイマー付き） |
| app.js | 端末内保存（localStorage）とタイマー/音の再生 |
| styles.css | デザイン（夜×ローズの配色） |
| sounds/ | KITA!のアラーム音3種（テスト用） |
| icons/ | アプリアイコン（favicon用） |