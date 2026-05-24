import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { describe, expect, it } from 'vite-plus/test'

import { routeCode } from '../../generator/zod-openapi-hono/openapi/routes/index.js'
import type { OpenAPI } from '../../openapi/index.js'
import { route } from './index.js'

const openapi: OpenAPI = {
  openapi: '3.0.0',
  info: { title: '(title)', version: '0.0.0' },
  tags: [{ name: 'Hono' }],
  paths: {
    '/hono': {
      get: {
        operationId: 'HonoService_hono',
        parameters: [],
        responses: {
          '200': {
            description: 'The request has succeeded.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Hono' } } },
          },
        },
        tags: ['Hono'],
      },
    },
    '/honox': {
      get: {
        operationId: 'HonoXService_honox',
        parameters: [],
        responses: {
          '200': {
            description: 'The request has succeeded.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/HonoX' } } },
          },
        },
        tags: ['Hono'],
      },
    },
    '/zod-openapi-hono': {
      get: {
        operationId: 'ZodOpenAPIHonoService_zod_openapi_hono',
        parameters: [],
        responses: {
          '200': {
            description: 'The request has succeeded.',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ZodOpenAPIHono' } },
            },
          },
        },
        tags: ['Hono'],
      },
    },
  },
  components: {
    schemas: {
      Hono: {
        type: 'object',
        required: ['hono'],
        properties: { hono: { type: 'string', enum: ['Hono'] } },
      },
      HonoX: {
        type: 'object',
        required: ['honoX'],
        properties: { honoX: { type: 'string', enum: ['HonoX'] } },
      },
      ZodOpenAPIHono: {
        type: 'object',
        required: ['zod-openapi-hono'],
        properties: { 'zod-openapi-hono': { type: 'string', enum: ['ZodOpenAPIHono'] } },
      },
      HonoUnion: {
        type: 'object',
        required: ['hono-union'],
        properties: {
          'hono-union': {
            anyOf: [
              { $ref: '#/components/schemas/Hono' },
              { $ref: '#/components/schemas/HonoX' },
              { $ref: '#/components/schemas/ZodOpenAPIHono' },
            ],
          },
        },
      },
    },
  },
}

describe('route', () => {
  it('should generate route code (single file)', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-route'))
    try {
      const input = path.join(dir, 'openapi.json') as `${string}.yaml | ${string}.json`
      fs.writeFileSync(input, JSON.stringify(openapi))
      const out = path.join(dir, 'test.ts')

      const result = await route(
        openapi,
        { output: out },
        {
          schemas: {
            output: path.join(dir, 'schemas'),
            split: true,
            import: '@packages/schemas',
          },
        },
      )
      const index = fs.readFileSync(out, 'utf-8')
      const expected = `import { createRoute } from '@hono/zod-openapi'
import { HonoSchema, HonoXSchema, ZodOpenAPIHonoSchema } from '@packages/schemas'

export const getHonoRoute = createRoute({
  method: 'get',
  path: '/hono',
  tags: ['Hono'],
  operationId: 'HonoService_hono',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoSchema } },
    },
  },
})

export const getHonoxRoute = createRoute({
  method: 'get',
  path: '/honox',
  tags: ['Hono'],
  operationId: 'HonoXService_honox',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoXSchema } },
    },
  },
})

export const getZodOpenapiHonoRoute = createRoute({
  method: 'get',
  path: '/zod-openapi-hono',
  tags: ['Hono'],
  operationId: 'ZodOpenAPIHonoService_zod_openapi_hono',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: ZodOpenAPIHonoSchema } },
    },
  },
})
`

      expect(index).toBe(expected)
      expect(result).toStrictEqual({ ok: true, value: `Generated route code written to ${out}` })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('returns error when routes.output is missing', async () => {
    const result = await route(openapi)
    expect(result).toStrictEqual({ ok: false, error: 'routes.output is required' })
  })

  it('falls back to single-file write when split is true but paths is empty', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-route'))
    try {
      const emptyOpenapi: OpenAPI = {
        openapi: '3.0.0',
        info: { title: 'Empty', version: '0.0.0' },
        paths: {},
      }
      const out = path.join(dir, 'empty.ts')
      const result = await route(emptyOpenapi, { output: out, split: true })
      expect(result).toStrictEqual({ ok: true, value: `Generated route code written to ${out}` })
      expect(fs.existsSync(out)).toBe(true)
      expect(fs.readFileSync(out, 'utf-8')).toBe('')
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('propagates emit failure when output parent path is a regular file', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-route'))
    try {
      const blockingFile = path.join(dir, 'block')
      fs.writeFileSync(blockingFile, 'x')
      const out = path.join(blockingFile, 'foo.ts')
      const result = await route(openapi, { output: out })
      expect(result).toStrictEqual({
        ok: false,
        error: `EEXIST: file already exists, mkdir '${blockingFile}'`,
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate route code (split)', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-route'))
    try {
      const input = path.join(dir, 'openapi.json') as `${string}.yaml | ${string}.json`
      fs.writeFileSync(input, JSON.stringify(openapi))
      const outDir = path.join(dir, 'test')

      const result = await route(
        openapi,
        { output: outDir, split: true },
        {
          schemas: {
            output: path.join(dir, 'schemas'),
            split: true,
            import: '@packages/schemas',
          },
        },
      )

      const index = fs.readFileSync(path.join(outDir, 'index.ts'), 'utf-8')
      const indexExpected = `export * from './getHono'
export * from './getHonox'
export * from './getZodOpenapiHono'
`
      const getHono = fs.readFileSync(path.join(outDir, 'getHono.ts'), 'utf-8')
      const getHonox = fs.readFileSync(path.join(outDir, 'getHonox.ts'), 'utf-8')
      const getZod = fs.readFileSync(path.join(outDir, 'getZodOpenapiHono.ts'), 'utf-8')
      const getHonoExpected = `import { createRoute } from '@hono/zod-openapi'
import { HonoSchema } from '@packages/schemas'

export const getHonoRoute = createRoute({
  method: 'get',
  path: '/hono',
  tags: ['Hono'],
  operationId: 'HonoService_hono',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoSchema } },
    },
  },
})
`

      const getHonoxExpected = `import { createRoute } from '@hono/zod-openapi'
import { HonoXSchema } from '@packages/schemas'

export const getHonoxRoute = createRoute({
  method: 'get',
  path: '/honox',
  tags: ['Hono'],
  operationId: 'HonoXService_honox',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoXSchema } },
    },
  },
})
`

      const getZodExpected = `import { createRoute } from '@hono/zod-openapi'
import { ZodOpenAPIHonoSchema } from '@packages/schemas'

export const getZodOpenapiHonoRoute = createRoute({
  method: 'get',
  path: '/zod-openapi-hono',
  tags: ['Hono'],
  operationId: 'ZodOpenAPIHonoService_zod_openapi_hono',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: ZodOpenAPIHonoSchema } },
    },
  },
})
`

      expect(index).toBe(indexExpected)
      expect(getHono).toBe(getHonoExpected)
      expect(getHonox).toBe(getHonoxExpected)
      expect(getZod).toBe(getZodExpected)
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated route code written to ${outDir}/*.ts (index.ts included)`,
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  describe('caller ≡ generator contract', () => {
    it('non-split: caller emit contains same const names as generator output', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-route-contract-'))
      try {
        const out = path.join(dir, 'routes.ts')
        const result = await route(openapi, { output: out })
        expect(result.ok).toBe(true)
        const emitted = fs.readFileSync(out, 'utf-8')
        const generated = routeCode(openapi)
        const emittedNames = new Set(
          [...emitted.matchAll(/(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)Route\s*=/g)].map(
            (m) => m[1],
          ),
        )
        const generatedNames = new Set(
          [...generated.matchAll(/(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)Route\s*=/g)].map(
            (m) => m[1],
          ),
        )
        expect(emittedNames).toStrictEqual(generatedNames)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })

    it('split: union of per-file const names equals generator output const names', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-route-contract-'))
      try {
        const outDir = path.join(dir, 'routes')
        const result = await route(openapi, { output: outDir, split: true })
        expect(result.ok).toBe(true)
        const files = fs.readdirSync(outDir).filter((f) => f !== 'index.ts')
        const emittedNames = new Set<string>()
        for (const f of files) {
          const src = fs.readFileSync(path.join(outDir, f), 'utf-8')
          for (const m of src.matchAll(
            /(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)Route\s*=/g,
          )) {
            if (m[1] !== undefined) emittedNames.add(m[1])
          }
        }
        const generated = routeCode(openapi)
        const generatedNames = new Set(
          [...generated.matchAll(/(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)Route\s*=/g)].map(
            (m) => m[1],
          ),
        )
        expect(emittedNames).toStrictEqual(generatedNames)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })

    it('split: barrel index lists every per-file module sorted alphabetically', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-route-contract-'))
      try {
        const outDir = path.join(dir, 'routes')
        await route(openapi, { output: outDir, split: true })
        const indexContent = fs.readFileSync(path.join(outDir, 'index.ts'), 'utf-8')
        expect(indexContent).toBe(
          [
            "export * from './getHono'",
            "export * from './getHonox'",
            "export * from './getZodOpenapiHono'",
            '',
          ].join('\n'),
        )
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  describe('multi-method per path', () => {
    const multiMethodOpenAPI: OpenAPI = {
      openapi: '3.0.0',
      info: { title: 'T', version: '0.0.0' },
      paths: {
        '/r': {
          post: { operationId: 'cp', responses: { '201': { description: 'Created' } } },
          get: { operationId: 'cg', responses: { '200': { description: 'OK' } } },
        },
      },
    }

    it('split: each method on the same path becomes its own file', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-route-multimethod-'))
      try {
        const outDir = path.join(dir, 'routes')
        const result = await route(multiMethodOpenAPI, { output: outDir, split: true })
        expect(result.ok).toBe(true)
        const files = fs
          .readdirSync(outDir)
          .filter((f) => f !== 'index.ts')
          .sort()
        expect(files).toStrictEqual(['getR.ts', 'postR.ts'])
        const indexContent = fs.readFileSync(path.join(outDir, 'index.ts'), 'utf-8')
        expect(indexContent).toBe("export * from './getR'\nexport * from './postR'\n")
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })
})
