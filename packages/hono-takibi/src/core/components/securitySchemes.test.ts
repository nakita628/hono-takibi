import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { securitySchemes } from './securitySchemes.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('securitySchemes', () => {
  it('returns error when securitySchemes is undefined', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-securitySchemes-'))
    const output = path.join(tmpDir, 'securitySchemes.ts')
    const result = await securitySchemes(undefined, output, false)
    expect(result).toStrictEqual({ ok: false, error: 'No securitySchemes found' })
  })

  it('returns success message when securitySchemes is empty', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-securitySchemes-'))
    const output = path.join(tmpDir, 'securitySchemes.ts')
    const result = await securitySchemes({}, output, false)
    expect(result).toStrictEqual({ ok: true, value: 'No securitySchemes found' })
  })

  describe('non-split mode', () => {
    it('writes single file and returns success', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-securitySchemes-'))
      const output = path.join(tmpDir, 'securitySchemes.ts')
      const result = await securitySchemes(
        {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
        output,
        false,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated securitySchemes code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
      const content = fs.readFileSync(output, 'utf-8')
      expect(content.length > 0).toBe(true)
    })
  })

  describe('split mode', () => {
    it('writes individual files and barrel file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-securitySchemes-'))
      const output = path.join(tmpDir, 'securitySchemes')
      const result = await securitySchemes(
        {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          apiKey: {
            type: 'apiKey',
            name: 'X-API-Key',
            in: 'header',
          },
        },
        output,
        true,
      )
      expect(result.ok).toBe(true)
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'bearerAuth.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'apiKey.ts'))).toBe(true)
    })
  })
})
