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
    expect(fs.existsSync(path.join(tmpDir, 'handlers', 'health.ts'))).toBe(true)
  })

  it('treats a server/index.ts output as a module dir: app and handlers go one level up', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-template-dirmodule-'))
    const output = path.join(tmpDir, 'server', 'index.ts')
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
    // `server/index.ts` means "module server/", so the app entry and handlers land beside it.
    expect(fs.existsSync(path.join(tmpDir, 'index.ts'))).toBe(true)
    expect(fs.existsSync(path.join(tmpDir, 'handlers', 'health.ts'))).toBe(true)
    expect(fs.readFileSync(path.join(tmpDir, 'index.ts'), 'utf-8').split('\n')).toContain(
      "import { healthHandler } from './handlers'",
    )
    expect(
      fs.readFileSync(path.join(tmpDir, 'handlers', 'health.ts'), 'utf-8').split('\n'),
    ).toContain("import { getHealthRoute } from '../server'")
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

  it('propagates the error when the app target cannot be read', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-template-unreadable-'))
    const output = path.join(tmpDir, 'routes.ts')
    // A directory at the target path makes readFile fail with a non-ENOENT error.
    fs.mkdirSync(path.join(tmpDir, 'index.ts'))
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
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.length > 0).toBe(true)
    }
  })
})
