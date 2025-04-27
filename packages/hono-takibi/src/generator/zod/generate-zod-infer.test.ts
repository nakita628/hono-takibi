import { describe, expect, test } from 'vitest'
import { generateZodInfer } from './generate-zod-infer'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-infer.test.ts

describe('generateZodInfer Test', () => {
  test.concurrent(
    `generateZodInfer('test', 'testSchema') -> export type test = z.infer<typeof testSchema>`,
    () => {
      const result = generateZodInfer('test', 'testSchema')
      const expected = 'export type test = z.infer<typeof testSchema>'
      expect(result).toBe(expected)
    },
  )

  test.concurrent(
    `generateZodInfer('Test', 'TestSchema') -> export type Test = z.infer<typeof TestSchema>`,
    () => {
      const result = generateZodInfer('Test', 'TestSchema')
      const expected = 'export type Test = z.infer<typeof TestSchema>'
      expect(result).toBe(expected)
    },
  )
})
