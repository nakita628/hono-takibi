import { describe, expect, it } from 'vitest'
import { isFormatNumber } from './is-format-number'
import type { Format } from '../../type'

const isFormatNumberTestCases: { format: Format; expected: boolean }[] = [
  { format: 'int32', expected: true },
  { format: 'int64', expected: true },
  { format: 'float', expected: true },
  { format: 'double', expected: true },
]

describe('isFormatNumber', () => {
  it.concurrent.each(isFormatNumberTestCases)(
    'isFormatNumber($format) -> $expected',
    async ({ format, expected }) => {
      const result = isFormatNumber(format)
      expect(result).toBe(expected)
    },
  )
})
