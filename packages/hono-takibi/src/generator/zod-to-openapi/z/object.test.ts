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

  describe('x-minProperties-message / x-maxProperties-message', () => {
    it.concurrent.each<[Schema, string]>([
      [
        { type: 'object', minProperties: 1, 'x-minProperties-message': 'At least 1 property' },
        'z.object({}).refine((val)=>Object.keys(val).length>=1,{error:"At least 1 property"})',
      ],
      [
        { type: 'object', maxProperties: 5, 'x-maxProperties-message': 'At most 5 properties' },
        'z.object({}).refine((val)=>Object.keys(val).length<=5,{error:"At most 5 properties"})',
      ],
      [
        {
          type: 'object',
          minProperties: 1,
          maxProperties: 10,
          'x-minProperties-message': 'At least 1',
          'x-maxProperties-message': 'At most 10',
        },
        'z.object({}).refine((val)=>Object.keys(val).length>=1,{error:"At least 1"}).refine((val)=>Object.keys(val).length<=10,{error:"At most 10"})',
      ],
    ])('object(%o) → %s', (input, expected) => {
      expect(object(input)).toBe(expected)
    })
  })

  describe('x-error-message (dependentRequired)', () => {
    it.concurrent.each<[Schema, string]>([
      // dependentRequired emits superRefine — one issue per missing dep
      // at `path:[d]`, x-error-message used as fallback when no
      // x-dependentRequired-message is set.
      [
        {
          type: 'object',
          dependentRequired: { foo: ['bar'] },
          'x-error-message': 'fooにはbarが必要',
        },
        `z.object({}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"foo")){return}if(!Object.hasOwn(o,"bar")){ctx.addIssue({code:'custom',message:"fooにはbarが必要",path:["bar"]})}})`,
      ],
    ])('object(%o) → %s', (input, expected) => {
      expect(object(input)).toBe(expected)
    })
  })

  describe('x-dependentRequired-message', () => {
    it.concurrent.each<[Schema, string]>([
      // dependentRequired uses superRefine, emits per-dep issues with
      // path:[d]. x-dependentRequired-message overrides x-error-message.
      [
        {
          type: 'object',
          dependentRequired: { foo: ['bar'] },
          'x-error-message': 'オブジェクト必須',
          'x-dependentRequired-message': 'fooにはbarが必要',
        },
        `z.object({}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"foo")){return}if(!Object.hasOwn(o,"bar")){ctx.addIssue({code:'custom',message:"fooにはbarが必要",path:["bar"]})}})`,
      ],
      // x-dependentRequired-message alone (no x-error-message)
      [
        {
          type: 'object',
          dependentRequired: { foo: ['bar'] },
          'x-dependentRequired-message': 'fooにはbarが必要',
        },
        `z.object({}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"foo")){return}if(!Object.hasOwn(o,"bar")){ctx.addIssue({code:'custom',message:"fooにはbarが必要",path:["bar"]})}})`,
      ],
      // fallback: no x-dependentRequired-message → x-error-message used
      [
        {
          type: 'object',
          dependentRequired: { foo: ['bar'] },
          'x-error-message': 'エラー',
        },
        `z.object({}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"foo")){return}if(!Object.hasOwn(o,"bar")){ctx.addIssue({code:'custom',message:"エラー",path:["bar"]})}})`,
      ],
      // no message at all → default 'requires "<dep>" when "<key>" present'
      [
        {
          type: 'object',
          dependentRequired: { foo: ['bar'] },
        },
        `z.object({}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"foo")){return}if(!Object.hasOwn(o,"bar")){ctx.addIssue({code:'custom',message:"requires \\"bar\\" when \\"foo\\" present",path:["bar"]})}})`,
      ],
      // multiple deps per key (foo requires both bar and baz)
      // each missing dep emits its own issue at path:[d]
      [
        {
          type: 'object',
          dependentRequired: { foo: ['bar', 'baz'] },
          'x-dependentRequired-message': '依存エラー',
        },
        `z.object({}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"foo")){return}if(!Object.hasOwn(o,"bar")){ctx.addIssue({code:'custom',message:"依存エラー",path:["bar"]})};if(!Object.hasOwn(o,"baz")){ctx.addIssue({code:'custom',message:"依存エラー",path:["baz"]})}})`,
      ],
      // multiple dependentRequired entries
      [
        {
          type: 'object',
          dependentRequired: { foo: ['bar'], baz: ['qux'] },
          'x-dependentRequired-message': '依存エラー',
        },
        `z.object({}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"foo")){return}if(!Object.hasOwn(o,"bar")){ctx.addIssue({code:'custom',message:"依存エラー",path:["bar"]})}}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"baz")){return}if(!Object.hasOwn(o,"qux")){ctx.addIssue({code:'custom',message:"依存エラー",path:["qux"]})}})`,
      ],
    ])('object(%o) → %s', (input, expected) => {
      expect(object(input)).toBe(expected)
    })
  })

  describe('x-propertyNames-message / x-patternProperties-message', () => {
    it.concurrent.each<[Schema, string]>([
      // propertyNames.pattern + x-propertyNames-message
      [
        {
          type: 'object',
          propertyNames: { pattern: '^[a-z]+$' },
          'x-propertyNames-message': 'Keys must be lowercase',
        },
        'z.looseObject({}).superRefine((o,ctx)=>{const regex=new RegExp("^[a-z]+$");for(const k of Object.keys(o)){if(!regex.test(k)){ctx.addIssue({code:"custom",path:[k],message:"Keys must be lowercase"})}}})',
      ],
      // propertyNames.enum + x-propertyNames-message
      [
        {
          type: 'object',
          propertyNames: { enum: ['a', 'b', 'c'] },
          'x-propertyNames-message': 'Keys must be a, b, or c',
        },
        'z.looseObject({}).superRefine((o,ctx)=>{const allowed=["a","b","c"];for(const k of Object.keys(o)){if(!allowed.includes(k)){ctx.addIssue({code:"custom",path:[k],message:"Keys must be a, b, or c"})}}})',
      ],
      // patternProperties + x-patternProperties-message
      // superRefine with closure-captured RegExp/Schema; the message
      // slot OVERRIDES inner sub-issue messages (path/code preserved).
      [
        {
          type: 'object',
          patternProperties: { '^S_': { type: 'string' } },
          'x-patternProperties-message': 'S_ prefixed keys must be strings',
        },
        'z.looseObject({}).superRefine((o,ctx)=>{const regex=new RegExp("^S_");const Schema=z.string();for(const [k,val] of Object.entries(o)){if(!regex.test(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[k,...issue.path],message:"S_ prefixed keys must be strings"})}}}})',
      ],
      // record path (additionalProperties: Schema) + x-propertyNames-message
      [
        {
          type: 'object',
          additionalProperties: { type: 'string' },
          propertyNames: { pattern: '^[a-z]+$' },
          'x-propertyNames-message': 'lowercase keys only',
        },
        'z.record(z.string(),z.string()).superRefine((o,ctx)=>{const regex=new RegExp("^[a-z]+$");for(const k of Object.keys(o)){if(!regex.test(k)){ctx.addIssue({code:"custom",path:[k],message:"lowercase keys only"})}}})',
      ],
      // record path (additionalProperties: Schema) + patternProperties + x-patternProperties-message
      // same superRefine pattern as object path
      [
        {
          type: 'object',
          additionalProperties: { type: 'number' },
          patternProperties: { '^x-': { type: 'string' } },
          'x-patternProperties-message': 'x- keys must be strings',
        },
        'z.record(z.string(),z.number()).superRefine((o,ctx)=>{const regex=new RegExp("^x-");const Schema=z.string();for(const [k,val] of Object.entries(o)){if(!regex.test(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[k,...issue.path],message:"x- keys must be strings"})}}}})',
      ],
    ])('object(%o) → %s', (input, expected) => {
      expect(object(input)).toBe(expected)
    })
  })

  describe('x-propertyNames-message (with x-patternProperties-message)', () => {
    it.concurrent.each<[Schema, string]>([
      // x-propertyNames-message alone
      [
        {
          type: 'object',
          propertyNames: { pattern: '^[a-z]+$' },
          'x-propertyNames-message': 'キー名は小文字のみ',
        },
        'z.looseObject({}).superRefine((o,ctx)=>{const regex=new RegExp("^[a-z]+$");for(const k of Object.keys(o)){if(!regex.test(k)){ctx.addIssue({code:"custom",path:[k],message:"キー名は小文字のみ"})}}})',
      ],
      // x-propertyNames-message with enum
      [
        {
          type: 'object',
          propertyNames: { enum: ['a', 'b', 'c'] },
          'x-propertyNames-message': 'a,b,cのみ',
        },
        'z.looseObject({}).superRefine((o,ctx)=>{const allowed=["a","b","c"];for(const k of Object.keys(o)){if(!allowed.includes(k)){ctx.addIssue({code:"custom",path:[k],message:"a,b,cのみ"})}}})',
      ],
      // x-propertyNames-message on record path
      [
        {
          type: 'object',
          additionalProperties: { type: 'string' },
          propertyNames: { pattern: '^[a-z]+$' },
          'x-propertyNames-message': 'キー名は小文字のみ',
        },
        'z.record(z.string(),z.string()).superRefine((o,ctx)=>{const regex=new RegExp("^[a-z]+$");for(const k of Object.keys(o)){if(!regex.test(k)){ctx.addIssue({code:"custom",path:[k],message:"キー名は小文字のみ"})}}})',
      ],
      // no message at all → no errorArg
      [
        {
          type: 'object',
          propertyNames: { pattern: '^[a-z]+$' },
        },
        // slot 未指定時は message field を完全省略し Zod default に委譲
        'z.looseObject({}).superRefine((o,ctx)=>{const regex=new RegExp("^[a-z]+$");for(const k of Object.keys(o)){if(!regex.test(k)){ctx.addIssue({code:"custom",path:[k]})}}})',
      ],
      // propertyNames + patternProperties with separate messages
      [
        {
          type: 'object',
          propertyNames: { pattern: '^[a-z]+$' },
          patternProperties: { '^x-': { type: 'string' } },
          'x-patternProperties-message': 'x-の値は文字列のみ',
          'x-propertyNames-message': 'キー名は小文字のみ',
        },
        'z.looseObject({}).superRefine((o,ctx)=>{const regex=new RegExp("^[a-z]+$");for(const k of Object.keys(o)){if(!regex.test(k)){ctx.addIssue({code:"custom",path:[k],message:"キー名は小文字のみ"})}}}).superRefine((o,ctx)=>{const regex=new RegExp("^x-");const Schema=z.string();for(const [k,val] of Object.entries(o)){if(!regex.test(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[k,...issue.path],message:"x-の値は文字列のみ"})}}}})',
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
        'z.looseObject({name:z.string()}).superRefine((o,ctx)=>{const regex=new RegExp("^[a-z]+$");for(const k of Object.keys(o)){if(!regex.test(k)){ctx.addIssue({code:"custom",path:[k],message:"キー名は小文字英字のみ"})}}})',
      ],
      // enum no message
      [
        {
          type: 'object',
          propertyNames: { enum: ['a', 'b'] },
        },
        // slot 未指定時は message field を完全省略し Zod default に委譲
        'z.looseObject({}).superRefine((o,ctx)=>{const allowed=["a","b"];for(const k of Object.keys(o)){if(!allowed.includes(k)){ctx.addIssue({code:"custom",path:[k]})}}})',
      ],
      // record path: no message
      [
        {
          type: 'object',
          additionalProperties: { type: 'string' },
          propertyNames: { pattern: '^[a-z]+$' },
        },
        // slot 未指定時は message field を完全省略し Zod default に委譲
        'z.record(z.string(),z.string()).superRefine((o,ctx)=>{const regex=new RegExp("^[a-z]+$");for(const k of Object.keys(o)){if(!regex.test(k)){ctx.addIssue({code:"custom",path:[k]})}}})',
      ],
      // record path: propertyNames + patternProperties with separate messages
      [
        {
          type: 'object',
          additionalProperties: { type: 'number' },
          propertyNames: { pattern: '^[a-z_]+$' },
          patternProperties: { '^x_': { type: 'integer' } },
          'x-patternProperties-message': 'x_の値は整数のみ',
          'x-propertyNames-message': 'キー名は英小文字とアンダースコアのみ',
        },
        'z.record(z.string(),z.number()).superRefine((o,ctx)=>{const regex=new RegExp("^[a-z_]+$");for(const k of Object.keys(o)){if(!regex.test(k)){ctx.addIssue({code:"custom",path:[k],message:"キー名は英小文字とアンダースコアのみ"})}}}).superRefine((o,ctx)=>{const regex=new RegExp("^x_");const Schema=z.int();for(const [k,val] of Object.entries(o)){if(!regex.test(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[k,...issue.path],message:"x_の値は整数のみ"})}}}})',
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
      expect(object(input, readonly === true ? { readonly: true } : undefined)).toBe(expected)
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
      // dependentRequired uses superRefine, emits per-dep issue at path:[d]
      [
        {
          type: 'object',
          minProperties: 1,
          maxProperties: 10,
          propertyNames: { pattern: '^[a-z]+$' },
          dependentRequired: { email: ['name'] },
          'x-minProperties-message': '最低1つ',
          'x-maxProperties-message': '最大10',
          'x-propertyNames-message': 'キー名は小文字',
          'x-dependentRequired-message': 'emailにはnameが必要',
        },
        `z.looseObject({}).refine((val)=>Object.keys(val).length>=1,{error:"最低1つ"}).refine((val)=>Object.keys(val).length<=10,{error:"最大10"}).superRefine((o,ctx)=>{const regex=new RegExp("^[a-z]+$");for(const k of Object.keys(o)){if(!regex.test(k)){ctx.addIssue({code:"custom",path:[k],message:"キー名は小文字"})}}}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"email")){return}if(!Object.hasOwn(o,"name")){ctx.addIssue({code:'custom',message:"emailにはnameが必要",path:["name"]})}})`,
      ],
      // x-error-message as fallback for dependentRequired, independent minProperties
      [
        {
          type: 'object',
          minProperties: 2,
          dependentRequired: { a: ['b'] },
          'x-error-message': 'オブジェクトエラー',
          'x-minProperties-message': '最低2つ必要',
        },
        `z.object({}).refine((val)=>Object.keys(val).length>=2,{error:"最低2つ必要"}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"a")){return}if(!Object.hasOwn(o,"b")){ctx.addIssue({code:'custom',message:"オブジェクトエラー",path:["b"]})}})`,
      ],
    ])('object(%o) → %s', (input, expected) => {
      expect(object(input)).toBe(expected)
    })
  })

  describe('combinator delegation', () => {
    it.concurrent('delegates oneOf to zodToOpenAPI', () => {
      expect(object({ oneOf: [{ type: 'string' }, { type: 'number' }] })).toBe(
        'z.xor([z.string(),z.number()])',
      )
    })

    it.concurrent('delegates anyOf to zodToOpenAPI', () => {
      expect(object({ anyOf: [{ type: 'string' }, { type: 'integer' }] })).toBe(
        'z.union([z.string(),z.int()])',
      )
    })

    it.concurrent('delegates allOf to zodToOpenAPI', () => {
      expect(
        object({
          allOf: [
            { type: 'object', properties: { a: { type: 'string' } } },
            { type: 'object', properties: { b: { type: 'number' } } },
          ],
        }),
      ).toBe(
        'z.object({a:z.string().exactOptional()}).and(z.object({b:z.number().exactOptional()}))',
      )
    })
  })
})

describe('object if/then/else split-branch (per-branch message override)', () => {
  it.concurrent('emits split if/else when x-then-message is present', () => {
    expect(
      object({
        type: 'object',
        if: { type: 'object', properties: { a: { type: 'string' } } },
        // oxlint-disable-next-line no-thenable -- JSON Schema `then` keyword as property name (essential)
        then: { type: 'object', properties: { b: { type: 'number' } } },
        else: { type: 'object', properties: { c: { type: 'boolean' } } },
        'x-then-message': 'then failed',
      } as Schema),
    ).toBe(
      `z.object({}).superRefine((o,ctx)=>{const If=z.object({a:z.string().exactOptional()});const ifOk=If.safeParse(o).success;if(ifOk){const Branch=z.object({b:z.number().exactOptional()});if(!Branch){return}const result=Branch.safeParse(o);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path,message:"then failed"})}}}else{const Branch=z.object({c:z.boolean().exactOptional()});if(!Branch){return}const result=Branch.safeParse(o);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path})}}}})`,
    )
  })

  it.concurrent('emits merged ternary branch when no per-branch message is present', () => {
    expect(
      object({
        type: 'object',
        if: { type: 'object', properties: { a: { type: 'string' } } },
        // oxlint-disable-next-line no-thenable -- JSON Schema `then` keyword as property name (essential)
        then: { type: 'object', properties: { b: { type: 'number' } } },
        else: { type: 'object', properties: { c: { type: 'boolean' } } },
      } as Schema),
    ).toBe(
      `z.object({}).superRefine((o,ctx)=>{const If=z.object({a:z.string().exactOptional()});const ifOk=If.safeParse(o).success;const Branch=ifOk?z.object({b:z.number().exactOptional()}):z.object({c:z.boolean().exactOptional()});if(!Branch){return}const result=Branch.safeParse(o);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path})}}})`,
    )
  })
})
