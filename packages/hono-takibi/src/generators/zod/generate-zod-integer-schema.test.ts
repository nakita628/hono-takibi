import { describe, expect, it } from 'vitest'
import { generateZodIntegerSchema } from './generate-zod-integer-schema'

const generateZodIntegerSchemaTestCases: {
  args: {
    minLength?: number
    maxLength?: number
    minimum?: number
    maximum?: number
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
]

describe('generateZodIntegerSchema', () => {
  it.concurrent.each(generateZodIntegerSchemaTestCases)(
    'should generate zod integer schema',
    ({ args, expected }) => {
      const result = generateZodIntegerSchema(args)
      expect(result).toBe(expected)
    },
  )
})
