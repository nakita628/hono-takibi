import { describe, expect, it } from 'vitest'
import {
  paramsObject,
  queryParameter,
  requestParameter,
  requestParamsArray,
} from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/params/index.test.ts

describe('request module barrel file exports', () => {
  it('should export paramsObject', () => {
    expect(typeof paramsObject).toBe('function')
  })

  it('should export requestParameter', () => {
    expect(typeof requestParameter).toBe('function')
  })
  it('should export requestParamsArray', () => {
    expect(typeof requestParamsArray).toBe('function')
  })
  it('should export queryParameter', () => {
    expect(typeof queryParameter).toBe('function')
  })
})
