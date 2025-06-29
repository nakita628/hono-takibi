import { describe, it, expect } from 'vitest'
import { formatRequestObject, insertRequestBody, requestBody } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/request/index.test.ts

describe('barrel exports in index.ts', () => {
  it('should export formatRequestObject', () => {
    expect(typeof formatRequestObject).toBe('function')
  })

  it('should export insertRequestBody', () => {
    expect(typeof insertRequestBody).toBe('function')
  })

  it('should export requestBody', () => {
    expect(typeof requestBody).toBe('function')
  })
})
