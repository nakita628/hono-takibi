import { describe, it, expect } from 'vitest'
import { response } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/response/response.test.ts

describe('response module barrel file export', () => {
  it('should export response function', () => {
    expect(typeof response).toBe('function')
  })
})
