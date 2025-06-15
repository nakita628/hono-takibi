import { describe, it, expect } from 'vitest'
import { escapeStringLiteral } from '.'

// Test run
// pnpm vitest run ./src/core/text/escape-string-literal.test.ts

describe('escapeStringLiteralingLiteral', () => {
  it.concurrent(`escapeStringLiteral('') -> ''`, () => {
    const result = escapeStringLiteral('')
    const expected = ''
    expect(result).toBe(expected)
  })
  it.concurrent(`escapeStringLiteral("'") -> "\\'"`, () => {
    const result = escapeStringLiteral("'")
    const expected = "\\'"
    expect(result).toBe(expected)
  })
  it.concurrent(`escapeStringLiteral("'test") -> "\\'test"`, () => {
    const result = escapeStringLiteral("'test")
    const expected = "\\'test"
    expect(result).toBe(expected)
  })
  it.concurrent(`escapeStringLiteral("It's a test") -> "It\\'s a test"`, () => {
    const result = escapeStringLiteral("It's a test")
    const expected = "It\\'s a test"
    expect(result).toBe(expected)
  })
  it.concurrent(
    `escapeStringLiteral('test "string" with quotes') -> 'test "string" with quotes'`,
    () => {
      const result = escapeStringLiteral('test "string" with quotes')
      const expected = 'test "string" with quotes'
      expect(result).toBe(expected)
    },
  )
  it.concurrent(
    `escapeStringLiteral("Retrieve Santa's wishlist for Christmas.") -> "Retrieve Santa\\'s wishlist for Christmas."`,
    () => {
      const result = escapeStringLiteral("Retrieve Santa's wishlist for Christmas.")
      const expected = "Retrieve Santa\\'s wishlist for Christmas."
      expect(result).toBe(expected)
    },
  )
  it.concurrent(`escapeStringLiteral("Santa's wishlist.") -> "Santa\\'s wishlist."`, () => {
    const result = escapeStringLiteral("Santa's wishlist.")
    const expected = "Santa\\'s wishlist."
    expect(result).toBe(expected)
  })
})
