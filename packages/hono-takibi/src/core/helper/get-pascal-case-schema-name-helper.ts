import { capitalize } from '../text/index.js'

/**
 * Generates a PascalCase schema name from a given schema name.
 * @param { string } schemaName - The original schema name.
 * @returns { string } The PascalCase schema name.
 */
export function getPascalCaseSchemaNameHelper(schemaName: string): string {
  const capitalizedSchemaName = capitalize(schemaName)
  return `${capitalizedSchemaName}Schema`
}
