# nakita628-todo

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