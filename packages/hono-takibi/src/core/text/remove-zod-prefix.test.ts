import { describe, expect, it } from 'vitest'
import { removeZodPrefix } from './remove-zod-prefix'

const removeZodPrefixTestCases = [
  {
    input: 'z.string().min(1)',
    expected: 'string().min(1)',
  },
  {
    input: 'z.number().min(1)',
    expected: 'number().min(1)',
  },
]

describe('removeZodPrefix', () => {
  it.concurrent.each(removeZodPrefixTestCases)(
    'removeZodPrefix(%s) -> %s',
    ({ input, expected }) => {
      const result = removeZodPrefix(input)
      expect(result).toBe(expected)
    },
  )
})
