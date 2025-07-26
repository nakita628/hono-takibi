import type { Schema } from '../openapi/index.js'

/**
 * Checks if a schema is exactly `{ nullable: true }`.
 *
 * @param schema - The schema object to evaluate.
 * @returns `true` if the schema has only `nullable: true`, otherwise `false`.
 *
 * @example
 * ```ts
 * isNullableSchema({ nullable: true })                // true
 * isNullableSchema({ nullable: true, type: 'string' }) // false
 * isNullableSchema({})                                 // false
 * ```
 */
export function isNullableSchema(schema: Schema): boolean {
  return 'nullable' in schema && schema.nullable === true && Object.keys(schema).length === 1
}
