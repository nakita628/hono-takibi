import { describe, expect, it } from 'vitest'
import { generateZodEnum } from './generate-zod-enum'
import type { Schema } from '../../type'

const generateZodEnumTestCases: { schema: Schema; expected: string }[] = [
  {
    schema: {
      type: 'string',
      description: 'Order Status',
      example: 'approved',
      enum: ['placed', 'approved', 'delivered'],
    },
    expected: 'z.enum(["placed","approved","delivered"]).openapi({example:"approved"})',
  },
  {
    schema: {
      type: 'string',
      description: 'pet status in the store',
      enum: ['available', 'pending', 'sold'],
    },
    expected: 'z.enum(["available","pending","sold"])',
  },
  {
    schema: {
      type: 'string',
      enum: [
        'Feature',
        'FeatureCollection',
        'Point',
        'MultiPoint',
        'LineString',
        'MultiLineString',
        'Polygon',
        'MultiPolygon',
        'GeometryCollection',
      ],
    },
    expected:
      'z.enum(["Feature","FeatureCollection","Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"])',
  },
  {
    schema: {
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
    expected:
      'z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"])',
  },
  {
    schema: {
      type: 'string',
      enum: ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon'],
      example: 'Point',
    },
    expected:
      'z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon"]).openapi({example:"Point"})',
  },
  {
    schema: {
      type: 'string',
      enum: ['Point'],
    },
    expected: 'z.enum(["Point"])',
  },
]

describe('generateZodEnum', () => {
  it.concurrent.each(generateZodEnumTestCases)(
    'generateZodEnum($schema) -> $expected',
    ({ schema, expected }) => {
      const result = generateZodEnum(schema)
      expect(result).toBe(expected)
    },
  )
})
