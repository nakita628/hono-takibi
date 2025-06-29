import { describe, expect, it } from 'vitest'
import { importHandlers } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/handler/generator/import-handlers.test.ts

describe('importHandlers', () => {
  it.concurrent('importHandlers Test', () => {
    const result = importHandlers(
      {
        'honoHandler.ts': ['getHonoRouteHandler'],
        'honoXHandler.ts': ['getHonoXRouteHandler'],
        'zodOpenapiHonoHandler.ts': ['getZodOpenapiHonoRouteHandler'],
      },
      'src/routes.ts',
    )
    const expected = [
      "import { getHonoRouteHandler } from './handler/honoHandler.ts';",
      "import { getHonoXRouteHandler } from './handler/honoXHandler.ts';",
      "import { getZodOpenapiHonoRouteHandler } from './handler/zodOpenapiHonoHandler.ts';",
    ]
    expect(result).toStrictEqual(expected)
  })
})
