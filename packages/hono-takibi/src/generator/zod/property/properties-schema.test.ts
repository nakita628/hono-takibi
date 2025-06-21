import { describe, it, expect } from 'vitest'
import { propertiesSchema } from './properties-schema'

// Test run
// pnpm vitest run ./src/generator/zod/property/properties-schema.test.ts

describe('propertiesSchema', () => {
  it.concurrent('propertiesSchema -> z.object({test:z.string()}).partial()', () => {
    const result = propertiesSchema(
      {
        test: { type: 'string' },
      },
      [],
    )

    const expected = 'z.object({test:z.string()}).partial()'
    expect(result).toBe(expected)
  })

  it.concurrent('propertiesSchema -> z.object({test:z.string()})', () => {
    const result = propertiesSchema(
      {
        test: { type: 'string' },
      },
      ['test'],
    )

    const expected = 'z.object({test:z.string()})'
    expect(result).toBe(expected)
  })
})
