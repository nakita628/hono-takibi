import { describe, expect, it } from 'vitest'
import { generateSchemasExport } from './generate-schemas-export'

const generateSchemasExportTestCases: {
  orderedSchemas: string[]
  namingCase?: 'camelCase' | 'PascalCase'
  expected: string
}[] = [
  {
    orderedSchemas: [
      'Order',
      'Address',
      'Customer',
      'Category',
      'User',
      'Tag',
      'Pet',
      'ApiResponse',
    ],
    expected: `export const schemas = {
orderSchema,
addressSchema,
customerSchema,
categorySchema,
userSchema,
tagSchema,
petSchema,
apiResponseSchema
}`,
  },
  {
    orderedSchemas: [
      'Order',
      'Address',
      'Customer',
      'Category',
      'User',
      'Tag',
      'Pet',
      'ApiResponse',
    ],
    namingCase: 'PascalCase',
    expected: `export const schemas = {
OrderSchema,
AddressSchema,
CustomerSchema,
CategorySchema,
UserSchema,
TagSchema,
PetSchema,
ApiResponseSchema
}`,
  },
]

describe('generateSchemasExport', () => {
  it.concurrent.each(generateSchemasExportTestCases)(
    'generateSchemasExport($orderedSchemas, $namingCase) -> $expected',
    ({ orderedSchemas, namingCase, expected }) => {
      const result = generateSchemasExport(orderedSchemas, namingCase)
      expect(result).toBe(expected)
    },
  )
})
