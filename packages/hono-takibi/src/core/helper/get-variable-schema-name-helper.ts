import type { Config } from '../../config'
import { getCamelCaseSchemaNameHelper } from './get-camel-case-schema-name-helper'
import { getPascalCaseSchemaNameHelper } from './get-pascal-case-schema-name-helper'

/**
 * @function getVariableSchemaNameHelper
 * @description Generates a variable schema name from a given name and config.
 * @param name - The name of the schema.
 * @param config - The config of the schema.
 * @returns The variable schema name.
 */
export function getVariableSchemaNameHelper(name: string, config: Config): string {
  return config.schema.name === 'camelCase'
    ? getCamelCaseSchemaNameHelper(name)
    : getPascalCaseSchemaNameHelper(name)
}
