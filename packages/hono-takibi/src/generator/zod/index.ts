import { allOf } from '../../helper/allof.js'
import { anyOf } from '../../helper/anyof.js'
import { maybeApplyNullability, pickTypes } from '../../helper/index.js'
import { not } from '../../helper/not.js'
import { oneOf } from '../../helper/oneof.js'
import type { Schema } from '../../openapi/index.js'
import {
  array,
  length,
  max,
  min,
  refName,
  removeMaxIfLtExists,
  removeMinIfGtExists,
  removeMinMaxIfEqual,
} from '../../utils/index.js'

import { _enum } from './z/enum.js'
import { integer } from './z/integer.js'
import { number } from './z/number.js'
import { object } from './z/object.js'
import { string } from './z/string.js'

/**
 * Converts an OpenAPI `Schema` object into a Zod schema string.
 *
 * Handles primitives (`string`, `number`, `boolean`, `array`, `object`, `integer`),
 * references (`$ref`), constants (`const`), enums, combinators (`oneOf`, `anyOf`, `allOf`, `not`),
 * and other schema metadata (`nullable`, `minLength`, `maxLength`, `exclusiveMinimum`, etc).
 *
 * If the schema is unrecognized or empty, defaults to `'z.any()'`.
 *
 * @param schema - The OpenAPI schema object to convert
 * @returns A string representing the corresponding Zod schema
 *
 * @example
 * // String schema
 * zod({ type: 'string' })
 * // → 'z.string()'
 *
 * @example
 * // Enum schema
 * zod({ type: 'string', enum: ['A', 'B'] })
 * // → 'z.enum(["A","B"])'
 *
 * @example
 * // Nullable number with exclusiveMinimum
 * zod({ type: 'number', exclusiveMinimum: 3, nullable: true })
 * // → 'z.number().gt(3).nullable()'
 *
 * @example
 * // Object with properties
 * zod({
 *   type: 'object',
 *   properties: { name: { type: 'string' } },
 *   required: ['name']
 * })
 * // → 'z.object({name:z.string()})'
 *
 * @example
 * // Reference schema
 * zod({ $ref: '#/components/schemas/User' })
 * // → 'UserSchema'
 *
 * @example
 * // Unknown schema
 * zod({})
 * // → 'z.any()'
 *
 * @remarks
 * - Automatically applies `.nullable()` if applicable
 * - Combines `.min()` / `.max()` into `.length()` where appropriate
 * - Optimizes out redundant `.min()` when `.gt()` is used
 * - Logs unhandled cases to `console.warn`
 */
export function zod(schema: Schema): string {
  /* $ref */
  if (schema.$ref) return `${refName(schema.$ref)}Schema`

  /* const */
  if (schema.const !== undefined) {
    return maybeApplyNullability(`z.literal(${JSON.stringify(schema.const)})`, schema)
  }

  /* enum */
  if (schema.enum) {
    const out = _enum(schema)
    return out !== undefined ? maybeApplyNullability(out, schema) : 'z.any()'
  }

  const types = pickTypes(schema.type)

  /* object */
  if (types.includes('object')) {
    return maybeApplyNullability(object(schema), schema)
  }

  /* date */
  if (types.includes('date')) {
    return maybeApplyNullability('z.date()', schema)
  }

  /* string */
  if (types.includes('string')) {
    const base = string(schema)
    const optimised =
      schema.minLength !== undefined &&
      schema.maxLength !== undefined &&
      schema.minLength === schema.maxLength &&
      base.includes(`min(${schema.minLength})`) &&
      base.includes(`max(${schema.maxLength})`)
        ? `${removeMinMaxIfEqual(base, schema.minLength, schema.maxLength)}${length(schema.minLength)}`
        : base
    return maybeApplyNullability(optimised, schema)
  }

  /* number */
  if (types.includes('number')) {
    /**
     * Generate the base Zod schema using .min() / .max() if defined.
     * This must NOT include .gt() or .lt(); they are handled separately below.
     *
     * Example:
     *   schema: { type: 'number', minimum: 1, maximum: 5 }
     *   → base = 'z.number().min(1).max(5)'
     */
    const base = number(schema)

    /**
     * Append .gt(n) only if exclusiveMinimum is defined and not already present in base.
     *
     * Example:
     *   schema: { type: 'number', exclusiveMinimum: 10 }
     *   → needsGt = '.gt(10)'
     */
    const needsGt =
      typeof schema.exclusiveMinimum === 'number' &&
      !base.includes(`.gt(${schema.exclusiveMinimum})`)
        ? `.gt(${schema.exclusiveMinimum})`
        : ''

    /**
     * Append .lt(n) only if exclusiveMaximum is defined and not already present in base.
     *
     * Example:
     *   schema: { type: 'number', exclusiveMaximum: 20 }
     *   → needsLt = '.lt(20)'
     */
    const needsLt =
      typeof schema.exclusiveMaximum === 'number' &&
      !base.includes(`.lt(${schema.exclusiveMaximum})`)
        ? `.lt(${schema.exclusiveMaximum})`
        : ''

    /**
     * Combine base with any .gt() or .lt() modifiers.
     *
     * Example:
     *   base: 'z.number().min(10).max(20)', needsGt: '.gt(10)', needsLt: '.lt(20)'
     *   → numbered = 'z.number().min(10).max(20).gt(10).lt(20)'
     */
    const numbered = `${base}${needsGt}${needsLt}`

    /**
     * Optimization step:
     * If both .min(x) and .gt(x) are present with the same value,
     * remove .min(x) to avoid redundancy.
     *
     * Example:
     *   input: 'z.number().min(10).gt(10)' → output: 'z.number().gt(10)'
     */
    const afterGt =
      schema.minimum !== undefined &&
      numbered.includes(`.min(${schema.minimum})`) &&
      numbered.includes(`.gt(${schema.minimum})`)
        ? removeMinIfGtExists(numbered, schema.minimum)
        : numbered

    /**
     * Same optimization for .max(x) and .lt(x):
     * If both are present with the same value, drop .max(x).
     *
     * Example:
     *   input: 'z.number().max(20).lt(20)' → output: 'z.number().lt(20)'
     */
    const afterLt =
      schema.maximum !== undefined &&
      afterGt.includes(`.max(${schema.maximum})`) &&
      afterGt.includes(`.lt(${schema.maximum})`)
        ? removeMaxIfLtExists(afterGt, schema.maximum)
        : afterGt

    /**
     * If the schema is marked as nullable: append .nullable()
     *
     * Example:
     *   input: z.number().gt(10) + nullable: true
     *   → output: z.number().gt(10).nullable()
     */
    return maybeApplyNullability(afterLt, schema)
  }

  /* integer & bigint */
  if (types.includes('integer')) {
    /**
     * Generate base Zod expression from the schema.
     * This may return z.number(), z.bigint(), or z.int64() based on the format.
     */
    const base = integer(schema)

    /**
     * Add .gt() only if exclusiveMinimum is defined AND not already included.
     *
     * Example:
     *   exclusiveMinimum: 10 → append `.gt(10)`
     */
    const needsGt =
      typeof schema.exclusiveMinimum === 'number' &&
      !base.includes(`.gt(${schema.exclusiveMinimum})`)
        ? `.gt(${schema.exclusiveMinimum})`
        : ''

    /**
     * Add .lt() only if exclusiveMaximum is defined AND not already included.
     *
     * Example:
     *   exclusiveMaximum: 100 → append `.lt(100)`
     */
    const needsLt =
      typeof schema.exclusiveMaximum === 'number' &&
      !base.includes(`.lt(${schema.exclusiveMaximum})`)
        ? `.lt(${schema.exclusiveMaximum})`
        : ''

    // Combine base with .gt() / .lt() modifiers
    const raw = `${base}${needsGt}${needsLt}`

    /**
     * Optimization:
     * If both .min(x) and .gt(x) exist with the same value, remove .min(x)
     * If both .max(x) and .lt(x) exist with the same value, remove .max(x)
     */
    const afterGt =
      schema.minimum !== undefined &&
      raw.includes(`.min(${schema.minimum})`) &&
      raw.includes(`.gt(${schema.minimum})`)
        ? removeMinIfGtExists(raw, schema.minimum)
        : raw

    const afterLt =
      schema.maximum !== undefined &&
      afterGt.includes(`.max(${schema.maximum})`) &&
      afterGt.includes(`.lt(${schema.maximum})`)
        ? removeMaxIfLtExists(afterGt, schema.maximum)
        : afterGt

    /**
     * Handle z.int64(): add `n` suffix to number literals (e.g., 100n)
     */
    const int64Fixed = afterLt.includes('z.int64()')
      ? afterLt.replace(/(-?\d+)(?=\))/g, '$1n')
      : afterLt

    /**
     * Handle z.bigint(): convert .min(123) → .min(BigInt(123))
     * and .max(999) → .max(BigInt(999)) using regex
     */
    const bigintPatched = int64Fixed.includes('z.bigint()')
      ? (() => {
          const NUM = /-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/i
          return int64Fixed
            .replace(
              new RegExp(`\\.min\\(\\s*(${NUM.source})\\s*\\)`, 'gi'),
              (_, n) => `.min(BigInt(${n}))`,
            )
            .replace(
              new RegExp(`\\.max\\(\\s*(${NUM.source})\\s*\\)`, 'gi'),
              (_, n) => `.max(BigInt(${n}))`,
            )
        })()
      : int64Fixed

    // Apply .nullable() if schema is nullable
    return maybeApplyNullability(bigintPatched, schema)
  }

  /* array */
  if (types.includes('array')) {
    if (schema.items === undefined) return maybeApplyNullability('z.array(z.any())', schema)

    const zodArray = array(zod(schema.items))

    // minItems/maxItems → .min()/ .max()
    const bounded =
      (schema.minItems !== undefined ? `${zodArray}${min(schema.minItems)}` : zodArray) +
      (schema.maxItems !== undefined ? max(schema.maxItems) : '')

    // minItems === maxItems → .length()
    if (schema.minItems !== undefined && schema.maxItems === schema.minItems) {
      return maybeApplyNullability(`${array(zod(schema.items))}${length(schema.minItems)}`, schema)
    }

    // legacy: minLength/maxLength on array (for existing tests)
    if (schema.minLength !== undefined && schema.maxLength === schema.minLength) {
      return maybeApplyNullability(`${zodArray}${length(schema.minLength)}`, schema)
    }

    return maybeApplyNullability(bounded, schema)
  }

  /* boolean */
  if (types.includes('boolean')) {
    return maybeApplyNullability('z.boolean()', schema)
  }

  /* combinators */
  if (schema.oneOf) {
    return oneOf(schema)
  }
  if (schema.anyOf) {
    return anyOf(schema)
  }
  if (schema.allOf) {
    return allOf(schema)
  }
  if (schema.not) {
    return not(schema)
  }

  /* null only */
  if (types.length === 1 && types[0] === 'null') return 'z.null()'

  console.warn(`Unknown schema: ${JSON.stringify(schema)} - fallback to z.any()`)
  return 'z.any()'
}
