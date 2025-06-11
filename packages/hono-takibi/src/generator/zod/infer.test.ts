import { describe, it, expect } from 'vitest'
import { infer } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/infer.test.ts

describe('infer Test', () => {
  it.concurrent(
    `infer('test', 'testSchema') -> export type test = z.infer<typeof testSchema>`,
    () => {
      const result = infer('test', 'testSchema')
      const expected = 'export type test = z.infer<typeof testSchema>'
      expect(result).toBe(expected)
    },
  )

  it.concurrent(
    `infer('Test', 'TestSchema') -> export type Test = z.infer<typeof TestSchema>`,
    () => {
      const result = infer('Test', 'TestSchema')
      const expected = 'export type Test = z.infer<typeof TestSchema>'
      expect(result).toBe(expected)
    },
  )
})
