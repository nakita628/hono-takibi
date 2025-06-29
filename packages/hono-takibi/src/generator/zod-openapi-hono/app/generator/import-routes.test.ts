import { describe, it, expect } from 'vitest'
import { importRoutes } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/app/generator/import-routes.test.ts

describe('generateImportRoutes', () => {
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
