import { describe, it, expect } from 'vitest'
import { flagValHelper } from './'

// Test run
// pnpm vitest run ./src/cli/helpers/flag-val-helper.test.ts

describe('flagValHelper', () => {
  it.concurrent(
    `flagValHelper(['--naming-case', 'PascalCase'], '--naming-case') -> PascalCase`,
    () => {
      const args = ['--naming-case', 'PascalCase']
      expect(flagValHelper(args, '--naming-case')).toBe('PascalCase')
    },
  )

  it.concurrent(`flagValHelper(['--naming-case=camelCase'], '--naming-case') -> camelCase`, () => {
    const args = ['--naming-case=camelCase']
    expect(flagValHelper(args, '--naming-case')).toBe('camelCase')
  })

  it.concurrent(
    `flagValHelper(['--naming-case', '=', 'PascalCase'], '--naming-case') -> PascalCase`,
    () => {
      const args = ['--naming-case', '=', 'PascalCase']
      expect(flagValHelper(args, '--naming-case')).toBe('PascalCase')
    },
  )

  it.concurrent(`flagValHelper(['--name'], '--name') -> undefined`, () => {
    const args = ['--name']
    expect(flagValHelper(args, '--name')).toBeUndefined()
  })

  it.concurrent(`flagValHelper(['--name', '='], '--name') -> undefined`, () => {
    const args = ['--name', '=']
    expect(flagValHelper(args, '--name')).toBeUndefined()
  })

  it.concurrent(`flagValHelper(['--name='], '--name') -> ""`, () => {
    const args = ['--name=']
    expect(flagValHelper(args, '--name')).toBe('')
  })

  it.concurrent(`flagValHelper(['--other', 'value'], '--name') -> undefined`, () => {
    const args = ['--other', 'value']
    expect(flagValHelper(args, '--name')).toBeUndefined()
  })
})
