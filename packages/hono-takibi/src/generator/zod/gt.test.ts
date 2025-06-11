import { describe, it, expect } from 'vitest'
import { gt } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/gt.test.ts

describe('gt Test', () => {
  it.concurrent('gt(0) -> .gt(0)', () => {
    const result = gt(0)
    const expected = '.gt(0)'
    expect(result).toBe(expected)
  })

  it.concurrent('gt(10) -> .gt(10)', () => {
    const result = gt(10)
    const expected = '.gt(10)'
    expect(result).toBe(expected)
  })

  it.concurrent('gt(100) -> .gt(100)', () => {
    const result = gt(100)
    const expected = '.gt(100)'
    expect(result).toBe(expected)
  })
})
