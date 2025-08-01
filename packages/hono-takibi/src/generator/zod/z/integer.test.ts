import { describe, expect, it } from 'vitest'
import { integer } from './integer'

// Test run
// pnpm vitest run ./src/generator/zod/z/integer.test.ts

describe('integer', () => {
  // int
  it.concurrent('z.int()', () => {
    expect(integer({})).toBe('z.int()')
  })
  // positive
  it.concurrent('minimum: 0, exclusiveMinimum: true → z.int().positive()', () => {
    expect(integer({ minimum: 0, exclusiveMinimum: true })).toBe('z.int().positive()')
  })
  // nonnegative
  it.concurrent('minimum: 0, exclusiveMinimum: false → z.int().nonnegative()', () => {
    expect(integer({ minimum: 0, exclusiveMinimum: false })).toBe('z.int().nonnegative()')
  })
  // negative
  it.concurrent('maximum: 0, exclusiveMaximum: true → z.int().negative()', () => {
    expect(integer({ maximum: 0, exclusiveMaximum: true })).toBe('z.int().negative()')
  })
  // nonpositive
  it.concurrent('maximum: 0, exclusiveMaximum: false → z.int().nonpositive()', () => {
    expect(integer({ maximum: 0, exclusiveMaximum: false })).toBe('z.int().nonpositive()')
  })
  // min
  it.concurrent('minimum: 100 → z.int().min(100)', () => {
    expect(integer({ minimum: 100 })).toBe('z.int().min(100)')
  })
  // min 0
  it.concurrent('minimum: 0, exclusiveMinimum: true → z.int().min(0)', () => {
    expect(integer({ minimum: 0 })).toBe('z.int().min(0)')
  })
  // gt
  it.concurrent('minimum: 100, exclusiveMinimum: true → z.int().gt(100)', () => {
    expect(integer({ minimum: 100, exclusiveMinimum: true })).toBe('z.int().gt(100)')
  })
  it.concurrent('exclusiveMinimum: 100 → z.int().gt(100)', () => {
    expect(integer({ exclusiveMinimum: 100 })).toBe('z.int().gt(100)')
  })
  // max
  it.concurrent('maximum: 100 → z.int().max(100)', () => {
    expect(integer({ maximum: 100 })).toBe('z.int().max(100)')
  })
  // max 0
  it.concurrent('maximum: 0, exclusiveMaximum: true → z.int().max(0)', () => {
    expect(integer({ maximum: 0 })).toBe('z.int().max(0)')
  })
  // lt
  it.concurrent('maximum: 100, exclusiveMaximum: true → z.int().lt(100)', () => {
    expect(integer({ maximum: 100, exclusiveMaximum: true })).toBe('z.int().lt(100)')
  })
  it.concurrent('exclusiveMaximum: 100 → z.int().lt(100)', () => {
    expect(integer({ exclusiveMaximum: 100 })).toBe('z.int().lt(100)')
  })
  it.concurrent('maximum: 0 → z.int().max(0)', () => {
    expect(integer({ maximum: 0 })).toBe('z.int().max(0)')
  })
  // multipleOf
  it.concurrent('multipleOf: 2 → z.int().multipleOf(2)', () => {
    expect(integer({ multipleOf: 2 })).toBe('z.int().multipleOf(2)')
  })
  // int32
  it.concurrent(' ormat: int32 → z.int32()', () => {
    expect(integer({ format: 'int32' })).toBe('z.int32()')
  })
  // int32 positive
  it.concurrent('minimum: 0, exclusiveMinimum: true → z.int32().positive()', () => {
    expect(integer({ format: 'int32', minimum: 0, exclusiveMinimum: true })).toBe(
      'z.int32().positive()',
    )
  })
  // int32 nonnegative
  it.concurrent('minimum: 0, exclusiveMinimum: false → z.int32().nonnegative()', () => {
    expect(integer({ format: 'int32', minimum: 0, exclusiveMinimum: false })).toBe(
      'z.int32().nonnegative()',
    )
  })
  // int32 negative
  it.concurrent('maximum: 0, exclusiveMaximum: true → z.int32().negative()', () => {
    expect(integer({ format: 'int32', maximum: 0, exclusiveMaximum: true })).toBe(
      'z.int32().negative()',
    )
  })
  // int32 nonpositive
  it.concurrent('maximum: 0, exclusiveMaximum: false → z.int32().nonpositive()', () => {
    expect(integer({ format: 'int32', maximum: 0, exclusiveMaximum: false })).toBe(
      'z.int32().nonpositive()',
    )
  })
  // int32 min
  it.concurrent('minimum: 100 → z.int32().min(100)', () => {
    expect(integer({ format: 'int32', minimum: 100 })).toBe('z.int32().min(100)')
  })
  // int32 min 0
  it.concurrent('minimum: 0, exclusiveMinimum: true → z.int32().min(0)', () => {
    expect(integer({ format: 'int32', minimum: 0 })).toBe('z.int32().min(0)')
  })
  // int32 gt
  it.concurrent('minimum: 100, exclusiveMinimum: true → z.int32().gt(100)', () => {
    expect(integer({ format: 'int32', minimum: 100, exclusiveMinimum: true })).toBe(
      'z.int32().gt(100)',
    )
  })
  // int32 max
  it.concurrent('maximum: 100 → z.int32().max(100)', () => {
    expect(integer({ format: 'int32', maximum: 100 })).toBe('z.int32().max(100)')
  })
  // int32 max 0
  it.concurrent('maximum: 0, exclusiveMaximum: true → z.int32().max()', () => {
    expect(integer({ format: 'int32', maximum: 0 })).toBe('z.int32().max(0)')
  })
  // int32 lt
  it.concurrent('maximum: 100, exclusiveMaximum: true → z.int32().lt(100)', () => {
    expect(integer({ format: 'int32', maximum: 100, exclusiveMaximum: true })).toBe(
      'z.int32().lt(100)',
    )
  })
  // int32 multipleOf
  it.concurrent('format: int32, multipleOf: 2 → z.int32().multipleOf(2)', () => {
    expect(integer({ format: 'int32', multipleOf: 2 })).toBe('z.int32().multipleOf(2)')
  })
  // int64
  it.concurrent('type: integer, format: int64 → z.int64()', () => {
    expect(integer({ format: 'int64' })).toBe('z.int64()')
  })
  // int64 positive
  it.concurrent('minimum: 0, exclusiveMinimum: true → z.int64().positive()', () => {
    expect(integer({ format: 'int64', minimum: 0, exclusiveMinimum: true })).toBe(
      'z.int64().positive()',
    )
  })
  // int64 nonnegative
  it.concurrent('minimum: 0, exclusiveMinimum: false → z.int64().nonnegative()', () => {
    expect(integer({ format: 'int64', minimum: 0, exclusiveMinimum: false })).toBe(
      'z.int64().nonnegative()',
    )
  })
  // int64 negative
  it.concurrent('maximum: 0, exclusiveMaximum: true → z.int64().negative()', () => {
    expect(integer({ format: 'int64', maximum: 0, exclusiveMaximum: true })).toBe(
      'z.int64().negative()',
    )
  })
  // int64 nonpositive
  it.concurrent('maximum: 0, exclusiveMaximum: false → z.int64().nonpositive()', () => {
    expect(integer({ format: 'int64', maximum: 0, exclusiveMaximum: false })).toBe(
      'z.int64().nonpositive()',
    )
  })
  // int64 min
  it.concurrent('minimum: 100 → z.int64().min(100n)', () => {
    expect(integer({ format: 'int64', minimum: 100 })).toBe('z.int64().min(100n)')
  })
  // int64 min 0
  it.concurrent('minimum: 0, exclusiveMinimum: true → z.int64().min(0n)', () => {
    expect(integer({ format: 'int64', minimum: 0 })).toBe('z.int64().min(0n)')
  })
  // int64 gt
  it.concurrent('minimum: 100, exclusiveMinimum: true → z.int64().gt(100n)', () => {
    expect(integer({ format: 'int64', minimum: 100, exclusiveMinimum: true })).toBe(
      'z.int64().gt(100n)',
    )
  })
  // int64 max
  it.concurrent('maximum: 100 → z.int64().max(100n)', () => {
    expect(integer({ format: 'int64', maximum: 100 })).toBe('z.int64().max(100n)')
  })
  // int64 max 0
  it.concurrent('maximum: 0, exclusiveMaximum: true → z.int64().negative()', () => {
    expect(integer({ format: 'int64', maximum: 0 })).toBe('z.int64().max(0n)')
  })
  // int64 lt
  it.concurrent('maximum: 100, exclusiveMaximum: true → z.int64().lt(100n)', () => {
    expect(integer({ format: 'int64', maximum: 100, exclusiveMaximum: true })).toBe(
      'z.int64().lt(100n)',
    )
  })
  // int64 multipleOf
  it.concurrent('type: integer, format: int64, multipleOf: 2 → z.int64().multipleOf(2n)', () => {
    expect(integer({ format: 'int64', multipleOf: 2 })).toBe('z.int64().multipleOf(2n)')
  })
  // bigint
  it.concurrent('type: integer, format: bigint → z.bigint()', () => {
    expect(integer({ format: 'bigint' })).toBe('z.bigint()')
  })
  // bigint positive
  it.concurrent('minimum: 0, exclusiveMinimum: true → z.bigint().positive()', () => {
    expect(integer({ format: 'bigint', minimum: 0, exclusiveMinimum: true })).toBe(
      'z.bigint().positive()',
    )
  })
  // bigint nonnegative
  it.concurrent('minimum: 0, exclusiveMinimum: false → z.bigint().nonnegative()', () => {
    expect(integer({ format: 'bigint', minimum: 0, exclusiveMinimum: false })).toBe(
      'z.bigint().nonnegative()',
    )
  })
  // bigint negative
  it.concurrent('maximum: 0, exclusiveMaximum: true → z.bigint().negative()', () => {
    expect(integer({ format: 'bigint', maximum: 0, exclusiveMaximum: true })).toBe(
      'z.bigint().negative()',
    )
  })
  // bigint nonpositive
  it.concurrent('z.bigint() -> .nonpositive()', () => {
    expect(integer({ format: 'bigint', maximum: 0, exclusiveMaximum: false })).toBe(
      'z.bigint().nonpositive()',
    )
  })
  // bigint min
  it.concurrent('minimum: 100 → z.bigint().min(BigInt(100))', () => {
    expect(integer({ format: 'bigint', minimum: 100 })).toBe('z.bigint().min(BigInt(100))')
  })
  // bigint min 0
  it.concurrent('minimum: 0, exclusiveMinimum: true → z.bigint().min(BigInt(0))', () => {
    expect(integer({ format: 'bigint', minimum: 0 })).toBe('z.bigint().min(BigInt(0))')
  })
  // bigint gt
  it.concurrent('minimum: 100, exclusiveMinimum: true → z.bigint().gt(BigInt(100))', () => {
    expect(integer({ format: 'bigint', minimum: 100, exclusiveMinimum: true })).toBe(
      'z.bigint().gt(BigInt(100))',
    )
  })
  // bigint max
  it.concurrent('maximum: 100 → z.bigint().max(BigInt(100))', () => {
    expect(integer({ format: 'bigint', maximum: 100 })).toBe('z.bigint().max(BigInt(100))')
  })
  // bigint lt
  it.concurrent('maximum: 100, exclusiveMaximum: true → z.bigint().lt(BigInt(100))', () => {
    expect(integer({ format: 'bigint', maximum: 100, exclusiveMaximum: true })).toBe(
      'z.bigint().lt(BigInt(100))',
    )
  })
  // bigint max 0
  it.concurrent('maximum: 0, exclusiveMaximum: true → z.bigint().max(BigInt(0))', () => {
    expect(integer({ format: 'bigint', maximum: 0 })).toBe('z.bigint().max(BigInt(0))')
  })
  // bigint multipleOf
  it.concurrent(
    'type: integer, format: bigint, multipleOf: 2 → z.bigint().multipleOf(BigInt(2))',
    () => {
      expect(integer({ format: 'bigint', multipleOf: 2 })).toBe('z.bigint().multipleOf(BigInt(2))')
    },
  )
})
