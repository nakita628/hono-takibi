import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
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
})
