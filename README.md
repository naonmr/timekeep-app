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
npm run migrate {{ファイル名}}


# seedingの実行
node prisma/seed.js


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

### 5. PostgreSqL にデータベース（team_task_manager）を作成

```bash
# PostgreSQLに接続
psql

# team_task_managerデータベースを作成
create database timekeep_app;

# PostgreSQLとの接続を終了
\q
```

<br>

以下執筆中

<!-- ### 6. firebase auth（認証機能）の設定

- [Auth0](https://auth0.com/jp)にログインし、新規アプリを作成
  - アプリ名（例: team-task-manager）を設定
  - Single Page Web Applications を選択
- team-task-manager アプリの setting > Application URIs の設定（下記を入力）
  - Allowed Callback URLs
    - http://localhost:3000/signup
  - Allowed Logout URLs
    - http://localhost:3000/
  - Allowed Web Origins
    - http://localhost:3000/

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

# Auth0の設定
# Auth0のドメイン、Auth0のクライアントIDの部分は、自分のAuth0のデータに変更
REACT_APP_AUTH_DOMAIN="Auth0のドメイン"
REACT_APP_AUTH_CLIENT_ID="Auth0のクライアントID"
```

<br>

### 9. マイグレーションを実行（users, teams, tasks, progress, priorities の 5 つのテーブルを作成）

```bash
# yarnの場合
yarn migrate:dev

# npmの場合
npm run migrate:dev
```

<br>

### 10. seed を実行（上記で作成したテーブルにデータを挿入）

```bash
# yarnの場合
yarn seed

# npmの場合
npm run seed
```

<br>

### 11. ローカルサーバーを立ち上げる（ターミナルを 2 つ立ち上げ、下記の 2 つのコマンドをそれぞれ実行）

```bash
# yarnの場合
yarn dev      # serverを起動
yarn react    # Reactを起動

# npmの場合
npm run dev   # serverを起動
npm run react # Reactを起動
```

### 12. デモ画面を参考に実際の画面を操作

- 注: 追加機能や、修正がある場合は、実際の画面と異なる場合があります

<br>

## デプロイ

- team-task-manager > prisma > seed > index.js ファイルを開き、下記のように変更
  - そのまま
    - teamSeeding
    - progressSeeding
    - prioritiesSeeding
  - コメントアウト(or 削除)
    - usersSeeding
    - tasksSeeding
- GitHub 上の自分のローカルリポジトリに、今回 clone した team-task-manager リポジトリを追加
- Heroku を立ち上げ、GitHub と連携し、パイプラインを作成
  - Resources の Add-ons に、Heroku Postgres を選択
  - Setting の Config Vars に、環境変数の設定
    - `PGSSLMODE=no-verify`
    - `REACT_APP_AUTH_CLIENT_ID=Auth0のドメイン(envファイルの設定と同じ)`
    - `REACT_APP_AUTH_DOMAIN=Auth0のクライアントID(envファイルの設定と同じ)`
- Heroku で react-router を使用するための設定

  - Heroku CLI を設定していない場合は、[こちら](https://devcenter.heroku.com/ja/articles/heroku-cli)を参考に設定
  - ログインや、リポジトリの接続などを行う
  - ターミナル上で下記を実行

  ```bash
  # React Routerの設定
  heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static.git
  ```

- Auth0 の Application URIs の設定

  - team-task-manager アプリの setting > Application URIs にカンマ区切りで下記を追加
  - Allowed Callback URLs
    - `デプロイ先のURL/signup`
  - Allowed Logout URLs
    - `デプロイ先のURL/`
  - Allowed Web Origins
    - `デプロイ先のURL/`

- Heroku でデプロイ
  - Deploy から、Manual deploy の中の Deploy Branch ボタンをクリック
  - More > Run console > `yarn seed` と入力して seeding を実行
- デプロイ完了

<br>

## 使用した技術

- [React](https://ja.reactjs.org/) - ユーザインターフェース構築のための JavaScript ライブラリ
- [Node.js](https://nodejs.org/ja/) - Chrome の V8 JavaScript エンジン で動作する JavaScript 環境
- [Express](https://expressjs.com/ja/) - Node.js のための高速で、革新的な、最小限の Web フレームワーク
- [apollo-server-express](https://www.apollographql.com/docs/apollo-server/integrations/middleware/#apollo-server-express) - The Apollo Server package for Express, the most popular Node.js web framework
- [GraphQL](https://graphql.org/) - A query language for your API
- [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM
- [PostgreSQL](https://www.postgresql.org/) - The World's Most Advanced Open Source Relational Database
- [ MUI](https://mui.com/) - The React UI library you always wanted
- [React Hook Form](https://react-hook-form.com/jp/) - 高性能で柔軟かつ拡張可能な使いやすいフォームバリデーションライブラリ
- [Auth0](https://auth0.com/jp) - 誰でも簡単に導入できる認証・認可プラットフォーム
- [Heroku](https://jp.heroku.com/) - アプリケーションの開発から実行、運用までのすべてをクラウドで完結できる PaaS（サービスとしてのプラットフォーム）

<br> -->

## 執筆者

- Nao ( naonmr )

<br>
