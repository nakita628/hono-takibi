import type { Schema } from '../../type'

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
