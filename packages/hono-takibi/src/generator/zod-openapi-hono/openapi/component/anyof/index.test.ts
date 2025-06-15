import { describe, it, expect } from 'vitest'
import { anyOf } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/component/anyOf/index.test.ts

describe('anyOf barrel file exports', () => {
  it.concurrent('should export anyOf function', () => {
    expect(typeof anyOf).toBe('function')
  })
})
