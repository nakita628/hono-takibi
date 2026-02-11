# Callbacks Field Name Test v1.0.0

- `/orders` [POST](#createorder)
- `/payments` [POST](#createpayment)
- `/items` [GET](#listitems)

## createOrder

`POST /orders`

> Code samples

```bash
hono request \
  -P /orders \
  -X POST \
  -d '{"item":"string","quantity":0,"callbackUrl":"https://example.com"}' \
  src/index.ts
```

> Body parameter

```json
{
  "item": "string",
  "quantity": 0,
  "callbackUrl": "https://example.com"
}
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| item | body | string | true | none |
| quantity | body | integer | true | none |
| callbackUrl | body | string | true | none |

> Example responses

> 201 Response

```json
{
  "id": "string",
  "item": "string",
  "quantity": 0,
  "status": "string"
}
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 201 | Order created | Inline |

### Response Schema

Status Code **201**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | string | true | none |
| item | string | true | none |
| quantity | integer | true | none |
| status | string | true | none |

> This operation does not require authentication

## createPayment

`POST /payments`

> Code samples

```bash
hono request \
  -P /payments \
  -X POST \
  -d '{"amount":0,"currency":"string","successUrl":"https://example.com","failureUrl":"https://example.com"}' \
  src/index.ts
```

> Body parameter

```json
{
  "amount": 0,
  "currency": "string",
  "successUrl": "https://example.com",
  "failureUrl": "https://example.com"
}
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| amount | body | number | true | none |
| currency | body | string | true | none |
| successUrl | body | string | true | none |
| failureUrl | body | string | true | none |

> Example responses

> 201 Response

```json
{
  "id": "string",
  "amount": 0,
  "currency": "string",
  "status": "string"
}
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 201 | Payment created | Inline |

### Response Schema

Status Code **201**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | string | true | none |
| amount | number | true | none |
| currency | string | true | none |
| status | string | true | none |

> This operation does not require authentication

## listItems

`GET /items`

> Code samples

```bash
hono request \
  -P /items \
  -X GET \
  src/index.ts
```

> Example responses

> 200 Response

```json
[
  {
    "id": "string",
    "name": "string"
  }
]
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
| name | string | true | none |

> This operation does not require authentication
