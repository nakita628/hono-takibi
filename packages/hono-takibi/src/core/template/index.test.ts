import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../../openapi/index.js'
import { runGenerator, runGeneratorError } from '../../testing/index.js'
import { template } from './index.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('template', () => {
  it('should generate app template and handler files', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-template-'))
    const output = path.join(tmpDir, 'routes.ts')
    const openAPI = {
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
    } as OpenAPI
    const result = await runGenerator(template(openAPI, output, '/', undefined, undefined, false))
    expect(result).toBe('🔥 Generated code and template files written')
    expect(fs.existsSync(path.join(tmpDir, 'index.ts'))).toBe(true)
    expect(fs.existsSync(path.join(tmpDir, 'handlers', 'health.ts'))).toBe(true)
  })

  it('treats a server/index.ts output as a module dir: app and handlers go one level up', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-template-dirmodule-'))
    const output = path.join(tmpDir, 'server', 'index.ts')
    const openAPI = {
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
    } as OpenAPI
    await runGenerator(template(openAPI, output, '/', undefined, undefined, false))
    // `server/index.ts` means "module server/", so the app entry and handlers land beside it.
    expect(fs.existsSync(path.join(tmpDir, 'index.ts'))).toBe(true)
    expect(fs.existsSync(path.join(tmpDir, 'handlers', 'health.ts'))).toBe(true)
    expect(fs.readFileSync(path.join(tmpDir, 'index.ts'), 'utf8').split('\n')).toContain(
      "import { healthHandler } from './handlers'",
    )
    expect(
      fs.readFileSync(path.join(tmpDir, 'handlers', 'health.ts'), 'utf8').split('\n'),
    ).toContain("import { getHealthRoute } from '../server'")
  })

  // A split routes directory (`routes: { output: 'src/routes', split: true }`) is the routes
  // module too: the app entry and the handlers land beside it, and import it by its barrel.
  // Before, the directory was taken for a file in no directory, and the handlers went to
  // `./handlers` of the working directory.
  it('treats a split routes directory as the routes module', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-template-split-dir-'))
    const output = path.join(tmpDir, 'src', 'routes')
    const openAPI = {
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
    } as OpenAPI
    await runGenerator(template(openAPI, output, '/', undefined, undefined, true))
    expect(fs.existsSync(path.join(tmpDir, 'src', 'index.ts'))).toBe(true)
    expect(fs.existsSync(path.join(tmpDir, 'src', 'handlers', 'health.ts'))).toBe(true)
    expect(fs.existsSync(path.join(tmpDir, 'handlers'))).toBe(false)
    expect(fs.readFileSync(path.join(tmpDir, 'src', 'index.ts'), 'utf8').split('\n')).toContain(
      "import { getHealthRoute } from './routes'",
    )
    expect(
      fs.readFileSync(path.join(tmpDir, 'src', 'handlers', 'health.ts'), 'utf8').split('\n'),
    ).toContain("import type { getHealthRoute } from '../routes'")
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
    const openAPI = {
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
    } as OpenAPI
    await runGenerator(template(openAPI, output, '/', undefined, undefined, false))
    const content = fs.readFileSync(path.join(tmpDir, 'index.ts'), 'utf8')
    expect(content).toContain('custom-marker')
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
    const openAPI = {
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
    } as OpenAPI
    await runGenerator(template(openAPI, output, '/', '@/api', undefined, true))
    expect(fs.readFileSync(path.join(tmpDir, 'index.ts'), 'utf8')).toBe(
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
    const untagged = {
      openapi: '3.1.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/users': {
          get: { operationId: 'getUsers', responses: { '200': { description: 'OK' } } },
        },
      },
    } as OpenAPI
    await runGenerator(template(untagged, output, '/', undefined, undefined, false))
    const implemented = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getUsersRoute } from '../routes'

const app = new OpenAPIHono()

export const usersHandler = app.openapi(getUsersRoute, async (c) => {
  return c.json([{ id: '1', name: 'Jane' }], 200)
})
`
    fs.writeFileSync(path.join(tmpDir, 'handlers', 'users.ts'), implemented)

    const tagged = {
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
    } as OpenAPI
    await runGenerator(template(tagged, output, '/', undefined, undefined, false))
    expect(fs.existsSync(path.join(tmpDir, 'handlers', 'userManagement.ts'))).toBe(false)
    expect(fs.readFileSync(path.join(tmpDir, 'handlers', 'users.ts'), 'utf8')).toBe(implemented)
    expect(fs.readFileSync(path.join(tmpDir, 'index.ts'), 'utf8')).toBe(
      `import { OpenAPIHono } from '@hono/zod-openapi'
import { usersHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.route('/', usersHandler)

export default app
`,
    )
  })

  const realTime = {
    openapi: '3.1.0',
    info: { title: 'Example', version: '1.0.0' },
    paths: {
      '/events': {
        get: { tags: ['Real-Time Events'], responses: { '200': { description: 'OK' } } },
      },
    },
  } as OpenAPI

  const realTimeTwo = {
    ...realTime,
    paths: {
      ...realTime.paths,
      '/queues': {
        post: { tags: ['Real-Time Events'], responses: { '200': { description: 'OK' } } },
      },
    },
  } as OpenAPI

  it('names handler files in kebab case and keeps the export in camel case', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-template-kebab-'))
    const output = path.join(tmpDir, 'routes.ts')
    const run = () => runGenerator(template(realTime, output, '/', undefined, undefined, false))
    await run()
    expect(fs.readdirSync(path.join(tmpDir, 'handlers')).sort()).toStrictEqual([
      'index.ts',
      'real-time-events.ts',
    ])
    expect(fs.readFileSync(path.join(tmpDir, 'handlers', 'real-time-events.ts'), 'utf8')).toBe(
      `import { OpenAPIHono } from '@hono/zod-openapi'\nimport { getEventsRoute } from '../routes'\n\nconst app = new OpenAPIHono()\n\nexport const realTimeEventsHandler = app.openapi(getEventsRoute, (c) => {})\n`,
    )
    expect(fs.readFileSync(path.join(tmpDir, 'handlers', 'index.ts'), 'utf8')).toBe(
      `export * from './real-time-events'\n`,
    )
    const app = `import { OpenAPIHono } from '@hono/zod-openapi'\nimport { realTimeEventsHandler } from './handlers'\n\nconst app = new OpenAPIHono()\n\nexport const api = app.route('/', realTimeEventsHandler)\n\nexport default app\n`
    expect(fs.readFileSync(path.join(tmpDir, 'index.ts'), 'utf8')).toBe(app)

    // Re-running keeps the implementation written into the kebab-case file.
    const implemented = `import { OpenAPIHono } from '@hono/zod-openapi'\nimport { getEventsRoute } from '../routes'\n\nconst app = new OpenAPIHono()\n\nexport const realTimeEventsHandler = app.openapi(getEventsRoute, (c) => {\n  return c.json({ events: [] }, 200)\n})\n`
    fs.writeFileSync(path.join(tmpDir, 'handlers', 'real-time-events.ts'), implemented)
    await run()
    expect(fs.readdirSync(path.join(tmpDir, 'handlers')).sort()).toStrictEqual([
      'index.ts',
      'real-time-events.ts',
    ])
    expect(fs.readFileSync(path.join(tmpDir, 'handlers', 'real-time-events.ts'), 'utf8')).toBe(
      implemented,
    )
    expect(fs.readFileSync(path.join(tmpDir, 'index.ts'), 'utf8')).toBe(app)
  })

  it('keeps an existing camel-case handler file, and adds new routes of its tag to it', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-template-kebab-switch-'))
    const output = path.join(tmpDir, 'routes.ts')
    fs.mkdirSync(path.join(tmpDir, 'handlers'))
    const implemented = `import { OpenAPIHono } from '@hono/zod-openapi'\nimport { getEventsRoute } from '../routes'\n\nconst app = new OpenAPIHono()\n\nexport const realTimeEventsHandler = app.openapi(getEventsRoute, (c) => {\n  return c.json({ events: [] }, 200)\n})\n`
    fs.writeFileSync(path.join(tmpDir, 'handlers', 'realTimeEvents.ts'), implemented)

    // A new route of the same tag joins the file that is there: no second file, no rename.
    await runGenerator(template(realTimeTwo, output, '/', undefined, undefined, false))
    expect(fs.readdirSync(path.join(tmpDir, 'handlers')).sort()).toStrictEqual([
      'index.ts',
      'realTimeEvents.ts',
    ])
    expect(fs.readFileSync(path.join(tmpDir, 'handlers', 'realTimeEvents.ts'), 'utf8')).toBe(
      `import { OpenAPIHono } from '@hono/zod-openapi'\nimport { getEventsRoute, postQueuesRoute } from '../routes'\n\nconst app = new OpenAPIHono()\n\nexport const realTimeEventsHandler = app\n  .openapi(getEventsRoute, (c) => {\n    return c.json({ events: [] }, 200)\n  })\n  .openapi(postQueuesRoute, (c) => {})\n`,
    )
    expect(fs.readFileSync(path.join(tmpDir, 'handlers', 'index.ts'), 'utf8')).toBe(
      `export * from './realTimeEvents'\n`,
    )
    expect(fs.readFileSync(path.join(tmpDir, 'index.ts'), 'utf8')).toBe(
      `import { OpenAPIHono } from '@hono/zod-openapi'\nimport { realTimeEventsHandler } from './handlers'\n\nconst app = new OpenAPIHono()\n\nexport const api = app.route('/', realTimeEventsHandler)\n\nexport default app\n`,
    )
  })

  it('names the group of a kebab-case handler file in camel case when split', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-template-kebab-split-'))
    const output = path.join(tmpDir, 'routes.ts')
    await runGenerator(template(realTime, output, '/', undefined, undefined, false, true))
    expect(fs.readFileSync(path.join(tmpDir, 'index.ts'), 'utf8')).toBe(
      `import { OpenAPIHono } from '@hono/zod-openapi'\nimport { realTimeEventsHandler } from './handlers'\n\nconst app = new OpenAPIHono()\n\nexport const realTimeEvents = app.route('/', realTimeEventsHandler)\n\nexport default app\n`,
    )
  })

  it('names routeHandler files in kebab case', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-template-kebab-rh-'))
    const output = path.join(tmpDir, 'routes.ts')
    await runGenerator(template(realTime, output, '/', undefined, undefined, true))
    expect(fs.readdirSync(path.join(tmpDir, 'handlers')).sort()).toStrictEqual([
      'index.ts',
      'real-time-events.ts',
    ])
    expect(fs.readFileSync(path.join(tmpDir, 'handlers', 'index.ts'), 'utf8')).toBe(
      `export * from './real-time-events'\n`,
    )
  })

  it('propagates the error when the app target cannot be read', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-template-unreadable-'))
    const output = path.join(tmpDir, 'routes.ts')
    // A directory at the target path makes readFile fail with a non-ENOENT error.
    fs.mkdirSync(path.join(tmpDir, 'index.ts'))
    const openAPI = {
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
    } as OpenAPI
    const result = await runGeneratorError(
      template(openAPI, output, '/', undefined, undefined, false),
    )
    expect(result.message.length).toBeGreaterThan(0)
  })
})
