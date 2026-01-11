/**
 * OpenAPI Schema to Zod schema converter.
 *
 * Transforms OpenAPI/JSON Schema definitions into Zod validation schemas,
 * supporting all common schema types and combinators.
 *
 * ```mermaid
 * flowchart TD
 *   A["zodToOpenAPI(schema)"] --> B{"Has $ref?"}
 *   B -->|Yes| C["makeRef()"]
 *   B -->|No| D{"Has combinator?"}
 *   D -->|allOf| E["z.intersection()"]
 *   D -->|anyOf| F["z.union()"]
 *   D -->|oneOf| G["z.discriminatedUnion() or z.xor()"]
 *   D -->|not| H["z.any().refine()"]
 *   D -->|No| I{"Check type"}
 *   I -->|string| J["string()"]
 *   I -->|number| K["number()"]
 *   I -->|integer| L["integer()"]
 *   I -->|boolean| M["z.boolean()"]
 *   I -->|array| N["z.array()"]
 *   I -->|object| O["object()"]
 *   I -->|null| P["z.null()"]
 *   I -->|unknown| Q["z.any()"]
 * ```
 *
 * @module generator/zod-to-openapi
 */
import { makeRef } from '../../helper/index.js'
import { wrap } from '../../helper/wrap.js'
import type { Header, Parameter, Schema } from '../../openapi/index.js'
import { normalizeTypes } from '../../utils/index.js'
import { _enum } from './z/enum.js'
import { integer } from './z/integer.js'
import { number } from './z/number.js'
import { object } from './z/object.js'
import { string } from './z/string.js'

/**
 * Converts an OpenAPI Schema to a Zod schema string.
 *
 * Supports all JSON Schema types and OpenAPI extensions:
 * - Primitives: string, number, integer, boolean, null
 * - Complex: object, array
 * - Combinators: allOf, anyOf, oneOf, not
 * - References: $ref
 * - Modifiers: nullable, default, enum, const
 *
 * ```mermaid
 * flowchart LR
 *   A["OpenAPI Schema"] --> B["zodToOpenAPI()"]
 *   B --> C["Zod Schema String"]
 *   C --> D["e.g. z.object({...})"]
 * ```
 *
 * @param schema - OpenAPI Schema object to convert
 * @param meta - Optional parameter/header metadata for validation
 * @returns Zod schema string representation
 *
 * @example
 * ```ts
 * // Simple string
 * zodToOpenAPI({ type: 'string' })
 * // → 'z.string()'
 *
 * // Object with properties
 * zodToOpenAPI({
 *   type: 'object',
 *   properties: { name: { type: 'string' } },
 *   required: ['name']
 * })
 * // → 'z.object({ name: z.string() })'
 *
 * // Reference
 * zodToOpenAPI({ $ref: '#/components/schemas/User' })
 * // → 'UserSchema'
 * ```
 */
export function zodToOpenAPI(
  schema: Schema,
  meta?: {
    parameters?: Parameter
    headers?: Header
    isOptional?: boolean
  },
): string {
  if (schema === undefined) throw new Error('Schema is undefined')
  // isOptional should only affect the outermost schema, not nested schemas
  // Strip isOptional for recursive calls
  const innerMeta: typeof meta = meta?.isOptional
    ? (Object.fromEntries(Object.entries(meta).filter(([k]) => k !== 'isOptional')) as typeof meta)
    : meta
  /** ref */
  if (schema.$ref !== undefined) {
    return wrap(makeRef(schema.$ref), schema, meta)
  }
  /* combinators */
  /** allOf */
  if (schema.allOf !== undefined) {
    if (!schema.allOf?.length) return wrap('z.any()', schema, meta)

    const isNullType = (s: Schema) =>
      s.type === 'null' || (s.nullable === true && Object.keys(s).length === 1)
    const isRefOnly = (s: Schema) => s.$ref !== undefined && Object.keys(s).length === 1
    const nullable =
      schema.nullable === true ||
      (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null') ||
      schema.allOf.some(isNullType)

    const nonNull = schema.allOf.filter((s) => !isNullType(s))
    if (nonNull.length === 0) return wrap('z.any()', { ...schema, nullable }, meta)

    const schemas = nonNull.map((s) =>
      isRefOnly(s) ? makeRef(s.$ref ?? '') : zodToOpenAPI(s, innerMeta),
    )
    const isBareRef =
      schemas.length === 1 &&
      nonNull.every(isRefOnly) &&
      Object.keys(schema).every((k) => k === 'allOf' || k === 'nullable' || k === 'type')
    if (isBareRef) return nullable ? `${schemas[0]}.nullable()` : schemas[0]

    const z = schemas.reduce((acc, s, i) => (i === 0 ? s : `${acc}.and(${s})`))
    return wrap(z, { ...schema, nullable }, meta)
  }
  /* anyOf */
  if (schema.anyOf !== undefined) {
    if (!schema.anyOf || schema.anyOf.length === 0) {
      return wrap('z.any()', schema, meta)
    }
    const anyOfSchemas = schema.anyOf.map((subSchema) => {
      if (subSchema.$ref && Object.keys(subSchema).length === 1) {
        if (subSchema.$ref) {
          return makeRef(subSchema.$ref)
        }
      }
      return zodToOpenAPI(subSchema, innerMeta)
    })
    const z = `z.union([${anyOfSchemas.join(',')}])`
    return wrap(z, schema, meta)
  }
  /* oneOf */
  if (schema.oneOf !== undefined) {
    if (!schema.oneOf || schema.oneOf.length === 0) {
      return wrap('z.any()', schema, meta)
    }
    // Check if any oneOf member is a $ref (could reference allOf schema) or uses allOf directly
    // ZodIntersection (from allOf) is not compatible with discriminatedUnion
    const hasRefOrAllOf = schema.oneOf.some((s) => s.$ref !== undefined || s.allOf !== undefined)
    const oneOfSchemas = schema.oneOf.map((s) => {
      if (s.$ref && Object.keys(s).length === 1) {
        if (s.$ref) {
          return makeRef(s.$ref)
        }
      }
      return zodToOpenAPI(s, innerMeta)
    })
    const discriminator = schema.discriminator?.propertyName
    // Use z.xor when $ref is present (referenced schema might use allOf)
    const z =
      discriminator && !hasRefOrAllOf
        ? `z.discriminatedUnion('${discriminator}',[${oneOfSchemas.join(',')}])`
        : `z.xor([${oneOfSchemas.join(',')}])`
    return wrap(z, schema, meta)
  }
  /* not */
  if (schema.not !== undefined) {
    const typePredicates: Record<string, string> = {
      string: `(v) => typeof v !== 'string'`,
      number: `(v) => typeof v !== 'number'`,
      integer: `(v) => typeof v !== 'number' || !Number.isInteger(v)`,
      boolean: `(v) => typeof v !== 'boolean'`,
      array: '(v) => !Array.isArray(v)',
      object: `(v) => typeof v !== 'object' || v === null || Array.isArray(v)`,
      null: '(v) => v !== null',
    }
    // 1. not.const
    if (typeof schema.not === 'object' && 'const' in schema.not) {
      const value = JSON.stringify(schema.not.const)
      const predicate = `(v) => v !== ${value}`
      return wrap(`z.any().refine(${predicate})`, schema, meta)
    }
    // 2. not.type (single type)
    if (typeof schema.not === 'object' && typeof schema.not.type === 'string') {
      const predicate = typePredicates[schema.not.type]
      if (predicate) {
        return wrap(`z.any().refine(${predicate})`, schema, meta)
      }
    }
    // 3. not.enum
    if (typeof schema.not === 'object' && Array.isArray(schema.not.enum)) {
      const list = JSON.stringify(schema.not.enum)
      const predicate = `(v) => !${list}.includes(v)`
      return wrap(`z.any().refine(${predicate})`, schema, meta)
    }
    // 4. fallback
    return wrap('z.any()', schema, meta)
  }
  /* const */
  if (schema.const !== undefined) {
    const value = schema.const
    // z.literal only supports primitives in Zod 4
    const isPrimitive =
      value === null ||
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    const z = isPrimitive
      ? `z.literal(${JSON.stringify(value)})`
      : `z.custom<${JSON.stringify(value)}>()`
    return wrap(z, schema, meta)
  }
  /* enum */
  if (schema.enum !== undefined) return wrap(_enum(schema), schema, meta)
  /* properties */
  if (schema.properties !== undefined) return wrap(object(schema), schema, meta)
  const t = normalizeTypes(schema.type)
  /* string */
  if (t.includes('string')) return wrap(string(schema), schema, meta)
  /* number */
  if (t.includes('number')) return wrap(number(schema), schema, meta)
  /* integer & bigint */
  if (t.includes('integer')) return wrap(integer(schema), schema, meta)
  /* boolean */
  if (t.includes('boolean')) return wrap('z.boolean()', schema, meta)
  /* array */
  if (t.includes('array')) {
    // items can be Schema or readonly Schema[] (JSON Schema draft-04 tuple validation)
    const rawItems = schema.items
    const itemSchema: Schema | undefined = Array.isArray(rawItems) ? rawItems[0] : rawItems
    const item = itemSchema
      ? itemSchema.$ref
        ? makeRef(itemSchema.$ref)
        : zodToOpenAPI(itemSchema, innerMeta)
      : 'z.any()'
    const z = `z.array(${item})`
    if (typeof schema.minItems === 'number' && typeof schema.maxItems === 'number') {
      return schema.minItems === schema.maxItems
        ? wrap(`${z}.length(${schema.minItems})`, schema, meta)
        : wrap(`${z}.min(${schema.minItems}).max(${schema.maxItems})`, schema, meta)
    }
    if (typeof schema.minItems === 'number')
      return wrap(`${z}.min(${schema.minItems})`, schema, meta)
    if (typeof schema.maxItems === 'number')
      return wrap(`${z}.max(${schema.maxItems})`, schema, meta)
    return wrap(z, schema, meta)
  }
  /* object */
  if (t.includes('object')) return wrap(object(schema), schema, meta)
  /* date */
  if (t.includes('date')) return wrap('z.date()', schema, meta)
  /* null only */
  if (t.length === 1 && t[0] === 'null') return wrap('z.null()', schema, meta)
  console.warn(`fallback to z.any(): schema=${JSON.stringify(schema)}`)
  return wrap('z.any()', schema, meta)
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/generator/zod-to-openapi/index.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest
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
              [
                { type: 'integer', default: 100, nullable: true },
                'z.int().default(100).nullable()',
              ],
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
              'z.boolean().default(true).nullable()',
            ],
            [{ type: ['boolean', 'null'], default: true }, 'z.boolean().default(true).nullable()'],
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
            [
              { type: 'object', default: {}, nullable: true },
              'z.object({}).default({}).nullable()',
            ],
            [{ type: ['object', 'null'], default: {} }, 'z.object({}).default({}).nullable()'],
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
            [
              { type: 'array', items: { type: 'string' }, minItems: 1 },
              'z.array(z.string()).min(1)',
            ],
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
              'z.array(z.string())',
            ],
            [
              { type: 'array', items: { type: 'string' }, default: [] },
              'z.array(z.string()).default([])',
            ],
            [
              { type: 'array', items: { type: 'string' }, default: [], nullable: true },
              'z.array(z.string()).default([]).nullable()',
            ],
            [
              { type: ['array', 'null'], items: { type: 'string' }, default: [] },
              'z.array(z.string()).default([]).nullable()',
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
            [
              { type: 'any', nullable: true, default: 'test' },
              'z.any().default("test").nullable()',
            ],
            [{ type: ['any', 'null'], default: 'test' }, 'z.any().default("test").nullable()'],
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
  })
}
