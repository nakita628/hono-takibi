import type { Schema } from '../../types/index.js'

/**
 * Check if the schema is a reference
 * @param { Schema } schema - The schema to check
 * @returns { boolean } A boolean indicating if the schema is a reference
 */
export function isSchemaReference(schema: Schema): boolean {
  return Boolean(schema.$ref)
}
