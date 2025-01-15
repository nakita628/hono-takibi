import type { Config } from '../../config'
import { getCamelCaseSchemaName } from '../schema/references/get-camel-case-schema-name'
import { getPascalCaseSchemaName } from '../schema/references/get-pascal-case-schema-name'

export const getVariableSchemaNameHelper = (name: string, config: Config) => {
  return config.schema.name === 'camelCase'
    ? getCamelCaseSchemaName(name)
    : getPascalCaseSchemaName(name)
}

