# Security Schemes API v1.0.0

- `/public` [GET](#getpublic)
- `/bearer-protected` [GET](#getbearerprotected)
- `/api-key-protected` [GET](#getapikeyprotected)
- `/basic-protected` [GET](#getbasicprotected)
- `/oauth-protected` [GET](#getoauthprotected)
- `/multi-auth` [GET](#getmultiauth)

## getPublic

`GET /public`

> Code samples

```bash
hono request \
  -P /public \
  -X GET \
  src/index.ts
```

> Example responses

> 200 Response

```json
{
  "message": "string"
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
| message | string | true | none |

> This operation does not require authentication

## getBearerProtected

`GET /bearer-protected`

> Code samples

```bash
hono request \
  -P /bearer-protected \
  -X GET \
  -H "Authorization: Bearer ${TOKEN}" \
  src/index.ts
```

> Example responses

> 200 Response

```json
{
  "data": "string"
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
| data | string | true | none |

> Authentication: BearerAuth

## getApiKeyProtected

`GET /api-key-protected`

> Code samples

```bash
hono request \
  -P /api-key-protected \
  -X GET \
  -H "X-API-Key: ${API_KEY}" \
  src/index.ts
```

> Example responses

> 200 Response

```json
{
  "data": "string"
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
| data | string | true | none |

> Authentication: ApiKeyAuth

## getBasicProtected

`GET /basic-protected`

> Code samples

```bash
hono request \
  -P /basic-protected \
  -X GET \
  -H "Authorization: Basic ${CREDENTIALS}" \
  src/index.ts
```

> Example responses

> 200 Response

```json
{
  "data": "string"
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
| data | string | true | none |

> Authentication: BasicAuth

## getOAuthProtected

`GET /oauth-protected`

> Code samples

```bash
hono request \
  -P /oauth-protected \
  -X GET \
  src/index.ts
```

> Example responses

> 200 Response

```json
{
  "data": "string"
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
| data | string | true | none |

> Authentication: OAuth2

## getMultiAuth

`GET /multi-auth`

> Code samples

```bash
hono request \
  -P /multi-auth \
  -X GET \
  -H "Authorization: Bearer ${TOKEN}" \
  src/index.ts
```

> Example responses

> 200 Response

```json
{
  "data": "string"
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
| data | string | true | none |

> Authentication: BearerAuth, ApiKeyAuth
