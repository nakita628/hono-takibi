import { Schema } from '../../../types'
import { getRefName } from './get-ref-name'

/**
 * Recursively traverses an OpenAPI schema to collect all $ref references
 *
 * @function traverseSchema
 * @param schema - The OpenAPI schema object to traverse
 * @param refs - Set to collect found reference names
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
 * @note
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
  // 1. input check
  if (!schema || typeof schema !== 'object') return
  // 2. $ref process
  if (schema.$ref) {
    const ref = getRefName(schema.$ref)
    if (ref) refs.add(ref)
  }
  // 3. recursive property search
  if (schema.properties) {
    for (const property of Object.values(schema.properties)) {
      traverseSchema(property, refs)
    }
  }
  // 4. recursive items search
  if (schema.items) traverseSchema(schema.items, refs)
}
