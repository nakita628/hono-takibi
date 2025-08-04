import { describe, expect, it } from 'vitest'
import type { Schema } from '../../openapi/index.js'
import { zodToOpenAPI } from './index.js'

// Test run
// pnpm vitest run ./src/generator/zod-to-openapi/index.test.ts

describe('zodToOpenAPI', () => {
  describe('ref', () => {
    it.concurrent.each<[Schema, string]>([
      [{ $ref: '#/components/schemas/Test' }, 'TestSchema'],
      [
        {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Test',
          },
        },
        'z.array(TestSchema)',
      ],
    ])('zodToOpenAPI(%o) → %s', (input, expected) => {
      expect(zodToOpenAPI(input)).toBe(expected)
    })
  })

  describe('oneOf', () => {
    it.concurrent.each<[Schema, string]>([
      [
        {
          type: 'object',
          oneOf: [
            {
              properties: { kind: { const: 'A' } },
              required: ['kind'],
            },
            {
              properties: { kind: { const: 'B' } },
              required: ['kind'],
            },
          ],
          nullable: true,
        },
        'z.union([z.object({kind:z.literal("A")}),z.object({kind:z.literal("B")})]).nullable()',
      ],
      [
        {
          type: 'object',
          oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
        },
        'z.union([ASchema,BSchema])',
      ],
      [
        {
          type: 'object',
          oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
          nullable: true,
        },
        'z.union([ASchema,BSchema]).nullable()',
      ],
      [
        {
          type: ['object', 'null'],
          oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
        },
        'z.union([ASchema,BSchema]).nullable()',
      ],
    ])('zodToOpenAPI(%o) → %s', (input, expected) => {
      expect(zodToOpenAPI(input)).toBe(expected)
    })

    // anyOf
    // not support zod-to-openapi
    describe('anyOf', () => {
      it.concurrent.each<[Schema, string]>([
        [
          {
            type: 'object',
            oneOf: [
              {
                properties: { kind: { const: 'A' } },
                required: ['kind'],
              },
              {
                properties: { kind: { const: 'B' } },
                required: ['kind'],
              },
            ],
            nullable: true,
          },
          'z.union([z.object({kind:z.literal("A")}),z.object({kind:z.literal("B")})]).nullable()',
        ],
        [
          {
            type: 'object',
            oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
          },
          'z.union([ASchema,BSchema])',
        ],
        [
          {
            type: 'object',
            oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
            nullable: true,
          },
          'z.union([ASchema,BSchema]).nullable()',
        ],
        [
          {
            type: ['object', 'null'],
            oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
          },
          'z.union([ASchema,BSchema]).nullable()',
        ],
      ])('zodToOpenAPI(%o) → %s', (input, expected) => {
        expect(zodToOpenAPI(input)).toBe(expected)
      })
    })

    // allOf
    // not support zod-to-openapi
    describe('allOf', () => {
      it.concurrent.each<[Schema, string]>([
        [
          {
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
          },
          'z.intersection(GeoJsonObjectSchema,z.object({type:z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"])})).openapi({description:"Abstract type for all GeoJSon object except Feature and FeatureCollection\\n"})',
        ],
        [
          {
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
          `z.intersection(GeoJsonObjectSchema,z.object({geometry:GeometrySchema.nullable(),properties:z.object({}).nullable(),id:z.union([z.number(),z.string()]).optional()})).openapi({description:"GeoJSon 'Feature' object"})`,
        ],
        [
          {
            allOf: [
              {
                type: 'object',
                required: ['a'],
                properties: {
                  a: {
                    type: 'string',
                  },
                },
              },
              {
                type: 'object',
                required: ['b'],
                properties: {
                  b: {
                    type: 'string',
                  },
                },
              },
            ],
          },
          'z.intersection(z.object({a:z.string()}),z.object({b:z.string()}))',
        ],
        [
          {
            allOf: [
              {
                type: 'object',
                required: ['a'],
                properties: {
                  a: {
                    type: 'string',
                  },
                },
              },
              {
                type: 'object',
                required: ['b'],
                properties: {
                  b: {
                    type: 'string',
                  },
                },
              },
            ],
            nullable: true,
          },
          'z.intersection(z.object({a:z.string()}),z.object({b:z.string()})).nullable()',
        ],
        [
          {
            allOf: [
              {
                type: 'object',
                required: ['a'],
                properties: {
                  a: {
                    type: 'string',
                  },
                },
              },
              {
                type: 'object',
                required: ['b'],
                properties: {
                  b: {
                    type: 'string',
                  },
                },
              },
            ],
            type: ['null'],
          },
          'z.intersection(z.object({a:z.string()}),z.object({b:z.string()})).nullable()',
        ],
      ])('zodToOpenAPI(%o) → %s', (input, expected) => {
        expect(zodToOpenAPI(input)).toBe(expected)
      })
    })

    // TODO add not

    describe('const', () => {
      it.concurrent.each<[Schema, string]>([
        [{ const: 'fixed' }, 'z.literal("fixed")'],
        [{ const: 'fixed', nullable: true }, 'z.literal("fixed").nullable()'],
        [{ type: ['null'], const: 'fixed' }, 'z.literal("fixed").nullable()'],
      ])('zodToOpenAPI(%o) → %s', (input, expected) => {
        expect(zodToOpenAPI(input)).toBe(expected)
      })
    })

    // enum
    describe('enum', () => {
      it.concurrent.each<[Schema, string]>([
        [{ enum: ['A', 'B'] }, 'z.enum(["A","B"])'],
        [{ enum: ['A', 'B'], type: ['string'], nullable: true }, 'z.enum(["A","B"]).nullable()'],
        [{ enum: ['A', 'B'], type: ['string', 'null'] }, 'z.enum(["A","B"]).nullable()'],
        [{ enum: [1, 2] }, 'z.union([z.literal(1),z.literal(2)])'],
        [
          { enum: [1, 2], type: ['number'], nullable: true },
          'z.union([z.literal(1),z.literal(2)]).nullable()',
        ],
        [
          { enum: [1, 2], type: ['number', 'null'] },
          'z.union([z.literal(1),z.literal(2)]).nullable()',
        ],
        [{ enum: [true, false] }, 'z.union([z.literal(true),z.literal(false)])'],
        [
          { enum: [true, false], type: ['boolean'], nullable: true },
          'z.union([z.literal(true),z.literal(false)]).nullable()',
        ],
        [
          { enum: [true, false], type: ['boolean', 'null'] },
          'z.union([z.literal(true),z.literal(false)]).nullable()',
        ],
        [{ enum: [null] }, 'z.literal(null)'],
        [{ enum: [null], type: ['null'] }, 'z.literal(null).nullable()'],
        [{ enum: ['abc'] }, `z.literal('abc')`],
        [{ enum: ['abc'], type: ['string'], nullable: true }, `z.literal('abc').nullable()`],
        [{ enum: ['abc'], type: ['string', 'null'] }, `z.literal('abc').nullable()`],
        [{ type: 'array', enum: [[1, 2]] }, 'z.tuple([z.literal(1),z.literal(2)])'],
        [
          { type: 'array', nullable: true, enum: [[1, 2]] },
          'z.tuple([z.literal(1),z.literal(2)]).nullable()',
        ],
        [
          { type: ['array', 'null'], enum: [[1, 2]] },
          'z.tuple([z.literal(1),z.literal(2)]).nullable()',
        ],
        [
          {
            type: 'array',
            enum: [
              [1, 2],
              [3, 4],
            ],
          },
          'z.union([z.tuple([z.literal(1),z.literal(2)]),z.tuple([z.literal(3),z.literal(4)])])',
        ],
        [
          {
            type: 'array',
            nullable: true,
            enum: [
              [1, 2],
              [3, 4],
            ],
          },
          'z.union([z.tuple([z.literal(1),z.literal(2)]),z.tuple([z.literal(3),z.literal(4)])]).nullable()',
        ],
        [
          {
            type: ['array', 'null'],
            enum: [
              [1, 2],
              [3, 4],
            ],
          },
          'z.union([z.tuple([z.literal(1),z.literal(2)]),z.tuple([z.literal(3),z.literal(4)])]).nullable()',
        ],
      ])('zodToOpenAPI(%o) → %s', (input, expected) => {
        expect(zodToOpenAPI(input)).toBe(expected)
      })
    })

    // TODO properties

    // string
    describe('string', () => {
      it.concurrent.each<[Schema, string]>([
        [{ type: 'string' }, 'z.string()'],
        [{ type: ['string'], nullable: true }, 'z.string().nullable()'],
        [{ type: ['string', 'null'] }, 'z.string().nullable()'],
        [{ type: 'string', minLength: 1, maxLength: 10 }, 'z.string().min(1).max(10)'],
        [{ type: 'string', pattern: '^\\w+$' }, 'z.string().regex(/^\\w+$/)'],
        [{ type: 'string', default: 'test' }, 'z.string().default("test")'],
        [
          { type: 'string', default: 'test', nullable: true },
          'z.string().default("test").nullable()',
        ],
        [{ type: ['string', 'null'], default: 'test' }, 'z.string().default("test").nullable()'],
        [{ type: 'string', format: 'email' }, 'z.email()'],
        [{ type: 'string', format: 'uuid' }, 'z.uuid()'],
        [{ type: 'string', format: 'uuidv4' }, 'z.uuidv4()'],
        [{ type: 'string', format: 'uuidv7' }, 'z.uuidv7()'],
        [{ type: 'string', format: 'uri' }, 'z.url()'],
        [{ type: 'string', format: 'emoji' }, 'z.emoji()'],
        [{ type: 'string', format: 'base64' }, 'z.base64()'],
        [{ type: 'string', format: 'nanoid' }, 'z.nanoid()'],
        [{ type: 'string', format: 'cuid' }, 'z.cuid()'],
        [{ type: 'string', format: 'cuid2' }, 'z.cuid2()'],
        [{ type: 'string', format: 'ulid' }, 'z.ulid()'],
        [{ type: 'string', format: 'ipv4' }, 'z.ipv4()'],
        [{ type: 'string', format: 'ipv6' }, 'z.ipv6()'],
        [{ type: 'string', format: 'cidrv4' }, 'z.cidrv4()'],
        [{ type: 'string', format: 'cidrv6' }, 'z.cidrv6()'],
        [{ type: 'string', format: 'date' }, 'z.iso.date()'],
        [{ type: 'string', format: 'time' }, 'z.iso.time()'],
        [{ type: 'string', format: 'date-time' }, 'z.iso.datetime()'],
        [{ type: 'string', format: 'duration' }, 'z.iso.duration()'],
        [{ type: 'string', format: 'binary' }, 'z.file()'],
        [{ type: 'string', format: 'toLowerCase' }, 'z.toLowerCase()'],
        [{ type: 'string', format: 'toUpperCase' }, 'z.toUpperCase()'],
        [{ type: 'string', format: 'trim' }, 'z.trim()'],
        [{ type: 'string', format: 'jwt' }, 'z.jwt()'],
      ])('zodToOpenAPI(%o) → %s', (input, expected) => {
        expect(zodToOpenAPI(input)).toBe(expected)
      })

      // number
      describe('number', () => {
        describe('type: number', () => {
          it.concurrent.each<[Schema, string]>([
            [{ type: 'number' }, 'z.number()'],
            [{ type: ['number'], nullable: true }, 'z.number().nullable()'],
            [{ type: ['number', 'null'] }, 'z.number().nullable()'],
            [
              {
                type: 'number',
                minimum: 0,
                exclusiveMinimum: true,
              },
              'z.number().positive()',
            ],
            [
              {
                type: 'number',
                minimum: 0,
                exclusiveMinimum: false,
              },
              'z.number().nonnegative()',
            ],
            [{ type: 'number', maximum: 0, exclusiveMaximum: true }, 'z.number().negative()'],
            [{ type: 'number', maximum: 0, exclusiveMaximum: false }, 'z.number().nonpositive()'],
            [{ type: 'number', minimum: 100 }, 'z.number().min(100)'],
            [{ type: 'number', minimum: 0 }, 'z.number().min(0)'],
            [{ type: 'number', minimum: 100, exclusiveMinimum: true }, 'z.number().gt(100)'],
            [{ type: 'number', maximum: 100 }, 'z.number().max(100)'],
            [{ type: 'number', maximum: 0 }, 'z.number().max(0)'],
            [{ type: 'number', maximum: 100, exclusiveMaximum: true }, 'z.number().lt(100)'],
            [{ type: 'number', multipleOf: 2 }, 'z.number().multipleOf(2)'],
            [{ type: 'number', default: 100 }, 'z.number().default(100)'],
            [
              { type: 'number', default: 100, nullable: true },
              'z.number().default(100).nullable()',
            ],
            [{ type: ['number', 'null'], default: 100 }, 'z.number().default(100).nullable()'],
          ])('zodToOpenAPI(%o) → %s', (input, expected) => {
            expect(zodToOpenAPI(input)).toBe(expected)
          })
        })

        describe('type: number, format: float', () => {
          it.concurrent.each<[Schema, string]>([
            [{ type: 'number', format: 'float' }, 'z.float32()'],
            [{ type: 'number', format: 'float', nullable: true }, 'z.float32().nullable()'],
            [
              { type: ['number', 'null'], format: 'float', nullable: true },
              'z.float32().nullable()',
            ],
            [{ type: 'number', format: 'float64' }, 'z.float64()'],
            [{ type: 'number', format: 'float64', nullable: true }, 'z.float64().nullable()'],
            [
              { type: ['number', 'null'], format: 'float64', nullable: true },
              'z.float64().nullable()',
            ],
          ])('zodToOpenAPI(%o) → %s', (input, expected) => {
            expect(zodToOpenAPI(input)).toBe(expected)
          })
        })
      })

      // integer
      describe('integer', () => {
        describe('type: integer', () => {
          it.concurrent.each<[Schema, string]>([
            [{ type: 'integer' }, 'z.int()'],
            [{ type: ['integer'], nullable: true }, 'z.int().nullable()'],
            [{ type: ['integer', 'null'] }, 'z.int().nullable()'],
            [{ type: 'integer', minimum: 0, exclusiveMinimum: true }, 'z.int().positive()'],
            [{ type: 'integer', minimum: 0, exclusiveMinimum: false }, 'z.int().nonnegative()'],
            [{ type: 'integer', maximum: 0, exclusiveMaximum: true }, 'z.int().negative()'],
            [{ type: 'integer', maximum: 0, exclusiveMaximum: false }, 'z.int().nonpositive()'],
            [{ type: 'integer', minimum: 100 }, 'z.int().min(100)'],
            [{ type: 'integer', minimum: 0 }, 'z.int().min(0)'],
            [{ type: 'integer', minimum: 100, exclusiveMinimum: true }, 'z.int().gt(100)'],
            [{ type: 'integer', maximum: 100 }, 'z.int().max(100)'],
            [{ type: 'integer', maximum: 0 }, 'z.int().max(0)'],
            [{ type: 'integer', maximum: 100, exclusiveMaximum: true }, 'z.int().lt(100)'],
            [{ type: 'integer', exclusiveMaximum: 100 }, 'z.int().lt(100)'],
            [{ type: 'integer', multipleOf: 2 }, 'z.int().multipleOf(2)'],
            [{ type: 'integer', default: 100 }, 'z.int().default(100)'],
            [{ type: 'integer', default: 100, nullable: true }, 'z.int().default(100).nullable()'],
            [{ type: ['integer', 'null'], default: 100 }, 'z.int().default(100).nullable()'],
          ])('zodToOpenAPI(%o) → %s', (input, expected) => {
            expect(zodToOpenAPI(input)).toBe(expected)
          })
        })

        describe('type: integer, format: int32', () => {
          it.concurrent.each<[Schema, string]>([
            [{ type: 'integer', format: 'int32' }, 'z.int32()'],
            [{ type: 'integer', format: 'int32', nullable: true }, 'z.int32().nullable()'],
            [{ type: ['integer', 'null'], format: 'int32' }, 'z.int32().nullable()'],
            [
              { type: 'integer', format: 'int32', minimum: 0, exclusiveMinimum: true },
              'z.int32().positive()',
            ],
            [
              { type: 'integer', format: 'int32', minimum: 0, exclusiveMinimum: false },
              'z.int32().nonnegative()',
            ],
            [
              { type: 'integer', format: 'int32', maximum: 0, exclusiveMaximum: true },
              'z.int32().negative()',
            ],
            [
              { type: 'integer', format: 'int32', maximum: 0, exclusiveMaximum: false },
              'z.int32().nonpositive()',
            ],
            [{ type: 'integer', format: 'int32', minimum: 100 }, 'z.int32().min(100)'],
            [{ type: 'integer', format: 'int32', minimum: 0 }, 'z.int32().min(0)'],
            [
              { type: 'integer', format: 'int32', minimum: 100, exclusiveMinimum: true },
              'z.int32().gt(100)',
            ],
            [{ type: 'integer', format: 'int32', maximum: 100 }, 'z.int32().max(100)'],
            [{ type: 'integer', format: 'int32', maximum: 0 }, 'z.int32().max(0)'],
            [
              { type: 'integer', format: 'int32', maximum: 100, exclusiveMaximum: true },
              'z.int32().lt(100)',
            ],
            [{ type: 'integer', format: 'int32', exclusiveMaximum: 100 }, 'z.int32().lt(100)'],
            [{ type: 'integer', format: 'int32', multipleOf: 2 }, 'z.int32().multipleOf(2)'],
            [{ type: 'integer', format: 'int32', default: 100 }, 'z.int32().default(100)'],
            [
              { type: 'integer', format: 'int32', default: 100, nullable: true },
              'z.int32().default(100).nullable()',
            ],
            [
              { type: ['integer', 'null'], format: 'int32', default: 100 },
              'z.int32().default(100).nullable()',
            ],
          ])('zodToOpenAPI(%o) → %s', (input, expected) => {
            expect(zodToOpenAPI(input)).toBe(expected)
          })
        })

        describe('type: integer, format: int64', () => {
          it.concurrent.each<[Schema, string]>([
            [{ type: 'integer', format: 'int64' }, 'z.int64()'],
            [{ type: 'integer', format: 'int64', nullable: true }, 'z.int64().nullable()'],
            [{ type: ['integer', 'null'], format: 'int64' }, 'z.int64().nullable()'],
            [
              { type: 'integer', format: 'int64', minimum: 0, exclusiveMinimum: true },
              'z.int64().positive()',
            ],
            [
              { type: 'integer', format: 'int64', minimum: 0, exclusiveMinimum: false },
              'z.int64().nonnegative()',
            ],
            [
              { type: 'integer', format: 'int64', maximum: 0, exclusiveMaximum: true },
              'z.int64().negative()',
            ],
            [
              { type: 'integer', format: 'int64', maximum: 0, exclusiveMaximum: false },
              'z.int64().nonpositive()',
            ],
            [{ type: 'integer', format: 'int64', minimum: 100 }, 'z.int64().min(100n)'],
            [{ type: 'integer', format: 'int64', minimum: 0 }, 'z.int64().min(0n)'],
            [
              { type: 'integer', format: 'int64', minimum: 100, exclusiveMinimum: true },
              'z.int64().gt(100n)',
            ],
            [{ type: 'integer', format: 'int64', maximum: 100 }, 'z.int64().max(100n)'],
            [{ type: 'integer', format: 'int64', maximum: 0 }, 'z.int64().max(0n)'],
            [
              { type: 'integer', format: 'int64', maximum: 100, exclusiveMaximum: true },
              'z.int64().lt(100n)',
            ],
            [{ type: 'integer', format: 'int64', exclusiveMaximum: 100 }, 'z.int64().lt(100n)'],
            [{ type: 'integer', format: 'int64', multipleOf: 2 }, 'z.int64().multipleOf(2n)'],
            [{ type: 'integer', format: 'int64', default: 100 }, 'z.int64().default(100n)'],
            [
              { type: 'integer', format: 'int64', default: 100, nullable: true },
              'z.int64().default(100n).nullable()',
            ],
            [
              { type: ['integer', 'null'], format: 'int64', default: 100 },
              'z.int64().default(100n).nullable()',
            ],
          ])('zodToOpenAPI(%o) → %s', (input, expected) => {
            expect(zodToOpenAPI(input)).toBe(expected)
          })
        })

        describe('type: integer, format: bigint', () => {
          it.concurrent.each<[Schema, string]>([
            [{ type: 'integer', format: 'bigint' }, 'z.bigint()'],
            [{ type: 'integer', format: 'bigint', nullable: true }, 'z.bigint().nullable()'],
            [{ type: ['integer', 'null'], format: 'bigint' }, 'z.bigint().nullable()'],
            [
              { type: 'integer', format: 'bigint', minimum: 0, exclusiveMinimum: true },
              'z.bigint().positive()',
            ],
            [
              { type: 'integer', format: 'bigint', minimum: 0, exclusiveMinimum: false },
              'z.bigint().nonnegative()',
            ],
            [
              { type: 'integer', format: 'bigint', maximum: 0, exclusiveMaximum: true },
              'z.bigint().negative()',
            ],
            [
              { type: 'integer', format: 'bigint', maximum: 0, exclusiveMaximum: false },
              'z.bigint().nonpositive()',
            ],
            [{ type: 'integer', format: 'bigint', minimum: 100 }, 'z.bigint().min(BigInt(100))'],
            [{ type: 'integer', format: 'bigint', minimum: 0 }, 'z.bigint().min(BigInt(0))'],
            [
              { type: 'integer', format: 'bigint', minimum: 100, exclusiveMinimum: true },
              'z.bigint().gt(BigInt(100))',
            ],
            [{ type: 'integer', format: 'bigint', maximum: 100 }, 'z.bigint().max(BigInt(100))'],
            [{ type: 'integer', format: 'bigint', maximum: 0 }, 'z.bigint().max(BigInt(0))'],
            [
              { type: 'integer', format: 'bigint', maximum: 100, exclusiveMaximum: true },
              'z.bigint().lt(BigInt(100))',
            ],
            [
              { type: 'integer', format: 'bigint', exclusiveMaximum: 100 },
              'z.bigint().lt(BigInt(100))',
            ],
            [
              { type: 'integer', format: 'bigint', multipleOf: 2 },
              'z.bigint().multipleOf(BigInt(2))',
            ],
            [
              { type: 'integer', format: 'bigint', default: 100 },
              'z.bigint().default(BigInt(100))',
            ],
            [
              { type: 'integer', format: 'bigint', default: 100, nullable: true },
              'z.bigint().default(BigInt(100)).nullable()',
            ],
            [
              { type: ['integer', 'null'], format: 'bigint', default: 100 },
              'z.bigint().default(BigInt(100)).nullable()',
            ],
          ])('zodToOpenAPI(%o) → %s', (input, expected) => {
            expect(zodToOpenAPI(input)).toBe(expected)
          })
        })
      })

      // boolean
      describe('boolean', () => {
        it.concurrent.each<[Schema, string]>([
          [{ type: 'boolean' }, 'z.boolean()'],
          [{ type: ['boolean'], nullable: true }, 'z.boolean().nullable()'],
          [{ type: ['boolean', 'null'] }, 'z.boolean().nullable()'],
          [{ type: 'boolean', default: true }, 'z.boolean().default(true)'],
          [{ type: 'boolean', default: false }, 'z.boolean().default(false)'],
          [{ type: 'boolean', nullable: true }, 'z.boolean().nullable()'],
          [{ type: ['boolean', 'null'] }, 'z.boolean().nullable()'],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })
    })

    // array
    describe('array', () => {
      it.concurrent.each<[Schema, string]>([
        [{ type: 'array', items: { type: 'string' } }, 'z.array(z.string())'],
        [
          { type: 'array', items: { type: 'string', nullable: true } },
          'z.array(z.string().nullable())',
        ],
        [{ type: 'array', items: { type: ['string', 'null'] } }, 'z.array(z.string().nullable())'],
        [
          { type: 'array', nullable: true, items: { type: ['string', 'null'] } },
          'z.array(z.string().nullable()).nullable()',
        ],
        [{ type: 'array', items: { type: 'number' } }, 'z.array(z.number())'],
        [
          { type: 'array', items: { type: 'number', nullable: true } },
          'z.array(z.number().nullable())',
        ],
        [{ type: 'array', items: { type: ['number', 'null'] } }, 'z.array(z.number().nullable())'],
        [
          { type: 'array', nullable: true, items: { type: ['number', 'null'] } },
          'z.array(z.number().nullable()).nullable()',
        ],
        [{ type: 'array', items: { type: 'boolean' } }, 'z.array(z.boolean())'],
        [
          { type: 'array', items: { type: 'boolean', nullable: true } },
          'z.array(z.boolean().nullable())',
        ],
        [
          { type: 'array', items: { type: ['boolean', 'null'] } },
          'z.array(z.boolean().nullable())',
        ],
        [
          { type: 'array', nullable: true, items: { type: ['boolean', 'null'] } },
          'z.array(z.boolean().nullable()).nullable()',
        ],
        [{ type: 'array', items: { type: 'object' } }, 'z.array(z.object({}))'],
        [{ type: 'array', items: { type: 'object' } }, 'z.array(z.object({}))'],
        [
          { type: 'array', items: { type: 'object', nullable: true } },
          'z.array(z.object({}).nullable())',
        ],
        [
          { type: 'array', items: { type: ['object', 'null'] } },
          'z.array(z.object({}).nullable())',
        ],
        [
          { type: 'array', nullable: true, items: { type: ['object', 'null'] } },
          'z.array(z.object({}).nullable()).nullable()',
        ],
        [
          {
            type: 'array',
            items: {
              type: 'array',
              items: { type: 'string' },
            },
          },
          'z.array(z.array(z.string()))',
        ],
        [{ type: 'array', items: { type: 'string' }, minItems: 1 }, 'z.array(z.string()).min(1)'],
        [{ type: 'array', items: { type: 'string' }, maxItems: 10 }, 'z.array(z.string()).max(10)'],
        [
          { type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 10 },
          'z.array(z.string()).min(1).max(10)',
        ],
        [
          { type: 'array', items: { type: 'string' }, minItems: 5, maxItems: 5 },
          'z.array(z.string()).length(5)',
        ],
        [
          {
            type: 'array',
            items: {
              anyOf: [
                {
                  type: 'string',
                },
                {
                  type: 'number',
                },
                {
                  type: 'boolean',
                },
              ],
            },
          },
          'z.array(z.union([z.string(),z.number(),z.boolean()]))',
        ],
      ])('zodToOpenAPI(%o) → %s', (input, expected) => {
        expect(zodToOpenAPI(input)).toBe(expected)
      })

      // object
      describe('object', () => {
        it.concurrent.each<[Schema, string]>([
          [{ type: 'object' }, 'z.object({})'],
          [{ type: 'object', nullable: true }, 'z.object({}).nullable()'],
          [{ type: ['object', 'null'] }, 'z.object({}).nullable()'],
          [
            { type: 'object', properties: { foo: { type: 'string' } }, required: ['foo'] },
            'z.object({foo:z.string()})',
          ],
          [
            {
              type: 'object',
              properties: { foo: { type: 'string' } },
              required: ['foo'],
              nullable: true,
            },
            'z.object({foo:z.string()}).nullable()',
          ],
          [
            { type: 'object', properties: { foo: { type: 'string' } }, required: ['foo'] },
            'z.object({foo:z.string()})',
          ],
          [
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['A', 'B', 'C'],
                },
              },
              required: ['type'],
              discriminator: {
                propertyName: 'type',
              },
            },
            'z.object({type:z.enum(["A","B","C"])})',
          ],
          [
            {
              type: 'object',
              properties: {
                test: {
                  type: 'string',
                },
              },
              required: ['test'],
              additionalProperties: false,
            },
            'z.strictObject({test:z.string()})',
          ],

          [
            {
              type: 'object',
              properties: {
                test: {
                  type: 'string',
                },
              },
              required: ['test'],
              additionalProperties: true,
            },
            'z.looseObject({test:z.string()})',
          ],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      describe('date', () => {
        it.concurrent.each<[Schema, string]>([
          [{ type: 'date' }, 'z.date()'],
          [{ type: 'date', nullable: true }, 'z.date().nullable()'],
          [{ type: ['date', 'null'] }, 'z.date().nullable()'],
          [{ type: 'date', default: '2023-01-01' }, 'z.date().default(new Date("2023-01-01"))'],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      // null
      describe('null', () => {
        it.concurrent.each<[Schema, string]>([
          [{ type: 'null' }, 'z.null().nullable()'],
          [{ type: 'null', nullable: true }, 'z.null().nullable()'],
          [{ type: ['null'] }, 'z.null().nullable()'],
          [{ type: 'null', default: 'test' }, 'z.null().default("test").nullable()'],
          [{ type: ['null'], default: 'test' }, 'z.null().default("test").nullable()'],
          [
            { type: 'null', nullable: true, default: 'test' },
            'z.null().default("test").nullable()',
          ],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      describe('any', () => {
        it.concurrent.each<[Schema, string]>([
          [
            {
              // biome-ignore lint: test
              type: 'any' as any,
            },
            'z.any()',
          ],

          [
            {
              // biome-ignore lint: test
              type: 'any' as any,
              nullable: true,
            },
            'z.any().nullable()',
          ],
          [
            {
              // biome-ignore lint: test
              type: ['any' as any, 'null'],
            },
            'z.any().nullable()',
          ],
          [
            {
              // biome-ignore lint: test
              type: 'any' as any,
              default: 'test',
            },
            'z.any().default("test")',
          ],
          [
            {
              // biome-ignore lint: test
              type: 'any' as any,
              nullable: true,
              default: 'test',
            },
            'z.any().default("test").nullable()',
          ],
          [
            {
              // biome-ignore lint: test
              type: ['any' as any, 'null'],
              default: 'test',
            },
            'z.any().default("test").nullable()',
          ],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })
    })
  })
})
