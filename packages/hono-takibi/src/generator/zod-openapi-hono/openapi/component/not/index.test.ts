import { describe, it, expect } from 'vitest'
import { not } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/component/not/index.test.ts

describe('not barrel file exports', () => {
  it.concurrent('should export not function', () => {
    expect(typeof not).toBe('function')
  })
})
