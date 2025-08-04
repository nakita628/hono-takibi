import { describe, expect, it } from 'vitest'
import { object } from './object'

// Test run
// pnpm vitest run ./src/generator/zod/z/object.test.ts

describe('object', () => {
  it.concurrent('object({}) -> z.object({}))', () => {
    expect(object({})).toBe('z.object({})')
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
})
