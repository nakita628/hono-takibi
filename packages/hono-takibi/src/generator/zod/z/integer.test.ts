import { describe, expect, it } from 'vitest'
import { integer } from './integer'

// Test run
// pnpm vitest run ./src/generator/zod/z/integer.test.ts

describe('integer', () => {
  // int
  it.concurrent('z.int32() → .int32()', () => {
    expect(integer({ type: 'integer', format: 'int32' })).toBe('z.int32()')
  })
  it.concurrent('z.int64() → .int64()', () => {
    expect(integer({ type: 'integer', format: 'int64' })).toBe('z.int64()')
  })
  it.concurrent('z.bigint() → .bigint()', () => {
    expect(integer({ type: 'integer', format: 'bigint' })).toBe('z.bigint()')
  })
  // int
  it.concurrent('z.int() → .int()', () => {
    expect(integer({ type: 'integer' })).toBe('z.int()')
  })
  // positive
  it.concurrent('z.int().positive() → .positive()', () => {
    expect(integer({ minimum: 0, exclusiveMinimum: true })).toBe('z.int().positive()')
  })
  // nonnegative
  it.concurrent('z.int().nonnegative() → .nonnegative()', () => {
    expect(integer({ minimum: 0, exclusiveMinimum: false })).toBe('z.int().nonnegative()')
  })
  // negative
  it.concurrent('z.integer().negative() → .negative()', () => {
    expect(integer({ maximum: 0, exclusiveMaximum: true })).toBe('z.int().negative()')
  })
  // nonpositive
  it.concurrent('z.integer().nonpositive() → .nonpositive()', () => {
    expect(integer({ maximum: 0, exclusiveMaximum: false })).toBe('z.int().nonpositive()')
  })
  // min
  it.concurrent('minimum: 100 → z.int().min(100)', () => {
    expect(integer({ minimum: 100 })).toBe('z.int().min(100)')
  })
  // gt
  it.concurrent('minimum: 100, exclusiveMinimum: true → z.int().gt(100)', () => {
    expect(integer({ minimum: 100, exclusiveMinimum: true })).toBe('z.int().gt(100)')
  })
  // max
  it.concurrent('maximum: 100 → z.int().max(100)', () => {
    expect(integer({ maximum: 100 })).toBe('z.int().max(100)')
  })
  // lt
  it.concurrent('maximum: 100, exclusiveMaximum: true → z.int().lt(100)', () => {
    expect(integer({ maximum: 100, exclusiveMaximum: true })).toBe('z.int().lt(100)')
  })
  // multipleOf
  it.concurrent('z.int().multipleOf(2)', () => {
    expect(integer({ type: 'integer', multipleOf: 2 })).toBe('z.int().multipleOf(2)')
  })
  // default
  it.concurrent('default: 100 → z.int().default(100)', () => {
    expect(integer({ default: 100 })).toBe('z.int().default(100)')
  })
})
