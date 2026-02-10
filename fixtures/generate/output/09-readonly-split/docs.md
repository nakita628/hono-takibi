# Readonly Split API v1.0.0

- `/posts` [GET](#get-posts) [POST](#post-posts)
- `/posts/{id}` [GET](#get-postsid) [PUT](#put-postsid) [DELETE](#delete-postsid)
- `/posts/{id}/comments` [GET](#get-postsidcomments) [POST](#post-postsidcomments)
- `/tags` [GET](#get-tags)

### GET /posts

```bash
hono request \
  -P /posts \
  -X GET \
  src/index.ts
```

### POST /posts

```bash
hono request \
  -P /posts \
  -X POST \
  -d '{"title":"string","body":"string"}' \
  src/index.ts
```

### GET /posts/{id}

```bash
hono request \
  -P /posts/{id} \
  -X GET \
  src/index.ts
```

### PUT /posts/{id}

```bash
hono request \
  -P /posts/{id} \
  -X PUT \
  -d '{}' \
  src/index.ts
```

### DELETE /posts/{id}

```bash
hono request \
  -P /posts/{id} \
  -X DELETE \
  src/index.ts
```

### GET /posts/{id}/comments

```bash
hono request \
  -P /posts/{id}/comments \
  -X GET \
  src/index.ts
```

### POST /posts/{id}/comments

```bash
hono request \
  -P /posts/{id}/comments \
  -X POST \
  -d '{"body":"string"}' \
  src/index.ts
```

### GET /tags

```bash
hono request \
  -P /tags \
  -X GET \
  src/index.ts
```
