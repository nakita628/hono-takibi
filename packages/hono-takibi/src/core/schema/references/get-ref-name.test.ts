import { describe, expect, it } from 'vitest'
import { getRefName } from './get-ref-name'

const getRefNameTestCases = [
  {
    ref: '#/components/schemas/Address',
    expected: 'Address',
  },
  {
    ref: '#/components/schemas/Tag',
    expected: 'Tag',
  },
  {
    ref: '#/components/schemas/Pet',
    expected: 'Pet',
  },
]

describe('getRefName', () => {
  it.concurrent.each(getRefNameTestCases)(`getRefName($ref) -> $expected`, ({ ref, expected }) => {
    const result = getRefName(ref)
    expect(result).toBe(expected)
  })
})
