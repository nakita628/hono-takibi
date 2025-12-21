import type { Schemas } from '../../../openapi/index.js'

/**
 * Generates a Zod schema for number types based on OpenAPI schema.
 * Supports float, float32, float64, and number formats.
 *
 * @param schemas - The OpenAPI schema object
 * @returns The Zod schema string
 */
export function number(schemas: Schemas): string {
  const base =
    schemas.format === 'float' || schemas.format === 'float32'
      ? 'z.float32()'
      : schemas.format === 'float64'
        ? 'z.float64()'
        : 'z.number()'

  const minimum = (() => {
    if (schemas.minimum !== undefined) {
      if (schemas.minimum === 0 && schemas.exclusiveMinimum === true) {
        return '.positive()'
      }
      if (schemas.minimum === 0 && schemas.exclusiveMinimum === false) {
        return '.nonnegative()'
      }
      if (schemas.exclusiveMinimum === true) {
        return `.gt(${schemas.minimum})`
      }
      return `.min(${schemas.minimum})`
    }
    if (typeof schemas.exclusiveMinimum === 'number') {
      return `.gt(${schemas.exclusiveMinimum})`
    }
    return undefined
  })()

  const maximum = (() => {
    if (schemas.maximum !== undefined) {
      if (schemas.maximum === 0 && schemas.exclusiveMaximum === true) {
        return '.negative()'
      }
      if (schemas.maximum === 0 && schemas.exclusiveMaximum === false) {
        return '.nonpositive()'
      }
      if (schemas.exclusiveMaximum === true) {
        return `.lt(${schemas.maximum})`
      }
      return `.max(${schemas.maximum})`
    }
    if (typeof schemas.exclusiveMaximum === 'number') {
      return `.lt(${schemas.exclusiveMaximum})`
    }
    return undefined
  })()

  const multipleOf =
    schemas.multipleOf !== undefined ? `.multipleOf(${schemas.multipleOf})` : undefined

  return [base, minimum, maximum, multipleOf].filter((v) => v !== undefined).join('')
}
