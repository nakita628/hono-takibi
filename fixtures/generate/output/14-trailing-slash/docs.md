<h1 id="trailing-slash-api">Trailing Slash API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Tests trailing-slash path handling. Trailing-slash routes use .index accessor in Hono RPC. Without .index, type error TS2339 occurs (Property '$get' does not exist).

<h1 id="trailing-slash-api-default">Default</h1>

## Reverse Chiban (trailing slash)

<a id="opIdgetApiReverseChibanIndex"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /api/reverseChiban/ \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /api/reverseChiban/`

> Example responses

> 200 Response

```json
{
  "result": "string"
}
```

<h3 id="reverse-chiban-trailing-slash-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="reverse-chiban-trailing-slash-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|result|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Reverse Chiban (no trailing slash)

<a id="opIdgetApiReverseChiban"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /api/reverseChiban \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /api/reverseChiban`

> Example responses

> 200 Response

```json
{
  "result": "string"
}
```

<h3 id="reverse-chiban-no-trailing-slash-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="reverse-chiban-no-trailing-slash-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|result|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## List posts (trailing slash only)

<a id="opIdgetPostsIndex"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /posts/ \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /posts/`

<h3 id="list-posts-trailing-slash-only-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|limit|query|integer|false|none|

> Example responses

> 200 Response

```json
{
  "items": [
    "string"
  ],
  "total": 0
}
```

<h3 id="list-posts-trailing-slash-only-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="list-posts-trailing-slash-only-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|items|[string]|true|none|none|
|total|integer|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Create post (trailing slash only)

<a id="opIdpostPostsIndex"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /posts/ \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{"title":"string"}' \
  src/index.ts
```

`POST /posts/`

> Body parameter

```json
{
  "title": "string"
}
```

<h3 id="create-post-trailing-slash-only-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» title|body|string|true|none|

> Example responses

> 201 Response

```json
{
  "id": 0,
  "title": "string"
}
```

<h3 id="create-post-trailing-slash-only-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|Inline|

<h3 id="create-post-trailing-slash-only-responseschema">Response Schema</h3>

Status Code **201**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|title|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Get user (trailing slash with path param)

<a id="opIdgetUsersIdIndex"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /users/{id}/ \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /users/{id}/`

<h3 id="get-user-trailing-slash-with-path-param-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "id": "string",
  "name": "string"
}
```

<h3 id="get-user-trailing-slash-with-path-param-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="get-user-trailing-slash-with-path-param-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|name|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## List items (trailing slash only)

<a id="opIdgetItemsIndex"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /items/ \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /items/`

> Example responses

> 200 Response

```json
{
  "items": [
    "string"
  ]
}
```

<h3 id="list-items-trailing-slash-only-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="list-items-trailing-slash-only-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|items|[string]|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>
