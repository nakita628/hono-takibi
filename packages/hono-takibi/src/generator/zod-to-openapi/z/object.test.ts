import { describe, expect, it } from 'vite-plus/test'

import type { Schema } from '../../../openapi/index.js'
import { object } from './object.js'

describe('object', () => {
  it.concurrent.each<[Schema, string]>([
    [{ type: 'object' }, 'z.object({})'],
    [
      { type: 'object', properties: { foo: { type: 'string' } }, required: ['foo'] },
      'z.object({foo:z.string()})',
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
    [
      {
        type: 'object',
        properties: {
          test: {
            type: 'string',
          },
        },
      },
      'z.object({test:z.string().exactOptional()})',
    ],
  ])('object(%o) → %s', (input, expected) => {
    expect(object(input)).toBe(expected)
  })

  describe('x-minimum-message / x-maximum-message', () => {
    it.concurrent.each<[Schema, string]>([
      // minProperties + x-minimum-message
      [
        { type: 'object', minProperties: 1, 'x-minimum-message': 'At least 1 property' },
        'z.object({}).refine((o)=>Object.keys(o).length>=1,{error:"At least 1 property"})',
      ],
      // maxProperties + x-maximum-message
      [
        { type: 'object', maxProperties: 5, 'x-maximum-message': 'At most 5 properties' },
        'z.object({}).refine((o)=>Object.keys(o).length<=5,{error:"At most 5 properties"})',
      ],
      // minProperties + maxProperties with separate messages
      [
        {
          type: 'object',
          minProperties: 1,
          maxProperties: 10,
          'x-minimum-message': 'At least 1',
          'x-maximum-message': 'At most 10',
        },
        'z.object({}).refine((o)=>Object.keys(o).length>=1,{error:"At least 1"}).refine((o)=>Object.keys(o).length<=10,{error:"At most 10"})',
      ],
    ])('object(%o) → %s', (input, expected) => {
      expect(object(input)).toBe(expected)
    })
  })

  describe('x-error-message (dependentRequired)', () => {
    it.concurrent.each<[Schema, string]>([
      [
        {
          type: 'object',
          dependentRequired: { foo: ['bar'] },
          'x-error-message': 'fooにはbarが必要',
        },
        `z.object({}).refine((o)=>!('foo' in o)||('bar' in o),{error:"fooにはbarが必要"})`,
      ],
    ])('object(%o) → %s', (input, expected) => {
      expect(object(input)).toBe(expected)
    })
  })

  describe('x-dependentRequired-message', () => {
    it.concurrent.each<[Schema, string]>([
      // x-dependentRequired-message overrides x-error-message for dependentRequired
      [
        {
          type: 'object',
          dependentRequired: { foo: ['bar'] },
          'x-error-message': 'オブジェクト必須',
          'x-dependentRequired-message': 'fooにはbarが必要',
        },
        `z.object({}).refine((o)=>!('foo' in o)||('bar' in o),{error:"fooにはbarが必要"})`,
      ],
      // x-dependentRequired-message alone (no x-error-message)
      [
        {
          type: 'object',
          dependentRequired: { foo: ['bar'] },
          'x-dependentRequired-message': 'fooにはbarが必要',
        },
        `z.object({}).refine((o)=>!('foo' in o)||('bar' in o),{error:"fooにはbarが必要"})`,
      ],
      // fallback: no x-dependentRequired-message → x-error-message used
      [
        {
          type: 'object',
          dependentRequired: { foo: ['bar'] },
          'x-error-message': 'エラー',
        },
        `z.object({}).refine((o)=>!('foo' in o)||('bar' in o),{error:"エラー"})`,
      ],
      // no message at all → no errArg
      [
        {
          type: 'object',
          dependentRequired: { foo: ['bar'] },
        },
        `z.object({}).refine((o)=>!('foo' in o)||('bar' in o))`,
      ],
      // multiple deps per key (foo requires both bar and baz)
      [
        {
          type: 'object',
          dependentRequired: { foo: ['bar', 'baz'] },
          'x-dependentRequired-message': '依存エラー',
        },
        `z.object({}).refine((o)=>!('foo' in o)||('bar' in o&&'baz' in o),{error:"依存エラー"})`,
      ],
      // multiple dependentRequired entries
      [
        {
          type: 'object',
          dependentRequired: { foo: ['bar'], baz: ['qux'] },
          'x-dependentRequired-message': '依存エラー',
        },
        `z.object({}).refine((o)=>!('foo' in o)||('bar' in o),{error:"依存エラー"}).refine((o)=>!('baz' in o)||('qux' in o),{error:"依存エラー"})`,
      ],
    ])('object(%o) → %s', (input, expected) => {
      expect(object(input)).toBe(expected)
    })
  })

  describe('x-pattern-message', () => {
    it.concurrent.each<[Schema, string]>([
      // propertyNames.pattern + x-pattern-message
      [
        {
          type: 'object',
          propertyNames: { pattern: '^[a-z]+$' },
          'x-pattern-message': 'Keys must be lowercase',
        },
        'z.object({}).refine((o)=>Object.keys(o).every((k)=>new RegExp("^[a-z]+$").test(k)),{error:"Keys must be lowercase"})',
      ],
      // propertyNames.enum + x-pattern-message
      [
        {
          type: 'object',
          propertyNames: { enum: ['a', 'b', 'c'] },
          'x-pattern-message': 'Keys must be a, b, or c',
        },
        'z.object({}).refine((o)=>Object.keys(o).every((k)=>["a","b","c"].includes(k)),{error:"Keys must be a, b, or c"})',
      ],
      // patternProperties + x-pattern-message
      [
        {
          type: 'object',
          patternProperties: { '^S_': { type: 'string' } },
          'x-pattern-message': 'S_ prefixed keys must be strings',
        },
        'z.object({}).refine((o)=>Object.entries(o).every(([k,v])=>!new RegExp("^S_").test(k)||z.string().safeParse(v).success),{error:"S_ prefixed keys must be strings"})',
      ],
      // record path (additionalProperties: Schema) + x-pattern-message on propertyNames
      [
        {
          type: 'object',
          additionalProperties: { type: 'string' },
          propertyNames: { pattern: '^[a-z]+$' },
          'x-pattern-message': 'lowercase keys only',
        },
        'z.record(z.string(),z.string()).refine((o)=>Object.keys(o).every((k)=>new RegExp("^[a-z]+$").test(k)),{error:"lowercase keys only"})',
      ],
      // record path (additionalProperties: Schema) + patternProperties + x-pattern-message
      [
        {
          type: 'object',
          additionalProperties: { type: 'number' },
          patternProperties: { '^x-': { type: 'string' } },
          'x-pattern-message': 'x- keys must be strings',
        },
        'z.record(z.string(),z.number()).refine((o)=>Object.entries(o).every(([k,v])=>!new RegExp("^x-").test(k)||z.string().safeParse(v).success),{error:"x- keys must be strings"})',
      ],
    ])('object(%o) → %s', (input, expected) => {
      expect(object(input)).toBe(expected)
    })
  })

  describe('x-propertyNames-message', () => {
    it.concurrent.each<[Schema, string]>([
      // x-propertyNames-message overrides x-pattern-message for propertyNames
      [
        {
          type: 'object',
          propertyNames: { pattern: '^[a-z]+$' },
          'x-pattern-message': 'パターンエラー',
          'x-propertyNames-message': 'キー名は小文字のみ',
        },
        'z.object({}).refine((o)=>Object.keys(o).every((k)=>new RegExp("^[a-z]+$").test(k)),{error:"キー名は小文字のみ"})',
      ],
      // x-propertyNames-message alone (no x-pattern-message)
      [
        {
          type: 'object',
          propertyNames: { pattern: '^[a-z]+$' },
          'x-propertyNames-message': 'キー名は小文字のみ',
        },
        'z.object({}).refine((o)=>Object.keys(o).every((k)=>new RegExp("^[a-z]+$").test(k)),{error:"キー名は小文字のみ"})',
      ],
      // x-propertyNames-message with enum
      [
        {
          type: 'object',
          propertyNames: { enum: ['a', 'b', 'c'] },
          'x-propertyNames-message': 'a,b,cのみ',
        },
        'z.object({}).refine((o)=>Object.keys(o).every((k)=>["a","b","c"].includes(k)),{error:"a,b,cのみ"})',
      ],
      // x-propertyNames-message overrides x-pattern-message with enum
      [
        {
          type: 'object',
          propertyNames: { enum: ['x', 'y'] },
          'x-pattern-message': 'パターンエラー',
          'x-propertyNames-message': 'x,yのみ',
        },
        'z.object({}).refine((o)=>Object.keys(o).every((k)=>["x","y"].includes(k)),{error:"x,yのみ"})',
      ],
      // x-propertyNames-message on record path
      [
        {
          type: 'object',
          additionalProperties: { type: 'string' },
          propertyNames: { pattern: '^[a-z]+$' },
          'x-propertyNames-message': 'キー名は小文字のみ',
        },
        'z.record(z.string(),z.string()).refine((o)=>Object.keys(o).every((k)=>new RegExp("^[a-z]+$").test(k)),{error:"キー名は小文字のみ"})',
      ],
      // record path: x-propertyNames-message overrides x-pattern-message
      [
        {
          type: 'object',
          additionalProperties: { type: 'number' },
          propertyNames: { pattern: '^[a-z]+$' },
          'x-pattern-message': 'パターン',
          'x-propertyNames-message': 'キー名制約',
        },
        'z.record(z.string(),z.number()).refine((o)=>Object.keys(o).every((k)=>new RegExp("^[a-z]+$").test(k)),{error:"キー名制約"})',
      ],
      // record path: fallback to x-pattern-message
      [
        {
          type: 'object',
          additionalProperties: { type: 'string' },
          propertyNames: { pattern: '^[a-z]+$' },
          'x-pattern-message': 'パターンエラー',
        },
        'z.record(z.string(),z.string()).refine((o)=>Object.keys(o).every((k)=>new RegExp("^[a-z]+$").test(k)),{error:"パターンエラー"})',
      ],
      // fallback: no x-propertyNames-message → x-pattern-message used
      [
        {
          type: 'object',
          propertyNames: { pattern: '^[a-z]+$' },
          'x-pattern-message': 'パターンエラー',
        },
        'z.object({}).refine((o)=>Object.keys(o).every((k)=>new RegExp("^[a-z]+$").test(k)),{error:"パターンエラー"})',
      ],
      // no message at all → no errArg
      [
        {
          type: 'object',
          propertyNames: { pattern: '^[a-z]+$' },
        },
        'z.object({}).refine((o)=>Object.keys(o).every((k)=>new RegExp("^[a-z]+$").test(k)))',
      ],
      // propertyNames + patternProperties with separate messages
      // x-propertyNames-message → propertyNames, x-pattern-message → patternProperties
      [
        {
          type: 'object',
          propertyNames: { pattern: '^[a-z]+$' },
          patternProperties: { '^x-': { type: 'string' } },
          'x-pattern-message': 'x-の値は文字列のみ',
          'x-propertyNames-message': 'キー名は小文字のみ',
        },
        'z.object({}).refine((o)=>Object.keys(o).every((k)=>new RegExp("^[a-z]+$").test(k)),{error:"キー名は小文字のみ"}).refine((o)=>Object.entries(o).every(([k,v])=>!new RegExp("^x-").test(k)||z.string().safeParse(v).success),{error:"x-の値は文字列のみ"})',
      ],
      // object path with properties + propertyNames pattern
      [
        {
          type: 'object',
          properties: { name: { type: 'string' } },
          required: ['name'],
          propertyNames: { pattern: '^[a-z]+$' },
          'x-propertyNames-message': 'キー名は小文字英字のみ',
        },
        'z.object({name:z.string()}).refine((o)=>Object.keys(o).every((k)=>new RegExp("^[a-z]+$").test(k)),{error:"キー名は小文字英字のみ"})',
      ],
      // object path with properties + propertyNames enum
      [
        {
          type: 'object',
          properties: { name: { type: 'string' }, age: { type: 'number' } },
          required: ['name', 'age'],
          propertyNames: { enum: ['name', 'age'] },
          'x-propertyNames-message': 'name,ageのみ許可',
        },
        'z.object({name:z.string(),age:z.number()}).refine((o)=>Object.keys(o).every((k)=>["name","age"].includes(k)),{error:"name,ageのみ許可"})',
      ],
      // enum fallback to x-pattern-message
      [
        {
          type: 'object',
          propertyNames: { enum: ['x', 'y'] },
          'x-pattern-message': 'フォールバック',
        },
        'z.object({}).refine((o)=>Object.keys(o).every((k)=>["x","y"].includes(k)),{error:"フォールバック"})',
      ],
      // enum no message
      [
        {
          type: 'object',
          propertyNames: { enum: ['a', 'b'] },
        },
        'z.object({}).refine((o)=>Object.keys(o).every((k)=>["a","b"].includes(k)))',
      ],
      // record path: no message
      [
        {
          type: 'object',
          additionalProperties: { type: 'string' },
          propertyNames: { pattern: '^[a-z]+$' },
        },
        'z.record(z.string(),z.string()).refine((o)=>Object.keys(o).every((k)=>new RegExp("^[a-z]+$").test(k)))',
      ],
      // record path: propertyNames + patternProperties with separate messages
      [
        {
          type: 'object',
          additionalProperties: { type: 'number' },
          propertyNames: { pattern: '^[a-z_]+$' },
          patternProperties: { '^x_': { type: 'integer' } },
          'x-pattern-message': 'x_の値は整数のみ',
          'x-propertyNames-message': 'キー名は英小文字とアンダースコアのみ',
        },
        'z.record(z.string(),z.number()).refine((o)=>Object.keys(o).every((k)=>new RegExp("^[a-z_]+$").test(k)),{error:"キー名は英小文字とアンダースコアのみ"}).refine((o)=>Object.entries(o).every(([k,v])=>!new RegExp("^x_").test(k)||z.int().safeParse(v).success),{error:"x_の値は整数のみ"})',
      ],
    ])('object(%o) → %s', (input, expected) => {
      expect(object(input)).toBe(expected)
    })
  })

  describe('additionalProperties as schema (record type)', () => {
    it.concurrent.each<[Schema, string]>([
      // record with string values
      [
        { type: 'object', additionalProperties: { type: 'string' } },
        'z.record(z.string(),z.string())',
      ],
      // record with number values
      [
        { type: 'object', additionalProperties: { type: 'number' } },
        'z.record(z.string(),z.number())',
      ],
      // record with integer values
      [
        { type: 'object', additionalProperties: { type: 'integer' } },
        'z.record(z.string(),z.int())',
      ],
      // record with boolean values
      [
        { type: 'object', additionalProperties: { type: 'boolean' } },
        'z.record(z.string(),z.boolean())',
      ],
      // record with nested object values (inner required triggers .openapi)
      [
        {
          type: 'object',
          additionalProperties: {
            type: 'object',
            properties: { name: { type: 'string' } },
            required: ['name'],
          },
        },
        'z.record(z.string(),z.object({name:z.string()}).openapi({"required":["name"]}))',
      ],
      // record with array values
      [
        {
          type: 'object',
          additionalProperties: { type: 'array', items: { type: 'string' } },
        },
        'z.record(z.string(),z.array(z.string()))',
      ],
    ])('object(%o) → %s', (input, expected) => {
      expect(object(input)).toBe(expected)
    })
  })

  describe('readonly modifier', () => {
    it.concurrent.each<[Schema, boolean | undefined, string]>([
      // readonly on simple object
      [
        {
          type: 'object',
          properties: { name: { type: 'string' } },
          required: ['name'],
        },
        true,
        'z.object({name:z.string()}).readonly()',
      ],
      // readonly on object with optional property
      [
        {
          type: 'object',
          properties: { name: { type: 'string' }, age: { type: 'integer' } },
          required: ['name'],
        },
        true,
        'z.object({name:z.string(),age:z.int().exactOptional()}).readonly()',
      ],
      // readonly on strict object
      [
        {
          type: 'object',
          properties: { id: { type: 'integer' } },
          required: ['id'],
          additionalProperties: false,
        },
        true,
        'z.strictObject({id:z.int()}).readonly()',
      ],
      // readonly on loose object
      [
        {
          type: 'object',
          properties: { id: { type: 'integer' } },
          required: ['id'],
          additionalProperties: true,
        },
        true,
        'z.looseObject({id:z.int()}).readonly()',
      ],
      // readonly on record type
      [
        { type: 'object', additionalProperties: { type: 'string' } },
        true,
        'z.record(z.string(),z.string()).readonly()',
      ],
      // readonly false should not add .readonly()
      [
        {
          type: 'object',
          properties: { name: { type: 'string' } },
          required: ['name'],
        },
        false,
        'z.object({name:z.string()})',
      ],
      // readonly undefined should not add .readonly()
      [
        {
          type: 'object',
          properties: { name: { type: 'string' } },
          required: ['name'],
        },
        undefined,
        'z.object({name:z.string()})',
      ],
    ])('object(%o, %s) → %s', (input, readonly, expected) => {
      expect(object(input, readonly)).toBe(expected)
    })
  })

  describe('nested objects', () => {
    it.concurrent.each<[Schema, string]>([
      // nested object with required property (inner required triggers .openapi)
      [
        {
          type: 'object',
          properties: {
            address: {
              type: 'object',
              properties: {
                street: { type: 'string' },
                city: { type: 'string' },
              },
              required: ['street', 'city'],
            },
          },
          required: ['address'],
        },
        'z.object({address:z.object({street:z.string(),city:z.string()}).openapi({"required":["street","city"]})})',
      ],
      // nested object as optional property
      [
        {
          type: 'object',
          properties: {
            metadata: {
              type: 'object',
              properties: {
                key: { type: 'string' },
              },
            },
          },
        },
        'z.object({metadata:z.object({key:z.string().exactOptional()}).exactOptional()})',
      ],
      // multiple properties with mixed types (no inner required array)
      [
        {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            active: { type: 'boolean' },
            score: { type: 'number' },
            tags: { type: 'array', items: { type: 'string' } },
          },
          required: ['id', 'name'],
        },
        'z.object({id:z.int(),name:z.string(),active:z.boolean().exactOptional(),score:z.number().exactOptional(),tags:z.array(z.string()).exactOptional()})',
      ],
    ])('object(%o) → %s', (input, expected) => {
      expect(object(input)).toBe(expected)
    })
  })

  describe('empty object', () => {
    it.concurrent.each<[Schema, string]>([
      // empty object with no properties
      [{ type: 'object' }, 'z.object({})'],
      // empty strict object
      [{ type: 'object', additionalProperties: false }, 'z.strictObject({})'],
      // empty loose object
      [{ type: 'object', additionalProperties: true }, 'z.looseObject({})'],
    ])('object(%o) → %s', (input, expected) => {
      expect(object(input)).toBe(expected)
    })
  })

  describe('combined x-* messages', () => {
    it.concurrent.each<[Schema, string]>([
      // all constraints with separate messages
      [
        {
          type: 'object',
          minProperties: 1,
          maxProperties: 10,
          propertyNames: { pattern: '^[a-z]+$' },
          dependentRequired: { email: ['name'] },
          'x-minimum-message': '最低1つ',
          'x-maximum-message': '最大10',
          'x-propertyNames-message': 'キー名は小文字',
          'x-dependentRequired-message': 'emailにはnameが必要',
        },
        `z.object({}).refine((o)=>Object.keys(o).length>=1,{error:"最低1つ"}).refine((o)=>Object.keys(o).length<=10,{error:"最大10"}).refine((o)=>Object.keys(o).every((k)=>new RegExp("^[a-z]+$").test(k)),{error:"キー名は小文字"}).refine((o)=>!('email' in o)||('name' in o),{error:"emailにはnameが必要"})`,
      ],
      // x-error-message as fallback for dependentRequired, independent min/max
      [
        {
          type: 'object',
          minProperties: 2,
          dependentRequired: { a: ['b'] },
          'x-error-message': 'オブジェクトエラー',
          'x-minimum-message': '最低2つ必要',
        },
        `z.object({}).refine((o)=>Object.keys(o).length>=2,{error:"最低2つ必要"}).refine((o)=>!('a' in o)||('b' in o),{error:"オブジェクトエラー"})`,
      ],
    ])('object(%o) → %s', (input, expected) => {
      expect(object(input)).toBe(expected)
    })
  })

  describe('combinator delegation', () => {
    it.concurrent('delegates oneOf to zodToOpenAPI', () => {
      const result = object({
        oneOf: [{ type: 'string' }, { type: 'number' }],
      })
      expect(result.includes('z.')).toBe(true)
    })

    it.concurrent('delegates anyOf to zodToOpenAPI', () => {
      const result = object({
        anyOf: [{ type: 'string' }, { type: 'integer' }],
      })
      expect(result.includes('z.')).toBe(true)
    })

    it.concurrent('delegates allOf to zodToOpenAPI', () => {
      const result = object({
        allOf: [
          { type: 'object', properties: { a: { type: 'string' } } },
          { type: 'object', properties: { b: { type: 'number' } } },
        ],
      })
      expect(result.includes('z.')).toBe(true)
    })
  })
})
