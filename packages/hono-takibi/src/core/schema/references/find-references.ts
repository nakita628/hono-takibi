import type { Schema } from '../../../types'
import { traverseSchema } from './traverse_schema'

/**
 * Collects all $ref references from an OpenAPI schema by recursively traversing it
 *
 * @function findReferences
 * @param schema - The OpenAPI schema to search for references
 * @returns A Set of strings containing all schema names referenced via $ref
 *
 * @example
 * const schema = {
 *   type: 'object',
 *   properties: {
 *     tags: {
 *       type: 'array',
 *       items: {
 *         $ref: '#/components/schemas/Tag'
 *       }
 *     },
 *     category: {
 *       $ref: '#/components/schemas/Category'
 *     }
 *   }
 * }
 *
 * const refs = findReferences(schema)
 * // refs contains: Set { 'Tag', 'Category' }
 *
 * @note
 * - Extracts only the schema name from $ref paths
 *   e.g., '#/components/schemas/Tag' becomes 'Tag'
 * - Recursively traverses all properties in the schema
 * - Automatically deduplicates references via Set
 * - Handles nested references in arrays and objects
 */
export function findReferences(schema: Schema): Set<string> {
  const refs = new Set<string>()
  traverseSchema(schema, refs)
  return refs
}
