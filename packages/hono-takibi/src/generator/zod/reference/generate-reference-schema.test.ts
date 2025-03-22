import { describe, expect, it } from 'vitest'
import { generateReferenceSchema } from './generate-reference-schema'
import { DEFAULT_CONFIG } from '../../../config'
import type { Schema } from '../../../type'
import type { Config } from '../../../config'

const generateReferenceSchemaTestCases: {
  schema: Schema
  config: Config
  expected: string
}[] = [
  {
    schema: {
      $ref: '#/components/schemas/User',
    },
    config: DEFAULT_CONFIG,
    expected: 'UserSchema',
  },
  {
    schema: { $ref: '#/components/schemas/Error' },
    config: DEFAULT_CONFIG,
    expected: 'ErrorSchema',
  },
  {
    schema: { $ref: '#/components/schemas/Pet' },
    config: DEFAULT_CONFIG,
    expected: 'PetSchema',
  },
  {
    schema: { $ref: '#/components/schemas/ApiResponse' },
    config: DEFAULT_CONFIG,
    expected: 'ApiResponseSchema',
  },
  {
    schema: { $ref: '#/components/schemas/Order' },
    config: DEFAULT_CONFIG,
    expected: 'OrderSchema',
  },
]

describe('generateReferenceSchema', () => {
  it.concurrent.each(generateReferenceSchemaTestCases)(
    'generateReferenceSchema(%s, %s) -> %s',
    ({ schema, config, expected }) => {
      expect(generateReferenceSchema(schema, config)).toBe(expected)
    },
  )
})
