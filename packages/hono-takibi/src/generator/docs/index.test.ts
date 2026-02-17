import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../openapi/index.js'
import { makeDocs } from './index.js'

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const minimalOpenAPI: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'Test API', version: '1.0.0' },
  paths: {
    '/health': {
      get: {
        operationId: 'getHealth',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { status: { type: 'string' } } },
              },
            },
          },
        },
      },
    },
  },
}

const openAPIWithServers: OpenAPI = {
  ...minimalOpenAPI,
  // biome-ignore lint/suspicious/noExplicitAny: OpenAPI Server type requires name field but test only needs url
  servers: [{ url: 'https://petstore3.swagger.io/api/v3' }] as any,
}

const postOpenAPI: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'Test API', version: '1.0.0' },
  paths: {
    '/users': {
      post: {
        operationId: 'createUser',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}

const postOpenAPIWithExample: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'Test API', version: '1.0.0' },
  paths: {
    '/users': {
      post: {
        operationId: 'createUser',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Alice' },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Created',
          },
        },
      },
    },
  },
}

// ---------------------------------------------------------------------------
// Expected: hono GET /health
// ---------------------------------------------------------------------------

const expectedHonoGet = (pPath: string) =>
  `<h1 id="test-api">Test API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="test-api-default">Default</h1>

## getHealth

<a id="opIdgetHealth"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P ${pPath} \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /health\`

> Example responses

> 200 Response

\`\`\`json
{
  "status": "string"
}
\`\`\`

<h3 id="gethealth-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="gethealth-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`

const expectedHonoGetWithServers = (pPath: string) =>
  `<h1 id="test-api">Test API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Base URLs:

* <a href="https://petstore3.swagger.io/api/v3">https://petstore3.swagger.io/api/v3</a>

<h1 id="test-api-default">Default</h1>

## getHealth

<a id="opIdgetHealth"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P ${pPath} \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /health\`

> Example responses

> 200 Response

\`\`\`json
{
  "status": "string"
}
\`\`\`

<h3 id="gethealth-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="gethealth-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`

// ---------------------------------------------------------------------------
// Expected: hono POST /users
// ---------------------------------------------------------------------------

const expectedHonoPost = `<h1 id="test-api">Test API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="test-api-default">Default</h1>

## createUser

<a id="opIdcreateUser"></a>

> Code samples

\`\`\`bash
hono request \\
  -X POST \\
  -P /users \\
  -H 'Content-Type: application/json' \\
  -H 'Accept: application/json' \\
  -d '{
    "name": "string"
  }' \\
  src/index.ts
\`\`\`

\`POST /users\`

> Body parameter

\`\`\`json
{
  "name": "string"
}
\`\`\`

<h3 id="createuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» name|body|string|false|none|

> Example responses

> 201 Response

\`\`\`json
{
  "id": 0,
  "name": "string"
}
\`\`\`

<h3 id="createuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|Inline|

<h3 id="createuser-responseschema">Response Schema</h3>

Status Code **201**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|
|name|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`

// ---------------------------------------------------------------------------
// Expected: hono POST /users with schema.example
// ---------------------------------------------------------------------------

const expectedHonoPostWithExample = `<h1 id="test-api">Test API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="test-api-default">Default</h1>

## createUser

<a id="opIdcreateUser"></a>

> Code samples

\`\`\`bash
hono request \\
  -X POST \\
  -P /users \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "Alice"
  }' \\
  src/index.ts
\`\`\`

\`POST /users\`

> Body parameter

\`\`\`json
{
  "name": "Alice"
}
\`\`\`

<h3 id="createuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» name|body|string|false|none|

<h3 id="createuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|None|

<aside class="success">
This operation does not require authentication
</aside>
`

// ---------------------------------------------------------------------------
// Expected: curl GET /health
// ---------------------------------------------------------------------------

const expectedCurlGetHealth = (url: string) =>
  `<h1 id="test-api">Test API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="test-api-default">Default</h1>

## getHealth

<a id="opIdgetHealth"></a>

> Code samples

\`\`\`bash
curl ${url} \\
  -H 'Accept: application/json'
\`\`\`

\`GET /health\`

> Example responses

> 200 Response

\`\`\`json
{
  "status": "string"
}
\`\`\`

<h3 id="gethealth-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="gethealth-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`

// ---------------------------------------------------------------------------
// Expected: curl POST /users
// ---------------------------------------------------------------------------

const expectedCurlPostUsers = (url: string) =>
  `<h1 id="test-api">Test API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="test-api-default">Default</h1>

## createUser

<a id="opIdcreateUser"></a>

> Code samples

\`\`\`bash
curl ${url} \\
  -X POST \\
  -H 'Content-Type: application/json' \\
  -H 'Accept: application/json' \\
  -d '{
    "name": "string"
  }'
\`\`\`

\`POST /users\`

> Body parameter

\`\`\`json
{
  "name": "string"
}
\`\`\`

<h3 id="createuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» name|body|string|false|none|

> Example responses

> 201 Response

\`\`\`json
{
  "id": 0,
  "name": "string"
}
\`\`\`

<h3 id="createuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|Inline|

<h3 id="createuser-responseschema">Response Schema</h3>

Status Code **201**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|
|name|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`

// ---------------------------------------------------------------------------
// Fixtures: curl path parameters
// ---------------------------------------------------------------------------

const pathParamGetOpenAPI: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'Test API', version: '1.0.0' },
  paths: {
    '/tasks/{taskId}': {
      get: {
        operationId: 'getTask',
        parameters: [{ name: 'taskId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { id: { type: 'string' }, title: { type: 'string' } },
                },
              },
            },
          },
        },
      },
    },
  },
}

const putOpenAPI: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'Test API', version: '1.0.0' },
  paths: {
    '/tasks/{taskId}': {
      put: {
        operationId: 'updateTask',
        parameters: [{ name: 'taskId', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  status: { type: 'string', enum: ['pending', 'done'] },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Updated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    title: { type: 'string' },
                    status: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}

const nestedBodyOpenAPI: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'Test API', version: '1.0.0' },
  paths: {
    '/tasks': {
      post: {
        operationId: 'createTask',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  status: { type: 'string', enum: ['pending'] },
                  tags: { type: 'array', items: { type: 'string' } },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Created' },
        },
      },
    },
  },
}

const noResponseGetOpenAPI: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'Test API', version: '1.0.0' },
  paths: {
    '/ping': {
      get: {
        operationId: 'ping',
        responses: {
          '204': { description: 'No Content' },
        },
      },
    },
  },
}

// ---------------------------------------------------------------------------
// Expected: curl GET /tasks/{taskId} (path parameter URL quoting)
// ---------------------------------------------------------------------------

const expectedCurlGetPathParam = `<h1 id="test-api">Test API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="test-api-default">Default</h1>

## getTask

<a id="opIdgetTask"></a>

> Code samples

\`\`\`bash
curl 'http://localhost:5173/tasks/{taskId}' \\
  -H 'Accept: application/json'
\`\`\`

\`GET /tasks/{taskId}\`

<h3 id="gettask-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|taskId|path|string|true|none|

> Example responses

> 200 Response

\`\`\`json
{
  "id": "string",
  "title": "string"
}
\`\`\`

<h3 id="gettask-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="gettask-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|title|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`

// ---------------------------------------------------------------------------
// Expected: curl PUT /tasks/{taskId} (path param + body + indentation)
// ---------------------------------------------------------------------------

const expectedCurlPutPathParam = `<h1 id="test-api">Test API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="test-api-default">Default</h1>

## updateTask

<a id="opIdupdateTask"></a>

> Code samples

\`\`\`bash
curl 'http://localhost:5173/tasks/{taskId}' \\
  -X PUT \\
  -H 'Content-Type: application/json' \\
  -H 'Accept: application/json' \\
  -d '{
    "title": "string",
    "description": "string",
    "status": "pending"
  }'
\`\`\`

\`PUT /tasks/{taskId}\`

> Body parameter

\`\`\`json
{
  "title": "string",
  "description": "string",
  "status": "pending"
}
\`\`\`

<h3 id="updatetask-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|taskId|path|string|true|none|
|body|body|object|false|none|
|» title|body|string|false|none|
|» description|body|string|false|none|
|» status|body|string|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|» status|pending|
|» status|done|

> Example responses

> 200 Response

\`\`\`json
{
  "id": "string",
  "title": "string",
  "status": "string"
}
\`\`\`

<h3 id="updatetask-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Updated|Inline|

<h3 id="updatetask-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|title|string|false|none|none|
|status|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`

// ---------------------------------------------------------------------------
// Expected: curl POST /tasks (nested body with array)
// ---------------------------------------------------------------------------

const expectedCurlPostNested = `<h1 id="test-api">Test API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="test-api-default">Default</h1>

## createTask

<a id="opIdcreateTask"></a>

> Code samples

\`\`\`bash
curl http://localhost:5173/tasks \\
  -X POST \\
  -H 'Content-Type: application/json' \\
  -d '{
    "title": "string",
    "description": "string",
    "status": "pending",
    "tags": [
      "string"
    ]
  }'
\`\`\`

\`POST /tasks\`

> Body parameter

\`\`\`json
{
  "title": "string",
  "description": "string",
  "status": "pending",
  "tags": [
    "string"
  ]
}
\`\`\`

<h3 id="createtask-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» title|body|string|false|none|
|» description|body|string|false|none|
|» status|body|string|false|none|
|» tags|body|[string]|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|» status|pending|

<h3 id="createtask-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|None|

<aside class="success">
This operation does not require authentication
</aside>
`

// ---------------------------------------------------------------------------
// Expected: curl GET /ping (no JSON response → URL only)
// ---------------------------------------------------------------------------

const expectedCurlPing = `<h1 id="test-api">Test API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="test-api-default">Default</h1>

## ping

<a id="opIdping"></a>

> Code samples

\`\`\`bash
curl http://localhost:5173/ping
\`\`\`

\`GET /ping\`

<h3 id="ping-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|No Content|No Content|None|

<aside class="success">
This operation does not require authentication
</aside>
`

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('makeDocs', () => {
  describe('hono (default)', () => {
    describe('basePath: "/"', () => {
      it('generates docs with -P /health (no servers)', () => {
        expect(makeDocs(minimalOpenAPI, 'src/index.ts', '/')).toBe(expectedHonoGet('/health'))
      })

      it('generates docs with -P /health (with servers)', () => {
        expect(makeDocs(openAPIWithServers, 'src/index.ts', '/')).toBe(
          expectedHonoGetWithServers('/health'),
        )
      })
    })

    describe('basePath: "/api"', () => {
      it('generates docs with -P /api/health (no servers)', () => {
        expect(makeDocs(minimalOpenAPI, 'src/index.ts', '/api')).toBe(
          expectedHonoGet('/api/health'),
        )
      })

      it('generates docs with -P /api/health (with servers)', () => {
        expect(makeDocs(openAPIWithServers, 'src/index.ts', '/api')).toBe(
          expectedHonoGetWithServers('/api/health'),
        )
      })
    })

    describe('basePath: "/api/v3"', () => {
      it('generates docs with -P /api/v3/health (no servers)', () => {
        expect(makeDocs(minimalOpenAPI, 'src/index.ts', '/api/v3')).toBe(
          expectedHonoGet('/api/v3/health'),
        )
      })

      it('generates docs with -P /api/v3/health (with servers)', () => {
        expect(makeDocs(openAPIWithServers, 'src/index.ts', '/api/v3')).toBe(
          expectedHonoGetWithServers('/api/v3/health'),
        )
      })
    })

    describe('basePath: undefined (fallback to "/")', () => {
      it('generates docs with -P /health when basePath is undefined', () => {
        // biome-ignore lint/suspicious/noExplicitAny: testing runtime fallback for undefined basePath
        expect(makeDocs(minimalOpenAPI, 'src/index.ts', undefined as any)).toBe(
          expectedHonoGet('/health'),
        )
      })
    })

    describe('-d flag for request body', () => {
      it('generates -d flag with pretty-printed request body', () => {
        expect(makeDocs(postOpenAPI, 'src/index.ts', '/')).toBe(expectedHonoPost)
      })

      it('prioritizes schema.example for -d value', () => {
        expect(makeDocs(postOpenAPIWithExample, 'src/index.ts', '/')).toBe(
          expectedHonoPostWithExample,
        )
      })
    })
  })

  describe('curl', () => {
    it('generates curl GET without -d flag', () => {
      expect(makeDocs(minimalOpenAPI, 'src/index.ts', '/', 'curl', 'http://localhost:5173')).toBe(
        expectedCurlGetHealth('http://localhost:5173/health'),
      )
    })

    it('generates curl POST with -d flag', () => {
      expect(makeDocs(postOpenAPI, 'src/index.ts', '/', 'curl', 'http://localhost:5173')).toBe(
        expectedCurlPostUsers('http://localhost:5173/users'),
      )
    })

    it('generates curl POST with basePath in URL', () => {
      expect(makeDocs(postOpenAPI, 'src/index.ts', '/api', 'curl', 'http://localhost:5173')).toBe(
        expectedCurlPostUsers('http://localhost:5173/api/users'),
      )
    })

    describe('GET omits -X GET', () => {
      it('generates curl GET with path parameter (quoted URL, no -X GET)', () => {
        expect(
          makeDocs(pathParamGetOpenAPI, 'src/index.ts', '/', 'curl', 'http://localhost:5173'),
        ).toBe(expectedCurlGetPathParam)
      })

      it('generates curl GET without -X GET (no path params)', () => {
        expect(makeDocs(minimalOpenAPI, 'src/index.ts', '/', 'curl', 'http://localhost:5173')).toBe(
          expectedCurlGetHealth('http://localhost:5173/health'),
        )
      })
    })

    describe('PUT with path parameter and body', () => {
      it('generates curl PUT with quoted URL and indented -d body', () => {
        expect(makeDocs(putOpenAPI, 'src/index.ts', '/', 'curl', 'http://localhost:5173')).toBe(
          expectedCurlPutPathParam,
        )
      })
    })

    describe('nested body indentation', () => {
      it('generates curl POST with properly indented nested body', () => {
        expect(
          makeDocs(nestedBodyOpenAPI, 'src/index.ts', '/', 'curl', 'http://localhost:5173'),
        ).toBe(expectedCurlPostNested)
      })
    })

    describe('GET with no JSON response', () => {
      it('generates curl GET with URL only (no flags)', () => {
        expect(
          makeDocs(noResponseGetOpenAPI, 'src/index.ts', '/', 'curl', 'http://localhost:5173'),
        ).toBe(expectedCurlPing)
      })
    })
  })
})
