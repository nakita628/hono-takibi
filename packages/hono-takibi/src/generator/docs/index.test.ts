import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../openapi/index.js'
import { makeDocs } from './index.js'

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

const expectedNoServers = (pPath: string) =>
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

const expectedWithServers = (pPath: string) =>
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

describe('makeDocs', () => {
  describe('basePath: "/"', () => {
    it('generates docs with -P /health (no servers)', () => {
      expect(makeDocs(minimalOpenAPI, 'src/index.ts', '/')).toBe(expectedNoServers('/health'))
    })

    it('generates docs with -P /health (with servers)', () => {
      expect(makeDocs(openAPIWithServers, 'src/index.ts', '/')).toBe(expectedWithServers('/health'))
    })
  })

  describe('basePath: "/api"', () => {
    it('generates docs with -P /api/health (no servers)', () => {
      expect(makeDocs(minimalOpenAPI, 'src/index.ts', '/api')).toBe(
        expectedNoServers('/api/health'),
      )
    })

    it('generates docs with -P /api/health (with servers)', () => {
      expect(makeDocs(openAPIWithServers, 'src/index.ts', '/api')).toBe(
        expectedWithServers('/api/health'),
      )
    })
  })

  describe('basePath: "/api/v3"', () => {
    it('generates docs with -P /api/v3/health (no servers)', () => {
      expect(makeDocs(minimalOpenAPI, 'src/index.ts', '/api/v3')).toBe(
        expectedNoServers('/api/v3/health'),
      )
    })

    it('generates docs with -P /api/v3/health (with servers)', () => {
      expect(makeDocs(openAPIWithServers, 'src/index.ts', '/api/v3')).toBe(
        expectedWithServers('/api/v3/health'),
      )
    })
  })

  describe('basePath: undefined (fallback to "/")', () => {
    it('generates docs with -P /health when basePath is undefined', () => {
      // biome-ignore lint/suspicious/noExplicitAny: testing runtime fallback for undefined basePath
      expect(makeDocs(minimalOpenAPI, 'src/index.ts', undefined as any)).toBe(
        expectedNoServers('/health'),
      )
    })
  })
})
