import { describe, expect, it } from 'vitest'
import { getRefSchemaName } from './get-ref-schema-name'
import type { Schema } from '../../../type'
import type { Config } from '../../../config'
import { DEFAULT_CONFIG } from '../../../../data/test-config'

const getRefSchemaNameTestCases: { schema: Schema; config: Config; expected: string }[] = [
  {
    schema: { $ref: '#/components/schemas/GeoJsonObject' },
    config: DEFAULT_CONFIG,
    expected: 'GeoJsonObjectSchema',
  },
  {
    schema: { $ref: '#/components/schemas/Geometry' },
    config: DEFAULT_CONFIG,
    expected: 'GeometrySchema',
  },
  {
    schema: { $ref: '#/components/schemas/GeometryElement' },
    config: DEFAULT_CONFIG,
    expected: 'GeometryElementSchema',
  },
]

describe('getRefSchemaName valid cases', () => {
  it.concurrent.each(getRefSchemaNameTestCases)(
    'getRefSchemaName($schema, $config) -> $expected',
    ({ schema, config, expected }) => {
      const result = getRefSchemaName(schema, config)
      expect(result).toBe(expected)
    },
  )
})

describe('getRefSchemaName edge cases', () => {
  it.concurrent('should throw error when $ref is empty', () => {
    expect(() => getRefSchemaName({ $ref: '' }, DEFAULT_CONFIG)).toThrow('refName is not found')
  })
})
