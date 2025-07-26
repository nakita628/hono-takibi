import { describe, expect, it } from 'vitest'
import type {
  Components,
  Content,
  OpenAPI,
  OpenAPIPaths,
  Operation,
  Parameters,
  RequestBody,
  Responses,
  Schema,
  Type,
} from './index.js'
import { parseOpenAPI } from './index.js'

// Test run:
// pnpm vitest run ./src/openapi/index.test.ts

describe('swagger/index exports', () => {
  it('should export parseOpenAPI function', () => {
    expect(typeof parseOpenAPI).toBe('function')
  })

  it('should export all expected types (type-only test)', () => {
    const _: [
      Components?,
      Content?,
      OpenAPI?,
      OpenAPIPaths?,
      Operation?,
      Parameters?,
      RequestBody?,
      Responses?,
      Schema?,
      Type?,
    ] = []

    expect(Array.isArray(_)).toBe(true)
  })
})
