import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
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
  })
})
