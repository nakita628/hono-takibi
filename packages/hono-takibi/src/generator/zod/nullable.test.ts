import { describe, it, expect } from 'vitest'
import { nullable } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/nullable.test.ts

describe('nullable Test', () => {
  it.concurrent(`nullable() -> '.nullable()'`, () => {
    const _nullable = true
    const result = _nullable ? nullable() : ''
    const expected = '.nullable()'
    expect(result).toBe(expected)
  })

  it.concurrent(`nullable() -> ''`, () => {
    const _nullable = false
    const result = _nullable ? nullable() : ''
    const expected = ''
    expect(result).toBe(expected)
  })
})
