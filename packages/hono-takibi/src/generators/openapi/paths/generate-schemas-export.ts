import { getCamelCaseSchemaName } from '../../../core/schema/references/get-camel-case-schema-name'
import { getPascalCaseSchemaName } from '../../../core/schema/references/get-pascal-case-schema-name'

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
export function generateSchemasExport(
  orderedSchemas: string[],
  namingCase: 'camelCase' | 'PascalCase' = 'camelCase',
) {
  if (namingCase === 'camelCase') {
    const camelCaseSchemas = orderedSchemas.map((schemaName) => getCamelCaseSchemaName(schemaName))
    return `export const schemas = {\n${camelCaseSchemas.join(',\n')}\n}`
  }
  if (namingCase === 'PascalCase') {
    const pascalCaseSchemas = orderedSchemas.map((schemaName) =>
      getPascalCaseSchemaName(schemaName),
    )
    return `export const schemas = {\n${pascalCaseSchemas.join(',\n')}\n}`
  }
}
