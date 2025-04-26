import { describe, expect, it } from 'vitest'
import { isFormatString } from './is-format-string'
import type { FormatString } from '../../types'

// Test run
// pnpm vitest run ./src/core/validator/is-format-string.test.ts

const isFormatStringTestCases: { format: FormatString; expected: boolean }[] = [
  { format: 'email', expected: true },
  { format: 'uri', expected: true },
  { format: 'emoji', expected: true },
  { format: 'uuid', expected: true },
  { format: 'cuid', expected: true },
  { format: 'cuid2', expected: true },
  { format: 'ulid', expected: true },
  { format: 'date-time', expected: true },
  { format: 'ip', expected: true },
  { format: 'cidr', expected: true },
  { format: 'trim', expected: true },
  { format: 'toLowerCase', expected: true },
  { format: 'toUpperCase', expected: true },
  { format: 'date', expected: true },
  { format: 'time', expected: true },
  { format: 'duration', expected: true },
  { format: 'base64', expected: true },
  // biome-ignore lint:
  { format: 'string' as any, expected: false },
]

describe('isFormatString Test', () => {
  it.concurrent.each(isFormatStringTestCases)(
    'isFormatString($format) -> $expected',
    async ({ format, expected }) => {
      const result = isFormatString(format)
      expect(result).toBe(expected)
    },
  )
})
