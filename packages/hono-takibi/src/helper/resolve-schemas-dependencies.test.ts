import { describe, expect, it } from 'vitest'
import { resolveSchemasDependencies } from './resolve-schemas-dependencies.js'

// Test run
// pnpm vitest run ./src/helper/resolve-schemas-dependencies.test.ts

describe('resolveSchemasDependencies', () => {
  it('returns single schema with no refs', () => {
    const result = resolveSchemasDependencies({
      A: { type: 'string' },
    })
    expect(result).toStrictEqual(['A'])
  })
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

  it('handles self references without error', () => {
    const result = resolveSchemasDependencies({
      Node: {
        type: 'object',
        properties: {
          child: {
            $ref: '#/components/schemas/Node',
          },
        },
      },
    })
    expect(result).toStrictEqual(['Node'])
  })
})
