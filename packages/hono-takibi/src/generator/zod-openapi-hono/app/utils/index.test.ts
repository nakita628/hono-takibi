import { describe, it, expect } from 'vitest'
import { appRouteHandler, importRoutes, registerComponent, importMap } from './index.js'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/app/utils/index.test.ts

describe('utils', () => {
  // appRouteHandler
  describe('appRouteHandler', () => {
    it.concurrent(
      `appRouteHandler('getRoute', 'getRouteHandler') -> .openapi(getRoute,getRouteHandler)`,
      () => {
        const result = appRouteHandler('getRoute', 'getRouteHandler')
        const expected = '.openapi(getRoute,getRouteHandler)'
        expect(result).toBe(expected)
      },
    )
  })

  // importRoutes
  describe('importRoutes', () => {
    it.concurrent('importRoutes Test', () => {
      const result = importRoutes({
        'routes.ts': ['getHonoRoute', 'getHonoXRoute', 'getZodOpenapiHonoRoute'],
      })
      const expected = [
        "import { getHonoRoute,getHonoXRoute,getZodOpenapiHonoRoute } from './routes.ts';",
      ]
      expect(result).toStrictEqual(expected)
    })
  })

  describe('registerComponent', () => {
    it.concurrent('registerComponent success', () => {
      const result = registerComponent({
        jwt: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      })

      const expected = `app.openAPIRegistry.registerComponent('securitySchemes', 'jwt', ${JSON.stringify(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      )})`

      expect(result).toBe(expected)
    })
  })

  // importMap
  describe('processImportMap', () => {
    it.concurrent('processImportMap Test', () => {
      const result = importMap(
        [
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
        ],
        'src/routes.ts',
      )
      const expected = {
        'routes.ts': ['getHonoRoute', 'getHonoXRoute', 'getZodOpenapiHonoRoute'],
      }
      expect(result).toStrictEqual(expected)
    })
  })

})
