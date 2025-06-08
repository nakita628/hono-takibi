import { getCamelCaseSchemaNameHelper, getPascalCaseSchemaNameHelper } from './index.js'
import type { Config } from '../../config/index.js'

/**
 * Generates a variable schema name from a given name and config.
 * @param { string } name - The name of the schema.
 * @param { Config } config - The config of the schema.
 * @returns { string } The variable schema name.
 */
export function getVariableSchemaNameHelper(name: string, config: Config): string {
  return config.schema.name === 'camelCase'
    ? getCamelCaseSchemaNameHelper(name)
    : getPascalCaseSchemaNameHelper(name)
}
