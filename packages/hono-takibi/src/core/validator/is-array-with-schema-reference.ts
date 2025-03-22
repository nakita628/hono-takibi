import type { Schema } from '../../type'

/**
 * @function isArrayWithSchemaReference
 * @description Checks if an array has a schema reference.
 * @param schema - The schema to check.
 * @returns boolean
 */
export function isArrayWithSchemaReference(schema: Schema): boolean {
  return schema.type === 'array' && Boolean(schema.items?.$ref)
}
