import { describe, expect, test } from 'vitest'
import { generateZodLength } from './generate-zod-length'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-length.test.ts

describe('generateZodLength Test', () => {
  test.concurrent(`generateZodLength(1) -> .length(1)`, () => {
    const result = generateZodLength(1)
    const expected = '.length(1)'
    expect(result).toBe(expected)
  })

  test.concurrent(`generateZodLength(10) -> .length(10)`, () => {
    const result = generateZodLength(10)
    const expected = '.length(10)'
    expect(result).toBe(expected)
  })

  test.concurrent(`generateZodLength(100) -> .length(100)`, () => {
    const result = generateZodLength(100)
    const expected = '.length(100)'
    expect(result).toBe(expected)
  })
})
