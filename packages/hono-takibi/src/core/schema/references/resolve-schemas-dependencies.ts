import type { Schema } from '../../../types'
import { extractRefs } from './extract-refs'

/**
 * Resolves dependencies between schemas and returns them in topological order for safe processing
 *
 * @function resolveSchemasDependencies
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

function traverseSchemaDependencies(
  schemaName: string,
  schemas: Record<string, Schema>,
  visited: Set<string>,
  recursionStack: Set<string>,
  orderedSchemas: string[],
): void {
  // Circular dependencies occur if they already exist on the recursing stack
  if (recursionStack.has(schemaName)) {
    throw new Error(`Circular dependency detected in schema: ${schemaName}`)
  }

  // Processed only if not visited
  if (!visited.has(schemaName)) {
    recursionStack.add(schemaName)
    const schema = schemas[schemaName]
    if (schema) {
      // Get other schemas referenced by the current schema
      const references = extractRefs(schema)
      for (const ref of references) {
        if (ref in schemas) {
          traverseSchemaDependencies(ref, schemas, visited, recursionStack, orderedSchemas)
        } else {
          console.warn(`Schema reference not found: ${ref}`)
        }
      }
    }
    recursionStack.delete(schemaName)
    visited.add(schemaName)
    orderedSchemas.push(schemaName)
  }
}
