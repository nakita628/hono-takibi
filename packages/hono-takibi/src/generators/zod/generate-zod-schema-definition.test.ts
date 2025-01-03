import { describe, expect, it } from 'vitest'
import { generateZodSchemaDefinition } from './generate-zod-schema-definition'

const generateSchemaDefinitionTestCases = [
  {
    name: 'orderSchema',
    schema: `z.object({id:z.number().int(),petId:z.number().int(),quantity:z.number().int(),shipDate:z.string().datetime(),status:z.enum(["placed","approved","delivered"]),complete:z.boolean()}).optional()`,
    expected: `const orderSchema = z.object({id:z.number().int(),petId:z.number().int(),quantity:z.number().int(),shipDate:z.string().datetime(),status:z.enum(["placed","approved","delivered"]),complete:z.boolean()}).optional()`,
  },
  {
    name: 'addressSchema',
    schema:
      'z.object({street:z.string(),city:z.string(),state:z.string(),zip:z.string()}).optional()',
    expected:
      'const addressSchema = z.object({street:z.string(),city:z.string(),state:z.string(),zip:z.string()}).optional()',
  },
]

describe('generateSchemaDefinition', () => {
  it.concurrent.each(generateSchemaDefinitionTestCases)(
    'generateSchemaDefinition($name, $schema) -> $expected',
    async ({ name, schema, expected }) => {
      const result = generateZodSchemaDefinition(name, schema)
      expect(result).toEqual(expected)
    },
  )
})
