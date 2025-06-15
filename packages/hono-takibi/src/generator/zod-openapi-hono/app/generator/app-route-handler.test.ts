import { describe, it, expect } from 'vitest'
import { appRouteHandler } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/app/generator/app-route-handler.test.ts

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
