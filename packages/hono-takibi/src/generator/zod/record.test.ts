import { describe, it, expect } from 'vitest'
import { record } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/record.test.ts

describe('record Test', () => {
  it.concurrent('record -> z.record(z.string(),z.number().int())', () => {
    const result = record(
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
