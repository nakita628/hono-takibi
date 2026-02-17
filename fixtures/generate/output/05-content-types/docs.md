<h1 id="content-types-api">Content Types API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="content-types-api-default">Default</h1>

## postJson

<a id="opIdpostJson"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /json \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "name": "string",
    "value": 0
  }' \
  src/index.ts
```

`POST /json`

> Body parameter

```json
{
  "name": "string",
  "value": 0
}
```

<h3 id="postjson-parameters">Parameters</h3>

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

<h3 id="postjson-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="postjson-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|name|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## postForm

<a id="opIdpostForm"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /form \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json' \
  src/index.ts
```

`POST /form`

> Example responses

> 200 Response

```json
{
  "success": true
}
```

<h3 id="postform-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="postform-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|success|boolean|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## uploadFile

<a id="opIduploadFile"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /upload \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: application/json' \
  src/index.ts
```

`POST /upload`

> Example responses

> 200 Response

```json
{
  "url": "string"
}
```

<h3 id="uploadfile-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="uploadfile-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|url|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## postText

<a id="opIdpostText"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /text \
  src/index.ts
```

`POST /text`

<h3 id="posttext-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## postMultiContent

<a id="opIdpostMultiContent"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /multi-content \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "data": "string"
  }' \
  src/index.ts
```

`POST /multi-content`

> Body parameter

```json
{
  "data": "string"
}
```

<h3 id="postmulticontent-parameters">Parameters</h3>

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

<h3 id="postmulticontent-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="postmulticontent-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|received|boolean|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>
