import { describe, test, expect } from 'vitest'
import { generateZodToOpenAPISchemaDefinition } from './generate-zod-to-openapi-schema-definition'

// Test run
// pnpm vitest run ./src/generator/zod-to-openapi/defining/generate-zod-to-openapi-schema-definition.test.ts

describe('generateZodToOpenAPISchemaDefinition Test', () => {
  test.concurrent('generateZodToOpenAPISchemaDefinition success', () => {
    const result = generateZodToOpenAPISchemaDefinition(
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
