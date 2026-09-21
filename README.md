# WPI GeoGuessr

A TypeScript monorepo for a WPI campus guessing game.

## Requirements

- [Volta](https://volta.sh/)

Volta reads the pinned Node.js and npm versions from `package.json` automatically.

## Setup

```sh
npm install
npm run dev
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

## Structure

```text
apps/
  api/  Express API
  web/  React and Vite frontend
```
