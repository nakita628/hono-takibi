import { describe, expect, it } from 'vitest'
import { allOf } from './allof.js'

// Test run
// pnpm vitest run ./src/helper/zod-to-openapi/components/allof.test.ts

describe('allOf', () => {
  it.concurrent('allOf with GeoJsonObject', () => {
    const result = allOf({
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
    })
    const expected =
      'z.intersection(GeoJsonObjectSchema,z.object({type:z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"])}))'
    expect(result).toBe(expected)
  })

  it.concurrent('allOf with GeoJSon Feature object', () => {
    const result = allOf({
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
    })

    const expected =
      'z.intersection(GeoJsonObjectSchema,z.object({geometry:GeometrySchema.nullable(),properties:z.object({}).nullable(),id:z.union([z.number(),z.string()]).optional()}))'
    expect(result).toBe(expected)
  })
})
