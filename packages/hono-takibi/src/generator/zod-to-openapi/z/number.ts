import type { Schema } from '../../../openapi/index.js'
import { error } from '../../../utils/index.js'

/**
 * Generates a Zod schema for number types based on OpenAPI schema.
 *
 * Supports float, float32, float64, and number formats with constraints.
 * Supports `x-minimum-message` and `x-maximum-message` vendor extensions
 * using the Zod v4 unified `{ error: "msg" }` parameter.
 *
 * @param schema - The OpenAPI schema object
 * @returns The Zod schema string
 *
 * @example
 * ```ts
 * // Basic number
 * number({ type: 'number' })
 * // → 'z.number()'
 *
 * // Float with constraints
 * number({ type: 'number', format: 'float', minimum: 0, maximum: 1.0 })
 * // → 'z.float32().min(0).max(1)'
 *
 * // Positive number (exclusive minimum = 0)
 * number({ type: 'number', minimum: 0, exclusiveMinimum: true })
 * // → 'z.number().positive()'
 * ```
 */
export function number(schema: Schema): string {
  const errorMessage = schema['x-error-message']
  const baseErrorArg = errorMessage ? error(errorMessage) : ''
  const base =
    schema.format === 'float' || schema.format === 'float32'
      ? `z.float32(${baseErrorArg})`
      : schema.format === 'float64'
        ? `z.float64(${baseErrorArg})`
        : `z.number(${baseErrorArg})`

  const minimumMessage = schema['x-minimum-message']
  const minErrArg = minimumMessage ? error(minimumMessage) : ''
  const minErrPart = minErrArg ? `,${minErrArg}` : ''

  const minimum = (() => {
    if (schema.minimum !== undefined) {
      if (schema.minimum === 0 && schema.exclusiveMinimum === true) {
        return `.positive(${minErrArg})`
      }
      if (schema.minimum === 0 && schema.exclusiveMinimum === false) {
        return `.nonnegative(${minErrArg})`
      }
      if (schema.exclusiveMinimum === true) {
        return `.gt(${schema.minimum}${minErrPart})`
      }
      return `.min(${schema.minimum}${minErrPart})`
    }
    if (typeof schema.exclusiveMinimum === 'number') {
      return `.gt(${schema.exclusiveMinimum}${minErrPart})`
    }
    return undefined
  })()

  const maximumMessage = schema['x-maximum-message']
  const maxErrArg = maximumMessage ? error(maximumMessage) : ''
  const maxErrPart = maxErrArg ? `,${maxErrArg}` : ''

  const maximum = (() => {
    if (schema.maximum !== undefined) {
      if (schema.maximum === 0 && schema.exclusiveMaximum === true) {
        return `.negative(${maxErrArg})`
      }
      if (schema.maximum === 0 && schema.exclusiveMaximum === false) {
        return `.nonpositive(${maxErrArg})`
      }
      if (schema.exclusiveMaximum === true) {
        return `.lt(${schema.maximum}${maxErrPart})`
      }
      return `.max(${schema.maximum}${maxErrPart})`
    }
    if (typeof schema.exclusiveMaximum === 'number') {
      return `.lt(${schema.exclusiveMaximum}${maxErrPart})`
    }
    return undefined
  })()

  const multipleOfMsg = schema['x-multipleOf-message']
  const multipleOfErrArg = multipleOfMsg
    ? `,${error(multipleOfMsg)}`
    : baseErrorArg
      ? `,${baseErrorArg}`
      : ''
  const multipleOf =
    schema.multipleOf !== undefined
      ? `.multipleOf(${schema.multipleOf}${multipleOfErrArg})`
      : undefined

  return [base, minimum, maximum, multipleOf].filter((v) => v !== undefined).join('')
}
