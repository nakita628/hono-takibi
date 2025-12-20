import { describe, expect, it } from 'vitest'
import type { Components } from '../../../../openapi/index.js'
import { type ComponentsExportOptions, componentsCode } from './index.js'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/components/index.test.ts

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
  const baseOptions: ComponentsExportOptions = {
    exportSchemasTypes: false,
    exportSchemas: false,
    exportParametersTypes: false,
    exportParameters: false,
    exportSecuritySchemes: false,
    exportRequestBodies: false,
    exportResponses: false,
    exportHeadersTypes: false,
    exportHeaders: false,
    exportExamples: false,
    exportLinks: false,
    exportCallbacks: false,
  }
  // #1: exportSchema=true, exportType=true
  it.concurrent('exportSchema=true, exportType=true', () => {
    const result = componentsCode(testComponents, {
      ...baseOptions,
      exportSchemas: true,
      exportSchemasTypes: true,
    })
    const expected = `export const TestSchema = z.object({test:z.string()}).openapi('Test')

export type Test = z.infer<typeof TestSchema>`
    expect(result).toBe(expected)
  })
  // #2: exportSchema=true, exportType=false
  it.concurrent('exportSchema=true, exportType=false', () => {
    const result = componentsCode(testComponents, {
      ...baseOptions,
      exportSchemas: true,
      exportSchemasTypes: false,
    })
    const expected = `export const TestSchema = z.object({test:z.string()}).openapi('Test')

`
    expect(result).toBe(expected)
  })
  // #3: exportSchema=false, exportType=true
  it.concurrent('exportSchema=false, exportType=true', () => {
    const result = componentsCode(testComponents, {
      ...baseOptions,
      exportSchemas: false,
      exportSchemasTypes: true,
    })
    const expected = `const TestSchema = z.object({test:z.string()}).openapi('Test')

export type Test = z.infer<typeof TestSchema>`
    expect(result).toBe(expected)
  })
  // #4: exportSchema=false, exportType=false
  it.concurrent('exportSchema=false, exportType=false', () => {
    const result = componentsCode(testComponents, baseOptions)
    const expected = `const TestSchema = z.object({test:z.string()}).openapi('Test')

`
    expect(result).toBe(expected)
  })
})
