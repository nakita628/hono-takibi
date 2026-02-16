<h1 id="schema-edge-cases-api">Schema Edge Cases API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="schema-edge-cases-api-default">Default</h1>

## postNullable

<a id="opIdpostNullable"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /nullable \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{"name":"string","nickname":null,"age":null,"tags":null}' \
  src/index.ts
```

`POST /nullable`

> Body parameter

```json
{
  "name": "string",
  "nickname": null,
  "age": null,
  "tags": null
}
```

<h3 id="postnullable-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[NullableFields](#schemanullablefields)|true|none|
|» name|body|string|true|none|
|» nickname|body|string | null|false|none|
|» age|body|integer | null|false|none|
|» tags|body|array | null|false|none|

> Example responses

> 200 Response

```json
{
  "name": "string",
  "nickname": null,
  "age": null,
  "tags": null
}
```

<h3 id="postnullable-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[NullableFields](#schemanullablefields)|

<aside class="success">
This operation does not require authentication
</aside>

## postDiscriminated

<a id="opIdpostDiscriminated"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /discriminated \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{"kind":"string","radius":0}' \
  src/index.ts
```

`POST /discriminated`

> Body parameter

```json
{
  "kind": "string",
  "radius": 0
}
```

<h3 id="postdiscriminated-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Shape](#schemashape)|true|none|

> Example responses

> 200 Response

```json
{
  "kind": "string",
  "radius": 0
}
```

<h3 id="postdiscriminated-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[Shape](#schemashape)|

<aside class="success">
This operation does not require authentication
</aside>

## getComposed

<a id="opIdgetComposed"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /composed \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /composed`

> Example responses

> 200 Response

```json
{
  "id": 0,
  "createdAt": "1970-01-01T00:00:00Z",
  "name": "string",
  "description": "string",
  "extra": true
}
```

<h3 id="getcomposed-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[ComposedObject](#schemacomposedobject)|

<aside class="success">
This operation does not require authentication
</aside>

## getDeepNested

<a id="opIdgetDeepNested"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /deep-nested \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /deep-nested`

> Example responses

> 200 Response

```json
{
  "level2": {
    "level3": {
      "value": "string"
    }
  }
}
```

<h3 id="getdeepnested-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[Level1](#schemalevel1)|

<aside class="success">
This operation does not require authentication
</aside>

## getAdditionalProps

<a id="opIdgetAdditionalProps"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /additional-props \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /additional-props`

> Example responses

> 200 Response

```json
null
```

<h3 id="getadditionalprops-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[DynamicMap](#schemadynamicmap)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_NullableFields">NullableFields</h2>
<!-- backwards compatibility -->
<a id="schemanullablefields"></a>
<a id="schema_NullableFields"></a>
<a id="tocSnullablefields"></a>
<a id="tocsnullablefields"></a>

```json
{
  "name": "string",
  "nickname": null,
  "age": null,
  "tags": null
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|nickname|string | null|false|none|none|
|age|integer | null|false|none|none|
|tags|array | null|false|none|none|

<h2 id="tocS_Circle">Circle</h2>
<!-- backwards compatibility -->
<a id="schemacircle"></a>
<a id="schema_Circle"></a>
<a id="tocScircle"></a>
<a id="tocscircle"></a>

```json
{
  "kind": "string",
  "radius": 0
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|kind|string|true|none|none|
|radius|number|true|none|none|

<h2 id="tocS_Rectangle">Rectangle</h2>
<!-- backwards compatibility -->
<a id="schemarectangle"></a>
<a id="schema_Rectangle"></a>
<a id="tocSrectangle"></a>
<a id="tocsrectangle"></a>

```json
{
  "kind": "string",
  "width": 0,
  "height": 0
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|kind|string|true|none|none|
|width|number|true|none|none|
|height|number|true|none|none|

<h2 id="tocS_Shape">Shape</h2>
<!-- backwards compatibility -->
<a id="schemashape"></a>
<a id="schema_Shape"></a>
<a id="tocSshape"></a>
<a id="tocsshape"></a>

```json
{
  "kind": "string",
  "radius": 0
}
```

<h2 id="tocS_Base">Base</h2>
<!-- backwards compatibility -->
<a id="schemabase"></a>
<a id="schema_Base"></a>
<a id="tocSbase"></a>
<a id="tocsbase"></a>

```json
{
  "id": 0,
  "createdAt": "1970-01-01T00:00:00Z"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|createdAt|string(date-time)|true|none|none|

<h2 id="tocS_Extended">Extended</h2>
<!-- backwards compatibility -->
<a id="schemaextended"></a>
<a id="schema_Extended"></a>
<a id="tocSextended"></a>
<a id="tocsextended"></a>

```json
{
  "name": "string",
  "description": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|description|string|false|none|none|

<h2 id="tocS_ComposedObject">ComposedObject</h2>
<!-- backwards compatibility -->
<a id="schemacomposedobject"></a>
<a id="schema_ComposedObject"></a>
<a id="tocScomposedobject"></a>
<a id="tocscomposedobject"></a>

```json
{
  "id": 0,
  "createdAt": "1970-01-01T00:00:00Z",
  "name": "string",
  "description": "string",
  "extra": true
}
```

<h2 id="tocS_Level1">Level1</h2>
<!-- backwards compatibility -->
<a id="schemalevel1"></a>
<a id="schema_Level1"></a>
<a id="tocSlevel1"></a>
<a id="tocslevel1"></a>

```json
{
  "level2": {
    "level3": {
      "value": "string"
    }
  }
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|level2|object|true|none|none|

<h2 id="tocS_DynamicMap">DynamicMap</h2>
<!-- backwards compatibility -->
<a id="schemadynamicmap"></a>
<a id="schema_DynamicMap"></a>
<a id="tocSdynamicmap"></a>
<a id="tocsdynamicmap"></a>

```json
null
```

<h2 id="tocS_AnyOfExample">AnyOfExample</h2>
<!-- backwards compatibility -->
<a id="schemaanyofexample"></a>
<a id="schema_AnyOfExample"></a>
<a id="tocSanyofexample"></a>
<a id="tocsanyofexample"></a>

```json
"string"
```
