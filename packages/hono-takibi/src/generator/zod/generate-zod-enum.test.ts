import type { Schema } from '../../types'
import { describe, it, expect } from 'vitest'
import { generateZodEnum } from './generate-zod-enum'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-enum.test.ts

describe('generateZodEnum Test', () => {
  it.concurrent('generateZodEnum -> z.enum(["a","b","c"])', () => {
    const result = generateZodEnum({
      type: 'string',
      enum: ['a', 'b', 'c'],
    })

    const expected = 'z.enum(["a","b","c"])'
    expect(result).toBe(expected)
  })

  it.concurrent('generateZodEnum -> z.enum(["a","b","c"])', () => {
    const result = generateZodEnum({
      type: 'string',
      enum: ['a', 'b', 'c'],
    })

    const expected = 'z.enum(["a","b","c"])'
    expect(result).toBe(expected)
  })

  it.concurrent(`generateZodEnum -> z.literal('test')`, () => {
    const result = generateZodEnum({
      type: 'string',
      enum: ['test'],
    })

    const expected = `z.literal('test')`
    expect(result).toBe(expected)
  })
})
