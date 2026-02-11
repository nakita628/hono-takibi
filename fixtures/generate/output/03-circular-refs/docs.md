# Circular References API v1.0.0

- `/tree` [GET](#gettree) [POST](#createtree)
- `/graph` [GET](#getgraph)

## getTree

`GET /tree`

> Code samples

```bash
hono request \
  -P /tree \
  -X GET \
  src/index.ts
```

> Example responses

> 200 Response

```json
{
  "id": 0,
  "value": "string"
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
| value | string | true | none |
| children | array | false | none |

> This operation does not require authentication

## createTree

`POST /tree`

> Code samples

```bash
hono request \
  -P /tree \
  -X POST \
  -d '{"id":0,"value":"string"}' \
  src/index.ts
```

> Body parameter

```json
{
  "id": 0,
  "value": "string"
}
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| id | body | integer | true | none |
| value | body | string | true | none |
| children | body | array | false | none |

> Example responses

> 201 Response

```json
{
  "id": 0,
  "value": "string"
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
| id | integer | true | none |
| value | string | true | none |
| children | array | false | none |

> This operation does not require authentication

## getGraph

`GET /graph`

> Code samples

```bash
hono request \
  -P /graph \
  -X GET \
  src/index.ts
```

> Example responses

> 200 Response

```json
{
  "id": 0
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
| ref | NodeB | false | none |
| ref.id | integer | true | none |
| ref.ref | NodeC | false | none |
| ref.ref.id | integer | true | none |
| ref.ref.ref | NodeA | false | none |

> This operation does not require authentication
