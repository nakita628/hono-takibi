import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { mkdir, readdir, writeFile } from '.'

// Test run
// pnpm vitest run ./src/fsp/index.test.ts

const TEST_DIR = path.join(process.cwd(), 'test-tmp-dir')

describe('fsp', () => {
  afterEach(async () => {
    if (fs.existsSync(TEST_DIR)) {
      await fsp.rmdir(TEST_DIR, { recursive: true })
    }
  })
  describe('mkdir', () => {
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

  describe('readdir', () => {
    beforeAll(async () => {
      await fsp.mkdir(TEST_DIR, { recursive: true })
      await fsp.writeFile(path.join(TEST_DIR, 'a.txt'), 'A')
      await fsp.writeFile(path.join(TEST_DIR, 'b.txt'), 'B')
    })
    it('returns files for a valid directory', async () => {
      const result = await readdir(TEST_DIR)
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(Array.isArray(result.value)).toBe(true)
        expect(result.value).toContain('a.txt')
        expect(result.value).toContain('b.txt')
      }
    })

    it('returns err for non-existent directory', async () => {
      const nonExist = path.join(TEST_DIR, 'no-such-dir')
      const result = await readdir(nonExist)
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(typeof result.error).toBe('string')
        expect(result.error.length).toBeGreaterThan(0)
      }
    })
  })

  describe('writeFile', () => {
    beforeEach(async () => {
      await fsp.mkdir(TEST_DIR, { recursive: true })
    })
    it('writes file successfully', async () => {
      const filePath = path.join(TEST_DIR, 'ok.txt')
      const result = await writeFile(filePath, 'hello')
      expect(result.ok).toBe(true)
      const text = await fsp.readFile(filePath, 'utf-8')
      expect(text).toBe('hello')
    })

    it('returns err for invalid path', async () => {
      const filePath = path.join(TEST_DIR, 'foo.txt')
      await fsp.writeFile(filePath, 'dummy')
      const badPath = path.join(filePath, 'bar.txt')
      const result = await writeFile(badPath, 'fail')
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(typeof result.error).toBe('string')
        expect(result.error.length).toBeGreaterThan(0)
      }
    })
  })
})
