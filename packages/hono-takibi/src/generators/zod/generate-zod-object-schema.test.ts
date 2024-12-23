import { describe, expect, it } from 'vitest'
import { generateZodObjectSchema } from './generate-zod-object-schema'

const generateZodObjectSchemaTestCases = [
  {
    object: {
      name: 'string',
    },
    expected: 'z.object({name:string})',
  },
]

describe('generateZodObjectSchema', () => {
  it.concurrent.each(generateZodObjectSchemaTestCases)(
    'generateZodObjectSchema($object) -> $expected',
    async ({ object, expected }) => {
      const result = generateZodObjectSchema(object)
      expect(result).toBe(expected)
    },
  )
})
