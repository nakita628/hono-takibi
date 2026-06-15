<h1 id="all-features-consolidated-generate-fixture">All Features — consolidated generate fixture v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Single fixture document covering every generator feature. Each feature group is namespaced by a path/name prefix (e.g. /minimal, /vendorExtensions, MinimalUser). Edit this file directly.

# Authentication

- HTTP Authentication, scheme: bearer

- HTTP Authentication, scheme: bearer

* API Key (SecuritySchemesApiKeyAuth)
    - Parameter Name: **X-API-Key**, in: header.

- HTTP Authentication, scheme: basic

- oAuth2 authentication.

    - Flow: authorizationCode
    - Authorization URL = [https://example.com/oauth/authorize](https://example.com/oauth/authorize)
    - Token URL = [https://example.com/oauth/token](https://example.com/oauth/token)

|Scope|Scope Description|
|---|---|
|read|Read access|
|write|Write access|

- HTTP Authentication, scheme: bearer

<h1 id="all-features-consolidated-generate-fixture-default">Default</h1>

## minimalGetHealth

<a id="opIdminimalGetHealth"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /minimal/health \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /minimal/health`

> Example responses

> 200 Response

```json
{
  "status": "string"
}
```

<h3 id="minimalgethealth-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="minimalgethealth-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## allExportsGetUsers

<a id="opIdallExportsGetUsers"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /allExports/users \
  src/index.ts
```

`GET /allExports/users`

<h3 id="allexportsgetusers-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|none|

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "name": "string",
    "email": "user@example.com"
  }
]
```

<h3 id="allexportsgetusers-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|A list of users|[AllExportsUserList](#schemaallexportsuserlist)|

<aside class="success">
This operation does not require authentication
</aside>

## allExportsCreateUser

<a id="opIdallExportsCreateUser"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /allExports/users \
  -H 'Accept: application/json' \
  src/index.ts
```

`POST /allExports/users`

> Body parameter

```json
{
  "name": "string",
  "email": "user@example.com"
}
```

<h3 id="allexportscreateuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» name|body|string|true|none|
|» email|body|string(email)|true|none|

> Example responses

> 201 Response

```json
{
  "id": 0,
  "name": "string",
  "email": "user@example.com"
}
```

<h3 id="allexportscreateuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[AllExportsUser](#schemaallexportsuser)|

<aside class="success">
This operation does not require authentication
</aside>

## allExportsGetUserById

<a id="opIdallExportsGetUserById"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /allExports/users/{id} \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`GET /allExports/users/{id}`

<h3 id="allexportsgetuserbyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "email": "user@example.com"
}
```

<h3 id="allexportsgetuserbyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[AllExportsUser](#schemaallexportsuser)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
AllExportsBearerAuth
</aside>

## circularRefsGetTree

<a id="opIdcircularRefsGetTree"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /circularRefs/tree \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /circularRefs/tree`

> Example responses

> 200 Response

```json
{
  "id": 0,
  "value": "string",
  "children": [
    {}
  ]
}
```

<h3 id="circularrefsgettree-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[CircularRefsTreeNode](#schemacircularrefstreenode)|

<aside class="success">
This operation does not require authentication
</aside>

## circularRefsCreateTree

<a id="opIdcircularRefsCreateTree"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /circularRefs/tree \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "id": 0,
    "value": "string",
    "children": [
      {}
    ]
  }' \
  src/index.ts
```

`POST /circularRefs/tree`

> Body parameter

```json
{
  "id": 0,
  "value": "string",
  "children": [
    {}
  ]
}
```

<h3 id="circularrefscreatetree-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CircularRefsTreeNode](#schemacircularrefstreenode)|true|none|
|» id|body|integer|true|none|
|» value|body|string|true|none|
|» children|body|[[CircularRefsTreeNode](#schemacircularrefstreenode)]|false|none|

> Example responses

> 201 Response

```json
{
  "id": 0,
  "value": "string",
  "children": [
    {}
  ]
}
```

<h3 id="circularrefscreatetree-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[CircularRefsTreeNode](#schemacircularrefstreenode)|

<aside class="success">
This operation does not require authentication
</aside>

## circularRefsGetGraph

<a id="opIdcircularRefsGetGraph"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /circularRefs/graph \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /circularRefs/graph`

> Example responses

> 200 Response

```json
{
  "id": 0,
  "ref": {
    "id": 0,
    "ref": {
      "id": 0,
      "ref": {}
    }
  }
}
```

<h3 id="circularrefsgetgraph-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[CircularRefsNodeA](#schemacircularrefsnodea)|

<aside class="success">
This operation does not require authentication
</aside>

## securitySchemesGetPublic

<a id="opIdsecuritySchemesGetPublic"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /securitySchemes/public \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /securitySchemes/public`

> Example responses

> 200 Response

```json
{
  "message": "string"
}
```

<h3 id="securityschemesgetpublic-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="securityschemesgetpublic-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## securitySchemesGetBearerProtected

<a id="opIdsecuritySchemesGetBearerProtected"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /securitySchemes/bearer-protected \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`GET /securitySchemes/bearer-protected`

> Example responses

> 200 Response

```json
{
  "data": "string"
}
```

<h3 id="securityschemesgetbearerprotected-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="securityschemesgetbearerprotected-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|string|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
SecuritySchemesBearerAuth
</aside>

## securitySchemesGetApiKeyProtected

<a id="opIdsecuritySchemesGetApiKeyProtected"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /securitySchemes/api-key-protected \
  -H 'Accept: application/json' \
  -H "X-API-Key: ${API_KEY}" \
  src/index.ts
```

`GET /securitySchemes/api-key-protected`

> Example responses

> 200 Response

```json
{
  "data": "string"
}
```

<h3 id="securityschemesgetapikeyprotected-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="securityschemesgetapikeyprotected-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|string|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
SecuritySchemesApiKeyAuth
</aside>

## securitySchemesGetBasicProtected

<a id="opIdsecuritySchemesGetBasicProtected"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /securitySchemes/basic-protected \
  -H 'Accept: application/json' \
  -H "Authorization: Basic ${CREDENTIALS}" \
  src/index.ts
```

`GET /securitySchemes/basic-protected`

> Example responses

> 200 Response

```json
{
  "data": "string"
}
```

<h3 id="securityschemesgetbasicprotected-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="securityschemesgetbasicprotected-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|string|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
SecuritySchemesBasicAuth
</aside>

## securitySchemesGetOAuthProtected

<a id="opIdsecuritySchemesGetOAuthProtected"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /securitySchemes/oauth-protected \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`GET /securitySchemes/oauth-protected`

> Example responses

> 200 Response

```json
{
  "data": "string"
}
```

<h3 id="securityschemesgetoauthprotected-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="securityschemesgetoauthprotected-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|string|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
SecuritySchemesOAuth2 ( Scopes: read )
</aside>

## securitySchemesGetMultiAuth

<a id="opIdsecuritySchemesGetMultiAuth"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /securitySchemes/multi-auth \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "X-API-Key: ${API_KEY}" \
  src/index.ts
```

`GET /securitySchemes/multi-auth`

> Example responses

> 200 Response

```json
{
  "data": "string"
}
```

<h3 id="securityschemesgetmultiauth-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="securityschemesgetmultiauth-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|string|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
SecuritySchemesBearerAuth & SecuritySchemesApiKeyAuth
</aside>

## contentTypesPostJson

<a id="opIdcontentTypesPostJson"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /contentTypes/json \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "name": "string",
    "value": 0
  }' \
  src/index.ts
```

`POST /contentTypes/json`

> Body parameter

```json
{
  "name": "string",
  "value": 0
}
```

<h3 id="contenttypespostjson-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» name|body|string|true|none|
|» value|body|integer|true|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string"
}
```

<h3 id="contenttypespostjson-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="contenttypespostjson-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|name|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## contentTypesPostForm

<a id="opIdcontentTypesPostForm"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /contentTypes/form \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json' \
  src/index.ts
```

`POST /contentTypes/form`

> Example responses

> 200 Response

```json
{
  "success": true
}
```

<h3 id="contenttypespostform-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="contenttypespostform-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|success|boolean|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## contentTypesUploadFile

<a id="opIdcontentTypesUploadFile"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /contentTypes/upload \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: application/json' \
  src/index.ts
```

`POST /contentTypes/upload`

> Example responses

> 200 Response

```json
{
  "url": "string"
}
```

<h3 id="contenttypesuploadfile-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="contenttypesuploadfile-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|url|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## contentTypesPostText

<a id="opIdcontentTypesPostText"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /contentTypes/text \
  src/index.ts
```

`POST /contentTypes/text`

<h3 id="contenttypesposttext-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## contentTypesPostMultiContent

<a id="opIdcontentTypesPostMultiContent"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /contentTypes/multi-content \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "data": "string"
  }' \
  src/index.ts
```

`POST /contentTypes/multi-content`

> Body parameter

```json
{
  "data": "string"
}
```

<h3 id="contenttypespostmulticontent-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» data|body|string|true|none|

> Example responses

> 200 Response

```json
{
  "received": true
}
```

<h3 id="contenttypespostmulticontent-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="contenttypespostmulticontent-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|received|boolean|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## parametersMergeGetItem

<a id="opIdparametersMergeGetItem"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /parametersMerge/items/{itemId} \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /parametersMerge/items/{itemId}`

<h3 id="parametersmergegetitem-parameters">Parameters</h3>

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

<h3 id="parametersmergegetitem-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[ParametersMergeItem](#schemaparametersmergeitem)|

<aside class="success">
This operation does not require authentication
</aside>

## parametersMergeUpdateItem

<a id="opIdparametersMergeUpdateItem"></a>

> Code samples

```bash
hono request \
  -X PUT \
  -P /parametersMerge/items/{itemId} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "name": "string"
  }' \
  src/index.ts
```

`PUT /parametersMerge/items/{itemId}`

> Body parameter

```json
{
  "name": "string"
}
```

<h3 id="parametersmergeupdateitem-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|version|header|string|true|none|
|itemId|path|integer|true|none|
|body|body|[ParametersMergeItemUpdate](#schemaparametersmergeitemupdate)|true|none|
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

<h3 id="parametersmergeupdateitem-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[ParametersMergeItem](#schemaparametersmergeitem)|

<aside class="success">
This operation does not require authentication
</aside>

## parametersMergeDeleteItem

<a id="opIdparametersMergeDeleteItem"></a>

> Code samples

```bash
hono request \
  -X DELETE \
  -P /parametersMerge/items/{itemId} \
  src/index.ts
```

`DELETE /parametersMerge/items/{itemId}`

<h3 id="parametersmergedeleteitem-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|itemId|path|integer|true|none|
|version|header|string|false|none|

<h3 id="parametersmergedeleteitem-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|No Content|Deleted|None|

<aside class="success">
This operation does not require authentication
</aside>

## parametersMergeListItems

<a id="opIdparametersMergeListItems"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /parametersMerge/items \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /parametersMerge/items`

<h3 id="parametersmergelistitems-parameters">Parameters</h3>

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

<h3 id="parametersmergelistitems-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="parametersmergelistitems-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|items|[[ParametersMergeItem](#schemaparametersmergeitem)]|true|none|none|
|» id|integer|true|none|none|
|» name|string|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|total|integer|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## schemaEdgeCasesPostNullable

<a id="opIdschemaEdgeCasesPostNullable"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /schemaEdgeCases/nullable \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "name": "string",
    "nickname": null,
    "age": null,
    "tags": null
  }' \
  src/index.ts
```

`POST /schemaEdgeCases/nullable`

> Body parameter

```json
{
  "name": "string",
  "nickname": null,
  "age": null,
  "tags": null
}
```

<h3 id="schemaedgecasespostnullable-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SchemaEdgeCasesNullableFields](#schemaschemaedgecasesnullablefields)|true|none|
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

<h3 id="schemaedgecasespostnullable-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[SchemaEdgeCasesNullableFields](#schemaschemaedgecasesnullablefields)|

<aside class="success">
This operation does not require authentication
</aside>

## schemaEdgeCasesPostDiscriminated

<a id="opIdschemaEdgeCasesPostDiscriminated"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /schemaEdgeCases/discriminated \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "kind": "string",
    "radius": 0
  }' \
  src/index.ts
```

`POST /schemaEdgeCases/discriminated`

> Body parameter

```json
{
  "kind": "string",
  "radius": 0
}
```

<h3 id="schemaedgecasespostdiscriminated-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SchemaEdgeCasesShape](#schemaschemaedgecasesshape)|true|none|

> Example responses

> 200 Response

```json
{
  "kind": "string",
  "radius": 0
}
```

<h3 id="schemaedgecasespostdiscriminated-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[SchemaEdgeCasesShape](#schemaschemaedgecasesshape)|

<aside class="success">
This operation does not require authentication
</aside>

## schemaEdgeCasesGetComposed

<a id="opIdschemaEdgeCasesGetComposed"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /schemaEdgeCases/composed \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /schemaEdgeCases/composed`

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

<h3 id="schemaedgecasesgetcomposed-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[SchemaEdgeCasesComposedObject](#schemaschemaedgecasescomposedobject)|

<aside class="success">
This operation does not require authentication
</aside>

## schemaEdgeCasesGetDeepNested

<a id="opIdschemaEdgeCasesGetDeepNested"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /schemaEdgeCases/deep-nested \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /schemaEdgeCases/deep-nested`

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

<h3 id="schemaedgecasesgetdeepnested-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[SchemaEdgeCasesLevel1](#schemaschemaedgecaseslevel1)|

<aside class="success">
This operation does not require authentication
</aside>

## schemaEdgeCasesGetAdditionalProps

<a id="opIdschemaEdgeCasesGetAdditionalProps"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /schemaEdgeCases/additional-props \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /schemaEdgeCases/additional-props`

> Example responses

> 200 Response

```json
null
```

<h3 id="schemaedgecasesgetadditionalprops-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[SchemaEdgeCasesDynamicMap](#schemaschemaedgecasesdynamicmap)|

<aside class="success">
This operation does not require authentication
</aside>

## callbacksLinksCreateSubscription

<a id="opIdcallbacksLinksCreateSubscription"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /callbacksLinks/subscriptions \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "callbackUrl": "http://example.com",
    "events": [
      "created"
    ]
  }' \
  src/index.ts
```

`POST /callbacksLinks/subscriptions`

> Body parameter

```json
{
  "callbackUrl": "http://example.com",
  "events": [
    "created"
  ]
}
```

<h3 id="callbackslinkscreatesubscription-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CallbacksLinksSubscriptionRequest](#schemacallbackslinkssubscriptionrequest)|true|none|
|» callbackUrl|body|string(uri)|true|none|
|» events|body|[string]|true|none|

> Example responses

> 201 Response

```json
{
  "id": "string",
  "callbackUrl": "http://example.com",
  "events": [
    "string"
  ],
  "status": "active"
}
```

<h3 id="callbackslinkscreatesubscription-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[CallbacksLinksSubscription](#schemacallbackslinkssubscription)|

<aside class="success">
This operation does not require authentication
</aside>

## callbacksLinksGetSubscription

<a id="opIdcallbacksLinksGetSubscription"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /callbacksLinks/subscriptions/{id} \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /callbacksLinks/subscriptions/{id}`

<h3 id="callbackslinksgetsubscription-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "id": "string",
  "callbackUrl": "http://example.com",
  "events": [
    "string"
  ],
  "status": "active"
}
```

<h3 id="callbackslinksgetsubscription-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[CallbacksLinksSubscription](#schemacallbackslinkssubscription)|

<aside class="success">
This operation does not require authentication
</aside>

## callbacksLinksDeleteSubscription

<a id="opIdcallbacksLinksDeleteSubscription"></a>

> Code samples

```bash
hono request \
  -X DELETE \
  -P /callbacksLinks/subscriptions/{id} \
  src/index.ts
```

`DELETE /callbacksLinks/subscriptions/{id}`

<h3 id="callbackslinksdeletesubscription-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="callbackslinksdeletesubscription-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|No Content|Deleted|None|

<aside class="success">
This operation does not require authentication
</aside>

## callbacksLinksTestWebhook

<a id="opIdcallbacksLinksTestWebhook"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /callbacksLinks/webhooks/test \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "url": "http://example.com"
  }' \
  src/index.ts
```

`POST /callbacksLinks/webhooks/test`

> Body parameter

```json
{
  "url": "http://example.com"
}
```

<h3 id="callbackslinkstestwebhook-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» url|body|string(uri)|true|none|

> Example responses

> 200 Response

```json
{
  "sent": true
}
```

<h3 id="callbackslinkstestwebhook-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="callbackslinkstestwebhook-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|sent|boolean|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## crudRefsListPosts

<a id="opIdcrudRefsListPosts"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /crudRefs/posts \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /crudRefs/posts`

<h3 id="crudrefslistposts-parameters">Parameters</h3>

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

<h3 id="crudrefslistposts-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="crudrefslistposts-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|posts|[[CrudRefsPost](#schemacrudrefspost)]|true|none|none|
|» id|integer|true|none|none|
|» title|string|true|none|none|
|» body|string|true|none|none|
|» author|[CrudRefsAuthor](#schemacrudrefsauthor)|true|none|none|
|» » id|integer|true|none|none|
|» » name|string|true|none|none|
|» » avatarUrl|string(uri)|false|none|none|
|» tags|[[CrudRefsTag](#schemacrudrefstag)]|false|none|none|
|» » id|integer|true|none|none|
|» » name|string|true|none|none|
|» » slug|string|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|» updatedAt|string(date-time)|true|none|none|
|total|integer|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## crudRefsCreatePost

<a id="opIdcrudRefsCreatePost"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /crudRefs/posts \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "title": "string",
    "body": "string",
    "tagIds": [
      0
    ]
  }' \
  src/index.ts
```

`POST /crudRefs/posts`

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

<h3 id="crudrefscreatepost-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CrudRefsCreatePost](#schemacrudrefscreatepost)|true|none|
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

<h3 id="crudrefscreatepost-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[CrudRefsPost](#schemacrudrefspost)|

<aside class="success">
This operation does not require authentication
</aside>

## crudRefsGetPost

<a id="opIdcrudRefsGetPost"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /crudRefs/posts/{id} \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /crudRefs/posts/{id}`

<h3 id="crudrefsgetpost-parameters">Parameters</h3>

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

<h3 id="crudrefsgetpost-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[CrudRefsPost](#schemacrudrefspost)|

<aside class="success">
This operation does not require authentication
</aside>

## crudRefsUpdatePost

<a id="opIdcrudRefsUpdatePost"></a>

> Code samples

```bash
hono request \
  -X PUT \
  -P /crudRefs/posts/{id} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "title": "string",
    "body": "string",
    "tagIds": [
      0
    ]
  }' \
  src/index.ts
```

`PUT /crudRefs/posts/{id}`

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

<h3 id="crudrefsupdatepost-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|
|body|body|[CrudRefsUpdatePost](#schemacrudrefsupdatepost)|true|none|
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

<h3 id="crudrefsupdatepost-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[CrudRefsPost](#schemacrudrefspost)|

<aside class="success">
This operation does not require authentication
</aside>

## crudRefsDeletePost

<a id="opIdcrudRefsDeletePost"></a>

> Code samples

```bash
hono request \
  -X DELETE \
  -P /crudRefs/posts/{id} \
  src/index.ts
```

`DELETE /crudRefs/posts/{id}`

<h3 id="crudrefsdeletepost-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|

<h3 id="crudrefsdeletepost-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|No Content|Deleted|None|

<aside class="success">
This operation does not require authentication
</aside>

## crudRefsListComments

<a id="opIdcrudRefsListComments"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /crudRefs/posts/{id}/comments \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /crudRefs/posts/{id}/comments`

<h3 id="crudrefslistcomments-parameters">Parameters</h3>

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

<h3 id="crudrefslistcomments-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="crudrefslistcomments-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[CrudRefsComment](#schemacrudrefscomment)]|false|none|none|
|» id|integer|true|none|none|
|» body|string|true|none|none|
|» author|[CrudRefsAuthor](#schemacrudrefsauthor)|true|none|none|
|» » id|integer|true|none|none|
|» » name|string|true|none|none|
|» » avatarUrl|string(uri)|false|none|none|
|» createdAt|string(date-time)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## crudRefsCreateComment

<a id="opIdcrudRefsCreateComment"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /crudRefs/posts/{id}/comments \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "body": "string"
  }' \
  src/index.ts
```

`POST /crudRefs/posts/{id}/comments`

> Body parameter

```json
{
  "body": "string"
}
```

<h3 id="crudrefscreatecomment-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|
|body|body|[CrudRefsCreateComment](#schemacrudrefscreatecomment)|true|none|
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

<h3 id="crudrefscreatecomment-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[CrudRefsComment](#schemacrudrefscomment)|

<aside class="success">
This operation does not require authentication
</aside>

## crudRefsListTags

<a id="opIdcrudRefsListTags"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /crudRefs/tags \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /crudRefs/tags`

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

<h3 id="crudrefslisttags-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="crudrefslisttags-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[CrudRefsTag](#schemacrudrefstag)]|false|none|none|
|» id|integer|true|none|none|
|» name|string|true|none|none|
|» slug|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## comprehensiveListUsers

<a id="opIdcomprehensiveListUsers"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /comprehensive/users \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /comprehensive/users`

<h3 id="comprehensivelistusers-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|none|
|limit|query|integer|false|none|

> Example responses

> 200 Response

```json
{
  "users": [
    {
      "id": 0,
      "name": "string",
      "email": "user@example.com",
      "role": "admin",
      "address": {
        "street": "string",
        "city": "string",
        "state": "string",
        "zip": "string",
        "country": "string"
      },
      "createdAt": "1970-01-01T00:00:00Z"
    }
  ],
  "total": 0
}
```

<h3 id="comprehensivelistusers-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="comprehensivelistusers-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|users|[[ComprehensiveUser](#schemacomprehensiveuser)]|true|none|none|
|» id|integer|true|none|none|
|» name|string|true|none|none|
|» email|string(email)|true|none|none|
|» role|string|true|none|none|
|» address|[ComprehensiveAddress](#schemacomprehensiveaddress)|false|none|none|
|» » street|string|true|none|none|
|» » city|string|true|none|none|
|» » state|string|false|none|none|
|» » zip|string|false|none|none|
|» » country|string|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|total|integer|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## comprehensiveCreateUser

<a id="opIdcomprehensiveCreateUser"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /comprehensive/users \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -d '{
    "name": "string",
    "email": "user@example.com",
    "password": "string",
    "role": "admin",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zip": "string",
      "country": "string"
    }
  }' \
  src/index.ts
```

`POST /comprehensive/users`

> Body parameter

```json
{
  "name": "string",
  "email": "user@example.com",
  "password": "string",
  "role": "admin",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "country": "string"
  }
}
```

<h3 id="comprehensivecreateuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ComprehensiveCreateUser](#schemacomprehensivecreateuser)|true|none|
|» name|body|string|true|none|
|» email|body|string(email)|true|none|
|» password|body|string|true|none|
|» role|body|string|false|none|
|» address|body|[ComprehensiveAddress](#schemacomprehensiveaddress)|false|none|
|» »  street|body|string|true|none|
|» »  city|body|string|true|none|
|» »  state|body|string|false|none|
|» »  zip|body|string|false|none|
|» »  country|body|string|true|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|» role|admin|
|» role|customer|

> Example responses

> 201 Response

```json
{
  "id": 0,
  "name": "string",
  "email": "user@example.com",
  "role": "admin",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "country": "string"
  },
  "createdAt": "1970-01-01T00:00:00Z"
}
```

<h3 id="comprehensivecreateuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[ComprehensiveUser](#schemacomprehensiveuser)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ComprehensiveBearerAuth
</aside>

## comprehensiveGetUser

<a id="opIdcomprehensiveGetUser"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /comprehensive/users/{userId} \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /comprehensive/users/{userId}`

<h3 id="comprehensivegetuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "email": "user@example.com",
  "role": "admin",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "country": "string"
  },
  "createdAt": "1970-01-01T00:00:00Z"
}
```

> 404 Response

```json
{
  "code": 0,
  "message": "string"
}
```

<h3 id="comprehensivegetuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[ComprehensiveUser](#schemacomprehensiveuser)|
|404|Not Found|Resource not found|[ComprehensiveError](#schemacomprehensiveerror)|

<aside class="success">
This operation does not require authentication
</aside>

## comprehensiveUpdateUser

<a id="opIdcomprehensiveUpdateUser"></a>

> Code samples

```bash
hono request \
  -X PUT \
  -P /comprehensive/users/{userId} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -d '{
    "name": "string",
    "email": "user@example.com",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zip": "string",
      "country": "string"
    }
  }' \
  src/index.ts
```

`PUT /comprehensive/users/{userId}`

> Body parameter

```json
{
  "name": "string",
  "email": "user@example.com",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "country": "string"
  }
}
```

<h3 id="comprehensiveupdateuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|integer|true|none|
|body|body|[ComprehensiveUpdateUser](#schemacomprehensiveupdateuser)|true|none|
|» name|body|string|false|none|
|» email|body|string(email)|false|none|
|» address|body|[ComprehensiveAddress](#schemacomprehensiveaddress)|false|none|
|» »  street|body|string|true|none|
|» »  city|body|string|true|none|
|» »  state|body|string|false|none|
|» »  zip|body|string|false|none|
|» »  country|body|string|true|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "email": "user@example.com",
  "role": "admin",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "country": "string"
  },
  "createdAt": "1970-01-01T00:00:00Z"
}
```

<h3 id="comprehensiveupdateuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[ComprehensiveUser](#schemacomprehensiveuser)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ComprehensiveBearerAuth
</aside>

## comprehensiveDeleteUser

<a id="opIdcomprehensiveDeleteUser"></a>

> Code samples

```bash
hono request \
  -X DELETE \
  -P /comprehensive/users/{userId} \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`DELETE /comprehensive/users/{userId}`

<h3 id="comprehensivedeleteuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|integer|true|none|

<h3 id="comprehensivedeleteuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|No Content|Deleted|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ComprehensiveBearerAuth
</aside>

## comprehensiveListProducts

<a id="opIdcomprehensiveListProducts"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /comprehensive/products \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /comprehensive/products`

<h3 id="comprehensivelistproducts-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|none|
|limit|query|integer|false|none|
|category|query|string|false|none|
|minPrice|query|number|false|none|
|maxPrice|query|number|false|none|

> Example responses

> 200 Response

```json
{
  "products": [
    {
      "id": 0,
      "name": "string",
      "description": "string",
      "price": 0,
      "category": {
        "id": 0,
        "name": "string",
        "parentId": null
      },
      "tags": [
        "string"
      ],
      "inStock": true,
      "createdAt": "1970-01-01T00:00:00Z"
    }
  ],
  "total": 0
}
```

<h3 id="comprehensivelistproducts-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="comprehensivelistproducts-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|products|[[ComprehensiveProduct](#schemacomprehensiveproduct)]|true|none|none|
|» id|integer|true|none|none|
|» name|string|true|none|none|
|» description|string|false|none|none|
|» price|number|true|none|none|
|» category|[ComprehensiveCategory](#schemacomprehensivecategory)|true|none|none|
|» » id|integer|true|none|none|
|» » name|string|true|none|none|
|» » parentId|integer | null|false|none|none|
|» tags|[string]|false|none|none|
|» inStock|boolean|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|total|integer|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## comprehensiveCreateProduct

<a id="opIdcomprehensiveCreateProduct"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /comprehensive/products \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -d '{
    "name": "string",
    "description": "string",
    "price": 0,
    "categoryId": 0,
    "tags": [
      "string"
    ]
  }' \
  src/index.ts
```

`POST /comprehensive/products`

> Body parameter

```json
{
  "name": "string",
  "description": "string",
  "price": 0,
  "categoryId": 0,
  "tags": [
    "string"
  ]
}
```

<h3 id="comprehensivecreateproduct-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ComprehensiveCreateProduct](#schemacomprehensivecreateproduct)|true|none|
|» name|body|string|true|none|
|» description|body|string|false|none|
|» price|body|number|true|none|
|» categoryId|body|integer|true|none|
|» tags|body|[string]|false|none|

> Example responses

> 201 Response

```json
{
  "id": 0,
  "name": "string",
  "description": "string",
  "price": 0,
  "category": {
    "id": 0,
    "name": "string",
    "parentId": null
  },
  "tags": [
    "string"
  ],
  "inStock": true,
  "createdAt": "1970-01-01T00:00:00Z"
}
```

<h3 id="comprehensivecreateproduct-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[ComprehensiveProduct](#schemacomprehensiveproduct)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ComprehensiveBearerAuth
</aside>

## comprehensiveGetProduct

<a id="opIdcomprehensiveGetProduct"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /comprehensive/products/{productId} \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /comprehensive/products/{productId}`

<h3 id="comprehensivegetproduct-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|productId|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "description": "string",
  "price": 0,
  "category": {
    "id": 0,
    "name": "string",
    "parentId": null
  },
  "tags": [
    "string"
  ],
  "inStock": true,
  "createdAt": "1970-01-01T00:00:00Z"
}
```

> 404 Response

```json
{
  "code": 0,
  "message": "string"
}
```

<h3 id="comprehensivegetproduct-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[ComprehensiveProduct](#schemacomprehensiveproduct)|
|404|Not Found|Resource not found|[ComprehensiveError](#schemacomprehensiveerror)|

<aside class="success">
This operation does not require authentication
</aside>

## comprehensiveUpdateProduct

<a id="opIdcomprehensiveUpdateProduct"></a>

> Code samples

```bash
hono request \
  -X PUT \
  -P /comprehensive/products/{productId} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -d '{
    "name": "string",
    "description": "string",
    "price": 0,
    "categoryId": 0,
    "tags": [
      "string"
    ]
  }' \
  src/index.ts
```

`PUT /comprehensive/products/{productId}`

> Body parameter

```json
{
  "name": "string",
  "description": "string",
  "price": 0,
  "categoryId": 0,
  "tags": [
    "string"
  ]
}
```

<h3 id="comprehensiveupdateproduct-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|productId|path|integer|true|none|
|body|body|[ComprehensiveUpdateProduct](#schemacomprehensiveupdateproduct)|true|none|
|» name|body|string|false|none|
|» description|body|string|false|none|
|» price|body|number|false|none|
|» categoryId|body|integer|false|none|
|» tags|body|[string]|false|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "description": "string",
  "price": 0,
  "category": {
    "id": 0,
    "name": "string",
    "parentId": null
  },
  "tags": [
    "string"
  ],
  "inStock": true,
  "createdAt": "1970-01-01T00:00:00Z"
}
```

<h3 id="comprehensiveupdateproduct-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[ComprehensiveProduct](#schemacomprehensiveproduct)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ComprehensiveBearerAuth
</aside>

## comprehensiveListReviews

<a id="opIdcomprehensiveListReviews"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /comprehensive/products/{productId}/reviews \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /comprehensive/products/{productId}/reviews`

<h3 id="comprehensivelistreviews-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|productId|path|integer|true|none|

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "rating": 1,
    "comment": "string",
    "author": {
      "id": 0,
      "name": "string",
      "email": "user@example.com",
      "role": "admin",
      "address": {
        "street": "string",
        "city": "string",
        "state": "string",
        "zip": "string",
        "country": "string"
      },
      "createdAt": "1970-01-01T00:00:00Z"
    },
    "createdAt": "1970-01-01T00:00:00Z"
  }
]
```

<h3 id="comprehensivelistreviews-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="comprehensivelistreviews-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[ComprehensiveReview](#schemacomprehensivereview)]|false|none|none|
|» id|integer|true|none|none|
|» rating|integer|true|none|none|
|» comment|string|false|none|none|
|» author|[ComprehensiveUser](#schemacomprehensiveuser)|true|none|none|
|» » id|integer|true|none|none|
|» » name|string|true|none|none|
|» » email|string(email)|true|none|none|
|» » role|string|true|none|none|
|» » address|[ComprehensiveAddress](#schemacomprehensiveaddress)|false|none|none|
|»  » » street|string|true|none|none|
|»  » » city|string|true|none|none|
|»  » » state|string|false|none|none|
|»  » » zip|string|false|none|none|
|»  » » country|string|true|none|none|
|» » createdAt|string(date-time)|true|none|none|
|» createdAt|string(date-time)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## comprehensiveCreateReview

<a id="opIdcomprehensiveCreateReview"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /comprehensive/products/{productId}/reviews \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -d '{
    "rating": 1,
    "comment": "string"
  }' \
  src/index.ts
```

`POST /comprehensive/products/{productId}/reviews`

> Body parameter

```json
{
  "rating": 1,
  "comment": "string"
}
```

<h3 id="comprehensivecreatereview-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|productId|path|integer|true|none|
|body|body|[ComprehensiveCreateReview](#schemacomprehensivecreatereview)|true|none|
|» rating|body|integer|true|none|
|» comment|body|string|false|none|

> Example responses

> 201 Response

```json
{
  "id": 0,
  "rating": 1,
  "comment": "string",
  "author": {
    "id": 0,
    "name": "string",
    "email": "user@example.com",
    "role": "admin",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zip": "string",
      "country": "string"
    },
    "createdAt": "1970-01-01T00:00:00Z"
  },
  "createdAt": "1970-01-01T00:00:00Z"
}
```

<h3 id="comprehensivecreatereview-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[ComprehensiveReview](#schemacomprehensivereview)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ComprehensiveBearerAuth
</aside>

## comprehensiveListOrders

<a id="opIdcomprehensiveListOrders"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /comprehensive/orders \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`GET /comprehensive/orders`

<h3 id="comprehensivelistorders-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|none|
|limit|query|integer|false|none|
|status|query|string|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|status|pending|
|status|confirmed|
|status|shipped|
|status|delivered|
|status|cancelled|

> Example responses

> 200 Response

```json
{
  "orders": [
    {
      "id": 0,
      "user": {
        "id": 0,
        "name": "string",
        "email": "user@example.com",
        "role": "admin",
        "address": {
          "street": "string",
          "city": "string",
          "state": "string",
          "zip": "string",
          "country": "string"
        },
        "createdAt": "1970-01-01T00:00:00Z"
      },
      "items": [
        {
          "product": {
            "id": 0,
            "name": "string",
            "description": "string",
            "price": 0,
            "category": {
              "id": 0,
              "name": "string",
              "parentId": null
            },
            "tags": [
              "string"
            ],
            "inStock": true,
            "createdAt": "1970-01-01T00:00:00Z"
          },
          "quantity": 1,
          "price": 0
        }
      ],
      "status": "pending",
      "totalPrice": 0,
      "shippingAddress": {},
      "createdAt": "1970-01-01T00:00:00Z"
    }
  ],
  "total": 0
}
```

<h3 id="comprehensivelistorders-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="comprehensivelistorders-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|orders|[[ComprehensiveOrder](#schemacomprehensiveorder)]|true|none|none|
|» id|integer|true|none|none|
|» user|[ComprehensiveUser](#schemacomprehensiveuser)|true|none|none|
|» » id|integer|true|none|none|
|» » name|string|true|none|none|
|» » email|string(email)|true|none|none|
|» » role|string|true|none|none|
|» » address|[ComprehensiveAddress](#schemacomprehensiveaddress)|false|none|none|
|»  » » street|string|true|none|none|
|»  » » city|string|true|none|none|
|»  » » state|string|false|none|none|
|»  » » zip|string|false|none|none|
|»  » » country|string|true|none|none|
|» » createdAt|string(date-time)|true|none|none|
|» items|[[ComprehensiveOrderItem](#schemacomprehensiveorderitem)]|true|none|none|
|» » product|[ComprehensiveProduct](#schemacomprehensiveproduct)|true|none|none|
|»  » » id|integer|true|none|none|
|»  » » name|string|true|none|none|
|»  » » description|string|false|none|none|
|»  » » price|number|true|none|none|
|»  » » category|[ComprehensiveCategory](#schemacomprehensivecategory)|true|none|none|
|»   »  » » id|integer|true|none|none|
|»   »  » » name|string|true|none|none|
|»   »  » » parentId|integer | null|false|none|none|
|»  » » tags|[string]|false|none|none|
|»  » » inStock|boolean|true|none|none|
|»  » » createdAt|string(date-time)|true|none|none|
|» » quantity|integer|true|none|none|
|» » price|number|true|none|none|
|» status|string|true|none|none|
|» totalPrice|number|true|none|none|
|» shippingAddress|[ComprehensiveAddress](#schemacomprehensiveaddress)|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|total|integer|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ComprehensiveBearerAuth
</aside>

## comprehensiveCreateOrder

<a id="opIdcomprehensiveCreateOrder"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /comprehensive/orders \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -d '{
    "items": [
      {
        "productId": 0,
        "quantity": 1
      }
    ],
    "shippingAddress": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zip": "string",
      "country": "string"
    },
    "callbackUrl": "http://example.com"
  }' \
  src/index.ts
```

`POST /comprehensive/orders`

> Body parameter

```json
{
  "items": [
    {
      "productId": 0,
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "country": "string"
  },
  "callbackUrl": "http://example.com"
}
```

<h3 id="comprehensivecreateorder-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ComprehensiveCreateOrder](#schemacomprehensivecreateorder)|true|none|
|» items|body|[object]|true|none|
|» shippingAddress|body|[ComprehensiveAddress](#schemacomprehensiveaddress)|true|none|
|» »  street|body|string|true|none|
|» »  city|body|string|true|none|
|» »  state|body|string|false|none|
|» »  zip|body|string|false|none|
|» »  country|body|string|true|none|
|» callbackUrl|body|string(uri)|false|none|

> Example responses

> 201 Response

```json
{
  "id": 0,
  "user": {
    "id": 0,
    "name": "string",
    "email": "user@example.com",
    "role": "admin",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zip": "string",
      "country": "string"
    },
    "createdAt": "1970-01-01T00:00:00Z"
  },
  "items": [
    {
      "product": {
        "id": 0,
        "name": "string",
        "description": "string",
        "price": 0,
        "category": {
          "id": 0,
          "name": "string",
          "parentId": null
        },
        "tags": [
          "string"
        ],
        "inStock": true,
        "createdAt": "1970-01-01T00:00:00Z"
      },
      "quantity": 1,
      "price": 0
    }
  ],
  "status": "pending",
  "totalPrice": 0,
  "shippingAddress": {},
  "createdAt": "1970-01-01T00:00:00Z"
}
```

<h3 id="comprehensivecreateorder-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[ComprehensiveOrder](#schemacomprehensiveorder)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ComprehensiveBearerAuth
</aside>

## comprehensiveGetOrder

<a id="opIdcomprehensiveGetOrder"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /comprehensive/orders/{orderId} \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`GET /comprehensive/orders/{orderId}`

<h3 id="comprehensivegetorder-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|orderId|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "user": {
    "id": 0,
    "name": "string",
    "email": "user@example.com",
    "role": "admin",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zip": "string",
      "country": "string"
    },
    "createdAt": "1970-01-01T00:00:00Z"
  },
  "items": [
    {
      "product": {
        "id": 0,
        "name": "string",
        "description": "string",
        "price": 0,
        "category": {
          "id": 0,
          "name": "string",
          "parentId": null
        },
        "tags": [
          "string"
        ],
        "inStock": true,
        "createdAt": "1970-01-01T00:00:00Z"
      },
      "quantity": 1,
      "price": 0
    }
  ],
  "status": "pending",
  "totalPrice": 0,
  "shippingAddress": {},
  "createdAt": "1970-01-01T00:00:00Z"
}
```

> 404 Response

```json
{
  "code": 0,
  "message": "string"
}
```

<h3 id="comprehensivegetorder-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[ComprehensiveOrder](#schemacomprehensiveorder)|
|404|Not Found|Resource not found|[ComprehensiveError](#schemacomprehensiveerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ComprehensiveBearerAuth
</aside>

## comprehensiveListCategories

<a id="opIdcomprehensiveListCategories"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /comprehensive/categories \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /comprehensive/categories`

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "name": "string",
    "parentId": null
  }
]
```

<h3 id="comprehensivelistcategories-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="comprehensivelistcategories-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[ComprehensiveCategory](#schemacomprehensivecategory)]|false|none|none|
|» id|integer|true|none|none|
|» name|string|true|none|none|
|» parentId|integer | null|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## comprehensiveUploadImage

<a id="opIdcomprehensiveUploadImage"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /comprehensive/upload/image \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`POST /comprehensive/upload/image`

> Example responses

> 200 Response

```json
{
  "url": "http://example.com",
  "width": 0,
  "height": 0
}
```

<h3 id="comprehensiveuploadimage-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="comprehensiveuploadimage-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|url|string(uri)|true|none|none|
|width|integer|true|none|none|
|height|integer|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ComprehensiveBearerAuth
</aside>

## compositionKeywordsPostOneOf

<a id="opIdcompositionKeywordsPostOneOf"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /compositionKeywords/one-of \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "type": "string",
    "cardNumber": "string",
    "expiry": "string"
  }' \
  src/index.ts
```

`POST /compositionKeywords/one-of`

> Body parameter

```json
{
  "type": "string",
  "cardNumber": "string",
  "expiry": "string"
}
```

<h3 id="compositionkeywordspostoneof-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CompositionKeywordsPaymentMethod](#schemacompositionkeywordspaymentmethod)|true|none|

> Example responses

> 200 Response

```json
{
  "type": "string",
  "cardNumber": "string",
  "expiry": "string"
}
```

<h3 id="compositionkeywordspostoneof-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[CompositionKeywordsPaymentMethod](#schemacompositionkeywordspaymentmethod)|

<aside class="success">
This operation does not require authentication
</aside>

## compositionKeywordsPostAnyOf

<a id="opIdcompositionKeywordsPostAnyOf"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /compositionKeywords/any-of \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "keyword": "string"
  }' \
  src/index.ts
```

`POST /compositionKeywords/any-of`

> Body parameter

```json
{
  "keyword": "string"
}
```

<h3 id="compositionkeywordspostanyof-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CompositionKeywordsSearchFilter](#schemacompositionkeywordssearchfilter)|true|none|

> Example responses

> 200 Response

```json
{
  "keyword": "string"
}
```

<h3 id="compositionkeywordspostanyof-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[CompositionKeywordsSearchFilter](#schemacompositionkeywordssearchfilter)|

<aside class="success">
This operation does not require authentication
</aside>

## compositionKeywordsPostAllOf

<a id="opIdcompositionKeywordsPostAllOf"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /compositionKeywords/all-of \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "name": "string",
    "email": "user@example.com",
    "employeeId": 0,
    "department": "string",
    "startDate": "1970-01-01"
  }' \
  src/index.ts
```

`POST /compositionKeywords/all-of`

> Body parameter

```json
{
  "name": "string",
  "email": "user@example.com",
  "employeeId": 0,
  "department": "string",
  "startDate": "1970-01-01"
}
```

<h3 id="compositionkeywordspostallof-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CompositionKeywordsEmployee](#schemacompositionkeywordsemployee)|true|none|

> Example responses

> 200 Response

```json
{
  "name": "string",
  "email": "user@example.com",
  "employeeId": 0,
  "department": "string",
  "startDate": "1970-01-01"
}
```

<h3 id="compositionkeywordspostallof-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[CompositionKeywordsEmployee](#schemacompositionkeywordsemployee)|

<aside class="success">
This operation does not require authentication
</aside>

## compositionKeywordsPostNot

<a id="opIdcompositionKeywordsPostNot"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /compositionKeywords/not \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d 'null' \
  src/index.ts
```

`POST /compositionKeywords/not`

> Body parameter

```json
null
```

<h3 id="compositionkeywordspostnot-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CompositionKeywordsNotStringValue](#schemacompositionkeywordsnotstringvalue)|true|none|

> Example responses

> 200 Response

```json
null
```

<h3 id="compositionkeywordspostnot-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[CompositionKeywordsNotStringValue](#schemacompositionkeywordsnotstringvalue)|

<aside class="success">
This operation does not require authentication
</aside>

## compositionKeywordsGetNotRef

<a id="opIdcompositionKeywordsGetNotRef"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /compositionKeywords/not-ref \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /compositionKeywords/not-ref`

> Example responses

> 200 Response

```json
null
```

<h3 id="compositionkeywordsgetnotref-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[CompositionKeywordsNotAdmin](#schemacompositionkeywordsnotadmin)|

<aside class="success">
This operation does not require authentication
</aside>

## compositionKeywordsGetNotEnum

<a id="opIdcompositionKeywordsGetNotEnum"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /compositionKeywords/not-enum \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /compositionKeywords/not-enum`

> Example responses

> 200 Response

```json
null
```

<h3 id="compositionkeywordsgetnotenum-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[CompositionKeywordsNotDraftOrArchived](#schemacompositionkeywordsnotdraftorarchived)|

<aside class="success">
This operation does not require authentication
</aside>

## compositionKeywordsGetNotConst

<a id="opIdcompositionKeywordsGetNotConst"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /compositionKeywords/not-const \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /compositionKeywords/not-const`

> Example responses

> 200 Response

```json
null
```

<h3 id="compositionkeywordsgetnotconst-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[CompositionKeywordsNotSpecificValue](#schemacompositionkeywordsnotspecificvalue)|

<aside class="success">
This operation does not require authentication
</aside>

## compositionKeywordsGetNotComposition

<a id="opIdcompositionKeywordsGetNotComposition"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /compositionKeywords/not-composition \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /compositionKeywords/not-composition`

> Example responses

> 200 Response

```json
null
```

<h3 id="compositionkeywordsgetnotcomposition-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[CompositionKeywordsNotStringOrNumber](#schemacompositionkeywordsnotstringornumber)|

<aside class="success">
This operation does not require authentication
</aside>

## compositionKeywordsGetAllOfSibling

<a id="opIdcompositionKeywordsGetAllOfSibling"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /compositionKeywords/all-of-sibling \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /compositionKeywords/all-of-sibling`

> Example responses

> 200 Response

```json
{
  "id": 0,
  "createdAt": "1970-01-01T00:00:00Z"
}
```

<h3 id="compositionkeywordsgetallofsibling-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[CompositionKeywordsExtendedWithSibling](#schemacompositionkeywordsextendedwithsibling)|

<aside class="success">
This operation does not require authentication
</aside>

## compositionKeywordsGetNullableOneOf

<a id="opIdcompositionKeywordsGetNullableOneOf"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /compositionKeywords/nullable-one-of \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /compositionKeywords/nullable-one-of`

> Example responses

> 200 Response

```json
{
  "type": "string",
  "cardNumber": "string",
  "expiry": "string"
}
```

<h3 id="compositionkeywordsgetnullableoneof-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[CompositionKeywordsNullablePayment](#schemacompositionkeywordsnullablepayment)|

<aside class="success">
This operation does not require authentication
</aside>

## compositionKeywordsGetAnyOfThree

<a id="opIdcompositionKeywordsGetAnyOfThree"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /compositionKeywords/any-of-three \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /compositionKeywords/any-of-three`

> Example responses

> 200 Response

```json
"string"
```

<h3 id="compositionkeywordsgetanyofthree-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[CompositionKeywordsFlexibleId](#schemacompositionkeywordsflexibleid)|

<aside class="success">
This operation does not require authentication
</aside>

## compositionKeywordsGetAnyOfRef

<a id="opIdcompositionKeywordsGetAnyOfRef"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /compositionKeywords/any-of-ref \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /compositionKeywords/any-of-ref`

> Example responses

> 200 Response

```json
{
  "name": "string",
  "purring": true
}
```

<h3 id="compositionkeywordsgetanyofref-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[CompositionKeywordsPetChoice](#schemacompositionkeywordspetchoice)|

<aside class="success">
This operation does not require authentication
</aside>

## Create an order with callback

<a id="opIdcallbacksFieldCreateOrder"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /callbacksField/orders \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "item": "string",
    "quantity": 0,
    "callbackUrl": "http://example.com"
  }' \
  src/index.ts
```

`POST /callbacksField/orders`

> Body parameter

```json
{
  "item": "string",
  "quantity": 0,
  "callbackUrl": "http://example.com"
}
```

<h3 id="create-an-order-with-callback-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CallbacksFieldOrderRequest](#schemacallbacksfieldorderrequest)|true|none|
|» item|body|string|true|none|
|» quantity|body|integer|true|none|
|» callbackUrl|body|string(uri)|true|none|

> Example responses

> 201 Response

```json
{
  "id": "string",
  "item": "string",
  "quantity": 0,
  "status": "string"
}
```

<h3 id="create-an-order-with-callback-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Order created|[CallbacksFieldOrder](#schemacallbacksfieldorder)|

<aside class="success">
This operation does not require authentication
</aside>

## Create a payment with multiple callbacks

<a id="opIdcallbacksFieldCreatePayment"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /callbacksField/payments \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "amount": 0,
    "currency": "string",
    "successUrl": "http://example.com",
    "failureUrl": "http://example.com"
  }' \
  src/index.ts
```

`POST /callbacksField/payments`

> Body parameter

```json
{
  "amount": 0,
  "currency": "string",
  "successUrl": "http://example.com",
  "failureUrl": "http://example.com"
}
```

<h3 id="create-a-payment-with-multiple-callbacks-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CallbacksFieldPaymentRequest](#schemacallbacksfieldpaymentrequest)|true|none|
|» amount|body|number|true|none|
|» currency|body|string|true|none|
|» successUrl|body|string(uri)|true|none|
|» failureUrl|body|string(uri)|true|none|

> Example responses

> 201 Response

```json
{
  "id": "string",
  "amount": 0,
  "currency": "string",
  "status": "string"
}
```

<h3 id="create-a-payment-with-multiple-callbacks-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Payment created|[CallbacksFieldPayment](#schemacallbacksfieldpayment)|

<aside class="success">
This operation does not require authentication
</aside>

## List items (no callbacks)

<a id="opIdcallbacksFieldListItems"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /callbacksField/items \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /callbacksField/items`

> Example responses

> 200 Response

```json
[
  {
    "id": "string",
    "name": "string"
  }
]
```

<h3 id="list-items-no-callbacks-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="list-items-no-callbacks-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[object]|false|none|none|
|» id|string|true|none|none|
|» name|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## arrayObjectConstraintsGetTags

<a id="opIdarrayObjectConstraintsGetTags"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /arrayObjectConstraints/tags \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /arrayObjectConstraints/tags`

> Example responses

> 200 Response

```json
{
  "tags": [
    "string"
  ],
  "ids": [
    0
  ],
  "labels": [
    "string"
  ]
}
```

<h3 id="arrayobjectconstraintsgettags-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="arrayobjectconstraintsgettags-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tags|[string]|true|none|none|
|ids|[integer]|true|none|none|
|labels|[string]|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## arrayObjectConstraintsCreateTag

<a id="opIdarrayObjectConstraintsCreateTag"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /arrayObjectConstraints/tags \
  -H 'Content-Type: application/json' \
  -d '{
    "metadata": {
      "key": "string",
      "value": "string"
    },
    "config": {
      "name": "string"
    },
    "limited": {
      "a": "string",
      "b": "string"
    }
  }' \
  src/index.ts
```

`POST /arrayObjectConstraints/tags`

> Body parameter

```json
{
  "metadata": {
    "key": "string",
    "value": "string"
  },
  "config": {
    "name": "string"
  },
  "limited": {
    "a": "string",
    "b": "string"
  }
}
```

<h3 id="arrayobjectconstraintscreatetag-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» metadata|body|object|true|none|
|» »  key|body|string|false|none|
|» »  value|body|string|false|none|
|» config|body|object|false|none|
|» »  name|body|string|false|none|
|» limited|body|object|false|none|
|» »  a|body|string|false|none|
|» »  b|body|string|false|none|

<h3 id="arrayobjectconstraintscreatetag-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|None|

<aside class="success">
This operation does not require authentication
</aside>

## arrayObjectConstraintsGetSettings

<a id="opIdarrayObjectConstraintsGetSettings"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /arrayObjectConstraints/settings \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /arrayObjectConstraints/settings`

<h3 id="arrayobjectconstraintsgetsettings-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|filter|query|string|false|none|

> Example responses

> 200 Response

```json
null
```

<h3 id="arrayobjectconstraintsgetsettings-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<aside class="success">
This operation does not require authentication
</aside>

## arrayObjectConstraintsUpdateSettings

<a id="opIdarrayObjectConstraintsUpdateSettings"></a>

> Code samples

```bash
hono request \
  -X PUT \
  -P /arrayObjectConstraints/settings \
  -H 'Content-Type: application/json' \
  -d '{
    "avatar": "string"
  }' \
  src/index.ts
```

`PUT /arrayObjectConstraints/settings`

> Body parameter

```json
{
  "avatar": "string"
}
```

<h3 id="arrayobjectconstraintsupdatesettings-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» avatar|body|string|true|none|

<h3 id="arrayobjectconstraintsupdatesettings-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## arrayObjectConstraintsCreateConfig

<a id="opIdarrayObjectConstraintsCreateConfig"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /arrayObjectConstraints/config \
  -H 'Content-Type: application/json' \
  -d '{
    "data": null,
    "headers": null,
    "keys": null
  }' \
  src/index.ts
```

`POST /arrayObjectConstraints/config`

> Body parameter

```json
{
  "data": null,
  "headers": null,
  "keys": null
}
```

<h3 id="arrayobjectconstraintscreateconfig-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» data|body|object|true|none|
|» headers|body|object|false|none|
|» keys|body|object|false|none|

<h3 id="arrayobjectconstraintscreateconfig-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|None|

<aside class="success">
This operation does not require authentication
</aside>

## arrayObjectConstraintsCreatePayment

<a id="opIdarrayObjectConstraintsCreatePayment"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /arrayObjectConstraints/payment \
  -H 'Content-Type: application/json' \
  -d '{
    "creditCard": "string",
    "billingAddress": "string",
    "email": "string"
  }' \
  src/index.ts
```

`POST /arrayObjectConstraints/payment`

> Body parameter

```json
{
  "creditCard": "string",
  "billingAddress": "string",
  "email": "string"
}
```

<h3 id="arrayobjectconstraintscreatepayment-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» creditCard|body|string|false|none|
|» billingAddress|body|string|false|none|
|» email|body|string|false|none|

<h3 id="arrayobjectconstraintscreatepayment-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|None|

<aside class="success">
This operation does not require authentication
</aside>

## Reverse Chiban (trailing slash)

<a id="opIdtrailingSlashGetApiReverseChibanIndex"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /trailingSlash/api/reverseChiban/ \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /trailingSlash/api/reverseChiban/`

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

<a id="opIdtrailingSlashGetApiReverseChiban"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /trailingSlash/api/reverseChiban \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /trailingSlash/api/reverseChiban`

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

<a id="opIdtrailingSlashGetPostsIndex"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /trailingSlash/posts/ \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /trailingSlash/posts/`

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

<a id="opIdtrailingSlashPostPostsIndex"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /trailingSlash/posts/ \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "title": "string"
  }' \
  src/index.ts
```

`POST /trailingSlash/posts/`

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

<a id="opIdtrailingSlashGetUsersIdIndex"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /trailingSlash/users/{id}/ \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /trailingSlash/users/{id}/`

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

<a id="opIdtrailingSlashGetItemsIndex"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /trailingSlash/items/ \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /trailingSlash/items/`

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

## List users

<a id="opIdreadonlyRefListUsers"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /readonlyRef/users \
  src/index.ts
```

`GET /readonlyRef/users`

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
|users|[[ReadonlyRefUser](#schemareadonlyrefuser)]|true|none|none|
|» id|string|true|none|none|
|» name|string|true|none|none|
|» email|string(email)|true|none|none|
|total|integer|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Create user

<a id="opIdreadonlyRefCreateUser"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /readonlyRef/users \
  -H 'Accept: application/json' \
  src/index.ts
```

`POST /readonlyRef/users`

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
|201|Created|Created|[ReadonlyRefUser](#schemareadonlyrefuser)|
|400|Bad Request|Bad request|[ReadonlyRefErrorBody](#schemareadonlyreferrorbody)|

<aside class="success">
This operation does not require authentication
</aside>

## Get user by ID

<a id="opIdreadonlyRefGetUser"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /readonlyRef/users/{id} \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /readonlyRef/users/{id}`

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
|200|OK|OK|[ReadonlyRefUser](#schemareadonlyrefuser)|
|404|Not Found|Not found|[ReadonlyRefErrorBody](#schemareadonlyreferrorbody)|

<aside class="success">
This operation does not require authentication
</aside>

## Update user

<a id="opIdreadonlyRefUpdateUser"></a>

> Code samples

```bash
hono request \
  -X PUT \
  -P /readonlyRef/users/{id} \
  -H 'Accept: application/json' \
  src/index.ts
```

`PUT /readonlyRef/users/{id}`

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
|200|OK|OK|[ReadonlyRefUser](#schemareadonlyrefuser)|

<aside class="success">
This operation does not require authentication
</aside>

## List items (uses $ref response alias)

<a id="opIdreadonlyRefListItems"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /readonlyRef/items \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /readonlyRef/items`

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
|500|Internal Server Error|Server error|[ReadonlyRefErrorBody](#schemareadonlyreferrorbody)|

<h3 id="list-items-uses-ref-response-alias-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[ReadonlyRefItem](#schemareadonlyrefitem)]|false|none|none|
|» id|integer|true|none|none|
|» title|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Reverse geocode lookup

<a id="opIdtrailingSlashRealGetApiReverseGeocodeIndex"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /trailingSlashReal/api/reverseGeocode/ \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /trailingSlashReal/api/reverseGeocode/`

<h3 id="reverse-geocode-lookup-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|callback|query|string|false|Callback function name for JSONP|
|search_type|query|string|false|Search type|
|lat|query|number(double)|false|Latitude|
|lon|query|number(double)|false|Longitude|
|polygon|query|string|false|Polygon coordinates|
|radius|query|integer|false|Search radius in meters|
|include_shape|query|boolean|false|Include shape data|
|include_count|query|boolean|false|Include total count|
|limit|query|integer|false|Number of results|
|offset|query|integer|false|Result offset|

#### Enumerated Values

|Parameter|Value|
|---|---|
|search_type|0|
|search_type|1|
|search_type|2|

> Example responses

> 200 Response

```json
{
  "status": "success",
  "results": [
    {
      "region": "string",
      "city": "string",
      "code": "string",
      "lat": "string",
      "lon": "string"
    }
  ]
}
```

<h3 id="reverse-geocode-lookup-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Successful response|Inline|

<h3 id="reverse-geocode-lookup-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|string|true|none|none|
|results|[object]|true|none|none|
|» region|string|true|none|none|
|» city|string|true|none|none|
|» code|string|true|none|none|
|» lat|string|true|none|none|
|» lon|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## defaultResponseCreateItem

<a id="opIddefaultResponseCreateItem"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /defaultResponse/items \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "id": "string",
    "name": "string"
  }' \
  src/index.ts
```

`POST /defaultResponse/items`

> Body parameter

```json
{
  "id": "string",
  "name": "string"
}
```

<h3 id="defaultresponsecreateitem-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[DefaultResponseItem](#schemadefaultresponseitem)|true|none|
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

<h3 id="defaultresponsecreateitem-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|default|default|successful operation|[DefaultResponseItem](#schemadefaultresponseitem)|

<aside class="success">
This operation does not require authentication
</aside>

## defaultResponsePing

<a id="opIddefaultResponsePing"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /defaultResponse/ping \
  src/index.ts
```

`GET /defaultResponse/ping`

<h3 id="defaultresponseping-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|2XX|2XX|ok|None|

<aside class="success">
This operation does not require authentication
</aside>

## complexSchemasEvaluateExpression

<a id="opIdcomplexSchemasEvaluateExpression"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /complexSchemas/expressions \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "type": "string",
    "value": "string"
  }' \
  src/index.ts
```

`POST /complexSchemas/expressions`

Circular reference with oneOf (expression tree)

> Body parameter

```json
{
  "type": "string",
  "value": "string"
}
```

<h3 id="complexschemasevaluateexpression-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ComplexSchemasExpression](#schemacomplexschemasexpression)|true|none|

> Example responses

> 200 Response

```json
{
  "type": "string",
  "value": "string"
}
```

<h3 id="complexschemasevaluateexpression-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Evaluation result|[ComplexSchemasExpression](#schemacomplexschemasexpression)|

<aside class="success">
This operation does not require authentication
</aside>

## complexSchemasCreateShape

<a id="opIdcomplexSchemasCreateShape"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /complexSchemas/shapes \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "kind": "string",
    "radius": 0
  }' \
  src/index.ts
```

`POST /complexSchemas/shapes`

5-variant discriminated union

> Body parameter

```json
{
  "kind": "string",
  "radius": 0
}
```

<h3 id="complexschemascreateshape-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ComplexSchemasShape](#schemacomplexschemasshape)|true|none|

> Example responses

> 200 Response

```json
{
  "kind": "string",
  "radius": 0
}
```

<h3 id="complexschemascreateshape-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Created shape|[ComplexSchemasShape](#schemacomplexschemasshape)|

<aside class="success">
This operation does not require authentication
</aside>

## complexSchemasCreateDocument

<a id="opIdcomplexSchemasCreateDocument"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /complexSchemas/documents \
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

`POST /complexSchemas/documents`

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

<h3 id="complexschemascreatedocument-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ComplexSchemasDocument](#schemacomplexschemasdocument)|true|none|

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

<h3 id="complexschemascreatedocument-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Created document|[ComplexSchemasDocument](#schemacomplexschemasdocument)|

<aside class="success">
This operation does not require authentication
</aside>

## complexSchemasCreateConfig

<a id="opIdcomplexSchemasCreateConfig"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /complexSchemas/configs \
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

`POST /complexSchemas/configs`

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

<h3 id="complexschemascreateconfig-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ComplexSchemasFullConfig](#schemacomplexschemasfullconfig)|true|none|

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

<h3 id="complexschemascreateconfig-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Created config|[ComplexSchemasFullConfig](#schemacomplexschemasfullconfig)|

<aside class="success">
This operation does not require authentication
</aside>

## complexSchemasGetNullableUnion

<a id="opIdcomplexSchemasGetNullableUnion"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /complexSchemas/nullable-union \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /complexSchemas/nullable-union`

Nullable anyOf with mixed types

> Example responses

> 200 Response

```json
{
  "status": "string",
  "data": null
}
```

<h3 id="complexschemasgetnullableunion-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[ComplexSchemasNullableResult](#schemacomplexschemasnullableresult)|

<aside class="success">
This operation does not require authentication
</aside>

## complexSchemasGetNestedCircular

<a id="opIdcomplexSchemasGetNestedCircular"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /complexSchemas/nested-circular \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /complexSchemas/nested-circular`

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

<h3 id="complexschemasgetnestedcircular-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[ComplexSchemasCategory](#schemacomplexschemascategory)|

<aside class="success">
This operation does not require authentication
</aside>

## vendorExtensionsCreateUser

<a id="opIdvendorExtensionsCreateUser"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /vendorExtensions/users \
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

`POST /vendorExtensions/users`

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

<h3 id="vendorextensionscreateuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[VendorExtensionsCreateUser](#schemavendorextensionscreateuser)|true|none|
|» email|body|[VendorExtensionsEmail](#schemavendorextensionsemail)|true|none|
|» username|body|[VendorExtensionsUsername](#schemavendorextensionsusername)|true|none|
|» price|body|[VendorExtensionsPrice](#schemavendorextensionsprice)|true|none|
|» tags|body|[VendorExtensionsTags](#schemavendorextensionstags)|false|none|

> Example responses

> 201 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "email": "user@example.com",
  "username": "string"
}
```

<h3 id="vendorextensionscreateuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[VendorExtensionsUser](#schemavendorextensionsuser)|

<aside class="success">
This operation does not require authentication
</aside>

## vendorExtensionsGetUser

<a id="opIdvendorExtensionsGetUser"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /vendorExtensions/users/{userId} \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /vendorExtensions/users/{userId}`

<h3 id="vendorextensionsgetuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|[VendorExtensionsUserId](#schemavendorextensionsuserid)|true|none|

> Example responses

> 200 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "email": "user@example.com",
  "username": "string"
}
```

<h3 id="vendorextensionsgetuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[VendorExtensionsUser](#schemavendorextensionsuser)|

<aside class="success">
This operation does not require authentication
</aside>

## vendorExtensionsCreatePost

<a id="opIdvendorExtensionsCreatePost"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /vendorExtensions/posts \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "authorId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "title": "string",
    "quantity": 0
  }' \
  src/index.ts
```

`POST /vendorExtensions/posts`

> Body parameter

```json
{
  "authorId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "title": "string",
  "quantity": 0
}
```

<h3 id="vendorextensionscreatepost-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[VendorExtensionsCreatePost](#schemavendorextensionscreatepost)|true|none|
|» authorId|body|[VendorExtensionsUserId](#schemavendorextensionsuserid)|true|none|
|» title|body|string|true|none|
|» quantity|body|[VendorExtensionsQuantity](#schemavendorextensionsquantity)|true|none|

> Example responses

> 201 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "authorId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "title": "string"
}
```

<h3 id="vendorextensionscreatepost-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[VendorExtensionsPost](#schemavendorextensionspost)|

<aside class="success">
This operation does not require authentication
</aside>

## vendorExtensionsPostTransforms

<a id="opIdvendorExtensionsPostTransforms"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /vendorExtensions/transforms \
  -H 'Content-Type: application/json' \
  -d '{
    "trimmed": "string",
    "lowered": "string",
    "uppered": "string",
    "normalized": "string",
    "lowercased": "string",
    "uppercased": "string",
    "startsWithHttps": "string",
    "endsWithTest": "string",
    "includesSlug": "string",
    "emailNormalized": "user@example.com",
    "allChained": "string"
  }' \
  src/index.ts
```

`POST /vendorExtensions/transforms`

> Body parameter

```json
{
  "trimmed": "string",
  "lowered": "string",
  "uppered": "string",
  "normalized": "string",
  "lowercased": "string",
  "uppercased": "string",
  "startsWithHttps": "string",
  "endsWithTest": "string",
  "includesSlug": "string",
  "emailNormalized": "user@example.com",
  "allChained": "string"
}
```

<h3 id="vendorextensionsposttransforms-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[VendorExtensionsTransformForm](#schemavendorextensionstransformform)|true|none|
|» trimmed|body|string|true|none|
|» lowered|body|string|true|none|
|» uppered|body|string|true|none|
|» normalized|body|string|true|none|
|» lowercased|body|string|true|none|
|» uppercased|body|string|true|none|
|» startsWithHttps|body|string|true|none|
|» endsWithTest|body|string|true|none|
|» includesSlug|body|string|true|none|
|» emailNormalized|body|string(email)|true|none|
|» allChained|body|string|true|none|

<h3 id="vendorextensionsposttransforms-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## vendorExtensionsPostCoerce

<a id="opIdvendorExtensionsPostCoerce"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /vendorExtensions/coerce \
  -H 'Content-Type: application/json' \
  -d '{
    "asString": "string",
    "asDate": "1970-01-01T00:00:00Z",
    "asNumber": 0,
    "asInt": 0,
    "asBool": true
  }' \
  src/index.ts
```

`POST /vendorExtensions/coerce`

> Body parameter

```json
{
  "asString": "string",
  "asDate": "1970-01-01T00:00:00Z",
  "asNumber": 0,
  "asInt": 0,
  "asBool": true
}
```

<h3 id="vendorextensionspostcoerce-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[VendorExtensionsCoerceForm](#schemavendorextensionscoerceform)|true|none|
|» asString|body|string|true|none|
|» asDate|body|string(date-time)|true|none|
|» asNumber|body|number|true|none|
|» asInt|body|integer|true|none|
|» asBool|body|boolean|true|none|

<h3 id="vendorextensionspostcoerce-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## vendorExtensionsPostReplacements

<a id="opIdvendorExtensionsPostReplacements"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /vendorExtensions/replacements \
  -H 'Content-Type: application/json' \
  -d '{
    "codecDate": "1970-01-01T00:00:00Z",
    "transformed": "string",
    "piped": "string",
    "preprocessed": "string",
    "asStringBool": true,
    "asStringBoolCustom": true
  }' \
  src/index.ts
```

`POST /vendorExtensions/replacements`

> Body parameter

```json
{
  "codecDate": "1970-01-01T00:00:00Z",
  "transformed": "string",
  "piped": "string",
  "preprocessed": "string",
  "asStringBool": true,
  "asStringBoolCustom": true
}
```

<h3 id="vendorextensionspostreplacements-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[VendorExtensionsReplacementForm](#schemavendorextensionsreplacementform)|true|none|
|» codecDate|body|string(date-time)|true|none|
|» transformed|body|string|true|none|
|» piped|body|string|true|none|
|» preprocessed|body|string|true|none|
|» asStringBool|body|boolean|true|none|
|» asStringBoolCustom|body|boolean|true|none|

<h3 id="vendorextensionspostreplacements-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## vendorExtensionsPostFormats

<a id="opIdvendorExtensionsPostFormats"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /vendorExtensions/formats \
  -H 'Content-Type: application/json' \
  -d '{
    "emailHtml5": "user@example.com",
    "customEmail": "user@example.com",
    "uuidV8": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "httpsUrl": "http://example.com",
    "hostScopedUrl": "http://example.com",
    "preciseDatetime": "1970-01-01T00:00:00Z",
    "localDatetime": "1970-01-01T00:00:00Z",
    "colonMac": "string",
    "dotMac": "string",
    "hs256Jwt": "string",
    "sha256Hash": "string"
  }' \
  src/index.ts
```

`POST /vendorExtensions/formats`

> Body parameter

```json
{
  "emailHtml5": "user@example.com",
  "customEmail": "user@example.com",
  "uuidV8": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "httpsUrl": "http://example.com",
  "hostScopedUrl": "http://example.com",
  "preciseDatetime": "1970-01-01T00:00:00Z",
  "localDatetime": "1970-01-01T00:00:00Z",
  "colonMac": "string",
  "dotMac": "string",
  "hs256Jwt": "string",
  "sha256Hash": "string"
}
```

<h3 id="vendorextensionspostformats-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[VendorExtensionsFormatOptions](#schemavendorextensionsformatoptions)|true|none|
|» emailHtml5|body|string(email)|true|none|
|» customEmail|body|string(email)|true|none|
|» uuidV8|body|string(uuid)|true|none|
|» httpsUrl|body|string(uri)|true|none|
|» hostScopedUrl|body|string(uri)|true|none|
|» preciseDatetime|body|string(date-time)|true|none|
|» localDatetime|body|string(date-time)|true|none|
|» colonMac|body|string(mac)|true|none|
|» dotMac|body|string(mac)|true|none|
|» hs256Jwt|body|string(jwt)|true|none|
|» sha256Hash|body|string(hash)|true|none|

<h3 id="vendorextensionspostformats-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## vendorExtensionsPostCustom

<a id="opIdvendorExtensionsPostCustom"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /vendorExtensions/custom \
  -H 'Content-Type: application/json' \
  -d '{
    "password": "string",
    "normalizedEmail": "user@example.com",
    "config": {
      "name": "string"
    },
    "greeting": "string",
    "retries": 0
  }' \
  src/index.ts
```

`POST /vendorExtensions/custom`

> Body parameter

```json
{
  "password": "string",
  "normalizedEmail": "user@example.com",
  "config": {
    "name": "string"
  },
  "greeting": "string",
  "retries": 0
}
```

<h3 id="vendorextensionspostcustom-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[VendorExtensionsCustomForm](#schemavendorextensionscustomform)|true|none|
|» password|body|string|true|none|
|» normalizedEmail|body|string(email)|true|none|
|» config|body|object|true|none|
|» »  name|body|string|false|none|
|» greeting|body|string|true|none|
|» retries|body|integer|true|none|

<h3 id="vendorextensionspostcustom-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## vendorExtensionsPostMessages

<a id="opIdvendorExtensionsPostMessages"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /vendorExtensions/messages \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "string",
    "code": "string",
    "slug": "string",
    "age": 0,
    "score": 0,
    "count": 0,
    "active": true,
    "tags": [
      "string"
    ],
    "pin": [
      0
    ],
    "role": "admin",
    "priority": 1,
    "color": "string",
    "kind": "string",
    "uniqueTags": [
      "string"
    ],
    "namespaced": {
      "a": "string",
      "b": "string",
      "c": "string"
    },
    "prefixed": null,
    "payload": "string",
    "token": "string",
    "tokenLabel": "string"
  }' \
  src/index.ts
```

`POST /vendorExtensions/messages`

> Body parameter

```json
{
  "username": "string",
  "code": "string",
  "slug": "string",
  "age": 0,
  "score": 0,
  "count": 0,
  "active": true,
  "tags": [
    "string"
  ],
  "pin": [
    0
  ],
  "role": "admin",
  "priority": 1,
  "color": "string",
  "kind": "string",
  "uniqueTags": [
    "string"
  ],
  "namespaced": {
    "a": "string",
    "b": "string",
    "c": "string"
  },
  "prefixed": null,
  "payload": "string",
  "token": "string",
  "tokenLabel": "string"
}
```

<h3 id="vendorextensionspostmessages-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[VendorExtensionsMessageForm](#schemavendorextensionsmessageform)|true|none|
|» username|body|string|true|none|
|» code|body|string|true|none|
|» slug|body|string|true|none|
|» age|body|integer|true|none|
|» score|body|number|true|none|
|» count|body|integer|true|none|
|» active|body|boolean|true|none|
|» tags|body|[string]|true|none|
|» pin|body|[integer]|true|none|
|» role|body|string|true|none|
|» priority|body|integer|true|none|
|» color|body|string|true|none|
|» kind|body|string|true|none|
|» uniqueTags|body|[string]|true|none|
|» namespaced|body|object|true|none|
|» »  a|body|string|false|none|
|» »  b|body|string|false|none|
|» »  c|body|string|false|none|
|» prefixed|body|object|true|none|
|» payload|body|string|true|none|
|» token|body|string|false|none|
|» tokenLabel|body|string|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|» role|admin|
|» role|editor|
|» role|viewer|
|» priority|1|
|» priority|2|
|» priority|3|

<h3 id="vendorextensionspostmessages-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## vendorExtensionsPostComposition

<a id="opIdvendorExtensionsPostComposition"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /vendorExtensions/composition \
  -H 'Content-Type: application/json' \
  -d '{
    "anyValue": "string",
    "oneValue": "string",
    "notString": null,
    "merged": {
      "name": "string",
      "age": 0
    },
    "propertyNames": null
  }' \
  src/index.ts
```

`POST /vendorExtensions/composition`

> Body parameter

```json
{
  "anyValue": "string",
  "oneValue": "string",
  "notString": null,
  "merged": {
    "name": "string",
    "age": 0
  },
  "propertyNames": null
}
```

<h3 id="vendorextensionspostcomposition-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[VendorExtensionsComposition](#schemavendorextensionscomposition)|true|none|
|» anyValue|body|object|true|none|
|» oneValue|body|object|false|none|
|» notString|body|object|false|none|
|» merged|body|object|false|none|
|» propertyNames|body|object|false|none|

<h3 id="vendorextensionspostcomposition-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## vendorExtensionsPostConditional

<a id="opIdvendorExtensionsPostConditional"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /vendorExtensions/conditional \
  -H 'Content-Type: application/json' \
  -d '{
    "kind": "premium",
    "feature": "string"
  }' \
  src/index.ts
```

`POST /vendorExtensions/conditional`

> Body parameter

```json
{
  "kind": "premium",
  "feature": "string"
}
```

<h3 id="vendorextensionspostconditional-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[VendorExtensionsConditional](#schemavendorextensionsconditional)|true|none|
|» kind|body|string|true|none|
|» feature|body|string|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|» kind|premium|
|» kind|basic|

<h3 id="vendorextensionspostconditional-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## vendorExtensionsPostApplicators

<a id="opIdvendorExtensionsPostApplicators"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /vendorExtensions/applicators \
  -H 'Content-Type: application/json' \
  -d '{
    "tuple": [
      true
    ],
    "list": [
      "string"
    ],
    "meta": null
  }' \
  src/index.ts
```

`POST /vendorExtensions/applicators`

> Body parameter

```json
{
  "tuple": [
    true
  ],
  "list": [
    "string"
  ],
  "meta": null
}
```

<h3 id="vendorextensionspostapplicators-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[VendorExtensionsApplicators](#schemavendorextensionsapplicators)|true|none|
|» tuple|body|[boolean]|true|none|
|» list|body|[string]|true|none|
|» meta|body|object|true|none|

<h3 id="vendorextensionspostapplicators-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## List items with pagination

<a id="opIdpaginationListItems"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /pagination/items \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /pagination/items`

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
|200|OK|OK|[PaginationItemsPage](#schemapaginationitemspage)|

<aside class="success">
This operation does not require authentication
</aside>

## Feed (paginated, no args)

<a id="opIdpaginationListFeeds"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /pagination/feeds \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /pagination/feeds`

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
|200|OK|OK|[PaginationItemsPage](#schemapaginationitemspage)|

<aside class="success">
This operation does not require authentication
</aside>

## User's posts (paginated, path param)

<a id="opIdpaginationListUserPosts"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /pagination/users/{userId}/posts \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /pagination/users/{userId}/posts`

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
|200|OK|OK|[PaginationItemsPage](#schemapaginationitemspage)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="all-features-consolidated-generate-fixture-v2publicbookingaccountregisteroauth">v2/public/booking/account/register/oauth</h1>

## trailingSlashRealPostApiV2PublicBookingAccountRegisterOauthIndex

<a id="opIdtrailingSlashRealPostApiV2PublicBookingAccountRegisterOauthIndex"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /trailingSlashReal/api/v2/public/booking/account/register/oauth/ \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "account": null,
    "profile": null
  }' \
  src/index.ts
```

`POST /trailingSlashReal/api/v2/public/booking/account/register/oauth/`

> Body parameter

```json
{
  "account": null,
  "profile": null
}
```

<h3 id="trailingslashrealpostapiv2publicbookingaccountregisteroauthindex-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» account|body|object|true|none|
|» profile|body|object|true|none|

> Example responses

> 200 Response

```json
{
  "message": "string",
  "provisionalId": "string"
}
```

> 404 Response

```json
{
  "message": "string",
  "provisionalId": "string"
}
```

<h3 id="trailingslashrealpostapiv2publicbookingaccountregisteroauthindex-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Default Response|Inline|
|404|Not Found|Default Response|Inline|

<h3 id="trailingslashrealpostapiv2publicbookingaccountregisteroauthindex-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|none|
|provisionalId|string|false|none|none|

<h3 id="trailingslashrealpostapiv2publicbookingaccountregisteroauthindex-responseschema">Response Schema</h3>

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|none|
|provisionalId|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="all-features-consolidated-generate-fixture-v2publicbookingaccountregisteremail">v2/public/booking/account/register/email</h1>

## Send registration URL via email

<a id="opIdtrailingSlashRealPostApiV2PublicBookingAccountRegisterEmail"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /trailingSlashReal/api/v2/public/booking/account/register/email \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "email": "user@example.com"
  }' \
  src/index.ts
```

`POST /trailingSlashReal/api/v2/public/booking/account/register/email`

> Body parameter

```json
{
  "email": "user@example.com"
}
```

<h3 id="send-registration-url-via-email-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» email|body|string(email)|true|none|

> Example responses

> 200 Response

```json
{
  "message": "string"
}
```

<h3 id="send-registration-url-via-email-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Default Response|Inline|

<h3 id="send-registration-url-via-email-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_AllExportsUser">AllExportsUser</h2>
<!-- backwards compatibility -->
<a id="schemaallexportsuser"></a>
<a id="schema_AllExportsUser"></a>
<a id="tocSallexportsuser"></a>
<a id="tocsallexportsuser"></a>

```json
{
  "id": 0,
  "name": "string",
  "email": "user@example.com"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|name|string|true|none|none|
|email|string(email)|true|none|none|

<h2 id="tocS_AllExportsUserList">AllExportsUserList</h2>
<!-- backwards compatibility -->
<a id="schemaallexportsuserlist"></a>
<a id="schema_AllExportsUserList"></a>
<a id="tocSallexportsuserlist"></a>
<a id="tocsallexportsuserlist"></a>

```json
[
  {
    "id": 0,
    "name": "string",
    "email": "user@example.com"
  }
]
```

<h2 id="tocS_CircularRefsTreeNode">CircularRefsTreeNode</h2>
<!-- backwards compatibility -->
<a id="schemacircularrefstreenode"></a>
<a id="schema_CircularRefsTreeNode"></a>
<a id="tocScircularrefstreenode"></a>
<a id="tocscircularrefstreenode"></a>

```json
{
  "id": 0,
  "value": "string",
  "children": [
    {
      "id": 0,
      "value": "string",
      "children": [
        {}
      ]
    }
  ]
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|value|string|true|none|none|
|children|[[CircularRefsTreeNode](#schemacircularrefstreenode)]|false|none|none|

<h2 id="tocS_CircularRefsNodeA">CircularRefsNodeA</h2>
<!-- backwards compatibility -->
<a id="schemacircularrefsnodea"></a>
<a id="schema_CircularRefsNodeA"></a>
<a id="tocScircularrefsnodea"></a>
<a id="tocscircularrefsnodea"></a>

```json
{
  "id": 0,
  "ref": {
    "id": 0,
    "ref": {
      "id": 0,
      "ref": {
        "id": 0,
        "ref": {}
      }
    }
  }
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|ref|[CircularRefsNodeB](#schemacircularrefsnodeb)|false|none|none|

<h2 id="tocS_CircularRefsNodeB">CircularRefsNodeB</h2>
<!-- backwards compatibility -->
<a id="schemacircularrefsnodeb"></a>
<a id="schema_CircularRefsNodeB"></a>
<a id="tocScircularrefsnodeb"></a>
<a id="tocscircularrefsnodeb"></a>

```json
{
  "id": 0,
  "ref": {
    "id": 0,
    "ref": {
      "id": 0,
      "ref": {
        "id": 0,
        "ref": {}
      }
    }
  }
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|ref|[CircularRefsNodeC](#schemacircularrefsnodec)|false|none|none|

<h2 id="tocS_CircularRefsNodeC">CircularRefsNodeC</h2>
<!-- backwards compatibility -->
<a id="schemacircularrefsnodec"></a>
<a id="schema_CircularRefsNodeC"></a>
<a id="tocScircularrefsnodec"></a>
<a id="tocscircularrefsnodec"></a>

```json
{
  "id": 0,
  "ref": {
    "id": 0,
    "ref": {
      "id": 0,
      "ref": {
        "id": 0,
        "ref": {}
      }
    }
  }
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|ref|[CircularRefsNodeA](#schemacircularrefsnodea)|false|none|none|

<h2 id="tocS_ParametersMergeItem">ParametersMergeItem</h2>
<!-- backwards compatibility -->
<a id="schemaparametersmergeitem"></a>
<a id="schema_ParametersMergeItem"></a>
<a id="tocSparametersmergeitem"></a>
<a id="tocsparametersmergeitem"></a>

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

<h2 id="tocS_ParametersMergeItemUpdate">ParametersMergeItemUpdate</h2>
<!-- backwards compatibility -->
<a id="schemaparametersmergeitemupdate"></a>
<a id="schema_ParametersMergeItemUpdate"></a>
<a id="tocSparametersmergeitemupdate"></a>
<a id="tocsparametersmergeitemupdate"></a>

```json
{
  "name": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|

<h2 id="tocS_SchemaEdgeCasesNullableFields">SchemaEdgeCasesNullableFields</h2>
<!-- backwards compatibility -->
<a id="schemaschemaedgecasesnullablefields"></a>
<a id="schema_SchemaEdgeCasesNullableFields"></a>
<a id="tocSschemaedgecasesnullablefields"></a>
<a id="tocsschemaedgecasesnullablefields"></a>

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

<h2 id="tocS_SchemaEdgeCasesCircle">SchemaEdgeCasesCircle</h2>
<!-- backwards compatibility -->
<a id="schemaschemaedgecasescircle"></a>
<a id="schema_SchemaEdgeCasesCircle"></a>
<a id="tocSschemaedgecasescircle"></a>
<a id="tocsschemaedgecasescircle"></a>

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

<h2 id="tocS_SchemaEdgeCasesRectangle">SchemaEdgeCasesRectangle</h2>
<!-- backwards compatibility -->
<a id="schemaschemaedgecasesrectangle"></a>
<a id="schema_SchemaEdgeCasesRectangle"></a>
<a id="tocSschemaedgecasesrectangle"></a>
<a id="tocsschemaedgecasesrectangle"></a>

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

<h2 id="tocS_SchemaEdgeCasesShape">SchemaEdgeCasesShape</h2>
<!-- backwards compatibility -->
<a id="schemaschemaedgecasesshape"></a>
<a id="schema_SchemaEdgeCasesShape"></a>
<a id="tocSschemaedgecasesshape"></a>
<a id="tocsschemaedgecasesshape"></a>

```json
{
  "kind": "string",
  "radius": 0
}
```

<h2 id="tocS_SchemaEdgeCasesBase">SchemaEdgeCasesBase</h2>
<!-- backwards compatibility -->
<a id="schemaschemaedgecasesbase"></a>
<a id="schema_SchemaEdgeCasesBase"></a>
<a id="tocSschemaedgecasesbase"></a>
<a id="tocsschemaedgecasesbase"></a>

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

<h2 id="tocS_SchemaEdgeCasesExtended">SchemaEdgeCasesExtended</h2>
<!-- backwards compatibility -->
<a id="schemaschemaedgecasesextended"></a>
<a id="schema_SchemaEdgeCasesExtended"></a>
<a id="tocSschemaedgecasesextended"></a>
<a id="tocsschemaedgecasesextended"></a>

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

<h2 id="tocS_SchemaEdgeCasesComposedObject">SchemaEdgeCasesComposedObject</h2>
<!-- backwards compatibility -->
<a id="schemaschemaedgecasescomposedobject"></a>
<a id="schema_SchemaEdgeCasesComposedObject"></a>
<a id="tocSschemaedgecasescomposedobject"></a>
<a id="tocsschemaedgecasescomposedobject"></a>

```json
{
  "id": 0,
  "createdAt": "1970-01-01T00:00:00Z",
  "name": "string",
  "description": "string",
  "extra": true
}
```

<h2 id="tocS_SchemaEdgeCasesLevel1">SchemaEdgeCasesLevel1</h2>
<!-- backwards compatibility -->
<a id="schemaschemaedgecaseslevel1"></a>
<a id="schema_SchemaEdgeCasesLevel1"></a>
<a id="tocSschemaedgecaseslevel1"></a>
<a id="tocsschemaedgecaseslevel1"></a>

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

<h2 id="tocS_SchemaEdgeCasesDynamicMap">SchemaEdgeCasesDynamicMap</h2>
<!-- backwards compatibility -->
<a id="schemaschemaedgecasesdynamicmap"></a>
<a id="schema_SchemaEdgeCasesDynamicMap"></a>
<a id="tocSschemaedgecasesdynamicmap"></a>
<a id="tocsschemaedgecasesdynamicmap"></a>

```json
null
```

<h2 id="tocS_SchemaEdgeCasesAnyOfExample">SchemaEdgeCasesAnyOfExample</h2>
<!-- backwards compatibility -->
<a id="schemaschemaedgecasesanyofexample"></a>
<a id="schema_SchemaEdgeCasesAnyOfExample"></a>
<a id="tocSschemaedgecasesanyofexample"></a>
<a id="tocsschemaedgecasesanyofexample"></a>

```json
"string"
```

<h2 id="tocS_CallbacksLinksSubscriptionRequest">CallbacksLinksSubscriptionRequest</h2>
<!-- backwards compatibility -->
<a id="schemacallbackslinkssubscriptionrequest"></a>
<a id="schema_CallbacksLinksSubscriptionRequest"></a>
<a id="tocScallbackslinkssubscriptionrequest"></a>
<a id="tocscallbackslinkssubscriptionrequest"></a>

```json
{
  "callbackUrl": "http://example.com",
  "events": [
    "created"
  ]
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|callbackUrl|string(uri)|true|none|none|
|events|[string]|true|none|none|

<h2 id="tocS_CallbacksLinksSubscription">CallbacksLinksSubscription</h2>
<!-- backwards compatibility -->
<a id="schemacallbackslinkssubscription"></a>
<a id="schema_CallbacksLinksSubscription"></a>
<a id="tocScallbackslinkssubscription"></a>
<a id="tocscallbackslinkssubscription"></a>

```json
{
  "id": "string",
  "callbackUrl": "http://example.com",
  "events": [
    "string"
  ],
  "status": "active"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|callbackUrl|string(uri)|true|none|none|
|events|[string]|true|none|none|
|status|string|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|active|
|status|paused|
|status|cancelled|

<h2 id="tocS_CallbacksLinksEventPayload">CallbacksLinksEventPayload</h2>
<!-- backwards compatibility -->
<a id="schemacallbackslinkseventpayload"></a>
<a id="schema_CallbacksLinksEventPayload"></a>
<a id="tocScallbackslinkseventpayload"></a>
<a id="tocscallbackslinkseventpayload"></a>

```json
{
  "event": "string",
  "timestamp": "1970-01-01T00:00:00Z",
  "data": null
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|event|string|true|none|none|
|timestamp|string(date-time)|true|none|none|
|data|object|false|none|none|

<h2 id="tocS_CrudRefsPost">CrudRefsPost</h2>
<!-- backwards compatibility -->
<a id="schemacrudrefspost"></a>
<a id="schema_CrudRefsPost"></a>
<a id="tocScrudrefspost"></a>
<a id="tocscrudrefspost"></a>

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
|author|[CrudRefsAuthor](#schemacrudrefsauthor)|true|none|none|
|tags|[[CrudRefsTag](#schemacrudrefstag)]|false|none|none|
|createdAt|string(date-time)|true|none|none|
|updatedAt|string(date-time)|true|none|none|

<h2 id="tocS_CrudRefsCreatePost">CrudRefsCreatePost</h2>
<!-- backwards compatibility -->
<a id="schemacrudrefscreatepost"></a>
<a id="schema_CrudRefsCreatePost"></a>
<a id="tocScrudrefscreatepost"></a>
<a id="tocscrudrefscreatepost"></a>

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

<h2 id="tocS_CrudRefsUpdatePost">CrudRefsUpdatePost</h2>
<!-- backwards compatibility -->
<a id="schemacrudrefsupdatepost"></a>
<a id="schema_CrudRefsUpdatePost"></a>
<a id="tocScrudrefsupdatepost"></a>
<a id="tocscrudrefsupdatepost"></a>

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

<h2 id="tocS_CrudRefsComment">CrudRefsComment</h2>
<!-- backwards compatibility -->
<a id="schemacrudrefscomment"></a>
<a id="schema_CrudRefsComment"></a>
<a id="tocScrudrefscomment"></a>
<a id="tocscrudrefscomment"></a>

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
|author|[CrudRefsAuthor](#schemacrudrefsauthor)|true|none|none|
|createdAt|string(date-time)|true|none|none|

<h2 id="tocS_CrudRefsCreateComment">CrudRefsCreateComment</h2>
<!-- backwards compatibility -->
<a id="schemacrudrefscreatecomment"></a>
<a id="schema_CrudRefsCreateComment"></a>
<a id="tocScrudrefscreatecomment"></a>
<a id="tocscrudrefscreatecomment"></a>

```json
{
  "body": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|body|string|true|none|none|

<h2 id="tocS_CrudRefsAuthor">CrudRefsAuthor</h2>
<!-- backwards compatibility -->
<a id="schemacrudrefsauthor"></a>
<a id="schema_CrudRefsAuthor"></a>
<a id="tocScrudrefsauthor"></a>
<a id="tocscrudrefsauthor"></a>

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

<h2 id="tocS_CrudRefsTag">CrudRefsTag</h2>
<!-- backwards compatibility -->
<a id="schemacrudrefstag"></a>
<a id="schema_CrudRefsTag"></a>
<a id="tocScrudrefstag"></a>
<a id="tocscrudrefstag"></a>

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

<h2 id="tocS_CrudRefsPagination">CrudRefsPagination</h2>
<!-- backwards compatibility -->
<a id="schemacrudrefspagination"></a>
<a id="schema_CrudRefsPagination"></a>
<a id="tocScrudrefspagination"></a>
<a id="tocscrudrefspagination"></a>

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

<h2 id="tocS_CrudRefsError">CrudRefsError</h2>
<!-- backwards compatibility -->
<a id="schemacrudrefserror"></a>
<a id="schema_CrudRefsError"></a>
<a id="tocScrudrefserror"></a>
<a id="tocscrudrefserror"></a>

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

<h2 id="tocS_ComprehensiveUser">ComprehensiveUser</h2>
<!-- backwards compatibility -->
<a id="schemacomprehensiveuser"></a>
<a id="schema_ComprehensiveUser"></a>
<a id="tocScomprehensiveuser"></a>
<a id="tocscomprehensiveuser"></a>

```json
{
  "id": 0,
  "name": "string",
  "email": "user@example.com",
  "role": "admin",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "country": "string"
  },
  "createdAt": "1970-01-01T00:00:00Z"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|name|string|true|none|none|
|email|string(email)|true|none|none|
|role|string|true|none|none|
|address|[ComprehensiveAddress](#schemacomprehensiveaddress)|false|none|none|
|createdAt|string(date-time)|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|role|admin|
|role|customer|

<h2 id="tocS_ComprehensiveCreateUser">ComprehensiveCreateUser</h2>
<!-- backwards compatibility -->
<a id="schemacomprehensivecreateuser"></a>
<a id="schema_ComprehensiveCreateUser"></a>
<a id="tocScomprehensivecreateuser"></a>
<a id="tocscomprehensivecreateuser"></a>

```json
{
  "name": "string",
  "email": "user@example.com",
  "password": "string",
  "role": "admin",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "country": "string"
  }
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|email|string(email)|true|none|none|
|password|string|true|none|none|
|role|string|false|none|none|
|address|[ComprehensiveAddress](#schemacomprehensiveaddress)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|role|admin|
|role|customer|

<h2 id="tocS_ComprehensiveUpdateUser">ComprehensiveUpdateUser</h2>
<!-- backwards compatibility -->
<a id="schemacomprehensiveupdateuser"></a>
<a id="schema_ComprehensiveUpdateUser"></a>
<a id="tocScomprehensiveupdateuser"></a>
<a id="tocscomprehensiveupdateuser"></a>

```json
{
  "name": "string",
  "email": "user@example.com",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "country": "string"
  }
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
|email|string(email)|false|none|none|
|address|[ComprehensiveAddress](#schemacomprehensiveaddress)|false|none|none|

<h2 id="tocS_ComprehensiveAddress">ComprehensiveAddress</h2>
<!-- backwards compatibility -->
<a id="schemacomprehensiveaddress"></a>
<a id="schema_ComprehensiveAddress"></a>
<a id="tocScomprehensiveaddress"></a>
<a id="tocscomprehensiveaddress"></a>

```json
{
  "street": "string",
  "city": "string",
  "state": "string",
  "zip": "string",
  "country": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|street|string|true|none|none|
|city|string|true|none|none|
|state|string|false|none|none|
|zip|string|false|none|none|
|country|string|true|none|none|

<h2 id="tocS_ComprehensiveProduct">ComprehensiveProduct</h2>
<!-- backwards compatibility -->
<a id="schemacomprehensiveproduct"></a>
<a id="schema_ComprehensiveProduct"></a>
<a id="tocScomprehensiveproduct"></a>
<a id="tocscomprehensiveproduct"></a>

```json
{
  "id": 0,
  "name": "string",
  "description": "string",
  "price": 0,
  "category": {
    "id": 0,
    "name": "string",
    "parentId": null
  },
  "tags": [
    "string"
  ],
  "inStock": true,
  "createdAt": "1970-01-01T00:00:00Z"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|name|string|true|none|none|
|description|string|false|none|none|
|price|number|true|none|none|
|category|[ComprehensiveCategory](#schemacomprehensivecategory)|true|none|none|
|tags|[string]|false|none|none|
|inStock|boolean|true|none|none|
|createdAt|string(date-time)|true|none|none|

<h2 id="tocS_ComprehensiveCreateProduct">ComprehensiveCreateProduct</h2>
<!-- backwards compatibility -->
<a id="schemacomprehensivecreateproduct"></a>
<a id="schema_ComprehensiveCreateProduct"></a>
<a id="tocScomprehensivecreateproduct"></a>
<a id="tocscomprehensivecreateproduct"></a>

```json
{
  "name": "string",
  "description": "string",
  "price": 0,
  "categoryId": 0,
  "tags": [
    "string"
  ]
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|description|string|false|none|none|
|price|number|true|none|none|
|categoryId|integer|true|none|none|
|tags|[string]|false|none|none|

<h2 id="tocS_ComprehensiveUpdateProduct">ComprehensiveUpdateProduct</h2>
<!-- backwards compatibility -->
<a id="schemacomprehensiveupdateproduct"></a>
<a id="schema_ComprehensiveUpdateProduct"></a>
<a id="tocScomprehensiveupdateproduct"></a>
<a id="tocscomprehensiveupdateproduct"></a>

```json
{
  "name": "string",
  "description": "string",
  "price": 0,
  "categoryId": 0,
  "tags": [
    "string"
  ]
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
|description|string|false|none|none|
|price|number|false|none|none|
|categoryId|integer|false|none|none|
|tags|[string]|false|none|none|

<h2 id="tocS_ComprehensiveCategory">ComprehensiveCategory</h2>
<!-- backwards compatibility -->
<a id="schemacomprehensivecategory"></a>
<a id="schema_ComprehensiveCategory"></a>
<a id="tocScomprehensivecategory"></a>
<a id="tocscomprehensivecategory"></a>

```json
{
  "id": 0,
  "name": "string",
  "parentId": null
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|name|string|true|none|none|
|parentId|integer | null|false|none|none|

<h2 id="tocS_ComprehensiveReview">ComprehensiveReview</h2>
<!-- backwards compatibility -->
<a id="schemacomprehensivereview"></a>
<a id="schema_ComprehensiveReview"></a>
<a id="tocScomprehensivereview"></a>
<a id="tocscomprehensivereview"></a>

```json
{
  "id": 0,
  "rating": 1,
  "comment": "string",
  "author": {
    "id": 0,
    "name": "string",
    "email": "user@example.com",
    "role": "admin",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zip": "string",
      "country": "string"
    },
    "createdAt": "1970-01-01T00:00:00Z"
  },
  "createdAt": "1970-01-01T00:00:00Z"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|rating|integer|true|none|none|
|comment|string|false|none|none|
|author|[ComprehensiveUser](#schemacomprehensiveuser)|true|none|none|
|createdAt|string(date-time)|true|none|none|

<h2 id="tocS_ComprehensiveCreateReview">ComprehensiveCreateReview</h2>
<!-- backwards compatibility -->
<a id="schemacomprehensivecreatereview"></a>
<a id="schema_ComprehensiveCreateReview"></a>
<a id="tocScomprehensivecreatereview"></a>
<a id="tocscomprehensivecreatereview"></a>

```json
{
  "rating": 1,
  "comment": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|rating|integer|true|none|none|
|comment|string|false|none|none|

<h2 id="tocS_ComprehensiveOrder">ComprehensiveOrder</h2>
<!-- backwards compatibility -->
<a id="schemacomprehensiveorder"></a>
<a id="schema_ComprehensiveOrder"></a>
<a id="tocScomprehensiveorder"></a>
<a id="tocscomprehensiveorder"></a>

```json
{
  "id": 0,
  "user": {
    "id": 0,
    "name": "string",
    "email": "user@example.com",
    "role": "admin",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zip": "string",
      "country": "string"
    },
    "createdAt": "1970-01-01T00:00:00Z"
  },
  "items": [
    {
      "product": {
        "id": 0,
        "name": "string",
        "description": "string",
        "price": 0,
        "category": {
          "id": 0,
          "name": "string",
          "parentId": null
        },
        "tags": [
          "string"
        ],
        "inStock": true,
        "createdAt": "1970-01-01T00:00:00Z"
      },
      "quantity": 1,
      "price": 0
    }
  ],
  "status": "pending",
  "totalPrice": 0,
  "shippingAddress": {},
  "createdAt": "1970-01-01T00:00:00Z"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|user|[ComprehensiveUser](#schemacomprehensiveuser)|true|none|none|
|items|[[ComprehensiveOrderItem](#schemacomprehensiveorderitem)]|true|none|none|
|status|string|true|none|none|
|totalPrice|number|true|none|none|
|shippingAddress|[ComprehensiveAddress](#schemacomprehensiveaddress)|true|none|none|
|createdAt|string(date-time)|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|pending|
|status|confirmed|
|status|shipped|
|status|delivered|
|status|cancelled|

<h2 id="tocS_ComprehensiveOrderItem">ComprehensiveOrderItem</h2>
<!-- backwards compatibility -->
<a id="schemacomprehensiveorderitem"></a>
<a id="schema_ComprehensiveOrderItem"></a>
<a id="tocScomprehensiveorderitem"></a>
<a id="tocscomprehensiveorderitem"></a>

```json
{
  "product": {
    "id": 0,
    "name": "string",
    "description": "string",
    "price": 0,
    "category": {
      "id": 0,
      "name": "string",
      "parentId": null
    },
    "tags": [
      "string"
    ],
    "inStock": true,
    "createdAt": "1970-01-01T00:00:00Z"
  },
  "quantity": 1,
  "price": 0
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|product|[ComprehensiveProduct](#schemacomprehensiveproduct)|true|none|none|
|quantity|integer|true|none|none|
|price|number|true|none|none|

<h2 id="tocS_ComprehensiveCreateOrder">ComprehensiveCreateOrder</h2>
<!-- backwards compatibility -->
<a id="schemacomprehensivecreateorder"></a>
<a id="schema_ComprehensiveCreateOrder"></a>
<a id="tocScomprehensivecreateorder"></a>
<a id="tocscomprehensivecreateorder"></a>

```json
{
  "items": [
    {
      "productId": 0,
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "country": "string"
  },
  "callbackUrl": "http://example.com"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|items|[object]|true|none|none|
|shippingAddress|[ComprehensiveAddress](#schemacomprehensiveaddress)|true|none|none|
|callbackUrl|string(uri)|false|none|none|

<h2 id="tocS_ComprehensiveError">ComprehensiveError</h2>
<!-- backwards compatibility -->
<a id="schemacomprehensiveerror"></a>
<a id="schema_ComprehensiveError"></a>
<a id="tocScomprehensiveerror"></a>
<a id="tocscomprehensiveerror"></a>

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

<h2 id="tocS_CompositionKeywordsCreditCard">CompositionKeywordsCreditCard</h2>
<!-- backwards compatibility -->
<a id="schemacompositionkeywordscreditcard"></a>
<a id="schema_CompositionKeywordsCreditCard"></a>
<a id="tocScompositionkeywordscreditcard"></a>
<a id="tocscompositionkeywordscreditcard"></a>

```json
{
  "type": "string",
  "cardNumber": "string",
  "expiry": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|true|none|none|
|cardNumber|string|true|none|none|
|expiry|string|true|none|none|

<h2 id="tocS_CompositionKeywordsBankTransfer">CompositionKeywordsBankTransfer</h2>
<!-- backwards compatibility -->
<a id="schemacompositionkeywordsbanktransfer"></a>
<a id="schema_CompositionKeywordsBankTransfer"></a>
<a id="tocScompositionkeywordsbanktransfer"></a>
<a id="tocscompositionkeywordsbanktransfer"></a>

```json
{
  "type": "string",
  "bankCode": "string",
  "accountNumber": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|true|none|none|
|bankCode|string|true|none|none|
|accountNumber|string|true|none|none|

<h2 id="tocS_CompositionKeywordsPaymentMethod">CompositionKeywordsPaymentMethod</h2>
<!-- backwards compatibility -->
<a id="schemacompositionkeywordspaymentmethod"></a>
<a id="schema_CompositionKeywordsPaymentMethod"></a>
<a id="tocScompositionkeywordspaymentmethod"></a>
<a id="tocscompositionkeywordspaymentmethod"></a>

```json
{
  "type": "string",
  "cardNumber": "string",
  "expiry": "string"
}
```

<h2 id="tocS_CompositionKeywordsNullablePayment">CompositionKeywordsNullablePayment</h2>
<!-- backwards compatibility -->
<a id="schemacompositionkeywordsnullablepayment"></a>
<a id="schema_CompositionKeywordsNullablePayment"></a>
<a id="tocScompositionkeywordsnullablepayment"></a>
<a id="tocscompositionkeywordsnullablepayment"></a>

```json
{
  "type": "string",
  "cardNumber": "string",
  "expiry": "string"
}
```

<h2 id="tocS_CompositionKeywordsSearchFilter">CompositionKeywordsSearchFilter</h2>
<!-- backwards compatibility -->
<a id="schemacompositionkeywordssearchfilter"></a>
<a id="schema_CompositionKeywordsSearchFilter"></a>
<a id="tocScompositionkeywordssearchfilter"></a>
<a id="tocscompositionkeywordssearchfilter"></a>

```json
{
  "keyword": "string"
}
```

<h2 id="tocS_CompositionKeywordsFlexibleId">CompositionKeywordsFlexibleId</h2>
<!-- backwards compatibility -->
<a id="schemacompositionkeywordsflexibleid"></a>
<a id="schema_CompositionKeywordsFlexibleId"></a>
<a id="tocScompositionkeywordsflexibleid"></a>
<a id="tocscompositionkeywordsflexibleid"></a>

```json
"string"
```

<h2 id="tocS_CompositionKeywordsCat">CompositionKeywordsCat</h2>
<!-- backwards compatibility -->
<a id="schemacompositionkeywordscat"></a>
<a id="schema_CompositionKeywordsCat"></a>
<a id="tocScompositionkeywordscat"></a>
<a id="tocscompositionkeywordscat"></a>

```json
{
  "name": "string",
  "purring": true
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|purring|boolean|false|none|none|

<h2 id="tocS_CompositionKeywordsDog">CompositionKeywordsDog</h2>
<!-- backwards compatibility -->
<a id="schemacompositionkeywordsdog"></a>
<a id="schema_CompositionKeywordsDog"></a>
<a id="tocScompositionkeywordsdog"></a>
<a id="tocscompositionkeywordsdog"></a>

```json
{
  "name": "string",
  "barkVolume": 0
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|barkVolume|number|false|none|none|

<h2 id="tocS_CompositionKeywordsPetChoice">CompositionKeywordsPetChoice</h2>
<!-- backwards compatibility -->
<a id="schemacompositionkeywordspetchoice"></a>
<a id="schema_CompositionKeywordsPetChoice"></a>
<a id="tocScompositionkeywordspetchoice"></a>
<a id="tocscompositionkeywordspetchoice"></a>

```json
{
  "name": "string",
  "purring": true
}
```

<h2 id="tocS_CompositionKeywordsPerson">CompositionKeywordsPerson</h2>
<!-- backwards compatibility -->
<a id="schemacompositionkeywordsperson"></a>
<a id="schema_CompositionKeywordsPerson"></a>
<a id="tocScompositionkeywordsperson"></a>
<a id="tocscompositionkeywordsperson"></a>

```json
{
  "name": "string",
  "email": "user@example.com"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|email|string(email)|true|none|none|

<h2 id="tocS_CompositionKeywordsEmployeeInfo">CompositionKeywordsEmployeeInfo</h2>
<!-- backwards compatibility -->
<a id="schemacompositionkeywordsemployeeinfo"></a>
<a id="schema_CompositionKeywordsEmployeeInfo"></a>
<a id="tocScompositionkeywordsemployeeinfo"></a>
<a id="tocscompositionkeywordsemployeeinfo"></a>

```json
{
  "employeeId": 0,
  "department": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|employeeId|integer|true|none|none|
|department|string|false|none|none|

<h2 id="tocS_CompositionKeywordsEmployee">CompositionKeywordsEmployee</h2>
<!-- backwards compatibility -->
<a id="schemacompositionkeywordsemployee"></a>
<a id="schema_CompositionKeywordsEmployee"></a>
<a id="tocScompositionkeywordsemployee"></a>
<a id="tocscompositionkeywordsemployee"></a>

```json
{
  "name": "string",
  "email": "user@example.com",
  "employeeId": 0,
  "department": "string",
  "startDate": "1970-01-01"
}
```

<h2 id="tocS_CompositionKeywordsBaseEntity">CompositionKeywordsBaseEntity</h2>
<!-- backwards compatibility -->
<a id="schemacompositionkeywordsbaseentity"></a>
<a id="schema_CompositionKeywordsBaseEntity"></a>
<a id="tocScompositionkeywordsbaseentity"></a>
<a id="tocscompositionkeywordsbaseentity"></a>

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

<h2 id="tocS_CompositionKeywordsExtendedWithSibling">CompositionKeywordsExtendedWithSibling</h2>
<!-- backwards compatibility -->
<a id="schemacompositionkeywordsextendedwithsibling"></a>
<a id="schema_CompositionKeywordsExtendedWithSibling"></a>
<a id="tocScompositionkeywordsextendedwithsibling"></a>
<a id="tocscompositionkeywordsextendedwithsibling"></a>

```json
{
  "id": 0,
  "createdAt": "1970-01-01T00:00:00Z"
}
```

<h2 id="tocS_CompositionKeywordsNotStringValue">CompositionKeywordsNotStringValue</h2>
<!-- backwards compatibility -->
<a id="schemacompositionkeywordsnotstringvalue"></a>
<a id="schema_CompositionKeywordsNotStringValue"></a>
<a id="tocScompositionkeywordsnotstringvalue"></a>
<a id="tocscompositionkeywordsnotstringvalue"></a>

```json
null
```

<h2 id="tocS_CompositionKeywordsNotAdmin">CompositionKeywordsNotAdmin</h2>
<!-- backwards compatibility -->
<a id="schemacompositionkeywordsnotadmin"></a>
<a id="schema_CompositionKeywordsNotAdmin"></a>
<a id="tocScompositionkeywordsnotadmin"></a>
<a id="tocscompositionkeywordsnotadmin"></a>

```json
null
```

<h2 id="tocS_CompositionKeywordsAdminRole">CompositionKeywordsAdminRole</h2>
<!-- backwards compatibility -->
<a id="schemacompositionkeywordsadminrole"></a>
<a id="schema_CompositionKeywordsAdminRole"></a>
<a id="tocScompositionkeywordsadminrole"></a>
<a id="tocscompositionkeywordsadminrole"></a>

```json
{
  "role": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|role|string|true|none|none|

<h2 id="tocS_CompositionKeywordsNotDraftOrArchived">CompositionKeywordsNotDraftOrArchived</h2>
<!-- backwards compatibility -->
<a id="schemacompositionkeywordsnotdraftorarchived"></a>
<a id="schema_CompositionKeywordsNotDraftOrArchived"></a>
<a id="tocScompositionkeywordsnotdraftorarchived"></a>
<a id="tocscompositionkeywordsnotdraftorarchived"></a>

```json
null
```

<h2 id="tocS_CompositionKeywordsNotSpecificValue">CompositionKeywordsNotSpecificValue</h2>
<!-- backwards compatibility -->
<a id="schemacompositionkeywordsnotspecificvalue"></a>
<a id="schema_CompositionKeywordsNotSpecificValue"></a>
<a id="tocScompositionkeywordsnotspecificvalue"></a>
<a id="tocscompositionkeywordsnotspecificvalue"></a>

```json
null
```

<h2 id="tocS_CompositionKeywordsNotStringOrNumber">CompositionKeywordsNotStringOrNumber</h2>
<!-- backwards compatibility -->
<a id="schemacompositionkeywordsnotstringornumber"></a>
<a id="schema_CompositionKeywordsNotStringOrNumber"></a>
<a id="tocScompositionkeywordsnotstringornumber"></a>
<a id="tocscompositionkeywordsnotstringornumber"></a>

```json
null
```

<h2 id="tocS_CallbacksFieldOrderRequest">CallbacksFieldOrderRequest</h2>
<!-- backwards compatibility -->
<a id="schemacallbacksfieldorderrequest"></a>
<a id="schema_CallbacksFieldOrderRequest"></a>
<a id="tocScallbacksfieldorderrequest"></a>
<a id="tocscallbacksfieldorderrequest"></a>

```json
{
  "item": "string",
  "quantity": 0,
  "callbackUrl": "http://example.com"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|item|string|true|none|none|
|quantity|integer|true|none|none|
|callbackUrl|string(uri)|true|none|none|

<h2 id="tocS_CallbacksFieldOrder">CallbacksFieldOrder</h2>
<!-- backwards compatibility -->
<a id="schemacallbacksfieldorder"></a>
<a id="schema_CallbacksFieldOrder"></a>
<a id="tocScallbacksfieldorder"></a>
<a id="tocscallbacksfieldorder"></a>

```json
{
  "id": "string",
  "item": "string",
  "quantity": 0,
  "status": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|item|string|true|none|none|
|quantity|integer|true|none|none|
|status|string|true|none|none|

<h2 id="tocS_CallbacksFieldOrderEvent">CallbacksFieldOrderEvent</h2>
<!-- backwards compatibility -->
<a id="schemacallbacksfieldorderevent"></a>
<a id="schema_CallbacksFieldOrderEvent"></a>
<a id="tocScallbacksfieldorderevent"></a>
<a id="tocscallbacksfieldorderevent"></a>

```json
{
  "orderId": "string",
  "event": "created",
  "timestamp": "1970-01-01T00:00:00Z"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|orderId|string|true|none|none|
|event|string|true|none|none|
|timestamp|string(date-time)|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|event|created|
|event|confirmed|
|event|shipped|

<h2 id="tocS_CallbacksFieldPaymentRequest">CallbacksFieldPaymentRequest</h2>
<!-- backwards compatibility -->
<a id="schemacallbacksfieldpaymentrequest"></a>
<a id="schema_CallbacksFieldPaymentRequest"></a>
<a id="tocScallbacksfieldpaymentrequest"></a>
<a id="tocscallbacksfieldpaymentrequest"></a>

```json
{
  "amount": 0,
  "currency": "string",
  "successUrl": "http://example.com",
  "failureUrl": "http://example.com"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|amount|number|true|none|none|
|currency|string|true|none|none|
|successUrl|string(uri)|true|none|none|
|failureUrl|string(uri)|true|none|none|

<h2 id="tocS_CallbacksFieldPayment">CallbacksFieldPayment</h2>
<!-- backwards compatibility -->
<a id="schemacallbacksfieldpayment"></a>
<a id="schema_CallbacksFieldPayment"></a>
<a id="tocScallbacksfieldpayment"></a>
<a id="tocscallbacksfieldpayment"></a>

```json
{
  "id": "string",
  "amount": 0,
  "currency": "string",
  "status": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|amount|number|true|none|none|
|currency|string|true|none|none|
|status|string|true|none|none|

<h2 id="tocS_CallbacksFieldPaymentEvent">CallbacksFieldPaymentEvent</h2>
<!-- backwards compatibility -->
<a id="schemacallbacksfieldpaymentevent"></a>
<a id="schema_CallbacksFieldPaymentEvent"></a>
<a id="tocScallbacksfieldpaymentevent"></a>
<a id="tocscallbacksfieldpaymentevent"></a>

```json
{
  "paymentId": "string",
  "status": "success",
  "timestamp": "1970-01-01T00:00:00Z"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|paymentId|string|true|none|none|
|status|string|true|none|none|
|timestamp|string(date-time)|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|success|
|status|failure|

<h2 id="tocS_ReadonlyRefUser">ReadonlyRefUser</h2>
<!-- backwards compatibility -->
<a id="schemareadonlyrefuser"></a>
<a id="schema_ReadonlyRefUser"></a>
<a id="tocSreadonlyrefuser"></a>
<a id="tocsreadonlyrefuser"></a>

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

<h2 id="tocS_ReadonlyRefItem">ReadonlyRefItem</h2>
<!-- backwards compatibility -->
<a id="schemareadonlyrefitem"></a>
<a id="schema_ReadonlyRefItem"></a>
<a id="tocSreadonlyrefitem"></a>
<a id="tocsreadonlyrefitem"></a>

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

<h2 id="tocS_ReadonlyRefErrorBody">ReadonlyRefErrorBody</h2>
<!-- backwards compatibility -->
<a id="schemareadonlyreferrorbody"></a>
<a id="schema_ReadonlyRefErrorBody"></a>
<a id="tocSreadonlyreferrorbody"></a>
<a id="tocsreadonlyreferrorbody"></a>

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

<h2 id="tocS_DefaultResponseItem">DefaultResponseItem</h2>
<!-- backwards compatibility -->
<a id="schemadefaultresponseitem"></a>
<a id="schema_DefaultResponseItem"></a>
<a id="tocSdefaultresponseitem"></a>
<a id="tocsdefaultresponseitem"></a>

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

<h2 id="tocS_ComplexSchemasLiteralExpr">ComplexSchemasLiteralExpr</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemasliteralexpr"></a>
<a id="schema_ComplexSchemasLiteralExpr"></a>
<a id="tocScomplexschemasliteralexpr"></a>
<a id="tocscomplexschemasliteralexpr"></a>

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

<h2 id="tocS_ComplexSchemasUnaryExpr">ComplexSchemasUnaryExpr</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemasunaryexpr"></a>
<a id="schema_ComplexSchemasUnaryExpr"></a>
<a id="tocScomplexschemasunaryexpr"></a>
<a id="tocscomplexschemasunaryexpr"></a>

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
|operand|[ComplexSchemasExpression](#schemacomplexschemasexpression)|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|operator|-|
|operator|!|

<h2 id="tocS_ComplexSchemasBinaryExpr">ComplexSchemasBinaryExpr</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemasbinaryexpr"></a>
<a id="schema_ComplexSchemasBinaryExpr"></a>
<a id="tocScomplexschemasbinaryexpr"></a>
<a id="tocscomplexschemasbinaryexpr"></a>

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
|left|[ComplexSchemasExpression](#schemacomplexschemasexpression)|true|none|none|
|right|[ComplexSchemasExpression](#schemacomplexschemasexpression)|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|operator|+|
|operator|-|
|operator|*|
|operator|/|

<h2 id="tocS_ComplexSchemasExpression">ComplexSchemasExpression</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemasexpression"></a>
<a id="schema_ComplexSchemasExpression"></a>
<a id="tocScomplexschemasexpression"></a>
<a id="tocscomplexschemasexpression"></a>

```json
{
  "type": "string",
  "value": "string"
}
```

<h2 id="tocS_ComplexSchemasCircle">ComplexSchemasCircle</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemascircle"></a>
<a id="schema_ComplexSchemasCircle"></a>
<a id="tocScomplexschemascircle"></a>
<a id="tocscomplexschemascircle"></a>

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

<h2 id="tocS_ComplexSchemasRectangle">ComplexSchemasRectangle</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemasrectangle"></a>
<a id="schema_ComplexSchemasRectangle"></a>
<a id="tocScomplexschemasrectangle"></a>
<a id="tocscomplexschemasrectangle"></a>

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

<h2 id="tocS_ComplexSchemasTriangle">ComplexSchemasTriangle</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemastriangle"></a>
<a id="schema_ComplexSchemasTriangle"></a>
<a id="tocScomplexschemastriangle"></a>
<a id="tocscomplexschemastriangle"></a>

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

<h2 id="tocS_ComplexSchemasPolygon">ComplexSchemasPolygon</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemaspolygon"></a>
<a id="schema_ComplexSchemasPolygon"></a>
<a id="tocScomplexschemaspolygon"></a>
<a id="tocscomplexschemaspolygon"></a>

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

<h2 id="tocS_ComplexSchemasEllipse">ComplexSchemasEllipse</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemasellipse"></a>
<a id="schema_ComplexSchemasEllipse"></a>
<a id="tocScomplexschemasellipse"></a>
<a id="tocscomplexschemasellipse"></a>

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

<h2 id="tocS_ComplexSchemasShape">ComplexSchemasShape</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemasshape"></a>
<a id="schema_ComplexSchemasShape"></a>
<a id="tocScomplexschemasshape"></a>
<a id="tocscomplexschemasshape"></a>

```json
{
  "kind": "string",
  "radius": 0
}
```

<h2 id="tocS_ComplexSchemasDocumentBase">ComplexSchemasDocumentBase</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemasdocumentbase"></a>
<a id="schema_ComplexSchemasDocumentBase"></a>
<a id="tocScomplexschemasdocumentbase"></a>
<a id="tocscomplexschemasdocumentbase"></a>

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

<h2 id="tocS_ComplexSchemasArticleContent">ComplexSchemasArticleContent</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemasarticlecontent"></a>
<a id="schema_ComplexSchemasArticleContent"></a>
<a id="tocScomplexschemasarticlecontent"></a>
<a id="tocscomplexschemasarticlecontent"></a>

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

<h2 id="tocS_ComplexSchemasSpreadsheetContent">ComplexSchemasSpreadsheetContent</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemasspreadsheetcontent"></a>
<a id="schema_ComplexSchemasSpreadsheetContent"></a>
<a id="tocScomplexschemasspreadsheetcontent"></a>
<a id="tocscomplexschemasspreadsheetcontent"></a>

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

<h2 id="tocS_ComplexSchemasArticle">ComplexSchemasArticle</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemasarticle"></a>
<a id="schema_ComplexSchemasArticle"></a>
<a id="tocScomplexschemasarticle"></a>
<a id="tocscomplexschemasarticle"></a>

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

<h2 id="tocS_ComplexSchemasSpreadsheet">ComplexSchemasSpreadsheet</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemasspreadsheet"></a>
<a id="schema_ComplexSchemasSpreadsheet"></a>
<a id="tocScomplexschemasspreadsheet"></a>
<a id="tocscomplexschemasspreadsheet"></a>

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

<h2 id="tocS_ComplexSchemasDocument">ComplexSchemasDocument</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemasdocument"></a>
<a id="schema_ComplexSchemasDocument"></a>
<a id="tocScomplexschemasdocument"></a>
<a id="tocscomplexschemasdocument"></a>

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

<h2 id="tocS_ComplexSchemasBaseConfig">ComplexSchemasBaseConfig</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemasbaseconfig"></a>
<a id="schema_ComplexSchemasBaseConfig"></a>
<a id="tocScomplexschemasbaseconfig"></a>
<a id="tocscomplexschemasbaseconfig"></a>

```json
{
  "version": 0
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|version|integer|true|none|none|

<h2 id="tocS_ComplexSchemasNetworkConfig">ComplexSchemasNetworkConfig</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemasnetworkconfig"></a>
<a id="schema_ComplexSchemasNetworkConfig"></a>
<a id="tocScomplexschemasnetworkconfig"></a>
<a id="tocscomplexschemasnetworkconfig"></a>

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

<h2 id="tocS_ComplexSchemasSecurityConfig">ComplexSchemasSecurityConfig</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemassecurityconfig"></a>
<a id="schema_ComplexSchemasSecurityConfig"></a>
<a id="tocScomplexschemassecurityconfig"></a>
<a id="tocscomplexschemassecurityconfig"></a>

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

<h2 id="tocS_ComplexSchemasFullConfig">ComplexSchemasFullConfig</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemasfullconfig"></a>
<a id="schema_ComplexSchemasFullConfig"></a>
<a id="tocScomplexschemasfullconfig"></a>
<a id="tocscomplexschemasfullconfig"></a>

```json
{
  "version": 0,
  "host": "string",
  "port": 1,
  "tlsEnabled": true,
  "certPath": "string"
}
```

<h2 id="tocS_ComplexSchemasSuccessResult">ComplexSchemasSuccessResult</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemassuccessresult"></a>
<a id="schema_ComplexSchemasSuccessResult"></a>
<a id="tocScomplexschemassuccessresult"></a>
<a id="tocscomplexschemassuccessresult"></a>

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

<h2 id="tocS_ComplexSchemasErrorResult">ComplexSchemasErrorResult</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemaserrorresult"></a>
<a id="schema_ComplexSchemasErrorResult"></a>
<a id="tocScomplexschemaserrorresult"></a>
<a id="tocscomplexschemaserrorresult"></a>

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

<h2 id="tocS_ComplexSchemasNullableResult">ComplexSchemasNullableResult</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemasnullableresult"></a>
<a id="schema_ComplexSchemasNullableResult"></a>
<a id="tocScomplexschemasnullableresult"></a>
<a id="tocscomplexschemasnullableresult"></a>

```json
{
  "status": "string",
  "data": null
}
```

<h2 id="tocS_ComplexSchemasCategory">ComplexSchemasCategory</h2>
<!-- backwards compatibility -->
<a id="schemacomplexschemascategory"></a>
<a id="schema_ComplexSchemasCategory"></a>
<a id="tocScomplexschemascategory"></a>
<a id="tocscomplexschemascategory"></a>

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
|parent|[ComplexSchemasCategory](#schemacomplexschemascategory)|false|none|none|
|children|[[ComplexSchemasCategory](#schemacomplexschemascategory)]|false|none|none|

<h2 id="tocS_VendorExtensionsUserId">VendorExtensionsUserId</h2>
<!-- backwards compatibility -->
<a id="schemavendorextensionsuserid"></a>
<a id="schema_VendorExtensionsUserId"></a>
<a id="tocSvendorextensionsuserid"></a>
<a id="tocsvendorextensionsuserid"></a>

```json
"497f6eca-6276-4993-bfeb-53cbbbba6f08"
```

<h2 id="tocS_VendorExtensionsPostId">VendorExtensionsPostId</h2>
<!-- backwards compatibility -->
<a id="schemavendorextensionspostid"></a>
<a id="schema_VendorExtensionsPostId"></a>
<a id="tocSvendorextensionspostid"></a>
<a id="tocsvendorextensionspostid"></a>

```json
"497f6eca-6276-4993-bfeb-53cbbbba6f08"
```

<h2 id="tocS_VendorExtensionsEmail">VendorExtensionsEmail</h2>
<!-- backwards compatibility -->
<a id="schemavendorextensionsemail"></a>
<a id="schema_VendorExtensionsEmail"></a>
<a id="tocSvendorextensionsemail"></a>
<a id="tocsvendorextensionsemail"></a>

```json
"user@example.com"
```

<h2 id="tocS_VendorExtensionsPrice">VendorExtensionsPrice</h2>
<!-- backwards compatibility -->
<a id="schemavendorextensionsprice"></a>
<a id="schema_VendorExtensionsPrice"></a>
<a id="tocSvendorextensionsprice"></a>
<a id="tocsvendorextensionsprice"></a>

```json
0
```

<h2 id="tocS_VendorExtensionsQuantity">VendorExtensionsQuantity</h2>
<!-- backwards compatibility -->
<a id="schemavendorextensionsquantity"></a>
<a id="schema_VendorExtensionsQuantity"></a>
<a id="tocSvendorextensionsquantity"></a>
<a id="tocsvendorextensionsquantity"></a>

```json
0
```

<h2 id="tocS_VendorExtensionsUsername">VendorExtensionsUsername</h2>
<!-- backwards compatibility -->
<a id="schemavendorextensionsusername"></a>
<a id="schema_VendorExtensionsUsername"></a>
<a id="tocSvendorextensionsusername"></a>
<a id="tocsvendorextensionsusername"></a>

```json
"string"
```

<h2 id="tocS_VendorExtensionsTags">VendorExtensionsTags</h2>
<!-- backwards compatibility -->
<a id="schemavendorextensionstags"></a>
<a id="schema_VendorExtensionsTags"></a>
<a id="tocSvendorextensionstags"></a>
<a id="tocsvendorextensionstags"></a>

```json
[
  "string"
]
```

<h2 id="tocS_VendorExtensionsCreateUser">VendorExtensionsCreateUser</h2>
<!-- backwards compatibility -->
<a id="schemavendorextensionscreateuser"></a>
<a id="schema_VendorExtensionsCreateUser"></a>
<a id="tocSvendorextensionscreateuser"></a>
<a id="tocsvendorextensionscreateuser"></a>

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
|email|[VendorExtensionsEmail](#schemavendorextensionsemail)|true|none|none|
|username|[VendorExtensionsUsername](#schemavendorextensionsusername)|true|none|none|
|price|[VendorExtensionsPrice](#schemavendorextensionsprice)|true|none|none|
|tags|[VendorExtensionsTags](#schemavendorextensionstags)|false|none|none|

<h2 id="tocS_VendorExtensionsUser">VendorExtensionsUser</h2>
<!-- backwards compatibility -->
<a id="schemavendorextensionsuser"></a>
<a id="schema_VendorExtensionsUser"></a>
<a id="tocSvendorextensionsuser"></a>
<a id="tocsvendorextensionsuser"></a>

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
|id|[VendorExtensionsUserId](#schemavendorextensionsuserid)|true|none|none|
|email|[VendorExtensionsEmail](#schemavendorextensionsemail)|true|none|none|
|username|[VendorExtensionsUsername](#schemavendorextensionsusername)|true|none|none|

<h2 id="tocS_VendorExtensionsCreatePost">VendorExtensionsCreatePost</h2>
<!-- backwards compatibility -->
<a id="schemavendorextensionscreatepost"></a>
<a id="schema_VendorExtensionsCreatePost"></a>
<a id="tocSvendorextensionscreatepost"></a>
<a id="tocsvendorextensionscreatepost"></a>

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
|authorId|[VendorExtensionsUserId](#schemavendorextensionsuserid)|true|none|none|
|title|string|true|none|none|
|quantity|[VendorExtensionsQuantity](#schemavendorextensionsquantity)|true|none|none|

<h2 id="tocS_VendorExtensionsPost">VendorExtensionsPost</h2>
<!-- backwards compatibility -->
<a id="schemavendorextensionspost"></a>
<a id="schema_VendorExtensionsPost"></a>
<a id="tocSvendorextensionspost"></a>
<a id="tocsvendorextensionspost"></a>

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
|id|[VendorExtensionsPostId](#schemavendorextensionspostid)|true|none|none|
|authorId|[VendorExtensionsUserId](#schemavendorextensionsuserid)|true|none|none|
|title|string|true|none|none|

<h2 id="tocS_VendorExtensionsTransformForm">VendorExtensionsTransformForm</h2>
<!-- backwards compatibility -->
<a id="schemavendorextensionstransformform"></a>
<a id="schema_VendorExtensionsTransformForm"></a>
<a id="tocSvendorextensionstransformform"></a>
<a id="tocsvendorextensionstransformform"></a>

```json
{
  "trimmed": "string",
  "lowered": "string",
  "uppered": "string",
  "normalized": "string",
  "lowercased": "string",
  "uppercased": "string",
  "startsWithHttps": "string",
  "endsWithTest": "string",
  "includesSlug": "string",
  "emailNormalized": "user@example.com",
  "allChained": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|trimmed|string|true|none|none|
|lowered|string|true|none|none|
|uppered|string|true|none|none|
|normalized|string|true|none|none|
|lowercased|string|true|none|none|
|uppercased|string|true|none|none|
|startsWithHttps|string|true|none|none|
|endsWithTest|string|true|none|none|
|includesSlug|string|true|none|none|
|emailNormalized|string(email)|true|none|none|
|allChained|string|true|none|none|

<h2 id="tocS_VendorExtensionsCoerceForm">VendorExtensionsCoerceForm</h2>
<!-- backwards compatibility -->
<a id="schemavendorextensionscoerceform"></a>
<a id="schema_VendorExtensionsCoerceForm"></a>
<a id="tocSvendorextensionscoerceform"></a>
<a id="tocsvendorextensionscoerceform"></a>

```json
{
  "asString": "string",
  "asDate": "1970-01-01T00:00:00Z",
  "asNumber": 0,
  "asInt": 0,
  "asBool": true
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|asString|string|true|none|none|
|asDate|string(date-time)|true|none|none|
|asNumber|number|true|none|none|
|asInt|integer|true|none|none|
|asBool|boolean|true|none|none|

<h2 id="tocS_VendorExtensionsReplacementForm">VendorExtensionsReplacementForm</h2>
<!-- backwards compatibility -->
<a id="schemavendorextensionsreplacementform"></a>
<a id="schema_VendorExtensionsReplacementForm"></a>
<a id="tocSvendorextensionsreplacementform"></a>
<a id="tocsvendorextensionsreplacementform"></a>

```json
{
  "codecDate": "1970-01-01T00:00:00Z",
  "transformed": "string",
  "piped": "string",
  "preprocessed": "string",
  "asStringBool": true,
  "asStringBoolCustom": true
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|codecDate|string(date-time)|true|none|none|
|transformed|string|true|none|none|
|piped|string|true|none|none|
|preprocessed|string|true|none|none|
|asStringBool|boolean|true|none|none|
|asStringBoolCustom|boolean|true|none|none|

<h2 id="tocS_VendorExtensionsFormatOptions">VendorExtensionsFormatOptions</h2>
<!-- backwards compatibility -->
<a id="schemavendorextensionsformatoptions"></a>
<a id="schema_VendorExtensionsFormatOptions"></a>
<a id="tocSvendorextensionsformatoptions"></a>
<a id="tocsvendorextensionsformatoptions"></a>

```json
{
  "emailHtml5": "user@example.com",
  "customEmail": "user@example.com",
  "uuidV8": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "httpsUrl": "http://example.com",
  "hostScopedUrl": "http://example.com",
  "preciseDatetime": "1970-01-01T00:00:00Z",
  "localDatetime": "1970-01-01T00:00:00Z",
  "colonMac": "string",
  "dotMac": "string",
  "hs256Jwt": "string",
  "sha256Hash": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|emailHtml5|string(email)|true|none|none|
|customEmail|string(email)|true|none|none|
|uuidV8|string(uuid)|true|none|none|
|httpsUrl|string(uri)|true|none|none|
|hostScopedUrl|string(uri)|true|none|none|
|preciseDatetime|string(date-time)|true|none|none|
|localDatetime|string(date-time)|true|none|none|
|colonMac|string(mac)|true|none|none|
|dotMac|string(mac)|true|none|none|
|hs256Jwt|string(jwt)|true|none|none|
|sha256Hash|string(hash)|true|none|none|

<h2 id="tocS_VendorExtensionsCustomForm">VendorExtensionsCustomForm</h2>
<!-- backwards compatibility -->
<a id="schemavendorextensionscustomform"></a>
<a id="schema_VendorExtensionsCustomForm"></a>
<a id="tocSvendorextensionscustomform"></a>
<a id="tocsvendorextensionscustomform"></a>

```json
{
  "password": "string",
  "normalizedEmail": "user@example.com",
  "config": {
    "name": "string"
  },
  "greeting": "string",
  "retries": 0
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|password|string|true|none|none|
|normalizedEmail|string(email)|true|none|none|
|config|object|true|none|none|
|greeting|string|true|none|none|
|retries|integer|true|none|none|

<h2 id="tocS_VendorExtensionsMessageForm">VendorExtensionsMessageForm</h2>
<!-- backwards compatibility -->
<a id="schemavendorextensionsmessageform"></a>
<a id="schema_VendorExtensionsMessageForm"></a>
<a id="tocSvendorextensionsmessageform"></a>
<a id="tocsvendorextensionsmessageform"></a>

```json
{
  "username": "string",
  "code": "string",
  "slug": "string",
  "age": 0,
  "score": 0,
  "count": 0,
  "active": true,
  "tags": [
    "string"
  ],
  "pin": [
    0
  ],
  "role": "admin",
  "priority": 1,
  "color": "string",
  "kind": "string",
  "uniqueTags": [
    "string"
  ],
  "namespaced": {
    "a": "string",
    "b": "string",
    "c": "string"
  },
  "prefixed": null,
  "payload": "string",
  "token": "string",
  "tokenLabel": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|username|string|true|none|none|
|code|string|true|none|none|
|slug|string|true|none|none|
|age|integer|true|none|none|
|score|number|true|none|none|
|count|integer|true|none|none|
|active|boolean|true|none|none|
|tags|[string]|true|none|none|
|pin|[integer]|true|none|none|
|role|string|true|none|none|
|priority|integer|true|none|none|
|color|string|true|none|none|
|kind|string|true|none|none|
|uniqueTags|[string]|true|none|none|
|namespaced|object|true|none|none|
|prefixed|object|true|none|none|
|payload|string|true|none|none|
|token|string|false|none|none|
|tokenLabel|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|role|admin|
|role|editor|
|role|viewer|
|priority|1|
|priority|2|
|priority|3|

<h2 id="tocS_VendorExtensionsComposition">VendorExtensionsComposition</h2>
<!-- backwards compatibility -->
<a id="schemavendorextensionscomposition"></a>
<a id="schema_VendorExtensionsComposition"></a>
<a id="tocSvendorextensionscomposition"></a>
<a id="tocsvendorextensionscomposition"></a>

```json
{
  "anyValue": "string",
  "oneValue": "string",
  "notString": null,
  "merged": {
    "name": "string",
    "age": 0
  },
  "propertyNames": null
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|anyValue|object|true|none|none|
|oneValue|object|false|none|none|
|notString|object|false|none|none|
|merged|object|false|none|none|
|propertyNames|object|false|none|none|

<h2 id="tocS_VendorExtensionsConditional">VendorExtensionsConditional</h2>
<!-- backwards compatibility -->
<a id="schemavendorextensionsconditional"></a>
<a id="schema_VendorExtensionsConditional"></a>
<a id="tocSvendorextensionsconditional"></a>
<a id="tocsvendorextensionsconditional"></a>

```json
{
  "kind": "premium",
  "feature": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|kind|string|true|none|none|
|feature|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|kind|premium|
|kind|basic|

<h2 id="tocS_VendorExtensionsApplicators">VendorExtensionsApplicators</h2>
<!-- backwards compatibility -->
<a id="schemavendorextensionsapplicators"></a>
<a id="schema_VendorExtensionsApplicators"></a>
<a id="tocSvendorextensionsapplicators"></a>
<a id="tocsvendorextensionsapplicators"></a>

```json
{
  "tuple": [
    true
  ],
  "list": [
    "string"
  ],
  "meta": null
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tuple|[boolean]|true|none|none|
|list|[string]|true|none|none|
|meta|object|true|none|none|

<h2 id="tocS_PaginationItem">PaginationItem</h2>
<!-- backwards compatibility -->
<a id="schemapaginationitem"></a>
<a id="schema_PaginationItem"></a>
<a id="tocSpaginationitem"></a>
<a id="tocspaginationitem"></a>

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

<h2 id="tocS_PaginationItemsPage">PaginationItemsPage</h2>
<!-- backwards compatibility -->
<a id="schemapaginationitemspage"></a>
<a id="schema_PaginationItemsPage"></a>
<a id="tocSpaginationitemspage"></a>
<a id="tocspaginationitemspage"></a>

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
|items|[[PaginationItem](#schemapaginationitem)]|true|none|none|
|nextCursor|string|false|none|none|
