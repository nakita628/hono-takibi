import { describe, it, expect } from 'vitest'
import { parseCliArgs } from './parse-cli-args'

// Test run
// pnpm vitest run ./src/cli/validator/parse-cli-args.test.ts

describe('parseCliArgs', () => {
  it('parses full valid arguments correctly', () => {
    const args = [
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
    const result = parseCliArgs(args, config)

    expect(result).toStrictEqual({
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
    })
  })

  it('returns error on invalid naming-case-type', () => {
    const args = [
      'input.yaml',
      '-o',
      'output.ts',
      '--naming-case-type',
      'snake_case',
      '--naming-case-schema',
      'PascalCase',
    ]
    const config = { input: 'input.yaml', output: 'output.ts' }
    const result = parseCliArgs(args, config)

    expect(result).toStrictEqual({
      ok: false,
      error: '--naming-case must be PascalCase or camelCase (got snake_case)',
    })
  })

  it('parses minimal valid input', () => {
    const args = [
      'input.yaml',
      '-o',
      'output.ts',
      '--naming-case-type',
      'PascalCase',
      '--naming-case-schema',
      'PascalCase',
    ]
    const config = { input: 'input.yaml', output: 'output.ts' }
    const result = parseCliArgs(args, config)

    expect(result).toStrictEqual({
      ok: true,
      value: {
        input: 'input.yaml',
        output: 'output.ts',
        exportType: undefined,
        exportSchema: undefined,
        typeCase: 'PascalCase',
        schemaCase: 'PascalCase',
        template: false,
        test: false,
        basePath: undefined,
      },
    })
  })
})
