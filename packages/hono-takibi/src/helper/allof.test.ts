import { describe, expect, it } from 'vitest'
import { allOf } from './allof.js'

// Test run
// pnpm vitest run ./src/helper/allof.test.ts

describe('allOf', () => {
  it.concurrent(
    'z.intersection(GeoJsonObjectSchema,z.object({type:z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"])}))',
    () => {
      expect(
        allOf({
          description:
            'Abstract type for all GeoJSon object except Feature and FeatureCollection\n',
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
        }),
      ).toBe(
        'z.intersection(GeoJsonObjectSchema,z.object({type:z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"])}))',
      )
    },
  )

  it.concurrent(
    'z.intersection(GeoJsonObjectSchema,z.object({geometry:GeometrySchema.nullable(),properties:z.object({}).nullable(),id:z.union([z.number(),z.string()]).optional()}))',
    () => {
      expect(
        allOf({
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
        }),
      ).toBe(
        'z.intersection(GeoJsonObjectSchema,z.object({geometry:GeometrySchema.nullable(),properties:z.object({}).nullable(),id:z.union([z.number(),z.string()]).optional()}))',
      )
    },
  )

  it.concurrent(
    'z.intersection(z.object({test:z.string()}),z.object({test2:z.string()})).nullable()',
    () => {
      expect(
        allOf({
          allOf: [
            {
              type: 'object',
              required: ['test'],
              properties: {
                test: {
                  type: 'string',
                },
              },
            },
            {
              type: 'object',
              required: ['test2'],
              properties: {
                test2: {
                  type: 'string',
                },
              },
            },
          ],
          nullable: true,
        }),
      ).toBe('z.intersection(z.object({test:z.string()}),z.object({test2:z.string()})).nullable()')
    },
  )

  it.concurrent(
    'z.intersection(z.object({test:z.string()}),z.object({test2:z.string()})).nullable()',
    () => {
      expect(
        allOf({
          allOf: [
            {
              type: 'object',
              required: ['test'],
              properties: {
                test: {
                  type: 'string',
                },
              },
            },
            {
              type: 'object',
              required: ['test2'],
              properties: {
                test2: {
                  type: 'string',
                },
              },
            },
          ],
          type: ['null'],
        }),
      ).toBe('z.intersection(z.object({test:z.string()}),z.object({test2:z.string()})).nullable()')
    },
  )
})
