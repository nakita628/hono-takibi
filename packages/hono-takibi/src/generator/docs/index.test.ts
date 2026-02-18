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
      expect(makeDocs(minimalOpenAPI, 'src/index.ts', '/', true, 'http://localhost:5173')).toBe(
        expectedCurlGetHealth('http://localhost:5173/health'),
      )
    })

    it('generates curl POST with -d flag', () => {
      expect(makeDocs(postOpenAPI, 'src/index.ts', '/', true, 'http://localhost:5173')).toBe(
        expectedCurlPostUsers('http://localhost:5173/users'),
      )
    })

    it('generates curl POST with basePath in URL', () => {
      expect(makeDocs(postOpenAPI, 'src/index.ts', '/api', true, 'http://localhost:5173')).toBe(
        expectedCurlPostUsers('http://localhost:5173/api/users'),
      )
    })

    describe('GET omits -X GET', () => {
      it('generates curl GET with path parameter (quoted URL, no -X GET)', () => {
        expect(
          makeDocs(pathParamGetOpenAPI, 'src/index.ts', '/', true, 'http://localhost:5173'),
        ).toBe(expectedCurlGetPathParam)
      })

      it('generates curl GET without -X GET (no path params)', () => {
        expect(makeDocs(minimalOpenAPI, 'src/index.ts', '/', true, 'http://localhost:5173')).toBe(
          expectedCurlGetHealth('http://localhost:5173/health'),
        )
      })
    })

    describe('PUT with path parameter and body', () => {
      it('generates curl PUT with quoted URL and indented -d body', () => {
        expect(makeDocs(putOpenAPI, 'src/index.ts', '/', true, 'http://localhost:5173')).toBe(
          expectedCurlPutPathParam,
        )
      })
    })

    describe('nested body indentation', () => {
      it('generates curl POST with properly indented nested body', () => {
        expect(
          makeDocs(nestedBodyOpenAPI, 'src/index.ts', '/', true, 'http://localhost:5173'),
        ).toBe(expectedCurlPostNested)
      })
    })

    describe('GET with no JSON response', () => {
      it('generates curl GET with URL only (no flags)', () => {
        expect(
          makeDocs(noResponseGetOpenAPI, 'src/index.ts', '/', true, 'http://localhost:5173'),
        ).toBe(expectedCurlPing)
      })
    })
  })

  // -------------------------------------------------------------------------
  // Extended test patterns (toBe with full expected output)
  // -------------------------------------------------------------------------

  describe('$ref schemas', () => {
    const refOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Ref API', version: '1.0.0' },
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              name: { type: 'string' },
            },
          },
        },
      },
      paths: {
        '/users/{id}': {
          get: {
            operationId: 'getUser',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
        },
      },
    }

    const expected = `<h1 id="ref-api">Ref API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="ref-api-default">Default</h1>

## getUser

<a id="opIdgetUser"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /users/{id} \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /users/{id}\`

<h3 id="getuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|

> Example responses

> 200 Response

\`\`\`json
{
  "id": 0,
  "name": "string"
}
\`\`\`

<h3 id="getuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[User](#schemauser)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

\`\`\`json
{
  "id": 0,
  "name": "string"
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|
|name|string|false|none|none|
`

    it('generates full docs for $ref response schema', () => {
      expect(makeDocs(refOpenAPI)).toBe(expected)
    })
  })

  describe('allOf composition', () => {
    const allOfOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'AllOf API', version: '1.0.0' },
      components: {
        schemas: {
          Base: { type: 'object', properties: { id: { type: 'integer' } } },
          Extended: {
            allOf: [
              { $ref: '#/components/schemas/Base' },
              { type: 'object', properties: { name: { type: 'string' } } },
            ],
          },
        },
      },
      paths: {
        '/items': {
          get: {
            operationId: 'getItems',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/Extended' } },
                },
              },
            },
          },
        },
      },
    }

    const expected = `<h1 id="allof-api">AllOf API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="allof-api-default">Default</h1>

## getItems

<a id="opIdgetItems"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /items \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /items\`

> Example responses

> 200 Response

\`\`\`json
{
  "id": 0,
  "name": "string"
}
\`\`\`

<h3 id="getitems-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[Extended](#schemaextended)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Base">Base</h2>
<!-- backwards compatibility -->
<a id="schemabase"></a>
<a id="schema_Base"></a>
<a id="tocSbase"></a>
<a id="tocsbase"></a>

\`\`\`json
{
  "id": 0
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|

<h2 id="tocS_Extended">Extended</h2>
<!-- backwards compatibility -->
<a id="schemaextended"></a>
<a id="schema_Extended"></a>
<a id="tocSextended"></a>
<a id="tocsextended"></a>

\`\`\`json
{
  "id": 0,
  "name": "string"
}
\`\`\`
`

    it('generates full docs for allOf composed schema', () => {
      expect(makeDocs(allOfOpenAPI)).toBe(expected)
    })
  })

  describe('oneOf schema', () => {
    const oneOfOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'OneOf API', version: '1.0.0' },
      paths: {
        '/shapes': {
          get: {
            operationId: 'getShape',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      oneOf: [
                        { type: 'object', properties: { radius: { type: 'number' } } },
                        {
                          type: 'object',
                          properties: { width: { type: 'number' }, height: { type: 'number' } },
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
    }

    const expected = `<h1 id="oneof-api">OneOf API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="oneof-api-default">Default</h1>

## getShape

<a id="opIdgetShape"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /shapes \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /shapes\`

> Example responses

> 200 Response

\`\`\`json
{
  "radius": 0
}
\`\`\`

<h3 id="getshape-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('generates full docs for oneOf schema', () => {
      expect(makeDocs(oneOfOpenAPI)).toBe(expected)
    })
  })

  describe('anyOf schema', () => {
    const anyOfOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'AnyOf API', version: '1.0.0' },
      paths: {
        '/values': {
          get: {
            operationId: 'getValue',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      anyOf: [
                        { type: 'object', properties: { flag: { type: 'boolean' } } },
                        { type: 'object', properties: { count: { type: 'integer' } } },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
    }

    const expected = `<h1 id="anyof-api">AnyOf API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="anyof-api-default">Default</h1>

## getValue

<a id="opIdgetValue"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /values \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /values\`

> Example responses

> 200 Response

\`\`\`json
{
  "flag": true
}
\`\`\`

<h3 id="getvalue-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('generates full docs for anyOf schema', () => {
      expect(makeDocs(anyOfOpenAPI)).toBe(expected)
    })
  })

  describe('array responses', () => {
    const arrayResponseOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Array API', version: '1.0.0' },
      paths: {
        '/items': {
          get: {
            operationId: 'listItems',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          label: { type: 'string' },
                        },
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

    const expected = `<h1 id="array-api">Array API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="array-api-default">Default</h1>

## listItems

<a id="opIdlistItems"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /items \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /items\`

> Example responses

> 200 Response

\`\`\`json
[
  {
    "id": 0,
    "label": "string"
  }
]
\`\`\`

<h3 id="listitems-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="listitems-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[object]|false|none|none|
|» id|integer|false|none|none|
|» label|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('generates full docs for array response', () => {
      expect(makeDocs(arrayResponseOpenAPI)).toBe(expected)
    })
  })

  describe('bearer authentication', () => {
    const bearerAuthOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Auth API', version: '1.0.0' },
      components: {
        securitySchemes: {
          bearerAuth: { type: 'http', scheme: 'bearer' },
        },
      },
      security: [{ bearerAuth: [] }],
      paths: {
        '/me': {
          get: {
            operationId: 'getMe',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: { type: 'object', properties: { name: { type: 'string' } } },
                  },
                },
              },
            },
          },
        },
      },
    }

    const expected = `<h1 id="auth-api">Auth API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Authentication

- HTTP Authentication, scheme: bearer

<h1 id="auth-api-default">Default</h1>

## getMe

<a id="opIdgetMe"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /me \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /me\`

> Example responses

> 200 Response

\`\`\`json
{
  "name": "string"
}
\`\`\`

<h3 id="getme-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="getme-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>
`

    it('generates full docs with bearer auth', () => {
      expect(makeDocs(bearerAuthOpenAPI)).toBe(expected)
    })
  })

  describe('apiKey authentication', () => {
    const apiKeyAuthOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'ApiKey API', version: '1.0.0' },
      components: {
        securitySchemes: {
          apiKey: { type: 'apiKey', name: 'X-API-Key', in: 'header' },
        },
      },
      security: [{ apiKey: [] }],
      paths: {
        '/data': {
          get: {
            operationId: 'getData',
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }

    const expected = `<h1 id="apikey-api">ApiKey API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Authentication

* API Key (apiKey)
    - Parameter Name: **X-API-Key**, in: header.

<h1 id="apikey-api-default">Default</h1>

## getData

<a id="opIdgetData"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /data \\
  src/index.ts
\`\`\`

\`GET /data\`

<h3 id="getdata-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey
</aside>
`

    it('generates full docs with apiKey auth', () => {
      expect(makeDocs(apiKeyAuthOpenAPI)).toBe(expected)
    })
  })

  describe('tags', () => {
    const taggedOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Tagged API', version: '1.0.0' },
      tags: [
        { name: 'Users', description: 'User operations' },
        { name: 'Admin', description: 'Admin operations' },
      ],
      paths: {
        '/users': {
          get: {
            operationId: 'listUsers',
            tags: ['Users'],
            responses: { '200': { description: 'OK' } },
          },
        },
        '/admin/config': {
          get: {
            operationId: 'getConfig',
            tags: ['Admin'],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }

    const expected = `<h1 id="tagged-api">Tagged API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="tagged-api-users">Users</h1>

User operations

## listUsers

<a id="opIdlistUsers"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /users \\
  src/index.ts
\`\`\`

\`GET /users\`

<h3 id="listusers-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="tagged-api-admin">Admin</h1>

Admin operations

## getConfig

<a id="opIdgetConfig"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /admin/config \\
  src/index.ts
\`\`\`

\`GET /admin/config\`

<h3 id="getconfig-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('generates full docs with tag grouping', () => {
      expect(makeDocs(taggedOpenAPI)).toBe(expected)
    })
  })

  describe('info section', () => {
    const fullInfoOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: {
        title: 'Full Info API',
        version: '2.0.0',
        description: 'A comprehensive test API',
        contact: { name: 'API Support', email: 'support@example.com' },
        license: { name: 'MIT', url: 'https://opensource.org/licenses/MIT' },
      },
      paths: {},
    }

    const expected = `<h1 id="full-info-api">Full Info API v2.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

A comprehensive test API

Email: <a href="mailto:support@example.com">API Support</a> 
License: <a href="https://opensource.org/licenses/MIT">MIT</a>
`

    it('generates full docs with description, contact, and license', () => {
      expect(makeDocs(fullInfoOpenAPI)).toBe(expected)
    })
  })

  describe('circular self-reference', () => {
    const circularOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Circular API', version: '1.0.0' },
      components: {
        schemas: {
          TreeNode: {
            type: 'object',
            properties: {
              value: { type: 'string' },
              children: { type: 'array', items: { $ref: '#/components/schemas/TreeNode' } },
            },
          },
        },
      },
      paths: {
        '/tree': {
          get: {
            operationId: 'getTree',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/TreeNode' } },
                },
              },
            },
          },
        },
      },
    }

    const expected = `<h1 id="circular-api">Circular API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="circular-api-default">Default</h1>

## getTree

<a id="opIdgetTree"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /tree \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /tree\`

> Example responses

> 200 Response

\`\`\`json
{
  "value": "string",
  "children": [
    {}
  ]
}
\`\`\`

<h3 id="gettree-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[TreeNode](#schematreenode)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_TreeNode">TreeNode</h2>
<!-- backwards compatibility -->
<a id="schematreenode"></a>
<a id="schema_TreeNode"></a>
<a id="tocStreenode"></a>
<a id="tocstreenode"></a>

\`\`\`json
{
  "value": "string",
  "children": [
    {
      "value": "string",
      "children": [
        {}
      ]
    }
  ]
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|value|string|false|none|none|
|children|[[TreeNode](#schematreenode)]|false|none|none|
`

    it('generates full docs for self-referencing schema', () => {
      expect(makeDocs(circularOpenAPI)).toBe(expected)
    })
  })

  describe('mutual circular reference', () => {
    const mutualCircularOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Mutual API', version: '1.0.0' },
      components: {
        schemas: {
          Author: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              posts: { type: 'array', items: { $ref: '#/components/schemas/Post' } },
            },
          },
          Post: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              author: { $ref: '#/components/schemas/Author' },
            },
          },
        },
      },
      paths: {
        '/authors': {
          get: {
            operationId: 'listAuthors',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: { type: 'array', items: { $ref: '#/components/schemas/Author' } },
                  },
                },
              },
            },
          },
        },
      },
    }

    const expected = `<h1 id="mutual-api">Mutual API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="mutual-api-default">Default</h1>

## listAuthors

<a id="opIdlistAuthors"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /authors \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /authors\`

> Example responses

> 200 Response

\`\`\`json
[
  {
    "name": "string",
    "posts": [
      {
        "title": "string",
        "author": {}
      }
    ]
  }
]
\`\`\`

<h3 id="listauthors-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="listauthors-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Author](#schemaauthor)]|false|none|none|
|» name|string|false|none|none|
|» posts|[[Post](#schemapost)]|false|none|none|
|» » title|string|false|none|none|
|» » author|[Author](#schemaauthor)|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Author">Author</h2>
<!-- backwards compatibility -->
<a id="schemaauthor"></a>
<a id="schema_Author"></a>
<a id="tocSauthor"></a>
<a id="tocsauthor"></a>

\`\`\`json
{
  "name": "string",
  "posts": [
    {
      "title": "string",
      "author": {
        "name": "string",
        "posts": [
          {}
        ]
      }
    }
  ]
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
|posts|[[Post](#schemapost)]|false|none|none|

<h2 id="tocS_Post">Post</h2>
<!-- backwards compatibility -->
<a id="schemapost"></a>
<a id="schema_Post"></a>
<a id="tocSpost"></a>
<a id="tocspost"></a>

\`\`\`json
{
  "title": "string",
  "author": {
    "name": "string",
    "posts": [
      {
        "title": "string",
        "author": {}
      }
    ]
  }
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|false|none|none|
|author|[Author](#schemaauthor)|false|none|none|
`

    it('generates full docs for mutually referencing schemas', () => {
      expect(makeDocs(mutualCircularOpenAPI)).toBe(expected)
    })
  })

  describe('schema type formats', () => {
    const formatsOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Formats API', version: '1.0.0' },
      paths: {
        '/record': {
          get: {
            operationId: 'getRecord',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        email: { type: 'string', format: 'email' },
                        created: { type: 'string', format: 'date-time' },
                        age: { type: 'integer', format: 'int32' },
                        score: { type: 'number' },
                        active: { type: 'boolean' },
                        uuid: { type: 'string', format: 'uuid' },
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

    const expected = `<h1 id="formats-api">Formats API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="formats-api-default">Default</h1>

## getRecord

<a id="opIdgetRecord"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /record \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /record\`

> Example responses

> 200 Response

\`\`\`json
{
  "email": "user@example.com",
  "created": "1970-01-01T00:00:00Z",
  "age": 0,
  "score": 0,
  "active": true,
  "uuid": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
}
\`\`\`

<h3 id="getrecord-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="getrecord-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string(email)|false|none|none|
|created|string(date-time)|false|none|none|
|age|integer(int32)|false|none|none|
|score|number|false|none|none|
|active|boolean|false|none|none|
|uuid|string(uuid)|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('generates full docs with format types', () => {
      expect(makeDocs(formatsOpenAPI)).toBe(expected)
    })
  })

  describe('nested body with $ref', () => {
    const nestedRefBodyOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'NestedRef API', version: '1.0.0' },
      components: {
        schemas: {
          Address: {
            type: 'object',
            properties: { street: { type: 'string' }, city: { type: 'string' } },
          },
        },
      },
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
                      address: { $ref: '#/components/schemas/Address' },
                    },
                  },
                },
              },
            },
            responses: { '201': { description: 'Created' } },
          },
        },
      },
    }

    const expected = `<h1 id="nestedref-api">NestedRef API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="nestedref-api-default">Default</h1>

## createUser

<a id="opIdcreateUser"></a>

> Code samples

\`\`\`bash
hono request \\
  -X POST \\
  -P /users \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "string",
    "address": {
      "street": "string",
      "city": "string"
    }
  }' \\
  src/index.ts
\`\`\`

\`POST /users\`

> Body parameter

\`\`\`json
{
  "name": "string",
  "address": {
    "street": "string",
    "city": "string"
  }
}
\`\`\`

<h3 id="createuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» name|body|string|false|none|
|» address|body|[Address](#schemaaddress)|false|none|
|» »  street|body|string|false|none|
|» »  city|body|string|false|none|

<h3 id="createuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|None|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Address">Address</h2>
<!-- backwards compatibility -->
<a id="schemaaddress"></a>
<a id="schema_Address"></a>
<a id="tocSaddress"></a>
<a id="tocsaddress"></a>

\`\`\`json
{
  "street": "string",
  "city": "string"
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|street|string|false|none|none|
|city|string|false|none|none|
`

    it('generates full docs for nested request body with $ref', () => {
      expect(makeDocs(nestedRefBodyOpenAPI)).toBe(expected)
    })
  })

  describe('enum query parameter', () => {
    const enumQueryOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Enum API', version: '1.0.0' },
      paths: {
        '/tasks': {
          get: {
            operationId: 'listTasks',
            parameters: [
              {
                name: 'status',
                in: 'query',
                schema: { type: 'string', enum: ['open', 'closed', 'pending'] },
              },
            ],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }

    const expected = `<h1 id="enum-api">Enum API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="enum-api-default">Default</h1>

## listTasks

<a id="opIdlistTasks"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /tasks \\
  src/index.ts
\`\`\`

\`GET /tasks\`

<h3 id="listtasks-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|status|query|string|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|status|open|
|status|closed|
|status|pending|

<h3 id="listtasks-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('generates full docs with enum query parameter', () => {
      expect(makeDocs(enumQueryOpenAPI)).toBe(expected)
    })
  })

  describe('enum response', () => {
    const enumResponseOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'EnumResp API', version: '1.0.0' },
      paths: {
        '/status': {
          get: {
            operationId: 'getStatus',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: { state: { type: 'string', enum: ['active', 'inactive'] } },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }

    const expected = `<h1 id="enumresp-api">EnumResp API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="enumresp-api-default">Default</h1>

## getStatus

<a id="opIdgetStatus"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /status \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /status\`

> Example responses

> 200 Response

\`\`\`json
{
  "state": "active"
}
\`\`\`

<h3 id="getstatus-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="getstatus-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|state|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('generates full docs with enum in response', () => {
      expect(makeDocs(enumResponseOpenAPI)).toBe(expected)
    })
  })

  describe('multiple methods on same path', () => {
    const multiMethodOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Multi API', version: '1.0.0' },
      paths: {
        '/items': {
          get: {
            operationId: 'listItems',
            responses: { '200': { description: 'OK' } },
          },
          post: {
            operationId: 'createItem',
            requestBody: {
              content: {
                'application/json': {
                  schema: { type: 'object', properties: { name: { type: 'string' } } },
                },
              },
            },
            responses: { '201': { description: 'Created' } },
          },
        },
      },
    }

    const expected = `<h1 id="multi-api">Multi API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="multi-api-default">Default</h1>

## listItems

<a id="opIdlistItems"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /items \\
  src/index.ts
\`\`\`

\`GET /items\`

<h3 id="listitems-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## createItem

<a id="opIdcreateItem"></a>

> Code samples

\`\`\`bash
hono request \\
  -X POST \\
  -P /items \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "string"
  }' \\
  src/index.ts
\`\`\`

\`POST /items\`

> Body parameter

\`\`\`json
{
  "name": "string"
}
\`\`\`

<h3 id="createitem-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» name|body|string|false|none|

<h3 id="createitem-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|None|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('generates full docs for GET and POST on same path', () => {
      expect(makeDocs(multiMethodOpenAPI)).toBe(expected)
    })
  })

  describe('operation description', () => {
    const descOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Desc API', version: '1.0.0' },
      paths: {
        '/items': {
          get: {
            operationId: 'listItems',
            summary: 'List all items',
            description: 'Returns a paginated list of items sorted by creation date.',
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }

    const expected = `<h1 id="desc-api">Desc API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="desc-api-default">Default</h1>

## List all items

<a id="opIdlistItems"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /items \\
  src/index.ts
\`\`\`

\`GET /items\`

Returns a paginated list of items sorted by creation date.

<h3 id="list-all-items-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('generates full docs with summary and description', () => {
      expect(makeDocs(descOpenAPI)).toBe(expected)
    })
  })

  describe('required fields', () => {
    const requiredOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Required API', version: '1.0.0' },
      paths: {
        '/items': {
          get: {
            operationId: 'getItem',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      required: ['id', 'name'],
                      properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        description: { type: 'string' },
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

    const expected = `<h1 id="required-api">Required API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="required-api-default">Default</h1>

## getItem

<a id="opIdgetItem"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /items \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /items\`

> Example responses

> 200 Response

\`\`\`json
{
  "id": 0,
  "name": "string",
  "description": "string"
}
\`\`\`

<h3 id="getitem-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="getitem-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|name|string|true|none|none|
|description|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('generates full docs with required fields', () => {
      expect(makeDocs(requiredOpenAPI)).toBe(expected)
    })
  })

  describe('empty paths', () => {
    const emptyOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Empty API', version: '0.1.0' },
      paths: {},
    }

    const expected = `<h1 id="empty-api">Empty API v0.1.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.
`

    it('generates minimal docs with empty paths', () => {
      expect(makeDocs(emptyOpenAPI)).toBe(expected)
    })
  })

  describe('media example', () => {
    const mediaExampleOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Example API', version: '1.0.0' },
      paths: {
        '/status': {
          get: {
            operationId: 'getStatus',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: { type: 'object', properties: { ok: { type: 'boolean' } } },
                    example: { ok: true },
                  },
                },
              },
            },
          },
        },
      },
    }

    const expected = `<h1 id="example-api">Example API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="example-api-default">Default</h1>

## getStatus

<a id="opIdgetStatus"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /status \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /status\`

> Example responses

> 200 Response

\`\`\`json
{
  "ok": true
}
\`\`\`

<h3 id="getstatus-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="getstatus-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ok|boolean|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('generates full docs with media example', () => {
      expect(makeDocs(mediaExampleOpenAPI)).toBe(expected)
    })
  })
})
