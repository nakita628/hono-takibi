import fs from 'node:fs'
import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { OpenAPI } from '../openapi'
import { route } from './route'

// Test run
// pnpm vitest run ./src/core/route.test.ts

const openapi: OpenAPI = {
  openapi: '3.0.0',
  info: {
    title: '(title)',
    version: '0.0.0',
  },
  tags: [
    {
      name: 'Hono',
    },
  ],
  paths: {
    '/hono': {
      get: {
        operationId: 'HonoService_hono',
        parameters: [],
        responses: {
          '200': {
            description: 'The request has succeeded.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Hono',
                },
              },
            },
          },
        },
        tags: ['Hono'],
      },
    },
    '/honox': {
      get: {
        operationId: 'HonoXService_honox',
        parameters: [],
        responses: {
          '200': {
            description: 'The request has succeeded.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/HonoX',
                },
              },
            },
          },
        },
        tags: ['Hono'],
      },
    },
    '/zod-openapi-hono': {
      get: {
        operationId: 'ZodOpenAPIHonoService_zod_openapi_hono',
        parameters: [],
        responses: {
          '200': {
            description: 'The request has succeeded.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ZodOpenAPIHono',
                },
              },
            },
          },
        },
        tags: ['Hono'],
      },
    },
  },
  components: {
    schemas: {
      Hono: {
        type: 'object',
        required: ['hono'],
        properties: {
          hono: {
            type: 'string',
            enum: ['Hono'],
          },
        },
      },
      HonoUnion: {
        type: 'object',
        required: ['hono-union'],
        properties: {
          'hono-union': {
            anyOf: [
              { $ref: '#/components/schemas/Hono' },
              { $ref: '#/components/schemas/HonoX' },
              { $ref: '#/components/schemas/ZodOpenAPIHono' },
            ],
          },
        },
      },
      HonoX: {
        type: 'object',
        required: ['honoX'],
        properties: {
          honoX: {
            type: 'string',
            enum: ['HonoX'],
          },
        },
      },
      ZodOpenAPIHono: {
        type: 'object',
        required: ['zod-openapi-hono'],
        properties: {
          'zod-openapi-hono': {
            type: 'string',
            enum: ['ZodOpenAPIHono'],
          },
        },
      },
    },
  },
}

describe('route', () => {
  beforeEach(() => {
    fs.writeFileSync('openapi.json', JSON.stringify(openapi))
  })
  afterEach(() => {
    if (fs.existsSync('test.ts')) {
      fs.rmSync('test.ts', { force: true })
    }
    if (fs.existsSync('test')) {
      fs.rmSync('test', { recursive: true, force: true })
    }
  })
  afterAll(() => {
    if (fs.existsSync('openapi.json')) {
      fs.rmSync('openapi.json', { force: true })
    }
  })
  // split false
  it('should generate route code', async () => {
    const result = await route('openapi.json', 'test.ts', '@packages/schemas')
    const index = fs.readFileSync('test.ts', 'utf-8')
    const indexExpected = `import { createRoute } from '@hono/zod-openapi'
import { HonoSchema, HonoXSchema, ZodOpenAPIHonoSchema } from '@packages/schemas'

export const getHonoRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/hono',
  operationId: 'HonoService_hono',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoSchema } },
    },
  },
})

export const getHonoxRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/honox',
  operationId: 'HonoXService_honox',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoXSchema } },
    },
  },
})

export const getZodOpenapiHonoRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/zod-openapi-hono',
  operationId: 'ZodOpenAPIHonoService_zod_openapi_hono',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: ZodOpenAPIHonoSchema } },
    },
  },
})
`
    expect(index).toBe(indexExpected)
    expect(result).toStrictEqual({ ok: true, value: 'Generated route code written to test.ts' })
  })
  // split true
  it('should generate route code (split)', async () => {
    const result = await route('openapi.json', 'test', '@packages/schemas', true)
    const index = fs.readFileSync('test/index.ts', 'utf-8')
    const indexExpected = `export * from './getHono'
export * from './getHonox'
export * from './getZodOpenapiHono'
`
    expect(index).toBe(indexExpected)

    const getHono = fs.readFileSync('test/getHono.ts', 'utf-8')
    const getHonoExpected = `import { createRoute } from '@hono/zod-openapi'
import { HonoSchema } from '@packages/schemas'

export const getHonoRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/hono',
  operationId: 'HonoService_hono',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoSchema } },
    },
  },
})
`
    expect(getHono).toBe(getHonoExpected)

    const getHonox = fs.readFileSync('test/getHonox.ts', 'utf-8')
    const getHonoXexpected = `import { createRoute } from '@hono/zod-openapi'
import { HonoXSchema } from '@packages/schemas'

export const getHonoxRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/honox',
  operationId: 'HonoXService_honox',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoXSchema } },
    },
  },
})
`
    expect(getHonox).toBe(getHonoXexpected)

    const getZodOpenapiHono = fs.readFileSync('test/getZodOpenapiHono.ts', 'utf-8')

    const getZodOpenapiHonoExpected = `import { createRoute } from '@hono/zod-openapi'
import { ZodOpenAPIHonoSchema } from '@packages/schemas'

export const getZodOpenapiHonoRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/zod-openapi-hono',
  operationId: 'ZodOpenAPIHonoService_zod_openapi_hono',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: ZodOpenAPIHonoSchema } },
    },
  },
})
`
    expect(getZodOpenapiHono).toBe(getZodOpenapiHonoExpected)

    expect(result).toStrictEqual({
      ok: true,
      value: 'Generated route code written to test/*.ts (index.ts included)',
    })
  })
})
