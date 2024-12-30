import { describe, expect, it } from 'vitest'
import { removeZodOptional } from './remove-zod-optional'

const replaceTestCases = [
  {
    zodSchema: 'z.string().optional()',
    expected: 'z.string()',
  },
  {
    zodSchema: 'z.number().optional()',
    expected: 'z.number()',
  },
]

describe('replace', () => {
  it.concurrent.each(replaceTestCases)(
    'replace($zodSchema, $search, $replace) -> $expected',
    ({ zodSchema, expected }) => {
      const result = removeZodOptional(zodSchema)
      expect(result).toBe(expected)
    },
  )
})
