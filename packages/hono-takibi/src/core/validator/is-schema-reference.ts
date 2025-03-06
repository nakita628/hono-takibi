import type { Schema } from '../../type'

/**
 * isSchemaReference
 * is schema reference
 * @function isSchemaReference
 * @param schema
 * @returns boolean
 */
export function isSchemaReference(schema: Schema): boolean {
  return Boolean(schema.$ref)
}
