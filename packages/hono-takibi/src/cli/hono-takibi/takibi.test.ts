import { beforeAll, afterAll, describe, it, expect } from 'vitest'
import { takibi } from './takibi.js'
import type { OpenAPI } from '../../openapi/index.js'
import fs from 'node:fs'

// Test run
// pnpm vitest run ./src/cli/hono-takibi/takibi.test.ts

const openapi: OpenAPI = {
  openapi: '3.1.0',
  info: {
    title: 'HonoTakibi🔥',
    version: 'v1',
  },
  tags: [{ name: 'Hono' }, { name: 'HonoX' }, { name: 'ZodOpenAPIHono' }],
  paths: {
    '/hono': {
      get: {
        tags: ['Hono'],
        summary: 'Hono',
        description: 'Hono',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Hono🔥',
                    },
                  },
                  required: ['message'],
                },
              },
            },
          },
        },
      },
    },
    '/hono-x': {
      get: {
        tags: ['HonoX'],
        summary: 'HonoX',
        description: 'HonoX',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'HonoX🔥',
                    },
                  },
                  required: ['message'],
                },
              },
            },
          },
        },
      },
    },
    '/zod-openapi-hono': {
      get: {
        tags: ['ZodOpenAPIHono'],
        summary: 'ZodOpenAPIHono',
        description: 'ZodOpenAPIHono',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'ZodOpenAPIHono🔥',
                    },
                  },
                  required: ['message'],
                },
              },
            },
          },
        },
      },
    },
  },
}

describe('takibi generate', () => {
  beforeAll(() => {
    fs.writeFileSync('openapi.yaml', JSON.stringify(openapi))
  })

  afterAll(() => {
    fs.rmSync('openapi.yaml', { force: true })
    fs.rmSync('zod-openapi-hono.ts', { force: true })
  })

  it('should generate Hono app with OpenAPI routes', async () => {
    const result = await takibi('openapi.yaml', 'zod-openapi-hono.ts', true, true, false, false)

    expect(result).toStrictEqual({
      ok: true,
      value: { message: 'Generated code written to zod-openapi-hono.ts' },
    })

    const generatedCode = fs.readFileSync('zod-openapi-hono.ts', 'utf-8')
    const expectedCode = `import { createRoute, z } from '@hono/zod-openapi'

export const getHonoRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/hono',
  summary: 'Hono',
  description: 'Hono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ message: z.string().openapi({ example: 'Hono🔥' }) }),
        },
      },
    },
  },
})

export const getHonoXRoute = createRoute({
  tags: ['HonoX'],
  method: 'get',
  path: '/hono-x',
  summary: 'HonoX',
  description: 'HonoX',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ message: z.string().openapi({ example: 'HonoX🔥' }) }),
        },
      },
    },
  },
})

export const getZodOpenapiHonoRoute = createRoute({
  tags: ['ZodOpenAPIHono'],
  method: 'get',
  path: '/zod-openapi-hono',
  summary: 'ZodOpenAPIHono',
  description: 'ZodOpenAPIHono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ message: z.string().openapi({ example: 'ZodOpenAPIHono🔥' }) }),
        },
      },
    },
  },
})
`
    expect(generatedCode).toBe(expectedCode)
  })
})

describe('takibi generate', () => {
  beforeAll(() => {
    if (!fs.existsSync('openapi.yaml')) {
      fs.writeFileSync('openapi.yaml', JSON.stringify(openapi))
    }
  })

  afterAll(() => {
    fs.rmSync('openapi.yaml', { force: true })
    fs.rmSync('zod-openapi-hono.ts', { force: true })
  })

  it('should generate Hono app with OpenAPI routes', async () => {
    const result = await takibi('openapi.yaml', 'zod-openapi-hono.ts', true, true, true, true)

    expect(result).toStrictEqual({
      ok: true,
      value: { message: 'Generated code and template files written' },
    })
  })
})
