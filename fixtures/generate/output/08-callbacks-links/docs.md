<h1 id="callbacks-and-links-api">Callbacks and Links API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="callbacks-and-links-api-default">Default</h1>

## createSubscription

<a id="opIdcreateSubscription"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /subscriptions \
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

`POST /subscriptions`

> Body parameter

```json
{
  "callbackUrl": "http://example.com",
  "events": [
    "created"
  ]
}
```

<h3 id="createsubscription-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SubscriptionRequest](#schemasubscriptionrequest)|true|none|
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

<h3 id="createsubscription-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[Subscription](#schemasubscription)|

<aside class="success">
This operation does not require authentication
</aside>

## getSubscription

<a id="opIdgetSubscription"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /subscriptions/{id} \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /subscriptions/{id}`

<h3 id="getsubscription-parameters">Parameters</h3>

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

<h3 id="getsubscription-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[Subscription](#schemasubscription)|

<aside class="success">
This operation does not require authentication
</aside>

## deleteSubscription

<a id="opIddeleteSubscription"></a>

> Code samples

```bash
hono request \
  -X DELETE \
  -P /subscriptions/{id} \
  src/index.ts
```

`DELETE /subscriptions/{id}`

<h3 id="deletesubscription-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="deletesubscription-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|No Content|Deleted|None|

<aside class="success">
This operation does not require authentication
</aside>

## testWebhook

<a id="opIdtestWebhook"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /webhooks/test \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "url": "http://example.com"
  }' \
  src/index.ts
```

`POST /webhooks/test`

> Body parameter

```json
{
  "url": "http://example.com"
}
```

<h3 id="testwebhook-parameters">Parameters</h3>

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

<h3 id="testwebhook-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="testwebhook-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|sent|boolean|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_SubscriptionRequest">SubscriptionRequest</h2>
<!-- backwards compatibility -->
<a id="schemasubscriptionrequest"></a>
<a id="schema_SubscriptionRequest"></a>
<a id="tocSsubscriptionrequest"></a>
<a id="tocssubscriptionrequest"></a>

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

<h2 id="tocS_Subscription">Subscription</h2>
<!-- backwards compatibility -->
<a id="schemasubscription"></a>
<a id="schema_Subscription"></a>
<a id="tocSsubscription"></a>
<a id="tocssubscription"></a>

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

<h2 id="tocS_EventPayload">EventPayload</h2>
<!-- backwards compatibility -->
<a id="schemaeventpayload"></a>
<a id="schema_EventPayload"></a>
<a id="tocSeventpayload"></a>
<a id="tocseventpayload"></a>

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
