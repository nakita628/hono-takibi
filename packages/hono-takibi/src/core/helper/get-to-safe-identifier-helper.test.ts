import { describe, expect, it } from 'vitest'
import { getToSafeIdentifierHelper } from './get-to-safe-identifier-helper'

const getToSafeIdentifierHelperTestCases = [
  {
    str: ' - ',
    expected: '_',
  },
  {
    str: 'Test - Schema',
    expected: 'Test_Schema',
  },
  {
    str: 'TestSchema',
    expected: 'TestSchema',
  },
]

describe('getToSafeIdentifierHelper', () => {
  it.concurrent.each(getToSafeIdentifierHelperTestCases)(
    'getToSafeIdentifierHelper($str) -> $expected',
    async ({ str, expected }) => {
      const result = getToSafeIdentifierHelper(str)
      expect(result).toBe(expected)
    },
  )
})
