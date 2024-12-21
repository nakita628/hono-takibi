import type { Schema } from '../../../types'
import { findReferences } from './find-references'

/**
 * Creates a dependency map for all schemas and their references in an OpenAPI specification
 *
 * @function resolveSchemaReferences
 * @param schemas - Record mapping schema names to their Schema objects
 * @returns A Map where keys are schema names and values are Sets of referenced schema names
 *
 * @example
 * const schemas = {
 *   User: {
 *     type: 'object',
 *     properties: {
 *       profile: { $ref: '#/components/schemas/Profile' },
 *       addresses: {
 *         type: 'array',
 *         items: { $ref: '#/components/schemas/Address' }
 *       }
 *     }
 *   },
 *   Profile: {
 *     type: 'object',
 *     properties: {
 *       name: { type: 'string' }
 *     }
 *   },
 *   Address: {
 *     type: 'object',
 *     properties: {
 *       street: { type: 'string' }
 *     }
 *   }
 * }
 *
 * const dependencies = resolveSchemaReferences(schemas)
 * // dependencies contains:
 * // Map {
 * //   'User' => Set { 'Profile', 'Address' },
 * //   'Profile' => Set {},
 * //   'Address' => Set {}
 * // }
 *
 * @note
 * - Creates a complete dependency graph for all schemas
 * - Handles nested references in arrays and objects
 * - Empty Sets indicate schemas with no dependencies
 * - Used for determining the correct order of schema generation
 */
export function resolveSchemaReferences(schemas: Record<string, Schema>): Map<string, Set<string>> {
  // 1. initialize dependencies map
  const dependencies = new Map<string, Set<string>>()
  // 2. resolve each schema reference
  for (const [name, schema] of Object.entries(schemas)) {
    dependencies.set(name, findReferences(schema))
  }
  // 3. return dependencies map
  return dependencies
}
