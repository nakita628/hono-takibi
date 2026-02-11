# Minimal API v1.0.0

- `/health` [GET](#gethealth)

## getHealth

`GET /health`

> Code samples

```bash
hono request \
  -P /health \
  -X GET \
  src/index.ts
```

> Example responses

> 200 Response

```json
{
  "status": "string"
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
| status | string | true | none |

> This operation does not require authentication
