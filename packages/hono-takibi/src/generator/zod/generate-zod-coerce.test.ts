import { describe, expect, it } from 'vitest'
import { generateZodCoerce } from './generate-zod-coerce'
const generateZodCoerceTestCases = [
  {
    z: 'z.string()',
    zodSchema: 'z.number()',
    expected: 'z.string().pipe(z.coerce.number())',
  },
  {
    z: 'z.string()',
    zodSchema: 'z.number().min(1)',
    expected: 'z.string().pipe(z.coerce.number().min(1))',
  },
  {
    z: 'z.string()',
    zodSchema: 'z.number().max(10)',
    expected: 'z.string().pipe(z.coerce.number().max(10))',
  },
]

describe('generateZodCoerce', () => {
  it.concurrent.each(generateZodCoerceTestCases)(
    'generateZodCoerce($z, $zodSchema) -> $expected',
    async ({ z, zodSchema, expected }) => {
      const result = generateZodCoerce(z, zodSchema)
      expect(result).toBe(expected)
    },
  )
})
