import type { Schema } from '../../../openapi/index.js'
import { traverseSchemaDependencies } from './index.js'

/**
 * Resolves schema dependencies and returns their names in topological order.
 *
 * Ensures that each schema appears after all its dependencies,
 * making it suitable for generating code where types must be defined in order.
 *
 * @param schemas - A map of schema names to their corresponding schema definitions.
 * @returns An array of schema names ordered by dependency resolution.
 *
 * @example
 * ```ts
 * import { resolveSchemasDependencies } from './resolve'
 *
 * const schemas: Record<string, Schema> = {
 *   A: {
 *     type: 'object',
 *     properties: {
 *       b: { $ref: '#/components/schemas/B' },
 *       c: { $ref: '#/components/schemas/C' }
 *     }
 *   },
 *   B: {
 *     type: 'object',
 *     properties: {
 *       id: { type: 'string' },
 *       message: { type: 'string' }
 *     }
 *   },
 *   C: {
 *     type: 'object',
 *     properties: {
 *       count: { type: 'integer' },
 *       flag: { type: 'boolean' }
 *     }
 *   }
 * }
 *
 * const ordered = resolveSchemasDependencies(schemas)
 * console.log(ordered) // → ['B', 'C', 'A']
 * ```
 */
export function resolveSchemasDependencies(schemas: Record<string, Schema>): string[] {
  const visited = new Set<string>()
  const recursionStack = new Set<string>()
  const orderedSchemas: string[] = []

  for (const schemaName of Object.keys(schemas)) {
    if (!visited.has(schemaName)) {
      traverseSchemaDependencies(schemaName, schemas, visited, recursionStack, orderedSchemas)
    }
  }

  return orderedSchemas
}
