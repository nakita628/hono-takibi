# All Exports API v1.0.0

- `/users` [GET](#getusers) [POST](#createuser)
- `/users/{id}` [GET](#getuserbyid)

## getUsers

`GET /users`

> Code samples

```bash
hono request \
  -P /users \
  -X GET \
  src/index.ts
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| page | query | integer | false | none |

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "name": "string",
    "email": "user@example.com"
  }
]
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | A list of users | Inline |

### Response Schema

Status Code **200**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | integer | true | none |
| name | string | true | none |
| email | string | true | none |

> This operation does not require authentication

## createUser

`POST /users`

> Code samples

```bash
hono request \
  -P /users \
  -X POST \
  -d '{"name":"string","email":"user@example.com"}' \
  src/index.ts
```

> Body parameter

```json
{
  "name": "string",
  "email": "user@example.com"
}
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| name | body | string | true | none |
| email | body | string | true | none |

> Example responses

> 201 Response

```json
{
  "id": 0,
  "name": "string",
  "email": "user@example.com"
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
| name | string | true | none |
| email | string | true | none |

> This operation does not require authentication

## getUserById

`GET /users/{id}`

> Code samples

```bash
hono request \
  -P /users/{id} \
  -X GET \
  -H "Authorization: Bearer ${TOKEN}" \
  src/index.ts
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| id | path | integer | true | none |

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "email": "user@example.com"
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
| email | string | true | none |

> Authentication: BearerAuth
