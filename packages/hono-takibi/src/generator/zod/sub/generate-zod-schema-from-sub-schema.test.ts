import { describe, expect, test } from 'vitest'
import { generateZodSchemaFromSubSchema } from './generate-zod-schema-from-sub-schema'

// Test run
// pnpm vitest run ./src/generator/zod/sub/generate-zod-schema-from-sub-schema.test.ts

describe('generateZodSchemaFromSubSchema', () => {
  test.concurrent('generateZodSchemaFromSubSchema -> TestSchema', () => {
    const result = generateZodSchemaFromSubSchema(
      { $ref: '#/components/schemas/Test' },
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

  test.concurrent(
    'generateZodSchemaFromSubSchema -> z.object({test:z.enum(["A","B","C"])})',
    () => {
      const result = generateZodSchemaFromSubSchema(
        {
          type: 'object',
          properties: {
            test: {
              type: 'string',
              enum: ['A', 'B', 'C'],
            },
          },
          required: ['test'],
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

      const expected = 'z.object({test:z.enum(["A","B","C"])})'
      expect(result).toBe(expected)
    },
  )
})
