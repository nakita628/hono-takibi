import { describe, expect, it } from 'vitest'
import { getHandlerImports } from './get-handler-imports'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/handler/import/get-handler-imports.test.ts

describe('getHandlerImports', () => {
  it.concurrent('getHandlerImports Test', () => {
    const result = getHandlerImports([
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
    ])
    const expected = {
      'honoHandler.ts': ['getHonoRouteHandler'],
      'honoXHandler.ts': ['getHonoXRouteHandler'],
      'zodOpenapiHonoHandler.ts': ['getZodOpenapiHonoRouteHandler'],
    }
    expect(result).toStrictEqual(expected)
  })
})
