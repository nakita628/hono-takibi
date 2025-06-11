import { describe, it, expect } from 'vitest'
import { paramsObject, requestParameter, requestParams, requestParamsArray } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/params/index.test.ts

describe('request module barrel file exports', () => {
  it('should export paramsObject', () => {
    expect(typeof paramsObject).toBe('function')
  })

  it('should export requestParameter', () => {
    expect(typeof requestParameter).toBe('function')
  })

  it('should export requestParams', () => {
    expect(typeof requestParams).toBe('function')
  })

  it('should export requestParamsArray', () => {
    expect(typeof requestParamsArray).toBe('function')
  })
})
