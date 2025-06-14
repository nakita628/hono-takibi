import { describe, it, expect } from 'vitest'
import { parseIO } from '.'

// Test run
// pnpm vitest run ./src/cli/validator/parse-io.test.ts

describe('parseIO', () => {
  it.concurrent('returns ok when input and output are provided correctly', () => {
    const args = ['input.yaml', '-o', 'output.ts']
    const config: { input: `${string}.yaml` | `${string}.json`; output: `${string}.ts` } = {
      input: 'input.yaml',
      output: 'output.ts',
    }
    const result = parseIO(args, config)
    const expected = { ok: true, value: { input: 'input.yaml', output: 'output.ts' } }
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('returns err when -o is missing', () => {
    const args = ['input.yaml']
    const config: { input: `${string}.yaml` | `${string}.json`; output: `${string}.ts` } = {
      input: 'input.yaml',
      output: 'output.ts',
    }
    const result = parseIO(args, config)
    const expected = { ok: true, value: { input: 'input.yaml', output: 'output.ts' } }
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('returns err when -o has no value', () => {
    const args = ['input.yaml', '-o']
    const config: { input: `${string}.yaml` | `${string}.json`; output: `${string}.ts` } = {
      input: 'input.yaml',
      output: 'output.ts',
    }
    const result = parseIO(args, config)
    const expected = { ok: true, value: { input: 'input.yaml', output: 'output.ts' } }
    expect(result).toStrictEqual(expected)
  })
})
