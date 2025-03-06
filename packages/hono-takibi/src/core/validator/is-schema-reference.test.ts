import { describe, expect, it } from 'vitest'
import { isSchemaReference } from './is-schema-reference'
import type { Schema } from '../../type'

const isSchemaReferenceTestCases: {
  schema: Schema
  expected: boolean
}[] = [
  { schema: { $ref: '#/components/schemas/User' }, expected: true },
  { schema: { $ref: '#/components/schemas/Error' }, expected: true },
  { schema: { $ref: '#/components/schemas/Pet' }, expected: true },
  { schema: { $ref: '#/components/schemas/ApiResponse' }, expected: true },
  { schema: { $ref: '#/components/schemas/Order' }, expected: true },
  { schema: { $ref: '#/components/schemas/Tag' }, expected: true },
  { schema: { $ref: '#/components/schemas/Category' }, expected: true },
  { schema: { $ref: undefined }, expected: false },
]

describe('isSchemaReference', () => {
  it.concurrent.each(isSchemaReferenceTestCases)(
    'isSchemaReference(%s) -> %s',
    ({ schema, expected }) => {
      const result = isSchemaReference(schema)
      expect(result).toBe(expected)
    },
  )
})
