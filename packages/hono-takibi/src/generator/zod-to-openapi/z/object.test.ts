import { describe, expect, it } from 'vitest'
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

  describe('x-size-message', () => {
    it.concurrent.each<[Schema, string]>([
      // minProperties + x-size-message
      [
        { type: 'object', minProperties: 1, 'x-size-message': 'At least 1 property' },
        'z.object({}).refine((o)=>Object.keys(o).length>=1,{error:"At least 1 property"})',
      ],
      // maxProperties + x-size-message
      [
        { type: 'object', maxProperties: 5, 'x-size-message': 'At most 5 properties' },
        'z.object({}).refine((o)=>Object.keys(o).length<=5,{error:"At most 5 properties"})',
      ],
      // minProperties + maxProperties + x-size-message
      [
        {
          type: 'object',
          minProperties: 1,
          maxProperties: 10,
          'x-size-message': '1-10 properties',
        },
        'z.object({}).refine((o)=>Object.keys(o).length>=1,{error:"1-10 properties"}).refine((o)=>Object.keys(o).length<=10,{error:"1-10 properties"})',
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
})
