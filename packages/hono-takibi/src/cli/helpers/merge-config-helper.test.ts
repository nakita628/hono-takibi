import { describe, it, expect } from 'vitest'
import type { CliFlags } from '../types'
import type { Config } from '../../config'
import { mergeConfigHelper } from '../helpers'
import { DEFAULT_CONFIG } from '../../config'

// Test run
// pnpm vitest run ./src/cli/helpers/merge-config-helper.test.ts

describe('mergeConfigHelper', () => {
  it.concurrent('should merge CLI flags into base config export true', () => {
    const base: Config = { ...DEFAULT_CONFIG }
    const cliFlags: CliFlags = {
      input: 'input.yaml',
      output: 'output.ts',
      exportType: true,
      exportSchema: true,
      typeCase: 'camelCase',
      schemaCase: 'camelCase',
      template: false,
      test: false,
    }
    const result = mergeConfigHelper(base, cliFlags)
    expect(result).toStrictEqual({
      schema: { name: 'camelCase', export: true },
      type: { name: 'camelCase', export: true },
      input: 'input.yaml',
      output: 'output.ts',
    })
  })

  it.concurrent('should merge CLI flags into base config export false', () => {
    const base: Config = { ...DEFAULT_CONFIG }
    const cliFlags: CliFlags = {
      input: 'input.yaml',
      output: 'output.ts',
      exportType: false,
      exportSchema: false,
      typeCase: 'camelCase',
      schemaCase: 'camelCase',
      template: false,
      test: false,
    }
    const result = mergeConfigHelper(base, cliFlags)
    expect(result).toStrictEqual({
      schema: { name: 'camelCase', export: false },
      type: { name: 'camelCase', export: false },
      input: 'input.yaml',
      output: 'output.ts',
    })
  })
})
