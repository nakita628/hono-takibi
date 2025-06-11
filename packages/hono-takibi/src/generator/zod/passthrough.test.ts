import { describe, it, expect } from 'vitest'
import { passthrough } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/passthrough.test.ts

describe('passthrough Test', () => {
  it.concurrent(`passthrough('z.object({})') -> z.object({}).passthrough()`, () => {
    const result = passthrough('z.object({})')
    const expected = 'z.object({}).passthrough()'
    expect(result).toBe(expected)
  })
})
