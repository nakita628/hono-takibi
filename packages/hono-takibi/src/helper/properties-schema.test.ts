import { describe, expect, it } from 'vitest'
import { propertiesSchema } from '.'

// Test run
// pnpm vitest run ./src/helper/properties-schema.test.ts

describe('propertiesSchema', () => {
  it.concurrent('propertiesSchema -> z.object({test:z.string()}).partial()', () => {
    expect(
      propertiesSchema(
        {
          test: { type: 'string' },
        },
        [],
      ),
    ).toBe('z.object({test:z.string().openapi({"type":"string"})}).partial()')
  })

  it.concurrent('z.object({test:z.string().optional().openapi({"type":"string"})})', () => {
    expect(
      propertiesSchema(
        {
          test: { type: 'string' },
        },
        ['test'],
      ),
    ).toBe('z.object({test:z.string().optional().openapi({"type":"string"})})')
  })

  it.concurrent('z.object({id:z.int().optional().openapi({"type":"integer"}),note:z.string().optional().openapi({"type":"string"})})', () => {
    const result = propertiesSchema(
      {
        id: { type: 'integer' },
        note: { type: 'string' },
      },
      ['id'],
    )
    expect(result).toBe(
      'z.object({id:z.int().optional().openapi({"type":"integer"}),note:z.string().optional().openapi({"type":"string"})})',
    )
  })

  it.concurrent('z.object({"invalid-key":z.boolean().optional().openapi({"type":"boolean"})})', () => {
    const result = propertiesSchema({ 'invalid-key': { type: 'boolean' } }, ['invalid-key'])
    expect(result).toBe(
      `z.object({"invalid-key":z.boolean().optional().openapi({"type":"boolean"})})`,
    )
  })

  it.concurrent('z.object({a:z.string().optional().openapi({"type":"string"}),b:z.string().optional().openapi({"type":"string"})})', () => {
    const result = propertiesSchema(
      {
        a: { type: 'string' },
        b: { type: 'string' },
      },
      ['a'],
    )
    expect(result).toBe(
      'z.object({a:z.string().optional().openapi({"type":"string"}),b:z.string().optional().openapi({"type":"string"})})',
    )
  })
})
