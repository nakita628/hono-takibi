import type { Schema } from '../../../type'
import { isRefObject } from '../../validator/is-ref-object'

/**
 * @function extractRefs
 * @description Extracts all references from a given schema
 * @param schema - The schema to extract references from
 * @returns An array of reference names
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
