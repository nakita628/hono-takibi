import { getCamelCaseSchemaName, getPascalCaseSchemaName } from './index.js'

/**
 * Generates a variable schema name from a given name and config.
 * @param { string } name - The name of the schema.
 * @param { 'camelCase' | 'PascalCase' } style - The style of the variable name.
 * @returns { string } The variable schema name.
 */
export function getVariableSchemaName(
  name: string,
  style: 'camelCase' | 'PascalCase' = 'PascalCase',
): string {
  return style === 'camelCase' ? getCamelCaseSchemaName(name) : getPascalCaseSchemaName(name)
}
