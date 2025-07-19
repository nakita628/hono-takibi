import type { Schema } from '../../../openapi/index.js'
import { isArrayWithSchemaReference } from '../../../core/validator/index.js'
import { referenceSchema, arrayReferenceSchema } from '../reference/index.js'
import { zodToOpenAPI } from '../../zod-to-openapi/index.js'

/**
 * @param { Schema } schema - The schema to generate the property schema for
 * @returns { string } - The generated property schema string
 * @description Generates a Zod schema string for a property schema.
 */
export function propertySchema(schema: Schema): string {
  if (Boolean(schema.$ref) === true) {
    return referenceSchema(schema)
  }

  if (isArrayWithSchemaReference(schema)) {
    return arrayReferenceSchema(schema)
  }

  return zodToOpenAPI(schema)
}
