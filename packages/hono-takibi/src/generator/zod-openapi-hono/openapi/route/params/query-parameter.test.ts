import { describe, it, expect } from 'vitest'
import { queryParameter } from './query-parameter'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/params/query-parameter.test.ts

describe('queryParameter', () => {
  it('should return a Zod schema with coercion for number type', () => {
    const schema = queryParameter('z.number()', {
      in: 'query',
      schema: { type: 'number' },
      name: 'age',
    })
    const expected = 'z.coerce.number()'
    expect(schema).toBe(expected)
  })

  it('should return a Zod schema with coercion for stringbool type', () => {
    const schema = queryParameter('z.boolean()', {
      in: 'query',
      schema: { type: 'boolean' },
      name: 'active',
    })
    const expected = 'z.stringbool()'
    expect(schema).toBe(expected)
  })

  it('should return the base schema for other types', () => {
    const schema = queryParameter('z.string()', {
      in: 'query',
      schema: { type: 'string' },
      name: 'name',
    })
    const expected = 'z.string()'
    expect(schema).toBe(expected)
  })
})
