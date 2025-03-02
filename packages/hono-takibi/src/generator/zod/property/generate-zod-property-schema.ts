/**
 * Generates a Zod schema string for a given OpenAPI schema definition
 *
 * @function generatePropertySchema
 * @param schema - OpenAPI schema definition
 * @returns Generated Zod schema string
 *
 * @example
 * // Reference type
 * generatePropertySchema({ $ref: '#/components/schemas/User' })
 * // Returns: 'userSchema'
 *
 * // Array with reference type
 * generatePropertySchema({
 *   type: 'array',
 *   items: { $ref: '#/components/schemas/Post' }
 * })
 * // Returns: 'z.array(postSchema)'
 *
 * // Basic type
 * generatePropertySchema({ type: 'string' })
 * // Returns: 'z.string()'
 */

import type { Schema } from '../../../type'
import type { Config } from '../../../config'
import { isSchemaReference } from '../../../core/validator/is-schema-reference'
import { isArrayWithSchemaReference } from '../../../core/validator/is-array-with-schema-reference'
import { generateReferenceSchema } from '../reference/generate-reference-schema'
import { generateArrayReferenceSchema } from '../reference/generate-array-reference-schema'
import { generateZod } from '../generate-zod'

/**
 * generatePropertySchema
 * generate property schema
 *
 * @param schema
 * @param config
 */
export function generatePropertySchema(schema: Schema, config: Config) {
  if (isSchemaReference(schema)) {
    return generateReferenceSchema(schema, config)
  }

  if (isArrayWithSchemaReference(schema)) {
    return generateArrayReferenceSchema(schema, config)
  }

  return generateZod(config, schema, undefined, undefined)
}
