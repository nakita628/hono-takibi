<h1 id="array-object-constraints-api">Array & Object Constraints API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="array-object-constraints-api-default">Default</h1>

## getTags

<a id="opIdgetTags"></a>

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

<h3 id="gettags-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="gettags-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tags|[string]|true|none|none|
|ids|[integer]|true|none|none|
|labels|[string]|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## createTag

<a id="opIdcreateTag"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /tags \
  -H 'Content-Type: application/json' \
  -d '{"metadata":{"key":"string","value":"string"},"config":{"name":"string"},"limited":{"a":"string","b":"string"}}' \
  src/index.ts
```

`POST /tags`

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

<h3 id="createtag-parameters">Parameters</h3>

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

<h3 id="createtag-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|None|

<aside class="success">
This operation does not require authentication
</aside>

## getSettings

<a id="opIdgetSettings"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /settings \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /settings`

<h3 id="getsettings-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|filter|query|string|false|none|

> Example responses

> 200 Response

```json
null
```

<h3 id="getsettings-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<aside class="success">
This operation does not require authentication
</aside>

## updateSettings

<a id="opIdupdateSettings"></a>

> Code samples

```bash
hono request \
  -X PUT \
  -P /settings \
  -H 'Content-Type: application/json' \
  -d '{"avatar":"string"}' \
  src/index.ts
```

`PUT /settings`

> Body parameter

```json
{
  "avatar": "string"
}
```

<h3 id="updatesettings-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» avatar|body|string|true|none|

<h3 id="updatesettings-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## createConfig

<a id="opIdcreateConfig"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /config \
  -H 'Content-Type: application/json' \
  -d '{"data":null,"headers":null,"keys":null}' \
  src/index.ts
```

`POST /config`

> Body parameter

```json
{
  "data": null,
  "headers": null,
  "keys": null
}
```

<h3 id="createconfig-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» data|body|object|true|none|
|» headers|body|object|false|none|
|» keys|body|object|false|none|

<h3 id="createconfig-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|None|

<aside class="success">
This operation does not require authentication
</aside>

## createPayment

<a id="opIdcreatePayment"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /payment \
  -H 'Content-Type: application/json' \
  -d '{"creditCard":"string","billingAddress":"string","email":"string"}' \
  src/index.ts
```

`POST /payment`

> Body parameter

```json
{
  "creditCard": "string",
  "billingAddress": "string",
  "email": "string"
}
```

<h3 id="createpayment-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» creditCard|body|string|false|none|
|» billingAddress|body|string|false|none|
|» email|body|string|false|none|

<h3 id="createpayment-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|None|

<aside class="success">
This operation does not require authentication
</aside>
