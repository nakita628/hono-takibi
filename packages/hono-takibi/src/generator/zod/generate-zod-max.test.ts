import { describe, expect, it } from 'vitest'
import { generateZodMax } from './generate-zod-max'

const generateZodMaxTestCases = [
  { max: 1, expected: '.max(1)' },
  { max: 10, expected: '.max(10)' },
]

describe('generateZodMax', () => {
  it.concurrent.each(generateZodMaxTestCases)(
    'generateZodMax($max) -> $expected',
    ({ max, expected }) => {
      const result = generateZodMax(max)
      expect(result).toBe(expected)
    },
  )
})
