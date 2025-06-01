import { describe, it, expect } from 'vitest'
import { generateZodGt } from './generate-zod-gt'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-gt.test.ts

describe('generateZodGt Test', () => {
  it.concurrent('generateZodGt(0) -> .gt(0)', () => {
    const result = generateZodGt(0)
    const expected = '.gt(0)'
    expect(result).toBe(expected)
  })

  it.concurrent('generateZodGt(10) -> .gt(10)', () => {
    const result = generateZodGt(10)
    const expected = '.gt(10)'
    expect(result).toBe(expected)
  })

  it.concurrent('generateZodGt(100) -> .gt(100)', () => {
    const result = generateZodGt(100)
    const expected = '.gt(100)'
    expect(result).toBe(expected)
  })
})
