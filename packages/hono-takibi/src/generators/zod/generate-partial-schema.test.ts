import { describe, expect, it } from 'vitest'
import { generatePartialSchema } from './generate-partial-schema'

const generatePartialSchemaTestCases = [
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

describe('generatePartialSchema', () => {
  it.concurrent.each(generatePartialSchemaTestCases)(
    'generatePartialSchema($properties) -> $expected',
    async ({ properties, expected }) => {
      const result = generatePartialSchema(properties)
      expect(result).toBe(expected)
    },
  )
})
