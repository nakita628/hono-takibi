import { describe, expect, it } from 'vitest'
import type { Schema } from '../../../openapi/index.js'
import { integer } from './integer.js'

describe('integer', () => {
  describe('type: integer', () => {
    it.concurrent.each<[Schema, string]>([
      [{ type: 'integer' }, 'z.int()'],
      [{ type: 'integer', minimum: 0, exclusiveMinimum: true }, 'z.int().positive()'],
      [{ type: 'integer', minimum: 0, exclusiveMinimum: false }, 'z.int().nonnegative()'],
      [{ type: 'integer', maximum: 0, exclusiveMaximum: true }, 'z.int().negative()'],
      [{ type: 'integer', maximum: 0, exclusiveMaximum: false }, 'z.int().nonpositive()'],
      [{ type: 'integer', minimum: 100 }, 'z.int().min(100)'],
      [{ type: 'integer', minimum: 0 }, 'z.int().min(0)'],
      [{ type: 'integer', minimum: 100, exclusiveMinimum: true }, 'z.int().gt(100)'],
      [{ type: 'integer', maximum: 100 }, 'z.int().max(100)'],
      [{ type: 'integer', maximum: 0 }, 'z.int().max(0)'],
      [{ type: 'integer', maximum: 100, exclusiveMaximum: true }, 'z.int().lt(100)'],
      [{ type: 'integer', exclusiveMaximum: 100 }, 'z.int().lt(100)'],
      [{ type: 'integer', multipleOf: 2 }, 'z.int().multipleOf(2)'],
    ])('integer(%o) → %s', (input, expected) => {
      expect(integer(input)).toBe(expected)
    })
  })

  describe('type: integer, format: int32', () => {
    it.concurrent.each<[Schema, string]>([
      [{ type: 'integer', format: 'int32' }, 'z.int32()'],
      [
        { type: 'integer', format: 'int32', minimum: 0, exclusiveMinimum: true },
        'z.int32().positive()',
      ],
      [
        { type: 'integer', format: 'int32', minimum: 0, exclusiveMinimum: false },
        'z.int32().nonnegative()',
      ],
      [
        { type: 'integer', format: 'int32', maximum: 0, exclusiveMaximum: true },
        'z.int32().negative()',
      ],
      [
        { type: 'integer', format: 'int32', maximum: 0, exclusiveMaximum: false },
        'z.int32().nonpositive()',
      ],
      [{ type: 'integer', format: 'int32', minimum: 100 }, 'z.int32().min(100)'],
      [{ type: 'integer', format: 'int32', minimum: 0 }, 'z.int32().min(0)'],
      [
        { type: 'integer', format: 'int32', minimum: 100, exclusiveMinimum: true },
        'z.int32().gt(100)',
      ],
      [{ type: 'integer', format: 'int32', maximum: 100 }, 'z.int32().max(100)'],
      [{ type: 'integer', format: 'int32', maximum: 0 }, 'z.int32().max(0)'],
      [
        { type: 'integer', format: 'int32', maximum: 100, exclusiveMaximum: true },
        'z.int32().lt(100)',
      ],
      [{ type: 'integer', format: 'int32', exclusiveMaximum: 100 }, 'z.int32().lt(100)'],
      [{ type: 'integer', format: 'int32', multipleOf: 2 }, 'z.int32().multipleOf(2)'],
    ])('integer(%o) → %s', (input, expected) => {
      expect(integer(input)).toBe(expected)
    })
  })

  describe('type: integer, format: int64', () => {
    it.concurrent.each<[Schema, string]>([
      [{ type: 'integer', format: 'int64' }, 'z.int64()'],
      [
        { type: 'integer', format: 'int64', minimum: 0, exclusiveMinimum: true },
        'z.int64().positive()',
      ],
      [
        { type: 'integer', format: 'int64', minimum: 0, exclusiveMinimum: false },
        'z.int64().nonnegative()',
      ],
      [
        { type: 'integer', format: 'int64', maximum: 0, exclusiveMaximum: true },
        'z.int64().negative()',
      ],
      [
        { type: 'integer', format: 'int64', maximum: 0, exclusiveMaximum: false },
        'z.int64().nonpositive()',
      ],
      [{ type: 'integer', format: 'int64', minimum: 100 }, 'z.int64().min(100n)'],
      [{ type: 'integer', format: 'int64', minimum: 0 }, 'z.int64().min(0n)'],
      [
        { type: 'integer', format: 'int64', minimum: 100, exclusiveMinimum: true },
        'z.int64().gt(100n)',
      ],
      [{ type: 'integer', format: 'int64', maximum: 100 }, 'z.int64().max(100n)'],
      [{ type: 'integer', format: 'int64', maximum: 0 }, 'z.int64().max(0n)'],
      [
        { type: 'integer', format: 'int64', maximum: 100, exclusiveMaximum: true },
        'z.int64().lt(100n)',
      ],
      [{ type: 'integer', format: 'int64', exclusiveMaximum: 100 }, 'z.int64().lt(100n)'],
      [{ type: 'integer', format: 'int64', multipleOf: 2 }, 'z.int64().multipleOf(2n)'],
    ])('integer(%o) → %s', (input, expected) => {
      expect(integer(input)).toBe(expected)
    })
  })

  describe('type: integer, format: bigint', () => {
    it.concurrent.each<[Schema, string]>([
      [{ type: 'integer', format: 'bigint' }, 'z.bigint()'],
      [
        { type: 'integer', format: 'bigint', minimum: 0, exclusiveMinimum: true },
        'z.bigint().positive()',
      ],
      [
        { type: 'integer', format: 'bigint', minimum: 0, exclusiveMinimum: false },
        'z.bigint().nonnegative()',
      ],
      [
        { type: 'integer', format: 'bigint', maximum: 0, exclusiveMaximum: true },
        'z.bigint().negative()',
      ],
      [
        { type: 'integer', format: 'bigint', maximum: 0, exclusiveMaximum: false },
        'z.bigint().nonpositive()',
      ],
      [{ type: 'integer', format: 'bigint', minimum: 100 }, 'z.bigint().min(BigInt(100))'],
      [{ type: 'integer', format: 'bigint', minimum: 0 }, 'z.bigint().min(BigInt(0))'],
      [
        { type: 'integer', format: 'bigint', minimum: 100, exclusiveMinimum: true },
        'z.bigint().gt(BigInt(100))',
      ],
      [{ type: 'integer', format: 'bigint', maximum: 100 }, 'z.bigint().max(BigInt(100))'],
      [
        { type: 'integer', format: 'bigint', maximum: 100, exclusiveMaximum: true },
        'z.bigint().lt(BigInt(100))',
      ],
      [{ type: 'integer', format: 'bigint', exclusiveMaximum: 100 }, 'z.bigint().lt(BigInt(100))'],
      [{ type: 'integer', format: 'bigint', multipleOf: 2 }, 'z.bigint().multipleOf(BigInt(2))'],
    ])('integer(%o) → %s', (input, expected) => {
      expect(integer(input)).toBe(expected)
    })
  })

  describe('x-error-message (integer base)', () => {
    it.concurrent.each<[Schema, string]>([
      [{ type: 'integer', 'x-error-message': '整数必須' }, 'z.int({error:"整数必須"})'],
      [
        { type: 'integer', format: 'int32', 'x-error-message': 'int32必須' },
        'z.int32({error:"int32必須"})',
      ],
      [
        { type: 'integer', format: 'int64', 'x-error-message': 'int64必須' },
        'z.int64({error:"int64必須"})',
      ],
      [
        { type: 'integer', format: 'bigint', 'x-error-message': 'bigint必須' },
        'z.bigint({error:"bigint必須"})',
      ],
      // x-error-message + constraints
      [
        { type: 'integer', minimum: 0, 'x-error-message': '整数必須' },
        'z.int({error:"整数必須"}).min(0)',
      ],
      // No x-error-message → existing behavior
      [{ type: 'integer' }, 'z.int()'],
    ])('integer(%o) → %s', (input, expected) => {
      expect(integer(input)).toBe(expected)
    })
  })

  describe('x-minimum-message (int)', () => {
    it.concurrent.each<[Schema, string]>([
      [
        { type: 'integer', minimum: 0, 'x-minimum-message': '0以上' },
        'z.int().min(0,{error:"0以上"})',
      ],
      [
        {
          type: 'integer',
          minimum: 0,
          exclusiveMinimum: true,
          'x-minimum-message': '正の数',
        },
        'z.int().positive({error:"正の数"})',
      ],
      [
        {
          type: 'integer',
          minimum: 0,
          exclusiveMinimum: false,
          'x-minimum-message': '非負',
        },
        'z.int().nonnegative({error:"非負"})',
      ],
      [
        {
          type: 'integer',
          minimum: 100,
          exclusiveMinimum: true,
          'x-minimum-message': '100超',
        },
        'z.int().gt(100,{error:"100超"})',
      ],
    ])('integer(%o) → %s', (input, expected) => {
      expect(integer(input)).toBe(expected)
    })
  })

  describe('x-maximum-message (int)', () => {
    it.concurrent.each<[Schema, string]>([
      [
        { type: 'integer', maximum: 100, 'x-maximum-message': '100以下' },
        'z.int().max(100,{error:"100以下"})',
      ],
      [
        {
          type: 'integer',
          maximum: 0,
          exclusiveMaximum: true,
          'x-maximum-message': '負の数',
        },
        'z.int().negative({error:"負の数"})',
      ],
      [
        {
          type: 'integer',
          maximum: 0,
          exclusiveMaximum: false,
          'x-maximum-message': '非正',
        },
        'z.int().nonpositive({error:"非正"})',
      ],
    ])('integer(%o) → %s', (input, expected) => {
      expect(integer(input)).toBe(expected)
    })
  })

  describe('x-minimum-message (int64)', () => {
    it.concurrent.each<[Schema, string]>([
      [
        { type: 'integer', format: 'int64', minimum: 100, 'x-minimum-message': '100以上' },
        'z.int64().min(100n,{error:"100以上"})',
      ],
      [
        {
          type: 'integer',
          format: 'int64',
          minimum: 0,
          exclusiveMinimum: true,
          'x-minimum-message': '正',
        },
        'z.int64().positive({error:"正"})',
      ],
    ])('integer(%o) → %s', (input, expected) => {
      expect(integer(input)).toBe(expected)
    })
  })

  describe('x-maximum-message (int64)', () => {
    it.concurrent.each<[Schema, string]>([
      [
        { type: 'integer', format: 'int64', maximum: 100, 'x-maximum-message': '100以下' },
        'z.int64().max(100n,{error:"100以下"})',
      ],
    ])('integer(%o) → %s', (input, expected) => {
      expect(integer(input)).toBe(expected)
    })
  })

  describe('x-minimum-message (bigint)', () => {
    it.concurrent.each<[Schema, string]>([
      [
        { type: 'integer', format: 'bigint', minimum: 100, 'x-minimum-message': '100以上' },
        'z.bigint().min(BigInt(100),{error:"100以上"})',
      ],
      [
        {
          type: 'integer',
          format: 'bigint',
          minimum: 0,
          exclusiveMinimum: true,
          'x-minimum-message': '正',
        },
        'z.bigint().positive({error:"正"})',
      ],
    ])('integer(%o) → %s', (input, expected) => {
      expect(integer(input)).toBe(expected)
    })
  })

  describe('x-maximum-message (bigint)', () => {
    it.concurrent.each<[Schema, string]>([
      [
        { type: 'integer', format: 'bigint', maximum: 100, 'x-maximum-message': '100以下' },
        'z.bigint().max(BigInt(100),{error:"100以下"})',
      ],
    ])('integer(%o) → %s', (input, expected) => {
      expect(integer(input)).toBe(expected)
    })
  })

  describe('x-error-message on multipleOf', () => {
    it.concurrent.each<[Schema, string]>([
      [
        { type: 'integer', multipleOf: 2, 'x-error-message': '偶数のみ' },
        'z.int({error:"偶数のみ"}).multipleOf(2,{error:"偶数のみ"})',
      ],
      [
        { type: 'integer', format: 'int64', multipleOf: 3, 'x-error-message': '3の倍数' },
        'z.int64({error:"3の倍数"}).multipleOf(3n,{error:"3の倍数"})',
      ],
      [
        { type: 'integer', format: 'bigint', multipleOf: 5, 'x-error-message': '5の倍数' },
        'z.bigint({error:"5の倍数"}).multipleOf(BigInt(5),{error:"5の倍数"})',
      ],
      // No x-error-message → existing behavior
      [{ type: 'integer', multipleOf: 2 }, 'z.int().multipleOf(2)'],
    ])('integer(%o) → %s', (input, expected) => {
      expect(integer(input)).toBe(expected)
    })
  })
})
