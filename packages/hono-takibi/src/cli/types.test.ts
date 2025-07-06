import { describe, it, expectTypeOf } from 'vitest'
import type { CliFlags } from './types'

// Test run
// pnpm vitest run ./src/cli/types.test.ts

describe('CliFlags type', () => {
  it('accepts minimal required properties', () => {
    const flags: CliFlags = {
      input: 'spec.yaml',
      output: 'generated.ts',
      template: true,
      test: false,
    }
    expectTypeOf(flags).toEqualTypeOf<CliFlags>()
  })

  it('accepts all optional properties', () => {
    const flags: CliFlags = {
      input: 'schema.json',
      output: 'schema.ts',
      exportType: true,
      exportSchema: false,
      template: false,
      test: true,
      basePath: '/v1',
    }
    expectTypeOf(flags).toEqualTypeOf<CliFlags>()
  })

  it('accepts .tsp input', () => {
    const flags: CliFlags = {
      input: 'definition.tsp',
      output: 'definition.ts',
      template: true,
      test: true,
    }
    expectTypeOf(flags).toEqualTypeOf<CliFlags>()
  })
})
