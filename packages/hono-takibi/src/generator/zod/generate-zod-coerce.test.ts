import { describe, expect, test, it } from 'vitest'
import { generateZodCoerce } from './generate-zod-coerce'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-coerce.test.ts

describe('generateZodCoerce Test', () => {
  test.concurrent(
    `generateZodCoerce('z.string()', 'z.number()') -> z.string().pipe(z.coerce.number())`,
    () => {
      const result = generateZodCoerce('z.string()', 'z.number()')
      const expected = 'z.string().pipe(z.coerce.number())'
      expect(result).toBe(expected)
    },
  )

  test.concurrent(
    `generateZodCoerce('z.string()', 'z.number()') -> z.string().pipe(z.coerce.number().min(1))`,
    () => {
      const result = generateZodCoerce('z.string()', 'z.number().min(1)')
      const expected = 'z.string().pipe(z.coerce.number().min(1))'
      expect(result).toBe(expected)
    },
  )

  test.concurrent(
    `generateZodCoerce('z.string()', 'z.number()') -> z.string().pipe(z.coerce.number().max(10))`,
    () => {
      const result = generateZodCoerce('z.string()', 'z.number().max(10)')
      const expected = 'z.string().pipe(z.coerce.number().max(10))'
      expect(result).toBe(expected)
    },
  )
})
