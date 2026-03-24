import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vite-plus/test'

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

  describe('non-split mode', () => {
    it('writes single file with readonly flag', async () => {
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
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated mediaTypes code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
    })

    it('writes single file with $ref entry', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes.ts')
      const result = await mediaTypes(
        {
          AliasMedia: { $ref: '#/components/mediaTypes/JsonMedia' },
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

    it('writes single file with unknown structure fallback', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes.ts')
      const result = await mediaTypes(
        {
          UnknownMedia: { someUnknownKey: 'value' } as never,
        },
        output,
        false,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated mediaTypes code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
    })

    it('writes single file with multiple entries', async () => {
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
        false,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated mediaTypes code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
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

    it('writes split files with readonly flag', async () => {
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
        },
        output,
        true,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated MediaType code written to ${output}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(output, 'jsonMedia.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
    })

    it('handles $ref references in split mode', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes')
      const result = await mediaTypes(
        {
          AliasMedia: { $ref: '#/components/mediaTypes/JsonMedia' },
        },
        output,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated MediaType code written to ${output}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(output, 'aliasMedia.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)

      const content = fs.readFileSync(path.join(output, 'aliasMedia.ts'), 'utf-8')
      expect(content.length > 0).toBe(true)
    })

    it('handles unknown structure fallback in split mode', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes')
      const result = await mediaTypes(
        {
          UnknownMedia: { someUnknownKey: 'value' } as never,
        },
        output,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated MediaType code written to ${output}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(output, 'unknownMedia.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
    })

    it('writes split files with .ts suffix in output', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes.ts')
      const outDir = output.replace(/\.ts$/, '')
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
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated MediaType code written to ${outDir}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(outDir, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(outDir, 'jsonMedia.ts'))).toBe(true)
    })

    it('generates sorted barrel file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes')
      const result = await mediaTypes(
        {
          ZooMedia: {
            schema: { type: 'object', properties: { zoo: { type: 'boolean' } } },
          },
          AlphaMedia: {
            schema: { type: 'object', properties: { alpha: { type: 'string' } } },
          },
        },
        output,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated MediaType code written to ${output}/*.ts (index.ts included)`,
      })
      const indexContent = fs.readFileSync(path.join(output, 'index.ts'), 'utf-8')
      const lines = indexContent.trim().split('\n')
      expect(lines.length).toBe(2)
      expect(lines[0]).toBe("export * from './alphaMedia.ts'")
      expect(lines[1]).toBe("export * from './zooMedia.ts'")
    })
  })
})
