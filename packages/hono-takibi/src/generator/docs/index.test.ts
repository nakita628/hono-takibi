import { describe, expect, it } from 'vite-plus/test'

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

  describe('comprehensive auth + info + servers', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: {
        title: 'Multi Auth API',
        version: '1.0.0',
        description: 'Comprehensive API description.',
        contact: { name: 'Support', email: 'support@example.com' },
        license: { name: 'MIT', url: 'https://opensource.org/licenses/MIT' },
      },
      servers: [{ url: 'https://api.example.com' }, { url: 'https://staging.example.com' }],
      security: [{ oauth: ['read', 'write'] }],
      components: {
        securitySchemes: {
          oauth: {
            type: 'oauth2',
            description: 'OAuth flow desc',
            flows: {
              authorizationCode: {
                authorizationUrl: 'https://example.com/oauth/authorize',
                tokenUrl: 'https://example.com/oauth/token',
                scopes: { read: 'Read access', write: 'Write access' },
              },
              implicit: {
                authorizationUrl: 'https://example.com/oauth/implicit',
                scopes: {},
              },
            },
          },
          oidc: {
            type: 'openIdConnect',
            description: 'OIDC',
            openIdConnectUrl: 'https://example.com/.well-known/openid',
          },
          apikey: {
            type: 'apiKey',
            in: 'header',
            name: 'X-Api-Key',
            description: 'API key desc',
          },
          basicHttp: { type: 'http', scheme: 'basic', description: 'Basic auth desc' },
        },
      },
      paths: {
        '/ping': { get: { operationId: 'ping', responses: { '200': { description: 'OK' } } } },
      },
    }
    const expected = `<h1 id="multi-auth-api">Multi Auth API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Comprehensive API description.

Base URLs:

* <a href="https://api.example.com">https://api.example.com</a>

* <a href="https://staging.example.com">https://staging.example.com</a>

Email: <a href="mailto:support@example.com">Support</a>${' '}
License: <a href="https://opensource.org/licenses/MIT">MIT</a>

# Authentication

- oAuth2 authentication. OAuth flow desc

    - Flow: authorizationCode
    - Authorization URL = [https://example.com/oauth/authorize](https://example.com/oauth/authorize)
    - Token URL = [https://example.com/oauth/token](https://example.com/oauth/token)

|Scope|Scope Description|
|---|---|
|read|Read access|
|write|Write access|

    - Flow: implicit
    - Authorization URL = [https://example.com/oauth/implicit](https://example.com/oauth/implicit)

- OpenID Connect authentication. OIDC

* API Key (apikey)
    - Parameter Name: **X-Api-Key**, in: header. API key desc

- HTTP Authentication, scheme: basic Basic auth desc

<h1 id="multi-auth-api-default">Default</h1>

## ping

<a id="opIdping"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /ping \\
  src/index.ts
\`\`\`

\`GET /ping\`

<h3 id="ping-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth ( Scopes: read write )
</aside>
`

    it('renders oauth2 with multiple flows, openIdConnect, apiKey/basic auth, info contact/license, and multiple servers', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('curl mode with multiple auth + multi-content + multiple responses', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'CurlAuth', version: '1.0.0' },
      components: {
        securitySchemes: {
          bearer: { type: 'http', scheme: 'bearer' },
          basic: { type: 'http', scheme: 'basic' },
          apikey: { type: 'apiKey', in: 'header', name: 'X-Api-Key' },
          apikeyQ: { type: 'apiKey', in: 'query', name: 'q_key' },
          oauth: { type: 'oauth2', flows: {} },
        },
      },
      paths: {
        '/items': {
          post: {
            operationId: 'createItem',
            security: [
              { bearer: [] },
              { basic: [] },
              { apikey: [] },
              { apikeyQ: [] },
              { oauth: [] },
            ],
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: { name: { type: 'string' } },
                  },
                },
                'application/x-www-form-urlencoded': { schema: { type: 'object' } },
              },
            },
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: { id: { type: 'integer' } },
                    },
                  },
                },
              },
              '400': { description: 'Bad Request' },
              '500': { description: 'Server Error' },
            },
          },
        },
      },
    }
    const expected = `<h1 id="curlauth">CurlAuth v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Authentication

- HTTP Authentication, scheme: bearer

- HTTP Authentication, scheme: basic

* API Key (apikey)
    - Parameter Name: **X-Api-Key**, in: header.

* API Key (apikeyQ)
    - Parameter Name: **q_key**, in: query.

- oAuth2 authentication.

<h1 id="curlauth-default">Default</h1>

## createItem

<a id="opIdcreateItem"></a>

> Code samples

\`\`\`bash
curl https://api.example.com/items \\
  -X POST \\
  -H 'Content-Type: application/json' \\
  -H 'Accept: application/json' \\
  -H "Authorization: Bearer \${ACCESS_TOKEN}" \\
  -d '{
    "name": "string"
  }'
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

> Example responses

> 200 Response

\`\`\`json
{
  "id": 0
}
\`\`\`

<h3 id="createitem-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|
|400|Bad Request|Bad Request|None|
|500|Internal Server Error|Server Error|None|

<h3 id="createitem-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer, basic, apikey, apikeyQ, oauth
</aside>
`

    it('renders curl with bearer+basic+apiKey(header/query)+oauth, multi-content body, and multiple responses', () => {
      expect(makeDocs(spec, 'src/index.ts', '/', true, 'https://api.example.com')).toBe(expected)
    })
  })

  describe('schemas section with various formats and enums', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Schemas', version: '1.0.0' },
      paths: {},
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: { type: 'integer', format: 'int64' },
              email: { type: 'string', format: 'email' },
              role: { type: 'string', enum: ['admin', 'user', 'guest'] },
              age: { type: 'integer', minimum: 0, maximum: 150 },
              uuid: { type: 'string', format: 'uuid' },
              ip: { type: 'string', format: 'ipv4' },
              ipv6: { type: 'string', format: 'ipv6' },
              ts: { type: 'string', format: 'date-time' },
              hostname: { type: 'string', format: 'hostname' },
              password: { type: 'string', format: 'password' },
              binary: { type: 'string', format: 'binary' },
              tags: { type: 'array', items: { type: 'string' } },
            },
            required: ['id', 'email'],
          },
        },
      },
    }
    const expected = `<h1 id="schemas">Schemas v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

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
  "email": "user@example.com",
  "role": "admin",
  "age": 0,
  "uuid": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "ip": "192.0.2.1",
  "ipv6": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
  "ts": "1970-01-01T00:00:00Z",
  "hostname": "example.com",
  "password": "password",
  "binary": "string",
  "tags": [
    "string"
  ]
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|true|none|none|
|email|string(email)|true|none|none|
|role|string|false|none|none|
|age|integer|false|none|none|
|uuid|string(uuid)|false|none|none|
|ip|string(ipv4)|false|none|none|
|ipv6|string(ipv6)|false|none|none|
|ts|string(date-time)|false|none|none|
|hostname|string(hostname)|false|none|none|
|password|string(password)|false|none|none|
|binary|string(binary)|false|none|none|
|tags|[string]|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|role|admin|
|role|user|
|role|guest|
`

    it('renders the schemas section with all format string examples and enum values table', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('oneOf inline response schema', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Comp', version: '1.0.0' },
      paths: {
        '/x': {
          get: {
            operationId: 'getX',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      oneOf: [
                        { type: 'object', properties: { kind: { type: 'string', enum: ['a'] } } },
                        { type: 'object', properties: { kind: { type: 'string', enum: ['b'] } } },
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
    const expected = `<h1 id="comp">Comp v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="comp-default">Default</h1>

## getX

<a id="opIdgetX"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /x \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /x\`

> Example responses

> 200 Response

\`\`\`json
{
  "kind": "a"
}
\`\`\`

<h3 id="getx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('renders oneOf by taking the first variant as the example', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('path-level $ref parameters merged with operation-level $ref parameters', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'PathParams', version: '1.0.0' },
      paths: {
        '/users/{id}': {
          parameters: [{ $ref: '#/components/parameters/UserId' }],
          get: {
            operationId: 'getUser',
            parameters: [{ $ref: '#/components/parameters/Lang' }],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        parameters: {
          UserId: { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
          Lang: { name: 'lang', in: 'query', schema: { type: 'string', enum: ['en', 'ja'] } },
        },
      },
    }
    const expected = `<h1 id="pathparams">PathParams v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="pathparams-default">Default</h1>

## getUser

<a id="opIdgetUser"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /users/{id} \\
  src/index.ts
\`\`\`

\`GET /users/{id}\`

<h3 id="getuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|lang|query|string|false|none|
|id|path|integer|true|none|

<h3 id="getuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('resolves both path-level and operation-level $ref parameters from components.parameters', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('tag groups with description', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Tagged', version: '1.0.0' },
      tags: [
        {
          name: 'Users',
          description: 'User management endpoints',
          externalDocs: { url: 'https://example.com/users', description: 'docs' },
        },
        { name: 'Posts', description: 'Post operations' },
      ],
      paths: {
        '/u': {
          get: { tags: ['Users'], operationId: 'lu', responses: { '200': { description: 'OK' } } },
        },
        '/p': {
          get: { tags: ['Posts'], operationId: 'lp', responses: { '200': { description: 'OK' } } },
        },
      },
    }
    const expected = `<h1 id="tagged">Tagged v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="tagged-users">Users</h1>

User management endpoints

## lu

<a id="opIdlu"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /u \\
  src/index.ts
\`\`\`

\`GET /u\`

<h3 id="lu-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="tagged-posts">Posts</h1>

Post operations

## lp

<a id="opIdlp"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /p \\
  src/index.ts
\`\`\`

\`GET /p\`

<h3 id="lp-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('renders each tag group with its description', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('$ref schema with named array response', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'RefEx', version: '1.0.0' },
      paths: {
        '/list': {
          get: {
            operationId: 'list',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: { type: 'array', items: { $ref: '#/components/schemas/Item' } },
                    examples: { sample: { value: [{ name: 'foo' }] } },
                  },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: { Item: { type: 'object', properties: { name: { type: 'string' } } } },
      },
    }
    const expected = `<h1 id="refex">RefEx v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="refex-default">Default</h1>

## list

<a id="opIdlist"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /list \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /list\`

> Example responses

> 200 Response

\`\`\`json
[
  {
    "name": "foo"
  }
]
\`\`\`

<h3 id="list-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="list-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Item](#schemaitem)]|false|none|none|
|» name|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Item">Item</h2>
<!-- backwards compatibility -->
<a id="schemaitem"></a>
<a id="schema_Item"></a>
<a id="tocSitem"></a>
<a id="tocsitem"></a>

\`\`\`json
{
  "name": "string"
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
`

    it('expands array-of-$ref response schema as anonymous + property rows', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('allOf composition with multiple object parts', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'AllOfNest', version: '1.0.0' },
      paths: {
        '/c': {
          get: {
            operationId: 'getC',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      allOf: [
                        { type: 'object', properties: { a: { type: 'string' } } },
                        { type: 'object', properties: { b: { type: 'integer' } } },
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
    const expected = `<h1 id="allofnest">AllOfNest v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="allofnest-default">Default</h1>

## getC

<a id="opIdgetC"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /c \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /c\`

> Example responses

> 200 Response

\`\`\`json
{
  "a": "string",
  "b": 0
}
\`\`\`

<h3 id="getc-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('merges allOf object parts in the response example', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('anyOf request body with required: true', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'AnyOfBody', version: '1.0.0' },
      paths: {
        '/d': {
          post: {
            operationId: 'postD',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    anyOf: [
                      { type: 'object', properties: { x: { type: 'string' } } },
                      { type: 'string' },
                    ],
                  },
                },
              },
            },
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }
    const expected = `<h1 id="anyofbody">AnyOfBody v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="anyofbody-default">Default</h1>

## postD

<a id="opIdpostD"></a>

> Code samples

\`\`\`bash
hono request \\
  -X POST \\
  -P /d \\
  -H 'Content-Type: application/json' \\
  -d '{
    "x": "string"
  }' \\
  src/index.ts
\`\`\`

\`POST /d\`

> Body parameter

\`\`\`json
{
  "x": "string"
}
\`\`\`

<h3 id="postd-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|

<h3 id="postd-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('emits required body row when requestBody.required is true and renders anyOf example', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('info contact only (no license)', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: {
        title: 'ContactOnly',
        version: '1.0.0',
        contact: { name: 'C', email: 'c@example.com' },
      },
      paths: {},
    }
    const expected = `<h1 id="contactonly">ContactOnly v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Email: <a href="mailto:c@example.com">C</a>${' '}
`

    it('emits a contact row without a license row', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('license without url (no contact)', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'LicNoUrl', version: '1.0.0', license: { name: 'Apache-2.0' } },
      paths: {},
    }
    const expected = `<h1 id="licnourl">LicNoUrl v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

License: Apache-2.0
`

    it('emits a license row without an anchor when url is missing', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('nested body params chained through $ref', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'NB', version: '1.0.0' },
      paths: {
        '/p': {
          post: {
            operationId: 'pp',
            requestBody: {
              content: {
                'application/json': { schema: { $ref: '#/components/schemas/Outer' } },
              },
            },
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        schemas: {
          Outer: {
            type: 'object',
            properties: {
              inner: { $ref: '#/components/schemas/Inner' },
              note: { type: 'string', description: 'A note' },
            },
            required: ['inner'],
          },
          Inner: {
            type: 'object',
            properties: { id: { type: 'integer' }, name: { type: 'string' } },
            required: ['id'],
          },
        },
      },
    }
    const expected = `<h1 id="nb">NB v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="nb-default">Default</h1>

## pp

<a id="opIdpp"></a>

> Code samples

\`\`\`bash
hono request \\
  -X POST \\
  -P /p \\
  -H 'Content-Type: application/json' \\
  -d '{
    "inner": {
      "id": 0,
      "name": "string"
    },
    "note": "string"
  }' \\
  src/index.ts
\`\`\`

\`POST /p\`

> Body parameter

\`\`\`json
{
  "inner": {
    "id": 0,
    "name": "string"
  },
  "note": "string"
}
\`\`\`

<h3 id="pp-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Outer](#schemaouter)|false|none|
|» inner|body|[Inner](#schemainner)|true|none|
|» »  id|body|integer|true|none|
|» »  name|body|string|false|none|
|» note|body|string|false|A note|

<h3 id="pp-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Outer">Outer</h2>
<!-- backwards compatibility -->
<a id="schemaouter"></a>
<a id="schema_Outer"></a>
<a id="tocSouter"></a>
<a id="tocsouter"></a>

\`\`\`json
{
  "inner": {
    "id": 0,
    "name": "string"
  },
  "note": "string"
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|inner|[Inner](#schemainner)|true|none|none|
|note|string|false|none|A note|

<h2 id="tocS_Inner">Inner</h2>
<!-- backwards compatibility -->
<a id="schemainner"></a>
<a id="schema_Inner"></a>
<a id="tocSinner"></a>
<a id="tocsinner"></a>

\`\`\`json
{
  "id": 0,
  "name": "string"
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|name|string|false|none|none|
`

    it('flattens nested body params through $ref and emits both schemas', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('response schema with array of $ref objects', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'AR', version: '1.0.0' },
      paths: {
        '/items': {
          get: {
            operationId: 'gi',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        items: { type: 'array', items: { $ref: '#/components/schemas/Item' } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          Item: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              tags: { type: 'array', items: { type: 'string' } },
            },
          },
        },
      },
    }
    const expected = `<h1 id="ar">AR v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="ar-default">Default</h1>

## gi

<a id="opIdgi"></a>

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
  "items": [
    {
      "id": 0,
      "tags": [
        "string"
      ]
    }
  ]
}
\`\`\`

<h3 id="gi-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="gi-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|items|[[Item](#schemaitem)]|false|none|none|
|» id|integer|false|none|none|
|» tags|[string]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Item">Item</h2>
<!-- backwards compatibility -->
<a id="schemaitem"></a>
<a id="schema_Item"></a>
<a id="tocSitem"></a>
<a id="tocsitem"></a>

\`\`\`json
{
  "id": 0,
  "tags": [
    "string"
  ]
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|
|tags|[string]|false|none|none|
`

    it('expands array-of-$ref via resolveArrayItem into nested property rows', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('$ref response from components.responses', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'RR', version: '1.0.0' },
      paths: {
        '/x': {
          get: {
            operationId: 'gx',
            responses: { '200': { $ref: '#/components/responses/Common200' } },
          },
        },
      },
      components: {
        responses: {
          Common200: {
            description: 'Shared OK',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { ok: { type: 'boolean' } } },
              },
            },
          },
        },
      },
    }
    const expected = `<h1 id="rr">RR v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="rr-default">Default</h1>

## gx

<a id="opIdgx"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /x \\
  src/index.ts
\`\`\`

\`GET /x\`

> Example responses

> 200 Response

\`\`\`json
{
  "ok": true
}
\`\`\`

<h3 id="gx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Shared OK|Inline|

<h3 id="gx-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ok|boolean|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('resolves $ref response and renders the shared description', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('form-urlencoded body with parameter description', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'FB', version: '1.0.0' },
      paths: {
        '/f': {
          post: {
            operationId: 'pf',
            parameters: [
              { name: 'q', in: 'query', schema: { type: 'string' }, description: 'Search query' },
            ],
            requestBody: {
              content: {
                'application/x-www-form-urlencoded': {
                  schema: { type: 'object', properties: { name: { type: 'string' } } },
                },
              },
            },
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }
    const expected = `<h1 id="fb">FB v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="fb-default">Default</h1>

## pf

<a id="opIdpf"></a>

> Code samples

\`\`\`bash
hono request \\
  -X POST \\
  -P /f \\
  -H 'Content-Type: application/x-www-form-urlencoded' \\
  src/index.ts
\`\`\`

\`POST /f\`

<h3 id="pf-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|q|query|string|false|Search query|

<h3 id="pf-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('emits the form-urlencoded Content-Type header and includes parameter description', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('multiple named examples (uses the first by key)', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'NE', version: '1.0.0' },
      paths: {
        '/y': {
          get: {
            operationId: 'gy',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: { type: 'object', properties: { id: { type: 'integer' } } },
                    examples: {
                      sample1: { value: { id: 1 } },
                      sample2: { value: { id: 2 } },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }
    const expected = `<h1 id="ne">NE v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="ne-default">Default</h1>

## gy

<a id="opIdgy"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /y \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /y\`

> Example responses

> 200 Response

\`\`\`json
{
  "id": 1
}
\`\`\`

<h3 id="gy-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="gy-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('selects the first named example by iteration order', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('apiKey without "in" defaults to header', () => {
    const spec = {
      openapi: '3.1.0',
      info: { title: 'T', version: '1.0.0' },
      components: {
        securitySchemes: {
          ak: { type: 'apiKey', name: 'X-Api-Key' },
        },
      },
      paths: {
        '/x': { get: { operationId: 'gx', responses: { '200': { description: 'OK' } } } },
      },
    } as unknown as OpenAPI
    const expected = `<h1 id="t">T v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Authentication

* API Key (ak)
    - Parameter Name: **X-Api-Key**, in: header.

<h1 id="t-default">Default</h1>

## gx

<a id="opIdgx"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /x \\
  src/index.ts
\`\`\`

\`GET /x\`

<h3 id="gx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('falls back to "header" when apiKey scheme omits the in field', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('oauth2 without flows', () => {
    const spec = {
      openapi: '3.1.0',
      info: { title: 'T', version: '1.0.0' },
      components: { securitySchemes: { o2: { type: 'oauth2' } } },
      paths: {
        '/x': { get: { operationId: 'gx', responses: { '200': { description: 'OK' } } } },
      },
    } as unknown as OpenAPI
    const expected = `<h1 id="t">T v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Authentication

- oAuth2 authentication.

<h1 id="t-default">Default</h1>

## gx

<a id="opIdgx"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /x \\
  src/index.ts
\`\`\`

\`GET /x\`

<h3 id="gx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('emits only the oauth2 heading when flows is absent', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('oauth2 flow with empty scopes / no auth or token URL', () => {
    const spec = {
      openapi: '3.1.0',
      info: { title: 'T', version: '1.0.0' },
      components: {
        securitySchemes: {
          o3: {
            type: 'oauth2',
            flows: { clientCredentials: { scopes: {} } },
          },
        },
      },
      paths: {
        '/x': { get: { operationId: 'gx', responses: { '200': { description: 'OK' } } } },
      },
    } as unknown as OpenAPI
    const expected = `<h1 id="t">T v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Authentication

- oAuth2 authentication.

    - Flow: clientCredentials

<h1 id="t-default">Default</h1>

## gx

<a id="opIdgx"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /x \\
  src/index.ts
\`\`\`

\`GET /x\`

<h3 id="gx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('omits Authorization URL / Token URL / scopes table when none are set', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('curl with single basic auth', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'T', version: '1.0.0' },
      components: { securitySchemes: { basicAuth: { type: 'http', scheme: 'basic' } } },
      paths: {
        '/x': {
          get: {
            operationId: 'gx',
            security: [{ basicAuth: [] }],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }
    const expected = `<h1 id="t">T v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Authentication

- HTTP Authentication, scheme: basic

<h1 id="t-default">Default</h1>

## gx

<a id="opIdgx"></a>

> Code samples

\`\`\`bash
curl https://api.example.com/x \\
  -H "Authorization: Basic \${CREDENTIALS}"
\`\`\`

\`GET /x\`

<h3 id="gx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
basicAuth
</aside>
`

    it('emits the Basic Authorization curl header when basic auth is the sole security scheme', () => {
      expect(makeDocs(spec, 'src/index.ts', '/', true, 'https://api.example.com')).toBe(expected)
    })
  })

  describe('curl with single apiKey/header auth', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'T', version: '1.0.0' },
      components: {
        securitySchemes: { ak: { type: 'apiKey', in: 'header', name: 'X-Api-Key' } },
      },
      paths: {
        '/x': {
          get: {
            operationId: 'gx',
            security: [{ ak: [] }],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }
    const expected = `<h1 id="t">T v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Authentication

* API Key (ak)
    - Parameter Name: **X-Api-Key**, in: header.

<h1 id="t-default">Default</h1>

## gx

<a id="opIdgx"></a>

> Code samples

\`\`\`bash
curl https://api.example.com/x \\
  -H "X-Api-Key: \${API_KEY}"
\`\`\`

\`GET /x\`

<h3 id="gx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
ak
</aside>
`

    it('emits the named apiKey curl header when apiKey is the sole security scheme', () => {
      expect(makeDocs(spec, 'src/index.ts', '/', true, 'https://api.example.com')).toBe(expected)
    })
  })

  describe('curl with single oauth2 auth', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'T', version: '1.0.0' },
      components: { securitySchemes: { o2: { type: 'oauth2', flows: {} } } },
      paths: {
        '/x': {
          get: {
            operationId: 'gx',
            security: [{ o2: [] }],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }
    const expected = `<h1 id="t">T v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Authentication

- oAuth2 authentication.

<h1 id="t-default">Default</h1>

## gx

<a id="opIdgx"></a>

> Code samples

\`\`\`bash
curl https://api.example.com/x \\
  -H "Authorization: Bearer \${ACCESS_TOKEN}"
\`\`\`

\`GET /x\`

<h3 id="gx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
o2
</aside>
`

    it('emits the Bearer Authorization curl header when oauth2 is the sole security scheme', () => {
      expect(makeDocs(spec, 'src/index.ts', '/', true, 'https://api.example.com')).toBe(expected)
    })
  })

  describe('kitchen-sink fixture exercising many branches at once', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Kitchen', version: '1.0.0', description: 'A kitchen sink API.' },
      paths: {
        '/x/{id}': {
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          patch: {
            operationId: 'patchX',
            description: 'Patch operation desc',
            tags: ['Items'],
            parameters: [
              {
                name: 'X-Tenant',
                in: 'header',
                schema: { type: 'string' },
                description: 'Tenant header',
              },
              {
                name: 'q',
                in: 'query',
                schema: { type: 'string', enum: ['a', 'b'] },
                description: 'Query select',
              },
              { name: 'token', in: 'cookie', schema: { type: 'string' } },
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      arr: { type: 'array', items: { type: 'integer' } },
                      flag: { type: 'boolean' },
                      anyRef: { $ref: '#/components/schemas/Nested' },
                      enumPropNumeric: { type: 'integer', enum: [1, 2, 3] },
                    },
                    required: ['flag'],
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        items: { type: 'array', items: { $ref: '#/components/schemas/Nested' } },
                        count: { type: 'integer' },
                      },
                    },
                  },
                },
              },
              '5XX': { description: 'Server errors' },
            },
          },
        },
      },
      tags: [{ name: 'Items' }],
      components: {
        schemas: {
          Nested: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              child: { $ref: '#/components/schemas/Nested' },
            },
          },
        },
      },
    }
    const expected = `<h1 id="kitchen">Kitchen v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

A kitchen sink API.

<h1 id="kitchen-items">Items</h1>

## patchX

<a id="opIdpatchX"></a>

> Code samples

\`\`\`bash
hono request \\
  -X PATCH \\
  -P /x/{id} \\
  -H 'Content-Type: application/json' \\
  -H 'Accept: application/json' \\
  -d '{
    "arr": [
      0
    ],
    "flag": true,
    "anyRef": {
      "id": 0,
      "child": {}
    },
    "enumPropNumeric": 1
  }' \\
  src/index.ts
\`\`\`

\`PATCH /x/{id}\`

Patch operation desc

> Body parameter

\`\`\`json
{
  "arr": [
    0
  ],
  "flag": true,
  "anyRef": {
    "id": 0,
    "child": {}
  },
  "enumPropNumeric": 1
}
\`\`\`

<h3 id="patchx-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|X-Tenant|header|string|false|Tenant header|
|q|query|string|false|Query select|
|token|cookie|string|false|none|
|id|path|integer|true|none|
|body|body|object|true|none|
|» arr|body|[integer]|false|none|
|» flag|body|boolean|true|none|
|» anyRef|body|[Nested](#schemanested)|false|none|
|» »  id|body|integer|false|none|
|» »  child|body|[Nested](#schemanested)|false|none|
|» enumPropNumeric|body|integer|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|q|a|
|q|b|
|» enumPropNumeric|1|
|» enumPropNumeric|2|
|» enumPropNumeric|3|

> Example responses

> 200 Response

\`\`\`json
{
  "items": [
    {
      "id": 0,
      "child": {}
    }
  ],
  "count": 0
}
\`\`\`

<h3 id="patchx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|
|5XX|5XX|Server errors|None|

<h3 id="patchx-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|items|[[Nested](#schemanested)]|false|none|none|
|» id|integer|false|none|none|
|» child|[Nested](#schemanested)|false|none|none|
|count|integer|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Nested">Nested</h2>
<!-- backwards compatibility -->
<a id="schemanested"></a>
<a id="schema_Nested"></a>
<a id="tocSnested"></a>
<a id="tocsnested"></a>

\`\`\`json
{
  "id": 0,
  "child": {
    "id": 0,
    "child": {}
  }
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|
|child|[Nested](#schemanested)|false|none|none|
`

    it('renders PATCH + path/query/header/cookie params + circular schema + 5XX + enums + array of $ref', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })
})

describe('HTML escaping of free-form spec values', () => {
  const spec: OpenAPI = {
    openapi: '3.1.0',
    info: {
      title: 'Acme <Search> & Co',
      version: '1.0.0',
      contact: { name: 'A & B', email: 'a&b@x.com' },
      license: { name: 'MIT & friends', url: 'https://l.example/?a=1&b=2' },
    },
    servers: [{ url: 'https://api.example.com/?x=1&y=2' }],
    tags: [{ name: 'Orders & Refunds' }],
    paths: {
      '/o': {
        get: {
          tags: ['Orders & Refunds'],
          operationId: 'getO',
          responses: { '200': { description: 'OK' } },
        },
      },
    },
  }

  it('escapes & < > in title, server url, contact, license, and tag headings', () => {
    const lines = makeDocs(spec).split('\n')
    expect(lines).toContain('<h1 id="acme-search-co">Acme &lt;Search&gt; &amp; Co v1.0.0</h1>')
    expect(lines).toContain(
      '* <a href="https://api.example.com/?x=1&amp;y=2">https://api.example.com/?x=1&amp;y=2</a>',
    )
    expect(lines).toContain('Email: <a href="mailto:a&amp;b@x.com">A &amp; B</a> ')
    expect(lines).toContain(
      'License: <a href="https://l.example/?a=1&amp;b=2">MIT &amp; friends</a>',
    )
    expect(lines).toContain('<h1 id="acme-search-co-orders-refunds">Orders &amp; Refunds</h1>')
  })
})
