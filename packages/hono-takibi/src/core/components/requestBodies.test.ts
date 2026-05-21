import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vite-plus/test'

import { requestBodiesCode } from '../../generator/zod-openapi-hono/openapi/components/request-bodies.js'
import { requestBodies } from './requestBodies.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('requestBodies', () => {
  it('returns error when requestBodies is undefined', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-requestBodies-'))
    const output = path.join(tmpDir, 'requestBodies.ts')
    const result = await requestBodies(undefined, output, false)
    expect(result).toStrictEqual({ ok: false, error: 'No requestBodies found' })
  })

  it('returns success message when requestBodies is empty', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-requestBodies-'))
    const output = path.join(tmpDir, 'requestBodies.ts')
    const result = await requestBodies({}, output, false)
    expect(result).toStrictEqual({ ok: true, value: 'No requestBodies found' })
  })

  describe('non-split mode', () => {
    it('writes single file and returns success', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-requestBodies-'))
      const output = path.join(tmpDir, 'requestBodies.ts')
      const result = await requestBodies(
        {
          CreateUser: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                  },
                  required: ['name'],
                },
              },
            },
          },
        },
        output,
        false,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated requestBodies code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
      const content = fs.readFileSync(output, 'utf-8')
      expect(content.length > 0).toBe(true)
    })
  })

  describe('split mode', () => {
    it('writes individual files and barrel file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-requestBodies-'))
      const output = path.join(tmpDir, 'requestBodies')
      const result = await requestBodies(
        {
          CreateUser: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                  },
                  required: ['name'],
                },
              },
            },
          },
          UpdateUser: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                  },
                },
              },
            },
          },
        },
        output,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated requestBodies code written to ${output}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'createUser.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'updateUser.ts'))).toBe(true)
    })
  })

  describe('caller ≡ generator contract', () => {
    it('non-split: caller emit contains same requestBody const names as generator output', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-requestBodies-contract-'))
      const output = path.join(tmpDir, 'requestBodies.ts')
      const sampleBodies = {
        CreateUser: {
          required: true,
          content: { 'application/json': { schema: { type: 'object' as const } } },
        },
        UpdateUser: {
          required: false,
          content: { 'application/json': { schema: { type: 'object' as const } } },
        },
      }
      const result = await requestBodies(sampleBodies, output, false)
      expect(result.ok).toBe(true)
      const emitted = fs.readFileSync(output, 'utf-8')
      const generated = requestBodiesCode({ requestBodies: sampleBodies }, true)
      const emittedNames = new Set(
        [
          ...emitted.matchAll(/(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)RequestBody\s*=/g),
        ].map((m) => m[1]),
      )
      const generatedNames = new Set(
        [
          ...generated.matchAll(/(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)RequestBody\s*=/g),
        ].map((m) => m[1]),
      )
      expect(emittedNames).toStrictEqual(generatedNames)
    })
  })
})
