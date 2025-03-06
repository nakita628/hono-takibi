import { describe, expect, it } from 'vitest'
import { generateArrayReferenceSchema } from './generate-array-reference-schema'
import type { Schema } from '../../..type'
import { DEFAULT_CONFIG, type Config } from '../../../config'

const generateArrayReferenceSchemaTestCases: {
  schema: Schema
  config: Config
  expected: string
}[] = [
  {
    schema: {
      type: 'array',
      xml: { name: 'addresses', wrapped: true },
      items: { $ref: '#/components/schemas/Address' },
    },
    config: DEFAULT_CONFIG,
    expected: 'z.array(AddressSchema)',
  },
  {
    schema: {
      type: 'array',
      xml: { wrapped: true },
      items: { $ref: '#/components/schemas/Tag' },
    },
    config: DEFAULT_CONFIG,
    expected: 'z.array(TagSchema)',
  },
  {
    schema: { type: 'array', items: { $ref: '#/components/schemas/Feature' } },
    config: DEFAULT_CONFIG,
    expected: 'z.array(FeatureSchema)',
  },
  {
    schema: { type: 'array', items: { $ref: '#/components/schemas/Pet' } },
    config: DEFAULT_CONFIG,
    expected: 'z.array(PetSchema)',
  },
]

describe('generateArrayReferenceSchema', () => {
  it.concurrent.each(generateArrayReferenceSchemaTestCases)(
    'generateArrayReferenceSchema(%s, %s) -> %s',
    ({ schema, config, expected }) => {
      const result = generateArrayReferenceSchema(schema, config)
      expect(result).toBe(expected)
    },
  )
})
