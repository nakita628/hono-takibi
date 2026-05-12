import { describe, expect, it } from 'vite-plus/test'
import { z } from 'zod'

import type { Schema } from '../../openapi/index.js'
import { zodToOpenAPI } from './index.js'

// Helper: compile generated Zod source string into an actual ZodTypeAny so
// runtime safeParse() behavior can be asserted alongside codegen snapshots.
// `.openapi(...)` calls are stripped because @hono/zod-openapi's `extendZod`
// is not loaded in this unit-test context.

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
      // Basic prefixItems — emitted as z.array(z.unknown()).superRefine(...) so
      // shorter arrays remain valid per JSON Schema 2020-12 §10.3.1.1
      // ("does not constrain the length of the array").
      [
        {
          type: 'array',
          prefixItems: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
        },
        'z.array(z.unknown()).superRefine((arr,ctx)=>{const Prefix=[z.string(),z.number(),z.boolean()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const valid=Schema.safeParse(arr[i]);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:[i,...issue.path]})}})',
      ],
      // prefixItems with $ref
      [
        {
          type: 'array',
          prefixItems: [{ $ref: '#/components/schemas/Name' }, { type: 'number' }],
        },
        'z.array(z.unknown()).superRefine((arr,ctx)=>{const Prefix=[NameSchema,z.number()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const valid=Schema.safeParse(arr[i]);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:[i,...issue.path]})}})',
      ],
      // prefixItems with description
      [
        {
          type: 'array',
          prefixItems: [{ type: 'string' }, { type: 'number' }],
          description: 'A tuple of name and age',
        },
        'z.array(z.unknown()).superRefine((arr,ctx)=>{const Prefix=[z.string(),z.number()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const valid=Schema.safeParse(arr[i]);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:[i,...issue.path]})}}).openapi({"description":"A tuple of name and age"})',
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
        'z.xor([z.unknown().superRefine((v,ctx)=>{if(typeof v===\'object\'&&v!==null&&!Array.isArray(v)){if(!Object.hasOwn(v,"kind"))ctx.addIssue({code:\'custom\',message:\'missing required: kind\'});if(Object.hasOwn(v,"kind")){const Schema=z.literal("A");if(!Schema.safeParse(Reflect.get(v,"kind")).success)ctx.addIssue({code:\'custom\',message:\'invalid property\'})}}}).openapi({"required":["kind"]}),z.unknown().superRefine((v,ctx)=>{if(typeof v===\'object\'&&v!==null&&!Array.isArray(v)){if(!Object.hasOwn(v,"kind"))ctx.addIssue({code:\'custom\',message:\'missing required: kind\'});if(Object.hasOwn(v,"kind")){const Schema=z.literal("B");if(!Schema.safeParse(Reflect.get(v,"kind")).success)ctx.addIssue({code:\'custom\',message:\'invalid property\'})}}}).openapi({"required":["kind"]})]).nullable()',
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
          'z.union([z.unknown().superRefine((v,ctx)=>{if(typeof v===\'object\'&&v!==null&&!Array.isArray(v)){if(!Object.hasOwn(v,"kind"))ctx.addIssue({code:\'custom\',message:\'missing required: kind\'});if(Object.hasOwn(v,"kind")){const Schema=z.literal("A");if(!Schema.safeParse(Reflect.get(v,"kind")).success)ctx.addIssue({code:\'custom\',message:\'invalid property\'})}}}).openapi({"required":["kind"]}),z.unknown().superRefine((v,ctx)=>{if(typeof v===\'object\'&&v!==null&&!Array.isArray(v)){if(!Object.hasOwn(v,"kind"))ctx.addIssue({code:\'custom\',message:\'missing required: kind\'});if(Object.hasOwn(v,"kind")){const Schema=z.literal("B");if(!Schema.safeParse(Reflect.get(v,"kind")).success)ctx.addIssue({code:\'custom\',message:\'invalid property\'})}}}).openapi({"required":["kind"]})]).nullable()',
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
        it.concurrent.each<[Schema, string]>([[{ not: {} }, 'z.never()']])(
          'zodToOpenAPI(%o) → %s',
          (input, expected) => {
            expect(zodToOpenAPI(input as Schema)).toBe(expected)
          },
        )
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
          // P1: x-coerce
          [{ type: 'boolean', 'x-coerce': true }, 'z.coerce.boolean()'],
          [
            { type: 'boolean', 'x-coerce': true, 'x-error-message': 'ブール必須' },
            'z.coerce.boolean({error:"ブール必須"})',
          ],
          // P2: x-catch / x-prefault / x-freeze (wrap.ts)
          [{ type: 'boolean', 'x-catch': false }, 'z.boolean().catch(false)'],
          [{ type: 'boolean', 'x-prefault': true }, 'z.boolean().prefault(true)'],
          [
            { type: 'boolean', default: true, 'x-catch': false },
            'z.boolean().default(true).catch(false)',
          ],
          [
            { type: 'boolean', 'x-prefault': true, 'x-catch': false },
            'z.boolean().prefault(true).catch(false)',
          ],
          [{ type: 'object', 'x-freeze': true } as Schema, 'z.object({}).readonly()'],
          [{ type: 'string', 'x-freeze': true } as Schema, 'z.string().readonly()'],
          [
            { type: 'string', 'x-catch': 'fallback', 'x-brand': 'Tag' } as Schema,
            'z.string().catch("fallback").brand<"Tag">()',
          ],
          // v2.4: x-refine / x-superRefine
          [
            {
              type: 'string',
              'x-refine': [{ fn: '(v) => v.length > 5', message: 'Too short' }],
            } as Schema,
            'z.string().refine((v) => v.length > 5,{message:"Too short"})',
          ],
          [
            {
              type: 'string',
              'x-refine': [
                { fn: '(v) => v.length > 5', message: 'Too short' },
                { fn: '(v) => /^[a-z]/.test(v)', message: 'Lowercase start' },
              ],
            } as Schema,
            'z.string().refine((v) => v.length > 5,{message:"Too short"}).refine((v) => /^[a-z]/.test(v),{message:"Lowercase start"})',
          ],
          [
            {
              type: 'string',
              'x-refine': [{ fn: '(v) => v !== "x"', path: ['name'] }],
            } as Schema,
            'z.string().refine((v) => v !== "x",{path:["name"]})',
          ],
          [
            {
              type: 'string',
              'x-superRefine': [
                "(v, ctx) => { if (v === 'forbidden') ctx.addIssue({code:'custom',message:'no'}) }",
              ],
            } as Schema,
            "z.string().superRefine((v, ctx) => { if (v === 'forbidden') ctx.addIssue({code:'custom',message:'no'}) })",
          ],
          // v2.4: x-codec for date (param names match Zod official docs)
          [
            { type: 'string', format: 'date-time', 'x-codec': 'date' } as Schema,
            'z.codec(z.iso.datetime(),z.date(),{decode:(isoString)=>new Date(isoString),encode:(date)=>date.toISOString()})',
          ],
          // v2.5: x-required-message + x-error-message
          [
            {
              type: 'string',
              'x-error-message': 'Type wrong',
              'x-required-message': 'Required',
            } as Schema,
            'z.string({error:(issue)=>issue.input===undefined?"Required":"Type wrong"})',
          ],
          [
            { type: 'string', 'x-required-message': 'Required only' } as Schema,
            'z.string({error:(issue)=>issue.input===undefined?"Required only":undefined})',
          ],
          // v2.5: x-const-message
          [
            { const: 'fixed', 'x-const-message': 'Must be "fixed"' } as Schema,
            'z.literal("fixed",{error:"Must be \\"fixed\\""})',
          ],
          // v2.5: contains (default minContains = 1)
          [
            {
              type: 'array',
              items: { type: 'number' },
              contains: { const: 5 },
            } as Schema,
            'z.array(z.number()).superRefine((arr,ctx)=>{const Schema=z.literal(5);const matched=arr.filter((i)=>Schema.safeParse(i).success).length;if(matched<1)ctx.addIssue({code:"custom",message:"Expected at least 1 item matching contains schema, got "+matched})})',
          ],
          // v3.0: contains + minContains + maxContains → 2 separate refines for
          // independent error messages (silent-bug fix).
          [
            {
              type: 'array',
              items: { type: 'number' },
              contains: { type: 'number', minimum: 0 },
              minContains: 2,
              maxContains: 5,
            } as Schema,
            'z.array(z.number()).superRefine((arr,ctx)=>{const Schema=z.number().min(0);const matched=arr.filter((i)=>Schema.safeParse(i).success).length;if(matched<2)ctx.addIssue({code:"custom",message:"Expected at least 2 matching items, got "+matched});if(matched>5)ctx.addIssue({code:"custom",message:"Expected at most 5 matching items, got "+matched})})',
          ],
          // v2.5: x-uniqueItems-message
          [
            {
              type: 'array',
              items: { type: 'string' },
              uniqueItems: true,
              'x-uniqueItems-message': 'Duplicates not allowed',
            } as Schema,
            'z.array(z.string()).superRefine((items,ctx)=>{const seen=new Map();for(const [i,v] of items.entries()){const key=JSON.stringify(v);if(seen.has(key))ctx.addIssue({code:"custom",path:[i],message:"Duplicates not allowed"});else seen.set(key,i)}})',
          ],
          // v2.5: x-additionalProperties-message on strictObject
          [
            {
              type: 'object',
              properties: { name: { type: 'string' } },
              required: ['name'],
              additionalProperties: false,
              'x-additionalProperties-message': 'No extra fields',
            } as Schema,
            `z.strictObject({name:z.string()},{error:(issue)=>issue.code==='unrecognized_keys'?"No extra fields":undefined}).openapi({"required":["name"]})`,
          ],
          // $comment is silently dropped
          [{ type: 'string', $comment: 'this is a note' } as Schema, 'z.string()'],
          // v2.6: contentEncoding base64 only
          [
            { type: 'string', contentEncoding: 'base64' } as Schema,
            'z.base64().transform((b64)=>typeof atob==="function"?atob(b64):Buffer.from(b64,"base64").toString("utf8"))',
          ],
          // v2.6 / v3.1 fix #7: base64 + JSON contentMediaType + contentSchema.
          // JSON.parse is wrapped in try/catch with ctx.addIssue so SyntaxError
          // surfaces as a Zod issue rather than an uncaught throw at safeParse time.
          [
            {
              type: 'string',
              contentEncoding: 'base64',
              contentMediaType: 'application/json',
              contentSchema: {
                type: 'object',
                properties: { name: { type: 'string' } },
                required: ['name'],
              },
            } as Schema,
            'z.base64().transform((b64,ctx)=>{try{const s=typeof atob==="function"?atob(b64):Buffer.from(b64,"base64").toString("utf8");return JSON.parse(s)}catch(e){ctx.addIssue({code:"custom",message:"invalid base64-json: "+(e instanceof Error?e.message:String(e))});return z.NEVER}}).pipe(z.object({name:z.string()}).openapi({"required":["name"]}))',
          ],
          // v2.6: dependentSchemas. v3.1: superRefine + closure-captured Schema;
          // inner sub-issues propagate with original path/code instead of
          // collapsing into a single `custom` at the parent.
          [
            {
              type: 'object',
              properties: { creditCard: { type: 'string' } },
              dependentSchemas: {
                creditCard: {
                  properties: { billingAddress: { type: 'string' } },
                  required: ['billingAddress'],
                },
              },
            } as Schema,
            'z.object({creditCard:z.string().exactOptional()}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"creditCard"))return;const Schema=z.unknown().superRefine((v,ctx)=>{if(typeof v===\'object\'&&v!==null&&!Array.isArray(v)){if(!Object.hasOwn(v,"billingAddress"))ctx.addIssue({code:\'custom\',message:\'missing required: billingAddress\'});if(Object.hasOwn(v,"billingAddress")){const Schema=z.string();if(!Schema.safeParse(Reflect.get(v,"billingAddress")).success)ctx.addIssue({code:\'custom\',message:\'invalid property\'})}}}).openapi({"required":["billingAddress"]});const valid=Schema.safeParse(o);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:issue.path})})',
          ],
          // v2.6/v3.0: if / then / else
          // v3.0 Phase A: then/else with type-less { required: [...] } now uses
          // z.unknown().superRefine() for keyword-independent semantics.
          // v3.1: outer if/then/else uses superRefine + closure-captured branch
          // so inner issues from the branch survive.
          /* eslint-disable unicorn/no-thenable -- testing JSON Schema then keyword */
          // biome-ignore lint/suspicious/noThenProperty: testing JSON Schema if-then-else
          [
            {
              type: 'object',
              if: { properties: { type: { const: 'premium' } }, required: ['type'] },
              then: { required: ['premiumFeature'] },
              else: { required: ['basicFeature'] },
            } as Schema,
            'z.object({}).superRefine((o,ctx)=>{const If=z.unknown().superRefine((v,ctx)=>{if(typeof v===\'object\'&&v!==null&&!Array.isArray(v)){if(!Object.hasOwn(v,"type"))ctx.addIssue({code:\'custom\',message:\'missing required: type\'});if(Object.hasOwn(v,"type")){const Schema=z.literal("premium");if(!Schema.safeParse(Reflect.get(v,"type")).success)ctx.addIssue({code:\'custom\',message:\'invalid property\'})}}}).openapi({"required":["type"]});const ifOk=If.safeParse(o).success;const Branch=ifOk?z.unknown().superRefine((v,ctx)=>{if(typeof v===\'object\'&&v!==null&&!Array.isArray(v)){if(!Object.hasOwn(v,"premiumFeature"))ctx.addIssue({code:\'custom\',message:\'missing required: premiumFeature\'})}}).openapi({"required":["premiumFeature"]}):z.unknown().superRefine((v,ctx)=>{if(typeof v===\'object\'&&v!==null&&!Array.isArray(v)){if(!Object.hasOwn(v,"basicFeature"))ctx.addIssue({code:\'custom\',message:\'missing required: basicFeature\'})}}).openapi({"required":["basicFeature"]});if(!Branch)return;const valid=Branch.safeParse(o);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:issue.path})})',
          ],
          /* eslint-enable unicorn/no-thenable */
          // v3.0: unevaluatedProperties: false (runtime annotation tracking)
          [
            {
              type: 'object',
              properties: { name: { type: 'string' } },
              unevaluatedProperties: false,
            } as Schema,
            'z.looseObject({name:z.string().exactOptional()}).superRefine((o,ctx)=>{const e=new Set();for(const k of ["name"])e.add(k);for(const k of Object.keys(o)){if(!e.has(k))ctx.addIssue({code:"custom",path:[k],message:"Unknown property: "+k})}})',
          ],
          // v2.6: unevaluatedItems: false → length-cap inside the superRefine
          [
            {
              type: 'array',
              prefixItems: [{ type: 'string' }, { type: 'number' }],
              unevaluatedItems: false,
            } as Schema,
            'z.array(z.unknown()).superRefine((arr,ctx)=>{const Prefix=[z.string(),z.number()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const valid=Schema.safeParse(arr[i]);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:[i,...issue.path]})};for(let i=Prefix.length;i<arr.length;i++)ctx.addIssue({code:"custom",path:[i],message:"Unevaluated item at index "+i})})',
          ],
          // v2.7: JSON Schema 2020-12 Core meta keywords pass-through
          [
            { type: 'string', $schema: 'https://json-schema.org/draft/2020-12/schema' } as Schema,
            'z.string().openapi({"$schema":"https://json-schema.org/draft/2020-12/schema"})',
          ],
          [
            { type: 'string', $id: 'https://example.com/schemas/user.json' } as Schema,
            'z.string().openapi({"$id":"https://example.com/schemas/user.json"})',
          ],
          [
            { type: 'string', $anchor: 'user-name' } as Schema,
            'z.string().openapi({"$anchor":"user-name"})',
          ],
          [
            { type: 'string', $dynamicAnchor: 'meta' } as Schema,
            'z.string().openapi({"$dynamicAnchor":"meta"})',
          ],
          [
            { type: 'string', $dynamicRef: '#meta' } as Schema,
            'z.string().openapi({"$dynamicRef":"#meta"})',
          ],
          [
            {
              type: 'string',
              $vocabulary: { 'https://json-schema.org/draft/2020-12/vocab/core': true },
            } as Schema,
            'z.string().openapi({"$vocabulary":{"https://json-schema.org/draft/2020-12/vocab/core":true}})',
          ],
          // v2.7 fix: $defs pass-through (review finding from yuri 2.2)
          [
            {
              type: 'string',
              $defs: { Email: { type: 'string', format: 'email' } },
            } as Schema,
            'z.string().openapi({"$defs":{"Email":{"type":"string","format":"email"}}})',
          ],
          // contentEncoding additional variants (review finding from loid C / yuri 2.1)
          [
            { type: 'string', contentEncoding: 'base64url' } as Schema,
            'z.base64url().transform((b64)=>typeof atob==="function"?atob(b64):Buffer.from(b64,"base64").toString("utf8"))',
          ],
          // binary/7bit/8bit/quoted-printable fall back to plain z.string() (no decode)
          [{ type: 'string', contentEncoding: 'binary' } as Schema, 'z.string()'],
          [{ type: 'string', contentEncoding: '7bit' } as Schema, 'z.string()'],
          // contentSchema with $ref (review finding from yuri 3.1 — dead code fix).
          // v3.1 fix #7: JSON.parse wrapped in try/catch + ctx.addIssue.
          [
            {
              type: 'string',
              contentEncoding: 'base64',
              contentMediaType: 'application/json',
              contentSchema: { $ref: '#/components/schemas/Inner' },
            } as Schema,
            'z.base64().transform((b64,ctx)=>{try{const s=typeof atob==="function"?atob(b64):Buffer.from(b64,"base64").toString("utf8");return JSON.parse(s)}catch(e){ctx.addIssue({code:"custom",message:"invalid base64-json: "+(e instanceof Error?e.message:String(e))});return z.NEVER}}).pipe(InnerSchema)',
          ],
          // unevaluatedProperties: Schema form (v3.0 runtime tracking)
          [
            {
              type: 'object',
              properties: { name: { type: 'string' } },
              unevaluatedProperties: { type: 'string' },
            } as Schema,
            'z.looseObject({name:z.string().exactOptional()}).superRefine((o,ctx)=>{const e=new Set();for(const k of ["name"])e.add(k);const Schema=z.string();for(const [k,v] of Object.entries(o)){if(e.has(k))continue;const valid=Schema.safeParse(v);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:[k,...issue.path]})}})',
          ],
          // unevaluatedItems: Schema form (P0 re-fix: emitted via superRefine so
          // shorter arrays remain valid per JSON Schema 2020-12 §10.3.1.1, while
          // trailing items are still validated by the rest schema)
          [
            {
              type: 'array',
              prefixItems: [{ type: 'string' }],
              unevaluatedItems: { type: 'number' },
            } as Schema,
            'z.array(z.unknown()).superRefine((arr,ctx)=>{const Prefix=[z.string()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const valid=Schema.safeParse(arr[i]);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:[i,...issue.path]})};const Rest=z.number();for(const [i,v] of arr.slice(Prefix.length).entries()){const valid=Rest.safeParse(v);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:[Prefix.length+i,...issue.path]})}})',
          ],
          // dependentSchemas: multiple keys
          // v3.1: each entry emits its own superRefine, sub-issues propagate
          [
            {
              type: 'object',
              properties: { a: { type: 'string' }, b: { type: 'string' } },
              dependentSchemas: {
                a: { type: 'object', required: ['b'], properties: { b: { type: 'string' } } },
                b: { type: 'object', required: ['a'], properties: { a: { type: 'string' } } },
              },
            } as Schema,
            'z.object({a:z.string().exactOptional(),b:z.string().exactOptional()}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"a"))return;const Schema=z.object({b:z.string()}).openapi({"required":["b"]});const valid=Schema.safeParse(o);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:issue.path})}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"b"))return;const Schema=z.object({a:z.string()}).openapi({"required":["a"]});const valid=Schema.safeParse(o);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:issue.path})})',
          ],
          // if-then only (no else) — review finding from loid B / yuri 2.2
          // v3.1: when else absent, Branch is undefined for the false case → no-op
          // biome-ignore lint/suspicious/noThenProperty: testing JSON Schema if-then
          // eslint-disable-next-line unicorn/no-thenable -- testing JSON Schema then keyword
          [
            {
              type: 'object',
              properties: { kind: { type: 'string' }, x: { type: 'string' } },
              if: { type: 'object', properties: { kind: { const: 'a' } }, required: ['kind'] },
              then: { type: 'object', required: ['x'], properties: { x: { type: 'string' } } },
            } as Schema,
            'z.object({kind:z.string().exactOptional(),x:z.string().exactOptional()}).superRefine((o,ctx)=>{const If=z.object({kind:z.literal("a")}).openapi({"required":["kind"]});const ifOk=If.safeParse(o).success;const Branch=ifOk?z.object({x:z.string()}).openapi({"required":["x"]}):undefined;if(!Branch)return;const valid=Branch.safeParse(o);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:issue.path})})',
          ],
          // if-else only (no then)
          [
            {
              type: 'object',
              properties: { kind: { type: 'string' }, x: { type: 'string' } },
              if: { type: 'object', properties: { kind: { const: 'a' } }, required: ['kind'] },
              else: { type: 'object', required: ['x'], properties: { x: { type: 'string' } } },
            } as Schema,
            'z.object({kind:z.string().exactOptional(),x:z.string().exactOptional()}).superRefine((o,ctx)=>{const If=z.object({kind:z.literal("a")}).openapi({"required":["kind"]});const ifOk=If.safeParse(o).success;const Branch=ifOk?undefined:z.object({x:z.string()}).openapi({"required":["x"]});if(!Branch)return;const valid=Branch.safeParse(o);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:issue.path})})',
          ],
          // v2.8 edge cases
          // contentEncoding: 8bit / quoted-printable → string fallback
          [{ type: 'string', contentEncoding: '8bit' } as Schema, 'z.string()'],
          [{ type: 'string', contentEncoding: 'quoted-printable' } as Schema, 'z.string()'],
          // base64url + JSON + contentSchema (v3.1 fix #7: try/catch + ctx.addIssue).
          [
            {
              type: 'string',
              contentEncoding: 'base64url',
              contentMediaType: 'application/json',
              contentSchema: { type: 'array', items: { type: 'number' } },
            } as Schema,
            'z.base64url().transform((b64,ctx)=>{try{const s=typeof atob==="function"?atob(b64):Buffer.from(b64,"base64").toString("utf8");return JSON.parse(s)}catch(e){ctx.addIssue({code:"custom",message:"invalid base64-json: "+(e instanceof Error?e.message:String(e))});return z.NEVER}}).pipe(z.array(z.number()))',
          ],
          // contentMediaType non-json text family (no JSON parse, UTF-8 decode preserved).
          [
            { type: 'string', contentEncoding: 'base64', contentMediaType: 'text/plain' } as Schema,
            'z.base64().transform((b64)=>typeof atob==="function"?atob(b64):Buffer.from(b64,"base64").toString("utf8"))',
          ],
          // v3.1 fix #5: binary MIME (image/*, audio/*, video/*, application/octet-stream)
          // → Uint8Array (UTF-8 decoding would corrupt non-text bytes — e.g. PNG magic
          // 0x89 expands to 0xC2 0x89).
          [
            { type: 'string', contentEncoding: 'base64', contentMediaType: 'image/png' } as Schema,
            'z.base64().transform((b64)=>typeof atob==="function"?Uint8Array.from(atob(b64),(c)=>c.charCodeAt(0)):new Uint8Array(Buffer.from(b64,"base64")))',
          ],
          [
            { type: 'string', contentEncoding: 'base64', contentMediaType: 'audio/mpeg' } as Schema,
            'z.base64().transform((b64)=>typeof atob==="function"?Uint8Array.from(atob(b64),(c)=>c.charCodeAt(0)):new Uint8Array(Buffer.from(b64,"base64")))',
          ],
          [
            { type: 'string', contentEncoding: 'base64', contentMediaType: 'video/mp4' } as Schema,
            'z.base64().transform((b64)=>typeof atob==="function"?Uint8Array.from(atob(b64),(c)=>c.charCodeAt(0)):new Uint8Array(Buffer.from(b64,"base64")))',
          ],
          [
            {
              type: 'string',
              contentEncoding: 'base64',
              contentMediaType: 'application/octet-stream',
            } as Schema,
            'z.base64().transform((b64)=>typeof atob==="function"?Uint8Array.from(atob(b64),(c)=>c.charCodeAt(0)):new Uint8Array(Buffer.from(b64,"base64")))',
          ],
          // base64url + binary MIME mirrors base64 binary handling.
          [
            {
              type: 'string',
              contentEncoding: 'base64url',
              contentMediaType: 'image/jpeg',
            } as Schema,
            'z.base64url().transform((b64)=>typeof atob==="function"?Uint8Array.from(atob(b64),(c)=>c.charCodeAt(0)):new Uint8Array(Buffer.from(b64,"base64")))',
          ],
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
            'z.array(z.string()).superRefine((items,ctx)=>{const seen=new Map();for(const [i,v] of items.entries()){const key=JSON.stringify(v);if(seen.has(key))ctx.addIssue({code:"custom",path:[i],message:"Duplicate of index "+seen.get(key)});else seen.set(key,i)}})',
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
          // x-minLength-message / x-maxLength-message on string (v3.0: split from numeric)
          [
            {
              type: 'string',
              minLength: 3,
              maxLength: 20,
              'x-minLength-message': '3文字以上',
              'x-maxLength-message': '20文字以下',
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
          // x-error-message on number enum → z.union with error on outer wrapper only
          [
            { enum: [1, 2, 3], 'x-error-message': '1-3のみ' },
            'z.union([z.literal(1),z.literal(2),z.literal(3)],{error:"1-3のみ"})',
          ],
          // x-error-message on single number enum → z.literal
          [
            { type: 'number', enum: [42], 'x-error-message': '42のみ' },
            'z.literal(42,{error:"42のみ"})',
          ],
          // x-error-message on boolean enum → z.union with error on outer wrapper only
          [
            { type: 'boolean', enum: [true, false], 'x-error-message': 'ブール値' },
            'z.union([z.literal(true),z.literal(false)],{error:"ブール値"})',
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

      // v3.0: x-*-message on array — split from numeric/string umbrellas
      describe('x-*-message on array', () => {
        it.concurrent.each<[any, string]>([
          // x-minItems-message on .min()
          [
            {
              type: 'array',
              items: { type: 'number' },
              minItems: 1,
              'x-minItems-message': 'At least 1',
            },
            'z.array(z.number()).min(1,{error:"At least 1"})',
          ],
          // x-maxItems-message on .max()
          [
            {
              type: 'array',
              items: { type: 'number' },
              maxItems: 5,
              'x-maxItems-message': 'At most 5',
            },
            'z.array(z.number()).max(5,{error:"At most 5"})',
          ],
          // x-minItems-message + x-maxItems-message
          [
            {
              type: 'array',
              items: { type: 'string' },
              minItems: 1,
              maxItems: 10,
              'x-minItems-message': '1個以上',
              'x-maxItems-message': '10個以下',
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
          // x-uniqueItems-message on uniqueItems .refine()
          [
            {
              type: 'array',
              items: { type: 'string' },
              uniqueItems: true,
              'x-uniqueItems-message': '重複不可',
            },
            'z.array(z.string()).superRefine((items,ctx)=>{const seen=new Map();for(const [i,v] of items.entries()){const key=JSON.stringify(v);if(seen.has(key))ctx.addIssue({code:"custom",path:[i],message:"重複不可"});else seen.set(key,i)}})',
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
          // x-error-message on prefixItems → propagates to outer z.array(z.unknown())
          [
            {
              type: 'array',
              prefixItems: [{ type: 'string' }, { type: 'number' }],
              'x-error-message': 'タプル不正',
            },
            'z.array(z.unknown(),{error:"タプル不正"}).superRefine((arr,ctx)=>{const Prefix=[z.string(),z.number()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const valid=Schema.safeParse(arr[i]);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:[i,...issue.path]})}})',
          ],
          // all combined: separate messages per keyword
          [
            {
              type: 'array',
              items: { type: 'string' },
              minItems: 1,
              maxItems: 5,
              uniqueItems: true,
              'x-error-message': '配列必須',
              'x-minItems-message': '1個以上',
              'x-maxItems-message': '5個以下',
              'x-uniqueItems-message': '重複不可',
            },
            'z.array(z.string(),{error:"配列必須"}).min(1,{error:"1個以上"}).max(5,{error:"5個以下"}).superRefine((items,ctx)=>{const seen=new Map();for(const [i,v] of items.entries()){const key=JSON.stringify(v);if(seen.has(key))ctx.addIssue({code:"custom",path:[i],message:"重複不可"});else seen.set(key,i)}})',
          ],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      // v3.0: x-minProperties-message / x-maxProperties-message on object
      describe('x-minProperties/maxProperties-message on object', () => {
        it.concurrent.each<[Schema, string]>([
          [
            { type: 'object', minProperties: 1, 'x-minProperties-message': 'At least 1' },
            'z.object({}).refine((o)=>Object.keys(o).length>=1,{error:"At least 1"})',
          ],
          [
            { type: 'object', maxProperties: 5, 'x-maxProperties-message': 'At most 5' },
            'z.object({}).refine((o)=>Object.keys(o).length<=5,{error:"At most 5"})',
          ],
          [
            {
              type: 'object',
              minProperties: 2,
              maxProperties: 10,
              'x-minProperties-message': '2個以上',
              'x-maxProperties-message': '10個以下',
            },
            'z.object({}).refine((o)=>Object.keys(o).length>=2,{error:"2個以上"}).refine((o)=>Object.keys(o).length<=10,{error:"10個以下"})',
          ],
          // dependentRequired → x-error-message fallback
          // v3.1: superRefine + per-dep issue at path:[d]
          [
            {
              type: 'object',
              dependentRequired: { foo: ['bar'] },
              'x-error-message': 'fooにはbarが必要',
            },
            `z.object({}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"foo"))return;if(!Object.hasOwn(o,"bar"))ctx.addIssue({code:'custom',message:"fooにはbarが必要",path:["bar"]})})`,
          ],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      // v3.0: x-propertyNames-message / x-patternProperties-message on object
      describe('x-propertyNames-message / x-patternProperties-message on object', () => {
        it.concurrent.each<[Schema, string]>([
          [
            {
              type: 'object',
              propertyNames: { pattern: '^[a-z]+$' },
              'x-propertyNames-message': 'lowercase keys',
            },
            'z.looseObject({}).superRefine((o,ctx)=>{const regex=new RegExp("^[a-z]+$");for(const k of Object.keys(o)){if(!regex.test(k))ctx.addIssue({code:"custom",path:[k],message:"lowercase keys"})}})',
          ],
          [
            {
              type: 'object',
              patternProperties: { '^S_': { type: 'string' } },
              'x-patternProperties-message': 'S_ keys must be strings',
            },
            'z.looseObject({}).superRefine((o,ctx)=>{const regex=new RegExp("^S_");const Schema=z.string();for(const [k,v] of Object.entries(o)){if(!regex.test(k))continue;const valid=Schema.safeParse(v);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:[k,...issue.path],message:"S_ keys must be strings"})}})',
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
      [{ type: 'array', items: { type: 'string' } }, 'z.array(z.string()).readonly()'],
      // readonly array of numbers
      [{ type: 'array', items: { type: 'number' } }, 'z.array(z.number()).readonly()'],
      // readonly array of refs
      [
        { type: 'array', items: { $ref: '#/components/schemas/Item' } },
        'z.array(ItemSchema).readonly()',
      ],
      // readonly prefixItems
      [
        {
          type: 'array',
          prefixItems: [{ type: 'string' }, { type: 'number' }],
        },
        'z.array(z.unknown()).superRefine((arr,ctx)=>{const Prefix=[z.string(),z.number()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const valid=Schema.safeParse(arr[i]);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:[i,...issue.path]})}}).readonly()',
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
      expect(result).toBe(
        'z.object({name:z.string()}).exactOptional().openapi({"required":["name"]})',
      )
    })

    it.concurrent('ref with isOptional', () => {
      const result = zodToOpenAPI({ $ref: '#/components/schemas/User' }, { isOptional: true })
      expect(result).toBe('UserSchema.exactOptional()')
    })
  })

  describe('edge cases', () => {
    it.concurrent('throws on undefined schema', () => {
      expect(() => zodToOpenAPI(undefined as unknown as Schema)).toThrow('Schema is undefined')
    })

    it.concurrent('empty oneOf returns z.any()', () => {
      expect(zodToOpenAPI({ oneOf: [] })).toBe('z.any()')
    })

    it.concurrent('empty anyOf returns z.any()', () => {
      expect(zodToOpenAPI({ anyOf: [] })).toBe('z.any()')
    })

    it.concurrent('const with object value (v3.0: typeless-refine for deep equality)', () => {
      const result = zodToOpenAPI({ const: { key: 'value' } })
      expect(result).toBe(
        'z.unknown().superRefine((v,ctx)=>{if(JSON.stringify({"key":"value"})!==JSON.stringify(v))ctx.addIssue({code:\'custom\',message:\'const mismatch\'})})',
      )
    })

    it.concurrent('const with array value (v3.0: typeless-refine for deep equality)', () => {
      const result = zodToOpenAPI({ const: [1, 2, 3] })
      expect(result).toBe(
        "z.unknown().superRefine((v,ctx)=>{if(JSON.stringify([1,2,3])!==JSON.stringify(v))ctx.addIssue({code:'custom',message:'const mismatch'})})",
      )
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
      expect(zodToOpenAPI({ type: 'array', items: { type: 'number' }, uniqueItems: true })).toBe(
        'z.array(z.number()).superRefine((items,ctx)=>{const seen=new Map();for(const [i,v] of items.entries()){const key=JSON.stringify(v);if(seen.has(key))ctx.addIssue({code:"custom",path:[i],message:"Duplicate of index "+seen.get(key)});else seen.set(key,i)}})',
      )
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

  describe('x-brand', () => {
    it.concurrent('string with x-brand', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-brand': 'UserId' } as Schema)).toBe(
        'z.string().brand<"UserId">()',
      )
    })

    it.concurrent('string with format uuid and x-brand', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'uuid', 'x-brand': 'UserId' } as Schema)).toBe(
        'z.uuid().brand<"UserId">()',
      )
    })

    it.concurrent('number with x-brand', () => {
      expect(zodToOpenAPI({ type: 'number', 'x-brand': 'Price' } as Schema)).toBe(
        'z.number().brand<"Price">()',
      )
    })

    it.concurrent('integer with x-brand', () => {
      expect(zodToOpenAPI({ type: 'integer', 'x-brand': 'Count' } as Schema)).toBe(
        'z.int().brand<"Count">()',
      )
    })

    it.concurrent('string with email format, min/max and x-brand', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          format: 'email',
          minLength: 5,
          maxLength: 100,
          'x-brand': 'Email',
        } as Schema),
      ).toBe('z.email().min(5).max(100).brand<"Email">()')
    })

    it.concurrent('string with x-brand and description (openapi metadata)', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          'x-brand': 'UserId',
          description: 'Unique user identifier',
        } as Schema),
      ).toBe('z.string().brand<"UserId">().openapi({"description":"Unique user identifier"})')
    })

    it.concurrent('nullable string with x-brand', () => {
      expect(zodToOpenAPI({ type: 'string', nullable: true, 'x-brand': 'UserId' } as Schema)).toBe(
        'z.string().nullable().brand<"UserId">()',
      )
    })

    it.concurrent('boolean with x-brand', () => {
      expect(zodToOpenAPI({ type: 'boolean', 'x-brand': 'Flag' } as Schema)).toBe(
        'z.boolean().brand<"Flag">()',
      )
    })

    it.concurrent('array with x-brand', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          items: { type: 'string' },
          'x-brand': 'Tags',
        } as Schema),
      ).toBe('z.array(z.string()).brand<"Tags">()')
    })

    it.concurrent('object with x-brand', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            street: { type: 'string' },
            city: { type: 'string' },
          },
          required: ['street', 'city'],
          'x-brand': 'Address',
        } as Schema),
      ).toBe(
        'z.object({street:z.string(),city:z.string()}).brand<"Address">().openapi({"required":["street","city"]})',
      )
    })

    it.concurrent('object with x-brand and optional property', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
          },
          required: ['id'],
          'x-brand': 'User',
        } as Schema),
      ).toBe(
        'z.object({id:z.string(),name:z.string().exactOptional()}).brand<"User">().openapi({"required":["id"]})',
      )
    })

    it.concurrent('array with minItems and x-brand', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          items: { type: 'number' },
          minItems: 1,
          'x-brand': 'Scores',
        } as Schema),
      ).toBe('z.array(z.number()).min(1).brand<"Scores">()')
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // v3.2: user-reported sample schemas — codegen snapshot + runtime
  //       safeParse behavior (path / code / message) paired per case.
  //       JSON Schema 2020-12 spec compliance verified end-to-end.
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 sample #1: prefixItems + unevaluatedItems (Schema rest)', () => {
    // ── codegen ──
    it.concurrent('codegen: superRefine + index-based path', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          prefixItems: [{ type: 'string' }, { type: 'boolean' }],
          unevaluatedItems: { type: 'integer' },
        }),
      ).toBe(
        'z.array(z.unknown()).superRefine((arr,ctx)=>{const Prefix=[z.string(),z.boolean()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const valid=Schema.safeParse(arr[i]);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:[i,...issue.path]})};const Rest=z.int();for(const [i,v] of arr.slice(Prefix.length).entries()){const valid=Rest.safeParse(v);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:[Prefix.length+i,...issue.path]})}})',
      )
    })

    // ── runtime: each test re-defines the Zod schema by hand to mirror codegen ──
    it.concurrent('runtime: empty array PASSES (spec §10.3.1.1: no length constraint)', () => {
      const Schema = z.array(z.unknown()).superRefine((arr, ctx) => {
        const Prefix = [z.string(), z.boolean()]
        for (const [i, S] of Prefix.slice(0, arr.length).entries()) {
          const valid = S.safeParse(arr[i])
          if (!valid.success)
            for (const issue of valid.error.issues)
              ctx.addIssue({ ...issue, path: [i, ...issue.path] })
        }
        const Rest = z.int()
        for (const [i, v] of arr.slice(Prefix.length).entries()) {
          const valid = Rest.safeParse(v)
          if (!valid.success)
            for (const issue of valid.error.issues)
              ctx.addIssue({ ...issue, path: [Prefix.length + i, ...issue.path] })
        }
      })
      expect(Schema.safeParse([]).success).toBe(true)
      expect(Schema.safeParse(['a']).success).toBe(true)
      expect(Schema.safeParse(['a', true]).success).toBe(true)
      expect(Schema.safeParse(['a', true, 1, 2]).success).toBe(true)
    })
    it.concurrent('runtime: rest type violation → path[2], invalid_type', () => {
      const Schema = z.array(z.unknown()).superRefine((arr, ctx) => {
        const Prefix = [z.string(), z.boolean()]
        for (const [i, S] of Prefix.slice(0, arr.length).entries()) {
          const valid = S.safeParse(arr[i])
          if (!valid.success)
            for (const issue of valid.error.issues)
              ctx.addIssue({ ...issue, path: [i, ...issue.path] })
        }
        const Rest = z.int()
        for (const [i, v] of arr.slice(Prefix.length).entries()) {
          const valid = Rest.safeParse(v)
          if (!valid.success)
            for (const issue of valid.error.issues)
              ctx.addIssue({ ...issue, path: [Prefix.length + i, ...issue.path] })
        }
      })
      const valid = Schema.safeParse(['a', true, 'x'])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues[0].path).toStrictEqual([2])
        expect(valid.error.issues[0].code).toBe('invalid_type')
        expect(valid.error.issues[0].message).toBe(
          'Invalid input: expected number, received string',
        )
      }
    })
    it.concurrent('runtime: prefix[0] type violation → full issue toStrictEqual', () => {
      const Schema = z.array(z.unknown()).superRefine((arr, ctx) => {
        const Prefix = [z.string(), z.boolean()]
        for (const [i, S] of Prefix.slice(0, arr.length).entries()) {
          const valid = S.safeParse(arr[i])
          if (!valid.success)
            for (const issue of valid.error.issues)
              ctx.addIssue({ ...issue, path: [i, ...issue.path] })
        }
        const Rest = z.int()
        for (const [i, v] of arr.slice(Prefix.length).entries()) {
          const valid = Rest.safeParse(v)
          if (!valid.success)
            for (const issue of valid.error.issues)
              ctx.addIssue({ ...issue, path: [Prefix.length + i, ...issue.path] })
        }
      })
      const valid = Schema.safeParse([1, false])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: [0],
            message: 'Invalid input: expected string, received number',
          },
        ])
      }
    })
  })

  describe('v3.2 sample #2: contains + minContains + maxContains (dynamic message)', () => {
    // Hand-defined schema mirroring codegen output (used by runtime tests below).
    const ContainsSchema = z.array(z.any()).superRefine((arr, ctx) => {
      const Inner = z.int()
      const matched = arr.filter((i) => Inner.safeParse(i).success).length
      if (matched < 2)
        ctx.addIssue({
          code: 'custom',
          message: `Expected at least 2 matching items, got ${matched}`,
        })
      if (matched > 3)
        ctx.addIssue({
          code: 'custom',
          message: `Expected at most 3 matching items, got ${matched}`,
        })
    })

    // ── codegen ──
    it.concurrent('codegen: superRefine + dynamic ${matched} message', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          contains: { type: 'integer' },
          minContains: 2,
          maxContains: 3,
        }),
      ).toBe(
        'z.array(z.any()).superRefine((arr,ctx)=>{const Schema=z.int();const matched=arr.filter((i)=>Schema.safeParse(i).success).length;if(matched<2)ctx.addIssue({code:"custom",message:"Expected at least 2 matching items, got "+matched});if(matched>3)ctx.addIssue({code:"custom",message:"Expected at most 3 matching items, got "+matched})})',
      )
    })

    // ── runtime ──
    it.concurrent('runtime: 2 matches PASS', () => {
      expect(ContainsSchema.safeParse([1, 2]).success).toBe(true)
    })
    it.concurrent('runtime: 3 matches (boundary) PASS', () => {
      expect(ContainsSchema.safeParse([1, 2, 3]).success).toBe(true)
    })
    it.concurrent('runtime: 0 matches → "got 0" dynamic message, path:[]', () => {
      const valid = ContainsSchema.safeParse([])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues[0].path).toStrictEqual([])
        expect(valid.error.issues[0].message).toBe('Expected at least 2 matching items, got 0')
      }
    })
    it.concurrent('runtime: 1 match → "got 1" dynamic message', () => {
      const valid = ContainsSchema.safeParse([1, 'x'])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues[0].message).toBe('Expected at least 2 matching items, got 1')
      }
    })
    it.concurrent('runtime: 4 matches → "got 4" max violation', () => {
      const valid = ContainsSchema.safeParse([1, 2, 3, 4])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues[0].message).toBe('Expected at most 3 matching items, got 4')
      }
    })
    it.concurrent('runtime: matches counted ignoring non-integer items', () => {
      // 2 ints + 1 string = matched=2, satisfies minContains
      expect(ContainsSchema.safeParse([1, 'x', 2]).success).toBe(true)
    })
  })

  describe('v3.2 sample #3: patternProperties (multiple patterns, superRefine)', () => {
    const PatternPropsSchema = z
      .looseObject({})
      .superRefine((o, ctx) => {
        const regex = /^S:/
        const Inner = z.string()
        for (const [k, v] of Object.entries(o)) {
          if (!regex.test(k)) continue
          const valid = Inner.safeParse(v)
          if (!valid.success)
            for (const issue of valid.error.issues)
              ctx.addIssue({ ...issue, path: [k, ...issue.path] })
        }
      })
      .superRefine((o, ctx) => {
        const regex = /^I:/
        const Inner = z.int()
        for (const [k, v] of Object.entries(o)) {
          if (!regex.test(k)) continue
          const valid = Inner.safeParse(v)
          if (!valid.success)
            for (const issue of valid.error.issues)
              ctx.addIssue({ ...issue, path: [k, ...issue.path] })
        }
      })

    it.concurrent('codegen: superRefine per pattern, closure-captured regex', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          patternProperties: {
            '^S:': { type: 'string' },
            '^I:': { type: 'integer' },
          },
        }),
      ).toBe(
        'z.looseObject({}).superRefine((o,ctx)=>{const regex=new RegExp("^S:");const Schema=z.string();for(const [k,v] of Object.entries(o)){if(!regex.test(k))continue;const valid=Schema.safeParse(v);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:[k,...issue.path]})}}).superRefine((o,ctx)=>{const regex=new RegExp("^I:");const Schema=z.int();for(const [k,v] of Object.entries(o)){if(!regex.test(k))continue;const valid=Schema.safeParse(v);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:[k,...issue.path]})}})',
      )
    })

    it.concurrent('runtime: empty object PASSES', () => {
      expect(PatternPropsSchema.safeParse({}).success).toBe(true)
    })
    it.concurrent('runtime: pattern matches with correct types PASS', () => {
      expect(PatternPropsSchema.safeParse({ 'S:a': 'x', 'I:b': 1 }).success).toBe(true)
    })
    it.concurrent('runtime: ^S: with number → full issue toStrictEqual', () => {
      const valid = PatternPropsSchema.safeParse({ 'S:a': 1 })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: ['S:a'],
            message: 'Invalid input: expected string, received number',
          },
        ])
      }
    })
    it.concurrent('runtime: pattern non-match keys are silently allowed', () => {
      expect(PatternPropsSchema.safeParse({ other: 'anything' }).success).toBe(true)
    })
    it.concurrent('runtime: multiple violations → full issues array toStrictEqual', () => {
      const valid = PatternPropsSchema.safeParse({ 'S:a': 1, 'I:b': 'x' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: ['S:a'],
            message: 'Invalid input: expected string, received number',
          },
          {
            expected: 'number',
            code: 'invalid_type',
            path: ['I:b'],
            message: 'Invalid input: expected number, received string',
          },
        ])
      }
    })
  })

  describe('v3.2 sample #4: writeOnly (OAS metadata, no parse impact)', () => {
    // writeOnly is OAS-only metadata; the Zod runtime is identical to a plain
    // optional string. .openapi({writeOnly:true}) is omitted in this hand
    // definition because it requires extendZod() which is not loaded here.
    const WriteOnlySchema = z.object({
      name: z.string().exactOptional(),
      password: z.string().exactOptional(),
    })

    it.concurrent('codegen: writeOnly survives via .openapi({writeOnly:true})', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            name: { type: 'string' },
            password: { type: 'string', writeOnly: true },
          },
        }),
      ).toBe(
        'z.object({name:z.string().exactOptional(),password:z.string().exactOptional().openapi({"writeOnly":true})})',
      )
    })

    it.concurrent('runtime: empty object PASSES (both fields optional)', () => {
      expect(WriteOnlySchema.safeParse({}).success).toBe(true)
    })
    it.concurrent('runtime: password-only PASSES (writeOnly does NOT enforce write-only at parse)', () => {
      expect(WriteOnlySchema.safeParse({ password: 'p' }).success).toBe(true)
    })
    it.concurrent('runtime: full object PASSES', () => {
      expect(WriteOnlySchema.safeParse({ name: 'a', password: 'p' }).success).toBe(true)
    })
  })

  describe('v3.2 sample #5: contentEncoding base64 + contentMediaType image/png (binary)', () => {
    const ImageSchema = z.object({
      image: z
        .base64()
        .transform((b64) =>
          typeof atob === 'function'
            ? Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))
            : new Uint8Array(Buffer.from(b64, 'base64')),
        )
        .exactOptional(),
    })

    it.concurrent('codegen: binary MIME emits Uint8Array.from(atob) — NOT toString("utf8")', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            image: {
              type: 'string',
              contentEncoding: 'base64',
              contentMediaType: 'image/png',
            },
          },
        }),
      ).toBe(
        'z.object({image:z.base64().transform((b64)=>typeof atob==="function"?Uint8Array.from(atob(b64),(c)=>c.charCodeAt(0)):new Uint8Array(Buffer.from(b64,"base64"))).exactOptional()})',
      )
    })

    it.concurrent('runtime: PNG magic bytes round-trip preserved (no UTF-8 corruption)', () => {
      const pngBytes = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
      const b64 = Buffer.from(pngBytes).toString('base64')
      const valid = ImageSchema.safeParse({ image: b64 })
      expect(valid.success).toBe(true)
      if (valid.success) {
        const decoded = (valid.data as { image: Uint8Array }).image
        expect(decoded).toBeInstanceOf(Uint8Array)
        expect(Array.from(decoded)).toStrictEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
      }
    })
    it.concurrent('runtime: missing image key PASSES (exactOptional)', () => {
      expect(ImageSchema.safeParse({}).success).toBe(true)
    })
  })

  describe('v3.2 sample #7: contentSchema + JSON (nested validation via .pipe)', () => {
    const ContentSchemaSchema = z.object({
      style: z
        .base64()
        .transform((b64, ctx) => {
          try {
            const s =
              typeof atob === 'function' ? atob(b64) : Buffer.from(b64, 'base64').toString('utf8')
            return JSON.parse(s)
          } catch (e) {
            ctx.addIssue({
              code: 'custom',
              message: `invalid base64-json: ${e instanceof Error ? e.message : String(e)}`,
            })
            return z.NEVER
          }
        })
        .pipe(z.object({ name: z.string().exactOptional() }))
        .exactOptional(),
    })

    it.concurrent('codegen: JSON parse guarded by ctx.addIssue, piped to inner schema', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            style: {
              type: 'string',
              contentEncoding: 'base64',
              contentMediaType: 'application/json',
              contentSchema: {
                type: 'object',
                properties: { name: { type: 'string' } },
              },
            },
          },
        }),
      ).toBe(
        'z.object({style:z.base64().transform((b64,ctx)=>{try{const s=typeof atob==="function"?atob(b64):Buffer.from(b64,"base64").toString("utf8");return JSON.parse(s)}catch(e){ctx.addIssue({code:"custom",message:"invalid base64-json: "+(e instanceof Error?e.message:String(e))});return z.NEVER}}).pipe(z.object({name:z.string().exactOptional()})).exactOptional()})',
      )
    })

    it.concurrent('runtime: valid base64-encoded JSON PASSES', () => {
      const b64 = Buffer.from(JSON.stringify({ name: 'taro' })).toString('base64')
      expect(ContentSchemaSchema.safeParse({ style: b64 }).success).toBe(true)
    })
    it.concurrent('runtime: invalid JSON inside b64 → no uncaught throw, path:["style"]', () => {
      const b64 = Buffer.from('not-json').toString('base64')
      let threw = false
      let result: { success: boolean; path?: PropertyKey[]; code?: string; message?: string } = {
        success: true,
      }
      try {
        const valid = ContentSchemaSchema.safeParse({ style: b64 })
        result = valid.success
          ? { success: true }
          : {
              success: false,
              path: valid.error.issues[0].path,
              code: valid.error.issues[0].code,
              message: valid.error.issues[0].message,
            }
      } catch {
        threw = true
      }
      expect(threw).toBe(false)
      expect(result).toStrictEqual({
        success: false,
        path: ['style'],
        code: 'custom',
        message: 'invalid base64-json: Unexpected token \'o\', "not-json" is not valid JSON',
      })
    })
    it.concurrent('runtime: garbage non-base64 → full issue toStrictEqual (invalid_format)', () => {
      const valid = ContentSchemaSchema.safeParse({ style: '!!!not-b64!!!' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        // .transform's pre-validation drops origin/pattern from the inner
        // base64 issue but preserves code/format/message/path.
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'invalid_format',
            format: 'base64',
            path: ['style'],
            message: 'Invalid base64-encoded string',
          },
        ])
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // v3.2: refine vs superRefine usage discriminator probes
  //       (path-based superRefine wins, count-only refine wins)
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 superRefine demo: uniqueItems (per-duplicate path)', () => {
    const UniqueItemsSchema = z.array(z.string()).superRefine((items, ctx) => {
      const seen = new Map<string, number>()
      for (const [i, v] of items.entries()) {
        const key = JSON.stringify(v)
        if (seen.has(key))
          ctx.addIssue({
            code: 'custom',
            path: [i],
            message: `Duplicate of index ${seen.get(key)}`,
          })
        else seen.set(key, i)
      }
    })

    it.concurrent('codegen: superRefine with Map-based duplicate index tracking', () => {
      expect(zodToOpenAPI({ type: 'array', items: { type: 'string' }, uniqueItems: true })).toBe(
        'z.array(z.string()).superRefine((items,ctx)=>{const seen=new Map();for(const [i,v] of items.entries()){const key=JSON.stringify(v);if(seen.has(key))ctx.addIssue({code:"custom",path:[i],message:"Duplicate of index "+seen.get(key)});else seen.set(key,i)}})',
      )
    })
    it.concurrent('runtime: unique array PASS', () => {
      expect(UniqueItemsSchema.safeParse(['a', 'b', 'c']).success).toBe(true)
    })
    it.concurrent('runtime: duplicate at index 2 → path:[2], dynamic msg "of index 0"', () => {
      const valid = UniqueItemsSchema.safeParse(['a', 'b', 'a'])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues[0].path).toStrictEqual([2])
        expect(valid.error.issues[0].message).toBe('Duplicate of index 0')
      }
    })
    it.concurrent('runtime: multiple duplicates each get their own issue', () => {
      const valid = UniqueItemsSchema.safeParse(['a', 'b', 'a', 'c', 'b'])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        const paths = valid.error.issues.map((i) => i.path)
        expect(paths).toStrictEqual([[2], [4]])
        const messages = valid.error.issues.map((i) => i.message)
        expect(messages).toStrictEqual(['Duplicate of index 0', 'Duplicate of index 1'])
      }
    })
  })

  describe('v3.2 superRefine demo: propertyNames (per-violating-key path)', () => {
    const PropertyNamesSchema = z.looseObject({}).superRefine((o, ctx) => {
      const regex = /^[a-z]+$/
      for (const k of Object.keys(o)) {
        if (!regex.test(k))
          ctx.addIssue({
            code: 'custom',
            path: [k],
            message: `Property name '${k}' does not match pattern ^[a-z]+$`,
          })
      }
    })

    it.concurrent('codegen: superRefine with key-level path injection', () => {
      expect(zodToOpenAPI({ type: 'object', propertyNames: { pattern: '^[a-z]+$' } })).toBe(
        'z.looseObject({}).superRefine((o,ctx)=>{const regex=new RegExp("^[a-z]+$");for(const k of Object.keys(o)){if(!regex.test(k))ctx.addIssue({code:"custom",path:[k],message:"Property name \'"+k+"\' does not match pattern ^[a-z]+$"})}})',
      )
    })
    it.concurrent('runtime: all-lowercase keys PASS', () => {
      expect(PropertyNamesSchema.safeParse({ a: 1, b: 2 }).success).toBe(true)
    })
    it.concurrent('runtime: mixed-case key → path:["BadKey"], dynamic message', () => {
      const valid = PropertyNamesSchema.safeParse({ valid: 1, BadKey: 2 })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues.length).toBe(1)
        expect(valid.error.issues[0].path).toStrictEqual(['BadKey'])
        expect(valid.error.issues[0].message).toBe(
          "Property name 'BadKey' does not match pattern ^[a-z]+$",
        )
      }
    })
  })

  describe('v3.2 refine demo: minProperties / maxProperties (path-free, slot-driven)', () => {
    // Why refine, not superRefine:
    //   - path is necessarily [] (object-cardinality, no per-element location)
    //   - threshold is static (schema-defined, no runtime-only value to embed)
    //   - x-min/maxProperties-message slot already overrides for i18n
    //   - 1 issue is sufficient (min and max cannot fail simultaneously)
    // additionalProperties: true → looseObject so extra keys survive.
    const MinMaxPropsSchema = z
      .looseObject({ a: z.string().exactOptional() })
      .refine((o) => Object.keys(o).length >= 3, { error: '最低3つのプロパティが必要です' })
      .refine((o) => Object.keys(o).length <= 10, { error: '最大10つまでです' })

    it.concurrent('codegen: two refines (min + max) with x-* slot overrides', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          additionalProperties: true,
          minProperties: 3,
          maxProperties: 10,
          'x-minProperties-message': '最低3つのプロパティが必要です',
          'x-maxProperties-message': '最大10つまでです',
          properties: { a: { type: 'string' } },
        }),
      ).toBe(
        'z.looseObject({a:z.string().exactOptional()}).refine((o)=>Object.keys(o).length>=3,{error:"最低3つのプロパティが必要です"}).refine((o)=>Object.keys(o).length<=10,{error:"最大10つまでです"})',
      )
    })
    it.concurrent('runtime: 1 property → min violation, custom message reflected', () => {
      const valid = MinMaxPropsSchema.safeParse({ a: 'x' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues[0].path).toStrictEqual([])
        expect(valid.error.issues[0].message).toBe('最低3つのプロパティが必要です')
      }
    })
    it.concurrent('runtime: 11 properties → max violation, custom message reflected', () => {
      const valid = MinMaxPropsSchema.safeParse({
        a: '1',
        b: '2',
        c: '3',
        d: '4',
        e: '5',
        f: '6',
        g: '7',
        h: '8',
        i: '9',
        j: '10',
        k: '11',
      })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues[0].message).toBe('最大10つまでです')
      }
    })
    it.concurrent('runtime: 5 properties (within bounds) PASSES', () => {
      expect(MinMaxPropsSchema.safeParse({ a: '1', b: '2', c: '3', d: '4', e: '5' }).success).toBe(
        true,
      )
    })
  })

  describe('v3.2 refine vs superRefine summary (full codegen toBe)', () => {
    // Documents the API choice for each constraint family with full codegen
    // string toBe completeness (not includes-substring). Each it() pins the
    // exact emitted Zod chain — any drift from the intended API surfaces here.
    it.concurrent('refine: minProperties emits .refine without superRefine', () => {
      expect(zodToOpenAPI({ type: 'object', minProperties: 1 })).toBe(
        'z.object({}).refine((o)=>Object.keys(o).length>=1)',
      )
    })
    it.concurrent('superRefine: uniqueItems emits .superRefine with seen Map', () => {
      expect(zodToOpenAPI({ type: 'array', items: { type: 'string' }, uniqueItems: true })).toBe(
        'z.array(z.string()).superRefine((items,ctx)=>{const seen=new Map();for(const [i,v] of items.entries()){const key=JSON.stringify(v);if(seen.has(key))ctx.addIssue({code:"custom",path:[i],message:"Duplicate of index "+seen.get(key)});else seen.set(key,i)}})',
      )
    })
    it.concurrent('superRefine: contains emits .superRefine with matched count', () => {
      expect(zodToOpenAPI({ type: 'array', contains: { type: 'integer' }, minContains: 1 })).toBe(
        'z.array(z.any()).superRefine((arr,ctx)=>{const Schema=z.int();const matched=arr.filter((i)=>Schema.safeParse(i).success).length;if(matched<1)ctx.addIssue({code:"custom",message:"Expected at least 1 matching items, got "+matched})})',
      )
    })
    it.concurrent('superRefine: patternProperties emits .superRefine with key-path', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          patternProperties: { '^x_': { type: 'string' } },
        }),
      ).toBe(
        'z.looseObject({}).superRefine((o,ctx)=>{const regex=new RegExp("^x_");const Schema=z.string();for(const [k,v] of Object.entries(o)){if(!regex.test(k))continue;const valid=Schema.safeParse(v);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:[k,...issue.path]})}})',
      )
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // v3.2: string format codegen + runtime pairs
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 string format: email', () => {
    it.concurrent('codegen: z.email()', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'email' })).toBe('z.email()')
    })
    it.concurrent('runtime: "taro@example.com" PASSES', () => {
      expect(z.email().safeParse('taro@example.com').success).toBe(true)
    })
    it.concurrent('runtime: "not-an-email" FAILS', () => {
      expect(z.email().safeParse('not-an-email').success).toBe(false)
    })
  })

  describe('v3.2 string format: uuid', () => {
    it.concurrent('codegen: z.uuid()', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'uuid' })).toBe('z.uuid()')
    })
    it.concurrent('runtime: valid uuid PASSES', () => {
      expect(z.uuid().safeParse('123e4567-e89b-12d3-a456-426614174000').success).toBe(true)
    })
    it.concurrent('runtime: non-uuid FAILS', () => {
      expect(z.uuid().safeParse('abc').success).toBe(false)
    })
  })

  describe('v3.2 string format: date-time (ISO 8601)', () => {
    it.concurrent('codegen: z.iso.datetime()', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'date-time' })).toBe('z.iso.datetime()')
    })
    it.concurrent('runtime: "2026-05-12T10:30:00Z" PASSES', () => {
      expect(z.iso.datetime().safeParse('2026-05-12T10:30:00Z').success).toBe(true)
    })
    it.concurrent('runtime: "2026/05/12" FAILS (not ISO)', () => {
      expect(z.iso.datetime().safeParse('2026/05/12').success).toBe(false)
    })
  })

  describe('v3.2 string format: date', () => {
    it.concurrent('codegen: z.iso.date()', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'date' })).toBe('z.iso.date()')
    })
    it.concurrent('runtime: "2026-05-12" PASSES', () => {
      expect(z.iso.date().safeParse('2026-05-12').success).toBe(true)
    })
    it.concurrent('runtime: "2026-13-01" FAILS (invalid month)', () => {
      expect(z.iso.date().safeParse('2026-13-01').success).toBe(false)
    })
  })

  describe('v3.2 string format: ipv4', () => {
    it.concurrent('codegen: z.ipv4()', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'ipv4' })).toBe('z.ipv4()')
    })
    it.concurrent('runtime: "192.168.0.1" PASSES', () => {
      expect(z.ipv4().safeParse('192.168.0.1').success).toBe(true)
    })
    it.concurrent('runtime: "999.999.999.999" FAILS', () => {
      expect(z.ipv4().safeParse('999.999.999.999').success).toBe(false)
    })
  })

  describe('v3.2 string format: url', () => {
    it.concurrent('codegen: z.url()', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'url' })).toBe('z.url()')
    })
    it.concurrent('runtime: "https://example.com" PASSES', () => {
      expect(z.url().safeParse('https://example.com').success).toBe(true)
    })
    it.concurrent('runtime: "not a url" FAILS', () => {
      expect(z.url().safeParse('not a url').success).toBe(false)
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // v3.2: string length / pattern codegen + runtime
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 string: minLength + maxLength', () => {
    it.concurrent('codegen: z.string().min(3).max(10)', () => {
      expect(zodToOpenAPI({ type: 'string', minLength: 3, maxLength: 10 })).toBe(
        'z.string().min(3).max(10)',
      )
    })
    it.concurrent('runtime: "abc" (boundary low) PASSES', () => {
      expect(z.string().min(3).max(10).safeParse('abc').success).toBe(true)
    })
    it.concurrent('runtime: "1234567890" (boundary high) PASSES', () => {
      expect(z.string().min(3).max(10).safeParse('1234567890').success).toBe(true)
    })
    it.concurrent('runtime: "ab" (too short) → full issue toStrictEqual', () => {
      const valid = z.string().min(3).max(10).safeParse('ab')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'too_small',
            minimum: 3,
            inclusive: true,
            path: [],
            message: 'Too small: expected string to have >=3 characters',
          },
        ])
      }
    })
    it.concurrent('runtime: "12345678901" (too long) → full issue toStrictEqual', () => {
      const valid = z.string().min(3).max(10).safeParse('12345678901')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'too_big',
            maximum: 10,
            inclusive: true,
            path: [],
            message: 'Too big: expected string to have <=10 characters',
          },
        ])
      }
    })
  })

  describe('v3.2 string: pattern (regex)', () => {
    it.concurrent('codegen: z.string().regex(/^[A-Z]{3}-\\d{3}$/)', () => {
      expect(zodToOpenAPI({ type: 'string', pattern: '^[A-Z]{3}-\\d{3}$' })).toBe(
        'z.string().regex(/^[A-Z]{3}-\\d{3}$/)',
      )
    })
    it.concurrent('runtime: "ABC-123" PASSES', () => {
      expect(
        z
          .string()
          .regex(/^[A-Z]{3}-\d{3}$/)
          .safeParse('ABC-123').success,
      ).toBe(true)
    })
    it.concurrent('runtime: "abc-123" FAILS (lowercase)', () => {
      expect(
        z
          .string()
          .regex(/^[A-Z]{3}-\d{3}$/)
          .safeParse('abc-123').success,
      ).toBe(false)
    })
  })

  describe('v3.2 string: fixed length (minLength == maxLength)', () => {
    it.concurrent('codegen: z.string().length(5)', () => {
      expect(zodToOpenAPI({ type: 'string', minLength: 5, maxLength: 5 })).toBe(
        'z.string().length(5)',
      )
    })
    it.concurrent('runtime: "12345" PASSES', () => {
      expect(z.string().length(5).safeParse('12345').success).toBe(true)
    })
    it.concurrent('runtime: "1234" FAILS (too short)', () => {
      expect(z.string().length(5).safeParse('1234').success).toBe(false)
    })
    it.concurrent('runtime: "123456" FAILS (too long)', () => {
      expect(z.string().length(5).safeParse('123456').success).toBe(false)
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // v3.2: number constraints codegen + runtime
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 number: minimum + maximum', () => {
    it.concurrent('codegen: z.number().min(0).max(100)', () => {
      expect(zodToOpenAPI({ type: 'number', minimum: 0, maximum: 100 })).toBe(
        'z.number().min(0).max(100)',
      )
    })
    it.concurrent('runtime: 50 PASSES', () => {
      expect(z.number().min(0).max(100).safeParse(50).success).toBe(true)
    })
    it.concurrent('runtime: 0 (boundary) PASSES', () => {
      expect(z.number().min(0).max(100).safeParse(0).success).toBe(true)
    })
    it.concurrent('runtime: 100 (boundary) PASSES', () => {
      expect(z.number().min(0).max(100).safeParse(100).success).toBe(true)
    })
    it.concurrent('runtime: -1 FAILS', () => {
      expect(z.number().min(0).max(100).safeParse(-1).success).toBe(false)
    })
    it.concurrent('runtime: 101 FAILS', () => {
      expect(z.number().min(0).max(100).safeParse(101).success).toBe(false)
    })
  })

  describe('v3.2 number: multipleOf', () => {
    it.concurrent('codegen: z.number().multipleOf(0.5)', () => {
      expect(zodToOpenAPI({ type: 'number', multipleOf: 0.5 })).toBe('z.number().multipleOf(0.5)')
    })
    it.concurrent('runtime: 1.5 PASSES', () => {
      expect(z.number().multipleOf(0.5).safeParse(1.5).success).toBe(true)
    })
    it.concurrent('runtime: 1.3 FAILS', () => {
      expect(z.number().multipleOf(0.5).safeParse(1.3).success).toBe(false)
    })
  })

  describe('v3.2 integer: exclusiveMinimum (number form, JSON Schema 2020-12)', () => {
    it.concurrent('codegen: z.int().gt(0)', () => {
      expect(zodToOpenAPI({ type: 'integer', exclusiveMinimum: 0 })).toBe('z.int().gt(0)')
    })
    it.concurrent('runtime: 1 PASSES', () => {
      expect(z.int().gt(0).safeParse(1).success).toBe(true)
    })
    it.concurrent('runtime: 0 FAILS (exclusive)', () => {
      expect(z.int().gt(0).safeParse(0).success).toBe(false)
    })
    it.concurrent('runtime: 1.5 FAILS (not integer)', () => {
      expect(z.int().gt(0).safeParse(1.5).success).toBe(false)
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // v3.2: enum / const codegen + runtime
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 enum: string enum', () => {
    it.concurrent('codegen: z.enum(["red","green","blue"])', () => {
      expect(zodToOpenAPI({ type: 'string', enum: ['red', 'green', 'blue'] })).toBe(
        'z.enum(["red","green","blue"])',
      )
    })
    it.concurrent('runtime: "red" PASSES', () => {
      expect(z.enum(['red', 'green', 'blue']).safeParse('red').success).toBe(true)
    })
    it.concurrent('runtime: "yellow" FAILS', () => {
      expect(z.enum(['red', 'green', 'blue']).safeParse('yellow').success).toBe(false)
    })
  })

  describe('v3.2 const: literal value', () => {
    it.concurrent('codegen: z.literal("fixed")', () => {
      expect(zodToOpenAPI({ const: 'fixed' })).toBe('z.literal("fixed")')
    })
    it.concurrent('runtime: "fixed" PASSES', () => {
      expect(z.literal('fixed').safeParse('fixed').success).toBe(true)
    })
    it.concurrent('runtime: "other" FAILS', () => {
      expect(z.literal('fixed').safeParse('other').success).toBe(false)
    })
  })

  describe('v3.2 const: numeric literal', () => {
    it.concurrent('codegen: z.literal(42)', () => {
      expect(zodToOpenAPI({ const: 42 })).toBe('z.literal(42)')
    })
    it.concurrent('runtime: 42 PASSES', () => {
      expect(z.literal(42).safeParse(42).success).toBe(true)
    })
    it.concurrent('runtime: 43 FAILS', () => {
      expect(z.literal(42).safeParse(43).success).toBe(false)
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // v3.2: allOf / anyOf / oneOf codegen + runtime
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 allOf: intersection of two object schemas', () => {
    const AllOfSchema = z.object({ a: z.string() }).and(z.object({ b: z.number() }))

    it.concurrent('codegen: .and() chain with required metadata', () => {
      expect(
        zodToOpenAPI({
          allOf: [
            { type: 'object', properties: { a: { type: 'string' } }, required: ['a'] },
            { type: 'object', properties: { b: { type: 'number' } }, required: ['b'] },
          ],
        }),
      ).toBe(
        'z.object({a:z.string()}).openapi({"required":["a"]}).and(z.object({b:z.number()}).openapi({"required":["b"]}))',
      )
    })
    it.concurrent('runtime: {a:"x", b:1} PASSES', () => {
      expect(AllOfSchema.safeParse({ a: 'x', b: 1 }).success).toBe(true)
    })
    it.concurrent('runtime: {a:"x"} FAILS (b missing)', () => {
      expect(AllOfSchema.safeParse({ a: 'x' }).success).toBe(false)
    })
    it.concurrent('runtime: {b:1} FAILS (a missing)', () => {
      expect(AllOfSchema.safeParse({ b: 1 }).success).toBe(false)
    })
  })

  describe('v3.2 anyOf: union of string or number', () => {
    const AnyOfSchema = z.union([z.string(), z.number()])

    it.concurrent('codegen: z.union([z.string(), z.number()])', () => {
      expect(zodToOpenAPI({ anyOf: [{ type: 'string' }, { type: 'number' }] })).toBe(
        'z.union([z.string(),z.number()])',
      )
    })
    it.concurrent('runtime: "x" PASSES', () => {
      expect(AnyOfSchema.safeParse('x').success).toBe(true)
    })
    it.concurrent('runtime: 1 PASSES', () => {
      expect(AnyOfSchema.safeParse(1).success).toBe(true)
    })
    it.concurrent('runtime: true FAILS (neither string nor number)', () => {
      expect(AnyOfSchema.safeParse(true).success).toBe(false)
    })
  })

  describe('v3.2 oneOf: discriminatedUnion via discriminator', () => {
    const OneOfSchema = z.discriminatedUnion('kind', [
      z.object({ kind: z.literal('cat'), meow: z.boolean() }),
      z.object({ kind: z.literal('dog'), bark: z.boolean() }),
    ])

    it.concurrent('codegen: z.discriminatedUnion("kind", [...]) with metadata', () => {
      expect(
        zodToOpenAPI({
          oneOf: [
            {
              type: 'object',
              properties: { kind: { const: 'cat' }, meow: { type: 'boolean' } },
              required: ['kind', 'meow'],
            },
            {
              type: 'object',
              properties: { kind: { const: 'dog' }, bark: { type: 'boolean' } },
              required: ['kind', 'bark'],
            },
          ],
          discriminator: { propertyName: 'kind' },
        }),
      ).toBe(
        'z.discriminatedUnion(\'kind\',[z.object({kind:z.literal("cat"),meow:z.boolean()}).openapi({"required":["kind","meow"]}),z.object({kind:z.literal("dog"),bark:z.boolean()}).openapi({"required":["kind","bark"]})]).openapi({"discriminator":{"propertyName":"kind"}})',
      )
    })
    it.concurrent('runtime: {kind:"cat", meow:true} PASSES', () => {
      expect(OneOfSchema.safeParse({ kind: 'cat', meow: true }).success).toBe(true)
    })
    it.concurrent('runtime: {kind:"dog", bark:true} PASSES', () => {
      expect(OneOfSchema.safeParse({ kind: 'dog', bark: true }).success).toBe(true)
    })
    it.concurrent('runtime: {kind:"cat", bark:true} FAILS (wrong shape for cat)', () => {
      expect(OneOfSchema.safeParse({ kind: 'cat', bark: true }).success).toBe(false)
    })
    it.concurrent('runtime: {kind:"fish"} FAILS (unknown discriminator)', () => {
      expect(OneOfSchema.safeParse({ kind: 'fish' }).success).toBe(false)
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // v3.2: nullable / default / type-array codegen + runtime
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 nullable: type:["string","null"] (JSON Schema 2020-12)', () => {
    it.concurrent('codegen: z.string().nullable()', () => {
      expect(zodToOpenAPI({ type: ['string', 'null'] })).toBe('z.string().nullable()')
    })
    it.concurrent('runtime: "x" PASSES', () => {
      expect(z.string().nullable().safeParse('x').success).toBe(true)
    })
    it.concurrent('runtime: null PASSES', () => {
      expect(z.string().nullable().safeParse(null).success).toBe(true)
    })
    it.concurrent('runtime: 1 FAILS', () => {
      expect(z.string().nullable().safeParse(1).success).toBe(false)
    })
  })

  describe('v3.2 default: numeric default value', () => {
    it.concurrent('codegen: z.number().default(42)', () => {
      expect(zodToOpenAPI({ type: 'number', default: 42 })).toBe('z.number().default(42)')
    })
    it.concurrent('runtime: undefined → fills with 42', () => {
      const valid = z.number().default(42).safeParse(undefined)
      expect(valid.success).toBe(true)
      if (valid.success) {
        expect(valid.data).toBe(42)
      }
    })
    it.concurrent('runtime: explicit 7 → keeps 7', () => {
      const valid = z.number().default(42).safeParse(7)
      expect(valid.success).toBe(true)
      if (valid.success) {
        expect(valid.data).toBe(7)
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // v3.2: x-error-message / x-required-message slot codegen + runtime
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 x-required-message: differentiates undefined vs type mismatch', () => {
    const RequiredMsgSchema = z.object({
      email: z.string({
        error: (issue) =>
          issue.input === undefined ? 'Email is required' : 'Email format invalid',
      }),
    })

    it.concurrent('codegen: error function differentiates undefined, with required metadata', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            email: {
              type: 'string',
              'x-error-message': 'Email format invalid',
              'x-required-message': 'Email is required',
            },
          },
          required: ['email'],
        }),
      ).toBe(
        'z.object({email:z.string({error:(issue)=>issue.input===undefined?"Email is required":"Email format invalid"})}).openapi({"required":["email"]})',
      )
    })
    it.concurrent('runtime: missing email → required message', () => {
      const valid = RequiredMsgSchema.safeParse({})
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues[0].message).toBe('Email is required')
      }
    })
    it.concurrent('runtime: wrong type email → error message', () => {
      const valid = RequiredMsgSchema.safeParse({ email: 123 })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues[0].message).toBe('Email format invalid')
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // v3.2: x-coerce / x-prefault / x-catch / x-brand codegen + runtime
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 x-coerce: string coercion at parse', () => {
    it.concurrent('codegen: z.coerce.string()', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-coerce': true } as Schema)).toBe('z.coerce.string()')
    })
    it.concurrent('runtime: 123 → "123" (coerced)', () => {
      const valid = z.coerce.string().safeParse(123)
      expect(valid.success).toBe(true)
      if (valid.success) {
        expect(valid.data).toBe('123')
      }
    })
  })

  describe('v3.2 x-catch: fallback on validation failure', () => {
    it.concurrent('codegen: z.number().catch(0)', () => {
      expect(zodToOpenAPI({ type: 'number', 'x-catch': 0 } as Schema)).toBe('z.number().catch(0)')
    })
    it.concurrent('runtime: invalid input "x" → returns 0', () => {
      const valid = z.number().catch(0).safeParse('x')
      expect(valid.success).toBe(true)
      if (valid.success) {
        expect(valid.data).toBe(0)
      }
    })
    it.concurrent('runtime: valid 5 → returns 5', () => {
      const valid = z.number().catch(0).safeParse(5)
      expect(valid.success).toBe(true)
      if (valid.success) {
        expect(valid.data).toBe(5)
      }
    })
  })

  describe('v3.2 x-brand: branded types for nominal typing', () => {
    it.concurrent('codegen: z.string().brand<"UserId">()', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-brand': 'UserId' } as Schema)).toBe(
        'z.string().brand<"UserId">()',
      )
    })
    it.concurrent('runtime: "abc" PASSES (brand is type-only at runtime)', () => {
      // .brand<"X">() is compile-time only; runtime behavior identical to z.string().
      const valid = z.string().brand<'UserId'>().safeParse('abc')
      expect(valid.success).toBe(true)
      if (valid.success) {
        expect(valid.data).toBe('abc')
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // v3.2: complex nested object codegen + runtime
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 nested object: User { name, email, address: { city } }', () => {
    const NestedSchema = z.object({
      name: z.string().min(1),
      email: z.email(),
      address: z
        .object({
          city: z.string(),
          zip: z
            .string()
            .regex(/^\d{3}-\d{4}$/)
            .exactOptional(),
        })
        .exactOptional(),
    })

    it.concurrent('codegen: nested z.object with deep properties + nested required metadata', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            name: { type: 'string', minLength: 1 },
            email: { type: 'string', format: 'email' },
            address: {
              type: 'object',
              properties: {
                city: { type: 'string' },
                zip: { type: 'string', pattern: '^\\d{3}-\\d{4}$' },
              },
              required: ['city'],
            },
          },
          required: ['name', 'email'],
        }),
      ).toBe(
        'z.object({name:z.string().min(1),email:z.email(),address:z.object({city:z.string(),zip:z.string().regex(/^\\d{3}-\\d{4}$/).exactOptional()}).exactOptional().openapi({"required":["city"]})}).openapi({"required":["name","email"]})',
      )
    })
    it.concurrent('runtime: full valid object PASSES', () => {
      expect(
        NestedSchema.safeParse({
          name: 'taro',
          email: 'taro@example.com',
          address: { city: 'Tokyo', zip: '100-0001' },
        }).success,
      ).toBe(true)
    })
    it.concurrent('runtime: minimal valid (no address) PASSES', () => {
      expect(NestedSchema.safeParse({ name: 'taro', email: 'taro@example.com' }).success).toBe(true)
    })
    it.concurrent('runtime: invalid zip → full issue toStrictEqual', () => {
      const valid = NestedSchema.safeParse({
        name: 'taro',
        email: 'taro@example.com',
        address: { city: 'Tokyo', zip: 'invalid' },
      })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'regex',
            pattern: '/^\\d{3}-\\d{4}$/',
            path: ['address', 'zip'],
            message: 'Invalid string: must match pattern /^\\d{3}-\\d{4}$/',
          },
        ])
      }
    })
    it.concurrent('runtime: missing name → full issue toStrictEqual', () => {
      const valid = NestedSchema.safeParse({ email: 'taro@example.com' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: ['name'],
            message: 'Invalid input: expected string, received undefined',
          },
        ])
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // v3.2: x-refine — user-supplied refine chains
  //   spec: x-refine: [{ fn: string, message?: string, path?: string[] }]
  //   codegen wraps each entry as `.refine(fn, {message, path})`
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 x-refine: single predicate (English message)', () => {
    const RefineSingle = z.number().refine((v) => v > 0, { message: 'must be positive' })

    it.concurrent('codegen: emits .refine(fn, {message})', () => {
      expect(
        zodToOpenAPI({
          type: 'number',
          'x-refine': [{ fn: '(v) => v > 0', message: 'must be positive' }],
        } as Schema),
      ).toBe('z.number().refine((v) => v > 0,{message:"must be positive"})')
    })
    it.concurrent('runtime: 5 PASSES', () => {
      expect(RefineSingle.safeParse(5).success).toBe(true)
    })
    it.concurrent('runtime: -1 FAILS → full issue toStrictEqual', () => {
      const valid = RefineSingle.safeParse(-1)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [], message: 'must be positive' },
        ])
      }
    })
  })

  describe('v3.2 x-refine: single predicate (日本語 message)', () => {
    const RefineJp = z.number().refine((v) => v > 0, { message: '正の数でなければなりません' })

    it.concurrent('codegen: emits .refine with 日本語 message', () => {
      expect(
        zodToOpenAPI({
          type: 'number',
          'x-refine': [{ fn: '(v) => v > 0', message: '正の数でなければなりません' }],
        } as Schema),
      ).toBe('z.number().refine((v) => v > 0,{message:"正の数でなければなりません"})')
    })
    it.concurrent('runtime: 1 PASSES', () => {
      expect(RefineJp.safeParse(1).success).toBe(true)
    })
    it.concurrent('runtime: 0 FAILS with 日本語 message', () => {
      const valid = RefineJp.safeParse(0)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [], message: '正の数でなければなりません' },
        ])
      }
    })
  })

  describe('v3.2 x-refine: with path scoping', () => {
    const RefineWithPath = z
      .object({
        password: z.string(),
        confirmPassword: z.string(),
      })
      .refine(
        (v: { password: string; confirmPassword: string }) => v.password === v.confirmPassword,
        {
          message: 'パスワードが一致しません',
          path: ['confirmPassword'],
        },
      )

    it.concurrent('codegen: emits .refine with {message, path}', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            password: { type: 'string' },
            confirmPassword: { type: 'string' },
          },
          required: ['password', 'confirmPassword'],
          'x-refine': [
            {
              fn: '(v) => v.password === v.confirmPassword',
              message: 'パスワードが一致しません',
              path: ['confirmPassword'],
            },
          ],
        } as Schema),
      ).toBe(
        'z.object({password:z.string(),confirmPassword:z.string()}).refine((v) => v.password === v.confirmPassword,{message:"パスワードが一致しません",path:["confirmPassword"]}).openapi({"required":["password","confirmPassword"]})',
      )
    })
    it.concurrent('runtime: matching passwords PASS', () => {
      expect(
        RefineWithPath.safeParse({ password: 'secret', confirmPassword: 'secret' }).success,
      ).toBe(true)
    })
    it.concurrent('runtime: mismatched → path:["confirmPassword"], 日本語 message', () => {
      const valid = RefineWithPath.safeParse({
        password: 'secret',
        confirmPassword: 'wrong',
      })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: ['confirmPassword'], message: 'パスワードが一致しません' },
        ])
      }
    })
  })

  describe('v3.2 x-refine: chain of multiple refines', () => {
    const RefineChain = z
      .number()
      .refine((v: number) => v > 0, { message: '正の数で必要です' })
      .refine((v: number) => v < 100, { message: '100未満で必要です' })

    it.concurrent('codegen: chains .refine().refine() in array order', () => {
      expect(
        zodToOpenAPI({
          type: 'number',
          'x-refine': [
            { fn: '(v) => v > 0', message: '正の数で必要です' },
            { fn: '(v) => v < 100', message: '100未満で必要です' },
          ],
        } as Schema),
      ).toBe(
        'z.number().refine((v) => v > 0,{message:"正の数で必要です"}).refine((v) => v < 100,{message:"100未満で必要です"})',
      )
    })
    it.concurrent('runtime: 50 PASSES', () => {
      expect(RefineChain.safeParse(50).success).toBe(true)
    })
    it.concurrent('runtime: -1 FAILS first refine only', () => {
      const valid = RefineChain.safeParse(-1)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [], message: '正の数で必要です' },
        ])
      }
    })
    it.concurrent('runtime: 200 FAILS second refine only', () => {
      const valid = RefineChain.safeParse(200)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [], message: '100未満で必要です' },
        ])
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // v3.2: x-superRefine — user-supplied superRefine functions
  //   spec: x-superRefine: string[]   (each entry is the full lambda body)
  //   codegen wraps each entry as `.superRefine(fn)`
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 x-superRefine: single function with custom code+path', () => {
    const SuperRefineSingle = z.string().superRefine((val: string, ctx) => {
      if (val.includes(' '))
        ctx.addIssue({ code: 'custom', path: [], message: 'スペースは含められません' })
    })

    it.concurrent('codegen: emits .superRefine(fn)', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          'x-superRefine': [
            '(val, ctx) => { if (val.includes(\' \')) ctx.addIssue({ code: "custom", path: [], message: "スペースは含められません" }) }',
          ],
        } as Schema),
      ).toBe(
        'z.string().superRefine((val, ctx) => { if (val.includes(\' \')) ctx.addIssue({ code: "custom", path: [], message: "スペースは含められません" }) })',
      )
    })
    it.concurrent('runtime: "hello" PASSES (no spaces)', () => {
      expect(SuperRefineSingle.safeParse('hello').success).toBe(true)
    })
    it.concurrent('runtime: "hello world" FAILS with 日本語 message', () => {
      const valid = SuperRefineSingle.safeParse('hello world')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [], message: 'スペースは含められません' },
        ])
      }
    })
  })

  describe('v3.2 x-superRefine: emits multiple issues from one function', () => {
    const SuperRefineMulti = z
      .object({ password: z.string() })
      .superRefine((val: { password: string }, ctx) => {
        if (val.password.length < 8)
          ctx.addIssue({
            code: 'custom',
            path: ['password'],
            message: 'パスワードは8文字以上で必要です',
          })
        if (!/[0-9]/.test(val.password))
          ctx.addIssue({
            code: 'custom',
            path: ['password'],
            message: 'パスワードに数字を含めてください',
          })
      })

    it.concurrent('codegen: emits .superRefine with multi-addIssue body', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: { password: { type: 'string' } },
          required: ['password'],
          'x-superRefine': [
            '(val, ctx) => { if (val.password.length < 8) ctx.addIssue({ code: "custom", path: ["password"], message: "パスワードは8文字以上で必要です" }); if (!/[0-9]/.test(val.password)) ctx.addIssue({ code: "custom", path: ["password"], message: "パスワードに数字を含めてください" }) }',
          ],
        } as Schema),
      ).toBe(
        'z.object({password:z.string()}).superRefine((val, ctx) => { if (val.password.length < 8) ctx.addIssue({ code: "custom", path: ["password"], message: "パスワードは8文字以上で必要です" }); if (!/[0-9]/.test(val.password)) ctx.addIssue({ code: "custom", path: ["password"], message: "パスワードに数字を含めてください" }) }).openapi({"required":["password"]})',
      )
    })
    it.concurrent('runtime: valid password ("password123") PASSES', () => {
      expect(SuperRefineMulti.safeParse({ password: 'password123' }).success).toBe(true)
    })
    it.concurrent('runtime: short + no-digit password → 2 issues, both 日本語', () => {
      const valid = SuperRefineMulti.safeParse({ password: 'short' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'custom',
            path: ['password'],
            message: 'パスワードは8文字以上で必要です',
          },
          {
            code: 'custom',
            path: ['password'],
            message: 'パスワードに数字を含めてください',
          },
        ])
      }
    })
  })

  describe('v3.2 x-superRefine: chain of multiple superRefine functions', () => {
    const SuperRefineChain = z
      .string()
      .superRefine((val: string, ctx) => {
        if (val.length < 3) ctx.addIssue({ code: 'custom', path: [], message: '3文字以上必要です' })
      })
      .superRefine((val: string, ctx) => {
        if (!/^[a-z]/.test(val))
          ctx.addIssue({ code: 'custom', path: [], message: '小文字で始めてください' })
      })

    it.concurrent('codegen: chains .superRefine().superRefine() in array order', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          'x-superRefine': [
            '(val, ctx) => { if (val.length < 3) ctx.addIssue({ code: "custom", path: [], message: "3文字以上必要です" }) }',
            '(val, ctx) => { if (!/^[a-z]/.test(val)) ctx.addIssue({ code: "custom", path: [], message: "小文字で始めてください" }) }',
          ],
        } as Schema),
      ).toBe(
        'z.string().superRefine((val, ctx) => { if (val.length < 3) ctx.addIssue({ code: "custom", path: [], message: "3文字以上必要です" }) }).superRefine((val, ctx) => { if (!/^[a-z]/.test(val)) ctx.addIssue({ code: "custom", path: [], message: "小文字で始めてください" }) })',
      )
    })
    it.concurrent('runtime: "hello" PASSES both', () => {
      expect(SuperRefineChain.safeParse('hello').success).toBe(true)
    })
    it.concurrent('runtime: "AB" FAILS both → 2 issues with 日本語', () => {
      const valid = SuperRefineChain.safeParse('AB')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [], message: '3文字以上必要です' },
          { code: 'custom', path: [], message: '小文字で始めてください' },
        ])
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // v3.2: 日本語メッセージ — broad coverage of x-*-message slots in 日本語
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 日本語: x-error-message on string base', () => {
    const JpStringSchema = z.string({ error: '文字列で入力してください' })

    it.concurrent('codegen: z.string with 日本語 error', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          'x-error-message': '文字列で入力してください',
        } as Schema),
      ).toBe('z.string({error:"文字列で入力してください"})')
    })
    it.concurrent('runtime: 123 FAILS with 日本語 message', () => {
      const valid = JpStringSchema.safeParse(123)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: [],
            message: '文字列で入力してください',
          },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-pattern-message overrides regex error', () => {
    const JpPatternSchema = z
      .string()
      .regex(/^\d{3}-\d{4}$/, { error: '郵便番号は123-4567の形式で入力してください' })

    it.concurrent('codegen: z.string().regex(/.../, {error:"日本語"})', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          pattern: '^\\d{3}-\\d{4}$',
          'x-pattern-message': '郵便番号は123-4567の形式で入力してください',
        } as Schema),
      ).toBe(
        'z.string().regex(/^\\d{3}-\\d{4}$/,{error:"郵便番号は123-4567の形式で入力してください"})',
      )
    })
    it.concurrent('runtime: "100-0001" PASSES', () => {
      expect(JpPatternSchema.safeParse('100-0001').success).toBe(true)
    })
    it.concurrent('runtime: "invalid" FAILS with 日本語 pattern message', () => {
      const valid = JpPatternSchema.safeParse('invalid')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'regex',
            pattern: '/^\\d{3}-\\d{4}$/',
            path: [],
            message: '郵便番号は123-4567の形式で入力してください',
          },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-minLength-message + x-maxLength-message', () => {
    const JpLenSchema = z
      .string()
      .min(3, { error: '3文字以上で入力してください' })
      .max(10, { error: '10文字以内で入力してください' })

    it.concurrent('codegen: z.string().min().max() with 日本語 errors', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          minLength: 3,
          maxLength: 10,
          'x-minLength-message': '3文字以上で入力してください',
          'x-maxLength-message': '10文字以内で入力してください',
        } as Schema),
      ).toBe(
        'z.string().min(3,{error:"3文字以上で入力してください"}).max(10,{error:"10文字以内で入力してください"})',
      )
    })
    it.concurrent('runtime: "hello" PASSES', () => {
      expect(JpLenSchema.safeParse('hello').success).toBe(true)
    })
    it.concurrent('runtime: "ab" → 日本語 too_small', () => {
      const valid = JpLenSchema.safeParse('ab')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'too_small',
            minimum: 3,
            inclusive: true,
            path: [],
            message: '3文字以上で入力してください',
          },
        ])
      }
    })
    it.concurrent('runtime: "12345678901" → 日本語 too_big', () => {
      const valid = JpLenSchema.safeParse('12345678901')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'too_big',
            maximum: 10,
            inclusive: true,
            path: [],
            message: '10文字以内で入力してください',
          },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-enum-message overrides Zod stock enum error', () => {
    const JpEnumSchema = z.enum(['赤', '緑', '青'], {
      error: '色は赤・緑・青のいずれかで指定してください',
    })

    it.concurrent('codegen: z.enum with 日本語 enum + 日本語 error', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          enum: ['赤', '緑', '青'],
          'x-enum-message': '色は赤・緑・青のいずれかで指定してください',
        } as Schema),
      ).toBe('z.enum(["赤","緑","青"],{error:"色は赤・緑・青のいずれかで指定してください"})')
    })
    it.concurrent('runtime: "赤" PASSES', () => {
      expect(JpEnumSchema.safeParse('赤').success).toBe(true)
    })
    it.concurrent('runtime: "黄" FAILS with 日本語 message', () => {
      const valid = JpEnumSchema.safeParse('黄')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'invalid_value',
            values: ['赤', '緑', '青'],
            path: [],
            message: '色は赤・緑・青のいずれかで指定してください',
          },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-error-message + x-required-message in object property', () => {
    const JpFormSchema = z.object({
      name: z.string({
        error: (issue) => (issue.input === undefined ? 'お名前は必須です' : 'お名前は文字列です'),
      }),
    })

    it.concurrent('codegen: error function with 日本語 differentiation', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            name: {
              type: 'string',
              'x-error-message': 'お名前は文字列です',
              'x-required-message': 'お名前は必須です',
            },
          },
          required: ['name'],
        } as Schema),
      ).toBe(
        'z.object({name:z.string({error:(issue)=>issue.input===undefined?"お名前は必須です":"お名前は文字列です"})}).openapi({"required":["name"]})',
      )
    })
    it.concurrent('runtime: missing name → 日本語 required message', () => {
      const valid = JpFormSchema.safeParse({})
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: ['name'],
            message: 'お名前は必須です',
          },
        ])
      }
    })
    it.concurrent('runtime: name as number → 日本語 type message', () => {
      const valid = JpFormSchema.safeParse({ name: 42 })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: ['name'],
            message: 'お名前は文字列です',
          },
        ])
      }
    })
    it.concurrent('runtime: valid name PASSES', () => {
      expect(JpFormSchema.safeParse({ name: 'たろう' }).success).toBe(true)
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // v3.2: x-refine — additional applied patterns
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 x-refine: applied to array (every-element predicate)', () => {
    const RefineArrayEvery = z
      .array(z.number())
      .refine((arr: number[]) => arr.every((v) => v > 0), {
        message: 'すべての要素は正の数で必要です',
      })

    it.concurrent('codegen: array + .refine(every)', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          items: { type: 'number' },
          'x-refine': [
            {
              fn: '(arr) => arr.every((v) => v > 0)',
              message: 'すべての要素は正の数で必要です',
            },
          ],
        } as Schema),
      ).toBe(
        'z.array(z.number()).refine((arr) => arr.every((v) => v > 0),{message:"すべての要素は正の数で必要です"})',
      )
    })
    it.concurrent('runtime: [1,2,3] PASSES', () => {
      expect(RefineArrayEvery.safeParse([1, 2, 3]).success).toBe(true)
    })
    it.concurrent('runtime: [1,-2,3] FAILS with 日本語 issue', () => {
      const valid = RefineArrayEvery.safeParse([1, -2, 3])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [], message: 'すべての要素は正の数で必要です' },
        ])
      }
    })
  })

  describe('v3.2 x-refine: with deep nested path', () => {
    const RefineDeepPath = z
      .object({
        user: z.object({ profile: z.object({ age: z.number() }) }),
      })
      .refine((v: { user: { profile: { age: number } } }) => v.user.profile.age >= 18, {
        message: '18歳以上で必要です',
        path: ['user', 'profile', 'age'],
      })

    it.concurrent('codegen: refine with deep path array', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                profile: {
                  type: 'object',
                  properties: { age: { type: 'number' } },
                  required: ['age'],
                },
              },
              required: ['profile'],
            },
          },
          required: ['user'],
          'x-refine': [
            {
              fn: '(v) => v.user.profile.age >= 18',
              message: '18歳以上で必要です',
              path: ['user', 'profile', 'age'],
            },
          ],
        } as Schema),
      ).toBe(
        'z.object({user:z.object({profile:z.object({age:z.number()}).openapi({"required":["age"]})}).openapi({"required":["profile"]})}).refine((v) => v.user.profile.age >= 18,{message:"18歳以上で必要です",path:["user","profile","age"]}).openapi({"required":["user"]})',
      )
    })
    it.concurrent('runtime: 18 (boundary) PASSES', () => {
      expect(RefineDeepPath.safeParse({ user: { profile: { age: 18 } } }).success).toBe(true)
    })
    it.concurrent('runtime: 17 FAILS → path:["user","profile","age"]', () => {
      const valid = RefineDeepPath.safeParse({ user: { profile: { age: 17 } } })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'custom',
            path: ['user', 'profile', 'age'],
            message: '18歳以上で必要です',
          },
        ])
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // v3.2: x-superRefine — additional applied patterns
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 x-superRefine: per-element issue with index path', () => {
    const SuperRefinePerElement = z.array(z.string()).superRefine((arr: string[], ctx) => {
      for (const [i, v] of arr.entries()) {
        if (v.length === 0)
          ctx.addIssue({
            code: 'custom',
            path: [i],
            message: `${i}番目の要素は空文字列にできません`,
          })
      }
    })

    it.concurrent('codegen: emits .superRefine on array', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          items: { type: 'string' },
          'x-superRefine': [
            '(arr, ctx) => { for (const [i, v] of arr.entries()) { if (v.length === 0) ctx.addIssue({ code: "custom", path: [i], message: `${i}番目の要素は空文字列にできません` }) } }',
          ],
        } as Schema),
      ).toBe(
        'z.array(z.string()).superRefine((arr, ctx) => { for (const [i, v] of arr.entries()) { if (v.length === 0) ctx.addIssue({ code: "custom", path: [i], message: `${i}番目の要素は空文字列にできません` }) } })',
      )
    })
    it.concurrent('runtime: ["a","b","c"] PASSES', () => {
      expect(SuperRefinePerElement.safeParse(['a', 'b', 'c']).success).toBe(true)
    })
    it.concurrent('runtime: ["a","",""] → 2 per-index issues with 日本語', () => {
      const valid = SuperRefinePerElement.safeParse(['a', '', ''])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [1], message: '1番目の要素は空文字列にできません' },
          { code: 'custom', path: [2], message: '2番目の要素は空文字列にできません' },
        ])
      }
    })
  })

  describe('v3.2 x-superRefine: cross-field validation with multiple paths', () => {
    const SuperRefineCrossField = z
      .object({
        startDate: z.string(),
        endDate: z.string(),
      })
      .superRefine((val: { startDate: string; endDate: string }, ctx) => {
        if (val.startDate > val.endDate) {
          ctx.addIssue({
            code: 'custom',
            path: ['startDate'],
            message: '開始日は終了日より前である必要があります',
          })
          ctx.addIssue({
            code: 'custom',
            path: ['endDate'],
            message: '終了日は開始日より後である必要があります',
          })
        }
      })

    it.concurrent('codegen: emits .superRefine with multi-path addIssue', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            startDate: { type: 'string' },
            endDate: { type: 'string' },
          },
          required: ['startDate', 'endDate'],
          'x-superRefine': [
            '(val, ctx) => { if (val.startDate > val.endDate) { ctx.addIssue({ code: "custom", path: ["startDate"], message: "開始日は終了日より前である必要があります" }); ctx.addIssue({ code: "custom", path: ["endDate"], message: "終了日は開始日より後である必要があります" }) } }',
          ],
        } as Schema),
      ).toBe(
        'z.object({startDate:z.string(),endDate:z.string()}).superRefine((val, ctx) => { if (val.startDate > val.endDate) { ctx.addIssue({ code: "custom", path: ["startDate"], message: "開始日は終了日より前である必要があります" }); ctx.addIssue({ code: "custom", path: ["endDate"], message: "終了日は開始日より後である必要があります" }) } }).openapi({"required":["startDate","endDate"]})',
      )
    })
    it.concurrent('runtime: valid range PASSES', () => {
      expect(
        SuperRefineCrossField.safeParse({
          startDate: '2026-01-01',
          endDate: '2026-12-31',
        }).success,
      ).toBe(true)
    })
    it.concurrent('runtime: reversed dates → 2 issues on different paths', () => {
      const valid = SuperRefineCrossField.safeParse({
        startDate: '2026-12-31',
        endDate: '2026-01-01',
      })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'custom',
            path: ['startDate'],
            message: '開始日は終了日より前である必要があります',
          },
          {
            code: 'custom',
            path: ['endDate'],
            message: '終了日は開始日より後である必要があります',
          },
        ])
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // v3.2: 日本語 x-*-message broad coverage (numeric / array / object slots)
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 日本語: x-multipleOf-message', () => {
    const JpMultipleOf = z.number().multipleOf(0.5, { error: '0.5の倍数で入力してください' })

    it.concurrent('codegen: z.number().multipleOf with 日本語 error', () => {
      expect(
        zodToOpenAPI({
          type: 'number',
          multipleOf: 0.5,
          'x-multipleOf-message': '0.5の倍数で入力してください',
        } as Schema),
      ).toBe('z.number().multipleOf(0.5,{error:"0.5の倍数で入力してください"})')
    })
    it.concurrent('runtime: 1.5 PASSES', () => {
      expect(JpMultipleOf.safeParse(1.5).success).toBe(true)
    })
    it.concurrent('runtime: 1.3 FAILS with 日本語', () => {
      const valid = JpMultipleOf.safeParse(1.3)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'number',
            code: 'not_multiple_of',
            divisor: 0.5,
            path: [],
            message: '0.5の倍数で入力してください',
          },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-minimum-message / x-maximum-message', () => {
    const JpRange = z
      .number()
      .min(0, { error: '0以上で入力してください' })
      .max(100, { error: '100以下で入力してください' })

    it.concurrent('codegen: z.number().min().max() with 日本語 errors', () => {
      expect(
        zodToOpenAPI({
          type: 'number',
          minimum: 0,
          maximum: 100,
          'x-minimum-message': '0以上で入力してください',
          'x-maximum-message': '100以下で入力してください',
        } as Schema),
      ).toBe(
        'z.number().min(0,{error:"0以上で入力してください"}).max(100,{error:"100以下で入力してください"})',
      )
    })
    it.concurrent('runtime: 50 PASSES', () => {
      expect(JpRange.safeParse(50).success).toBe(true)
    })
    it.concurrent('runtime: -1 → 日本語 too_small', () => {
      const valid = JpRange.safeParse(-1)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'number',
            code: 'too_small',
            minimum: 0,
            inclusive: true,
            path: [],
            message: '0以上で入力してください',
          },
        ])
      }
    })
    it.concurrent('runtime: 101 → 日本語 too_big', () => {
      const valid = JpRange.safeParse(101)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'number',
            code: 'too_big',
            maximum: 100,
            inclusive: true,
            path: [],
            message: '100以下で入力してください',
          },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-uniqueItems-message override', () => {
    const JpUnique = z.array(z.string()).superRefine((items: string[], ctx) => {
      const seen = new Map<string, number>()
      for (const [i, v] of items.entries()) {
        const key = JSON.stringify(v)
        if (seen.has(key))
          ctx.addIssue({
            code: 'custom',
            path: [i],
            message: '配列に重複する要素は許可されていません',
          })
        else seen.set(key, i)
      }
    })

    it.concurrent('codegen: uniqueItems with 日本語 override (slot wins over dynamic)', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          items: { type: 'string' },
          uniqueItems: true,
          'x-uniqueItems-message': '配列に重複する要素は許可されていません',
        } as Schema),
      ).toBe(
        'z.array(z.string()).superRefine((items,ctx)=>{const seen=new Map();for(const [i,v] of items.entries()){const key=JSON.stringify(v);if(seen.has(key))ctx.addIssue({code:"custom",path:[i],message:"配列に重複する要素は許可されていません"});else seen.set(key,i)}})',
      )
    })
    it.concurrent('runtime: ["a","b","c"] PASSES', () => {
      expect(JpUnique.safeParse(['a', 'b', 'c']).success).toBe(true)
    })
    it.concurrent('runtime: ["a","b","a"] → path:[2], 日本語 override', () => {
      const valid = JpUnique.safeParse(['a', 'b', 'a'])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [2], message: '配列に重複する要素は許可されていません' },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-not-message', () => {
    const JpNot = z.any().refine((v) => typeof v !== 'string', {
      error: '文字列以外で入力してください',
    })

    it.concurrent('codegen: z.any().refine with 日本語 not message', () => {
      expect(
        zodToOpenAPI({
          not: { type: 'string' },
          'x-not-message': '文字列以外で入力してください',
        } as Schema),
      ).toBe(
        'z.any().refine((v) => typeof v !== \'string\',{error:"文字列以外で入力してください"})',
      )
    })
    it.concurrent('runtime: 42 PASSES (not a string)', () => {
      expect(JpNot.safeParse(42).success).toBe(true)
    })
    it.concurrent('runtime: "hello" FAILS with 日本語 not message', () => {
      const valid = JpNot.safeParse('hello')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [], message: '文字列以外で入力してください' },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-anyOf-message', () => {
    const JpAnyOf = z.union([z.string(), z.number()], {
      error: '文字列または数値で入力してください',
    })

    it.concurrent('codegen: z.union with 日本語 anyOf error', () => {
      expect(
        zodToOpenAPI({
          anyOf: [{ type: 'string' }, { type: 'number' }],
          'x-anyOf-message': '文字列または数値で入力してください',
        } as Schema),
      ).toBe('z.union([z.string(),z.number()],{error:"文字列または数値で入力してください"})')
    })
    it.concurrent('runtime: "abc" PASSES', () => {
      expect(JpAnyOf.safeParse('abc').success).toBe(true)
    })
    it.concurrent('runtime: 42 PASSES', () => {
      expect(JpAnyOf.safeParse(42).success).toBe(true)
    })
    it.concurrent('runtime: true → invalid_union with 日本語 message', () => {
      const valid = JpAnyOf.safeParse(true)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'invalid_union',
            errors: [
              [
                {
                  expected: 'string',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected string, received boolean',
                },
              ],
              [
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received boolean',
                },
              ],
            ],
            path: [],
            message: '文字列または数値で入力してください',
          },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-const-message override', () => {
    const JpConst = z.literal('管理者', { error: '値は「管理者」で必要です' })

    it.concurrent('codegen: z.literal with 日本語 const error', () => {
      expect(
        zodToOpenAPI({
          const: '管理者',
          'x-const-message': '値は「管理者」で必要です',
        } as Schema),
      ).toBe('z.literal("管理者",{error:"値は「管理者」で必要です"})')
    })
    it.concurrent('runtime: "管理者" PASSES', () => {
      expect(JpConst.safeParse('管理者').success).toBe(true)
    })
    it.concurrent('runtime: "ユーザー" FAILS with 日本語 const message', () => {
      const valid = JpConst.safeParse('ユーザー')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'invalid_value',
            values: ['管理者'],
            path: [],
            message: '値は「管理者」で必要です',
          },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-contains-message + dynamic count message overridden', () => {
    const JpContains = z.array(z.any()).superRefine((arr: unknown[], ctx) => {
      const Inner = z.int()
      const matched = arr.filter((i) => Inner.safeParse(i).success).length
      if (matched < 1)
        ctx.addIssue({
          code: 'custom',
          path: [],
          message: '配列に整数を1つ以上含めてください',
        })
    })

    it.concurrent('codegen: contains with 日本語 x-contains-message override', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          contains: { type: 'integer' },
          'x-contains-message': '配列に整数を1つ以上含めてください',
        } as Schema),
      ).toBe(
        'z.array(z.any()).superRefine((arr,ctx)=>{const Schema=z.int();const matched=arr.filter((i)=>Schema.safeParse(i).success).length;if(matched<1)ctx.addIssue({code:"custom",message:"配列に整数を1つ以上含めてください"})})',
      )
    })
    it.concurrent('runtime: [1] PASSES', () => {
      expect(JpContains.safeParse([1]).success).toBe(true)
    })
    it.concurrent('runtime: [] FAILS with 日本語 (slot overrides dynamic)', () => {
      const valid = JpContains.safeParse([])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [], message: '配列に整数を1つ以上含めてください' },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-dependentRequired-message', () => {
    const JpDepRequired = z
      .object({
        creditCard: z.string().exactOptional(),
        cvv: z.string().exactOptional(),
      })
      .superRefine((o: { creditCard?: string; cvv?: string }, ctx) => {
        if (Object.hasOwn(o, 'creditCard')) {
          if (!Object.hasOwn(o, 'cvv'))
            ctx.addIssue({
              code: 'custom',
              path: ['cvv'],
              message: 'creditCardを使う場合はcvvが必須です',
            })
        }
      })

    it.concurrent('codegen: dependentRequired with 日本語 message', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            creditCard: { type: 'string' },
            cvv: { type: 'string' },
          },
          dependentRequired: { creditCard: ['cvv'] },
          'x-dependentRequired-message': 'creditCardを使う場合はcvvが必須です',
        } as Schema),
      ).toBe(
        'z.object({creditCard:z.string().exactOptional(),cvv:z.string().exactOptional()}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"creditCard"))return;if(!Object.hasOwn(o,"cvv"))ctx.addIssue({code:\'custom\',message:"creditCardを使う場合はcvvが必須です",path:["cvv"]})})',
      )
    })
    it.concurrent('runtime: {} PASSES (no creditCard)', () => {
      expect(JpDepRequired.safeParse({}).success).toBe(true)
    })
    it.concurrent('runtime: {creditCard, cvv} PASSES', () => {
      expect(JpDepRequired.safeParse({ creditCard: '1234', cvv: '123' }).success).toBe(true)
    })
    it.concurrent('runtime: {creditCard} only → path:["cvv"], 日本語 message', () => {
      const valid = JpDepRequired.safeParse({ creditCard: '1234' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'custom',
            path: ['cvv'],
            message: 'creditCardを使う場合はcvvが必須です',
          },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-additionalProperties-message (strictObject)', () => {
    const JpStrict = z.strictObject(
      { name: z.string() },
      {
        error: (issue) =>
          issue.code === 'unrecognized_keys' ? '想定外のフィールドが含まれています' : undefined,
      },
    )

    it.concurrent('codegen: strictObject with 日本語 unrecognized_keys override', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: { name: { type: 'string' } },
          required: ['name'],
          additionalProperties: false,
          'x-additionalProperties-message': '想定外のフィールドが含まれています',
        } as Schema),
      ).toBe(
        'z.strictObject({name:z.string()},{error:(issue)=>issue.code===\'unrecognized_keys\'?"想定外のフィールドが含まれています":undefined}).openapi({"required":["name"]})',
      )
    })
    it.concurrent('runtime: {name:"taro"} PASSES', () => {
      expect(JpStrict.safeParse({ name: 'taro' }).success).toBe(true)
    })
    it.concurrent('runtime: {name:"taro", extra:"x"} → 日本語 unrecognized_keys', () => {
      const valid = JpStrict.safeParse({ name: 'taro', extra: 'x' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'unrecognized_keys',
            keys: ['extra'],
            path: [],
            message: '想定外のフィールドが含まれています',
          },
        ])
      }
    })
  })

  // ───────────────────────────────────────────────────────────────────
  // v3.2 format option x-* extensions (codegen + runtime pairs)
  // ───────────────────────────────────────────────────────────────────

  describe('v3.2 x-emailPattern: html5 preset', () => {
    const EmailHtml5 = z.email({ pattern: z.regexes.html5Email })
    it.concurrent('codegen: z.email({pattern:z.regexes.html5Email})', () => {
      expect(
        zodToOpenAPI({ type: 'string', format: 'email', 'x-emailPattern': 'html5' } as Schema),
      ).toBe('z.email({pattern:z.regexes.html5Email})')
    })
    it.concurrent('runtime: "alice@example.com" PASSES', () => {
      expect(EmailHtml5.safeParse('alice@example.com').success).toBe(true)
    })
    it.concurrent('runtime: "not-an-email" FAILS', () => {
      const valid = EmailHtml5.safeParse('not-an-email')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'email',
            pattern: z.regexes.html5Email.toString(),
            path: [],
            message: 'Invalid email address',
          },
        ])
      }
    })
  })

  describe('v3.2 x-emailPattern: rfc5322 preset', () => {
    const EmailRfc = z.email({ pattern: z.regexes.rfc5322Email })
    it.concurrent('codegen: z.email({pattern:z.regexes.rfc5322Email})', () => {
      expect(
        zodToOpenAPI({ type: 'string', format: 'email', 'x-emailPattern': 'rfc5322' } as Schema),
      ).toBe('z.email({pattern:z.regexes.rfc5322Email})')
    })
    it.concurrent('runtime: "user@host.com" PASSES', () => {
      expect(EmailRfc.safeParse('user@host.com').success).toBe(true)
    })
    it.concurrent('runtime: "no-at-sign" FAILS', () => {
      const valid = EmailRfc.safeParse('no-at-sign')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'email',
            pattern: z.regexes.rfc5322Email.toString(),
            path: [],
            message: 'Invalid email address',
          },
        ])
      }
    })
  })

  describe('v3.2 x-emailPattern: unicode preset', () => {
    const EmailUni = z.email({ pattern: z.regexes.unicodeEmail })
    it.concurrent('codegen: z.email({pattern:z.regexes.unicodeEmail})', () => {
      expect(
        zodToOpenAPI({ type: 'string', format: 'email', 'x-emailPattern': 'unicode' } as Schema),
      ).toBe('z.email({pattern:z.regexes.unicodeEmail})')
    })
    it.concurrent('runtime: "山田@例え.jp" PASSES', () => {
      expect(EmailUni.safeParse('山田@例え.jp').success).toBe(true)
    })
    it.concurrent('runtime: "bad" FAILS', () => {
      const valid = EmailUni.safeParse('bad')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'email',
            pattern: z.regexes.unicodeEmail.toString(),
            path: [],
            message: 'Invalid email address',
          },
        ])
      }
    })
  })

  describe('v3.2 x-emailRegex: custom regex overrides preset', () => {
    const regex = /^[a-z]+@example\.com$/
    const EmailReg = z.email({ pattern: regex })
    it.concurrent('codegen: z.email({pattern:/^[a-z]+@example\\.com$/})', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          format: 'email',
          'x-emailRegex': '^[a-z]+@example\\.com$',
        } as Schema),
      ).toBe('z.email({pattern:/^[a-z]+@example\\.com$/})')
    })
    it.concurrent('runtime: "alice@example.com" PASSES', () => {
      expect(EmailReg.safeParse('alice@example.com').success).toBe(true)
    })
    it.concurrent('runtime: "alice@other.com" FAILS', () => {
      const valid = EmailReg.safeParse('alice@other.com')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'email',
            pattern: regex.toString(),
            path: [],
            message: 'Invalid email address',
          },
        ])
      }
    })
  })

  describe('v3.2 x-uuidVersion: v4', () => {
    const UuidV4 = z.uuid({ version: 'v4' })
    it.concurrent('codegen: z.uuid({version:"v4"})', () => {
      expect(
        zodToOpenAPI({ type: 'string', format: 'uuid', 'x-uuidVersion': 'v4' } as Schema),
      ).toBe('z.uuid({version:"v4"})')
    })
    it.concurrent('runtime: v4 UUID PASSES', () => {
      expect(UuidV4.safeParse('f47ac10b-58cc-4372-a567-0e02b2c3d479').success).toBe(true)
    })
    it.concurrent('runtime: v7 UUID FAILS (wrong version)', () => {
      const valid = UuidV4.safeParse('01890b13-0000-7000-8000-000000000000')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'uuid',
            pattern:
              '/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/',
            path: [],
            message: 'Invalid UUID',
          },
        ])
      }
    })
  })

  describe('v3.2 x-uuidVersion: v7', () => {
    const UuidV7 = z.uuid({ version: 'v7' })
    it.concurrent('codegen: z.uuid({version:"v7"})', () => {
      expect(
        zodToOpenAPI({ type: 'string', format: 'uuid', 'x-uuidVersion': 'v7' } as Schema),
      ).toBe('z.uuid({version:"v7"})')
    })
    it.concurrent('runtime: v7 UUID PASSES', () => {
      expect(UuidV7.safeParse('01890b13-0000-7000-8000-000000000000').success).toBe(true)
    })
    it.concurrent('runtime: v4 UUID FAILS', () => {
      const valid = UuidV7.safeParse('f47ac10b-58cc-4372-a567-0e02b2c3d479')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'uuid',
            pattern:
              '/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-7[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/',
            path: [],
            message: 'Invalid UUID',
          },
        ])
      }
    })
  })

  describe('v3.2 x-isoPrecision: 0 (no fractional seconds)', () => {
    const Dt0 = z.iso.datetime({ precision: 0 })
    it.concurrent('codegen: z.iso.datetime({precision:0})', () => {
      expect(
        zodToOpenAPI({ type: 'string', format: 'date-time', 'x-isoPrecision': 0 } as Schema),
      ).toBe('z.iso.datetime({precision:0})')
    })
    it.concurrent('runtime: "2024-01-02T03:04:05Z" PASSES', () => {
      expect(Dt0.safeParse('2024-01-02T03:04:05Z').success).toBe(true)
    })
    it.concurrent('runtime: "2024-01-02T03:04:05.123Z" FAILS', () => {
      const valid = Dt0.safeParse('2024-01-02T03:04:05.123Z')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'datetime',
            pattern:
              '/^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))T(?:(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:Z))$/',
            path: [],
            message: 'Invalid ISO datetime',
          },
        ])
      }
    })
  })

  describe('v3.2 x-isoPrecision: 3 (millisecond precision required)', () => {
    const Dt3 = z.iso.datetime({ precision: 3 })
    it.concurrent('codegen: z.iso.datetime({precision:3})', () => {
      expect(
        zodToOpenAPI({ type: 'string', format: 'date-time', 'x-isoPrecision': 3 } as Schema),
      ).toBe('z.iso.datetime({precision:3})')
    })
    it.concurrent('runtime: "2024-01-02T03:04:05.123Z" PASSES', () => {
      expect(Dt3.safeParse('2024-01-02T03:04:05.123Z').success).toBe(true)
    })
    it.concurrent('runtime: "2024-01-02T03:04:05Z" FAILS', () => {
      const valid = Dt3.safeParse('2024-01-02T03:04:05Z')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'datetime',
            pattern:
              '/^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))T(?:(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d\\.\\d{3}(?:Z))$/',
            path: [],
            message: 'Invalid ISO datetime',
          },
        ])
      }
    })
  })

  describe('v3.2 x-isoOffset: true (timezone offset allowed)', () => {
    const DtOff = z.iso.datetime({ offset: true })
    it.concurrent('codegen: z.iso.datetime({offset:true})', () => {
      expect(
        zodToOpenAPI({ type: 'string', format: 'date-time', 'x-isoOffset': true } as Schema),
      ).toBe('z.iso.datetime({offset:true})')
    })
    it.concurrent('runtime: "2024-01-02T03:04:05+09:00" PASSES', () => {
      expect(DtOff.safeParse('2024-01-02T03:04:05+09:00').success).toBe(true)
    })
    it.concurrent('runtime: "not-a-date" FAILS', () => {
      const valid = DtOff.safeParse('not-a-date')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues.length).toBe(1)
        expect(valid.error.issues[0].code).toBe('invalid_format')
        expect(valid.error.issues[0].message).toBe('Invalid ISO datetime')
      }
    })
  })

  describe('v3.2 x-isoLocal: true (no Z required)', () => {
    const DtLocal = z.iso.datetime({ local: true })
    it.concurrent('codegen: z.iso.datetime({local:true})', () => {
      expect(
        zodToOpenAPI({ type: 'string', format: 'date-time', 'x-isoLocal': true } as Schema),
      ).toBe('z.iso.datetime({local:true})')
    })
    it.concurrent('runtime: "2024-01-02T03:04:05" PASSES (no Z)', () => {
      expect(DtLocal.safeParse('2024-01-02T03:04:05').success).toBe(true)
    })
    it.concurrent('runtime: "no-date" FAILS', () => {
      const valid = DtLocal.safeParse('no-date')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues.length).toBe(1)
        expect(valid.error.issues[0].code).toBe('invalid_format')
      }
    })
  })

  describe('v3.2 x-urlProtocol: https only', () => {
    const UrlHttps = z.url({ protocol: /^https$/ })
    it.concurrent('codegen: z.url({protocol:/^https$/})', () => {
      expect(
        zodToOpenAPI({ type: 'string', format: 'url', 'x-urlProtocol': '^https$' } as Schema),
      ).toBe('z.url({protocol:/^https$/})')
    })
    it.concurrent('runtime: "https://example.com" PASSES', () => {
      expect(UrlHttps.safeParse('https://example.com').success).toBe(true)
    })
    it.concurrent('runtime: "http://example.com" FAILS', () => {
      const valid = UrlHttps.safeParse('http://example.com')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'invalid_format',
            format: 'url',
            note: 'Invalid protocol',
            pattern: '^https$',
            path: [],
            message: 'Invalid URL',
          },
        ])
      }
    })
  })

  describe('v3.2 x-urlHostname: limit hostname', () => {
    const UrlHost = z.url({ hostname: /^example\.com$/ })
    it.concurrent('codegen: z.url({hostname:/^example\\.com$/})', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          format: 'url',
          'x-urlHostname': '^example\\.com$',
        } as Schema),
      ).toBe('z.url({hostname:/^example\\.com$/})')
    })
    it.concurrent('runtime: "https://example.com/x" PASSES', () => {
      expect(UrlHost.safeParse('https://example.com/x').success).toBe(true)
    })
    it.concurrent('runtime: "https://other.com" FAILS', () => {
      const valid = UrlHost.safeParse('https://other.com')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'invalid_format',
            format: 'url',
            note: 'Invalid hostname',
            pattern: '^example\\.com$',
            path: [],
            message: 'Invalid URL',
          },
        ])
      }
    })
  })

  describe('v3.2 x-macDelimiter: colon', () => {
    const MacColon = z.mac({ delimiter: ':' })
    it.concurrent('codegen: z.mac({delimiter:":"})', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'mac', 'x-macDelimiter': ':' } as Schema)).toBe(
        'z.mac({delimiter:":"})',
      )
    })
    it.concurrent('runtime: "00:11:22:33:44:55" PASSES', () => {
      expect(MacColon.safeParse('00:11:22:33:44:55').success).toBe(true)
    })
    it.concurrent('runtime: "00-11-22-33-44-55" FAILS', () => {
      const valid = MacColon.safeParse('00-11-22-33-44-55')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'mac',
            pattern: '/^(?:[0-9A-F]{2}:){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}:){5}[0-9a-f]{2}$/',
            path: [],
            message: 'Invalid MAC address',
          },
        ])
      }
    })
  })

  describe('v3.2 x-macDelimiter: dash', () => {
    const MacDash = z.mac({ delimiter: '-' })
    it.concurrent('codegen: z.mac({delimiter:"-"})', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'mac', 'x-macDelimiter': '-' } as Schema)).toBe(
        'z.mac({delimiter:"-"})',
      )
    })
    it.concurrent('runtime: "00-11-22-33-44-55" PASSES', () => {
      expect(MacDash.safeParse('00-11-22-33-44-55').success).toBe(true)
    })
    it.concurrent('runtime: "00:11:22:33:44:55" FAILS', () => {
      const valid = MacDash.safeParse('00:11:22:33:44:55')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'mac',
            pattern: '/^(?:[0-9A-F]{2}-){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}-){5}[0-9a-f]{2}$/',
            path: [],
            message: 'Invalid MAC address',
          },
        ])
      }
    })
  })

  describe('v3.2 x-jwtAlg: HS256', () => {
    const Jwt = z.jwt({ alg: 'HS256' })
    it.concurrent('codegen: z.jwt({alg:"HS256"})', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'jwt', 'x-jwtAlg': 'HS256' } as Schema)).toBe(
        'z.jwt({alg:"HS256"})',
      )
    })
    it.concurrent('runtime: "not.a.jwt" FAILS', () => {
      const valid = Jwt.safeParse('not.a.jwt')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'invalid_format',
            format: 'jwt',
            path: [],
            message: 'Invalid JWT',
          },
        ])
      }
    })
  })

  describe('v3.2 x-hashAlg + x-hashEnc: sha256 hex', () => {
    const HashHex = z.hash('sha256', { enc: 'hex' })
    it.concurrent('codegen: z.hash("sha256",{enc:"hex"})', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          format: 'hash',
          'x-hashAlg': 'sha256',
          'x-hashEnc': 'hex',
        } as Schema),
      ).toBe('z.hash("sha256",{enc:"hex"})')
    })
    it.concurrent('runtime: 64-char hex PASSES', () => {
      expect(HashHex.safeParse('a'.repeat(64)).success).toBe(true)
    })
    it.concurrent('runtime: "short" FAILS', () => {
      const valid = HashHex.safeParse('short')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'invalid_format',
            format: 'sha256_hex',
            path: [],
            message: 'Invalid sha256_hex',
          },
        ])
      }
    })
  })

  describe('v3.2 x-hashAlg: sha1 (no enc → default hex)', () => {
    const HashSha1 = z.hash('sha1')
    it.concurrent('codegen: z.hash("sha1")', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'hash', 'x-hashAlg': 'sha1' } as Schema)).toBe(
        'z.hash("sha1")',
      )
    })
    it.concurrent('runtime: 40-char hex PASSES', () => {
      expect(HashSha1.safeParse('a'.repeat(40)).success).toBe(true)
    })
    it.concurrent('runtime: "short" FAILS', () => {
      const valid = HashSha1.safeParse('short')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'invalid_format',
            format: 'sha1_hex',
            path: [],
            message: 'Invalid sha1_hex',
          },
        ])
      }
    })
  })

  // ───────────────────────────────────────────────────────────────────
  // v3.2 transform x-* extensions
  // ───────────────────────────────────────────────────────────────────

  describe('v3.2 x-trim: trim whitespace', () => {
    const Trim = z.string().trim()
    it.concurrent('codegen: z.string().trim()', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-trim': true } as Schema)).toBe('z.string().trim()')
    })
    it.concurrent('runtime: "  hi  " → "hi"', () => {
      const valid = Trim.safeParse('  hi  ')
      expect(valid.success).toBe(true)
      if (valid.success) expect(valid.data).toBe('hi')
    })
  })

  describe('v3.2 x-toLowerCase: transform to lowercase', () => {
    const Lower = z.string().toLowerCase()
    it.concurrent('codegen: z.string().toLowerCase()', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-toLowerCase': true } as Schema)).toBe(
        'z.string().toLowerCase()',
      )
    })
    it.concurrent('runtime: "AbC" → "abc"', () => {
      const valid = Lower.safeParse('AbC')
      expect(valid.success).toBe(true)
      if (valid.success) expect(valid.data).toBe('abc')
    })
  })

  describe('v3.2 x-toUpperCase: transform to uppercase', () => {
    const Upper = z.string().toUpperCase()
    it.concurrent('codegen: z.string().toUpperCase()', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-toUpperCase': true } as Schema)).toBe(
        'z.string().toUpperCase()',
      )
    })
    it.concurrent('runtime: "AbC" → "ABC"', () => {
      const valid = Upper.safeParse('AbC')
      expect(valid.success).toBe(true)
      if (valid.success) expect(valid.data).toBe('ABC')
    })
  })

  describe('v3.2 x-normalize: NFC Unicode normalization', () => {
    const Nfc = z.string().normalize('NFC')
    it.concurrent('codegen: z.string().normalize("NFC")', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-normalize': 'NFC' } as Schema)).toBe(
        'z.string().normalize("NFC")',
      )
    })
    it.concurrent('runtime: NFD form normalized to NFC', () => {
      // "が" can be NFD (か + combining ゛) or NFC (single char)
      const nfd = 'が'
      const nfc = 'が'
      const valid = Nfc.safeParse(nfd)
      expect(valid.success).toBe(true)
      if (valid.success) expect(valid.data).toBe(nfc)
    })
  })

  describe('v3.2 x-normalize: NFKC normalization', () => {
    const Nfkc = z.string().normalize('NFKC')
    it.concurrent('codegen: z.string().normalize("NFKC")', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-normalize': 'NFKC' } as Schema)).toBe(
        'z.string().normalize("NFKC")',
      )
    })
    it.concurrent('runtime: full-width digits → ASCII', () => {
      const valid = Nfkc.safeParse('１２３')
      expect(valid.success).toBe(true)
      if (valid.success) expect(valid.data).toBe('123')
    })
  })

  describe('v3.2 x-lowercase: validate lowercase only', () => {
    const LowerCheck = z.string().lowercase()
    it.concurrent('codegen: z.string().lowercase()', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-lowercase': true } as Schema)).toBe(
        'z.string().lowercase()',
      )
    })
    it.concurrent('runtime: "abc" PASSES', () => {
      expect(LowerCheck.safeParse('abc').success).toBe(true)
    })
    it.concurrent('runtime: "ABC" FAILS', () => {
      const valid = LowerCheck.safeParse('ABC')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'lowercase',
            pattern: '/^[^A-Z]*$/',
            path: [],
            message: 'Invalid lowercase',
          },
        ])
      }
    })
  })

  describe('v3.2 x-uppercase: validate uppercase only', () => {
    const UpperCheck = z.string().uppercase()
    it.concurrent('codegen: z.string().uppercase()', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-uppercase': true } as Schema)).toBe(
        'z.string().uppercase()',
      )
    })
    it.concurrent('runtime: "ABC" PASSES', () => {
      expect(UpperCheck.safeParse('ABC').success).toBe(true)
    })
    it.concurrent('runtime: "abc" FAILS', () => {
      const valid = UpperCheck.safeParse('abc')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'uppercase',
            pattern: '/^[^a-z]*$/',
            path: [],
            message: 'Invalid uppercase',
          },
        ])
      }
    })
  })

  describe('v3.2 x-coerce: z.coerce.string()', () => {
    const CS = z.coerce.string()
    it.concurrent('codegen: z.coerce.string()', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-coerce': true } as Schema)).toBe('z.coerce.string()')
    })
    it.concurrent('runtime: 123 → "123"', () => {
      const valid = CS.safeParse(123)
      expect(valid.success).toBe(true)
      if (valid.success) expect(valid.data).toBe('123')
    })
  })

  describe('v3.2 x-coerce: z.coerce.number()', () => {
    const CN = z.coerce.number()
    it.concurrent('codegen: z.coerce.number()', () => {
      expect(zodToOpenAPI({ type: 'number', 'x-coerce': true } as Schema)).toBe('z.coerce.number()')
    })
    it.concurrent('runtime: "42" → 42', () => {
      const valid = CN.safeParse('42')
      expect(valid.success).toBe(true)
      if (valid.success) expect(valid.data).toBe(42)
    })
    it.concurrent('runtime: "abc" → NaN FAILS', () => {
      const valid = CN.safeParse('abc')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'number',
            code: 'invalid_type',
            received: 'NaN',
            path: [],
            message: 'Invalid input: expected number, received NaN',
          },
        ])
      }
    })
  })

  describe('v3.2 x-coerce: z.coerce.boolean()', () => {
    const CB = z.coerce.boolean()
    it.concurrent('codegen: z.coerce.boolean()', () => {
      expect(zodToOpenAPI({ type: 'boolean', 'x-coerce': true } as Schema)).toBe(
        'z.coerce.boolean()',
      )
    })
    it.concurrent('runtime: "truthy" → true', () => {
      const valid = CB.safeParse('truthy')
      expect(valid.success).toBe(true)
      if (valid.success) expect(valid.data).toBe(true)
    })
    it.concurrent('runtime: "" → false', () => {
      const valid = CB.safeParse('')
      expect(valid.success).toBe(true)
      if (valid.success) expect(valid.data).toBe(false)
    })
  })

  describe('v3.2 x-coerce: z.coerce.date() for date format', () => {
    const CD = z.coerce.date()
    it.concurrent('codegen: z.coerce.date()', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'date', 'x-coerce': true } as Schema)).toBe(
        'z.coerce.date()',
      )
    })
    it.concurrent('runtime: "2024-01-02" → Date PASSES', () => {
      const valid = CD.safeParse('2024-01-02')
      expect(valid.success).toBe(true)
    })
    it.concurrent('runtime: "not-a-date" FAILS', () => {
      const valid = CD.safeParse('not-a-date')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'date',
            code: 'invalid_type',
            received: 'Invalid Date',
            path: [],
            message: 'Invalid input: expected date, received Date',
          },
        ])
      }
    })
  })

  describe('v3.2 x-includes: substring presence', () => {
    const Inc = z.string().includes('foo')
    it.concurrent('codegen: z.string().includes("foo")', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-includes': 'foo' } as Schema)).toBe(
        'z.string().includes("foo")',
      )
    })
    it.concurrent('runtime: "barfoo" PASSES', () => {
      expect(Inc.safeParse('barfoo').success).toBe(true)
    })
    it.concurrent('runtime: "bar" FAILS', () => {
      const valid = Inc.safeParse('bar')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'includes',
            includes: 'foo',
            path: [],
            message: 'Invalid string: must include "foo"',
          },
        ])
      }
    })
  })

  describe('v3.2 x-startsWith: prefix check', () => {
    const Sw = z.string().startsWith('http')
    it.concurrent('codegen: z.string().startsWith("http")', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-startsWith': 'http' } as Schema)).toBe(
        'z.string().startsWith("http")',
      )
    })
    it.concurrent('runtime: "http://x" PASSES', () => {
      expect(Sw.safeParse('http://x').success).toBe(true)
    })
    it.concurrent('runtime: "ftp://x" FAILS', () => {
      const valid = Sw.safeParse('ftp://x')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'starts_with',
            prefix: 'http',
            path: [],
            message: 'Invalid string: must start with "http"',
          },
        ])
      }
    })
  })

  describe('v3.2 x-endsWith: suffix check', () => {
    const Ew = z.string().endsWith('.com')
    it.concurrent('codegen: z.string().endsWith(".com")', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-endsWith': '.com' } as Schema)).toBe(
        'z.string().endsWith(".com")',
      )
    })
    it.concurrent('runtime: "x.com" PASSES', () => {
      expect(Ew.safeParse('x.com').success).toBe(true)
    })
    it.concurrent('runtime: "x.org" FAILS', () => {
      const valid = Ew.safeParse('x.org')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'ends_with',
            suffix: '.com',
            path: [],
            message: 'Invalid string: must end with ".com"',
          },
        ])
      }
    })
  })

  describe('v3.2 x-trim + x-toLowerCase + email format (pre-validation pipe)', () => {
    const Pipe = z.string().trim().toLowerCase().pipe(z.email())
    it.concurrent('codegen: z.string().trim().toLowerCase().pipe(z.email())', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          format: 'email',
          'x-trim': true,
          'x-toLowerCase': true,
        } as Schema),
      ).toBe('z.string().trim().toLowerCase().pipe(z.email())')
    })
    it.concurrent('runtime: "  Foo@Example.com  " → "foo@example.com"', () => {
      const valid = Pipe.safeParse('  Foo@Example.com  ')
      expect(valid.success).toBe(true)
      if (valid.success) expect(valid.data).toBe('foo@example.com')
    })
  })

  // ───────────────────────────────────────────────────────────────────
  // v3.2 extension x-* (prefault / freeze / codec)
  // ───────────────────────────────────────────────────────────────────

  describe('v3.2 x-prefault: input default', () => {
    const Pf = z.string().prefault('def')
    it.concurrent('codegen: z.string().prefault("def")', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-prefault': 'def' } as Schema)).toBe(
        'z.string().prefault("def")',
      )
    })
    it.concurrent('runtime: undefined → "def"', () => {
      const valid = Pf.safeParse(undefined)
      expect(valid.success).toBe(true)
      if (valid.success) expect(valid.data).toBe('def')
    })
    it.concurrent('runtime: 1 → invalid_type', () => {
      const valid = Pf.safeParse(1)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: [],
            message: 'Invalid input: expected string, received number',
          },
        ])
      }
    })
  })

  describe('v3.2 x-freeze: .readonly() (Object.freeze on output)', () => {
    const Fr = z.object({ a: z.string() }).readonly()
    it.concurrent('codegen: z.object({a:z.string()}).readonly().openapi(...)', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: { a: { type: 'string' } },
          required: ['a'],
          'x-freeze': true,
        } as Schema),
      ).toBe('z.object({a:z.string()}).readonly().openapi({"required":["a"]})')
    })
    it.concurrent('runtime: {a:"x"} PASSES (frozen)', () => {
      const valid = Fr.safeParse({ a: 'x' })
      expect(valid.success).toBe(true)
      if (valid.success) expect(Object.isFrozen(valid.data)).toBe(true)
    })
    it.concurrent('runtime: {a:1} FAILS', () => {
      const valid = Fr.safeParse({ a: 1 })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: ['a'],
            message: 'Invalid input: expected string, received number',
          },
        ])
      }
    })
  })

  describe('v3.2 x-codec: date (string ⇄ Date)', () => {
    const Codec = z.codec(z.iso.date(), z.date(), {
      decode: (isoString: string) => new Date(isoString),
      encode: (date: Date) => date.toISOString(),
    })
    it.concurrent('codegen: z.codec(z.iso.date(),z.date(),{decode,encode})', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'date', 'x-codec': 'date' } as Schema)).toBe(
        'z.codec(z.iso.date(),z.date(),{decode:(isoString)=>new Date(isoString),encode:(date)=>date.toISOString()})',
      )
    })
    it.concurrent('runtime: "2024-01-02" → Date instance PASSES', () => {
      const valid = Codec.safeParse('2024-01-02')
      expect(valid.success).toBe(true)
    })
    it.concurrent('runtime: "not-a-date" FAILS', () => {
      const valid = Codec.safeParse('not-a-date')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'date',
            pattern:
              '/^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$/',
            path: [],
            message: 'Invalid ISO date',
          },
        ])
      }
    })
  })

  describe('v3.2 x-codec: date for date-time format', () => {
    const CodecDt = z.codec(z.iso.datetime(), z.date(), {
      decode: (isoString: string) => new Date(isoString),
      encode: (date: Date) => date.toISOString(),
    })
    it.concurrent('codegen: z.codec(z.iso.datetime(),z.date(),{decode,encode})', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          format: 'date-time',
          'x-codec': 'date',
        } as Schema),
      ).toBe(
        'z.codec(z.iso.datetime(),z.date(),{decode:(isoString)=>new Date(isoString),encode:(date)=>date.toISOString()})',
      )
    })
    it.concurrent('runtime: "2024-01-02T03:04:05Z" PASSES', () => {
      const valid = CodecDt.safeParse('2024-01-02T03:04:05Z')
      expect(valid.success).toBe(true)
    })
  })

  // ───────────────────────────────────────────────────────────────────
  // v3.2 numeric format extensions
  // ───────────────────────────────────────────────────────────────────

  describe('v3.2 integer format: bigint', () => {
    const Bi = z.bigint()
    it.concurrent('codegen: z.bigint()', () => {
      expect(zodToOpenAPI({ type: 'integer', format: 'bigint' } as Schema)).toBe('z.bigint()')
    })
    it.concurrent('runtime: BigInt(1) PASSES', () => {
      expect(Bi.safeParse(BigInt(1)).success).toBe(true)
    })
    it.concurrent('runtime: 1 (number) FAILS', () => {
      const valid = Bi.safeParse(1)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'bigint',
            code: 'invalid_type',
            path: [],
            message: 'Invalid input: expected bigint, received number',
          },
        ])
      }
    })
  })

  describe('v3.2 integer format: int64', () => {
    const I64 = z.int64()
    it.concurrent('codegen: z.int64()', () => {
      expect(zodToOpenAPI({ type: 'integer', format: 'int64' } as Schema)).toBe('z.int64()')
    })
    it.concurrent('runtime: BigInt(1) PASSES', () => {
      expect(I64.safeParse(BigInt(1)).success).toBe(true)
    })
    it.concurrent('runtime: 1 (number) FAILS', () => {
      const valid = I64.safeParse(1)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'bigint',
            code: 'invalid_type',
            path: [],
            message: 'Invalid input: expected bigint, received number',
          },
        ])
      }
    })
  })

  describe('v3.2 number format: float32', () => {
    const F32 = z.float32()
    it.concurrent('codegen: z.float32()', () => {
      expect(zodToOpenAPI({ type: 'number', format: 'float32' } as Schema)).toBe('z.float32()')
    })
    it.concurrent('runtime: 1.5 PASSES', () => {
      expect(F32.safeParse(1.5).success).toBe(true)
    })
    it.concurrent('runtime: "x" FAILS', () => {
      const valid = F32.safeParse('x')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'number',
            code: 'invalid_type',
            path: [],
            message: 'Invalid input: expected number, received string',
          },
        ])
      }
    })
  })

  describe('v3.2 number format: float64', () => {
    const F64 = z.float64()
    it.concurrent('codegen: z.float64()', () => {
      expect(zodToOpenAPI({ type: 'number', format: 'float64' } as Schema)).toBe('z.float64()')
    })
    it.concurrent('runtime: 1.5 PASSES', () => {
      expect(F64.safeParse(1.5).success).toBe(true)
    })
    it.concurrent('runtime: "x" FAILS', () => {
      const valid = F64.safeParse('x')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'number',
            code: 'invalid_type',
            path: [],
            message: 'Invalid input: expected number, received string',
          },
        ])
      }
    })
  })

  // ───────────────────────────────────────────────────────────────────
  // v3.2 array applications
  // ───────────────────────────────────────────────────────────────────

  describe('v3.2 array: prefixItems + items:false (length cap)', () => {
    const PrefixCap = z.array(z.unknown()).superRefine((arr, ctx) => {
      const Prefix = [z.string(), z.number()]
      for (const [i, S] of Prefix.slice(0, arr.length).entries()) {
        const valid = S.safeParse(arr[i])
        if (!valid.success)
          for (const issue of valid.error.issues)
            ctx.addIssue({ ...issue, path: [i, ...issue.path] })
      }
      for (let i = Prefix.length; i < arr.length; i++)
        ctx.addIssue({ code: 'custom', path: [i], message: 'Unevaluated item at index ' + i })
    })
    it.concurrent('codegen: superRefine with prefix + length cap', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          prefixItems: [{ type: 'string' }, { type: 'number' }],
          items: false,
        } as unknown as Schema),
      ).toBe(
        'z.array(z.unknown()).superRefine((arr,ctx)=>{const Prefix=[z.string(),z.number()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const valid=Schema.safeParse(arr[i]);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:[i,...issue.path]})};for(let i=Prefix.length;i<arr.length;i++)ctx.addIssue({code:"custom",path:[i],message:"Unevaluated item at index "+i})})',
      )
    })
    it.concurrent('runtime: ["a"] PASSES (incomplete prefix)', () => {
      expect(PrefixCap.safeParse(['a']).success).toBe(true)
    })
    it.concurrent('runtime: ["a", 1] PASSES (full prefix)', () => {
      expect(PrefixCap.safeParse(['a', 1]).success).toBe(true)
    })
    it.concurrent('runtime: ["a", 1, "extra"] FAILS (cap exceeded at index 2)', () => {
      const valid = PrefixCap.safeParse(['a', 1, 'extra'])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'custom',
            path: [2],
            message: 'Unevaluated item at index 2',
          },
        ])
      }
    })
  })

  describe('v3.2 array: prefixItems alone (no rest) — trailing items allowed', () => {
    const PrefixOnly = z.array(z.unknown()).superRefine((arr, ctx) => {
      const Prefix = [z.string()]
      for (const [i, S] of Prefix.slice(0, arr.length).entries()) {
        const valid = S.safeParse(arr[i])
        if (!valid.success)
          for (const issue of valid.error.issues)
            ctx.addIssue({ ...issue, path: [i, ...issue.path] })
      }
    })
    it.concurrent('codegen: superRefine with prefix only', () => {
      expect(zodToOpenAPI({ type: 'array', prefixItems: [{ type: 'string' }] } as Schema)).toBe(
        'z.array(z.unknown()).superRefine((arr,ctx)=>{const Prefix=[z.string()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const valid=Schema.safeParse(arr[i]);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:[i,...issue.path]})}})',
      )
    })
    it.concurrent('runtime: ["a", 1, true] PASSES (extras allowed)', () => {
      expect(PrefixOnly.safeParse(['a', 1, true]).success).toBe(true)
    })
    it.concurrent('runtime: [1] FAILS (prefix mismatch at index 0)', () => {
      const valid = PrefixOnly.safeParse([1])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: [0],
            message: 'Invalid input: expected string, received number',
          },
        ])
      }
    })
  })

  describe('v3.2 array: uniqueItems on object array (deep equal)', () => {
    const Uniq = z.array(z.object({ id: z.string() })).superRefine((items, ctx) => {
      const seen = new Map<string, number>()
      for (const [i, v] of items.entries()) {
        const key = JSON.stringify(v)
        if (seen.has(key))
          ctx.addIssue({
            code: 'custom',
            path: [i],
            message: 'Duplicate of index ' + seen.get(key),
          })
        else seen.set(key, i)
      }
    })
    it.concurrent('codegen: object array with uniqueItems superRefine', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          items: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
          uniqueItems: true,
        } as Schema),
      ).toBe(
        'z.array(z.object({id:z.string()}).openapi({"required":["id"]})).superRefine((items,ctx)=>{const seen=new Map();for(const [i,v] of items.entries()){const key=JSON.stringify(v);if(seen.has(key))ctx.addIssue({code:"custom",path:[i],message:"Duplicate of index "+seen.get(key)});else seen.set(key,i)}})',
      )
    })
    it.concurrent('runtime: [{id:"a"},{id:"b"}] PASSES', () => {
      expect(Uniq.safeParse([{ id: 'a' }, { id: 'b' }]).success).toBe(true)
    })
    it.concurrent('runtime: [{id:"a"},{id:"a"}] FAILS at index 1', () => {
      const valid = Uniq.safeParse([{ id: 'a' }, { id: 'a' }])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'custom',
            path: [1],
            message: 'Duplicate of index 0',
          },
        ])
      }
    })
  })

  // ───────────────────────────────────────────────────────────────────
  // v3.2 object applications
  // ───────────────────────────────────────────────────────────────────

  describe('v3.2 object: additionalProperties Schema → z.record', () => {
    const Rec = z.record(z.string(), z.number())
    it.concurrent('codegen: z.record(z.string(),z.number())', () => {
      expect(
        zodToOpenAPI({ type: 'object', additionalProperties: { type: 'number' } } as Schema),
      ).toBe('z.record(z.string(),z.number())')
    })
    it.concurrent('runtime: {a:1,b:2} PASSES', () => {
      expect(Rec.safeParse({ a: 1, b: 2 }).success).toBe(true)
    })
    it.concurrent('runtime: {a:"x"} FAILS at .a', () => {
      const valid = Rec.safeParse({ a: 'x' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'number',
            code: 'invalid_type',
            path: ['a'],
            message: 'Invalid input: expected number, received string',
          },
        ])
      }
    })
  })

  describe('v3.2 object: looseObject (additionalProperties: true)', () => {
    const Loose = z.looseObject({ a: z.string().exactOptional() })
    it.concurrent('codegen: z.looseObject({a:z.string().exactOptional()})', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: { a: { type: 'string' } },
          additionalProperties: true,
        } as Schema),
      ).toBe('z.looseObject({a:z.string().exactOptional()})')
    })
    it.concurrent('runtime: {a:"x", extra:1} PASSES (extras kept)', () => {
      const valid = Loose.safeParse({ a: 'x', extra: 1 })
      expect(valid.success).toBe(true)
      if (valid.success) expect(valid.data).toStrictEqual({ a: 'x', extra: 1 })
    })
  })

  describe('v3.2 object: strictObject (additionalProperties: false)', () => {
    const Strict = z.strictObject({ a: z.string().exactOptional() })
    it.concurrent('codegen: z.strictObject({a:z.string().exactOptional()})', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: { a: { type: 'string' } },
          additionalProperties: false,
        } as Schema),
      ).toBe('z.strictObject({a:z.string().exactOptional()})')
    })
    it.concurrent('runtime: {a:"x"} PASSES', () => {
      expect(Strict.safeParse({ a: 'x' }).success).toBe(true)
    })
    it.concurrent('runtime: {a:"x", extra:1} FAILS unrecognized_keys', () => {
      const valid = Strict.safeParse({ a: 'x', extra: 1 })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'unrecognized_keys',
            keys: ['extra'],
            path: [],
            message: 'Unrecognized key: "extra"',
          },
        ])
      }
    })
  })

  describe('v3.2 object: plain z.object strips unknown keys', () => {
    const Plain = z.object({ a: z.string().exactOptional() })
    it.concurrent('codegen: z.object({a:z.string().exactOptional()})', () => {
      expect(
        zodToOpenAPI({ type: 'object', properties: { a: { type: 'string' } } } as Schema),
      ).toBe('z.object({a:z.string().exactOptional()})')
    })
    it.concurrent('runtime: {a:"x", extra:1} → {a:"x"} (stripped)', () => {
      const valid = Plain.safeParse({ a: 'x', extra: 1 })
      expect(valid.success).toBe(true)
      if (valid.success) expect(valid.data).toStrictEqual({ a: 'x' })
    })
  })

  describe('v3.2 object: dependentSchemas (name present → enforces shape)', () => {
    const Dep = z.object({ name: z.string().exactOptional() }).superRefine((o, ctx) => {
      if (!Object.hasOwn(o, 'name')) return
      const Schema = z.unknown().superRefine((v, ctx) => {
        if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
          if (!Object.hasOwn(v, 'age'))
            ctx.addIssue({ code: 'custom', message: 'missing required: age' })
          if (Object.hasOwn(v, 'age')) {
            const Schema = z.int()
            if (!Schema.safeParse(Reflect.get(v, 'age')).success)
              ctx.addIssue({ code: 'custom', message: 'invalid property' })
          }
        }
      })
      const valid = Schema.safeParse(o)
      if (!valid.success)
        for (const issue of valid.error.issues) ctx.addIssue({ ...issue, path: issue.path })
    })
    it.concurrent('codegen: object + dependentSchemas superRefine chain', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: { name: { type: 'string' } },
          dependentSchemas: {
            name: { properties: { age: { type: 'integer' } }, required: ['age'] },
          },
        } as Schema),
      ).toBe(
        'z.object({name:z.string().exactOptional()}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"name"))return;const Schema=z.unknown().superRefine((v,ctx)=>{if(typeof v===\'object\'&&v!==null&&!Array.isArray(v)){if(!Object.hasOwn(v,"age"))ctx.addIssue({code:\'custom\',message:\'missing required: age\'});if(Object.hasOwn(v,"age")){const Schema=z.int();if(!Schema.safeParse(Reflect.get(v,"age")).success)ctx.addIssue({code:\'custom\',message:\'invalid property\'})}}}).openapi({"required":["age"]});const valid=Schema.safeParse(o);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:issue.path})})',
      )
    })
    it.concurrent('runtime: {} PASSES (no name → dep skipped)', () => {
      expect(Dep.safeParse({}).success).toBe(true)
    })
    it.concurrent('runtime: {name:"taro"} FAILS (age stripped, dep triggers)', () => {
      const valid = Dep.safeParse({ name: 'taro' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'custom',
            message: 'missing required: age',
            path: [],
          },
        ])
      }
    })
  })

  describe('v3.2 object: if/then/else conditional shape (country → postalCode pattern)', () => {
    const IfThen = z
      .object({ country: z.string(), postalCode: z.string().exactOptional() })
      .superRefine((o, ctx) => {
        const If = z.unknown().superRefine((v, ctx) => {
          if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
            if (Object.hasOwn(v, 'country')) {
              const Schema = z.literal('JP')
              if (!Schema.safeParse(Reflect.get(v, 'country')).success)
                ctx.addIssue({ code: 'custom', message: 'invalid property' })
            }
          }
        })
        const ifOk = If.safeParse(o).success
        const Branch = ifOk
          ? z.unknown().superRefine((v, ctx) => {
              if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
                if (Object.hasOwn(v, 'postalCode')) {
                  const Schema = z.string().regex(/^\d{3}-\d{4}$/)
                  if (!Schema.safeParse(Reflect.get(v, 'postalCode')).success)
                    ctx.addIssue({ code: 'custom', message: 'invalid property' })
                }
              }
            })
          : z.unknown().superRefine((v, ctx) => {
              if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
                if (Object.hasOwn(v, 'postalCode')) {
                  const Schema = z.string().min(1)
                  if (!Schema.safeParse(Reflect.get(v, 'postalCode')).success)
                    ctx.addIssue({ code: 'custom', message: 'invalid property' })
                }
              }
            })
        if (!Branch) return
        const valid = Branch.safeParse(o)
        if (!valid.success)
          for (const issue of valid.error.issues) ctx.addIssue({ ...issue, path: issue.path })
      })
    it.concurrent('codegen: if/then/else superRefine emission', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: { country: { type: 'string' }, postalCode: { type: 'string' } },
          required: ['country'],
          if: { properties: { country: { const: 'JP' } } },
          then: {
            properties: { postalCode: { type: 'string', pattern: '^\\d{3}-\\d{4}$' } },
          },
          else: { properties: { postalCode: { type: 'string', minLength: 1 } } },
        } as Schema),
      ).toBe(
        'z.object({country:z.string(),postalCode:z.string().exactOptional()}).superRefine((o,ctx)=>{const If=z.unknown().superRefine((v,ctx)=>{if(typeof v===\'object\'&&v!==null&&!Array.isArray(v)){if(Object.hasOwn(v,"country")){const Schema=z.literal("JP");if(!Schema.safeParse(Reflect.get(v,"country")).success)ctx.addIssue({code:\'custom\',message:\'invalid property\'})}}});const ifOk=If.safeParse(o).success;const Branch=ifOk?z.unknown().superRefine((v,ctx)=>{if(typeof v===\'object\'&&v!==null&&!Array.isArray(v)){if(Object.hasOwn(v,"postalCode")){const Schema=z.string().regex(/^\\d{3}-\\d{4}$/);if(!Schema.safeParse(Reflect.get(v,"postalCode")).success)ctx.addIssue({code:\'custom\',message:\'invalid property\'})}}}):z.unknown().superRefine((v,ctx)=>{if(typeof v===\'object\'&&v!==null&&!Array.isArray(v)){if(Object.hasOwn(v,"postalCode")){const Schema=z.string().min(1);if(!Schema.safeParse(Reflect.get(v,"postalCode")).success)ctx.addIssue({code:\'custom\',message:\'invalid property\'})}}});if(!Branch)return;const valid=Branch.safeParse(o);if(!valid.success)for(const issue of valid.error.issues)ctx.addIssue({...issue,path:issue.path})}).openapi({"required":["country"]})',
      )
    })
    it.concurrent('runtime: {country:"JP", postalCode:"123-4567"} PASSES', () => {
      expect(IfThen.safeParse({ country: 'JP', postalCode: '123-4567' }).success).toBe(true)
    })
    it.concurrent('runtime: {country:"JP", postalCode:"oops"} FAILS', () => {
      const valid = IfThen.safeParse({ country: 'JP', postalCode: 'oops' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'custom',
            message: 'invalid property',
            path: [],
          },
        ])
      }
    })
    it.concurrent('runtime: {country:"US", postalCode:"X"} PASSES (else branch)', () => {
      expect(IfThen.safeParse({ country: 'US', postalCode: 'X' }).success).toBe(true)
    })
    it.concurrent('runtime: {country:"US", postalCode:""} FAILS (else branch min)', () => {
      const valid = IfThen.safeParse({ country: 'US', postalCode: '' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'custom',
            message: 'invalid property',
            path: [],
          },
        ])
      }
    })
  })

  // ───────────────────────────────────────────────────────────────────
  // v3.2 combination cases
  // ───────────────────────────────────────────────────────────────────

  describe('v3.2 nullable + default (type:["string","null"])', () => {
    const ND = z.string().nullable().default('x')
    it.concurrent('codegen: z.string().nullable().default("x")', () => {
      expect(zodToOpenAPI({ type: ['string', 'null'], default: 'x' } as Schema)).toBe(
        'z.string().nullable().default("x")',
      )
    })
    it.concurrent('runtime: undefined → "x"', () => {
      const valid = ND.safeParse(undefined)
      expect(valid.success).toBe(true)
      if (valid.success) expect(valid.data).toBe('x')
    })
    it.concurrent('runtime: null → null', () => {
      const valid = ND.safeParse(null)
      expect(valid.success).toBe(true)
      if (valid.success) expect(valid.data).toBe(null)
    })
  })

  describe('v3.2 default + nullable + x-error-message', () => {
    const NDE = z.string({ error: 'NG' }).nullable().default('d')
    it.concurrent('codegen: z.string({error:"NG"}).nullable().default("d")', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          default: 'd',
          nullable: true,
          'x-error-message': 'NG',
        } as Schema),
      ).toBe('z.string({error:"NG"}).nullable().default("d")')
    })
    it.concurrent('runtime: undefined → "d"', () => {
      const valid = NDE.safeParse(undefined)
      expect(valid.success).toBe(true)
      if (valid.success) expect(valid.data).toBe('d')
    })
    it.concurrent('runtime: 1 (number) FAILS with custom message', () => {
      const valid = NDE.safeParse(1)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: [],
            message: 'NG',
          },
        ])
      }
    })
  })

  describe('v3.2 enum + x-coerce: number enum (coerce ignored on enum codegen)', () => {
    const Enum = z.union([z.literal(1), z.literal(2), z.literal(3)])
    it.concurrent('codegen: z.union([z.literal(1),z.literal(2),z.literal(3)])', () => {
      expect(zodToOpenAPI({ type: 'number', enum: [1, 2, 3], 'x-coerce': true } as Schema)).toBe(
        'z.union([z.literal(1),z.literal(2),z.literal(3)])',
      )
    })
    it.concurrent('runtime: 2 PASSES', () => {
      expect(Enum.safeParse(2).success).toBe(true)
    })
    it.concurrent('runtime: "2" (string) FAILS — no coerce on union of literals', () => {
      const valid = Enum.safeParse('2')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'invalid_union',
            errors: [
              [
                {
                  code: 'invalid_value',
                  values: [1],
                  path: [],
                  message: 'Invalid input: expected 1',
                },
              ],
              [
                {
                  code: 'invalid_value',
                  values: [2],
                  path: [],
                  message: 'Invalid input: expected 2',
                },
              ],
              [
                {
                  code: 'invalid_value',
                  values: [3],
                  path: [],
                  message: 'Invalid input: expected 3',
                },
              ],
            ],
            path: [],
            message: 'Invalid input',
          },
        ])
      }
    })
  })

  describe('v3.2 array of object with nested validation', () => {
    const Nested = z.array(z.object({ id: z.string().min(1) })).min(1)
    it.concurrent('codegen: z.array(z.object({id:z.string().min(1)}).openapi(...)).min(1)', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          items: {
            type: 'object',
            properties: { id: { type: 'string', minLength: 1 } },
            required: ['id'],
          },
          minItems: 1,
        } as Schema),
      ).toBe('z.array(z.object({id:z.string().min(1)}).openapi({"required":["id"]})).min(1)')
    })
    it.concurrent('runtime: [{id:"a"}] PASSES', () => {
      expect(Nested.safeParse([{ id: 'a' }]).success).toBe(true)
    })
    it.concurrent('runtime: [] FAILS too_small', () => {
      const valid = Nested.safeParse([])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'array',
            code: 'too_small',
            minimum: 1,
            inclusive: true,
            path: [],
            message: 'Too small: expected array to have >=1 items',
          },
        ])
      }
    })
    it.concurrent('runtime: [{id:""}] FAILS at .[0].id (nested too_small)', () => {
      const valid = Nested.safeParse([{ id: '' }])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'too_small',
            minimum: 1,
            inclusive: true,
            path: [0, 'id'],
            message: 'Too small: expected string to have >=1 characters',
          },
        ])
      }
    })
  })
})
