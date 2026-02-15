import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../openapi/index.js'
import { makeTemplate, takibi } from './index.js'

const openapi: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'HonoTakibi', version: 'v1' },
  tags: [{ name: 'Hono' }, { name: 'HonoX' }, { name: 'ZodOpenAPIHono' }],
  paths: {
    '/hono': {
      get: {
        tags: ['Hono'],
        summary: 'Hono',
        description: 'Hono',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Hono' } },
                  required: ['message'],
                },
              },
            },
          },
        },
      },
    },
    '/hono-x': {
      get: {
        tags: ['HonoX'],
        summary: 'HonoX',
        description: 'HonoX',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'HonoX' } },
                  required: ['message'],
                },
              },
            },
          },
        },
      },
    },
    '/zod-openapi-hono': {
      get: {
        tags: ['ZodOpenAPIHono'],
        summary: 'ZodOpenAPIHono',
        description: 'ZodOpenAPIHono',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'ZodOpenAPIHono' } },
                  required: ['message'],
                },
              },
            },
          },
        },
      },
    },
  },
}

const runTakibi = async (
  openapi: OpenAPI,
  output: `${string}.ts`,
  options: {
    readonly template: boolean
    readonly test: boolean
    readonly basePath?: string
    readonly pathAlias?: string
    readonly routeImport?: string
    readonly routeHandler?: boolean
  },
) =>
  takibi(
    openapi,
    output,
    options.template,
    options.test,
    options.basePath ?? '/',
    options.pathAlias,
    options.routeImport,
    {
      exportSchemasTypes: true,
      exportSchemas: true,
      exportParametersTypes: false,
      exportParameters: false,
      exportSecuritySchemes: false,
      exportRequestBodies: false,
      exportResponses: false,
      exportHeadersTypes: false,
      exportHeaders: false,
      exportExamples: false,
      exportLinks: false,
      exportCallbacks: false,
      exportPathItems: false,
      exportMediaTypes: false,
      exportMediaTypesTypes: false,
    },
    options.routeHandler ?? true,
  )

describe('takibi generate (sandbox)', () => {
  it('should generate Hono app with OpenAPI routes (no template/test)', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-'))
    try {
      const input = path.join(
        dir,
        'openapi.json',
      ) as `${string}.yaml | ${string}.json | ${string}.tsp`
      const out = path.join(dir, 'zod-openapi-hono.ts') as `${string}.ts`
      fs.writeFileSync(input, JSON.stringify(openapi))

      const result = await runTakibi(openapi, out, { template: false, test: false })

      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value).toMatch('Generated code written to')
      }

      const generatedCode = fs.readFileSync(out, 'utf-8')
      const expectedCode = `import { createRoute, z } from '@hono/zod-openapi'

export const getHonoRoute = createRoute({
  method: 'get',
  path: '/hono',
  tags: ['Hono'],
  summary: 'Hono',
  description: 'Hono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string().openapi({ example: 'Hono' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})

export const getHonoXRoute = createRoute({
  method: 'get',
  path: '/hono-x',
  tags: ['HonoX'],
  summary: 'HonoX',
  description: 'HonoX',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string().openapi({ example: 'HonoX' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})

export const getZodOpenapiHonoRoute = createRoute({
  method: 'get',
  path: '/zod-openapi-hono',
  tags: ['ZodOpenAPIHono'],
  summary: 'ZodOpenAPIHono',
  description: 'ZodOpenAPIHono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string().openapi({ example: 'ZodOpenAPIHono' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})
`
      expect(generatedCode).toBe(expectedCode)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate Hono app with OpenAPI routes (template & test ON)', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-'))
    try {
      const input = path.join(
        dir,
        'openapi.json',
      ) as `${string}.yaml | ${string}.json | ${string}.tsp`
      const out = path.join(dir, 'zod-openapi-hono.ts') as `${string}.ts`
      fs.writeFileSync(input, JSON.stringify(openapi))

      const result = await runTakibi(openapi, out, { template: true, test: true })

      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value).toMatch('Generated code and template files written')
      }
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('templateCode (sandbox)', () => {
  it('--template --test (first run: no main.ts)', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tpl-'))
    try {
      const input = path.join(
        dir,
        'openapi.json',
      ) as `${string}.yaml | ${string}.json | ${string}.tsp`
      const srcDir = path.join(dir, 'tmp-template', 'src')
      fs.mkdirSync(srcDir, { recursive: true })
      fs.writeFileSync(input, JSON.stringify(openapi))

      const out = path.join(srcDir, 'route.ts') as `${string}.ts`
      const result = await runTakibi(openapi, out, { template: true, test: true })

      expect(fs.existsSync(path.join(srcDir, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'hono.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'hono.test.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'honoX.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'honoX.test.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'zodOpenapiHono.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'zodOpenapiHono.test.ts'))).toBe(true)
      expect(result).toStrictEqual({
        ok: true,
        value: '🔥 Generated code and template files written',
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('--template --test false', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tpl-'))
    try {
      const input = path.join(
        dir,
        'openapi.json',
      ) as `${string}.yaml | ${string}.json | ${string}.tsp`
      const srcDir = path.join(dir, 'tmp-template', 'src')
      fs.mkdirSync(srcDir, { recursive: true })
      fs.writeFileSync(input, JSON.stringify(openapi))

      const out = path.join(srcDir, 'route.ts') as `${string}.ts`
      const result = await runTakibi(openapi, out, { template: true, test: false })

      expect(fs.existsSync(path.join(srcDir, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'hono.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'honoX.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'zodOpenapiHono.ts'))).toBe(true)
      expect(result).toStrictEqual({
        ok: true,
        value: '🔥 Generated code and template files written',
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('basePath "api" with test: true', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tpl-'))
    try {
      const input = path.join(
        dir,
        'openapi.json',
      ) as `${string}.yaml | ${string}.json | ${string}.tsp`
      const srcDir = path.join(dir, 'tmp-template', 'src')
      fs.mkdirSync(srcDir, { recursive: true })
      fs.writeFileSync(input, JSON.stringify(openapi))

      const out = path.join(srcDir, 'route.ts') as `${string}.ts`
      const result = await runTakibi(openapi, out, {
        template: true,
        test: true,
        basePath: '/api',
      })

      expect(fs.existsSync(path.join(srcDir, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'hono.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'hono.test.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'honoX.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'honoX.test.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'zodOpenapiHono.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'zodOpenapiHono.test.ts'))).toBe(true)

      const appCode = fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')
      expect(appCode).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getHonoRoute, getHonoXRoute, getZodOpenapiHonoRoute } from './route'
import {
  getHonoRouteHandler,
  getHonoXRouteHandler,
  getZodOpenapiHonoRouteHandler,
} from './handlers'

const app = new OpenAPIHono().basePath('/api')

export const api = app
  .openapi(getHonoRoute, getHonoRouteHandler)
  .openapi(getHonoXRoute, getHonoXRouteHandler)
  .openapi(getZodOpenapiHonoRoute, getZodOpenapiHonoRouteHandler)

export default app
`)

      expect(result).toStrictEqual({
        ok: true,
        value: '🔥 Generated code and template files written',
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('basePath "api" with test: false', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tpl-'))
    try {
      const input = path.join(
        dir,
        'openapi.json',
      ) as `${string}.yaml | ${string}.json | ${string}.tsp`
      const srcDir = path.join(dir, 'tmp-template', 'src')
      fs.mkdirSync(srcDir, { recursive: true })
      fs.writeFileSync(input, JSON.stringify(openapi))

      const out = path.join(srcDir, 'route.ts') as `${string}.ts`
      const result = await runTakibi(openapi, out, {
        template: true,
        test: false,
        basePath: '/api',
      })

      expect(fs.existsSync(path.join(srcDir, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'hono.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'honoX.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'zodOpenapiHono.ts'))).toBe(true)

      const appCode = fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')
      expect(appCode).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getHonoRoute, getHonoXRoute, getZodOpenapiHonoRoute } from './route'
import {
  getHonoRouteHandler,
  getHonoXRouteHandler,
  getZodOpenapiHonoRouteHandler,
} from './handlers'

const app = new OpenAPIHono().basePath('/api')

export const api = app
  .openapi(getHonoRoute, getHonoRouteHandler)
  .openapi(getHonoXRoute, getHonoXRouteHandler)
  .openapi(getZodOpenapiHonoRoute, getZodOpenapiHonoRouteHandler)

export default app
`)

      expect(result).toStrictEqual({
        ok: true,
        value: '🔥 Generated code and template files written',
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

// Simple OpenAPI for strict tests
const simpleOpenapi: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'Test', version: 'v1' },
  paths: {
    '/test': {
      get: {
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { id: { type: 'string' } },
                  required: ['id'],
                },
              },
            },
          },
        },
      },
    },
  },
}

describe('--template mode strict content tests', () => {
  it('verifies index.ts content with correct import paths', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-strict-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })

      const out = path.join(srcDir, 'route.ts') as `${string}.ts`
      const result = await runTakibi(simpleOpenapi, out, { template: true, test: false })

      expect(result).toStrictEqual({
        ok: true,
        value: '🔥 Generated code and template files written',
      })

      const indexContent = fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')
      const expectedIndex = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getTestRoute } from './route'
import { getTestRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getTestRoute, getTestRouteHandler)

export default app
`
      expect(indexContent).toBe(expectedIndex)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('verifies handlers/index.ts barrel export content', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-strict-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })

      const out = path.join(srcDir, 'route.ts') as `${string}.ts`
      await runTakibi(simpleOpenapi, out, { template: true, test: false })

      const handlersIndexContent = fs.readFileSync(
        path.join(srcDir, 'handlers', 'index.ts'),
        'utf-8',
      )
      const expectedHandlersIndex = `export * from './test'
`
      expect(handlersIndexContent).toBe(expectedHandlersIndex)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('verifies handler file content with correct import path', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-strict-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })

      const out = path.join(srcDir, 'route.ts') as `${string}.ts`
      await runTakibi(simpleOpenapi, out, { template: true, test: false })

      const handlerContent = fs.readFileSync(path.join(srcDir, 'handlers', 'test.ts'), 'utf-8')
      const expectedHandler = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getTestRoute } from '../route'

export const getTestRouteHandler: RouteHandler<typeof getTestRoute> = async (c) => {}
`
      expect(handlerContent).toBe(expectedHandler)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('verifies route.ts content', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-strict-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })

      const out = path.join(srcDir, 'route.ts') as `${string}.ts`
      await runTakibi(simpleOpenapi, out, { template: true, test: false })

      const routeContent = fs.readFileSync(path.join(srcDir, 'route.ts'), 'utf-8')
      const expectedRoute = `import { createRoute, z } from '@hono/zod-openapi'

export const getTestRoute = createRoute({
  method: 'get',
  path: '/test',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': { schema: z.object({ id: z.string() }).openapi({ required: ['id'] }) },
      },
    },
  },
})
`
      expect(routeContent).toBe(expectedRoute)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('verifies test file is generated when --test is true', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-strict-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })

      const out = path.join(srcDir, 'route.ts') as `${string}.ts`
      await runTakibi(simpleOpenapi, out, { template: true, test: true })

      expect(fs.existsSync(path.join(srcDir, 'handlers', 'test.test.ts'))).toBe(true)
      const testContent = fs.readFileSync(path.join(srcDir, 'handlers', 'test.test.ts'), 'utf-8')
      expect(testContent).toBe(`import { describe, it, expect } from 'vitest'
import app from '..'

describe('Test', () => {
  describe('GET /test', () => {
    it('should return 200', async () => {
      const res = await app.request(\`/test\`, { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('verifies index.ts with basePath correctly configured', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-strict-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })

      const out = path.join(srcDir, 'route.ts') as `${string}.ts`
      await runTakibi(simpleOpenapi, out, { template: true, test: false, basePath: '/api/v1' })

      const indexContent = fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')
      const expectedIndex = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getTestRoute } from './route'
import { getTestRouteHandler } from './handlers'

const app = new OpenAPIHono().basePath('/api/v1')

export const api = app.openapi(getTestRoute, getTestRouteHandler)

export default app
`
      expect(indexContent).toBe(expectedIndex)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('works with output path without "/" (filename only) and generates correct import paths', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-no-slash-'))
    const originalCwd = process.cwd()
    try {
      process.chdir(dir)

      const out = 'route.ts' as `${string}.ts`
      const result = await runTakibi(simpleOpenapi, out, { template: true, test: false })

      expect(result).toStrictEqual({
        ok: true,
        value: '🔥 Generated code and template files written',
      })

      expect(fs.existsSync(path.join(dir, 'route.ts'))).toBe(true)
      expect(fs.existsSync(path.join(dir, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(dir, 'handlers', 'test.ts'))).toBe(true)

      const indexContent = fs.readFileSync(path.join(dir, 'index.ts'), 'utf-8')
      expect(indexContent).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getTestRoute } from './route'
import { getTestRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getTestRoute, getTestRouteHandler)

export default app
`)

      const handlerContent = fs.readFileSync(path.join(dir, 'handlers', 'test.ts'), 'utf-8')
      expect(handlerContent).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getTestRoute } from '../route'

export const getTestRouteHandler: RouteHandler<typeof getTestRoute> = async (c) => {}
`)
    } finally {
      process.chdir(originalCwd)
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('generates import paths with pathAlias when specified', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-alias-'))
    try {
      const out = path.join(dir, 'src', 'api', 'routes.ts') as `${string}.ts`
      const result = await runTakibi(simpleOpenapi, out, {
        template: true,
        test: true,
        pathAlias: '@/api',
      })

      expect(result.ok).toBe(true)

      const indexContent = fs.readFileSync(path.join(dir, 'src', 'api', 'index.ts'), 'utf-8')
      expect(indexContent).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getTestRoute } from '@/api/routes'
import { getTestRouteHandler } from '@/api/handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getTestRoute, getTestRouteHandler)

export default app
`)

      const handlerContent = fs.readFileSync(
        path.join(dir, 'src', 'api', 'handlers', 'test.ts'),
        'utf-8',
      )
      expect(handlerContent).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getTestRoute } from '@/api/routes'

export const getTestRouteHandler: RouteHandler<typeof getTestRoute> = async (c) => {}
`)

      const testContent = fs.readFileSync(
        path.join(dir, 'src', 'api', 'handlers', 'test.test.ts'),
        'utf-8',
      )
      expect(testContent).toBe(`import { describe, it, expect } from 'vitest'
import app from '@/api'

describe('Test', () => {
  describe('GET /test', () => {
    it('should return 200', async () => {
      const res = await app.request(\`/test\`, { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('generates correct paths when output is routes/index.ts', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-index-'))
    try {
      const srcDir = path.join(dir, 'src')
      const routesDir = path.join(srcDir, 'routes')
      fs.mkdirSync(routesDir, { recursive: true })

      const out = path.join(srcDir, 'routes', 'index.ts') as `${string}.ts`
      const result = await runTakibi(simpleOpenapi, out, { template: true, test: true })

      expect(result).toStrictEqual({
        ok: true,
        value: '🔥 Generated code and template files written',
      })

      // routes/index.ts should contain route definitions
      expect(fs.existsSync(path.join(srcDir, 'routes', 'index.ts'))).toBe(true)
      // app template should be at src/index.ts (parent of routes dir)
      expect(fs.existsSync(path.join(srcDir, 'index.ts'))).toBe(true)
      // handlers should be at src/handlers/ (sibling of routes dir)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'test.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'test.test.ts'))).toBe(true)

      const indexContent = fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')
      expect(indexContent).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getTestRoute } from './routes'
import { getTestRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getTestRoute, getTestRouteHandler)

export default app
`)

      const handlerContent = fs.readFileSync(path.join(srcDir, 'handlers', 'test.ts'), 'utf-8')
      expect(handlerContent).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getTestRoute } from '../routes'

export const getTestRouteHandler: RouteHandler<typeof getTestRoute> = async (c) => {}
`)

      const routeContent = fs.readFileSync(path.join(srcDir, 'routes', 'index.ts'), 'utf-8')
      expect(routeContent).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const getTestRoute = createRoute({
  method: 'get',
  path: '/test',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': { schema: z.object({ id: z.string() }).openapi({ required: ['id'] }) },
      },
    },
  },
})
`)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('generates correct paths when output is routes/index.ts with pathAlias', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-index-alias-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(path.join(srcDir, 'routes'), { recursive: true })

      const out = path.join(srcDir, 'routes', 'index.ts') as `${string}.ts`
      const result = await runTakibi(simpleOpenapi, out, {
        template: true,
        test: true,
        pathAlias: '@/src',
      })

      expect(result.ok).toBe(true)

      const indexContent = fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')
      expect(indexContent).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getTestRoute } from '@/src/routes'
import { getTestRouteHandler } from '@/src/handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getTestRoute, getTestRouteHandler)

export default app
`)

      const handlerContent = fs.readFileSync(path.join(srcDir, 'handlers', 'test.ts'), 'utf-8')
      expect(handlerContent).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getTestRoute } from '@/src/routes'

export const getTestRouteHandler: RouteHandler<typeof getTestRoute> = async (c) => {}
`)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('generates monorepo imports with routeImport and pathAlias', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-route-import-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })

      const out = path.join(srcDir, 'routes.ts') as `${string}.ts`
      const result = await runTakibi(simpleOpenapi, out, {
        template: true,
        test: false,
        basePath: '/api',
        pathAlias: '@/',
        routeImport: '@packages/routes',
      })

      expect(result.ok).toBe(true)

      const indexContent = fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')
      expect(indexContent).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getTestRoute } from '@packages/routes'
import { getTestRouteHandler } from '@/handlers'

const app = new OpenAPIHono().basePath('/api')

export const api = app.openapi(getTestRoute, getTestRouteHandler)

export default app
`)

      const handlerContent = fs.readFileSync(path.join(srcDir, 'handlers', 'test.ts'), 'utf-8')
      expect(handlerContent).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getTestRoute } from '@packages/routes'

export const getTestRouteHandler: RouteHandler<typeof getTestRoute> = async (c) => {}
`)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('generates monorepo imports with routeImport without pathAlias', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-route-import-no-alias-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })

      const out = path.join(srcDir, 'routes.ts') as `${string}.ts`
      const result = await runTakibi(simpleOpenapi, out, {
        template: true,
        test: false,
        basePath: '/api',
        routeImport: '@packages/routes',
      })

      expect(result.ok).toBe(true)

      const indexContent = fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')
      expect(indexContent).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getTestRoute } from '@packages/routes'
import { getTestRouteHandler } from './handlers'

const app = new OpenAPIHono().basePath('/api')

export const api = app.openapi(getTestRoute, getTestRouteHandler)

export default app
`)

      const handlerContent = fs.readFileSync(path.join(srcDir, 'handlers', 'test.ts'), 'utf-8')
      expect(handlerContent).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getTestRoute } from '@packages/routes'

export const getTestRouteHandler: RouteHandler<typeof getTestRoute> = async (c) => {}
`)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('trailing slash pathAlias does not produce double slashes', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-trailing-slash-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })

      const out = path.join(srcDir, 'routes.ts') as `${string}.ts`
      const result = await runTakibi(simpleOpenapi, out, {
        template: true,
        test: false,
        basePath: '/api',
        pathAlias: '@/',
      })

      expect(result.ok).toBe(true)

      const indexContent = fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')
      expect(indexContent).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getTestRoute } from '@/routes'
import { getTestRouteHandler } from '@/handlers'

const app = new OpenAPIHono().basePath('/api')

export const api = app.openapi(getTestRoute, getTestRouteHandler)

export default app
`)

      const handlerContent = fs.readFileSync(path.join(srcDir, 'handlers', 'test.ts'), 'utf-8')
      expect(handlerContent).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getTestRoute } from '@/routes'

export const getTestRouteHandler: RouteHandler<typeof getTestRoute> = async (c) => {}
`)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('routeImport with routes/index.ts output format', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-routeimport-indexts-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(path.join(srcDir, 'routes'), { recursive: true })

      const out = path.join(srcDir, 'routes', 'index.ts') as `${string}.ts`
      const result = await runTakibi(simpleOpenapi, out, {
        template: true,
        test: false,
        basePath: '/api',
        pathAlias: '@/',
        routeImport: '@packages/routes',
      })

      expect(result.ok).toBe(true)

      const indexContent = fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')
      expect(indexContent).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getTestRoute } from '@packages/routes'
import { getTestRouteHandler } from '@/handlers'

const app = new OpenAPIHono().basePath('/api')

export const api = app.openapi(getTestRoute, getTestRouteHandler)

export default app
`)

      const handlerContent = fs.readFileSync(path.join(srcDir, 'handlers', 'test.ts'), 'utf-8')
      expect(handlerContent).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getTestRoute } from '@packages/routes'

export const getTestRouteHandler: RouteHandler<typeof getTestRoute> = async (c) => {}
`)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('3-pattern strict tests (monorepo / pathAlias / plain)', () => {
  it('Monorepo: routeImport + pathAlias', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-3p-monorepo-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })

      const out = path.join(srcDir, 'routes.ts') as `${string}.ts`
      const result = await runTakibi(simpleOpenapi, out, {
        template: true,
        test: false,
        pathAlias: '@/',
        routeImport: '@packages/routes',
      })

      expect(result).toStrictEqual({
        ok: true,
        value: '🔥 Generated code and template files written',
      })

      expect(fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')).toBe(
        `import { OpenAPIHono } from '@hono/zod-openapi'
import { getTestRoute } from '@packages/routes'
import { getTestRouteHandler } from '@/handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getTestRoute, getTestRouteHandler)

export default app
`,
      )

      expect(fs.readFileSync(path.join(srcDir, 'handlers', 'test.ts'), 'utf-8')).toBe(
        `import type { RouteHandler } from '@hono/zod-openapi'
import type { getTestRoute } from '@packages/routes'

export const getTestRouteHandler: RouteHandler<typeof getTestRoute> = async (c) => {}
`,
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('PathAlias: pathAlias only (no routeImport)', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-3p-pathalias-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })

      const out = path.join(srcDir, 'routes.ts') as `${string}.ts`
      const result = await runTakibi(simpleOpenapi, out, {
        template: true,
        test: false,
        pathAlias: '@/',
      })

      expect(result).toStrictEqual({
        ok: true,
        value: '🔥 Generated code and template files written',
      })

      expect(fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')).toBe(
        `import { OpenAPIHono } from '@hono/zod-openapi'
import { getTestRoute } from '@/routes'
import { getTestRouteHandler } from '@/handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getTestRoute, getTestRouteHandler)

export default app
`,
      )

      expect(fs.readFileSync(path.join(srcDir, 'handlers', 'test.ts'), 'utf-8')).toBe(
        `import type { RouteHandler } from '@hono/zod-openapi'
import type { getTestRoute } from '@/routes'

export const getTestRouteHandler: RouteHandler<typeof getTestRoute> = async (c) => {}
`,
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('Plain: no pathAlias, no routeImport', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-3p-plain-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })

      const out = path.join(srcDir, 'routes.ts') as `${string}.ts`
      const result = await runTakibi(simpleOpenapi, out, {
        template: true,
        test: false,
      })

      expect(result).toStrictEqual({
        ok: true,
        value: '🔥 Generated code and template files written',
      })

      expect(fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')).toBe(
        `import { OpenAPIHono } from '@hono/zod-openapi'
import { getTestRoute } from './routes'
import { getTestRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getTestRoute, getTestRouteHandler)

export default app
`,
      )

      expect(fs.readFileSync(path.join(srcDir, 'handlers', 'test.ts'), 'utf-8')).toBe(
        `import type { RouteHandler } from '@hono/zod-openapi'
import type { getTestRoute } from '../routes'

export const getTestRouteHandler: RouteHandler<typeof getTestRoute> = async (c) => {}
`,
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('makeTemplate() unit tests', () => {
  it('generates app template and handler files (plain)', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-gentemplate-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })

      const routeOutput = path.join(srcDir, 'routes.ts') as `${string}.ts`
      const result = await makeTemplate(
        simpleOpenapi,
        routeOutput,
        false,
        '/',
        undefined,
        undefined,
      )

      expect(result).toStrictEqual({
        ok: true,
        value: '🔥 Generated code and template files written',
      })

      expect(fs.existsSync(path.join(srcDir, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'test.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'index.ts'))).toBe(true)

      expect(fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')).toBe(
        `import { OpenAPIHono } from '@hono/zod-openapi'
import { getTestRoute } from './routes'
import { getTestRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getTestRoute, getTestRouteHandler)

export default app
`,
      )

      expect(fs.readFileSync(path.join(srcDir, 'handlers', 'test.ts'), 'utf-8')).toBe(
        `import type { RouteHandler } from '@hono/zod-openapi'
import type { getTestRoute } from '../routes'

export const getTestRouteHandler: RouteHandler<typeof getTestRoute> = async (c) => {}
`,
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('generates app template with monorepo imports', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-gentemplate-mono-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })

      const routeOutput = path.join(srcDir, 'routes.ts') as `${string}.ts`
      const result = await makeTemplate(
        simpleOpenapi,
        routeOutput,
        false,
        '/',
        '@/',
        '@packages/routes',
      )

      expect(result).toStrictEqual({
        ok: true,
        value: '🔥 Generated code and template files written',
      })

      expect(fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')).toBe(
        `import { OpenAPIHono } from '@hono/zod-openapi'
import { getTestRoute } from '@packages/routes'
import { getTestRouteHandler } from '@/handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getTestRoute, getTestRouteHandler)

export default app
`,
      )

      expect(fs.readFileSync(path.join(srcDir, 'handlers', 'test.ts'), 'utf-8')).toBe(
        `import type { RouteHandler } from '@hono/zod-openapi'
import type { getTestRoute } from '@packages/routes'

export const getTestRouteHandler: RouteHandler<typeof getTestRoute> = async (c) => {}
`,
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('generates test files when test flag is true', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-gentemplate-test-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })

      const routeOutput = path.join(srcDir, 'routes.ts') as `${string}.ts`
      const result = await makeTemplate(simpleOpenapi, routeOutput, true, '/', undefined, undefined)

      expect(result).toStrictEqual({
        ok: true,
        value: '🔥 Generated code and template files written',
      })

      expect(fs.existsSync(path.join(srcDir, 'handlers', 'test.test.ts'))).toBe(true)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('generates with routes/index.ts output path', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-gentemplate-indexts-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(path.join(srcDir, 'routes'), { recursive: true })

      const routeOutput = path.join(srcDir, 'routes', 'index.ts') as `${string}.ts`
      const result = await makeTemplate(
        simpleOpenapi,
        routeOutput,
        false,
        '/',
        undefined,
        undefined,
      )

      expect(result).toStrictEqual({
        ok: true,
        value: '🔥 Generated code and template files written',
      })

      // App template at parent dir (src/index.ts), not in routes/
      expect(fs.existsSync(path.join(srcDir, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'test.ts'))).toBe(true)

      expect(fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')).toBe(
        `import { OpenAPIHono } from '@hono/zod-openapi'
import { getTestRoute } from './routes'
import { getTestRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getTestRoute, getTestRouteHandler)

export default app
`,
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('routeHandler: false (inline sub-app pattern)', () => {
  it('generates .route() index.ts and inline handler files', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-rh-false-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })

      const out = path.join(srcDir, 'route.ts') as `${string}.ts`
      const result = await runTakibi(simpleOpenapi, out, {
        template: true,
        test: false,
        routeHandler: false,
      })

      expect(result).toStrictEqual({
        ok: true,
        value: '🔥 Generated code and template files written',
      })

      expect(fs.existsSync(path.join(srcDir, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'test.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'index.ts'))).toBe(true)

      const indexContent = fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')
      expect(indexContent).toContain('testHandler')
      expect(indexContent).toContain('.route(')
      expect(indexContent).not.toContain('.openapi(')
      expect(indexContent).toContain("from './handlers'")

      const handlerContent = fs.readFileSync(path.join(srcDir, 'handlers', 'test.ts'), 'utf-8')
      expect(handlerContent).toContain('OpenAPIHono')
      expect(handlerContent).toContain('testHandler')
      expect(handlerContent).toContain('.openapi(getTestRoute')
      expect(handlerContent).toContain("from '../route'")
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('generates .route() pattern with basePath', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-rh-false-bp-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })

      const out = path.join(srcDir, 'route.ts') as `${string}.ts`
      const result = await runTakibi(simpleOpenapi, out, {
        template: true,
        test: false,
        basePath: '/api',
        routeHandler: false,
      })

      expect(result).toStrictEqual({
        ok: true,
        value: '🔥 Generated code and template files written',
      })

      const indexContent = fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')
      expect(indexContent).toContain("new OpenAPIHono().basePath('/api')")
      expect(indexContent).toContain('testHandler')
      expect(indexContent).toContain('.route(')
      expect(indexContent).not.toContain('.openapi(')
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('generates .route() pattern with pathAlias', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-rh-false-pa-'))
    try {
      const srcDir = path.join(dir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })

      const out = path.join(srcDir, 'route.ts') as `${string}.ts`
      const result = await runTakibi(simpleOpenapi, out, {
        template: true,
        test: false,
        pathAlias: '@/',
        routeHandler: false,
      })

      expect(result).toStrictEqual({
        ok: true,
        value: '🔥 Generated code and template files written',
      })

      const indexContent = fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')
      expect(indexContent).toContain("from '@/handlers'")
      expect(indexContent).toContain('testHandler')

      const handlerContent = fs.readFileSync(path.join(srcDir, 'handlers', 'test.ts'), 'utf-8')
      expect(handlerContent).toContain("from '@/route'")
      expect(handlerContent).toContain('testHandler')
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})
