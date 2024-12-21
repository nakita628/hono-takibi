import { describe, expect, it } from 'vitest'
import { generateRequestBody } from './generate-request-body'

const generateRequestBodyTestCases = [
  {
    required: true,
    schema: 'z.object({post: z.string().min(1).max(140)})',
    expected: `body:{required:true,content:{'application/json':{schema:z.object({post: z.string().min(1).max(140)}),},},},`,
  },
]

describe('generateRequestBody', () => {
  it.concurrent.each(generateRequestBodyTestCases)(
    'generateRequestBody($required, $schema) -> $expected',
    async ({ required, schema, expected }) => {
      const result = generateRequestBody(required, schema)
      expect(result).toBe(expected)
    },
  )
})
