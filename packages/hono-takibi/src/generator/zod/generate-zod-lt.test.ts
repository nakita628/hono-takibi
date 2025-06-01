import { describe, it, expect } from 'vitest'
import { generateZodLt } from './generate-zod-lt'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-lt.test.ts

describe('generateZodLt Test', () => {
  it.concurrent('generateZodLt(1) -> .lt(1)', () => {
    const result = generateZodLt(1)
    const expected = '.lt(1)'
    expect(result).toBe(expected)
  })

  it.concurrent('generateZodLt(10) -> .lt(10)', () => {
    const result = generateZodLt(10)
    const expected = '.lt(10)'
    expect(result).toBe(expected)
  })
})
