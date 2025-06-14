import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { readdir } from '.'

// Test run
// pnpm vitest run ./src/fsp/readdir.test.ts

const TEST_DIR = path.join(process.cwd(), '__tmp_readdir_test__')

beforeAll(async () => {
  await fsp.mkdir(TEST_DIR, { recursive: true })
  await fsp.writeFile(path.join(TEST_DIR, 'a.txt'), 'A')
  await fsp.writeFile(path.join(TEST_DIR, 'b.txt'), 'B')
})

afterAll(async () => {
  await fsp.rm(TEST_DIR, { recursive: true, force: true })
})

describe('readdir', () => {
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
