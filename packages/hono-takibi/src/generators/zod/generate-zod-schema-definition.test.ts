import { describe, expect, it } from 'vitest'
import { generateZodSchemaDefinition } from './generate-zod-schema-definition'

const generateSchemaDefinitionTestCases = [
  {
    name: 'orderSchema',
    schema:
      'z.object({id:z.number().int(),petId:z.number().int(),quantity:z.number().int(),shipDate:z.string().datetime(),status:z.enum(["placed","approved","delivered"]),complete:z.boolean()}).optional()',
    schemaName: 'Order',
    expected:
      'const orderSchema = z.object({id:z.number().int(),petId:z.number().int(),quantity:z.number().int(),shipDate:z.string().datetime(),status:z.enum(["placed","approved","delivered"]),complete:z.boolean()}).optional().openapi(Order)',
  },
  {
    name: 'addressSchema',
    schema:
      'z.object({street:z.string(),city:z.string(),state:z.string(),zip:z.string()}).optional()',
    schemaName: 'Address',
    expected:
      'const addressSchema = z.object({street:z.string(),city:z.string(),state:z.string(),zip:z.string()}).optional().openapi(Address)',
  },
  {
    name: 'userSchema',
    schema: `z.object({id:z.string().openapi({example:'1212121'}),name:z.string().openapi({example:'John Doe'}),age:z.number().openapi({example:42}),})`,
    schemaName: 'User',
    expected: `const userSchema = z.object({id:z.string().openapi({example:'1212121'}),name:z.string().openapi({example:'John Doe'}),age:z.number().openapi({example:42}),}).openapi(User)`,
  },
]

describe('generateSchemaDefinition', () => {
  it.concurrent.each(generateSchemaDefinitionTestCases)(
    'generateSchemaDefinition($name, $schema, $schemaName) -> $expected',
    async ({ name, schema, schemaName, expected }) => {
      const result = generateZodSchemaDefinition(name, schema, schemaName)
      expect(result).toEqual(expected)
    },
  )
})
