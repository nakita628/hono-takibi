import { describe, test, expect } from 'vitest'
import { escapeStr } from './escape-str'

// Test run
// pnpm vitest run ./src/core/text/escape-str.test.ts

describe('escape Test', () => {
  test.concurrent(`escapeStr('') -> ''`, () => {
    const result = escapeStr('')
    const expected = ''
    expect(result).toBe(expected)
  })
  test.concurrent(`escapeStr("'") -> "\\'"`, () => {
    const result = escapeStr("'")
    const expected = "\\'"
    expect(result).toBe(expected)
  })
  test.concurrent(`escapeStr("'test") -> "\\'test"`, () => {
    const result = escapeStr("'test")
    const expected = "\\'test"
    expect(result).toBe(expected)
  })
  test.concurrent(`escapeStr("It's a test") -> "It\\'s a test"`, () => {
    const result = escapeStr("It's a test")
    const expected = "It\\'s a test"
    expect(result).toBe(expected)
  })
  test.concurrent(`escapeStr('test "string" with quotes') -> 'test "string" with quotes'`, () => {
    const result = escapeStr('test "string" with quotes')
    const expected = 'test "string" with quotes'
    expect(result).toBe(expected)
  })
  test.concurrent(
    `escapeStr("Retrieve Santa's wishlist for Christmas.") -> "Retrieve Santa\\'s wishlist for Christmas."`,
    () => {
      const result = escapeStr("Retrieve Santa's wishlist for Christmas.")
      const expected = "Retrieve Santa\\'s wishlist for Christmas."
      expect(result).toBe(expected)
    },
  )
  test.concurrent(`escapeStr("Santa's wishlist.") -> "Santa\\'s wishlist."`, () => {
    const result = escapeStr("Santa's wishlist.")
    const expected = "Santa\\'s wishlist."
    expect(result).toBe(expected)
  })
})
