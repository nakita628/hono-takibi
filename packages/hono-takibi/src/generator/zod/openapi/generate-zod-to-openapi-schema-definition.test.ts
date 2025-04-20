import { describe, test, expect } from 'vitest'
import { generateZodToOpenAPISchemaDefinition } from './generate-zod-to-openapi-schema-definition'

// Test run
// pnpm vitest run ./src/generator/zod/openapi/generate-zod-to-openapi-schema-definition.test.ts

describe('generateZodToOpenAPISchemaDefinition Test', () => {
  test.concurrent('generateZodToOpenAPISchemaDefinition success', () => {
    const result = generateZodToOpenAPISchemaDefinition(
      'Test',
      'z.object({test:z.string().openapi({example:"test"})})',
      {
        schema: {
          name: 'PascalCase',
          export: false,
        },
        type: {
          name: 'PascalCase',
          export: false,
        },
      },
    )
    const expected = `const TestSchema = z.object({test:z.string().openapi({example:"test"})}).openapi('Test')

`
    expect(result).toBe(expected)
  })
})
