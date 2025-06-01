import { describe, it, expect } from 'vitest'
import { generateReferenceSchema } from './generate-reference-schema'

// Test run
// pnpm vitest run ./src/generator/zod/reference/generate-reference-schema.test.ts

describe('generateReferenceSchema Test', () => {
  it.concurrent('generateReferenceSchema -> TestSchema', () => {
    const result = generateReferenceSchema(
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

  it.concurrent('generateReferenceSchema -> z.any()', () => {
    const result = generateReferenceSchema(
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
})
