import { describe, expect, it } from 'vitest'
import { array } from './array'

// Test run
// pnpm vitest run ./src/generator/zod/z/array.test.ts

describe('array()', () => {
  //
  // ───────────────────────────────────────────
  // 1. Fallback when items is undefined
  // ───────────────────────────────────────────
  //
  it.concurrent('returns z.array(z.any()) when items is missing', () => {
    expect(array({ type: 'array' })).toBe('z.array(z.any())')
  })

  //
  // ───────────────────────────────────────────
  // 2. Plain array of strings (no bounds)
  // ───────────────────────────────────────────
  //
  it.concurrent('basic array of strings', () => {
    expect(array({ type: 'array', items: { type: 'string' } })).toBe('z.array(z.string())')
  })

  //
  // ───────────────────────────────────────────
  // 3. minItems / maxItems with different values
  // ───────────────────────────────────────────
  //
  it.concurrent('array minItems + maxItems → .min().max()', () => {
    expect(array({ type: 'array', items: { type: 'number' }, minItems: 2, maxItems: 5 })).toBe(
      'z.array(z.number()).min(2).max(5)',
    )
  })

  //
  // ───────────────────────────────────────────
  // 4. minItems === maxItems → .length()
  // ───────────────────────────────────────────
  //
  it.concurrent('array with fixed length (minItems === maxItems)', () => {
    expect(array({ type: 'array', items: { type: 'boolean' }, minItems: 3, maxItems: 3 })).toBe(
      'z.array(z.boolean()).length(3)',
    )
  })

  //
  // ───────────────────────────────────────────
  // 5. Only minItems
  // ───────────────────────────────────────────
  //
  it.concurrent('array with minItems only', () => {
    expect(array({ type: 'array', items: { type: 'string' }, minItems: 1 })).toBe(
      'z.array(z.string()).min(1)',
    )
  })

  //
  // ───────────────────────────────────────────
  // 6. Only maxItems
  // ───────────────────────────────────────────
  //
  it.concurrent('array with maxItems only', () => {
    expect(array({ type: 'array', items: { type: 'number' }, maxItems: 10 })).toBe(
      'z.array(z.number()).max(10)',
    )
  })

  //
  // ───────────────────────────────────────────
  // 7. Legacy minLength / maxLength handling
  // ───────────────────────────────────────────
  //
  it.concurrent('legacy minLength/maxLength different → .min().max()', () => {
    expect(array({ type: 'array', items: { type: 'string' }, minLength: 2, maxLength: 4 })).toBe(
      'z.array(z.string()).min(2).max(4)',
    )
  })

  it.concurrent('legacy minLength === maxLength → .length()', () => {
    expect(array({ type: 'array', items: { type: 'string' }, minLength: 5, maxLength: 5 })).toBe(
      'z.array(z.string()).length(5)',
    )
  })
})
