import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../../openapi/index.js'
import { defineTemplate } from './define.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

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

describe('defineTemplate', () => {
  it('writes the app to a .ts output and defineOpenAPIRoute handlers to routes/ next to it', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-define-template-'))
    const result = await defineTemplate(
      openAPI,
      path.join(tmpDir, 'index.ts'),
      path.join(tmpDir, 'components.ts'),
      false,
      '/',
      undefined,
      undefined,
    )
    expect(result).toStrictEqual({
      ok: true,
      value: '🔥 Generated code and template files written',
    })
    expect(fs.readFileSync(path.join(tmpDir, 'index.ts'), 'utf-8')).toBe(
      `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes'

const app = new OpenAPIHono()

export const api = app.openapiRoutes([getHealthRoute] as const)

export default app
`,
    )
    expect(fs.readFileSync(path.join(tmpDir, 'routes', 'health.ts'), 'utf-8')).toBe(
      `import { createRoute, defineOpenAPIRoute } from '@hono/zod-openapi'

export const getHealthRoute = defineOpenAPIRoute({
  route: createRoute({
    method: 'get',
    path: '/health',
    operationId: 'healthCheck',
    responses: { 200: { description: 'OK' } },
  }),
  handler: async (c) => {},
  addRoute: true,
})
`,
    )
  })

  it('writes index.ts inside the output when output is a directory', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-define-template-dir-'))
    const result = await defineTemplate(
      openAPI,
      path.join(tmpDir, 'src'),
      path.join(tmpDir, 'src', 'components.ts'),
      false,
      '/',
      undefined,
      undefined,
    )
    expect(result).toStrictEqual({
      ok: true,
      value: '🔥 Generated code and template files written',
    })
    expect(fs.existsSync(path.join(tmpDir, 'src', 'index.ts'))).toBe(true)
    expect(fs.existsSync(path.join(tmpDir, 'src', 'routes', 'health.ts'))).toBe(true)
    expect(fs.readFileSync(path.join(tmpDir, 'src', 'index.ts'), 'utf-8').split('\n')).toContain(
      "import { getHealthRoute } from './routes'",
    )
  })

  it('merges into an existing app file, preserving custom imports', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-define-template-merge-'))
    fs.writeFileSync(
      path.join(tmpDir, 'index.ts'),
      `import { OpenAPIHono } from '@hono/zod-openapi'
import { customThing } from './custom-marker'

export const api = new OpenAPIHono()
`,
    )
    const result = await defineTemplate(
      openAPI,
      path.join(tmpDir, 'index.ts'),
      path.join(tmpDir, 'components.ts'),
      false,
      '/',
      undefined,
      undefined,
    )
    expect(result.ok).toBe(true)
    const content = fs.readFileSync(path.join(tmpDir, 'index.ts'), 'utf-8')
    expect(content.includes('custom-marker')).toBe(true)
  })

  it('writes a handler test file next to the handler when test is enabled', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-define-template-test-'))
    const result = await defineTemplate(
      openAPI,
      path.join(tmpDir, 'index.ts'),
      path.join(tmpDir, 'components.ts'),
      true,
      '/',
      undefined,
      undefined,
    )
    expect(result.ok).toBe(true)
    expect(fs.readFileSync(path.join(tmpDir, 'routes', 'health.test.ts'), 'utf-8')).toBe(
      `import { describe, it, expect } from 'vitest'
import app from '..'

describe('Health', () => {
  describe('GET /health', () => {
    it('should return 200', async () => {
      const res = await app.request(\`/health\`, { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`,
    )
  })

  it('emits routes/ at cwd when output is a bare index.ts', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-define-template-dot-'))
    const origCwd = process.cwd()
    process.chdir(tmpDir)
    try {
      const result = await defineTemplate(
        openAPI,
        'index.ts',
        'components.ts',
        false,
        '/',
        undefined,
        undefined,
      )
      expect(result.ok).toBe(true)
      expect(fs.existsSync(path.join(tmpDir, 'routes', 'health.ts'))).toBe(true)
      expect(fs.readFileSync(path.join(tmpDir, 'index.ts'), 'utf-8').split('\n')).toContain(
        "import { getHealthRoute } from './routes'",
      )
    } finally {
      process.chdir(origCwd)
    }
  })

  it('propagates the error when the app target cannot be read', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-define-template-unreadable-'))
    // A directory at the target path makes readFile fail with a non-ENOENT error.
    fs.mkdirSync(path.join(tmpDir, 'index.ts'))
    const result = await defineTemplate(
      openAPI,
      path.join(tmpDir, 'index.ts'),
      path.join(tmpDir, 'components.ts'),
      false,
      '/',
      undefined,
      undefined,
    )
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.length > 0).toBe(true)
    }
  })

  it('imports handlers through a pathAlias when one is configured', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-define-template-alias-'))
    const result = await defineTemplate(
      openAPI,
      path.join(tmpDir, 'index.ts'),
      path.join(tmpDir, 'components.ts'),
      false,
      '/',
      '@/',
      undefined,
    )
    expect(result.ok).toBe(true)
    expect(fs.existsSync(path.join(tmpDir, 'routes', 'health.ts'))).toBe(true)
    expect(fs.readFileSync(path.join(tmpDir, 'index.ts'), 'utf-8').split('\n')).toContain(
      "import { getHealthRoute } from '@/routes'",
    )
  })
})
