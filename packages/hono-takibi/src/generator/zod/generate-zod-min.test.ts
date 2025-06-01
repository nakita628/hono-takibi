import { describe, it, expect } from 'vitest'
import { generateZodMin } from './generate-zod-min'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-min.test.ts

describe('generateZodMin Test', () => {
  it.concurrent('generateZodMin(1) -> .min(1)', () => {
    const result = generateZodMin(1)
    const expected = '.min(1)'
    expect(result).toBe(expected)
  })

  it.concurrent('generateZodMin(10) -> .min(10)', () => {
    const result = generateZodMin(10)
    const expected = '.min(10)'
    expect(result).toBe(expected)
  })
})
