import { describe, expect, test } from 'vitest'
import { zodToOpenAPISchema } from './zod-to-openapi-schema'

// Test run
// pnpm vitest run ./src/helper/zod-to-openapi-schema.test.ts

describe('zodToOpenAPISchema', () => {
  test.concurrent('zodToOpenAPISchema success', () => {
    const result = zodToOpenAPISchema(
      'Test',
      'z.object({test:z.string().openapi({example:"test"})})',
      false,
      false,
    )
    const expected = `const TestSchema = z.object({test:z.string().openapi({example:"test"})}).openapi('Test')

`
    expect(result).toBe(expected)
  })
})
