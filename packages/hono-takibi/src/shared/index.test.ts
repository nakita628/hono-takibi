import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vite-plus/test'

import { parseConfig } from '../config/index.js'
import type { OpenAPI } from '../openapi/index.js'
import { makeJob } from './index.js'

const openAPI = {
  openapi: '3.0.0',
  info: { title: 'e2e', version: '1.0.0' },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: { id: { type: 'string' }, name: { type: 'string' } },
        required: ['id', 'name'],
      },
    },
  },
  paths: {
    '/users/{id}': {
      get: {
        operationId: 'getUser',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: {
            description: 'ok',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
          },
        },
      },
    },
    '/health': {
      get: {
        operationId: 'getHealth',
        responses: { 200: { description: 'ok' } },
      },
    },
  },
} as unknown as OpenAPI

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('makeJob define mode', () => {
  it('generates defineOpenAPIRoute handlers, openapiRoutes app, and components', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'define-job-'))
    const cfg = parseConfig({
      input: 'openapi.yaml',
      'zod-openapi': {
        output: `${tmpDir}/src/index.ts`,
        template: { define: true },
      },
    })
    if (!cfg.ok) throw new Error(cfg.error)
    const jobs = makeJob(openAPI, cfg.value)
    const results = await Promise.all(jobs.map((job) => job.run(job.output)))
    for (const r of results) if (!r.ok) throw new Error(r.error)
    const read = (p: string) => fs.readFileSync(path.join(tmpDir, 'src', p), 'utf-8')

    expect(read('index.ts')).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getUsersIdRoute, getHealthRoute } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapiRoutes([getUsersIdRoute, getHealthRoute] as const)

export default app
`)

    expect(read('handlers/users.ts'))
      .toBe(`import { createRoute, defineOpenAPIRoute, z } from '@hono/zod-openapi'
import { UserSchema } from '../components'

export const getUsersIdRoute = defineOpenAPIRoute({
  route: createRoute({
    method: 'get',
    path: '/users/{id}',
    operationId: 'getUser',
    request: {
      params: z.object({
        id: z.string().openapi({
          param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
        }),
      }),
    },
    responses: {
      200: { description: 'ok', content: { 'application/json': { schema: UserSchema } } },
    },
  }),
  handler: async (c) => {},
  addRoute: true,
})
`)

    expect(read('handlers/health.ts'))
      .toBe(`import { createRoute, defineOpenAPIRoute } from '@hono/zod-openapi'

export const getHealthRoute = defineOpenAPIRoute({
  route: createRoute({
    method: 'get',
    path: '/health',
    operationId: 'getHealth',
    responses: { 200: { description: 'ok' } },
  }),
  handler: async (c) => {},
  addRoute: true,
})
`)

    expect(read('handlers/index.ts')).toBe(`export * from './users'
export * from './health'
`)

    expect(read('components/index.ts')).toBe(`import { z } from '@hono/zod-openapi'

export const UserSchema = z
  .object({ id: z.string(), name: z.string() })
  .openapi({ required: ['id', 'name'] })
  .openapi('User')
`)
  })

  it('routes imports through pathAlias when set', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'define-job-alias-'))
    const cfg = parseConfig({
      input: 'openapi.yaml',
      'zod-openapi': {
        output: `${tmpDir}/src/index.ts`,
        template: { define: true, pathAlias: '@/' },
      },
    })
    if (!cfg.ok) throw new Error(cfg.error)
    const jobs = makeJob(openAPI, cfg.value)
    const results = await Promise.all(jobs.map((job) => job.run(job.output)))
    for (const r of results) if (!r.ok) throw new Error(r.error)
    const read = (p: string) => fs.readFileSync(path.join(tmpDir, 'src', p), 'utf-8')

    expect(read('index.ts')).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getUsersIdRoute, getHealthRoute } from '@/handlers'

const app = new OpenAPIHono()

export const api = app.openapiRoutes([getUsersIdRoute, getHealthRoute] as const)

export default app
`)
    const usersFirstLines = read('handlers/users.ts').split('\n').slice(0, 2).join('\n')
    expect(usersFirstLines)
      .toBe(`import { createRoute, defineOpenAPIRoute, z } from '@hono/zod-openapi'
import { UserSchema } from '@/components'`)
  })

  it('emits route files to template.output and imports from there', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'define-job-output-'))
    const cfg = parseConfig({
      input: 'openapi.yaml',
      'zod-openapi': {
        output: `${tmpDir}/src/index.ts`,
        template: { define: true, output: `${tmpDir}/src/routes` },
      },
    })
    if (!cfg.ok) throw new Error(cfg.error)
    const jobs = makeJob(openAPI, cfg.value)
    const results = await Promise.all(jobs.map((job) => job.run(job.output)))
    for (const r of results) if (!r.ok) throw new Error(r.error)

    // route files live under routes/, not handlers/
    expect(fs.existsSync(path.join(tmpDir, 'src', 'routes', 'users.ts'))).toBe(true)
    expect(fs.existsSync(path.join(tmpDir, 'src', 'handlers'))).toBe(false)

    expect(fs.readFileSync(path.join(tmpDir, 'src', 'index.ts'), 'utf-8'))
      .toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getUsersIdRoute, getHealthRoute } from './routes'

const app = new OpenAPIHono()

export const api = app.openapiRoutes([getUsersIdRoute, getHealthRoute] as const)

export default app
`)
    const usersFirstLines = fs
      .readFileSync(path.join(tmpDir, 'src', 'routes', 'users.ts'), 'utf-8')
      .split('\n')
      .slice(0, 2)
      .join('\n')
    expect(usersFirstLines)
      .toBe(`import { createRoute, defineOpenAPIRoute, z } from '@hono/zod-openapi'
import { UserSchema } from '../components'`)
  })
})

describe('define mode regeneration round-trip (human edits coexist with codegen)', () => {
  it('preserves an implemented handler across regeneration', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rt-handler-'))
    const cfg = parseConfig({
      input: 'openapi.yaml',
      'zod-openapi': { output: `${tmpDir}/src/index.ts`, template: { define: true } },
    })
    if (!cfg.ok) throw new Error(cfg.error)
    const run = (spec: OpenAPI) => Promise.all(makeJob(spec, cfg.value).map((j) => j.run(j.output)))
    const usersPath = path.join(tmpDir, 'src', 'handlers', 'users.ts')

    for (const r of await run(openAPI)) if (!r.ok) throw new Error(r.error)
    // Human implements the handler.
    fs.writeFileSync(
      usersPath,
      fs
        .readFileSync(usersPath, 'utf-8')
        .replace(
          'handler: async (c) => {},',
          "handler: async (c) => {\n    return c.json({ id: c.req.param('id'), name: 'Jane' }, 200)\n  },",
        ),
    )
    for (const r of await run(openAPI)) if (!r.ok) throw new Error(r.error)

    const afterRegen = fs.readFileSync(usersPath, 'utf-8')
    const trimmed = afterRegen.split('\n').map((l) => l.trim())
    expect(trimmed).toContain("return c.json({ id: c.req.param('id'), name: 'Jane' }, 200)")
    expect(trimmed).not.toContain('handler: async (c) => {},')
    // Idempotent: a further regeneration changes nothing.
    for (const r of await run(openAPI)) if (!r.ok) throw new Error(r.error)
    expect(fs.readFileSync(usersPath, 'utf-8')).toBe(afterRegen)
  })

  it('preserves a hand-edited createRoute (not re-synced from spec)', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rt-route-'))
    const cfg = parseConfig({
      input: 'openapi.yaml',
      'zod-openapi': { output: `${tmpDir}/src/index.ts`, template: { define: true } },
    })
    if (!cfg.ok) throw new Error(cfg.error)
    const run = (spec: OpenAPI) => Promise.all(makeJob(spec, cfg.value).map((j) => j.run(j.output)))
    const usersPath = path.join(tmpDir, 'src', 'handlers', 'users.ts')

    for (const r of await run(openAPI)) if (!r.ok) throw new Error(r.error)
    // Human adds a summary inside createRoute (the spec has none).
    fs.writeFileSync(
      usersPath,
      fs
        .readFileSync(usersPath, 'utf-8')
        .replace("operationId: 'getUser',", "operationId: 'getUser',\n    summary: 'Get a user',"),
    )
    for (const r of await run(openAPI)) if (!r.ok) throw new Error(r.error)

    expect(
      fs
        .readFileSync(usersPath, 'utf-8')
        .split('\n')
        .map((l) => l.trim()),
    ).toContain("summary: 'Get a user',")
  })

  it('preserves user-added imports, helpers, and consts', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rt-helper-'))
    const cfg = parseConfig({
      input: 'openapi.yaml',
      'zod-openapi': { output: `${tmpDir}/src/index.ts`, template: { define: true } },
    })
    if (!cfg.ok) throw new Error(cfg.error)
    const run = (spec: OpenAPI) => Promise.all(makeJob(spec, cfg.value).map((j) => j.run(j.output)))
    const usersPath = path.join(tmpDir, 'src', 'handlers', 'users.ts')

    for (const r of await run(openAPI)) if (!r.ok) throw new Error(r.error)
    // Human adds a custom import (named like a route — must NOT be dropped), a helper, and a const.
    fs.writeFileSync(
      usersPath,
      `import { db } from '../db'\nimport { authRoute } from '../middleware/auth'\n${fs.readFileSync(
        usersPath,
        'utf-8',
      )}\nconst PAGE_SIZE = 20\nfunction toDto(x: unknown) {\n  return x\n}\n`,
    )
    for (const r of await run(openAPI)) if (!r.ok) throw new Error(r.error)

    const trimmed = fs
      .readFileSync(usersPath, 'utf-8')
      .split('\n')
      .map((l) => l.trim())
    expect(trimmed).toContain("import { db } from '../db'")
    expect(trimmed).toContain("import { authRoute } from '../middleware/auth'")
    expect(trimmed).toContain('const PAGE_SIZE = 20')
    expect(trimmed).toContain('function toDto(x: unknown) {')
  })

  it('adds a new route as a stub while keeping existing edits, and updates the app + barrel', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rt-add-'))
    const cfg = parseConfig({
      input: 'openapi.yaml',
      'zod-openapi': { output: `${tmpDir}/src/index.ts`, template: { define: true } },
    })
    if (!cfg.ok) throw new Error(cfg.error)
    const run = (spec: OpenAPI) => Promise.all(makeJob(spec, cfg.value).map((j) => j.run(j.output)))
    const usersPath = path.join(tmpDir, 'src', 'handlers', 'users.ts')

    for (const r of await run(openAPI)) if (!r.ok) throw new Error(r.error)
    fs.writeFileSync(
      usersPath,
      fs
        .readFileSync(usersPath, 'utf-8')
        .replace(
          'handler: async (c) => {},',
          "handler: async (c) => {\n    return c.json({ id: '1', name: 'Jane' }, 200)\n  },",
        ),
    )
    // Spec gains a new resource.
    const withTags = {
      ...openAPI,
      paths: {
        ...openAPI.paths,
        '/tags': { get: { operationId: 'listTags', responses: { 200: { description: 'ok' } } } },
      },
    } as unknown as OpenAPI
    for (const r of await run(withTags)) if (!r.ok) throw new Error(r.error)

    // Existing edit kept.
    expect(
      fs
        .readFileSync(usersPath, 'utf-8')
        .split('\n')
        .map((l) => l.trim()),
    ).toContain("return c.json({ id: '1', name: 'Jane' }, 200)")
    // New resource generated as a stub.
    expect(fs.existsSync(path.join(tmpDir, 'src', 'handlers', 'tags.ts'))).toBe(true)
    // App + barrel reflect the new route. (mergeImports sorts the named imports on
    // regeneration; the openapiRoutes array keeps spec order from the generated body.)
    expect(fs.readFileSync(path.join(tmpDir, 'src', 'index.ts'), 'utf-8')).toBe(
      `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getTagsRoute, getUsersIdRoute } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapiRoutes([getUsersIdRoute, getHealthRoute, getTagsRoute] as const)

export default app
`,
    )
    expect(fs.readFileSync(path.join(tmpDir, 'src', 'handlers', 'index.ts'), 'utf-8')).toBe(
      `export * from './users'
export * from './health'
export * from './tags'
`,
    )
  })

  it('removes a route deleted from the spec and cleans up its stale handler file', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rt-remove-'))
    const cfg = parseConfig({
      input: 'openapi.yaml',
      'zod-openapi': { output: `${tmpDir}/src/index.ts`, template: { define: true } },
    })
    if (!cfg.ok) throw new Error(cfg.error)
    const run = (spec: OpenAPI) => Promise.all(makeJob(spec, cfg.value).map((j) => j.run(j.output)))

    for (const r of await run(openAPI)) if (!r.ok) throw new Error(r.error)
    expect(fs.existsSync(path.join(tmpDir, 'src', 'handlers', 'health.ts'))).toBe(true)
    // Spec drops the health resource.
    const withoutHealth = {
      ...openAPI,
      paths: { '/users/{id}': openAPI.paths['/users/{id}'] },
    } as unknown as OpenAPI
    for (const r of await run(withoutHealth)) if (!r.ok) throw new Error(r.error)

    expect(fs.existsSync(path.join(tmpDir, 'src', 'handlers', 'health.ts'))).toBe(false)
    expect(fs.existsSync(path.join(tmpDir, 'src', 'handlers', 'users.ts'))).toBe(true)
    expect(fs.readFileSync(path.join(tmpDir, 'src', 'handlers', 'index.ts'), 'utf-8')).toBe(
      `export * from './users'
`,
    )
    expect(fs.readFileSync(path.join(tmpDir, 'src', 'index.ts'), 'utf-8')).toBe(
      `import { OpenAPIHono } from '@hono/zod-openapi'
import { getUsersIdRoute } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapiRoutes([getUsersIdRoute] as const)

export default app
`,
    )
  })

  it('preserves user middleware and basePath on the app entry while syncing routes', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rt-app-'))
    const cfg = parseConfig({
      input: 'openapi.yaml',
      'zod-openapi': { output: `${tmpDir}/src/index.ts`, template: { define: true } },
    })
    if (!cfg.ok) throw new Error(cfg.error)
    const run = (spec: OpenAPI) => Promise.all(makeJob(spec, cfg.value).map((j) => j.run(j.output)))
    const indexPath = path.join(tmpDir, 'src', 'index.ts')

    for (const r of await run(openAPI)) if (!r.ok) throw new Error(r.error)
    // Human adds middleware + basePath chain.
    fs.writeFileSync(
      indexPath,
      fs
        .readFileSync(indexPath, 'utf-8')
        .replace(
          "import { OpenAPIHono } from '@hono/zod-openapi'",
          "import { OpenAPIHono } from '@hono/zod-openapi'\nimport { logger } from 'hono/logger'",
        )
        .replace(
          'const app = new OpenAPIHono()',
          "const app = new OpenAPIHono()\n\napp.use('*', logger())",
        )
        .replace('app.openapiRoutes(', "app.basePath('/api').openapiRoutes("),
    )
    // Spec gains a route → openapiRoutes must update, middleware/basePath must remain.
    const withTags = {
      ...openAPI,
      paths: {
        ...openAPI.paths,
        '/tags': { get: { operationId: 'listTags', responses: { 200: { description: 'ok' } } } },
      },
    } as unknown as OpenAPI
    for (const r of await run(withTags)) if (!r.ok) throw new Error(r.error)

    const trimmed = fs
      .readFileSync(indexPath, 'utf-8')
      .split('\n')
      .map((l) => l.trim())
    expect(trimmed).toContain("import { logger } from 'hono/logger'")
    expect(trimmed).toContain("app.use('*', logger())")
    // basePath chain preserved; openapiRoutes synced to the new route set (the long
    // chain is wrapped by the formatter onto its own lines).
    expect(trimmed).toContain(".basePath('/api')")
    expect(trimmed).toContain(
      '.openapiRoutes([getUsersIdRoute, getHealthRoute, getTagsRoute] as const)',
    )
  })

  it('coexists under a custom template.output directory', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rt-out-'))
    const cfg = parseConfig({
      input: 'openapi.yaml',
      'zod-openapi': {
        output: `${tmpDir}/src/index.ts`,
        template: { define: true, output: `${tmpDir}/src/routes` },
      },
    })
    if (!cfg.ok) throw new Error(cfg.error)
    const run = (spec: OpenAPI) => Promise.all(makeJob(spec, cfg.value).map((j) => j.run(j.output)))
    const usersPath = path.join(tmpDir, 'src', 'routes', 'users.ts')

    for (const r of await run(openAPI)) if (!r.ok) throw new Error(r.error)
    expect(fs.existsSync(usersPath)).toBe(true)
    fs.writeFileSync(
      usersPath,
      fs
        .readFileSync(usersPath, 'utf-8')
        .replace(
          'handler: async (c) => {},',
          "handler: async (c) => {\n    return c.json({ id: '1', name: 'Jane' }, 200)\n  },",
        ),
    )
    for (const r of await run(openAPI)) if (!r.ok) throw new Error(r.error)

    expect(
      fs
        .readFileSync(usersPath, 'utf-8')
        .split('\n')
        .map((l) => l.trim()),
    ).toContain("return c.json({ id: '1', name: 'Jane' }, 200)")
    // App imports from the custom dir (mergeImports sorts the names on regeneration).
    expect(fs.readFileSync(path.join(tmpDir, 'src', 'index.ts'), 'utf-8').split('\n')).toContain(
      "import { getHealthRoute, getUsersIdRoute } from './routes'",
    )
  })

  it('coexists with a pathAlias without duplicating imports', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rt-alias-'))
    const cfg = parseConfig({
      input: 'openapi.yaml',
      'zod-openapi': {
        output: `${tmpDir}/src/index.ts`,
        template: { define: true, pathAlias: '@/' },
      },
    })
    if (!cfg.ok) throw new Error(cfg.error)
    const run = (spec: OpenAPI) => Promise.all(makeJob(spec, cfg.value).map((j) => j.run(j.output)))
    const usersPath = path.join(tmpDir, 'src', 'handlers', 'users.ts')

    for (const r of await run(openAPI)) if (!r.ok) throw new Error(r.error)
    fs.writeFileSync(
      usersPath,
      fs
        .readFileSync(usersPath, 'utf-8')
        .replace(
          'handler: async (c) => {},',
          "handler: async (c) => {\n    return c.json({ id: '1', name: 'Jane' }, 200)\n  },",
        ),
    )
    for (const r of await run(openAPI)) if (!r.ok) throw new Error(r.error)

    const content = fs.readFileSync(usersPath, 'utf-8')
    const trimmed = content.split('\n').map((l) => l.trim())
    expect(trimmed).toContain("return c.json({ id: '1', name: 'Jane' }, 200)")
    expect(trimmed).toContain("import { UserSchema } from '@/components'")
    // No duplicate component import line after regeneration.
    expect(content.split('\n').filter((l) => l.includes("from '@/components'")).length).toBe(1)
  })
})
