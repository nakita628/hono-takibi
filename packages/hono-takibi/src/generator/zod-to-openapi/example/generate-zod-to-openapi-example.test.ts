import { describe, it, expect } from 'vitest'
import { generateZodToOpenAPIExample } from './generate-zod-to-openapi-example'

// Test run
// pnpm vitest run ./src/generator/zod-to-openapi/example/generate-zod-to-openapi-example.test.ts

describe('generateZodToOpenApiExample Test', () => {
  it.concurrent(
    `generateZodToOpenApiExample('z.string()', 'example') -> 'z.string().openapi({example:"example"})'`,
    () => {
      const zod = 'z.string()'
      const example = 'example'
      const result = generateZodToOpenAPIExample(zod, example)
      const expected = `z.string().openapi({example:"example"})`
      expect(result).toBe(expected)
    },
  )

  it.concurrent(
    `generateZodToOpenApiExample('z.string()', 'example', 'id') -> 'z.string().openapi({param:{name:'id',in:'path'},example:"example"})'`,
    () => {
      const zod = 'z.string()'
      const example = 'example'
      const paramName = 'id'
      const isPath = true
      const result = generateZodToOpenAPIExample(zod, example, paramName, isPath)
      const expected = `z.string().openapi({param:{name:'id',in:'path'},example:"example"})`
      expect(result).toBe(expected)
    },
  )
})
