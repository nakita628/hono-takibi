import type { Schema } from '../../../openapi/index.js'

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

  // minimum
  if (schema.minimum !== undefined) {
    // > 0
    // z.number().positive().safeParse(1) // { success: true }
    // z.number().positive().safeParse(0) // { success: false }
    if (schema.minimum === 0 && schema.exclusiveMinimum === true) {
      o.push('.positive()')
    }
    // >= 0
    // z.number().nonnegative().safeParse(0) // { success: true }
    // z.number().nonnegative().safeParse(-1) // { success: false }
    else if (schema.minimum === 0 && schema.exclusiveMinimum === false) {
      o.push('.nonnegative()')
    }
    // > value
    // z.number().gt(100) // value > 100
    else if (schema.exclusiveMinimum === true) {
      o.push(`.gt(${schema.minimum})`)
    }
    // >= value
    // z.number().min(100) // value >= 100
    else {
      o.push(`.min(${schema.minimum})`)
    }
  } else if (typeof schema.exclusiveMinimum === 'number') {
    // > value (no minimum)
    o.push(`.gt(${schema.exclusiveMinimum})`)
  }

  // maximum
  if (schema.maximum !== undefined) {
    // < 0
    // z.number().negative().safeParse(-1) // { success: true }
    // z.number().negative().safeParse(0) // { success: false }
    if (schema.maximum === 0 && schema.exclusiveMaximum === true) {
      o.push('.negative()')
    }
    // <= 0
    // z.number().nonpositive().safeParse(0) // { success: true }
    // z.number().nonpositive().safeParse(1) // { success: false }
    else if (schema.maximum === 0 && schema.exclusiveMaximum === false) {
      o.push('.nonpositive()')
    }
    // < value
    // z.number().lt(100) // value < 100
    else if (schema.exclusiveMaximum === true) {
      o.push(`.lt(${schema.maximum})`)
    }
    // <= value
    // z.number().max(100) // value <= 100
    else {
      o.push(`.max(${schema.maximum})`)
    }
  } else if (typeof schema.exclusiveMaximum === 'number') {
    // < value (no maximum)
    o.push(`.lt(${schema.exclusiveMaximum})`)
  }

  // multipleOf
  // z.number().multipleOf(2).safeParse(2) // { success: true }
  // z.number().multipleOf(2).safeParse(1) // { success: false }
  if (schema.multipleOf !== undefined) {
    o.push(`.multipleOf(${schema.multipleOf})`)
  }

  // default
  if (schema.default !== undefined) {
    o.push(`.default(${JSON.stringify(schema.default)})`)
  }

  // nullable
  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')

  if (isNullable) {
    o.push('.nullable()')
  }

  return o.join('')
}
