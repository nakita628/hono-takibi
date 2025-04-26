import type { Schema } from '../../types'

/**
 * Check if an array has a schema reference
 * @param {Schema} schema - The schema to check
 * @returns {boolean} A boolean indicating if the array has a schema reference
 */
export function isArrayWithSchemaReference(schema: Schema): boolean {
  return schema.type === 'array' && Boolean(schema.items?.$ref)
}
