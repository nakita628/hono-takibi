import { describe, expect, it } from 'vitest'
import { number } from './number'

// Test run
// pnpm vitest run ./src/generator/zod/z/number.test.ts

describe('number', () => {
  // float
  it.concurrent('format: float → z.float32()', () => {
    expect(number({ format: 'float' })).toBe('z.float32()')
  })
  it.concurrent('format: float64 → z.float64()', () => {
    expect(number({ format: 'float64' })).toBe('z.float64()')
  })
  it.concurrent('{} → z.number()', () => {
    expect(number({})).toBe('z.number()')
  })
  // nullable
  it.concurrent('nullable: true → z.number().nullable()', () => {
    expect(number({ nullable: true })).toBe('z.number().nullable()')
  })
  it.concurrent('type: null → z.number().nullable()', () => {
    expect(number({ type: ['number', 'null'] })).toBe('z.number().nullable()')
  })
  // positive
  it.concurrent('minimum: 0, exclusiveMinimum: true → z.number().positive()', () => {
    expect(number({ minimum: 0, exclusiveMinimum: true })).toBe('z.number().positive()')
  })
  // nonnegative
  it.concurrent('minimum: 0, exclusiveMinimum: false → z.number().nonnegative()', () => {
    expect(number({ minimum: 0, exclusiveMinimum: false })).toBe('z.number().nonnegative()')
  })
  // negative
  it.concurrent('maximum: 0, exclusiveMaximum: true → z.number().negative()', () => {
    expect(number({ maximum: 0, exclusiveMaximum: true })).toBe('z.number().negative()')
  })
  // nonpositive
  it.concurrent('maximum: 0 → z.number().nonpositive()', () => {
    expect(number({ maximum: 0, exclusiveMaximum: false })).toBe('z.number().nonpositive()')
  })
  // min
  it.concurrent('minimum: 100 → z.number().min(100)', () => {
    expect(number({ minimum: 100 })).toBe('z.number().min(100)')
  })
  // min 0
  it.concurrent('minimum: 0, exclusiveMinimum: true → z.number().min(0)', () => {
    expect(number({ minimum: 0 })).toBe('z.number().min(0)')
  })
  // gt
  it.concurrent('minimum: 100, exclusiveMinimum: true → z.number().gt(100)', () => {
    expect(number({ minimum: 100, exclusiveMinimum: true })).toBe('z.number().gt(100)')
  })
  // max
  it.concurrent('maximum: 100 → z.number().max(100)', () => {
    expect(number({ maximum: 100 })).toBe('z.number().max(100)')
  })
  // max 0
  it.concurrent('maximum: 0, exclusiveMaximum: true → z.number().max(0)', () => {
    expect(number({ maximum: 0 })).toBe('z.number().max(0)')
  })
  // lt
  it.concurrent('maximum: 100, exclusiveMaximum: true → z.number().lt(100)', () => {
    expect(number({ maximum: 100, exclusiveMaximum: true })).toBe('z.number().lt(100)')
  })
  // multipleOf
  it.concurrent('multipleOf: 2 → z.number().multipleOf(2)', () => {
    expect(number({ type: 'number', multipleOf: 2 })).toBe('z.number().multipleOf(2)')
  })
  // default
  it.concurrent('default: 100 → z.number().default(100)', () => {
    expect(number({ default: 100 })).toBe('z.number().default(100)')
  })
})
