import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vite-plus/test'

import { headersCode } from '../../generator/zod-openapi-hono/openapi/components/headers.js'
import { headers } from './headers.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('headers', () => {
  it('returns error when headers is undefined', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-headers-'))
    const output = path.join(tmpDir, 'headers.ts')
    const result = await headers(undefined, output, false, true)
    expect(result).toStrictEqual({ ok: false, error: 'No headers found' })
  })

  it('returns success message when headers is empty', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-headers-'))
    const output = path.join(tmpDir, 'headers.ts')
    const result = await headers({}, output, false, true)
    expect(result).toStrictEqual({ ok: true, value: 'No headers found' })
  })

  describe('non-split mode', () => {
    it('writes single file and returns success', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-headers-'))
      const output = path.join(tmpDir, 'headers.ts')
      const result = await headers(
        {
          'X-Rate-Limit': {
            schema: { type: 'integer' },
            description: 'Rate limit',
          },
        },
        output,
        false,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated headers code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
      const content = fs.readFileSync(output, 'utf-8')
      expect(content.length > 0).toBe(true)
    })
  })

  describe('split mode', () => {
    it('writes individual files and barrel file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-headers-'))
      const output = path.join(tmpDir, 'headers')
      const result = await headers(
        {
          'X-Rate-Limit': {
            schema: { type: 'integer' },
            description: 'Rate limit',
          },
          'X-Request-Id': {
            schema: { type: 'string' },
            description: 'Request ID',
          },
        },
        output,
        true,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated headers code written to ${output}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'x-Rate-Limit.ts'))).toBe(true)
    })
  })

  describe('caller ≡ generator contract', () => {
    it('non-split: caller emit contains same header const names as generator output', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-headers-contract-'))
      const output = path.join(tmpDir, 'headers.ts')
      const sampleHeaders = {
        XRateLimit: { schema: { type: 'integer' as const }, description: 'Rate limit' },
        XRequestId: { schema: { type: 'string' as const }, description: 'Request ID' },
      }
      const result = await headers(sampleHeaders, output, false, true)
      expect(result.ok).toBe(true)
      const emitted = fs.readFileSync(output, 'utf-8')
      const generated = headersCode({ headers: sampleHeaders }, true, true)
      const emittedNames = new Set(
        [
          ...emitted.matchAll(/(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)HeaderSchema\s*=/g),
        ].map((m) => m[1]),
      )
      const generatedNames = new Set(
        [
          ...generated.matchAll(
            /(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)HeaderSchema\s*=/g,
          ),
        ].map((m) => m[1]),
      )
      expect(emittedNames).toStrictEqual(generatedNames)
    })
  })
})
