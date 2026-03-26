import fs from 'node:fs'

import { afterAll, beforeAll, describe, expect, it } from 'vite-plus/test'

import { honoTakibi } from './index.js'

const openapi = {
  openapi: '3.1.0',
  info: {
    title: 'HonoTakibi',
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
                      example: 'Hono',
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
                      example: 'HonoX',
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
                      example: 'ZodOpenAPIHono',
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

describe('honoTakibi', () => {
  beforeAll(() => {
    process.argv = ['*/*/bin/node', '*/dist/index.js', 'openapi.json', '-o', 'zod-openapi-hono.ts']
    fs.writeFileSync('openapi.json', JSON.stringify(openapi))
  })
  afterAll(() => {
    fs.rmSync('openapi.json', { force: true })
    fs.rmSync('zod-openapi-hono.ts', { force: true })
  })

  it('honoTakibi generated', async () => {
    const result = await honoTakibi()

    expect(result).toEqual({
      ok: true,
      value: '🔥 Generated code written to zod-openapi-hono.ts',
    })

    const generatedCode = fs.readFileSync('zod-openapi-hono.ts', 'utf-8')
    const expectedCode = `import { createRoute, z } from '@hono/zod-openapi'

export const getHonoRoute = createRoute({
  method: 'get',
  path: '/hono',
  tags: ['Hono'],
  summary: 'Hono',
  description: 'Hono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string().openapi({ example: 'Hono' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})

export const getHonoXRoute = createRoute({
  method: 'get',
  path: '/hono-x',
  tags: ['HonoX'],
  summary: 'HonoX',
  description: 'HonoX',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string().openapi({ example: 'HonoX' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})

export const getZodOpenapiHonoRoute = createRoute({
  method: 'get',
  path: '/zod-openapi-hono',
  tags: ['ZodOpenAPIHono'],
  summary: 'ZodOpenAPIHono',
  description: 'ZodOpenAPIHono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string().openapi({ example: 'ZodOpenAPIHono' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})
`
    expect(generatedCode).toBe(expectedCode)
  })
})

describe('honoTakibi --help', () => {
  beforeAll(() => {
    process.argv = ['*/*/bin/node', '*/dist/index.js', '--help']
  })

  it('honoTakibi help requested --help', async () => {
    const result = await honoTakibi()

    expect(result).toStrictEqual({
      ok: true,
      value: `Usage: hono-takibi <input.{yaml,json,tsp}> -o <output.ts>

Options:
  -h, --help                  display help for command`,
    })
  })
})

describe('honoTakibi -h', () => {
  beforeAll(() => {
    process.argv = ['*/*/bin/node', '*/dist/index.js', '-h']
  })

  it('honoTakibi help requested -h', async () => {
    const result = await honoTakibi()
    expect(result).toStrictEqual({
      ok: true,
      value: `Usage: hono-takibi <input.{yaml,json,tsp}> -o <output.ts>

Options:
  -h, --help                  display help for command`,
    })
  })

  describe('honoTakibi missing output', () => {
    beforeAll(() => {
      process.argv = ['node', 'dist/index.js', 'openapi.yaml']
    })

    it('should fail if output is not specified', async () => {
      const result = await honoTakibi()
      expect(result.ok).toBe(false)
    })
  })
})

describe('honoTakibi x-brand', () => {
  beforeAll(() => {
    process.argv = [
      '*/*/bin/node',
      '*/dist/index.js',
      'brand-test.json',
      '-o',
      'brand-test-output.ts',
    ]
    fs.writeFileSync(
      'brand-test.json',
      JSON.stringify({
        openapi: '3.1.0',
        info: { title: 'Brand Test', version: '1.0.0' },
        paths: {
          '/items': {
            get: {
              operationId: 'getItems',
              responses: {
                200: {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: { $ref: '#/components/schemas/Item' },
                    },
                  },
                },
              },
            },
          },
        },
        components: {
          schemas: {
            ItemId: { type: 'string', format: 'uuid', 'x-brand': 'ItemId' },
            Item: {
              type: 'object',
              required: ['id', 'name'],
              properties: {
                id: { $ref: '#/components/schemas/ItemId' },
                name: { type: 'string' },
              },
            },
          },
        },
      }),
    )
  })
  afterAll(() => {
    fs.rmSync('brand-test.json', { force: true })
    fs.rmSync('brand-test-output.ts', { force: true })
  })

  it('generates branded types with .brand<"X">()', async () => {
    const result = await honoTakibi()
    expect(result).toEqual({
      ok: true,
      value: '🔥 Generated code written to brand-test-output.ts',
    })

    const generatedCode = fs.readFileSync('brand-test-output.ts', 'utf-8')
    expect(generatedCode).toBe(`import { createRoute, z } from '@hono/zod-openapi'

const ItemIdSchema = z.uuid().brand<'ItemId'>().openapi('ItemId')

const ItemSchema = z
  .object({ id: ItemIdSchema, name: z.string() })
  .openapi({ required: ['id', 'name'] })
  .openapi('Item')

export const getItemsRoute = createRoute({
  method: 'get',
  path: '/items',
  operationId: 'getItems',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ItemSchema } } },
  },
})
`)
  })
})
