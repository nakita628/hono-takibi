import type { Config } from '../../../../../config'
import { describe, expect, it } from 'vitest'
import { generateSchemasExport } from './generate-schemas-export'
import { DEFAULT_CONFIG, PASCAL_CASE_CONFIG } from '../../../../../data/test-data'
const generateSchemasExportTestCases: {
  orderedSchemas: string[]
  config: Config
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
    config: DEFAULT_CONFIG,
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
    config: PASCAL_CASE_CONFIG,
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
    'generateSchemasExport($orderedSchemas, $config) -> $expected',
    ({ orderedSchemas, config, expected }) => {
      const result = generateSchemasExport(orderedSchemas, config)
      expect(result).toBe(expected)
    },
  )
})
