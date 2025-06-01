import { describe, it, expect } from 'vitest'
import { generateZodPropertiesSchema } from './generate-zod-properties-schema'

// Test run
// pnpm vitest run ./src/generator/zod/property/generate-zod-properties-schema.test.ts

describe('generateZodPropertiesSchema Test', () => {
  it.concurrent('generateZodPropertiesSchema -> z.object({test:z.string()}).partial()', () => {
    const result = generateZodPropertiesSchema(
      {
        test: { type: 'string' },
      },
      [],
      {
        schema: {
          name: 'PascalCase',
          export: false,
        },
        type: {
          name: 'PascalCase',
          export: false,
        },
      },
    )

    const expected = 'z.object({test:z.string()}).partial()'
    expect(result).toBe(expected)
  })

  it.concurrent('generateZodPropertiesSchema -> z.object({test:z.string()})', () => {
    const result = generateZodPropertiesSchema(
      {
        test: { type: 'string' },
      },
      ['test'],
      {
        schema: {
          name: 'PascalCase',
          export: false,
        },
        type: {
          name: 'PascalCase',
          export: false,
        },
      },
    )

    const expected = 'z.object({test:z.string()})'
    expect(result).toBe(expected)
  })
})
