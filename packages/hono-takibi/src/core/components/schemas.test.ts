import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vite-plus/test'

import { schemasCode } from '../../generator/zod-openapi-hono/openapi/components/schemas.js'
import { schemas } from './schemas.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('schemas', () => {
  it('returns error when schemas is undefined', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-schemas-'))
    const output = path.join(tmpDir, 'schemas.ts')
    const result = await schemas(undefined, output, false, true)
    expect(result).toStrictEqual({ ok: false, error: 'No schemas found' })
  })

  it('returns success message when schemas is empty', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-schemas-'))
    const output = path.join(tmpDir, 'schemas.ts')
    const result = await schemas({}, output, false, true)
    expect(result).toStrictEqual({ ok: true, value: 'No schemas found' })
  })

  describe('non-split mode', () => {
    it('writes single file and returns success', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-schemas-'))
      const output = path.join(tmpDir, 'schemas.ts')
      const result = await schemas(
        {
          User: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              name: { type: 'string' },
            },
            required: ['id', 'name'],
          },
        },
        output,
        false,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated schema code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
      const content = fs.readFileSync(output, 'utf-8')
      expect(content.length > 0).toBe(true)
    })
  })

  describe('split mode', () => {
    it('writes individual files and barrel file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-schemas-'))
      const output = path.join(tmpDir, 'schemas')
      const result = await schemas(
        {
          User: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              name: { type: 'string' },
            },
            required: ['id', 'name'],
          },
          Post: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              title: { type: 'string' },
            },
            required: ['id', 'title'],
          },
        },
        output,
        true,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated schema code written to ${output}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'user.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'post.ts'))).toBe(true)
    })
  })

  describe('caller ≡ generator contract', () => {
    const sampleSchemas = {
      User: { type: 'object' as const, properties: { id: { type: 'string' as const } } },
      Post: { type: 'object' as const, properties: { title: { type: 'string' as const } } },
    }

    it('non-split: caller emit contains same schema const names as generator output', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-schemas-contract-'))
      const output = path.join(tmpDir, 'schemas.ts')
      const result = await schemas(sampleSchemas, output, false, false)
      expect(result.ok).toBe(true)
      const emitted = fs.readFileSync(output, 'utf-8')
      const generated = schemasCode({ schemas: sampleSchemas }, true, false)
      const emittedNames = new Set(
        [...emitted.matchAll(/(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)Schema\s*=/g)].map(
          (m) => m[1],
        ),
      )
      const generatedNames = new Set(
        [...generated.matchAll(/(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)Schema\s*=/g)].map(
          (m) => m[1],
        ),
      )
      expect(emittedNames).toStrictEqual(generatedNames)
    })

    it('split: union of per-file schema const names equals generator output const names', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-schemas-contract-'))
      const output = path.join(tmpDir, 'schemas.ts')
      const outDir = path.join(tmpDir, 'schemas')
      const result = await schemas(sampleSchemas, output, true, false)
      expect(result.ok).toBe(true)
      const files = fs.readdirSync(outDir).filter((f) => f !== 'index.ts')
      const emittedNames = new Set<string>()
      for (const f of files) {
        const src = fs.readFileSync(path.join(outDir, f), 'utf-8')
        for (const m of src.matchAll(
          /(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)Schema\s*=/g,
        )) {
          if (m[1] !== undefined) emittedNames.add(m[1])
        }
      }
      const generated = schemasCode({ schemas: sampleSchemas }, true, false)
      const generatedNames = new Set(
        [...generated.matchAll(/(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)Schema\s*=/g)].map(
          (m) => m[1],
        ),
      )
      expect(emittedNames).toStrictEqual(generatedNames)
    })
  })
})
