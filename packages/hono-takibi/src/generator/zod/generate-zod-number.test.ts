import { describe, expect, it } from 'vitest'
import { generateZodNumber } from './generate-zod-number'
import type { DefaultValue, ExampleValue } from '../../type'
const generateZodNumberSchemaTestCases: {
  args: {
    pattern?: string
    minLength?: number
    maxLength?: number
    minimum?: number
    maximum?: number
    default?: DefaultValue
    example?: ExampleValue
  }
  expected: string
}[] = [
  {
    args: {},
    expected: 'z.number()',
  },
  {
    args: { minimum: 0 },
    expected: 'z.number().nonpositive()',
  },
  {
    args: { minLength: 1 },
    expected: 'z.number().min(1)',
  },
  {
    args: { maxLength: 10 },
    expected: 'z.number().max(10)',
  },
  {
    args: { default: 1 },
    expected: 'z.number().default(1)',
  },
  {
    args: { example: 1 },
    expected: 'z.number().openapi({example:1})',
  },
]

describe('generateZodNumberSchema', () => {
  it.concurrent.each(generateZodNumberSchemaTestCases)(
    'generateZodNumberSchema($args) -> $expected',
    ({ args, expected }) => {
      const result = generateZodNumber(args)
      expect(result).toBe(expected)
    },
  )
})
