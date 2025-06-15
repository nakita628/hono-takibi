import type { Config } from '../../../../../config'
import { describe, it, expect } from 'vitest'
import { allOf } from './all-of'
import { Schema } from '../../../../../openapi'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/component/allof/generate-allof-code.test.ts

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
    config: {
      schema: {
        name: 'PascalCase',
        export: false,
      },
      type: {
        name: 'PascalCase',
        export: false,
      },
    },
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
    config: {
      schema: {
        name: 'PascalCase',
        export: false,
      },
      type: {
        name: 'PascalCase',
        export: false,
      },
    },
    expected:
      'z.intersection(GeoJsonObjectSchema,z.object({geometry:GeometrySchema.nullable(),properties:z.object({}),id:z.union([z.number(),z.string()]).optional()}))',
  },
]

describe('allOf', () => {
  it.concurrent.each(generateAnyOfCodeTestCases)(
    'allOf($args.schema, $args.config) -> $expected',
    async ({ schema, config, expected }) => {
      const result = allOf(schema, config)
      expect(result).toBe(expected)
    },
  )
})
