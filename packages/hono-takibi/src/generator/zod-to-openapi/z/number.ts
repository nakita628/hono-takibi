import type { Schema } from '../../../openapi/index.js'

/**
 * Generates a Zod schema for number types based on OpenAPI schema.
 * Supports float, float32, float64, and number formats.
 *
 * @param schema - The OpenAPI schema object
 * @returns The Zod schema string
 */
export function number(schema: Schema): string {
  const base =
    schema.format === 'float' || schema.format === 'float32'
      ? 'z.float32()'
      : schema.format === 'float64'
        ? 'z.float64()'
        : 'z.number()'

  const minimum = (() => {
    if (schema.minimum !== undefined) {
      if (schema.minimum === 0 && schema.exclusiveMinimum === true) {
        return '.positive()'
      }
      if (schema.minimum === 0 && schema.exclusiveMinimum === false) {
        return '.nonnegative()'
      }
      if (schema.exclusiveMinimum === true) {
        return `.gt(${schema.minimum})`
      }
      return `.min(${schema.minimum})`
    }
    if (typeof schema.exclusiveMinimum === 'number') {
      return `.gt(${schema.exclusiveMinimum})`
    }
    return undefined
  })()

  const maximum = (() => {
    if (schema.maximum !== undefined) {
      if (schema.maximum === 0 && schema.exclusiveMaximum === true) {
        return '.negative()'
      }
      if (schema.maximum === 0 && schema.exclusiveMaximum === false) {
        return '.nonpositive()'
      }
      if (schema.exclusiveMaximum === true) {
        return `.lt(${schema.maximum})`
      }
      return `.max(${schema.maximum})`
    }
    if (typeof schema.exclusiveMaximum === 'number') {
      return `.lt(${schema.exclusiveMaximum})`
    }
    return undefined
  })()

  const multipleOf =
    schema.multipleOf !== undefined ? `.multipleOf(${schema.multipleOf})` : undefined

  return [base, minimum, maximum, multipleOf].filter((v) => v !== undefined).join('')
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/generator/zod-to-openapi/z/number.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest
  describe('number', () => {
    it.concurrent.each<[Schema, string]>([
      [{ type: 'number' }, 'z.number()'],
      [
        {
          type: 'number',
          minimum: 0,
          exclusiveMinimum: true,
        },
        'z.number().positive()',
      ],
      [
        {
          type: 'number',
          minimum: 0,
          exclusiveMinimum: false,
        },
        'z.number().nonnegative()',
      ],
      [{ type: 'number', maximum: 0, exclusiveMaximum: true }, 'z.number().negative()'],
      [{ type: 'number', maximum: 0, exclusiveMaximum: false }, 'z.number().nonpositive()'],
      [{ type: 'number', minimum: 100 }, 'z.number().min(100)'],
      [{ type: 'number', minimum: 0 }, 'z.number().min(0)'],
      [{ type: 'number', minimum: 100, exclusiveMinimum: true }, 'z.number().gt(100)'],
      [{ type: 'number', maximum: 100 }, 'z.number().max(100)'],
      [{ type: 'number', maximum: 0 }, 'z.number().max(0)'],
      [{ type: 'number', maximum: 100, exclusiveMaximum: true }, 'z.number().lt(100)'],
      [{ type: 'number', multipleOf: 2 }, 'z.number().multipleOf(2)'],
    ])('number(%o) → %s', (input, expected) => {
      expect(number(input)).toBe(expected)
    })
  })

  describe('type: number, format: float', () => {
    it.concurrent.each<[Schema, string]>([
      [{ type: 'number', format: 'float' }, 'z.float32()'],
      [{ type: 'number', format: 'float64' }, 'z.float64()'],
    ])('number(%o) → %s', (input, expected) => {
      expect(number(input)).toBe(expected)
    })
  })
}
