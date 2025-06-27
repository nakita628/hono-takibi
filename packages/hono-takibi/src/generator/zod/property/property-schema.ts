import type { Schema } from '../../../openapi/index.js'
import { isArrayWithSchemaReference } from '../../../core/validator/index.js'
import { referenceSchema, arrayReferenceSchema } from '../reference/index.js'
import { zodToOpenAPI } from '../../zod-to-openapi/index.js'

/**
 * propertySchema
 * generate property schema
 *
 * @param schema
 */
export function propertySchema(schema: Schema) {
  if (Boolean(schema.$ref) === true) {
    return referenceSchema(schema)
  }

  if (isArrayWithSchemaReference(schema)) {
    return arrayReferenceSchema(schema)
  }

  return zodToOpenAPI(schema)
}
