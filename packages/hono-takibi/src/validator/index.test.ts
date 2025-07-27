import { describe, expect, it } from 'vitest'
import {
  isAllOptional,
  isArrayWithSchemaReference,
  isHttpMethod,
  isNullableSchema,
  isRefObject,
  isUniqueContentSchema,
} from '.'

// Test run
// pnpm vitest run ./src/validator/index.test.ts

describe('validator', () => {
  // isAllOptional
  describe('isAllOptional', () => {
    it.concurrent(`isAllOptional(['id:z.string().optional()']) -> true`, () => {
      const result = isAllOptional(['id:z.string().optional()'])
      const expected = true
      expect(result).toBe(expected)
    })
    it.concurrent(`isAllOptional(['id:z.string()']) -> false`, () => {
      const result = isAllOptional(['id:z.string()'])
      const expected = false
      expect(result).toBe(expected)
    })
  })
  // isArrayWithSchemaReference
  describe('isArrayWithSchemaReference', () => {
    it.concurrent('isArrayWithSchemaReference -> true', () => {
      const result = isArrayWithSchemaReference({
        type: 'array',
        items: { $ref: '#/components/schemas/Test' },
      })
      expect(result).toBe(true)
    })
    it.concurrent('isArrayWithSchemaReference -> false', () => {
      const result = isArrayWithSchemaReference({ type: 'string', format: 'binary' })
      expect(result).toBe(false)
    })
    it.concurrent('isArrayWithSchemaReference -> false', () => {
      const result = isArrayWithSchemaReference({
        type: 'array',
        items: undefined,
      })
      expect(result).toBe(false)
    })
  })
  // isHttpMethod
  describe('isHttpMethod', () => {
    it.concurrent.each([
      { method: 'get', expected: true },
      { method: 'post', expected: true },
      { method: 'put', expected: true },
      { method: 'delete', expected: true },
      { method: 'patch', expected: true },
      { method: 'options', expected: true },
      { method: 'head', expected: true },
      { method: 'trace', expected: true },
      { method: 'GET', expected: false },
      { method: 'POST', expected: false },
      { method: 'PUT', expected: false },
      { method: 'DELETE', expected: false },
      { method: 'PATCH', expected: false },
      { method: 'OPTIONS', expected: false },
      { method: 'HEAD', expected: false },
      { method: 'TRACE', expected: false },
    ])('isHttpMethod($method) -> $expected', async ({ method, expected }) => {
      const result = isHttpMethod(method)
      expect(result).toBe(expected)
    })
  })
  // isNullableSchema
  describe('isNullableSchema Test', () => {
    it.concurrent('isNullableSchema -> true', () => {
      const result = isNullableSchema({
        nullable: true,
      })
      const expected = true
      expect(result).toBe(expected)
    })
    it.concurrent('isNullableSchema -> false', () => {
      const result = isNullableSchema({
        type: 'object',
        properties: {
          test: {
            type: 'string',
          },
        },
      })
      const expected = false
      expect(result).toBe(expected)
    })
  })
  // isRefObject
  describe('isRefObject Test', () => {
    it.concurrent('isRefObject -> true', () => {
      const result = isRefObject({ type: 'object' })
      const expected = true
      expect(result).toBe(expected)
    })
    it.concurrent('isRefObject -> true', () => {
      const result = isRefObject({ $ref: '#/components/schemas/Test' })
      const expected = true
      expect(result).toBe(expected)
    })
    it.concurrent('isRefObject -> false', () => {
      const result = isRefObject('string')
      const expected = false
      expect(result).toBe(expected)
    })
    it.concurrent('isRefObject -> false', () => {
      const result = isRefObject(1)
      const expected = false
      expect(result).toBe(expected)
    })
    it.concurrent('isRefObject -> false', () => {
      const result = isRefObject(true)
      const expected = false
      expect(result).toBe(expected)
    })
    it.concurrent('isRefObject -> false', () => {
      const result = isRefObject(false)
      const expected = false
      expect(result).toBe(expected)
    })
  })
  // isUniqueContentSchema
  describe('isUniqueContentSchema Test', () => {
    it.concurrent('isUniqueContentSchema -> true', () => {
      const result = isUniqueContentSchema(['application/json'], {
        'application/json': { schema: { $ref: '#/components/schemas/Test' } },
      })
      const expected = true
      expect(result).toBe(expected)
    })
    it.concurrent('isUniqueContentSchema -> false', () => {
      const result = isUniqueContentSchema(['application/json', 'application/xml'], {
        'application/json': { schema: { $ref: '#/components/schemas/Test' } },
        'application/xml': { schema: { $ref: '#/components/schemas/Example' } },
      })
      const expected = false
      expect(result).toBe(expected)
    })
  })
})
