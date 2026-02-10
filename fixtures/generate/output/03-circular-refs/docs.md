# Circular References API v1.0.0

- `/tree` [GET](#get-tree) [POST](#post-tree)
- `/graph` [GET](#get-graph)

### GET /tree

```bash
hono request \
  -P /tree \
  -X GET \
  src/index.ts
```

### POST /tree

```bash
hono request \
  -P /tree \
  -X POST \
  -d '{"id":0,"value":"string"}' \
  src/index.ts
```

### GET /graph

```bash
hono request \
  -P /graph \
  -X GET \
  src/index.ts
```
