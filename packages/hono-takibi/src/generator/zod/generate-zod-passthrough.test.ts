import { describe, it, expect } from 'vitest'
import { generateZodPassthrough } from './generate-zod-passthrough'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-passthrough.test.ts

describe('generateZodPassthrough Test', () => {
  it.concurrent(`generateZodPassthrough('z.object({})') -> z.object({}).passthrough()`, () => {
    const result = generateZodPassthrough('z.object({})')
    const expected = 'z.object({}).passthrough()'
    expect(result).toBe(expected)
  })
})
