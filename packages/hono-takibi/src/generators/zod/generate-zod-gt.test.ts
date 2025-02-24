import { describe, expect, it } from 'vitest'
import { generateZodGt } from './generate-zod-gt'

const generateZodGtTestCases = [
  {
    minimum: 0,
    expected: '.gt(0)',
  },
  {
    minimum: 10,
    expected: '.gt(10)',
  },
  {
    minimum: 100,
    expected: '.gt(100)',
  },
]

describe('generateZodGt', () => {
  it.concurrent.each(generateZodGtTestCases)(
    'generateZodGt($minimum) -> $expected',
    ({ minimum, expected }) => {
      const result = generateZodGt(minimum)
      expect(result).toBe(expected)
    },
  )
})
