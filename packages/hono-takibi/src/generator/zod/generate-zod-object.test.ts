import type { Schema } from '../../types'
import type { Config } from '../../config'
import { DEFAULT_CONFIG } from '../../../data/test-config'
import { describe, expect, it } from 'vitest'
import { generateZodObject } from './generate-zod-object'

const generateZodObjectTestCases: { schema: Schema; config: Config; expected: string }[] = [
  {
    schema: {
      description:
        'GeoJSon object\nThe coordinate reference system for all GeoJSON coordinates is a geographic coordinate reference system, using the World Geodetic System 1984 (WGS 84) datum, with longitude and latitude units of decimal degrees. This is equivalent to the coordinate reference system identified by the Open Geospatial Consortium (OGC) URN An OPTIONAL third-position element SHALL be the height in meters above or below the WGS 84 reference ellipsoid. In the absence of elevation values, applications sensitive to height or depth SHOULD interpret positions as being at local ground or sea level.\n',
      externalDocs: {
        url: 'https://tools.ietf.org/html/rfc7946#section-3',
      },
      type: 'object',
      properties: {
        type: {
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
        bbox: {
          description:
            'A GeoJSON object MAY have a member named "bbox" to include information on the coordinate range for its Geometries, Features, or FeatureCollections. The value of the bbox member MUST be an array of length 2*n where n is the number of dimensions represented in the contained geometries, with all axes of the most southwesterly point followed by all axes of the more northeasterly point. The axes order of a bbox follows the axes order of geometries.\n',
          type: 'array',
          items: {
            type: 'number',
          },
        },
      },
      required: ['type'],
      discriminator: {
        propertyName: 'type',
      },
    },
    config: DEFAULT_CONFIG,
    expected:
      'z.object({type:z.enum(["Feature","FeatureCollection","Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"]),bbox:z.array(z.number()).optional()})',
  },
  {
    schema: {
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
  {
    schema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon'],
        },
      },
      required: ['type'],
      discriminator: {
        propertyName: 'type',
      },
    },
    config: DEFAULT_CONFIG,
    expected:
      'z.object({type:z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon"])})',
  },
  {
    schema: {
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
    config: DEFAULT_CONFIG,
    expected:
      'z.object({geometry:GeometrySchema.nullable(),properties:z.object({}),id:z.union([z.number(),z.string()]).optional()})',
  },
  {
    schema: {
      type: 'object',
      nullable: true,
    },
    config: DEFAULT_CONFIG,
    expected: 'z.object({})',
  },
  {
    schema: {
      type: 'object',
      required: ['features'],
      properties: {
        features: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Feature',
          },
        },
      },
    },
    config: DEFAULT_CONFIG,
    expected: 'z.object({features:z.array(FeatureSchema)})',
  },
  {
    schema: {
      type: 'object',
      required: ['type', 'coordinates'],
      properties: {
        type: {
          type: 'string',
          enum: ['Point'],
        },
        coordinates: {
          $ref: '#/components/schemas/Position',
        },
      },
    },
    config: DEFAULT_CONFIG,
    expected: `z.object({type:z.literal('Point'),coordinates:PositionSchema})`,
  },
  {
    schema: {
      type: 'object',
      required: ['coordinates'],
      properties: {
        coordinates: {
          $ref: '#/components/schemas/LineStringCoordinates',
        },
      },
    },
    config: DEFAULT_CONFIG,
    expected: 'z.object({coordinates:LineStringCoordinatesSchema})',
  },
]

describe('generateZodObject valid cases', () => {
  it.concurrent.each(generateZodObjectTestCases)(
    'generateZodObject($schema, $config) -> $expected',
    async ({ schema, config, expected }) => {
      const result = generateZodObject(schema, config)
      expect(result).toBe(expected)
    },
  )
})

describe('generateZodObject edge cases', () => {
  it.concurrent('should throw an error when schema is null', () => {
    // biome-ignore lint:
    const schema = null as any
    expect(() => generateZodObject(schema, DEFAULT_CONFIG)).toThrow(
      'Cannot read properties of null',
    )
  })

  it.concurrent('should throw an error when schema is undefined', () => {
    // biome-ignore lint:
    const schema = undefined as any
    expect(() => generateZodObject(schema, DEFAULT_CONFIG)).toThrow(
      `Cannot read properties of undefined (reading 'additionalProperties')`,
    )
  })
})
