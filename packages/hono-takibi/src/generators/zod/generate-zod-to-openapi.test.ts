import { describe, expect, it } from 'vitest'
import { generateZodToOpenAPI } from './generate-zod-to-openapi'

const generateZodToOpenAPITestCases = [
  {
    example: 'John Doe',
    expected: `.openapi({example:"John Doe"})`,
  },
]

describe('generateZodToOpenAPI', () => {
  it.concurrent.each(generateZodToOpenAPITestCases)(
    'generateZodToOpenAPI($example) -> $expected',
    async ({ example, expected }) => {
      const result = generateZodToOpenAPI(example)
      expect(result).toBe(expected)
    },
  )
})
