import type { Schema } from '../../../../../openapi/index.js'

/**
 * Converts an OpenAPI `not` schema to a Zod expression.
 *
 * @param schema - The OpenAPI schema containing a `not` keyword.
 * @returns A Zod expression as a string. Returns `'z.unknown()'` if `not` is present,
 *          or `'z.any()'` if `not` is undefined.
 *
 * @remarks
 * Zod does not support `not` directly. As a fallback, this function uses `z.unknown()`
 * to represent the negated schema. If no `not` keyword is provided, it defaults to `z.any()`.
 */
export function not(schema: Schema): string {
  if (!schema.not) {
    console.warn('not exists not')
    return 'z.any()'
  }
  return 'z.unknown()'
}
