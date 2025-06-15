import type { Schema } from '../../../openapi/index.js'
import { getRefSchemaName } from '../../../core/schema/references/get-ref-schema-name.js'
import { zod } from '../index.js'

/**
 * Generates a Zod schema from a sub-schema.
 * @param { Schema } subSchema - The sub-schema object.
 * @param { 'camelCase' | 'PascalCase' } schemaNameCase - The style for the schema name (default is 'PascalCase').
 * @returns { string } The generated Zod schema as a string.
 */
export function generateZodSchemaFromSubSchema(
  subSchema: Schema,
  schemaNameCase: 'camelCase' | 'PascalCase' = 'PascalCase',
  typeNameCase: 'camelCase' | 'PascalCase' = 'PascalCase',
): string {
  return subSchema.$ref
    ? getRefSchemaName(subSchema, schemaNameCase)
    : zod(subSchema, schemaNameCase, typeNameCase)
}
