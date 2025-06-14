import { describe, it, expect } from 'vitest'
import { setConfig } from '.'
import type { CliFlags } from '../types'
import type { Config } from '../../config'

// Test run
// pnpm vitest run ./src/cli/helper/set-config.test.ts

describe('mergeConfig', () => {
  it.concurrent('should merge CLI flags into base config (export true)', () => {
    const base: Config = {
      schema: { name: 'PascalCase', export: false },
      type: { name: 'PascalCase', export: false },
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
    const result = setConfig(base, cliFlags)
    expect(result).toStrictEqual({
      ok: true,
      value: {
        schema: { name: 'camelCase', export: true },
        type: { name: 'camelCase', export: true },
        input: 'input.yaml',
        output: 'output.ts',
      },
    })
  })

  it.concurrent('should merge CLI flags into base config (export false)', () => {
    const base: Config = {
      schema: { name: 'PascalCase', export: false },
      type: { name: 'PascalCase', export: false },
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
    const result = setConfig(base, cliFlags)
    expect(result).toStrictEqual({
      ok: true,
      value: {
        schema: { name: 'camelCase', export: false },
        type: { name: 'camelCase', export: false },
        input: 'input.yaml',
        output: 'output.ts',
      },
    })
  })

  it.concurrent('should return error when input or output is missing', () => {
    const base: Config = {
      schema: { name: 'PascalCase', export: false },
      type: { name: 'PascalCase', export: false },
    }
    const cliFlags: CliFlags = {
      input: '',
      output: '',
      exportType: true,
      exportSchema: true,
      typeCase: 'PascalCase',
      schemaCase: 'PascalCase',
      template: false,
      test: false,
    }
    const result = setConfig(base, cliFlags)
    expect(result).toStrictEqual({
      ok: false,
      error: 'Usage: hono-takibi <input.yaml|.json> -o <output.ts>',
    })
  })
})
