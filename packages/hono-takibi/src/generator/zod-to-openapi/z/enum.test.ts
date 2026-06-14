import { describe, expect, it } from 'vite-plus/test'

import type { Schema } from '../../../openapi/index.js'
import { _enum } from './enum.js'

describe('_enum', () => {
  it.concurrent.each<[Schema, string]>([
    [{ enum: ['A', 'B'] }, 'z.enum(["A","B"])'],
    [{ enum: [1, 2] }, 'z.union([z.literal(1),z.literal(2)])'],
    [{ enum: [true, false] }, 'z.union([z.literal(true),z.literal(false)])'],
    [{ enum: [null] }, 'z.literal(null)'],
    [{ enum: ['abc'] }, `z.literal('abc')`],
    [{ enum: [{ key: 'value' }] } as unknown as Schema, `z.custom<{"key":"value"}>()`],
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
      // String enum (multiple) → z.enum with error
      [
        { enum: ['active', 'inactive'], 'x-error-message': '無効なステータス' },
        'z.enum(["active","inactive"],{error:"無効なステータス"})',
      ],
      // Single string value → z.literal with error
      [{ enum: ['only'], 'x-error-message': 'only必須' }, `z.literal('only',{error:"only必須"})`],
      // Number enum (multiple) → z.union with error on outer wrapper only
      [
        { enum: [1, 2], 'x-error-message': '1か2を指定' },
        'z.union([z.literal(1),z.literal(2)],{error:"1か2を指定"})',
      ],
      // Number enum (single) → z.literal with error
      [
        { type: 'number', enum: [42], 'x-error-message': '42のみ' },
        'z.literal(42,{error:"42のみ"})',
      ],
      // Integer enum (multiple) → z.union with error on outer wrapper only
      [
        { type: 'integer', enum: [1, 2, 3], 'x-error-message': '1-3の整数' },
        'z.union([z.literal(1),z.literal(2),z.literal(3)],{error:"1-3の整数"})',
      ],
      // Boolean enum → z.union with error on outer wrapper only
      [
        { type: 'boolean', enum: [true, false], 'x-error-message': 'ブール値必須' },
        'z.union([z.literal(true),z.literal(false)],{error:"ブール値必須"})',
      ],
      // Boolean enum (single) → z.literal with error
      [
        { type: 'boolean', enum: [true], 'x-error-message': 'trueのみ' },
        'z.literal(true,{error:"trueのみ"})',
      ],
      // Array enum (single tuple) → z.tuple with error on outer wrapper only
      [
        { type: 'array', enum: [[1, 2]], 'x-error-message': '[1,2]のみ' },
        'z.tuple([z.literal(1),z.literal(2)],{error:"[1,2]のみ"})',
      ],
      // Array enum (multiple tuples) → z.union with error on outermost
      // wrapper only; inner z.tuple and inner z.literal entries omit it.
      [
        {
          type: 'array',
          enum: [
            [1, 2],
            [3, 4],
          ],
          'x-error-message': '無効な配列',
        },
        'z.union([z.tuple([z.literal(1),z.literal(2)]),z.tuple([z.literal(3),z.literal(4)])],{error:"無効な配列"})',
      ],
      // Mixed enum (multiple) → z.union with error on outer wrapper only
      [
        { enum: ['a', 1], 'x-error-message': '混合型エラー' },
        `z.union([z.literal('a'),z.literal(1)],{error:"混合型エラー"})`,
      ],
      // Mixed enum (single primitive) → z.literal with error via zLit
      [{ enum: [null], 'x-error-message': 'null必須' }, 'z.literal(null,{error:"null必須"})'],
      // No x-error-message → existing behavior unchanged
      [{ enum: ['A', 'B'] }, 'z.enum(["A","B"])'],
    ])('_enum(%o) → %s', (input, expected) => {
      expect(_enum(input)).toBe(expected)
    })
  })

  // x-enum-error-messages was removed: the extension generated dead code
  // (per-literal `value === 'admin'` branches that can never match a
  // rejected input). Whole-enum messages now come from x-error-message;
  // per-value business rules belong in handler code.
})

describe('_enum number/boolean literals (String(v) emit path)', () => {
  it.concurrent.each<[Schema, string]>([
    [{ type: 'integer', enum: [1] }, 'z.literal(1)'],
    [{ type: 'number', enum: [3.14] }, 'z.literal(3.14)'],
    [{ type: 'boolean', enum: [true] }, 'z.literal(true)'],
    [{ type: 'boolean', enum: [false] }, 'z.literal(false)'],
    [{ type: 'integer', enum: [1, 2] }, 'z.union([z.literal(1),z.literal(2)])'],
    [{ type: 'boolean', enum: [true, false] }, 'z.union([z.literal(true),z.literal(false)])'],
  ])('_enum(%o) → %s', (input, expected) => {
    expect(_enum(input)).toBe(expected)
  })
})
