import { describe, expect, it } from 'vitest'
import { getVariableNameHelper } from './get-variable-name-helper'
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

const getVariableNameHelperTestCases = [
  {
    name: 'Order',
    config: camelCaseConfig,
    expected: 'order',
  },
  {
    name: 'Order',
    config: pascalCaseConfig,
    expected: 'Order',
  },
]

describe('getVariableNameHelper', () => {
  it.concurrent.each(getVariableNameHelperTestCases)(
    'getVariableNameHelper($name, $config) -> $expected',
    ({ name, config, expected }) => {
      const result = getVariableNameHelper(name, config)
      expect(result).toBe(expected)
    },
  )
})
