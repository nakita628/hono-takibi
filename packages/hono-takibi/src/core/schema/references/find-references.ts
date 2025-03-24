import type { Schema } from '../../../type'
import { traverseSchema } from './traverse-schema'

/**
 * Collects all $ref references from an OpenAPI schema by recursively traversing it
 * @param { Schema } schema - The schema to search for references
 * @returns { Set<string> } A Set of strings containing all schema names referenced via $ref
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
 */
export function findReferences(schema: Schema): Set<string> {
  const refs = new Set<string>()
  traverseSchema(schema, refs)
  return refs
}
