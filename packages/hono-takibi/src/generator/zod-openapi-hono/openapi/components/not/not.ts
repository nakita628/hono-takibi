import type { Schema } from '../../../../../openapi/index.js'

/**
 * Generates the Zod code for an `anyOf` schema.
 * @param { Schema } schema - The OpenAPI schema object.
 * @returns { string } The generated Zod code as a string.
 */
export function not(schema: Schema): string {
  if (!schema.not) {
    console.warn('not exists not')
    return 'z.any()'
  }
  return 'z.unknown()'
}
