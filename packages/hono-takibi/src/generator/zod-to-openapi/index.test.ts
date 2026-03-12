import { describe, expect, it } from 'vitest'
import type { Schema } from '../../openapi/index.js'
import { zodToOpenAPI } from './index.js'

describe('zodToOpenAPI', () => {
  describe('ref', () => {
    it.concurrent.each([
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
      [{ type: 'array', items: { $ref: '#/components/schemas/Test' } }, 'z.array(TestSchema)'],
    ])('zodToOpenAPI(%o) → %s', (input, expected) => {
      expect(zodToOpenAPI(input as Schema)).toBe(expected)
    })
  })

  describe('prefixItems (tuple)', () => {
    it.concurrent.each<[Schema, string]>([
      // Basic tuple
      [
        {
          type: 'array',
          prefixItems: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
        },
        'z.tuple([z.string(),z.number(),z.boolean()])',
      ],
      // Tuple with $ref
      [
        {
          type: 'array',
          prefixItems: [{ $ref: '#/components/schemas/Name' }, { type: 'number' }],
        },
        'z.tuple([NameSchema,z.number()])',
      ],
      // Tuple with description
      [
        {
          type: 'array',
          prefixItems: [{ type: 'string' }, { type: 'number' }],
          description: 'A tuple of name and age',
        },
        'z.tuple([z.string(),z.number()]).openapi({"description":"A tuple of name and age"})',
      ],
    ])('zodToOpenAPI(%o) → %s', (input, expected) => {
      expect(zodToOpenAPI(input as Schema)).toBe(expected)
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
        'z.xor([z.object({kind:z.literal("A")}).openapi({"required":["kind"]}),z.object({kind:z.literal("B")}).openapi({"required":["kind"]})]).nullable()',
      ],
      [
        {
          type: 'object',
          oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
        },
        'z.xor([ASchema,BSchema])',
      ],
      [
        {
          type: 'object',
          oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
          nullable: true,
        },
        'z.xor([ASchema,BSchema]).nullable()',
      ],
      [
        {
          type: ['object', 'null'],
          oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
        },
        'z.xor([ASchema,BSchema]).nullable()',
      ],
      // x-oneOf-message
      [
        {
          oneOf: [{ type: 'string' }, { type: 'number' }],
          'x-oneOf-message': 'いずれか1つを指定',
        },
        'z.xor([z.string(),z.number()],{error:"いずれか1つを指定"})',
      ],
      // x-oneOf-message with $ref
      [
        {
          oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
          'x-oneOf-message': 'AかBのいずれか',
        },
        'z.xor([ASchema,BSchema],{error:"AかBのいずれか"})',
      ],
    ])('zodToOpenAPI(%o) → %s', (input, expected) => {
      expect(zodToOpenAPI(input)).toBe(expected)
    })

    // discriminatedUnion
    describe('discriminatedUnion', () => {
      it.concurrent.each<[Schema, string]>([
        [
          {
            oneOf: [
              {
                type: 'object',
                properties: { status: { const: 'success' }, data: { type: 'string' } },
                required: ['status', 'data'],
              },
              {
                type: 'object',
                properties: { status: { const: 'failed' }, error: { type: 'string' } },
                required: ['status', 'error'],
              },
            ],
            discriminator: { propertyName: 'status' },
          },
          `z.discriminatedUnion('status',[z.object({status:z.literal("success"),data:z.string()}).openapi({"required":["status","data"]}),z.object({status:z.literal("failed"),error:z.string()}).openapi({"required":["status","error"]})]).openapi({"discriminator":{"propertyName":"status"}})`,
        ],
        [
          {
            oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
            discriminator: { propertyName: 'type' },
          },
          // $ref schemas might use allOf (ZodIntersection), so use z.xor instead of discriminatedUnion
          `z.xor([ASchema,BSchema]).openapi({"discriminator":{"propertyName":"type"}})`,
        ],
        // x-oneOf-message
        [
          {
            oneOf: [
              {
                type: 'object',
                properties: { type: { const: 'a' }, value: { type: 'string' } },
                required: ['type', 'value'],
              },
              {
                type: 'object',
                properties: { type: { const: 'b' }, count: { type: 'number' } },
                required: ['type', 'count'],
              },
            ],
            discriminator: { propertyName: 'type' },
            'x-oneOf-message': '型が不正',
          },
          `z.discriminatedUnion('type',[z.object({type:z.literal("a"),value:z.string()}).openapi({"required":["type","value"]}),z.object({type:z.literal("b"),count:z.number()}).openapi({"required":["type","count"]})],{error:"型が不正"}).openapi({"discriminator":{"propertyName":"type"}})`,
        ],
      ])('zodToOpenAPI(%o) → %s', (input, expected) => {
        expect(zodToOpenAPI(input)).toBe(expected)
      })
    })

    // anyOf
    describe('anyOf', () => {
      it.concurrent.each<[Schema, string]>([
        [
          {
            type: 'object',
            anyOf: [
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
          'z.union([z.object({kind:z.literal("A")}).openapi({"required":["kind"]}),z.object({kind:z.literal("B")}).openapi({"required":["kind"]})]).nullable()',
        ],
        [
          {
            type: 'object',
            anyOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
          },
          'z.union([ASchema,BSchema])',
        ],
        [
          {
            type: 'object',
            anyOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
            nullable: true,
          },
          'z.union([ASchema,BSchema]).nullable()',
        ],
        [
          {
            type: ['object', 'null'],
            anyOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
          },
          'z.union([ASchema,BSchema]).nullable()',
        ],
        // 3-type union
        [
          {
            anyOf: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
          },
          'z.union([z.string(),z.number(),z.boolean()])',
        ],
        // $ref union
        [
          {
            anyOf: [{ $ref: '#/components/schemas/Cat' }, { $ref: '#/components/schemas/Dog' }],
          },
          'z.union([CatSchema,DogSchema])',
        ],
        // nullable union
        [
          {
            anyOf: [{ type: 'string' }, { type: 'number' }],
            nullable: true,
          },
          'z.union([z.string(),z.number()]).nullable()',
        ],
        // x-anyOf-message
        [
          {
            anyOf: [{ type: 'string' }, { type: 'number' }],
            'x-anyOf-message': '文字列か数値を指定',
          },
          'z.union([z.string(),z.number()],{error:"文字列か数値を指定"})',
        ],
        // x-anyOf-message with $ref
        [
          {
            anyOf: [{ $ref: '#/components/schemas/Cat' }, { $ref: '#/components/schemas/Dog' }],
            'x-anyOf-message': '猫か犬を指定',
          },
          'z.union([CatSchema,DogSchema],{error:"猫か犬を指定"})',
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
          'GeoJsonObjectSchema.and(z.object({type:z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"])}).openapi({"required":["type"],"discriminator":{"propertyName":"type"}})).openapi({"description":"Abstract type for all GeoJSon object except Feature and FeatureCollection\\n","externalDocs":{"url":"https://tools.ietf.org/html/rfc7946#section-3"}})',
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
          `GeoJsonObjectSchema.and(z.object({geometry:GeometrySchema.nullable(),properties:z.object({}).nullable(),id:z.xor([z.number(),z.string()]).exactOptional()}).openapi({"required":["geometry","properties"]})).openapi({"description":"GeoJSon 'Feature' object","externalDocs":{"url":"https://tools.ietf.org/html/rfc7946#section-3.2"}})`,
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
          'z.object({a:z.string()}).openapi({"required":["a"]}).and(z.object({b:z.string()}).openapi({"required":["b"]}))',
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
          'z.object({a:z.string()}).openapi({"required":["a"]}).and(z.object({b:z.string()}).openapi({"required":["b"]})).nullable()',
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
          'z.object({a:z.string()}).openapi({"required":["a"]}).and(z.object({b:z.string()}).openapi({"required":["b"]})).nullable()',
        ],
      ])('zodToOpenAPI(%o) → %s', (input, expected) => {
        expect(zodToOpenAPI(input)).toBe(expected)
      })
    })

    // not
    describe('not', () => {
      describe('not.type (single)', () => {
        it.concurrent.each<[Schema, string]>([
          [{ not: { type: 'string' } }, `z.any().refine((v) => typeof v !== 'string')`],
          [{ not: { type: 'number' } }, `z.any().refine((v) => typeof v !== 'number')`],
          [
            { not: { type: 'integer' } },
            `z.any().refine((v) => typeof v !== 'number' || !Number.isInteger(v))`,
          ],
          [{ not: { type: 'boolean' } }, `z.any().refine((v) => typeof v !== 'boolean')`],
          [{ not: { type: 'array' } }, 'z.any().refine((v) => !Array.isArray(v))'],
          [
            { not: { type: 'object' } },
            `z.any().refine((v) => typeof v !== 'object' || v === null || Array.isArray(v))`,
          ],
          [{ not: { type: 'null' } }, 'z.any().refine((v) => v !== null)'],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      describe('not.const', () => {
        it.concurrent.each<[Schema, string]>([
          [{ not: { const: 'admin' } }, `z.any().refine((v) => v !== "admin")`],
          [{ not: { const: 42 } }, 'z.any().refine((v) => v !== 42)'],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      describe('not.enum', () => {
        it.concurrent.each<[Schema, string]>([
          [{ not: { enum: ['a', 'b', 'c'] } }, `z.any().refine((v) => !["a","b","c"].includes(v))`],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      describe('not.$ref', () => {
        it.concurrent.each<[Schema, string]>([
          [
            { not: { $ref: '#/components/schemas/Forbidden' } },
            'z.any().refine((v) => !ForbiddenSchema.safeParse(v).success)',
          ],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      describe('not.type (array)', () => {
        it.concurrent.each<[Schema, string]>([
          [
            { not: { type: ['string', 'number'] } },
            `z.any().refine((v) => (typeof v !== 'string') && (typeof v !== 'number'))`,
          ],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input as Schema)).toBe(expected)
        })
      })

      describe('not + composition', () => {
        it.concurrent.each<[Schema, string]>([
          [
            { not: { anyOf: [{ type: 'string' }, { type: 'number' }] } },
            'z.any().refine((v) => !z.union([z.string(),z.number()]).safeParse(v).success)',
          ],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input as Schema)).toBe(expected)
        })
      })

      describe('not fallback', () => {
        it.concurrent.each<[Schema, string]>([
          [{ not: {} }, 'z.any()'],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input as Schema)).toBe(expected)
        })
      })

      describe('x-not-message', () => {
        it.concurrent.each<[Schema, string]>([
          // not.type + x-not-message
          [
            { not: { type: 'string' }, 'x-not-message': '文字列は不可' },
            `z.any().refine((v) => typeof v !== 'string',{error:"文字列は不可"})`,
          ],
          // not.const + x-not-message
          [
            { not: { const: 42 }, 'x-not-message': '42は不可' },
            'z.any().refine((v) => v !== 42,{error:"42は不可"})',
          ],
          // not.enum + x-not-message
          [
            { not: { enum: [1, 2, 3] }, 'x-not-message': '1,2,3は不可' },
            'z.any().refine((v) => ![1,2,3].includes(v),{error:"1,2,3は不可"})',
          ],
          // not.$ref + x-not-message
          [
            {
              not: { $ref: '#/components/schemas/Forbidden' },
              'x-not-message': '禁止スキーマ不可',
            },
            'z.any().refine((v) => !ForbiddenSchema.safeParse(v).success,{error:"禁止スキーマ不可"})',
          ],
          // not.type (array) + x-not-message
          [
            { not: { type: ['string', 'number'] }, 'x-not-message': '文字列・数値は不可' },
            `z.any().refine((v) => (typeof v !== 'string') && (typeof v !== 'number'),{error:"文字列・数値は不可"})`,
          ],
          // not + composition + x-not-message
          [
            {
              not: { anyOf: [{ type: 'string' }, { type: 'number' }] },
              'x-not-message': 'union不可',
            },
            'z.any().refine((v) => !z.union([z.string(),z.number()]).safeParse(v).success,{error:"union不可"})',
          ],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input as Schema)).toBe(expected)
        })
      })
    })

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
          'z.string().nullable().default("test")',
        ],
        [{ type: ['string', 'null'], default: 'test' }, 'z.string().nullable().default("test")'],
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
            [{ type: 'number', minimum: 0, exclusiveMinimum: true }, 'z.number().positive()'],
            [{ type: 'number', minimum: 0, exclusiveMinimum: false }, 'z.number().nonnegative()'],
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
              'z.number().nullable().default(100)',
            ],
            [{ type: ['number', 'null'], default: 100 }, 'z.number().nullable().default(100)'],
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
            [{ type: 'integer', default: 100, nullable: true }, 'z.int().nullable().default(100)'],
            [{ type: ['integer', 'null'], default: 100 }, 'z.int().nullable().default(100)'],
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
              'z.int32().nullable().default(100)',
            ],
            [
              { type: ['integer', 'null'], format: 'int32', default: 100 },
              'z.int32().nullable().default(100)',
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
              'z.int64().nullable().default(100n)',
            ],
            [
              { type: ['integer', 'null'], format: 'int64', default: 100 },
              'z.int64().nullable().default(100n)',
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
          [
            { type: 'boolean', default: true, nullable: true },
            'z.boolean().nullable().default(true)',
          ],
          [{ type: ['boolean', 'null'], default: true }, 'z.boolean().nullable().default(true)'],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      // object
      describe('object', () => {
        it.concurrent.each<[Schema, string]>([
          [{ type: 'object' }, 'z.object({})'],
          [{ type: ['object'], nullable: true }, 'z.object({}).nullable()'],
          [{ type: ['object', 'null'] }, 'z.object({}).nullable()'],
          [
            { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
            'z.object({name:z.string()}).openapi({"required":["name"]})',
          ],
          [
            { type: 'object', properties: { name: { type: 'string' } } },
            'z.object({name:z.string().exactOptional()})',
          ],
          [
            {
              type: 'object',
              properties: { name: { type: 'string' }, age: { type: 'integer' } },
              required: ['name'],
            },
            'z.object({name:z.string(),age:z.int().exactOptional()}).openapi({"required":["name"]})',
          ],
          [{ type: 'object', additionalProperties: true }, 'z.looseObject({})'],
          [
            { type: 'object', additionalProperties: { type: 'string' } },
            'z.record(z.string(),z.string())',
          ],
          [{ type: 'object', default: {} }, 'z.object({}).default({})'],
          [{ type: 'object', default: {}, nullable: true }, 'z.object({}).nullable().default({})'],
          [{ type: ['object', 'null'], default: {} }, 'z.object({}).nullable().default({})'],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      // array
      describe('array', () => {
        // biome-ignore lint: test
        it.concurrent.each<[any, string]>([
          [{ type: 'array', items: { type: 'string' } }, 'z.array(z.string())'],
          [{ type: 'array', items: { type: 'number' } }, 'z.array(z.number())'],
          [{ type: 'array', items: { type: 'integer' } }, 'z.array(z.int())'],
          [{ type: 'array', items: { type: 'boolean' } }, 'z.array(z.boolean())'],
          [{ type: 'array', items: { type: 'object' } }, 'z.array(z.object({}))'],
          [
            { type: 'array', items: { type: 'string' }, nullable: true },
            'z.array(z.string()).nullable()',
          ],
          [
            { type: ['array', 'null'], items: { type: 'string' } },
            'z.array(z.string()).nullable()',
          ],
          [{ type: 'array', items: { type: 'string' }, minItems: 1 }, 'z.array(z.string()).min(1)'],
          [
            { type: 'array', items: { type: 'string' }, maxItems: 10 },
            'z.array(z.string()).max(10)',
          ],
          [
            { type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 10 },
            'z.array(z.string()).min(1).max(10)',
          ],
          [
            { type: 'array', items: { type: 'string' }, uniqueItems: true },
            'z.array(z.string()).refine((items)=>new Set(items).size===items.length)',
          ],
          [
            { type: 'array', items: { type: 'string' }, default: [] },
            'z.array(z.string()).default([])',
          ],
          [
            { type: 'array', items: { type: 'string' }, default: [], nullable: true },
            'z.array(z.string()).nullable().default([])',
          ],
          [
            { type: ['array', 'null'], items: { type: 'string' }, default: [] },
            'z.array(z.string()).nullable().default([])',
          ],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      // any
      describe('any', () => {
        // biome-ignore lint: test
        it.concurrent.each<[any, string]>([
          [{ type: 'any' }, 'z.any()'],
          [{ type: 'any', nullable: true }, 'z.any().nullable()'],
          [{ type: ['any', 'null'] }, 'z.any().nullable()'],
          [{ type: 'any', default: 'test' }, 'z.any().default("test")'],
          [{ type: 'any', nullable: true, default: 'test' }, 'z.any().nullable().default("test")'],
          [{ type: ['any', 'null'], default: 'test' }, 'z.any().nullable().default("test")'],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      // null
      describe('null', () => {
        it.concurrent.each<[Schema, string]>([
          [{ type: 'null' }, 'z.null().nullable()'],
          [{ type: ['null'] }, 'z.null().nullable()'],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      // x-* vendor extensions for custom validation messages
      describe('x-* vendor extensions', () => {
        it.concurrent.each<[Schema, string]>([
          // x-error-message on format
          [
            { type: 'string', format: 'email', 'x-error-message': 'Invalid email' },
            'z.email({error:"Invalid email"})',
          ],
          // x-minimum-message / x-maximum-message on string
          [
            {
              type: 'string',
              minLength: 3,
              maxLength: 20,
              'x-minimum-message': '3文字以上',
              'x-maximum-message': '20文字以下',
            },
            'z.string().min(3,{error:"3文字以上"}).max(20,{error:"20文字以下"})',
          ],
          // x-pattern-message on string
          [
            { type: 'string', pattern: '^[a-z]+$', 'x-pattern-message': 'lowercase only' },
            'z.string().regex(/^[a-z]+$/,{error:"lowercase only"})',
          ],
          // x-minimum-message on number
          [
            { type: 'number', minimum: 0, 'x-minimum-message': 'Must be >= 0' },
            'z.number().min(0,{error:"Must be >= 0"})',
          ],
          // x-maximum-message on number
          [
            { type: 'number', maximum: 100, 'x-maximum-message': 'Must be <= 100' },
            'z.number().max(100,{error:"Must be <= 100"})',
          ],
          // x-minimum-message on integer
          [
            { type: 'integer', minimum: 1, 'x-minimum-message': '1以上' },
            'z.int().min(1,{error:"1以上"})',
          ],
          // x-maximum-message on int64
          [
            { type: 'integer', format: 'int64', maximum: 100, 'x-maximum-message': '100以下' },
            'z.int64().max(100n,{error:"100以下"})',
          ],
          // x-error-message with description (description goes to .openapi(), message stays in validator)
          [
            {
              type: 'string',
              format: 'email',
              'x-error-message': 'メール不正',
              description: 'User email',
            },
            'z.email({error:"メール不正"}).openapi({"description":"User email"})',
          ],
          // x-size-message with fixed length
          [
            { type: 'string', minLength: 5, maxLength: 5, 'x-size-message': 'Exactly 5' },
            'z.string().length(5,{error:"Exactly 5"})',
          ],
          // x-error-message on base z.string() (no format)
          [{ type: 'string', 'x-error-message': '文字列必須' }, 'z.string({error:"文字列必須"})'],
          // x-error-message on z.number()
          [{ type: 'number', 'x-error-message': '数値必須' }, 'z.number({error:"数値必須"})'],
          // x-error-message on z.number() with format
          [
            { type: 'number', format: 'float', 'x-error-message': 'float必須' },
            'z.float32({error:"float必須"})',
          ],
          // x-error-message on z.int()
          [{ type: 'integer', 'x-error-message': '整数必須' }, 'z.int({error:"整数必須"})'],
          // x-error-message on z.boolean()
          [{ type: 'boolean', 'x-error-message': 'ブール必須' }, 'z.boolean({error:"ブール必須"})'],
          // x-error-message on z.array()
          [
            { type: 'array', items: { type: 'string' }, 'x-error-message': '配列必須' },
            'z.array(z.string(),{error:"配列必須"})',
          ],
          // x-error-message on z.null()
          [
            { type: 'null', 'x-error-message': 'null必須' },
            'z.null({error:"null必須"}).nullable()',
          ],
          // x-error-message on z.enum()
          [
            { enum: ['A', 'B'], 'x-error-message': '無効な値' },
            'z.enum(["A","B"],{error:"無効な値"})',
          ],
          // x-error-message on single string enum → z.literal
          [
            { enum: ['only'], 'x-error-message': 'onlyのみ' },
            `z.literal('only',{error:"onlyのみ"})`,
          ],
          // x-error-message on number enum → z.union (individual literals also get errArg)
          [
            { enum: [1, 2, 3], 'x-error-message': '1-3のみ' },
            'z.union([z.literal(1,{error:"1-3のみ"}),z.literal(2,{error:"1-3のみ"}),z.literal(3,{error:"1-3のみ"})],{error:"1-3のみ"})',
          ],
          // x-error-message on single number enum → z.literal
          [
            { type: 'number', enum: [42], 'x-error-message': '42のみ' },
            'z.literal(42,{error:"42のみ"})',
          ],
          // x-error-message on boolean enum → z.union (individual literals also get errArg)
          [
            { type: 'boolean', enum: [true, false], 'x-error-message': 'ブール値' },
            'z.union([z.literal(true,{error:"ブール値"}),z.literal(false,{error:"ブール値"})],{error:"ブール値"})',
          ],
          // x-error-message with arrow function (no args)
          [
            { type: 'string', 'x-error-message': '()=>"required"' },
            'z.string({error:()=>"required"})',
          ],
          // x-minimum-message with arrow function (issue arg)
          [
            {
              type: 'number',
              minimum: 0,
              'x-minimum-message': '(iss)=>iss.input===undefined?"required":"invalid"',
            },
            'z.number().min(0,{error:(iss)=>iss.input===undefined?"required":"invalid"})',
          ],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      // x-*-message on array (min → x-minimum-message, max → x-maximum-message, length → x-size-message)
      describe('x-*-message on array', () => {
        // biome-ignore lint: test
        it.concurrent.each<[any, string]>([
          // x-minimum-message on .min()
          [
            {
              type: 'array',
              items: { type: 'number' },
              minItems: 1,
              'x-minimum-message': 'At least 1',
            },
            'z.array(z.number()).min(1,{error:"At least 1"})',
          ],
          // x-maximum-message on .max()
          [
            {
              type: 'array',
              items: { type: 'number' },
              maxItems: 5,
              'x-maximum-message': 'At most 5',
            },
            'z.array(z.number()).max(5,{error:"At most 5"})',
          ],
          // x-minimum-message + x-maximum-message on .min().max()
          [
            {
              type: 'array',
              items: { type: 'string' },
              minItems: 1,
              maxItems: 10,
              'x-minimum-message': '1個以上',
              'x-maximum-message': '10個以下',
            },
            'z.array(z.string()).min(1,{error:"1個以上"}).max(10,{error:"10個以下"})',
          ],
          // x-size-message on .length() (minItems === maxItems)
          [
            {
              type: 'array',
              items: { type: 'string' },
              minItems: 3,
              maxItems: 3,
              'x-size-message': 'Exactly 3',
            },
            'z.array(z.string()).length(3,{error:"Exactly 3"})',
          ],
          // x-pattern-message on uniqueItems .refine()
          [
            {
              type: 'array',
              items: { type: 'string' },
              uniqueItems: true,
              'x-pattern-message': '重複不可',
            },
            'z.array(z.string()).refine((items)=>new Set(items).size===items.length,{error:"重複不可"})',
          ],
          // x-error-message on z.array() constructor
          [
            {
              type: 'array',
              items: { type: 'string' },
              'x-error-message': '配列必須',
            },
            'z.array(z.string(),{error:"配列必須"})',
          ],
          // x-error-message on z.tuple() (prefixItems)
          [
            {
              type: 'array',
              prefixItems: [{ type: 'string' }, { type: 'number' }],
              'x-error-message': 'タプル不正',
            },
            'z.tuple([z.string(),z.number()],{error:"タプル不正"})',
          ],
          // all combined: x-error-message + x-minimum-message + x-maximum-message + x-pattern-message
          [
            {
              type: 'array',
              items: { type: 'string' },
              minItems: 1,
              maxItems: 5,
              uniqueItems: true,
              'x-error-message': '配列必須',
              'x-minimum-message': '1個以上',
              'x-maximum-message': '5個以下',
              'x-pattern-message': '重複不可',
            },
            'z.array(z.string(),{error:"配列必須"}).min(1,{error:"1個以上"}).max(5,{error:"5個以下"}).refine((items)=>new Set(items).size===items.length,{error:"重複不可"})',
          ],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      // x-minimum-message / x-maximum-message on object
      describe('x-minimum/maximum-message on object', () => {
        it.concurrent.each<[Schema, string]>([
          // minProperties → x-minimum-message
          [
            { type: 'object', minProperties: 1, 'x-minimum-message': 'At least 1' },
            'z.object({}).refine((o)=>Object.keys(o).length>=1,{error:"At least 1"})',
          ],
          // maxProperties → x-maximum-message
          [
            { type: 'object', maxProperties: 5, 'x-maximum-message': 'At most 5' },
            'z.object({}).refine((o)=>Object.keys(o).length<=5,{error:"At most 5"})',
          ],
          // both
          [
            {
              type: 'object',
              minProperties: 2,
              maxProperties: 10,
              'x-minimum-message': '2個以上',
              'x-maximum-message': '10個以下',
            },
            'z.object({}).refine((o)=>Object.keys(o).length>=2,{error:"2個以上"}).refine((o)=>Object.keys(o).length<=10,{error:"10個以下"})',
          ],
          // dependentRequired → x-error-message
          [
            {
              type: 'object',
              dependentRequired: { foo: ['bar'] },
              'x-error-message': 'fooにはbarが必要',
            },
            `z.object({}).refine((o)=>!('foo' in o)||('bar' in o),{error:"fooにはbarが必要"})`,
          ],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      // x-pattern-message on object
      describe('x-pattern-message on object', () => {
        it.concurrent.each<[Schema, string]>([
          [
            {
              type: 'object',
              propertyNames: { pattern: '^[a-z]+$' },
              'x-pattern-message': 'lowercase keys',
            },
            'z.object({}).refine((o)=>Object.keys(o).every((k)=>new RegExp("^[a-z]+$").test(k)),{error:"lowercase keys"})',
          ],
          [
            {
              type: 'object',
              patternProperties: { '^S_': { type: 'string' } },
              'x-pattern-message': 'S_ keys must be strings',
            },
            'z.object({}).refine((o)=>Object.entries(o).every(([k,v])=>!new RegExp("^S_").test(k)||z.string().safeParse(v).success),{error:"S_ keys must be strings"})',
          ],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      // x-error-message on const (z.literal)
      describe('x-error-message on const', () => {
        it.concurrent.each<[Schema, string]>([
          [
            { const: 'fixed', 'x-error-message': 'fixedのみ' },
            `z.literal("fixed",{error:"fixedのみ"})`,
          ],
          [{ const: 42, 'x-error-message': '42のみ' }, 'z.literal(42,{error:"42のみ"})'],
          [{ const: true, 'x-error-message': 'trueのみ' }, 'z.literal(true,{error:"trueのみ"})'],
          // No x-error-message → existing behavior
          [{ const: 'fixed' }, `z.literal("fixed")`],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      // x-error-message on multipleOf
      describe('x-error-message on multipleOf', () => {
        it.concurrent.each<[Schema, string]>([
          [
            { type: 'number', multipleOf: 2, 'x-error-message': '偶数のみ' },
            'z.number({error:"偶数のみ"}).multipleOf(2,{error:"偶数のみ"})',
          ],
          [
            { type: 'integer', multipleOf: 3, 'x-error-message': '3の倍数' },
            'z.int({error:"3の倍数"}).multipleOf(3,{error:"3の倍数"})',
          ],
          [
            { type: 'integer', format: 'int64', multipleOf: 5, 'x-error-message': '5の倍数' },
            'z.int64({error:"5の倍数"}).multipleOf(5n,{error:"5の倍数"})',
          ],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      // x-error-message on date
      describe('x-error-message on date', () => {
        it.concurrent.each<[Schema, string]>([
          [{ type: 'date', 'x-error-message': '日付必須' }, 'z.date({error:"日付必須"})'],
          // No x-error-message → existing behavior
          [{ type: 'date' }, 'z.date()'],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      // with description and example
      describe('with meta info', () => {
        it.concurrent.each<[Schema, string]>([
          [
            { type: 'string', description: 'A string' },
            'z.string().openapi({"description":"A string"})',
          ],
          [{ type: 'string', example: 'hello' }, 'z.string().openapi({"example":"hello"})'],
          [
            { type: 'string', description: 'A string', example: 'hello' },
            'z.string().openapi({"description":"A string","example":"hello"})',
          ],
          [
            { type: 'number', description: 'A number' },
            'z.number().openapi({"description":"A number"})',
          ],
          [
            { type: 'integer', description: 'An integer' },
            'z.int().openapi({"description":"An integer"})',
          ],
          [
            { type: 'boolean', description: 'A boolean' },
            'z.boolean().openapi({"description":"A boolean"})',
          ],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })
    })
  })

  describe('readonly parameter', () => {
    it.concurrent.each<[Schema, string]>([
      // readonly array of strings
      [
        { type: 'array', items: { type: 'string' } },
        'z.array(z.string()).readonly()',
      ],
      // readonly array of numbers
      [
        { type: 'array', items: { type: 'number' } },
        'z.array(z.number()).readonly()',
      ],
      // readonly array of refs
      [
        { type: 'array', items: { $ref: '#/components/schemas/Item' } },
        'z.array(ItemSchema).readonly()',
      ],
      // readonly tuple (prefixItems)
      [
        {
          type: 'array',
          prefixItems: [{ type: 'string' }, { type: 'number' }],
        },
        'z.tuple([z.string(),z.number()]).readonly()',
      ],
      // readonly object (required array triggers .openapi)
      [
        {
          type: 'object',
          properties: { name: { type: 'string' } },
          required: ['name'],
        },
        'z.object({name:z.string()}).readonly().openapi({"required":["name"]})',
      ],
      // readonly does not affect primitives
      [{ type: 'string' }, 'z.string()'],
      [{ type: 'number' }, 'z.number()'],
      [{ type: 'boolean' }, 'z.boolean()'],
    ])('zodToOpenAPI(%o, undefined, true) → %s', (input, expected) => {
      expect(zodToOpenAPI(input, undefined, true)).toBe(expected)
    })
  })

  describe('meta parameter', () => {
    it.concurrent('passes isOptional to wrap', () => {
      const result = zodToOpenAPI({ type: 'string' }, { isOptional: true })
      expect(result).toBe('z.string().exactOptional()')
    })

    it.concurrent('isOptional does not affect nested schemas', () => {
      const result = zodToOpenAPI(
        {
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
          required: ['name'],
        },
        { isOptional: true },
      )
      expect(result).toBe('z.object({name:z.string()}).exactOptional().openapi({"required":["name"]})')
    })

    it.concurrent('ref with isOptional', () => {
      const result = zodToOpenAPI(
        { $ref: '#/components/schemas/User' },
        { isOptional: true },
      )
      expect(result).toBe('UserSchema.exactOptional()')
    })
  })

  describe('edge cases', () => {
    it.concurrent('throws on undefined schema', () => {
      expect(() => zodToOpenAPI(undefined as unknown as Schema)).toThrow(
        'Schema is undefined',
      )
    })

    it.concurrent('empty oneOf returns z.any()', () => {
      expect(zodToOpenAPI({ oneOf: [] })).toBe('z.any()')
    })

    it.concurrent('empty anyOf returns z.any()', () => {
      expect(zodToOpenAPI({ anyOf: [] })).toBe('z.any()')
    })

    it.concurrent('const with object value', () => {
      const result = zodToOpenAPI({ const: { key: 'value' } })
      expect(result).toBe('z.custom<{"key":"value"}>()')
    })

    it.concurrent('const with array value', () => {
      const result = zodToOpenAPI({ const: [1, 2, 3] })
      expect(result).toBe('z.custom<[1,2,3]>()')
    })

    it.concurrent('const with string value', () => {
      expect(zodToOpenAPI({ const: 'hello' })).toBe('z.literal("hello")')
    })

    it.concurrent('const with number value', () => {
      expect(zodToOpenAPI({ const: 42 })).toBe('z.literal(42)')
    })

    it.concurrent('const with boolean value', () => {
      expect(zodToOpenAPI({ const: true })).toBe('z.literal(true)')
    })

    it.concurrent('const with null value', () => {
      expect(zodToOpenAPI({ const: null })).toBe('z.literal(null)')
    })

    it.concurrent('array with minItems and maxItems', () => {
      expect(
        zodToOpenAPI({ type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 10 }),
      ).toBe('z.array(z.string()).min(1).max(10)')
    })

    it.concurrent('array with uniqueItems', () => {
      expect(
        zodToOpenAPI({ type: 'array', items: { type: 'number' }, uniqueItems: true }),
      ).toBe('z.array(z.number()).refine((items)=>new Set(items).size===items.length)')
    })

    it.concurrent('readonly array with minItems', () => {
      expect(
        zodToOpenAPI({ type: 'array', items: { type: 'string' }, minItems: 1 }, undefined, true),
      ).toBe('z.array(z.string()).min(1).readonly()')
    })

    it.concurrent('type null', () => {
      expect(zodToOpenAPI({ type: 'null' })).toBe('z.null().nullable()')
    })
  })
})
