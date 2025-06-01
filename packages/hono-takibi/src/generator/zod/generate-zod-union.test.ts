import { describe, it, expect } from 'vitest'
import { generateZodUnion } from './generate-zod-union'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-union.test.ts

describe('generateZodUnion Test', () => {
  it.concurrent(`generateZodUnion(['A', 'B']) -> z.union([A,B])`, () => {
    const result = generateZodUnion(['A', 'B'])
    const expected = 'z.union([A,B])'
    expect(result).toBe(expected)
  })
})
