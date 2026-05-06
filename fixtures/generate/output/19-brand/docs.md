<h1 id="brand-test-api">Brand Test API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

OpenAPI spec with x-brand vendor extension for branded types

<h1 id="brand-test-api-default">Default</h1>

## createUser

<a id="opIdcreateUser"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /users \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "email": "user@example.com",
    "username": "string",
    "price": 0,
    "tags": [
      "string"
    ]
  }' \
  src/index.ts
```

`POST /users`

> Body parameter

```json
{
  "email": "user@example.com",
  "username": "string",
  "price": 0,
  "tags": [
    "string"
  ]
}
```

<h3 id="createuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateUser](#schemacreateuser)|true|none|
|» email|body|[Email](#schemaemail)|true|none|
|» username|body|[Username](#schemausername)|true|none|
|» price|body|[Price](#schemaprice)|true|none|
|» tags|body|[Tags](#schematags)|false|none|

> Example responses

> 201 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "email": "user@example.com",
  "username": "string"
}
```

<h3 id="createuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[User](#schemauser)|

<aside class="success">
This operation does not require authentication
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
|userId|path|[UserId](#schemauserid)|true|none|

> Example responses

> 200 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "email": "user@example.com",
  "username": "string"
}
```

<h3 id="getuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[User](#schemauser)|

<aside class="success">
This operation does not require authentication
</aside>

## createPost

<a id="opIdcreatePost"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /posts \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "authorId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "title": "string",
    "quantity": 0
  }' \
  src/index.ts
```

`POST /posts`

> Body parameter

```json
{
  "authorId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "title": "string",
  "quantity": 0
}
```

<h3 id="createpost-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreatePost](#schemacreatepost)|true|none|
|» authorId|body|[UserId](#schemauserid)|true|none|
|» title|body|string|true|none|
|» quantity|body|[Quantity](#schemaquantity)|true|none|

> Example responses

> 201 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "authorId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "title": "string"
}
```

<h3 id="createpost-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[Post](#schemapost)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_UserId">UserId</h2>
<!-- backwards compatibility -->
<a id="schemauserid"></a>
<a id="schema_UserId"></a>
<a id="tocSuserid"></a>
<a id="tocsuserid"></a>

```json
"497f6eca-6276-4993-bfeb-53cbbbba6f08"
```

<h2 id="tocS_PostId">PostId</h2>
<!-- backwards compatibility -->
<a id="schemapostid"></a>
<a id="schema_PostId"></a>
<a id="tocSpostid"></a>
<a id="tocspostid"></a>

```json
"497f6eca-6276-4993-bfeb-53cbbbba6f08"
```

<h2 id="tocS_Email">Email</h2>
<!-- backwards compatibility -->
<a id="schemaemail"></a>
<a id="schema_Email"></a>
<a id="tocSemail"></a>
<a id="tocsemail"></a>

```json
"user@example.com"
```

<h2 id="tocS_Price">Price</h2>
<!-- backwards compatibility -->
<a id="schemaprice"></a>
<a id="schema_Price"></a>
<a id="tocSprice"></a>
<a id="tocsprice"></a>

```json
0
```

<h2 id="tocS_Quantity">Quantity</h2>
<!-- backwards compatibility -->
<a id="schemaquantity"></a>
<a id="schema_Quantity"></a>
<a id="tocSquantity"></a>
<a id="tocsquantity"></a>

```json
0
```

<h2 id="tocS_Username">Username</h2>
<!-- backwards compatibility -->
<a id="schemausername"></a>
<a id="schema_Username"></a>
<a id="tocSusername"></a>
<a id="tocsusername"></a>

```json
"string"
```

<h2 id="tocS_Tags">Tags</h2>
<!-- backwards compatibility -->
<a id="schematags"></a>
<a id="schema_Tags"></a>
<a id="tocStags"></a>
<a id="tocstags"></a>

```json
[
  "string"
]
```

<h2 id="tocS_CreateUser">CreateUser</h2>
<!-- backwards compatibility -->
<a id="schemacreateuser"></a>
<a id="schema_CreateUser"></a>
<a id="tocScreateuser"></a>
<a id="tocscreateuser"></a>

```json
{
  "email": "user@example.com",
  "username": "string",
  "price": 0,
  "tags": [
    "string"
  ]
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|[Email](#schemaemail)|true|none|none|
|username|[Username](#schemausername)|true|none|none|
|price|[Price](#schemaprice)|true|none|none|
|tags|[Tags](#schematags)|false|none|none|

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "email": "user@example.com",
  "username": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|[UserId](#schemauserid)|true|none|none|
|email|[Email](#schemaemail)|true|none|none|
|username|[Username](#schemausername)|true|none|none|

<h2 id="tocS_CreatePost">CreatePost</h2>
<!-- backwards compatibility -->
<a id="schemacreatepost"></a>
<a id="schema_CreatePost"></a>
<a id="tocScreatepost"></a>
<a id="tocscreatepost"></a>

```json
{
  "authorId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "title": "string",
  "quantity": 0
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|authorId|[UserId](#schemauserid)|true|none|none|
|title|string|true|none|none|
|quantity|[Quantity](#schemaquantity)|true|none|none|

<h2 id="tocS_Post">Post</h2>
<!-- backwards compatibility -->
<a id="schemapost"></a>
<a id="schema_Post"></a>
<a id="tocSpost"></a>
<a id="tocspost"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "authorId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "title": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|[PostId](#schemapostid)|true|none|none|
|authorId|[UserId](#schemauserid)|true|none|none|
|title|string|true|none|none|
