import { describe, expect, it } from 'vitest'
import { stripMaxIfLtExistHelper } from './strip-max-if-lt-exist-helper'

const stripMaxIfLtExistHelperTestCases = [
  {
    str: 'z.number().max(1).lt(1)',
    maximum: 1,
    expected: 'z.number().lt(1)',
  },
]

describe('stripMaxIfLtExistHelper', () => {
  it.concurrent.each(stripMaxIfLtExistHelperTestCases)(
    'stripMaxIfLtExistHelper(%s, %s) -> %s',
    ({ str, maximum, expected }) => {
      expect(stripMaxIfLtExistHelper(str, maximum)).toBe(expected)
    },
  )
})
