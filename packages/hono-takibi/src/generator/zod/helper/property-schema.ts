import { zodToOpenAPI } from '../../../helper/zod-to-openapi.js'
import type { Schema } from '../../../openapi/index.js'
import { refName } from '../../../utils/index.js'
import { zod } from '../index.js'

/**
 * Generates a Zod-compatible schema string for a given property.
 *
 * - Delegates `$ref` schemas to `referenceSchema`
 * - Handles arrays with referenced items via `arrayReferenceSchema`
 * - Falls back to `zodToOpenAPI` for primitives or complex inline schemas
 *
 * @param schema - The OpenAPI schema object for the property
 * @returns The corresponding Zod schema string
 *
 * @example
 * // Primitive string type
 * propertySchema({ type: 'string' })
 * // → 'z.string()'
 *
 * @example
 * // Reference to another schema
 * propertySchema({ $ref: '#/components/schemas/User' })
 * // → 'userSchema'
 *
 * @example
 * // Array of referenced items
 * propertySchema({ type: 'array', items: { $ref: '#/components/schemas/Tag' } })
 * // → 'z.array(tagSchema)'
 */
export function propertySchema(schema: Schema): string {
  if (Boolean(schema.$ref) === true) {
    if (schema.$ref) {
      const ref = refName(schema.$ref)
      return `${ref}Schema`
    }
    return 'z.any()'
  }
  if (schema.type === 'array' && Boolean(schema.items?.$ref)) {
    if (schema.items?.$ref) {
      const ref = refName(schema.items.$ref)
      return `z.array(${ref}Schema)`
    }
    return 'z.array(z.any())'
  }
  return zodToOpenAPI(zod(schema), schema)
}
