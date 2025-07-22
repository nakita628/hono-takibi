import { describe, expect, it } from 'vitest'
import { getFlagValue, hasFlag, isHelpRequested, sliceArgv } from '.'

// Test run
// pnpm vitest run ./src/cli/utils/index.test.ts

describe('utils', () => {
  describe('getFlagVal', () => {
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

  describe('hasFlag', () => {
    it.concurrent(`hasFlag(['--debug'], '--debug') -> true`, () => {
      const args = ['--debug']
      expect(hasFlag(args, '--debug')).toBe(true)
    })

    it.concurrent(`hasFlag(['--verbose', '--debug'], '--debug') -> true`, () => {
      const args = ['--verbose', '--debug']
      expect(hasFlag(args, '--debug')).toBe(true)
    })

    it.concurrent(`hasFlag(['--verbose'], '--debug') -> false`, () => {
      const args = ['--verbose']
      expect(hasFlag(args, '--debug')).toBe(false)
    })

    it.concurrent(`hasFlag([], '--debug') -> false`, () => {
      const args: string[] = []
      expect(hasFlag(args, '--debug')).toBe(false)
    })

    it.concurrent(`hasFlag(['--debug=true'], '--debug') -> false`, () => {
      const args = ['--debug=true']
      expect(hasFlag(args, '--debug')).toBe(false)
    })
  })

  describe('isHelpRequested', () => {
    it('returns true for ["--help"]', () => {
      expect(isHelpRequested(['--help'])).toBe(true)
    })

    it('returns true for ["-h"]', () => {
      expect(isHelpRequested(['-h'])).toBe(true)
    })

    it('returns false for other arguments only', () => {
      expect(isHelpRequested(['--foo'])).toBe(false)
      expect(isHelpRequested(['input.yaml', '-o', 'output.ts'])).toBe(false)
      expect(isHelpRequested(['--export-type'])).toBe(false)
    })

    it('returns false for --help or -h mixed with other arguments', () => {
      expect(isHelpRequested(['input.yaml', '--help'])).toBe(false)
      expect(isHelpRequested(['-h', '--foo'])).toBe(false)
      expect(isHelpRequested(['--help', '--foo'])).toBe(false)
      expect(isHelpRequested(['--foo', '--help'])).toBe(false)
    })
  })

  describe('sliceArgv', () => {
    it(`sliceArgv(['**/bin/node', '**/dist/index.js', '-o']) -> ['-o']`, () => {
      const argv = ['**/bin/node', '**/dist/index.js', '-o']
      expect(sliceArgv(argv)).toStrictEqual(['-o'])
    })

    it(`sliceArgv(['**/bin/node', '**/dist/index.js', '-h']) -> ['-h']`, () => {
      const argv = ['**/bin/node', '**/dist/index.js', '-h']
      expect(sliceArgv(argv)).toStrictEqual(['-h'])
    })

    it(`sliceArgv(['**/bin/node', '**/dist/index.js', '-h']) -> ['-help']`, () => {
      const argv = ['**/bin/node', '**/dist/index.js', '-help']
      expect(sliceArgv(argv)).toStrictEqual(['-help'])
    })
  })
})
