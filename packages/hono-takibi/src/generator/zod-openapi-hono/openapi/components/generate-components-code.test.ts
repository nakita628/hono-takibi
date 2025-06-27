import { describe, it, expect } from 'vitest'
import { generateComponentsCode } from './generate-components-code.js'
import type { Components } from '../../../../openapi/index.js'

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
  // #1: exportSchema=true, exportType=true
  it.concurrent('exportSchema=true, exportType=true', () => {
    const result = generateComponentsCode(testComponents, true, true)
    const expected = `export const TestSchema = z.object({test:z.string()}).openapi('Test')

export type Test = z.infer<typeof TestSchema>`
    expect(result).toBe(expected)
  })
  // #2: exportSchema=true, exportType=false
  it.concurrent('exportSchema=true, exportType=false', () => {
    const result = generateComponentsCode(testComponents, true, false)
    const expected = `export const TestSchema = z.object({test:z.string()}).openapi('Test')

`
    expect(result).toBe(expected)
  })
  // #3: exportSchema=false, exportType=true
  it.concurrent('exportSchema=false, exportType=true', () => {
    const result = generateComponentsCode(testComponents, false, true)
    const expected = `const TestSchema = z.object({test:z.string()}).openapi('Test')

export type Test = z.infer<typeof TestSchema>`
    expect(result).toBe(expected)
  })
  // #4: exportSchema=false, exportType=false
  it.concurrent('exportSchema=false, exportType=false', () => {
    const result = generateComponentsCode(testComponents, false, false)
    const expected = `const TestSchema = z.object({test:z.string()}).openapi('Test')

`
    expect(result).toBe(expected)
  })
})
