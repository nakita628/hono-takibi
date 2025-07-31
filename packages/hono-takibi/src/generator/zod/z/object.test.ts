import { describe, expect, it } from 'vitest'
import { object } from './object'

// Test run
// pnpm vitest run ./src/generator/zod/z/object.test.ts

describe('object', () => {
  it.concurrent('object({}) -> z.object({}))', () => {
    expect(object({})).toBe('z.object({})')
  })

  it.concurrent('object({ nullable: true }) -> z.object({}).nullable())', () => {
    expect(object({ nullable: true })).toBe('z.object({}).nullable()')
  })

  it.concurrent('object({ type: "null" }) -> z.object({}).nullable()', () => {
    expect(object({ type: 'null' })).toBe('z.object({}).nullable()')
  })

  it.concurrent('object -> z.object({type:z.enum(["A","B","C"])})', () => {
    expect(
      object({
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

  it.concurrent('looseObject', () => {
    expect(
      object({
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

  it.concurrent('strictObject', () => {
    expect(
      object({
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

  it('z.record(z.string(),z.uuid())', () => {
    expect(
      object({
        additionalProperties: { type: 'string', format: 'uuid' },
      }),
    ).toBe('z.record(z.string(),z.uuid())')
  })

  it('allOf', () => {
    expect(
      object({
        allOf: [
          {
            properties: { a: { type: 'string' } },
            required: ['a'],
          },
          {
            properties: { b: { type: 'integer' } },
            required: ['b'],
          },
        ],
        nullable: true,
      }),
    ).toBe('z.intersection(z.object({a:z.string()}),z.object({b:z.int()})).nullable()')
  })

  it('oneOf', () => {
    expect(
      object({
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
  })

  it('anyOf', () => {
    expect(
      object({
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
  })

  // default
  it.concurrent('default: { a: 1 } -> z.object({a:z.number()}).default({a:1})', () => {
    expect(
      object({
        properties: {
          a: { type: 'number' },
        },
        required: ['a'],
        default: { a: 1 },
      }),
    ).toBe('z.object({a:z.number()}).default({a:1})')
  })
})
