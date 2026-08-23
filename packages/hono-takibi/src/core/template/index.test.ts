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

  it('preserves import aliases and repeated namespace imports in the app file', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-template-alias-'))
    const output = path.join(tmpDir, 'routes.ts')
    fs.writeFileSync(
      path.join(tmpDir, 'index.ts'),
      `import { OpenAPIHono } from '@hono/zod-openapi'
import { env as workerEnv } from 'cloudflare:workers'

import { getBooksRouteHandler } from '@/api/handlers'
import { getBooksRoute } from '@/api/routes'
import { env as appEnv } from '@/data/env'
import * as BookService from '@/api/services'
import * as ReviewService from '@/api/services'

export const app = new OpenAPIHono().basePath('/api')

export const api = app.openapi(getBooksRoute, getBooksRouteHandler)

export const debug = { workerEnv, appEnv, BookService, ReviewService }
`,
    )
    const openAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/books': {
          get: {
            operationId: 'readBooks',
            tags: ['books'],
            responses: { '200': { description: 'OK' } },
          },
        },
        '/books/{bookId}/reviews': {
          get: {
            operationId: 'readReviews',
            tags: ['reviews'],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }
    const result = await template(openAPI, output, false, '/', '@/api', undefined, true)
    expect(result.ok).toBe(true)
    expect(fs.readFileSync(path.join(tmpDir, 'index.ts'), 'utf-8')).toBe(
      `import { OpenAPIHono } from '@hono/zod-openapi'
import { env as workerEnv } from 'cloudflare:workers'
import { getBooksBookIdReviewsRouteHandler, getBooksRouteHandler } from '@/api/handlers'
import { getBooksBookIdReviewsRoute, getBooksRoute } from '@/api/routes'
import { env as appEnv } from '@/data/env'
import * as BookService from '@/api/services'
import * as ReviewService from '@/api/services'

export const app = new OpenAPIHono().basePath('/api')

export const api = app
  .openapi(getBooksRoute, getBooksRouteHandler)
  .openapi(getBooksBookIdReviewsRoute, getBooksBookIdReviewsRouteHandler)

export const debug = { workerEnv, appEnv, BookService, ReviewService }
`,
    )
  })

  it('keeps an implemented inline sub-router mounted when a tag would rename its file', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-template-inline-tag-'))
    const output = path.join(tmpDir, 'routes.ts')
    const untagged: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/users': {
          get: { operationId: 'getUsers', responses: { '200': { description: 'OK' } } },
        },
      },
    }
    const first = await template(untagged, output, false, '/', undefined, undefined, false)
    expect(first.ok).toBe(true)
    const implemented = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getUsersRoute } from '../routes'

const app = new OpenAPIHono()

export const usersHandler = app.openapi(getUsersRoute, async (c) => {
  return c.json([{ id: '1', name: 'Jane' }], 200)
})
`
    fs.writeFileSync(path.join(tmpDir, 'handlers', 'users.ts'), implemented)

    const tagged: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            operationId: 'getUsers',
            tags: ['User Management'],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }
    const second = await template(tagged, output, false, '/', undefined, undefined, false)
    expect(second.ok).toBe(true)
    expect(fs.existsSync(path.join(tmpDir, 'handlers', 'userManagement.ts'))).toBe(false)
    expect(fs.readFileSync(path.join(tmpDir, 'handlers', 'users.ts'), 'utf-8')).toBe(implemented)
    expect(fs.readFileSync(path.join(tmpDir, 'index.ts'), 'utf-8')).toBe(
      `import { OpenAPIHono } from '@hono/zod-openapi'
import { usersHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.route('/', usersHandler)

export default app
`,
    )
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
