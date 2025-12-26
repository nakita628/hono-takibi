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
