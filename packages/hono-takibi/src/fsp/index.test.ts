import { beforeAll, afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdir, readdir, writeFile } from '.'
import { ok, err, andThen, asyncAndThen } from '../result/index.js'
import fsp from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'

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

    it('creates deep nested directory (x/y/z)', async () => {
      const deep = path.join(TEST_DIR, 'x', 'y', 'z')
      const res = await mkdir(deep)
      expect(res).toEqual({ ok: true, value: undefined })
      expect(fs.existsSync(deep)).toBe(true)
    })

    it('returns err when recursive:false & already exists (mock)', async () => {
      const target = path.join(TEST_DIR, 'dup')
      await fsp.mkdir(target, { recursive: true })

      const spy = vi
        .spyOn(fsp, 'mkdir')
        .mockImplementation((p: any, opts?: any) => fsp.mkdir(p, { ...opts, recursive: false }))

      const res = await mkdir(target)
      expect(res.ok).toBe(false)

      spy.mockRestore()
    })

    it('returns err on permission denied (EACCES, mock)', async () => {
      const spy = vi
        .spyOn(fsp, 'mkdir')
        .mockRejectedValue(Object.assign(new Error('denied'), { code: 'EACCES' }))

      const res = await mkdir('/root/forbidden')
      expect(res.ok).toBe(false)

      spy.mockRestore()
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

    it('returns empty array for empty directory', async () => {
      const emptyDir = path.join(TEST_DIR, 'empty')
      await fsp.mkdir(emptyDir, { recursive: true })

      const res = await readdir(emptyDir)
      expect(res).toEqual({ ok: true, value: [] })
    })

    it('lists files and sub-directories', async () => {
      const mix = path.join(TEST_DIR, 'mix')
      await fsp.mkdir(path.join(mix, 'subdir'), { recursive: true })
      await fsp.writeFile(path.join(mix, 'file.txt'), 'data')

      const res = await readdir(mix)
      expect(res.ok).toBe(true)
      if (res.ok) {
        expect(res.value).toEqual(expect.arrayContaining(['subdir', 'file.txt']))
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

    it('overwrites existing file without error', async () => {
      const fp = path.join(TEST_DIR, 'overwrite.txt')
      await fsp.writeFile(fp, 'old')
      await writeFile(fp, 'new')
      expect(await fsp.readFile(fp, 'utf-8')).toBe('new')
    })

    it('handles large (>64 KiB) payload', async () => {
      const big = 'x'.repeat(70_000)
      const fp = path.join(TEST_DIR, 'big.txt')
      const res = await writeFile(fp, big)
      expect(res.ok).toBe(true)
      expect((await fsp.readFile(fp)).byteLength).toBe(70_000)
    })

    it('supports 10 parallel writes safely', async () => {
      const tasks = Array.from({ length: 10 }, (_, i) =>
        writeFile(path.join(TEST_DIR, `p${i}.txt`), `${i}`),
      )
      const results = await Promise.all(tasks)
      results.forEach((r) => expect(r.ok).toBe(true))
    })
  })

  describe('Result utilities', () => {
    it('andThen propagates Ok', () => {
      const r = andThen(ok(3), (n) => ok(n * 2))
      expect(r).toEqual({ ok: true, value: 6 })
    })

    it('andThen short-circuits on Err', () => {
      const r = andThen(err('fail'), () => ok(0))
      expect(r).toEqual({ ok: false, error: 'fail' })
    })

    it('asyncAndThen works with async mapper', async () => {
      const r = await asyncAndThen(ok('a'), async (v) => ok(v + 'b'))
      expect(r).toEqual({ ok: true, value: 'ab' })
    })
  })
})
