import { zodToOpenAPI } from '../../../helper/zod-to-openapi.js'
import { isArrayWithSchemaReference } from '../../../core/validator/index.js'
import type { Schema } from '../../../openapi/index.js'
import { zod } from '../index.js'
import { arrayReferenceSchema, referenceSchema } from '../reference/index.js'

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
    return referenceSchema(schema)
  }

  if (isArrayWithSchemaReference(schema)) {
    return arrayReferenceSchema(schema)
  }

  return zodToOpenAPI(zod(schema), schema)
}
