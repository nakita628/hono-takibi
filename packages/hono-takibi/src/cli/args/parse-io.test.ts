import { describe, it, expect } from 'vitest'
import { parseIO } from '.'

// Test run
// pnpm vitest run ./src/cli/args/parse-io.test.ts

describe('parseIO', () => {
  it.concurrent('returns ok when input and output are provided correctly', () => {
    const args = ['input.yaml', '-o', 'output.ts']
    const result = parseIO(args)
    const expected = { ok: true, value: { input: 'input.yaml', output: 'output.ts' } }
    expect(result).toStrictEqual(expected)
  })
})
