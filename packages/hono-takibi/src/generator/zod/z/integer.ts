/**
 * Generates a Zod schema for integer types based on OpenAPI schema.
 * Supports int32, int64, and bigint formats.
 *
 * @param schema - The OpenAPI schema object
 * @returns The Zod schema string
 */
export function integer(args: {
  format?: string
  minimum?: number
  exclusiveMinimum?: number | boolean
  maximum?: number
  exclusiveMaximum?: number | boolean
  multipleOf?: number
}): string {
  const isInt32 = args.format === 'int32'
  const isInt64 = args.format === 'int64'
  const isBigInt = args.format === 'bigint'
  const o: string[] = [
    isInt32 ? 'z.int32()' : isInt64 ? 'z.int64()' : isBigInt ? 'z.bigint()' : 'z.int()',
  ]
  const lit = (n: number): string => {
    if (isBigInt) return `BigInt(${n})`
    if (isInt64) return `${n}n`
    return `${n}`
  }
  // minimum
  if (args.minimum !== undefined || args.exclusiveMinimum !== undefined) {
    // > 0
    // z.int().positive().safeParse(1) // { success: true }
    // z.int().positive().safeParse(0) // { success: false }
    if ((args.minimum ?? args.exclusiveMinimum) === 0 && args.exclusiveMinimum === true) {
      o.push('.positive()')
    }
    // >= 0
    // z.int().nonnegative().safeParse(0) // { success: true }
    // z.int().nonnegative().safeParse(-1) // { success: false }
    else if ((args.minimum ?? args.exclusiveMinimum) === 0 && args.exclusiveMinimum === false) {
      o.push('.nonnegative()')
    }
    // > value
    // z.int().gt(100) // value > 100
    // z.int().gt(100).safeParse(101) // { success: true }
    // z.int().gt(100).safeParse(100) // { success: false }
    else if (
      (args.exclusiveMinimum === true || args.minimum === undefined) &&
      typeof (args.minimum ?? args.exclusiveMinimum) === 'number'
    ) {
      const val = args.minimum ?? args.exclusiveMinimum
      if (
        (args.exclusiveMinimum === true || args.minimum === undefined) &&
        typeof val === 'number'
      ) {
        o.push(`.gt(${lit(val)})`)
      }
    }
    // >= value
    // z.int().min(100) // value >= 100
    // z.int().min(100).safeParse(100) // { success: true }
    // z.int().min(100).safeParse(99) // { success: false }
    else if (typeof args.minimum === 'number') {
      o.push(`.min(${lit(args.minimum)})`)
    }
  }
  // maximum
  if (args.maximum !== undefined || args.exclusiveMaximum !== undefined) {
    // < 0
    // z.int().negative().safeParse(-1) // { success: true }
    // z.int().negative().safeParse(0) // { success: false }
    if ((args.maximum ?? args.exclusiveMaximum) === 0 && args.exclusiveMaximum === true) {
      o.push('.negative()')
    }
    // <= 0
    // z.int().nonpositive().safeParse(0) // { success: true }
    // z.int().nonpositive().safeParse(1) // { success: false }
    else if ((args.maximum ?? args.exclusiveMaximum) === 0 && args.exclusiveMaximum === false) {
      o.push('.nonpositive()')
    }
    // < value
    // z.int().lt(100) // value < 100
    // z.int().lt(100).safeParse(99) -> { success: true }
    // z.int().lt(100).safeParse(100) -> { success: false }
    else if (
      (args.exclusiveMaximum === true || args.maximum === undefined) &&
      typeof (args.maximum ?? args.exclusiveMaximum) === 'number'
    ) {
      o.push(`.lt(${lit((args.maximum ?? args.exclusiveMaximum) as number)})`)
    }
    // <= value
    // z.int().max(100) // value <= 100
    // z.int().max(100).safeParse(100) -> { success: true }
    // z.int().max(100).safeParse(101) -> { success: false }
    else if (typeof args.maximum === 'number') {
      o.push(`.max(${lit(args.maximum)})`)
    }
  }
  // multipleOf
  // z.int().multipleOf(2).safeParse(2) // { success: true }
  // z.int().multipleOf(2).safeParse(1) // { success: false }
  if (args.multipleOf !== undefined && typeof args.multipleOf === 'number') {
    o.push(`.multipleOf(${lit(args.multipleOf)})`)
  }
  return o.join('')
}
