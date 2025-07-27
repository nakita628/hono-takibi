import { describe, expect, it } from 'vitest'
import { parseCli } from './parse'

// Test run
// pnpm vitest run ./src/cli/parse.test.ts

describe('parseCli', () => {
  it('parses minimal valid input', () => {
    const args = ['input.yaml', '-o', 'output.ts']
    const result = parseCli(args)

    expect(result).toStrictEqual({
      ok: true,
      value: {
        input: 'input.yaml',
        output: 'output.ts',
        exportType: false,
        exportSchema: false,
        template: false,
        test: false,
        basePath: undefined,
      },
    })
  })
  it('parses full valid arguments correctly', () => {
    const args = [
      'input.yaml',
      '-o',
      'output.ts',
      '--export-type',
      '--export-schema',
      '--template',
      '--test',
      '--base-path',
      '/api/v1',
    ]
    const result = parseCli(args)

    expect(result).toStrictEqual({
      ok: true,
      value: {
        input: 'input.yaml',
        output: 'output.ts',
        exportType: true,
        exportSchema: true,
        template: true,
        test: true,
        basePath: '/api/v1',
      },
    })
  })
})
