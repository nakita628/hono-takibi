import { describe, it, expect } from 'vitest'
import { stringbool } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/z/stringbool.test.ts

describe('stringBool', () => {
  it.concurrent(`stringbool('z.boolean().optional()') -> 'z.stringbool().optional()'`, () => {
    const result = stringbool('z.boolean().optional()')
    const expected = 'z.stringbool().optional()'
    expect(result).toBe(expected)
  })
})
