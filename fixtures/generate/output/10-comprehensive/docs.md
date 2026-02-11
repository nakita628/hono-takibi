# Comprehensive EC API v1.0.0

- `/users` [GET](#listusers) [POST](#createuser)
- `/users/{userId}` [GET](#getuser) [PUT](#updateuser) [DELETE](#deleteuser)
- `/products` [GET](#listproducts) [POST](#createproduct)
- `/products/{productId}` [GET](#getproduct) [PUT](#updateproduct)
- `/products/{productId}/reviews` [GET](#listreviews) [POST](#createreview)
- `/orders` [GET](#listorders) [POST](#createorder)
- `/orders/{orderId}` [GET](#getorder)
- `/categories` [GET](#listcategories)
- `/upload/image` [POST](#uploadimage)

## listUsers

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
| limit | query | integer | false | none |

> Example responses

> 200 Response

```json
{
  "users": [
    {
      "id": 0,
      "name": "string",
      "email": "user@example.com",
      "role": "admin",
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
| users | array | true | none |
| users.id | integer | true | none |
| users.name | string | true | none |
| users.email | string | true | none |
| users.role | string | true | none |
| users.address | Address | false | none |
| users.address.street | string | true | none |
| users.address.city | string | true | none |
| users.address.state | string | false | none |
| users.address.zip | string | false | none |
| users.address.country | string | true | none |
| users.createdAt | string | true | none |
| total | integer | true | none |

> This operation does not require authentication

## createUser

`POST /users`

> Code samples

```bash
hono request \
  -P /users \
  -X POST \
  -H "Authorization: Bearer ${TOKEN}" \
  -d '{"name":"string","email":"user@example.com","password":"string"}' \
  src/index.ts
```

> Body parameter

```json
{
  "name": "string",
  "email": "user@example.com",
  "password": "string"
}
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| name | body | string | true | none |
| email | body | string | true | none |
| password | body | string | true | none |
| role | body | string | false | none |
| address | body | Address | false | none |

> Example responses

> 201 Response

```json
{
  "id": 0,
  "name": "string",
  "email": "user@example.com",
  "role": "admin",
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
| name | string | true | none |
| email | string | true | none |
| role | string | true | none |
| address | Address | false | none |
| address.street | string | true | none |
| address.city | string | true | none |
| address.state | string | false | none |
| address.zip | string | false | none |
| address.country | string | true | none |
| createdAt | string | true | none |

> Authentication: BearerAuth

## getUser

`GET /users/{userId}`

> Code samples

```bash
hono request \
  -P /users/{userId} \
  -X GET \
  src/index.ts
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| userId | path | integer | true | none |

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "email": "user@example.com",
  "role": "admin",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

> 404 Response

```json
{
  "code": 0,
  "message": "string"
}
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |
| 404 | Resource not found | Inline |

### Response Schema

Status Code **200**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | integer | true | none |
| name | string | true | none |
| email | string | true | none |
| role | string | true | none |
| address | Address | false | none |
| address.street | string | true | none |
| address.city | string | true | none |
| address.state | string | false | none |
| address.zip | string | false | none |
| address.country | string | true | none |
| createdAt | string | true | none |

### Response Schema

Status Code **404**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| code | integer | true | none |
| message | string | true | none |

> This operation does not require authentication

## updateUser

`PUT /users/{userId}`

> Code samples

```bash
hono request \
  -P /users/{userId} \
  -X PUT \
  -H "Authorization: Bearer ${TOKEN}" \
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
| userId | path | integer | true | none |
| name | body | string | false | none |
| email | body | string | false | none |
| address | body | Address | false | none |

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "email": "user@example.com",
  "role": "admin",
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
| email | string | true | none |
| role | string | true | none |
| address | Address | false | none |
| address.street | string | true | none |
| address.city | string | true | none |
| address.state | string | false | none |
| address.zip | string | false | none |
| address.country | string | true | none |
| createdAt | string | true | none |

> Authentication: BearerAuth

## deleteUser

`DELETE /users/{userId}`

> Code samples

```bash
hono request \
  -P /users/{userId} \
  -X DELETE \
  -H "Authorization: Bearer ${TOKEN}" \
  src/index.ts
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| userId | path | integer | true | none |

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | Deleted | None |

> Authentication: BearerAuth

## listProducts

`GET /products`

> Code samples

```bash
hono request \
  -P /products \
  -X GET \
  src/index.ts
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| page | query | integer | false | none |
| limit | query | integer | false | none |
| category | query | string | false | none |
| minPrice | query | number | false | none |
| maxPrice | query | number | false | none |

> Example responses

> 200 Response

```json
{
  "products": [
    {
      "id": 0,
      "name": "string",
      "price": 0,
      "category": {
        "id": 0,
        "name": "string"
      },
      "inStock": true,
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
| products | array | true | none |
| products.id | integer | true | none |
| products.name | string | true | none |
| products.description | string | false | none |
| products.price | number | true | none |
| products.category | Category | true | none |
| products.category.id | integer | true | none |
| products.category.name | string | true | none |
| products.category.parentId | integer | null | false | none |
| products.tags | array | false | none |
| products.inStock | boolean | true | none |
| products.createdAt | string | true | none |
| total | integer | true | none |

> This operation does not require authentication

## createProduct

`POST /products`

> Code samples

```bash
hono request \
  -P /products \
  -X POST \
  -H "Authorization: Bearer ${TOKEN}" \
  -d '{"name":"string","price":0,"categoryId":0}' \
  src/index.ts
```

> Body parameter

```json
{
  "name": "string",
  "price": 0,
  "categoryId": 0
}
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| name | body | string | true | none |
| description | body | string | false | none |
| price | body | number | true | none |
| categoryId | body | integer | true | none |
| tags | body | array | false | none |

> Example responses

> 201 Response

```json
{
  "id": 0,
  "name": "string",
  "price": 0,
  "category": {
    "id": 0,
    "name": "string"
  },
  "inStock": true,
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
| name | string | true | none |
| description | string | false | none |
| price | number | true | none |
| category | Category | true | none |
| category.id | integer | true | none |
| category.name | string | true | none |
| category.parentId | integer | null | false | none |
| tags | array | false | none |
| inStock | boolean | true | none |
| createdAt | string | true | none |

> Authentication: BearerAuth

## getProduct

`GET /products/{productId}`

> Code samples

```bash
hono request \
  -P /products/{productId} \
  -X GET \
  src/index.ts
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| productId | path | integer | true | none |

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "price": 0,
  "category": {
    "id": 0,
    "name": "string"
  },
  "inStock": true,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

> 404 Response

```json
{
  "code": 0,
  "message": "string"
}
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |
| 404 | Resource not found | Inline |

### Response Schema

Status Code **200**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | integer | true | none |
| name | string | true | none |
| description | string | false | none |
| price | number | true | none |
| category | Category | true | none |
| category.id | integer | true | none |
| category.name | string | true | none |
| category.parentId | integer | null | false | none |
| tags | array | false | none |
| inStock | boolean | true | none |
| createdAt | string | true | none |

### Response Schema

Status Code **404**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| code | integer | true | none |
| message | string | true | none |

> This operation does not require authentication

## updateProduct

`PUT /products/{productId}`

> Code samples

```bash
hono request \
  -P /products/{productId} \
  -X PUT \
  -H "Authorization: Bearer ${TOKEN}" \
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
| productId | path | integer | true | none |
| name | body | string | false | none |
| description | body | string | false | none |
| price | body | number | false | none |
| categoryId | body | integer | false | none |
| tags | body | array | false | none |

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "price": 0,
  "category": {
    "id": 0,
    "name": "string"
  },
  "inStock": true,
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
| description | string | false | none |
| price | number | true | none |
| category | Category | true | none |
| category.id | integer | true | none |
| category.name | string | true | none |
| category.parentId | integer | null | false | none |
| tags | array | false | none |
| inStock | boolean | true | none |
| createdAt | string | true | none |

> Authentication: BearerAuth

## listReviews

`GET /products/{productId}/reviews`

> Code samples

```bash
hono request \
  -P /products/{productId}/reviews \
  -X GET \
  src/index.ts
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| productId | path | integer | true | none |

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "rating": 1,
    "author": {
      "id": 0,
      "name": "string",
      "email": "user@example.com",
      "role": "admin",
      "createdAt": "2024-01-01T00:00:00Z"
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
| rating | integer | true | none |
| comment | string | false | none |
| author | User | true | none |
| author.id | integer | true | none |
| author.name | string | true | none |
| author.email | string | true | none |
| author.role | string | true | none |
| author.address | Address | false | none |
| author.address.street | string | true | none |
| author.address.city | string | true | none |
| author.address.state | string | false | none |
| author.address.zip | string | false | none |
| author.address.country | string | true | none |
| author.createdAt | string | true | none |
| createdAt | string | true | none |

> This operation does not require authentication

## createReview

`POST /products/{productId}/reviews`

> Code samples

```bash
hono request \
  -P /products/{productId}/reviews \
  -X POST \
  -H "Authorization: Bearer ${TOKEN}" \
  -d '{"rating":1}' \
  src/index.ts
```

> Body parameter

```json
{
  "rating": 1
}
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| productId | path | integer | true | none |
| rating | body | integer | true | none |
| comment | body | string | false | none |

> Example responses

> 201 Response

```json
{
  "id": 0,
  "rating": 1,
  "author": {
    "id": 0,
    "name": "string",
    "email": "user@example.com",
    "role": "admin",
    "createdAt": "2024-01-01T00:00:00Z"
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
| rating | integer | true | none |
| comment | string | false | none |
| author | User | true | none |
| author.id | integer | true | none |
| author.name | string | true | none |
| author.email | string | true | none |
| author.role | string | true | none |
| author.address | Address | false | none |
| author.address.street | string | true | none |
| author.address.city | string | true | none |
| author.address.state | string | false | none |
| author.address.zip | string | false | none |
| author.address.country | string | true | none |
| author.createdAt | string | true | none |
| createdAt | string | true | none |

> Authentication: BearerAuth

## listOrders

`GET /orders`

> Code samples

```bash
hono request \
  -P /orders \
  -X GET \
  -H "Authorization: Bearer ${TOKEN}" \
  src/index.ts
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| page | query | integer | false | none |
| limit | query | integer | false | none |
| status | query | string | false | none |

> Example responses

> 200 Response

```json
{
  "orders": [
    {
      "id": 0,
      "user": {
        "id": 0,
        "name": "string",
        "email": "user@example.com",
        "role": "admin",
        "createdAt": "2024-01-01T00:00:00Z"
      },
      "items": [
        {
          "product": {
            "id": 0,
            "name": "string",
            "price": 0,
            "category": {
              "id": 0,
              "name": "string"
            },
            "inStock": true,
            "createdAt": "2024-01-01T00:00:00Z"
          },
          "quantity": 1,
          "price": 0
        }
      ],
      "status": "pending",
      "totalPrice": 0,
      "shippingAddress": {
        "street": "string",
        "city": "string",
        "country": "string"
      },
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
| orders | array | true | none |
| orders.id | integer | true | none |
| orders.user | User | true | none |
| orders.user.id | integer | true | none |
| orders.user.name | string | true | none |
| orders.user.email | string | true | none |
| orders.user.role | string | true | none |
| orders.user.address | Address | false | none |
| orders.user.address.street | string | true | none |
| orders.user.address.city | string | true | none |
| orders.user.address.state | string | false | none |
| orders.user.address.zip | string | false | none |
| orders.user.address.country | string | true | none |
| orders.user.createdAt | string | true | none |
| orders.items | array | true | none |
| orders.items.product | Product | true | none |
| orders.items.product.id | integer | true | none |
| orders.items.product.name | string | true | none |
| orders.items.product.description | string | false | none |
| orders.items.product.price | number | true | none |
| orders.items.product.category | Category | true | none |
| orders.items.product.category.id | integer | true | none |
| orders.items.product.category.name | string | true | none |
| orders.items.product.category.parentId | integer | null | false | none |
| orders.items.product.tags | array | false | none |
| orders.items.product.inStock | boolean | true | none |
| orders.items.product.createdAt | string | true | none |
| orders.items.quantity | integer | true | none |
| orders.items.price | number | true | none |
| orders.status | string | true | none |
| orders.totalPrice | number | true | none |
| orders.shippingAddress | Address | true | none |
| orders.createdAt | string | true | none |
| total | integer | true | none |

> Authentication: BearerAuth

## createOrder

`POST /orders`

> Code samples

```bash
hono request \
  -P /orders \
  -X POST \
  -H "Authorization: Bearer ${TOKEN}" \
  -d '{"items":[{"productId":0,"quantity":1}],"shippingAddress":{"street":"string","city":"string","country":"string"}}' \
  src/index.ts
```

> Body parameter

```json
{
  "items": [
    {
      "productId": 0,
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "street": "string",
    "city": "string",
    "country": "string"
  }
}
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| items | body | array | true | none |
| shippingAddress | body | Address | true | none |
| callbackUrl | body | string | false | none |

> Example responses

> 201 Response

```json
{
  "id": 0,
  "user": {
    "id": 0,
    "name": "string",
    "email": "user@example.com",
    "role": "admin",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "items": [
    {
      "product": {
        "id": 0,
        "name": "string",
        "price": 0,
        "category": {
          "id": 0,
          "name": "string"
        },
        "inStock": true,
        "createdAt": "2024-01-01T00:00:00Z"
      },
      "quantity": 1,
      "price": 0
    }
  ],
  "status": "pending",
  "totalPrice": 0,
  "shippingAddress": {
    "street": "string",
    "city": "string",
    "country": "string"
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
| user | User | true | none |
| user.id | integer | true | none |
| user.name | string | true | none |
| user.email | string | true | none |
| user.role | string | true | none |
| user.address | Address | false | none |
| user.address.street | string | true | none |
| user.address.city | string | true | none |
| user.address.state | string | false | none |
| user.address.zip | string | false | none |
| user.address.country | string | true | none |
| user.createdAt | string | true | none |
| items | array | true | none |
| items.product | Product | true | none |
| items.product.id | integer | true | none |
| items.product.name | string | true | none |
| items.product.description | string | false | none |
| items.product.price | number | true | none |
| items.product.category | Category | true | none |
| items.product.category.id | integer | true | none |
| items.product.category.name | string | true | none |
| items.product.category.parentId | integer | null | false | none |
| items.product.tags | array | false | none |
| items.product.inStock | boolean | true | none |
| items.product.createdAt | string | true | none |
| items.quantity | integer | true | none |
| items.price | number | true | none |
| status | string | true | none |
| totalPrice | number | true | none |
| shippingAddress | Address | true | none |
| createdAt | string | true | none |

> Authentication: BearerAuth

## getOrder

`GET /orders/{orderId}`

> Code samples

```bash
hono request \
  -P /orders/{orderId} \
  -X GET \
  -H "Authorization: Bearer ${TOKEN}" \
  src/index.ts
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| orderId | path | integer | true | none |

> Example responses

> 200 Response

```json
{
  "id": 0,
  "user": {
    "id": 0,
    "name": "string",
    "email": "user@example.com",
    "role": "admin",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "items": [
    {
      "product": {
        "id": 0,
        "name": "string",
        "price": 0,
        "category": {
          "id": 0,
          "name": "string"
        },
        "inStock": true,
        "createdAt": "2024-01-01T00:00:00Z"
      },
      "quantity": 1,
      "price": 0
    }
  ],
  "status": "pending",
  "totalPrice": 0,
  "shippingAddress": {
    "street": "string",
    "city": "string",
    "country": "string"
  },
  "createdAt": "2024-01-01T00:00:00Z"
}
```

> 404 Response

```json
{
  "code": 0,
  "message": "string"
}
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |
| 404 | Resource not found | Inline |

### Response Schema

Status Code **200**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | integer | true | none |
| user | User | true | none |
| user.id | integer | true | none |
| user.name | string | true | none |
| user.email | string | true | none |
| user.role | string | true | none |
| user.address | Address | false | none |
| user.address.street | string | true | none |
| user.address.city | string | true | none |
| user.address.state | string | false | none |
| user.address.zip | string | false | none |
| user.address.country | string | true | none |
| user.createdAt | string | true | none |
| items | array | true | none |
| items.product | Product | true | none |
| items.product.id | integer | true | none |
| items.product.name | string | true | none |
| items.product.description | string | false | none |
| items.product.price | number | true | none |
| items.product.category | Category | true | none |
| items.product.category.id | integer | true | none |
| items.product.category.name | string | true | none |
| items.product.category.parentId | integer | null | false | none |
| items.product.tags | array | false | none |
| items.product.inStock | boolean | true | none |
| items.product.createdAt | string | true | none |
| items.quantity | integer | true | none |
| items.price | number | true | none |
| status | string | true | none |
| totalPrice | number | true | none |
| shippingAddress | Address | true | none |
| createdAt | string | true | none |

### Response Schema

Status Code **404**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| code | integer | true | none |
| message | string | true | none |

> Authentication: BearerAuth

## listCategories

`GET /categories`

> Code samples

```bash
hono request \
  -P /categories \
  -X GET \
  src/index.ts
```

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
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
| id | integer | true | none |
| name | string | true | none |
| parentId | integer | null | false | none |

> This operation does not require authentication

## uploadImage

`POST /upload/image`

> Code samples

```bash
hono request \
  -P /upload/image \
  -X POST \
  -H "Authorization: Bearer ${TOKEN}" \
  src/index.ts
```

> Example responses

> 200 Response

```json
{
  "url": "https://example.com",
  "width": 0,
  "height": 0
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
| width | integer | true | none |
| height | integer | true | none |

> Authentication: BearerAuth
