# Composition Keywords API v1.0.0

- `/one-of` [POST](#postoneof)
- `/any-of` [POST](#postanyof)
- `/all-of` [POST](#postallof)
- `/not` [POST](#postnot)
- `/not-ref` [GET](#getnotref)
- `/not-enum` [GET](#getnotenum)
- `/not-const` [GET](#getnotconst)
- `/not-composition` [GET](#getnotcomposition)
- `/all-of-sibling` [GET](#getallofsibling)
- `/nullable-one-of` [GET](#getnullableoneof)
- `/any-of-three` [GET](#getanyofthree)
- `/any-of-ref` [GET](#getanyofref)

## postOneOf

`POST /one-of`

> Code samples

```bash
hono request \
  -P /one-of \
  -X POST \
  -d 'null' \
  src/index.ts
```

> Body parameter

```json
null
```

> Example responses

> 200 Response

```json
null
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |

> This operation does not require authentication

## postAnyOf

`POST /any-of`

> Code samples

```bash
hono request \
  -P /any-of \
  -X POST \
  -d 'null' \
  src/index.ts
```

> Body parameter

```json
null
```

> Example responses

> 200 Response

```json
null
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |

> This operation does not require authentication

## postAllOf

`POST /all-of`

> Code samples

```bash
hono request \
  -P /all-of \
  -X POST \
  -d 'null' \
  src/index.ts
```

> Body parameter

```json
null
```

> Example responses

> 200 Response

```json
null
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |

> This operation does not require authentication

## postNot

`POST /not`

> Code samples

```bash
hono request \
  -P /not \
  -X POST \
  -d 'null' \
  src/index.ts
```

> Body parameter

```json
null
```

> Example responses

> 200 Response

```json
null
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |

> This operation does not require authentication

## getNotRef

`GET /not-ref`

> Code samples

```bash
hono request \
  -P /not-ref \
  -X GET \
  src/index.ts
```

> Example responses

> 200 Response

```json
null
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |

> This operation does not require authentication

## getNotEnum

`GET /not-enum`

> Code samples

```bash
hono request \
  -P /not-enum \
  -X GET \
  src/index.ts
```

> Example responses

> 200 Response

```json
null
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |

> This operation does not require authentication

## getNotConst

`GET /not-const`

> Code samples

```bash
hono request \
  -P /not-const \
  -X GET \
  src/index.ts
```

> Example responses

> 200 Response

```json
null
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |

> This operation does not require authentication

## getNotComposition

`GET /not-composition`

> Code samples

```bash
hono request \
  -P /not-composition \
  -X GET \
  src/index.ts
```

> Example responses

> 200 Response

```json
null
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |

> This operation does not require authentication

## getAllOfSibling

`GET /all-of-sibling`

> Code samples

```bash
hono request \
  -P /all-of-sibling \
  -X GET \
  src/index.ts
```

> Example responses

> 200 Response

```json
null
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |

> This operation does not require authentication

## getNullableOneOf

`GET /nullable-one-of`

> Code samples

```bash
hono request \
  -P /nullable-one-of \
  -X GET \
  src/index.ts
```

> Example responses

> 200 Response

```json
null
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |

> This operation does not require authentication

## getAnyOfThree

`GET /any-of-three`

> Code samples

```bash
hono request \
  -P /any-of-three \
  -X GET \
  src/index.ts
```

> Example responses

> 200 Response

```json
null
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |

> This operation does not require authentication

## getAnyOfRef

`GET /any-of-ref`

> Code samples

```bash
hono request \
  -P /any-of-ref \
  -X GET \
  src/index.ts
```

> Example responses

> 200 Response

```json
null
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |

> This operation does not require authentication
