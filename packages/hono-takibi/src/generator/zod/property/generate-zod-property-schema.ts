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
 * @param schemaNameCase
 */
export function generatePropertySchema(
  schema: Schema,
  schemaNameCase: 'camelCase' | 'PascalCase' = 'PascalCase',
  typeNameCase: 'camelCase' | 'PascalCase' = 'PascalCase',
) {
  if (Boolean(schema.$ref) === true) {
    return generateReferenceSchema(schema, schemaNameCase)
  }

  if (isArrayWithSchemaReference(schema)) {
    return generateArrayReferenceSchema(schema, schemaNameCase)
  }

  return zodToOpenAPI(schema)
}
