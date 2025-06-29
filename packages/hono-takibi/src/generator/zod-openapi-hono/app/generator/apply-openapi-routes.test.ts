import { describe, it, expect } from 'vitest'
import { applyOpenapiRoutes } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/app/generator/apply-openapi-routes.test.ts

describe('applyOpenapiRoutes', () => {
  it.concurrent('applyOpenapiRoutes Test', () => {
    const result = applyOpenapiRoutes([
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
    const expected = `.openapi(getHonoRoute,getHonoRouteHandler)
.openapi(getHonoXRoute,getHonoXRouteHandler)
.openapi(getZodOpenapiHonoRoute,getZodOpenapiHonoRouteHandler)`

    expect(result).toBe(expected)
  })
})
