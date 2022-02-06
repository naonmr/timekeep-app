# Timekeep App⏰

アジェンダごとに時間を測ってくれる、ありそうでなかった会議用タイマー！

  <br>

<!-- ## デモ

- ログイン時
  <br>

  ![新規タスク作成のデモ](./demo/login.gif)

<br>
<br>

- タスク作成時

<br>

![新規タスク作成のデモ](./demo/new-task.gif)

<br>
<br>

- タスク更新時

<br>

![タスク更新のデモ](./demo/update-task.gif)

<br>
<br>

- メンバー選択時

<br>

![メンバー選択のデモ](./demo/select-mamber.gif)

<br>

## 環境 -->

- Node: 16.13.1
- npm: 8.1.2
- psql (PostgreSQL): 14.1
- Git: 2.30.1
- firebase のアカウント必須
- Heroku にデプロイする場合は、Heroku のアカウント必須

<br>

## Scripts（実行コマンド） の紹介

```bash
# サーバー起動
npm run start


# ビルドファイル作成
npm run build


# 本番環境でのマイグレーション実行
npm run migrate ファイル名


# 開発環境（ローカル）でのフロントエンド起動
npm run hack

```

<br>

## 使い方

ローカル環境（開発環境）での使用方法

### 1. ターミナルを開き、任意の場所（ファイルを作成する場所）に移動

```bash
# PATHの部分には任意のバス（作成場所）を指定
cd PATH
```

<br>

### 2. GitHub 上から、timekeep-app リポジトリをクローン

```bash
# HTTPSの場合
git clone https://github.com/naonmr/timekeep-app.git

# SSH の場合
git clone git@github.com:naonmr/timekeep-app.git
```

<br>

### 3. クローンした team-task-manager プロジェクト内に移動

```bash
cd timekeep-app
```

<br>

### 4. 必要なパッケージをインストール

```bash
npm i
```

<br>

### 5. PostgreSqL にデータベース（timekeep_app）を作成

```bash
# PostgreSQLに接続
psql

# team_task_managerデータベースを作成
create database timekeep_app;

# PostgreSQLとの接続を終了
\q
```

<br>

### 6. Firebase Authentication（認証機能）の設定

- [Firebase Authentication](https://firebase.google.com)にログインし、新規プロジェクトを作成
  - プロジェクト名（例: timekeep-app）を設定
  - 設定 > プロジェクトの設定 > アプリを追加 を設定する
  - アプリ設定後に表示される API key などを環境変数に設定（詳細は[8. env ファイルの設定](#8-env-ファイルの設定)を参照）
- timekeep-app プロジェクトの Authentication を選択し「始める」をクリック
  - ログイン方法に「メール/パスワード」を選択

<br>

### 7. Prisma CLI の設定

```bash
npx prisma
```

<br>

### 8. env ファイルの設定

- ファイルの作成

```bash
# .envファイルの作成
touch .env
```

- 作成した.env ファイルに下記を記載

```bash
# USERの部分は自分のPCのユーザー名に変更
# パスワードを設定している場合は、PASSWORDの部分を変更（設定していない場合は、PASSWORDの文字を削除）
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/team_task_manager?schema=public"

# Firebase Authenticationの設定
# Firebase Authenticationのコンソールを参照
REACT_APP_FIREBASE_APIKEY="APIKEY"
FIREBASE_AUTH_DOMAIN="AUTH DOMAIN"
FIREBASE_PROJECT_ID="PROJECT ID"
FIREBASE_STORAGE_BUCKET="STORAGE BUCKET"
FIREBASE_MESSAGING_SENDER_ID="MESSAGING SENDER ID"
FIREBASE_APPID="APP ID"
FIREBASE_MEASUREMENT_ID="MEASUREMENT ID"
```

<br>

### 9. マイグレーションを実行（Agenda,Meeting,User の 3 つのテーブルを作成）

```bash
# npmの場合
npm run migrate 任意のファイル名
```

<br>

### 10. seed を実行（上記で作成したテーブルにデータを挿入）

```bash
# seedingの実行
node prisma/seed.js
```

<br>

### 11. ローカルサーバーを立ち上げる（ターミナルを 2 つ立ち上げ、下記の 2 つのコマンドをそれぞれ実行）

```bash
npm run start  # serverを起動
npm run hack # Reactを起動
```

<br>

## デプロイ

- GitHub 上の自分のローカルリポジトリに、今回 clone した timekeep-app リポジトリを追加
- Heroku を立ち上げ、GitHub と連携し、パイプラインを作成
  - Resources の Add-ons に、Heroku Postgres を選択
  - Setting の Config Vars に、環境変数の設定
    - `PGSSLMODE=no-verify` も追加する
- Heroku で react-router を使用するための設定

  - Heroku CLI を設定していない場合は、[こちら](https://devcenter.heroku.com/ja/articles/heroku-cli)を参考に設定
  - ログインや、リポジトリの接続などを行う
  - ターミナル上で下記を実行

  ```bash
  # React Routerの設定
  heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static.git
  ```

- Heroku でデプロイ
  - Deploy から、Manual deploy の中の Deploy Branch ボタンをクリック
  - More > Run console > `npx prisma migrate deploy` `node prisma/seed.js` を入力して seeding を実行
- デプロイ完了

<br>

## 使用した技術

- [React](https://ja.reactjs.org/) - ユーザインターフェース構築のための JavaScript ライブラリ
- [Node.js](https://nodejs.org/ja/) - Chrome の V8 JavaScript エンジン で動作する JavaScript 環境
- [Express](https://expressjs.com/ja/) - Node.js のための高速で、革新的な、最小限の Web フレームワーク
- [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM
- [PostgreSQL](https://www.postgresql.org/) - The World's Most Advanced Open Source Relational Database
- [Chakra UI](https://chakra-ui.com/) - UI コンポーネントライブラリ
- [React Hook Form](https://react-hook-form.com/jp/) - 高性能で柔軟かつ拡張可能な使いやすいフォームバリデーションライブラリ
- [react-route-dom](https://v5.reactrouter.com/) - a lightweight, fully-featured routing library for the React JavaScript library.

- [Heroku](https://jp.heroku.com/) - アプリケーションの開発から実行、運用までのすべてをクラウドで完結できる PaaS（サービスとしてのプラットフォーム）

<br>

## 執筆者

- Nao ( naonmr )

<br>
