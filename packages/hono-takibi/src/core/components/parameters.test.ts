import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vite-plus/test'

import { parametersCode } from '../../generator/zod-openapi-hono/openapi/components/parameters.js'
import { parameters } from './parameters.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('parameters', () => {
  it('returns error when parameters is undefined', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-parameters-'))
    const output = path.join(tmpDir, 'parameters.ts')
    const result = await parameters(undefined, output, false, true)
    expect(result).toStrictEqual({ ok: false, error: 'No parameters found' })
  })

  it('returns success message when parameters is empty', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-parameters-'))
    const output = path.join(tmpDir, 'parameters.ts')
    const result = await parameters({}, output, false, true)
    expect(result).toStrictEqual({ ok: true, value: 'No parameters found' })
  })

  describe('non-split mode', () => {
    it('writes single file and returns success', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-parameters-'))
      const output = path.join(tmpDir, 'parameters.ts')
      const result = await parameters(
        {
          userId: {
            name: 'userId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        },
        output,
        false,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated parameters code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
      const content = fs.readFileSync(output, 'utf-8')
      expect(content.length > 0).toBe(true)
    })
  })

  describe('split mode', () => {
    it('writes individual files and barrel file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-parameters-'))
      const output = path.join(tmpDir, 'parameters')
      const result = await parameters(
        {
          userId: {
            name: 'userId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
          page: {
            name: 'page',
            in: 'query',
            schema: { type: 'integer' },
          },
        },
        output,
        true,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated parameters code written to ${output}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'userId.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'page.ts'))).toBe(true)
    })
  })

  describe('caller ≡ generator contract', () => {
    it('non-split: caller emit contains same param const names as generator output', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-parameters-contract-'))
      const output = path.join(tmpDir, 'parameters.ts')
      const sampleParams = {
        UserId: {
          name: 'userId',
          in: 'path' as const,
          required: true,
          schema: { type: 'string' as const },
        },
        Page: { name: 'page', in: 'query' as const, schema: { type: 'integer' as const } },
      }
      const result = await parameters(sampleParams, output, false, true)
      expect(result.ok).toBe(true)
      const emitted = fs.readFileSync(output, 'utf-8')
      const generated = parametersCode({ parameters: sampleParams }, true, true)
      const emittedNames = new Set(
        [
          ...emitted.matchAll(/(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)ParamsSchema\s*=/g),
        ].map((m) => m[1]),
      )
      const generatedNames = new Set(
        [
          ...generated.matchAll(
            /(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)ParamsSchema\s*=/g,
          ),
        ].map((m) => m[1]),
      )
      expect(emittedNames).toStrictEqual(generatedNames)
    })
  })
})
