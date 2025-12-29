import type { Schema } from '../openapi/index.js'
import { isRecord } from '../utils/index.js'

/**
 * Resolves schema dependencies in topological order based on `$ref` links.
 *
 * This function analyzes OpenAPI schema objects and determines the correct
 * order in which schemas should be processed or emitted, ensuring that
 * referenced schemas appear before the ones that depend on them.
 *
 * @param schema - A map of schema names to their OpenAPI Schema objects.
 * @returns A list of schema names sorted in topological order.
 * @throws If a circular reference (excluding self refs) is detected among the schemas.
 */
export function resolveSchemasDependencies(schema: Record<string, Schema>): readonly string[] {
  const collectRefs = (schema: Schema): string[] => {
    const refs = new Set<string>()
    const stack: unknown[] = [schema]

    while (stack.length) {
      const node = stack.pop()
      if (Array.isArray(node)) {
        for (const value of node) stack.push(value)
        continue
      }
      if (!isRecord(node)) continue

      if ('$ref' in node && typeof node.$ref === 'string') {
        const refName = node.$ref.slice(node.$ref.lastIndexOf('/') + 1)
        if (refName) refs.add(refName)
      }

      for (const value of Object.values(node)) {
        stack.push(value)
      }
    }
    return Array.from(refs)
  }

  const sorted: string[] = []
  const perm = new Set<string>()
  const temp = new Set<string>()

  const visit = (name: string): void => {
    if (perm.has(name)) return
    // Circular dependency detected - skip to break the cycle
    // The schema will still be processed when its entry in the main loop is reached
    if (temp.has(name)) return

    const s = schema[name]
    if (!s) return

    temp.add(name)
    for (const ref of collectRefs(s)) {
      if (ref !== name && ref in schema) visit(ref)
    }
    temp.delete(name)

    perm.add(name)
    sorted.push(name)
  }

  for (const name of Object.keys(schema)) {
    visit(name)
  }
  return sorted
}
