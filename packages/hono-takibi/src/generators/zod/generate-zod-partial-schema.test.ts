import { describe, expect, it } from 'vitest'
import { generateZodPartialSchema } from './generate-zod-partial-schema'

const generateZodPartialSchemaTestCases = [
  {
    properties: [
      'id:z.number().int().openapi({example:10}).optional()',
      'petId:z.number().int().openapi({example:198772}).optional()',
      'quantity:z.number().int().openapi({example:7}).optional()',
      'shipDate:z.string().datetime().optional()',
      'status:z.enum(["placed","approved","delivered"]).openapi({example:"approved"}).optional()',
      'complete:z.boolean().optional()',
    ],
    expected:
      'z.object({id:z.number().int().openapi({example:10}),petId:z.number().int().openapi({example:198772}),quantity:z.number().int().openapi({example:7}),shipDate:z.string().datetime(),status:z.enum(["placed","approved","delivered"]).openapi({example:"approved"}),complete:z.boolean()}).partial()',
  },
]

describe('generateZodPartialSchema', () => {
  it.concurrent.each(generateZodPartialSchemaTestCases)(
    'generateZodPartialSchema($properties) -> $expected',
    async ({ properties, expected }) => {
      const result = generateZodPartialSchema(properties)
      expect(result).toBe(expected)
    },
  )
})
