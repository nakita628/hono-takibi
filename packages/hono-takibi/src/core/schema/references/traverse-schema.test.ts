import { beforeEach, describe, expect, it } from 'vitest'
import { traverseSchema } from './traverse-schema'
import type { Schema } from '../../../type'

describe('traverseSchema - Simple A, B, C, D, E tests', () => {
  let refs: Set<string>

  beforeEach(() => {
    refs = new Set()
  })

  // Normal
  it('should collect A, B, C, D, E from a flat schema', () => {
    const schema: Schema = {
      properties: {
        refA: { $ref: '#/components/schemas/A' },
        refB: { $ref: '#/components/schemas/B' },
        refC: { $ref: '#/components/schemas/C' },
        refD: { $ref: '#/components/schemas/D' },
        refE: { $ref: '#/components/schemas/E' },
      },
    }

    traverseSchema(schema, refs)

    expect(refs).toEqual(new Set(['A', 'B', 'C', 'D', 'E']))
  })

  // Nested
  it('should collect A, B and E from nested properties', () => {
    const schema: Schema = {
      properties: {
        group: {
          properties: {
            refA: { $ref: '#/components/schemas/A' },
            refB: { $ref: '#/components/schemas/B' },
            refE: { $ref: '#/components/schemas/E' },
          },
        },
      },
    }

    traverseSchema(schema, refs)

    expect(refs).toEqual(new Set(['A', 'B', 'E']))
  })

  // Chain
  it('should collect A, B, C, D, E from a nested chain', () => {
    const schema: Schema = {
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
    }

    traverseSchema(schema, refs)

    expect(refs).toEqual(new Set(['A', 'B', 'C', 'D', 'E']))
  })

  // Duplicate
  it('should not add duplicate references, including E', () => {
    const schema: Schema = {
      properties: {
        first: { $ref: '#/components/schemas/A' },
        second: { $ref: '#/components/schemas/A' },
        third: { $ref: '#/components/schemas/B' },
        fourth: { $ref: '#/components/schemas/E' },
        fifth: { $ref: '#/components/schemas/E' },
      },
    }

    traverseSchema(schema, refs)

    expect(refs).toEqual(new Set(['A', 'B', 'E']))
  })
})
