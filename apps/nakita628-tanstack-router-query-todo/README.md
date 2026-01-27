# Takibi Todo

Todo app built with Hono + TanStack Router + TanStack Query + Cloudflare Workers + D1

## Setup

```bash
pnpm install
```

## Local Development (D1)

```bash
pnpm generate
pnpm local-migrate
```

Access: http://localhost:8787

## Production Deploy

```bash
pnpm migrate

pnpm run deploy
```