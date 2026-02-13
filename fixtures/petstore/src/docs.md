<h1 id="swagger-petstore---openapi-30">Swagger Petstore - OpenAPI 3.0 v1.0.11</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about
Swagger at [https://swagger.io](https://swagger.io). In the third iteration of the pet store, we've switched to the design first approach!
You can now help us improve the API whether it's by making changes to the definition itself or to the code.
That way, with time, we can improve the API in general, and expose some of the new features in OAS3.

_If you're looking for the Swagger 2.0/OAS 2.0 version of Petstore, then click [here](https://editor.swagger.io/?url=https://petstore.swagger.io/v2/swagger.yaml). Alternatively, you can load via the `Edit > Load Petstore OAS 2.0` menu option!_

Some useful links:
- [The Pet Store repository](https://github.com/swagger-api/swagger-petstore)
- [The source API definition for the Pet Store](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml)

Base URLs:

* <a href="https://petstore3.swagger.io/api/v3">https://petstore3.swagger.io/api/v3</a>

License: <a href="http://www.apache.org/licenses/LICENSE-2.0.html">Apache 2.0</a>

# Authentication

- oAuth2 authentication.

    - Flow: implicit
    - Authorization URL = [https://petstore3.swagger.io/oauth/authorize](https://petstore3.swagger.io/oauth/authorize)

|Scope|Scope Description|
|---|---|
|write:pets|modify pets in your account|
|read:pets|read your pets|

* API Key (api_key)
    - Parameter Name: **api_key**, in: header.

<h1 id="swagger-petstore---openapi-30-pet">pet</h1>

Everything about your Pets

## Update an existing pet

<a id="opIdupdatePet"></a>

> Code samples

```bash
hono request \
  -X PUT \
  -P /pet \
  -d '{"id":10,"name":"doggie","category":{"id":1,"name":"Dogs"},"photoUrls":["string"],"tags":[{"id":0,"name":"string"}],"status":"available"}' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`PUT /pet`

Update an existing pet by Id

> Body parameter

```json
{
  "id": 10,
  "name": "doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}
```

<h3 id="update-an-existing-pet-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Pet](#schemapet)|true|none|
|» id|body|integer(int64)|false|none|
|» name|body|string|true|none|
|» category|body|[Category](#schemacategory)|false|none|
|» »  id|body|integer(int64)|false|none|
|» »  name|body|string|false|none|
|» photoUrls|body|[string]|true|none|
|» tags|body|[[Tag](#schematag)]|false|none|
|» status|body|string|false|pet status in the store|

#### Enumerated Values

|Parameter|Value|
|---|---|
|» status|available|
|» status|pending|
|» status|sold|

> Example responses

> 200 Response

```json
{
  "id": 10,
  "name": "doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}
```

<h3 id="update-an-existing-pet-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Successful operation|[Pet](#schemapet)|
|400|Bad Request|Invalid ID supplied|None|
|404|Not Found|Pet not found|None|
|422|Unprocessable Entity|Validation exception|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
petstore_auth ( Scopes: write:pets read:pets )
</aside>

## Add a new pet to the store

<a id="opIdaddPet"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /pet \
  -d '{"id":10,"name":"doggie","category":{"id":1,"name":"Dogs"},"photoUrls":["string"],"tags":[{"id":0,"name":"string"}],"status":"available"}' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`POST /pet`

Add a new pet to the store

> Body parameter

```json
{
  "id": 10,
  "name": "doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}
```

<h3 id="add-a-new-pet-to-the-store-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Pet](#schemapet)|true|none|
|» id|body|integer(int64)|false|none|
|» name|body|string|true|none|
|» category|body|[Category](#schemacategory)|false|none|
|» »  id|body|integer(int64)|false|none|
|» »  name|body|string|false|none|
|» photoUrls|body|[string]|true|none|
|» tags|body|[[Tag](#schematag)]|false|none|
|» status|body|string|false|pet status in the store|

#### Enumerated Values

|Parameter|Value|
|---|---|
|» status|available|
|» status|pending|
|» status|sold|

> Example responses

> 200 Response

```json
{
  "id": 10,
  "name": "doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}
```

<h3 id="add-a-new-pet-to-the-store-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Successful operation|[Pet](#schemapet)|
|400|Bad Request|Invalid input|None|
|422|Unprocessable Entity|Validation exception|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
petstore_auth ( Scopes: write:pets read:pets )
</aside>

## Finds Pets by status

<a id="opIdfindPetsByStatus"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /pet/findByStatus \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`GET /pet/findByStatus`

Multiple status values can be provided with comma separated strings

<h3 id="finds-pets-by-status-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|status|query|string|false|Status values that need to be considered for filter|

#### Enumerated Values

|Parameter|Value|
|---|---|
|status|available|
|status|pending|
|status|sold|

> Example responses

> 200 Response

```json
[
  {
    "id": 10,
    "name": "doggie",
    "category": {
      "id": 1,
      "name": "Dogs"
    },
    "photoUrls": [
      "string"
    ],
    "tags": [
      {
        "id": 0,
        "name": "string"
      }
    ],
    "status": "available"
  }
]
```

<h3 id="finds-pets-by-status-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|successful operation|Inline|
|400|Bad Request|Invalid status value|None|

<h3 id="finds-pets-by-status-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Pet](#schemapet)]|false|none|none|
|» id|integer(int64)|false|none|none|
|» name|string|true|none|none|
|» category|[Category](#schemacategory)|false|none|none|
|» » id|integer(int64)|false|none|none|
|» » name|string|false|none|none|
|» photoUrls|[string]|true|none|none|
|» tags|[[Tag](#schematag)]|false|none|none|
|» » id|integer(int64)|false|none|none|
|» » name|string|false|none|none|
|» status|string|false|none|pet status in the store|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
petstore_auth ( Scopes: write:pets read:pets )
</aside>

## Finds Pets by tags

<a id="opIdfindPetsByTags"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /pet/findByTags \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`GET /pet/findByTags`

Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.

<h3 id="finds-pets-by-tags-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|tags|query|[string]|false|Tags to filter by|

> Example responses

> 200 Response

```json
[
  {
    "id": 10,
    "name": "doggie",
    "category": {
      "id": 1,
      "name": "Dogs"
    },
    "photoUrls": [
      "string"
    ],
    "tags": [
      {
        "id": 0,
        "name": "string"
      }
    ],
    "status": "available"
  }
]
```

<h3 id="finds-pets-by-tags-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|successful operation|Inline|
|400|Bad Request|Invalid tag value|None|

<h3 id="finds-pets-by-tags-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Pet](#schemapet)]|false|none|none|
|» id|integer(int64)|false|none|none|
|» name|string|true|none|none|
|» category|[Category](#schemacategory)|false|none|none|
|» » id|integer(int64)|false|none|none|
|» » name|string|false|none|none|
|» photoUrls|[string]|true|none|none|
|» tags|[[Tag](#schematag)]|false|none|none|
|» » id|integer(int64)|false|none|none|
|» » name|string|false|none|none|
|» status|string|false|none|pet status in the store|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
petstore_auth ( Scopes: write:pets read:pets )
</aside>

## Find pet by ID

<a id="opIdgetPetById"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /pet/{petId} \
  -H 'Accept: application/json' \
  -H "api_key: ${API_KEY}" \
  src/index.ts
```

`GET /pet/{petId}`

Returns a single pet

<h3 id="find-pet-by-id-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|petId|path|integer(int64)|true|ID of pet to return|

> Example responses

> 200 Response

```json
{
  "id": 10,
  "name": "doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}
```

<h3 id="find-pet-by-id-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|successful operation|[Pet](#schemapet)|
|400|Bad Request|Invalid ID supplied|None|
|404|Not Found|Pet not found|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
api_key, petstore_auth ( Scopes: write:pets read:pets )
</aside>

## Updates a pet in the store with form data

<a id="opIdupdatePetWithForm"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /pet/{petId} \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`POST /pet/{petId}`

<h3 id="updates-a-pet-in-the-store-with-form-data-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|petId|path|integer(int64)|true|ID of pet that needs to be updated|
|name|query|string|false|Name of pet that needs to be updated|
|status|query|string|false|Status of pet that needs to be updated|

<h3 id="updates-a-pet-in-the-store-with-form-data-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|400|Bad Request|Invalid input|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
petstore_auth ( Scopes: write:pets read:pets )
</aside>

## Deletes a pet

<a id="opIddeletePet"></a>

> Code samples

```bash
hono request \
  -X DELETE \
  -P /pet/{petId} \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`DELETE /pet/{petId}`

delete a pet

<h3 id="deletes-a-pet-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|api_key|header|string|false||
|petId|path|integer(int64)|true|Pet id to delete|

<h3 id="deletes-a-pet-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|400|Bad Request|Invalid pet value|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
petstore_auth ( Scopes: write:pets read:pets )
</aside>

## uploads an image

<a id="opIduploadFile"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /pet/{petId}/uploadImage \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`POST /pet/{petId}/uploadImage`

<h3 id="uploads-an-image-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|petId|path|integer(int64)|true|ID of pet to update|
|additionalMetadata|query|string|false|Additional Metadata|

> Example responses

> 200 Response

```json
{
  "code": 0,
  "type": "string",
  "message": "string"
}
```

<h3 id="uploads-an-image-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|successful operation|[ApiResponse](#schemaapiresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
petstore_auth ( Scopes: write:pets read:pets )
</aside>

<h1 id="swagger-petstore---openapi-30-store">store</h1>

Access to Petstore orders

## Returns pet inventories by status

<a id="opIdgetInventory"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /store/inventory \
  -H 'Accept: application/json' \
  -H "api_key: ${API_KEY}" \
  src/index.ts
```

`GET /store/inventory`

Returns a map of status codes to quantities

> Example responses

> 200 Response

```json
null
```

<h3 id="returns-pet-inventories-by-status-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|successful operation|Inline|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
api_key
</aside>

## Place an order for a pet

<a id="opIdplaceOrder"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /store/order \
  -d '{"id":10,"petId":198772,"quantity":7,"shipDate":"1970-01-01T00:00:00Z","status":"approved","complete":true}' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  src/index.ts
```

`POST /store/order`

Place a new order in the store

> Body parameter

```json
{
  "id": 10,
  "petId": 198772,
  "quantity": 7,
  "shipDate": "1970-01-01T00:00:00Z",
  "status": "approved",
  "complete": true
}
```

<h3 id="place-an-order-for-a-pet-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Order](#schemaorder)|false|none|
|» id|body|integer(int64)|false|none|
|» petId|body|integer(int64)|false|none|
|» quantity|body|integer(int32)|false|none|
|» shipDate|body|string(date-time)|false|none|
|» status|body|string|false|Order Status|
|» complete|body|boolean|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|» status|placed|
|» status|approved|
|» status|delivered|

> Example responses

> 200 Response

```json
{
  "id": 10,
  "petId": 198772,
  "quantity": 7,
  "shipDate": "1970-01-01T00:00:00Z",
  "status": "approved",
  "complete": true
}
```

<h3 id="place-an-order-for-a-pet-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|successful operation|[Order](#schemaorder)|
|400|Bad Request|Invalid input|None|
|422|Unprocessable Entity|Validation exception|None|

<aside class="success">
This operation does not require authentication
</aside>

## Find purchase order by ID

<a id="opIdgetOrderById"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /store/order/{orderId} \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /store/order/{orderId}`

For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.

<h3 id="find-purchase-order-by-id-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|orderId|path|integer(int64)|true|ID of order that needs to be fetched|

> Example responses

> 200 Response

```json
{
  "id": 10,
  "petId": 198772,
  "quantity": 7,
  "shipDate": "1970-01-01T00:00:00Z",
  "status": "approved",
  "complete": true
}
```

<h3 id="find-purchase-order-by-id-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|successful operation|[Order](#schemaorder)|
|400|Bad Request|Invalid ID supplied|None|
|404|Not Found|Order not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete purchase order by ID

<a id="opIddeleteOrder"></a>

> Code samples

```bash
hono request \
  -X DELETE \
  -P /store/order/{orderId} \
  src/index.ts
```

`DELETE /store/order/{orderId}`

For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors

<h3 id="delete-purchase-order-by-id-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|orderId|path|integer(int64)|true|ID of the order that needs to be deleted|

<h3 id="delete-purchase-order-by-id-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|400|Bad Request|Invalid ID supplied|None|
|404|Not Found|Order not found|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="swagger-petstore---openapi-30-user">user</h1>

Operations about user

## Create user

<a id="opIdcreateUser"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /user \
  -d '{"id":10,"username":"theUser","firstName":"John","lastName":"James","email":"john@email.com","password":"12345","phone":"12345","userStatus":1}' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  src/index.ts
```

`POST /user`

This can only be done by the logged in user.

> Body parameter

```json
{
  "id": 10,
  "username": "theUser",
  "firstName": "John",
  "lastName": "James",
  "email": "john@email.com",
  "password": "12345",
  "phone": "12345",
  "userStatus": 1
}
```

<h3 id="create-user-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[User](#schemauser)|false|none|
|» id|body|integer(int64)|false|none|
|» username|body|string|false|none|
|» firstName|body|string|false|none|
|» lastName|body|string|false|none|
|» email|body|string|false|none|
|» password|body|string|false|none|
|» phone|body|string|false|none|
|» userStatus|body|integer(int32)|false|User Status|

> Example responses

> default Response

```json
{
  "id": 10,
  "username": "theUser",
  "firstName": "John",
  "lastName": "James",
  "email": "john@email.com",
  "password": "12345",
  "phone": "12345",
  "userStatus": 1
}
```

<h3 id="create-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|default|default|successful operation|[User](#schemauser)|

<aside class="success">
This operation does not require authentication
</aside>

## Creates list of users with given input array

<a id="opIdcreateUsersWithListInput"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /user/createWithList \
  -d '[{"id":10,"username":"theUser","firstName":"John","lastName":"James","email":"john@email.com","password":"12345","phone":"12345","userStatus":1}]' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  src/index.ts
```

`POST /user/createWithList`

Creates list of users with given input array

> Body parameter

```json
[
  {
    "id": 10,
    "username": "theUser",
    "firstName": "John",
    "lastName": "James",
    "email": "john@email.com",
    "password": "12345",
    "phone": "12345",
    "userStatus": 1
  }
]
```

<h3 id="creates-list-of-users-with-given-input-array-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|

> Example responses

> 200 Response

```json
{
  "id": 10,
  "username": "theUser",
  "firstName": "John",
  "lastName": "James",
  "email": "john@email.com",
  "password": "12345",
  "phone": "12345",
  "userStatus": 1
}
```

<h3 id="creates-list-of-users-with-given-input-array-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Successful operation|[User](#schemauser)|
|default|default|successful operation|None|

<aside class="success">
This operation does not require authentication
</aside>

## Logs user into the system

<a id="opIdloginUser"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /user/login \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /user/login`

<h3 id="logs-user-into-the-system-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|username|query|string|false|The user name for login|
|password|query|string|false|The password for login in clear text|

> Example responses

> 200 Response

```json
"string"
```

<h3 id="logs-user-into-the-system-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|successful operation|Inline|
|400|Bad Request|Invalid username/password supplied|None|

<aside class="success">
This operation does not require authentication
</aside>

## Logs out current logged in user session

<a id="opIdlogoutUser"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /user/logout \
  src/index.ts
```

`GET /user/logout`

<h3 id="logs-out-current-logged-in-user-session-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|default|default|successful operation|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get user by user name

<a id="opIdgetUserByName"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /user/{username} \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /user/{username}`

<h3 id="get-user-by-user-name-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|username|path|string|true|The name that needs to be fetched. Use user1 for testing. |

> Example responses

> 200 Response

```json
{
  "id": 10,
  "username": "theUser",
  "firstName": "John",
  "lastName": "James",
  "email": "john@email.com",
  "password": "12345",
  "phone": "12345",
  "userStatus": 1
}
```

<h3 id="get-user-by-user-name-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|successful operation|[User](#schemauser)|
|400|Bad Request|Invalid username supplied|None|
|404|Not Found|User not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update user

<a id="opIdupdateUser"></a>

> Code samples

```bash
hono request \
  -X PUT \
  -P /user/{username} \
  -d '{"id":10,"username":"theUser","firstName":"John","lastName":"James","email":"john@email.com","password":"12345","phone":"12345","userStatus":1}' \
  -H 'Content-Type: application/json' \
  src/index.ts
```

`PUT /user/{username}`

This can only be done by the logged in user.

> Body parameter

```json
{
  "id": 10,
  "username": "theUser",
  "firstName": "John",
  "lastName": "James",
  "email": "john@email.com",
  "password": "12345",
  "phone": "12345",
  "userStatus": 1
}
```

<h3 id="update-user-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|username|path|string|true|name that need to be deleted|
|body|body|[User](#schemauser)|false|none|
|» id|body|integer(int64)|false|none|
|» username|body|string|false|none|
|» firstName|body|string|false|none|
|» lastName|body|string|false|none|
|» email|body|string|false|none|
|» password|body|string|false|none|
|» phone|body|string|false|none|
|» userStatus|body|integer(int32)|false|User Status|

<h3 id="update-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|default|default|successful operation|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete user

<a id="opIddeleteUser"></a>

> Code samples

```bash
hono request \
  -X DELETE \
  -P /user/{username} \
  src/index.ts
```

`DELETE /user/{username}`

This can only be done by the logged in user.

<h3 id="delete-user-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|username|path|string|true|The name that needs to be deleted|

<h3 id="delete-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|400|Bad Request|Invalid username supplied|None|
|404|Not Found|User not found|None|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Order">Order</h2>
<!-- backwards compatibility -->
<a id="schemaorder"></a>
<a id="schema_Order"></a>
<a id="tocSorder"></a>
<a id="tocsorder"></a>

```json
{
  "id": 10,
  "petId": 198772,
  "quantity": 7,
  "shipDate": "1970-01-01T00:00:00Z",
  "status": "approved",
  "complete": true
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|petId|integer(int64)|false|none|none|
|quantity|integer(int32)|false|none|none|
|shipDate|string(date-time)|false|none|none|
|status|string|false|none|Order Status|
|complete|boolean|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|placed|
|status|approved|
|status|delivered|

<h2 id="tocS_Customer">Customer</h2>
<!-- backwards compatibility -->
<a id="schemacustomer"></a>
<a id="schema_Customer"></a>
<a id="tocScustomer"></a>
<a id="tocscustomer"></a>

```json
{
  "id": 100000,
  "username": "fehguy",
  "address": [
    {
      "street": "437 Lytton",
      "city": "Palo Alto",
      "state": "CA",
      "zip": "94301"
    }
  ]
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|username|string|false|none|none|
|address|[[Address](#schemaaddress)]|false|none|none|

<h2 id="tocS_Address">Address</h2>
<!-- backwards compatibility -->
<a id="schemaaddress"></a>
<a id="schema_Address"></a>
<a id="tocSaddress"></a>
<a id="tocsaddress"></a>

```json
{
  "street": "437 Lytton",
  "city": "Palo Alto",
  "state": "CA",
  "zip": "94301"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|street|string|false|none|none|
|city|string|false|none|none|
|state|string|false|none|none|
|zip|string|false|none|none|

<h2 id="tocS_Category">Category</h2>
<!-- backwards compatibility -->
<a id="schemacategory"></a>
<a id="schema_Category"></a>
<a id="tocScategory"></a>
<a id="tocscategory"></a>

```json
{
  "id": 1,
  "name": "Dogs"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|name|string|false|none|none|

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": 10,
  "username": "theUser",
  "firstName": "John",
  "lastName": "James",
  "email": "john@email.com",
  "password": "12345",
  "phone": "12345",
  "userStatus": 1
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|username|string|false|none|none|
|firstName|string|false|none|none|
|lastName|string|false|none|none|
|email|string|false|none|none|
|password|string|false|none|none|
|phone|string|false|none|none|
|userStatus|integer(int32)|false|none|User Status|

<h2 id="tocS_Tag">Tag</h2>
<!-- backwards compatibility -->
<a id="schematag"></a>
<a id="schema_Tag"></a>
<a id="tocStag"></a>
<a id="tocstag"></a>

```json
{
  "id": 0,
  "name": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|name|string|false|none|none|

<h2 id="tocS_Pet">Pet</h2>
<!-- backwards compatibility -->
<a id="schemapet"></a>
<a id="schema_Pet"></a>
<a id="tocSpet"></a>
<a id="tocspet"></a>

```json
{
  "id": 10,
  "name": "doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|name|string|true|none|none|
|category|[Category](#schemacategory)|false|none|none|
|photoUrls|[string]|true|none|none|
|tags|[[Tag](#schematag)]|false|none|none|
|status|string|false|none|pet status in the store|

#### Enumerated Values

|Property|Value|
|---|---|
|status|available|
|status|pending|
|status|sold|

<h2 id="tocS_ApiResponse">ApiResponse</h2>
<!-- backwards compatibility -->
<a id="schemaapiresponse"></a>
<a id="schema_ApiResponse"></a>
<a id="tocSapiresponse"></a>
<a id="tocsapiresponse"></a>

```json
{
  "code": 0,
  "type": "string",
  "message": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|code|integer(int32)|false|none|none|
|type|string|false|none|none|
|message|string|false|none|none|
