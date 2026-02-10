# Parameters Merge API v1.0.0

- `/items/{itemId}` [GET](#get-itemsitemid) [PUT](#put-itemsitemid) [DELETE](#delete-itemsitemid)
- `/items` [GET](#get-items)

### GET /items/{itemId}

```bash
hono request \
  -P /items/{itemId} \
  -X GET \
  src/index.ts
```

### PUT /items/{itemId}

```bash
hono request \
  -P /items/{itemId} \
  -X PUT \
  -d '{}' \
  src/index.ts
```

### DELETE /items/{itemId}

```bash
hono request \
  -P /items/{itemId} \
  -X DELETE \
  src/index.ts
```

### GET /items

```bash
hono request \
  -P /items \
  -X GET \
  src/index.ts
```
