import { describe, it, expect } from 'vitest'
import { generateZodPartialSchema } from './generate-zod-partial-schema'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-partial-schema.test.ts

describe('generateZodPartialSchema Test', () => {
  it.concurrent(
    `generateZodPartialSchema(['test:z.string().optional()']) -> z.object({test:z.string()}).partial()`,
    () => {
      const result = generateZodPartialSchema(['test:z.string().optional()'])
      const expected = 'z.object({test:z.string()}).partial()'
      expect(result).toBe(expected)
    },
  )
})
