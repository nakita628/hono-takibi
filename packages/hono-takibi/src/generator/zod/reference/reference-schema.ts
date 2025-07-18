import type { Schema } from '../../../openapi/index.js'
import { getRefName } from '../../../core/schema/references/index.js'

/**
 * @param { Schema } schema - The schema to generate the reference schema for
 * @returns { string } The generated reference schema
 * @description Generates a Zod schema string for a reference schema.
 */
export function referenceSchema(schema: Schema): string {
  if (!schema.$ref) {
    return 'z.any()'
  }
  const refName = getRefName(schema.$ref)
  if (!refName) {
    return 'z.any()'
  }

  return `${refName}Schema` || 'z.any()'
}
