import { describe, expect, test, it } from 'vitest'
import { generateZodDefault } from './generate-zod-default'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-default.test.ts

describe('generateZodDefault Test', () => {
  test.concurrent(`generateZodDefault(1) -> .default(1)`, () => {
    const result = generateZodDefault(1)
    const expected = '.default(1)'
    expect(result).toBe(expected)
  })

  test.concurrent(`generateZodDefault(10) -> .default(10)`, () => {
    const result = generateZodDefault(10)
    const expected = '.default(10)'
    expect(result).toBe(expected)
  })
})
