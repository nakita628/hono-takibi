# Composition Keywords API v1.0.0

- `/one-of` [POST](#post-one-of)
- `/any-of` [POST](#post-any-of)
- `/all-of` [POST](#post-all-of)
- `/not` [POST](#post-not)
- `/not-ref` [GET](#get-not-ref)
- `/not-enum` [GET](#get-not-enum)
- `/not-const` [GET](#get-not-const)
- `/not-composition` [GET](#get-not-composition)
- `/all-of-sibling` [GET](#get-all-of-sibling)
- `/nullable-one-of` [GET](#get-nullable-one-of)
- `/any-of-three` [GET](#get-any-of-three)
- `/any-of-ref` [GET](#get-any-of-ref)

### POST /one-of

```bash
hono request \
  -P /one-of \
  -X POST \
  -d 'null' \
  src/index.ts
```

### POST /any-of

```bash
hono request \
  -P /any-of \
  -X POST \
  -d 'null' \
  src/index.ts
```

### POST /all-of

```bash
hono request \
  -P /all-of \
  -X POST \
  -d 'null' \
  src/index.ts
```

### POST /not

```bash
hono request \
  -P /not \
  -X POST \
  -d 'null' \
  src/index.ts
```

### GET /not-ref

```bash
hono request \
  -P /not-ref \
  -X GET \
  src/index.ts
```

### GET /not-enum

```bash
hono request \
  -P /not-enum \
  -X GET \
  src/index.ts
```

### GET /not-const

```bash
hono request \
  -P /not-const \
  -X GET \
  src/index.ts
```

### GET /not-composition

```bash
hono request \
  -P /not-composition \
  -X GET \
  src/index.ts
```

### GET /all-of-sibling

```bash
hono request \
  -P /all-of-sibling \
  -X GET \
  src/index.ts
```

### GET /nullable-one-of

```bash
hono request \
  -P /nullable-one-of \
  -X GET \
  src/index.ts
```

### GET /any-of-three

```bash
hono request \
  -P /any-of-three \
  -X GET \
  src/index.ts
```

### GET /any-of-ref

```bash
hono request \
  -P /any-of-ref \
  -X GET \
  src/index.ts
```
