import type { Schema } from '../../../openapi/index.js'
import { getRefName } from './get-ref-name.js'

/**
 * Recursively traverses an OpenAPI schema to collect all $ref references
 * @param { Schema } schema - The OpenAPI schema object to traverse
 * @param { Set<string> } refs - Set to collect found reference names
 *
 * @example
 * const refs = new Set<string>()
 * const schema = {
 *   type: 'object',
 *   properties: {
 *     user: {
 *       $ref: '#/components/schemas/User'
 *     },
 *     orders: {
 *       type: 'array',
 *       items: {
 *         $ref: '#/components/schemas/Order'
 *       }
 *     },
 *     address: {
 *       type: 'object',
 *       properties: {
 *         country: {
 *           $ref: '#/components/schemas/Country'
 *         }
 *       }
 *     }
 *   }
 * }
 *
 * traverseSchema(schema, refs)
 * // refs contains: Set { 'User', 'Order', 'Country' }
 *
 * - Mutates the provided refs Set by adding found references
 * - Handles nested references in:
 *   - Object properties
 *   - Array items
 *   - Nested objects
 * - Skips invalid or non-object schemas
 * - Extracts only the schema name from $ref paths
 *   (e.g., '#/components/schemas/User' → 'User')
 * - Performs depth-first traversal of the schema structure
 */
export function traverseSchema(schema: Schema, refs: Set<string>): void {
  // Exit if schema is undefined or not an object
  if (!schema || typeof schema !== 'object') return
  // If schema has a $ref property, extract and store the referenced schema name
  if (schema.$ref) {
    const ref = getRefName(schema.$ref)
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
