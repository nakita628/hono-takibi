import { describe, it, expect } from 'vitest'
import { resolveConfig } from '.'
import type { CliFlags } from '../types'
import type { Config } from '../../config'

// Test run
// pnpm vitest run ./src/cli/config/resolve-config.test.ts

describe('resolveConfig', () => {
  it('merges CLI flags into base config (export true)', () => {
    const base: Config = {
      schema: { name: 'PascalCase', export: false },
      type: { name: 'PascalCase', export: false },
    }

    const cli: CliFlags = {
      input: 'input.yaml',
      output: 'output.ts',
      exportType: true,
      exportSchema: true,
      typeCase: 'camelCase',
      schemaCase: 'camelCase',
      template: false,
      test: false,
    }

    expect(resolveConfig(base, cli)).toStrictEqual({
      ok: true,
      value: {
        schema: { name: 'camelCase', export: true },
        type: { name: 'camelCase', export: true },
        input: 'input.yaml',
        output: 'output.ts',
      },
    })
  })

  it('merges CLI flags into base config (export false)', () => {
    const base: Config = {
      schema: { name: 'PascalCase', export: false },
      type: { name: 'PascalCase', export: false },
    }

    const cli: CliFlags = {
      input: 'input.yaml',
      output: 'output.ts',
      exportType: false,
      exportSchema: false,
      typeCase: 'camelCase',
      schemaCase: 'camelCase',
      template: false,
      test: false,
    }

    expect(resolveConfig(base, cli)).toStrictEqual({
      ok: true,
      value: {
        schema: { name: 'camelCase', export: false },
        type: { name: 'camelCase', export: false },
        input: 'input.yaml',
        output: 'output.ts',
      },
    })
  })
})
