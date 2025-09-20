import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../../openapi'
import { app } from './'

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
    const expected = `import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { getHonoRouteHandler,getHonoXRouteHandler,getZodOpenapiHonoRouteHandler } from './handlers'
import { getHonoRoute,getHonoXRoute,getZodOpenapiHonoRoute } from './app'

const app = new OpenAPIHono().basePath('/api')

export const api = app.openapi(getHonoRoute,getHonoRouteHandler)
.openapi(getHonoXRoute,getHonoXRouteHandler)
.openapi(getZodOpenapiHonoRoute,getZodOpenapiHonoRouteHandler)

if(process.env.NODE_ENV === 'development'){
app.doc31('/doc',{"openapi":"3.1.0","info":{"title":"HonoTakibi🔥","version":"v1"},"tags":[{"name":"Hono"},{"name":"HonoX"},{"name":"ZodOpenAPIHono"}]}).get('/ui',swaggerUI({url:'/api/doc'}))}

export type AddType = typeof api

export default app`
    expect(result).toBe(expected)
  })
})
