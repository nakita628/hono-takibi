import type { Schema } from '../../types/index.js'

/**
 * Check if a given sub-schema is `nullable`
 * @param { Schema } schema - The sub-schema to evaluate
 * @returns { boolean } `true` if `nullable` is set to `true` and it is the only key in the schema, otherwise `false`
 */
export function isNullableSchema(schema: Schema): boolean {
  return 'nullable' in schema && schema.nullable === true && Object.keys(schema).length === 1
}
