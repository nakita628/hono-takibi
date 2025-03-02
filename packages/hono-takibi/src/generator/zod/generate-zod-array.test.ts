import { describe, expect, it } from 'vitest'
import { generateZodArray } from './generate-zod-array'

const generateZodArrayTestCases = [
  {
    zodSchema: 'Address',
    expected: 'z.array(Address)',
  },
  {
    zodSchema: 'Tag',
    expected: 'z.array(Tag)',
  },
  {
    zodSchema: 'Pet',
    expected: 'z.array(Pet)',
  },
  {
    zodSchema: 'z.string().min(3).max(10)',
    expected: 'z.array(z.string().min(3).max(10))',
  },
  {
    zodSchema: 'z.object({ name: z.string() })',
    expected: 'z.array(z.object({ name: z.string() }))',
  },
]

describe('generateZodArray', () => {
  it.concurrent.each(generateZodArrayTestCases)(
    'generateZodArray($zodSchema) -> $expected',
    async ({ zodSchema, expected }) => {
      const result = generateZodArray(zodSchema)
      expect(result).toBe(expected)
    },
  )
})
