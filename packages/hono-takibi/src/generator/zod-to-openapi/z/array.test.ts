import { describe, expect, it } from 'vitest'
import type { Schema } from '../../../openapi'
import { array } from './array'

// Test run
// pnpm vitest run ./src/generator/zod-to-openapi/z/array.test.ts

describe('array()', () => {
  it.concurrent.each<[Schema, string]>([
    [{ type: 'array', items: { type: 'string' } }, 'z.array(z.string())'],
    [
      { type: 'array', items: { type: 'string', nullable: true } },
      'z.array(z.string().nullable())',
    ],
    [{ type: 'array', items: { type: 'number' } }, 'z.array(z.number())'],
    [
      { type: 'array', items: { type: 'number', nullable: true } },
      'z.array(z.number().nullable())',
    ],
    [{ type: 'array', items: { type: 'boolean' } }, 'z.array(z.boolean())'],
    [
      { type: 'array', items: { type: 'boolean', nullable: true } },
      'z.array(z.boolean().nullable())',
    ],
    [{ type: 'array', items: { type: ['boolean', 'null'] } }, 'z.array(z.boolean().nullable())'],
    [{ type: 'array', items: { type: 'object' } }, 'z.array(z.object({}))'],
    [{ type: 'array', items: { type: 'object' } }, 'z.array(z.object({}))'],
    [
      {
        type: 'array',
        items: {
          type: 'array',
          items: { type: 'string' },
        },
      },
      'z.array(z.array(z.string()))',
    ],
    [{ type: 'array', items: { type: 'string' }, minItems: 1 }, 'z.array(z.string()).min(1)'],
    [{ type: 'array', items: { type: 'string' }, maxItems: 10 }, 'z.array(z.string()).max(10)'],
    [
      { type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 10 },
      'z.array(z.string()).min(1).max(10)',
    ],
    [
      { type: 'array', items: { type: 'string' }, minItems: 5, maxItems: 5 },
      'z.array(z.string()).length(5)',
    ],
    [
      {
        type: 'array',
        items: {
          anyOf: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
            {
              type: 'boolean',
            },
          ],
        },
      },
      'z.array(z.union([z.string(),z.number(),z.boolean()]))',
    ],
    [
      {
        type: 'array',
        items: { $ref: '#/components/schemas/Test' },
      },
      'z.array(TestSchema)',
    ],
  ])('array(%o) → %s', (input, expected) => {
    expect(array(input)).toBe(expected)
  })
})
