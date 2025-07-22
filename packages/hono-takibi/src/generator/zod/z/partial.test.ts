import { describe, expect, it } from 'vitest'
import { partial } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/z/partial.test.ts

describe('partial Test', () => {
  it.concurrent(
    `partial(['test:z.string().optional()']) -> z.object({test:z.string()}).partial()`,
    () => {
      const result = partial(['test:z.string().optional()'])
      const expected = 'z.object({test:z.string()}).partial()'
      expect(result).toBe(expected)
    },
  )
})
