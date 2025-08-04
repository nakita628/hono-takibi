import { describe, expect, it } from 'vitest'
import { propertiesSchema } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/helper/properties-schema.test.ts

describe('propertiesSchema', () => {
  it.concurrent('propertiesSchema -> z.object({test:z.string()}).partial()', () => {
    expect(
      propertiesSchema(
        {
          test: { type: 'string' },
        },
        [],
      ),
    ).toBe('z.object({test:z.string()}).partial()')
  })

  it.concurrent('z.object({test:z.string()})', () => {
    expect(
      propertiesSchema(
        {
          test: { type: 'string' },
        },
        ['test'],
      ),
    ).toBe('z.object({test:z.string()})')
  })

  it.concurrent('z.object({id:z.int(),note:z.string().optional()})', () => {
    const result = propertiesSchema(
      {
        id: { type: 'integer' },
        note: { type: 'string' },
      },
      ['id'],
    )
    expect(result).toBe('z.object({id:z.int(),note:z.string().optional()})')
  })

  it.concurrent('z.object({"invalid-key":z.boolean()})', () => {
    const result = propertiesSchema({ 'invalid-key': { type: 'boolean' } }, ['invalid-key'])
    expect(result).toBe(`z.object({"invalid-key":z.boolean()})`)
  })

  it.concurrent('z.object({a:z.string(),b:z.string().optional()})', () => {
    const result = propertiesSchema(
      {
        a: { type: 'string' },
        b: { type: 'string' },
      },
      ['a'],
    )
    expect(result).toBe('z.object({a:z.string(),b:z.string().optional()})')
  })
})
