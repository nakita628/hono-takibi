import { describe, expect, it } from 'vitest'
import { generateZodLength } from './generate-zod-length'

const generateZodLengthTestCases = [
  {
    length: 10,
    expected: '.length(10)',
  },
]

describe('generateZodLength', () => {
  it.concurrent.each(generateZodLengthTestCases)(
    'generateZodLength($length) -> $expected',
    ({ length, expected }) => {
      const result = generateZodLength(length)
      expect(result).toBe(expected)
    },
  )
})
