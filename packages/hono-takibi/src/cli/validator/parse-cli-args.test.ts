import { describe, it, expect } from 'vitest'
import { parseCliArgs } from './parse-cli-args'

// Test run
// pnpm vitest run ./src/cli/validator/parse-cli-args.test.ts

describe('parseCliArgs', () => {
  it('parses full valid arguments correctly', () => {
    const argv = [
      'node',
      'script.js',
      'input.yaml',
      '-o',
      'output.ts',
      '--naming-case-type',
      'PascalCase',
      '--naming-case-schema',
      'camelCase',
      '--export-type',
      '--export-schema',
      '--template',
      '--test',
      '--base-path',
      '/api/v1',
    ]
    const config = { input: 'input.yaml', output: 'output.ts' }
    const result = parseCliArgs(argv, config)
    const expected = {
      ok: true,
      value: {
        input: 'input.yaml',
        output: 'output.ts',
        exportType: true,
        exportSchema: true,
        typeCase: 'PascalCase',
        schemaCase: 'camelCase',
        template: true,
        test: true,
        basePath: '/api/v1',
      },
    }
    expect(result).toStrictEqual(expected)
  })

  it('returns error when input or output is missing', () => {
    const argv = ['node', 'script.js', '--naming-case-type', 'PascalCase']
    const config = { input: 'input.yaml', output: 'output.ts' }
    const result = parseCliArgs(argv, config)

    const expected = {
      ok: true,
      value: {
        input: '--naming-case-type',
        output: 'output.ts',
        exportType: false,
        exportSchema: false,
        typeCase: 'PascalCase',
        schemaCase: 'PascalCase',
        template: false,
        test: false,
        basePath: undefined,
      },
    }
    expect(result).toStrictEqual(expected)
  })

  it('returns error when naming-case-type is invalid', () => {
    const argv = [
      'node',
      'script.js',
      'input.yaml',
      '-o',
      'output.ts',
      '--naming-case-type',
      'snake_case',
      '--naming-case-schema',
      'camelCase',
    ]
    const config = { input: 'input.yaml', output: 'output.ts' }
    const result = parseCliArgs(argv, config)

    const expected = {
      ok: false,
      error: '--naming-case must be PascalCase or camelCase (got snake_case)',
    }
    expect(result).toStrictEqual(expected)
  })

  it('returns error when naming-case-schema is missing or invalid', () => {
    const argv = [
      'node',
      'script.js',
      'input.yaml',
      '-o',
      'output.ts',
      '--naming-case-type',
      'camelCase',
    ]
    const config = { input: 'input.yaml', output: 'output.ts' }
    const result = parseCliArgs(argv, config)

    const expected = {
      ok: true,
      value: {
        input: 'input.yaml',
        output: 'output.ts',
        exportType: false,
        exportSchema: false,
        typeCase: 'camelCase',
        schemaCase: 'PascalCase',
        template: false,
        test: false,
        basePath: undefined,
      },
    }
    expect(result).toStrictEqual(expected)
  })

  it('parses minimal valid arguments correctly', () => {
    const argv = [
      'node',
      'script.js',
      'input.yaml',
      '-o',
      'output.ts',
      '--naming-case-type',
      'PascalCase',
      '--naming-case-schema',
      'PascalCase',
    ]
    const config = { input: 'input.yaml', output: 'output.ts' }
    const result = parseCliArgs(argv, config)
    const expected = {
      ok: true,
      value: {
        input: 'input.yaml',
        output: 'output.ts',
        exportType: false,
        exportSchema: false,
        typeCase: 'PascalCase',
        schemaCase: 'PascalCase',
        template: false,
        test: false,
        basePath: undefined,
      },
    }
    expect(result).toStrictEqual(expected)
  })
})
