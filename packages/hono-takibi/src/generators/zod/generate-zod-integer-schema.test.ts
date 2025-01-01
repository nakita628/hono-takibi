import { describe, expect, it } from 'vitest'
import { generateZodIntegerSchema } from './generate-zod-integer-schema'
import type { ExampleValue } from '../../types'

const generateZodIntegerSchemaTestCases: {
  args: {
    minLength?: number
    maxLength?: number
    minimum?: number
    maximum?: number
    example?: ExampleValue
  }
  expected: string
}[] = [
  {
    args: {},
    expected: 'z.number().int()',
  },
  {
    args: { minimum: 1 },
    expected: 'z.number().int().min(1)',
  },
  {
    args: { maximum: 10 },
    expected: 'z.number().int().max(10)',
  },
  {
    args: { example: 1 },
    expected: 'z.number().int().example(1)',
  },
]

describe('generateZodIntegerSchema', () => {
  it.concurrent.each(generateZodIntegerSchemaTestCases)(
    'generateZodIntegerSchema($args) -> $expected',
    ({ args, expected }) => {
      const result = generateZodIntegerSchema(args)
      expect(result).toBe(expected)
    },
  )
})
