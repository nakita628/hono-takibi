import { getRefName } from '../../../core/utils/index.js'
import type { Schema } from '../../../openapi/index.js'
import { array } from '../z/index.js'

/**
 * Generates a Zod schema string for an array of referenced schemas.
 *
 * If the schema's `items` contains a `$ref`, it generates:
 * `z.array(<ref>Schema)`
 *
 * Falls back to `z.array(z.any())` if the `$ref` is missing or invalid.
 *
 * @param schema - The OpenAPI schema object with array type
 * @returns The Zod schema string for the array
 *
 * @example
 * // Array of Tag references
 * arrayReferenceSchema({
 *   type: 'array',
 *   items: { $ref: '#/components/schemas/Tag' }
 * })
 * // → 'z.array(tagSchema)'
 *
 * @example
 * // Invalid items reference
 * arrayReferenceSchema({ type: 'array', items: {} })
 * // → 'z.array(z.any())'
 *
 * @example
 * // Missing items
 * arrayReferenceSchema({ type: 'array' })
 * // → 'z.array(z.any())'
 */
export function arrayReferenceSchema(schema: Schema): string {
  if (!schema.items?.$ref) {
    return 'z.array(z.any())'
  }
  const refName = getRefName(schema.items?.$ref)
  if (!refName) {
    return 'z.array(z.any())'
  }

  return array(`${refName}Schema`)
}
