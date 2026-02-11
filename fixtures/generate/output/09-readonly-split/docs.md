---
title: Readonly Split API v1.0.0
language_tabs:
  - bash: Bash
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<h1 id="readonly-split-api">Readonly Split API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="readonly-split-api-default">Default</h1>

## listPosts

<a id="opIdlistPosts"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /posts \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /posts`

<h3 id="listposts-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|none|
|limit|query|integer|false|none|

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
        "name": "string",
        "avatarUrl": "http://example.com"
      },
      "tags": [
        {
          "id": 0,
          "name": "string",
          "slug": "string"
        }
      ],
      "createdAt": "1970-01-01T00:00:00Z",
      "updatedAt": "1970-01-01T00:00:00Z"
    }
  ],
  "total": 0
}
```

<h3 id="listposts-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="listposts-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|posts|[[Post](#schemapost)]|true|none|none|
|» id|integer|true|none|none|
|» title|string|true|none|none|
|» body|string|true|none|none|
|» author|[Author](#schemaauthor)|true|none|none|
|» » id|integer|true|none|none|
|» » name|string|true|none|none|
|» » avatarUrl|string(uri)|false|none|none|
|» tags|[[Tag](#schematag)]|false|none|none|
|» » id|integer|true|none|none|
|» » name|string|true|none|none|
|» » slug|string|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|» updatedAt|string(date-time)|true|none|none|
|total|integer|true|none|none|

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
  src/index.ts
```

`POST /posts`

> Body parameter

```json
{
  "title": "string",
  "body": "string",
  "tagIds": [
    0
  ]
}
```

<h3 id="createpost-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreatePost](#schemacreatepost)|true|none|
|» title|body|string|true|none|
|» body|body|string|true|none|
|» tagIds|body|[integer]|false|none|

> Example responses

> 201 Response

```json
{
  "id": 0,
  "title": "string",
  "body": "string",
  "author": {
    "id": 0,
    "name": "string",
    "avatarUrl": "http://example.com"
  },
  "tags": [
    {
      "id": 0,
      "name": "string",
      "slug": "string"
    }
  ],
  "createdAt": "1970-01-01T00:00:00Z",
  "updatedAt": "1970-01-01T00:00:00Z"
}
```

<h3 id="createpost-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[Post](#schemapost)|

<aside class="success">
This operation does not require authentication
</aside>

## getPost

<a id="opIdgetPost"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /posts/{id} \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /posts/{id}`

<h3 id="getpost-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "title": "string",
  "body": "string",
  "author": {
    "id": 0,
    "name": "string",
    "avatarUrl": "http://example.com"
  },
  "tags": [
    {
      "id": 0,
      "name": "string",
      "slug": "string"
    }
  ],
  "createdAt": "1970-01-01T00:00:00Z",
  "updatedAt": "1970-01-01T00:00:00Z"
}
```

<h3 id="getpost-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[Post](#schemapost)|

<aside class="success">
This operation does not require authentication
</aside>

## updatePost

<a id="opIdupdatePost"></a>

> Code samples

```bash
hono request \
  -X PUT \
  -P /posts/{id} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  src/index.ts
```

`PUT /posts/{id}`

> Body parameter

```json
{
  "title": "string",
  "body": "string",
  "tagIds": [
    0
  ]
}
```

<h3 id="updatepost-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|
|body|body|[UpdatePost](#schemaupdatepost)|true|none|
|» title|body|string|false|none|
|» body|body|string|false|none|
|» tagIds|body|[integer]|false|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "title": "string",
  "body": "string",
  "author": {
    "id": 0,
    "name": "string",
    "avatarUrl": "http://example.com"
  },
  "tags": [
    {
      "id": 0,
      "name": "string",
      "slug": "string"
    }
  ],
  "createdAt": "1970-01-01T00:00:00Z",
  "updatedAt": "1970-01-01T00:00:00Z"
}
```

<h3 id="updatepost-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[Post](#schemapost)|

<aside class="success">
This operation does not require authentication
</aside>

## deletePost

<a id="opIddeletePost"></a>

> Code samples

```bash
hono request \
  -X DELETE \
  -P /posts/{id} \
  src/index.ts
```

`DELETE /posts/{id}`

<h3 id="deletepost-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|

<h3 id="deletepost-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|No Content|Deleted|None|

<aside class="success">
This operation does not require authentication
</aside>

## listComments

<a id="opIdlistComments"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /posts/{id}/comments \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /posts/{id}/comments`

<h3 id="listcomments-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "body": "string",
    "author": {
      "id": 0,
      "name": "string",
      "avatarUrl": "http://example.com"
    },
    "createdAt": "1970-01-01T00:00:00Z"
  }
]
```

<h3 id="listcomments-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="listcomments-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Comment](#schemacomment)]|false|none|none|
|» id|integer|true|none|none|
|» body|string|true|none|none|
|» author|[Author](#schemaauthor)|true|none|none|
|» » id|integer|true|none|none|
|» » name|string|true|none|none|
|» » avatarUrl|string(uri)|false|none|none|
|» createdAt|string(date-time)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## createComment

<a id="opIdcreateComment"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /posts/{id}/comments \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  src/index.ts
```

`POST /posts/{id}/comments`

> Body parameter

```json
{
  "body": "string"
}
```

<h3 id="createcomment-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|
|body|body|[CreateComment](#schemacreatecomment)|true|none|
|» body|body|string|true|none|

> Example responses

> 201 Response

```json
{
  "id": 0,
  "body": "string",
  "author": {
    "id": 0,
    "name": "string",
    "avatarUrl": "http://example.com"
  },
  "createdAt": "1970-01-01T00:00:00Z"
}
```

<h3 id="createcomment-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[Comment](#schemacomment)|

<aside class="success">
This operation does not require authentication
</aside>

## listTags

<a id="opIdlistTags"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /tags \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /tags`

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

<h3 id="listtags-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="listtags-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Tag](#schematag)]|false|none|none|
|» id|integer|true|none|none|
|» name|string|true|none|none|
|» slug|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Post">Post</h2>
<!-- backwards compatibility -->
<a id="schemapost"></a>
<a id="schema_Post"></a>
<a id="tocSpost"></a>
<a id="tocspost"></a>

```json
{
  "id": 0,
  "title": "string",
  "body": "string",
  "author": {
    "id": 0,
    "name": "string",
    "avatarUrl": "http://example.com"
  },
  "tags": [
    {
      "id": 0,
      "name": "string",
      "slug": "string"
    }
  ],
  "createdAt": "1970-01-01T00:00:00Z",
  "updatedAt": "1970-01-01T00:00:00Z"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|title|string|true|none|none|
|body|string|true|none|none|
|author|[Author](#schemaauthor)|true|none|none|
|tags|[[Tag](#schematag)]|false|none|none|
|createdAt|string(date-time)|true|none|none|
|updatedAt|string(date-time)|true|none|none|

<h2 id="tocS_CreatePost">CreatePost</h2>
<!-- backwards compatibility -->
<a id="schemacreatepost"></a>
<a id="schema_CreatePost"></a>
<a id="tocScreatepost"></a>
<a id="tocscreatepost"></a>

```json
{
  "title": "string",
  "body": "string",
  "tagIds": [
    0
  ]
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|true|none|none|
|body|string|true|none|none|
|tagIds|[integer]|false|none|none|

<h2 id="tocS_UpdatePost">UpdatePost</h2>
<!-- backwards compatibility -->
<a id="schemaupdatepost"></a>
<a id="schema_UpdatePost"></a>
<a id="tocSupdatepost"></a>
<a id="tocsupdatepost"></a>

```json
{
  "title": "string",
  "body": "string",
  "tagIds": [
    0
  ]
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|false|none|none|
|body|string|false|none|none|
|tagIds|[integer]|false|none|none|

<h2 id="tocS_Comment">Comment</h2>
<!-- backwards compatibility -->
<a id="schemacomment"></a>
<a id="schema_Comment"></a>
<a id="tocScomment"></a>
<a id="tocscomment"></a>

```json
{
  "id": 0,
  "body": "string",
  "author": {
    "id": 0,
    "name": "string",
    "avatarUrl": "http://example.com"
  },
  "createdAt": "1970-01-01T00:00:00Z"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|body|string|true|none|none|
|author|[Author](#schemaauthor)|true|none|none|
|createdAt|string(date-time)|true|none|none|

<h2 id="tocS_CreateComment">CreateComment</h2>
<!-- backwards compatibility -->
<a id="schemacreatecomment"></a>
<a id="schema_CreateComment"></a>
<a id="tocScreatecomment"></a>
<a id="tocscreatecomment"></a>

```json
{
  "body": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|body|string|true|none|none|

<h2 id="tocS_Author">Author</h2>
<!-- backwards compatibility -->
<a id="schemaauthor"></a>
<a id="schema_Author"></a>
<a id="tocSauthor"></a>
<a id="tocsauthor"></a>

```json
{
  "id": 0,
  "name": "string",
  "avatarUrl": "http://example.com"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|name|string|true|none|none|
|avatarUrl|string(uri)|false|none|none|

<h2 id="tocS_Tag">Tag</h2>
<!-- backwards compatibility -->
<a id="schematag"></a>
<a id="schema_Tag"></a>
<a id="tocStag"></a>
<a id="tocstag"></a>

```json
{
  "id": 0,
  "name": "string",
  "slug": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|name|string|true|none|none|
|slug|string|true|none|none|

<h2 id="tocS_Pagination">Pagination</h2>
<!-- backwards compatibility -->
<a id="schemapagination"></a>
<a id="schema_Pagination"></a>
<a id="tocSpagination"></a>
<a id="tocspagination"></a>

```json
{
  "page": 0,
  "limit": 0,
  "total": 0
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|page|integer|true|none|none|
|limit|integer|true|none|none|
|total|integer|true|none|none|

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
