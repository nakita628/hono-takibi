import { describe, it, expect } from 'vitest'
import { app } from './'
import type { OpenAPI } from '../../../openapi'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/app/index.test.ts

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

describe('app', () => {
  it.concurrent('app Test', () => {
    const result = app(openapi, 'app.ts', '/api')
    const expected = `import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { getHonoRoute,getHonoXRoute,getZodOpenapiHonoRoute } from './app.ts';
import { getHonoRouteHandler } from './handler/honoHandler.ts';
import { getHonoXRouteHandler } from './handler/honoXHandler.ts';
import { getZodOpenapiHonoRouteHandler } from './handler/zodOpenapiHonoHandler.ts';

const app = new OpenAPIHono().basePath('/api')

export const api = app.openapi(getHonoRoute,getHonoRouteHandler)
.openapi(getHonoXRoute,getHonoXRouteHandler)
.openapi(getZodOpenapiHonoRoute,getZodOpenapiHonoRouteHandler)

if(process.env.NODE_ENV === 'development'){
app.doc('/doc',{"openapi":"3.1.0","info":{"title":"HonoTakibi🔥","version":"v1"},"tags":[{"name":"Hono"},{"name":"HonoX"},{"name":"ZodOpenAPIHono"}]}).get('/ui',swaggerUI({url:'/api/doc'}))}

export type AddType = typeof api

export default app`
    expect(result).toBe(expected)
  })
})
