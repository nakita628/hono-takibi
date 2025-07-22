import { describe, expect, it } from 'vitest'
import { object } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/z/object.test.ts

describe('object Test', () => {
  it.concurrent('object -> z.object({}))', () => {
    const result = object({
      type: 'object',
      nullable: true,
    })

    const expected = 'z.object({})'
    expect(result).toBe(expected)
  })

  it.concurrent('object -> z.object({type:z.enum(["A","B","C"])})', () => {
    const result = object({
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
    })

    const expected = 'z.object({type:z.enum(["A","B","C"])})'
    expect(result).toBe(expected)
  })

  it.concurrent('zod looseObject', () => {
    const result = object({
      type: 'object',
      properties: {
        test: {
          type: 'string',
        },
      },
      required: ['test'],
      additionalProperties: true,
    })

    const expected = 'z.looseObject({test:z.string()})'
    expect(result).toBe(expected)
  })

  it.concurrent('zod strictObject', () => {
    const result = object({
      type: 'object',
      properties: {
        test: {
          type: 'string',
        },
      },
      required: ['test'],
      additionalProperties: false,
    })

    const expected = 'z.strictObject({test:z.string()})'
    expect(result).toBe(expected)
  })
})
