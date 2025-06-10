import { describe, it, expect } from 'vitest'
import { _default } from './default'

// Test run
// pnpm vitest run ./src/generator/zod/default.test.ts

describe('_default Test', () => {
  it.concurrent('_default(1) -> .default(1)', () => {
    const result = _default(1)
    const expected = '.default(1)'
    expect(result).toBe(expected)
  })

  it.concurrent('_default(10) -> .default(10)', () => {
    const result = _default(10)
    const expected = '.default(10)'
    expect(result).toBe(expected)
  })
})
