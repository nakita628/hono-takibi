import type { Config } from '../../config'
import { getCamelCaseSchemaName } from './get-camel-case-schema-name-helper'
import { getPascalCaseSchemaName } from './get-pascal-case-schema-name-helper'

export const getVariableSchemaNameHelper = (name: string, config: Config) => {
  return config.schema.name === 'camelCase'
    ? getCamelCaseSchemaName(name)
    : getPascalCaseSchemaName(name)
}
