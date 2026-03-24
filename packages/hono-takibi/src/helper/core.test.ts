import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vite-plus/test'

import { core } from './core.js'

describe('core', () => {
  const testDir = 'tmp-core-test'

  beforeEach(() => {
    fs.rmSync(testDir, { recursive: true, force: true })
    fs.mkdirSync(testDir, { recursive: true })
  })

  afterEach(() => {
    fs.rmSync(testDir, { recursive: true, force: true })
  })

  it('should format, create directory, and write file successfully', async () => {
    const result = await core('console.log("Hello, world!")', testDir, `${testDir}/test.ts`)
    expect(result).toStrictEqual({ ok: true, value: undefined })
    expect(fs.existsSync(`${testDir}/test.ts`)).toBe(true)
  })

  it('should create nested directories', async () => {
    const nestedDir = `${testDir}/a/b/c`
    const result = await core('const x = 1', nestedDir, `${nestedDir}/out.ts`)
    expect(result).toStrictEqual({ ok: true, value: undefined })
    expect(fs.existsSync(`${nestedDir}/out.ts`)).toBe(true)
  })

  it('should return error when write fails on read-only path', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'core-readonly-'))
    const readonlyDir = path.join(tmpDir, 'readonly')
    fs.mkdirSync(readonlyDir)
    fs.chmodSync(readonlyDir, 0o444)

    const result = await core('const x = 1', readonlyDir, `${readonlyDir}/sub/out.ts`)
    expect(result.ok).toBe(false)

    // Cleanup
    fs.chmodSync(readonlyDir, 0o755)
    fs.rmSync(tmpDir, { recursive: true, force: true })
  })
})
