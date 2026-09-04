import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vite-plus/test'

import { runGenerator, runGeneratorError } from '../testing/index.js'
import { emit } from './index.js'

describe('emit', () => {
  const testDir = 'tmp-emit-test'
  beforeEach(() => {
    fs.rmSync(testDir, { recursive: true, force: true })
    fs.mkdirSync(testDir, { recursive: true })
  })
  afterEach(() => {
    fs.rmSync(testDir, { recursive: true, force: true })
  })
  it('should format, create directory, and write file successfully', async () => {
    await runGenerator(emit('console.log("Hello, world!")', testDir, `${testDir}/test.ts`))
    expect(fs.existsSync(`${testDir}/test.ts`)).toBe(true)
  })
  it('should create nested directories', async () => {
    const nestedDir = `${testDir}/a/b/c`
    await runGenerator(emit('const x = 1', nestedDir, `${nestedDir}/out.ts`))
    expect(fs.existsSync(`${nestedDir}/out.ts`)).toBe(true)
  })
  it('should return error when write fails on read-only path', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'emit-readonly-'))
    const readonlyDir = path.join(tmpDir, 'readonly')
    fs.mkdirSync(readonlyDir)
    fs.chmodSync(readonlyDir, 0o444)
    const error = await runGeneratorError(
      emit('const x = 1', readonlyDir, `${readonlyDir}/sub/out.ts`),
    )
    expect(error.message).toContain('PermissionDenied')

    // Cleanup
    fs.chmodSync(readonlyDir, 0o755)
    fs.rmSync(tmpDir, { recursive: true, force: true })
  })
})
