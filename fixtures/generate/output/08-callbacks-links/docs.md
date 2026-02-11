# Callbacks and Links API v1.0.0

- `/subscriptions` [POST](#createsubscription)
- `/subscriptions/{id}` [GET](#getsubscription) [DELETE](#deletesubscription)
- `/webhooks/test` [POST](#testwebhook)

## createSubscription

`POST /subscriptions`

> Code samples

```bash
hono request \
  -P /subscriptions \
  -X POST \
  -d '{"callbackUrl":"https://example.com","events":["created"]}' \
  src/index.ts
```

> Body parameter

```json
{
  "callbackUrl": "https://example.com",
  "events": [
    "created"
  ]
}
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| callbackUrl | body | string | true | none |
| events | body | array | true | none |

> Example responses

> 201 Response

```json
{
  "id": "string",
  "callbackUrl": "https://example.com",
  "events": [
    "string"
  ],
  "status": "active"
}
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 201 | Created | Inline |

### Response Schema

Status Code **201**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | string | true | none |
| callbackUrl | string | true | none |
| events | array | true | none |
| status | string | true | none |

> This operation does not require authentication

## getSubscription

`GET /subscriptions/{id}`

> Code samples

```bash
hono request \
  -P /subscriptions/{id} \
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
  "id": "string",
  "callbackUrl": "https://example.com",
  "events": [
    "string"
  ],
  "status": "active"
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
| id | string | true | none |
| callbackUrl | string | true | none |
| events | array | true | none |
| status | string | true | none |

> This operation does not require authentication

## deleteSubscription

`DELETE /subscriptions/{id}`

> Code samples

```bash
hono request \
  -P /subscriptions/{id} \
  -X DELETE \
  src/index.ts
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| id | path | string | true | none |

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | Deleted | None |

> This operation does not require authentication

## testWebhook

`POST /webhooks/test`

> Code samples

```bash
hono request \
  -P /webhooks/test \
  -X POST \
  -d '{"url":"https://example.com"}' \
  src/index.ts
```

> Body parameter

```json
{
  "url": "https://example.com"
}
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| url | body | string | true | none |

> Example responses

> 200 Response

```json
{
  "sent": true
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
| sent | boolean | true | none |

> This operation does not require authentication
