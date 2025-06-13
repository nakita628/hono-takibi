import { afterEach,describe, it, expect } from 'vitest'
import { mkdir } from '.'
import fsp from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'

// Test run
// pnpm vitest run ./src/fsp/mkdir.test.ts

const TEST_DIR = path.join(process.cwd(), 'test-tmp-dir')

describe('mkdir (safe fs wrapper)', () => {
  afterEach(async () => {
    if (fs.existsSync(TEST_DIR)) {
      await fsp.rmdir(TEST_DIR, { recursive: true })
    }
  })

  it('returns ok when directory is created', async () => {
    const result = await mkdir(TEST_DIR)
    expect(result).toEqual({ ok: true, value: undefined })
    expect(fs.existsSync(TEST_DIR)).toBe(true)
  })

  it('returns ok when directory already exists (recursive:true)', async () => {
    await fsp.mkdir(TEST_DIR, { recursive: true })
    const result = await mkdir(TEST_DIR)
    expect(result).toEqual({ ok: true, value: undefined })
  })

  it('returns err for invalid path', async () => {
    const filePath = path.join(TEST_DIR, 'foo.txt')
    await fsp.mkdir(TEST_DIR, { recursive: true })
    await fsp.writeFile(filePath, 'dummy')
    const badPath = path.join(filePath, 'bar')
    const result = await mkdir(badPath)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(typeof result.error).toBe('string')
      expect(result.error.length).toBeGreaterThan(0)
    }
  })
})
