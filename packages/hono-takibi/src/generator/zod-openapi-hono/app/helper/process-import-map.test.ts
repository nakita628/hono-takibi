import { describe, it, expect } from 'vitest'
import { processImportMap } from './process-import-map'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/app/helper/process-import-map.test.ts

describe('processImportMap', () => {
  it.concurrent('processImportMap Test', () => {
    const result = processImportMap(
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
