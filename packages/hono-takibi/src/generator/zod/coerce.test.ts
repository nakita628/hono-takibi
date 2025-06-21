import { describe, it, expect } from 'vitest'
import { coerce } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/coerce.test.ts

describe('coerce Test', () => {
  it.concurrent(`coerce('z.number()') -> z.coerce.number())`, () => {
    const result = coerce('z.number()')
    const expected = 'z.coerce.number()'
    expect(result).toBe(expected)
  })

  it.concurrent(`coerce('z.number().min(1)') -> z.coerce.number().min(1))`, () => {
    const result = coerce('z.number().min(1)')
    const expected = 'z.coerce.number().min(1)'
    expect(result).toBe(expected)
  })

  it.concurrent(`coerce('z.number().max(10)') -> z.coerce.number().max(10))`, () => {
    const result = coerce('z.number().max(10)')
    console.log(result)
    const expected = 'z.coerce.number().max(10)'
    expect(result).toBe(expected)
  })
})
