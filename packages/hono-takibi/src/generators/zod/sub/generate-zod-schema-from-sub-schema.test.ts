import { describe, expect, it } from 'vitest'
import { generateZodSchemaFromSubSchema } from './generate-zod-schema-from-sub-schema'
import { DEFAULT_CONFIG } from '../../../config'
import type { Schema } from '../../../types'
import type { Config } from '../../../config'
const generateZodSchemaFromSubSchemaTestCases: {
  subSchema: Schema
  config: Config
  expected: string
}[] = [
  {
    subSchema: { $ref: '#/components/schemas/GeoJsonObject' },
    config: DEFAULT_CONFIG,
    expected: 'geoJsonObjectSchema',
  },
  {
    subSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: [
            'Point',
            'MultiPoint',
            'LineString',
            'MultiLineString',
            'Polygon',
            'MultiPolygon',
            'GeometryCollection',
          ],
        },
      },
      required: ['type'],
      discriminator: {
        propertyName: 'type',
      },
    },
    config: DEFAULT_CONFIG,
    expected:
      'z.object({type:z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"])})',
  },
]

describe('generateZodSchemaFromSubSchema', () => {
  it.concurrent.each(generateZodSchemaFromSubSchemaTestCases)(
    'generateZodSchemaFromSubSchema($subSchema, $config) -> $expected',
    ({ subSchema, config, expected }) => {
      const result = generateZodSchemaFromSubSchema(subSchema, config)
      expect(result).toBe(expected)
    },
  )
})
