import { capitalize } from '../text/capitalize.js'
import { decapitalize } from '../text/decapitalize.js'
import type { Config } from '../../config/index.js'

/**
 * Generates a variable name from a given name and config.
 * @param { string } name - The name of the schema.
 * @param { Config } config - The config of the schema.
 * @returns { string } The variable name.
 */
export function getVariableNameHelper(name: string, config: Config): string {
  return config.type.name === 'camelCase' ? decapitalize(name) : capitalize(name)
}
