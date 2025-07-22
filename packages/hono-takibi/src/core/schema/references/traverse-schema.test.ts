import { beforeEach, describe, expect, it } from 'vitest'
import { traverseSchemaDependencies } from '.'
import { traverseSchema } from './traverse-schema'

// Test run
// pnpm vitest run ./src/core/schema/references/traverse-schema.test.ts

describe('traverseSchema Test', () => {
  let refs: Set<string>

  beforeEach(() => {
    refs = new Set()
  })

  // Normal
  it('should collect A, B, C, D, E from a flat schema', () => {
    traverseSchema(
      {
        properties: {
          refA: { $ref: '#/components/schemas/A' },
          refB: { $ref: '#/components/schemas/B' },
          refC: { $ref: '#/components/schemas/C' },
          refD: { $ref: '#/components/schemas/D' },
          refE: { $ref: '#/components/schemas/E' },
        },
      },
      refs,
    )

    const expected = new Set(['A', 'B', 'C', 'D', 'E'])

    expect(refs).toStrictEqual(expected)
  })

  // Nested
  it('should collect A, B and E from nested properties', () => {
    traverseSchema(
      {
        properties: {
          group: {
            properties: {
              refA: { $ref: '#/components/schemas/A' },
              refB: { $ref: '#/components/schemas/B' },
              refE: { $ref: '#/components/schemas/E' },
            },
          },
        },
      },
      refs,
    )

    const expected = new Set(['A', 'B', 'E'])

    expect(refs).toStrictEqual(expected)
  })

  // Chain
  it('should collect A, B, C, D, E from a nested chain', () => {
    traverseSchema(
      {
        properties: {
          A: {
            $ref: '#/components/schemas/A',
            properties: {
              B: {
                $ref: '#/components/schemas/B',
                properties: {
                  C: {
                    $ref: '#/components/schemas/C',
                    properties: {
                      D: {
                        $ref: '#/components/schemas/D',
                        properties: {
                          E: { $ref: '#/components/schemas/E' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      refs,
    )

    const expected = new Set(['A', 'B', 'C', 'D', 'E'])

    expect(refs).toStrictEqual(expected)
  })

  // Duplicate
  it('should not add duplicate references, including E', () => {
    traverseSchema(
      {
        properties: {
          first: { $ref: '#/components/schemas/A' },
          second: { $ref: '#/components/schemas/A' },
          third: { $ref: '#/components/schemas/B' },
          fourth: { $ref: '#/components/schemas/E' },
          fifth: { $ref: '#/components/schemas/E' },
        },
      },
      refs,
    )

    const expected = new Set(['A', 'B', 'E'])

    expect(refs).toStrictEqual(expected)
  })

  // Error
  it('should throw error on circular reference (A -> B -> C -> A)', () => {
    const visited = new Set<string>()
    const recursionStack = new Set<string>()
    const orderedSchemas: string[] = []

    expect(() => {
      traverseSchemaDependencies(
        'A',
        {
          A: {
            properties: {
              ref: { $ref: '#/components/schemas/B' },
            },
          },
          B: {
            properties: {
              ref: { $ref: '#/components/schemas/C' },
            },
          },
          C: {
            properties: {
              ref: { $ref: '#/components/schemas/A' },
            },
          },
        },
        visited,
        recursionStack,
        orderedSchemas,
      )
    }).toThrowError('Circular dependency detected in schema: A')
  })
})
