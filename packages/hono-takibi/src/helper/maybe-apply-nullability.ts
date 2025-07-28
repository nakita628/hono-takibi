import type { Schema } from "../openapi/index.js"


/**
 * Appends `.nullable()` to an expression if the schema allows null.
 *
 * Checks `schema.nullable === true` or `schema.type` including `"null"`.
 *
 * @param expr - The base expression string (e.g., a Zod call).
 * @param schema - The OpenAPI schema to inspect.
 * @returns The modified expression with `.nullable()` if applicable.
 *
 * @example
 * ```ts
 * const schema1 = { type: 'string', nullable: true }
 * maybeApplyNullability('z.string()', schema1)
 * // → 'z.string().nullable()'
 *
 * const schema2 = { type: ['string', 'null'] }
 * maybeApplyNullability('z.string()', schema2)
 * // → 'z.string().nullable()'
 *
 * const schema3 = { type: 'string' }
 * maybeApplyNullability('z.string()', schema3)
 * // → 'z.string()'
 * ```
 */
export function maybeApplyNullability(expr: string, schema: Schema): string {
  const types =
    schema.type === undefined ? [] : Array.isArray(schema.type) ? schema.type : [schema.type]
  return schema.nullable || types.includes('null') ? `${expr}.nullable()` : expr
}
