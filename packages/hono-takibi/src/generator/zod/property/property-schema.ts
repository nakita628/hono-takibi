import type { Schema } from '../../../openapi/index.js'
import { isArrayWithSchemaReference } from '../../../core/validator/is-array-with-schema-reference.js'
import { generateReferenceSchema } from '../reference/generate-reference-schema.js'
import { generateArrayReferenceSchema } from '../reference/generate-array-reference-schema.js'
import { zodToOpenAPI } from '../../zod-to-openapi/index.js'

/**
 * propertySchema
 * generate property schema
 *
 * @param schema
 */
export function propertySchema(schema: Schema) {
  if (Boolean(schema.$ref) === true) {
    return generateReferenceSchema(schema)
  }

  if (isArrayWithSchemaReference(schema)) {
    return generateArrayReferenceSchema(schema)
  }

  return zodToOpenAPI(schema)
}
