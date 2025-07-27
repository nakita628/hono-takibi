import { describe, expect, it } from 'vitest'
import { number } from './number'

// Test run
// pnpm vitest run ./src/generator/zod/z/number.test.ts

describe('numberSchema Test', () => {
  // inclusive minimum > 0  → .min()
  it.concurrent('minimum: 5  → z.number().min(5)', () => {
    expect(number({ minimum: 5 })).toBe('z.number().min(5)')
  })

  // exclusive minimum > 0  → .gt()
  it.concurrent('minimum: 5, exclusiveMinimum: true  → .gt(5)', () => {
    expect(number({ minimum: 5, exclusiveMinimum: true })).toBe('z.number().gt(5)')
  })

  // minimum === 0 (inclusive) → .nonpositive()
  it.concurrent('minimum: 0 (inclusive)  → .nonpositive()', () => {
    expect(number({ minimum: 0, exclusiveMinimum: false })).toBe('z.number().nonpositive()')
  })

  // minimum === 0 (exclusive) → .positive()
  it.concurrent('minimum: 0, exclusiveMinimum: true  → .positive()', () => {
    expect(number({ minimum: 0, exclusiveMinimum: true })).toBe('z.number().positive()')
  })

  //
  // ───────────────────────────────────────────
  // Inclusive / Exclusive upper bound (maximum)
  // ───────────────────────────────────────────
  //

  // inclusive maximum > 0  → .max()
  it.concurrent('maximum: 20  → .max(20)', () => {
    expect(number({ maximum: 20 })).toBe('z.number().max(20)')
  })

  // exclusive maximum > 0  → .lt()
  it.concurrent('maximum: 20, exclusiveMaximum: true  → .lt(20)', () => {
    expect(number({ maximum: 20, exclusiveMaximum: true })).toBe('z.number().lt(20)')
  })

  // maximum === 0 (inclusive) → .nonnegative()
  it.concurrent('maximum: 0 (inclusive)  → .nonnegative()', () => {
    expect(number({ maximum: 0 })).toBe('z.number().nonnegative()')
  })

  // maximum === 0 (exclusive) → .negative()
  it.concurrent('maximum: 0, exclusiveMaximum: true  → .negative()', () => {
    expect(number({ maximum: 0, exclusiveMaximum: true })).toBe('z.number().negative()')
  })

  //
  // ───────────────────────────────────────────
  // Combined lower + upper bounds
  // ───────────────────────────────────────────
  //

  // inclusive [1, 9] → .min(1).max(9)
  it.concurrent('min/max inclusive (1-9)  → .min(1).max(9)', () => {
    expect(number({ minimum: 1, maximum: 9 })).toBe('z.number().min(1).max(9)')
  })

  // exclusive (1, 9) → .gt(1).lt(9)
  it.concurrent('min/max exclusive (1-9)  → .gt(1).lt(9)', () => {
    expect(
      number({
        minimum: 1,
        exclusiveMinimum: true,
        maximum: 9,
        exclusiveMaximum: true,
      }),
    ).toBe('z.number().gt(1).lt(9)')
  })

  //
  // ───────────────────────────────────────────
  // Default value interaction
  // ───────────────────────────────────────────
  //

  // default within range
  it.concurrent('default inside range  → .nonnegative().default(0)', () => {
    expect(number({ maximum: 0, default: 0 })).toBe('z.number().nonnegative().default(0)')
  })

  // default + exclusive constraint
  it.concurrent('default outside exclusive limit  → .gt(10).default(11)', () => {
    expect(number({ minimum: 10, exclusiveMinimum: true, default: 11 })).toBe(
      'z.number().gt(10).default(11)',
    )
  })
})
