<h1 id="pagination-api">Pagination API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

OpenAPI spec exercising the `x-pagination: true` extension.
GET endpoints with this flag generate infinite query hooks
(useInfiniteUsers / getUsersInfiniteQueryOptions / etc.) in
every TanStack Query client (vue / react / svelte / solid /
preact / angular).

<h1 id="pagination-api-default">Default</h1>

## getUsers

<a id="opIdgetUsers"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /users \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /users`

<h3 id="getusers-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|cursor|query|string|false|none|
|limit|query|integer|false|none|

> Example responses

> 200 Response

```json
{
  "items": [
    {
      "id": "string",
      "name": "string"
    }
  ],
  "nextCursor": "string"
}
```

<h3 id="getusers-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Paged users|[UserPage](#schemauserpage)|

<aside class="success">
This operation does not require authentication
</aside>

## getPosts

<a id="opIdgetPosts"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /posts \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /posts`

<h3 id="getposts-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|cursor|query|string|false|none|

> Example responses

> 200 Response

```json
{
  "items": [
    {
      "id": "string",
      "title": "string"
    }
  ],
  "nextCursor": "string"
}
```

<h3 id="getposts-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Paged posts|[PostPage](#schemapostpage)|

<aside class="success">
This operation does not require authentication
</aside>

## getHealth

<a id="opIdgetHealth"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /health \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /health`

> Example responses

> 200 Response

```json
{
  "status": "string"
}
```

<h3 id="gethealth-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Health check|Inline|

<h3 id="gethealth-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|string|true|none|none|

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
  "name": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|name|string|true|none|none|

<h2 id="tocS_UserPage">UserPage</h2>
<!-- backwards compatibility -->
<a id="schemauserpage"></a>
<a id="schema_UserPage"></a>
<a id="tocSuserpage"></a>
<a id="tocsuserpage"></a>

```json
{
  "items": [
    {
      "id": "string",
      "name": "string"
    }
  ],
  "nextCursor": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|items|[[User](#schemauser)]|true|none|none|
|nextCursor|string|false|none|none|

<h2 id="tocS_Post">Post</h2>
<!-- backwards compatibility -->
<a id="schemapost"></a>
<a id="schema_Post"></a>
<a id="tocSpost"></a>
<a id="tocspost"></a>

```json
{
  "id": "string",
  "title": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|title|string|true|none|none|

<h2 id="tocS_PostPage">PostPage</h2>
<!-- backwards compatibility -->
<a id="schemapostpage"></a>
<a id="schema_PostPage"></a>
<a id="tocSpostpage"></a>
<a id="tocspostpage"></a>

```json
{
  "items": [
    {
      "id": "string",
      "title": "string"
    }
  ],
  "nextCursor": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|items|[[Post](#schemapost)]|true|none|none|
|nextCursor|string|false|none|none|
