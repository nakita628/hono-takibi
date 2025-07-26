import { describe, expect, it } from 'vitest'
import { record } from './record.js'

// Test run
// pnpm vitest run ./src/generator/zod/z/record.test.ts

describe('record Test', () => {
  it.concurrent('record -> z.record(z.string(),z.int())', () => {
    const result = record({ type: 'integer', format: 'int32' })

    const expected = 'z.record(z.string(),z.int32())'
    expect(result).toBe(expected)
  })
})
