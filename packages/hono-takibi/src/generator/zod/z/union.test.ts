import { describe, expect, it } from 'vitest'
import { union } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/z/union.test.ts

describe('union Test', () => {
  it.concurrent(`union(['A', 'B']) -> z.union([A,B])`, () => {
    const result = union(['A', 'B'])
    const expected = 'z.union([A,B])'
    expect(result).toBe(expected)
  })
})
