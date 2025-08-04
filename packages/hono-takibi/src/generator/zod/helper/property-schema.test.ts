import { describe, expect, it } from 'vitest'
import { propertySchema } from './property-schema'

// Test run
// pnpm vitest run ./src/generator/zod/helper/property-schema.test.ts

describe('propertySchema', () => {
  it.concurrent('propertySchema -> TestSchema', () => {
    const result = propertySchema({
      $ref: '#/components/schemas/Test',
    })

    const expected = 'TestSchema'
    expect(result).toBe(expected)
  })

  it.concurrent('propertySchema -> z.string()', () => {
    const result = propertySchema({
      type: 'string',
    })

    const expected = 'z.string()'
    expect(result).toBe(expected)
  })

  it.concurrent('propertySchema -> z.number()', () => {
    const result = propertySchema({
      type: 'number',
    })

    const expected = 'z.number()'
    expect(result).toBe(expected)
  })

  it.concurrent('propertySchema -> z.any', () => {
    const result = propertySchema({
      // biome-ignore lint: test
      $ref: '' as any,
    })

    const expected = 'z.any()'
    expect(result).toBe(expected)
  })

  it.concurrent('propertySchema -> z.array(z.any())', () => {
    const result = propertySchema({
      type: 'array',
      items: {
        // biome-ignore lint: test
        $ref: '' as any,
      },
    })

    const expected = 'z.array(z.any())'
    expect(result).toBe(expected)
  })

  it.concurrent('propertySchema -> z.array(TestSchema)', () => {
    const result = propertySchema({
      type: 'array',
      items: {
        $ref: '#/components/schemas/Test',
      },
    })

    const expected = 'z.array(TestSchema)'
    expect(result).toBe(expected)
  })

  it.concurrent('propertySchema -> z.email()', () => {
    const result = propertySchema({ type: 'string', format: 'email' })

    const expected = 'z.email()'
    expect(result).toBe(expected)
  })

  it.concurrent('propertySchema -> z.uuid()', () => {
    const result = propertySchema({ type: 'string', format: 'uuid' })

    const expected = 'z.uuid()'
    expect(result).toBe(expected)
  })

  it.concurrent('propertySchema -> z.iso.datetime()', () => {
    const result = propertySchema({ type: 'string', format: 'date-time' })

    const expected = 'z.iso.datetime()'
    expect(result).toBe(expected)
  })

  it.concurrent('propertySchema -> z.enum(["a","b","c"])', () => {
    const result = propertySchema({ type: 'string', enum: ['a', 'b', 'c'] })

    const expected = 'z.enum(["a","b","c"])'
    expect(result).toBe(expected)
  })

  // $ref
  describe('ref', () => {
    it.concurrent('TestSchema', () => {
      expect(propertySchema({ $ref: '#/components/schemas/Test' })).toBe('TestSchema')
    })
  })
  // oneOf
  describe('oneOf', () => {
    it.concurrent(
      'z.union([z.object({kind:z.literal("A")}),z.object({kind:z.literal("B")})])',
      () => {
        expect(
          propertySchema({
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
          }),
        ).toBe('z.union([z.object({kind:z.literal("A")}),z.object({kind:z.literal("B")})])')
      },
    )

    it.concurrent('z.union([z.number(),z.string()])', () => {
      expect(
        propertySchema({
          oneOf: [
            {
              type: 'number',
            },
            {
              type: 'string',
            },
          ],
        }),
      ).toBe('z.union([z.number(),z.string()])')
    })
    it.concurrent('z.union([ExampleSchemaSchema,AnotherSchemaSchema])', () => {
      expect(
        propertySchema({
          oneOf: [
            { $ref: '#/components/schemas/ExampleSchema' },
            { $ref: '#/components/schemas/AnotherSchema' },
          ],
        }),
      ).toBe('z.union([ExampleSchemaSchema,AnotherSchemaSchema])')
    })

    it.concurrent('z.union([z.string(),z.number()]).nullable()', () => {
      expect(
        propertySchema({
          oneOf: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
          ],
          nullable: true,
        }),
      ).toBe('z.union([z.string(),z.number()]).nullable()')
    })
    it.concurrent('z.union([z.string(),z.number(),z.string().nullable()]).nullable()', () => {
      expect(
        propertySchema({
          oneOf: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
            {
              type: ['string', 'null'],
            },
          ],
          type: ['null'],
        }),
      ).toBe('z.union([z.string(),z.number(),z.string().nullable()]).nullable()')
    })
  })
  // anyOf
  // not support zod-to-openapi
  describe('anyOf', () => {
    it.concurrent(
      'z.union([z.object({kind:z.literal("A")}),z.object({kind:z.literal("B")})])',
      () => {
        expect(
          propertySchema({
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
          }),
        ).toBe('z.union([z.object({kind:z.literal("A")}),z.object({kind:z.literal("B")})])')
      },
    )

    it.concurrent(
      'z.union([MultiPolygonSchema,PolygonSchema]).openapi({description:"Center coordinates"})',
      () => {
        expect(
          propertySchema({
            anyOf: [
              {
                $ref: '#/components/schemas/MultiPolygon',
              },
              {
                $ref: '#/components/schemas/Polygon',
              },
            ],
            description: 'Center coordinates',
          }),
        ).toBe(
          'z.union([MultiPolygonSchema,PolygonSchema]).openapi({description:"Center coordinates"})',
        )
      },
    )
    it.concurrent('z.union([z.string(),z.number()]).nullable()', () => {
      expect(
        propertySchema({
          anyOf: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
          ],
          nullable: true,
        }),
      ).toBe('z.union([z.string(),z.number()]).nullable()')
    })

    it.concurrent('z.union([z.string(),z.number()]).nullable()', () => {
      expect(
        propertySchema({
          anyOf: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
          ],
          type: ['null'],
        }),
      ).toBe('z.union([z.string(),z.number()]).nullable()')
    })

    it.concurrent('z.union([z.string().nullable(),FooSchema])', () => {
      expect(
        propertySchema({
          anyOf: [{ type: ['string', 'null'] }, { $ref: '#/components/schemas/Foo' }],
        }),
      ).toBe('z.union([z.string().nullable(),FooSchema])')
    })

    it.concurrent('z.union([z.string(),z.number(),z.string().nullable()])', () => {
      expect(
        propertySchema({
          anyOf: [{ type: 'string' }, { type: 'number' }, { type: ['string', 'null'] }],
        }),
      ).toBe('z.union([z.string(),z.number(),z.string().nullable()])')
    })

    it.concurrent('z.union([z.string(),z.number()])', () => {
      expect(
        propertySchema({
          anyOf: [{ type: 'string' }, { type: 'number' }],
        }),
      ).toBe('z.union([z.string(),z.number()])')
    })

    it.concurrent('z.union([z.string().nullable(),FooSchema,BarSchema])', () => {
      expect(
        propertySchema({
          anyOf: [
            { type: ['string', 'null'] },
            { $ref: '#/components/schemas/Foo' },
            { $ref: '#/components/schemas/Bar' },
          ],
        }),
      ).toBe('z.union([z.string().nullable(),FooSchema,BarSchema])')
    })
  })

  // allOf
  // not support zod-to-openapi
  describe('allOf', () => {
    it.concurrent(
      'z.intersection(GeoJsonObjectSchema,z.object({type:z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"])})).openapi({description:"Abstract type for all GeoJSon object except Feature and FeatureCollection\\n"})',
      () => {
        expect(
          propertySchema({
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
          'z.intersection(GeoJsonObjectSchema,z.object({type:z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"])})).openapi({description:"Abstract type for all GeoJSon object except Feature and FeatureCollection\\n"})',
        )
      },
    )
    it.concurrent(
      `z.intersection(GeoJsonObjectSchema,z.object({geometry:GeometrySchema.nullable(),properties:z.object({}).nullable(),id:z.union([z.number(),z.string()]).optional()})).openapi({description:"GeoJSon 'Feature' object"})`,
      () => {
        expect(
          propertySchema({
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
          `z.intersection(GeoJsonObjectSchema,z.object({geometry:GeometrySchema.nullable(),properties:z.object({}).nullable(),id:z.union([z.number(),z.string()]).optional()})).openapi({description:"GeoJSon 'Feature' object"})`,
        )
      },
    )

    it.concurrent(
      'z.intersection(z.object({test:z.string()}),z.object({test2:z.string()})).nullable()',
      () => {
        expect(
          propertySchema({
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
        ).toBe(
          'z.intersection(z.object({test:z.string()}),z.object({test2:z.string()})).nullable()',
        )
      },
    )

    it.concurrent(
      'z.intersection(z.object({test:z.string()}),z.object({test2:z.string()})).nullable()',
      () => {
        expect(
          propertySchema({
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
        ).toBe(
          'z.intersection(z.object({test:z.string()}),z.object({test2:z.string()})).nullable()',
        )
      },
    )
  })
  // TODO add not

  describe('const', () => {
    it.concurrent('z.literal("test")', () => {
      expect(propertySchema({ const: 'fixed' })).toBe('z.literal("fixed")')
    })
    it.concurrent('z.literal("test").nullable()', () => {
      expect(propertySchema({ const: 'fixed', nullable: true })).toBe(
        'z.literal("fixed").nullable()',
      )
    })
    it.concurrent('z.literal("test").nullable()', () => {
      expect(propertySchema({ type: ['null'], const: 'fixed' })).toBe(
        'z.literal("fixed").nullable()',
      )
    })
  })

  // enum
  describe('enum', () => {
    it.concurrent('z.enum(["A","B"])', () => {
      expect(propertySchema({ enum: ['A', 'B'], type: 'string' })).toBe('z.enum(["A","B"])')
    })
    // nullable
    it.concurrent('z.enum(["A","B"]).nullable()', () => {
      expect(propertySchema({ enum: ['A', 'B'], type: ['string'], nullable: true })).toBe(
        'z.enum(["A","B"]).nullable()',
      )
    })
    it.concurrent('z.enum(["A","B"]).nullable() if type: ["string", "null"]', () => {
      expect(propertySchema({ enum: ['A', 'B'], type: ['string', 'null'] })).toBe(
        'z.enum(["A","B"]).nullable()',
      )
    })
    it.concurrent(`z.literal('test')`, () => {
      expect(propertySchema({ enum: ['test'] })).toBe(`z.literal('test')`)
    })
    it.concurrent('z.enum(["a","b","c"])', () => {
      expect(propertySchema({ enum: ['a', 'b', 'c'] })).toBe('z.enum(["a","b","c"])')
    })
    it.concurrent('z.union([z.literal(1),z.literal(2)])', () => {
      expect(propertySchema({ enum: [1, 2] })).toBe('z.union([z.literal(1),z.literal(2)])')
    })
    it.concurrent('z.union([z.literal(1),z.literal(2),z.literal(3)])', () => {
      expect(propertySchema({ enum: [1, 2, 3] })).toBe(
        'z.union([z.literal(1),z.literal(2),z.literal(3)])',
      )
    })
    it.concurrent('z.literal(true)', () => {
      expect(propertySchema({ enum: [true] })).toBe('z.literal(true)')
    })
    it.concurrent('z.union([z.literal(true),z.literal(false)])', () => {
      expect(propertySchema({ enum: [true, false] })).toBe(
        'z.union([z.literal(true),z.literal(false)])',
      )
    })
    it.concurrent('z.tuple([z.literal(1), z.literal(2)])', () => {
      expect(propertySchema({ type: 'array', enum: [[1, 2]] })).toBe(
        'z.tuple([z.literal(1), z.literal(2)])',
      )
    })
    it.concurrent(
      'z.union([z.tuple([z.literal(1),z.literal(2)]),z.tuple([z.literal(3),z.literal(4)])])',
      () => {
        expect(
          propertySchema({
            type: 'array',
            enum: [
              [1, 2],
              [3, 4],
            ],
          }),
        ).toBe(
          'z.union([z.tuple([z.literal(1),z.literal(2)]),z.tuple([z.literal(3),z.literal(4)])])',
        )
      },
    )
    it.concurrent("z.union([z.literal(1),z.literal('two'),z.null()])", () => {
      expect(propertySchema({ enum: [1, 'two', null] })).toBe(
        "z.union([z.literal(1),z.literal('two'),z.null()])",
      )
    })
    it.concurrent('z.literal(null)', () => {
      expect(propertySchema({ enum: [null] })).toBe('z.literal(null)')
    })
    it.concurrent(`z.literal('abc')`, () => {
      expect(propertySchema({ enum: ['abc'] })).toBe(`z.literal('abc')`)
    })
  })

  // TODO properties

  // string
  describe('string', () => {
    it.concurrent('z.string()', () => {
      expect(propertySchema({ type: 'string' })).toBe('z.string()')
    })
    it.concurrent('z.string().min(1).max(10)', () => {
      expect(propertySchema({ type: 'string', minLength: 1, maxLength: 10 })).toBe(
        'z.string().min(1).max(10)',
      )
    })
    it.concurrent('z.string().default("test")', () => {
      expect(propertySchema({ type: 'string', default: 'test' })).toBe('z.string().default("test")')
    })
    it.concurrent('z.string().nullable()', () => {
      expect(propertySchema({ type: 'string', nullable: true })).toBe('z.string().nullable()')
    })
    it.concurrent("z.string().nullable() if type: ['string', 'null']", () => {
      expect(propertySchema({ type: ['string', 'null'] })).toBe('z.string().nullable()')
    })
    it.concurrent('z.length(5)', () => {
      expect(propertySchema({ type: 'string', minLength: 5, maxLength: 5 })).toBe(
        'z.string().length(5)',
      )
    })
    it.concurrent('z.email()', () => {
      expect(propertySchema({ type: 'string', format: 'email' })).toBe('z.email()')
    })
    it.concurrent('z.url()', () => {
      expect(propertySchema({ type: 'string', format: 'uri' })).toBe('z.url()')
    })
    it.concurrent('z.uuid()', () => {
      expect(propertySchema({ type: 'string', format: 'uuid' })).toBe('z.uuid()')
    })
    it.concurrent('z.cuid()', () => {
      expect(propertySchema({ type: 'string', format: 'cuid' })).toBe('z.cuid()')
    })
    it.concurrent('z.cuid2()', () => {
      expect(propertySchema({ type: 'string', format: 'cuid2' })).toBe('z.cuid2()')
    })
    it.concurrent('z.ulid()', () => {
      expect(propertySchema({ type: 'string', format: 'ulid' })).toBe('z.ulid()')
    })
    it.concurrent('z.string().regex(/^[a-zA-Z]+$/)', () => {
      expect(propertySchema({ type: 'string', pattern: '^[a-zA-Z]+$' })).toBe(
        'z.string().regex(/^[a-zA-Z]+$/)',
      )
    })
    it.concurrent('z.iso().datetime()', () => {
      expect(propertySchema({ type: 'string', format: 'date-time' })).toBe('z.iso.datetime()')
    })
    it.concurrent('z.ipv4()', () => {
      expect(propertySchema({ type: 'string', format: 'ipv4' })).toBe('z.ipv4()')
    })
  })

  // number
  describe('number', () => {
    // float
    it.concurrent('type: number format: float → z.float32()', () => {
      expect(propertySchema({ type: 'number', format: 'float' })).toBe('z.float32()')
    })
    it.concurrent('type: number format: float64 → z.float64()', () => {
      expect(propertySchema({ type: 'number', format: 'float64' })).toBe('z.float64()')
    })
    it.concurrent('type: number → z.number()', () => {
      expect(propertySchema({ type: 'number' })).toBe('z.number()')
    })
    // nullable
    it.concurrent('type: number, nullable: true → z.number().nullable()', () => {
      expect(propertySchema({ type: 'number', nullable: true })).toBe('z.number().nullable()')
    })
    it.concurrent("type: ['number', 'null'] → z.number().nullable()", () => {
      expect(propertySchema({ type: ['number', 'null'] })).toBe('z.number().nullable()')
    })
    // positive
    it.concurrent('minimum: 0, exclusiveMinimum: true → z.number().positive()', () => {
      expect(
        propertySchema({
          type: 'number',
          minimum: 0,
          exclusiveMinimum: true,
        }),
      ).toBe('z.number().positive()')
    })
    // nonnegative
    it.concurrent('minimum: 0, exclusiveMinimum: false → z.number().nonnegative()', () => {
      expect(
        propertySchema({
          type: 'number',
          minimum: 0,
          exclusiveMinimum: false,
        }),
      ).toBe('z.number().nonnegative()')
    })
    // negative
    it.concurrent('maximum: 0, exclusiveMaximum: true → z.number().negative()', () => {
      expect(propertySchema({ type: 'number', maximum: 0, exclusiveMaximum: true })).toBe(
        'z.number().negative()',
      )
    })
    // nonpositive
    it.concurrent('maximum: 0 → z.number().nonpositive()', () => {
      expect(propertySchema({ type: 'number', maximum: 0, exclusiveMaximum: false })).toBe(
        'z.number().nonpositive()',
      )
    })
    // min
    it.concurrent('minimum: 100 → z.number().min(100)', () => {
      expect(propertySchema({ type: 'number', minimum: 100 })).toBe('z.number().min(100)')
    })
    // min 0
    it.concurrent('minimum: 0, exclusiveMinimum: true → z.number().min(0)', () => {
      expect(propertySchema({ type: 'number', minimum: 0 })).toBe('z.number().min(0)')
    })
    // gt
    it.concurrent('minimum: 100, exclusiveMinimum: true → z.number().gt(100)', () => {
      expect(propertySchema({ type: 'number', minimum: 100, exclusiveMinimum: true })).toBe(
        'z.number().gt(100)',
      )
    })
    // max
    it.concurrent('maximum: 100 → z.number().max(100)', () => {
      expect(propertySchema({ type: 'number', maximum: 100 })).toBe('z.number().max(100)')
    })
    // max 0
    it.concurrent('maximum: 0, exclusiveMaximum: true → z.number().max(0)', () => {
      expect(propertySchema({ type: 'number', maximum: 0 })).toBe('z.number().max(0)')
    })
    // lt
    it.concurrent('maximum: 100, exclusiveMaximum: true → z.number().lt(100)', () => {
      expect(propertySchema({ type: 'number', maximum: 100, exclusiveMaximum: true })).toBe(
        'z.number().lt(100)',
      )
    })
    // multipleOf
    it.concurrent('multipleOf: 2 → z.number().multipleOf(2)', () => {
      expect(propertySchema({ type: 'number', multipleOf: 2 })).toBe('z.number().multipleOf(2)')
    })
    // default
    it.concurrent('default: 100 → z.number().default(100)', () => {
      expect(propertySchema({ type: 'number', default: 100 })).toBe('z.number().default(100)')
    })
  })

  // integer
  describe('integer', () => {
    // integer
    it.concurrent('z.int()', () => {
      expect(propertySchema({ type: 'integer' })).toBe('z.int()')
    })
    // int
    it.concurrent('type: integer → z.int()', () => {
      expect(propertySchema({ type: 'integer' })).toBe('z.int()')
    })
    // nullable
    it.concurrent('type: [integer, null] → z.int().nullable()', () => {
      expect(propertySchema({ type: ['integer', 'null'] })).toBe('z.int().nullable()')
    })
    // positive
    it.concurrent('minimum: 0, exclusiveMinimum: true → z.int().positive()', () => {
      expect(propertySchema({ type: 'integer', minimum: 0, exclusiveMinimum: true })).toBe(
        'z.int().positive()',
      )
    })
    // nonnegative
    it.concurrent('minimum: 0, exclusiveMinimum: false → z.int().nonnegative()', () => {
      expect(propertySchema({ type: 'integer', minimum: 0, exclusiveMinimum: false })).toBe(
        'z.int().nonnegative()',
      )
    })
    // negative
    it.concurrent('maximum: 0, exclusiveMaximum: true → z.int().negative()', () => {
      expect(propertySchema({ type: 'integer', maximum: 0, exclusiveMaximum: true })).toBe(
        'z.int().negative()',
      )
    })
    // nonpositive
    it.concurrent('maximum: 0, exclusiveMaximum: false → z.int().nonpositive()', () => {
      expect(propertySchema({ type: 'integer', maximum: 0, exclusiveMaximum: false })).toBe(
        'z.int().nonpositive()',
      )
    })
    // min
    it.concurrent('minimum: 100 → z.int().min(100)', () => {
      expect(propertySchema({ type: 'integer', minimum: 100 })).toBe('z.int().min(100)')
    })
    // min 0
    it.concurrent('minimum: 0, exclusiveMinimum: true → z.int().min(0)', () => {
      expect(propertySchema({ type: 'integer', minimum: 0 })).toBe('z.int().min(0)')
    })
    // gt
    it.concurrent('minimum: 100, exclusiveMinimum: true → z.int().gt(100)', () => {
      expect(propertySchema({ type: 'integer', minimum: 100, exclusiveMinimum: true })).toBe(
        'z.int().gt(100)',
      )
    })
    it.concurrent('exclusiveMinimum: 100 → z.int().gt(100)', () => {
      expect(propertySchema({ type: 'integer', exclusiveMinimum: 100 })).toBe('z.int().gt(100)')
    })
    // max
    it.concurrent('maximum: 100 → z.int().max(100)', () => {
      expect(propertySchema({ type: 'integer', maximum: 100 })).toBe('z.int().max(100)')
    })
    // max 0
    it.concurrent('maximum: 0, exclusiveMaximum: true → z.int().max(0)', () => {
      expect(propertySchema({ type: 'integer', maximum: 0 })).toBe('z.int().max(0)')
    })
    // lt
    it.concurrent('maximum: 100, exclusiveMaximum: true → z.int().lt(100)', () => {
      expect(propertySchema({ type: 'integer', maximum: 100, exclusiveMaximum: true })).toBe(
        'z.int().lt(100)',
      )
    })
    it.concurrent('exclusiveMaximum: 100 → z.int().lt(100)', () => {
      expect(propertySchema({ type: 'integer', exclusiveMaximum: 100 })).toBe('z.int().lt(100)')
    })
    it.concurrent('maximum: 0 → z.int().max(0)', () => {
      expect(propertySchema({ type: 'integer', maximum: 0 })).toBe('z.int().max(0)')
    })
    // multipleOf
    it.concurrent('type: integer, multipleOf: 2 → z.int().multipleOf(2)', () => {
      expect(propertySchema({ type: 'integer', multipleOf: 2 })).toBe('z.int().multipleOf(2)')
    })
    // default
    it.concurrent('default: 100 → z.int().default(100)', () => {
      expect(propertySchema({ type: 'integer', default: 100 })).toBe('z.int().default(100)')
    })
    // int32
    it.concurrent('type: integer, format: int32 → z.int32()', () => {
      expect(propertySchema({ type: 'integer', format: 'int32' })).toBe('z.int32()')
    })
    // int32 nullable
    it.concurrent('type: [integer, null], format: int32 → z.int32().nullable()', () => {
      expect(propertySchema({ type: ['integer', 'null'], format: 'int32' })).toBe(
        'z.int32().nullable()',
      )
    })
    // int32 positive
    it.concurrent('minimum: 0, exclusiveMinimum: true → z.int32().positive()', () => {
      expect(
        propertySchema({ type: 'integer', format: 'int32', minimum: 0, exclusiveMinimum: true }),
      ).toBe('z.int32().positive()')
    })
    // int32 nonnegative
    it.concurrent('minimum: 0, exclusiveMinimum: false → z.int32().nonnegative()', () => {
      expect(
        propertySchema({ type: 'integer', format: 'int32', minimum: 0, exclusiveMinimum: false }),
      ).toBe('z.int32().nonnegative()')
    })
    // int32 negative
    it.concurrent('maximum: 0, exclusiveMaximum: true → z.int32().negative()', () => {
      expect(
        propertySchema({ type: 'integer', format: 'int32', maximum: 0, exclusiveMaximum: true }),
      ).toBe('z.int32().negative()')
    })
    // int32 nonpositive
    it.concurrent('maximum: 0, exclusiveMaximum: false → z.int32().nonpositive()', () => {
      expect(
        propertySchema({ type: 'integer', format: 'int32', maximum: 0, exclusiveMaximum: false }),
      ).toBe('z.int32().nonpositive()')
    })
    // int32 min
    it.concurrent('minimum: 100 → z.int32().min(100)', () => {
      expect(propertySchema({ type: 'integer', format: 'int32', minimum: 100 })).toBe(
        'z.int32().min(100)',
      )
    })
    // int32 min 0
    it.concurrent('minimum: 0, exclusiveMinimum: true → z.int32().min(0)', () => {
      expect(propertySchema({ type: 'integer', format: 'int32', minimum: 0 })).toBe(
        'z.int32().min(0)',
      )
    })
    // int32 gt
    it.concurrent('minimum: 100, exclusiveMinimum: true → z.int32().gt(100)', () => {
      expect(
        propertySchema({ type: 'integer', format: 'int32', minimum: 100, exclusiveMinimum: true }),
      ).toBe('z.int32().gt(100)')
    })
    // int32 max
    it.concurrent('maximum: 100 → z.int32().max(100)', () => {
      expect(propertySchema({ type: 'integer', format: 'int32', maximum: 100 })).toBe(
        'z.int32().max(100)',
      )
    })
    // int32 max 0
    it.concurrent('maximum: 0, exclusiveMaximum: true → z.int32().max()', () => {
      expect(propertySchema({ type: 'integer', format: 'int32', maximum: 0 })).toBe(
        'z.int32().max(0)',
      )
    })
    // int32 lt
    it.concurrent('maximum: 100, exclusiveMaximum: true → z.int32().lt(100)', () => {
      expect(
        propertySchema({ type: 'integer', format: 'int32', maximum: 100, exclusiveMaximum: true }),
      ).toBe('z.int32().lt(100)')
    })
    // int32 multipleOf
    it.concurrent('type: integer, format: int32, multipleOf: 2 → z.int32().multipleOf(2)', () => {
      expect(propertySchema({ type: 'integer', format: 'int32', multipleOf: 2 })).toBe(
        'z.int32().multipleOf(2)',
      )
    })
    // int32 default
    it.concurrent('default: 100 → z.int32().default(100)', () => {
      expect(propertySchema({ type: 'integer', format: 'int32', default: 100 })).toBe(
        'z.int32().default(100)',
      )
    })
    // int64
    it.concurrent('type: integer, format: int64 → z.int64()', () => {
      expect(propertySchema({ type: 'integer', format: 'int64' })).toBe('z.int64()')
    })
    // int64 nullable
    it.concurrent('type: [integer, null], format: int64 → z.int64().nullable()', () => {
      expect(propertySchema({ type: ['integer', 'null'], format: 'int64' })).toBe(
        'z.int64().nullable()',
      )
    })
    // int64 positive
    it.concurrent('minimum: 0, exclusiveMinimum: true → z.int64().positive()', () => {
      expect(
        propertySchema({ type: 'integer', format: 'int64', minimum: 0, exclusiveMinimum: true }),
      ).toBe('z.int64().positive()')
    })
    // int64 nonnegative
    it.concurrent('minimum: 0, exclusiveMinimum: false → z.int64().nonnegative()', () => {
      expect(
        propertySchema({ type: 'integer', format: 'int64', minimum: 0, exclusiveMinimum: false }),
      ).toBe('z.int64().nonnegative()')
    })
    // int64 negative
    it.concurrent('maximum: 0, exclusiveMaximum: true → z.int64().negative()', () => {
      expect(
        propertySchema({ type: 'integer', format: 'int64', maximum: 0, exclusiveMaximum: true }),
      ).toBe('z.int64().negative()')
    })
    // int64 nonpositive
    it.concurrent('maximum: 0, exclusiveMaximum: false → z.int64().nonpositive()', () => {
      expect(
        propertySchema({ type: 'integer', format: 'int64', maximum: 0, exclusiveMaximum: false }),
      ).toBe('z.int64().nonpositive()')
    })
    // int64 min
    it.concurrent('minimum: 100 → z.int64().min(100n)', () => {
      expect(propertySchema({ type: 'integer', format: 'int64', minimum: 100 })).toBe(
        'z.int64().min(100n)',
      )
    })
    // int64 min 0
    it.concurrent('minimum: 0, exclusiveMinimum: true → z.int64().min(0n)', () => {
      expect(propertySchema({ type: 'integer', format: 'int64', minimum: 0 })).toBe(
        'z.int64().min(0n)',
      )
    })
    // int64 gt
    it.concurrent('minimum: 100, exclusiveMinimum: true → z.int64().gt(100n)', () => {
      expect(
        propertySchema({ type: 'integer', format: 'int64', minimum: 100, exclusiveMinimum: true }),
      ).toBe('z.int64().gt(100n)')
    })
    // int64 max
    it.concurrent('maximum: 100 → z.int64().max(100n)', () => {
      expect(propertySchema({ type: 'integer', format: 'int64', maximum: 100 })).toBe(
        'z.int64().max(100n)',
      )
    })
    // int64 max 0
    it.concurrent('maximum: 0, exclusiveMaximum: true → z.int64().negative()', () => {
      expect(propertySchema({ type: 'integer', format: 'int64', maximum: 0 })).toBe(
        'z.int64().max(0n)',
      )
    })
    // int64 lt
    it.concurrent('maximum: 100, exclusiveMaximum: true → z.int64().lt(100n)', () => {
      expect(
        propertySchema({ type: 'integer', format: 'int64', maximum: 100, exclusiveMaximum: true }),
      ).toBe('z.int64().lt(100n)')
    })
    // int64 multipleOf
    it.concurrent('type: integer, format: int64, multipleOf: 2 → z.int64().multipleOf(2n)', () => {
      expect(propertySchema({ type: 'integer', format: 'int64', multipleOf: 2 })).toBe(
        'z.int64().multipleOf(2n)',
      )
    })
    // int64 default
    it.concurrent('default: 100 → z.int64().default(100n)', () => {
      expect(propertySchema({ type: 'integer', format: 'int64', default: 100 })).toBe(
        'z.int64().default(100n)',
      )
    })
    // bigint
    it.concurrent('type: integer, format: bigint → z.bigint()', () => {
      expect(propertySchema({ type: 'integer', format: 'bigint' })).toBe('z.bigint()')
    })
    // bigint nullable
    it.concurrent('type: [integer, null], format: bigint → z.bigint().nullable()', () => {
      expect(propertySchema({ type: ['integer', 'null'], format: 'bigint' })).toBe(
        'z.bigint().nullable()',
      )
    })
    // bigint positive
    it.concurrent('minimum: 0, exclusiveMinimum: true → z.bigint().positive()', () => {
      expect(
        propertySchema({ type: 'integer', format: 'bigint', minimum: 0, exclusiveMinimum: true }),
      ).toBe('z.bigint().positive()')
    })
    // bigint nonnegative
    it.concurrent('minimum: 0, exclusiveMinimum: false → z.bigint().nonnegative()', () => {
      expect(
        propertySchema({ type: 'integer', format: 'bigint', minimum: 0, exclusiveMinimum: false }),
      ).toBe('z.bigint().nonnegative()')
    })
    // bigint negative
    it.concurrent('maximum: 0, exclusiveMaximum: true → z.bigint().negative()', () => {
      expect(
        propertySchema({ type: 'integer', format: 'bigint', maximum: 0, exclusiveMaximum: true }),
      ).toBe('z.bigint().negative()')
    })
    // bigint nonpositive
    it.concurrent('z.bigint() -> .nonpositive()', () => {
      expect(
        propertySchema({ type: 'integer', format: 'bigint', maximum: 0, exclusiveMaximum: false }),
      ).toBe('z.bigint().nonpositive()')
    })
    // bigint min
    it.concurrent('minimum: 100 → z.bigint().min(BigInt(100))', () => {
      expect(propertySchema({ type: 'integer', format: 'bigint', minimum: 100 })).toBe(
        'z.bigint().min(BigInt(100))',
      )
    })
    // bigint min 0
    it.concurrent('minimum: 0, exclusiveMinimum: true → z.bigint().min(BigInt(0))', () => {
      expect(propertySchema({ type: 'integer', format: 'bigint', minimum: 0 })).toBe(
        'z.bigint().min(BigInt(0))',
      )
    })
    // bigint gt
    it.concurrent('minimum: 100, exclusiveMinimum: true → z.bigint().gt(BigInt(100))', () => {
      expect(
        propertySchema({ type: 'integer', format: 'bigint', minimum: 100, exclusiveMinimum: true }),
      ).toBe('z.bigint().gt(BigInt(100))')
    })
    // bigint max
    it.concurrent('maximum: 100 → z.bigint().max(BigInt(100))', () => {
      expect(propertySchema({ type: 'integer', format: 'bigint', maximum: 100 })).toBe(
        'z.bigint().max(BigInt(100))',
      )
    })
    // bigint lt
    it.concurrent('maximum: 100, exclusiveMaximum: true → z.bigint().lt(BigInt(100))', () => {
      expect(
        propertySchema({ type: 'integer', format: 'bigint', maximum: 100, exclusiveMaximum: true }),
      ).toBe('z.bigint().lt(BigInt(100))')
    })
    // bigint max 0
    it.concurrent('maximum: 0, exclusiveMaximum: true → z.bigint().max(BigInt(0))', () => {
      expect(propertySchema({ type: 'integer', format: 'bigint', maximum: 0 })).toBe(
        'z.bigint().max(BigInt(0))',
      )
    })
    // bigint multipleOf
    it.concurrent(
      'type: integer, format: bigint, multipleOf: 2 → z.bigint().multipleOf(BigInt(2))',
      () => {
        expect(propertySchema({ type: 'integer', format: 'bigint', multipleOf: 2 })).toBe(
          'z.bigint().multipleOf(BigInt(2))',
        )
      },
    )
    // bigint default
    it.concurrent('default: 100 → z.bigint().default(BigInt(100))', () => {
      expect(propertySchema({ type: 'integer', format: 'bigint', default: 100 })).toBe(
        'z.bigint().default(BigInt(100))',
      )
    })
  })

  // boolean
  describe('boolean', () => {
    it.concurrent('z.boolean()', () => {
      expect(propertySchema({ type: 'boolean' })).toBe('z.boolean()')
    })
    it.concurrent('z.boolean().nullable()', () => {
      expect(propertySchema({ type: 'boolean', nullable: true })).toBe('z.boolean().nullable()')
    })
    it.concurrent('z.boolean().nullable()', () => {
      expect(propertySchema({ type: ['boolean', 'null'] })).toBe('z.boolean().nullable()')
    })
  })

  // array
  describe('array', () => {
    it.concurrent('z.array(z.string()).nullable()', () => {
      expect(propertySchema({ type: 'array', nullable: true, items: { type: 'string' } })).toBe(
        'z.array(z.string()).nullable()',
      )
    })
    it.concurrent('z.array(z.string())', () => {
      expect(propertySchema({ type: 'array', items: { type: 'string' } })).toBe(
        'z.array(z.string())',
      )
    })
    it.concurrent('z.array(z.number())', () => {
      expect(propertySchema({ type: 'array', items: { type: 'number' } })).toBe(
        'z.array(z.number())',
      )
    })
    it.concurrent('z.array(z.boolean())', () => {
      expect(propertySchema({ type: 'array', items: { type: 'boolean' } })).toBe(
        'z.array(z.boolean())',
      )
    })
    it.concurrent('z.array(z.object({}))', () => {
      expect(propertySchema({ type: 'array', items: { type: 'object' } })).toBe(
        'z.array(z.object({}))',
      )
    })
    it.concurrent('z.array(z.array(z.string()))', () => {
      expect(
        propertySchema({
          type: 'array',
          items: {
            type: 'array',
            items: { type: 'string' },
          },
        }),
      ).toBe('z.array(z.array(z.string()))')
    })
    it.concurrent('z.array(z.string()).min(1)', () => {
      expect(propertySchema({ type: 'array', items: { type: 'string' }, minItems: 1 })).toBe(
        'z.array(z.string()).min(1)',
      )
    })
    it.concurrent('z.array(z.string()).max(10)', () => {
      expect(propertySchema({ type: 'array', items: { type: 'string' }, maxItems: 10 })).toBe(
        'z.array(z.string()).max(10)',
      )
    })
    it.concurrent('z.array(z.string()).min(1).max(10)', () => {
      expect(
        propertySchema({ type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 10 }),
      ).toBe('z.array(z.string()).min(1).max(10)')
    })
    it.concurrent('z.array(z.string()).length(5)', () => {
      expect(
        propertySchema({ type: 'array', items: { type: 'string' }, minItems: 5, maxItems: 5 }),
      ).toBe('z.array(z.string()).length(5)')
    })
    it.concurrent('z.array(z.union([z.string(),z.number(),z.boolean()]))', () => {
      expect(
        propertySchema({
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
        }),
      ).toBe('z.array(z.union([z.string(),z.number(),z.boolean()]))')
    })
    it.concurrent(
      'z.array(z.object({id:z.int().min(0).positive(),name:z.string(),active:z.boolean().optional()}))',
      () => {
        expect(
          propertySchema({
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  minimum: 0,
                  exclusiveMinimum: true,
                },
                name: {
                  type: 'string',
                },
                active: {
                  type: 'boolean',
                },
              },
              required: ['id', 'name'],
            },
          }),
        ).toBe(
          'z.array(z.object({id:z.int().positive(),name:z.string(),active:z.boolean().optional()}))',
        )
      },
    )
  })

  // object
  describe('object', () => {
    it.concurrent('z.object({})', () => {
      expect(propertySchema({ type: 'object' })).toBe('z.object({})')
    })
    it.concurrent('z.object({}).nullable()', () => {
      expect(propertySchema({ type: 'object', nullable: true })).toBe('z.object({}).nullable()')
    })
    it.concurrent('z.object({}).nullable() if type: ["object", "null"]', () => {
      expect(propertySchema({ type: ['object', 'null'] })).toBe('z.object({}).nullable()')
    })
    it.concurrent('z.object({type:z.enum(["A","B","C"])})', () => {
      expect(
        propertySchema({
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
        }),
      ).toBe('z.object({type:z.enum(["A","B","C"])})')
    })
    it.concurrent('z.strictObject({test:z.string()})', () => {
      expect(
        propertySchema({
          type: 'object',
          properties: {
            test: {
              type: 'string',
            },
          },
          required: ['test'],
          additionalProperties: false,
        }),
      ).toBe('z.strictObject({test:z.string()})')
    })
    it.concurrent('z.looseObject({test:z.string()})', () => {
      expect(
        propertySchema({
          type: 'object',
          properties: {
            test: {
              type: 'string',
            },
          },
          required: ['test'],
          additionalProperties: true,
        }),
      ).toBe('z.looseObject({test:z.string()})')
    })
  })

  // date
  describe('date', () => {
    it.concurrent('z.date()', () => {
      expect(propertySchema({ type: 'date' })).toBe('z.date()')
    })
    it.concurrent('z.date().nullable()', () => {
      expect(propertySchema({ type: 'date', nullable: true })).toBe('z.date().nullable()')
    })
    it.concurrent('z.date().nullable() if type: ["date", "null"]', () => {
      expect(propertySchema({ type: ['date', 'null'] })).toBe('z.date().nullable()')
    })
  })

  // null
  describe('z.null().nullable()', () => {
    it.concurrent('z.null().nullable()', () => {
      expect(propertySchema({ type: 'null' })).toBe('z.null().nullable()')
    })
  })

  // any
  describe('any', () => {
    it.concurrent('z.any()', () => {
      expect(propertySchema({})).toBe('z.any()')
    })
  })
})
