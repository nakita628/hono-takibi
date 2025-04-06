import type { Schema } from '../../type'
import { describe, expect, it } from 'vitest'
import { generateZodEnum } from './generate-zod-enum'

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
    expected: `z.literal('Point')`,
  },
]

describe('generateZodEnum valid cases', () => {
  it.concurrent.each(generateZodEnumTestCases)(
    'generateZodEnum($schema) -> $expected',
    ({ schema, expected }) => {
      const result = generateZodEnum(schema)
      expect(result).toBe(expected)
    },
  )
})

describe('generateZodEnum edge cases', () => {
  it.concurrent('should throw an error when schema is null', () => {
    // biome-ignore lint:
    const schema = null as any
    expect(() => generateZodEnum(schema)).toThrow('Cannot read properties of null')
  })

  it.concurrent('should throw an error when enum is not defined', () => {
    const schema: Schema = {
      type: 'string',
    }
    expect(() => generateZodEnum(schema)).toThrow('enum is not found')
  })

  it.concurrent('should throw an error when enum is null', () => {
    const schema: Schema = {
      type: 'string',
      // biome-ignore lint:
      enum: null as any,
    } as Schema
    expect(() => generateZodEnum(schema)).toThrow('enum is not found')
  })

  it.concurrent('should throw an error when enum is undefined', () => {
    const schema: Schema = {
      type: 'string',
      enum: undefined,
    }
    expect(() => generateZodEnum(schema)).toThrow('enum is not found')
  })
})
