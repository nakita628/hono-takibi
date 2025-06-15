import { describe, expect, it } from 'vitest'
import { appRouteHandler, applyOpenapiRoutes, importRoutes } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/app/generator/index.test.ts

describe('generator barrel file exports', () => {
  it('should export appRouteHandler', () => {
    expect(typeof appRouteHandler).toBe('function')
  })

  it('should export applyOpenapiRoutes', () => {
    expect(typeof applyOpenapiRoutes).toBe('function')
  })

  it('should export importRoutes', () => {
    expect(typeof importRoutes).toBe('function')
  })
})
