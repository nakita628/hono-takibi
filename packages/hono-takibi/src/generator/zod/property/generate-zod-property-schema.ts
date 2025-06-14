import type { Schema } from '../../../openapi/index.js'
import type { Config } from '../../../config/index.js'
import { isArrayWithSchemaReference } from '../../../core/validator/is-array-with-schema-reference.js'
import { generateReferenceSchema } from '../reference/generate-reference-schema.js'
import { generateArrayReferenceSchema } from '../reference/generate-array-reference-schema.js'
import { zodToOpenAPI } from '../../zod-to-openapi/index.js'

/**
 * generatePropertySchema
 * generate property schema
 *
 * @param schema
 * @param config
 */
export function generatePropertySchema(schema: Schema, config: Config) {
  if (Boolean(schema.$ref) === true) {
    return generateReferenceSchema(schema, config)
  }

  if (isArrayWithSchemaReference(schema)) {
    return generateArrayReferenceSchema(schema, config)
  }

  return zodToOpenAPI(config, schema, undefined, undefined)
}
