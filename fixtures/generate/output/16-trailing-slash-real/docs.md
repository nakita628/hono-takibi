<h1 id="trailing-slash-real-world-pattern-api">Trailing Slash Real-World Pattern API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Regression tests for trailing-slash TS2339 errors. Reproduces real-world patterns with dummy data: - Deep nested POST with trailing slash - GET with many query params and trailing slash - Non-trailing-slash neighbor for contrast

<h1 id="trailing-slash-real-world-pattern-api-default">Default</h1>

## Reverse geocode lookup

<a id="opIdgetApiReverseGeocodeIndex"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /api/reverseGeocode/ \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /api/reverseGeocode/`

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

<h1 id="trailing-slash-real-world-pattern-api-v2publicbookingaccountregisteroauth">v2/public/booking/account/register/oauth</h1>

## postApiV2PublicBookingAccountRegisterOauthIndex

<a id="opIdpostApiV2PublicBookingAccountRegisterOauthIndex"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /api/v2/public/booking/account/register/oauth/ \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "account": null,
    "profile": null
  }' \
  src/index.ts
```

`POST /api/v2/public/booking/account/register/oauth/`

> Body parameter

```json
{
  "account": null,
  "profile": null
}
```

<h3 id="postapiv2publicbookingaccountregisteroauthindex-parameters">Parameters</h3>

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

<h3 id="postapiv2publicbookingaccountregisteroauthindex-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Default Response|Inline|
|404|Not Found|Default Response|Inline|

<h3 id="postapiv2publicbookingaccountregisteroauthindex-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|none|
|provisionalId|string|false|none|none|

<h3 id="postapiv2publicbookingaccountregisteroauthindex-responseschema">Response Schema</h3>

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|none|
|provisionalId|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="trailing-slash-real-world-pattern-api-v2publicbookingaccountregisteremail">v2/public/booking/account/register/email</h1>

## Send registration URL via email

<a id="opIdpostApiV2PublicBookingAccountRegisterEmail"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /api/v2/public/booking/account/register/email \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "email": "user@example.com"
  }' \
  src/index.ts
```

`POST /api/v2/public/booking/account/register/email`

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
