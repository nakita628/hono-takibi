import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vite-plus/test'

import { generate } from './index.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

const DOCUMENT = JSON.stringify({
  openapi: '3.1.0',
  info: { title: 'Test API', version: '1.0.0' },
  paths: {
    '/health': {
      get: { operationId: 'healthCheck', responses: { '200': { description: 'OK' } } },
    },
  },
})

describe('generate', () => {
  it('runs a config as the CLI does, template and all', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-generate-'))
    const input = path.join(tmpDir, 'openapi.json')
    fs.writeFileSync(input, DOCUMENT)
    const output = path.join(tmpDir, 'src', 'index.ts')
    const report = await generate({ input, output, template: { define: true } })
    expect(report).toBe('No components found\n🔥 Generated code and template files written')
    expect(fs.readFileSync(output, 'utf8')).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes'

const app = new OpenAPIHono()

export const api = app.openapiRoutes([getHealthRoute] as const)

export default app
`)
    expect(fs.readFileSync(path.join(tmpDir, 'src', 'routes', 'health.ts'), 'utf8'))
      .toBe(`import { createRoute, defineOpenAPIRoute } from '@hono/zod-openapi'

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
`)
  })

  it('rejects a config that is not one, with the message the CLI prints', async () => {
    await expect(generate({ output: './src/index.ts' })).rejects.toThrow(
      'Invalid config: input: Missing key',
    )
  })
})
