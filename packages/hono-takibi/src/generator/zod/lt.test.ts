import { describe, it, expect } from 'vitest'
import { lt } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/lt.test.ts

describe('lt Test', () => {
  it.concurrent('lt(1) -> .lt(1)', () => {
    const result = lt(1)
    const expected = '.lt(1)'
    expect(result).toBe(expected)
  })

  it.concurrent('lt(10) -> .lt(10)', () => {
    const result = lt(10)
    const expected = '.lt(10)'
    expect(result).toBe(expected)
  })
})
