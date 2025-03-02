import type { Schema } from '../../type'

/**
 * array has $ref
 *
 * @param schema - schema
 * @returns boolean
 */
export function isArrayWithSchemaReference(schema: Schema): boolean {
  return schema.type === 'array' && Boolean(schema.items?.$ref)
}
