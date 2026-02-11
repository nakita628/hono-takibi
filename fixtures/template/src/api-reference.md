---
title: Minimal API v1.0.0
language_tabs:
  - shell: Shell
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="minimal-api">Minimal API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="minimal-api-default">Default</h1>

## getHealth

<a id="opIdgetHealth"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /health \
  -H 'Accept: application/json'

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
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="gethealth-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## getHealthTest

<a id="opIdgetHealthTest"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /health/test \
  -H 'Accept: application/json'

```

`GET /health/test`

> Example responses

> 200 Response

```json
{
  "status": "string"
}
```

<h3 id="gethealthtest-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="gethealthtest-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## postHealthTest2

<a id="opIdpostHealthTest2"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /health/test2 \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

`POST /health/test2`

> Body parameter

```json
{
  "status": "string",
  "required": null
}
```

<h3 id="posthealthtest2-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» status|body|string|false|none|
|» required|body|any|false|none|

> Example responses

> 200 Response

```json
{
  "status": "string"
}
```

<h3 id="posthealthtest2-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="posthealthtest2-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## getHealthById

<a id="opIdgetHealthById"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /health/{id} \
  -H 'Accept: application/json'

```

`GET /health/{id}`

<h3 id="gethealthbyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "status": "string"
}
```

<h3 id="gethealthbyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="gethealthbyid-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

