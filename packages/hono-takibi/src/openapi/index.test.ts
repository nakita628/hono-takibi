import { describe, expect, it } from 'vitest'
import type {
  Components,
  Content,
  DefaultValue,
  OpenAPI,
  OpenAPIPaths,
  Operation,
  Parameters,
  ParamsObject,
  RequestBody,
  Responses,
  Schema,
  SecuritySchemes,
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
      DefaultValue?,
      OpenAPI?,
      OpenAPIPaths?,
      Operation?,
      Parameters?,
      ParamsObject?,
      RequestBody?,
      Responses?,
      Schema?,
      SecuritySchemes?,
      Type?,
    ] = []

    expect(Array.isArray(_)).toBe(true)
  })
})
