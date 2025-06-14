import { describe, it, expect } from 'vitest'
import { zodToOpenAPI } from '.'
import type { Schema } from '../../types/index.js'
import type { Config } from '../../config/index.js'

// Test Run
// pnpm vitest run ./src/generator/zod-to-openapi/zod-to-openapi.test.ts

describe('zodToOpenAPI Test', () => {
  const config: Config = {
    schema: {
      name: 'PascalCase',
      export: false,
    },
    type: {
      name: 'PascalCase',
      export: false,
    },
  }

  it('zodToOpenAPI not exists openapi()', () => {
    const schema: Schema = { type: 'string' }
    const result = zodToOpenAPI(config, schema)
    const expected = 'z.string()'
    expect(result).toBe(expected)
  })

  it('should include only example and description in order', () => {
    const schema: Schema = {
      type: 'string',
      example: 'hello',
      description: 'Example string',
    }
    const result = zodToOpenAPI(config, schema)
    const expected = 'z.string().openapi({example:"hello",description:"Example string"})'
    expect(result).toBe(expected)
  })

  it('should insert param first when param info is provided', () => {
    const schema: Schema = {
      type: 'string',
      example: 'uuid-example',
      description: 'UUID parameter',
    }
    const result = zodToOpenAPI(config, schema, 'id', 'path')
    const expected =
      'z.string().openapi({param:{in:"path",name:"id",required:true},example:"uuid-example",description:"UUID parameter"})'
    expect(result).toBe(expected)
  })

  it('should handle non-required query param correctly', () => {
    const schema: Schema = {
      type: 'string',
      example: 'query-value',
      description: 'Optional query parameter',
      required: false,
    }
    const result = zodToOpenAPI(config, schema, 'q', 'query')
    const expected =
      'z.string().openapi({param:{in:"query",name:"q",required:false},example:"query-value",description:"Optional query parameter"})'
    expect(result).toBe(expected)
  })

  it('should insert only param if no example or description is given', () => {
    const schema: Schema = { type: 'string', required: true }
    const result = zodToOpenAPI(config, schema, 'x', 'header')
    const expected = 'z.string().openapi({param:{in:"header",name:"x",required:true}})'
    expect(result).toBe(expected)
  })
})
