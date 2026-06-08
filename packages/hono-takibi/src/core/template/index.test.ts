import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../../openapi/index.js'
import { template } from './index.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('template', () => {
  it('should generate app template and handler files', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-template-'))
    const output = path.join(tmpDir, 'routes.ts')
    const openAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/health': {
          get: {
            operationId: 'healthCheck',
            responses: {
              '200': { description: 'OK' },
            },
          },
        },
      },
    }
    const result = await template(openAPI, output, false, '/', undefined, undefined, false)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value).toBe('🔥 Generated code and template files written')
    }
    expect(fs.existsSync(path.join(tmpDir, 'index.ts'))).toBe(true)
    expect(fs.existsSync(path.join(tmpDir, 'handlers'))).toBe(true)
  })

  it('writes handlers to a custom output directory and imports from there', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-template-output-'))
    const output = path.join(tmpDir, 'routes.ts')
    const openAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/health': {
          get: {
            operationId: 'healthCheck',
            responses: {
              '200': { description: 'OK' },
            },
          },
        },
      },
    }
    const result = await template(
      openAPI,
      output,
      false,
      '/',
      undefined,
      undefined,
      false,
      'vitest',
      path.join(tmpDir, 'controllers'),
    )
    expect(result.ok).toBe(true)
    // handlers go to the custom dir, not the default `handlers`
    expect(fs.existsSync(path.join(tmpDir, 'controllers', 'health.ts'))).toBe(true)
    expect(fs.existsSync(path.join(tmpDir, 'handlers'))).toBe(false)
    expect(fs.readFileSync(path.join(tmpDir, 'index.ts'), 'utf-8').split('\n')).toContain(
      "import { healthHandler } from './controllers'",
    )
  })

  it('resolves a custom output directory through a pathAlias', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-template-alias-'))
    const output = path.join(tmpDir, 'routes.ts')
    const openAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/health': {
          get: {
            operationId: 'healthCheck',
            responses: {
              '200': { description: 'OK' },
            },
          },
        },
      },
    }
    const result = await template(
      openAPI,
      output,
      false,
      '/',
      '@/',
      undefined,
      false,
      'vitest',
      path.join(tmpDir, 'controllers'),
    )
    expect(result.ok).toBe(true)
    expect(fs.existsSync(path.join(tmpDir, 'controllers', 'health.ts'))).toBe(true)
    expect(fs.readFileSync(path.join(tmpDir, 'index.ts'), 'utf-8').split('\n')).toContain(
      "import { healthHandler } from '@/controllers'",
    )
  })

  it('merges into an existing app file, preserving custom imports', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-template-merge-'))
    const output = path.join(tmpDir, 'routes.ts')
    // Pre-existing app file with a hand-added import. Regeneration must take the
    // merge branch (existing !== null); mergeImports keeps the custom import.
    fs.writeFileSync(
      path.join(tmpDir, 'index.ts'),
      `import { OpenAPIHono } from '@hono/zod-openapi'
import { customThing } from './custom-marker'

export const api = new OpenAPIHono()
`,
    )
    const openAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/health': {
          get: {
            operationId: 'healthCheck',
            responses: {
              '200': { description: 'OK' },
            },
          },
        },
      },
    }
    const result = await template(openAPI, output, false, '/', undefined, undefined, false)
    expect(result.ok).toBe(true)
    const content = fs.readFileSync(path.join(tmpDir, 'index.ts'), 'utf-8')
    expect(content.includes('custom-marker')).toBe(true)
  })
})
