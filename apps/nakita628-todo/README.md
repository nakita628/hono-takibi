# Hono Todo API

A Todo application built with Hono + React + Cloudflare Workers.

## Tech Stack

- **Runtime**: Cloudflare Workers
- **Framework**: Hono (OpenAPI Hono)
- **Frontend**: React 19 + TailwindCSS
- **Database**: Cloudflare D1
- **Validation**: Zod
- **Type Generation**: hono-takibi (TypeSpec → OpenAPI → Zod)

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

- App: http://localhost:8787
- Swagger UI: http://localhost:8787/api/swagger (dev only)

## Database

```bash
# Local
pnpm wrangler d1 execute DB --local --file=./db/schema.sql

# Remote
pnpm wrangler d1 execute DB --remote --file=./db/schema.sql
```

## wrangler.jsonc

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

## Deploy

### 1. Login to Cloudflare

```bash
pnpm wrangler login
```

### 2. Create D1 Database

```bash
pnpm wrangler d1 create <database-name>
```

Set the output `database_id` in `wrangler.jsonc`.

### 3. Apply Schema

```bash
pnpm wrangler d1 execute DB --remote --file=./db/schema.sql
```

### 4. Build & Deploy

```bash
pnpm build
pnpm deploy
```

## Code Generation

```bash
# Generate Zod schemas/routes from TypeSpec
pnpm takibi

# Generate Cloudflare bindings types
pnpm cf-typegen
```

## Test

```bash
# Run from root directory
pnpm test -- --run apps/nakita628-todo/src/api/index.test.ts
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api | Health check |
| GET | /api/todo | List all todos |
| POST | /api/todo | Create a todo |
| GET | /api/todo/:id | Get a todo |
| PUT | /api/todo/:id | Update a todo |
| DELETE | /api/todo/:id | Delete a todo |