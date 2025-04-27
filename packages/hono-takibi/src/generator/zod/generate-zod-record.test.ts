import { describe, expect, test } from 'vitest'
import { generateZodRecord } from './generate-zod-record'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-record.test.ts

describe('generateZodRecord Test', () => {
  test.concurrent('generateZodRecord -> z.record(z.string(),z.number().int())', () => {
    const result = generateZodRecord(
      { type: 'integer', format: 'int32' },
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

    const expected = 'z.record(z.string(),z.number().int())'
    expect(result).toBe(expected)
  })
})
