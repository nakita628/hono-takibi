import { describe, expect, it } from 'vitest'
import { array } from './array'

// Test run
// pnpm vitest run ./src/generator/zod/z/array.test.ts

describe('array()', () => {
  // z.array(z.any())
  it.concurrent('returns z.array(z.any()) when items is missing', () => {
    expect(array({ type: 'array' })).toBe('z.array(z.any())')
  })
  // z.array(z.string())
  it.concurrent('returns z.array(z.string()) when items is string', () => {
    expect(array({ type: 'array', items: { type: 'string' } })).toBe('z.array(z.string())')
  })
  // z.array(z.number())
  it.concurrent('returns z.array(z.number()) when items is number', () => {
    expect(array({ type: 'array', items: { type: 'number' } })).toBe('z.array(z.number())')
  })
  // z.array(z.boolean())
  it.concurrent('returns z.array(z.boolean()) when items is boolean', () => {
    expect(array({ type: 'array', items: { type: 'boolean' } })).toBe('z.array(z.boolean())')
  })
  // z.array(z.object({}))
  it.concurrent('returns z.array(z.object({})) when items is object', () => {
    expect(array({ type: 'array', items: { type: 'object' } })).toBe('z.array(z.object({}))')
  })
  // z.array(z.array(z.string()))
  it.concurrent('returns z.array(z.array(z.string())) when items is array', () => {
    expect(array({ type: 'array', items: { type: 'array', items: { type: 'string' } } })).toBe(
      'z.array(z.array(z.string()))',
    )
  })
  // z.array(z.string()).min(1)
  it.concurrent('returns z.array(z.string()).min(1) when minItems is defined', () => {
    expect(array({ type: 'array', items: { type: 'string' }, minItems: 1 })).toBe(
      'z.array(z.string()).min(1)',
    )
  })
  // z.array(z.string()).max(10)
  it.concurrent('returns z.array(z.string()).max(10) when maxItems is defined', () => {
    expect(array({ type: 'array', items: { type: 'string' }, maxItems: 10 })).toBe(
      'z.array(z.string()).max(10)',
    )
  })
  // z.array(z.string()).min(1).max(10)
  it.concurrent(
    'returns z.array(z.string()).min(1).max(10) when minItems and maxItems are defined',
    () => {
      expect(array({ type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 10 })).toBe(
        'z.array(z.string()).min(1).max(10)',
      )
    },
  )
  // z.array(z.string()).length(5)
  it.concurrent(
    'returns z.array(z.string()).length(5) when minItems and maxItems are equal',
    () => {
      expect(array({ type: 'array', items: { type: 'string' }, minItems: 5, maxItems: 5 })).toBe(
        'z.array(z.string()).length(5)',
      )
    },
  )
})
