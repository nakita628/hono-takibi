import type { Config } from '../../../config'
import { getVariableSchemaNameHelper } from '../../../core/helper/get-variable-schema-name-helper'

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
  config: Config,
) {
  const variableNames = orderedSchemas.map((schemaName) =>
    getVariableSchemaNameHelper(schemaName, config),
  )
  return `export const schemas = {\n${variableNames.join(',\n')}\n}`
}
