import type { Schema } from '../../../openapi/index.js'
import { getRefSchemaName } from '../../../core/schema/references/get-ref-schema-name.js'
import { zod } from '../index.js'

/**
 * Generates a Zod schema from a sub-schema.
 * @param { Schema } subSchema - The sub-schema object.
 * @param { 'camelCase' | 'PascalCase' } schemaStyle - The style for the schema name (default is 'PascalCase').
 * @returns { string } The generated Zod schema as a string.
 */
export function generateZodSchemaFromSubSchema(
  subSchema: Schema,
  schemaStyle: 'camelCase' | 'PascalCase' = 'PascalCase',
  typeStyle: 'camelCase' | 'PascalCase' = 'PascalCase',
): string {
  return subSchema.$ref
    ? getRefSchemaName(subSchema, schemaStyle)
    : zod(subSchema, schemaStyle, typeStyle)
}
