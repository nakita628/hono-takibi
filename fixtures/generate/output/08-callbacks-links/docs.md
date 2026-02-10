# Callbacks and Links API v1.0.0

- `/subscriptions` [POST](#post-subscriptions)
- `/subscriptions/{id}` [GET](#get-subscriptionsid) [DELETE](#delete-subscriptionsid)
- `/webhooks/test` [POST](#post-webhookstest)

### POST /subscriptions

```bash
hono request \
  -P /subscriptions \
  -X POST \
  -d '{"callbackUrl":"https://example.com","events":["created"]}' \
  src/index.ts
```

### GET /subscriptions/{id}

```bash
hono request \
  -P /subscriptions/{id} \
  -X GET \
  src/index.ts
```

### DELETE /subscriptions/{id}

```bash
hono request \
  -P /subscriptions/{id} \
  -X DELETE \
  src/index.ts
```

### POST /webhooks/test

```bash
hono request \
  -P /webhooks/test \
  -X POST \
  -d '{"url":"https://example.com"}' \
  src/index.ts
```
