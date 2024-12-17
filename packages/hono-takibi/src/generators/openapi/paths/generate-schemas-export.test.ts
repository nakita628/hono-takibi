import { describe, expect, it } from 'vitest'
import { generateSchemasExport } from './generate-schemas-export'

const generateSchemasExportTestCases = [
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
]

describe('generateSchemasExport', () => {
  it.concurrent.each(generateSchemasExportTestCases)(
    `generateSchemasExport($orderedSchemas) -> $expected`,
    ({ orderedSchemas, expected }) => {
      const result = generateSchemasExport(orderedSchemas)
      expect(result).toBe(expected)
    },
  )
})
