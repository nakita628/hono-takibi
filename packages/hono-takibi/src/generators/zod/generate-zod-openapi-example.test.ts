import { describe, expect, it } from 'vitest'
import { generateZodOpenAPIExample } from './generate-zod-openapi-example'

const generateZodOpenAPIExampleTestCases = [
  {
    zodSchema: 'z.string().optional()',
    example: 'test@example.com',
    expected: 'z.string().optional().openapi({example:"test@example.com"})',
  },
  {
    zodSchema: 'z.string()',
    example: 'test@example.com',
    expected: 'z.string().openapi({example:"test@example.com"})',
  },
]

describe('generateZodOpenAPIExample', () => {
  it.concurrent.each(generateZodOpenAPIExampleTestCases)(
    'generateZodOpenAPIExample($zodSchema, $example) -> $expected',
    ({ zodSchema, example, expected }) => {
      const result = generateZodOpenAPIExample(zodSchema, example)
      expect(result).toBe(expected)
    },
  )
})
