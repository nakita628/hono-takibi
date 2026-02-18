import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { requestBodies } from './requestBodies.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('requestBodies', () => {
  it('returns error when requestBodies is undefined', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-requestBodies-'))
    const output = path.join(tmpDir, 'requestBodies.ts')
    const result = await requestBodies(undefined, output, false)
    expect(result).toStrictEqual({ ok: false, error: 'No requestBodies found' })
  })

  it('returns success message when requestBodies is empty', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-requestBodies-'))
    const output = path.join(tmpDir, 'requestBodies.ts')
    const result = await requestBodies({}, output, false)
    expect(result).toStrictEqual({ ok: true, value: 'No requestBodies found' })
  })

  describe('non-split mode', () => {
    it('writes single file and returns success', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-requestBodies-'))
      const output = path.join(tmpDir, 'requestBodies.ts')
      const result = await requestBodies(
        {
          CreateUser: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                  },
                  required: ['name'],
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
        value: `Generated requestBodies code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
      const content = fs.readFileSync(output, 'utf-8')
      expect(content.length > 0).toBe(true)
    })
  })

  describe('split mode', () => {
    it('writes individual files and barrel file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-requestBodies-'))
      const output = path.join(tmpDir, 'requestBodies')
      const result = await requestBodies(
        {
          CreateUser: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                  },
                  required: ['name'],
                },
              },
            },
          },
          UpdateUser: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
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
        value: `Generated requestBodies code written to ${output}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'createUser.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'updateUser.ts'))).toBe(true)
    })
  })
})
