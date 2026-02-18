import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { links } from './links.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('links', () => {
  it('returns error when links is undefined', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-links-'))
    const output = path.join(tmpDir, 'links.ts')
    const result = await links(undefined, output, false)
    expect(result).toStrictEqual({ ok: false, error: 'No links found' })
  })

  it('returns success message when links is empty', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-links-'))
    const output = path.join(tmpDir, 'links.ts')
    const result = await links({}, output, false)
    expect(result).toStrictEqual({ ok: true, value: 'No links found' })
  })

  describe('non-split mode', () => {
    it('writes single file and returns success', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-links-'))
      const output = path.join(tmpDir, 'links.ts')
      const result = await links(
        {
          GetUserById: {
            operationId: 'getUser',
            parameters: { userId: '$response.body#/id' },
          },
        },
        output,
        false,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated links code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
      const content = fs.readFileSync(output, 'utf-8')
      expect(content.length > 0).toBe(true)
    })
  })

  describe('split mode', () => {
    it('writes individual files and barrel file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-links-'))
      const output = path.join(tmpDir, 'links')
      const result = await links(
        {
          GetUserById: {
            operationId: 'getUser',
            parameters: { userId: '$response.body#/id' },
          },
          GetPostById: {
            operationId: 'getPost',
            parameters: { postId: '$response.body#/id' },
          },
        },
        output,
        true,
      )
      expect(result.ok).toBe(true)
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'getUserById.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'getPostById.ts'))).toBe(true)
    })
  })
})
