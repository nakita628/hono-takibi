import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../../../openapi'
import { docs } from './docs.js'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/app/helper/docs.test.ts

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

describe('docs', () => {
  it.concurrent('docs', () => {
    const result = docs(openapi)
    const expected = {
      openapi: '3.1.0',
      info: { title: 'HonoTakibi🔥', version: 'v1' },
      tags: [{ name: 'Hono' }, { name: 'HonoX' }, { name: 'ZodOpenAPIHono' }],
    }
    expect(result).toStrictEqual(expected)
  })
})
