import { describe, expect, it } from 'vite-plus/test'

import type { Header, Parameter, Schema } from '../openapi/index.js'
import { conformDefault, valueLiteral, wrap } from './wrap.js'

// #369: a default that is not a value of its schema
describe('conformDefault', () => {
  it.concurrent('takes a value the enum lists and refuses one it does not', () => {
    expect(conformDefault({ type: 'string', enum: ['name', 'created_on'] }, 'name')).toStrictEqual({
      ok: true,
      value: 'name',
    })
    expect(conformDefault({ type: 'string', enum: ['name', 'created_on'] }, 'type')).toStrictEqual({
      ok: false,
    })
  })

  it.concurrent('reads a string that spells a boolean or a number as the value', () => {
    expect(conformDefault({ type: 'boolean' }, 'true')).toStrictEqual({ ok: true, value: true })
    expect(conformDefault({ type: 'integer' }, '10')).toStrictEqual({ ok: true, value: 10 })
    expect(conformDefault({ type: 'number' }, '1.5')).toStrictEqual({ ok: true, value: 1.5 })
    expect(conformDefault({ type: 'integer' }, '1.5')).toStrictEqual({ ok: false })
    expect(conformDefault({ type: 'boolean' }, 'yes')).toStrictEqual({ ok: false })
  })

  // #422: a schema with `properties` and no `type` is an object
  it.concurrent('reads a default on properties with no type as an object', () => {
    const schema: Schema = { properties: { value: { type: 'number' } }, required: ['value'] }
    expect(conformDefault(schema, [])).toStrictEqual({ ok: false })
    expect(conformDefault(schema, {})).toStrictEqual({ ok: false })
    expect(conformDefault(schema, { value: '1', other: true })).toStrictEqual({
      ok: true,
      value: { value: 1 },
    })
    // a keyword of another kind beside them: the value may be of any type
    expect(conformDefault({ ...schema, minLength: 1 }, [])).toStrictEqual({ ok: true, value: [] })
  })

  it.concurrent('writes a number or a boolean for a string as text', () => {
    expect(conformDefault({ type: 'string' }, 1)).toStrictEqual({ ok: true, value: '1' })
    expect(conformDefault({ type: 'string' }, false)).toStrictEqual({ ok: true, value: 'false' })
  })

  it.concurrent('reads every item of an array, and refuses one item that cannot be read', () => {
    expect(
      conformDefault({ type: 'array', items: { type: 'boolean' } }, ['true', 'false']),
    ).toStrictEqual({ ok: true, value: [true, false] })
    expect(conformDefault({ type: 'array', items: { type: 'boolean' } }, ['maybe'])).toStrictEqual({
      ok: false,
    })
    expect(conformDefault({ type: 'array', items: { type: 'string' } }, 'a')).toStrictEqual({
      ok: false,
    })
  })

  it.concurrent('keeps the type the value already is among several', () => {
    expect(conformDefault({ type: ['string', 'boolean'] }, 'true')).toStrictEqual({
      ok: true,
      value: 'true',
    })
    expect(conformDefault({ type: ['integer', 'string'] }, '10')).toStrictEqual({
      ok: true,
      value: '10',
    })
  })

  // #387: an object default keeps the keys its schema declares, each as a value of its property
  it.concurrent('keeps the declared keys of an object, and needs the required ones', () => {
    const schema: Schema = {
      type: 'object',
      properties: { active: { type: 'boolean' }, secrets: { type: 'boolean' } },
    }
    expect(conformDefault(schema, { other: false, secrets: 'false' })).toStrictEqual({
      ok: true,
      value: { secrets: false },
    })
    expect(conformDefault(schema, { secrets: 'maybe' })).toStrictEqual({ ok: false })
    expect(conformDefault({ ...schema, required: ['active'] }, { secrets: true })).toStrictEqual({
      ok: false,
    })
    expect(conformDefault(schema, 'x')).toStrictEqual({ ok: false })
    // a loose object, a record and an object with no properties take any key
    expect(conformDefault({ ...schema, additionalProperties: true }, { other: 1 })).toStrictEqual({
      ok: true,
      value: { other: 1 },
    })
    expect(
      conformDefault({ type: 'object', additionalProperties: { type: 'string' } }, { other: 'a' }),
    ).toStrictEqual({ ok: true, value: { other: 'a' } })
    expect(conformDefault({ type: 'object' }, { other: 1 })).toStrictEqual({
      ok: true,
      value: { other: 1 },
    })
  })

  it.concurrent('reads a default on a reference against the component it names', () => {
    const schemas = {
      Filters: { type: 'object', properties: { secrets: { type: 'boolean' } } },
      Node: {
        type: 'object',
        properties: { next: { $ref: '#/components/schemas/Node' } },
      },
    } as const
    expect(
      conformDefault({ $ref: '#/components/schemas/Filters' }, { secrets: 'true', x: 1 }, schemas),
    ).toStrictEqual({ ok: true, value: { secrets: true } })
    // a component that is not among the schemas is not checked
    expect(
      conformDefault({ $ref: '#/components/schemas/Missing' }, { x: 1 }, schemas),
    ).toStrictEqual({ ok: true, value: { x: 1 } })
    // a cycle through the component ends at the reference, as written
    expect(
      conformDefault(
        { $ref: '#/components/schemas/Node' },
        { next: { next: { x: 1 } }, y: 2 },
        schemas,
      ),
    ).toStrictEqual({ ok: true, value: { next: { next: { x: 1 } } } })
  })

  // #412: a `type: number` with `format: int64` is `z.number()`, and its default a number
  it.concurrent('writes the default of a number with format int64 as a number', () => {
    expect(wrap('z.number()', { type: 'number', format: 'int64', default: 0 })).toBe(
      'z.number().default(0)',
    )
    expect(
      wrap('z.int64()', { type: 'integer', format: 'int64', default: 0 }, undefined, {
        isOptional: true,
      }),
    ).toBe(
      'z.int64().default(0n).exactOptional().openapi({type:"integer",format:"int64",default:0})',
    )
  })

  // #403: an int64 whose default is not a value of it states the default once
  it.concurrent('states a dropped default of an int64 once in the metadata', () => {
    expect(
      wrap('z.int64().min(0n)', {
        type: 'integer',
        format: 'int64',
        nullable: true,
        minimum: 0,
        default: 'null',
      }),
    ).toBe(
      'z.int64().min(0n).nullable().openapi({type:["integer","null"],format:"int64",minimum:0,default:"null"})',
    )
  })

  // #413: `z.file()` hands out a File, which no text is
  it.concurrent('leaves a string default and a pattern of a binary string to the document', () => {
    expect(
      wrap('z.file()', { type: 'string', format: 'binary', default: '', pattern: '^.+' }),
    ).toBe('z.file().openapi({type:"string",format:"binary","default":"","pattern":"^.+"})')
    expect(conformDefault({ type: 'string', format: 'binary' }, 'x')).toStrictEqual({ ok: false })
    // an encoded string is text, and takes one
    expect(
      conformDefault({ type: 'string', format: 'binary', contentEncoding: 'base64' }, 'eA=='),
    ).toStrictEqual({ ok: true, value: 'eA==' })
  })

  // #394: a default beside `allOf: [{ $ref }]` is read against the component
  it.concurrent('reads a default beside an allOf against its members', () => {
    const schemas = {
      Precision: { type: 'number' },
      Mode: { type: 'string', enum: ['coerce', 'strict'] },
    } as const
    expect(
      conformDefault({ allOf: [{ $ref: '#/components/schemas/Precision' }] }, '7', schemas),
    ).toStrictEqual({ ok: true, value: 7 })
    expect(
      conformDefault({ allOf: [{ $ref: '#/components/schemas/Mode' }] }, "'strict'", schemas),
    ).toStrictEqual({ ok: false })
    expect(
      conformDefault({ allOf: [{ $ref: '#/components/schemas/Mode' }] }, 'strict', schemas),
    ).toStrictEqual({ ok: true, value: 'strict' })
    // every member reads it, and what is written beside them too
    expect(
      conformDefault({ allOf: [{ type: 'integer' }, { minimum: 0 }], enum: [1, 2] }, '3'),
    ).toStrictEqual({ ok: false })
    expect(
      conformDefault({ allOf: [{ type: 'integer' }, { minimum: 0 }], enum: [1, 2] }, '2'),
    ).toStrictEqual({ ok: true, value: 2 })
  })

  // #396: a value one branch takes is a value of the union, whatever stands beside it
  it.concurrent('keeps a default one branch of a oneOf takes as it is', () => {
    const union = {
      type: 'string',
      oneOf: [{ type: 'string', enum: ['cover'] }, { type: 'boolean' }],
    } as const
    expect(conformDefault(union, false)).toStrictEqual({ ok: true, value: false })
    expect(conformDefault(union, 'cover')).toStrictEqual({ ok: true, value: 'cover' })
    // no branch takes it: what is written beside the branches reads it
    expect(conformDefault(union, 7)).toStrictEqual({ ok: true, value: '7' })
    expect(
      conformDefault({ anyOf: [{ type: 'integer' }, { type: 'boolean' }] }, '1'),
    ).toStrictEqual({ ok: true, value: 1 })
    // no branch takes it, and nothing beside them says what it is: not a value of the union
    expect(
      conformDefault({ anyOf: [{ type: 'integer' }, { type: 'boolean' }] }, 'x'),
    ).toStrictEqual({ ok: false })
    expect(
      conformDefault(
        {
          oneOf: [
            { type: 'string', enum: ['id', 'state'] },
            { type: 'array', items: { type: 'string', enum: ['id', 'state'] } },
          ],
        },
        'id,state',
      ),
    ).toStrictEqual({ ok: false })
  })

  it.concurrent('does not check a schema with no type of its own, and takes null', () => {
    expect(conformDefault({ $ref: '#/components/schemas/A' }, { any: 1 })).toStrictEqual({
      ok: true,
      value: { any: 1 },
    })
    expect(conformDefault({ type: 'string' }, null)).toStrictEqual({ ok: true, value: null })
    expect(conformDefault({ type: 'string', const: 'a' }, 'b')).toStrictEqual({ ok: false })
  })
})

describe('wrap', () => {
  // #371: a Parameter Object has no `enum`; a Swagger 2.0 leftover beside `schema` is not written
  describe('param keys outside the Parameter Object', () => {
    it.concurrent('writes only the keys of a Parameter Object and x- extensions', () => {
      const parameters = {
        name: 'dispute_state',
        in: 'query',
        description: 'Filters the disputes in the response by a state.',
        'x-enumDescriptions': [{ value: 'RESOLVED', description: 'Resolved disputes.' }],
        schema: { type: 'string' },
        enum: ['REQUIRED_ACTION', 'RESOLVED'],
        type: 'string',
        required: false,
      } as unknown as Parameter
      expect(wrap('z.string()', { type: 'string' }, { parameters })).toBe(
        'z.string().exactOptional().openapi({param:{"name":"dispute_state","in":"query","description":"Filters the disputes in the response by a state.","x-enumDescriptions":[{"value":"RESOLVED","description":"Resolved disputes."}],"schema":{"type":"string"},"required":false}})',
      )
    })
  })

  // #370: a pattern no JavaScript literal can stand for stays in the document
  describe('pattern that is not a JavaScript regex', () => {
    it.concurrent('keeps the pattern in .openapi() when .regex() cannot take it', () => {
      expect(wrap('z.string()', { type: 'string', pattern: 'a++' })).toBe(
        'z.string().openapi({"pattern":"a++"})',
      )
      expect(wrap('z.string().regex(/^a$/i)', { type: 'string', pattern: '(?i)^a$' })).toBe(
        'z.string().regex(/^a$/i)',
      )
    })
  })

  // #369
  describe('default that is not a value of the schema', () => {
    // #422
    it.concurrent('leaves an array default on properties with no type to the document', () => {
      expect(
        wrap('z.object({value:z.number()})', {
          properties: { value: { type: 'number' } },
          required: ['value'],
          default: [],
        }),
      ).toBe('z.object({value:z.number()}).openapi({"required":["value"],"default":[]})')
    })

    it.concurrent('leaves an enum default the enum does not list to the document', () => {
      expect(
        wrap("z.enum(['name','created_on'])", {
          type: 'string',
          enum: ['name', 'created_on'],
          default: 'type',
        }),
      ).toBe(`z.enum(['name','created_on']).openapi({"default":"type"})`)
    })

    it.concurrent('reads strings that spell booleans for an array of booleans', () => {
      expect(
        wrap('z.array(z.boolean())', {
          type: 'array',
          items: { type: 'boolean' },
          default: ['true', 'false'],
        }),
      ).toBe('z.array(z.boolean()).default([true,false])')
    })

    it.concurrent('reads a numeric string for an integer, and writes a number as text for a string', () => {
      expect(wrap('z.int()', { type: 'integer', default: '10' })).toBe('z.int().default(10)')
      expect(wrap('z.string()', { type: 'string', default: 1 })).toBe('z.string().default("1")')
    })

    // #443: the enum is emitted as the string literals it lists, so a default that
    // names one of them has to stay a string — coercing it to a boolean would not
    // type-check against the union (TS2769)
    it.concurrent('keeps a string default that names a string member of a boolean enum', () => {
      expect(
        wrap("z.union([z.literal('false'),z.literal('true')])", {
          type: 'boolean',
          enum: ['false', 'true'],
          default: 'false',
        }),
      ).toBe(`z.union([z.literal('false'),z.literal('true')]).default("false")`)
      expect(
        wrap("z.literal('false')", { type: 'boolean', enum: ['false'], default: 'false' }),
      ).toBe(`z.literal('false').default("false")`)
      // a mixed enum keeps the string member a string, the boolean member a boolean
      expect(
        wrap("z.union([z.literal('false'),z.literal(true)])", {
          type: 'boolean',
          enum: ['false', true],
          default: 'false',
        }),
      ).toBe(`z.union([z.literal('false'),z.literal(true)]).default("false")`)
    })

    // #443, same class: a string `const` is emitted as a string literal too
    it.concurrent('keeps a string default that names a string const of a boolean schema', () => {
      expect(
        wrap("z.literal('false')", { type: 'boolean', const: 'false', default: 'false' }),
      ).toBe(`z.literal('false').default("false")`)
    })

    it.concurrent('still coerces a string default to a boolean with no enum or const', () => {
      expect(wrap('z.boolean()', { type: 'boolean', default: 'true' })).toBe(
        'z.boolean().default(true)',
      )
    })

    it.concurrent('leaves a string default a boolean enum does not list to the document', () => {
      expect(
        wrap('z.union([z.literal(true),z.literal(false)])', {
          type: 'boolean',
          enum: [true, false],
          default: 'false',
        }),
      ).toBe(`z.union([z.literal(true),z.literal(false)]).openapi({"default":"false"})`)
    })
  })

  // #357: `default: null` on a schema that does not declare `null` otherwise
  describe('default null', () => {
    it.concurrent('makes a oneOf nullable before .default(null)', () => {
      expect(
        wrap('z.xor([z.string(),RefSchema])', {
          default: null,
          oneOf: [{ type: 'string' }, { $ref: '#/components/schemas/Ref' }],
        }),
      ).toBe('z.xor([z.string(),RefSchema]).nullable().default(null)')
    })

    it.concurrent('makes a reference nullable before .default(null)', () => {
      expect(wrap('RefSchema', { $ref: '#/components/schemas/Ref', default: null })).toBe(
        'RefSchema.nullable().default(null)',
      )
    })

    it.concurrent('makes a string nullable before .default(null)', () => {
      expect(wrap('z.string()', { type: 'string', default: null })).toBe(
        'z.string().nullable().default(null)',
      )
    })

    it.concurrent('adds .nullable() once when the schema is nullable already', () => {
      expect(wrap('z.string()', { type: ['string', 'null'], default: null })).toBe(
        'z.string().nullable().default(null)',
      )
    })

    it.concurrent('leaves a default that is not null alone', () => {
      expect(wrap('z.string()', { type: 'string', default: 'a' })).toBe('z.string().default("a")')
    })
  })

  describe('string', () => {
    it.concurrent('adds .default and .nullable for z.string() when default and nullable=true', () => {
      expect(
        wrap('z.string()', {
          type: 'string',
          default: 'test',
          nullable: true,
        }),
      ).toBe('z.string().nullable().default("test")')
    })

    it.concurrent('marks schema as nullable and adds default when type includes null', () => {
      expect(
        wrap('z.string()', {
          type: ['string', 'null'],
          default: 'test',
        }),
      ).toBe('z.string().nullable().default("test")')
    })
  })

  describe('file', () => {
    // `contentMediaType` and `contentEncoding` are keys of the 3.1 Schema Object alone, which
    // the argument of `.openapi()` has not: the MIME types are an `anyOf` of them.
    it.concurrent('states the size and the MIME types of a file', () => {
      expect(
        wrap('z.file().min(1).max(2).mime("image/png")', {
          type: 'string',
          format: 'binary',
          contentEncoding: 'binary',
          minLength: 1,
          maxLength: 2,
          contentMediaType: 'image/png',
        }),
      ).toBe(
        'z.file().min(1).max(2).mime("image/png").openapi({type:"string",format:"binary",minLength:1,maxLength:2,anyOf:[{"contentMediaType":"image/png"}]})',
      )
      expect(
        wrap('z.file().mime(["a/b","c/d"])', {
          type: 'string',
          format: 'binary',
          anyOf: [{ contentMediaType: 'a/b' }, { contentMediaType: 'c/d' }],
        }),
      ).toBe(
        'z.file().mime(["a/b","c/d"]).openapi({type:"string",format:"binary",anyOf:[{"contentMediaType":"a/b"},{"contentMediaType":"c/d"}]})',
      )
    })

    it.concurrent('re-surfaces type/format so z.file() survives getOpenAPIDocument()', () => {
      expect(wrap('z.file()', { type: 'string', format: 'binary' })).toBe(
        'z.file().openapi({type:"string",format:"binary"})',
      )
    })

    it.concurrent('merges type/format ahead of other openapi metadata (description)', () => {
      expect(
        wrap('z.file()', { type: 'string', format: 'binary', description: 'cover image' }),
      ).toBe('z.file().openapi({type:"string",format:"binary","description":"cover image"})')
    })

    it.concurrent('emits nullable union type for a nullable binary file', () => {
      expect(wrap('z.file()', { type: ['string', 'null'], format: 'binary' })).toBe(
        'z.file().nullable().openapi({type:["string","null"],format:"binary"})',
      )
    })

    it.concurrent('does not inject type/format when contentEncoding makes it a non-file string', () => {
      expect(
        wrap('z.base64()', { type: 'string', format: 'binary', contentEncoding: 'base64' }),
      ).toBe('z.base64()')
    })
  })

  describe('number', () => {
    it.concurrent('adds .default and .nullable for z.number() when default and nullable=true', () => {
      expect(
        wrap('z.number()', {
          type: 'number',
          default: 0,
          nullable: true,
        }),
      ).toBe('z.number().nullable().default(0)')
    })

    it.concurrent('marks schema as nullable and adds default when type includes null', () => {
      expect(
        wrap('z.number()', {
          type: ['number', 'null'],
          default: 0,
        }),
      ).toBe('z.number().nullable().default(0)')
    })
  })

  describe('int32', () => {
    it.concurrent('adds .default and .nullable for z.int32() with format int32 when default and nullable=true', () => {
      expect(
        wrap('z.int32()', {
          type: 'integer',
          format: 'int32',
          default: 0,
          nullable: true,
        }),
      ).toBe('z.int32().nullable().default(0)')
    })

    it.concurrent('marks schema as nullable and adds default for z.int32() when type includes null', () => {
      expect(
        wrap('z.int32()', {
          type: ['integer', 'null'],
          format: 'int32',
          default: 0,
        }),
      ).toBe('z.int32().nullable().default(0)')
    })
  })

  describe('int64', () => {
    it.concurrent('converts default number to BigInt and adds .nullable for z.int64()', () => {
      expect(
        wrap('z.int64()', {
          type: 'integer',
          format: 'int64',
          default: 0,
          nullable: true,
        }),
      ).toBe(
        'z.int64().nullable().default(0n).openapi({type:["integer","null"],format:"int64",default:0})',
      )
    })

    it.concurrent('handles default number and marks schema nullable when type includes null', () => {
      expect(
        wrap('z.int64()', {
          type: ['integer', 'null'],
          format: 'int64',
          default: 0,
        }),
      ).toBe(
        'z.int64().nullable().default(0n).openapi({type:["integer","null"],format:"int64",default:0})',
      )
    })
  })

  describe('bigint', () => {
    it.concurrent('adds .default with BigInt and .nullable for z.bigint()', () => {
      expect(
        wrap('z.bigint()', {
          type: 'integer',
          format: 'bigint',
          default: 0,
          nullable: true,
        }),
      ).toBe(
        'z.bigint().nullable().default(BigInt(0)).openapi({type:["integer","null"],format:"bigint",default:0})',
      )
    })

    it.concurrent('handles BigInt default and marks schema nullable when type includes null', () => {
      expect(
        wrap('z.bigint()', {
          type: ['integer', 'null'],
          format: 'bigint',
          default: 0,
        }),
      ).toBe(
        'z.bigint().nullable().default(BigInt(0)).openapi({type:["integer","null"],format:"bigint",default:0})',
      )
    })
  })

  describe('boolean', () => {
    it.concurrent('adds .default and .nullable for z.boolean() when default and nullable=true', () => {
      expect(
        wrap('z.boolean()', {
          type: 'boolean',
          default: true,
          nullable: true,
        }),
      ).toBe('z.boolean().nullable().default(true)')
    })

    it.concurrent('marks schema as nullable and adds default when type includes null', () => {
      expect(
        wrap('z.boolean()', {
          type: ['boolean', 'null'],
          default: true,
        }),
      ).toBe('z.boolean().nullable().default(true)')
    })
  })

  it('zodToOpenAPI not exists openapi()', () => {
    const result = wrap('z.string()', { type: 'string' })
    const expected = 'z.string()'
    expect(result).toBe(expected)
  })

  it('should include only example and description in order', () => {
    const result = wrap('z.string()', {
      type: 'string',
      example: 'hello',
      description: 'Example string',
    })
    const expected = 'z.string().openapi({"example":"hello","description":"Example string"})'
    expect(result).toBe(expected)
  })

  it('should insert param first when param info is provided', () => {
    const result = wrap(
      'z.string()',
      {
        type: 'string',
        example: 'uuid-example',
        description: 'UUID parameter',
      },
      {
        parameters: {
          name: 'id',
          in: 'path',
        } as any,
      },
    )
    const expected =
      'z.string().exactOptional().openapi({param:{"name":"id","in":"path"},"example":"uuid-example","description":"UUID parameter"})'
    expect(result).toBe(expected)
  })

  it('should handle non-required query param correctly', () => {
    const result = wrap(
      'z.string()',
      {
        type: 'string',
        example: 'query-value',
        description: 'Optional query parameter',
      },
      {
        parameters: {
          name: 'q',
          in: 'query',
        } as any,
      },
    )
    const expected =
      'z.string().exactOptional().openapi({param:{"name":"q","in":"query","required":false},"example":"query-value","description":"Optional query parameter"})'
    expect(result).toBe(expected)
  })

  it('should handle non-required query param correctly when required is true', () => {
    const result = wrap(
      'z.string()',
      {
        type: 'string',
        example: 'query-value',
        description: 'Optional query parameter',
      },
      {
        parameters: {
          name: 'q',
          in: 'query',
          required: true,
        } as any,
      },
    )
    const expected =
      'z.string().openapi({param:{"name":"q","in":"query","required":true},"example":"query-value","description":"Optional query parameter"})'
    expect(result).toBe(expected)
  })

  it('should insert only param if no example or description is given', () => {
    const result = wrap(
      'z.string()',
      { type: 'string' },
      { parameters: { name: 'x', in: 'header' } as any },
    )
    const expected =
      'z.string().exactOptional().openapi({param:{"name":"x","in":"header","required":false}})'
    expect(result).toBe(expected)
  })

  it('should return examples', () => {
    const result = wrap('z.string()', {
      type: 'string',
      examples: ['example1', 'example2'],
    } as any)
    const expected = 'z.string().openapi({"examples":["example1","example2"]})'
    expect(result).toBe(expected)
  })

  it('should resolve $ref in parameter examples', () => {
    const testParameter: Parameter = {
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'string' },
      examples: {
        laptop: { $ref: '#/components/examples/LaptopId' },
        tshirt: { value: 'tshirt-123' },
      },
    }
    const result = wrap('z.string()', { type: 'string' }, { parameters: testParameter })
    const expected =
      'z.string().openapi({param:{"name":"id","in":"path","required":true,"schema":{"type":"string"},"examples":{"laptop":LaptopIdExample,"tshirt":{value:"tshirt-123"}}}})'
    expect(result).toBe(expected)
  })

  it('omits parameter keys whose value is undefined', () => {
    // A hand-built document can carry a key whose value is `undefined`, which the
    // `Parameter` type itself does not allow.
    const testParameter = {
      name: 'number',
      in: 'query',
      required: true,
      description: undefined,
      schema: { type: 'string' },
    } as unknown as Parameter
    const result = wrap('z.string()', { type: 'string' }, { parameters: testParameter })
    expect(result).toBe(
      'z.string().openapi({param:{"name":"number","in":"query","required":true,"schema":{"type":"string"}}})',
    )
  })

  it('omits media-type keys whose value is undefined', () => {
    const testParameter: Parameter = {
      name: 'filter',
      in: 'query',
      content: {
        'application/json': { schema: { type: 'string' }, example: undefined },
      },
    }
    const result = wrap('z.string()', { type: 'string' }, { parameters: testParameter })
    expect(result).toBe(
      'z.string().exactOptional().openapi({param:{"name":"filter","in":"query","content":{"application/json":{"schema":{"type":"string"}}},"required":false}})',
    )
  })

  it('should handle Unicode characters in parameter examples', () => {
    const testParameter: Parameter = {
      name: 'filter',
      in: 'query',
      required: false,
      schema: { type: 'string' },
      examples: {
        japanese: { value: '日本語テスト' },
        emoji: { value: '🔥炎のテスト🔥' },
      },
    }
    const result = wrap('z.string()', { type: 'string' }, { parameters: testParameter })
    const expected =
      'z.string().exactOptional().openapi({param:{"name":"filter","in":"query","required":false,"schema":{"type":"string"},"examples":{"japanese":{value:"日本語テスト"},"emoji":{value:"🔥炎のテスト🔥"}}}})'
    expect(result).toBe(expected)
  })

  it('should handle content with examples containing Unicode', () => {
    const testParameter: Parameter = {
      name: 'filter',
      in: 'query',
      required: false,
      schema: { type: 'object' },
      content: {
        'application/json': {
          schema: { type: 'object' },
          examples: {
            japanese: { value: { name: '田中太郎', description: '参照地獄テスト' } },
          },
        },
      },
    }
    const result = wrap('z.looseObject({})', { type: 'object' }, { parameters: testParameter })
    const expected =
      'z.looseObject({}).exactOptional().openapi({param:{"name":"filter","in":"query","required":false,"schema":{"type":"object"},"content":{"application/json":{"schema":{"type":"object"},"examples":{"japanese":{value:{"name":"田中太郎","description":"参照地獄テスト"}}}}}}})'
    expect(result).toBe(expected)
  })

  describe('headers with required', () => {
    it.concurrent('should not add .exactOptional() when header required is true', () => {
      const testHeader: Header = {
        description: 'Authorization header',
        required: true,
      }
      const result = wrap('z.string()', { type: 'string' }, { headers: testHeader })
      expect(result).toBe('z.string().openapi({description:"Authorization header"})')
    })

    it.concurrent('should add .exactOptional() when header required is false', () => {
      const testHeader: Header = {
        description: 'Optional header',
        required: false,
      }
      const result = wrap('z.string()', { type: 'string' }, { headers: testHeader })
      expect(result).toBe(
        'z.string().exactOptional().openapi({description:"Optional header",param:{required:false}})',
      )
    })

    it.concurrent('should add .exactOptional() when header required is undefined', () => {
      const testHeader: Header = {
        description: 'Header without required',
      }
      const result = wrap('z.string()', { type: 'string' }, { headers: testHeader })
      expect(result).toBe(
        'z.string().exactOptional().openapi({description:"Header without required",param:{required:false}})',
      )
    })

    it.concurrent('should handle header with deprecated', () => {
      const testHeader: Header = {
        description: 'Deprecated header',
        required: true,
        deprecated: true,
      }
      const result = wrap('z.string()', { type: 'string' }, { headers: testHeader })
      expect(result).toBe('z.string().openapi({description:"Deprecated header",deprecated:true})')
    })

    it.concurrent('should handle header with example', () => {
      const testHeader: Header = {
        description: 'Header with example',
        required: false,
        example: 'Bearer token123',
      }
      const result = wrap('z.string()', { type: 'string' }, { headers: testHeader })
      expect(result).toBe(
        'z.string().exactOptional().openapi({description:"Header with example",example:"Bearer token123",param:{required:false}})',
      )
    })

    it.concurrent.each([
      [0, 'example:0'],
      [false, 'example:false'],
      ['', 'example:""'],
    ])('keeps a header example of %j: it is an example, not an absence', (example, expected) => {
      const testHeader: Header = { required: true, example }
      const result = wrap('z.number()', { type: 'number' }, { headers: testHeader })
      expect(result).toBe(`z.number().openapi({${expected}})`)
    })

    it.concurrent('should handle header with no openapi props when required is true', () => {
      const testHeader: Header = {
        required: true,
      }
      const result = wrap('z.string()', { type: 'string' }, { headers: testHeader })
      expect(result).toBe('z.string()')
    })

    it.concurrent('should state required:false for a header that is not required', () => {
      const testHeader: Header = {
        required: false,
      }
      const result = wrap('z.string()', { type: 'string' }, { headers: testHeader })
      expect(result).toBe('z.string().exactOptional().openapi({param:{required:false}})')
    })
  })

  describe('isOptional', () => {
    it.concurrent('should add .exactOptional() when isOptional is true', () => {
      const result = wrap('z.string()', { type: 'string' }, undefined, { isOptional: true })
      expect(result).toBe('z.string().exactOptional()')
    })

    it.concurrent('should add .exactOptional() with openapi props when isOptional is true', () => {
      const result = wrap(
        'z.string()',
        { type: 'string', description: 'Optional field' },
        undefined,
        { isOptional: true },
      )
      expect(result).toBe('z.string().exactOptional().openapi({"description":"Optional field"})')
    })

    it.concurrent('should not add .exactOptional() when isOptional is false', () => {
      const result = wrap('z.string()', { type: 'string' }, undefined, { isOptional: false })
      expect(result).toBe('z.string()')
    })

    it.concurrent('should not add .exactOptional() when isOptional is undefined', () => {
      const result = wrap('z.string()', { type: 'string' }, undefined, {})
      expect(result).toBe('z.string()')
    })

    it.concurrent('should handle isOptional with default value', () => {
      const result = wrap('z.string()', { type: 'string', default: 'default-value' }, undefined, {
        isOptional: true,
      })
      expect(result).toBe('z.string().default("default-value").exactOptional()')
    })

    it.concurrent('should handle isOptional with nullable', () => {
      const result = wrap('z.string()', { type: 'string', nullable: true }, undefined, {
        isOptional: true,
      })
      expect(result).toBe('z.string().nullable().exactOptional()')
    })
  })

  describe('schema.required array', () => {
    it.concurrent('should pass through required array of strings', () => {
      const schema: Schema = {
        type: 'object',
        required: ['name', 'email'],
        description: 'User object',
      }
      const result = wrap('z.looseObject({})', schema)
      expect(result).toBe(
        'z.looseObject({}).openapi({"required":["name","email"],"description":"User object"})',
      )
    })

    it.concurrent('should convert non-string values in required array to strings', () => {
      const schema = {
        type: 'object',
        // YAML may parse `null`, `true`, `false` as literal values in required array
        required: ['name', null, true, false, 'email'],
        description: 'Schema with mixed required values',
      } as unknown as Schema
      const result = wrap('z.looseObject({})', schema)
      expect(result).toBe(
        'z.looseObject({}).openapi({"required":["name","null","true","false","email"],"description":"Schema with mixed required values"})',
      )
    })

    it.concurrent('should handle empty required array', () => {
      const schema: Schema = {
        type: 'object',
        required: [],
        description: 'Object with empty required',
      }
      const result = wrap('z.looseObject({})', schema)
      expect(result).toBe(
        'z.looseObject({}).openapi({"required":[],"description":"Object with empty required"})',
      )
    })

    it.concurrent('should exclude boolean required from baseArgs', () => {
      const schema = {
        type: 'string',
        required: true,
        description: 'Field with boolean required',
      } as unknown as Schema
      const result = wrap('z.string()', schema)
      // Boolean required should be filtered out, only description remains
      expect(result).toBe('z.string().openapi({"description":"Field with boolean required"})')
    })
  })

  describe('x-* vendor extensions excluded from .openapi()', () => {
    it.concurrent('should not include x-error-message in openapi()', () => {
      const result = wrap('z.email({error:"メール不正"})', {
        type: 'string',
        format: 'email',
        'x-error-message': 'メール不正',
        description: 'Email field',
      })
      expect(result).toBe('z.email({error:"メール不正"}).openapi({"description":"Email field"})')
    })

    it.concurrent('should not include x-length-message in openapi()', () => {
      const result = wrap('z.string().length(5,{error:"5文字"})', {
        type: 'string',
        minLength: 5,
        maxLength: 5,
        'x-length-message': '5文字',
      })
      expect(result).toBe('z.string().length(5,{error:"5文字"})')
    })

    it.concurrent('should not include x-pattern-message in openapi()', () => {
      const result = wrap('z.string().regex(/^[a-z]+$/,{error:"小文字のみ"})', {
        type: 'string',
        pattern: '^[a-z]+$',
        'x-pattern-message': '小文字のみ',
      })
      expect(result).toBe('z.string().regex(/^[a-z]+$/,{error:"小文字のみ"})')
    })

    it.concurrent('should not include x-minimum-message in openapi()', () => {
      const result = wrap('z.number().min(0,{error:"0以上"})', {
        type: 'number',
        minimum: 0,
        'x-minimum-message': '0以上',
      })
      expect(result).toBe('z.number().min(0,{error:"0以上"})')
    })

    it.concurrent('should not include x-maximum-message in openapi()', () => {
      const result = wrap('z.number().max(100,{error:"100以下"})', {
        type: 'number',
        maximum: 100,
        'x-maximum-message': '100以下',
      })
      expect(result).toBe('z.number().max(100,{error:"100以下"})')
    })

    it.concurrent('should not include x-allOf-message in openapi()', () => {
      const result = wrap('z.intersection(z.string(),z.string())', {
        type: 'string',
        allOf: [{ type: 'string' }, { type: 'string' }],
        'x-allOf-message': 'allOf失敗',
      })
      expect(result).toBe('z.intersection(z.string(),z.string())')
    })

    it.concurrent('should not include x-uppercase / x-lowercase in openapi()', () => {
      const result = wrap('z.string().uppercase()', {
        type: 'string',
        'x-uppercase': true,
        description: 'Uppercase only',
      })
      expect(result).toBe('z.string().uppercase().openapi({"description":"Uppercase only"})')
      const result2 = wrap('z.string().lowercase()', {
        type: 'string',
        'x-lowercase': true,
      })
      expect(result2).toBe('z.string().lowercase()')
    })

    it.concurrent('should not include x-properties-message in openapi()', () => {
      const result = wrap('z.object({name:z.string()})', {
        type: 'object',
        properties: { name: { type: 'string' } },
        'x-properties-message': 'プロパティ検証失敗',
      })
      expect(result).toBe('z.object({name:z.string()})')
    })

    it.concurrent('should not include x-prefixItems-message in openapi()', () => {
      const result = wrap('z.tuple([z.string(),z.number()])', {
        type: 'array',
        prefixItems: [{ type: 'string' }, { type: 'number' }],
        'x-prefixItems-message': 'タプル位置違反',
      })
      expect(result).toBe('z.tuple([z.string(),z.number()])')
    })

    it.concurrent('should not include x-items-message in openapi()', () => {
      const result = wrap('z.array(z.string())', {
        type: 'array',
        items: { type: 'string' },
        'x-items-message': '配列要素違反',
      })
      expect(result).toBe('z.array(z.string())')
    })

    it.concurrent('should not include x-unevaluatedProperties-message in openapi()', () => {
      const result = wrap('z.object({name:z.string()}).strict()', {
        type: 'object',
        properties: { name: { type: 'string' } },
        unevaluatedProperties: false,
        'x-unevaluatedProperties-message': '未評価プロパティ違反',
      })
      expect(result).toBe('z.object({name:z.string()}).strict()')
    })

    it.concurrent('should not include x-unevaluatedItems-message in openapi()', () => {
      const result = wrap('z.array(z.string())', {
        type: 'array',
        items: { type: 'string' },
        unevaluatedItems: false,
        'x-unevaluatedItems-message': '未評価要素違反',
      })
      expect(result).toBe('z.array(z.string())')
    })

    /* eslint-disable unicorn/no-thenable -- testing JSON Schema then keyword */
    // biome-ignore lint/suspicious/noThenProperty: testing JSON Schema if-then-else
    it.concurrent('should not include x-if-message in openapi()', () => {
      const result = wrap('z.object({a:z.string()})', {
        type: 'object',
        properties: { a: { type: 'string' } },
        if: { properties: { a: { const: 'x' } } },
        then: { required: ['a'] },
        'x-if-message': 'if分岐失敗',
      })
      expect(result).toBe('z.object({a:z.string()})')
    })

    // biome-ignore lint/suspicious/noThenProperty: testing JSON Schema if-then-else
    it.concurrent('should not include x-then-message in openapi()', () => {
      const result = wrap('z.object({a:z.string()})', {
        type: 'object',
        properties: { a: { type: 'string' } },
        if: { properties: { a: { const: 'x' } } },
        then: { required: ['a'] },
        'x-then-message': 'then分岐失敗',
      })
      expect(result).toBe('z.object({a:z.string()})')
    })

    it.concurrent('should not include x-else-message in openapi()', () => {
      const result = wrap('z.object({a:z.string()})', {
        type: 'object',
        properties: { a: { type: 'string' } },
        if: { properties: { a: { const: 'x' } } },
        else: { required: ['a'] },
        'x-else-message': 'else分岐失敗',
      })
      expect(result).toBe('z.object({a:z.string()})')
    })
    /* eslint-enable unicorn/no-thenable */

    it.concurrent('should not include any x-* messages in openapi() with description', () => {
      const result = wrap('z.number().min(0,{error:"0以上"}).max(100,{error:"100以下"})', {
        type: 'number',
        minimum: 0,
        maximum: 100,
        'x-minimum-message': '0以上',
        'x-maximum-message': '100以下',
        description: 'A number field',
      })
      expect(result).toBe(
        'z.number().min(0,{error:"0以上"}).max(100,{error:"100以下"}).openapi({"description":"A number field"})',
      )
    })
  })

  describe('unsupported properties filtering', () => {
    it.concurrent('should filter out contains property', () => {
      const schema = {
        type: 'array',
        items: { type: 'string' },
        contains: { type: 'number' },
        description: 'arr',
      } as unknown as Schema
      const result = wrap('z.array(z.string())', schema)
      expect(result).toBe('z.array(z.string()).openapi({"description":"arr"})')
    })

    // #393: `$schema` is no Schema Object key, so `.openapi()` cannot take it
    it.concurrent('leaves $schema out of the metadata', () => {
      const schema = {
        type: 'string',
        $schema: 'http://json-schema.org/draft-07/schema#',
        description: 'test',
      } as unknown as Schema
      const result = wrap('z.string()', schema)
      expect(result).toBe('z.string().openapi({"description":"test"})')
    })

    it.concurrent('should filter out contentEncoding property', () => {
      const schema = {
        type: 'string',
        contentEncoding: 'base64',
        description: 'encoded',
      } as unknown as Schema
      const result = wrap('z.string()', schema)
      expect(result).toBe('z.string().openapi({"description":"encoded"})')
    })

    it.concurrent('should filter out if/then/else properties', () => {
      const schema = {
        type: 'object',
        if: { type: 'string' },
        // eslint-disable-next-line unicorn/no-thenable -- testing JSON Schema if/then/else filtering
        then: { minLength: 1 },
        else: { maxLength: 0 },
        description: 'conditional',
      } as unknown as Schema
      const result = wrap('z.looseObject({})', schema)
      expect(result).toBe('z.looseObject({}).openapi({"description":"conditional"})')
    })
  })

  describe('date type default', () => {
    it.concurrent('formats date default with new Date()', () => {
      const schema = { type: 'date', default: '2024-01-01' } as unknown as Schema
      expect(wrap('z.date()', schema)).toBe('z.date().default(new Date("2024-01-01"))')
    })
  })

  describe('header with style, explode, allowReserved', () => {
    it.concurrent('should handle header with style property', () => {
      const testHeader = { description: 'Styled header', required: true, style: 'simple' }
      const result = wrap('z.string()', { type: 'string' }, { headers: testHeader })
      expect(result).toBe('z.string().openapi({description:"Styled header"})')
    })

    it.concurrent('should handle header with explode property', () => {
      const testHeader = { description: 'Exploded header', required: true, explode: true }
      const result = wrap('z.string()', { type: 'string' }, { headers: testHeader })
      expect(result).toBe('z.string().openapi({description:"Exploded header"})')
    })

    it.concurrent('should handle header with allowReserved property', () => {
      const testHeader = { description: 'Reserved header', required: true, allowReserved: true }
      const result = wrap('z.string()', { type: 'string' }, { headers: testHeader })
      expect(result).toBe('z.string().openapi({description:"Reserved header"})')
    })
  })

  describe('nullable with type null', () => {
    it.concurrent('should handle type null as standalone', () => {
      expect(wrap('z.null()', { type: 'null' })).toBe('z.null().nullable()')
    })
  })

  describe('items filtering', () => {
    it.concurrent('should filter out boolean items schema', () => {
      const schema = {
        type: 'array',
        items: true,
        description: 'Array with boolean items',
      } as unknown as Schema
      const result = wrap('z.array(z.string())', schema)
      expect(result).toBe('z.array(z.string()).openapi({"description":"Array with boolean items"})')
    })

    it.concurrent('should filter out array-type items (tuple items)', () => {
      const schema = {
        type: 'array',
        items: [{ type: 'string' }, { type: 'number' }],
        description: 'Tuple array',
      } as unknown as Schema
      const result = wrap('z.array(z.string())', schema)
      expect(result).toBe('z.array(z.string()).openapi({"description":"Tuple array"})')
    })
  })

  describe('not.not filtering', () => {
    it.concurrent('should filter out nested not.not with boolean value', () => {
      const schema = {
        type: 'string',
        not: { not: true },
        description: 'Schema with nested not',
      } as unknown as Schema
      const result = wrap('z.string()', schema)
      expect(result).toBe('z.string().openapi({"description":"Schema with nested not","not":{}})')
    })

    it.concurrent('should keep not.not when inner not is object (not boolean)', () => {
      // not is in zodExpressedProps so it's excluded from .openapi() args,
      // but the filterUnsupportedProps function still needs to handle non-boolean not.not
      const schema = {
        type: 'string',
        not: { not: { type: 'number' } },
        description: 'Schema with non-boolean nested not',
      } as unknown as Schema
      const result = wrap('z.string()', schema)
      // not is filtered by zodExpressedProps, only description remains
      expect(result).toBe(
        'z.string().openapi({"description":"Schema with non-boolean nested not","not":{"not":{"type":"number"}}})',
      )
    })
  })

  describe('no openapi() when empty after filtering', () => {
    it.concurrent('should not add openapi() when all props are zodExpressed', () => {
      expect(
        wrap('z.string().min(1).max(10)', { type: 'string', minLength: 1, maxLength: 10 }),
      ).toBe('z.string().min(1).max(10)')
    })
  })

  // #452: `patternProperties` is checked in a refinement the document derives nothing
  // from, so the keyword is stated in `.openapi()`. It is handed over in a spread: the
  // argument has no such key, and an object literal naming it does not type-check.
  describe('patternProperties stated in the document (#452)', () => {
    it.concurrent('writes patternProperties as the source has it', () => {
      expect(
        wrap('z.looseObject({})', {
          type: 'object',
          patternProperties: { '^x-': { type: 'integer' } },
        }),
      ).toBe('z.looseObject({}).openapi({...{patternProperties:{"^x-":{"type":"integer"}}}})')
    })

    it.concurrent('states additionalProperties: false beside it', () => {
      expect(
        wrap('z.looseObject({})', {
          type: 'object',
          patternProperties: { '^x-': { type: 'integer' } },
          additionalProperties: false,
        }),
      ).toBe(
        'z.looseObject({}).openapi({...{patternProperties:{"^x-":{"type":"integer"}}},additionalProperties:false})',
      )
    })

    // #454: beside patternProperties the object is loose, so a schema-valued
    // additionalProperties is stated too, references written out like the patterns'.
    it.concurrent('states a schema-valued additionalProperties beside it', () => {
      expect(
        wrap('z.looseObject({})', {
          type: 'object',
          patternProperties: { '^x-': { type: 'integer' } },
          additionalProperties: { type: 'string' },
        }),
      ).toBe(
        'z.looseObject({}).openapi({...{patternProperties:{"^x-":{"type":"integer"}}},additionalProperties:{"type":"string"}})',
      )
    })

    it.concurrent('writes a component additionalProperties refers to out', () => {
      expect(
        wrap(
          'z.looseObject({})',
          {
            type: 'object',
            patternProperties: { '^x-': { type: 'integer' } },
            additionalProperties: { $ref: '#/components/schemas/Tag' },
          },
          undefined,
          {
            schemas: {
              Tag: { type: 'object', required: ['id'], properties: { id: { type: 'integer' } } },
            },
          },
        ),
      ).toBe(
        'z.looseObject({}).openapi({...{patternProperties:{"^x-":{"type":"integer"}}},additionalProperties:{"type":"object","required":["id"],"properties":{"id":{"type":"integer"}}}})',
      )
    })

    it.concurrent('leaves additionalProperties: true to the chain', () => {
      expect(
        wrap('z.looseObject({})', {
          type: 'object',
          patternProperties: { '^x-': { type: 'integer' } },
          additionalProperties: true,
        }),
      ).toBe('z.looseObject({}).openapi({...{patternProperties:{"^x-":{"type":"integer"}}}})')
    })

    it.concurrent('writes a referenced component out, so the document needs no definition', () => {
      expect(
        wrap(
          'z.looseObject({})',
          {
            type: 'object',
            patternProperties: { '^x-': { $ref: '#/components/schemas/Tag' } },
          },
          undefined,
          {
            schemas: {
              Tag: { type: 'object', properties: { id: { $ref: '#/components/schemas/Id' } } },
              Id: { type: 'integer', minimum: 1 },
            },
          },
        ),
      ).toBe(
        'z.looseObject({}).openapi({...{patternProperties:{"^x-":{"type":"object","properties":{"id":{"type":"integer","minimum":1}}}}}})',
      )
    })

    it.concurrent('a reference that leads back to itself is any value', () => {
      expect(
        wrap(
          'z.looseObject({})',
          {
            type: 'object',
            patternProperties: { '^x-': { $ref: '#/components/schemas/Node' } },
          },
          undefined,
          {
            schemas: {
              Node: { type: 'object', properties: { next: { $ref: '#/components/schemas/Node' } } },
            },
          },
        ),
      ).toBe(
        'z.looseObject({}).openapi({...{patternProperties:{"^x-":{"type":"object","properties":{"next":{}}}}}})',
      )
    })

    it.concurrent('keeps a reference no component answers to', () => {
      expect(
        wrap('z.looseObject({})', {
          type: 'object',
          patternProperties: { '^x-': { $ref: '#/components/schemas/Missing' } },
        }),
      ).toBe(
        'z.looseObject({}).openapi({...{patternProperties:{"^x-":{"$ref":"#/components/schemas/Missing"}}}})',
      )
    })

    it.concurrent('keeps a nested patternProperties and drops what a Schema Object has not', () => {
      expect(
        wrap('z.looseObject({})', {
          type: 'object',
          patternProperties: {
            '^x-': {
              type: 'object',
              patternProperties: { '^y-': { type: 'string' } },
              $defs: { A: { type: 'string' } },
            },
          },
        }),
      ).toBe(
        'z.looseObject({}).openapi({...{patternProperties:{"^x-":{"type":"object","patternProperties":{"^y-":{"type":"string"}}}}}})',
      )
    })

    it.concurrent('writes nothing for an empty patternProperties', () => {
      expect(
        wrap('z.strictObject({})', {
          type: 'object',
          patternProperties: {},
          additionalProperties: false,
        }),
      ).toBe('z.strictObject({})')
    })

    // An object literal nested in a spread is type-checked again, so the keyword is brought
    // by a spread of its own wherever an object that has it stands.
    it.concurrent('spreads a patternProperties nested in additionalProperties', () => {
      expect(
        wrap('z.looseObject({})', {
          type: 'object',
          patternProperties: { '^x-': { type: 'integer' } },
          additionalProperties: {
            type: 'object',
            patternProperties: { '^y-': { type: 'string' } },
            properties: {
              deep: { type: 'object', patternProperties: { '^z-': { type: 'boolean' } } },
              plain: { type: 'string' },
            },
            items: { type: 'object', patternProperties: { '^i-': { type: 'integer' } } },
            anyOf: [{ type: 'object', patternProperties: { '^a-': { type: 'integer' } } }],
          },
        }),
      ).toBe(
        'z.looseObject({}).openapi({...{patternProperties:{"^x-":{"type":"integer"}}},additionalProperties:{"type":"object",...{patternProperties:{"^y-":{"type":"string"}}},"properties":{"deep":{"type":"object",...{patternProperties:{"^z-":{"type":"boolean"}}}},"plain":{"type":"string"}},"items":{"type":"object",...{patternProperties:{"^i-":{"type":"integer"}}}},"anyOf":[{"type":"object",...{patternProperties:{"^a-":{"type":"integer"}}}}]}})',
      )
    })

    it.concurrent("states a parameter's patternProperties in its schema", () => {
      const parameter: Parameter = {
        name: 'filter',
        in: 'query',
        required: true,
        schema: {
          type: 'object',
          patternProperties: { '^x-': { type: 'integer' } },
          additionalProperties: false,
        },
      }
      expect(
        wrap(
          'z.looseObject({})',
          {
            type: 'object',
            patternProperties: { '^x-': { type: 'integer' } },
            additionalProperties: false,
          },
          { parameters: parameter },
        ),
      ).toBe(
        'z.looseObject({}).openapi({param:{"name":"filter","in":"query","required":true,"schema":{"type":"object",...{patternProperties:{"^x-":{"type":"integer"}}},"additionalProperties":false}}})',
      )
    })

    it.concurrent('a parameter schema without patternProperties is written as JSON', () => {
      const parameter: Parameter = {
        name: 'filter',
        in: 'query',
        required: true,
        schema: { type: 'object', properties: { a: { type: 'integer' } } },
      }
      expect(
        wrap(
          'z.object({a:z.int().exactOptional()})',
          { type: 'object', properties: { a: { type: 'integer' } } },
          { parameters: parameter },
        ),
      ).toBe(
        'z.object({a:z.int().exactOptional()}).openapi({param:{"name":"filter","in":"query","required":true,"schema":{"type":"object","properties":{"a":{"type":"integer"}}}}})',
      )
    })
  })

  describe('combined nullable + default + isOptional', () => {
    it.concurrent('should handle nullable + default + isOptional combined', () => {
      expect(
        wrap('z.string()', { type: 'string', nullable: true, default: 'hi' }, undefined, {
          isOptional: true,
        }),
      ).toBe('z.string().nullable().default("hi").exactOptional()')
    })
  })

  describe('parameters required combinations', () => {
    it.concurrent('should handle path parameter (always required implicitly)', () => {
      const testParameter: Parameter = {
        name: 'userId',
        in: 'path',
        required: true,
        schema: { type: 'string' },
      }
      const result = wrap('z.string()', { type: 'string' }, { parameters: testParameter })
      expect(result).toBe(
        'z.string().openapi({param:{"name":"userId","in":"path","required":true,"schema":{"type":"string"}}})',
      )
    })

    it.concurrent('should handle query parameter with required true', () => {
      const testParameter: Parameter = {
        name: 'page',
        in: 'query',
        required: true,
        schema: { type: 'integer' },
      }
      const result = wrap('z.number()', { type: 'integer' }, { parameters: testParameter })
      expect(result).toBe(
        'z.number().openapi({param:{"name":"page","in":"query","required":true,"schema":{"type":"integer"}}})',
      )
    })

    it.concurrent('should handle query parameter with required false', () => {
      const testParameter: Parameter = {
        name: 'limit',
        in: 'query',
        required: false,
        schema: { type: 'integer' },
      }
      const result = wrap('z.number()', { type: 'integer' }, { parameters: testParameter })
      expect(result).toBe(
        'z.number().exactOptional().openapi({param:{"name":"limit","in":"query","required":false,"schema":{"type":"integer"}}})',
      )
    })

    it.concurrent('should handle cookie parameter without required', () => {
      const testParameter: Parameter = {
        name: 'sessionId',
        in: 'cookie',
        schema: { type: 'string' },
      }
      const result = wrap('z.string()', { type: 'string' }, { parameters: testParameter })
      expect(result).toBe(
        'z.string().exactOptional().openapi({param:{"name":"sessionId","in":"cookie","schema":{"type":"string"},"required":false}})',
      )
    })

    it.concurrent('should handle header parameter with required true', () => {
      const testParameter: Parameter = {
        name: 'X-Request-ID',
        in: 'header',
        required: true,
        schema: { type: 'string' },
      }
      const result = wrap('z.string()', { type: 'string' }, { parameters: testParameter })
      expect(result).toBe(
        'z.string().openapi({param:{"name":"X-Request-ID","in":"header","required":true,"schema":{"type":"string"}}})',
      )
    })
  })

  describe('x-brand', () => {
    // A quote or a backslash in the brand is escaped, so the literal ends where the brand does.
    // ブランド名の引用符やバックスラッシュはエスケープされ、リテラルはブランド名の終わりで閉じる。
    it.concurrent('escapes a quote and a backslash in x-brand', () => {
      expect(wrap('z.string()', { type: 'string', 'x-brand': 'a"b\\c' })).toBe(
        'z.string().brand<"a\\"b\\\\c">()',
      )
    })

    it.concurrent('adds .brand<"X">() for string with x-brand', () => {
      expect(wrap('z.string()', { type: 'string', 'x-brand': 'UserId' })).toBe(
        'z.string().brand<"UserId">()',
      )
    })

    it.concurrent('adds .brand<"X">() for string with format and x-brand', () => {
      expect(
        wrap('z.string().uuid()', { type: 'string', format: 'uuid', 'x-brand': 'UserId' }),
      ).toBe('z.string().uuid().brand<"UserId">()')
    })

    it.concurrent('adds .brand<"X">() after .nullable()', () => {
      expect(wrap('z.string()', { type: 'string', nullable: true, 'x-brand': 'UserId' })).toBe(
        'z.string().nullable().brand<"UserId">()',
      )
    })

    it.concurrent('adds .brand<"X">() after .default()', () => {
      expect(wrap('z.string()', { type: 'string', default: 'test', 'x-brand': 'UserId' })).toBe(
        'z.string().default("test").brand<"UserId">()',
      )
    })

    it.concurrent('adds .brand<"X">() with .openapi()', () => {
      expect(
        wrap('z.string()', {
          type: 'string',
          'x-brand': 'UserId',
          description: 'User identifier',
        }),
      ).toBe('z.string().brand<"UserId">().openapi({"description":"User identifier"})')
    })

    it.concurrent('adds .brand<"X">() for number type', () => {
      expect(wrap('z.number()', { type: 'number', 'x-brand': 'Price' })).toBe(
        'z.number().brand<"Price">()',
      )
    })

    it.concurrent('adds .brand<"X">() for integer type', () => {
      expect(wrap('z.number().int()', { type: 'integer', 'x-brand': 'Count' })).toBe(
        'z.number().int().brand<"Count">()',
      )
    })

    it.concurrent('x-brand is not included in .openapi() metadata', () => {
      expect(
        wrap('z.string()', {
          type: 'string',
          'x-brand': 'UserId',
          title: 'User ID',
        }),
      ).toBe('z.string().brand<"UserId">().openapi({"title":"User ID"})')
    })
  })
})

describe('formatLiteral via default (format-aware literals)', () => {
  it.concurrent.each<[string, Schema, string]>([
    ['z.boolean()', { type: 'boolean', default: true }, 'z.boolean().default(true)'],
    ['z.boolean()', { type: 'boolean', default: false }, 'z.boolean().default(false)'],
    ['z.number()', { type: 'number', default: 3.14 }, 'z.number().default(3.14)'],
    [
      'z.int64()',
      { type: 'integer', format: 'int64', default: 5 },
      'z.int64().default(5n).openapi({type:"integer",format:"int64",default:5})',
    ],
    [
      'z.bigint()',
      { type: 'integer', format: 'bigint', default: 5 },
      'z.bigint().default(BigInt(5)).openapi({type:"integer",format:"bigint",default:5})',
    ],
  ])('wrap(%s, %o) → %s', (zod, schema, expected) => {
    expect(wrap(zod, schema)).toBe(expected)
  })
})

describe('filterUnsupportedProps (required coercion + nested boolean schemas)', () => {
  it.concurrent('coerces non-string required entries to strings (YAML literal quirk)', () => {
    expect(wrap('z.looseObject({})', { type: 'object', required: [1, true, 'x'] } as Schema)).toBe(
      'z.looseObject({}).openapi({"required":["1","true","x"]})',
    )
  })

  // An extension's value is the author's own: it is written as it is, whatever its shape.
  it.concurrent('keeps the value of an x- extension as written', () => {
    expect(
      wrap('z.looseObject({})', {
        type: 'object',
        'x-defs': { Foo: { type: 'array', items: true } },
      } as unknown as Schema),
    ).toBe('z.looseObject({}).openapi({"x-defs":{"Foo":{"type":"array","items":true}}})')
  })

  // #393: a parameter's `schema` is a Schema Object too, at every level
  it.concurrent('writes only Schema Object keys into param.schema, at every level', () => {
    const schema = {
      type: 'object',
      $schema: 'http://json-schema.org/draft-07/schema#',
      properties: { by: { type: 'string', errorMessage: 'nope', description: 'kept' } },
    } as unknown as Schema
    expect(
      wrap('z.looseObject({})', schema, { parameters: { name: 'filter', in: 'header', schema } }),
    ).toBe(
      'z.looseObject({}).exactOptional().openapi({param:{"name":"filter","in":"header","schema":{"type":"object","properties":{"by":{"type":"string","description":"kept"}}},"required":false}})',
    )
  })

  // a Discriminator Object takes no extension (OpenSearch's `x-default`)
  it.concurrent('writes only propertyName and mapping of a discriminator', () => {
    expect(
      wrap('z.xor([A,B])', {
        oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
        discriminator: { propertyName: 'type', 'x-default': 'object' },
      } as unknown as Schema),
    ).toBe('z.xor([A,B]).openapi({"discriminator":{"propertyName":"type"}})')
  })

  // #442: an XML Object has `name`, `namespace`, `prefix`, `attribute` and `wrapped` (openSUSE OBS)
  it.concurrent('writes only the keys an XML Object has', () => {
    expect(
      wrap('z.string()', {
        type: 'string',
        xml: { attribute: true, example: 'http://example.com' },
      } as unknown as Schema),
    ).toBe('z.string().openapi({"xml":{"attribute":true}})')
  })

  it.concurrent('leaves out XML Object values of the wrong type, and keeps its extensions', () => {
    expect(
      wrap('z.string()', {
        type: 'string',
        xml: { name: 'id', prefix: 1, wrapped: 'yes', 'x-ns': { a: 1 } },
      } as unknown as Schema),
    ).toBe('z.string().openapi({"xml":{"name":"id","x-ns":{"a":1}}})')
  })

  it.concurrent('leaves out an xml with no key an XML Object has', () => {
    expect(wrap('z.string()', { type: 'string', xml: { example: 'x' } } as unknown as Schema)).toBe(
      'z.string()',
    )
  })

  // #419: a value of the wrong type does not type-check either (Revolut Business)
  it.concurrent('leaves out a discriminator without propertyName', () => {
    expect(
      wrap('z.any()', {
        discriminator: { mapping: { UK: '#/components/schemas/RequestUK' } },
      }),
    ).toBe('z.any()')
  })

  it.concurrent('writes only the string entries of a discriminator mapping', () => {
    expect(
      wrap('z.xor([A,B])', {
        oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
        discriminator: {
          propertyName: 'type',
          mapping: { a: '#/components/schemas/A', b: 1 },
        },
      } as unknown as Schema),
    ).toBe(
      'z.xor([A,B]).openapi({"discriminator":{"propertyName":"type","mapping":{"a":"#/components/schemas/A"}}})',
    )
  })

  it.concurrent('leaves a minimum written as text out of param.schema', () => {
    const schema = { type: 'string', minimum: "'created_at' - 21 days" } as unknown as Schema
    expect(
      wrap('z.string()', schema, {
        parameters: { name: 'created_before', in: 'query', schema },
      }),
    ).toBe(
      'z.string().exactOptional().openapi({param:{"name":"created_before","in":"query","schema":{"type":"string"},"required":false}})',
    )
  })

  it.concurrent('leaves out Schema Object values of the wrong type, at every level', () => {
    const schema = {
      type: 'object',
      properties: {
        n: {
          type: 'integer',
          maximum: '10',
          exclusiveMinimum: 0,
          deprecated: 'yes',
          description: 'kept',
        },
      },
      required: ['n'],
      externalDocs: { description: 'no url' },
      readOnly: 1,
    } as unknown as Schema
    expect(
      wrap('z.looseObject({})', schema, { parameters: { name: 'f', in: 'header', schema } }),
    ).toBe(
      'z.looseObject({}).exactOptional().openapi({param:{"name":"f","in":"header","schema":{"type":"object","properties":{"n":{"type":"integer","exclusiveMinimum":0,"description":"kept"}},"required":["n"]},"required":false},"required":["n"]})',
    )
  })

  it.concurrent('leaves out a type that names no Schema Object type', () => {
    const schema = { type: 'date' } as unknown as Schema
    expect(wrap('z.date()', schema, { parameters: { name: 'd', in: 'query', schema } })).toBe(
      'z.date().exactOptional().openapi({param:{"name":"d","in":"query","schema":{},"required":false}})',
    )
  })

  // #398: a 3.0-style `examples` map on a schema is the list of its values
  it.concurrent('writes a map of examples as the list of their values', () => {
    expect(
      wrap('z.string()', {
        type: 'string',
        examples: { a: { value: 'x' }, b: { externalValue: 'https://e.example' } },
      }),
    ).toBe('z.string().openapi({"examples":["x"]})')
  })

  // #377: `$defs` holds schemas, which `.openapi()` cannot take as they are
  it.concurrent('leaves $defs and definitions out of the metadata', () => {
    expect(
      wrap('z.looseObject({})', {
        type: 'object',
        title: 'T',
        $defs: { Foo: { type: 'string', enum: ['a'] } },
        definitions: { Bar: { type: 'string' } },
      } as unknown as Schema),
    ).toBe('z.looseObject({}).openapi({"title":"T"})')
  })
})

describe('valueLiteral (#491)', () => {
  const int64 = { type: 'integer', format: 'int64' } as const

  it.concurrent.each<[string, Schema, unknown, string, boolean]>([
    ['a number', { type: 'number' }, 1.5, '1.5', false],
    ['an int32', { type: 'integer', format: 'int32' }, 1, '1', false],
    ['an int64', int64, 1, '1n', true],
    ['a uint64', { type: 'integer', format: 'uint64' }, 2, '2n', true],
    ['a bigint', { type: 'integer', format: 'bigint' }, 3, 'BigInt(3)', true],
    // `type: number` with `format: int64` is `z.number()` (#412).
    ['a number of format int64', { type: 'number', format: 'int64' }, 1, '1', false],
    // A fraction is no bigint literal.
    ['a fraction for an int64', int64, 1.5, '1.5', false],
    ['a string', { type: 'string' }, 'a"b', '"a\\"b"', false],
    ['a date', { type: 'date' }, '2020-01-01', 'new Date("2020-01-01")', false],
    ['null', int64, null, 'null', false],
    ['undefined', int64, undefined, 'undefined', false],
    ['a boolean', { type: 'boolean' }, false, 'false', false],
    ['an array of int64', { type: 'array', items: int64 }, [1, 2], '[1n,2n]', true],
    ['an array of strings', { type: 'array', items: { type: 'string' } }, ['a'], '["a"]', false],
    ['an array with no items', { type: 'array' }, [1, 'a'], '[1,"a"]', false],
    [
      'an object',
      { type: 'object', properties: { n: int64, s: { type: 'string' } } },
      { n: 1, s: 'x', other: 2 },
      '{"n":1n,"s":"x","other":2}',
      true,
    ],
    [
      'a nested object',
      {
        type: 'object',
        properties: {
          o: { type: 'object', properties: { list: { type: 'array', items: int64 } } },
        },
      },
      { o: { list: [1] } },
      '{"o":{"list":[1n]}}',
      true,
    ],
    [
      'additionalProperties',
      { type: 'object', additionalProperties: int64 },
      { a: 1 },
      '{"a":1n}',
      true,
    ],
    [
      'an allOf',
      { allOf: [{ type: 'object', properties: { n: int64 } }, { type: 'object' }] },
      { n: 1 },
      '{"n":1n}',
      true,
    ],
    [
      'the branch of a oneOf that takes the value',
      { oneOf: [{ type: 'string' }, { type: 'object', properties: { n: int64 } }] },
      { n: 1 },
      '{"n":1n}',
      true,
    ],
    // What a user chain hands out cannot be told: the value is its JSON.
    [
      'a property with a user chain',
      { type: 'object', properties: { n: { ...int64, 'x-transform': '(val) => Number(val)' } } },
      { n: 1 },
      '{"n":1}',
      false,
    ],
  ])('%s', (_name, schema, value, code, bigint) => {
    expect(valueLiteral(schema, value)).toStrictEqual({ code, bigint })
  })

  it.concurrent('reads a reference as the component it names', () => {
    const schemas = { Big: { type: 'object', properties: { n: int64 } } } as const
    expect(valueLiteral({ $ref: '#/components/schemas/Big' }, { n: 1 }, schemas)).toStrictEqual({
      code: '{"n":1n}',
      bigint: true,
    })
    // Not resolved, or naming itself: the value is its JSON.
    expect(valueLiteral({ $ref: '#/components/schemas/Big' }, { n: 1 })).toStrictEqual({
      code: '{"n":1}',
      bigint: false,
    })
    const cyclic = { Node: { $ref: '#/components/schemas/Node' } } as const
    expect(valueLiteral({ $ref: '#/components/schemas/Node' }, { n: 1 }, cyclic)).toStrictEqual({
      code: '{"n":1}',
      bigint: false,
    })
  })
})

// What `x-catch` emits (#492): a `z.preprocess` that replaces a value the schema does not
// take by the fallback.
const caught = (schema: string, fallback: string) =>
  `(()=>{const Schema=${schema};return z.preprocess((val: z.input<typeof Schema>)=>Schema.safeParse(val).success?val:${fallback},Schema)})()`

describe('wrap: x-catch, x-prefault and nested literals (#490, #491, #492)', () => {
  it.concurrent('x-catch is a .catch() that states its schema for the document', () => {
    expect(wrap('z.string()', { type: 'string', 'x-catch': 'x' })).toBe(
      'z.string().catch("x").openapi({"type":"string"})',
    )
    expect(wrap('z.string()', { type: 'string', default: 'd', 'x-catch': 'x' })).toBe(
      'z.string().default("d").catch("x").openapi({"type":"string","default":"d"})',
    )
    expect(wrap('z.int64()', { type: 'integer', format: 'int64', const: 1, 'x-catch': 0 })).toBe(
      'z.int64().catch(0n).openapi({"type":"integer","format":"int64","enum":[1]})',
    )
    // `z.stringbool()` hands out a boolean, which is what the fallback is.
    expect(wrap('z.stringbool()', { type: 'boolean', 'x-stringbool': true, 'x-catch': true })).toBe(
      'z.stringbool().catch(true).openapi({"type":"boolean"})',
    )
  })

  it.concurrent('x-catch with no type to state is a preprocess', () => {
    expect(wrap('z.any()', { 'x-catch': 'x' })).toBe(caught('z.any()', '"x"'))
    // What a reference names may be asynchronous when it cannot be read: `safeParse` then
    // throws, and the probe is made again, awaited.
    expect(wrap('ASchema', { $ref: '#/components/schemas/A', 'x-catch': {} })).toBe(
      `(()=>{const Schema=ASchema;return z.preprocess((val: z.input<typeof Schema>)=>{try{return Schema.safeParse(val).success?val:{}}catch(error){if(!(error instanceof z.core.$ZodAsyncError))throw error;return Schema.safeParseAsync(val).then((result)=>result.success?val:{})}},Schema)})()`,
    )
    expect(
      wrap('ASchema', { $ref: '#/components/schemas/A', 'x-catch': {} }, undefined, {
        schemas: { A: { type: 'object' } },
      }),
    ).toBe('ASchema.catch({}).openapi({"type":"object"})')
    // A user chain replaces the generated one, the catch with it.
    expect(wrap('z.string()', { type: 'string', 'x-catch': 'x', 'x-transform': 'T' })).toBe('T')
  })

  it.concurrent('a null fallback makes the schema nullable', () => {
    expect(wrap('z.string()', { type: 'string', 'x-catch': null })).toBe(
      'z.string().nullable().catch(null).openapi({"type":["string","null"]})',
    )
    expect(wrap('z.string()', { type: 'string', 'x-prefault': null })).toBe(
      'z.string().nullable().prefault(null)',
    )
  })

  it.concurrent('the document is told the JSON of a default that holds a bigint', () => {
    const schema = {
      type: 'object',
      properties: { n: { type: 'integer', format: 'int64' } },
    } as const
    expect(wrap('Z', { ...schema, default: { n: 1 } })).toBe(
      'Z.default({"n":1n}).openapi({"default":{"n":1}})',
    )
    expect(wrap('Z', { ...schema, 'x-prefault': { n: 1 } })).toBe(
      'Z.prefault({"n":1n}).openapi({"default":{"n":1}})',
    )
    // The document reads `.default()` before `.prefault()`.
    expect(wrap('Z', { ...schema, default: {}, 'x-prefault': { n: 1 } })).toBe(
      'Z.default({}).prefault({"n":1n})',
    )
    // Nothing to tell when no bigint is written.
    expect(
      wrap('Z', { type: 'object', properties: { s: { type: 'string' } }, default: { s: 'x' } }),
    ).toBe('Z.default({"s":"x"})')
  })
})
