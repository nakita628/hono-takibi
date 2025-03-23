import type { Schema } from '../../../type'
import { traverseSchemaDependencies } from './traverse-schema-dependencies'

/**
 * @function resolveSchemasDependencies
 * @description Resolves dependencies between schemas and returns them in topological order for safe processing
 * @param schemas - Record mapping schema names to their Schema objects
 * @returns Array of schema names ordered by their dependencies
 *
 * @example
 * const schemas: Record<string, Schema> = {
 *   A: {
 *     type: 'object',
 *     properties: {
 *       b: {
 *         $ref: '#/components/schemas/B',
 *       },
 *       c: {
 *         $ref: '#/components/schemas/C',
 *       },
 *     },
 *     required: ['b', 'c'],
 *   },
 *   B: {
 *     type: 'object',
 *     properties: {
 *       id: {
 *         type: 'string',
 *         description: 'Identifier for schema B',
 *       },
 *       message: {
 *         type: 'string',
 *         description: 'Message from schema B',
 *       },
 *       required: ['id'],
 *     },
 *     C: {
 *       type: 'object',
 *       properties: {
 *         count: {
 *           type: 'integer',
 *           description: 'Count value',
 *         },
 *         flag: {
 *           type: 'boolean',
 *           description: 'A boolean flag',
 *         },
 *       },
 *     },
 *   }
 * }
 *
 * const orderedSchemas = resolveSchemasDependencies(schemas)
 * // Returns: ['B', 'C', 'A']
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

  for (const schemaName of Object.keys(schemas)) {
    if (!visited.has(schemaName)) {
      traverseSchemaDependencies(schemaName, schemas, visited, recursionStack, orderedSchemas)
    }
  }

  return orderedSchemas
}
