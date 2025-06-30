import { describe, it, expect } from 'vitest'
import { min } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/z/min.test.ts

describe('min Test', () => {
  it.concurrent('min(1) -> .min(1)', () => {
    const result = min(1)
    const expected = '.min(1)'
    expect(result).toBe(expected)
  })

  it.concurrent('min(10) -> .min(10)', () => {
    const result = min(10)
    const expected = '.min(10)'
    expect(result).toBe(expected)
  })
})
