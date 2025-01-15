import type { Schema } from '../../../types'
import { extractRefs } from './extract-refs'
import { resolveSchemaOrder } from './resolve-schema-order'
import { resolveSchemaReferences } from './resolve-schema-references'

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
// export function resolveSchemasDependencies(schemas: Record<string, Schema>): string[] {
//   // 1. get schema reference relations as a map
//   const dependencies = resolveSchemaReferences(schemas)
//   // 2. initialize ordered list and visited set
//   const ordered: string[] = []
//   const visited = new Set<string>()
//   // 3. resolve schema order
//   for (const name of Object.keys(schemas)) {
//     resolveSchemaOrder(name, dependencies, visited, ordered)
//   }
//   // 4. return ordered list
//   return ordered
// }

export function resolveSchemasDependencies(schemas: Record<string, Schema>): string[] {
  const visited: Record<string, boolean> = {}
  const temp: Record<string, boolean> = {}
  const result: string[] = []

  const visit = (schemaName: string) => {
    if (temp[schemaName]) {
      throw new Error(`bad schema: ${schemaName}`)
    }

    if (!visited[schemaName]) {
      temp[schemaName] = true
      const schema = schemas[schemaName]
      if (schema) {
        const refs = extractRefs(schema)
        for (const ref of refs) {
          if (schemas[ref]) {
            visit(ref)
          } else {
            console.warn(`not found schema: ${ref}`)
          }
        }
      }
      visited[schemaName] = true
      temp[schemaName] = false
      result.push(schemaName)
    }
  }

  for (const schemaName of Object.keys(schemas)) {
    if (!visited[schemaName]) {
      visit(schemaName)
    }
  }

  return result
}
