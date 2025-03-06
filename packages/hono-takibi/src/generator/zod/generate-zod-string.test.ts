import { describe, expect, it } from 'vitest'
import { generateZodString } from './generate-zod-string'
import type { DefaultValue, ExampleValue, FormatString } from '../../type'

const generateZodStringSchemaTestCases: {
  args: {
    pattern?: string
    minLength?: number
    maxLength?: number
    format?: FormatString
    default?: DefaultValue
    example?: ExampleValue
  }
  expected: string
}[] = [
  {
    args: {},
    expected: 'z.string()',
  },
  {
    args: { pattern: '^[a-z]+$' },
    expected: 'z.string().regex(/^[a-z]+$/)',
  },
  {
    args: { minLength: 3 },
    expected: 'z.string().min(3)',
  },
  {
    args: { maxLength: 10 },
    expected: 'z.string().max(10)',
  },
  {
    args: { minLength: 3, maxLength: 10 },
    expected: 'z.string().min(3).max(10)',
  },
  {
    args: { format: 'email' },
    expected: 'z.string().email()',
  },
  {
    args: { format: 'uuid' },
    expected: 'z.string().uuid()',
  },
  {
    args: { pattern: '^[A-Z]+$', minLength: 2, maxLength: 5 },
    expected: 'z.string().regex(/^[A-Z]+$/).min(2).max(5)',
  },
  {
    args: { format: 'email', maxLength: 100 },
    expected: 'z.string().max(100).email()',
  },
  {
    args: {
      pattern: '^[a-zA-Z]+$',
      minLength: 3,
      maxLength: 20,
      format: 'email',
    },
    expected: 'z.string().regex(/^[a-zA-Z]+$/).min(3).max(20).email()',
  },
  {
    args: {
      default: 'hello',
    },
    expected: `z.string().default("hello")`,
  },
  {
    args: {
      format: 'email',
      default: 'test@example.com',
    },
    expected: `z.string().email().default("test@example.com")`,
  },
  {
    args: {
      example: 'test@example.com',
    },
    expected: `z.string().openapi({example:"test@example.com"})`,
  },
]

describe('generateZodStringSchema', () => {
  it.concurrent.each(generateZodStringSchemaTestCases)(
    'generateZodStringSchema($args) -> $expected',
    async ({ args, expected }) => {
      const result = generateZodString(args)
      expect(result).toBe(expected)
    },
  )
})
