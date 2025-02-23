import { describe, expect, it } from 'vitest'
import { stripMinMaxExistHelper } from './strip-min-max-exist-helper'

const stripMinMaxExistHelperTestCases = [
  {
    str: 'z.string().min(1).max(1)',
    min: 1,
    max: 1,
    expected: 'z.string()',
  },
]

describe('stripMinMaxExistHelper', () => {
  it.concurrent.each(stripMinMaxExistHelperTestCases)(
    'stripMinMaxExistHelper(%s, %s, %s) -> %s',
    ({ str, min, max, expected }) => {
      const result = stripMinMaxExistHelper(str, min, max)
      expect(result).toBe(expected)
    },
  )
})
