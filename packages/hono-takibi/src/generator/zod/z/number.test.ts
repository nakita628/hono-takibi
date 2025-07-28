import { describe, expect, it } from 'vitest'
import { number } from './number'

// Test run
// pnpm vitest run ./src/generator/zod/z/number.test.ts

describe('numberSchema', () => {
  // float
  it.concurrent('z.float32() → .float32()', () => {
    expect(number({ type: 'number', format: 'float' })).toBe('z.float32()')
  })
  it.concurrent('z.float64() → .float64()', () => {
    expect(number({ type: 'number', format: 'float64' })).toBe('z.float64()')
  })
  it.concurrent('z.number() → .number()', () => {
    expect(number({ type: 'number' })).toBe('z.number()')
  })
  // positive
  it.concurrent('z.number().positive() → .positive()', () => {
    expect(number({ minimum: 0, exclusiveMinimum: true })).toBe('z.number().positive()')
  })
  // nonnegative
  it.concurrent('z.number().nonnegative() → .nonnegative()', () => {
    expect(number({ minimum: 0, exclusiveMinimum: false })).toBe('z.number().nonnegative()')
  })
  // negative
  it.concurrent('z.number().negative() → .negative()', () => {
    expect(number({ maximum: 0, exclusiveMaximum: true })).toBe('z.number().negative()')
  })
  // nonpositive
  it.concurrent('z.number().nonpositive() → .nonpositive()', () => {
    expect(number({ maximum: 0, exclusiveMaximum: false })).toBe('z.number().nonpositive()')
  })
  // min
  it.concurrent('minimum: 100 → z.number().min(100)', () => {
    expect(number({ minimum: 100 })).toBe('z.number().min(100)')
  })
  // gt
  it.concurrent('minimum: 100, exclusiveMinimum: true → z.number().gt(100)', () => {
    expect(number({ minimum: 100, exclusiveMinimum: true })).toBe('z.number().gt(100)')
  })
  // max
  it.concurrent('maximum: 100 → z.number().max(100)', () => {
    expect(number({ maximum: 100 })).toBe('z.number().max(100)')
  })
  // lt
  it.concurrent('maximum: 100, exclusiveMaximum: true → z.number().lt(100)', () => {
    expect(number({ maximum: 100, exclusiveMaximum: true })).toBe('z.number().lt(100)')
  })
  // multipleOf
  it.concurrent('z.number().multipleOf(2)', () => {
    expect(number({ type: 'number', multipleOf: 2 })).toBe('z.number().multipleOf(2)')
  })
  // default
  it.concurrent('default: 100 → z.number().default(100)', () => {
    expect(number({ default: 100 })).toBe('z.number().default(100)')
  })
})
