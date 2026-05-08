<h1 id="pagination-test">Pagination Test v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="pagination-test-default">Default</h1>

## List items with pagination

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

<h3 id="list-items-with-pagination-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|limit|query|integer|false|none|
|cursor|query|string|false|none|

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

<h3 id="list-items-with-pagination-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[ItemsPage](#schemaitemspage)|

<aside class="success">
This operation does not require authentication
</aside>

## Feed (paginated, no args)

<a id="opIdlistFeeds"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /feeds \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /feeds`

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

<h3 id="feed-paginated-no-args-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[ItemsPage](#schemaitemspage)|

<aside class="success">
This operation does not require authentication
</aside>

## User's posts (paginated, path param)

<a id="opIdlistUserPosts"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /users/{userId}/posts \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /users/{userId}/posts`

<h3 id="users-posts-paginated-path-param-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|string|true|none|
|cursor|query|string|false|none|

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

<h3 id="users-posts-paginated-path-param-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[ItemsPage](#schemaitemspage)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Item">Item</h2>
<!-- backwards compatibility -->
<a id="schemaitem"></a>
<a id="schema_Item"></a>
<a id="tocSitem"></a>
<a id="tocsitem"></a>

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

<h2 id="tocS_ItemsPage">ItemsPage</h2>
<!-- backwards compatibility -->
<a id="schemaitemspage"></a>
<a id="schema_ItemsPage"></a>
<a id="tocSitemspage"></a>
<a id="tocsitemspage"></a>

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
|items|[[Item](#schemaitem)]|true|none|none|
|nextCursor|string|false|none|none|
