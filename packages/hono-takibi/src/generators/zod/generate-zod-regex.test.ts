import { describe, expect, it } from 'vitest'
import { generateZodRegex } from './generate-zod-regex'

const generateZodRegexTestCases = [
  {
    pattern: '^[a-z]+$',
    expected: '.regex(/^[a-z]+$/)',
  },
  {
    pattern: '^\\d{4}-\\d{2}-\\d{2}$',
    expected: '.regex(/^\\d{4}-\\d{2}-\\d{2}$/)',
  },
  {
    pattern: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$',
    expected: '.regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$/)',
  },
  {
    pattern: '^#[0-9a-fA-F]{6}$',
    expected: '.regex(/^#[0-9a-fA-F]{6}$/)',
  },
  {
    pattern: '^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$',
    expected: '.regex(/^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$/)',
  },
]

describe('generateZodRegex', () => {
  it.concurrent.each(generateZodRegexTestCases)(
    'generateZodRegex($pattern) -> $expected',
    ({ pattern, expected }) => {
      const result = generateZodRegex(pattern)
      expect(result).toBe(expected)
    },
  )
})
