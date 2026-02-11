# Schema Edge Cases API v1.0.0

- `/nullable` [POST](#postnullable)
- `/discriminated` [POST](#postdiscriminated)
- `/composed` [GET](#getcomposed)
- `/deep-nested` [GET](#getdeepnested)
- `/additional-props` [GET](#getadditionalprops)

## postNullable

`POST /nullable`

> Code samples

```bash
hono request \
  -P /nullable \
  -X POST \
  -d '{"name":"string"}' \
  src/index.ts
```

> Body parameter

```json
{
  "name": "string"
}
```

### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| name | body | string | true | none |
| nickname | body | string | null | false | none |
| age | body | integer | null | false | none |
| tags | body | array | null | false | none |

> Example responses

> 200 Response

```json
{
  "name": "string"
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
| name | string | true | none |
| nickname | string | null | false | none |
| age | integer | null | false | none |
| tags | array | null | false | none |

> This operation does not require authentication

## postDiscriminated

`POST /discriminated`

> Code samples

```bash
hono request \
  -P /discriminated \
  -X POST \
  -d 'null' \
  src/index.ts
```

> Body parameter

```json
null
```

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

## getComposed

`GET /composed`

> Code samples

```bash
hono request \
  -P /composed \
  -X GET \
  src/index.ts
```

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

## getDeepNested

`GET /deep-nested`

> Code samples

```bash
hono request \
  -P /deep-nested \
  -X GET \
  src/index.ts
```

> Example responses

> 200 Response

```json
{
  "level2": {
    "level3": {
      "value": "string"
    }
  }
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
| level2 | object | true | none |
| level2.level3 | object | true | none |
| level2.level3.value | string | true | none |

> This operation does not require authentication

## getAdditionalProps

`GET /additional-props`

> Code samples

```bash
hono request \
  -P /additional-props \
  -X GET \
  src/index.ts
```

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
