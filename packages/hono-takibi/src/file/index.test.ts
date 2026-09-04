import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vite-plus/test'

import { runGenerator, runGeneratorError } from '../testing/index.js'
import { mkdir, readdir, readFile, unlink, writeFile } from './index.js'

const TEST_DIR = path.join(process.cwd(), 'test-tmp-dir')

describe('file', () => {
  afterEach(async () => {
    if (fs.existsSync(TEST_DIR)) {
      await fsp.rm(TEST_DIR, { recursive: true })
    }
  })

  describe('mkdir', () => {
    it('returns ok when directory is created', async () => {
      await expect(runGenerator(mkdir(TEST_DIR))).resolves.toBeUndefined()
      expect(fs.existsSync(TEST_DIR)).toBe(true)
    })

    it('returns ok when directory already exists (recursive:true)', async () => {
      await fsp.mkdir(TEST_DIR, { recursive: true })
      await expect(runGenerator(mkdir(TEST_DIR))).resolves.toBeUndefined()
    })

    it('creates nested directories', async () => {
      const deepPath = path.join(TEST_DIR, 'a', 'b', 'c')
      await expect(runGenerator(mkdir(deepPath))).resolves.toBeUndefined()
      expect(fs.existsSync(deepPath)).toBe(true)
    })

    it('returns err for invalid path', async () => {
      const filePath = path.join(TEST_DIR, 'foo.txt')
      await fsp.mkdir(TEST_DIR, { recursive: true })
      await fsp.writeFile(filePath, 'dummy')
      const badPath = path.join(filePath, 'bar')
      const result = await runGeneratorError(mkdir(badPath))
      expect(typeof result.message).toBe('string')
      expect(result.message.length).toBeGreaterThan(0)
    })
  })

  describe('readdir', () => {
    beforeEach(async () => {
      await fsp.mkdir(TEST_DIR, { recursive: true })
      await fsp.writeFile(path.join(TEST_DIR, 'a.txt'), 'A')
      await fsp.writeFile(path.join(TEST_DIR, 'b.txt'), 'B')
    })

    it('returns files for a valid directory', async () => {
      const result = await runGenerator(readdir(TEST_DIR))
      const sorted = [...result].sort()
      expect(sorted).toStrictEqual(['a.txt', 'b.txt'])
    })

    // Every caller treats "the directory is not there yet" as "nothing in it", so
    // absorbing it here is the contract rather than a swallowed error.
    it('reads a non-existent directory as empty', async () => {
      const nonExist = path.join(TEST_DIR, 'no-such-dir')
      expect(await runGenerator(readdir(nonExist))).toStrictEqual([])
    })

    it('returns empty array for empty directory', async () => {
      const emptyDir = path.join(TEST_DIR, 'empty-dir')
      await fsp.mkdir(emptyDir, { recursive: true })
      const result = await runGenerator(readdir(emptyDir))
      expect(result).toStrictEqual([])
    })
  })

  describe('readFile', () => {
    beforeEach(async () => {
      await fsp.mkdir(TEST_DIR, { recursive: true })
    })

    it('returns file content when file exists', async () => {
      const filePath = path.join(TEST_DIR, 'read-test.txt')
      await fsp.writeFile(filePath, 'hello world')
      const result = await runGenerator(readFile(filePath))
      expect(result).toStrictEqual('hello world')
    })

    it('returns null when file does not exist', async () => {
      const filePath = path.join(TEST_DIR, 'no-such-file.txt')
      const result = await runGenerator(readFile(filePath))
      expect(result).toStrictEqual(null)
    })

    it('returns err for non-file path', async () => {
      // Reading a directory as a file should fail
      const result = await runGeneratorError(readFile(TEST_DIR))
      expect(typeof result.message).toBe('string')
      expect(result.message.length).toBeGreaterThan(0)
    })

    it('reads empty file correctly', async () => {
      const filePath = path.join(TEST_DIR, 'empty-read.txt')
      await fsp.writeFile(filePath, '')
      const result = await runGenerator(readFile(filePath))
      expect(result).toStrictEqual('')
    })

    it('reads unicode content correctly', async () => {
      const filePath = path.join(TEST_DIR, 'unicode-read.txt')
      const content = '日本語テスト 🎉'
      await fsp.writeFile(filePath, content)
      const result = await runGenerator(readFile(filePath))
      expect(result).toStrictEqual(content)
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
      await expect(runGenerator(unlink(filePath))).resolves.toBeUndefined()
      expect(fs.existsSync(filePath)).toBe(false)
    })

    it('returns ok when file does not exist (ENOENT)', async () => {
      const filePath = path.join(TEST_DIR, 'no-such-file.txt')
      await expect(runGenerator(unlink(filePath))).resolves.toBeUndefined()
    })

    it('returns err for invalid path (directory)', async () => {
      const result = await runGeneratorError(unlink(TEST_DIR))
      expect(typeof result.message).toBe('string')
      expect(result.message.length).toBeGreaterThan(0)
    })
  })

  describe('writeFile', () => {
    beforeEach(async () => {
      await fsp.mkdir(TEST_DIR, { recursive: true })
    })

    it('writes file successfully', async () => {
      const filePath = path.join(TEST_DIR, 'ok.txt')
      await expect(runGenerator(writeFile(filePath, 'hello'))).resolves.toBeUndefined()
      const text = await fsp.readFile(filePath, 'utf-8')
      expect(text).toBe('hello')
    })

    it('skips writing when file content is identical', async () => {
      const filePath = path.join(TEST_DIR, 'identical.txt')
      await fsp.writeFile(filePath, 'same content')
      const statBefore = await fsp.stat(filePath)
      // Small delay to ensure mtime would differ if written
      await new Promise((resolve) => setTimeout(resolve, 50))
      await expect(runGenerator(writeFile(filePath, 'same content'))).resolves.toBeUndefined()
      const statAfter = await fsp.stat(filePath)
      // mtime should NOT change since content is identical
      expect(statAfter.mtimeMs).toBe(statBefore.mtimeMs)
    })

    it('overwrites when file content differs', async () => {
      const filePath = path.join(TEST_DIR, 'differ.txt')
      await fsp.writeFile(filePath, 'old content')
      await expect(runGenerator(writeFile(filePath, 'new content'))).resolves.toBeUndefined()
      const text = await fsp.readFile(filePath, 'utf-8')
      expect(text).toBe('new content')
    })

    it('creates file when it does not exist', async () => {
      const filePath = path.join(TEST_DIR, 'new-file.txt')
      await expect(runGenerator(writeFile(filePath, 'brand new'))).resolves.toBeUndefined()
      const text = await fsp.readFile(filePath, 'utf-8')
      expect(text).toBe('brand new')
    })

    it('handles empty string content', async () => {
      const filePath = path.join(TEST_DIR, 'empty.txt')
      await expect(runGenerator(writeFile(filePath, ''))).resolves.toBeUndefined()
      const text = await fsp.readFile(filePath, 'utf-8')
      expect(text).toBe('')
    })

    it('handles unicode content', async () => {
      const filePath = path.join(TEST_DIR, 'unicode.txt')
      const content = '日本語テスト 🎉 émojis'
      await expect(runGenerator(writeFile(filePath, content))).resolves.toBeUndefined()
      const text = await fsp.readFile(filePath, 'utf-8')
      expect(text).toBe(content)
    })

    it('returns err for invalid path', async () => {
      const filePath = path.join(TEST_DIR, 'foo.txt')
      await fsp.writeFile(filePath, 'dummy')
      const badPath = path.join(filePath, 'bar.txt')
      const result = await runGeneratorError(writeFile(badPath, 'fail'))
      expect(typeof result.message).toBe('string')
      expect(result.message.length).toBeGreaterThan(0)
    })
  })
})
