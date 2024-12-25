import { describe, expect, it } from 'vitest'
import { escapeString } from './escape'

const escapeStringTestCases = [
  {
    str: "It's a test",
    expected: "It\\'s a test",
  },
  {
    str: "It's a test's test",
    expected: "It\\'s a test\\'s test",
  },
  {
    str: "'test string",
    expected: "\\'test string",
  },
  {
    str: "test string'",
    expected: "test string\\'",
  },
  {
    str: 'test string',
    expected: 'test string',
  },
  {
    str: "'",
    expected: "\\'",
  },
  {
    str: undefined,
    expected: '',
  },
  {
    str: '',
    expected: '',
  },
  {
    str: 'test "string" with quotes',
    expected: 'test "string" with quotes',
  },
  {
    str: "Retrieve Santa's wishlist for Christmas.",
    expected: "Retrieve Santa\\'s wishlist for Christmas.",
  },
  {
    str: "Santa's wishlist.",
    expected: "Santa\\'s wishlist.",
  },
]

describe('escapeString', () => {
  it.concurrent.each(escapeStringTestCases)(
    'escapeString($str) -> $expected',
    ({ str, expected }) => {
      const result = escapeString(str)
      expect(result).toBe(expected)
    },
  )
})
