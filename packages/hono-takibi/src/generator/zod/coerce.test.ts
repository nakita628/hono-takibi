import { describe, it, expect } from 'vitest'
import { coerce } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-coerce.test.ts

describe('coerce Test', () => {
  it.concurrent(`coerce('z.string()', 'z.number()') -> z.string().pipe(z.coerce.number())`, () => {
    const result = coerce('z.string()', 'z.number()')
    const expected = 'z.string().pipe(z.coerce.number())'
    expect(result).toBe(expected)
  })

  it.concurrent(
    `coerce('z.string()', 'z.number()') -> z.string().pipe(z.coerce.number().min(1))`,
    () => {
      const result = coerce('z.string()', 'z.number().min(1)')
      const expected = 'z.string().pipe(z.coerce.number().min(1))'
      expect(result).toBe(expected)
    },
  )

  it.concurrent(
    `coerce('z.string()', 'z.number()') -> z.string().pipe(z.coerce.number().max(10))`,
    () => {
      const result = coerce('z.string()', 'z.number().max(10)')
      const expected = 'z.string().pipe(z.coerce.number().max(10))'
      expect(result).toBe(expected)
    },
  )
})
