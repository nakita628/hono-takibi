import type { Schema } from '../../../openapi/types.js'
import { regex } from '../../../utils/index.js'

/**
 * Generates a Zod schema for integer types based on OpenAPI schema.
 * Supports int32, int64, and bigint formats.
 *
 * @param schema - The OpenAPI schema object
 * @returns The Zod schema string
 */
export function integer(schema: Schema): string {
  /* ─────────────── 1. base type ─────────────── */
  const isInt32 = schema.format === 'int32'
  const isInt64 = schema.format === 'int64'
  const isBigInt = schema.format === 'bigint'

  const out: string[] = [
    isInt32 ? 'z.int32()' : isInt64 ? 'z.int64()' : isBigInt ? 'z.bigint()' : 'z.int()',
  ]

  /* ─────────────── 2. helpers ─────────────── */
  /**
   * Converts a numeric literal into the correct representation
   * for int64 / bigint boundaries and defaults.
   */
  const lit = (n: number, forceCtor = false): string => {
    if (isBigInt || forceCtor) return `BigInt(${n})`
    if (isInt64) return `${n}n`
    return `${n}`
  }

  /* ─────────────── 3. pattern ─────────────── */
  if (schema.pattern) out.push(regex(schema.pattern))

  /* ─────────────── 4. lower bound ─────────────── */
  if (typeof schema.exclusiveMinimum === 'number') {
    out.push(`.gt(${lit(schema.exclusiveMinimum)})`)
  } else if (schema.minimum === 0 && schema.exclusiveMinimum === true) {
    out.push('.positive()')
  } else if (typeof schema.minimum === 'number') {
    out.push(`.min(${lit(schema.minimum)})`)
  }

  /* ─────────────── 5. upper bound ─────────────── */
  if (typeof schema.exclusiveMaximum === 'number') {
    out.push(`.lt(${lit(schema.exclusiveMaximum)})`)
  } else if (schema.maximum === 0 && schema.exclusiveMaximum === true) {
    out.push('.negative()')
  } else if (typeof schema.maximum === 'number') {
    out.push(`.max(${lit(schema.maximum)})`)
  }

  /* ─────────────── 6. default (always last) ─────────────── */
  if (schema.default !== undefined) {
    const def =
      typeof schema.default === 'number'
        ? lit(schema.default, /* forceCtor: BigInt as needed */ true)
        : JSON.stringify(schema.default)
    out.push(`.default(${def})`)
  }

  /* ─────────────── 7. finish ─────────────── */
  return out.join('')
}
