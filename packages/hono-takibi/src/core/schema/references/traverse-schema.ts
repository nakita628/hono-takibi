import type { Schema } from '../../../openapi/index.js'
import { refName } from '../../utils/index.js'

/**
 * Recursively collects all `$ref` schema names from an OpenAPI schema.
 *
 * This function walks through the schema tree and extracts reference names
 * (e.g., `#/components/schemas/User` → `User`) into the provided `Set`.
 *
 * @param schema - The OpenAPI schema object to traverse.
 * @param refs - A `Set` that will be mutated to contain found reference names.
 *
 * @example
 * ```ts
 * import { traverseSchema } from './traverse-schema'
 *
 * const schema = {
 *   type: 'object',
 *   properties: {
 *     user: { $ref: '#/components/schemas/User' },
 *     orders: {
 *       type: 'array',
 *       items: { $ref: '#/components/schemas/Order' }
 *     },
 *     address: {
 *       type: 'object',
 *       properties: {
 *         country: { $ref: '#/components/schemas/Country' }
 *       }
 *     }
 *   }
 * }
 *
 * const refs = new Set<string>()
 * traverseSchema(schema, refs)
 *
 * console.log(refs) // → Set { 'User', 'Order', 'Country' }
 * ```
 */
export function traverseSchema(schema: Schema, refs: Set<string>): void {
  // Exit if schema is undefined or not an object
  if (!schema || typeof schema !== 'object') return
  // If schema has a $ref property, extract and store the referenced schema name
  if (schema.$ref) {
    const ref = refName(schema.$ref)
    if (ref) refs.add(ref)
  }
  // Recursively process each property in the properties object
  if (schema.properties) {
    for (const property of Object.values(schema.properties)) {
      traverseSchema(property, refs)
    }
  }
  // Recursively process array item schemas
  if (schema.items) traverseSchema(schema.items, refs)
}
