# Array & Object Constraints API v1.0.0

- `/tags` [GET](#gettags) [POST](#createtag)
- `/settings` [GET](#getsettings) [PUT](#updatesettings)
- `/config` [POST](#createconfig)
- `/payment` [POST](#createpayment)

## getTags

`GET /tags`

> Code samples

```bash
hono request \
  -P /tags \
  -X GET \
  src/index.ts
```

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

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |

### Response Schema

Status Code **200**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| tags | array | true | none |
| ids | array | true | none |
| labels | array | true | none |

> This operation does not require authentication

## createTag

`POST /tags`

> Code samples

```bash
hono request \
  -P /tags \
  -X POST \
  -d '{"metadata":{}}' \
  src/index.ts
```

> Body parameter

```json
{
  "metadata": {}
}
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| metadata | body | object | true | none |
| config | body | object | false | none |
| limited | body | object | false | none |

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 201 | Created | None |

> This operation does not require authentication

## getSettings

`GET /settings`

> Code samples

```bash
hono request \
  -P /settings \
  -X GET \
  src/index.ts
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| filter | query | string | false | none |

> Example responses

> 200 Response

```json
null
```

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | Inline |

> This operation does not require authentication

## updateSettings

`PUT /settings`

> Code samples

```bash
hono request \
  -P /settings \
  -X PUT \
  -d '{"avatar":"string"}' \
  src/index.ts
```

> Body parameter

```json
{
  "avatar": "string"
}
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| avatar | body | string | true | none |

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | None |

> This operation does not require authentication

## createConfig

`POST /config`

> Code samples

```bash
hono request \
  -P /config \
  -X POST \
  -d '{"data":null}' \
  src/index.ts
```

> Body parameter

```json
{
  "data": null
}
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| data | body | object | true | none |
| headers | body | object | false | none |
| keys | body | object | false | none |

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 201 | Created | None |

> This operation does not require authentication

## createPayment

`POST /payment`

> Code samples

```bash
hono request \
  -P /payment \
  -X POST \
  -d '{}' \
  src/index.ts
```

> Body parameter

```json
{}
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| creditCard | body | string | false | none |
| billingAddress | body | string | false | none |
| email | body | string | false | none |

### Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 201 | Created | None |

> This operation does not require authentication
