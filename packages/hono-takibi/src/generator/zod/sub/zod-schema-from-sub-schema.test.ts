import { describe, expect, test } from 'vitest'
import { zodSchemaFromSubSchema } from './zod-schema-from-sub-schema'

// Test run
// pnpm vitest run ./src/generator/zod/sub/zod-schema-from-sub-schema.test.ts

describe('zodSchemaFromSubSchema', () => {
  test.concurrent('zodSchemaFromSubSchema -> TestSchema', () => {
    const result = zodSchemaFromSubSchema({ $ref: '#/components/schemas/Test' })

    const expected = 'TestSchema'
    expect(result).toBe(expected)
  })

  test.concurrent('zodSchemaFromSubSchema -> z.object({test:z.enum(["A","B","C"])})', () => {
    const result = zodSchemaFromSubSchema({
      type: 'object',
      properties: {
        test: {
          type: 'string',
          enum: ['A', 'B', 'C'],
        },
      },
      required: ['test'],
    })

    const expected = 'z.object({test:z.enum(["A","B","C"])})'
    expect(result).toBe(expected)
  })
})
