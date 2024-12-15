import { describe, expect, it } from 'vitest'
import { generateZodObjectSchema } from './generate-zod-object-schema'

const generateZodObjectSchemaTestCases = [
  {
    input: {
      name: 'string',
    },
    expected: `z.object({name:string})`,
  },
]

describe('generateZodObjectSchema', () => {
  it.concurrent.each(generateZodObjectSchemaTestCases)(
    'generateZodObjectSchema($input) -> $expected',
    async ({ input, expected }) => {
      const result = generateZodObjectSchema(input)
      expect(result).toBe(expected)
    },
  )
})
