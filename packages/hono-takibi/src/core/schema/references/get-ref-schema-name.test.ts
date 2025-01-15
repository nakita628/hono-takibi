import { describe, expect, it } from 'vitest'
import { getRefSchemaName } from './get-ref-schema-name'
import { Schema } from '../../../types'
import { Config, DEFAULT_CONFIG } from '../../../config'

const getRefSchemaNameTestCases: { schema: Schema; config: Config; expected: string }[] = [
  {
    schema: { $ref: '#/components/schemas/GeoJsonObject' },
    config: DEFAULT_CONFIG,
    expected: 'geoJsonObjectSchema',
  },
  {
    schema: { $ref: '#/components/schemas/Geometry' },
    config: DEFAULT_CONFIG,
    expected: 'geometrySchema',
  },
  {
    schema: { $ref: '#/components/schemas/GeometryElement' },
    config: DEFAULT_CONFIG,
    expected: 'geometryElementSchema',
  },
]

describe('getRefSchemaName', () => {
  it.concurrent.each(getRefSchemaNameTestCases)(
    'getRefSchemaName($schema, $config) should return $expected',
    ({ schema, config, expected }) => {
      const result = getRefSchemaName(schema, config)
      expect(result).toBe(expected)
    },
  )
})
