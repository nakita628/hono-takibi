import { describe, it, expect } from 'vitest'
import { removeZodPrefix } from '.'

// Test run
// pnpm vitest run ./src/core/text/remove-zod-prefix.test.ts

describe('removeZodPrefix Test', () => {
  it.concurrent(`removeZodPrefix('z.string().min(1)') -> 'string().min(1)'`, () => {
    const result = removeZodPrefix('z.string().min(1)')
    const expected = 'string().min(1)'
    expect(result).toBe(expected)
  })
  it.concurrent(`removeZodPrefix('z.number().min(1)') -> 'number().min(1)'`, () => {
    const result = removeZodPrefix('z.number().min(1)')
    const expected = 'number().min(1)'
    expect(result).toBe(expected)
  })
})
