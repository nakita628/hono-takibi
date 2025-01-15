import { describe, expect, it } from 'vitest'
import { isRefObject } from './is-ref-object'

const isRefObjectTestCases = [
  {
    value: { $ref: '#/components/schemas/Pet' },
    expected: true,
  },
  {
    value: { type: 'object', properties: {} },
    expected: true,
  },
  {
    value: null,
    expected: false,
  },
  {
    value: undefined,
    expected: false,
  },
  {
    value: 'string',
    expected: false,
  },
  {
    value: 123,
    expected: false,
  },
  {
    value: true,
    expected: false,
  },
  {
    value: [],
    expected: true,
  },
  {
    value: new Date(),
    expected: true,
  },
  {
    value: { nested: { $ref: '#/components/schemas/Pet' } },
    expected: true,
  },
]

describe('isRefObject', () => {
  it.concurrent.each(isRefObjectTestCases)(
    'isRefObject($value) -> $expected',
    ({ value, expected }) => {
      const result = isRefObject(value)
      expect(result).toBe(expected)
    },
  )
})
