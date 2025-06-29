import { describe, it, expect } from 'vitest'
import { getRouteMaps } from './get-route-maps'
import type { OpenAPI } from '../../../../openapi'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/app/helper/get-route-maps.test.ts

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

describe('getRouteMaps', () => {
  it.concurrent('getRouteMaps Test', () => {
    const result = getRouteMaps(openapi)
    const expected = [
      {
        routeName: 'getHonoRoute',
        handlerName: 'getHonoRouteHandler',
        path: '/hono',
      },
      {
        routeName: 'getHonoXRoute',
        handlerName: 'getHonoXRouteHandler',
        path: '/hono-x',
      },
      {
        routeName: 'getZodOpenapiHonoRoute',
        handlerName: 'getZodOpenapiHonoRouteHandler',
        path: '/zod-openapi-hono',
      },
    ]
    expect(result).toStrictEqual(expected)
  })
})
