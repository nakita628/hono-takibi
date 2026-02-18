import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
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
    const result = await docs(openAPI, output)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value).toBe(`Generated docs written to ${output}`)
    }
    expect(fs.existsSync(output)).toBe(true)
    const content = fs.readFileSync(output, 'utf-8')
    expect(content.length).toBeGreaterThan(0)
  })
})
