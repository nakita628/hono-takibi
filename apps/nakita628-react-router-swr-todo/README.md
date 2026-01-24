# Takibi Todo

Todo app built with Hono + React + Cloudflare Workers

## Setup

```bash
pnpm install
```

## Local Development

```bash
pnpm wrangler d1 execute DB --local --file=./db/schema.sql

pnpm build

pnpm preview
```

- http://localhost:8787

## Production Deploy

```bash
pnpm wrangler d1 execute DB --remote --file=./db/schema.sql

pnpm run deploy
```

## wrangler.jsonc Example

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "***",
  "main": "server-build/index.js",
  "assets": {
    "directory": "./dist"
  },
  "compatibility_date": "****-**-**",
  "dev": {
    "ip": "0.0.0.0",
    "port": 8787,
    "local_protocol": "http"
  },
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "***",
      "database_id": "***"
    }
  ]
}
```