# Minimal API v1.0.0

- `/health` [GET](#gethealth)
- `/health/test` [GET](#gethealthtest)
- `/health/test2` [POST](#posthealthtest2)
- `/health/{id}` [GET](#gethealthbyid)

## getHealth

`GET /health`

> Code samples

```bash
hono request \
  -P /health \
  -X GET \
  src/index.ts
```

> Example responses

> 200 Response

```json
{
  "status": "string"
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
| status | string | true | none |

> This operation does not require authentication

## getHealthTest

`GET /health/test`

> Code samples

```bash
hono request \
  -P /health/test \
  -X GET \
  src/index.ts
```

> Example responses

> 200 Response

```json
{
  "status": "string"
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
| status | string | true | none |

> This operation does not require authentication

## postHealthTest2

`POST /health/test2`

> Code samples

```bash
hono request \
  -P /health/test2 \
  -X POST \
  -d '{}' \
  src/index.ts
```

> Body parameter

```json
{}
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| status | body | string | false | none |
| required | body | object | false | none |

> Example responses

> 200 Response

```json
{
  "status": "string"
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
| status | string | true | none |

> This operation does not require authentication

## getHealthById

`GET /health/{id}`

> Code samples

```bash
hono request \
  -P /health/{id} \
  -X GET \
  src/index.ts
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| id | path | string | true | none |

> Example responses

> 200 Response

```json
{
  "status": "string"
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
| status | string | true | none |

> This operation does not require authentication
