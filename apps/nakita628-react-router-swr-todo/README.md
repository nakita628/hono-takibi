# Takibi Todo

Todo app built with Hono + React Router + SWR + Cloudflare Workers + D1

## Setup

```bash
pnpm install
```

## Local Development (D1)

D1 uses SQLite locally. The `--local` flag stores data in `.wrangler/state/v3/d1/`.

```bash
# 1. Initialize local D1 database
pnpm wrangler d1 execute DB --local --file=./db/schema.sql

# 2. Build and run
pnpm build && pnpm preview
```

Access: http://localhost:8787

### D1 Local Commands

```bash
# Execute SQL file
pnpm wrangler d1 execute DB --local --file=./db/schema.sql

# Execute SQL command
pnpm wrangler d1 execute DB --local --command="SELECT * FROM todos"

# Reset local database
rm -rf .wrangler/state/v3/d1/
pnpm wrangler d1 execute DB --local --file=./db/schema.sql
```

## Production Deploy

```bash
# 1. Create D1 database (first time only)
pnpm wrangler d1 create todos

# 2. Apply schema to remote D1
pnpm wrangler d1 execute DB --remote --file=./db/schema.sql

# 3. Deploy
pnpm run deploy
```