import { describe, expect, it } from 'vitest'
import { isArrayWithSchemaReference } from './is-array-with-schema-reference'
import type { Schema } from '../../types'

const isArrayWithSchemaReferenceTestCases: {
  schema: Schema
  expected: boolean
}[] = [
  {
    schema: {
      type: 'array',
      xml: { name: 'addresses', wrapped: true },
      items: { $ref: '#/components/schemas/Address' },
    },
    expected: true,
  },
  {
    schema: { type: 'array', items: { $ref: '#/components/schemas/User' } },
    expected: true,
  },
  {
    schema: { type: 'string', format: 'binary' },
    expected: false,
  },
  {
    schema: {
      type: 'array',
      items: undefined,
    },
    expected: false,
  },
]

describe('isArrayWithSchemaReference', () => {
  it.concurrent.each(isArrayWithSchemaReferenceTestCases)(
    'isArrayWithSchemaReference(%s) -> %s',
    ({ schema, expected }) => {
      const result = isArrayWithSchemaReference(schema)
      expect(result).toBe(expected)
    },
  )
})
