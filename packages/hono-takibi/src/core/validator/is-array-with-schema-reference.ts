import type { Schema } from '../../type'

/**
 * Checks if an array has a schema reference.
 *
 * @function isArrayWithSchemaReference
 * @param schema - The schema to check.
 * @returns boolean
 */
export function isArrayWithSchemaReference(schema: Schema): boolean {
  return schema.type === 'array' && Boolean(schema.items?.$ref)
}
