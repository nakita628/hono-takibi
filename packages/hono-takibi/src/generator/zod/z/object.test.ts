import { describe, expect, it } from 'vitest'
import { object } from './object'

// Test run
// pnpm vitest run ./src/generator/zod/z/object.test.ts

describe('object', () => {
  // TODO nullable fix
  it.concurrent('object -> z.object({}))', () => {
    expect(
      object({
        nullable: true,
      }),
    ).toBe('z.object({})')
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
})
