import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { responses } from './responses.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('responses', () => {
  it('returns error when responses is undefined', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-responses-'))
    const output = path.join(tmpDir, 'responses.ts')
    const result = await responses(undefined, output, false)
    expect(result).toStrictEqual({ ok: false, error: 'No responses found' })
  })

  it('returns success message when responses is empty', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-responses-'))
    const output = path.join(tmpDir, 'responses.ts')
    const result = await responses({}, output, false)
    expect(result).toStrictEqual({ ok: true, value: 'No responses found' })
  })

  describe('non-split mode', () => {
    it('writes single file and returns success', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-responses-'))
      const output = path.join(tmpDir, 'responses.ts')
      const result = await responses(
        {
          NotFound: {
            description: 'Not found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                  },
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
        value: `Generated responses code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
      const content = fs.readFileSync(output, 'utf-8')
      expect(content.length > 0).toBe(true)
    })
  })

  describe('split mode', () => {
    it('writes individual files and barrel file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-responses-'))
      const output = path.join(tmpDir, 'responses')
      const result = await responses(
        {
          NotFound: {
            description: 'Not found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
          Unauthorized: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
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
        value: `Generated responses code written to ${output}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'notFound.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'unauthorized.ts'))).toBe(true)
    })
  })
})
