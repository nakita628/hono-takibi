import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { pathItems } from './pathItems.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('pathItems', () => {
  it('returns error when pathItemsConfig is undefined', async () => {
    const result = await pathItems({}, undefined)
    expect(result).toStrictEqual({ ok: false, error: 'pathItems.output is required' })
  })

  it('returns error when pathItemsConfig.output is missing', async () => {
    const result = await pathItems({}, {} as { output: string })
    expect(result).toStrictEqual({ ok: false, error: 'pathItems.output is required' })
  })

  it('returns error when no pathItems in components', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-pathItems-'))
    const output = path.join(tmpDir, 'pathItems.ts')
    const result = await pathItems({}, { output })
    expect(result).toStrictEqual({ ok: false, error: 'No pathItems found' })
  })

  it('returns success message when pathItems is empty', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-pathItems-'))
    const output = path.join(tmpDir, 'pathItems.ts')
    const result = await pathItems({ pathItems: {} }, { output })
    expect(result).toStrictEqual({ ok: true, value: 'No pathItems found' })
  })

  describe('non-split mode', () => {
    it('writes single file and returns success', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-pathItems-'))
      const output = path.join(tmpDir, 'pathItems.ts')
      const result = await pathItems(
        {
          pathItems: {
            UserOperations: {
              get: {
                responses: {
                  '200': {
                    description: 'OK',
                    content: {
                      'application/json': {
                        schema: { type: 'object', properties: { id: { type: 'string' } } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        { output },
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated pathItems code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
      const content = fs.readFileSync(output, 'utf-8')
      expect(content.length > 0).toBe(true)
    })
  })
})
