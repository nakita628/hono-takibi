import { getCamelCaseSchemaName } from '../../../core/schema/references/get-camel-case-schema-name'

/**
 * Generates a TypeScript export for a list of schema names
 *
 * @function generateSchemasExport
 * @param orderedSchemas - Array of schema names
 * @returns TypeScript code for exporting schemas
 *
 * @example
 * // Returns: 'export const schemas = { userSchema, postSchema }'
 */
export function generateSchemasExport(orderedSchemas: string[]) {
  const camelCaseSchemas = orderedSchemas.map((schemaName) => getCamelCaseSchemaName(schemaName))
  return `export const schemas = {\n${camelCaseSchemas.join(',\n')}\n}`
}
