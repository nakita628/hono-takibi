# Content Types API v1.0.0

- `/json` [POST](#post-json)
- `/form` [POST](#post-form)
- `/upload` [POST](#post-upload)
- `/text` [POST](#post-text)
- `/multi-content` [POST](#post-multi-content)

### POST /json

```bash
hono request \
  -P /json \
  -X POST \
  -d '{"name":"string","value":0}' \
  src/index.ts
```

### POST /form

```bash
hono request \
  -P /form \
  -X POST \
  src/index.ts
```

### POST /upload

```bash
hono request \
  -P /upload \
  -X POST \
  src/index.ts
```

### POST /text

```bash
hono request \
  -P /text \
  -X POST \
  src/index.ts
```

### POST /multi-content

```bash
hono request \
  -P /multi-content \
  -X POST \
  -d '{"data":"string"}' \
  src/index.ts
```
