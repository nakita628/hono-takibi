import type { Schema } from '../../../openapi/types.js'
import { regex } from '../../../utils/index.js'

/**
 * Convert an OpenAPI integer schema to a Zod schema string
 * with `.default()` appended last.
 */
export function integer(schema: Schema): string {
  const isInt32 = schema.format === 'int32'
  const isInt64 = schema.format === 'int64'
  const isBigInt = schema.format === 'bigint'

  /* -------- base type -------- */
  const out: string[] = [
    isInt32 ? 'z.int32()' : isInt64 ? 'z.int64()' : isBigInt ? 'z.bigint()' : 'z.int()',
  ]

  /* -------- helpers -------- */
  const lit = (n: number, forceBigInt = false): string =>
    forceBigInt || isInt64 || isBigInt ? `${n}n` : `${n}`

  /* -------- pattern -------- */
  if (schema.pattern) out.push(regex(schema.pattern))

  /* -------- lower bound -------- */
  if (typeof schema.exclusiveMinimum === 'number') {
    out.push(`.gt(${lit(schema.exclusiveMinimum)})`)
  } else if (schema.minimum === 0 && schema.exclusiveMinimum === true) {
    out.push('.positive()')
  } else if (typeof schema.minimum === 'number') {
    out.push(`.min(${lit(schema.minimum)})`)
  }

  /* -------- upper bound -------- */
  if (typeof schema.exclusiveMaximum === 'number') {
    out.push(`.lt(${lit(schema.exclusiveMaximum)})`)
  } else if (schema.maximum === 0 && schema.exclusiveMaximum === true) {
    out.push('.negative()')
  } else if (typeof schema.maximum === 'number') {
    out.push(`.max(${lit(schema.maximum)})`)
  }

  /* -------- default (always last) -------- */
  if (schema.default !== undefined) {
    const def =
      typeof schema.default === 'number'
        ? lit(schema.default, /* forceBigInt */ true)
        : JSON.stringify(schema.default)
    out.push(`.default(${def})`)
  }

  return out.join('')
}
