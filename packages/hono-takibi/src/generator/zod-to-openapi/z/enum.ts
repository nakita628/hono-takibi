import type { Schema } from '../../../openapi/index.js'
import { error } from '../../../utils/index.js'

/**
 * Generates a Zod enum schema. String enums map to `z.enum`, number/integer/
 * boolean enums to `z.union([z.literal(...), ...])`, array enums to `z.tuple`
 * or `z.union`, single values to `z.literal`.
 *
 * `x-error-message` (whole-enum) is applied **only to the outermost
 * wrapper** (z.enum / z.union / z.tuple, or the bare z.literal in the
 * single-value case). Inner z.literal entries inside a wrapper never
 * receive a duplicate `error:` arg — Zod's outer wrapper already shadows
 * inner messages on validation failure, so the inner copy was dead.
 *
 * Per-literal `x-enum-error-messages` was removed entirely: a rejected
 * value by definition isn't in the enum, so a per-literal
 * `value === 'admin'` branch can never match. Whole-enum messages
 * come from `x-error-message`; finer-grained business rules belong in
 * handler code, not the schema.
 */
// oxlint-disable-next-line no-underscore-dangle -- `enum` is a reserved word
export function _enum(schema: Schema) {
  const ht = (t: string): boolean =>
    schema.type === t || (Array.isArray(schema.type) && schema.type.some((v) => v === t))
  // Zod v4 `z.enum` emits a single issue code (`invalid_value`) for both type
  // and value mismatches, so a per-code dispatch isn't possible — the
  // override is a clearer name for the enum case (no new capability).
  const enumMessage = schema['x-enum-message']
  const errorMessage = enumMessage ?? schema['x-error-message']
  const errorArg = errorMessage ? `,${error(errorMessage)}` : ''
  // Outer literal — used when the literal is the entire schema output.
  const outerLit = (v: unknown, suffix?: string): string => {
    const arg = suffix ?? errorArg
    if (v === null) return `z.literal(null${arg})`
    if (typeof v === 'string') return `z.literal('${v.replaceAll("'", "\\'")}'${arg})`
    if (typeof v === 'number' || typeof v === 'boolean') return `z.literal(${String(v)}${arg})`
    return `z.custom<${JSON.stringify(v)}>()`
  }
  // Inner literal — used inside a wrapper (z.union / z.tuple) that
  // already carries `errorArg`, so we don't repeat it.
  const innerLit = (v: unknown): string => outerLit(v, '')
  // Inner tuple — used inside a z.union of multiple tuples; the outer
  // union's errorArg covers this tuple too, so neither the tuple wrapper
  // nor its inner literals receive errorArg.
  const innerTuple = (arr: readonly unknown[]): string =>
    `z.tuple([${arr.map(innerLit).join(',')}])`
  // Outer tuple — used when a single tuple is the entire schema output.
  const outerTuple = (arr: readonly unknown[]): string =>
    `z.tuple([${arr.map(innerLit).join(',')}]${errorArg})`
  if (!schema.enum || schema.enum.length === 0) return 'z.any()'
  if (ht('number') || ht('integer')) {
    return schema.enum.length > 1
      ? `z.union([${schema.enum.map(innerLit).join(',')}]${errorArg})`
      : outerLit(schema.enum[0])
  }
  if (ht('boolean')) {
    return schema.enum.length > 1
      ? `z.union([${schema.enum.map(innerLit).join(',')}]${errorArg})`
      : outerLit(schema.enum[0])
  }
  if (ht('array')) {
    if (schema.enum.length === 1 && Array.isArray(schema.enum[0])) {
      return outerTuple(schema.enum[0])
    }
    const parts = schema.enum.map((v) => (Array.isArray(v) ? innerTuple(v) : innerLit(v)))
    return `z.union([${parts.join(',')}]${errorArg})`
  }
  if (schema.enum.every((v) => typeof v === 'string')) {
    if (schema.enum.length > 1) {
      return `z.enum(${JSON.stringify(schema.enum)}${errorArg})`
    }
    return outerLit(schema.enum[0])
  }
  if (schema.enum.length > 1) {
    return `z.union([${schema.enum.map(innerLit).join(',')}]${errorArg})`
  }
  return outerLit(schema.enum[0])
}
