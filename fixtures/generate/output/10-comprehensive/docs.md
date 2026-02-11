---
title: Comprehensive EC API v1.0.0
language_tabs:
  - bash: Bash
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<h1 id="comprehensive-ec-api">Comprehensive EC API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

E-commerce API covering all generation modes

# Authentication

- HTTP Authentication, scheme: bearer

<h1 id="comprehensive-ec-api-default">Default</h1>

## listUsers

<a id="opIdlistUsers"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /users \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /users`

<h3 id="listusers-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|none|
|limit|query|integer|false|none|

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
      "address": {
        "street": "string",
        "city": "string",
        "state": "string",
        "zip": "string",
        "country": "string"
      },
      "createdAt": "1970-01-01T00:00:00Z"
    }
  ],
  "total": 0
}
```

<h3 id="listusers-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="listusers-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|users|[[User](#schemauser)]|true|none|none|
|» id|integer|true|none|none|
|» name|string|true|none|none|
|» email|string(email)|true|none|none|
|» role|string|true|none|none|
|» address|[Address](#schemaaddress)|false|none|none|
|» » street|string|true|none|none|
|» » city|string|true|none|none|
|» » state|string|false|none|none|
|» » zip|string|false|none|none|
|» » country|string|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|total|integer|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## createUser

<a id="opIdcreateUser"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /users \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`POST /users`

> Body parameter

```json
{
  "name": "string",
  "email": "user@example.com",
  "password": "string",
  "role": "admin",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "country": "string"
  }
}
```

<h3 id="createuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateUser](#schemacreateuser)|true|none|
|» name|body|string|true|none|
|» email|body|string(email)|true|none|
|» password|body|string|true|none|
|» role|body|string|false|none|
|» address|body|[Address](#schemaaddress)|false|none|
|» »  street|body|string|true|none|
|» »  city|body|string|true|none|
|» »  state|body|string|false|none|
|» »  zip|body|string|false|none|
|» »  country|body|string|true|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|» role|admin|
|» role|customer|

> Example responses

> 201 Response

```json
{
  "id": 0,
  "name": "string",
  "email": "user@example.com",
  "role": "admin",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "country": "string"
  },
  "createdAt": "1970-01-01T00:00:00Z"
}
```

<h3 id="createuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[User](#schemauser)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
BearerAuth
</aside>

## getUser

<a id="opIdgetUser"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /users/{userId} \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /users/{userId}`

<h3 id="getuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "email": "user@example.com",
  "role": "admin",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "country": "string"
  },
  "createdAt": "1970-01-01T00:00:00Z"
}
```

> 404 Response

```json
{
  "code": 0,
  "message": "string"
}
```

<h3 id="getuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[User](#schemauser)|
|404|Not Found|Resource not found|[Error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## updateUser

<a id="opIdupdateUser"></a>

> Code samples

```bash
hono request \
  -X PUT \
  -P /users/{userId} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`PUT /users/{userId}`

> Body parameter

```json
{
  "name": "string",
  "email": "user@example.com",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "country": "string"
  }
}
```

<h3 id="updateuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|integer|true|none|
|body|body|[UpdateUser](#schemaupdateuser)|true|none|
|» name|body|string|false|none|
|» email|body|string(email)|false|none|
|» address|body|[Address](#schemaaddress)|false|none|
|» »  street|body|string|true|none|
|» »  city|body|string|true|none|
|» »  state|body|string|false|none|
|» »  zip|body|string|false|none|
|» »  country|body|string|true|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "email": "user@example.com",
  "role": "admin",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "country": "string"
  },
  "createdAt": "1970-01-01T00:00:00Z"
}
```

<h3 id="updateuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[User](#schemauser)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
BearerAuth
</aside>

## deleteUser

<a id="opIddeleteUser"></a>

> Code samples

```bash
hono request \
  -X DELETE \
  -P /users/{userId} \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`DELETE /users/{userId}`

<h3 id="deleteuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|integer|true|none|

<h3 id="deleteuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|No Content|Deleted|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
BearerAuth
</aside>

## listProducts

<a id="opIdlistProducts"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /products \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /products`

<h3 id="listproducts-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|none|
|limit|query|integer|false|none|
|category|query|string|false|none|
|minPrice|query|number|false|none|
|maxPrice|query|number|false|none|

> Example responses

> 200 Response

```json
{
  "products": [
    {
      "id": 0,
      "name": "string",
      "description": "string",
      "price": 0,
      "category": {
        "id": 0,
        "name": "string",
        "parentId": null
      },
      "tags": [
        "string"
      ],
      "inStock": true,
      "createdAt": "1970-01-01T00:00:00Z"
    }
  ],
  "total": 0
}
```

<h3 id="listproducts-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="listproducts-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|products|[[Product](#schemaproduct)]|true|none|none|
|» id|integer|true|none|none|
|» name|string|true|none|none|
|» description|string|false|none|none|
|» price|number|true|none|none|
|» category|[Category](#schemacategory)|true|none|none|
|» » id|integer|true|none|none|
|» » name|string|true|none|none|
|» » parentId|integer | null|false|none|none|
|» tags|[string]|false|none|none|
|» inStock|boolean|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|total|integer|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## createProduct

<a id="opIdcreateProduct"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /products \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`POST /products`

> Body parameter

```json
{
  "name": "string",
  "description": "string",
  "price": 0,
  "categoryId": 0,
  "tags": [
    "string"
  ]
}
```

<h3 id="createproduct-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateProduct](#schemacreateproduct)|true|none|
|» name|body|string|true|none|
|» description|body|string|false|none|
|» price|body|number|true|none|
|» categoryId|body|integer|true|none|
|» tags|body|[string]|false|none|

> Example responses

> 201 Response

```json
{
  "id": 0,
  "name": "string",
  "description": "string",
  "price": 0,
  "category": {
    "id": 0,
    "name": "string",
    "parentId": null
  },
  "tags": [
    "string"
  ],
  "inStock": true,
  "createdAt": "1970-01-01T00:00:00Z"
}
```

<h3 id="createproduct-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[Product](#schemaproduct)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
BearerAuth
</aside>

## getProduct

<a id="opIdgetProduct"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /products/{productId} \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /products/{productId}`

<h3 id="getproduct-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|productId|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "description": "string",
  "price": 0,
  "category": {
    "id": 0,
    "name": "string",
    "parentId": null
  },
  "tags": [
    "string"
  ],
  "inStock": true,
  "createdAt": "1970-01-01T00:00:00Z"
}
```

> 404 Response

```json
{
  "code": 0,
  "message": "string"
}
```

<h3 id="getproduct-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[Product](#schemaproduct)|
|404|Not Found|Resource not found|[Error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## updateProduct

<a id="opIdupdateProduct"></a>

> Code samples

```bash
hono request \
  -X PUT \
  -P /products/{productId} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`PUT /products/{productId}`

> Body parameter

```json
{
  "name": "string",
  "description": "string",
  "price": 0,
  "categoryId": 0,
  "tags": [
    "string"
  ]
}
```

<h3 id="updateproduct-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|productId|path|integer|true|none|
|body|body|[UpdateProduct](#schemaupdateproduct)|true|none|
|» name|body|string|false|none|
|» description|body|string|false|none|
|» price|body|number|false|none|
|» categoryId|body|integer|false|none|
|» tags|body|[string]|false|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "description": "string",
  "price": 0,
  "category": {
    "id": 0,
    "name": "string",
    "parentId": null
  },
  "tags": [
    "string"
  ],
  "inStock": true,
  "createdAt": "1970-01-01T00:00:00Z"
}
```

<h3 id="updateproduct-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[Product](#schemaproduct)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
BearerAuth
</aside>

## listReviews

<a id="opIdlistReviews"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /products/{productId}/reviews \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /products/{productId}/reviews`

<h3 id="listreviews-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|productId|path|integer|true|none|

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "rating": 1,
    "comment": "string",
    "author": {
      "id": 0,
      "name": "string",
      "email": "user@example.com",
      "role": "admin",
      "address": {
        "street": "string",
        "city": "string",
        "state": "string",
        "zip": "string",
        "country": "string"
      },
      "createdAt": "1970-01-01T00:00:00Z"
    },
    "createdAt": "1970-01-01T00:00:00Z"
  }
]
```

<h3 id="listreviews-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="listreviews-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Review](#schemareview)]|false|none|none|
|» id|integer|true|none|none|
|» rating|integer|true|none|none|
|» comment|string|false|none|none|
|» author|[User](#schemauser)|true|none|none|
|» » id|integer|true|none|none|
|» » name|string|true|none|none|
|» » email|string(email)|true|none|none|
|» » role|string|true|none|none|
|» » address|[Address](#schemaaddress)|false|none|none|
|»  » » street|string|true|none|none|
|»  » » city|string|true|none|none|
|»  » » state|string|false|none|none|
|»  » » zip|string|false|none|none|
|»  » » country|string|true|none|none|
|» » createdAt|string(date-time)|true|none|none|
|» createdAt|string(date-time)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## createReview

<a id="opIdcreateReview"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /products/{productId}/reviews \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`POST /products/{productId}/reviews`

> Body parameter

```json
{
  "rating": 1,
  "comment": "string"
}
```

<h3 id="createreview-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|productId|path|integer|true|none|
|body|body|[CreateReview](#schemacreatereview)|true|none|
|» rating|body|integer|true|none|
|» comment|body|string|false|none|

> Example responses

> 201 Response

```json
{
  "id": 0,
  "rating": 1,
  "comment": "string",
  "author": {
    "id": 0,
    "name": "string",
    "email": "user@example.com",
    "role": "admin",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zip": "string",
      "country": "string"
    },
    "createdAt": "1970-01-01T00:00:00Z"
  },
  "createdAt": "1970-01-01T00:00:00Z"
}
```

<h3 id="createreview-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[Review](#schemareview)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
BearerAuth
</aside>

## listOrders

<a id="opIdlistOrders"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /orders \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`GET /orders`

<h3 id="listorders-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|none|
|limit|query|integer|false|none|
|status|query|string|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|status|pending|
|status|confirmed|
|status|shipped|
|status|delivered|
|status|cancelled|

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
        "address": {
          "street": "string",
          "city": "string",
          "state": "string",
          "zip": "string",
          "country": "string"
        },
        "createdAt": "1970-01-01T00:00:00Z"
      },
      "items": [
        {
          "product": {
            "id": 0,
            "name": "string",
            "description": "string",
            "price": 0,
            "category": {
              "id": 0,
              "name": "string",
              "parentId": null
            },
            "tags": [
              "string"
            ],
            "inStock": true,
            "createdAt": "1970-01-01T00:00:00Z"
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
        "state": "string",
        "zip": "string",
        "country": "string"
      },
      "createdAt": "1970-01-01T00:00:00Z"
    }
  ],
  "total": 0
}
```

<h3 id="listorders-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="listorders-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|orders|[[Order](#schemaorder)]|true|none|none|
|» id|integer|true|none|none|
|» user|[User](#schemauser)|true|none|none|
|» » id|integer|true|none|none|
|» » name|string|true|none|none|
|» » email|string(email)|true|none|none|
|» » role|string|true|none|none|
|» » address|[Address](#schemaaddress)|false|none|none|
|»  » » street|string|true|none|none|
|»  » » city|string|true|none|none|
|»  » » state|string|false|none|none|
|»  » » zip|string|false|none|none|
|»  » » country|string|true|none|none|
|» » createdAt|string(date-time)|true|none|none|
|» items|[[OrderItem](#schemaorderitem)]|true|none|none|
|» » product|[Product](#schemaproduct)|true|none|none|
|»  » » id|integer|true|none|none|
|»  » » name|string|true|none|none|
|»  » » description|string|false|none|none|
|»  » » price|number|true|none|none|
|»  » » category|[Category](#schemacategory)|true|none|none|
|»   »  » » id|integer|true|none|none|
|»   »  » » name|string|true|none|none|
|»   »  » » parentId|integer | null|false|none|none|
|»  » » tags|[string]|false|none|none|
|»  » » inStock|boolean|true|none|none|
|»  » » createdAt|string(date-time)|true|none|none|
|» » quantity|integer|true|none|none|
|» » price|number|true|none|none|
|» status|string|true|none|none|
|» totalPrice|number|true|none|none|
|» shippingAddress|[Address](#schemaaddress)|true|none|none|
|» » street|string|true|none|none|
|» » city|string|true|none|none|
|» » state|string|false|none|none|
|» » zip|string|false|none|none|
|» » country|string|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|total|integer|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
BearerAuth
</aside>

## createOrder

<a id="opIdcreateOrder"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /orders \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`POST /orders`

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
    "state": "string",
    "zip": "string",
    "country": "string"
  },
  "callbackUrl": "http://example.com"
}
```

<h3 id="createorder-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateOrder](#schemacreateorder)|true|none|
|» items|body|[object]|true|none|
|» shippingAddress|body|[Address](#schemaaddress)|true|none|
|» »  street|body|string|true|none|
|» »  city|body|string|true|none|
|» »  state|body|string|false|none|
|» »  zip|body|string|false|none|
|» »  country|body|string|true|none|
|» callbackUrl|body|string(uri)|false|none|

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
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zip": "string",
      "country": "string"
    },
    "createdAt": "1970-01-01T00:00:00Z"
  },
  "items": [
    {
      "product": {
        "id": 0,
        "name": "string",
        "description": "string",
        "price": 0,
        "category": {
          "id": 0,
          "name": "string",
          "parentId": null
        },
        "tags": [
          "string"
        ],
        "inStock": true,
        "createdAt": "1970-01-01T00:00:00Z"
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
    "state": "string",
    "zip": "string",
    "country": "string"
  },
  "createdAt": "1970-01-01T00:00:00Z"
}
```

<h3 id="createorder-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[Order](#schemaorder)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
BearerAuth
</aside>

## getOrder

<a id="opIdgetOrder"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /orders/{orderId} \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`GET /orders/{orderId}`

<h3 id="getorder-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|orderId|path|integer|true|none|

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
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zip": "string",
      "country": "string"
    },
    "createdAt": "1970-01-01T00:00:00Z"
  },
  "items": [
    {
      "product": {
        "id": 0,
        "name": "string",
        "description": "string",
        "price": 0,
        "category": {
          "id": 0,
          "name": "string",
          "parentId": null
        },
        "tags": [
          "string"
        ],
        "inStock": true,
        "createdAt": "1970-01-01T00:00:00Z"
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
    "state": "string",
    "zip": "string",
    "country": "string"
  },
  "createdAt": "1970-01-01T00:00:00Z"
}
```

> 404 Response

```json
{
  "code": 0,
  "message": "string"
}
```

<h3 id="getorder-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[Order](#schemaorder)|
|404|Not Found|Resource not found|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
BearerAuth
</aside>

## listCategories

<a id="opIdlistCategories"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /categories \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /categories`

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "name": "string",
    "parentId": null
  }
]
```

<h3 id="listcategories-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="listcategories-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Category](#schemacategory)]|false|none|none|
|» id|integer|true|none|none|
|» name|string|true|none|none|
|» parentId|integer | null|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## uploadImage

<a id="opIduploadImage"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /upload/image \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`POST /upload/image`

> Example responses

> 200 Response

```json
{
  "url": "http://example.com",
  "width": 0,
  "height": 0
}
```

<h3 id="uploadimage-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="uploadimage-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|url|string(uri)|true|none|none|
|width|integer|true|none|none|
|height|integer|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
BearerAuth
</aside>

# Schemas

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": 0,
  "name": "string",
  "email": "user@example.com",
  "role": "admin",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "country": "string"
  },
  "createdAt": "1970-01-01T00:00:00Z"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|name|string|true|none|none|
|email|string(email)|true|none|none|
|role|string|true|none|none|
|address|[Address](#schemaaddress)|false|none|none|
|createdAt|string(date-time)|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|role|admin|
|role|customer|

<h2 id="tocS_CreateUser">CreateUser</h2>
<!-- backwards compatibility -->
<a id="schemacreateuser"></a>
<a id="schema_CreateUser"></a>
<a id="tocScreateuser"></a>
<a id="tocscreateuser"></a>

```json
{
  "name": "string",
  "email": "user@example.com",
  "password": "string",
  "role": "admin",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "country": "string"
  }
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|email|string(email)|true|none|none|
|password|string|true|none|none|
|role|string|false|none|none|
|address|[Address](#schemaaddress)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|role|admin|
|role|customer|

<h2 id="tocS_UpdateUser">UpdateUser</h2>
<!-- backwards compatibility -->
<a id="schemaupdateuser"></a>
<a id="schema_UpdateUser"></a>
<a id="tocSupdateuser"></a>
<a id="tocsupdateuser"></a>

```json
{
  "name": "string",
  "email": "user@example.com",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "country": "string"
  }
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
|email|string(email)|false|none|none|
|address|[Address](#schemaaddress)|false|none|none|

<h2 id="tocS_Address">Address</h2>
<!-- backwards compatibility -->
<a id="schemaaddress"></a>
<a id="schema_Address"></a>
<a id="tocSaddress"></a>
<a id="tocsaddress"></a>

```json
{
  "street": "string",
  "city": "string",
  "state": "string",
  "zip": "string",
  "country": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|street|string|true|none|none|
|city|string|true|none|none|
|state|string|false|none|none|
|zip|string|false|none|none|
|country|string|true|none|none|

<h2 id="tocS_Product">Product</h2>
<!-- backwards compatibility -->
<a id="schemaproduct"></a>
<a id="schema_Product"></a>
<a id="tocSproduct"></a>
<a id="tocsproduct"></a>

```json
{
  "id": 0,
  "name": "string",
  "description": "string",
  "price": 0,
  "category": {
    "id": 0,
    "name": "string",
    "parentId": null
  },
  "tags": [
    "string"
  ],
  "inStock": true,
  "createdAt": "1970-01-01T00:00:00Z"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|name|string|true|none|none|
|description|string|false|none|none|
|price|number|true|none|none|
|category|[Category](#schemacategory)|true|none|none|
|tags|[string]|false|none|none|
|inStock|boolean|true|none|none|
|createdAt|string(date-time)|true|none|none|

<h2 id="tocS_CreateProduct">CreateProduct</h2>
<!-- backwards compatibility -->
<a id="schemacreateproduct"></a>
<a id="schema_CreateProduct"></a>
<a id="tocScreateproduct"></a>
<a id="tocscreateproduct"></a>

```json
{
  "name": "string",
  "description": "string",
  "price": 0,
  "categoryId": 0,
  "tags": [
    "string"
  ]
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|description|string|false|none|none|
|price|number|true|none|none|
|categoryId|integer|true|none|none|
|tags|[string]|false|none|none|

<h2 id="tocS_UpdateProduct">UpdateProduct</h2>
<!-- backwards compatibility -->
<a id="schemaupdateproduct"></a>
<a id="schema_UpdateProduct"></a>
<a id="tocSupdateproduct"></a>
<a id="tocsupdateproduct"></a>

```json
{
  "name": "string",
  "description": "string",
  "price": 0,
  "categoryId": 0,
  "tags": [
    "string"
  ]
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
|description|string|false|none|none|
|price|number|false|none|none|
|categoryId|integer|false|none|none|
|tags|[string]|false|none|none|

<h2 id="tocS_Category">Category</h2>
<!-- backwards compatibility -->
<a id="schemacategory"></a>
<a id="schema_Category"></a>
<a id="tocScategory"></a>
<a id="tocscategory"></a>

```json
{
  "id": 0,
  "name": "string",
  "parentId": null
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|name|string|true|none|none|
|parentId|integer | null|false|none|none|

<h2 id="tocS_Review">Review</h2>
<!-- backwards compatibility -->
<a id="schemareview"></a>
<a id="schema_Review"></a>
<a id="tocSreview"></a>
<a id="tocsreview"></a>

```json
{
  "id": 0,
  "rating": 1,
  "comment": "string",
  "author": {
    "id": 0,
    "name": "string",
    "email": "user@example.com",
    "role": "admin",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zip": "string",
      "country": "string"
    },
    "createdAt": "1970-01-01T00:00:00Z"
  },
  "createdAt": "1970-01-01T00:00:00Z"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|rating|integer|true|none|none|
|comment|string|false|none|none|
|author|[User](#schemauser)|true|none|none|
|createdAt|string(date-time)|true|none|none|

<h2 id="tocS_CreateReview">CreateReview</h2>
<!-- backwards compatibility -->
<a id="schemacreatereview"></a>
<a id="schema_CreateReview"></a>
<a id="tocScreatereview"></a>
<a id="tocscreatereview"></a>

```json
{
  "rating": 1,
  "comment": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|rating|integer|true|none|none|
|comment|string|false|none|none|

<h2 id="tocS_Order">Order</h2>
<!-- backwards compatibility -->
<a id="schemaorder"></a>
<a id="schema_Order"></a>
<a id="tocSorder"></a>
<a id="tocsorder"></a>

```json
{
  "id": 0,
  "user": {
    "id": 0,
    "name": "string",
    "email": "user@example.com",
    "role": "admin",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zip": "string",
      "country": "string"
    },
    "createdAt": "1970-01-01T00:00:00Z"
  },
  "items": [
    {
      "product": {
        "id": 0,
        "name": "string",
        "description": "string",
        "price": 0,
        "category": {
          "id": 0,
          "name": "string",
          "parentId": null
        },
        "tags": [
          "string"
        ],
        "inStock": true,
        "createdAt": "1970-01-01T00:00:00Z"
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
    "state": "string",
    "zip": "string",
    "country": "string"
  },
  "createdAt": "1970-01-01T00:00:00Z"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|user|[User](#schemauser)|true|none|none|
|items|[[OrderItem](#schemaorderitem)]|true|none|none|
|status|string|true|none|none|
|totalPrice|number|true|none|none|
|shippingAddress|[Address](#schemaaddress)|true|none|none|
|createdAt|string(date-time)|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|pending|
|status|confirmed|
|status|shipped|
|status|delivered|
|status|cancelled|

<h2 id="tocS_OrderItem">OrderItem</h2>
<!-- backwards compatibility -->
<a id="schemaorderitem"></a>
<a id="schema_OrderItem"></a>
<a id="tocSorderitem"></a>
<a id="tocsorderitem"></a>

```json
{
  "product": {
    "id": 0,
    "name": "string",
    "description": "string",
    "price": 0,
    "category": {
      "id": 0,
      "name": "string",
      "parentId": null
    },
    "tags": [
      "string"
    ],
    "inStock": true,
    "createdAt": "1970-01-01T00:00:00Z"
  },
  "quantity": 1,
  "price": 0
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|product|[Product](#schemaproduct)|true|none|none|
|quantity|integer|true|none|none|
|price|number|true|none|none|

<h2 id="tocS_CreateOrder">CreateOrder</h2>
<!-- backwards compatibility -->
<a id="schemacreateorder"></a>
<a id="schema_CreateOrder"></a>
<a id="tocScreateorder"></a>
<a id="tocscreateorder"></a>

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
    "state": "string",
    "zip": "string",
    "country": "string"
  },
  "callbackUrl": "http://example.com"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|items|[object]|true|none|none|
|shippingAddress|[Address](#schemaaddress)|true|none|none|
|callbackUrl|string(uri)|false|none|none|

<h2 id="tocS_Error">Error</h2>
<!-- backwards compatibility -->
<a id="schemaerror"></a>
<a id="schema_Error"></a>
<a id="tocSerror"></a>
<a id="tocserror"></a>

```json
{
  "code": 0,
  "message": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|code|integer|true|none|none|
|message|string|true|none|none|
