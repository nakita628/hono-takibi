import { describe, expect, it } from 'vitest'
import { getVariableNameHelper } from './get-variable-name-helper'
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
