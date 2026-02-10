# Schema Edge Cases API v1.0.0

- `/nullable` [POST](#post-nullable)
- `/discriminated` [POST](#post-discriminated)
- `/composed` [GET](#get-composed)
- `/deep-nested` [GET](#get-deep-nested)
- `/additional-props` [GET](#get-additional-props)

### POST /nullable

```bash
hono request \
  -P /nullable \
  -X POST \
  -d '{"name":"string"}' \
  src/index.ts
```

### POST /discriminated

```bash
hono request \
  -P /discriminated \
  -X POST \
  -d 'null' \
  src/index.ts
```

### GET /composed

```bash
hono request \
  -P /composed \
  -X GET \
  src/index.ts
```

### GET /deep-nested

```bash
hono request \
  -P /deep-nested \
  -X GET \
  src/index.ts
```

### GET /additional-props

```bash
hono request \
  -P /additional-props \
  -X GET \
  src/index.ts
```
