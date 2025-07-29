import type { Schema } from '../../../openapi/index.js'

/**
 * Generates a Zod schema for integer types based on OpenAPI schema.
 * Supports int32, int64, and bigint formats.
 *
 * @param schema - The OpenAPI schema object
 * @returns The Zod schema string
 */
export function integer(schema: Schema): string {
  const isInt32 = schema.format === 'int32'
  const isInt64 = schema.format === 'int64'
  const isBigInt = schema.format === 'bigint'
  const o: string[] = [
    isInt32 ? 'z.int32()' : isInt64 ? 'z.int64()' : isBigInt ? 'z.bigint()' : 'z.int()',
  ]

  const lit = (n: number): string => {
    if (isBigInt) return `BigInt(${n})`
    if (isInt64) return `${n}n`
    return `${n}`
  }

  // minimum
  if (schema.minimum !== undefined || schema.exclusiveMinimum !== undefined) {
    // > 0
    // z.int().positive().safeParse(1) // { success: true }
    // z.int().positive().safeParse(0) // { success: false }
    if ((schema.minimum ?? schema.exclusiveMinimum) === 0 && schema.exclusiveMinimum === true) {
      o.push('.positive()')
    }
    // >= 0
    // z.int().nonnegative().safeParse(0) // { success: true }
    // z.int().nonnegative().safeParse(-1) // { success: false }
    else if (
      (schema.minimum ?? schema.exclusiveMinimum) === 0 &&
      schema.exclusiveMinimum === false
    ) {
      o.push('.nonnegative()')
    }
    // > value
    // z.int().gt(100) // value > 100
    // z.int().gt(100).safeParse(101) // { success: true }
    // z.int().gt(100).safeParse(100) // { success: false }
    else if (
      (schema.exclusiveMinimum === true || schema.minimum === undefined) &&
      typeof (schema.minimum ?? schema.exclusiveMinimum) === 'number'
    ) {
      o.push(`.gt(${lit((schema.minimum ?? schema.exclusiveMinimum) as number)})`)
    }
    // >= value
    // z.int().min(100) // value >= 100
    // z.int().min(100).safeParse(100) // { success: true }
    // z.int().min(100).safeParse(99) // { success: false }
    else if (typeof schema.minimum === 'number') {
      o.push(`.min(${lit(schema.minimum)})`)
    }
  }

  // maximum
  if (schema.maximum !== undefined || schema.exclusiveMaximum !== undefined) {
    // < 0
    // z.int().negative().safeParse(-1) // { success: true }
    // z.int().negative().safeParse(0) // { success: false }
    if ((schema.maximum ?? schema.exclusiveMaximum) === 0 && schema.exclusiveMaximum === true) {
      o.push('.negative()')
    }
    // <= 0
    // z.int().nonpositive().safeParse(0) // { success: true }
    // z.int().nonpositive().safeParse(1) // { success: false }
    else if (
      (schema.maximum ?? schema.exclusiveMaximum) === 0 &&
      schema.exclusiveMaximum === false
    ) {
      o.push('.nonpositive()')
    }
    // < value
    // z.int().lt(100) // value < 100
    // z.int().lt(100).safeParse(99) -> { success: true }
    // z.int().lt(100).safeParse(100) -> { success: false }
    else if (
      (schema.exclusiveMaximum === true || schema.maximum === undefined) &&
      typeof (schema.maximum ?? schema.exclusiveMaximum) === 'number'
    ) {
      o.push(`.lt(${lit((schema.maximum ?? schema.exclusiveMaximum) as number)})`)
    }
    // <= value
    // z.int().max(100) // value <= 100
    // z.int().max(100).safeParse(100) -> { success: true }
    // z.int().max(100).safeParse(101) -> { success: false }
    else if (typeof schema.maximum === 'number') {
      o.push(`.max(${lit(schema.maximum)})`)
    }
  }

  // multipleOf
  // z.int().multipleOf(2).safeParse(2) // { success: true }
  // z.int().multipleOf(2).safeParse(1) // { success: false }
  if (schema.multipleOf !== undefined && typeof schema.multipleOf === 'number') {
    o.push(`.multipleOf(${lit(schema.multipleOf)})`)
  }

  // default (always last)
  if (schema.default !== undefined && typeof schema.default === 'number') {
    o.push(`.default(${lit(schema.default)})`)
  }

  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')

  if (isNullable) {
    o.push('.nullable()')
  }

  return o.join('')
}
