import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Test run
// pnpm vitest run ./src/index.test.ts

const openapi = {
  openapi: '3.0.3',
  info: {
    title: 'ABC only / components x3 (B -> C -> A)',
    version: '1.0.0',
  },
  paths: {
    '/A/{C}': {
      post: {
        operationId: 'A',
        security: [
          {
            A: [],
          },
        ],
        parameters: [
          {
            $ref: '#/components/parameters/C',
          },
          {
            $ref: '#/components/parameters/B',
          },
          {
            $ref: '#/components/parameters/A',
          },
        ],
        requestBody: {
          $ref: '#/components/requestBodies/A',
        },
        responses: {
          '200': {
            $ref: '#/components/responses/A',
          },
        },
        callbacks: {
          A: {
            $ref: '#/components/callbacks/A',
          },
        },
      },
    },
    '/B/{C}': {
      post: {
        operationId: 'B',
        security: [
          {
            B: [],
          },
        ],
        parameters: [
          {
            $ref: '#/components/parameters/C',
          },
          {
            $ref: '#/components/parameters/B',
          },
          {
            $ref: '#/components/parameters/A',
          },
        ],
        requestBody: {
          $ref: '#/components/requestBodies/B',
        },
        responses: {
          '200': {
            $ref: '#/components/responses/B',
          },
        },
        callbacks: {
          B: {
            $ref: '#/components/callbacks/B',
          },
        },
      },
    },
    '/C/{C}': {
      post: {
        operationId: 'C',
        security: [
          {
            C: [],
          },
        ],
        parameters: [
          {
            $ref: '#/components/parameters/C',
          },
          {
            $ref: '#/components/parameters/B',
          },
          {
            $ref: '#/components/parameters/A',
          },
        ],
        requestBody: {
          $ref: '#/components/requestBodies/C',
        },
        responses: {
          '200': {
            $ref: '#/components/responses/C',
          },
        },
        callbacks: {
          C: {
            $ref: '#/components/callbacks/C',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      B: {
        type: 'object',
        required: ['B', 'C'],
        properties: {
          B: {
            type: 'string',
            format: 'uri',
          },
          C: {
            $ref: '#/components/schemas/C',
          },
        },
      },
      C: {
        type: 'object',
        required: ['B', 'A'],
        properties: {
          B: {
            type: 'string',
            format: 'uri',
          },
          A: {
            $ref: '#/components/schemas/A',
          },
        },
      },
      A: {
        type: 'object',
        required: ['B', 'A'],
        properties: {
          B: {
            type: 'string',
            format: 'uri',
          },
          A: {
            type: 'string',
          },
        },
      },
    },
    parameters: {
      B: {
        name: 'B',
        in: 'query',
        required: false,
        schema: {
          type: 'string',
        },
      },
      C: {
        name: 'C',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
        },
      },
      A: {
        name: 'A',
        in: 'header',
        required: false,
        schema: {
          type: 'string',
        },
      },
    },
    securitySchemes: {
      B: {
        type: 'http',
        scheme: 'bearer',
      },
      C: {
        type: 'http',
        scheme: 'bearer',
      },
      A: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    requestBodies: {
      B: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/B',
            },
            examples: {
              B: {
                $ref: '#/components/examples/B',
              },
            },
          },
        },
      },
      C: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/C',
            },
            examples: {
              C: {
                $ref: '#/components/examples/C',
              },
            },
          },
        },
      },
      A: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/A',
            },
            examples: {
              A: {
                $ref: '#/components/examples/A',
              },
            },
          },
        },
      },
    },
    responses: {
      B: {
        description: 'B',
        headers: {
          B: {
            $ref: '#/components/headers/B',
          },
          C: {
            $ref: '#/components/headers/C',
          },
          A: {
            $ref: '#/components/headers/A',
          },
        },
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/B',
            },
            examples: {
              B: {
                $ref: '#/components/examples/B',
              },
            },
          },
        },
        links: {
          B: {
            $ref: '#/components/links/B',
          },
        },
      },
      C: {
        description: 'C',
        headers: {
          B: {
            $ref: '#/components/headers/B',
          },
          C: {
            $ref: '#/components/headers/C',
          },
          A: {
            $ref: '#/components/headers/A',
          },
        },
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/C',
            },
            examples: {
              C: {
                $ref: '#/components/examples/C',
              },
            },
          },
        },
        links: {
          C: {
            $ref: '#/components/links/C',
          },
        },
      },
      A: {
        description: 'A',
        headers: {
          B: {
            $ref: '#/components/headers/B',
          },
          C: {
            $ref: '#/components/headers/C',
          },
          A: {
            $ref: '#/components/headers/A',
          },
        },
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/A',
            },
            examples: {
              A: {
                $ref: '#/components/examples/A',
              },
            },
          },
        },
        links: {
          A: {
            $ref: '#/components/links/A',
          },
        },
      },
    },
    headers: {
      B: {
        schema: {
          type: 'string',
        },
      },
      C: {
        schema: {
          type: 'string',
        },
      },
      A: {
        schema: {
          type: 'string',
        },
      },
    },
    examples: {
      B: {
        value: {
          B: 'https://example.com/B',
          C: {
            B: 'https://example.com/C',
            A: {
              B: 'https://example.com/A',
              A: 'A',
            },
          },
        },
      },
      C: {
        value: {
          B: 'https://example.com/C',
          A: {
            B: 'https://example.com/A',
            A: 'A',
          },
        },
      },
      A: {
        value: {
          B: 'https://example.com/A',
          A: 'A',
        },
      },
    },
    links: {
      B: {
        operationId: 'B',
      },
      C: {
        operationId: 'C',
      },
      A: {
        operationId: 'A',
      },
    },
    callbacks: {
      B: {
        '{$request.body#/B}': {
          post: {
            requestBody: {
              $ref: '#/components/requestBodies/B',
            },
            responses: {
              '200': {
                $ref: '#/components/responses/B',
              },
            },
          },
        },
      },
      C: {
        '{$request.body#/B}': {
          post: {
            requestBody: {
              $ref: '#/components/requestBodies/C',
            },
            responses: {
              '200': {
                $ref: '#/components/responses/C',
              },
            },
          },
        },
      },
      A: {
        '{$request.body#/B}': {
          post: {
            requestBody: {
              $ref: '#/components/requestBodies/A',
            },
            responses: {
              '200': {
                $ref: '#/components/responses/A',
              },
            },
          },
        },
      },
    },
  },
}

describe('Hono Takibi Normal Test', () => {
  beforeEach(() => {
    fs.rmSync('tmp-openapi', { recursive: true, force: true })
    fs.rmSync('tmp-route', { recursive: true, force: true })

    fs.mkdirSync('tmp-openapi', { recursive: true })
    fs.writeFileSync('tmp-openapi/test.json', JSON.stringify(openapi))

    fs.mkdirSync('tmp-route', { recursive: true })
  })

  afterEach(() => {
    fs.rmSync('tmp-openapi', { recursive: true, force: true })
    fs.rmSync('tmp-route', { recursive: true, force: true })
  })

  // #1: exportSchemasTypes=true
  it('--export-schemas-types', () => {
    const openapiPath = path.join('tmp-openapi/test.json')
    execSync(
      `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --export-schemas-types`,
    )
    const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
  })

  //   // #2: exportSchemas=true
  //   it('--export-schemas', () => {
  //     const openapiPath = path.join('tmp-openapi/test.json')
  //     execSync(
  //       `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --export-schemas`,
  //     )
  //     const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })

  //     const expected = `import { createRoute, z } from '@hono/zod-openapi'

  // export const ASchema = z.object({ B: z.url(), A: z.string() }).openapi('A')

  // export const CSchema = z.object({ B: z.url(), A: ASchema }).openapi('C')

  // export const BSchema = z.object({ B: z.url(), C: CSchema }).openapi('B')

  // const BParamsSchema = z.string().openapi({ param: { in: 'query', name: 'B', required: false } })

  // const CParamsSchema = z.string().openapi({ param: { in: 'path', name: 'C', required: true } })

  // const AParamsSchema = z.string().openapi({ param: { in: 'header', name: 'A', required: false } })

  // const BSecurityScheme = { type: 'http', scheme: 'bearer' }

  // const CSecurityScheme = { type: 'http', scheme: 'bearer' }

  // const ASecurityScheme = { type: 'http', scheme: 'bearer' }

  // const BRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // const CRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // const ARequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // const BResponse = {
  //   description: 'B',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { B: { $ref: '#/components/links/B' } },
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // const CResponse = {
  //   description: 'C',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { C: { $ref: '#/components/links/C' } },
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // const AResponse = {
  //   description: 'A',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { A: { $ref: '#/components/links/A' } },
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // const BHeaderSchema = z.string()

  // const CHeaderSchema = z.string()

  // const AHeaderSchema = z.string()

  // const BExample = {
  //   value: {
  //     B: 'https://example.com/B',
  //     C: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  //   },
  // }

  // const CExample = {
  //   value: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  // }

  // const AExample = { value: { B: 'https://example.com/A', A: 'A' } }

  // const BLink = { operationId: 'B' }

  // const CLink = { operationId: 'C' }

  // const ALink = { operationId: 'A' }

  // const BCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/B' },
  //       responses: { '200': { $ref: '#/components/responses/B' } },
  //     },
  //   },
  // }

  // const CCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/C' },
  //       responses: { '200': { $ref: '#/components/responses/C' } },
  //     },
  //   },
  // }

  // const ACallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/A' },
  //       responses: { '200': { $ref: '#/components/responses/A' } },
  //     },
  //   },
  // }

  // export const postACRoute = createRoute({
  //   method: 'post',
  //   path: '/A/{C}',
  //   operationId: 'A',
  //   security: [{ A: [] }],
  //   callbacks: { A: ACallback },
  //   request: {
  //     body: ARequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: AResponse },
  // })

  // export const postBCRoute = createRoute({
  //   method: 'post',
  //   path: '/B/{C}',
  //   operationId: 'B',
  //   security: [{ B: [] }],
  //   callbacks: { B: BCallback },
  //   request: {
  //     body: BRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: BResponse },
  // })

  // export const postCCRoute = createRoute({
  //   method: 'post',
  //   path: '/C/{C}',
  //   operationId: 'C',
  //   security: [{ C: [] }],
  //   callbacks: { C: CCallback },
  //   request: {
  //     body: CRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: CResponse },
  // })
  // `
  //     expect(result).toBe(expected)
  //   })

  //   // #3: exportParametersTypes=true
  //   it('--export-parameters-types', () => {
  //     const openapiPath = path.join('tmp-openapi/test.json')
  //     execSync(
  //       `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --export-parameters-types`,
  //     )
  //     const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
  //     const expected = `import { createRoute, z } from '@hono/zod-openapi'

  // const ASchema = z.object({ B: z.url(), A: z.string() }).openapi('A')

  // const CSchema = z.object({ B: z.url(), A: ASchema }).openapi('C')

  // const BSchema = z.object({ B: z.url(), C: CSchema }).openapi('B')

  // const BParamsSchema = z.string().openapi({ param: { in: 'query', name: 'B', required: false } })

  // export type BParams = z.infer<typeof BParamsSchema>

  // const CParamsSchema = z.string().openapi({ param: { in: 'path', name: 'C', required: true } })

  // export type CParams = z.infer<typeof CParamsSchema>

  // const AParamsSchema = z.string().openapi({ param: { in: 'header', name: 'A', required: false } })

  // export type AParams = z.infer<typeof AParamsSchema>

  // const BSecurityScheme = { type: 'http', scheme: 'bearer' }

  // const CSecurityScheme = { type: 'http', scheme: 'bearer' }

  // const ASecurityScheme = { type: 'http', scheme: 'bearer' }

  // const BRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // const CRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // const ARequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // const BResponse = {
  //   description: 'B',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { B: { $ref: '#/components/links/B' } },
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // const CResponse = {
  //   description: 'C',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { C: { $ref: '#/components/links/C' } },
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // const AResponse = {
  //   description: 'A',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { A: { $ref: '#/components/links/A' } },
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // const BHeaderSchema = z.string()

  // const CHeaderSchema = z.string()

  // const AHeaderSchema = z.string()

  // const BExample = {
  //   value: {
  //     B: 'https://example.com/B',
  //     C: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  //   },
  // }

  // const CExample = {
  //   value: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  // }

  // const AExample = { value: { B: 'https://example.com/A', A: 'A' } }

  // const BLink = { operationId: 'B' }

  // const CLink = { operationId: 'C' }

  // const ALink = { operationId: 'A' }

  // const BCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/B' },
  //       responses: { '200': { $ref: '#/components/responses/B' } },
  //     },
  //   },
  // }

  // const CCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/C' },
  //       responses: { '200': { $ref: '#/components/responses/C' } },
  //     },
  //   },
  // }

  // const ACallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/A' },
  //       responses: { '200': { $ref: '#/components/responses/A' } },
  //     },
  //   },
  // }

  // export const postACRoute = createRoute({
  //   method: 'post',
  //   path: '/A/{C}',
  //   operationId: 'A',
  //   security: [{ A: [] }],
  //   callbacks: { A: ACallback },
  //   request: {
  //     body: ARequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: AResponse },
  // })

  // export const postBCRoute = createRoute({
  //   method: 'post',
  //   path: '/B/{C}',
  //   operationId: 'B',
  //   security: [{ B: [] }],
  //   callbacks: { B: BCallback },
  //   request: {
  //     body: BRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: BResponse },
  // })

  // export const postCCRoute = createRoute({
  //   method: 'post',
  //   path: '/C/{C}',
  //   operationId: 'C',
  //   security: [{ C: [] }],
  //   callbacks: { C: CCallback },
  //   request: {
  //     body: CRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: CResponse },
  // })
  // `
  //     expect(result).toBe(expected)
  //   })

  //   // #4: --export-parameters=true
  //   it('--export-parameters', () => {
  //     const openapiPath = path.join('tmp-openapi/test.json')
  //     execSync(`node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts`)
  //     const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
  //     const expected = `import { createRoute, z } from '@hono/zod-openapi'

  // const ASchema = z.object({ B: z.url(), A: z.string() }).openapi('A')

  // const CSchema = z.object({ B: z.url(), A: ASchema }).openapi('C')

  // const BSchema = z.object({ B: z.url(), C: CSchema }).openapi('B')

  // const BParamsSchema = z.string().openapi({ param: { in: 'query', name: 'B', required: false } })

  // const CParamsSchema = z.string().openapi({ param: { in: 'path', name: 'C', required: true } })

  // const AParamsSchema = z.string().openapi({ param: { in: 'header', name: 'A', required: false } })

  // const BSecurityScheme = { type: 'http', scheme: 'bearer' }

  // const CSecurityScheme = { type: 'http', scheme: 'bearer' }

  // const ASecurityScheme = { type: 'http', scheme: 'bearer' }

  // const BRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // const CRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // const ARequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // const BResponse = {
  //   description: 'B',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { B: { $ref: '#/components/links/B' } },
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // const CResponse = {
  //   description: 'C',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { C: { $ref: '#/components/links/C' } },
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // const AResponse = {
  //   description: 'A',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { A: { $ref: '#/components/links/A' } },
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // const BHeaderSchema = z.string()

  // const CHeaderSchema = z.string()

  // const AHeaderSchema = z.string()

  // const BExample = {
  //   value: {
  //     B: 'https://example.com/B',
  //     C: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  //   },
  // }

  // const CExample = {
  //   value: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  // }

  // const AExample = { value: { B: 'https://example.com/A', A: 'A' } }

  // const BLink = { operationId: 'B' }

  // const CLink = { operationId: 'C' }

  // const ALink = { operationId: 'A' }

  // const BCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/B' },
  //       responses: { '200': { $ref: '#/components/responses/B' } },
  //     },
  //   },
  // }

  // const CCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/C' },
  //       responses: { '200': { $ref: '#/components/responses/C' } },
  //     },
  //   },
  // }

  // const ACallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/A' },
  //       responses: { '200': { $ref: '#/components/responses/A' } },
  //     },
  //   },
  // }

  // export const postACRoute = createRoute({
  //   method: 'post',
  //   path: '/A/{C}',
  //   operationId: 'A',
  //   security: [{ A: [] }],
  //   callbacks: { A: ACallback },
  //   request: {
  //     body: ARequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: AResponse },
  // })

  // export const postBCRoute = createRoute({
  //   method: 'post',
  //   path: '/B/{C}',
  //   operationId: 'B',
  //   security: [{ B: [] }],
  //   callbacks: { B: BCallback },
  //   request: {
  //     body: BRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: BResponse },
  // })

  // export const postCCRoute = createRoute({
  //   method: 'post',
  //   path: '/C/{C}',
  //   operationId: 'C',
  //   security: [{ C: [] }],
  //   callbacks: { C: CCallback },
  //   request: {
  //     body: CRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: CResponse },
  // })
  // `
  //     expect(result).toBe(expected)
  //   })

  //   // #5: --export-security-schemes=true
  //   it('--export-security-schemes', () => {
  //     const openapiPath = path.join('tmp-openapi/test.json')
  //     execSync(
  //       `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --export-security-schemes`,
  //     )

  //     const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })

  //     const expected = `import { createRoute, z } from '@hono/zod-openapi'

  // const ASchema = z.object({ B: z.url(), A: z.string() }).openapi('A')

  // const CSchema = z.object({ B: z.url(), A: ASchema }).openapi('C')

  // const BSchema = z.object({ B: z.url(), C: CSchema }).openapi('B')

  // const BParamsSchema = z.string().openapi({ param: { in: 'query', name: 'B', required: false } })

  // const CParamsSchema = z.string().openapi({ param: { in: 'path', name: 'C', required: true } })

  // const AParamsSchema = z.string().openapi({ param: { in: 'header', name: 'A', required: false } })

  // export const BSecurityScheme = { type: 'http', scheme: 'bearer' }

  // export const CSecurityScheme = { type: 'http', scheme: 'bearer' }

  // export const ASecurityScheme = { type: 'http', scheme: 'bearer' }

  // const BRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // const CRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // const ARequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // const BResponse = {
  //   description: 'B',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { B: { $ref: '#/components/links/B' } },
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // const CResponse = {
  //   description: 'C',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { C: { $ref: '#/components/links/C' } },
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // const AResponse = {
  //   description: 'A',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { A: { $ref: '#/components/links/A' } },
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // const BHeaderSchema = z.string()

  // const CHeaderSchema = z.string()

  // const AHeaderSchema = z.string()

  // const BExample = {
  //   value: {
  //     B: 'https://example.com/B',
  //     C: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  //   },
  // }

  // const CExample = {
  //   value: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  // }

  // const AExample = { value: { B: 'https://example.com/A', A: 'A' } }

  // const BLink = { operationId: 'B' }

  // const CLink = { operationId: 'C' }

  // const ALink = { operationId: 'A' }

  // const BCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/B' },
  //       responses: { '200': { $ref: '#/components/responses/B' } },
  //     },
  //   },
  // }

  // const CCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/C' },
  //       responses: { '200': { $ref: '#/components/responses/C' } },
  //     },
  //   },
  // }

  // const ACallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/A' },
  //       responses: { '200': { $ref: '#/components/responses/A' } },
  //     },
  //   },
  // }

  // export const postACRoute = createRoute({
  //   method: 'post',
  //   path: '/A/{C}',
  //   operationId: 'A',
  //   security: [{ A: [] }],
  //   callbacks: { A: ACallback },
  //   request: {
  //     body: ARequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: AResponse },
  // })

  // export const postBCRoute = createRoute({
  //   method: 'post',
  //   path: '/B/{C}',
  //   operationId: 'B',
  //   security: [{ B: [] }],
  //   callbacks: { B: BCallback },
  //   request: {
  //     body: BRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: BResponse },
  // })

  // export const postCCRoute = createRoute({
  //   method: 'post',
  //   path: '/C/{C}',
  //   operationId: 'C',
  //   security: [{ C: [] }],
  //   callbacks: { C: CCallback },
  //   request: {
  //     body: CRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: CResponse },
  // })
  // `
  //     expect(result).toBe(expected)
  //   })
  //   // #6 export-request-bodies
  //   it('export-request-bodies', () => {
  //     const openapiPath = path.join('tmp-openapi/test.json')
  //     execSync(
  //       `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --export-request-bodies`,
  //     )
  //     const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
  //     const expected = `import { createRoute, z } from '@hono/zod-openapi'

  // const ASchema = z.object({ B: z.url(), A: z.string() }).openapi('A')

  // const CSchema = z.object({ B: z.url(), A: ASchema }).openapi('C')

  // const BSchema = z.object({ B: z.url(), C: CSchema }).openapi('B')

  // const BParamsSchema = z.string().openapi({ param: { in: 'query', name: 'B', required: false } })

  // const CParamsSchema = z.string().openapi({ param: { in: 'path', name: 'C', required: true } })

  // const AParamsSchema = z.string().openapi({ param: { in: 'header', name: 'A', required: false } })

  // const BSecurityScheme = { type: 'http', scheme: 'bearer' }

  // const CSecurityScheme = { type: 'http', scheme: 'bearer' }

  // const ASecurityScheme = { type: 'http', scheme: 'bearer' }

  // export const BRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // export const CRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // export const ARequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // const BResponse = {
  //   description: 'B',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { B: { $ref: '#/components/links/B' } },
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // const CResponse = {
  //   description: 'C',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { C: { $ref: '#/components/links/C' } },
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // const AResponse = {
  //   description: 'A',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { A: { $ref: '#/components/links/A' } },
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // const BHeaderSchema = z.string()

  // const CHeaderSchema = z.string()

  // const AHeaderSchema = z.string()

  // const BExample = {
  //   value: {
  //     B: 'https://example.com/B',
  //     C: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  //   },
  // }

  // const CExample = {
  //   value: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  // }

  // const AExample = { value: { B: 'https://example.com/A', A: 'A' } }

  // const BLink = { operationId: 'B' }

  // const CLink = { operationId: 'C' }

  // const ALink = { operationId: 'A' }

  // const BCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/B' },
  //       responses: { '200': { $ref: '#/components/responses/B' } },
  //     },
  //   },
  // }

  // const CCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/C' },
  //       responses: { '200': { $ref: '#/components/responses/C' } },
  //     },
  //   },
  // }

  // const ACallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/A' },
  //       responses: { '200': { $ref: '#/components/responses/A' } },
  //     },
  //   },
  // }

  // export const postACRoute = createRoute({
  //   method: 'post',
  //   path: '/A/{C}',
  //   operationId: 'A',
  //   security: [{ A: [] }],
  //   callbacks: { A: ACallback },
  //   request: {
  //     body: ARequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: AResponse },
  // })

  // export const postBCRoute = createRoute({
  //   method: 'post',
  //   path: '/B/{C}',
  //   operationId: 'B',
  //   security: [{ B: [] }],
  //   callbacks: { B: BCallback },
  //   request: {
  //     body: BRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: BResponse },
  // })

  // export const postCCRoute = createRoute({
  //   method: 'post',
  //   path: '/C/{C}',
  //   operationId: 'C',
  //   security: [{ C: [] }],
  //   callbacks: { C: CCallback },
  //   request: {
  //     body: CRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: CResponse },
  // })
  // `
  //     expect(result).toBe(expected)
  //   })
  //   // #7 export-responses
  //   it('--export-responses', () => {
  //     const openapiPath = path.join('tmp-openapi/test.json')
  //     execSync(
  //       `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --export-responses`,
  //     )
  //     const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
  //     const expected = `import { createRoute, z } from '@hono/zod-openapi'

  // const ASchema = z.object({ B: z.url(), A: z.string() }).openapi('A')

  // const CSchema = z.object({ B: z.url(), A: ASchema }).openapi('C')

  // const BSchema = z.object({ B: z.url(), C: CSchema }).openapi('B')

  // const BParamsSchema = z.string().openapi({ param: { in: 'query', name: 'B', required: false } })

  // const CParamsSchema = z.string().openapi({ param: { in: 'path', name: 'C', required: true } })

  // const AParamsSchema = z.string().openapi({ param: { in: 'header', name: 'A', required: false } })

  // const BSecurityScheme = { type: 'http', scheme: 'bearer' }

  // const CSecurityScheme = { type: 'http', scheme: 'bearer' }

  // const ASecurityScheme = { type: 'http', scheme: 'bearer' }

  // const BRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // const CRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // const ARequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // export const BResponse = {
  //   description: 'B',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { B: { $ref: '#/components/links/B' } },
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // export const CResponse = {
  //   description: 'C',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { C: { $ref: '#/components/links/C' } },
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // export const AResponse = {
  //   description: 'A',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { A: { $ref: '#/components/links/A' } },
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // const BHeaderSchema = z.string()

  // const CHeaderSchema = z.string()

  // const AHeaderSchema = z.string()

  // const BExample = {
  //   value: {
  //     B: 'https://example.com/B',
  //     C: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  //   },
  // }

  // const CExample = {
  //   value: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  // }

  // const AExample = { value: { B: 'https://example.com/A', A: 'A' } }

  // const BLink = { operationId: 'B' }

  // const CLink = { operationId: 'C' }

  // const ALink = { operationId: 'A' }

  // const BCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/B' },
  //       responses: { '200': { $ref: '#/components/responses/B' } },
  //     },
  //   },
  // }

  // const CCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/C' },
  //       responses: { '200': { $ref: '#/components/responses/C' } },
  //     },
  //   },
  // }

  // const ACallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/A' },
  //       responses: { '200': { $ref: '#/components/responses/A' } },
  //     },
  //   },
  // }

  // export const postACRoute = createRoute({
  //   method: 'post',
  //   path: '/A/{C}',
  //   operationId: 'A',
  //   security: [{ A: [] }],
  //   callbacks: { A: ACallback },
  //   request: {
  //     body: ARequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: AResponse },
  // })

  // export const postBCRoute = createRoute({
  //   method: 'post',
  //   path: '/B/{C}',
  //   operationId: 'B',
  //   security: [{ B: [] }],
  //   callbacks: { B: BCallback },
  //   request: {
  //     body: BRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: BResponse },
  // })

  // export const postCCRoute = createRoute({
  //   method: 'post',
  //   path: '/C/{C}',
  //   operationId: 'C',
  //   security: [{ C: [] }],
  //   callbacks: { C: CCallback },
  //   request: {
  //     body: CRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: CResponse },
  // })
  // `
  //     expect(result).toBe(expected)
  //   })
  //   // #8 export-headers-types
  //   it('--export-headers-types', () => {
  //     const openapiPath = path.join('tmp-openapi/test.json')
  //     execSync(
  //       `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --export-headers-types`,
  //     )
  //     const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
  //     const expected = `import { createRoute, z } from '@hono/zod-openapi'

  // const ASchema = z.object({ B: z.url(), A: z.string() }).openapi('A')

  // const CSchema = z.object({ B: z.url(), A: ASchema }).openapi('C')

  // const BSchema = z.object({ B: z.url(), C: CSchema }).openapi('B')

  // const BParamsSchema = z.string().openapi({ param: { in: 'query', name: 'B', required: false } })

  // const CParamsSchema = z.string().openapi({ param: { in: 'path', name: 'C', required: true } })

  // const AParamsSchema = z.string().openapi({ param: { in: 'header', name: 'A', required: false } })

  // const BSecurityScheme = { type: 'http', scheme: 'bearer' }

  // const CSecurityScheme = { type: 'http', scheme: 'bearer' }

  // const ASecurityScheme = { type: 'http', scheme: 'bearer' }

  // const BRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // const CRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // const ARequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // const BResponse = {
  //   description: 'B',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { B: { $ref: '#/components/links/B' } },
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // const CResponse = {
  //   description: 'C',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { C: { $ref: '#/components/links/C' } },
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // const AResponse = {
  //   description: 'A',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { A: { $ref: '#/components/links/A' } },
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // const BHeaderSchema = z.string()

  // export type BHeader = z.infer<typeof BHeaderSchema>

  // const CHeaderSchema = z.string()

  // export type CHeader = z.infer<typeof CHeaderSchema>

  // const AHeaderSchema = z.string()

  // export type AHeader = z.infer<typeof AHeaderSchema>

  // const BExample = {
  //   value: {
  //     B: 'https://example.com/B',
  //     C: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  //   },
  // }

  // const CExample = {
  //   value: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  // }

  // const AExample = { value: { B: 'https://example.com/A', A: 'A' } }

  // const BLink = { operationId: 'B' }

  // const CLink = { operationId: 'C' }

  // const ALink = { operationId: 'A' }

  // const BCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/B' },
  //       responses: { '200': { $ref: '#/components/responses/B' } },
  //     },
  //   },
  // }

  // const CCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/C' },
  //       responses: { '200': { $ref: '#/components/responses/C' } },
  //     },
  //   },
  // }

  // const ACallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/A' },
  //       responses: { '200': { $ref: '#/components/responses/A' } },
  //     },
  //   },
  // }

  // export const postACRoute = createRoute({
  //   method: 'post',
  //   path: '/A/{C}',
  //   operationId: 'A',
  //   security: [{ A: [] }],
  //   callbacks: { A: ACallback },
  //   request: {
  //     body: ARequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: AResponse },
  // })

  // export const postBCRoute = createRoute({
  //   method: 'post',
  //   path: '/B/{C}',
  //   operationId: 'B',
  //   security: [{ B: [] }],
  //   callbacks: { B: BCallback },
  //   request: {
  //     body: BRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: BResponse },
  // })

  // export const postCCRoute = createRoute({
  //   method: 'post',
  //   path: '/C/{C}',
  //   operationId: 'C',
  //   security: [{ C: [] }],
  //   callbacks: { C: CCallback },
  //   request: {
  //     body: CRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: CResponse },
  // })
  // `
  //     expect(result).toBe(expected)
  //   })
  //   // #9 export-headers
  //   it('--export-headers', () => {
  //     const openapiPath = path.join('tmp-openapi/test.json')
  //     execSync(
  //       `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --export-headers`,
  //     )
  //     const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
  //     const expected = `import { createRoute, z } from '@hono/zod-openapi'

  // const ASchema = z.object({ B: z.url(), A: z.string() }).openapi('A')

  // const CSchema = z.object({ B: z.url(), A: ASchema }).openapi('C')

  // const BSchema = z.object({ B: z.url(), C: CSchema }).openapi('B')

  // const BParamsSchema = z.string().openapi({ param: { in: 'query', name: 'B', required: false } })

  // const CParamsSchema = z.string().openapi({ param: { in: 'path', name: 'C', required: true } })

  // const AParamsSchema = z.string().openapi({ param: { in: 'header', name: 'A', required: false } })

  // const BSecurityScheme = { type: 'http', scheme: 'bearer' }

  // const CSecurityScheme = { type: 'http', scheme: 'bearer' }

  // const ASecurityScheme = { type: 'http', scheme: 'bearer' }

  // const BRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // const CRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // const ARequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // const BResponse = {
  //   description: 'B',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { B: { $ref: '#/components/links/B' } },
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // const CResponse = {
  //   description: 'C',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { C: { $ref: '#/components/links/C' } },
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // const AResponse = {
  //   description: 'A',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { A: { $ref: '#/components/links/A' } },
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // export const BHeaderSchema = z.string()

  // export const CHeaderSchema = z.string()

  // export const AHeaderSchema = z.string()

  // const BExample = {
  //   value: {
  //     B: 'https://example.com/B',
  //     C: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  //   },
  // }

  // const CExample = {
  //   value: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  // }

  // const AExample = { value: { B: 'https://example.com/A', A: 'A' } }

  // const BLink = { operationId: 'B' }

  // const CLink = { operationId: 'C' }

  // const ALink = { operationId: 'A' }

  // const BCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/B' },
  //       responses: { '200': { $ref: '#/components/responses/B' } },
  //     },
  //   },
  // }

  // const CCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/C' },
  //       responses: { '200': { $ref: '#/components/responses/C' } },
  //     },
  //   },
  // }

  // const ACallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/A' },
  //       responses: { '200': { $ref: '#/components/responses/A' } },
  //     },
  //   },
  // }

  // export const postACRoute = createRoute({
  //   method: 'post',
  //   path: '/A/{C}',
  //   operationId: 'A',
  //   security: [{ A: [] }],
  //   callbacks: { A: ACallback },
  //   request: {
  //     body: ARequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: AResponse },
  // })

  // export const postBCRoute = createRoute({
  //   method: 'post',
  //   path: '/B/{C}',
  //   operationId: 'B',
  //   security: [{ B: [] }],
  //   callbacks: { B: BCallback },
  //   request: {
  //     body: BRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: BResponse },
  // })

  // export const postCCRoute = createRoute({
  //   method: 'post',
  //   path: '/C/{C}',
  //   operationId: 'C',
  //   security: [{ C: [] }],
  //   callbacks: { C: CCallback },
  //   request: {
  //     body: CRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: CResponse },
  // })
  // `
  //     expect(result).toBe(expected)
  //   })
  //   // #10 export-examples
  //   it('--export-examples', () => {
  //     const openapiPath = path.join('tmp-openapi/test.json')
  //     execSync(
  //       `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --export-examples`,
  //     )
  //     const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
  //     const expected = `import { createRoute, z } from '@hono/zod-openapi'

  // const ASchema = z.object({ B: z.url(), A: z.string() }).openapi('A')

  // const CSchema = z.object({ B: z.url(), A: ASchema }).openapi('C')

  // const BSchema = z.object({ B: z.url(), C: CSchema }).openapi('B')

  // const BParamsSchema = z.string().openapi({ param: { in: 'query', name: 'B', required: false } })

  // const CParamsSchema = z.string().openapi({ param: { in: 'path', name: 'C', required: true } })

  // const AParamsSchema = z.string().openapi({ param: { in: 'header', name: 'A', required: false } })

  // const BSecurityScheme = { type: 'http', scheme: 'bearer' }

  // const CSecurityScheme = { type: 'http', scheme: 'bearer' }

  // const ASecurityScheme = { type: 'http', scheme: 'bearer' }

  // const BRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // const CRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // const ARequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // const BResponse = {
  //   description: 'B',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { B: { $ref: '#/components/links/B' } },
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // const CResponse = {
  //   description: 'C',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { C: { $ref: '#/components/links/C' } },
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // const AResponse = {
  //   description: 'A',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { A: { $ref: '#/components/links/A' } },
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // const BHeaderSchema = z.string()

  // const CHeaderSchema = z.string()

  // const AHeaderSchema = z.string()

  // export const BExample = {
  //   value: {
  //     B: 'https://example.com/B',
  //     C: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  //   },
  // }

  // export const CExample = {
  //   value: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  // }

  // export const AExample = { value: { B: 'https://example.com/A', A: 'A' } }

  // const BLink = { operationId: 'B' }

  // const CLink = { operationId: 'C' }

  // const ALink = { operationId: 'A' }

  // const BCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/B' },
  //       responses: { '200': { $ref: '#/components/responses/B' } },
  //     },
  //   },
  // }

  // const CCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/C' },
  //       responses: { '200': { $ref: '#/components/responses/C' } },
  //     },
  //   },
  // }

  // const ACallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/A' },
  //       responses: { '200': { $ref: '#/components/responses/A' } },
  //     },
  //   },
  // }

  // export const postACRoute = createRoute({
  //   method: 'post',
  //   path: '/A/{C}',
  //   operationId: 'A',
  //   security: [{ A: [] }],
  //   callbacks: { A: ACallback },
  //   request: {
  //     body: ARequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: AResponse },
  // })

  // export const postBCRoute = createRoute({
  //   method: 'post',
  //   path: '/B/{C}',
  //   operationId: 'B',
  //   security: [{ B: [] }],
  //   callbacks: { B: BCallback },
  //   request: {
  //     body: BRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: BResponse },
  // })

  // export const postCCRoute = createRoute({
  //   method: 'post',
  //   path: '/C/{C}',
  //   operationId: 'C',
  //   security: [{ C: [] }],
  //   callbacks: { C: CCallback },
  //   request: {
  //     body: CRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: CResponse },
  // })
  // `
  //     expect(result).toBe(expected)
  //   })
  //   // #11 export-links
  //   it('--export-links', () => {
  //     const openapiPath = path.join('tmp-openapi/test.json')
  //     execSync(
  //       `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --export-links`,
  //     )
  //     const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
  //     const expected = `import { createRoute, z } from '@hono/zod-openapi'

  // const ASchema = z.object({ B: z.url(), A: z.string() }).openapi('A')

  // const CSchema = z.object({ B: z.url(), A: ASchema }).openapi('C')

  // const BSchema = z.object({ B: z.url(), C: CSchema }).openapi('B')

  // const BParamsSchema = z.string().openapi({ param: { in: 'query', name: 'B', required: false } })

  // const CParamsSchema = z.string().openapi({ param: { in: 'path', name: 'C', required: true } })

  // const AParamsSchema = z.string().openapi({ param: { in: 'header', name: 'A', required: false } })

  // const BSecurityScheme = { type: 'http', scheme: 'bearer' }

  // const CSecurityScheme = { type: 'http', scheme: 'bearer' }

  // const ASecurityScheme = { type: 'http', scheme: 'bearer' }

  // const BRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // const CRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // const ARequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // const BResponse = {
  //   description: 'B',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { B: { $ref: '#/components/links/B' } },
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // const CResponse = {
  //   description: 'C',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { C: { $ref: '#/components/links/C' } },
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // const AResponse = {
  //   description: 'A',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { A: { $ref: '#/components/links/A' } },
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // const BHeaderSchema = z.string()

  // const CHeaderSchema = z.string()

  // const AHeaderSchema = z.string()

  // const BExample = {
  //   value: {
  //     B: 'https://example.com/B',
  //     C: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  //   },
  // }

  // const CExample = {
  //   value: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  // }

  // const AExample = { value: { B: 'https://example.com/A', A: 'A' } }

  // export const BLink = { operationId: 'B' }

  // export const CLink = { operationId: 'C' }

  // export const ALink = { operationId: 'A' }

  // const BCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/B' },
  //       responses: { '200': { $ref: '#/components/responses/B' } },
  //     },
  //   },
  // }

  // const CCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/C' },
  //       responses: { '200': { $ref: '#/components/responses/C' } },
  //     },
  //   },
  // }

  // const ACallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/A' },
  //       responses: { '200': { $ref: '#/components/responses/A' } },
  //     },
  //   },
  // }

  // export const postACRoute = createRoute({
  //   method: 'post',
  //   path: '/A/{C}',
  //   operationId: 'A',
  //   security: [{ A: [] }],
  //   callbacks: { A: ACallback },
  //   request: {
  //     body: ARequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: AResponse },
  // })

  // export const postBCRoute = createRoute({
  //   method: 'post',
  //   path: '/B/{C}',
  //   operationId: 'B',
  //   security: [{ B: [] }],
  //   callbacks: { B: BCallback },
  //   request: {
  //     body: BRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: BResponse },
  // })

  // export const postCCRoute = createRoute({
  //   method: 'post',
  //   path: '/C/{C}',
  //   operationId: 'C',
  //   security: [{ C: [] }],
  //   callbacks: { C: CCallback },
  //   request: {
  //     body: CRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: CResponse },
  // })
  // `
  //     expect(result).toBe(expected)
  //   })
  //   // #12 export-callbacks
  //   it('--export-callbacks', () => {
  //     const openapiPath = path.join('tmp-openapi/test.json')
  //     execSync(
  //       `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --export-callbacks`,
  //     )
  //     const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
  //     const expected = `import { createRoute, z } from '@hono/zod-openapi'

  // const ASchema = z.object({ B: z.url(), A: z.string() }).openapi('A')

  // const CSchema = z.object({ B: z.url(), A: ASchema }).openapi('C')

  // const BSchema = z.object({ B: z.url(), C: CSchema }).openapi('B')

  // const BParamsSchema = z.string().openapi({ param: { in: 'query', name: 'B', required: false } })

  // const CParamsSchema = z.string().openapi({ param: { in: 'path', name: 'C', required: true } })

  // const AParamsSchema = z.string().openapi({ param: { in: 'header', name: 'A', required: false } })

  // const BSecurityScheme = { type: 'http', scheme: 'bearer' }

  // const CSecurityScheme = { type: 'http', scheme: 'bearer' }

  // const ASecurityScheme = { type: 'http', scheme: 'bearer' }

  // const BRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // const CRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // const ARequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // const BResponse = {
  //   description: 'B',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { B: { $ref: '#/components/links/B' } },
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // const CResponse = {
  //   description: 'C',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { C: { $ref: '#/components/links/C' } },
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // const AResponse = {
  //   description: 'A',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { A: { $ref: '#/components/links/A' } },
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // const BHeaderSchema = z.string()

  // const CHeaderSchema = z.string()

  // const AHeaderSchema = z.string()

  // const BExample = {
  //   value: {
  //     B: 'https://example.com/B',
  //     C: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  //   },
  // }

  // const CExample = {
  //   value: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  // }

  // const AExample = { value: { B: 'https://example.com/A', A: 'A' } }

  // const BLink = { operationId: 'B' }

  // const CLink = { operationId: 'C' }

  // const ALink = { operationId: 'A' }

  // export const BCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/B' },
  //       responses: { '200': { $ref: '#/components/responses/B' } },
  //     },
  //   },
  // }

  // export const CCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/C' },
  //       responses: { '200': { $ref: '#/components/responses/C' } },
  //     },
  //   },
  // }

  // export const ACallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/A' },
  //       responses: { '200': { $ref: '#/components/responses/A' } },
  //     },
  //   },
  // }

  // export const postACRoute = createRoute({
  //   method: 'post',
  //   path: '/A/{C}',
  //   operationId: 'A',
  //   security: [{ A: [] }],
  //   callbacks: { A: ACallback },
  //   request: {
  //     body: ARequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: AResponse },
  // })

  // export const postBCRoute = createRoute({
  //   method: 'post',
  //   path: '/B/{C}',
  //   operationId: 'B',
  //   security: [{ B: [] }],
  //   callbacks: { B: BCallback },
  //   request: {
  //     body: BRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: BResponse },
  // })

  // export const postCCRoute = createRoute({
  //   method: 'post',
  //   path: '/C/{C}',
  //   operationId: 'C',
  //   security: [{ C: [] }],
  //   callbacks: { C: CCallback },
  //   request: {
  //     body: CRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: CResponse },
  // })
  // `
  //     expect(result).toBe(expected)
  //   })
  //   // 13 all
  //   it('--export-schemas-types --export-schemas --export-parameters-types --export-parameters --export-security-schemes --export-request-bodies --export-responses --export-headers-types --export-headers --export-examples --export-links --export-callbacks', () => {
  //     const openapiPath = path.join('tmp-openapi/test.json')
  //     execSync(
  //       `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --export-schemas-types --export-schemas --export-parameters-types --export-parameters --export-security-schemes --export-request-bodies --export-responses --export-headers-types --export-headers --export-examples --export-links --export-callbacks`,
  //     )
  //     const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
  //     const expected = `import { createRoute, z } from '@hono/zod-openapi'

  // export const ASchema = z.object({ B: z.url(), A: z.string() }).openapi('A')

  // export type A = z.infer<typeof ASchema>

  // export const CSchema = z.object({ B: z.url(), A: ASchema }).openapi('C')

  // export type C = z.infer<typeof CSchema>

  // export const BSchema = z.object({ B: z.url(), C: CSchema }).openapi('B')

  // export type B = z.infer<typeof BSchema>

  // export const BParamsSchema = z
  //   .string()
  //   .openapi({ param: { in: 'query', name: 'B', required: false } })

  // export type BParams = z.infer<typeof BParamsSchema>

  // export const CParamsSchema = z
  //   .string()
  //   .openapi({ param: { in: 'path', name: 'C', required: true } })

  // export type CParams = z.infer<typeof CParamsSchema>

  // export const AParamsSchema = z
  //   .string()
  //   .openapi({ param: { in: 'header', name: 'A', required: false } })

  // export type AParams = z.infer<typeof AParamsSchema>

  // export const BSecurityScheme = { type: 'http', scheme: 'bearer' }

  // export const CSecurityScheme = { type: 'http', scheme: 'bearer' }

  // export const ASecurityScheme = { type: 'http', scheme: 'bearer' }

  // export const BRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // export const CRequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // export const ARequestBody = {
  //   required: true,
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // export const BResponse = {
  //   description: 'B',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { B: { $ref: '#/components/links/B' } },
  //   content: {
  //     'application/json': { schema: BSchema, examples: { B: { $ref: '#/components/examples/B' } } },
  //   },
  // }

  // export const CResponse = {
  //   description: 'C',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { C: { $ref: '#/components/links/C' } },
  //   content: {
  //     'application/json': { schema: CSchema, examples: { C: { $ref: '#/components/examples/C' } } },
  //   },
  // }

  // export const AResponse = {
  //   description: 'A',
  //   headers: z.object({
  //     B: z.string().optional(),
  //     C: z.string().optional(),
  //     A: z.string().optional(),
  //   }),
  //   links: { A: { $ref: '#/components/links/A' } },
  //   content: {
  //     'application/json': { schema: ASchema, examples: { A: { $ref: '#/components/examples/A' } } },
  //   },
  // }

  // export const BHeaderSchema = z.string()

  // export type BHeader = z.infer<typeof BHeaderSchema>

  // export const CHeaderSchema = z.string()

  // export type CHeader = z.infer<typeof CHeaderSchema>

  // export const AHeaderSchema = z.string()

  // export type AHeader = z.infer<typeof AHeaderSchema>

  // export const BExample = {
  //   value: {
  //     B: 'https://example.com/B',
  //     C: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  //   },
  // }

  // export const CExample = {
  //   value: { B: 'https://example.com/C', A: { B: 'https://example.com/A', A: 'A' } },
  // }

  // export const AExample = { value: { B: 'https://example.com/A', A: 'A' } }

  // export const BLink = { operationId: 'B' }

  // export const CLink = { operationId: 'C' }

  // export const ALink = { operationId: 'A' }

  // export const BCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/B' },
  //       responses: { '200': { $ref: '#/components/responses/B' } },
  //     },
  //   },
  // }

  // export const CCallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/C' },
  //       responses: { '200': { $ref: '#/components/responses/C' } },
  //     },
  //   },
  // }

  // export const ACallback = {
  //   '{$request.body#/B}': {
  //     post: {
  //       requestBody: { $ref: '#/components/requestBodies/A' },
  //       responses: { '200': { $ref: '#/components/responses/A' } },
  //     },
  //   },
  // }

  // export const postACRoute = createRoute({
  //   method: 'post',
  //   path: '/A/{C}',
  //   operationId: 'A',
  //   security: [{ A: [] }],
  //   callbacks: { A: ACallback },
  //   request: {
  //     body: ARequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: AResponse },
  // })

  // export const postBCRoute = createRoute({
  //   method: 'post',
  //   path: '/B/{C}',
  //   operationId: 'B',
  //   security: [{ B: [] }],
  //   callbacks: { B: BCallback },
  //   request: {
  //     body: BRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: BResponse },
  // })

  // export const postCCRoute = createRoute({
  //   method: 'post',
  //   path: '/C/{C}',
  //   operationId: 'C',
  //   security: [{ C: [] }],
  //   callbacks: { C: CCallback },
  //   request: {
  //     body: CRequestBody,
  //     params: z.object({ C: CParamsSchema }),
  //     query: z.object({ B: BParamsSchema.optional() }),
  //     headers: z.object({ A: AParamsSchema.optional() }),
  //   },
  //   responses: { 200: CResponse },
  // })
  // `
  //   })
})

describe('cli test', () => {
  let exitSpy: ReturnType<typeof vi.spyOn>
  let logSpy: ReturnType<typeof vi.spyOn>
  let errorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    vi.resetModules()
    exitSpy = vi
      .spyOn(process, 'exit')
      // biome-ignore lint: test
      .mockImplementation(() => undefined as unknown as never) as any
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {}) as unknown as ReturnType<
      typeof vi.spyOn
    >
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {}) as unknown as ReturnType<
      typeof vi.spyOn
    >
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('logs message & exits(0) on success', async () => {
    vi.resetModules()

    const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => undefined) as never)
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    vi.doMock('./cli/index.js', async () => {
      const actual = await vi.importActual<typeof import('./cli/index.js')>('./cli/index.js')
      return { ...actual, honoTakibi: vi.fn(async () => ({ ok: true, value: 'OK' }) as const) }
    })

    await import('./index.js')

    const tick = () => new Promise<void>((r) => setImmediate(r))
    await tick()

    expect(logSpy).toHaveBeenCalledWith('OK')
    expect(exitSpy).toHaveBeenCalledWith(0)
    expect(errorSpy).not.toHaveBeenCalled()

    vi.restoreAllMocks()
  })

  it('logs error & exits(1) on failure', async () => {
    vi.resetModules()

    const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => undefined) as never)
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    vi.doMock('./cli/index.js', async () => {
      const actual = await vi.importActual<typeof import('./cli/index.js')>('./cli/index.js')
      return { ...actual, honoTakibi: vi.fn(async () => ({ ok: false, error: 'FAIL' }) as const) }
    })

    await import('./index.js')

    const tick = () => new Promise<void>((r) => setImmediate(r))
    await tick()

    expect(errorSpy).toHaveBeenCalledWith('FAIL')
    expect(exitSpy).toHaveBeenCalledWith(1)
    expect(logSpy).not.toHaveBeenCalled()

    vi.restoreAllMocks()
  })
})
