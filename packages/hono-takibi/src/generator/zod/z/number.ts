/**
 * Generates a Zod schema for number types based on OpenAPI schema.
 * Supports float, float32, float64, and number formats.
 *
 * @param schema - The OpenAPI schema object
 * @returns The Zod schema string
 */
export function number(args: {
  format?: string
  minimum?: number
  exclusiveMinimum?: number | boolean
  maximum?: number
  exclusiveMaximum?: number | boolean
  multipleOf?: number
}): string {
  const o: string[] = [
    args.format === 'float' || args.format === 'float32'
      ? 'z.float32()'
      : args.format === 'float64'
        ? 'z.float64()'
        : 'z.number()',
  ]
  // minimum
  if (args.minimum !== undefined) {
    // > 0
    // z.number().positive().safeParse(1) // { success: true }
    // z.number().positive().safeParse(0) // { success: false }
    if (args.minimum === 0 && args.exclusiveMinimum === true) {
      o.push('.positive()')
    }
    // >= 0
    // z.number().nonnegative().safeParse(0) // { success: true }
    // z.number().nonnegative().safeParse(-1) // { success: false }
    else if (args.minimum === 0 && args.exclusiveMinimum === false) {
      o.push('.nonnegative()')
    }
    // > value
    // z.number().gt(100) // value > 100
    else if (args.exclusiveMinimum === true) {
      o.push(`.gt(${args.minimum})`)
    }
    // >= value
    // z.number().min(100) // value >= 100
    else {
      o.push(`.min(${args.minimum})`)
    }
  } else if (typeof args.exclusiveMinimum === 'number') {
    // > value (no minimum)
    o.push(`.gt(${args.exclusiveMinimum})`)
  }
  // maximum
  if (args.maximum !== undefined) {
    // < 0
    // z.number().negative().safeParse(-1) // { success: true }
    // z.number().negative().safeParse(0) // { success: false }
    if (args.maximum === 0 && args.exclusiveMaximum === true) {
      o.push('.negative()')
    }
    // <= 0
    // z.number().nonpositive().safeParse(0) // { success: true }
    // z.number().nonpositive().safeParse(1) // { success: false }
    else if (args.maximum === 0 && args.exclusiveMaximum === false) {
      o.push('.nonpositive()')
    }
    // < value
    // z.number().lt(100) // value < 100
    else if (args.exclusiveMaximum === true) {
      o.push(`.lt(${args.maximum})`)
    }
    // <= value
    // z.number().max(100) // value <= 100
    else {
      o.push(`.max(${args.maximum})`)
    }
  } else if (typeof args.exclusiveMaximum === 'number') {
    // < value (no maximum)
    o.push(`.lt(${args.exclusiveMaximum})`)
  }
  // multipleOf
  // z.number().multipleOf(2).safeParse(2) // { success: true }
  // z.number().multipleOf(2).safeParse(1) // { success: false }
  if (args.multipleOf !== undefined) {
    o.push(`.multipleOf(${args.multipleOf})`)
  }
  return o.join('')
}
