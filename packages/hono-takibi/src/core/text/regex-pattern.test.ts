import { describe, expect, it } from 'vitest'
import { regexPattern } from './regex-pattern'

const regexPatternTestCases = [
  {
    pattern: '^[a-z]+$',
    expected: '/^[a-z]+$/',
  },
  {
    pattern: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$',
    expected: '/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$/',
  },
  {
    pattern: '^#[0-9a-fA-F]{6}$',
    expected: '/^#[0-9a-fA-F]{6}$/',
  },
  {
    pattern: '^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$',
    expected: '/^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$/',
  },
  {
    pattern: '^\\d{4}-\\d{2}-\\d{2}$',
    expected: '/^\\d{4}-\\d{2}-\\d{2}$/',
  },
  {
    pattern: '^\\d{2}/\\d{2}$',
    expected: '/^\\d{2}\\/\\d{2}$/',
  },
]

describe('regexPattern', () => {
  it.concurrent.each(regexPatternTestCases)(
    'regexPattern($pattern) -> $expected',
    ({ pattern, expected }) => {
      const result = regexPattern(pattern)
      expect(result).toBe(expected)
    },
  )
})
