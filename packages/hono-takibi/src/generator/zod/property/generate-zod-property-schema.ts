/**
 * Generates a Zod schema string for a given OpenAPI schema definition
 * @param { Schema } schema - OpenAPI schema definition
 * @returns { string } Generated Zod schema string
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

import type { Schema } from '../../../types/index.js'
import type { Config } from '../../../config/index.js'
import { isSchemaReference } from '../../../core/validator/is-schema-reference.js'
import { isArrayWithSchemaReference } from '../../../core/validator/is-array-with-schema-reference.js'
import { generateReferenceSchema } from '../reference/generate-reference-schema.js'
import { generateArrayReferenceSchema } from '../reference/generate-array-reference-schema.js'
import { generateZodToOpenAPI } from '../../zod-to-openapi/index.js'

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

  return generateZodToOpenAPI(config, schema, undefined, undefined)
}
