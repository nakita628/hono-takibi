import type { Schema } from '../../types'
import { describe, it, expect } from 'vitest'
import { _enum } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/enum.test.ts

describe('_enum Test', () => {
  it.concurrent('_enum -> z.enum(["a","b","c"])', () => {
    const result = _enum({
      type: 'string',
      enum: ['a', 'b', 'c'],
    })

    const expected = 'z.enum(["a","b","c"])'
    expect(result).toBe(expected)
  })

  it.concurrent('_enum -> z.enum(["a","b","c"])', () => {
    const result = _enum({
      type: 'string',
      enum: ['a', 'b', 'c'],
    })

    const expected = 'z.enum(["a","b","c"])'
    expect(result).toBe(expected)
  })

  it.concurrent(`_enum -> z.literal('test')`, () => {
    const result = _enum({
      type: 'string',
      enum: ['test'],
    })

    const expected = `z.literal('test')`
    expect(result).toBe(expected)
  })
})
