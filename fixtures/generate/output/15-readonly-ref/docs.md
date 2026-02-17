<h1 id="readonly-ref-api">Readonly Ref API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Tests `as const` behavior with $ref in components. When readonly=true, $ref entries in responses/requestBodies/examples must NOT get `as const` (TS1355: 'const' assertions can only be applied to references to enum members, or string, number, boolean, array, or object literals).

<h1 id="readonly-ref-api-default">Default</h1>

## List users

<a id="opIdlistUsers"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /users \
  src/index.ts
```

`GET /users`

> Example responses

> 200 Response

```json
{
  "users": [
    {
      "id": "string",
      "name": "string",
      "email": "user@example.com"
    }
  ],
  "total": 0
}
```

<h3 id="list-users-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|User list response|Inline|

<h3 id="list-users-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|users|[[User](#schemauser)]|true|none|none|
|» id|string|true|none|none|
|» name|string|true|none|none|
|» email|string(email)|true|none|none|
|total|integer|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Create user

<a id="opIdcreateUser"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /users \
  -H 'Accept: application/json' \
  src/index.ts
```

`POST /users`

> Body parameter

```json
{
  "name": "string",
  "email": "user@example.com"
}
```

<h3 id="create-user-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» name|body|string|true|none|
|» email|body|string(email)|true|none|

> Example responses

> 201 Response

```json
{
  "id": "string",
  "name": "string",
  "email": "user@example.com"
}
```

> 400 Response

```json
{
  "code": 0,
  "message": "string"
}
```

<h3 id="create-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[User](#schemauser)|
|400|Bad Request|Bad request|[ErrorBody](#schemaerrorbody)|

<aside class="success">
This operation does not require authentication
</aside>

## Get user by ID

<a id="opIdgetUser"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /users/{id} \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /users/{id}`

<h3 id="get-user-by-id-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "id": "string",
  "name": "string",
  "email": "user@example.com"
}
```

> 404 Response

```json
{
  "code": 0,
  "message": "string"
}
```

<h3 id="get-user-by-id-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[User](#schemauser)|
|404|Not Found|Not found|[ErrorBody](#schemaerrorbody)|

<aside class="success">
This operation does not require authentication
</aside>

## Update user

<a id="opIdupdateUser"></a>

> Code samples

```bash
hono request \
  -X PUT \
  -P /users/{id} \
  -H 'Accept: application/json' \
  src/index.ts
```

`PUT /users/{id}`

> Body parameter

```json
{
  "name": "string",
  "email": "user@example.com"
}
```

<h3 id="update-user-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|body|body|object|false|none|
|» name|body|string|false|none|
|» email|body|string(email)|false|none|

> Example responses

> 200 Response

```json
{
  "id": "string",
  "name": "string",
  "email": "user@example.com"
}
```

<h3 id="update-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[User](#schemauser)|

<aside class="success">
This operation does not require authentication
</aside>

## List items (uses $ref response alias)

<a id="opIdlistItems"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /items \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /items`

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "title": "string"
  }
]
```

> 500 Response

```json
{
  "code": 0,
  "message": "string"
}
```

<h3 id="list-items-uses-ref-response-alias-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|
|500|Internal Server Error|Server error|[ErrorBody](#schemaerrorbody)|

<h3 id="list-items-uses-ref-response-alias-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Item](#schemaitem)]|false|none|none|
|» id|integer|true|none|none|
|» title|string|true|none|none|

<aside class="success">
This operation does not require authentication
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
  "id": "string",
  "name": "string",
  "email": "user@example.com"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|name|string|true|none|none|
|email|string(email)|true|none|none|

<h2 id="tocS_Item">Item</h2>
<!-- backwards compatibility -->
<a id="schemaitem"></a>
<a id="schema_Item"></a>
<a id="tocSitem"></a>
<a id="tocsitem"></a>

```json
{
  "id": 0,
  "title": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|title|string|true|none|none|

<h2 id="tocS_ErrorBody">ErrorBody</h2>
<!-- backwards compatibility -->
<a id="schemaerrorbody"></a>
<a id="schema_ErrorBody"></a>
<a id="tocSerrorbody"></a>
<a id="tocserrorbody"></a>

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
