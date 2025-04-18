import { describe, expect, it } from 'vitest'
import { escapeStr } from './escape-str'

const escapeTestCases = [
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

describe('escape', () => {
  it.concurrent.each(escapeTestCases)('escapeStr($str) -> $expected', ({ str, expected }) => {
    const result = escapeStr(str)
    expect(result).toBe(expected)
  })
})
