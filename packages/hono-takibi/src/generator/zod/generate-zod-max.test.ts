import { describe, it, expect } from 'vitest'
import { generateZodMax } from './generate-zod-max'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-max.test.ts

describe('generateZodMax Test', () => {
  it.concurrent('generateZodMax(1) -> .max(1)', () => {
    const result = generateZodMax(1)
    const expected = '.max(1)'
    expect(result).toBe(expected)
  })

  it.concurrent('generateZodMax(10) -> .max(10)', () => {
    const result = generateZodMax(10)
    const expected = '.max(10)'
    expect(result).toBe(expected)
  })
})
