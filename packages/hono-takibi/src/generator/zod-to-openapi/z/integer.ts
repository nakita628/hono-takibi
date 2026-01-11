import type { Schema } from '../../../openapi/index.js'

/**
 * Generates a Zod schema for integer types based on OpenAPI schema.
 * Supports int32, int64, and bigint formats.
 *
 * @param schema - The OpenAPI schema object
 * @returns The Zod schema string
 */
export function integer(schema: Schema): string {
  const base =
    schema.format === 'int32'
      ? 'z.int32()'
      : schema.format === 'int64'
        ? 'z.int64()'
        : schema.format === 'bigint'
          ? 'z.bigint()'
          : 'z.int()'

  const lit = (n: number): string => {
    if (schema.format === 'bigint') return `BigInt(${n})`
    if (schema.format === 'int64') return `${n}n`
    return `${n}`
  }

  const minimum = (() => {
    if (schema.minimum === undefined && schema.exclusiveMinimum === undefined) {
      return undefined
    }
    const value = schema.minimum ?? schema.exclusiveMinimum
    if (value === 0 && schema.exclusiveMinimum === true) {
      return '.positive()'
    }
    if (value === 0 && schema.exclusiveMinimum === false) {
      return '.nonnegative()'
    }
    // > value → .gt(...)
    if (
      (schema.exclusiveMinimum === true || schema.minimum === undefined) &&
      typeof value === 'number'
    ) {
      return `.gt(${lit(value)})`
    }
    // >= value → .min(...)
    if (typeof schema.minimum === 'number') {
      return `.min(${lit(schema.minimum)})`
    }
    return undefined
  })()

  const maximum = (() => {
    if (schema.maximum === undefined && schema.exclusiveMaximum === undefined) {
      return undefined
    }
    const value = schema.maximum ?? schema.exclusiveMaximum
    if (value === 0 && schema.exclusiveMaximum === true) {
      return '.negative()'
    }
    if (value === 0 && schema.exclusiveMaximum === false) {
      return '.nonpositive()'
    }
    if (
      (schema.exclusiveMaximum === true || schema.maximum === undefined) &&
      typeof value === 'number'
    ) {
      return `.lt(${lit(value)})`
    }
    if (typeof schema.maximum === 'number') {
      return `.max(${lit(schema.maximum)})`
    }
    return undefined
  })()

  const multipleOf =
    schema.multipleOf !== undefined && typeof schema.multipleOf === 'number'
      ? `.multipleOf(${lit(schema.multipleOf)})`
      : undefined

  return [base, minimum, maximum, multipleOf].filter((v) => v !== undefined).join('')
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/generator/zod-to-openapi/z/integer.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest
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
        [
          { type: 'integer', format: 'bigint', exclusiveMaximum: 100 },
          'z.bigint().lt(BigInt(100))',
        ],
        [{ type: 'integer', format: 'bigint', multipleOf: 2 }, 'z.bigint().multipleOf(BigInt(2))'],
      ])('integer(%o) → %s', (input, expected) => {
        expect(integer(input)).toBe(expected)
      })
    })
  })
}
