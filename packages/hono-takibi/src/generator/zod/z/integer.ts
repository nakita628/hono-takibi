import type { Schema } from '../../../openapi/types.js'

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
  // positive
  // z.int().positive().safeParse(1) // { success: true }
  // z.int().positive().safeParse(0) // { success: false }
  // > 0
  if (schema.minimum !== undefined && schema.minimum === 0 && schema.exclusiveMinimum === true) {
    o.push('.positive()')
  }
  // nonnegative === minimum === 0
  // >= 0
  // z.int().nonnegative().safeParse(0) // { success: true }
  // z.int().nonnegative().safeParse(-1) // { success: false }
  if (schema.minimum !== undefined && schema.minimum === 0 && schema.exclusiveMinimum === false) {
    o.push('.nonnegative()')
  }
  // negative
  // z.int().negative().safeParse(-1) // { success: true }
  // z.int().negative().safeParse(0) // { success: false }
  // < 0
  if (schema.maximum !== undefined && schema.maximum === 0 && schema.exclusiveMaximum === true) {
    o.push('.negative()')
  }
  // nonpositive === maximum === 0
  // <= 0
  // z.int().nonpositive().safeParse(1) // { success: true }
  // z.int().nonpositive().safeParse(0) // { success: false }
  if (schema.maximum !== undefined && schema.maximum === 0 && schema.exclusiveMaximum === false) {
    o.push('.nonpositive()')
  }
  // min
  // z.int().min(100) // value >= 100
  // z.int().min(100).safeParse(100) // { success: true }
  // z.int().min(100).safeParse(99) // { success: false }
  if (schema.minimum !== undefined && schema.minimum !== 0) {
    if (schema.exclusiveMinimum === true) {
      // gt
      // z.int().gt(100) // value > 100
      // z.int().gt(100).safeParse(101) // { success: true }
      // z.int().gt(100).safeParse(100) // { success: false }
      o.push(`.gt(${schema.minimum})`)
    } else {
      o.push(`.min(${schema.minimum})`)
    }
  }
  // max
  // z.int().max(100) // value <= 100
  // z.int().max(100).safeParse(100) -> { success: true }
  // z.int().max(100).safeParse(101) -> { success: false }
  if (schema.maximum !== undefined && schema.maximum !== 0) {
    // lt
    // z.int().lt(100) // value < 100
    // z.int().lt(100).safeParse(99) -> { success: true }
    // z.int().lt(100).safeParse(100) -> { success: false }
    if (schema.exclusiveMaximum === true) {
      o.push(`.lt(${schema.maximum})`)
    } else {
      o.push(`.max(${schema.maximum})`)
    }
  }
  // multipleOf
  // z.int().multipleOf(2).safeParse(2) // { success: true }
  // z.int().multipleOf(2).safeParse(1) // { success: false }
  if (schema.multipleOf !== undefined) {
    o.push(`.multipleOf(${schema.multipleOf})`)
  }
  // default (always last)
  if (schema.default !== undefined) {
    o.push(`.default(${JSON.stringify(schema.default)})`)
  }
  return o.join('')
}
