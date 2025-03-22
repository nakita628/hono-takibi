import type { Schema } from '../../../type'
import { traverseSchemaDependencies } from './traverse-schema-dependencies'

/**
 * @function resolveSchemasDependencies
 * @description Resolves dependencies between schemas and returns them in topological order for safe processing
 * @param schemas - Record mapping schema names to their Schema objects
 * @returns Array of schema names ordered by their dependencies
 *
 * @example
 * const schemas = {
 *   User: {
 *     type: 'object',
 *     properties: {
 *       profile: { $ref: '#/components/schemas/Profile' },
 *       settings: { $ref: '#/components/schemas/Settings' }
 *     }
 *   },
 *   Profile: {
 *     type: 'object',
 *     properties: {
 *       address: { $ref: '#/components/schemas/Address' }
 *     }
 *   },
 *   Settings: {
 *     type: 'object',
 *     properties: {
 *       theme: { type: 'string' }
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
 * const orderedSchemas = resolveSchemasDependencies(schemas)
 * // Returns: ['Address', 'Profile', 'Settings', 'User']
 *
 * @note
 * - Performs topological sorting of schemas based on their dependencies
 * - Ensures each schema appears after all its dependencies
 * - Handles multi-level dependency chains correctly
 * - Essential for generating valid code where dependent types must be defined first
 * - Uses depth-first search for dependency resolution
 * - Automatically handles circular dependencies by preventing infinite recursion
 */

export function resolveSchemasDependencies(schemas: Record<string, Schema>): string[] {
  const visited = new Set<string>()
  const recursionStack = new Set<string>()
  const orderedSchemas: string[] = []

  // Conduct visits for each schema
  for (const schemaName of Object.keys(schemas)) {
    if (!visited.has(schemaName)) {
      traverseSchemaDependencies(schemaName, schemas, visited, recursionStack, orderedSchemas)
    }
  }

  return orderedSchemas
}
