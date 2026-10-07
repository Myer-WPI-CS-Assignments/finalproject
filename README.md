# WPI GeoGuessr

A TypeScript monorepo for a WPI campus guessing game.

## Requirements

- [Volta](https://volta.sh/)

Volta reads the pinned Node.js and npm versions from `package.json` automatically.

## Setup

Run [`apps/api/migrations/001_accounts.sql`](apps/api/migrations/001_accounts.sql)
in the Supabase SQL editor, then start the apps with the Supabase PostgreSQL
connection string and a random session secret:

```sh
npm install
DATABASE_URL='postgresql://...' SESSION_SECRET='replace-with-a-random-secret' npm run dev
```

The web app runs at <http://localhost:5173>. The API runs at
<http://localhost:3000>, with a health check at <http://localhost:3000/health>.

## Commands

```sh
npm run dev
npm run check
npm run build
npm --workspace api start
```

The account integration test creates and removes an isolated schema in a test
database:

```sh
TEST_DATABASE_URL='postgresql://...' npm --workspace api test
```

Use a dedicated test database whose user can create temporary schemas.

## Structure

```text
apps/
  api/  Express API
  web/  React and Vite frontend
```
