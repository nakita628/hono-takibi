---
title: Security Schemes API v1.0.0
language_tabs:
  - bash: Bash
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<h1 id="security-schemes-api">Security Schemes API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Authentication

- HTTP Authentication, scheme: bearer

* API Key (ApiKeyAuth)
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

<h1 id="security-schemes-api-default">Default</h1>

## getPublic

<a id="opIdgetPublic"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /public \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /public`

> Example responses

> 200 Response

```json
{
  "message": "string"
}
```

<h3 id="getpublic-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="getpublic-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## getBearerProtected

<a id="opIdgetBearerProtected"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /bearer-protected \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`GET /bearer-protected`

> Example responses

> 200 Response

```json
{
  "data": "string"
}
```

<h3 id="getbearerprotected-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="getbearerprotected-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|string|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
BearerAuth
</aside>

## getApiKeyProtected

<a id="opIdgetApiKeyProtected"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /api-key-protected \
  -H 'Accept: application/json' \
  -H "X-API-Key: ${API_KEY}" \
  src/index.ts
```

`GET /api-key-protected`

> Example responses

> 200 Response

```json
{
  "data": "string"
}
```

<h3 id="getapikeyprotected-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="getapikeyprotected-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|string|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ApiKeyAuth
</aside>

## getBasicProtected

<a id="opIdgetBasicProtected"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /basic-protected \
  -H 'Accept: application/json' \
  -H "Authorization: Basic ${CREDENTIALS}" \
  src/index.ts
```

`GET /basic-protected`

> Example responses

> 200 Response

```json
{
  "data": "string"
}
```

<h3 id="getbasicprotected-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="getbasicprotected-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|string|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
BasicAuth
</aside>

## getOAuthProtected

<a id="opIdgetOAuthProtected"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /oauth-protected \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`GET /oauth-protected`

> Example responses

> 200 Response

```json
{
  "data": "string"
}
```

<h3 id="getoauthprotected-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="getoauthprotected-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|string|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
OAuth2 ( Scopes: read )
</aside>

## getMultiAuth

<a id="opIdgetMultiAuth"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /multi-auth \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "X-API-Key: ${API_KEY}" \
  src/index.ts
```

`GET /multi-auth`

> Example responses

> 200 Response

```json
{
  "data": "string"
}
```

<h3 id="getmultiauth-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="getmultiauth-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|string|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
BearerAuth & ApiKeyAuth
</aside>
