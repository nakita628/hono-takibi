import { describe, expect, test } from 'vitest'
import { generateZodIntegerSchema } from './generate-zod-integer-schema'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-integer-schema.test.ts

describe('generateZodIntegerSchema Test', () => {
  test.concurrent(`generateZodIntegerSchema({}) -> z.number().int()`, () => {
    const result = generateZodIntegerSchema({})
    const expected = 'z.number().int()'
    expect(result).toBe(expected)
  })

  test.concurrent(`generateZodIntegerSchema({ minimum: 1 }) -> z.number().int().min(1)`, () => {
    const result = generateZodIntegerSchema({ minimum: 1 })
    const expected = 'z.number().int().min(1)'
    expect(result).toBe(expected)
  })

  test.concurrent(`generateZodIntegerSchema({ maximum: 10 }) -> z.number().int().max(10)`, () => {
    const result = generateZodIntegerSchema({ maximum: 10 })
    const expected = 'z.number().int().max(10)'
    expect(result).toBe(expected)
  })
})
