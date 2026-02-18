import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { mediaTypes } from './mediaTypes.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('mediaTypes', () => {
  it('returns error when mediaTypes is undefined', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
    const output = path.join(tmpDir, 'mediaTypes.ts')
    const result = await mediaTypes(undefined, output, false)
    expect(result).toStrictEqual({ ok: false, error: 'No mediaTypes found' })
  })

  it('returns success message when mediaTypes is empty', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
    const output = path.join(tmpDir, 'mediaTypes.ts')
    const result = await mediaTypes({}, output, false)
    expect(result).toStrictEqual({ ok: true, value: 'No mediaTypes found' })
  })

  describe('non-split mode', () => {
    it('writes single file and returns success', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes.ts')
      const result = await mediaTypes(
        {
          JsonMedia: {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
              },
            },
          },
        },
        output,
        false,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated mediaTypes code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
      const content = fs.readFileSync(output, 'utf-8')
      expect(content.length > 0).toBe(true)
    })
  })

  describe('split mode', () => {
    it('writes individual files and barrel file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes')
      const result = await mediaTypes(
        {
          JsonMedia: {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
              },
            },
          },
          XmlMedia: {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
              },
            },
          },
        },
        output,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated MediaType code written to ${output}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'jsonMedia.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'xmlMedia.ts'))).toBe(true)
    })
  })
})
