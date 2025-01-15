import { describe, expect, it } from 'vitest'
import { getVariableSchemaNameHelper } from './get-variable-schema-name-helper'
import type { Config } from '../../config'

const camelCaseConfig: Config = {
  schema: {
    name: 'camelCase',
    export: false,
  },
  type: {
    name: 'camelCase',
    export: true,
  },
}

const pascalCaseConfig: Config = {
  schema: {
    name: 'PascalCase',
    export: false,
  },
  type: {
    name: 'PascalCase',
    export: true,
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
