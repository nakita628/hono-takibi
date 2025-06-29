import { describe, it, expect } from 'vitest'
import { response } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/response/index.test.ts

describe('response module barrel file exports', () => {
  it('should export response', () => {
    expect(typeof response).toBe('function')
  })
})
