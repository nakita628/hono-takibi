---
title: Callbacks Field Name Test v1.0.0
language_tabs:
  - bash: Bash
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<h1 id="callbacks-field-name-test">Callbacks Field Name Test v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Verify that callbacks field is correctly named in generated createRoute output

<h1 id="callbacks-field-name-test-default">Default</h1>

## Create an order with callback

<a id="opIdcreateOrder"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /orders \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  src/index.ts
```

`POST /orders`

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
|body|body|[OrderRequest](#schemaorderrequest)|true|none|
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
|201|Created|Order created|[Order](#schemaorder)|

<aside class="success">
This operation does not require authentication
</aside>

## Create a payment with multiple callbacks

<a id="opIdcreatePayment"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /payments \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  src/index.ts
```

`POST /payments`

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
|body|body|[PaymentRequest](#schemapaymentrequest)|true|none|
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
|201|Created|Payment created|[Payment](#schemapayment)|

<aside class="success">
This operation does not require authentication
</aside>

## List items (no callbacks)

<a id="opIdlistItems"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /items \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /items`

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

# Schemas

<h2 id="tocS_OrderRequest">OrderRequest</h2>
<!-- backwards compatibility -->
<a id="schemaorderrequest"></a>
<a id="schema_OrderRequest"></a>
<a id="tocSorderrequest"></a>
<a id="tocsorderrequest"></a>

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

<h2 id="tocS_Order">Order</h2>
<!-- backwards compatibility -->
<a id="schemaorder"></a>
<a id="schema_Order"></a>
<a id="tocSorder"></a>
<a id="tocsorder"></a>

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

<h2 id="tocS_OrderEvent">OrderEvent</h2>
<!-- backwards compatibility -->
<a id="schemaorderevent"></a>
<a id="schema_OrderEvent"></a>
<a id="tocSorderevent"></a>
<a id="tocsorderevent"></a>

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

<h2 id="tocS_PaymentRequest">PaymentRequest</h2>
<!-- backwards compatibility -->
<a id="schemapaymentrequest"></a>
<a id="schema_PaymentRequest"></a>
<a id="tocSpaymentrequest"></a>
<a id="tocspaymentrequest"></a>

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

<h2 id="tocS_Payment">Payment</h2>
<!-- backwards compatibility -->
<a id="schemapayment"></a>
<a id="schema_Payment"></a>
<a id="tocSpayment"></a>
<a id="tocspayment"></a>

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

<h2 id="tocS_PaymentEvent">PaymentEvent</h2>
<!-- backwards compatibility -->
<a id="schemapaymentevent"></a>
<a id="schema_PaymentEvent"></a>
<a id="tocSpaymentevent"></a>
<a id="tocspaymentevent"></a>

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
