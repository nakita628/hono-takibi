import { describe, it, expect } from 'vitest'
import type { CliFlags } from '../types'
import type { Config } from '../../config'
import { mergeConfigHelper } from '../helpers'
import { DEFAULT_CONFIG } from '../../config'

// Test run
// pnpm vitest run ./src/cli/helpers/merge-config-helper.test.ts

describe('mergeConfigHelper', () => {
  it('should merge CLI flags into base config', () => {
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
      schema: { name: 'PascalCase', export: false },
      type: { name: 'PascalCase', export: false },
      input: 'input.yaml',
      output: 'output.ts',
    })
  })
})
