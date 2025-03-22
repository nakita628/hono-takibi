import { decapitalize } from '../text/decapitalize'

/**
 * @function getCamelCaseSchemaNameHelper
 * @description Generates a camelCase schema name from a given schema name.
 * @param schemaName - The original schema name.
 * @returns The camelCase schema name.
 */
export function getCamelCaseSchemaNameHelper(schemaName: string): string {
  const decapitalizedSchemaName = decapitalize(schemaName)
  return `${decapitalizedSchemaName}Schema`
}
