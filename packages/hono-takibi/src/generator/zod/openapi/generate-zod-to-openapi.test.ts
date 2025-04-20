import { describe, test, expect } from 'vitest'
import { generateZodToOpenAPI } from './generate-zod-to-openapi'

// Test run
// pnpm vitest run ./src/generator/zod/openapi/generate-zod-to-openapi.test.ts

describe('generateZodToOpenAPI Test', () => {
  test.concurrent('generateZodToOpenAPI success', () => {
    const result = generateZodToOpenAPI('Test')
    const expected = '.openapi({example:"Test"})'
    expect(result).toBe(expected)
  })
})
