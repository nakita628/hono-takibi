import { describe, expect, it } from 'vitest'
import { getVariableSchemaNameHelper } from './get-variable-schema-name-helper'
import type { Config } from '../../config'

const camelCaseConfig: Config = {
  schemaOptions: {
    namingCase: 'camelCase',
    exportEnabled: false,
  },
  typeOptions: {
    namingCase: 'camelCase',
    exportEnabled: true,
  },
}

const pascalCaseConfig: Config = {
  schemaOptions: {
    namingCase: 'PascalCase',
    exportEnabled: false,
  },
  typeOptions: {
    namingCase: 'PascalCase',
    exportEnabled: true,
  },
}

const getVariableSchemaNameHelperTestCases = [
  {
    name: 'Order',
    config: camelCaseConfig,
    expected: 'orderSchema',
  },
  {
    name: 'Order',
    config: pascalCaseConfig,
    expected: 'OrderSchema',
  },
]

describe('getVariableSchemaNameHelper', () => {
  it.concurrent.each(getVariableSchemaNameHelperTestCases)(
    'getVariableSchemaNameHelper($name, $config) -> $expected',
    ({ name, config, expected }) => {
      const result = getVariableSchemaNameHelper(name, config)
      expect(result).toBe(expected)
    },
  )
})
