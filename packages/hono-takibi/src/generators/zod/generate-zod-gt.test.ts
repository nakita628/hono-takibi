import { describe, expect, it } from 'vitest'
import { generateZodGt } from './generate-zod-gt'

const generateZodGtTestCases = [
  {
    minimum: 0,
    expected: '.gt(0)',
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
