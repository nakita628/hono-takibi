import type { Schema } from '../../type'

/**
 * Determines whether a given sub-schema is `nullable`.
 *
 * @param subSchema - The sub-schema to evaluate
 * @returns `true` if `nullable` is set to `true` and it is the only key in the schema, otherwise `false`
 */
export function isNullableSchema(schema: Schema): boolean {
  return 'nullable' in schema && schema.nullable === true && Object.keys(schema).length === 1
}
