<h1 id="default-response-api">Default Response API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="default-response-api-default">Default</h1>

## createItem

<a id="opIdcreateItem"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /items \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "id": "string",
    "name": "string"
  }' \
  src/index.ts
```

`POST /items`

> Body parameter

```json
{
  "id": "string",
  "name": "string"
}
```

<h3 id="createitem-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Item](#schemaitem)|true|none|
|» id|body|string|true|none|
|» name|body|string|true|none|

> Example responses

> default Response

```json
{
  "id": "string",
  "name": "string"
}
```

<h3 id="createitem-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|default|default|successful operation|[Item](#schemaitem)|

<aside class="success">
This operation does not require authentication
</aside>

## ping

<a id="opIdping"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /ping \
  src/index.ts
```

`GET /ping`

<h3 id="ping-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|2XX|2XX|ok|None|

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
