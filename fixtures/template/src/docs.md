---
title: Minimal API v1.0.0
language_tabs:
  - bash: Bash
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<h1 id="minimal-api">Minimal API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="minimal-api-default">Default</h1>

## getHealth

<a id="opIdgetHealth"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /api/health \
  -H 'Accept: application/json' \
  src/index.ts
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
|200|OK|OK|Inline|

<h3 id="gethealth-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## getHealthTest

<a id="opIdgetHealthTest"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /api/health/test \
  -H 'Accept: application/json' \
  src/index.ts
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
|200|OK|OK|Inline|

<h3 id="gethealthtest-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>
