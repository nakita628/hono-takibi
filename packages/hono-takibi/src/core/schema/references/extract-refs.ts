import type { Schema } from '../../../openapi/index.js'
import { isRefObject } from '../../validator/index.js'

/**
 * Extracts all `$ref` names from a schema.
 *
 * @param schema - Schema to extract references from.
 * @returns Array of referenced schema names.
 */
export function extractRefs(schema: Schema): string[] {
  const refs: string[] = []

  const traverse = (obj: unknown): void => {
    if (!isRefObject(obj)) return

    for (const [key, value] of Object.entries(obj)) {
      if (key !== '$ref') {
        if (isRefObject(value)) {
          traverse(value)
        }
        continue
      }

      if (typeof value !== 'string') continue

      const refParts = value.split('/')
      const refName = refParts[refParts.length - 1]
      refs.push(refName)
    }
  }

  traverse(schema)
  return refs
}
