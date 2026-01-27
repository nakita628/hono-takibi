# Takibi Todo

Todo app built with Hono + React Router + SWR + Cloudflare Workers + D1

## Setup

```bash
pnpm install
```

## Local Development (D1)

```bash
# 1. Initialize local D1 database
pnpm wrangler d1 execute DB --local --file=./db/schema.sql

# 2. Build and run
pnpm build && pnpm preview
```

Access: http://localhost:8787

## Production Deploy

```bash
pnpm wrangler d1 execute DB --remote --file=./db/schema.sql

pnpm run deploy
```