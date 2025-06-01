import { describe, it, expect } from 'vitest'
import { capitalize } from './capitalize'

// Test run
// pnpm vitest run ./src/core/text/capitalize.test.ts

describe('capitalize Test', () => {
  it.concurrent(`capitalize('test') -> 'Test'`, () => {
    const result = capitalize('test')
    const expected = 'Test'
    expect(result).toBe(expected)
  })
  it.concurrent(`capitalize('Test') -> 'Test'`, () => {
    const result = capitalize('Test')
    const expected = 'Test'
    expect(result).toBe(expected)
  })
})
