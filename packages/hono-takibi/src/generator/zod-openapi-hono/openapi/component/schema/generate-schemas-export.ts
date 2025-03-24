import type { Config } from '../../../../../config'
import { getVariableSchemaNameHelper } from '../../../../../core/helper/get-variable-schema-name-helper'

/**
 * Generates a TypeScript export for a list of schema names
 * @param { string[] } orderedSchemas - Array of schema names
 * @param { Config } config - Config
 * @returns { string } TypeScript code for exporting schemas
 * @example
 * // Returns: 'export const schemas = { userSchema, postSchema }'
 */
export function generateSchemasExport(orderedSchemas: string[], config: Config): string {
  const variableNames = orderedSchemas.map((schemaName) =>
    getVariableSchemaNameHelper(schemaName, config),
  )
  return `export const schemas = {\n${variableNames.join(',\n')}\n}`
}
