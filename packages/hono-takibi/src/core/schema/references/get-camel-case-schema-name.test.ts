import { describe, expect, it } from 'vitest'
import { getCamelCaseSchemaName } from './get-camel-case-schema-name'

const getCamelCaseSchemaNameTestCases = [
  {
    schemaName: 'Order',
    expected: 'orderSchema',
  },
  {
    schemaName: 'Address',
    expected: 'addressSchema',
  },
  {
    schemaName: 'Customer',
    expected: 'customerSchema',
  },
  {
    schemaName: 'Category',
    expected: 'categorySchema',
  },
  {
    schemaName: 'User',
    expected: 'userSchema',
  },
  {
    schemaName: 'Tag',
    expected: 'tagSchema',
  },
  {
    schemaName: 'Pet',
    expected: 'petSchema',
  },
  {
    schemaName: 'ApiResponse',
    expected: 'apiResponseSchema',
  },
]

describe('getCamelCaseSchemaName', () => {
  it.concurrent.each(getCamelCaseSchemaNameTestCases)(
    'getCamelCaseSchemaName($schemaName) -> $expected',
    ({ schemaName, expected }) => {
      const result = getCamelCaseSchemaName(schemaName)
      expect(result).toBe(expected)
    },
  )
})
