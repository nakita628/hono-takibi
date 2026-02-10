# All Exports API v1.0.0

- `/users` [GET](#get-users) [POST](#post-users)
- `/users/{id}` [GET](#get-usersid)

### GET /users

```bash
hono request \
  -P /users \
  -X GET \
  src/index.ts
```

### POST /users

```bash
hono request \
  -P /users \
  -X POST \
  -d '{"name":"string","email":"user@example.com"}' \
  src/index.ts
```

### GET /users/{id}

```bash
hono request \
  -P /users/{id} \
  -X GET \
  -H "Authorization: Bearer ${TOKEN}" \
  src/index.ts
```
