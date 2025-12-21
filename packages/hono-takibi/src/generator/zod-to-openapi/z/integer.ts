import type { Schemas } from '../../../openapi/index.js'

/**
 * Generates a Zod schema for integer types based on OpenAPI schema.
 * Supports int32, int64, and bigint formats.
 *
 * @param schemas - The OpenAPI schema object
 * @returns The Zod schema string
 */
export function integer(schemas: Schemas): string {
  const base =
    schemas.format === 'int32'
      ? 'z.int32()'
      : schemas.format === 'int64'
        ? 'z.int64()'
        : schemas.format === 'bigint'
          ? 'z.bigint()'
          : 'z.int()'

  const lit = (n: number): string => {
    if (schemas.format === 'bigint') return `BigInt(${n})`
    if (schemas.format === 'int64') return `${n}n`
    return `${n}`
  }

  const minimum = (() => {
    if (schemas.minimum === undefined && schemas.exclusiveMinimum === undefined) {
      return undefined
    }
    const value = schemas.minimum ?? schemas.exclusiveMinimum
    if (value === 0 && schemas.exclusiveMinimum === true) {
      return '.positive()'
    }
    if (value === 0 && schemas.exclusiveMinimum === false) {
      return '.nonnegative()'
    }
    // > value → .gt(...)
    if (
      (schemas.exclusiveMinimum === true || schemas.minimum === undefined) &&
      typeof value === 'number'
    ) {
      return `.gt(${lit(value)})`
    }
    // >= value → .min(...)
    if (typeof schemas.minimum === 'number') {
      return `.min(${lit(schemas.minimum)})`
    }
    return undefined
  })()

  const maximum = (() => {
    if (schemas.maximum === undefined && schemas.exclusiveMaximum === undefined) {
      return undefined
    }
    const value = schemas.maximum ?? schemas.exclusiveMaximum
    if (value === 0 && schemas.exclusiveMaximum === true) {
      return '.negative()'
    }
    if (value === 0 && schemas.exclusiveMaximum === false) {
      return '.nonpositive()'
    }
    if (
      (schemas.exclusiveMaximum === true || schemas.maximum === undefined) &&
      typeof value === 'number'
    ) {
      return `.lt(${lit(value)})`
    }
    if (typeof schemas.maximum === 'number') {
      return `.max(${lit(schemas.maximum)})`
    }
    return undefined
  })()

  const multipleOf =
    schemas.multipleOf !== undefined && typeof schemas.multipleOf === 'number'
      ? `.multipleOf(${lit(schemas.multipleOf)})`
      : undefined

  return [base, minimum, maximum, multipleOf].filter((v) => v !== undefined).join('')
}
