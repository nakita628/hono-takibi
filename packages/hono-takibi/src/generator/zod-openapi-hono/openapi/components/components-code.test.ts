import { describe, expect, it } from 'vitest'
import type { Components } from '../../../../openapi/index.js'
import { componentsCode } from './components-code.js'

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
    const result = componentsCode(testComponents, true, true)
    const expected = `export const TestSchema = z.object({test:z.string()}).openapi('Test')

export type Test = z.infer<typeof TestSchema>`
    expect(result).toBe(expected)
  })
  // #2: exportSchema=true, exportType=false
  it.concurrent('exportSchema=true, exportType=false', () => {
    const result = componentsCode(testComponents, true, false)
    const expected = `export const TestSchema = z.object({test:z.string()}).openapi('Test')

`
    expect(result).toBe(expected)
  })
  // #3: exportSchema=false, exportType=true
  it.concurrent('exportSchema=false, exportType=true', () => {
    const result = componentsCode(testComponents, false, true)
    const expected = `const TestSchema = z.object({test:z.string()}).openapi('Test')

export type Test = z.infer<typeof TestSchema>`
    expect(result).toBe(expected)
  })
  // #4: exportSchema=false, exportType=false
  it.concurrent('exportSchema=false, exportType=false', () => {
    const result = componentsCode(testComponents, false, false)
    const expected = `const TestSchema = z.object({test:z.string()}).openapi('Test')

`
    expect(result).toBe(expected)
  })
})
