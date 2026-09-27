import { describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../../openapi/index.js'
import { makeDocs } from './index.js'

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const minimalOpenAPI = {
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
} as OpenAPI

const openAPIWithServers = {
  ...minimalOpenAPI,
  servers: [{ url: 'https://petstore3.swagger.io/api/v3' }],
} as OpenAPI

const postOpenAPI = {
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
} as OpenAPI

const postOpenAPIWithExample = {
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
} as OpenAPI

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

const pathParamGetOpenAPI = {
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
} as OpenAPI

const putOpenAPI = {
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
} as OpenAPI

const nestedBodyOpenAPI = {
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
} as OpenAPI

const noResponseGetOpenAPI = {
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
} as OpenAPI

// ---------------------------------------------------------------------------
// Expected: curl GET /tasks/{taskId} (path parameter filled with an example value)
// ---------------------------------------------------------------------------

const expectedCurlGetPathParam = `<h1 id="test-api">Test API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="test-api-default">Default</h1>

## getTask

<a id="opIdgetTask"></a>

> Code samples

\`\`\`bash
curl http://localhost:5173/tasks/string \\
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
curl http://localhost:5173/tasks/string \\
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
      it('generates curl GET with the path parameter filled in and no -X GET', () => {
        expect(
          makeDocs(pathParamGetOpenAPI, 'src/index.ts', '/', true, 'http://localhost:5173'),
        ).toBe(expectedCurlGetPathParam)
      })
    })

    describe('PUT with path parameter and body', () => {
      it('generates curl PUT with the path parameter filled in and indented -d body', () => {
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
    const refOpenAPI = {
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
    } as OpenAPI

    const expected = `<h1 id="ref-api">Ref API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="ref-api-default">Default</h1>

## getUser

<a id="opIdgetUser"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /users/0 \\
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
    const allOfOpenAPI = {
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
    } as OpenAPI

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

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|
|name|string|false|none|none|
`

    it('generates full docs for allOf composed schema', () => {
      expect(makeDocs(allOfOpenAPI)).toBe(expected)
    })
  })

  describe('oneOf schema', () => {
    const oneOfOpenAPI = {
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
    } as OpenAPI

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

<h3 id="getshape-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*oneOf*|object|false|none|none|
|radius|number|false|none|none|
|*oneOf*|object|false|none|none|
|width|number|false|none|none|
|height|number|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('generates full docs for oneOf schema', () => {
      expect(makeDocs(oneOfOpenAPI)).toBe(expected)
    })
  })

  describe('anyOf schema', () => {
    const anyOfOpenAPI = {
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
    } as OpenAPI

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

<h3 id="getvalue-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anyOf*|object|false|none|none|
|flag|boolean|false|none|none|
|*anyOf*|object|false|none|none|
|count|integer|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('generates full docs for anyOf schema', () => {
      expect(makeDocs(anyOfOpenAPI)).toBe(expected)
    })
  })

  describe('array responses', () => {
    const arrayResponseOpenAPI = {
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
    } as OpenAPI

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
    const bearerAuthOpenAPI = {
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
    } as OpenAPI

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
  -H "Authorization: Bearer \${ACCESS_TOKEN}" \\
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
    const apiKeyAuthOpenAPI = {
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
    } as OpenAPI

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
  -H "X-API-Key: \${API_KEY}" \\
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
    const taggedOpenAPI = {
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
    } as OpenAPI

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
    const fullInfoOpenAPI = {
      openapi: '3.1.0',
      info: {
        title: 'Full Info API',
        version: '2.0.0',
        description: 'A comprehensive test API',
        contact: { name: 'API Support', email: 'support@example.com' },
        license: { name: 'MIT', url: 'https://opensource.org/licenses/MIT' },
      },
      paths: {},
    } as OpenAPI

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
    const circularOpenAPI = {
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
    } as OpenAPI

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
    const mutualCircularOpenAPI = {
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
    } as OpenAPI

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
    const formatsOpenAPI = {
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
    } as OpenAPI

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
    const nestedRefBodyOpenAPI = {
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
    } as OpenAPI

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
|» » street|body|string|false|none|
|» » city|body|string|false|none|

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
    const enumQueryOpenAPI = {
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
    } as OpenAPI

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
    const enumResponseOpenAPI = {
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
    } as OpenAPI

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

#### Enumerated Values

|Property|Value|
|---|---|
|state|active|
|state|inactive|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('generates full docs with enum in response', () => {
      expect(makeDocs(enumResponseOpenAPI)).toBe(expected)
    })
  })

  describe('multiple methods on same path', () => {
    const multiMethodOpenAPI = {
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
    } as OpenAPI

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
    const descOpenAPI = {
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
    } as OpenAPI

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
    const requiredOpenAPI = {
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
    } as OpenAPI

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
    const emptyOpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Empty API', version: '0.1.0' },
      paths: {},
    } as OpenAPI

    const expected = `<h1 id="empty-api">Empty API v0.1.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.
`

    it('generates minimal docs with empty paths', () => {
      expect(makeDocs(emptyOpenAPI)).toBe(expected)
    })
  })

  describe('media example', () => {
    const mediaExampleOpenAPI = {
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
    } as OpenAPI

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
    const spec = {
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
    } as OpenAPI
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

    - OpenID Connect URL = [https://example.com/.well-known/openid](https://example.com/.well-known/openid)

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
  -H "Authorization: Bearer \${ACCESS_TOKEN}" \\
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
    const spec = {
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
    } as OpenAPI
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
    const spec = {
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
    } as OpenAPI
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
    const spec = {
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
    } as OpenAPI
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

<h3 id="getx-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*oneOf*|object|false|none|none|
|kind|string|false|none|none|
|*oneOf*|object|false|none|none|
|kind|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|kind|a|
|kind|b|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('renders oneOf by taking the first variant as the example', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('path-level $ref parameters merged with operation-level $ref parameters', () => {
    const spec = {
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
    } as OpenAPI
    const expected = `<h1 id="pathparams">PathParams v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="pathparams-default">Default</h1>

## getUser

<a id="opIdgetUser"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /users/0 \\
  src/index.ts
\`\`\`

\`GET /users/{id}\`

<h3 id="getuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|lang|query|string|false|none|
|id|path|integer|true|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|lang|en|
|lang|ja|

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
    const spec = {
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
    } as OpenAPI
    const expected = `<h1 id="tagged">Tagged v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="tagged-users">Users</h1>

User management endpoints

<a href="https://example.com/users">docs</a>

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
    const spec = {
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
    } as OpenAPI
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
    const spec = {
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
    } as OpenAPI
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

<h3 id="getc-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|a|string|false|none|none|
|b|integer|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`

    it('merges allOf object parts in the response example', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('anyOf request body with required: true', () => {
    const spec = {
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
    } as OpenAPI
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
|body|body|object \\| string|true|none|
|» *anyOf*|body|object|false|none|
|» x|body|string|false|none|
|» *anyOf*|body|string|false|none|

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
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'ContactOnly',
        version: '1.0.0',
        contact: { name: 'C', email: 'c@example.com' },
      },
      paths: {},
    } as OpenAPI
    const expected = `<h1 id="contactonly">ContactOnly v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Email: <a href="mailto:c@example.com">C</a>${' '}
`

    it('emits a contact row without a license row', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('license without url (no contact)', () => {
    const spec = {
      openapi: '3.1.0',
      info: { title: 'LicNoUrl', version: '1.0.0', license: { name: 'Apache-2.0' } },
      paths: {},
    } as OpenAPI
    const expected = `<h1 id="licnourl">LicNoUrl v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

License: Apache-2.0
`

    it('emits a license row without an anchor when url is missing', () => {
      expect(makeDocs(spec)).toBe(expected)
    })
  })

  describe('nested body params chained through $ref', () => {
    const spec = {
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
    } as OpenAPI
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
|» » id|body|integer|true|none|
|» » name|body|string|false|none|
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
    const spec = {
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
    } as OpenAPI
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
    const spec = {
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
    } as OpenAPI
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
  -H 'Accept: application/json' \\
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
    const spec = {
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
    } as OpenAPI
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
  -d 'name=string' \\
  src/index.ts
\`\`\`

\`POST /f\`

> Body parameter

\`\`\`yaml
name: string
\`\`\`

<h3 id="pf-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|q|query|string|false|Search query|
|body|body|object|false|none|
|» name|body|string|false|none|

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
    const spec = {
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
    } as OpenAPI
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
    const spec = {
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
    } as OpenAPI
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
    const spec = {
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
    } as OpenAPI
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
    const spec = {
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
    } as OpenAPI
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
    const spec = {
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
    } as OpenAPI
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
  -P /x/0 \\
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
|» » id|body|integer|false|none|
|» » child|body|[Nested](#schemanested)|false|none|
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
|5XX|Server Error|Server errors|None|

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
  const spec = {
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
  } as OpenAPI

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

describe('regressions', () => {
  // `author` and `editor` both point at `User`. Only a reference already on the current
  // path is a cycle, so the second sibling must be expanded just like the first.
  // `author` と `editor` はどちらも `User` を参照する。循環とみなすのは現在の経路上に
  // ある参照だけなので、2 つ目の兄弟も 1 つ目と同じように展開されなければならない。
  it('expands a schema referenced by two sibling properties for both of them', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'Sibling',
        version: '1.0.0',
      },
      paths: {
        '/posts': {
          post: {
            operationId: 'createPost',
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Post',
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
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
          },
          Post: {
            type: 'object',
            properties: {
              author: {
                $ref: '#/components/schemas/User',
              },
              editor: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="sibling">Sibling v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="sibling-default">Default</h1>

## createPost

<a id="opIdcreatePost"></a>

> Code samples

\`\`\`bash
hono request \\
  -X POST \\
  -P /posts \\
  -H 'Content-Type: application/json' \\
  -d '{
    "author": {
      "name": "string"
    },
    "editor": {
      "name": "string"
    }
  }' \\
  src/index.ts
\`\`\`

\`POST /posts\`

> Body parameter

\`\`\`json
{
  "author": {
    "name": "string"
  },
  "editor": {
    "name": "string"
  }
}
\`\`\`

<h3 id="createpost-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Post](#schemapost)|false|none|
|» author|body|[User](#schemauser)|false|none|
|» » name|body|string|false|none|
|» editor|body|[User](#schemauser)|false|none|
|» » name|body|string|false|none|

<h3 id="createpost-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|None|

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
  "name": "string"
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|

<h2 id="tocS_Post">Post</h2>
<!-- backwards compatibility -->
<a id="schemapost"></a>
<a id="schema_Post"></a>
<a id="tocSpost"></a>
<a id="tocspost"></a>

\`\`\`json
{
  "author": {
    "name": "string"
  },
  "editor": {
    "name": "string"
  }
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|author|[User](#schemauser)|false|none|none|
|editor|[User](#schemauser)|false|none|none|
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // A `|` closes a Markdown table cell and a line break ends the row, so the type
  // `string | null` and multi-line descriptions are escaped as `\|` and `<br>`.
  // `|` は Markdown の表のセルを閉じ、改行は行を終わらせる。そのため型 `string | null` と
  // 複数行の説明は `\|` と `<br>` にエスケープされる。
  it('escapes pipes and line breaks inside table cells', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'Escape',
        version: '1.0.0',
      },
      paths: {
        '/items': {
          get: {
            operationId: 'listItems',
            parameters: [
              {
                name: 'q',
                in: 'query',
                description: 'a | b\nsecond line',
                schema: {
                  type: ['string', 'null'],
                },
              },
            ],
            responses: {
              '200': {
                description: 'ok | fine\nsecond line',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="escape">Escape v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="escape-default">Default</h1>

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

<h3 id="listitems-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|q|query|string \\| null|false|a \\| b<br>second line|

<h3 id="listitems-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|ok \\| fine<br>second line|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // The request body lives in `components.requestBodies`. The sample must still send
  // `Content-Type` and `-d`, and the `body` row must report `required: true`.
  // リクエストボディは `components.requestBodies` にある。その場合もサンプルは `Content-Type` と
  // `-d` を送り、`body` 行は `required: true` を示さなければならない。
  it('resolves a $ref request body for the code sample and the required column', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'BodyRef',
        version: '1.0.0',
      },
      paths: {
        '/users': {
          post: {
            operationId: 'createUser',
            requestBody: {
              $ref: '#/components/requestBodies/UserBody',
            },
            responses: {
              '201': {
                description: 'Created',
              },
            },
          },
        },
      },
      components: {
        requestBodies: {
          UserBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="bodyref">BodyRef v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="bodyref-default">Default</h1>

## createUser

<a id="opIdcreateUser"></a>

> Code samples

\`\`\`bash
curl http://localhost:3000/users \\
  -X POST \\
  -H 'Content-Type: application/json' \\
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
|body|body|object|true|none|
|» name|body|string|false|none|

<h3 id="createuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec, 'src/index.ts', '/', true, 'http://localhost:3000')).toBe(expected)
  })

  // `security: []` on the operation overrides the global requirement, so neither the
  // code sample nor the aside asks for authentication.
  // オペレーションの `security: []` はグローバルの要求を上書きする。そのためコードサンプルも
  // aside も認証を求めない。
  it('sends no auth header when the operation opts out of the global security', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'OptOut',
        version: '1.0.0',
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      paths: {
        '/public': {
          get: {
            operationId: 'getPublic',
            security: [],
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="optout">OptOut v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Authentication

- HTTP Authentication, scheme: bearer

<h1 id="optout-default">Default</h1>

## getPublic

<a id="opIdgetPublic"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /public \\
  src/index.ts
\`\`\`

\`GET /public\`

<h3 id="getpublic-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // The heading falls back to `get/posts/{id}`. The ids of the sections below it use
  // the same fallback instead of an empty prefix such as `-parameters`.
  // 見出しは `get/posts/{id}` にフォールバックする。その下の各セクションの id も同じ
  // フォールバックを使い、`-parameters` のような空のプレフィックスにはならない。
  it('builds section ids from the method and path when summary and operationId are absent', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'NoId',
        version: '1.0.0',
      },
      paths: {
        '/posts/{id}': {
          get: {
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
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
    } as OpenAPI
    const expected = `<h1 id="noid">NoId v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="noid-default">Default</h1>

## get/posts/{id}

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /posts/string \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /posts/{id}\`

<h3 id="getpostsid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

\`\`\`json
{
  "id": "string"
}
\`\`\`

<h3 id="getpostsid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="getpostsid-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // `/api/` plus `/health` is `/api/health`, not `/api//health`.
  // `/api/` と `/health` を連結すると `/api/health` になり、`/api//health` にはならない。
  it('joins a basePath that ends with a slash without doubling the slash', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'BasePath',
        version: '1.0.0',
      },
      paths: {
        '/health': {
          get: {
            operationId: 'getHealth',
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="basepath">BasePath v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="basepath-default">Default</h1>

## getHealth

<a id="opIdgetHealth"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /api/health \\
  src/index.ts
\`\`\`

\`GET /health\`

<h3 id="gethealth-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec, 'src/index.ts', '/api/')).toBe(expected)
  })

  // `type: object` is optional in JSON Schema. The example and the Response Schema
  // table are built from `properties` alone.
  // JSON Schema では `type: object` は省略できる。例と Response Schema の表は
  // `properties` だけから作られる。
  it('treats a schema with properties but no type as an object', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'NoType',
        version: '1.0.0',
      },
      paths: {
        '/me': {
          get: {
            operationId: 'getMe',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      properties: {
                        name: {
                          type: 'string',
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
    } as OpenAPI
    const expected = `<h1 id="notype">NoType v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="notype-default">Default</h1>

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

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // `kind` is declared on the path item, `sort` is a `$ref` to an enum schema and
  // `level` is nested one level down. All three appear under Enumerated Values.
  // `kind` はパスアイテムに宣言され、`sort` は enum スキーマへの `$ref`、`level` は 1 段
  // ネストしている。3 つとも Enumerated Values に現れる。
  it('lists enum values of path-level, $ref and nested properties', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'Enums',
        version: '1.0.0',
      },
      paths: {
        '/items/{kind}': {
          parameters: [
            {
              name: 'kind',
              in: 'path',
              required: true,
              schema: {
                type: 'string',
                enum: ['a', 'b'],
              },
            },
          ],
          post: {
            operationId: 'createItem',
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      sort: {
                        $ref: '#/components/schemas/Sort',
                      },
                      meta: {
                        type: 'object',
                        properties: {
                          level: {
                            type: 'string',
                            enum: ['low', 'high'],
                          },
                        },
                      },
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
      components: {
        schemas: {
          Sort: {
            type: 'string',
            enum: ['asc', 'desc'],
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="enums">Enums v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="enums-default">Default</h1>

## createItem

<a id="opIdcreateItem"></a>

> Code samples

\`\`\`bash
hono request \\
  -X POST \\
  -P /items/a \\
  -H 'Content-Type: application/json' \\
  -d '{
    "sort": "asc",
    "meta": {
      "level": "low"
    }
  }' \\
  src/index.ts
\`\`\`

\`POST /items/{kind}\`

> Body parameter

\`\`\`json
{
  "sort": "asc",
  "meta": {
    "level": "low"
  }
}
\`\`\`

<h3 id="createitem-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|kind|path|string|true|none|
|body|body|object|false|none|
|» sort|body|[Sort](#schemasort)|false|none|
|» meta|body|object|false|none|
|» » level|body|string|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|kind|a|
|kind|b|
|» sort|asc|
|» sort|desc|
|» » level|low|
|» » level|high|

<h3 id="createitem-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|None|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Sort">Sort</h2>
<!-- backwards compatibility -->
<a id="schemasort"></a>
<a id="schema_Sort"></a>
<a id="tocSsort"></a>
<a id="tocssort"></a>

\`\`\`json
"asc"
\`\`\`
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // Without `application/json` the first `+json` media type supplies the example,
  // the schema column, the Response Schema table and the `Accept` header.
  // `application/json` がない場合は、最初の `+json` メディアタイプが例・スキーマ列・
  // Response Schema の表・`Accept` ヘッダーの元になる。
  it('documents a JSON-flavoured media type such as application/problem+json', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'Problem',
        version: '1.0.0',
      },
      paths: {
        '/x': {
          get: {
            operationId: 'getX',
            responses: {
              '400': {
                description: 'Bad',
                content: {
                  'application/problem+json': {
                    schema: {
                      type: 'object',
                      properties: {
                        title: {
                          type: 'string',
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
    } as OpenAPI
    const expected = `<h1 id="problem">Problem v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="problem-default">Default</h1>

## getX

<a id="opIdgetX"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /x \\
  -H 'Accept: application/problem+json' \\
  src/index.ts
\`\`\`

\`GET /x\`

> Example responses

> 400 Response

\`\`\`json
{
  "title": "string"
}
\`\`\`

<h3 id="getx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|400|Bad Request|Bad|Inline|

<h3 id="getx-responseschema">Response Schema</h3>

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // An unknown scheme type has no description line, so the section would be a bare heading.
  // 未知のスキーム種別には説明行がないため、セクションは見出しだけになってしまう。その場合は出力しない。
  it('omits the Authentication heading when no scheme can be described', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'NoScheme',
        version: '1.0.0',
      },
      paths: {},
      components: {
        securitySchemes: {
          custom: {
            type: 'x-custom',
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="noscheme">NoScheme v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // Repeating the heading per status would repeat its id. Each status gets its own
  // table under a single heading.
  // ステータスごとに見出しを繰り返すと id が重複する。見出しは 1 つで、ステータスごとに
  // 表が並ぶ。
  it('emits the Response Schema heading once for several statuses', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'Multi',
        version: '1.0.0',
      },
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
                      type: 'object',
                      properties: {
                        a: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
              },
              '404': {
                description: 'Not found',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        message: {
                          type: 'string',
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
    } as OpenAPI
    const expected = `<h1 id="multi">Multi v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="multi-default">Default</h1>

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
  "a": "string"
}
\`\`\`

> 404 Response

\`\`\`json
{
  "message": "string"
}
\`\`\`

<h3 id="getx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|
|404|Not Found|Not found|Inline|

<h3 id="getx-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|a|string|false|none|none|

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // The body is wrapped in single quotes, so `O'Brien` is written as `O'\''Brien`.
  // The Body parameter block is plain JSON and keeps the quote as is.
  // ボディはシングルクォートで囲まれるため、`O'Brien` は `O'\''Brien` と書かれる。
  // Body parameter のブロックはただの JSON なので、クォートはそのまま残る。
  it('escapes a single quote inside the -d body', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'Quote',
        version: '1.0.0',
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
                      name: {
                        type: 'string',
                        example: "O'Brien",
                      },
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
    } as OpenAPI
    const expected = `<h1 id="quote">Quote v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="quote-default">Default</h1>

## createUser

<a id="opIdcreateUser"></a>

> Code samples

\`\`\`bash
curl http://localhost:3000/users \\
  -X POST \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "O'\\''Brien"
  }'
\`\`\`

\`POST /users\`

> Body parameter

\`\`\`json
{
  "name": "O'Brien"
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
    expect(makeDocs(spec, 'src/index.ts', '/', true, 'http://localhost:3000')).toBe(expected)
  })

  // `const` and the first entry of `examples` win over the type default, and
  // `['string', 'null']` yields a string rather than `null`.
  // `const` と `examples` の先頭要素は型のデフォルト値より優先される。また
  // `['string', 'null']` は `null` ではなく文字列になる。
  it('uses const, examples and the non-null type for example values', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'Values',
        version: '1.0.0',
      },
      paths: {},
      components: {
        schemas: {
          Thing: {
            type: 'object',
            properties: {
              kind: {
                type: 'string',
                const: 'thing',
              },
              label: {
                type: 'string',
                examples: ['first', 'second'],
              },
              nick: {
                type: ['string', 'null'],
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="values">Values v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Schemas

<h2 id="tocS_Thing">Thing</h2>
<!-- backwards compatibility -->
<a id="schemathing"></a>
<a id="schema_Thing"></a>
<a id="tocSthing"></a>
<a id="tocsthing"></a>

\`\`\`json
{
  "kind": "thing",
  "label": "first",
  "nick": "string"
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|kind|string|false|none|none|
|label|string|false|none|none|
|nick|string \\| null|false|none|none|
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // The email doubles as the link text when `contact.name` is absent, and the license
  // name is HTML-escaped even without a link.
  // `contact.name` がない場合はメールアドレスをリンクテキストにも使う。ライセンス名は
  // リンクがなくても HTML エスケープされる。
  it('renders a contact without a name and escapes a license without a url', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'Contact',
        version: '1.0.0',
        contact: {
          email: 'dev@example.com',
        },
        license: {
          name: 'A & B',
        },
      },
      paths: {},
    } as OpenAPI
    const expected = `<h1 id="contact">Contact v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Email: <a href="mailto:dev@example.com">dev@example.com</a> 
License: A &amp; B
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // OpenAPI 3.1 lets a path point at `components.pathItems`. Its operations are
  // documented as if they were written in place.
  // OpenAPI 3.1 ではパスが `components.pathItems` を参照できる。その中のオペレーションは
  // その場に書かれた場合と同じように出力される。
  it('documents a path item given as a $ref', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'PathItemRef',
        version: '1.0.0',
      },
      paths: {
        '/pets': {
          $ref: '#/components/pathItems/Pets',
        },
      },
      components: {
        pathItems: {
          Pets: {
            get: {
              operationId: 'listPets',
              responses: {
                '200': {
                  description: 'OK',
                },
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="pathitemref">PathItemRef v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="pathitemref-default">Default</h1>

## listPets

<a id="opIdlistPets"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /pets \\
  src/index.ts
\`\`\`

\`GET /pets\`

<h3 id="listpets-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // OpenAPI 3.2 keeps methods outside the fixed set, such as `COPY`, under
  // `additionalOperations`. The method name is used as written.
  // OpenAPI 3.2 では `COPY` のような固定セット外のメソッドを `additionalOperations` に置く。
  // メソッド名は書かれたとおりに使われる。
  it('documents an operation declared under additionalOperations', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'AdditionalOps',
        version: '1.0.0',
      },
      paths: {
        '/files/{id}': {
          additionalOperations: {
            COPY: {
              operationId: 'copyFile',
              responses: {
                '200': {
                  description: 'OK',
                },
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="additionalops">AdditionalOps v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="additionalops-default">Default</h1>

## copyFile

<a id="opIdcopyFile"></a>

> Code samples

\`\`\`bash
hono request \\
  -X COPY \\
  -P /files/{id} \\
  src/index.ts
\`\`\`

\`COPY /files/{id}\`

<h3 id="copyfile-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // `#/components/schemas/a~1b` names the schema `a/b` (RFC 6901). Without decoding
  // the reference resolves to nothing and the example is empty.
  // `#/components/schemas/a~1b` はスキーマ `a/b` を指す(RFC 6901)。デコードしないと
  // 参照は解決できず、例が空になる。
  it('decodes ~1 in a $ref to find a schema whose name has a slash', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'PointerEscape',
        version: '1.0.0',
      },
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
                      $ref: '#/components/schemas/a~1b',
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
          'a/b': {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="pointerescape">PointerEscape v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="pointerescape-default">Default</h1>

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
  "id": 0
}
\`\`\`

<h3 id="getx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[a/b](#schemaa/b)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_a/b">a/b</h2>
<!-- backwards compatibility -->
<a id="schemaa/b"></a>
<a id="schema_a/b"></a>
<a id="tocSa/b"></a>
<a id="tocsa/b"></a>

\`\`\`json
{
  "id": 0
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // A bundler replaces a repeated external schema with a pointer to its first use
  // under `paths`. Such a schema has no anchor, so it is rendered inline.
  // バンドラーは重複する外部スキーマを、`paths` 配下の最初の使用箇所へのポインタに置き換える。
  // そのスキーマにはアンカーがないため、インラインとして出力される。
  it('resolves a $ref that points into paths', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'BundledRef',
        version: '1.0.0',
      },
      paths: {
        '/a': {
          get: {
            operationId: 'getA',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'integer',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '/b': {
          get: {
            operationId: 'getB',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/paths/~1a/get/responses/200/content/application~1json/schema',
                    },
                  },
                },
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="bundledref">BundledRef v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="bundledref-default">Default</h1>

## getA

<a id="opIdgetA"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /a \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /a\`

> Example responses

> 200 Response

\`\`\`json
{
  "id": 0
}
\`\`\`

<h3 id="geta-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="geta-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## getB

<a id="opIdgetB"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /b \\
  -H 'Accept: application/json' \\
  src/index.ts
\`\`\`

\`GET /b\`

> Example responses

> 200 Response

\`\`\`json
{
  "id": 0
}
\`\`\`

<h3 id="getb-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="getb-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // `x-internal` is a string, not a path item. It is skipped instead of making
  // the whole `paths` object look invalid.
  // `x-internal` は文字列であり、パスアイテムではない。`paths` 全体を不正とみなすのではなく、
  // その項目だけを読み飛ばす。
  it('keeps documenting paths when paths carries an x- extension', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'PathsExtension',
        version: '1.0.0',
      },
      paths: {
        'x-internal': 'note',
        '/health': {
          get: {
            operationId: 'getHealth',
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="pathsextension">PathsExtension v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="pathsextension-default">Default</h1>

## getHealth

<a id="opIdgetHealth"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /health \\
  src/index.ts
\`\`\`

\`GET /health\`

<h3 id="gethealth-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // Repeating the operation under `B` would repeat every anchor of its section.
  // `B` の下にも同じオペレーションを出すと、そのセクションのアンカーがすべて重複する。
  it('lists an operation with several tags once, under its first tag', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'FirstTag',
        version: '1.0.0',
      },
      paths: {
        '/x': {
          get: {
            operationId: 'getX',
            tags: ['A', 'B'],
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="firsttag">FirstTag v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="firsttag-a">A</h1>

## getX

<a id="opIdgetX"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /x \\
  src/index.ts
\`\`\`

\`GET /x\`

<h3 id="getx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // Both operations are called `List`. The second one gets the `list-1` prefix so
  // that no id appears twice.
  // 2 つのオペレーションはどちらも `List` という名前である。2 つ目には `list-1` の
  // プレフィックスが付き、id は重複しない。
  it('gives operations that share a summary distinct ids', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'DupSummary',
        version: '1.0.0',
      },
      paths: {
        '/a': {
          get: {
            summary: 'List',
            parameters: [
              {
                name: 'q',
                in: 'query',
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
        '/b': {
          get: {
            summary: 'List',
            parameters: [
              {
                name: 'q',
                in: 'query',
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="dupsummary">DupSummary v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="dupsummary-default">Default</h1>

## List

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /a \\
  src/index.ts
\`\`\`

\`GET /a\`

<h3 id="list-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|q|query|string|false|none|

<h3 id="list-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## List

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /b \\
  src/index.ts
\`\`\`

\`GET /b\`

<h3 id="list-1-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|q|query|string|false|none|

<h3 id="list-1-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // Cyrillic, Hangul and accented Latin letters used to be stripped, which left ids
  // such as `-parameters`. They are kept and lower-cased.
  // キリル文字・ハングル・アクセント付きラテン文字は以前は取り除かれ、`-parameters` の
  // ような id が残っていた。これらは保持され、小文字化される。
  it('keeps letters of any script in ids', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'Привет',
        version: '1.0.0',
      },
      paths: {
        '/x': {
          get: {
            summary: '사용자 목록',
            tags: ['Überblick'],
            parameters: [
              {
                name: 'q',
                in: 'query',
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="привет">Привет v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="привет-überblick">Überblick</h1>

## 사용자 목록

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /x \\
  src/index.ts
\`\`\`

\`GET /x\`

<h3 id="사용자-목록-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|q|query|string|false|none|

<h3 id="사용자-목록-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // A line break would end the Markdown heading and `<b>` would open a tag. The
  // `operationId` is escaped inside the anchor as well.
  // 改行は Markdown の見出しを終わらせ、`<b>` はタグを開いてしまう。`operationId` も
  // アンカーの中でエスケープされる。
  it('escapes HTML and folds line breaks in the operation heading', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'HeadingEscape',
        version: '1.0.0',
      },
      paths: {
        '/x': {
          get: {
            summary: 'Get <b>\nitem',
            operationId: 'get"X',
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="headingescape">HeadingEscape v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="headingescape-default">Default</h1>

## Get &lt;b&gt; item

<a id="opIdget&quot;X"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /x \\
  src/index.ts
\`\`\`

\`GET /x\`

<h3 id="get-b-item-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // `v2` stays `v2` instead of becoming `vv2`.
  // `v2` は `vv2` にならず、`v2` のままになる。
  it('does not prefix a version that already starts with v', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'VersionV',
        version: 'v2',
      },
      paths: {},
    } as OpenAPI
    const expected = `<h1 id="versionv">VersionV v2</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // RFC 9110 makes the scheme case-insensitive, so `Bearer` is the bearer scheme.
  // RFC 9110 ではスキームは大文字小文字を区別しない。そのため `Bearer` は bearer スキームである。
  it('matches the http scheme case-insensitively', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'BearerCase',
        version: '1.0.0',
      },
      paths: {
        '/me': {
          get: {
            operationId: 'getMe',
            security: [
              {
                auth: [],
              },
            ],
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
      components: {
        securitySchemes: {
          auth: {
            type: 'http',
            scheme: 'Bearer',
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="bearercase">BearerCase v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Authentication

- HTTP Authentication, scheme: bearer

<h1 id="bearercase-default">Default</h1>

## getMe

<a id="opIdgetMe"></a>

> Code samples

\`\`\`bash
curl http://localhost:3000/me \\
  -H "Authorization: Bearer \${ACCESS_TOKEN}"
\`\`\`

\`GET /me\`

<h3 id="getme-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
auth
</aside>
`
    expect(makeDocs(spec, 'src/index.ts', '/', true, 'http://localhost:3000')).toBe(expected)
  })

  // `Digest` is reported in lower case, `mutualTLS` gets its own line and an apiKey
  // with no `name` falls back to the scheme key instead of printing `undefined`.
  // `Digest` は小文字で出力され、`mutualTLS` は専用の行を持つ。`name` のない apiKey は
  // `undefined` と出力する代わりにスキームのキーを使う。
  it('describes other http schemes, mutualTLS and an apiKey without a name', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'OtherSchemes',
        version: '1.0.0',
      },
      paths: {},
      components: {
        securitySchemes: {
          digest: {
            type: 'http',
            scheme: 'Digest',
            description: 'Digest auth',
          },
          mtls: {
            type: 'mutualTLS',
            description: 'Client certificate',
          },
          key: {
            type: 'apiKey',
            in: 'header',
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="otherschemes">OtherSchemes v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Authentication

- HTTP Authentication, scheme: digest Digest auth

- Mutual TLS authentication. Client certificate

* API Key (key)
    - Parameter Name: **key**, in: header.
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // `alias` points at `real`. The operation gets the bearer header, and the scheme
  // is described once, under the entry that defines it.
  // `alias` は `real` を参照する。オペレーションには bearer のヘッダーが付き、スキームの説明は
  // 定義している項目の下に 1 回だけ出力される。
  it('resolves a security scheme given as a $ref', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'SchemeRef',
        version: '1.0.0',
      },
      paths: {
        '/me': {
          get: {
            operationId: 'getMe',
            security: [
              {
                alias: [],
              },
            ],
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
      components: {
        securitySchemes: {
          alias: {
            $ref: '#/components/securitySchemes/real',
          },
          real: {
            type: 'http',
            scheme: 'bearer',
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="schemeref">SchemeRef v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Authentication

- HTTP Authentication, scheme: bearer

<h1 id="schemeref-default">Default</h1>

## getMe

<a id="opIdgetMe"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /me \\
  -H "Authorization: Bearer \${ACCESS_TOKEN}" \\
  src/index.ts
\`\`\`

\`GET /me\`

<h3 id="getme-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
alias
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // The refresh URL follows the token URL, and the `|` in the scope description
  // does not split the table cell.
  // Refresh URL は Token URL の後に続く。スコープ説明中の `|` は表のセルを分割しない。
  it('lists the refresh url of an oauth2 flow and escapes scope descriptions', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'OAuthUrls',
        version: '1.0.0',
      },
      paths: {},
      components: {
        securitySchemes: {
          oauth: {
            type: 'oauth2',
            flows: {
              authorizationCode: {
                authorizationUrl: 'https://example.com/auth',
                tokenUrl: 'https://example.com/token',
                refreshUrl: 'https://example.com/refresh',
                scopes: {
                  read: 'Read | list',
                },
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="oauthurls">OAuthUrls v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Authentication

- oAuth2 authentication.

    - Flow: authorizationCode
    - Authorization URL = [https://example.com/auth](https://example.com/auth)
    - Token URL = [https://example.com/token](https://example.com/token)
    - Refresh URL = [https://example.com/refresh](https://example.com/refresh)

|Scope|Scope Description|
|---|---|
|read|Read \\| list|
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // The url is double-quoted so that the shell expands `${API_KEY}`.
  // シェルが `${API_KEY}` を展開できるよう、URL はダブルクォートで囲まれる。
  it('puts a query apiKey into the url of the code sample', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'ApiKeyQuery',
        version: '1.0.0',
      },
      paths: {
        '/data': {
          get: {
            operationId: 'getData',
            security: [
              {
                key: [],
              },
            ],
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
      components: {
        securitySchemes: {
          key: {
            type: 'apiKey',
            in: 'query',
            name: 'api_key',
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="apikeyquery">ApiKeyQuery v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Authentication

* API Key (key)
    - Parameter Name: **api_key**, in: query.

<h1 id="apikeyquery-default">Default</h1>

## getData

<a id="opIdgetData"></a>

> Code samples

\`\`\`bash
curl "http://localhost:3000/data?api_key=\${API_KEY}"
\`\`\`

\`GET /data\`

<h3 id="getdata-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
key
</aside>
`
    expect(makeDocs(spec, 'src/index.ts', '/', true, 'http://localhost:3000')).toBe(expected)
  })

  // The header is double-quoted so that the shell expands `${API_KEY}`.
  // シェルが `${API_KEY}` を展開できるよう、ヘッダーはダブルクォートで囲まれる。
  it('sends a cookie apiKey as a Cookie header', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'ApiKeyCookie',
        version: '1.0.0',
      },
      paths: {
        '/data': {
          get: {
            operationId: 'getData',
            security: [
              {
                key: [],
              },
            ],
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
      components: {
        securitySchemes: {
          key: {
            type: 'apiKey',
            in: 'cookie',
            name: 'sid',
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="apikeycookie">ApiKeyCookie v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Authentication

* API Key (key)
    - Parameter Name: **sid**, in: cookie.

<h1 id="apikeycookie-default">Default</h1>

## getData

<a id="opIdgetData"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /data \\
  -H "Cookie: sid=\${API_KEY}" \\
  src/index.ts
\`\`\`

\`GET /data\`

<h3 id="getdata-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
key
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // `{}` among the requirements allows anonymous calls. The first requirement is
  // the empty one, so the code sample sends no credentials.
  // 要求の中の `{}` は匿名での呼び出しを許可する。最初の要求が空なので、コードサンプルは
  // 認証情報を送らない。
  it('reports authentication as optional when a requirement is empty', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'OptionalAuth',
        version: '1.0.0',
      },
      paths: {
        '/data': {
          get: {
            operationId: 'getData',
            security: [
              {},
              {
                bearerAuth: [],
              },
            ],
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="optionalauth">OptionalAuth v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Authentication

- HTTP Authentication, scheme: bearer

<h1 id="optionalauth-default">Default</h1>

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
Authentication is optional for this operation. To authenticate, use one of the following methods:
bearerAuth
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // Without them the sample fails validation. The optional `page` is left out and
  // `Accept` is skipped because OpenAPI ignores a header parameter of that name.
  // The path is quoted since `?` is a glob character.
  // これらがないとサンプルはバリデーションに失敗する。任意の `page` は含めず、`Accept` は
  // OpenAPI がその名前のヘッダーパラメータを無視するため読み飛ばす。
  // `?` はグロブ文字なので、パスはクォートされる。
  it('sends required query, header and cookie parameters in the code sample', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'RequiredParams',
        version: '1.0.0',
      },
      paths: {
        '/search': {
          get: {
            operationId: 'search',
            parameters: [
              {
                name: 'q',
                in: 'query',
                required: true,
                schema: {
                  type: 'string',
                },
                example: 'a b&c',
              },
              {
                name: 'page',
                in: 'query',
                schema: {
                  type: 'integer',
                },
              },
              {
                name: 'X-Request-Id',
                in: 'header',
                required: true,
                schema: {
                  type: 'string',
                  format: 'uuid',
                },
              },
              {
                name: 'Accept',
                in: 'header',
                required: true,
                schema: {
                  type: 'string',
                },
              },
              {
                name: 'session',
                in: 'cookie',
                required: true,
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="requiredparams">RequiredParams v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="requiredparams-default">Default</h1>

## search

<a id="opIdsearch"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P '/search?q=a%20b%26c' \\
  -H 'X-Request-Id: 497f6eca-6276-4993-bfeb-53cbbbba6f08' \\
  -H 'Cookie: session=string' \\
  src/index.ts
\`\`\`

\`GET /search\`

<h3 id="search-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|q|query|string|true|none|
|page|query|integer|false|none|
|X-Request-Id|header|string(uuid)|true|none|
|Accept|header|string|true|none|
|session|cookie|string|true|none|

<h3 id="search-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // The default `form` style repeats an array, `explode: false` joins it with commas
  // and `deepObject` writes `filter[status]`.
  // デフォルトの `form` スタイルは配列を繰り返し、`explode: false` はカンマで連結し、
  // `deepObject` は `filter[status]` と書く。
  it('serializes query parameters by their style and explode', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'QueryStyles',
        version: '1.0.0',
      },
      paths: {
        '/items': {
          get: {
            operationId: 'listItems',
            parameters: [
              {
                name: 'tags',
                in: 'query',
                required: true,
                schema: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
                example: ['a', 'b'],
              },
              {
                name: 'ids',
                in: 'query',
                required: true,
                explode: false,
                schema: {
                  type: 'array',
                  items: {
                    type: 'integer',
                  },
                },
                example: [1, 2],
              },
              {
                name: 'filter',
                in: 'query',
                required: true,
                style: 'deepObject',
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                    },
                  },
                },
                example: {
                  status: 'open',
                },
              },
            ],
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="querystyles">QueryStyles v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="querystyles-default">Default</h1>

## listItems

<a id="opIdlistItems"></a>

> Code samples

\`\`\`bash
curl 'http://localhost:3000/items?tags=a&tags=b&ids=1%2C2&filter%5Bstatus%5D=open'
\`\`\`

\`GET /items\`

<h3 id="listitems-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|tags|query|[string]|true|none|
|ids|query|[integer]|true|none|
|filter|query|object|true|none|

<h3 id="listitems-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec, 'src/index.ts', '/', true, 'http://localhost:3000')).toBe(expected)
  })

  // curl writes the boundary into the header itself; a hand-written header would
  // drop it. The binary field is sent as a file.
  // curl は boundary をヘッダーに自分で書き込む。手書きのヘッダーだと boundary が失われる。
  // バイナリのフィールドはファイルとして送られる。
  it('sends a multipart body with -F and no Content-Type header in curl', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'Multipart',
        version: '1.0.0',
      },
      paths: {
        '/upload': {
          post: {
            operationId: 'upload',
            requestBody: {
              required: true,
              content: {
                'multipart/form-data': {
                  schema: {
                    type: 'object',
                    properties: {
                      title: {
                        type: 'string',
                      },
                      file: {
                        type: 'string',
                        format: 'binary',
                      },
                    },
                    required: ['file'],
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="multipart">Multipart v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="multipart-default">Default</h1>

## upload

<a id="opIdupload"></a>

> Code samples

\`\`\`bash
curl http://localhost:3000/upload \\
  -X POST \\
  -F 'title=string' \\
  -F 'file=@/path/to/file'
\`\`\`

\`POST /upload\`

> Body parameter

\`\`\`yaml
title: string
file: string
\`\`\`

<h3 id="upload-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» title|body|string|false|none|
|» file|body|string(binary)|true|none|

<h3 id="upload-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec, 'src/index.ts', '/', true, 'http://localhost:3000')).toBe(expected)
  })

  // `hono request` sends `-d` as is and has no option for form parts. The parts are
  // written out with CRLF inside `$'...'`, and the header names their boundary.
  // `hono request` は `-d` をそのまま送り、フォームパート用のオプションを持たない。
  // 各パートは `$'...'` の中に CRLF 付きで書き出され、ヘッダーがその boundary を示す。
  it('frames a multipart body by hand for hono request', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'Multipart',
        version: '1.0.0',
      },
      paths: {
        '/upload': {
          post: {
            operationId: 'upload',
            requestBody: {
              required: true,
              content: {
                'multipart/form-data': {
                  schema: {
                    type: 'object',
                    properties: {
                      title: {
                        type: 'string',
                      },
                      file: {
                        type: 'string',
                        format: 'binary',
                      },
                    },
                    required: ['file'],
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="multipart">Multipart v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="multipart-default">Default</h1>

## upload

<a id="opIdupload"></a>

> Code samples

\`\`\`bash
hono request \\
  -X POST \\
  -P /upload \\
  -H 'Content-Type: multipart/form-data; boundary=boundary' \\
  -d $'--boundary\\r\\nContent-Disposition: form-data; name="title"\\r\\n\\r\\nstring\\r\\n--boundary\\r\\nContent-Disposition: form-data; name="file"; filename="file"\\r\\nContent-Type: application/octet-stream\\r\\n\\r\\nfile contents\\r\\n--boundary--\\r\\n' \\
  src/index.ts
\`\`\`

\`POST /upload\`

> Body parameter

\`\`\`yaml
title: string
file: string
\`\`\`

<h3 id="upload-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» title|body|string|false|none|
|» file|body|string(binary)|true|none|

<h3 id="upload-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // The example of a `text/plain` body is not JSON-encoded, and its single quote
  // is escaped for the shell.
  // `text/plain` のボディの例は JSON エンコードされない。シングルクォートはシェル向けに
  // エスケープされる。
  it('sends a text body as is', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'TextBody',
        version: '1.0.0',
      },
      paths: {
        '/notes': {
          post: {
            operationId: 'createNote',
            requestBody: {
              content: {
                'text/plain': {
                  schema: {
                    type: 'string',
                  },
                  example: "it's a note",
                },
              },
            },
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="textbody">TextBody v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="textbody-default">Default</h1>

## createNote

<a id="opIdcreateNote"></a>

> Code samples

\`\`\`bash
curl http://localhost:3000/notes \\
  -X POST \\
  -H 'Content-Type: text/plain' \\
  -d 'it'\\''s a note'
\`\`\`

\`POST /notes\`

> Body parameter

\`\`\`text
it's a note
\`\`\`

<h3 id="createnote-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|string|false|none|

<h3 id="createnote-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec, 'src/index.ts', '/', true, 'http://localhost:3000')).toBe(expected)
  })

  // A binary body has no text to show, so there is no Body parameter block.
  // バイナリのボディには表示できるテキストがないため、Body parameter のブロックは出力しない。
  it('sends a binary body from a file', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'BinaryBody',
        version: '1.0.0',
      },
      paths: {
        '/blobs': {
          put: {
            operationId: 'putBlob',
            requestBody: {
              content: {
                'application/octet-stream': {
                  schema: {
                    type: 'string',
                    format: 'binary',
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="binarybody">BinaryBody v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="binarybody-default">Default</h1>

## putBlob

<a id="opIdputBlob"></a>

> Code samples

\`\`\`bash
curl http://localhost:3000/blobs \\
  -X PUT \\
  -H 'Content-Type: application/octet-stream' \\
  --data-binary '@/path/to/file'
\`\`\`

\`PUT /blobs\`

<h3 id="putblob-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|string(binary)|false|none|

<h3 id="putblob-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec, 'src/index.ts', '/', true, 'http://localhost:3000')).toBe(expected)
  })

  // The schema sits under `content`. The type column links to it instead of
  // falling back to `object`.
  // スキーマは `content` の下にある。Type 列は `object` にフォールバックせず、
  // そのスキーマへリンクする。
  it('reads the type of a parameter that uses content instead of schema', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'ParamContent',
        version: '1.0.0',
      },
      paths: {
        '/x': {
          get: {
            operationId: 'getX',
            parameters: [
              {
                name: 'filter',
                in: 'query',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Filter',
                    },
                  },
                },
              },
            ],
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
      components: {
        schemas: {
          Filter: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="paramcontent">ParamContent v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="paramcontent-default">Default</h1>

## getX

<a id="opIdgetX"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /x \\
  src/index.ts
\`\`\`

\`GET /x\`

<h3 id="getx-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|filter|query|[Filter](#schemafilter)|false|none|

<h3 id="getx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Filter">Filter</h2>
<!-- backwards compatibility -->
<a id="schemafilter"></a>
<a id="schema_Filter"></a>
<a id="tocSfilter"></a>
<a id="tocsfilter"></a>

\`\`\`json
{
  "status": "string"
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|string|false|none|none|
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // The operation gets a warning, and each deprecated row says so in its description.
  // オペレーションには警告が付き、非推奨の各行は Description でそのことを示す。
  it('marks a deprecated operation, parameter and property', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'Deprecated',
        version: '1.0.0',
      },
      paths: {
        '/old/{id}': {
          post: {
            operationId: 'oldOp',
            deprecated: true,
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                deprecated: true,
                description: 'Use slug',
                schema: {
                  type: 'string',
                },
              },
              {
                name: 'v',
                in: 'query',
                deprecated: true,
                schema: {
                  type: 'string',
                },
              },
            ],
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      legacy: {
                        type: 'string',
                        deprecated: true,
                      },
                    },
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="deprecated">Deprecated v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="deprecated-default">Default</h1>

## oldOp

<a id="opIdoldOp"></a>

> Code samples

\`\`\`bash
hono request \\
  -X POST \\
  -P /old/string \\
  -H 'Content-Type: application/json' \\
  -d '{
    "legacy": "string"
  }' \\
  src/index.ts
\`\`\`

\`POST /old/{id}\`

<aside class="warning">
This operation is deprecated
</aside>

> Body parameter

\`\`\`json
{
  "legacy": "string"
}
\`\`\`

<h3 id="oldop-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|**Deprecated.** Use slug|
|v|query|string|false|**Deprecated.**|
|body|body|object|false|none|
|» legacy|body|string|false|**Deprecated.**|

<h3 id="oldop-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // The `body` row used to say `none` whatever the document said.
  // `body` 行は以前、ドキュメントの内容にかかわらず `none` と表示していた。
  it('shows the description of the request body', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'BodyDescription',
        version: '1.0.0',
      },
      paths: {
        '/x': {
          post: {
            operationId: 'postX',
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
              description: 'The thing to create',
            },
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="bodydescription">BodyDescription v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="bodydescription-default">Default</h1>

## postX

<a id="opIdpostX"></a>

> Code samples

\`\`\`bash
hono request \\
  -X POST \\
  -P /x \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "string"
  }' \\
  src/index.ts
\`\`\`

\`POST /x\`

> Body parameter

\`\`\`json
{
  "name": "string"
}
\`\`\`

<h3 id="postx-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|The thing to create|
|» name|body|string|false|none|

<h3 id="postx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // The item properties are listed under `body`, and an array property is expanded
  // one level deeper, as it is for responses.
  // 要素のプロパティは `body` の下に並ぶ。配列のプロパティは、レスポンスと同じように
  // もう 1 段深く展開される。
  it('expands a request body that is an array of objects', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'BodyArray',
        version: '1.0.0',
      },
      paths: {
        '/x': {
          post: {
            operationId: 'postX',
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        name: {
                          type: 'string',
                        },
                        tags: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              label: {
                                type: 'string',
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
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="bodyarray">BodyArray v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="bodyarray-default">Default</h1>

## postX

<a id="opIdpostX"></a>

> Code samples

\`\`\`bash
hono request \\
  -X POST \\
  -P /x \\
  -H 'Content-Type: application/json' \\
  -d '[
    {
      "name": "string",
      "tags": [
        {
          "label": "string"
        }
      ]
    }
  ]' \\
  src/index.ts
\`\`\`

\`POST /x\`

> Body parameter

\`\`\`json
[
  {
    "name": "string",
    "tags": [
      {
        "label": "string"
      }
    ]
  }
]
\`\`\`

<h3 id="postx-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[object]|false|none|
|» name|body|string|false|none|
|» tags|body|[object]|false|none|
|» » label|body|string|false|none|

<h3 id="postx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // The example shows two entries and the table has an `additionalProperties` row
  // followed by the fields of each value.
  // 例には 2 つのエントリが入り、表には `additionalProperties` の行と、各値のフィールドが並ぶ。
  it('documents a map declared with additionalProperties', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'AdditionalProps',
        version: '1.0.0',
      },
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
                      type: 'object',
                      additionalProperties: {
                        type: 'object',
                        properties: {
                          count: {
                            type: 'integer',
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
      },
    } as OpenAPI
    const expected = `<h1 id="additionalprops">AdditionalProps v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="additionalprops-default">Default</h1>

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
  "property1": {
    "count": 0
  },
  "property2": {
    "count": 0
  }
}
\`\`\`

<h3 id="getx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="getx-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|**additionalProperties**|object|false|none|none|
|» count|integer|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // `name` is declared in `Base` and made required by a sibling part that holds
  // nothing but `required`.
  // `name` は `Base` で宣言され、`required` だけを持つ兄弟のパートによって必須になる。
  it('applies required declared in another allOf part', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'AllOfRequired',
        version: '1.0.0',
      },
      paths: {
        '/x': {
          post: {
            operationId: 'postX',
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      {
                        $ref: '#/components/schemas/Base',
                      },
                      {
                        required: ['name'],
                      },
                    ],
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
      components: {
        schemas: {
          Base: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              note: {
                type: 'string',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="allofrequired">AllOfRequired v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="allofrequired-default">Default</h1>

## postX

<a id="opIdpostX"></a>

> Code samples

\`\`\`bash
hono request \\
  -X POST \\
  -P /x \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "string",
    "note": "string"
  }' \\
  src/index.ts
\`\`\`

\`POST /x\`

> Body parameter

\`\`\`json
{
  "name": "string",
  "note": "string"
}
\`\`\`

<h3 id="postx-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» name|body|string|true|none|
|» note|body|string|false|none|

<h3 id="postx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

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
  "name": "string",
  "note": "string"
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
|note|string|false|none|none|
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // `id` is read-only and `password` is write-only. The Schemas section describes
  // the definition itself and keeps both, with their restriction.
  // `id` は読み取り専用、`password` は書き込み専用である。Schemas セクションは定義そのものを
  // 説明するので、両方を制約付きで残す。
  it('leaves readOnly out of requests and writeOnly out of responses', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'Direction',
        version: '1.0.0',
      },
      paths: {
        '/users': {
          post: {
            operationId: 'createUser',
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
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
                      $ref: '#/components/schemas/User',
                    },
                  },
                },
              },
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        user: {
                          $ref: '#/components/schemas/User',
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
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                readOnly: true,
              },
              name: {
                type: 'string',
              },
              password: {
                type: 'string',
                writeOnly: true,
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="direction">Direction v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="direction-default">Default</h1>

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
    "name": "string",
    "password": "string"
  }' \\
  src/index.ts
\`\`\`

\`POST /users\`

> Body parameter

\`\`\`json
{
  "name": "string",
  "password": "string"
}
\`\`\`

<h3 id="createuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[User](#schemauser)|false|none|
|» name|body|string|false|none|
|» password|body|string|false|none|

> Example responses

> 200 Response

\`\`\`json
{
  "user": {
    "id": 0,
    "name": "string"
  }
}
\`\`\`

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
|200|OK|OK|Inline|
|201|Created|Created|[User](#schemauser)|

<h3 id="createuser-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|user|[User](#schemauser)|false|none|none|
|» id|integer|false|read-only|none|
|» name|string|false|none|none|

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
  "name": "string",
  "password": "string"
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|read-only|none|
|name|string|false|none|none|
|password|string|false|write-only|none|
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // `owner` has no description of its own and takes the one of `User`; `editor`
  // keeps the description written next to its `$ref`.
  // `owner` は自身の説明を持たないので `User` の説明を使う。`editor` は `$ref` の隣に
  // 書かれた説明を保つ。
  it('falls back to the description of the referenced schema', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'RefDescription',
        version: '1.0.0',
      },
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
                      type: 'object',
                      properties: {
                        owner: {
                          $ref: '#/components/schemas/User',
                        },
                        editor: {
                          $ref: '#/components/schemas/User',
                          description: 'Last editor',
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
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
            description: 'A user',
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="refdescription">RefDescription v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="refdescription-default">Default</h1>

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
  "owner": {
    "name": "string"
  },
  "editor": {
    "name": "string"
  }
}
\`\`\`

<h3 id="getx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="getx-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|owner|[User](#schemauser)|false|none|A user|
|» name|string|false|none|none|
|editor|[User](#schemauser)|false|none|Last editor|
|» name|string|false|none|none|

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
  "name": "string"
}
\`\`\`

A user

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // `nullable: true` is the OpenAPI 3.0 spelling of `| null`. A schema without
  // `type` takes it from `const` or `enum`, and a union lists its variants.
  // `nullable: true` は `| null` の OpenAPI 3.0 での書き方である。`type` のないスキーマは
  // `const` や `enum` から型を決め、ユニオンは各バリアントを並べる。
  it('formats nullable, const, enum, oneOf and tuple types', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'TypeFormat',
        version: '1.0.0',
      },
      paths: {},
      components: {
        schemas: {
          Thing: {
            type: 'object',
            properties: {
              nullable30: {
                type: 'string',
                nullable: true,
              },
              constOnly: {
                const: 5,
              },
              enumOnly: {
                enum: ['a', 'b'],
              },
              union: {
                oneOf: [
                  {
                    $ref: '#/components/schemas/Cat',
                  },
                  {
                    type: 'string',
                  },
                ],
              },
              tuple: {
                type: 'array',
                prefixItems: [
                  {
                    type: 'string',
                  },
                  {
                    type: 'integer',
                  },
                ],
              },
            },
          },
          Cat: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="typeformat">TypeFormat v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Schemas

<h2 id="tocS_Thing">Thing</h2>
<!-- backwards compatibility -->
<a id="schemathing"></a>
<a id="schema_Thing"></a>
<a id="tocSthing"></a>
<a id="tocsthing"></a>

\`\`\`json
{
  "nullable30": "string",
  "constOnly": 5,
  "enumOnly": "a",
  "union": {
    "name": "string"
  },
  "tuple": [
    "string",
    0
  ]
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|nullable30|string \\| null|false|none|none|
|constOnly|integer|false|none|none|
|enumOnly|string|false|none|none|
|union|[Cat](#schemacat) \\| string|false|none|none|
|tuple|[string, integer]|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|enumOnly|a|
|enumOnly|b|

<h2 id="tocS_Cat">Cat</h2>
<!-- backwards compatibility -->
<a id="schemacat"></a>
<a id="schema_Cat"></a>
<a id="tocScat"></a>
<a id="tocscat"></a>

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
    expect(makeDocs(spec)).toBe(expected)
  })

  // `2XX`, `4xx` and `default` are not status codes, so they have no reason phrase.
  // `2XX`・`4xx`・`default` はステータスコードではないため、reason phrase を持たない。
  it('names status ranges and the default response', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'StatusRange',
        version: '1.0.0',
      },
      paths: {
        '/x': {
          get: {
            operationId: 'getX',
            responses: {
              '2XX': {
                description: 'Any success',
              },
              '4xx': {
                description: 'Any client error',
              },
              default: {
                description: 'Anything else',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="statusrange">StatusRange v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="statusrange-default">Default</h1>

## getX

<a id="opIdgetX"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /x \\
  src/index.ts
\`\`\`

\`GET /x\`

<h3 id="getx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|2XX|Successful|Any success|None|
|4xx|Client Error|Any client error|None|
|default|Default|Anything else|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // The second header is a `$ref` to `components.headers`.
  // 2 つ目のヘッダーは `components.headers` への `$ref` である。
  it('lists response headers', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'ResponseHeaders',
        version: '1.0.0',
      },
      paths: {
        '/x': {
          get: {
            operationId: 'getX',
            responses: {
              '200': {
                description: 'OK',
                headers: {
                  'X-Rate-Limit': {
                    description: 'Requests per hour',
                    schema: {
                      type: 'integer',
                      format: 'int32',
                    },
                  },
                  'X-Trace': {
                    $ref: '#/components/headers/Trace',
                  },
                },
              },
            },
          },
        },
      },
      components: {
        headers: {
          Trace: {
            schema: {
              type: 'string',
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="responseheaders">ResponseHeaders v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="responseheaders-default">Default</h1>

## getX

<a id="opIdgetX"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /x \\
  src/index.ts
\`\`\`

\`GET /x\`

<h3 id="getx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|X-Rate-Limit|integer|int32|Requests per hour|
|200|X-Trace|string||none|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // The example contains a line of three backticks, so the fence uses four.
  // 例にはバッククォート 3 つの行が含まれるため、フェンスには 4 つを使う。
  it('shows the example of a non-JSON response in a fence it cannot close', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'TextResponse',
        version: '1.0.0',
      },
      paths: {
        '/x': {
          get: {
            operationId: 'getX',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'text/plain': {
                    schema: {
                      type: 'string',
                    },
                    example: 'use ``` to fence\n```\ncode',
                  },
                },
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="textresponse">TextResponse v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="textresponse-default">Default</h1>

## getX

<a id="opIdgetX"></a>

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

\`\`\`\`text
use \`\`\` to fence
\`\`\`
code
\`\`\`\`

<h3 id="getx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // The Schema column stays `None`, but the example is still worth showing.
  // Schema 列は `None` のままだが、例は出力する。
  it('shows the example of a media type that has no schema', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'ExampleOnly',
        version: '1.0.0',
      },
      paths: {
        '/x': {
          get: {
            operationId: 'getX',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    example: {
                      ok: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="exampleonly">ExampleOnly v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="exampleonly-default">Default</h1>

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
  "ok": true
}
\`\`\`

<h3 id="getx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // Numbers stay inside their range, strings inside their length, arrays hold
  // `minItems` items, `default` and keyed `examples` are used, and an object or
  // array without members is `{}` or `[]` rather than `null`.
  // 数値は範囲内、文字列は長さの範囲内に収まり、配列は `minItems` 個の要素を持つ。
  // `default` とキー付きの `examples` が使われ、メンバーのないオブジェクトや配列は
  // `null` ではなく `{}` や `[]` になる。
  it('generates example values that satisfy the declared constraints', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'Constraints',
        version: '1.0.0',
      },
      paths: {},
      components: {
        schemas: {
          Limits: {
            type: 'object',
            properties: {
              min: {
                type: 'integer',
                minimum: 5,
              },
              exclusive31: {
                type: 'integer',
                exclusiveMinimum: 5,
              },
              exclusive30: {
                type: 'integer',
                minimum: 5,
                exclusiveMinimum: true,
              },
              negative: {
                type: 'integer',
                maximum: -3,
              },
              multiple: {
                type: 'integer',
                minimum: 1,
                multipleOf: 5,
              },
              ratio: {
                type: 'number',
                exclusiveMinimum: 0,
                maximum: 1,
              },
              long: {
                type: 'string',
                minLength: 10,
              },
              short: {
                type: 'string',
                maxLength: 3,
              },
              pair: {
                type: 'array',
                minItems: 2,
                items: {
                  type: 'string',
                },
              },
              none: {
                type: 'array',
                maxItems: 0,
                items: {
                  type: 'string',
                },
              },
              fallback: {
                type: 'string',
                default: 'draft',
              },
              keyed: {
                type: 'string',
                examples: {
                  first: {
                    value: 'keyed value',
                  },
                },
              },
              empty: {
                type: 'object',
              },
              list: {
                type: 'array',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="constraints">Constraints v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Schemas

<h2 id="tocS_Limits">Limits</h2>
<!-- backwards compatibility -->
<a id="schemalimits"></a>
<a id="schema_Limits"></a>
<a id="tocSlimits"></a>
<a id="tocslimits"></a>

\`\`\`json
{
  "min": 5,
  "exclusive31": 6,
  "exclusive30": 6,
  "negative": -3,
  "multiple": 5,
  "ratio": 0.1,
  "long": "stringstri",
  "short": "str",
  "pair": [
    "string",
    "string"
  ],
  "none": [],
  "fallback": "draft",
  "keyed": "keyed value",
  "empty": {},
  "list": []
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|min|integer|false|none|none|
|exclusive31|integer|false|none|none|
|exclusive30|integer|false|none|none|
|negative|integer|false|none|none|
|multiple|integer|false|none|none|
|ratio|number|false|none|none|
|long|string|false|none|none|
|short|string|false|none|none|
|pair|[string]|false|none|none|
|none|[string]|false|none|none|
|fallback|string|false|none|none|
|keyed|string|false|none|none|
|empty|object|false|none|none|
|list|array|false|none|none|
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // `oneOf: [null, object]` is a nullable object, so the object is the example. A
  // tuple takes one value per `prefixItems` entry.
  // `oneOf: [null, object]` は null 許容のオブジェクトなので、オブジェクトが例になる。
  // タプルは `prefixItems` の各要素から 1 つずつ値を取る。
  it('skips a null variant and reads prefixItems for the example', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'NullVariant',
        version: '1.0.0',
      },
      paths: {},
      components: {
        schemas: {
          Maybe: {
            oneOf: [
              {
                type: 'null',
              },
              {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                  },
                },
              },
            ],
          },
          Pair: {
            type: 'array',
            prefixItems: [
              {
                type: 'string',
              },
              {
                type: 'integer',
              },
            ],
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="nullvariant">NullVariant v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Schemas

<h2 id="tocS_Maybe">Maybe</h2>
<!-- backwards compatibility -->
<a id="schemamaybe"></a>
<a id="schema_Maybe"></a>
<a id="tocSmaybe"></a>
<a id="tocsmaybe"></a>

\`\`\`json
{
  "id": 0
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*oneOf*|null|false|none|none|
|*oneOf*|object|false|none|none|
|id|integer|false|none|none|

<h2 id="tocS_Pair">Pair</h2>
<!-- backwards compatibility -->
<a id="schemapair"></a>
<a id="schema_Pair"></a>
<a id="tocSpair"></a>
<a id="tocspair"></a>

\`\`\`json
[
  "string",
  0
]
\`\`\`
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // An external docs entry without a description gets a generic label.
  // 説明のない external docs には汎用のラベルが付く。
  it('renders summary, terms of service, contact url and external docs', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'Info',
        version: '1.0.0',
        summary: 'A short summary',
        description: 'A longer description',
        termsOfService: 'https://example.com/terms',
        contact: {
          name: 'Support',
          url: 'https://example.com/support',
        },
      },
      externalDocs: {
        url: 'https://example.com/docs',
        description: 'Full guide',
      },
      paths: {
        '/x': {
          get: {
            operationId: 'getX',
            externalDocs: {
              url: 'https://example.com/docs/x',
            },
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="info">Info v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

A short summary

A longer description

<a href="https://example.com/terms">Terms of service</a>
Web: <a href="https://example.com/support">Support</a> 

<a href="https://example.com/docs">Full guide</a>

<h1 id="info-default">Default</h1>

## getX

<a id="opIdgetX"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /x \\
  src/index.ts
\`\`\`

\`GET /x\`

<a href="https://example.com/docs/x">External documentation</a>

<h3 id="getx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // A variable without a default keeps its placeholder.
  // デフォルト値のない変数はプレースホルダーのまま残る。
  it('fills server variables with their defaults and shows the description', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'Servers',
        version: '1.0.0',
      },
      paths: {},
      servers: [
        {
          url: 'https://{region}.example.com/{version}',
          description: 'Production <EU>',
          variables: {
            region: {
              default: 'eu',
            },
            version: {
              default: 'v1',
            },
          },
        },
        {
          url: 'https://{tenant}.example.com',
        },
      ],
    } as OpenAPI
    const expected = `<h1 id="servers">Servers v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Base URLs:

* <a href="https://eu.example.com/v1">https://eu.example.com/v1</a> - Production &lt;EU&gt;

* <a href="https://{tenant}.example.com">https://{tenant}.example.com</a>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // An empty string would leave the cell blank, so it is written as `""`.
  // 空文字はセルを空にしてしまうため、`""` と書く。
  it('shows the schema description and spells out empty and null enum values', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'SchemaDescription',
        version: '1.0.0',
      },
      paths: {},
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              role: {
                type: 'string',
                enum: ['', null, 'admin'],
              },
            },
            description: 'A registered user',
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="schemadescription">SchemaDescription v1.0.0</h1>

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
  "role": ""
}
\`\`\`

A registered user

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|role|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|role|""|
|role|null|
|role|admin|
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // A webhook is a request the API sends, so there is nothing to call.
  // Webhook は API 側が送るリクエストなので、呼び出すものがない。
  it('documents webhooks without a code sample', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'Webhooks',
        version: '1.0.0',
      },
      paths: {},
      webhooks: {
        newPet: {
          post: {
            operationId: 'onNewPet',
            summary: 'New pet',
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'integer',
                      },
                    },
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="webhooks">Webhooks v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="webhooks-webhooks">Webhooks</h1>

## New pet

<a id="opIdonNewPet"></a>

\`POST newPet\`

> Body parameter

\`\`\`json
{
  "id": 0
}
\`\`\`

<h3 id="new-pet-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» id|body|integer|false|none|

<h3 id="new-pet-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // One row per callback, expression and method.
  // コールバック・式・メソッドごとに 1 行を出力する。
  it('lists the callbacks of an operation', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'Callbacks',
        version: '1.0.0',
      },
      paths: {
        '/subscribe': {
          post: {
            operationId: 'subscribe',
            callbacks: {
              onEvent: {
                '{$request.body#/callbackUrl}': {
                  post: {
                    summary: 'Event | delivered',
                    responses: {
                      '200': {
                        description: 'OK',
                      },
                    },
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="callbacks">Callbacks v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="callbacks-default">Default</h1>

## subscribe

<a id="opIdsubscribe"></a>

> Code samples

\`\`\`bash
hono request \\
  -X POST \\
  -P /subscribe \\
  src/index.ts
\`\`\`

\`POST /subscribe\`

<h3 id="subscribe-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<h3 id="subscribe-callbacks">Callbacks</h3>

|Name|Expression|Method|Description|
|---|---|---|---|
|onEvent|{$request.body#/callbackUrl}|POST|Event \\| delivered|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // `http://localhost:3000/` plus `/api/health` has a single slash between them.
  // `http://localhost:3000/` と `/api/health` の間のスラッシュは 1 つになる。
  it('joins a baseUrl that ends with a slash without doubling the slash', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'BaseUrlSlash',
        version: '1.0.0',
      },
      paths: {
        '/health': {
          get: {
            operationId: 'getHealth',
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="baseurlslash">BaseUrlSlash v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="baseurlslash-default">Default</h1>

## getHealth

<a id="opIdgetHealth"></a>

> Code samples

\`\`\`bash
curl http://localhost:3000/api/health
\`\`\`

\`GET /health\`

<h3 id="gethealth-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec, 'src/index.ts', '/api', true, 'http://localhost:3000/')).toBe(expected)
  })

  // The document is invalid, but it must neither crash the generator nor leave a
  // table with no rows.
  // このドキュメントは不正だが、生成器をクラッシュさせてはならず、行のない表も残してはならない。
  it('omits the Responses table of an operation without responses', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'NoResponses',
        version: '1.0.0',
      },
      paths: {
        '/x': {
          get: {
            operationId: 'getX',
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="noresponses">NoResponses v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="noresponses-default">Default</h1>

## getX

<a id="opIdgetX"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /x \\
  src/index.ts
\`\`\`

\`GET /x\`

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // `id` and `slug` take their example, percent-encoded. `other` is not declared,
  // so its placeholder stays and the url is quoted: curl reads `{}` as a glob.
  // `id` と `slug` は例の値をパーセントエンコードして使う。`other` は宣言されていないので
  // プレースホルダーのまま残り、URL はクォートされる。curl は `{}` をグロブとして読むためである。
  it('fills path parameters of the code sample with example values', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'PathParams',
        version: '1.0.0',
      },
      paths: {
        '/users/{id}/posts/{slug}/{other}': {
          get: {
            operationId: 'getPost',
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                schema: {
                  type: 'integer',
                },
                example: 42,
              },
              {
                name: 'slug',
                in: 'path',
                required: true,
                schema: {
                  type: 'string',
                },
                example: 'a b/c',
              },
            ],
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="pathparams">PathParams v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="pathparams-default">Default</h1>

## getPost

<a id="opIdgetPost"></a>

> Code samples

\`\`\`bash
curl 'http://localhost:3000/users/42/posts/a%20b%2Fc/{other}'
\`\`\`

\`GET /users/{id}/posts/{slug}/{other}\`

<h3 id="getpost-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|
|slug|path|string|true|none|

<h3 id="getpost-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec, 'src/index.ts', '/', true, 'http://localhost:3000')).toBe(expected)
  })

  // `hono request` builds a `Request`, which throws when a GET carries a body. The
  // body is still documented below the sample.
  // `hono request` は `Request` を組み立てるが、GET にボディがあると例外になる。
  // ボディはサンプルの下に引き続き出力される。
  it('leaves the body out of a GET sample for hono request', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'GetBody',
        version: '1.0.0',
      },
      paths: {
        '/search': {
          get: {
            operationId: 'search',
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      q: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="getbody">GetBody v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="getbody-default">Default</h1>

## search

<a id="opIdsearch"></a>

> Code samples

\`\`\`bash
hono request \\
  -X GET \\
  -P /search \\
  src/index.ts
\`\`\`

\`GET /search\`

> Body parameter

\`\`\`json
{
  "q": "string"
}
\`\`\`

<h3 id="search-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» q|body|string|false|none|

<h3 id="search-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // curl sends a body with any method, so nothing is dropped.
  // curl はどのメソッドでもボディを送れるので、何も省かない。
  it('keeps the body of a GET sample for curl', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'GetBody',
        version: '1.0.0',
      },
      paths: {
        '/search': {
          get: {
            operationId: 'search',
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      q: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="getbody">GetBody v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="getbody-default">Default</h1>

## search

<a id="opIdsearch"></a>

> Code samples

\`\`\`bash
curl http://localhost:3000/search \\
  -H 'Content-Type: application/json' \\
  -d '{
    "q": "string"
  }'
\`\`\`

\`GET /search\`

> Body parameter

\`\`\`json
{
  "q": "string"
}
\`\`\`

<h3 id="search-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» q|body|string|false|none|

<h3 id="search-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec, 'src/index.ts', '/', true, 'http://localhost:3000')).toBe(expected)
  })

  // `User` keeps `#schemauser` and `user` gets `#schemauser-1`. Every link follows
  // the schema it names.
  // `User` は `#schemauser` のまま、`user` は `#schemauser-1` になる。各リンクは
  // 自分が指すスキーマのアンカーを使う。
  it('gives schemas whose names differ only in case distinct anchors', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'SchemaCase',
        version: '1.0.0',
      },
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
                      $ref: '#/components/schemas/user',
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
          User: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
          },
          user: {
            type: 'object',
            properties: {
              owner: {
                $ref: '#/components/schemas/User',
              },
              self: {
                $ref: '#/components/schemas/user',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="schemacase">SchemaCase v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="schemacase-default">Default</h1>

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
  "owner": {
    "name": "string"
  },
  "self": {}
}
\`\`\`

<h3 id="getx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[user](#schemauser-1)|

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
  "name": "string"
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|

<h2 id="tocS_user">user</h2>
<!-- backwards compatibility -->
<a id="schemauser-1"></a>
<a id="schema_user"></a>
<a id="tocSuser-1"></a>
<a id="tocsuser-1"></a>

\`\`\`json
{
  "owner": {
    "name": "string"
  },
  "self": {
    "owner": {
      "name": "string"
    },
    "self": {}
  }
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|owner|[User](#schemauser)|false|none|none|
|self|[user](#schemauser-1)|false|none|none|
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // Both would otherwise end the string or start an escape sequence.
  // どちらも、そのままでは文字列を終わらせたりエスケープシーケンスを始めたりしてしまう。
  it("escapes a quote and a backslash inside the $'...' body", () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'MultipartQuote',
        version: '1.0.0',
      },
      paths: {
        '/notes': {
          post: {
            operationId: 'createNote',
            requestBody: {
              content: {
                'multipart/form-data': {
                  schema: {
                    type: 'object',
                    properties: {
                      text: {
                        type: 'string',
                        example: "it's a \\ note",
                      },
                    },
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="multipartquote">MultipartQuote v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="multipartquote-default">Default</h1>

## createNote

<a id="opIdcreateNote"></a>

> Code samples

\`\`\`bash
hono request \\
  -X POST \\
  -P /notes \\
  -H 'Content-Type: multipart/form-data; boundary=boundary' \\
  -d $'--boundary\\r\\nContent-Disposition: form-data; name="text"\\r\\n\\r\\nit\\'s a \\\\ note\\r\\n--boundary--\\r\\n' \\
  src/index.ts
\`\`\`

\`POST /notes\`

> Body parameter

\`\`\`yaml
text: "it's a \\\\ note"
\`\`\`

<h3 id="createnote-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» text|body|string|false|none|

<h3 id="createnote-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|None|

<aside class="success">
This operation does not require authentication
</aside>
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // `User` references nothing, so it cannot multiply the output however often it
  // is used. All four properties are expanded.
  // `User` は何も参照しないので、何度使われても出力を膨れ上がらせることはない。
  // 4 つのプロパティすべてが展開される。
  it('expands a schema that is not recursive for every property that uses it', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'ManySiblings',
        version: '1.0.0',
      },
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
                      type: 'object',
                      properties: {
                        a: {
                          $ref: '#/components/schemas/User',
                        },
                        b: {
                          $ref: '#/components/schemas/User',
                        },
                        c: {
                          $ref: '#/components/schemas/User',
                        },
                        d: {
                          $ref: '#/components/schemas/User',
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
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="manysiblings">ManySiblings v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="manysiblings-default">Default</h1>

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
  "a": {
    "name": "string"
  },
  "b": {
    "name": "string"
  },
  "c": {
    "name": "string"
  },
  "d": {
    "name": "string"
  }
}
\`\`\`

<h3 id="getx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="getx-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|a|[User](#schemauser)|false|none|none|
|» name|string|false|none|none|
|b|[User](#schemauser)|false|none|none|
|» name|string|false|none|none|
|c|[User](#schemauser)|false|none|none|
|» name|string|false|none|none|
|d|[User](#schemauser)|false|none|none|
|» name|string|false|none|none|

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
  "name": "string"
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // `Node` references itself. Expansion of such a schema is limited so that schemas
  // referencing each other cannot multiply the output. `c` is still named and
  // linked; its fields are under Schemas.
  // `Node` は自分自身を参照する。相互に参照するスキーマが出力を膨れ上がらせないよう、
  // このようなスキーマの展開回数は制限される。`c` は名前とリンクが残り、
  // フィールドは Schemas にある。
  it('expands a recursive schema at most twice per table and example', () => {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'RefLimit',
        version: '1.0.0',
      },
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
                      type: 'object',
                      properties: {
                        a: {
                          $ref: '#/components/schemas/Node',
                        },
                        b: {
                          $ref: '#/components/schemas/Node',
                        },
                        c: {
                          $ref: '#/components/schemas/Node',
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
      components: {
        schemas: {
          Node: {
            type: 'object',
            properties: {
              value: {
                type: 'string',
              },
              next: {
                $ref: '#/components/schemas/Node',
              },
            },
          },
        },
      },
    } as OpenAPI
    const expected = `<h1 id="reflimit">RefLimit v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="reflimit-default">Default</h1>

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
  "a": {
    "value": "string",
    "next": {}
  },
  "b": {
    "value": "string",
    "next": {}
  },
  "c": {}
}
\`\`\`

<h3 id="getx-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="getx-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|a|[Node](#schemanode)|false|none|none|
|» value|string|false|none|none|
|» next|[Node](#schemanode)|false|none|none|
|b|[Node](#schemanode)|false|none|none|
|» value|string|false|none|none|
|» next|[Node](#schemanode)|false|none|none|
|c|[Node](#schemanode)|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Node">Node</h2>
<!-- backwards compatibility -->
<a id="schemanode"></a>
<a id="schema_Node"></a>
<a id="tocSnode"></a>
<a id="tocsnode"></a>

\`\`\`json
{
  "value": "string",
  "next": {
    "value": "string",
    "next": {}
  }
}
\`\`\`

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|value|string|false|none|none|
|next|[Node](#schemanode)|false|none|none|
`
    expect(makeDocs(spec)).toBe(expected)
  })

  // Eight schemas that all reference each other have 8! paths through them. The
  // output has to grow with the number of schemas, not with the number of paths.
  // 互いに参照し合う 8 個のスキーマには 8! 通りの経路がある。出力はスキーマの数に
  // 応じて増えるべきで、経路の数に応じて増えてはならない。
  it('stays small when every schema references every other schema', () => {
    const names = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7']
    const schemas = Object.fromEntries(
      names.map((name) => [
        name,
        {
          type: 'object',
          properties: Object.fromEntries(
            names
              .filter((other) => other !== name)
              .map((other) => [other.toLowerCase(), { $ref: `#/components/schemas/${other}` }]),
          ),
        },
      ]),
    )
    const spec = {
      openapi: '3.1.0',
      info: { title: 'Dense', version: '1.0.0' },
      paths: {
        '/x': {
          post: {
            operationId: 'postX',
            requestBody: {
              content: { 'application/json': { schema: { $ref: '#/components/schemas/S0' } } },
            },
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: { schemas },
    } as OpenAPI
    expect(makeDocs(spec).split('\n').length).toBeLessThan(3000)
  })
})
