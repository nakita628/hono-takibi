import { describe, expect, it } from 'vitest'
import { isFormatNumber } from './is-format-number'
import type { Format } from '../../types'

// Test run
// pnpm vitest run ./src/core/validator/is-format-number.test.ts

const isFormatNumberTestCases: { format: Format; expected: boolean }[] = [
  { format: 'int32', expected: true },
  { format: 'int64', expected: true },
  { format: 'float', expected: true },
  { format: 'double', expected: true },
  // biome-ignore lint:
  { format: 'string' as any, expected: false },
]

describe('isFormatNumber Test', () => {
  it.concurrent.each(isFormatNumberTestCases)(
    'isFormatNumber($format) -> $expected',
    async ({ format, expected }) => {
      const result = isFormatNumber(format)
      expect(result).toBe(expected)
    },
  )
})
