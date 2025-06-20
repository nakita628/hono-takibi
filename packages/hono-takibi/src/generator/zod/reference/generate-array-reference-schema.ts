import type { Schema } from '../../../openapi/index.js'
import { getRefName } from '../../../core/schema/references/get-ref-name.js'
import { array } from '../index.js'

/**
 * Generates a Zod schema string for an array reference
 * @param { Schema } schema - The schema to generate the array reference schema for
 * @returns { string } The generated array reference schema
 */
export function generateArrayReferenceSchema(
  schema: Schema,
): string {
  if (!schema.items?.$ref) {
    return 'z.array(z.any())'
  }
  const refName = getRefName(schema.items?.$ref)
  if (!refName) {
    return 'z.array(z.any())'
  }

  return array(`${refName}Schema`)
}
