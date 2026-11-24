import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import * as NodeFileSystem from '@effect/platform-node/NodeFileSystem'
import { Effect } from 'effect'
import { afterEach, beforeEach, describe, expect, it } from 'vite-plus/test'

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
    await Effect.runPromise(
      Effect.provide(
        emit('console.log("Hello, world!")', testDir, `${testDir}/test.ts`),
        NodeFileSystem.layer,
      ),
    )
    expect(fs.existsSync(`${testDir}/test.ts`)).toBe(true)
  })
  it('should create nested directories', async () => {
    const nestedDir = `${testDir}/a/b/c`
    await Effect.runPromise(
      Effect.provide(emit('const x = 1', nestedDir, `${nestedDir}/out.ts`), NodeFileSystem.layer),
    )
    expect(fs.existsSync(`${nestedDir}/out.ts`)).toBe(true)
  })
  it('should return error when write fails on read-only path', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'emit-readonly-'))
    const readonlyDir = path.join(tmpDir, 'readonly')
    fs.mkdirSync(readonlyDir)
    fs.chmodSync(readonlyDir, 0o444)
    const error = await Effect.runPromise(
      Effect.flip(
        Effect.provide(
          emit('const x = 1', readonlyDir, `${readonlyDir}/sub/out.ts`),
          NodeFileSystem.layer,
        ),
      ),
    )
    expect(error.message).toBe(`PermissionDenied: FileSystem.writeFile (${readonlyDir}/sub/out.ts)`)

    // Cleanup
    fs.chmodSync(readonlyDir, 0o755)
    fs.rmSync(tmpDir, { recursive: true, force: true })
  })
})
