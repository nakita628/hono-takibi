import { describe, it, expect } from 'vitest'
import { integer } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/z/integer.test.ts

describe('integer Test', () => {
  it.concurrent('integer({}) -> z.number().int()', () => {
    const result = integer({})
    const expected = 'z.number().int()'
    expect(result).toBe(expected)
  })

  it.concurrent('integer({ minimum: 1 }) -> z.number().int().min(1)', () => {
    const result = integer({ minimum: 1 })
    const expected = 'z.number().int().min(1)'
    expect(result).toBe(expected)
  })

  it.concurrent('integer({ maximum: 10 }) -> z.number().int().max(10)', () => {
    const result = integer({ maximum: 10 })
    const expected = 'z.number().int().max(10)'
    expect(result).toBe(expected)
  })
})
