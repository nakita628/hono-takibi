import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../openapi/index.js'
import { mock } from './index.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('mock', () => {
  it('should generate mock server code', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mock-'))
    const output = path.join(tmpDir, 'mock.ts')
    const openAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            operationId: 'getUsers',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          name: { type: 'string' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }
    const result = await mock(openAPI, output, '/')
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value).toBe(`Generated mock server written to ${output}`)
    }
    expect(fs.existsSync(output)).toBe(true)
  })
})
