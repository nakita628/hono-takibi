<h1 id="parameters-merge-api">Parameters Merge API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="parameters-merge-api-default">Default</h1>

## getItem

<a id="opIdgetItem"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /items/{itemId} \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /items/{itemId}`

<h3 id="getitem-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|fields|query|string|false|none|
|itemId|path|integer|true|none|
|version|header|string|false|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "createdAt": "1970-01-01T00:00:00Z"
}
```

<h3 id="getitem-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[Item](#schemaitem)|

<aside class="success">
This operation does not require authentication
</aside>

## updateItem

<a id="opIdupdateItem"></a>

> Code samples

```bash
hono request \
  -X PUT \
  -P /items/{itemId} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{"name":"string"}' \
  src/index.ts
```

`PUT /items/{itemId}`

> Body parameter

```json
{
  "name": "string"
}
```

<h3 id="updateitem-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|version|header|string|true|none|
|itemId|path|integer|true|none|
|body|body|[ItemUpdate](#schemaitemupdate)|true|none|
|» name|body|string|false|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "createdAt": "1970-01-01T00:00:00Z"
}
```

<h3 id="updateitem-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[Item](#schemaitem)|

<aside class="success">
This operation does not require authentication
</aside>

## deleteItem

<a id="opIddeleteItem"></a>

> Code samples

```bash
hono request \
  -X DELETE \
  -P /items/{itemId} \
  src/index.ts
```

`DELETE /items/{itemId}`

<h3 id="deleteitem-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|itemId|path|integer|true|none|
|version|header|string|false|none|

<h3 id="deleteitem-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|No Content|Deleted|None|

<aside class="success">
This operation does not require authentication
</aside>

## listItems

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

<h3 id="listitems-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|limit|query|integer|false|none|
|offset|query|integer|false|none|
|sort|query|string|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|sort|name|
|sort|created|
|sort|updated|

> Example responses

> 200 Response

```json
{
  "items": [
    {
      "id": 0,
      "name": "string",
      "createdAt": "1970-01-01T00:00:00Z"
    }
  ],
  "total": 0
}
```

<h3 id="listitems-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="listitems-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|items|[[Item](#schemaitem)]|true|none|none|
|» id|integer|true|none|none|
|» name|string|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|total|integer|true|none|none|

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
  "id": 0,
  "name": "string",
  "createdAt": "1970-01-01T00:00:00Z"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|name|string|true|none|none|
|createdAt|string(date-time)|true|none|none|

<h2 id="tocS_ItemUpdate">ItemUpdate</h2>
<!-- backwards compatibility -->
<a id="schemaitemupdate"></a>
<a id="schema_ItemUpdate"></a>
<a id="tocSitemupdate"></a>
<a id="tocsitemupdate"></a>

```json
{
  "name": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
