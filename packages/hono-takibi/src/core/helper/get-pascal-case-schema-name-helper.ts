import { capitalize } from '../text/capitalize'

/**
 * @function getPascalCaseSchemaNameHelper
 * @description Generates a PascalCase schema name from a given schema name.
 * @param schemaName - The original schema name.
 * @returns The PascalCase schema name.
 */
export function getPascalCaseSchemaNameHelper(schemaName: string): string {
  const capitalizedSchemaName = capitalize(schemaName)
  return `${capitalizedSchemaName}Schema`
}
