import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import * as NodeFileSystem from '@effect/platform-node/NodeFileSystem'
import { Effect } from 'effect'
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
    const result = await Effect.runPromise(
      Effect.flip(Effect.provide(headers(undefined, output, false, true), NodeFileSystem.layer)),
    )
    expect(result.message).toBe('No headers found')
  })

  it('returns success message when headers is empty', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-headers-'))
    const output = path.join(tmpDir, 'headers.ts')
    const result = await Effect.runPromise(
      Effect.provide(headers({}, output, false, true), NodeFileSystem.layer),
    )
    expect(result).toBe('No headers found')
  })

  describe('non-split mode', () => {
    it('writes single file and returns success', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-headers-'))
      const output = path.join(tmpDir, 'headers.ts')
      const result = await Effect.runPromise(
        Effect.provide(
          headers(
            {
              'X-Rate-Limit': {
                schema: { type: 'integer' },
                description: 'Rate limit',
              },
            },
            output,
            false,
            true,
          ),
          NodeFileSystem.layer,
        ),
      )
      expect(result).toBe(`Generated headers code written to ${output}`)
      expect(fs.existsSync(output)).toBe(true)
      const content = fs.readFileSync(output, 'utf8')
      expect(content.length).toBeGreaterThan(0)
    })
  })

  describe('split mode', () => {
    it('writes individual files and barrel file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-headers-'))
      const output = path.join(tmpDir, 'headers')
      const result = await Effect.runPromise(
        Effect.provide(
          headers(
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
          ),
          NodeFileSystem.layer,
        ),
      )
      expect(result).toBe(`Generated headers code written to ${output}/*.ts (index.ts included)`)
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
      await Effect.runPromise(
        Effect.provide(headers(sampleHeaders, output, false, true), NodeFileSystem.layer),
      )
      const emitted = fs.readFileSync(output, 'utf8')
      const generated = headersCode({ headers: sampleHeaders }, true, true)
      const emittedNames = new Set(
        [
          ...emitted.matchAll(/(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)HeaderSchema\s*=/gu),
        ].map((m) => m[1]),
      )
      const generatedNames = new Set(
        [
          ...generated.matchAll(
            /(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)HeaderSchema\s*=/gu,
          ),
        ].map((m) => m[1]),
      )
      expect(emittedNames).toStrictEqual(generatedNames)
    })
  })
})
