import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { writeFile } from './write-file'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'

// Test run
// pnpm vitest run ./src/fsp/write-file.test.ts

const TEST_DIR = path.join(process.cwd(), 'test-tmp-dir')

beforeEach(async () => {
  await fsp.mkdir(TEST_DIR, { recursive: true })
})
afterEach(async () => {
  if (fs.existsSync(TEST_DIR)) {
    await fsp.rm(TEST_DIR, { recursive: true, force: true })
  }
})

describe('writeFile', () => {
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
