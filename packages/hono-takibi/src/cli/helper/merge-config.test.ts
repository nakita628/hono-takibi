import { describe, it, expect } from 'vitest'
import { mergeConfig } from '.'
import type { CliFlags } from '../types'
import type { Config } from '../../config'

// Test run
// pnpm vitest run ./src/cli/helper/merge-config.test.ts

describe('mergeConfigHelper', () => {
  it.concurrent('should merge CLI flags into base config export true', () => {
    const base: Config = {
      ...{
        schema: {
          name: 'PascalCase',
          export: false,
        },
        type: {
          name: 'PascalCase',
          export: false,
        },
      },
    }
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
    const result = mergeConfig(base, cliFlags)
    expect(result).toStrictEqual({
      schema: { name: 'camelCase', export: true },
      type: { name: 'camelCase', export: true },
      input: 'input.yaml',
      output: 'output.ts',
    })
  })

  it.concurrent('should merge CLI flags into base config export false', () => {
    const base: Config = {
      ...{
        schema: {
          name: 'PascalCase',
          export: false,
        },
        type: {
          name: 'PascalCase',
          export: false,
        },
      },
    }
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
    const result = mergeConfig(base, cliFlags)
    expect(result).toStrictEqual({
      schema: { name: 'camelCase', export: false },
      type: { name: 'camelCase', export: false },
      input: 'input.yaml',
      output: 'output.ts',
    })
  })
})
