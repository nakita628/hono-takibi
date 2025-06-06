import { describe, it, expect } from 'vitest'
import { processAllOf } from './process-alllof'
import { DEFAULT_CONFIG } from '../../../../../../../data/test-config'
import type { Schema } from '../../../../../../types'
import type { Config } from '../../../../../../config'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/component/allof/process/process-alllof.test.ts

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
        'GeoJsonObjectSchema',
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
        'GeometrySchema',
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
    expected: { nullable: true, schemas: ['GeometrySchema'] },
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
