import type { Schema } from '../../../openapi/index.js'
import { extractRefs } from './index.js'

/**
 * Resolves schema dependencies in topological order.
 *
 * @param schemaName - Entry point schema name.
 * @param schemas - All available schemas.
 * @param visited - Tracks processed schemas.
 * @param recursionStack - Detects circular references.
 * @param orderedSchemas - Output list of resolved schema names.
 */
export function traverseSchemaDependencies(
  schemaName: string,
  schemas: Record<string, Schema>,
  visited: Set<string>,
  recursionStack: Set<string>,
  orderedSchemas: string[],
): void {
  if (visited.has(schemaName)) return
  if (recursionStack.has(schemaName)) {
    throw new Error(`Circular dependency detected in schema: ${schemaName}`)
  }

  recursionStack.add(schemaName)
  const schema = schemas[schemaName]
  if (schema) {
    for (const ref of extractRefs(schema)) {
      if (schemas[ref]) {
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
