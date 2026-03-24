import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vite-plus/test'

import { examples } from './examples.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('examples', () => {
  it('returns error when examples is undefined', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-examples-'))
    const output = path.join(tmpDir, 'examples.ts')
    const result = await examples(undefined, output, false)
    expect(result).toStrictEqual({ ok: false, error: 'No examples found' })
  })

  it('returns success message when examples is empty', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-examples-'))
    const output = path.join(tmpDir, 'examples.ts')
    const result = await examples({}, output, false)
    expect(result).toStrictEqual({ ok: true, value: 'No examples found' })
  })

  describe('non-split mode', () => {
    it('writes single file and returns success', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-examples-'))
      const output = path.join(tmpDir, 'examples.ts')
      const result = await examples(
        {
          UserExample: { value: { id: 1, name: 'John' } },
        },
        output,
        false,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated examples code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
      const content = fs.readFileSync(output, 'utf-8')
      expect(content.length > 0).toBe(true)
    })
  })

  describe('non-split mode', () => {
    it('writes single file with readonly flag', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-examples-'))
      const output = path.join(tmpDir, 'examples.ts')
      const result = await examples(
        {
          UserExample: { value: { id: 1, name: 'John' } },
        },
        output,
        false,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated examples code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
      const content = fs.readFileSync(output, 'utf-8')
      expect(content.length > 0).toBe(true)
    })

    it('writes single file with multiple examples', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-examples-'))
      const output = path.join(tmpDir, 'examples.ts')
      const result = await examples(
        {
          UserExample: { value: { id: 1, name: 'John' } },
          PostExample: { value: { id: 2, title: 'Hello' } },
        },
        output,
        false,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated examples code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
    })
  })

  describe('split mode', () => {
    it('writes individual files and barrel file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-examples-'))
      const output = path.join(tmpDir, 'examples')
      const result = await examples(
        {
          UserExample: { value: { id: 1, name: 'John' } },
          PostExample: { value: { id: 2, title: 'Hello' } },
        },
        output,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated Example code written to ${output}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'userExample.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'postExample.ts'))).toBe(true)
    })

    it('writes individual files with readonly flag', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-examples-'))
      const output = path.join(tmpDir, 'examples')
      const result = await examples(
        {
          UserExample: { value: { id: 1, name: 'John' } },
        },
        output,
        true,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated Example code written to ${output}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(output, 'userExample.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)

      const content = fs.readFileSync(path.join(output, 'userExample.ts'), 'utf-8')
      expect(content.length > 0).toBe(true)
    })

    it('writes individual files with .ts suffix in output', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-examples-'))
      const output = path.join(tmpDir, 'examples.ts')
      const outDir = output.replace(/\.ts$/, '')
      const result = await examples(
        {
          UserExample: { value: { id: 1, name: 'John' } },
        },
        output,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated Example code written to ${outDir}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(outDir, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(outDir, 'userExample.ts'))).toBe(true)
    })

    it('handles $ref references in split mode', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-examples-'))
      const output = path.join(tmpDir, 'examples')
      const result = await examples(
        {
          AliasExample: { $ref: '#/components/examples/UserExample' },
        },
        output,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated Example code written to ${output}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(output, 'aliasExample.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)

      const content = fs.readFileSync(path.join(output, 'aliasExample.ts'), 'utf-8')
      expect(content.length > 0).toBe(true)
    })

    it('generates sorted barrel file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-examples-'))
      const output = path.join(tmpDir, 'examples')
      const result = await examples(
        {
          ZooExample: { value: { zoo: true } },
          AlphaExample: { value: { alpha: true } },
        },
        output,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated Example code written to ${output}/*.ts (index.ts included)`,
      })
      const indexContent = fs.readFileSync(path.join(output, 'index.ts'), 'utf-8')
      const lines = indexContent.trim().split('\n')
      expect(lines.length).toBe(2)
      expect(lines[0]).toBe("export * from './alphaExample.ts'")
      expect(lines[1]).toBe("export * from './zooExample.ts'")
    })
  })
})
