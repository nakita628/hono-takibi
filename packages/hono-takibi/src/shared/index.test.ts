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
