import { describe, expect, it } from 'vitest'
import { zodOpenAPIHonoHandler } from './zod-openapi-hono-handler.js'
import type { OpenAPI } from '../openapi/index.js'

const openapi: OpenAPI = {
    openapi: '3.1.0',
    info: { title: 'HonoTakibi🔥', version: 'v1' },
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
                    properties: { message: { type: 'string', example: 'Hono🔥' } },
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
                    properties: { message: { type: 'string', example: 'HonoX🔥' } },
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
                    properties: { message: { type: 'string', example: 'ZodOpenAPIHono🔥' } },
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

describe('zodOpenAPIHonoHandler', () => {
  it('zodOpenAPIHonoHandler Test', async () => {
    const result = await zodOpenAPIHonoHandler(openapi, 'tmp-route/test.ts', false)
    
  })
})