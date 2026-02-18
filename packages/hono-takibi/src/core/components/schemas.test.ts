import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
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
})
