import { describe, expect, test } from 'vitest'
import { generateZodObject } from './generate-zod-object'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-object.test.ts

describe('generateZodObject Test', () => {
  test.concurrent('generateZodObject -> z.object({}))', () => {
    const result = generateZodObject(
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

  test.concurrent('generateZodObject -> z.object({type:z.enum(["A","B","C"])})', () => {
    const result = generateZodObject(
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

  test.concurrent('should throw an error when schema is null', () => {
    // biome-ignore lint:
    const schema = null as any
    expect(() =>
      generateZodObject(schema, {
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

  test.concurrent('should throw an error when schema is undefined', () => {
    // biome-ignore lint:
    const schema = undefined as any
    expect(() =>
      generateZodObject(schema, {
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
