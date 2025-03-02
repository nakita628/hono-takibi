import { describe, expect, it } from 'vitest'
import { generateZodNullable } from './generate-zod-nullable'

const generateZodNullableTestCases = [
  { nullable: true, expected: '.nullable()' },
  { nullable: false, expected: '' },
]

describe('generateZodNullable', () => {
  it.concurrent.each(generateZodNullableTestCases)(
    'generateZodNullable($nullable) -> $expected',
    ({ nullable, expected }) => {
      const result = nullable ? generateZodNullable() : ''
      expect(result).toBe(expected)
    },
  )
})
