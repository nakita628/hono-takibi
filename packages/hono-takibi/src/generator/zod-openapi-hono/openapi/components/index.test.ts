import { describe, expect, it } from 'vitest'
import type { Components } from '../../../../openapi/index.js'
import { componentsCode } from './index.js'

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

describe('componentsCode Test', () => {
  // #1: exportSchemasTypes=true, exportSchemas=true
  it.concurrent('exportSchemasTypes=true, exportSchemas=true', () => {
    const result = componentsCode(testComponents, {
      exportSchemasTypes: true,
      exportSchemas: true,
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
    })
    const expected = `export const TestSchema = z.object({test:z.string()}).openapi({"required":["test"]}).openapi('Test')

export type Test = z.infer<typeof TestSchema>`
    expect(result).toBe(expected)
  })
  // #2: exportSchemasTypes=true, exportSchemas=false
  it.concurrent('exportSchemasTypes=true, exportSchemas=false', () => {
    const result = componentsCode(testComponents, {
      exportSchemasTypes: true,
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
    })
    const expected = `const TestSchema = z.object({test:z.string()}).openapi({"required":["test"]}).openapi('Test')

export type Test = z.infer<typeof TestSchema>`
    expect(result).toBe(expected)
  })
  // #3: exportSchemasTypes=false, exportSchemas=true
  it.concurrent('exportSchemasTypes=false, exportSchemas=true', () => {
    const result = componentsCode(testComponents, {
      exportSchemasTypes: false,
      exportSchemas: true,
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
    })
    const expected = `export const TestSchema = z.object({test:z.string()}).openapi({"required":["test"]}).openapi('Test')`
    expect(result).toBe(expected)
  })
  // #4: exportSchemasTypes=false, exportSchemas=false
  it.concurrent('exportSchemasTypes=false, exportSchemas=false', () => {
    const result = componentsCode(testComponents, {
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
    })
    const expected = `const TestSchema = z.object({test:z.string()}).openapi({"required":["test"]}).openapi('Test')`
    expect(result).toBe(expected)
  })
})
