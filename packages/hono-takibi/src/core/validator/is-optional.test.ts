import { describe, expect, it } from 'vitest'
import { isOptional } from './is-optional'

const isOptionalTestCases = [
  {
    zodSchema: 'z.string().optional()',
    expected: true,
  },
  {
    zodSchema: 'z.string()',
    expected: false,
  },
]

describe('isOptional', () => {
  it.concurrent.each(isOptionalTestCases)(
    'isOptional($zodSchema) -> $expected',
    ({ zodSchema, expected }) => {
      const result = isOptional(zodSchema)
      expect(result).toBe(expected)
    },
  )
})
