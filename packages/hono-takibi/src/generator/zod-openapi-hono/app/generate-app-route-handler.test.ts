import { describe, expect, test } from 'vitest'
import { generateAppRouteHandler } from './generate-app-route-handler'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/app/generate-app-route-handler.test.ts

describe('generateAppRouteHandler Test', () => {
  test.concurrent(
    `generateAppRouteHandler('getRoute', 'getRouteHandler') -> .openapi(getRoute,getRouteHandler)`,
    () => {
      const result = generateAppRouteHandler('getRoute', 'getRouteHandler')
      const expected = '.openapi(getRoute,getRouteHandler)'
      expect(result).toBe(expected)
    },
  )
})
