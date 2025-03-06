import { describe, expect, it } from 'vitest'
import { getPascalCaseSchemaNameHelper } from './get-pascal-case-schema-name-helper'

const getPascalCaseSchemaNameTestCases = [
  {
    schemaName: 'Order',
    expected: 'OrderSchema',
  },
  {
    schemaName: 'Address',
    expected: 'AddressSchema',
  },
  {
    schemaName: 'Customer',
    expected: 'CustomerSchema',
  },
  {
    schemaName: 'Category',
    expected: 'CategorySchema',
  },
  {
    schemaName: 'User',
    expected: 'UserSchema',
  },
  {
    schemaName: 'Tag',
    expected: 'TagSchema',
  },
  {
    schemaName: 'Pet',
    expected: 'PetSchema',
  },
  {
    schemaName: 'ApiResponse',
    expected: 'ApiResponseSchema',
  },
]

describe('getPascalCaseSchemaName', () => {
  it.concurrent.each(getPascalCaseSchemaNameTestCases)(
    'getPascalCaseSchemaName($schemaName) -> $expected',
    ({ schemaName, expected }) => {
      const result = getPascalCaseSchemaNameHelper(schemaName)
      expect(result).toBe(expected)
    },
  )
})
