import { describe, it, expect } from 'vitest'
import { object } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/object.test.ts

describe('object Test', () => {
  it.concurrent('object -> z.object({}))', () => {
    const result = object(
      {
        type: 'object',
        nullable: true,
      },
      {
        schema: {
          name: 'PascalCase',
          export: false,
        },
        type: {
          name: 'PascalCase',
          export: false,
        },
      },
    )

    const expected = 'z.object({})'
    expect(result).toBe(expected)
  })

  it.concurrent('object -> z.object({type:z.enum(["A","B","C"])})', () => {
    const result = object(
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
      {
        schema: {
          name: 'PascalCase',
          export: false,
        },
        type: {
          name: 'PascalCase',
          export: false,
        },
      },
    )

    const expected = 'z.object({type:z.enum(["A","B","C"])})'
    expect(result).toBe(expected)
  })

  it.concurrent('should throw an error when schema is null', () => {
    // biome-ignore lint:
    const schema = null as any
    expect(() =>
      object(schema, {
        schema: {
          name: 'PascalCase',
          export: false,
        },
        type: {
          name: 'PascalCase',
          export: false,
        },
      }),
    ).toThrow('Cannot read properties of null')
  })

  it.concurrent('should throw an error when schema is undefined', () => {
    // biome-ignore lint:
    const schema = undefined as any
    expect(() =>
      object(schema, {
        schema: {
          name: 'PascalCase',
          export: false,
        },
        type: {
          name: 'PascalCase',
          export: false,
        },
      }),
    ).toThrow(`Cannot read properties of undefined (reading 'additionalProperties')`)
  })
})
