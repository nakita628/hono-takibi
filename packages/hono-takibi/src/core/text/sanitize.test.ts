import { describe, expect, it } from 'vitest'
import { sanitize } from './sanitize'

const sanitizeTestCases = [
  {
    text: 'Hello\nWorld',
    expected: 'Hello World',
  },
]

describe('sanitize', () => {
  it.concurrent.each(sanitizeTestCases)('sanitize(%s) -> %s', ({ text, expected }) => {
    const result = sanitize(text)
    expect(result).toBe(expected)
  })
})
