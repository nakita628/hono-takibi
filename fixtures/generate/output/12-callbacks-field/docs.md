# Callbacks Field Name Test v1.0.0

- `/orders` [POST](#post-orders)
- `/payments` [POST](#post-payments)
- `/items` [GET](#get-items)

### POST /orders

```bash
hono request \
  -P /orders \
  -X POST \
  -d '{"item":"string","quantity":0,"callbackUrl":"https://example.com"}' \
  src/index.ts
```

### POST /payments

```bash
hono request \
  -P /payments \
  -X POST \
  -d '{"amount":0,"currency":"string","successUrl":"https://example.com","failureUrl":"https://example.com"}' \
  src/index.ts
```

### GET /items

```bash
hono request \
  -P /items \
  -X GET \
  src/index.ts
```
