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
})
