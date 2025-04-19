import { describe, test, expect } from 'vitest'
import { generateComponentsCode } from './generate-components-code'
import type { Components } from '../../../../type'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/component/generate-components-code.test.ts

const testComponents: Components = {
  schemas: {
    Test: {
      type: 'object',
      required: ['test'],
      properties: {
        test: {
          type: 'string',
        },
      },
    },
  },
}

describe('generateComponentsCode Test', () => {
  test('schema name PascalCase export true type PascalCase export true', () => {
    const result = generateComponentsCode(testComponents, {
      schema: { name: 'PascalCase', export: true },
      type: { name: 'PascalCase', export: true },
    })

    const expected = `export const TestSchema = z.object({test:z.string()}).openapi('Test')

export type Test = z.infer<typeof TestSchema>`
    expect(result).toBe(expected)
  })

  test('schema name PascalCase export true type PascalCase export false', () => {
    const result = generateComponentsCode(testComponents, {
      schema: { name: 'PascalCase', export: true },
      type: { name: 'PascalCase', export: false },
    })

    const expected = `export const TestSchema = z.object({test:z.string()}).openapi('Test')

`

    expect(result).toBe(expected)
  })
})
