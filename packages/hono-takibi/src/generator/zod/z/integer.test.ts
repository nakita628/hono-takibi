import { describe, expect, it } from 'vitest'
import { integer } from './integer'

// Test run
// pnpm vitest run ./src/generator/zod/z/integer.test.ts

describe('integer Test', () => {
  //
  // ───────────────────────────────────
  // Base type selection
  // ───────────────────────────────────
  //
  it('returns z.int() for plain integer', () => {
    expect(integer({})).toBe('z.int()')
  })

  it('returns z.int32() when format=int32', () => {
    expect(integer({ format: 'int32' })).toBe('z.int32()')
  })

  it('returns z.int64() when format=int64', () => {
    expect(integer({ format: 'int64' })).toBe('z.int64()')
  })

  it('returns z.bigint() when format=bigint', () => {
    expect(integer({ format: 'bigint' })).toBe('z.bigint()')
  })

  //
  // ───────────────────────────────────
  // Inclusive bounds (.min / .max)
  // ───────────────────────────────────
  //
  it('adds .min() when minimum is given (inclusive)', () => {
    expect(integer({ minimum: 1 })).toBe('z.int().min(1)')
  })

  it('adds .max() when maximum is given (inclusive)', () => {
    expect(integer({ maximum: 10 })).toBe('z.int().max(10)')
  })

  //
  // ───────────────────────────────────
  // Exclusive bounds – numeric form
  // ───────────────────────────────────
  //
  it('adds .gt() when exclusiveMinimum is a number', () => {
    expect(integer({ exclusiveMinimum: 5 })).toBe('z.int().gt(5)')
  })

  it('adds .lt() when exclusiveMaximum is a number', () => {
    expect(integer({ exclusiveMaximum: 100 })).toBe('z.int().lt(100)')
  })

  //
  // ───────────────────────────────────
  // Exclusive flags (boolean true)
  // ───────────────────────────────────
  //
  it('minimum=0 & exclusiveMinimum=true ⇒ .positive()', () => {
    expect(integer({ minimum: 0, exclusiveMinimum: true })).toBe('z.int().positive()')
  })

  it('maximum=0 & exclusiveMaximum=true ⇒ .negative()', () => {
    expect(integer({ maximum: 0, exclusiveMaximum: true })).toBe('z.int().negative()')
  })

  it('minimum>0 & exclusiveMinimum=true keeps .min()', () => {
    // because code only converts to .gt() when exclusiveMinimum is *number*
    expect(integer({ minimum: 5, exclusiveMinimum: true })).toBe('z.int().min(5)')
  })

  it('maximum>0 & exclusiveMaximum=true keeps .max()', () => {
    expect(integer({ maximum: 20, exclusiveMaximum: true })).toBe('z.int().max(20)')
  })

  //
  // ───────────────────────────────────
  // Defaults
  // ───────────────────────────────────
  //
  it('numeric default always ends with n', () => {
    expect(integer({ default: 10 })).toBe('z.int().default(10n)')
  })

  it('bigint default keeps n and preceding validators', () => {
    console.log(integer({ format: 'bigint', minimum: 1, default: 5 }))
    expect(integer({ format: 'bigint', minimum: 1, default: 5 })).toBe(
      'z.bigint().min(1n).default(5n)',
    )
  })

  //
  // ───────────────────────────────────
  // Suffix “n” handling for int64/bigint
  // ───────────────────────────────────
  //
  it('int64: .min() appends n', () => {
    expect(integer({ format: 'int64', minimum: 10 })).toBe('z.int64().min(10n)')
  })

  it('int64: .max() with exclusive flag keeps .max() and n-suffix', () => {
    expect(integer({ format: 'int64', maximum: 100, exclusiveMaximum: true })).toBe(
      'z.int64().max(100n)',
    )
  })

  it('bigint: numeric exclusive bounds use n-suffix in .gt() / .lt()', () => {
    expect(
      integer({
        format: 'bigint',
        minimum: 5,
        exclusiveMinimum: 5, // numeric → .gt()
        maximum: 100,
        exclusiveMaximum: 100, // numeric → .lt()
      }),
    ).toBe('z.bigint().gt(5n).lt(100n)')
  })
})
