import { describe, expect, it } from 'vitest'
import { zodToOpenAPI } from './zod-to-openapi.js'

// Test Run
// pnpm vitest run ./src/helper/zod-to-openapi.test.ts

describe('zodToOpenAPI Test', () => {
  it('zodToOpenAPI not exists openapi()', () => {
    const result = zodToOpenAPI('z.string()', { type: 'string' })
    const expected = 'z.string()'
    expect(result).toBe(expected)
  })

  it('should include only example and description in order', () => {
    const result = zodToOpenAPI('z.string()', {
      type: 'string',
      example: 'hello',
      description: 'Example string',
    })
    const expected = 'z.string().openapi({example:"hello",description:"Example string"})'
    expect(result).toBe(expected)
  })

  it('should insert param first when param info is provided', () => {
    const result = zodToOpenAPI(
      'z.string()',
      {
        type: 'string',
        example: 'uuid-example',
        description: 'UUID parameter',
      },
      'id',
      'path',
    )
    const expected =
      'z.string().openapi({param:{in:"path",name:"id",required:true},example:"uuid-example",description:"UUID parameter"})'
    expect(result).toBe(expected)
  })

  it('should handle non-required query param correctly', () => {
    const result = zodToOpenAPI(
      'z.string()',
      {
        type: 'string',
        example: 'query-value',
        description: 'Optional query parameter',
        required: false,
      },
      'q',
      'query',
    )
    const expected =
      'z.string().openapi({param:{in:"query",name:"q",required:false},example:"query-value",description:"Optional query parameter"})'
    expect(result).toBe(expected)
  })

  it('should insert only param if no example or description is given', () => {
    const result = zodToOpenAPI('z.string()', { type: 'string', required: true }, 'x', 'header')
    const expected = 'z.string().openapi({param:{in:"header",name:"x",required:true}})'
    expect(result).toBe(expected)
  })
})
