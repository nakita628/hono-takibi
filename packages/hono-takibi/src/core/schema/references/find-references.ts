import type { Schema } from '../../../openapi/index.js'
import { traverseSchema } from './index.js'

/**
 * Collects all `$ref` schema names from a given OpenAPI schema.
 *
 * Recursively traverses the schema and extracts every `$ref` path,
 * returning their final segment (e.g., `#/components/schemas/Tag` → `Tag`).
 *
 * @param schema - The OpenAPI schema object to search.
 * @returns A `Set` containing all referenced schema names.
 *
 * @example
 * ```ts
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
 * console.log(refs) // → Set { 'Tag', 'Category' }
 * ```
 */
export function findReferences(schema: Schema): Set<string> {
  const refs = new Set<string>()
  traverseSchema(schema, refs)
  return refs
}
