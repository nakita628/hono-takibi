# Parameters Merge API v1.0.0

- `/items/{itemId}` [GET](#getitem) [PUT](#updateitem) [DELETE](#deleteitem)
- `/items` [GET](#listitems)

## getItem

`GET /items/{itemId}`

> Code samples

```bash
hono request \
  -P /items/{itemId} \
  -X GET \
  src/index.ts
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| fields | query | string | false | none |
| itemId | path | integer | true | none |
| version | header | string | false | none |

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "createdAt": "2024-01-01T00:00:00Z"
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
| createdAt | string | true | none |

> This operation does not require authentication

## updateItem

`PUT /items/{itemId}`

> Code samples

```bash
hono request \
  -P /items/{itemId} \
  -X PUT \
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
| version | header | string | true | none |
| itemId | path | integer | true | none |
| name | body | string | false | none |

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "createdAt": "2024-01-01T00:00:00Z"
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
| createdAt | string | true | none |

> This operation does not require authentication

## deleteItem

`DELETE /items/{itemId}`

> Code samples

```bash
hono request \
  -P /items/{itemId} \
  -X DELETE \
  src/index.ts
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| itemId | path | integer | true | none |
| version | header | string | false | none |

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | Deleted | None |

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

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| limit | query | integer | false | none |
| offset | query | integer | false | none |
| sort | query | string | false | none |

> Example responses

> 200 Response

```json
{
  "items": [
    {
      "id": 0,
      "name": "string",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 0
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
| items | array | true | none |
| items.id | integer | true | none |
| items.name | string | true | none |
| items.createdAt | string | true | none |
| total | integer | true | none |

> This operation does not require authentication
