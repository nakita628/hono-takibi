import { describe, expect, test } from 'vitest'
import { generateZodNullable } from './generate-zod-nullable'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-nullable.test.ts

describe('generateZodNullable Test', () => {
  test.concurrent(`generateZodNullable() -> '.nullable()'`, () => {
    const nullable = true
    const result = nullable ? generateZodNullable() : ''
    const expected = '.nullable()'
    expect(result).toBe(expected)
  })

  test.concurrent(`generateZodNullable() -> ''`, () => {
    const nullable = false
    const result = nullable ? generateZodNullable() : ''
    const expected = ''
    expect(result).toBe(expected)
  })
})
