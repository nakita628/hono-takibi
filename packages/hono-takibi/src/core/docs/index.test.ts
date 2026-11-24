import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import * as NodeFileSystem from '@effect/platform-node/NodeFileSystem'
import { Effect } from 'effect'
import { afterEach, describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../../openapi/index.js'
import { docs } from './index.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('docs', () => {
  it('should generate markdown docs', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-docs-'))
    const output = path.join(tmpDir, 'docs.md')
    const openAPI = {
      openapi: '3.1.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            operationId: 'getUsers',
            responses: {
              '200': { description: 'OK' },
            },
          },
        },
      },
    } as OpenAPI
    const result = await Effect.runPromise(
      Effect.provide(docs(openAPI, output), NodeFileSystem.layer),
    )
    expect(result).toBe(`Generated docs written to ${output}`)
    expect(fs.existsSync(output)).toBe(true)
    const content = fs.readFileSync(output, 'utf8')
    expect(content.length).toBeGreaterThan(0)
  })

  it('returns ok:false when the output directory cannot be created', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-docs-'))
    const blockingFile = path.join(tmpDir, 'block')
    fs.writeFileSync(blockingFile, 'x')
    const output = path.join(blockingFile, 'docs.md')
    const openAPI = {
      openapi: '3.1.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {},
    } as OpenAPI
    const result = await Effect.runPromise(
      Effect.flip(Effect.provide(docs(openAPI, output), NodeFileSystem.layer)),
    )
    expect(result.message).toBe(`AlreadyExists: FileSystem.makeDirectory (${blockingFile})`)
  })
})
