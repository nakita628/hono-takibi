import type { Schema } from '../../types'

/**
 * isSchemaReference
 * is schema reference
 *
 * @param schema
 * @returns boolean
 */
export function isSchemaReference(schema: Schema): boolean {
  return Boolean(schema.$ref)
}
