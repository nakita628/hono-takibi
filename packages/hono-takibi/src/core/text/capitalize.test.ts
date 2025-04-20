import { describe, test, expect } from 'vitest'
import { capitalize } from './capitalize'

// Test run
// pnpm vitest run ./src/core/text/capitalize.test.ts

describe('capitalize Test', () => {
  test.concurrent(`capitalize('test') -> 'Test'`, () => {
    const result = capitalize('test')
    const expected = 'Test'
    expect(result).toBe(expected)
  })
  test.concurrent(`capitalize('Test') -> 'Test'`, () => {
    const result = capitalize('Test')
    const expected = 'Test'
    expect(result).toBe(expected)
  })
})
