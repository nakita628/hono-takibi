<h1 id="composition-keywords-api">Composition Keywords API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Comprehensive test for oneOf, anyOf, allOf, not composition keywords

<h1 id="composition-keywords-api-default">Default</h1>

## postOneOf

<a id="opIdpostOneOf"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /one-of \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  src/index.ts
```

`POST /one-of`

> Body parameter

```json
{
  "type": "string",
  "cardNumber": "string",
  "expiry": "string"
}
```

<h3 id="postoneof-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[PaymentMethod](#schemapaymentmethod)|true|none|

> Example responses

> 200 Response

```json
{
  "type": "string",
  "cardNumber": "string",
  "expiry": "string"
}
```

<h3 id="postoneof-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[PaymentMethod](#schemapaymentmethod)|

<aside class="success">
This operation does not require authentication
</aside>

## postAnyOf

<a id="opIdpostAnyOf"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /any-of \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  src/index.ts
```

`POST /any-of`

> Body parameter

```json
{
  "keyword": "string"
}
```

<h3 id="postanyof-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SearchFilter](#schemasearchfilter)|true|none|

> Example responses

> 200 Response

```json
{
  "keyword": "string"
}
```

<h3 id="postanyof-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[SearchFilter](#schemasearchfilter)|

<aside class="success">
This operation does not require authentication
</aside>

## postAllOf

<a id="opIdpostAllOf"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /all-of \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  src/index.ts
```

`POST /all-of`

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

<h3 id="postallof-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Employee](#schemaemployee)|true|none|

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

<h3 id="postallof-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[Employee](#schemaemployee)|

<aside class="success">
This operation does not require authentication
</aside>

## postNot

<a id="opIdpostNot"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /not \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  src/index.ts
```

`POST /not`

> Body parameter

```json
null
```

<h3 id="postnot-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[NotStringValue](#schemanotstringvalue)|true|none|

> Example responses

> 200 Response

```json
null
```

<h3 id="postnot-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[NotStringValue](#schemanotstringvalue)|

<aside class="success">
This operation does not require authentication
</aside>

## getNotRef

<a id="opIdgetNotRef"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /not-ref \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /not-ref`

> Example responses

> 200 Response

```json
null
```

<h3 id="getnotref-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[NotAdmin](#schemanotadmin)|

<aside class="success">
This operation does not require authentication
</aside>

## getNotEnum

<a id="opIdgetNotEnum"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /not-enum \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /not-enum`

> Example responses

> 200 Response

```json
null
```

<h3 id="getnotenum-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[NotDraftOrArchived](#schemanotdraftorarchived)|

<aside class="success">
This operation does not require authentication
</aside>

## getNotConst

<a id="opIdgetNotConst"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /not-const \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /not-const`

> Example responses

> 200 Response

```json
null
```

<h3 id="getnotconst-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[NotSpecificValue](#schemanotspecificvalue)|

<aside class="success">
This operation does not require authentication
</aside>

## getNotComposition

<a id="opIdgetNotComposition"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /not-composition \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /not-composition`

> Example responses

> 200 Response

```json
null
```

<h3 id="getnotcomposition-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[NotStringOrNumber](#schemanotstringornumber)|

<aside class="success">
This operation does not require authentication
</aside>

## getAllOfSibling

<a id="opIdgetAllOfSibling"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /all-of-sibling \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /all-of-sibling`

> Example responses

> 200 Response

```json
{
  "id": 0,
  "createdAt": "1970-01-01T00:00:00Z"
}
```

<h3 id="getallofsibling-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[ExtendedWithSibling](#schemaextendedwithsibling)|

<aside class="success">
This operation does not require authentication
</aside>

## getNullableOneOf

<a id="opIdgetNullableOneOf"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /nullable-one-of \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /nullable-one-of`

> Example responses

> 200 Response

```json
{
  "type": "string",
  "cardNumber": "string",
  "expiry": "string"
}
```

<h3 id="getnullableoneof-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[NullablePayment](#schemanullablepayment)|

<aside class="success">
This operation does not require authentication
</aside>

## getAnyOfThree

<a id="opIdgetAnyOfThree"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /any-of-three \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /any-of-three`

> Example responses

> 200 Response

```json
"string"
```

<h3 id="getanyofthree-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[FlexibleId](#schemaflexibleid)|

<aside class="success">
This operation does not require authentication
</aside>

## getAnyOfRef

<a id="opIdgetAnyOfRef"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /any-of-ref \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /any-of-ref`

> Example responses

> 200 Response

```json
{
  "name": "string",
  "purring": true
}
```

<h3 id="getanyofref-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[PetChoice](#schemapetchoice)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_CreditCard">CreditCard</h2>
<!-- backwards compatibility -->
<a id="schemacreditcard"></a>
<a id="schema_CreditCard"></a>
<a id="tocScreditcard"></a>
<a id="tocscreditcard"></a>

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

<h2 id="tocS_BankTransfer">BankTransfer</h2>
<!-- backwards compatibility -->
<a id="schemabanktransfer"></a>
<a id="schema_BankTransfer"></a>
<a id="tocSbanktransfer"></a>
<a id="tocsbanktransfer"></a>

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

<h2 id="tocS_PaymentMethod">PaymentMethod</h2>
<!-- backwards compatibility -->
<a id="schemapaymentmethod"></a>
<a id="schema_PaymentMethod"></a>
<a id="tocSpaymentmethod"></a>
<a id="tocspaymentmethod"></a>

```json
{
  "type": "string",
  "cardNumber": "string",
  "expiry": "string"
}
```

<h2 id="tocS_NullablePayment">NullablePayment</h2>
<!-- backwards compatibility -->
<a id="schemanullablepayment"></a>
<a id="schema_NullablePayment"></a>
<a id="tocSnullablepayment"></a>
<a id="tocsnullablepayment"></a>

```json
{
  "type": "string",
  "cardNumber": "string",
  "expiry": "string"
}
```

<h2 id="tocS_SearchFilter">SearchFilter</h2>
<!-- backwards compatibility -->
<a id="schemasearchfilter"></a>
<a id="schema_SearchFilter"></a>
<a id="tocSsearchfilter"></a>
<a id="tocssearchfilter"></a>

```json
{
  "keyword": "string"
}
```

<h2 id="tocS_FlexibleId">FlexibleId</h2>
<!-- backwards compatibility -->
<a id="schemaflexibleid"></a>
<a id="schema_FlexibleId"></a>
<a id="tocSflexibleid"></a>
<a id="tocsflexibleid"></a>

```json
"string"
```

<h2 id="tocS_Cat">Cat</h2>
<!-- backwards compatibility -->
<a id="schemacat"></a>
<a id="schema_Cat"></a>
<a id="tocScat"></a>
<a id="tocscat"></a>

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

<h2 id="tocS_Dog">Dog</h2>
<!-- backwards compatibility -->
<a id="schemadog"></a>
<a id="schema_Dog"></a>
<a id="tocSdog"></a>
<a id="tocsdog"></a>

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

<h2 id="tocS_PetChoice">PetChoice</h2>
<!-- backwards compatibility -->
<a id="schemapetchoice"></a>
<a id="schema_PetChoice"></a>
<a id="tocSpetchoice"></a>
<a id="tocspetchoice"></a>

```json
{
  "name": "string",
  "purring": true
}
```

<h2 id="tocS_Person">Person</h2>
<!-- backwards compatibility -->
<a id="schemaperson"></a>
<a id="schema_Person"></a>
<a id="tocSperson"></a>
<a id="tocsperson"></a>

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

<h2 id="tocS_EmployeeInfo">EmployeeInfo</h2>
<!-- backwards compatibility -->
<a id="schemaemployeeinfo"></a>
<a id="schema_EmployeeInfo"></a>
<a id="tocSemployeeinfo"></a>
<a id="tocsemployeeinfo"></a>

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

<h2 id="tocS_Employee">Employee</h2>
<!-- backwards compatibility -->
<a id="schemaemployee"></a>
<a id="schema_Employee"></a>
<a id="tocSemployee"></a>
<a id="tocsemployee"></a>

```json
{
  "name": "string",
  "email": "user@example.com",
  "employeeId": 0,
  "department": "string",
  "startDate": "1970-01-01"
}
```

<h2 id="tocS_BaseEntity">BaseEntity</h2>
<!-- backwards compatibility -->
<a id="schemabaseentity"></a>
<a id="schema_BaseEntity"></a>
<a id="tocSbaseentity"></a>
<a id="tocsbaseentity"></a>

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

<h2 id="tocS_ExtendedWithSibling">ExtendedWithSibling</h2>
<!-- backwards compatibility -->
<a id="schemaextendedwithsibling"></a>
<a id="schema_ExtendedWithSibling"></a>
<a id="tocSextendedwithsibling"></a>
<a id="tocsextendedwithsibling"></a>

```json
{
  "id": 0,
  "createdAt": "1970-01-01T00:00:00Z"
}
```

<h2 id="tocS_NotStringValue">NotStringValue</h2>
<!-- backwards compatibility -->
<a id="schemanotstringvalue"></a>
<a id="schema_NotStringValue"></a>
<a id="tocSnotstringvalue"></a>
<a id="tocsnotstringvalue"></a>

```json
null
```

<h2 id="tocS_NotAdmin">NotAdmin</h2>
<!-- backwards compatibility -->
<a id="schemanotadmin"></a>
<a id="schema_NotAdmin"></a>
<a id="tocSnotadmin"></a>
<a id="tocsnotadmin"></a>

```json
null
```

<h2 id="tocS_AdminRole">AdminRole</h2>
<!-- backwards compatibility -->
<a id="schemaadminrole"></a>
<a id="schema_AdminRole"></a>
<a id="tocSadminrole"></a>
<a id="tocsadminrole"></a>

```json
{
  "role": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|role|string|true|none|none|

<h2 id="tocS_NotDraftOrArchived">NotDraftOrArchived</h2>
<!-- backwards compatibility -->
<a id="schemanotdraftorarchived"></a>
<a id="schema_NotDraftOrArchived"></a>
<a id="tocSnotdraftorarchived"></a>
<a id="tocsnotdraftorarchived"></a>

```json
null
```

<h2 id="tocS_NotSpecificValue">NotSpecificValue</h2>
<!-- backwards compatibility -->
<a id="schemanotspecificvalue"></a>
<a id="schema_NotSpecificValue"></a>
<a id="tocSnotspecificvalue"></a>
<a id="tocsnotspecificvalue"></a>

```json
null
```

<h2 id="tocS_NotStringOrNumber">NotStringOrNumber</h2>
<!-- backwards compatibility -->
<a id="schemanotstringornumber"></a>
<a id="schema_NotStringOrNumber"></a>
<a id="tocSnotstringornumber"></a>
<a id="tocsnotstringornumber"></a>

```json
null
```
