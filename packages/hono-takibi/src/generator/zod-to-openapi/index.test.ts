import { describe, expect, it } from 'vitest'
import type { Schema } from '../../openapi/index.js'
import { zodToOpenAPI } from './index.js'

// Test run
// pnpm vitest run ./src/generator/zod-to-openapi/index.test.ts

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
        'z.array(TestSchema).openapi({"type":"array","items":{"$ref":"#/components/schemas/Test"}})',
      ],
      [
        { type: 'array', items: { $ref: '#/components/schemas/Test' } },
        'z.array(TestSchema).openapi({"type":"array","items":{"$ref":"#/components/schemas/Test"}})',
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
        'z.xor([z.object({kind:z.literal("A")}).openapi({"properties":{"kind":{"const":"A"}},"required":["kind"]}),z.object({kind:z.literal("B")}).openapi({"properties":{"kind":{"const":"B"}},"required":["kind"]})]).nullable().openapi({"type":"object","oneOf":[{"properties":{"kind":{"const":"A"}},"required":["kind"]},{"properties":{"kind":{"const":"B"}},"required":["kind"]}]})',
      ],
      [
        {
          type: 'object',
          oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
        },
        'z.xor([ASchema,BSchema]).openapi({"type":"object","oneOf":[{"$ref":"#/components/schemas/A"},{"$ref":"#/components/schemas/B"}]})',
      ],
      [
        {
          type: 'object',
          oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
          nullable: true,
        },
        'z.xor([ASchema,BSchema]).nullable().openapi({"type":"object","oneOf":[{"$ref":"#/components/schemas/A"},{"$ref":"#/components/schemas/B"}]})',
      ],
      [
        {
          type: ['object', 'null'],
          oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
        },
        'z.xor([ASchema,BSchema]).nullable().openapi({"type":["object","null"],"oneOf":[{"$ref":"#/components/schemas/A"},{"$ref":"#/components/schemas/B"}]})',
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
          `z.discriminatedUnion('status',[z.object({status:z.literal("success"),data:z.string().openapi({"type":"string"})}).openapi({"type":"object","properties":{"status":{"const":"success"},"data":{"type":"string"}},"required":["status","data"]}),z.object({status:z.literal("failed"),error:z.string().openapi({"type":"string"})}).openapi({"type":"object","properties":{"status":{"const":"failed"},"error":{"type":"string"}},"required":["status","error"]})]).openapi({"oneOf":[{"type":"object","properties":{"status":{"const":"success"},"data":{"type":"string"}},"required":["status","data"]},{"type":"object","properties":{"status":{"const":"failed"},"error":{"type":"string"}},"required":["status","error"]}],"discriminator":{"propertyName":"status"}})`,
        ],
        [
          {
            oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
            discriminator: { propertyName: 'type' },
          },
          `z.discriminatedUnion('type',[ASchema,BSchema]).openapi({"oneOf":[{"$ref":"#/components/schemas/A"},{"$ref":"#/components/schemas/B"}],"discriminator":{"propertyName":"type"}})`,
        ],
      ])('zodToOpenAPI(%o) → %s', (input, expected) => {
        expect(zodToOpenAPI(input)).toBe(expected)
      })
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
          'z.xor([z.object({kind:z.literal("A")}).openapi({"properties":{"kind":{"const":"A"}},"required":["kind"]}),z.object({kind:z.literal("B")}).openapi({"properties":{"kind":{"const":"B"}},"required":["kind"]})]).nullable().openapi({"type":"object","oneOf":[{"properties":{"kind":{"const":"A"}},"required":["kind"]},{"properties":{"kind":{"const":"B"}},"required":["kind"]}]})',
        ],
        [
          {
            type: 'object',
            oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
          },
          'z.xor([ASchema,BSchema]).openapi({"type":"object","oneOf":[{"$ref":"#/components/schemas/A"},{"$ref":"#/components/schemas/B"}]})',
        ],
        [
          {
            type: 'object',
            oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
            nullable: true,
          },
          'z.xor([ASchema,BSchema]).nullable().openapi({"type":"object","oneOf":[{"$ref":"#/components/schemas/A"},{"$ref":"#/components/schemas/B"}]})',
        ],
        [
          {
            type: ['object', 'null'],
            oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
          },
          'z.xor([ASchema,BSchema]).nullable().openapi({"type":["object","null"],"oneOf":[{"$ref":"#/components/schemas/A"},{"$ref":"#/components/schemas/B"}]})',
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
          'GeoJsonObjectSchema.and(z.object({type:z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"]).openapi({"type":"string","enum":["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"]})}).openapi({"type":"object","properties":{"type":{"type":"string","enum":["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"]}},"required":["type"],"discriminator":{"propertyName":"type"}})).openapi({"description":"Abstract type for all GeoJSon object except Feature and FeatureCollection\\n","externalDocs":{"url":"https://tools.ietf.org/html/rfc7946#section-3"},"allOf":[{"$ref":"#/components/schemas/GeoJsonObject"},{"type":"object","properties":{"type":{"type":"string","enum":["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"]}},"required":["type"],"discriminator":{"propertyName":"type"}}]})',
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
          `GeoJsonObjectSchema.and(z.object({geometry:GeometrySchema.nullable(),properties:z.object({}).nullable().openapi({"type":"object"}),id:z.xor([z.number().openapi({"type":"number"}),z.string().openapi({"type":"string"})]).exactOptional().openapi({"oneOf":[{"type":"number"},{"type":"string"}]})}).openapi({"type":"object","required":["geometry","properties"],"properties":{"geometry":{"allOf":[{"nullable":true},{"$ref":"#/components/schemas/Geometry"}]},"properties":{"type":"object","nullable":true},"id":{"oneOf":[{"type":"number"},{"type":"string"}]}}})).openapi({"description":"GeoJSon 'Feature' object","externalDocs":{"url":"https://tools.ietf.org/html/rfc7946#section-3.2"},"allOf":[{"$ref":"#/components/schemas/GeoJsonObject"},{"type":"object","required":["geometry","properties"],"properties":{"geometry":{"allOf":[{"nullable":true},{"$ref":"#/components/schemas/Geometry"}]},"properties":{"type":"object","nullable":true},"id":{"oneOf":[{"type":"number"},{"type":"string"}]}}}]})`,
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
          'z.object({a:z.string().openapi({"type":"string"})}).openapi({"type":"object","required":["a"],"properties":{"a":{"type":"string"}}}).and(z.object({b:z.string().openapi({"type":"string"})}).openapi({"type":"object","required":["b"],"properties":{"b":{"type":"string"}}})).openapi({"allOf":[{"type":"object","required":["a"],"properties":{"a":{"type":"string"}}},{"type":"object","required":["b"],"properties":{"b":{"type":"string"}}}]})',
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
          'z.object({a:z.string().openapi({"type":"string"})}).openapi({"type":"object","required":["a"],"properties":{"a":{"type":"string"}}}).and(z.object({b:z.string().openapi({"type":"string"})}).openapi({"type":"object","required":["b"],"properties":{"b":{"type":"string"}}})).nullable().openapi({"allOf":[{"type":"object","required":["a"],"properties":{"a":{"type":"string"}}},{"type":"object","required":["b"],"properties":{"b":{"type":"string"}}}]})',
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
          'z.object({a:z.string().openapi({"type":"string"})}).openapi({"type":"object","required":["a"],"properties":{"a":{"type":"string"}}}).and(z.object({b:z.string().openapi({"type":"string"})}).openapi({"type":"object","required":["b"],"properties":{"b":{"type":"string"}}})).nullable().openapi({"allOf":[{"type":"object","required":["a"],"properties":{"a":{"type":"string"}}},{"type":"object","required":["b"],"properties":{"b":{"type":"string"}}}],"type":["null"]})',
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
        [
          { type: ['null'], const: 'fixed' },
          'z.literal("fixed").nullable().openapi({"type":["null"]})',
        ],
      ])('zodToOpenAPI(%o) → %s', (input, expected) => {
        expect(zodToOpenAPI(input)).toBe(expected)
      })
    })

    // enum
    describe('enum', () => {
      it.concurrent.each<[Schema, string]>([
        [{ enum: ['A', 'B'] }, 'z.enum(["A","B"]).openapi({"enum":["A","B"]})'],
        [
          { enum: ['A', 'B'], type: ['string'], nullable: true },
          'z.enum(["A","B"]).nullable().openapi({"enum":["A","B"],"type":["string"]})',
        ],
        [
          { enum: ['A', 'B'], type: ['string', 'null'] },
          'z.enum(["A","B"]).nullable().openapi({"enum":["A","B"],"type":["string","null"]})',
        ],
        [{ enum: [1, 2] }, 'z.union([z.literal(1),z.literal(2)]).openapi({"enum":[1,2]})'],
        [
          { enum: [1, 2], type: ['number'], nullable: true },
          'z.union([z.literal(1),z.literal(2)]).nullable().openapi({"enum":[1,2],"type":["number"]})',
        ],
        [
          { enum: [1, 2], type: ['number', 'null'] },
          'z.union([z.literal(1),z.literal(2)]).nullable().openapi({"enum":[1,2],"type":["number","null"]})',
        ],
        [
          { enum: [true, false] },
          'z.union([z.literal(true),z.literal(false)]).openapi({"enum":[true,false]})',
        ],
        [
          { enum: [true, false], type: ['boolean'], nullable: true },
          'z.union([z.literal(true),z.literal(false)]).nullable().openapi({"enum":[true,false],"type":["boolean"]})',
        ],
        [
          { enum: [true, false], type: ['boolean', 'null'] },
          'z.union([z.literal(true),z.literal(false)]).nullable().openapi({"enum":[true,false],"type":["boolean","null"]})',
        ],
        [{ enum: [null] }, 'z.literal(null).openapi({"enum":[null]})'],
        [
          { enum: [null], type: ['null'] },
          'z.literal(null).nullable().openapi({"enum":[null],"type":["null"]})',
        ],
        [{ enum: ['abc'] }, `z.literal('abc').openapi({"enum":["abc"]})`],
        [
          { enum: ['abc'], type: ['string'], nullable: true },
          `z.literal('abc').nullable().openapi({"enum":["abc"],"type":["string"]})`,
        ],
        [
          { enum: ['abc'], type: ['string', 'null'] },
          `z.literal('abc').nullable().openapi({"enum":["abc"],"type":["string","null"]})`,
        ],
        [
          { type: 'array', enum: [[1, 2]] },
          'z.tuple([z.literal(1),z.literal(2)]).openapi({"type":"array","enum":[[1,2]]})',
        ],
        [
          { type: 'array', nullable: true, enum: [[1, 2]] },
          'z.tuple([z.literal(1),z.literal(2)]).nullable().openapi({"type":"array","enum":[[1,2]]})',
        ],
        [
          { type: ['array', 'null'], enum: [[1, 2]] },
          'z.tuple([z.literal(1),z.literal(2)]).nullable().openapi({"type":["array","null"],"enum":[[1,2]]})',
        ],
        [
          {
            type: 'array',
            enum: [
              [1, 2],
              [3, 4],
            ],
          },
          'z.union([z.tuple([z.literal(1),z.literal(2)]),z.tuple([z.literal(3),z.literal(4)])]).openapi({"type":"array","enum":[[1,2],[3,4]]})',
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
          'z.union([z.tuple([z.literal(1),z.literal(2)]),z.tuple([z.literal(3),z.literal(4)])]).nullable().openapi({"type":"array","enum":[[1,2],[3,4]]})',
        ],
        [
          {
            type: ['array', 'null'],
            enum: [
              [1, 2],
              [3, 4],
            ],
          },
          'z.union([z.tuple([z.literal(1),z.literal(2)]),z.tuple([z.literal(3),z.literal(4)])]).nullable().openapi({"type":["array","null"],"enum":[[1,2],[3,4]]})',
        ],
      ])('zodToOpenAPI(%o) → %s', (input, expected) => {
        expect(zodToOpenAPI(input)).toBe(expected)
      })
    })

    // TODO properties

    // string
    describe('string', () => {
      it.concurrent.each<[Schema, string]>([
        [{ type: 'string' }, 'z.string().openapi({"type":"string"})'],
        [
          { type: ['string'], nullable: true },
          'z.string().nullable().openapi({"type":["string"]})',
        ],
        [{ type: ['string', 'null'] }, 'z.string().nullable().openapi({"type":["string","null"]})'],
        [
          { type: 'string', minLength: 1, maxLength: 10 },
          'z.string().min(1).max(10).openapi({"type":"string","minLength":1,"maxLength":10})',
        ],
        [
          { type: 'string', pattern: '^\\w+$' },
          'z.string().regex(/^\\w+$/).openapi({"type":"string","pattern":"^\\\\w+$"})',
        ],
        [
          { type: 'string', default: 'test' },
          'z.string().default("test").openapi({"type":"string","default":"test"})',
        ],
        [
          { type: 'string', default: 'test', nullable: true },
          'z.string().default("test").nullable().openapi({"type":"string","default":"test"})',
        ],
        [
          { type: ['string', 'null'], default: 'test' },
          'z.string().default("test").nullable().openapi({"type":["string","null"],"default":"test"})',
        ],
        [
          { type: 'string', format: 'email' },
          'z.email().openapi({"type":"string","format":"email"})',
        ],
        [{ type: 'string', format: 'uuid' }, 'z.uuid().openapi({"type":"string","format":"uuid"})'],
        [
          { type: 'string', format: 'uuidv4' },
          'z.uuidv4().openapi({"type":"string","format":"uuidv4"})',
        ],
        [
          { type: 'string', format: 'uuidv7' },
          'z.uuidv7().openapi({"type":"string","format":"uuidv7"})',
        ],
        [{ type: 'string', format: 'uri' }, 'z.url().openapi({"type":"string","format":"uri"})'],
        [
          { type: 'string', format: 'emoji' },
          'z.emoji().openapi({"type":"string","format":"emoji"})',
        ],
        [
          { type: 'string', format: 'base64' },
          'z.base64().openapi({"type":"string","format":"base64"})',
        ],
        [
          { type: 'string', format: 'nanoid' },
          'z.nanoid().openapi({"type":"string","format":"nanoid"})',
        ],
        [{ type: 'string', format: 'cuid' }, 'z.cuid().openapi({"type":"string","format":"cuid"})'],
        [
          { type: 'string', format: 'cuid2' },
          'z.cuid2().openapi({"type":"string","format":"cuid2"})',
        ],
        [{ type: 'string', format: 'ulid' }, 'z.ulid().openapi({"type":"string","format":"ulid"})'],
        [{ type: 'string', format: 'ipv4' }, 'z.ipv4().openapi({"type":"string","format":"ipv4"})'],
        [{ type: 'string', format: 'ipv6' }, 'z.ipv6().openapi({"type":"string","format":"ipv6"})'],
        [
          { type: 'string', format: 'cidrv4' },
          'z.cidrv4().openapi({"type":"string","format":"cidrv4"})',
        ],
        [
          { type: 'string', format: 'cidrv6' },
          'z.cidrv6().openapi({"type":"string","format":"cidrv6"})',
        ],
        [
          { type: 'string', format: 'date' },
          'z.iso.date().openapi({"type":"string","format":"date"})',
        ],
        [
          { type: 'string', format: 'time' },
          'z.iso.time().openapi({"type":"string","format":"time"})',
        ],
        [
          { type: 'string', format: 'date-time' },
          'z.iso.datetime().openapi({"type":"string","format":"date-time"})',
        ],
        [
          { type: 'string', format: 'duration' },
          'z.iso.duration().openapi({"type":"string","format":"duration"})',
        ],
        [
          { type: 'string', format: 'binary' },
          'z.file().openapi({"type":"string","format":"binary"})',
        ],
        // TODO rare
        // // rare
        // [{ type: 'string', format: 'toLowerCase' }, 'z.toLowerCase()'],
        // // rare
        // [{ type: 'string', format: 'toUpperCase' }, 'z.toUpperCase()'],
        // rare
        // [{ type: 'string', format: 'trim' }, 'z.trim()'],
        [{ type: 'string', format: 'jwt' }, 'z.jwt().openapi({"type":"string","format":"jwt"})'],
      ])('zodToOpenAPI(%o) → %s', (input, expected) => {
        expect(zodToOpenAPI(input)).toBe(expected)
      })

      // number
      describe('number', () => {
        describe('type: number', () => {
          it.concurrent.each<[Schema, string]>([
            [{ type: 'number' }, 'z.number().openapi({"type":"number"})'],
            [
              { type: ['number'], nullable: true },
              'z.number().nullable().openapi({"type":["number"]})',
            ],
            [
              { type: ['number', 'null'] },
              'z.number().nullable().openapi({"type":["number","null"]})',
            ],
            [
              {
                type: 'number',
                minimum: 0,
                exclusiveMinimum: true,
              },
              'z.number().positive().openapi({"type":"number","minimum":0,"exclusiveMinimum":true})',
            ],
            [
              {
                type: 'number',
                minimum: 0,
                exclusiveMinimum: false,
              },
              'z.number().nonnegative().openapi({"type":"number","minimum":0,"exclusiveMinimum":false})',
            ],
            [
              { type: 'number', maximum: 0, exclusiveMaximum: true },
              'z.number().negative().openapi({"type":"number","maximum":0,"exclusiveMaximum":true})',
            ],
            [
              { type: 'number', maximum: 0, exclusiveMaximum: false },
              'z.number().nonpositive().openapi({"type":"number","maximum":0,"exclusiveMaximum":false})',
            ],
            [
              { type: 'number', minimum: 100 },
              'z.number().min(100).openapi({"type":"number","minimum":100})',
            ],
            [
              { type: 'number', minimum: 0 },
              'z.number().min(0).openapi({"type":"number","minimum":0})',
            ],
            [
              { type: 'number', minimum: 100, exclusiveMinimum: true },
              'z.number().gt(100).openapi({"type":"number","minimum":100,"exclusiveMinimum":true})',
            ],
            [
              { type: 'number', maximum: 100 },
              'z.number().max(100).openapi({"type":"number","maximum":100})',
            ],
            [
              { type: 'number', maximum: 0 },
              'z.number().max(0).openapi({"type":"number","maximum":0})',
            ],
            [
              { type: 'number', maximum: 100, exclusiveMaximum: true },
              'z.number().lt(100).openapi({"type":"number","maximum":100,"exclusiveMaximum":true})',
            ],
            [
              { type: 'number', multipleOf: 2 },
              'z.number().multipleOf(2).openapi({"type":"number","multipleOf":2})',
            ],
            [
              { type: 'number', default: 100 },
              'z.number().default(100).openapi({"type":"number","default":100})',
            ],
            [
              { type: 'number', default: 100, nullable: true },
              'z.number().default(100).nullable().openapi({"type":"number","default":100})',
            ],
            [
              { type: ['number', 'null'], default: 100 },
              'z.number().default(100).nullable().openapi({"type":["number","null"],"default":100})',
            ],
          ])('zodToOpenAPI(%o) → %s', (input, expected) => {
            expect(zodToOpenAPI(input)).toBe(expected)
          })
        })

        describe('type: number, format: float', () => {
          it.concurrent.each<[Schema, string]>([
            [
              { type: 'number', format: 'float' },
              'z.float32().openapi({"type":"number","format":"float"})',
            ],
            [
              { type: 'number', format: 'float', nullable: true },
              'z.float32().nullable().openapi({"type":"number","format":"float"})',
            ],
            [
              { type: ['number', 'null'], format: 'float', nullable: true },
              'z.float32().nullable().openapi({"type":["number","null"],"format":"float"})',
            ],
            [
              { type: 'number', format: 'float64' },
              'z.float64().openapi({"type":"number","format":"float64"})',
            ],
            [
              { type: 'number', format: 'float64', nullable: true },
              'z.float64().nullable().openapi({"type":"number","format":"float64"})',
            ],
            [
              { type: ['number', 'null'], format: 'float64', nullable: true },
              'z.float64().nullable().openapi({"type":["number","null"],"format":"float64"})',
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
            [{ type: 'integer' }, 'z.int().openapi({"type":"integer"})'],
            [
              { type: ['integer'], nullable: true },
              'z.int().nullable().openapi({"type":["integer"]})',
            ],
            [
              { type: ['integer', 'null'] },
              'z.int().nullable().openapi({"type":["integer","null"]})',
            ],
            [
              { type: 'integer', minimum: 0, exclusiveMinimum: true },
              'z.int().positive().openapi({"type":"integer","minimum":0,"exclusiveMinimum":true})',
            ],
            [
              { type: 'integer', minimum: 0, exclusiveMinimum: false },
              'z.int().nonnegative().openapi({"type":"integer","minimum":0,"exclusiveMinimum":false})',
            ],
            [
              { type: 'integer', maximum: 0, exclusiveMaximum: true },
              'z.int().negative().openapi({"type":"integer","maximum":0,"exclusiveMaximum":true})',
            ],
            [
              { type: 'integer', maximum: 0, exclusiveMaximum: false },
              'z.int().nonpositive().openapi({"type":"integer","maximum":0,"exclusiveMaximum":false})',
            ],
            [
              { type: 'integer', minimum: 100 },
              'z.int().min(100).openapi({"type":"integer","minimum":100})',
            ],
            [
              { type: 'integer', minimum: 0 },
              'z.int().min(0).openapi({"type":"integer","minimum":0})',
            ],
            [
              { type: 'integer', minimum: 100, exclusiveMinimum: true },
              'z.int().gt(100).openapi({"type":"integer","minimum":100,"exclusiveMinimum":true})',
            ],
            [
              { type: 'integer', maximum: 100 },
              'z.int().max(100).openapi({"type":"integer","maximum":100})',
            ],
            [
              { type: 'integer', maximum: 0 },
              'z.int().max(0).openapi({"type":"integer","maximum":0})',
            ],
            [
              { type: 'integer', maximum: 100, exclusiveMaximum: true },
              'z.int().lt(100).openapi({"type":"integer","maximum":100,"exclusiveMaximum":true})',
            ],
            [
              { type: 'integer', exclusiveMaximum: 100 },
              'z.int().lt(100).openapi({"type":"integer","exclusiveMaximum":100})',
            ],
            [
              { type: 'integer', multipleOf: 2 },
              'z.int().multipleOf(2).openapi({"type":"integer","multipleOf":2})',
            ],
            [
              { type: 'integer', default: 100 },
              'z.int().default(100).openapi({"type":"integer","default":100})',
            ],
            [
              { type: 'integer', default: 100, nullable: true },
              'z.int().default(100).nullable().openapi({"type":"integer","default":100})',
            ],
            [
              { type: ['integer', 'null'], default: 100 },
              'z.int().default(100).nullable().openapi({"type":["integer","null"],"default":100})',
            ],
          ])('zodToOpenAPI(%o) → %s', (input, expected) => {
            expect(zodToOpenAPI(input)).toBe(expected)
          })
        })

        describe('type: integer, format: int32', () => {
          it.concurrent.each<[Schema, string]>([
            [
              { type: 'integer', format: 'int32' },
              'z.int32().openapi({"type":"integer","format":"int32"})',
            ],
            [
              { type: 'integer', format: 'int32', nullable: true },
              'z.int32().nullable().openapi({"type":"integer","format":"int32"})',
            ],
            [
              { type: ['integer', 'null'], format: 'int32' },
              'z.int32().nullable().openapi({"type":["integer","null"],"format":"int32"})',
            ],
            [
              { type: 'integer', format: 'int32', minimum: 0, exclusiveMinimum: true },
              'z.int32().positive().openapi({"type":"integer","format":"int32","minimum":0,"exclusiveMinimum":true})',
            ],
            [
              { type: 'integer', format: 'int32', minimum: 0, exclusiveMinimum: false },
              'z.int32().nonnegative().openapi({"type":"integer","format":"int32","minimum":0,"exclusiveMinimum":false})',
            ],
            [
              { type: 'integer', format: 'int32', maximum: 0, exclusiveMaximum: true },
              'z.int32().negative().openapi({"type":"integer","format":"int32","maximum":0,"exclusiveMaximum":true})',
            ],
            [
              { type: 'integer', format: 'int32', maximum: 0, exclusiveMaximum: false },
              'z.int32().nonpositive().openapi({"type":"integer","format":"int32","maximum":0,"exclusiveMaximum":false})',
            ],
            [
              { type: 'integer', format: 'int32', minimum: 100 },
              'z.int32().min(100).openapi({"type":"integer","format":"int32","minimum":100})',
            ],
            [
              { type: 'integer', format: 'int32', minimum: 0 },
              'z.int32().min(0).openapi({"type":"integer","format":"int32","minimum":0})',
            ],
            [
              { type: 'integer', format: 'int32', minimum: 100, exclusiveMinimum: true },
              'z.int32().gt(100).openapi({"type":"integer","format":"int32","minimum":100,"exclusiveMinimum":true})',
            ],
            [
              { type: 'integer', format: 'int32', maximum: 100 },
              'z.int32().max(100).openapi({"type":"integer","format":"int32","maximum":100})',
            ],
            [
              { type: 'integer', format: 'int32', maximum: 0 },
              'z.int32().max(0).openapi({"type":"integer","format":"int32","maximum":0})',
            ],
            [
              { type: 'integer', format: 'int32', maximum: 100, exclusiveMaximum: true },
              'z.int32().lt(100).openapi({"type":"integer","format":"int32","maximum":100,"exclusiveMaximum":true})',
            ],
            [
              { type: 'integer', format: 'int32', exclusiveMaximum: 100 },
              'z.int32().lt(100).openapi({"type":"integer","format":"int32","exclusiveMaximum":100})',
            ],
            [
              { type: 'integer', format: 'int32', multipleOf: 2 },
              'z.int32().multipleOf(2).openapi({"type":"integer","format":"int32","multipleOf":2})',
            ],
            [
              { type: 'integer', format: 'int32', default: 100 },
              'z.int32().default(100).openapi({"type":"integer","format":"int32","default":100})',
            ],
            [
              { type: 'integer', format: 'int32', default: 100, nullable: true },
              'z.int32().default(100).nullable().openapi({"type":"integer","format":"int32","default":100})',
            ],
            [
              { type: ['integer', 'null'], format: 'int32', default: 100 },
              'z.int32().default(100).nullable().openapi({"type":["integer","null"],"format":"int32","default":100})',
            ],
          ])('zodToOpenAPI(%o) → %s', (input, expected) => {
            expect(zodToOpenAPI(input)).toBe(expected)
          })
        })

        describe('type: integer, format: int64', () => {
          it.concurrent.each<[Schema, string]>([
            [
              { type: 'integer', format: 'int64' },
              'z.int64().openapi({"type":"integer","format":"int64"})',
            ],
            [
              { type: 'integer', format: 'int64', nullable: true },
              'z.int64().nullable().openapi({"type":"integer","format":"int64"})',
            ],
            [
              { type: ['integer', 'null'], format: 'int64' },
              'z.int64().nullable().openapi({"type":["integer","null"],"format":"int64"})',
            ],
            [
              { type: 'integer', format: 'int64', minimum: 0, exclusiveMinimum: true },
              'z.int64().positive().openapi({"type":"integer","format":"int64","minimum":0,"exclusiveMinimum":true})',
            ],
            [
              { type: 'integer', format: 'int64', minimum: 0, exclusiveMinimum: false },
              'z.int64().nonnegative().openapi({"type":"integer","format":"int64","minimum":0,"exclusiveMinimum":false})',
            ],
            [
              { type: 'integer', format: 'int64', maximum: 0, exclusiveMaximum: true },
              'z.int64().negative().openapi({"type":"integer","format":"int64","maximum":0,"exclusiveMaximum":true})',
            ],
            [
              { type: 'integer', format: 'int64', maximum: 0, exclusiveMaximum: false },
              'z.int64().nonpositive().openapi({"type":"integer","format":"int64","maximum":0,"exclusiveMaximum":false})',
            ],
            [
              { type: 'integer', format: 'int64', minimum: 100 },
              'z.int64().min(100n).openapi({"type":"integer","format":"int64","minimum":100})',
            ],
            [
              { type: 'integer', format: 'int64', minimum: 0 },
              'z.int64().min(0n).openapi({"type":"integer","format":"int64","minimum":0})',
            ],
            [
              { type: 'integer', format: 'int64', minimum: 100, exclusiveMinimum: true },
              'z.int64().gt(100n).openapi({"type":"integer","format":"int64","minimum":100,"exclusiveMinimum":true})',
            ],
            [
              { type: 'integer', format: 'int64', maximum: 100 },
              'z.int64().max(100n).openapi({"type":"integer","format":"int64","maximum":100})',
            ],
            [
              { type: 'integer', format: 'int64', maximum: 0 },
              'z.int64().max(0n).openapi({"type":"integer","format":"int64","maximum":0})',
            ],
            [
              { type: 'integer', format: 'int64', maximum: 100, exclusiveMaximum: true },
              'z.int64().lt(100n).openapi({"type":"integer","format":"int64","maximum":100,"exclusiveMaximum":true})',
            ],
            [
              { type: 'integer', format: 'int64', exclusiveMaximum: 100 },
              'z.int64().lt(100n).openapi({"type":"integer","format":"int64","exclusiveMaximum":100})',
            ],
            [
              { type: 'integer', format: 'int64', multipleOf: 2 },
              'z.int64().multipleOf(2n).openapi({"type":"integer","format":"int64","multipleOf":2})',
            ],
            [
              { type: 'integer', format: 'int64', default: 100 },
              'z.int64().default(100n).openapi({"type":"integer","format":"int64","default":100})',
            ],
            [
              { type: 'integer', format: 'int64', default: 100, nullable: true },
              'z.int64().default(100n).nullable().openapi({"type":"integer","format":"int64","default":100})',
            ],
            [
              { type: ['integer', 'null'], format: 'int64', default: 100 },
              'z.int64().default(100n).nullable().openapi({"type":["integer","null"],"format":"int64","default":100})',
            ],
          ])('zodToOpenAPI(%o) → %s', (input, expected) => {
            expect(zodToOpenAPI(input)).toBe(expected)
          })
        })

        describe('type: integer, format: bigint', () => {
          it.concurrent.each<[Schema, string]>([
            [
              { type: 'integer', format: 'bigint' },
              'z.bigint().openapi({"type":"integer","format":"bigint"})',
            ],
            [
              { type: 'integer', format: 'bigint', nullable: true },
              'z.bigint().nullable().openapi({"type":"integer","format":"bigint"})',
            ],
            [
              { type: ['integer', 'null'], format: 'bigint' },
              'z.bigint().nullable().openapi({"type":["integer","null"],"format":"bigint"})',
            ],
            [
              { type: 'integer', format: 'bigint', minimum: 0, exclusiveMinimum: true },
              'z.bigint().positive().openapi({"type":"integer","format":"bigint","minimum":0,"exclusiveMinimum":true})',
            ],
            [
              { type: 'integer', format: 'bigint', minimum: 0, exclusiveMinimum: false },
              'z.bigint().nonnegative().openapi({"type":"integer","format":"bigint","minimum":0,"exclusiveMinimum":false})',
            ],
            [
              { type: 'integer', format: 'bigint', maximum: 0, exclusiveMaximum: true },
              'z.bigint().negative().openapi({"type":"integer","format":"bigint","maximum":0,"exclusiveMaximum":true})',
            ],
            [
              { type: 'integer', format: 'bigint', maximum: 0, exclusiveMaximum: false },
              'z.bigint().nonpositive().openapi({"type":"integer","format":"bigint","maximum":0,"exclusiveMaximum":false})',
            ],
            [
              { type: 'integer', format: 'bigint', minimum: 100 },
              'z.bigint().min(BigInt(100)).openapi({"type":"integer","format":"bigint","minimum":100})',
            ],
            [
              { type: 'integer', format: 'bigint', minimum: 0 },
              'z.bigint().min(BigInt(0)).openapi({"type":"integer","format":"bigint","minimum":0})',
            ],
            [
              { type: 'integer', format: 'bigint', minimum: 100, exclusiveMinimum: true },
              'z.bigint().gt(BigInt(100)).openapi({"type":"integer","format":"bigint","minimum":100,"exclusiveMinimum":true})',
            ],
            [
              { type: 'integer', format: 'bigint', maximum: 100 },
              'z.bigint().max(BigInt(100)).openapi({"type":"integer","format":"bigint","maximum":100})',
            ],
            [
              { type: 'integer', format: 'bigint', maximum: 0 },
              'z.bigint().max(BigInt(0)).openapi({"type":"integer","format":"bigint","maximum":0})',
            ],
            [
              { type: 'integer', format: 'bigint', maximum: 100, exclusiveMaximum: true },
              'z.bigint().lt(BigInt(100)).openapi({"type":"integer","format":"bigint","maximum":100,"exclusiveMaximum":true})',
            ],
            [
              { type: 'integer', format: 'bigint', exclusiveMaximum: 100 },
              'z.bigint().lt(BigInt(100)).openapi({"type":"integer","format":"bigint","exclusiveMaximum":100})',
            ],
            [
              { type: 'integer', format: 'bigint', multipleOf: 2 },
              'z.bigint().multipleOf(BigInt(2)).openapi({"type":"integer","format":"bigint","multipleOf":2})',
            ],
            [
              { type: 'integer', format: 'bigint', default: 100 },
              'z.bigint().default(BigInt(100)).openapi({"type":"integer","format":"bigint","default":100})',
            ],
            [
              { type: 'integer', format: 'bigint', default: 100, nullable: true },
              'z.bigint().default(BigInt(100)).nullable().openapi({"type":"integer","format":"bigint","default":100})',
            ],
            [
              { type: ['integer', 'null'], format: 'bigint', default: 100 },
              'z.bigint().default(BigInt(100)).nullable().openapi({"type":["integer","null"],"format":"bigint","default":100})',
            ],
          ])('zodToOpenAPI(%o) → %s', (input, expected) => {
            expect(zodToOpenAPI(input)).toBe(expected)
          })
        })
      })

      // boolean
      describe('boolean', () => {
        it.concurrent.each<[Schema, string]>([
          [{ type: 'boolean' }, 'z.boolean().openapi({"type":"boolean"})'],
          [
            { type: ['boolean'], nullable: true },
            'z.boolean().nullable().openapi({"type":["boolean"]})',
          ],
          [
            { type: ['boolean', 'null'] },
            'z.boolean().nullable().openapi({"type":["boolean","null"]})',
          ],
          [
            { type: 'boolean', default: true },
            'z.boolean().default(true).openapi({"type":"boolean","default":true})',
          ],
          [
            { type: 'boolean', default: false },
            'z.boolean().default(false).openapi({"type":"boolean","default":false})',
          ],
          [
            { type: 'boolean', nullable: true },
            'z.boolean().nullable().openapi({"type":"boolean"})',
          ],
          [
            { type: ['boolean', 'null'] },
            'z.boolean().nullable().openapi({"type":["boolean","null"]})',
          ],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })
    })

    // array
    describe('array', () => {
      it.concurrent.each([
        [
          { type: 'array', items: { type: 'string' } },
          'z.array(z.string().openapi({"type":"string"})).openapi({"type":"array","items":{"type":"string"}})',
        ],
        [
          { type: 'array', items: { type: 'string', nullable: true } },
          'z.array(z.string().nullable().openapi({"type":"string"})).openapi({"type":"array","items":{"type":"string","nullable":true}})',
        ],
        [
          { type: 'array', items: { type: ['string', 'null'] } },
          'z.array(z.string().nullable().openapi({"type":["string","null"]})).openapi({"type":"array","items":{"type":["string","null"]}})',
        ],
        [
          { type: 'array', nullable: true, items: { type: ['string', 'null'] } },
          'z.array(z.string().nullable().openapi({"type":["string","null"]})).nullable().openapi({"type":"array","items":{"type":["string","null"]}})',
        ],
        [
          { type: 'array', items: { type: 'number' } },
          'z.array(z.number().openapi({"type":"number"})).openapi({"type":"array","items":{"type":"number"}})',
        ],
        [
          { type: 'array', items: { type: 'number', nullable: true } },
          'z.array(z.number().nullable().openapi({"type":"number"})).openapi({"type":"array","items":{"type":"number","nullable":true}})',
        ],
        [
          { type: 'array', items: { type: ['number', 'null'] } },
          'z.array(z.number().nullable().openapi({"type":["number","null"]})).openapi({"type":"array","items":{"type":["number","null"]}})',
        ],
        [
          { type: 'array', nullable: true, items: { type: ['number', 'null'] } },
          'z.array(z.number().nullable().openapi({"type":["number","null"]})).nullable().openapi({"type":"array","items":{"type":["number","null"]}})',
        ],
        [
          { type: 'array', items: { type: 'boolean' } },
          'z.array(z.boolean().openapi({"type":"boolean"})).openapi({"type":"array","items":{"type":"boolean"}})',
        ],
        [
          { type: 'array', items: { type: 'boolean', nullable: true } },
          'z.array(z.boolean().nullable().openapi({"type":"boolean"})).openapi({"type":"array","items":{"type":"boolean","nullable":true}})',
        ],
        [
          { type: 'array', items: { type: ['boolean', 'null'] } },
          'z.array(z.boolean().nullable().openapi({"type":["boolean","null"]})).openapi({"type":"array","items":{"type":["boolean","null"]}})',
        ],
        [
          { type: 'array', nullable: true, items: { type: ['boolean', 'null'] } },
          'z.array(z.boolean().nullable().openapi({"type":["boolean","null"]})).nullable().openapi({"type":"array","items":{"type":["boolean","null"]}})',
        ],
        [
          { type: 'array', items: { type: 'object' } },
          'z.array(z.object({}).openapi({"type":"object"})).openapi({"type":"array","items":{"type":"object"}})',
        ],
        [
          { type: 'array', items: { type: 'object', nullable: true } },
          'z.array(z.object({}).nullable().openapi({"type":"object"})).openapi({"type":"array","items":{"type":"object","nullable":true}})',
        ],
        [
          { type: 'array', items: { type: ['object', 'null'] } },
          'z.array(z.object({}).nullable().openapi({"type":["object","null"]})).openapi({"type":"array","items":{"type":["object","null"]}})',
        ],
        [
          { type: 'array', nullable: true, items: { type: ['object', 'null'] } },
          'z.array(z.object({}).nullable().openapi({"type":["object","null"]})).nullable().openapi({"type":"array","items":{"type":["object","null"]}})',
        ],
        [
          {
            type: 'array',
            items: {
              type: 'array',
              items: { type: 'string' },
            },
          },
          'z.array(z.array(z.string().openapi({"type":"string"})).openapi({"type":"array","items":{"type":"string"}})).openapi({"type":"array","items":{"type":"array","items":{"type":"string"}}})',
        ],
        [
          { type: 'array', items: { type: 'string' }, minItems: 1 },
          'z.array(z.string().openapi({"type":"string"})).min(1).openapi({"type":"array","items":{"type":"string"},"minItems":1})',
        ],
        [
          { type: 'array', items: { type: 'string' }, maxItems: 10 },
          'z.array(z.string().openapi({"type":"string"})).max(10).openapi({"type":"array","items":{"type":"string"},"maxItems":10})',
        ],
        [
          { type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 10 },
          'z.array(z.string().openapi({"type":"string"})).min(1).max(10).openapi({"type":"array","items":{"type":"string"},"minItems":1,"maxItems":10})',
        ],
        [
          { type: 'array', items: { type: 'string' }, minItems: 5, maxItems: 5 },
          'z.array(z.string().openapi({"type":"string"})).length(5).openapi({"type":"array","items":{"type":"string"},"minItems":5,"maxItems":5})',
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
          'z.array(z.union([z.string().openapi({"type":"string"}),z.number().openapi({"type":"number"}),z.boolean().openapi({"type":"boolean"})]).openapi({"anyOf":[{"type":"string"},{"type":"number"},{"type":"boolean"}]})).openapi({"type":"array","items":{"anyOf":[{"type":"string"},{"type":"number"},{"type":"boolean"}]}})',
        ],
      ])('zodToOpenAPI(%o) → %s', (input, expected) => {
        expect(zodToOpenAPI(input as unknown as Schema)).toBe(expected)
      })

      // object
      describe('object', () => {
        it.concurrent.each<[Schema, string]>([
          [{ type: 'object' }, 'z.object({}).openapi({"type":"object"})'],
          [
            { type: 'object', nullable: true },
            'z.object({}).nullable().openapi({"type":"object"})',
          ],
          [
            { type: ['object', 'null'] },
            'z.object({}).nullable().openapi({"type":["object","null"]})',
          ],
          [
            { type: 'object', properties: { foo: { type: 'string' } }, required: ['foo'] },
            'z.object({foo:z.string().openapi({"type":"string"})}).openapi({"type":"object","properties":{"foo":{"type":"string"}},"required":["foo"]})',
          ],
          [
            {
              type: 'object',
              properties: { foo: { type: 'string' } },
              required: ['foo'],
              nullable: true,
            },
            'z.object({foo:z.string().openapi({"type":"string"})}).nullable().openapi({"type":"object","properties":{"foo":{"type":"string"}},"required":["foo"]})',
          ],
          [
            { type: 'object', properties: { foo: { type: 'string' } }, required: ['foo'] },
            'z.object({foo:z.string().openapi({"type":"string"})}).openapi({"type":"object","properties":{"foo":{"type":"string"}},"required":["foo"]})',
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
            'z.object({type:z.enum(["A","B","C"]).openapi({"type":"string","enum":["A","B","C"]})}).openapi({"type":"object","properties":{"type":{"type":"string","enum":["A","B","C"]}},"required":["type"],"discriminator":{"propertyName":"type"}})',
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
            'z.strictObject({test:z.string().openapi({"type":"string"})}).openapi({"type":"object","properties":{"test":{"type":"string"}},"required":["test"],"additionalProperties":false})',
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
            'z.looseObject({test:z.string().openapi({"type":"string"})}).openapi({"type":"object","properties":{"test":{"type":"string"}},"required":["test"],"additionalProperties":true})',
          ],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })

      // Todo fix date type
      // describe('date', () => {
      //   it.concurrent.each<[Schemas, string]>([
      //     [{ type: 'date' }, 'z.date().exactOptional().openapi({"type":"date"})'],
      //     [
      //       { type: 'date', nullable: true },
      //       'z.date().nullable().exactOptional().openapi({"type":"date"})',
      //     ],
      //     [
      //       { type: ['date', 'null'] },
      //       'z.date().nullable().exactOptional().openapi({"type":["date","null"]})',
      //     ],
      //     [
      //       { type: 'date', default: '2023-01-01' },
      //       'z.date().default(new Date("2023-01-01")).exactOptional().openapi({"type":"date","default":"2023-01-01"})',
      //     ],
      //   ])('zodToOpenAPI(%o) → %s', (input, expected) => {
      //     expect(zodToOpenAPI(input)).toBe(expected)
      //   })
      // })

      // null
      describe('null', () => {
        it.concurrent.each<[Schema, string]>([
          [{ type: 'null' }, 'z.null().nullable().openapi({"type":"null"})'],
          [{ type: 'null', nullable: true }, 'z.null().nullable().openapi({"type":"null"})'],
          [{ type: ['null'] }, 'z.null().nullable().openapi({"type":["null"]})'],
          // Todo fix
          // [{ type: 'null', default: 'test' }, 'z.null().default("test").nullable().exactOptional().openapi({"type":"null","default":"test"})'],
          // [{ type: ['null'], default: 'test' }, 'z.null().default("test").nullable().exactOptional().openapi({"type":"null","default":"test"})'],
          // [
          //   { type: 'null', nullable: true, default: 'test' },
          //   'z.null().default("test").nullable().exactOptional().openapi({"type":"null","default":"test"})',
          // ],
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
            'z.any().openapi({"type":"any"})',
          ],

          [
            {
              // biome-ignore lint: test
              type: 'any' as any,
              nullable: true,
            },
            'z.any().nullable().openapi({"type":"any"})',
          ],
          [
            {
              // biome-ignore lint: test
              type: ['any' as any, 'null'],
            },
            'z.any().nullable().openapi({"type":["any","null"]})',
          ],
          // rare
          [
            {
              // biome-ignore lint: test
              type: 'any' as any,
              default: 'test',
            },
            'z.any().default("test").openapi({"type":"any","default":"test"})',
          ],
          [
            {
              // biome-ignore lint: test
              type: 'any' as any,
              nullable: true,
              default: 'test',
            },
            'z.any().default("test").nullable().openapi({"type":"any","default":"test"})',
          ],
          // rare
          [
            {
              // biome-ignore lint: test
              type: ['any' as any, 'null'],
              default: 'test',
            },
            'z.any().default("test").nullable().openapi({"type":["any","null"],"default":"test"})',
          ],
        ])('zodToOpenAPI(%o) → %s', (input, expected) => {
          expect(zodToOpenAPI(input)).toBe(expected)
        })
      })
    })
  })
})
