import { describe, expect, it } from 'vitest'
import { findReferences } from './find-references'
import type { Schema } from '../../../types'

const findReferencesTestCases: { schema: Schema; expected: Set<string> }[] = [
  {
    schema: {},
    expected: new Set(),
  },
  {
    schema: { $ref: '#/components/schemas/Address' },
    expected: new Set(['Address']),
  },
  {
    schema: {
      items: {
        $ref: '#/components/schemas/Category',
      },
    },
    expected: new Set(['Category']),
  },
  {
    schema: {
      items: {
        $ref: '#/components/schemas/Tag',
      },
    },
    expected: new Set(['Tag']),
  },
]

describe('findReferences', () => {
  it.concurrent.each(findReferencesTestCases)(
    'findReferences($schema) -> $expected',
    async ({ schema, expected }) => {
      const result = findReferences(schema)
      expect(result).toEqual(expected)
    },
  )
})
