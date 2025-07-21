import { describe, it, expect } from 'vitest'
import { appRouteHandler, importRoutes, registerComponent } from './index.js'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/app/generator/utils/index.test.ts

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
})
