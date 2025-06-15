import { describe, it, expect } from 'vitest'
import { oneOf } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/component/oneof/index.test.ts

describe('oneOf barrel file exports', () => {
  it.concurrent('should export oneOf function', () => {
    expect(typeof oneOf).toBe('function')
  })
})
