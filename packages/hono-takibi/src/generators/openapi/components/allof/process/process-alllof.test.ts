import { describe, expect, it } from 'vitest'
import { processAllOf } from './process-alllof'
import type { Schema } from '../../../../../types'
import type { Config } from '../../../../../config'
import { DEFAULT_CONFIG } from '../../../../../config'

const processAllOfTestCases: {
  allOf: Schema[]
  config: Config
  expected: {
    nullable: boolean
    schemas: string[]
  }
}[] = [
  {
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
    config: DEFAULT_CONFIG,
    expected: {
      nullable: false,
      schemas: [
        'geoJsonObjectSchema',
        'z.object({type:z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"])})',
      ],
    },
  },
  {
    allOf: [
      {
        $ref: '#/components/schemas/Geometry',
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
            ],
          },
        },
        required: ['type'],
        discriminator: {
          propertyName: 'type',
        },
      },
    ],
    config: DEFAULT_CONFIG,
    expected: {
      nullable: false,
      schemas: [
        'geometrySchema',
        'z.object({type:z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon"])})',
      ],
    },
  },
  {
    allOf: [
      {
        nullable: true,
      },
      {
        $ref: '#/components/schemas/Geometry',
      },
    ],
    config: DEFAULT_CONFIG,
    expected: { nullable: true, schemas: ['geometrySchema'] },
  },
]

describe('processAllOf', () => {
  it.concurrent.each(processAllOfTestCases)(
    'processAllOf($args.allOf, $args.config) -> $expected',
    async ({ allOf, config, expected }) => {
      const result = processAllOf(allOf, config)
      expect(result).toEqual(expected)
    },
  )
})
