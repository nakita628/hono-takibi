import { capitalize } from '../../text/capitalize'

/**
 * Generates a PascalCase schema name from a given schema name.
 *
 * @function getPascalCaseSchemaName
 * @param schemaName - The original schema name.
 * @returns The PascalCase schema name.
 */
export function getPascalCaseSchemaName(schemaName: string): string {
  const capitalizedSchemaName = capitalize(schemaName)
  return `${capitalizedSchemaName}Schema`
}
