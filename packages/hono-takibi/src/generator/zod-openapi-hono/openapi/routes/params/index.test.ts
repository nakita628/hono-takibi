import { describe, expect, it } from 'vitest'
import { paramsObject, request } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/params/index.test.ts

describe('request module barrel file exports', () => {
  it('should export paramsObject', () => {
    expect(typeof paramsObject).toBe('function')
  })

  it('should export request', () => {
    expect(typeof request).toBe('function')
  })
})
