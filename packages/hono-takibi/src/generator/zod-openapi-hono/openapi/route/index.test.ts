import { describe, expect, it } from 'vitest'
import { createRoute, route, routeCode } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/index.test.ts

describe('route module barrel file exports', () => {
  it('should export createRoute', () => {
    expect(typeof createRoute).toBe('function')
  })

  it('should export route', () => {
    expect(typeof route).toBe('function')
  })

  it('should export routeCode', () => {
    expect(typeof routeCode).toBe('function')
  })
})
