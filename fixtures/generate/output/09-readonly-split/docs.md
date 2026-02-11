# Readonly Split API v1.0.0

- `/posts` [GET](#listposts) [POST](#createpost)
- `/posts/{id}` [GET](#getpost) [PUT](#updatepost) [DELETE](#deletepost)
- `/posts/{id}/comments` [GET](#listcomments) [POST](#createcomment)
- `/tags` [GET](#listtags)

## listPosts

`GET /posts`

> Code samples

```bash
hono request \
  -P /posts \
  -X GET \
  src/index.ts
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| page | query | integer | false | none |
| limit | query | integer | false | none |

> Example responses

> 200 Response

```json
{
  "posts": [
    {
      "id": 0,
      "title": "string",
      "body": "string",
      "author": {
        "id": 0,
        "name": "string"
      },
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
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
| posts | array | true | none |
| posts.id | integer | true | none |
| posts.title | string | true | none |
| posts.body | string | true | none |
| posts.author | Author | true | none |
| posts.author.id | integer | true | none |
| posts.author.name | string | true | none |
| posts.author.avatarUrl | string | false | none |
| posts.tags | array | false | none |
| posts.tags.id | integer | true | none |
| posts.tags.name | string | true | none |
| posts.tags.slug | string | true | none |
| posts.createdAt | string | true | none |
| posts.updatedAt | string | true | none |
| total | integer | true | none |

> This operation does not require authentication

## createPost

`POST /posts`

> Code samples

```bash
hono request \
  -P /posts \
  -X POST \
  -d '{"title":"string","body":"string"}' \
  src/index.ts
```

> Body parameter

```json
{
  "title": "string",
  "body": "string"
}
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| title | body | string | true | none |
| body | body | string | true | none |
| tagIds | body | array | false | none |

> Example responses

> 201 Response

```json
{
  "id": 0,
  "title": "string",
  "body": "string",
  "author": {
    "id": 0,
    "name": "string"
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
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
| title | string | true | none |
| body | string | true | none |
| author | Author | true | none |
| author.id | integer | true | none |
| author.name | string | true | none |
| author.avatarUrl | string | false | none |
| tags | array | false | none |
| tags.id | integer | true | none |
| tags.name | string | true | none |
| tags.slug | string | true | none |
| createdAt | string | true | none |
| updatedAt | string | true | none |

> This operation does not require authentication

## getPost

`GET /posts/{id}`

> Code samples

```bash
hono request \
  -P /posts/{id} \
  -X GET \
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
  "title": "string",
  "body": "string",
  "author": {
    "id": 0,
    "name": "string"
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
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
| title | string | true | none |
| body | string | true | none |
| author | Author | true | none |
| author.id | integer | true | none |
| author.name | string | true | none |
| author.avatarUrl | string | false | none |
| tags | array | false | none |
| tags.id | integer | true | none |
| tags.name | string | true | none |
| tags.slug | string | true | none |
| createdAt | string | true | none |
| updatedAt | string | true | none |

> This operation does not require authentication

## updatePost

`PUT /posts/{id}`

> Code samples

```bash
hono request \
  -P /posts/{id} \
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
| id | path | integer | true | none |
| title | body | string | false | none |
| body | body | string | false | none |
| tagIds | body | array | false | none |

> Example responses

> 200 Response

```json
{
  "id": 0,
  "title": "string",
  "body": "string",
  "author": {
    "id": 0,
    "name": "string"
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
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
| title | string | true | none |
| body | string | true | none |
| author | Author | true | none |
| author.id | integer | true | none |
| author.name | string | true | none |
| author.avatarUrl | string | false | none |
| tags | array | false | none |
| tags.id | integer | true | none |
| tags.name | string | true | none |
| tags.slug | string | true | none |
| createdAt | string | true | none |
| updatedAt | string | true | none |

> This operation does not require authentication

## deletePost

`DELETE /posts/{id}`

> Code samples

```bash
hono request \
  -P /posts/{id} \
  -X DELETE \
  src/index.ts
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| id | path | integer | true | none |

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | Deleted | None |

> This operation does not require authentication

## listComments

`GET /posts/{id}/comments`

> Code samples

```bash
hono request \
  -P /posts/{id}/comments \
  -X GET \
  src/index.ts
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| id | path | integer | true | none |

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "body": "string",
    "author": {
      "id": 0,
      "name": "string"
    },
    "createdAt": "2024-01-01T00:00:00Z"
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
| id | integer | true | none |
| body | string | true | none |
| author | Author | true | none |
| author.id | integer | true | none |
| author.name | string | true | none |
| author.avatarUrl | string | false | none |
| createdAt | string | true | none |

> This operation does not require authentication

## createComment

`POST /posts/{id}/comments`

> Code samples

```bash
hono request \
  -P /posts/{id}/comments \
  -X POST \
  -d '{"body":"string"}' \
  src/index.ts
```

> Body parameter

```json
{
  "body": "string"
}
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| id | path | integer | true | none |
| body | body | string | true | none |

> Example responses

> 201 Response

```json
{
  "id": 0,
  "body": "string",
  "author": {
    "id": 0,
    "name": "string"
  },
  "createdAt": "2024-01-01T00:00:00Z"
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
| body | string | true | none |
| author | Author | true | none |
| author.id | integer | true | none |
| author.name | string | true | none |
| author.avatarUrl | string | false | none |
| createdAt | string | true | none |

> This operation does not require authentication

## listTags

`GET /tags`

> Code samples

```bash
hono request \
  -P /tags \
  -X GET \
  src/index.ts
```

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "name": "string",
    "slug": "string"
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
| id | integer | true | none |
| name | string | true | none |
| slug | string | true | none |

> This operation does not require authentication
