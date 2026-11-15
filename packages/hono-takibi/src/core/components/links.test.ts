import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vite-plus/test'

import { runGenerator, runGeneratorError } from '../../testing/index.js'
import { links } from './links.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('links', () => {
  it('returns error when links is undefined', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-links-'))
    const output = path.join(tmpDir, 'links.ts')
    const result = await runGeneratorError(links(undefined, output, false))
    expect(result.message).toBe('No links found')
  })

  it('returns success message when links is empty', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-links-'))
    const output = path.join(tmpDir, 'links.ts')
    const result = await runGenerator(links({}, output, false))
    expect(result).toBe('No links found')
  })

  describe('non-split mode', () => {
    it('writes single file and returns success', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-links-'))
      const output = path.join(tmpDir, 'links.ts')
      const result = await runGenerator(
        links(
          {
            GetUserById: {
              operationId: 'getUser',
              parameters: { userId: '$response.body#/id' },
            },
          },
          output,
          false,
        ),
      )
      expect(result).toBe(`Generated links code written to ${output}`)
      expect(fs.existsSync(output)).toBe(true)
      const content = fs.readFileSync(output, 'utf8')
      expect(content.length).toBeGreaterThan(0)
    })
  })

  describe('non-split mode with readonly', () => {
    it('writes single file with as const', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-links-'))
      const output = path.join(tmpDir, 'links.ts')
      const result = await runGenerator(
        links(
          {
            GetUserById: {
              operationId: 'getUser',
              parameters: { userId: '$response.body#/id' },
            },
          },
          output,
          false,
          true,
        ),
      )
      expect(result).toBe(`Generated links code written to ${output}`)
      expect(fs.readFileSync(output, 'utf8')).toBe(
        `export const GetUserByIdLink = {\n  operationId: 'getUser',\n  parameters: { userId: '$response.body#/id' },\n} as const\n`,
      )
    })
  })

  describe('split mode', () => {
    it('writes individual files and barrel file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-links-'))
      const output = path.join(tmpDir, 'links')
      await runGenerator(
        links(
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
        ),
      )
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'getUserById.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'getPostById.ts'))).toBe(true)
    })

    it('writes split files with readonly', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-links-'))
      const output = path.join(tmpDir, 'links')
      await runGenerator(
        links(
          {
            GetUserById: {
              operationId: 'getUser',
              parameters: { userId: '$response.body#/id' },
            },
          },
          output,
          true,
          true,
        ),
      )
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
    })
  })
})
