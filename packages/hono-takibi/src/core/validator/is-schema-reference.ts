import type { Schema } from '../../type'

/**
 * @function isSchemaReference
 * @description Checks if the schema is a reference
 * @param schema
 * @returns boolean
 */
export function isSchemaReference(schema: Schema): boolean {
  return Boolean(schema.$ref)
}
