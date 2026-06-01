import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vite-plus/test'

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

  it('merges into an existing test file, preserving hand-written blocks', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-gen-merge-'))
    const output = path.join(tmpDir, 'index.test.ts')
    // A previously-generated test file the user has hand-extended. Regeneration
    // must take the merge branch (existing !== null) and keep the custom block,
    // which is not a route describe so it is never treated as stale.
    fs.writeFileSync(
      output,
      `import { describe, expect, it } from 'vitest'

describe('custom-marker', () => {
  it('keeps my hand-written test', () => {
    expect(true).toBe(true)
  })
})
`,
    )
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
    const content = fs.readFileSync(output, 'utf-8')
    expect(content.includes('custom-marker')).toBe(true)
  })
})
