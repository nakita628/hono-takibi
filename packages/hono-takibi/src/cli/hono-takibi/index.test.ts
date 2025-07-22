import { beforeAll, afterAll, describe, it, expect } from 'vitest'
import { honoTakibi } from '.'
import type { OpenAPI } from '../../openapi/index.js'
import fs from 'node:fs'

// Test run
// pnpm vitest run ./src/cli/hono-takibi/index.test.ts

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

describe('honoTakibi --help', () => {
  beforeAll(() => {
    process.argv = ['*/*/bin/node', '*/dist/index.js', '--help']
  })

  it('honoTakibi help requested --help', async () => {
    const result = await honoTakibi()

    expect(result).toStrictEqual({
      ok: true,
      value: {
        message: `Usage: hono-takibi <input.{yaml,json,tsp}> -o <routes.ts> [options]

Options:
  --export-type        export TypeScript type aliases
  --export-schema      export Zod schema objects
  --template           generate app file and handler stubs
  --test               generate empty *.test.ts files
  --base-path <path>   api prefix (default: /)
  -h, --help           display help for command`,
      },
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
      value: {
        message: `Usage: hono-takibi <input.{yaml,json,tsp}> -o <routes.ts> [options]

Options:
  --export-type        export TypeScript type aliases
  --export-schema      export Zod schema objects
  --template           generate app file and handler stubs
  --test               generate empty *.test.ts files
  --base-path <path>   api prefix (default: /)
  -h, --help           display help for command`,
      },
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
