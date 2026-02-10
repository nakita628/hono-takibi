# Array & Object Constraints API v1.0.0

- `/tags` [GET](#get-tags) [POST](#post-tags)
- `/settings` [GET](#get-settings) [PUT](#put-settings)
- `/config` [POST](#post-config)
- `/payment` [POST](#post-payment)

### GET /tags

```bash
hono request \
  -P /tags \
  -X GET \
  src/index.ts
```

### POST /tags

```bash
hono request \
  -P /tags \
  -X POST \
  -d '{"metadata":{}}' \
  src/index.ts
```

### GET /settings

```bash
hono request \
  -P /settings \
  -X GET \
  src/index.ts
```

### PUT /settings

```bash
hono request \
  -P /settings \
  -X PUT \
  -d '{"avatar":"string"}' \
  src/index.ts
```

### POST /config

```bash
hono request \
  -P /config \
  -X POST \
  -d '{"data":null}' \
  src/index.ts
```

### POST /payment

```bash
hono request \
  -P /payment \
  -X POST \
  -d '{}' \
  src/index.ts
```
