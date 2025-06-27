import { describe, it, expect } from 'vitest'
import { processAllOf } from './process-alllof'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/component/allof/process/process-alllof.test.ts

describe('processAllOf', () => {
  it.concurrent('processAllOf with allOf GeoJsonObject', () => {
    const result = processAllOf([
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
    ])

    const expected = {
      nullable: false,
      schemas: [
        'GeoJsonObjectSchema',
        'z.object({type:z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"])})',
      ],
    }
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('processAllOf with allof Geometry', () => {
    const result = processAllOf([
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
    ])

    const expected = {
      nullable: false,
      schemas: [
        'GeometrySchema',
        'z.object({type:z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon"])})',
      ],
    }
    expect(result).toStrictEqual(expected)
  })
})
