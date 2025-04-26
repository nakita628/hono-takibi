import type { Schema } from '../../../types'
import { extractRefs } from './extract-refs'

/**
 * Traverses the schema dependencies and returns them in topological order
 * @param { string } schemaName - The name of the schema to traverse
 * @param { Record<string, Schema> } schemas - The schemas to traverse
 * @param { Set<string> } visited - The visited schemas
 * @param { Set<string> } recursionStack - The recursion stack
 * @param { string[] } orderedSchemas - The ordered schemas
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
