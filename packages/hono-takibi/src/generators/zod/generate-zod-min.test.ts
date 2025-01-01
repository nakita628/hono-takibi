import { describe, expect, it } from 'vitest'
import { generateZodMin } from './generate-zod-min'
const generateZodMinTestCases = [
  { min: 1, expected: '.min(1)' },
  { min: 10, expected: '.min(10)' },
]

describe('generateZodMin', () => {
  it.concurrent.each(generateZodMinTestCases)(
    'generateZodMin($min) -> $expected',
    ({ min, expected }) => {
      const result = generateZodMin(min)
      expect(result).toBe(expected)
    },
  )
})
