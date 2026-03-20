import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'

import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vite-plus/test'

import { mkdir, readdir, readFile, unlink, writeFile } from './index.js'

const TEST_DIR = path.join(process.cwd(), 'test-tmp-dir')

describe('fsp', () => {
  afterEach(async () => {
    if (fs.existsSync(TEST_DIR)) {
      await fsp.rm(TEST_DIR, { recursive: true })
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

    it('creates nested directories', async () => {
      const deepPath = path.join(TEST_DIR, 'a', 'b', 'c')
      const result = await mkdir(deepPath)
      expect(result).toStrictEqual({ ok: true, value: undefined })
      expect(fs.existsSync(deepPath)).toBe(true)
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
        const sorted = [...result.value].sort()
        expect(sorted).toStrictEqual(['a.txt', 'b.txt'])
      }
    })

    it('returns err with notFound flag for non-existent directory', async () => {
      const nonExist = path.join(TEST_DIR, 'no-such-dir')
      const result = await readdir(nonExist)
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(typeof result.error).toBe('string')
        expect(result.error.length).toBeGreaterThan(0)
        expect(result.notFound).toBe(true)
      }
    })

    it('returns empty array for empty directory', async () => {
      const emptyDir = path.join(TEST_DIR, 'empty-dir')
      await fsp.mkdir(emptyDir, { recursive: true })
      const result = await readdir(emptyDir)
      expect(result).toStrictEqual({ ok: true, value: [] })
    })
  })

  describe('readFile', () => {
    beforeEach(async () => {
      await fsp.mkdir(TEST_DIR, { recursive: true })
    })

    it('returns file content when file exists', async () => {
      const filePath = path.join(TEST_DIR, 'read-test.txt')
      await fsp.writeFile(filePath, 'hello world')
      const result = await readFile(filePath)
      expect(result).toEqual({ ok: true, value: 'hello world' })
    })

    it('returns null when file does not exist', async () => {
      const filePath = path.join(TEST_DIR, 'no-such-file.txt')
      const result = await readFile(filePath)
      expect(result).toEqual({ ok: true, value: null })
    })

    it('returns err for non-file path', async () => {
      // Reading a directory as a file should fail
      const result = await readFile(TEST_DIR)
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(typeof result.error).toBe('string')
        expect(result.error.length).toBeGreaterThan(0)
      }
    })

    it('reads empty file correctly', async () => {
      const filePath = path.join(TEST_DIR, 'empty-read.txt')
      await fsp.writeFile(filePath, '')
      const result = await readFile(filePath)
      expect(result).toStrictEqual({ ok: true, value: '' })
    })

    it('reads unicode content correctly', async () => {
      const filePath = path.join(TEST_DIR, 'unicode-read.txt')
      const content = '日本語テスト 🎉'
      await fsp.writeFile(filePath, content)
      const result = await readFile(filePath)
      expect(result).toStrictEqual({ ok: true, value: content })
    })
  })

  describe('unlink', () => {
    beforeEach(async () => {
      await fsp.mkdir(TEST_DIR, { recursive: true })
    })

    it('removes an existing file', async () => {
      const filePath = path.join(TEST_DIR, 'to-remove.txt')
      await fsp.writeFile(filePath, 'bye')
      expect(fs.existsSync(filePath)).toBe(true)
      const result = await unlink(filePath)
      expect(result).toEqual({ ok: true, value: undefined })
      expect(fs.existsSync(filePath)).toBe(false)
    })

    it('returns ok when file does not exist (ENOENT)', async () => {
      const filePath = path.join(TEST_DIR, 'no-such-file.txt')
      const result = await unlink(filePath)
      expect(result).toEqual({ ok: true, value: undefined })
    })

    it('returns err for invalid path (directory)', async () => {
      const result = await unlink(TEST_DIR)
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

    it('skips writing when file content is identical', async () => {
      const filePath = path.join(TEST_DIR, 'identical.txt')
      await fsp.writeFile(filePath, 'same content')
      const statBefore = await fsp.stat(filePath)
      // Small delay to ensure mtime would differ if written
      await new Promise((r) => setTimeout(r, 50))
      const result = await writeFile(filePath, 'same content')
      expect(result).toStrictEqual({ ok: true, value: undefined })
      const statAfter = await fsp.stat(filePath)
      // mtime should NOT change since content is identical
      expect(statAfter.mtimeMs).toBe(statBefore.mtimeMs)
    })

    it('overwrites when file content differs', async () => {
      const filePath = path.join(TEST_DIR, 'differ.txt')
      await fsp.writeFile(filePath, 'old content')
      const result = await writeFile(filePath, 'new content')
      expect(result).toStrictEqual({ ok: true, value: undefined })
      const text = await fsp.readFile(filePath, 'utf-8')
      expect(text).toBe('new content')
    })

    it('creates file when it does not exist', async () => {
      const filePath = path.join(TEST_DIR, 'new-file.txt')
      const result = await writeFile(filePath, 'brand new')
      expect(result).toStrictEqual({ ok: true, value: undefined })
      const text = await fsp.readFile(filePath, 'utf-8')
      expect(text).toBe('brand new')
    })

    it('handles empty string content', async () => {
      const filePath = path.join(TEST_DIR, 'empty.txt')
      const result = await writeFile(filePath, '')
      expect(result).toStrictEqual({ ok: true, value: undefined })
      const text = await fsp.readFile(filePath, 'utf-8')
      expect(text).toBe('')
    })

    it('handles unicode content', async () => {
      const filePath = path.join(TEST_DIR, 'unicode.txt')
      const content = '日本語テスト 🎉 émojis'
      const result = await writeFile(filePath, content)
      expect(result).toStrictEqual({ ok: true, value: undefined })
      const text = await fsp.readFile(filePath, 'utf-8')
      expect(text).toBe(content)
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
