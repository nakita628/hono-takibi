import { describe, it, expect } from 'vitest'
import { max } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/z/max.test.ts

describe('max Test', () => {
  it.concurrent('max(1) -> .max(1)', () => {
    const result = max(1)
    const expected = '.max(1)'
    expect(result).toBe(expected)
  })

  it.concurrent('max(10) -> .max(10)', () => {
    const result = max(10)
    const expected = '.max(10)'
    expect(result).toBe(expected)
  })
})
