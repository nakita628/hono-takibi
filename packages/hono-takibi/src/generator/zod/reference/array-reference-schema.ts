import type { Schema } from '../../../openapi/index.js'
import { getRefName } from '../../../core/schema/references/index.js'
import { array } from '../z/index.js'

/**
 * @param { Schema } schema - The schema to generate the array reference schema for
 * @returns { string } The generated array reference schema
 * @description Generates a Zod schema string for an array reference schema.
 */
export function arrayReferenceSchema(schema: Schema): string {
  if (!schema.items?.$ref) {
    return 'z.array(z.any())'
  }
  const refName = getRefName(schema.items?.$ref)
  if (!refName) {
    return 'z.array(z.any())'
  }

  return array(`${refName}Schema`)
}
