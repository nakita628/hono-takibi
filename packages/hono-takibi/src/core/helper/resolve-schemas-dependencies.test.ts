import { describe, expect, it } from 'vitest'
import { resolveSchemasDependencies } from './resolve-schemas-dependencies.js'

// Test run
// pnpm vitest run ./src/core/helper/resolve-schemas-dependencies.test.ts

describe('resolveSchemasDependencies', () => {
  it.concurrent(`resolveSchemasDependencies 'A', 'B', 'C' -> ['B', 'C', 'A']`, () => {
    const result = resolveSchemasDependencies({
      A: {
        type: 'object',
        properties: {
          b: {
            $ref: '#/components/schemas/B',
          },
          c: {
            $ref: '#/components/schemas/C',
          },
        },
      },
      B: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
        },
      },
      C: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
        },
      },
    })

    const expected = ['B', 'C', 'A']
    expect(result).toStrictEqual(expected)
  })
})
