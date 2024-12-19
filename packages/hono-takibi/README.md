# Hono Takibi

Hono Takibi is a CLI tool that generates Hono routes from OpenAPI specifications.

```bash
npm add -D hono-takibi
```

# Usage

```bash
npx hono-takibi path/to/input.yaml -o path/to/output.ts
```

# Example

```bash
npx hono-takibi example/pet-store.yaml -o routes/pet-store.ts
```

```bash
npx hono-takibi example/hono.yaml -o routes/hono.ts
```

## Demo

![demo](../../demo/hono-takibi.gif)