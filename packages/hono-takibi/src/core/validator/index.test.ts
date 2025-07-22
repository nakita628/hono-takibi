import { describe, expect, it } from 'vitest'
import {
  isAllOptional,
  isArrayWithSchemaReference,
  isHttpMethod,
  isNullableSchema,
  isOperation,
  isRefObject,
  isUniqueContentSchema,
} from '.'

// Test run
// pnpm vitest run ./src/core/validator/index.test.ts

describe('utils module barrel file exports', () => {
  it('should export isAllOptional', () => {
    expect(typeof isAllOptional).toBe('function')
  })

  it('should export isArrayWithSchemaReference', () => {
    expect(typeof isArrayWithSchemaReference).toBe('function')
  })

  it('should export isHttpMethod', () => {
    expect(typeof isHttpMethod).toBe('function')
  })

  it('should export isNullableSchema', () => {
    expect(typeof isNullableSchema).toBe('function')
  })

  it('should export isOperation', () => {
    expect(typeof isOperation).toBe('function')
  })

  it('should export isRefObject', () => {
    expect(typeof isRefObject).toBe('function')
  })

  it('should export isUniqueContentSchema', () => {
    expect(typeof isUniqueContentSchema).toBe('function')
  })
})
