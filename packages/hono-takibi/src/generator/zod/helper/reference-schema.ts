import type { Schema } from '../../../openapi/index.js'
import { refName } from '../../../utils/index.js'

/**
 * Generates a Zod schema string for a referenced schema.
 *
 * If the schema contains a `$ref`, it extracts the reference name and appends `Schema`.
 * Falls back to `'z.any()'` if the `$ref` is missing or invalid.
 *
 * @param schema - The OpenAPI schema object containing a `$ref`
 * @returns The Zod schema string referencing another schema
 *
 * @example
 * // Reference to Category schema
 * referenceSchema({ $ref: '#/components/schemas/Category' })
 * // → 'CategorySchema'
 *
 * @example
 * // Invalid reference
 * referenceSchema({})
 * // → 'z.any()'
 *
 * @example
 * // Malformed $ref
 * referenceSchema({ $ref: '#/components/schemas/' })
 * // → 'z.any()'
 */
export function referenceSchema(schema: Schema): string {
  if (!schema.$ref) {
    return 'z.any()'
  }
  const ref = refName(schema.$ref)
  if (!ref) {
    return 'z.any()'
  }

  return `${ref}Schema` || 'z.any()'
}
