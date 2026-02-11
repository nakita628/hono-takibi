# Minimal API v1.0.0

- `/health` [GET](#get-health)
- `/health/test` [GET](#get-healthtest)

### GET /health

```bash
hono request \
  -P /health \
  -X GET \
  src/index.ts
```

### GET /health/test

```bash
hono request \
  -P /health/test \
  -X GET \
  src/index.ts
```
