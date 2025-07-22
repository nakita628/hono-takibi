import { describe, expect, it } from 'vitest'
import { parseIO } from '.'

// Test run
// pnpm vitest run ./src/cli/args/parse-io.test.ts

describe('parseIO', () => {
  it('returns ok when input is .yaml and output is .ts', () => {
    const result = parseIO(['input.yaml', '-o', 'output.ts'])
    expect(result).toStrictEqual({
      ok: true,
      value: { input: 'input.yaml', output: 'output.ts' },
    })
  })

  it('returns ok when input is .json and output is .ts', () => {
    const result = parseIO(['data.json', '-o', 'routes.ts'])
    expect(result).toStrictEqual({
      ok: true,
      value: { input: 'data.json', output: 'routes.ts' },
    })
  })

  it('returns ok when input is .tsp and output is .ts', () => {
    const result = parseIO(['schema.tsp', '-o', 'generated.ts'])
    expect(result).toStrictEqual({
      ok: true,
      value: { input: 'schema.tsp', output: 'generated.ts' },
    })
  })

  it('returns err if output is missing', () => {
    const result = parseIO(['input.yaml'])
    expect(result).toStrictEqual({
      ok: false,
      error: 'Usage: hono-takibi <input.{yaml,json,tsp}> -o <routes.ts> [options]',
    })
  })

  it('returns err if -o is specified but value is missing', () => {
    const result = parseIO(['input.yaml', '-o'])
    expect(result).toStrictEqual({
      ok: false,
      error: 'Usage: hono-takibi <input.{yaml,json,tsp}> -o <routes.ts> [options]',
    })
  })

  it('returns err if input file is not yaml/json/tsp', () => {
    const result = parseIO(['input.txt', '-o', 'output.ts'])
    expect(result).toStrictEqual({
      ok: false,
      error: 'Usage: hono-takibi <input.{yaml,json,tsp}> -o <routes.ts> [options]',
    })
  })

  it('returns err if output file is not .ts', () => {
    const result = parseIO(['input.yaml', '-o', 'output.js'])
    expect(result).toStrictEqual({
      ok: false,
      error: 'Usage: hono-takibi <input.{yaml,json,tsp}> -o <routes.ts> [options]',
    })
  })

  it('returns err if both input and output are invalid', () => {
    const result = parseIO(['invalid.md', '-o', 'invalid.js'])
    expect(result).toStrictEqual({
      ok: false,
      error: 'Usage: hono-takibi <input.{yaml,json,tsp}> -o <routes.ts> [options]',
    })
  })

  it('returns err if -o is missing entirely', () => {
    const result = parseIO(['input.yaml', 'output.ts'])
    expect(result).toStrictEqual({
      ok: false,
      error: 'Usage: hono-takibi <input.{yaml,json,tsp}> -o <routes.ts> [options]',
    })
  })

  it('returns ok even with extra trailing args (ignored)', () => {
    const result = parseIO(['input.yaml', '-o', 'output.ts', '--verbose'])
    expect(result).toStrictEqual({
      ok: true,
      value: { input: 'input.yaml', output: 'output.ts' },
    })
  })
})
