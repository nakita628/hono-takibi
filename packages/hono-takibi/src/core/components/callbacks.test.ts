import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { callbacks } from './callbacks.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('callbacks', () => {
  it('returns error when callbacks is undefined', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-callbacks-'))
    const output = path.join(tmpDir, 'callbacks.ts')
    const result = await callbacks(undefined, output, false)
    expect(result).toStrictEqual({ ok: false, error: 'No callbacks found' })
  })

  it('returns success message when callbacks is empty', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-callbacks-'))
    const output = path.join(tmpDir, 'callbacks.ts')
    const result = await callbacks({}, output, false)
    expect(result).toStrictEqual({ ok: true, value: 'No callbacks found' })
  })

  describe('non-split mode', () => {
    it('writes single file and returns success', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-callbacks-'))
      const output = path.join(tmpDir, 'callbacks.ts')
      const result = await callbacks(
        {
          onEvent: {
            '{$request.body#/callbackUrl}': {
              post: {
                requestBody: {
                  required: true,
                  content: {
                    'application/json': {
                      schema: { type: 'object', properties: { id: { type: 'string' } } },
                    },
                  },
                },
                responses: { '200': { description: 'OK' } },
              },
            },
          },
        },
        output,
        false,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated callbacks code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
      const content = fs.readFileSync(output, 'utf-8')
      expect(content.length > 0).toBe(true)
    })
  })

  describe('split mode', () => {
    it('writes individual files and barrel file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-callbacks-'))
      const output = path.join(tmpDir, 'callbacks')
      const result = await callbacks(
        {
          onEvent: {
            '{$request.body#/callbackUrl}': {
              post: {
                requestBody: {
                  required: true,
                  content: {
                    'application/json': {
                      schema: { type: 'object', properties: { id: { type: 'string' } } },
                    },
                  },
                },
                responses: { '200': { description: 'OK' } },
              },
            },
          },
        },
        output,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated Callback code written to ${output}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'onEvent.ts'))).toBe(true)
    })
  })
})
