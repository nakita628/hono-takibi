import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../openapi/index.js'
import { test as testGen } from './index.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('test', () => {
  it('should generate test file', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-gen-'))
    const output = path.join(tmpDir, 'index.test.ts')
    const openAPI: OpenAPI = {
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
    }
    const result = await testGen(openAPI, output, '..')
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value).toBe(`Generated test file written to ${output}`)
    }
    expect(fs.existsSync(output)).toBe(true)
    const content = fs.readFileSync(output, 'utf-8')
    expect(content.length).toBeGreaterThan(0)
  })
})
