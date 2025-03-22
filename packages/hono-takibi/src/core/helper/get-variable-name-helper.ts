import type { Config } from '../../config'
import { capitalize } from '../text/capitalize'
import { decapitalize } from '../text/decapitalize'

/**
 * @function getVariableNameHelper
 * @description Generates a variable name from a given name and config.
 * @param name - The name of the schema.
 * @param config - The config of the schema.
 * @returns The variable name.
 */
export function getVariableNameHelper(name: string, config: Config): string {
  return config.type.name === 'camelCase' ? decapitalize(name) : capitalize(name)
}
