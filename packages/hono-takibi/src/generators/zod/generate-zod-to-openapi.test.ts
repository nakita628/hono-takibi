import { describe, expect, it } from 'vitest'
import { generateZodToOpenAPI } from './generate-zod-to-openapi'

const generateZodToOpenAPITestCases = [
  {
    example: 'John Doe',
    expected: `.openapi({example:"John Doe"})`,
  },
  {
    example: '123e4567-e89b-12d3-a456-426614174000',
    paramName: 'id',
    isPath: true,
    expected: `.openapi({param:{name:'id',in:'path'},example:"123e4567-e89b-12d3-a456-426614174000"})`,
  },
]

describe('generateZodToOpenAPI', () => {
  it.concurrent.each(generateZodToOpenAPITestCases)(
    'generateZodToOpenAPI($example, $paramName, $isPath) -> $expected',
    async ({ example, paramName, isPath, expected }) => {
      const result = generateZodToOpenAPI(example, paramName, isPath)
      expect(result).toBe(expected)
    },
  )
})
