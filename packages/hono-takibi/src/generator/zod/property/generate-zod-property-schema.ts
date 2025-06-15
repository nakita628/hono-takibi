import type { Schema } from '../../../openapi/index.js'
import { isArrayWithSchemaReference } from '../../../core/validator/is-array-with-schema-reference.js'
import { generateReferenceSchema } from '../reference/generate-reference-schema.js'
import { generateArrayReferenceSchema } from '../reference/generate-array-reference-schema.js'
import { zodToOpenAPI } from '../../zod-to-openapi/index.js'

/**
 * generatePropertySchema
 * generate property schema
 *
 * @param schema
 * @param schemaStyle
 */
export function generatePropertySchema(
  schema: Schema,
  schemaStyle: 'camelCase' | 'PascalCase' = 'PascalCase',
  typeStyle: 'camelCase' | 'PascalCase' = 'PascalCase',
) {
  if (Boolean(schema.$ref) === true) {
    return generateReferenceSchema(schema, schemaStyle)
  }

  if (isArrayWithSchemaReference(schema)) {
    return generateArrayReferenceSchema(schema, schemaStyle)
  }

  return zodToOpenAPI(schema, schemaStyle, typeStyle)
}
