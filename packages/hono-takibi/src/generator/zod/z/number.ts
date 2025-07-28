import type { Schema } from '../../../openapi/types.js'

/**
 * Generates a Zod schema for number types based on OpenAPI schema.
 * Supports float, float32, float64, and number formats.
 *
 * @param schema - The OpenAPI schema object
 * @returns The Zod schema string
 */
export function number(schema: Schema): string {
  const o: string[] = [
    schema.format === 'float' || schema.format === 'float32'
      ? 'z.float32()'
      : schema.format === 'float64'
        ? 'z.float64()'
        : 'z.number()',
  ]
  // positive
  // z.number().positive().safeParse(1) // { success: true }
  // z.number().positive().safeParse(0) // { success: false }
  // > 0
  if (schema.minimum !== undefined && schema.minimum === 0 && schema.exclusiveMinimum === true) {
    o.push('.positive()')
  }
  // nonnegative === minimum === 0
  // >= 0
  // z.number().nonnegative().safeParse(0) // { success: true }
  // z.number().nonnegative().safeParse(-1) // { success: false }
  if (schema.minimum !== undefined && schema.minimum === 0 && schema.exclusiveMinimum === false) {
    o.push('.nonnegative()')
  }
  // negative
  // z.number().negative().safeParse(-1) // { success: true }
  // z.number().negative().safeParse(0) // { success: false }
  // < 0
  if (schema.maximum !== undefined && schema.maximum === 0 && schema.exclusiveMaximum === true) {
    o.push('.negative()')
  }
  // nonpositive === maximum === 0
  // <= 0
  // z.number().nonpositive().safeParse(1) // { success: true }
  // z.number().nonpositive().safeParse(0) // { success: false }
  if (schema.maximum !== undefined && schema.maximum === 0 && schema.exclusiveMaximum === false) {
    o.push('.nonpositive()')
  }
  // min
  // z.number().min(100) // value >= 100
  // z.number().min(100).safeParse(100) // { success: true }
  // z.number().min(100).safeParse(99) // { success: false }
  if (schema.minimum !== undefined && schema.minimum !== 0) {
    if (schema.exclusiveMinimum === true) {
      // gt
      // z.number().gt(100) // value > 100
      // z.number().gt(100).safeParse(101) // { success: true }
      // z.number().gt(100).safeParse(100) // { success: false }
      o.push(`.gt(${schema.minimum})`)
    } else {
      o.push(`.min(${schema.minimum})`)
    }
  }
  // max
  // z.number().max(100) // value <= 100
  // z.number().max(100).safeParse(100) -> { success: true }
  // z.number().max(100).safeParse(101) -> { success: false }
  if (schema.maximum !== undefined && schema.maximum !== 0) {
    // lt
    // z.number().lt(100) // value < 100
    // z.number().lt(100).safeParse(99) -> { success: true }
    // z.number().lt(100).safeParse(100) -> { success: false }
    if (schema.exclusiveMaximum === true) {
      o.push(`.lt(${schema.maximum})`)
    } else {
      o.push(`.max(${schema.maximum})`)
    }
  }
  // multipleOf
  // z.number().multipleOf(2).safeParse(2) // { success: true }
  // z.number().multipleOf(2).safeParse(1) // { success: false }
  if (schema.multipleOf !== undefined) {
    o.push(`.multipleOf(${schema.multipleOf})`)
  }
  // default (always last)
  if (schema.default !== undefined) {
    o.push(`.default(${JSON.stringify(schema.default)})`)
  }
  return o.join('')
}
