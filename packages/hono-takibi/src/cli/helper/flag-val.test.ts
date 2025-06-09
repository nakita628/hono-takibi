import { describe, it, expect } from 'vitest'
import { flagVal } from '.'

// Test run
// pnpm vitest run ./src/cli/helper/flag-val.test.ts

describe('flagVal', () => {
  it('should get value for --naming-case-schema', () => {
    const args = [
      '--naming-case-schema',
      'PascalCase',
      '--export-schema',
      '--naming-case-type',
      'camelCase',
      '--export-type',
    ]
    expect(flagVal(args, '--naming-case-schema')).toBe('PascalCase')
    expect(flagVal(args, '--naming-case-type')).toBe('camelCase')
  })

  it('should return undefined for boolean flag', () => {
    const args = [
      '--naming-case-schema',
      'PascalCase',
      '--export-schema',
      '--naming-case-type',
      'camelCase',
      '--export-type',
    ]
    expect(flagVal(args, '--export-schema')).toBeUndefined()
    expect(flagVal(args, '--export-type')).toBeUndefined()
  })
})
