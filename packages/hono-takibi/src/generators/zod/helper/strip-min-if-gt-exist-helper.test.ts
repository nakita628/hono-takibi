import { describe, expect, it } from 'vitest'
import { stripMinIfgTExistHelper } from './strip-min-if-gt-exist-helper'

const stripMinIfgTExistHelperTestCases = [
  {
    input: 'z.number().min(1).gt(1)',
    minimum: 1,
    expected: 'z.number().gt(1)',
  },
]

describe('stripMinIfgTExistHelper', () => {
  it.concurrent.each(stripMinIfgTExistHelperTestCases)(
    'stripMinIfgTExistHelper(%s, %s) -> %s',
    ({ input, minimum, expected }) => {
      expect(stripMinIfgTExistHelper(input, minimum)).toBe(expected)
    },
  )
})
