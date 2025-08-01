import { describe, expect, it } from 'vitest'
import { array } from './array'

// Test run
// pnpm vitest run ./src/generator/zod/z/array.test.ts

describe('array()', () => {
  // z.array(z.any())
  it.concurrent('returns z.array(z.any()) when items is missing', () => {
    expect(array({})).toBe('z.array(z.any())')
  })
  // nullable
  it.concurrent('returns z.array(z.string()).nullable() when nullable is true', () => {
    expect(array({ items: { type: 'string' }, nullable: true })).toBe(
      'z.array(z.string()).nullable()',
    )
  })
  it.concurrent('returns z.array(z.string()).nullable() when type is ["array", "null"]', () => {
    expect(array({ items: { type: 'string' }, type: ['array', 'null'] })).toBe(
      'z.array(z.string()).nullable()',
    )
  })
  // z.array(z.string())
  it.concurrent('returns z.array(z.string()) when items is string', () => {
    expect(array({ items: { type: 'string' } })).toBe('z.array(z.string())')
  })
  // z.array(z.number())
  it.concurrent('returns z.array(z.number()) when items is number', () => {
    expect(array({ items: { type: 'number' } })).toBe('z.array(z.number())')
  })
  // z.array(z.boolean())
  it.concurrent('returns z.array(z.boolean()) when items is boolean', () => {
    expect(array({ items: { type: 'boolean' } })).toBe('z.array(z.boolean())')
  })
  // z.array(z.object({}))
  it.concurrent('returns z.array(z.object({})) when items is object', () => {
    expect(array({ items: { type: 'object' } })).toBe('z.array(z.object({}))')
  })
  // z.array(z.array(z.string()))
  it.concurrent('returns z.array(z.array(z.string())) when items is array', () => {
    expect(array({ items: { type: 'array', items: { type: 'string' } } })).toBe(
      'z.array(z.array(z.string()))',
    )
  })
  // z.array(z.string()).min(1)
  it.concurrent('returns z.array(z.string()).min(1) when minItems is defined', () => {
    expect(array({ items: { type: 'string' }, minItems: 1 })).toBe('z.array(z.string()).min(1)')
  })
  // z.array(z.string()).max(10)
  it.concurrent('returns z.array(z.string()).max(10) when maxItems is defined', () => {
    expect(array({ items: { type: 'string' }, maxItems: 10 })).toBe('z.array(z.string()).max(10)')
  })
  // z.array(z.string()).min(1).max(10)
  it.concurrent(
    'returns z.array(z.string()).min(1).max(10) when minItems and maxItems are defined',
    () => {
      expect(array({ items: { type: 'string' }, minItems: 1, maxItems: 10 })).toBe(
        'z.array(z.string()).min(1).max(10)',
      )
    },
  )
  // z.array(z.string()).length(5)
  it.concurrent(
    'returns z.array(z.string()).length(5) when minItems and maxItems are equal',
    () => {
      expect(array({ items: { type: 'string' }, minItems: 5, maxItems: 5 })).toBe(
        'z.array(z.string()).length(5)',
      )
    },
  )
  // z.array(z.string()).min(1).max(10).nullable()
  it.concurrent(
    'returns z.array(z.string()).min(1).max(10).nullable() when minItems and maxItems are defined and nullable is true',
    () => {
      expect(array({ items: { type: 'string' }, minItems: 1, maxItems: 10, nullable: true })).toBe(
        'z.array(z.string()).min(1).max(10).nullable()',
      )
    },
  )
  // z.array(z.string()).min(1).max(10).nullable()
  it.concurrent(
    'returns z.array(z.string()).min(1).max(10).nullable() when minItems and maxItems are defined and type is ["array", "null"]',
    () => {
      expect(
        array({ items: { type: 'string' }, minItems: 1, maxItems: 10, type: ['array', 'null'] }),
      ).toBe('z.array(z.string()).min(1).max(10).nullable()')
    },
  )
  // z.array(z.string()).length(5).nullable()
  it.concurrent(
    'returns z.array(z.string()).length(5).nullable() when minItems and maxItems are equal and nullable is true',
    () => {
      expect(array({ items: { type: 'string' }, minItems: 5, maxItems: 5, nullable: true })).toBe(
        'z.array(z.string()).length(5).nullable()',
      )
    },
  )
  // z.array(z.string()).length(5).nullable()
  it.concurrent(
    'returns z.array(z.string()).length(5).nullable() when minItems and maxItems are equal and type is ["array", "null"]',
    () => {
      expect(
        array({ items: { type: 'string' }, minItems: 5, maxItems: 5, type: ['array', 'null'] }),
      ).toBe('z.array(z.string()).length(5).nullable()')
    },
  )
  // z.array(z.string()).default(["a", "b"])
  it.concurrent('z.array(z.string()).default(["a","b"])', () => {
    expect(array({ items: { type: 'string' }, default: ['a', 'b'] })).toBe(
      'z.array(z.string()).default(["a","b"])',
    )
  })
})
