import { describe, expect, it } from 'vitest'
import type { Schema } from '../../../openapi/index.js'
import { _enum } from './enum.js'

describe('_enum', () => {
  it.concurrent.each<[Schema, string]>([
    [{ enum: ['A', 'B'] }, 'z.enum(["A","B"])'],
    [{ enum: [1, 2] }, 'z.union([z.literal(1),z.literal(2)])'],
    [{ enum: [true, false] }, 'z.union([z.literal(true),z.literal(false)])'],
    [{ enum: [null] }, 'z.literal(null)'],
    [{ enum: ['abc'] }, `z.literal('abc')`],
    [{ type: 'array', enum: [[1, 2]] }, 'z.tuple([z.literal(1),z.literal(2)])'],
    [
      {
        type: 'array',
        enum: [
          [1, 2],
          [3, 4],
        ],
      },
      'z.union([z.tuple([z.literal(1),z.literal(2)]),z.tuple([z.literal(3),z.literal(4)])])',
    ],
  ])('_enum(%o) → %s', (input, expected) => {
    expect(_enum(input)).toBe(expected)
  })

  describe('x-error-message', () => {
    it.concurrent.each<[Schema, string]>([
      // String enum with x-error-message
      [
        { enum: ['active', 'inactive'], 'x-error-message': '無効なステータス' },
        'z.enum(["active","inactive"],{error:"無効なステータス"})',
      ],
      // Single string value → z.literal (no error param)
      [{ enum: ['only'], 'x-error-message': 'ignored' }, `z.literal('only')`],
      // Number enum → z.union (no error param on z.union)
      [{ enum: [1, 2], 'x-error-message': 'ignored' }, 'z.union([z.literal(1),z.literal(2)])'],
      // No x-error-message → existing behavior
      [{ enum: ['A', 'B'] }, 'z.enum(["A","B"])'],
    ])('_enum(%o) → %s', (input, expected) => {
      expect(_enum(input)).toBe(expected)
    })
  })
})
