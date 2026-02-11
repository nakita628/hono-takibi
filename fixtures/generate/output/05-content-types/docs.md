# Content Types API v1.0.0

- `/json` [POST](#postjson)
- `/form` [POST](#postform)
- `/upload` [POST](#uploadfile)
- `/text` [POST](#posttext)
- `/multi-content` [POST](#postmulticontent)

## postJson

`POST /json`

> Code samples

```bash
hono request \
  -P /json \
  -X POST \
  -d '{"name":"string","value":0}' \
  src/index.ts
```

> Body parameter

```json
{
  "name": "string",
  "value": 0
}
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| name | body | string | true | none |
| value | body | integer | true | none |

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string"
}
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |

### Response Schema

Status Code **200**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | integer | true | none |
| name | string | true | none |

> This operation does not require authentication

## postForm

`POST /form`

> Code samples

```bash
hono request \
  -P /form \
  -X POST \
  src/index.ts
```

> Example responses

> 200 Response

```json
{
  "success": true
}
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |

### Response Schema

Status Code **200**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| success | boolean | true | none |

> This operation does not require authentication

## uploadFile

`POST /upload`

> Code samples

```bash
hono request \
  -P /upload \
  -X POST \
  src/index.ts
```

> Example responses

> 200 Response

```json
{
  "url": "string"
}
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |

### Response Schema

Status Code **200**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| url | string | true | none |

> This operation does not require authentication

## postText

`POST /text`

> Code samples

```bash
hono request \
  -P /text \
  -X POST \
  src/index.ts
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | None |

> This operation does not require authentication

## postMultiContent

`POST /multi-content`

> Code samples

```bash
hono request \
  -P /multi-content \
  -X POST \
  -d '{"data":"string"}' \
  src/index.ts
```

> Body parameter

```json
{
  "data": "string"
}
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| data | body | string | true | none |

> Example responses

> 200 Response

```json
{
  "received": true
}
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |

### Response Schema

Status Code **200**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| received | boolean | true | none |

> This operation does not require authentication
