import { describe, expect, it } from 'vitest'
import { integer } from './integer'

// Test run
// pnpm vitest run ./src/generator/zod/z/integer.test.ts

describe('integer Test', () => {
  // int
  it.concurrent('integer({}) -> z.int()', () => {
    expect(integer({})).toBe('z.int()')
  })
  // min
  it.concurrent('integer({ minimum: 1 }) -> z.int().min(1)', () => {
    expect(integer({ minimum: 1 })).toBe('z.int().min(1)')
  })
  // max
  it.concurrent('integer({ maximum: 10 }) -> z.int().max(10)', () => {
    expect(integer({ maximum: 10 })).toBe('z.int().max(10)')
  })
  // bigint
  it.concurrent('integer({ format: "bigint" }) -> z.bigint()', () => {
    expect(integer({ format: 'bigint' })).toBe('z.bigint()')
  })
  // gt
  it.concurrent('integer({ exclusiveMinimum: 5 }) -> z.int().gt(5)', () => {
    expect(integer({ exclusiveMinimum: 5 })).toBe('z.int().gt(5)')
  })
  // lt
  it.concurrent('integer({ exclusiveMaximum: 100 }) -> z.int().lt(100)', () => {
    expect(integer({ exclusiveMaximum: 100 })).toBe('z.int().lt(100)')
  })
  // if minimum === 0 and exclusiveMinimum is true
  it.concurrent('integer({ minimum: 0, exclusiveMinimum: true }) -> z.int().positive()', () => {
    expect(integer({ minimum: 0, exclusiveMinimum: true })).toBe('z.int().positive()')
  })
  // if minimum === 0 and exclusiveMinimum is false
  it.concurrent('integer({ maximum: 0, exclusiveMaximum: true }) -> z.int().negative()', () => {
    expect(integer({ maximum: 0, exclusiveMaximum: true })).toBe('z.int().negative()')
  })
  // if minimum === 0 and exclusiveMinimum is true
  it.concurrent(
    'integer({ format: "int32", minimum: 0, exclusiveMinimum: true }) -> z.int32().positive()',
    () => {
      expect(integer({ format: 'int32', minimum: 0, exclusiveMinimum: true })).toBe(
        'z.int32().positive()',
      )
    },
  )
  // if minimum === 0 and exclusiveMinimum is false
  it.concurrent('integer({ maximum: 10, exclusiveMaximum: 10 }) -> z.int().max(10).lt(10)', () => {
    expect(integer({ maximum: 10, exclusiveMaximum: 10 })).toBe('z.int().lt(10)')
  })
})
