import type { Schema } from '../../../openapi/index.js'
import { getRefName } from '../../../core/schema/references/index.js'

/**
 * Generates a Zod schema string for a reference
 * @param { Schema } schema - The schema to generate the reference schema for
 * @returns { string } The generated reference schema
 */
export function generateReferenceSchema(schema: Schema): string {
  if (!schema.$ref) {
    return 'z.any()'
  }
  const refName = getRefName(schema.$ref)
  if (!refName) {
    return 'z.any()'
  }

  return `${refName}Schema` || 'z.any()'
}
