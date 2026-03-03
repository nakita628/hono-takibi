import type { Schema } from '../../../openapi/index.js'
import { error } from '../../../utils/index.js'

/**
 * Generates a Zod schema for integer types based on OpenAPI schema.
 *
 * Supports int32, int64, and bigint formats with min/max constraints.
 * Supports `x-minimum-message` and `x-maximum-message` vendor extensions
 * using the Zod v4 unified `{ error: "msg" }` parameter.
 *
 * @param schema - The OpenAPI schema object
 * @returns The Zod schema string
 *
 * @example
 * ```ts
 * // Basic integer
 * integer({ type: 'integer' })
 * // → 'z.int()'
 *
 * // int64 with constraints
 * integer({ type: 'integer', format: 'int64', minimum: 0, maximum: 100 })
 * // → 'z.int64().min(0n).max(100n)'
 *
 * // Exclusive minimum (greater than)
 * integer({ type: 'integer', exclusiveMinimum: 0 })
 * // → 'z.int().positive()'
 * ```
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

  const minimumMessage = schema['x-minimum-message']
  const minErrArg = minimumMessage ? error(minimumMessage) : ''
  const minErrPart = minErrArg ? `,${minErrArg}` : ''

  const minimum = (() => {
    if (schema.minimum === undefined && schema.exclusiveMinimum === undefined) {
      return undefined
    }
    const value = schema.minimum ?? schema.exclusiveMinimum
    if (value === 0 && schema.exclusiveMinimum === true) {
      return `.positive(${minErrArg})`
    }
    if (value === 0 && schema.exclusiveMinimum === false) {
      return `.nonnegative(${minErrArg})`
    }
    if (
      (schema.exclusiveMinimum === true || schema.minimum === undefined) &&
      typeof value === 'number'
    ) {
      return `.gt(${lit(value)}${minErrPart})`
    }
    if (typeof schema.minimum === 'number') {
      return `.min(${lit(schema.minimum)}${minErrPart})`
    }
    return undefined
  })()

  const maximumMessage = schema['x-maximum-message']
  const maxErrArg = maximumMessage ? error(maximumMessage) : ''
  const maxErrPart = maxErrArg ? `,${maxErrArg}` : ''

  const maximum = (() => {
    if (schema.maximum === undefined && schema.exclusiveMaximum === undefined) {
      return undefined
    }
    const value = schema.maximum ?? schema.exclusiveMaximum
    if (value === 0 && schema.exclusiveMaximum === true) {
      return `.negative(${maxErrArg})`
    }
    if (value === 0 && schema.exclusiveMaximum === false) {
      return `.nonpositive(${maxErrArg})`
    }
    if (
      (schema.exclusiveMaximum === true || schema.maximum === undefined) &&
      typeof value === 'number'
    ) {
      return `.lt(${lit(value)}${maxErrPart})`
    }
    if (typeof schema.maximum === 'number') {
      return `.max(${lit(schema.maximum)}${maxErrPart})`
    }
    return undefined
  })()

  const multipleOf =
    schema.multipleOf !== undefined && typeof schema.multipleOf === 'number'
      ? `.multipleOf(${lit(schema.multipleOf)})`
      : undefined

  return [base, minimum, maximum, multipleOf].filter((v) => v !== undefined).join('')
}
