import { describe, it, expect } from 'vitest'
import { infer } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/infer.test.ts

describe('infer Test', () => {
  it.concurrent(
    `infer('test', 'testSchema') -> export type test = z.infer<typeof testSchema>`,
    () => {
      expect(infer('test', 'testSchema')).toBe('export type test = z.infer<typeof testSchema>')
    },
  )

  it.concurrent(
    `infer('Test', 'TestSchema') -> export type Test = z.infer<typeof TestSchema>`,
    () => {
      expect(infer('Test', 'TestSchema')).toBe('export type Test = z.infer<typeof TestSchema>')
    },
  )
})
