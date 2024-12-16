# Hono Takibi

Hono Takibi is a CLI tool that generates Hono routes from OpenAPI specifications.

```bash
npm add -D hono-takibi
```

# Usage

```bash
npx hono-takibi path/to/openapi.yaml -o path/to/output_hono.ts
```

# Example

```bash
npx hono-takibi example/pet-store.yaml -o routes/pet-store.ts
```
