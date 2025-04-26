import { describe, test, expect } from 'vitest'
import { generatePropertySchema } from './generate-zod-property-schema'

// Test run
// pnpm vitest run ./src/generator/zod/property/generate-zod-property-schema.test.ts

describe('generatePropertySchema Test', () => {
  test.concurrent('generatePropertySchema -> TestSchema', () => {
    const result = generatePropertySchema(
      {
        $ref: '#/components/schemas/Test',
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

    const expected = 'TestSchema'
    expect(result).toBe(expected)
  })

  test.concurrent('generatePropertySchema -> z.string()', () => {
    const result = generatePropertySchema(
      {
        type: 'string',
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

    const expected = 'z.string()'
    expect(result).toBe(expected)
  })

  test.concurrent('generatePropertySchema -> z.number()', () => {
    const result = generatePropertySchema(
      {
        type: 'number',
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

    const expected = 'z.number()'
    expect(result).toBe(expected)
  })

  test.concurrent('generatePropertySchema -> z.any', () => {
    const result = generatePropertySchema(
      {
        $ref: '',
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

    const expected = 'z.any()'
    expect(result).toBe(expected)
  })

  test.concurrent('generatePropertySchema -> z.array(z.any())', () => {
    const result = generatePropertySchema(
      {
        type: 'array',
        items: {
          $ref: '',
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

    const expected = 'z.array(z.any())'
    expect(result).toBe(expected)
  })

  test.concurrent('generatePropertySchema -> z.array(TestSchema)', () => {
    const result = generatePropertySchema(
      {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Test',
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

    const expected = 'z.array(TestSchema)'
    expect(result).toBe(expected)
  })

  test.concurrent('generatePropertySchema -> z.string().email()', () => {
    const result = generatePropertySchema(
      { type: 'string', format: 'email' },
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

    const expected = 'z.string().email()'
    expect(result).toBe(expected)
  })

  test.concurrent('generatePropertySchema -> z.string().uuid()', () => {
    const result = generatePropertySchema(
      { type: 'string', format: 'uuid' },
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

    const expected = 'z.string().uuid()'
    expect(result).toBe(expected)
  })

  test.concurrent('generatePropertySchema -> z.string().datetime()', () => {
    const result = generatePropertySchema(
      { type: 'string', format: 'date-time' },
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

    const expected = 'z.string().datetime()'
    expect(result).toBe(expected)
  })

  test.concurrent('generatePropertySchema -> z.enum(["a","b","c"])', () => {
    const result = generatePropertySchema(
      { type: 'string', enum: ['a', 'b', 'c'] },
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

    const expected = 'z.enum(["a","b","c"])'
    expect(result).toBe(expected)
  })
})
