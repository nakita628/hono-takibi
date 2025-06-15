import { capitalize, decapitalize } from '../utils/index.js'

/**
 * Generates a variable name from a given name and config.
 * @param { string } name - The name of the schema.
 * @param { 'camelCase' | 'PascalCase' } style - The style of the variable name.
 * @returns { string } The variable name.
 */
export function getVariableName(
  name: string,
  nameCase: 'camelCase' | 'PascalCase' = 'PascalCase',
): string {
  return nameCase === 'camelCase' ? decapitalize(name) : capitalize(name)
}
