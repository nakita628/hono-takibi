import type { Schema } from '../../type'

/**
 * Checks if the schema is a reference
 *
 * @function isSchemaReference
 * @param schema
 * @returns boolean
 */
export function isSchemaReference(schema: Schema): boolean {
  return Boolean(schema.$ref)
}
