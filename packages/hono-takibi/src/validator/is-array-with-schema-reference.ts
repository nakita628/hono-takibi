import type { Schema } from '../openapi/index.js'

/**
 * Checks whether a schema represents an array whose items are a `$ref` reference.
 *
 * @param schema - The OpenAPI schema object to check.
 * @returns `true` if the schema is an array with `$ref` in its `items` field, otherwise `false`.
 *
 * @example
 * ```ts
 * isArrayWithSchemaReference({
 *   type: 'array',
 *   items: { $ref: '#/components/schemas/User' }
 * })
 * // → true
 *
 * isArrayWithSchemaReference({
 *   type: 'array',
 *   items: { type: 'string' }
 * })
 * // → false
 *
 * isArrayWithSchemaReference({
 *   type: 'object'
 * })
 * // → false
 * ```
 */
export function isArrayWithSchemaReference(schema: Schema): boolean {
  return schema.type === 'array' && Boolean(schema.items?.$ref)
}
