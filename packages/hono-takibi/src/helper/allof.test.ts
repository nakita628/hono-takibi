import { describe, expect, it } from 'vitest'
import { allOf } from './allof.js'

// Test run
// pnpm vitest run ./src/helper/allof.test.ts

describe('allOf', () => {
  it.concurrent('z.intersection(z.object({a:z.string()}),z.object({b:z.number()}))', () => {
    expect(
      allOf({
        allOf: [
          {
            type: 'object',
            required: ['a'],
            properties: {
              a: { type: 'string' },
            },
          },
          {
            type: 'object',
            required: ['b'],
            properties: {
              b: { type: 'number' },
            },
          },
        ],
      }),
    ).toBe('z.intersection(z.object({a:z.string()}),z.object({b:z.number()}))')
  })

  it.concurrent('z.intersection(FooSchema,z.object({b:z.number()}))', () => {
    expect(
      allOf({
        allOf: [
          {
            $ref: '#/components/schemas/Foo',
          },
          {
            type: 'object',
            required: ['b'],
            properties: {
              b: { type: 'number' },
            },
          },
        ],
      }),
    ).toBe('z.intersection(FooSchema,z.object({b:z.number()}))')
  })

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
})
