import { decapitalize } from '../utils/index.js'

/**
 * Generates a camelCase schema name from a given schema name.
 * @param { string } schemaName - The original schema name.
 * @returns { string } The camelCase schema name.
 */
export function getCamelCaseSchemaName(schemaName: string): string {
  const decapitalizedSchemaName = decapitalize(schemaName)
  return `${decapitalizedSchemaName}Schema`
}
