# Security Schemes API v1.0.0

- `/public` [GET](#get-public)
- `/bearer-protected` [GET](#get-bearer-protected)
- `/api-key-protected` [GET](#get-api-key-protected)
- `/basic-protected` [GET](#get-basic-protected)
- `/oauth-protected` [GET](#get-oauth-protected)
- `/multi-auth` [GET](#get-multi-auth)

### GET /public

```bash
hono request \
  -P /public \
  -X GET \
  src/index.ts
```

### GET /bearer-protected

```bash
hono request \
  -P /bearer-protected \
  -X GET \
  -H "Authorization: Bearer ${TOKEN}" \
  src/index.ts
```

### GET /api-key-protected

```bash
hono request \
  -P /api-key-protected \
  -X GET \
  -H "X-API-Key: ${API_KEY}" \
  src/index.ts
```

### GET /basic-protected

```bash
hono request \
  -P /basic-protected \
  -X GET \
  -H "Authorization: Basic ${CREDENTIALS}" \
  src/index.ts
```

### GET /oauth-protected

```bash
hono request \
  -P /oauth-protected \
  -X GET \
  src/index.ts
```

### GET /multi-auth

```bash
hono request \
  -P /multi-auth \
  -X GET \
  -H "Authorization: Bearer ${TOKEN}" \
  src/index.ts
```
