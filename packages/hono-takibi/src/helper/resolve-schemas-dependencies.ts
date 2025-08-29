import type { Schema } from '../openapi/index.js'

/**
 * Resolves schema dependencies in topological order based on `$ref` links.
 *
 * This function analyzes OpenAPI schema objects and determines the correct
 * order in which schemas should be processed or emitted, ensuring that
 * referenced schemas appear before the ones that depend on them.
 *
 * @param schemas - A map of schema names to their OpenAPI Schema objects.
 * @returns A list of schema names sorted in topological order.
 * @throws If a circular reference is detected among the schemas.
 */
export function resolveSchemasDependencies(
  schemas: Readonly<Record<string, Schema>>,
): Readonly<string[]> {
  const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null

  const collectRefs = (schema: Schema): string[] => {
    const refs = new Set<string>()
    const stack = [schema]

    while (stack.length) {
      const node = stack.pop()
      if (!isRecord(node)) continue

      if ('$ref' in node && typeof node.$ref === 'string') {
        const refName = node.$ref.slice(node.$ref.lastIndexOf('/') + 1)
        if (refName) refs.add(refName)
      }

      for (const value of Object.values(node)) {
        if (isRecord(value)) stack.push(value)
      }
    }
    return Array.from(refs).sort()
  }

  const sorted: string[] = []
  const perm = new Set<string>()
  const temp = new Set<string>()

  const visit = (name: string): void => {
    if (perm.has(name)) return
    if (temp.has(name)) throw new Error(`Circular dependency: ${name}`)

    const schema = schemas[name]
    if (!schema) return

    temp.add(name)
    for (const ref of collectRefs(schema)) {
      if (ref in schemas) visit(ref)
    }
    temp.delete(name)

    perm.add(name)
    sorted.push(name)
  }

  for (const name of Object.keys(schemas).sort()) {
    visit(name)
  }

  return sorted
}
