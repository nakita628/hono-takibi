import type { Schema } from '../../../type'
import { extractRefs } from './extract-refs'

/**
 * @function traverseSchemaDependencies
 * @description Traverses the schema dependencies and returns them in topological order
 * @param schemaName - The name of the schema to traverse
 * @param schemas - The schemas to traverse
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
