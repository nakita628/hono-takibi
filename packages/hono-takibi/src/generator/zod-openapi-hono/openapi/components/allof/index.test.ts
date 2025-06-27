import { describe, it, expect } from 'vitest'
import { allOf } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/component/allOf/index.test.ts

describe('allOf barrel file exports', () => {
  it.concurrent('should export allOf function', () => {
    expect(typeof allOf).toBe('function')
  })
})
