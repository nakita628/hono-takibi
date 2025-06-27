import { describe, expect, it } from 'vitest'
import { appRouteHandler, applyOpenapiRoutes, importRoutes, registerComponent, docs } from '.'

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
  it('should export registerComponent', () => {
    expect(typeof registerComponent).toBe('function')
  })
  it('should export docs', () => {
    expect(typeof docs).toBe('function')
  })
})
