# Comprehensive EC API v1.0.0

- `/users` [GET](#get-users) [POST](#post-users)
- `/users/{userId}` [GET](#get-usersuserid) [PUT](#put-usersuserid) [DELETE](#delete-usersuserid)
- `/products` [GET](#get-products) [POST](#post-products)
- `/products/{productId}` [GET](#get-productsproductid) [PUT](#put-productsproductid)
- `/products/{productId}/reviews` [GET](#get-productsproductidreviews) [POST](#post-productsproductidreviews)
- `/orders` [GET](#get-orders) [POST](#post-orders)
- `/orders/{orderId}` [GET](#get-ordersorderid)
- `/categories` [GET](#get-categories)
- `/upload/image` [POST](#post-uploadimage)

### GET /users

```bash
hono request \
  -P /users \
  -X GET \
  src/index.ts
```

### POST /users

```bash
hono request \
  -P /users \
  -X POST \
  -H "Authorization: Bearer ${TOKEN}" \
  -d '{"name":"string","email":"user@example.com","password":"string"}' \
  src/index.ts
```

### GET /users/{userId}

```bash
hono request \
  -P /users/{userId} \
  -X GET \
  src/index.ts
```

### PUT /users/{userId}

```bash
hono request \
  -P /users/{userId} \
  -X PUT \
  -H "Authorization: Bearer ${TOKEN}" \
  -d '{}' \
  src/index.ts
```

### DELETE /users/{userId}

```bash
hono request \
  -P /users/{userId} \
  -X DELETE \
  -H "Authorization: Bearer ${TOKEN}" \
  src/index.ts
```

### GET /products

```bash
hono request \
  -P /products \
  -X GET \
  src/index.ts
```

### POST /products

```bash
hono request \
  -P /products \
  -X POST \
  -H "Authorization: Bearer ${TOKEN}" \
  -d '{"name":"string","price":0,"categoryId":0}' \
  src/index.ts
```

### GET /products/{productId}

```bash
hono request \
  -P /products/{productId} \
  -X GET \
  src/index.ts
```

### PUT /products/{productId}

```bash
hono request \
  -P /products/{productId} \
  -X PUT \
  -H "Authorization: Bearer ${TOKEN}" \
  -d '{}' \
  src/index.ts
```

### GET /products/{productId}/reviews

```bash
hono request \
  -P /products/{productId}/reviews \
  -X GET \
  src/index.ts
```

### POST /products/{productId}/reviews

```bash
hono request \
  -P /products/{productId}/reviews \
  -X POST \
  -H "Authorization: Bearer ${TOKEN}" \
  -d '{"rating":1}' \
  src/index.ts
```

### GET /orders

```bash
hono request \
  -P /orders \
  -X GET \
  -H "Authorization: Bearer ${TOKEN}" \
  src/index.ts
```

### POST /orders

```bash
hono request \
  -P /orders \
  -X POST \
  -H "Authorization: Bearer ${TOKEN}" \
  -d '{"items":[{"productId":0,"quantity":1}],"shippingAddress":{"street":"string","city":"string","country":"string"}}' \
  src/index.ts
```

### GET /orders/{orderId}

```bash
hono request \
  -P /orders/{orderId} \
  -X GET \
  -H "Authorization: Bearer ${TOKEN}" \
  src/index.ts
```

### GET /categories

```bash
hono request \
  -P /categories \
  -X GET \
  src/index.ts
```

### POST /upload/image

```bash
hono request \
  -P /upload/image \
  -X POST \
  -H "Authorization: Bearer ${TOKEN}" \
  src/index.ts
```
