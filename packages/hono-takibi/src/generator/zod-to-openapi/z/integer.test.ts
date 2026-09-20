import { describe, expect, it } from 'vite-plus/test'

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
        'z.int({error:"整数必須"}).min(0,{error:"整数必須"})',
      ],
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
          'x-exclusiveMinimum-message': '正の数',
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
          'x-exclusiveMinimum-message': '100超',
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
          'x-exclusiveMaximum-message': '負の数',
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
          'x-exclusiveMinimum-message': '正',
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
          'x-exclusiveMinimum-message': '正',
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
    ])('integer(%o) → %s', (input, expected) => {
      expect(integer(input)).toBe(expected)
    })
  })

  describe('x-multipleOf-message', () => {
    it.concurrent.each<[Schema, string]>([
      // x-multipleOf-message overrides x-error-message for multipleOf (int)
      [
        {
          type: 'integer',
          multipleOf: 2,
          'x-error-message': '整数必須',
          'x-multipleOf-message': '偶数のみ',
        },
        'z.int({error:"整数必須"}).multipleOf(2,{error:"偶数のみ"})',
      ],
      // x-multipleOf-message alone (no x-error-message)
      [
        { type: 'integer', multipleOf: 2, 'x-multipleOf-message': '偶数のみ' },
        'z.int().multipleOf(2,{error:"偶数のみ"})',
      ],
      // x-multipleOf-message with int64
      [
        {
          type: 'integer',
          format: 'int64',
          multipleOf: 3,
          'x-error-message': 'int64必須',
          'x-multipleOf-message': '3の倍数',
        },
        'z.int64({error:"int64必須"}).multipleOf(3n,{error:"3の倍数"})',
      ],
      // x-multipleOf-message with bigint
      [
        {
          type: 'integer',
          format: 'bigint',
          multipleOf: 5,
          'x-error-message': 'bigint必須',
          'x-multipleOf-message': '5の倍数',
        },
        'z.bigint({error:"bigint必須"}).multipleOf(BigInt(5),{error:"5の倍数"})',
      ],
    ])('integer(%o) → %s', (input, expected) => {
      expect(integer(input)).toBe(expected)
    })
  })

  describe('x-coerce (P1)', () => {
    it.concurrent.each<[Schema, string]>([
      [{ type: 'integer', 'x-coerce': true }, 'z.coerce.number().int()'],
      [
        { type: 'integer', 'x-coerce': true, 'x-error-message': '整数必須' },
        'z.coerce.number({error:"整数必須"}).int({error:"整数必須"})',
      ],
      [{ type: 'integer', 'x-coerce': true, minimum: 0 }, 'z.coerce.number().int().min(0)'],
      [
        { type: 'integer', 'x-coerce': true, minimum: 0, 'x-error-message': '整数必須' },
        'z.coerce.number({error:"整数必須"}).int({error:"整数必須"}).min(0,{error:"整数必須"})',
      ],
      [
        {
          type: 'integer',
          'x-coerce': true,
          'x-required-message': '必須です',
          'x-error-message': '整数必須',
        },
        'z.coerce.number({error:"整数必須"}).int({error:"整数必須"})',
      ],
      // int32 keeps pipe to preserve range constraint [-2^31, 2^31-1]
      [{ type: 'integer', format: 'int32', 'x-coerce': true }, 'z.coerce.number().pipe(z.int32())'],
      [
        { type: 'integer', format: 'int32', 'x-coerce': true, 'x-error-message': 'int32必須' },
        'z.coerce.number({error:"int32必須"}).pipe(z.int32({error:"int32必須"}))',
      ],
      [
        {
          type: 'integer',
          format: 'int32',
          'x-coerce': true,
          minimum: 0,
          'x-error-message': 'int32必須',
        },
        'z.coerce.number({error:"int32必須"}).pipe(z.int32({error:"int32必須"}).min(0,{error:"int32必須"}))',
      ],
      // int64 is BigInt-backed → bigint pipe preserves the int64 range
      [{ type: 'integer', format: 'int64', 'x-coerce': true }, 'z.coerce.bigint().pipe(z.int64())'],
      [
        { type: 'integer', format: 'int64', 'x-coerce': true, 'x-error-message': 'int64必須' },
        'z.coerce.bigint({error:"int64必須"}).pipe(z.int64({error:"int64必須"}))',
      ],
      [
        {
          type: 'integer',
          format: 'int64',
          'x-coerce': true,
          maximum: 100,
          'x-error-message': 'int64必須',
        },
        'z.coerce.bigint({error:"int64必須"}).pipe(z.int64({error:"int64必須"}).max(100n,{error:"int64必須"}))',
      ],
      // bigint format coerces directly to BigInt (no pipe needed)
      [{ type: 'integer', format: 'bigint', 'x-coerce': true }, 'z.coerce.bigint()'],
      [
        { type: 'integer', format: 'bigint', 'x-coerce': true, 'x-error-message': 'bigint必須' },
        'z.coerce.bigint({error:"bigint必須"})',
      ],
      [
        {
          type: 'integer',
          format: 'bigint',
          'x-coerce': true,
          minimum: 0,
          'x-error-message': 'bigint必須',
        },
        'z.coerce.bigint({error:"bigint必須"}).min(BigInt(0),{error:"bigint必須"})',
      ],
    ])('integer(%o) → %s', (input, expected) => {
      expect(integer(input)).toBe(expected)
    })
  })

  describe('x-coerce + keyword-specific messages', () => {
    it.concurrent.each<[Schema, string]>([
      [
        {
          type: 'integer',
          'x-coerce': true,
          minimum: 1,
          'x-error-message': '整数必須',
          'x-minimum-message': '1以上',
        },
        'z.coerce.number({error:"整数必須"}).int({error:"整数必須"}).min(1,{error:"1以上"})',
      ],
      [
        {
          type: 'integer',
          'x-coerce': true,
          maximum: 100,
          'x-error-message': '整数必須',
          'x-maximum-message': '100以下',
        },
        'z.coerce.number({error:"整数必須"}).int({error:"整数必須"}).max(100,{error:"100以下"})',
      ],
      [
        {
          type: 'integer',
          'x-coerce': true,
          minimum: 1,
          'x-minimum-message': '1以上',
        },
        'z.coerce.number().int().min(1,{error:"1以上"})',
      ],
      [
        {
          type: 'integer',
          'x-coerce': true,
          minimum: 0,
          exclusiveMinimum: true,
          'x-exclusiveMinimum-message': '正の数',
        },
        'z.coerce.number().int().positive({error:"正の数"})',
      ],
      [
        {
          type: 'integer',
          'x-coerce': true,
          multipleOf: 2,
          'x-error-message': '整数必須',
          'x-multipleOf-message': '偶数のみ',
        },
        'z.coerce.number({error:"整数必須"}).int({error:"整数必須"}).multipleOf(2,{error:"偶数のみ"})',
      ],
    ])('integer(%o) → %s', (input, expected) => {
      expect(integer(input)).toBe(expected)
    })
  })

  describe('x-coerce + x-required-message on pipe/base paths', () => {
    it.concurrent.each<[Schema, string]>([
      [
        {
          type: 'integer',
          format: 'int32',
          'x-coerce': true,
          'x-required-message': '必須です',
          'x-error-message': 'int32必須',
        },
        'z.coerce.number({error:"int32必須"}).pipe(z.int32({error:"int32必須"}))',
      ],
      [
        {
          type: 'integer',
          format: 'int64',
          'x-coerce': true,
          'x-required-message': '必須です',
          'x-error-message': 'int64必須',
        },
        'z.coerce.bigint({error:"int64必須"}).pipe(z.int64({error:"int64必須"}))',
      ],
      [
        {
          type: 'integer',
          format: 'bigint',
          'x-coerce': true,
          'x-required-message': '必須です',
          'x-error-message': 'bigint必須',
        },
        'z.coerce.bigint({error:"bigint必須"})',
      ],
    ])('integer(%o) → %s', (input, expected) => {
      expect(integer(input)).toBe(expected)
    })
  })

  describe('x-coerce + x-required-message only (no x-error-message)', () => {
    it.concurrent.each<[Schema, string]>([
      [
        { type: 'integer', 'x-coerce': true, 'x-required-message': '必須です' },
        'z.coerce.number().int()',
      ],
      [
        {
          type: 'integer',
          format: 'int32',
          'x-coerce': true,
          'x-required-message': '必須です',
        },
        'z.coerce.number().pipe(z.int32())',
      ],
      [
        {
          type: 'integer',
          format: 'int64',
          'x-coerce': true,
          'x-required-message': '必須です',
        },
        'z.coerce.bigint().pipe(z.int64())',
      ],
      [
        {
          type: 'integer',
          format: 'bigint',
          'x-coerce': true,
          'x-required-message': '必須です',
        },
        'z.coerce.bigint()',
      ],
    ])('integer(%o) → %s', (input, expected) => {
      expect(integer(input)).toBe(expected)
    })
  })

  describe('coerce option vs x-coerce equivalence', () => {
    it.concurrent('coerce option produces same output as x-coerce', () => {
      const schema: Schema = { type: 'integer', 'x-error-message': '整数必須' }
      const withOption = integer(schema, { coerce: true })
      const withExtension = integer({ ...schema, 'x-coerce': true })
      expect(withOption).toBe(withExtension)
    })
  })
})

describe('integer min/max non-zero (.min/.max emit paths)', () => {
  it.concurrent.each<[Schema, string]>([
    [{ type: 'integer', minimum: 5 }, 'z.int().min(5)'],
    [{ type: 'integer', maximum: 10 }, 'z.int().max(10)'],
    [{ type: 'integer', format: 'int64', minimum: 5 }, 'z.int64().min(5n)'],
    [{ type: 'integer', format: 'int64', maximum: 10 }, 'z.int64().max(10n)'],
    [{ type: 'integer', format: 'bigint', minimum: 5 }, 'z.bigint().min(BigInt(5))'],
    [{ type: 'integer', format: 'bigint', maximum: 10 }, 'z.bigint().max(BigInt(10))'],
  ])('integer(%o) → %s', (input, expected) => {
    expect(integer(input)).toBe(expected)
  })

  // `uint32` and `uint64` are the unsigned halves of the int pair. Without them a spec
  // that declares one fell through to a plain `z.int()`, which accepts a negative and
  // rejects anything past `Number.MAX_SAFE_INTEGER` — wrong in both directions.
  describe('unsigned formats', () => {
    it.concurrent.each<[Schema, string]>([
      [{ type: 'integer', format: 'uint32' }, 'z.uint32()'],
      [{ type: 'integer', format: 'uint64' }, 'z.uint64()'],
      // A `uint32` fits a double exactly, so the wire value coerces to a number; a
      // `uint64` does not, so it has to become a bigint first.
      [
        { type: 'integer', format: 'uint32', 'x-coerce': true },
        'z.coerce.number().pipe(z.uint32())',
      ],
      [
        { type: 'integer', format: 'uint64', 'x-coerce': true },
        'z.coerce.bigint().pipe(z.uint64())',
      ],
      // A bound on a bigint schema is a bigint literal.
      [{ type: 'integer', format: 'uint64', minimum: 1 }, 'z.uint64().min(1n)'],
      [{ type: 'integer', format: 'uint32', minimum: 1 }, 'z.uint32().min(1)'],
    ])('integer(%o) → %s', (input, expected) => {
      expect(integer(input)).toBe(expected)
    })
  })
})
