<h1 id="complex-schema-patterns-api">Complex Schema Patterns API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Tests for nested composition, circular+composition, discriminator edge cases

<h1 id="complex-schema-patterns-api-default">Default</h1>

## evaluateExpression

<a id="opIdevaluateExpression"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /expressions \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "type": "string",
    "value": "string"
  }' \
  src/index.ts
```

`POST /expressions`

Circular reference with oneOf (expression tree)

> Body parameter

```json
{
  "type": "string",
  "value": "string"
}
```

<h3 id="evaluateexpression-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Expression](#schemaexpression)|true|none|

> Example responses

> 200 Response

```json
{
  "type": "string",
  "value": "string"
}
```

<h3 id="evaluateexpression-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Evaluation result|[Expression](#schemaexpression)|

<aside class="success">
This operation does not require authentication
</aside>

## createShape

<a id="opIdcreateShape"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /shapes \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "kind": "string",
    "radius": 0
  }' \
  src/index.ts
```

`POST /shapes`

5-variant discriminated union

> Body parameter

```json
{
  "kind": "string",
  "radius": 0
}
```

<h3 id="createshape-parameters">Parameters</h3>

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

<h3 id="createshape-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Created shape|[Shape](#schemashape)|

<aside class="success">
This operation does not require authentication
</aside>

## createDocument

<a id="opIdcreateDocument"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /documents \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "title": "string",
    "createdAt": "1970-01-01T00:00:00Z",
    "docType": "string",
    "body": "string",
    "wordCount": 0
  }' \
  src/index.ts
```

`POST /documents`

allOf inside oneOf (nested composition)

> Body parameter

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "title": "string",
  "createdAt": "1970-01-01T00:00:00Z",
  "docType": "string",
  "body": "string",
  "wordCount": 0
}
```

<h3 id="createdocument-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Document](#schemadocument)|true|none|

> Example responses

> 200 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "title": "string",
  "createdAt": "1970-01-01T00:00:00Z",
  "docType": "string",
  "body": "string",
  "wordCount": 0
}
```

<h3 id="createdocument-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Created document|[Document](#schemadocument)|

<aside class="success">
This operation does not require authentication
</aside>

## createConfig

<a id="opIdcreateConfig"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /configs \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "version": 0,
    "host": "string",
    "port": 1,
    "tlsEnabled": true,
    "certPath": "string"
  }' \
  src/index.ts
```

`POST /configs`

Deeply nested allOf chain

> Body parameter

```json
{
  "version": 0,
  "host": "string",
  "port": 1,
  "tlsEnabled": true,
  "certPath": "string"
}
```

<h3 id="createconfig-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[FullConfig](#schemafullconfig)|true|none|

> Example responses

> 200 Response

```json
{
  "version": 0,
  "host": "string",
  "port": 1,
  "tlsEnabled": true,
  "certPath": "string"
}
```

<h3 id="createconfig-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Created config|[FullConfig](#schemafullconfig)|

<aside class="success">
This operation does not require authentication
</aside>

## getNullableUnion

<a id="opIdgetNullableUnion"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /nullable-union \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /nullable-union`

Nullable anyOf with mixed types

> Example responses

> 200 Response

```json
{
  "status": "string",
  "data": null
}
```

<h3 id="getnullableunion-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[NullableResult](#schemanullableresult)|

<aside class="success">
This operation does not require authentication
</aside>

## getNestedCircular

<a id="opIdgetNestedCircular"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /nested-circular \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /nested-circular`

Circular reference through allOf

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "parent": {},
  "children": [
    {}
  ]
}
```

<h3 id="getnestedcircular-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[Category](#schemacategory)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_LiteralExpr">LiteralExpr</h2>
<!-- backwards compatibility -->
<a id="schemaliteralexpr"></a>
<a id="schema_LiteralExpr"></a>
<a id="tocSliteralexpr"></a>
<a id="tocsliteralexpr"></a>

```json
{
  "type": "string",
  "value": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|true|none|none|
|value|object|true|none|none|

<h2 id="tocS_UnaryExpr">UnaryExpr</h2>
<!-- backwards compatibility -->
<a id="schemaunaryexpr"></a>
<a id="schema_UnaryExpr"></a>
<a id="tocSunaryexpr"></a>
<a id="tocsunaryexpr"></a>

```json
{
  "type": "string",
  "operator": "-",
  "operand": {
    "type": "string",
    "value": "string"
  }
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|true|none|none|
|operator|string|true|none|none|
|operand|[Expression](#schemaexpression)|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|operator|-|
|operator|!|

<h2 id="tocS_BinaryExpr">BinaryExpr</h2>
<!-- backwards compatibility -->
<a id="schemabinaryexpr"></a>
<a id="schema_BinaryExpr"></a>
<a id="tocSbinaryexpr"></a>
<a id="tocsbinaryexpr"></a>

```json
{
  "type": "string",
  "operator": "+",
  "left": {
    "type": "string",
    "value": "string"
  },
  "right": {}
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|true|none|none|
|operator|string|true|none|none|
|left|[Expression](#schemaexpression)|true|none|none|
|right|[Expression](#schemaexpression)|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|operator|+|
|operator|-|
|operator|*|
|operator|/|

<h2 id="tocS_Expression">Expression</h2>
<!-- backwards compatibility -->
<a id="schemaexpression"></a>
<a id="schema_Expression"></a>
<a id="tocSexpression"></a>
<a id="tocsexpression"></a>

```json
{
  "type": "string",
  "value": "string"
}
```

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

<h2 id="tocS_Triangle">Triangle</h2>
<!-- backwards compatibility -->
<a id="schematriangle"></a>
<a id="schema_Triangle"></a>
<a id="tocStriangle"></a>
<a id="tocstriangle"></a>

```json
{
  "kind": "string",
  "base": 0,
  "height": 0
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|kind|string|true|none|none|
|base|number|true|none|none|
|height|number|true|none|none|

<h2 id="tocS_Polygon">Polygon</h2>
<!-- backwards compatibility -->
<a id="schemapolygon"></a>
<a id="schema_Polygon"></a>
<a id="tocSpolygon"></a>
<a id="tocspolygon"></a>

```json
{
  "kind": "string",
  "sides": 3,
  "sideLength": 0
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|kind|string|true|none|none|
|sides|integer|true|none|none|
|sideLength|number|true|none|none|

<h2 id="tocS_Ellipse">Ellipse</h2>
<!-- backwards compatibility -->
<a id="schemaellipse"></a>
<a id="schema_Ellipse"></a>
<a id="tocSellipse"></a>
<a id="tocsellipse"></a>

```json
{
  "kind": "string",
  "semiMajor": 0,
  "semiMinor": 0
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|kind|string|true|none|none|
|semiMajor|number|true|none|none|
|semiMinor|number|true|none|none|

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

<h2 id="tocS_DocumentBase">DocumentBase</h2>
<!-- backwards compatibility -->
<a id="schemadocumentbase"></a>
<a id="schema_DocumentBase"></a>
<a id="tocSdocumentbase"></a>
<a id="tocsdocumentbase"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "title": "string",
  "createdAt": "1970-01-01T00:00:00Z"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|true|none|none|
|title|string|true|none|none|
|createdAt|string(date-time)|true|none|none|

<h2 id="tocS_ArticleContent">ArticleContent</h2>
<!-- backwards compatibility -->
<a id="schemaarticlecontent"></a>
<a id="schema_ArticleContent"></a>
<a id="tocSarticlecontent"></a>
<a id="tocsarticlecontent"></a>

```json
{
  "docType": "string",
  "body": "string",
  "wordCount": 0
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|docType|string|true|none|none|
|body|string|true|none|none|
|wordCount|integer|false|none|none|

<h2 id="tocS_SpreadsheetContent">SpreadsheetContent</h2>
<!-- backwards compatibility -->
<a id="schemaspreadsheetcontent"></a>
<a id="schema_SpreadsheetContent"></a>
<a id="tocSspreadsheetcontent"></a>
<a id="tocsspreadsheetcontent"></a>

```json
{
  "docType": "string",
  "rows": 0,
  "columns": 0
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|docType|string|true|none|none|
|rows|integer|true|none|none|
|columns|integer|true|none|none|

<h2 id="tocS_Article">Article</h2>
<!-- backwards compatibility -->
<a id="schemaarticle"></a>
<a id="schema_Article"></a>
<a id="tocSarticle"></a>
<a id="tocsarticle"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "title": "string",
  "createdAt": "1970-01-01T00:00:00Z",
  "docType": "string",
  "body": "string",
  "wordCount": 0
}
```

<h2 id="tocS_Spreadsheet">Spreadsheet</h2>
<!-- backwards compatibility -->
<a id="schemaspreadsheet"></a>
<a id="schema_Spreadsheet"></a>
<a id="tocSspreadsheet"></a>
<a id="tocsspreadsheet"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "title": "string",
  "createdAt": "1970-01-01T00:00:00Z",
  "docType": "string",
  "rows": 0,
  "columns": 0
}
```

<h2 id="tocS_Document">Document</h2>
<!-- backwards compatibility -->
<a id="schemadocument"></a>
<a id="schema_Document"></a>
<a id="tocSdocument"></a>
<a id="tocsdocument"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "title": "string",
  "createdAt": "1970-01-01T00:00:00Z",
  "docType": "string",
  "body": "string",
  "wordCount": 0
}
```

<h2 id="tocS_BaseConfig">BaseConfig</h2>
<!-- backwards compatibility -->
<a id="schemabaseconfig"></a>
<a id="schema_BaseConfig"></a>
<a id="tocSbaseconfig"></a>
<a id="tocsbaseconfig"></a>

```json
{
  "version": 0
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|version|integer|true|none|none|

<h2 id="tocS_NetworkConfig">NetworkConfig</h2>
<!-- backwards compatibility -->
<a id="schemanetworkconfig"></a>
<a id="schema_NetworkConfig"></a>
<a id="tocSnetworkconfig"></a>
<a id="tocsnetworkconfig"></a>

```json
{
  "host": "string",
  "port": 1
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|host|string|true|none|none|
|port|integer|true|none|none|

<h2 id="tocS_SecurityConfig">SecurityConfig</h2>
<!-- backwards compatibility -->
<a id="schemasecurityconfig"></a>
<a id="schema_SecurityConfig"></a>
<a id="tocSsecurityconfig"></a>
<a id="tocssecurityconfig"></a>

```json
{
  "tlsEnabled": true,
  "certPath": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tlsEnabled|boolean|true|none|none|
|certPath|string|false|none|none|

<h2 id="tocS_FullConfig">FullConfig</h2>
<!-- backwards compatibility -->
<a id="schemafullconfig"></a>
<a id="schema_FullConfig"></a>
<a id="tocSfullconfig"></a>
<a id="tocsfullconfig"></a>

```json
{
  "version": 0,
  "host": "string",
  "port": 1,
  "tlsEnabled": true,
  "certPath": "string"
}
```

<h2 id="tocS_SuccessResult">SuccessResult</h2>
<!-- backwards compatibility -->
<a id="schemasuccessresult"></a>
<a id="schema_SuccessResult"></a>
<a id="tocSsuccessresult"></a>
<a id="tocssuccessresult"></a>

```json
{
  "status": "string",
  "data": null
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|string|true|none|none|
|data|object|true|none|none|

<h2 id="tocS_ErrorResult">ErrorResult</h2>
<!-- backwards compatibility -->
<a id="schemaerrorresult"></a>
<a id="schema_ErrorResult"></a>
<a id="tocSerrorresult"></a>
<a id="tocserrorresult"></a>

```json
{
  "status": "string",
  "message": "string",
  "code": 0
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|string|true|none|none|
|message|string|true|none|none|
|code|integer|false|none|none|

<h2 id="tocS_NullableResult">NullableResult</h2>
<!-- backwards compatibility -->
<a id="schemanullableresult"></a>
<a id="schema_NullableResult"></a>
<a id="tocSnullableresult"></a>
<a id="tocsnullableresult"></a>

```json
{
  "status": "string",
  "data": null
}
```

<h2 id="tocS_Category">Category</h2>
<!-- backwards compatibility -->
<a id="schemacategory"></a>
<a id="schema_Category"></a>
<a id="tocScategory"></a>
<a id="tocscategory"></a>

```json
{
  "id": 0,
  "name": "string",
  "parent": {
    "id": 0,
    "name": "string",
    "parent": {},
    "children": [
      {}
    ]
  },
  "children": [
    {}
  ]
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|name|string|true|none|none|
|parent|[Category](#schemacategory)|false|none|none|
|children|[[Category](#schemacategory)]|false|none|none|
