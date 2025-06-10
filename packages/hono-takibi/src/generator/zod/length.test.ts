import { describe, it, expect } from 'vitest'
import { length } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/length.test.ts

describe('length Test', () => {
  it.concurrent('length(1) -> .length(1)', () => {
    const result = length(1)
    const expected = '.length(1)'
    expect(result).toBe(expected)
  })

  it.concurrent('length(10) -> .length(10)', () => {
    const result = length(10)
    const expected = '.length(10)'
    expect(result).toBe(expected)
  })

  it.concurrent('length(100) -> .length(100)', () => {
    const result = length(100)
    const expected = '.length(100)'
    expect(result).toBe(expected)
  })
})
