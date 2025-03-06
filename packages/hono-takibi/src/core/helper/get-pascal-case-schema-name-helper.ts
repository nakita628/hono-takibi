import { capitalize } from '../text/capitalize'

/**
 * Generates a PascalCase schema name from a given schema name.
 *
 * @function getPascalCaseSchemaNameHelper
 * @param schemaName - The original schema name.
 * @returns The PascalCase schema name.
 */
export function getPascalCaseSchemaNameHelper(schemaName: string): string {
  const capitalizedSchemaName = capitalize(schemaName)
  return `${capitalizedSchemaName}Schema`
}
