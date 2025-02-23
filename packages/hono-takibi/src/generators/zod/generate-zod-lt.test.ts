import { describe, expect, it } from 'vitest'
import { generateZodLt } from './generate-zod-lt'

const generateZodLtTestCases = [
  {
    maximum: 5,
    expected: '.lt(5)',
  },
]

describe('generateZodLt', () => {
  it.concurrent.each(generateZodLtTestCases)(
    'generateZodLt($maximum) -> $expected',
    ({ maximum, expected }) => {
      const result = generateZodLt(maximum)
      expect(result).toBe(expected)
    },
  )
})
