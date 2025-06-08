import { describe, it, expect } from 'vitest'
import { flagValHelper } from './'

// Test run
// pnpm vitest run ./src/cli/helpers/flag-val-helper.test.ts

describe('flagValHelper', () => {
  it(`flagValHelper(['--naming-case', 'PascalCase'], '--naming-case') -> PascalCase`, () => {
    const args = ['--naming-case', 'PascalCase']
    expect(flagValHelper(args, '--naming-case')).toBe('PascalCase')
  })

  it(`flagValHelper(['--naming-case=camelCase'], '--naming-case') -> camelCase`, () => {
    const args = ['--naming-case=camelCase']
    expect(flagValHelper(args, '--naming-case')).toBe('camelCase')
  })

  it(`flagValHelper(['--naming-case', '=', 'PascalCase'], '--naming-case') -> PascalCase`, () => {
    const args = ['--naming-case', '=', 'PascalCase']
    expect(flagValHelper(args, '--naming-case')).toBe('PascalCase')
  })

  it(`flagValHelper(['--name'], '--name') -> undefined`, () => {
    const args = ['--name']
    expect(flagValHelper(args, '--name')).toBeUndefined()
  })

  it(`flagValHelper(['--name', '='], '--name') -> undefined`, () => {
    const args = ['--name', '=']
    expect(flagValHelper(args, '--name')).toBeUndefined()
  })

  it(`flagValHelper(['--name='], '--name') -> ""`, () => {
    const args = ['--name=']
    expect(flagValHelper(args, '--name')).toBe('')
  })

  it(`flagValHelper(['--other', 'value'], '--name') -> undefined`, () => {
    const args = ['--other', 'value']
    expect(flagValHelper(args, '--name')).toBeUndefined()
  })
})
