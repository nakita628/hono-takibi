import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vite-plus/test'

import { parseConfig } from '../config/index.js'
import type { OpenAPI } from '../openapi/index.js'
import { runGenerator } from '../testing/index.js'
import { cleanSplitOutputs, makeJob, outsideSources } from './index.js'

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
  it('defaults the app entry to src/index.ts when output is omitted', async () => {
    const cfg = await runGenerator(
      parseConfig({
        input: 'openapi.yaml',
        template: { define: true },
      }),
    )
    const jobs = makeJob(openAPI, cfg)
    expect(jobs.map((job) => ({ name: job.name, output: job.output }))).toStrictEqual([
      { name: 'components', output: 'src/components/index.ts' },
      { name: 'template', output: 'src/index.ts' },
    ])
  })

  it('derives the app entry from components.output when output is omitted', async () => {
    const cfg = await runGenerator(
      parseConfig({
        input: 'openapi.yaml',
        template: { define: true },
        components: { output: './server/components/index.ts' },
      }),
    )
    const jobs = makeJob(openAPI, cfg)
    expect(jobs.map((job) => ({ name: job.name, output: job.output }))).toStrictEqual([
      { name: 'components', output: './server/components/index.ts' },
      { name: 'template', output: './server/index.ts' },
    ])
  })

  it('derives the app entry from a flat components.output file when output is omitted', async () => {
    const cfg = await runGenerator(
      parseConfig({
        input: 'openapi.yaml',
        template: { define: true },
        components: { output: 'server/components.ts' },
      }),
    )
    const jobs = makeJob(openAPI, cfg)
    expect(jobs.map((job) => ({ name: job.name, output: job.output }))).toStrictEqual([
      { name: 'components', output: 'server/components.ts' },
      { name: 'template', output: 'server/index.ts' },
    ])
  })

  it('prefers explicit output over the components.output anchor', async () => {
    const cfg = await runGenerator(
      parseConfig({
        input: 'openapi.yaml',
        output: 'src/index.ts',
        template: { define: true },
        components: { output: 'shared/components.ts' },
      }),
    )
    const jobs = makeJob(openAPI, cfg)
    expect(jobs.map((job) => ({ name: job.name, output: job.output }))).toStrictEqual([
      { name: 'components', output: 'shared/components.ts' },
      { name: 'template', output: 'src/index.ts' },
    ])
  })

  it('anchors generated files to the components.output directory when output is omitted', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'define-job-anchor-'))
    const cfg = await runGenerator(
      parseConfig({
        input: 'openapi.yaml',
        template: { define: true },
        components: { output: `${tmpDir}/server/components/index.ts` },
      }),
    )
    const jobs = makeJob(openAPI, cfg)
    await Promise.all(jobs.map((job) => runGenerator(job.run(job.output))))
    const read = (p: string) => fs.readFileSync(path.join(tmpDir, 'server', p), 'utf-8')

    expect(read('index.ts')).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getUsersIdRoute, getHealthRoute } from './routes'

const app = new OpenAPIHono()

export const api = app.openapiRoutes([getUsersIdRoute, getHealthRoute] as const)

export default app
`)
    expect(read('routes/users.ts'))
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
    expect(fs.existsSync(path.join(tmpDir, 'server', 'components', 'index.ts'))).toBe(true)
  })

  it('generates defineOpenAPIRoute handlers, openapiRoutes app, and components', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'define-job-'))
    const cfg = await runGenerator(
      parseConfig({
        input: 'openapi.yaml',
        output: `${tmpDir}/src/index.ts`,
        template: { define: true },
      }),
    )
    const jobs = makeJob(openAPI, cfg)
    await Promise.all(jobs.map((job) => runGenerator(job.run(job.output))))
    const read = (p: string) => fs.readFileSync(path.join(tmpDir, 'src', p), 'utf-8')

    expect(read('index.ts')).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getUsersIdRoute, getHealthRoute } from './routes'

const app = new OpenAPIHono()

export const api = app.openapiRoutes([getUsersIdRoute, getHealthRoute] as const)

export default app
`)

    expect(read('routes/users.ts'))
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

    expect(read('routes/health.ts'))
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

    expect(read('routes/index.ts')).toBe(`export * from './users'
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
    const cfg = await runGenerator(
      parseConfig({
        input: 'openapi.yaml',
        output: `${tmpDir}/src/index.ts`,
        template: { define: true, pathAlias: '@/' },
      }),
    )
    const jobs = makeJob(openAPI, cfg)
    await Promise.all(jobs.map((job) => runGenerator(job.run(job.output))))
    const read = (p: string) => fs.readFileSync(path.join(tmpDir, 'src', p), 'utf-8')

    expect(read('index.ts')).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getUsersIdRoute, getHealthRoute } from '@/routes'

const app = new OpenAPIHono()

export const api = app.openapiRoutes([getUsersIdRoute, getHealthRoute] as const)

export default app
`)
    const usersFirstLines = read('routes/users.ts').split('\n').slice(0, 2).join('\n')
    expect(usersFirstLines)
      .toBe(`import { createRoute, defineOpenAPIRoute, z } from '@hono/zod-openapi'
import { UserSchema } from '@/components'`)
  })

  it('emits route files to the derived routes dir next to output and imports from there', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'define-job-output-'))
    const cfg = await runGenerator(
      parseConfig({
        input: 'openapi.yaml',
        output: `${tmpDir}/src/index.ts`,
        template: { define: true },
      }),
    )
    const jobs = makeJob(openAPI, cfg)
    await Promise.all(jobs.map((job) => runGenerator(job.run(job.output))))
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

  it('derives routes/components as siblings of a nested output, not anchored to a shallower dir', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'define-job-nested-'))
    const cfg = await runGenerator(
      parseConfig({
        input: 'openapi.yaml',
        output: `${tmpDir}/src/api/index.ts`,
        template: { define: true },
      }),
    )
    await Promise.all(makeJob(openAPI, cfg).map((j) => runGenerator(j.run(j.output))))

    expect(fs.existsSync(path.join(tmpDir, 'src', 'api', 'routes', 'users.ts'))).toBe(true)
    expect(fs.existsSync(path.join(tmpDir, 'src', 'api', 'components', 'index.ts'))).toBe(true)
    expect(fs.existsSync(path.join(tmpDir, 'src', 'routes'))).toBe(false)

    expect(fs.readFileSync(path.join(tmpDir, 'src', 'api', 'index.ts'), 'utf-8'))
      .toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getUsersIdRoute, getHealthRoute } from './routes'

const app = new OpenAPIHono()

export const api = app.openapiRoutes([getUsersIdRoute, getHealthRoute] as const)

export default app
`)
    const usersFirstLines = fs
      .readFileSync(path.join(tmpDir, 'src', 'api', 'routes', 'users.ts'), 'utf-8')
      .split('\n')
      .slice(0, 2)
      .join('\n')
    expect(usersFirstLines)
      .toBe(`import { createRoute, defineOpenAPIRoute, z } from '@hono/zod-openapi'
import { UserSchema } from '../components'`)
  })

  it('applies readonly to both components and route definitions', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'define-job-readonly-'))
    const cfg = await runGenerator(
      parseConfig({
        input: 'openapi.yaml',
        output: `${tmpDir}/src/index.ts`,
        readonly: true,
        template: { define: true },
      }),
    )
    await Promise.all(makeJob(openAPI, cfg).map((j) => runGenerator(j.run(j.output))))
    const read = (p: string) => fs.readFileSync(path.join(tmpDir, 'src', p), 'utf-8')

    expect(read('components/index.ts')).toBe(`import { z } from '@hono/zod-openapi'

export const UserSchema = z
  .object({ id: z.string(), name: z.string() })
  .readonly()
  .openapi({ required: ['id', 'name'] })
  .openapi('User')
`)
    expect(read('routes/users.ts'))
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
  } as const),
  handler: async (c) => {},
  addRoute: true,
})
`)
  })

  it('relocates the whole cluster under server/ with identical relative imports', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'define-job-server-'))
    const cfg = await runGenerator(
      parseConfig({
        input: 'openapi.yaml',
        output: `${tmpDir}/server/index.ts`,
        template: { define: true },
      }),
    )
    await Promise.all(makeJob(openAPI, cfg).map((j) => runGenerator(j.run(j.output))))
    const read = (p: string) => fs.readFileSync(path.join(tmpDir, 'server', p), 'utf-8')

    expect(fs.existsSync(path.join(tmpDir, 'src'))).toBe(false)
    expect(read('index.ts')).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getUsersIdRoute, getHealthRoute } from './routes'

const app = new OpenAPIHono()

export const api = app.openapiRoutes([getUsersIdRoute, getHealthRoute] as const)

export default app
`)
    expect(read('routes/users.ts').split('\n').slice(0, 2).join('\n'))
      .toBe(`import { createRoute, defineOpenAPIRoute, z } from '@hono/zod-openapi'
import { UserSchema } from '../components'`)
    expect(fs.existsSync(path.join(tmpDir, 'server', 'components', 'index.ts'))).toBe(true)
  })

  it('sends components to components.output outside the cluster and rewires route imports', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'define-job-comp-out-'))
    const cfg = await runGenerator(
      parseConfig({
        input: 'openapi.yaml',
        output: `${tmpDir}/src/index.ts`,
        template: { define: true },
        components: { output: `${tmpDir}/shared/components.ts` },
      }),
    )
    await Promise.all(makeJob(openAPI, cfg).map((j) => runGenerator(j.run(j.output))))

    expect(fs.existsSync(path.join(tmpDir, 'shared', 'components.ts'))).toBe(true)
    // The derived components dir must not appear when the override is set.
    expect(fs.existsSync(path.join(tmpDir, 'src', 'components'))).toBe(false)
    expect(
      fs
        .readFileSync(path.join(tmpDir, 'src', 'routes', 'users.ts'), 'utf-8')
        .split('\n')
        .slice(0, 2)
        .join('\n'),
    ).toBe(`import { createRoute, defineOpenAPIRoute, z } from '@hono/zod-openapi'
import { UserSchema } from '../../shared/components'`)
  })

  it('keeps the nested components.output path under a pathAlias (@/api/components)', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'define-job-comp-alias-'))
    const cfg = await runGenerator(
      parseConfig({
        input: 'openapi.yaml',
        output: `${tmpDir}/src/index.ts`,
        template: { define: true, pathAlias: '@/' },
        components: { output: `${tmpDir}/src/api/components/index.ts` },
      }),
    )
    await Promise.all(makeJob(openAPI, cfg).map((j) => runGenerator(j.run(j.output))))
    const read = (p: string) => fs.readFileSync(path.join(tmpDir, 'src', p), 'utf-8')

    expect(fs.existsSync(path.join(tmpDir, 'src', 'api', 'components', 'index.ts'))).toBe(true)
    expect(read('index.ts').split('\n')).toContain(
      "import { getUsersIdRoute, getHealthRoute } from '@/routes'",
    )
    expect(read('routes/users.ts').split('\n').slice(0, 2).join('\n'))
      .toBe(`import { createRoute, defineOpenAPIRoute, z } from '@hono/zod-openapi'
import { UserSchema } from '@/api/components'`)
  })

  it('imports the derived routes dir through a pathAlias (@/routes)', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'define-job-alias-routes-'))
    const cfg = await runGenerator(
      parseConfig({
        input: 'openapi.yaml',
        output: `${tmpDir}/src/index.ts`,
        template: { define: true, pathAlias: '@/' },
      }),
    )
    const jobs = makeJob(openAPI, cfg)
    await Promise.all(jobs.map((job) => runGenerator(job.run(job.output))))
    const read = (p: string) => fs.readFileSync(path.join(tmpDir, 'src', p), 'utf-8')

    expect(read('index.ts').split('\n')).toContain(
      "import { getUsersIdRoute, getHealthRoute } from '@/routes'",
    )
    expect(read('routes/users.ts').split('\n')).toContain(
      "import { UserSchema } from '@/components'",
    )
  })
})

describe(
  'define mode regeneration round-trip (human edits coexist with codegen)',
  { timeout: 30_000 },
  () => {
    it('preserves an implemented handler across regeneration', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rt-handler-'))
      const cfg = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: `${tmpDir}/src/index.ts`,
          template: { define: true },
        }),
      )
      const run = (spec: OpenAPI) =>
        Promise.all(makeJob(spec, cfg).map((j) => runGenerator(j.run(j.output))))
      const usersPath = path.join(tmpDir, 'src', 'routes', 'users.ts')

      await run(openAPI)
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
      await run(openAPI)

      const afterRegen = fs.readFileSync(usersPath, 'utf-8')
      const trimmed = afterRegen.split('\n').map((l) => l.trim())
      expect(trimmed).toContain("return c.json({ id: c.req.param('id'), name: 'Jane' }, 200)")
      expect(trimmed).not.toContain('handler: async (c) => {},')
      // Idempotent: a further regeneration changes nothing.
      await run(openAPI)
      expect(fs.readFileSync(usersPath, 'utf-8')).toBe(afterRegen)
    })

    it('preserves a hand-edited createRoute (not re-synced from spec)', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rt-route-'))
      const cfg = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: `${tmpDir}/src/index.ts`,
          template: { define: true },
        }),
      )
      const run = (spec: OpenAPI) =>
        Promise.all(makeJob(spec, cfg).map((j) => runGenerator(j.run(j.output))))
      const usersPath = path.join(tmpDir, 'src', 'routes', 'users.ts')

      await run(openAPI)
      // Human adds a summary inside createRoute (the spec has none).
      fs.writeFileSync(
        usersPath,
        fs
          .readFileSync(usersPath, 'utf-8')
          .replace(
            "operationId: 'getUser',",
            "operationId: 'getUser',\n    summary: 'Get a user',",
          ),
      )
      await run(openAPI)

      expect(
        fs
          .readFileSync(usersPath, 'utf-8')
          .split('\n')
          .map((l) => l.trim()),
      ).toContain("summary: 'Get a user',")
    })

    it('preserves user-added imports, helpers, and consts', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rt-helper-'))
      const cfg = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: `${tmpDir}/src/index.ts`,
          template: { define: true },
        }),
      )
      const run = (spec: OpenAPI) =>
        Promise.all(makeJob(spec, cfg).map((j) => runGenerator(j.run(j.output))))
      const usersPath = path.join(tmpDir, 'src', 'routes', 'users.ts')

      await run(openAPI)
      // Human adds a custom import (named like a route — must NOT be dropped), a helper, and a const.
      fs.writeFileSync(
        usersPath,
        `import { db } from '../db'\nimport { authRoute } from '../middleware/auth'\n${fs.readFileSync(
          usersPath,
          'utf-8',
        )}\nconst PAGE_SIZE = 20\nfunction toDto(x: unknown) {\n  return x\n}\n`,
      )
      await run(openAPI)

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
      const cfg = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: `${tmpDir}/src/index.ts`,
          template: { define: true },
        }),
      )
      const run = (spec: OpenAPI) =>
        Promise.all(makeJob(spec, cfg).map((j) => runGenerator(j.run(j.output))))
      const usersPath = path.join(tmpDir, 'src', 'routes', 'users.ts')

      await run(openAPI)
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
      await run(withTags)

      // Existing edit kept.
      expect(
        fs
          .readFileSync(usersPath, 'utf-8')
          .split('\n')
          .map((l) => l.trim()),
      ).toContain("return c.json({ id: '1', name: 'Jane' }, 200)")
      // New resource generated as a stub.
      expect(fs.existsSync(path.join(tmpDir, 'src', 'routes', 'tags.ts'))).toBe(true)
      // App + barrel reflect the new route. (mergeImports sorts the named imports on
      // regeneration; the openapiRoutes array keeps spec order from the generated body.)
      expect(fs.readFileSync(path.join(tmpDir, 'src', 'index.ts'), 'utf-8')).toBe(
        `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getTagsRoute, getUsersIdRoute } from './routes'

const app = new OpenAPIHono()

export const api = app.openapiRoutes([getUsersIdRoute, getHealthRoute, getTagsRoute] as const)

export default app
`,
      )
      expect(fs.readFileSync(path.join(tmpDir, 'src', 'routes', 'index.ts'), 'utf-8')).toBe(
        `export * from './users'
export * from './health'
export * from './tags'
`,
      )
    })

    it('removes a route deleted from the spec but never deletes its handler file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rt-remove-'))
      const cfg = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: `${tmpDir}/src/index.ts`,
          template: { define: true },
        }),
      )
      const run = (spec: OpenAPI) =>
        Promise.all(makeJob(spec, cfg).map((j) => runGenerator(j.run(j.output))))

      await run(openAPI)
      const healthPath = path.join(tmpDir, 'src', 'routes', 'health.ts')
      const healthContent = fs.readFileSync(healthPath, 'utf-8')
      // Spec drops the health resource.
      const withoutHealth = {
        ...openAPI,
        paths: { '/users/{id}': (openAPI.paths as Record<string, unknown>)['/users/{id}'] },
      } as unknown as OpenAPI
      await run(withoutHealth)

      // The route declaration goes, the file stays for the user to remove.
      expect(healthContent.includes('export const getHealthRoute')).toBe(true)
      expect(fs.readFileSync(healthPath, 'utf-8')).toBe(
        `import { createRoute, defineOpenAPIRoute } from '@hono/zod-openapi'
`,
      )
      expect(fs.existsSync(path.join(tmpDir, 'src', 'routes', 'users.ts'))).toBe(true)
      expect(fs.readFileSync(path.join(tmpDir, 'src', 'routes', 'index.ts'), 'utf-8')).toBe(
        `export * from './users'
export * from './health'
`,
      )
      expect(fs.readFileSync(path.join(tmpDir, 'src', 'index.ts'), 'utf-8')).toBe(
        `import { OpenAPIHono } from '@hono/zod-openapi'
import { getUsersIdRoute } from './routes'

const app = new OpenAPIHono()

export const api = app.openapiRoutes([getUsersIdRoute] as const)

export default app
`,
      )
    })

    it('preserves user middleware and basePath on the app entry while syncing routes', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rt-app-'))
      const cfg = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: `${tmpDir}/src/index.ts`,
          template: { define: true },
        }),
      )
      const run = (spec: OpenAPI) =>
        Promise.all(makeJob(spec, cfg).map((j) => runGenerator(j.run(j.output))))
      const indexPath = path.join(tmpDir, 'src', 'index.ts')

      await run(openAPI)
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
      await run(withTags)

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

    it('coexists with human edits in the derived routes directory', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rt-out-'))
      const cfg = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: `${tmpDir}/src/index.ts`,
          template: { define: true },
        }),
      )
      const run = (spec: OpenAPI) =>
        Promise.all(makeJob(spec, cfg).map((j) => runGenerator(j.run(j.output))))
      const usersPath = path.join(tmpDir, 'src', 'routes', 'users.ts')

      await run(openAPI)
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
      await run(openAPI)

      expect(
        fs
          .readFileSync(usersPath, 'utf-8')
          .split('\n')
          .map((l) => l.trim()),
      ).toContain("return c.json({ id: '1', name: 'Jane' }, 200)")
      // App imports from the derived routes dir (mergeImports sorts the names on regeneration).
      expect(fs.readFileSync(path.join(tmpDir, 'src', 'index.ts'), 'utf-8').split('\n')).toContain(
        "import { getHealthRoute, getUsersIdRoute } from './routes'",
      )
    })

    it('coexists with a pathAlias without duplicating imports', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rt-alias-'))
      const cfg = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: `${tmpDir}/src/index.ts`,
          template: { define: true, pathAlias: '@/' },
        }),
      )
      const run = (spec: OpenAPI) =>
        Promise.all(makeJob(spec, cfg).map((j) => runGenerator(j.run(j.output))))
      const usersPath = path.join(tmpDir, 'src', 'routes', 'users.ts')

      await run(openAPI)
      fs.writeFileSync(
        usersPath,
        fs
          .readFileSync(usersPath, 'utf-8')
          .replace(
            'handler: async (c) => {},',
            "handler: async (c) => {\n    return c.json({ id: '1', name: 'Jane' }, 200)\n  },",
          ),
      )
      await run(openAPI)

      const content = fs.readFileSync(usersPath, 'utf-8')
      const trimmed = content.split('\n').map((l) => l.trim())
      expect(trimmed).toContain("return c.json({ id: '1', name: 'Jane' }, 200)")
      expect(trimmed).toContain("import { UserSchema } from '@/components'")
      // No duplicate component import line after regeneration.
      expect(content.split('\n').filter((l) => l.includes("from '@/components'")).length).toBe(1)
    })
  },
)

describe('makeJob test request paths use the global basePath', () => {
  it('prefixes generated test request paths with the global basePath', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-basepath-'))
    const cfg = await runGenerator(
      parseConfig({
        input: 'openapi.yaml',
        basePath: '/api',
        test: { output: `${tmpDir}/app.test.ts`, import: './app' },
      }),
    )
    const jobs = makeJob(openAPI, cfg)
    await Promise.all(jobs.map((job) => runGenerator(job.run(job.output))))
    const content = fs.readFileSync(`${tmpDir}/app.test.ts`, 'utf-8')
    expect(content.includes('app.request(`/api/health`')).toBe(true)
    expect(content.includes('app.request(`/health`')).toBe(false)
  })

  it('does not prefix test request paths when the global basePath is "/"', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-basepath-root-'))
    const cfg = await runGenerator(
      parseConfig({
        input: 'openapi.yaml',
        basePath: '/',
        test: { output: `${tmpDir}/app.test.ts`, import: './app' },
      }),
    )
    const jobs = makeJob(openAPI, cfg)
    await Promise.all(jobs.map((job) => runGenerator(job.run(job.output))))
    const content = fs.readFileSync(`${tmpDir}/app.test.ts`, 'utf-8')
    expect(content.includes('app.request(`/health`')).toBe(true)
  })
})

// `cleanSplitOutputs` is the only thing in the package that deletes files the user did
// not name one by one, so what it leaves alone matters as much as what it removes.
const makeCleanDir = () => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-clean-'))
  return tmpDir
}

describe('cleanSplitOutputs', () => {
  it('removes only the .ts files directly inside the directory', async () => {
    const dir = makeCleanDir()
    fs.writeFileSync(path.join(dir, 'a.ts'), '')
    fs.writeFileSync(path.join(dir, 'b.ts'), '')
    fs.writeFileSync(path.join(dir, 'README.md'), '')
    fs.writeFileSync(path.join(dir, 'a.ts.bak'), '')
    fs.mkdirSync(path.join(dir, 'nested'))
    fs.writeFileSync(path.join(dir, 'nested', 'keep.ts'), '')

    await runGenerator(cleanSplitOutputs([dir]))

    expect([...fs.readdirSync(dir)].sort()).toStrictEqual(['README.md', 'a.ts.bak', 'nested'])
    expect(fs.existsSync(path.join(dir, 'nested', 'keep.ts'))).toBe(true)
  })

  it('treats a directory that does not exist as already clean', async () => {
    const missing = path.join(makeCleanDir(), 'never-created')

    await expect(runGenerator(cleanSplitOutputs([missing]))).resolves.toBeDefined()
    expect(fs.existsSync(missing)).toBe(false)
  })

  it('cleans each directory once even when it is listed twice', async () => {
    const dir = makeCleanDir()
    fs.writeFileSync(path.join(dir, 'a.ts'), '')

    await expect(runGenerator(cleanSplitOutputs([dir, dir]))).resolves.toHaveLength(1)
    expect(fs.readdirSync(dir)).toStrictEqual([])
  })

  it('does nothing with an empty list', async () => {
    await expect(runGenerator(cleanSplitOutputs([]))).resolves.toStrictEqual([])
  })
})

describe('outsideSources', () => {
  const directories: string[] = []
  function makeDirectory() {
    const directory = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-sources-')))
    directories.push(directory)
    return directory
  }
  afterEach(() => {
    for (const directory of directories.splice(0)) {
      fs.rmSync(directory, { recursive: true, force: true })
    }
  })

  // The document itself is already covered by the watcher on its directory, so a
  // document that refers to nothing else leaves nothing more to watch.
  // ドキュメント自身は、そのディレクトリの監視で既に拾える。他のファイルを参照して
  // いなければ、追加で監視するものは無い。
  it('names nothing when the document has no external reference', async () => {
    const directory = makeDirectory()
    const input = path.join(directory, 'openapi.json')
    fs.writeFileSync(
      input,
      JSON.stringify({ openapi: '3.1.0', info: { title: 'A', version: '1' }, paths: {} }),
    )

    await expect(runGenerator(outsideSources(input))).resolves.toStrictEqual([])
  })

  // A `$ref` that leaves the document's directory is exactly the file a watcher on that
  // directory would miss, so it has to be named with its real location.
  // ドキュメントのディレクトリの外に出る `$ref` は、そのディレクトリの監視では
  // 見落とすファイルそのものなので、実際の場所で列挙されなければならない。
  it('names a file a $ref reaches outside the document directory', async () => {
    const directory = makeDirectory()
    fs.mkdirSync(path.join(directory, 'spec'))
    fs.mkdirSync(path.join(directory, 'shared'))
    const input = path.join(directory, 'spec', 'openapi.json')
    const shared = path.join(directory, 'shared', 'item.json')
    fs.writeFileSync(shared, JSON.stringify({ type: 'object' }))
    fs.writeFileSync(
      input,
      JSON.stringify({
        openapi: '3.1.0',
        info: { title: 'A', version: '1' },
        paths: {},
        components: { schemas: { Item: { $ref: '../shared/item.json' } } },
      }),
    )

    await expect(runGenerator(outsideSources(input))).resolves.toStrictEqual([shared])
  })

  // A document that does not parse cannot say what it refers to; the caller decides what
  // to watch instead, so this has to fail rather than answer with a partial list.
  // パースできないドキュメントは参照先を答えられない。代わりに何を監視するかは
  // 呼び出し側が決めるので、部分的な一覧を返さず失敗しなければならない。
  it('fails when the document cannot be parsed', async () => {
    const directory = makeDirectory()
    const input = path.join(directory, 'openapi.json')
    fs.writeFileSync(input, '{ not json')

    await expect(runGenerator(outsideSources(input))).rejects.toBeDefined()
  })

  // TypeSpec imports are followed through the source text: a relative file, a directory
  // standing for its `main.tsp`, and an import of an import. A package import is a
  // library under node_modules and is not something the user edits.
  // TypeSpec の import はソースの文字列からたどる。相対パスのファイル、`main.tsp` を
  // 表すディレクトリ、import 先のさらに先の import が対象。パッケージの import は
  // node_modules 配下のライブラリであり、利用者が編集するものではない。
  it('follows relative TypeSpec imports and leaves package imports out', async () => {
    const directory = makeDirectory()
    fs.mkdirSync(path.join(directory, 'spec'))
    fs.mkdirSync(path.join(directory, 'models'))
    fs.mkdirSync(path.join(directory, 'common'))
    const input = path.join(directory, 'spec', 'main.tsp')
    const user = path.join(directory, 'models', 'user.tsp')
    const id = path.join(directory, 'models', 'id.tsp')
    const common = path.join(directory, 'common', 'main.tsp')
    fs.writeFileSync(
      input,
      'import "@typespec/http";\nimport "../models/user.tsp";\nimport "../common";\n',
    )
    fs.writeFileSync(user, 'import "./id.tsp";\nmodel User {}\n')
    fs.writeFileSync(id, 'scalar Id extends string;\n')
    fs.writeFileSync(common, 'model Common {}\n')

    await expect(runGenerator(outsideSources(input))).resolves.toStrictEqual([common, id, user])
  })

  // Two files importing each other must not send the walk round in circles.
  // 互いに import し合う 2 つのファイルで、探索が循環してはならない。
  it('stops on TypeSpec files that import each other', async () => {
    const directory = makeDirectory()
    fs.mkdirSync(path.join(directory, 'spec'))
    fs.mkdirSync(path.join(directory, 'models'))
    const input = path.join(directory, 'spec', 'a.tsp')
    const other = path.join(directory, 'models', 'b.tsp')
    fs.writeFileSync(input, 'import "../models/b.tsp";\n')
    fs.writeFileSync(other, 'import "../spec/a.tsp";\n')

    await expect(runGenerator(outsideSources(input))).resolves.toStrictEqual([other])
  })

  // A file beside the document, or below it, is one the watcher on the directory
  // already sees; naming it again would watch it twice.
  // ドキュメントと同じ場所、またはその下にあるファイルは、ディレクトリの監視で既に
  // 見えている。ここでも挙げると二重に監視することになる。
  it('leaves out a referenced file under the document directory', async () => {
    const directory = makeDirectory()
    fs.mkdirSync(path.join(directory, 'schemas'))
    const input = path.join(directory, 'openapi.json')
    fs.writeFileSync(
      path.join(directory, 'schemas', 'item.json'),
      JSON.stringify({ type: 'object' }),
    )
    fs.writeFileSync(
      input,
      JSON.stringify({
        openapi: '3.1.0',
        info: { title: 'A', version: '1' },
        paths: {},
        components: { schemas: { Item: { $ref: './schemas/item.json' } } },
      }),
    )

    await expect(runGenerator(outsideSources(input))).resolves.toStrictEqual([])
  })
})

describe('makeJob: the client and what imports it', () => {
  // Runs every job of the config and reads what was written under src.
  // 設定のすべてのジョブを実行し、src の下に書き出されたものを読み取る。
  async function generate(dir: string, config: object) {
    const cfg = await runGenerator(parseConfig({ input: 'openapi.yaml', ...config }))
    const jobs = makeJob(openAPI, cfg)
    // The app entry is what the client and the rpc file are written against, so the jobs
    // run in the order they are made.
    // アプリのエントリは、クライアントと rpc ファイルの前提になる。そのため、ジョブは作られた
    // 順に実行する。
    for (const job of jobs) {
      // oxlint-disable-next-line no-await-in-loop -- the jobs run one after the other
      await runGenerator(job.run(job.output))
    }
    return {
      read: (file: string) => fs.readFileSync(path.join(dir, file), 'utf8'),
      has: (file: string) => fs.existsSync(path.join(dir, file)),
      imports: (file: string) =>
        fs
          .readFileSync(path.join(dir, file), 'utf8')
          .split('\n')
          .filter((text) => /from '(?:\.|@\/|@packages)/u.test(text))
          .map((text) => text.replace(/^.* from /u, '')),
    }
  }

  // The client beside the app entry imports it as ./index, and rpc imports the client
  // as ./client. The index.ts there is the app, so no barrel is written over it.
  // アプリのエントリの隣にあるクライアントは、それを ./index として import し、rpc は
  // クライアントを ./client として import する。そこにある index.ts はアプリであるため、
  // バレルで上書きされることはない。
  it('imports the client beside the app entry by its file', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'client-job-beside-'))
    const out = await generate(tmpDir, {
      output: `${tmpDir}/src/routes.ts`,
      template: { routeHandler: true },
      client: { output: `${tmpDir}/src/client.ts` },
      rpc: { output: `${tmpDir}/src/rpc.ts` },
    })
    expect(out.imports('src/client.ts')).toStrictEqual(["'./index'"])
    expect(out.imports('src/rpc.ts')).toStrictEqual(["'./client'"])
    expect(out.read('src/index.ts')).toContain('export const api = app')
  })

  // A client in a directory of its own is re-exported by the index.ts beside it, which is
  // what rpc imports.
  // 専用のディレクトリにあるクライアントは、隣の index.ts から再 export される。rpc が
  // import するのは、そのファイルである。
  it('imports the client in a directory of its own through the barrel', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'client-job-barrel-'))
    const out = await generate(tmpDir, {
      output: `${tmpDir}/src/routes.ts`,
      template: { routeHandler: true },
      client: { output: `${tmpDir}/src/lib/client.ts` },
      rpc: { output: `${tmpDir}/src/rpc.ts` },
      'tanstack-query': { output: `${tmpDir}/src/hooks/query.ts` },
    })
    expect(out.read('src/lib/index.ts')).toBe("export * from './client'\n")
    expect(out.imports('src/lib/client.ts')).toStrictEqual(["'../index'"])
    expect(out.imports('src/rpc.ts')).toStrictEqual(["'./lib'"])
    expect(out.imports('src/hooks/query.ts')).toStrictEqual(["'../lib'"])
  })

  // A file beside the client imports the client itself: the barrel may come to re-export
  // the file that would import it.
  // クライアントと同じディレクトリのファイルは、クライアント自体を import する。バレルは、
  // それを import するファイル自身を再 export するようになる可能性がある。
  it('imports the client by its file from a file beside it', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'client-job-sibling-'))
    const out = await generate(tmpDir, {
      output: `${tmpDir}/src/routes.ts`,
      template: { routeHandler: true },
      client: { output: `${tmpDir}/src/lib/client.ts` },
      rpc: { output: `${tmpDir}/src/lib/rpc.ts` },
    })
    expect(out.imports('src/lib/rpc.ts')).toStrictEqual(["'./client'"])
  })

  // A client that is an index.ts is imported by its directory, and needs no barrel.
  // index.ts であるクライアントは、ディレクトリで import される。バレルは不要である。
  it('imports a client that is an index.ts by its directory', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'client-job-index-'))
    const out = await generate(tmpDir, {
      output: `${tmpDir}/src/routes.ts`,
      template: { routeHandler: true },
      client: { output: `${tmpDir}/src/client/index.ts` },
      rpc: { output: `${tmpDir}/src/rpc.ts` },
    })
    expect(out.imports('src/rpc.ts')).toStrictEqual(["'./client'"])
    expect(fs.readdirSync(path.join(tmpDir, 'src/client'))).toStrictEqual(['index.ts'])
  })

  // The index.ts beside the client is what rpc writes, so the client is imported by its
  // file and the rpc file is left as it is.
  // クライアントの隣の index.ts は、rpc が書き出すファイルである。そのためクライアントは
  // ファイル名で import され、rpc のファイルはそのまま残る。
  it('writes no barrel over the output of another generator', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'client-job-taken-'))
    const out = await generate(tmpDir, {
      output: `${tmpDir}/src/routes.ts`,
      template: { routeHandler: true },
      client: { output: `${tmpDir}/src/lib/client.ts` },
      rpc: { output: `${tmpDir}/src/lib` },
    })
    expect(out.imports('src/lib/index.ts')).toStrictEqual(["'./client'"])
    expect(out.read('src/lib/index.ts')).toContain('export async function getUsersId(')
  })

  // The alias stands for the directory the app entry is in.
  // エイリアスは、アプリのエントリがあるディレクトリを表す。
  it('imports through the path alias', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'client-job-alias-'))
    const out = await generate(tmpDir, {
      output: `${tmpDir}/src/routes.ts`,
      template: { routeHandler: true, pathAlias: '@/' },
      client: { output: `${tmpDir}/src/lib/client.ts` },
      rpc: { output: `${tmpDir}/src/rpc.ts` },
    })
    expect(out.imports('src/lib/client.ts')).toStrictEqual(["'@/index'"])
    expect(out.imports('src/rpc.ts')).toStrictEqual(["'@/lib'"])
  })

  // An alias that names a directory is the app entry as it stands. The client is outside
  // that directory, so rpc reaches it by a relative path.
  // ディレクトリを指すエイリアスは、そのままアプリのエントリになる。クライアントはその
  // ディレクトリの外にあるため、rpc は相対パスで到達する。
  it('imports the app by an alias that names its directory', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'client-job-alias-dir-'))
    const out = await generate(tmpDir, {
      output: `${tmpDir}/src/api/routes.ts`,
      template: { routeHandler: true, pathAlias: '@/api' },
      client: { output: `${tmpDir}/src/client/http.ts` },
      rpc: { output: `${tmpDir}/src/rpc.ts` },
    })
    expect(out.imports('src/client/http.ts')).toStrictEqual(["'@/api'"])
    expect(out.read('src/client/index.ts')).toBe("export * from './http'\n")
    expect(out.imports('src/rpc.ts')).toStrictEqual(["'./client'"])
  })

  // The import a generator names is the one it uses, whatever the client block says.
  // 生成器に指定された import は、client ブロックの内容にかかわらず、そのまま使われる。
  it('takes the import a generator names over the generated client', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'client-job-named-'))
    const out = await generate(tmpDir, {
      output: `${tmpDir}/src/routes.ts`,
      template: { routeHandler: true },
      client: { output: `${tmpDir}/src/lib/client.ts` },
      rpc: { output: `${tmpDir}/src/rpc.ts`, import: '@packages/client' },
    })
    expect(out.read('src/rpc.ts')).toContain("import { client } from '@packages/client'")
  })

  // Without a client block nothing is written for it.
  // client ブロックがなければ、クライアントは何も書き出されない。
  it('writes no client without a client block', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'client-job-none-'))
    const out = await generate(tmpDir, {
      output: `${tmpDir}/src/routes.ts`,
      template: { routeHandler: true },
      rpc: { output: `${tmpDir}/src/rpc.ts`, import: '../lib' },
    })
    expect(out.has('src/client.ts')).toBe(false)
    expect(out.imports('src/rpc.ts')).toStrictEqual(["'../lib'"])
  })

  // Without template, rpc calls the client by the name the config gives.
  // template がなければ、rpc は設定で指定した名前でクライアントを呼び出す。
  // With template and without the client block, the same.
  // template があり client ブロックがなくても、同様である。
  it('imports the named client with template and without client', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'client-job-tname-'))
    const out = await generate(tmpDir, {
      output: `${tmpDir}/src/routes.ts`,
      template: { routeHandler: true },
      rpc: { output: `${tmpDir}/src/rpc.ts`, import: '../lib', client: 'api' },
    })
    expect(out.has('src/client.ts')).toBe(false)
    expect(out.read('src/rpc.ts')).toContain("import { api } from '../lib'")
  })

  it('imports the named client without template', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'client-job-name-'))
    const out = await generate(tmpDir, {
      output: `${tmpDir}/src/routes.ts`,
      rpc: { output: `${tmpDir}/src/rpc.ts`, import: '../lib', client: 'api' },
    })
    expect(out.read('src/rpc.ts')).toContain("import { api } from '../lib'")
  })

  // The same for a hook library.
  // フックのライブラリも同様である。
  it('imports the named client into hooks without template', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'client-job-hook-'))
    const out = await generate(tmpDir, {
      output: `${tmpDir}/src/routes.ts`,
      swr: { output: `${tmpDir}/src/swr.ts`, import: '../lib', client: 'api' },
    })
    expect(out.read('src/swr.ts')).toContain("import { api } from '../lib'")
  })
})

describe('makeJob: a split application', () => {
  async function generate(dir: string, config: object) {
    const cfg = await runGenerator(parseConfig({ input: 'openapi.yaml', ...config }))
    for (const job of makeJob(openAPI, cfg)) {
      // oxlint-disable-next-line no-await-in-loop -- the jobs run one after the other
      await runGenerator(job.run(job.output))
    }
    return (file: string) => fs.readFileSync(path.join(dir, file), 'utf8')
  }

  // Every group is the app registering its routes, and rpc calls each through its client.
  // すべてのグループは、アプリが自身のルートを登録したものである。rpc は、それぞれを
  // グループのクライアントを通して呼び出す。
  it('divides the app, the client and rpc with routeHandler', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'split-job-handler-'))
    const read = await generate(tmpDir, {
      output: `${tmpDir}/src/routes.ts`,
      template: { routeHandler: true, split: true },
      client: { output: `${tmpDir}/src/client.ts` },
      rpc: { output: `${tmpDir}/src/rpc.ts` },
    })
    expect(read('src/index.ts')).toContain(`const app = new OpenAPIHono()

export const users = app.openapi(getUsersIdRoute, getUsersIdRouteHandler)

export const health = app.openapi(getHealthRoute, getHealthRouteHandler)

export const api = app

export default app
`)
    expect(read('src/client.ts')).toContain("import type { users, health } from './index'")
    expect(read('src/rpc.ts')).toContain("import { usersClient, healthClient } from './client'")
  })

  // The same with the routes a handler file defines.
  // ハンドラーファイルが定義するルートでも、同様である。
  it('divides the app, the client and rpc with define', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'split-job-define-'))
    const read = await generate(tmpDir, {
      output: `${tmpDir}/src/index.ts`,
      template: { define: true, split: true },
      client: { output: `${tmpDir}/src/client.ts` },
      rpc: { output: `${tmpDir}/src/rpc.ts` },
    })
    expect(read('src/index.ts')).toContain(`const app = new OpenAPIHono()

export const users = app.openapiRoutes([getUsersIdRoute] as const)

export const health = app.openapiRoutes([getHealthRoute] as const)

export const api = app

export default app
`)
    expect(read('src/client.ts')).toContain("import type { users, health } from './index'")
    expect(read('src/rpc.ts')).toContain("import { usersClient, healthClient } from './client'")
  })

  // Where the handlers register their routes themselves, a group is a handler file the
  // app mounts.
  // ハンドラーが自身でルートを登録する場合、グループは、アプリがマウントするハンドラー
  // ファイルである。
  it('divides the app, the client and rpc where the handlers register their routes', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'split-job-inline-'))
    const read = await generate(tmpDir, {
      output: `${tmpDir}/src/routes.ts`,
      template: { split: true },
      client: { output: `${tmpDir}/src/client.ts` },
      rpc: { output: `${tmpDir}/src/rpc.ts` },
    })
    expect(read('src/index.ts')).toContain(`const app = new OpenAPIHono()

export const users = app.route('/', usersHandler)

export const health = app.route('/', healthHandler)

export const api = app

export default app
`)
    expect(read('src/client.ts')).toContain("import type { users, health } from './index'")
    expect(read('src/rpc.ts')).toContain("import { usersClient, healthClient } from './client'")
  })

  // Without split the app is one chain and there is one client.
  // split がなければ、アプリは1本のチェーンになり、クライアントは1つである。
  it('leaves the app, the client and rpc whole without split', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'split-job-off-'))
    const read = await generate(tmpDir, {
      output: `${tmpDir}/src/routes.ts`,
      template: { routeHandler: true },
      client: { output: `${tmpDir}/src/client.ts` },
      rpc: { output: `${tmpDir}/src/rpc.ts` },
    })
    expect(read('src/index.ts')).toContain(`export const api = app
  .openapi(getUsersIdRoute, getUsersIdRouteHandler)
  .openapi(getHealthRoute, getHealthRouteHandler)
`)
    expect(read('src/client.ts')).toContain("import type { api } from './index'")
    expect(read('src/rpc.ts')).toContain("import { client } from './client'")
  })
})

// Runs every job of a config that scaffolds the app, the client and the rpc file.
// アプリ・クライアント・rpc ファイルを生成する設定の、すべてのジョブを実行する。
async function generateAgain(document: OpenAPI, dir: string, split: boolean) {
  const cfg = await runGenerator(
    parseConfig({
      input: 'openapi.yaml',
      output: `${dir}/src/routes.ts`,
      template: { routeHandler: true, split },
      client: { output: `${dir}/src/lib/client.ts` },
      rpc: { output: `${dir}/src/rpc.ts` },
    }),
  )
  for (const job of makeJob(document, cfg)) {
    // oxlint-disable-next-line no-await-in-loop -- the jobs run one after the other
    await runGenerator(job.run(job.output))
  }
  return (file: string) => fs.readFileSync(path.join(dir, file), 'utf8')
}

describe('makeJob: generating a split application again', () => {
  const withItems = {
    ...openAPI,
    paths: {
      '/items': { get: { operationId: 'getItems', responses: { 200: { description: 'ok' } } } },
      ...openAPI.paths,
    },
  } as unknown as OpenAPI

  const withoutHealth = {
    ...openAPI,
    paths: Object.fromEntries(
      Object.entries(openAPI.paths).filter(([route]) => route !== '/health'),
    ),
  } as unknown as OpenAPI

  // What the user wrote into the app entry is kept, and the group of the new path is
  // placed where the document has it: before users.
  // 利用者がアプリのエントリに書いたものは残る。新しいパスのグループは、ドキュメント上の
  // 位置、つまり users の前に置かれる。
  it('adds the group of a new path and keeps what the user wrote', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'split-again-add-'))
    await generateAgain(openAPI, tmpDir, true)
    const entry = path.join(tmpDir, 'src/index.ts')
    fs.writeFileSync(
      entry,
      fs
        .readFileSync(entry, 'utf8')
        .replace(
          'const app = new OpenAPIHono()',
          "const app = new OpenAPIHono()\n\napp.use(logger())\n\nexport const version = '1'",
        ),
    )
    const read = await generateAgain(withItems, tmpDir, true)
    expect(read('src/index.ts')).toContain(`const app = new OpenAPIHono()

app.use(logger())

export const version = '1'

export const items = app.openapi(getItemsRoute, getItemsRouteHandler)

export const users = app.openapi(getUsersIdRoute, getUsersIdRouteHandler)

export const health = app.openapi(getHealthRoute, getHealthRouteHandler)

export const api = app

export default app
`)
    expect(read('src/lib/client.ts')).toContain(
      "import type { items, users, health } from '../index'",
    )
    expect(read('src/rpc.ts')).toContain(
      "import { itemsClient, usersClient, healthClient } from './lib'",
    )
  })

  // A group whose paths left the document is removed, with its client.
  // パスがドキュメントからなくなったグループは、クライアントとともに削除される。
  it('removes the group of a path that left the document', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'split-again-remove-'))
    await generateAgain(openAPI, tmpDir, true)
    const read = await generateAgain(withoutHealth, tmpDir, true)
    expect(read('src/index.ts')).toContain(`const app = new OpenAPIHono()

export const users = app.openapi(getUsersIdRoute, getUsersIdRouteHandler)

export const api = app

export default app
`)
    expect(read('src/index.ts')).not.toContain('health')
    expect(read('src/lib/client.ts')).not.toContain('healthClient')
    expect(read('src/rpc.ts')).not.toContain('healthClient')
  })

  // Turning split off makes the app one chain again, and the client one.
  // split を無効にすると、アプリは再び1本のチェーンになり、クライアントは1つになる。
  it('makes the app whole again when split is turned off', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'split-again-off-'))
    await generateAgain(openAPI, tmpDir, true)
    const read = await generateAgain(openAPI, tmpDir, false)
    expect(read('src/index.ts')).toContain(`const app = new OpenAPIHono()

export const api = app
  .openapi(getUsersIdRoute, getUsersIdRouteHandler)
  .openapi(getHealthRoute, getHealthRouteHandler)

export default app
`)
    expect(read('src/lib/client.ts')).toContain("import type { api } from '../index'")
    expect(read('src/rpc.ts')).toContain("import { client } from './lib'")
  })

  // Turning split on divides an app that was one chain.
  // split を有効にすると、1本のチェーンだったアプリが分割される。
  it('divides an app that was whole when split is turned on', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'split-again-on-'))
    await generateAgain(openAPI, tmpDir, false)
    const read = await generateAgain(openAPI, tmpDir, true)
    expect(read('src/index.ts')).toContain(`const app = new OpenAPIHono()

export const users = app.openapi(getUsersIdRoute, getUsersIdRouteHandler)

export const health = app.openapi(getHealthRoute, getHealthRouteHandler)

export const api = app

export default app
`)
  })

  // The barrel of the client is written once, however often the client is generated.
  // クライアントのバレルは、クライアントを何度生成しても、1回だけ書き出される。
  it('leaves the barrel of the client as it is', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'split-again-barrel-'))
    await generateAgain(openAPI, tmpDir, true)
    await generateAgain(openAPI, tmpDir, true)
    const read = await generateAgain(openAPI, tmpDir, true)
    expect(read('src/lib/index.ts')).toBe("export * from './client'\n")
  })
})
