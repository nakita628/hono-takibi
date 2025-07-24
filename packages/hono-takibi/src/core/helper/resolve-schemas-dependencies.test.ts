import { describe, expect, it } from 'vitest'
import { resolveSchemasDependencies } from './resolve-schemas-dependencies.js'

// Test run
// pnpm vitest run ./src/core/helper/resolve-schemas-dependencies.test.ts

describe('resolveSchemasDependencies Test', () => {
  it.concurrent(`resolveSchemasDependencies 'A', 'B', 'C' -> ['C', 'B', 'A']`, () => {
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

    const expected = ['C', 'B', 'A']
    expect(result).toStrictEqual(expected)
  })
})
