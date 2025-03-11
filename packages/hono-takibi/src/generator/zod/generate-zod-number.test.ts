import type { DefaultValue, ExampleValue } from '../../type'
import { describe, expect, it } from 'vitest'
import { generateZodNumber } from './generate-zod-number'

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

describe('generateZodNumberSchema valid cases', () => {
  it.concurrent.each(generateZodNumberSchemaTestCases)(
    'generateZodNumberSchema($args) -> $expected',
    ({ args, expected }) => {
      const result = generateZodNumber(args)
      expect(result).toBe(expected)
    },
  )
})

describe('generateZodNumberSchema edge cases', () => {
  it.concurrent('should throw an error when schema is null', () => {
    // biome-ignore lint/suspicious/noExplicitAny:
    const schema = null as any
    expect(() => generateZodNumber(schema)).toThrow('Cannot read properties of null')
  })

  it.concurrent('should throw an error when schema is undefined', () => {
    // biome-ignore lint/suspicious/noExplicitAny:
    const schema = undefined as any
    expect(() => generateZodNumber(schema)).toThrow('Cannot read properties of undefined')
  })
})
