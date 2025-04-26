import type { Schema } from '../../../../../types'
import type { Config } from '../../../../../config'
import { DEFAULT_CONFIG } from '../../../../../../data/test-config'
import { describe, expect, it } from 'vitest'
import { generateAllOfCode } from '../allof/generate-allof-code'

const generateAnyOfCodeTestCases: {
  schema: Schema
  config: Config
  expected: string
}[] = [
  {
    schema: {
      description: 'Abstract type for all GeoJSon object except Feature and FeatureCollection\n',
      externalDocs: {
        url: 'https://tools.ietf.org/html/rfc7946#section-3',
      },
      allOf: [
        {
          $ref: '#/components/schemas/GeoJsonObject',
        },
        {
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
      ],
    },
    config: DEFAULT_CONFIG,
    expected:
      'z.intersection(GeoJsonObjectSchema,z.object({type:z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"])}))',
  },
  {
    schema: {
      description: "GeoJSon 'Feature' object",
      externalDocs: {
        url: 'https://tools.ietf.org/html/rfc7946#section-3.2',
      },
      allOf: [
        {
          $ref: '#/components/schemas/GeoJsonObject',
        },
        {
          type: 'object',
          required: ['geometry', 'properties'],
          properties: {
            geometry: {
              allOf: [
                {
                  nullable: true,
                },
                {
                  $ref: '#/components/schemas/Geometry',
                },
              ],
            },
            properties: {
              type: 'object',
              nullable: true,
            },
            id: {
              oneOf: [
                {
                  type: 'number',
                },
                {
                  type: 'string',
                },
              ],
            },
          },
        },
      ],
    },
    config: DEFAULT_CONFIG,
    expected:
      'z.intersection(GeoJsonObjectSchema,z.object({geometry:GeometrySchema.nullable(),properties:z.object({}),id:z.union([z.number(),z.string()]).optional()}))',
  },
]

describe('generateAnyOfCode', () => {
  it.concurrent.each(generateAnyOfCodeTestCases)(
    'generateAnyOfCode($args.schema, $args.config) -> $expected',
    async ({ schema, config, expected }) => {
      const result = generateAllOfCode(schema, config)
      expect(result).toBe(expected)
    },
  )
})
