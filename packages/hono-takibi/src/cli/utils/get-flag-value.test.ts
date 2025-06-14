import { describe, it, expect } from 'vitest'
import { getFlagValue } from '.'

// Test run
// pnpm vitest run ./src/cli/utils/get-flag-value.test.ts

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
    expect(getFlagValue(args, '--naming-case-schema')).toBe('PascalCase')
    expect(getFlagValue(args, '--naming-case-type')).toBe('camelCase')
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
    expect(getFlagValue(args, '--export-schema')).toBeUndefined()
    expect(getFlagValue(args, '--export-type')).toBeUndefined()
  })
})
