import { describe, it, expect } from 'vitest'
import { generateArrayReferenceSchema } from './generate-array-reference-schema'

// Test run
// pnpm vitest run ./src/generator/zod/reference/generate-array-reference-schema.test.ts

describe('generateArrayReferenceSchema Test', () => {
  it.concurrent('generateArrayReferenceSchema -> z.array(TestSchema)', () => {
    const result = generateArrayReferenceSchema(
      {
        type: 'array',
        items: { $ref: '#/components/schemas/Test' },
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

  it.concurrent('generateArrayReferenceSchema -> z.array(z.any())', () => {
    const result = generateArrayReferenceSchema(
      {
        type: 'array',
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
})
