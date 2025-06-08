import { describe, it, expect } from 'vitest'
import { ensureIO } from '.'

// Test run
// pnpm vitest run ./src/cli/validator/ensure-io.test.ts

describe('ensureIO', () => {
  it('returns ok when input and output are provided correctly', () => {
    const args = ['input.yaml', '-o', 'output.ts']
    const result = ensureIO(args)

    const expected = { ok: true, value: { input: 'input.yaml', output: 'output.ts' } }
    expect(result).toStrictEqual(expected)
  })

  it('returns err when -o is missing', () => {
    const args = ['input.yaml']
    const result = ensureIO(args)

    const expected = {
      ok: false,
      error: 'Usage: hono-takibi <input-file> -o <output-file>',
    }

    expect(result).toStrictEqual(expected)
  })

  it('returns err when -o has no value', () => {
    const args = ['input.yaml', '-o']
    const result = ensureIO(args)

    const expected = {
      ok: false,
      error: 'Usage: hono-takibi <input-file> -o <output-file>',
    }
    expect(result).toStrictEqual(expected)
  })

  it('returns err when both input and output are missing', () => {
    const args: string[] = []
    const result = ensureIO(args)

    const expected = {
      ok: false,
      error: 'Usage: hono-takibi <input-file> -o <output-file>',
    }

    expect(result).toStrictEqual(expected)
  })
})
