import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, it } from 'vitest'
import type { OpenAPI } from '../openapi'

// import { schemas } from './schemas'

// Test run
// pnpm vitest run ./src/core/schemas.test.ts

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
    },
  },
}

describe('schema() (sandbox)', () => {
  it('generates schema (exportType: true, split: false)', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-schema-'))
    //     try {
    //       const input = path.join(dir, 'openapi.json') as `${string}.yaml | ${string}.json`
    //       fs.writeFileSync(input, JSON.stringify(openapi))
    //       const out = path.join(dir, 'index.ts')

    //       const result = await schemas(input, out, true)
    //       const index = fs.readFileSync(out, 'utf-8')

    //       const indexExpected = `import { z } from '@hono/zod-openapi'

    // export const HonoSchema = z.object({ hono: z.literal('Hono') }).openapi('Hono')

    // export type Hono = z.infer<typeof HonoSchema>

    // export const ZodOpenAPIHonoSchema = z
    //   .object({ 'zod-openapi-hono': z.literal('ZodOpenAPIHono') })
    //   .openapi('ZodOpenAPIHono')

    // export type ZodOpenAPIHono = z.infer<typeof ZodOpenAPIHonoSchema>

    // export const HonoXSchema = z.object({ honoX: z.literal('HonoX') }).openapi('HonoX')

    // export type HonoX = z.infer<typeof HonoXSchema>

    // export const HonoUnionSchema = z
    //   .object({ 'hono-union': z.union([HonoSchema, HonoXSchema, ZodOpenAPIHonoSchema]) })
    //   .openapi('HonoUnion')

    // export type HonoUnion = z.infer<typeof HonoUnionSchema>
    // `
    //       expect(index).toBe(indexExpected)
    //       expect(result).toStrictEqual({
    //         ok: true,
    //         value: `Generated schema code written to ${out}`,
    //       })
    //     } finally {
    //       fs.rmSync(dir, { recursive: true, force: true })
    //     }
    //   })

    //   it('generates schema (exportType: false, split: false)', async () => {
    //     const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-schema-'))
    //     try {
    //       const input = path.join(dir, 'openapi.json') as `${string}.yaml | ${string}.json`
    //       fs.writeFileSync(input, JSON.stringify(openapi))
    //       const out = path.join(dir, 'index.ts')

    //       const result = await schemas(input, out, false)
    //       const index = fs.readFileSync(out, 'utf-8')
    //       const indexExpected = `import { z } from '@hono/zod-openapi'

    // export const HonoSchema = z.object({ hono: z.literal('Hono') }).openapi('Hono')

    // export const ZodOpenAPIHonoSchema = z
    //   .object({ 'zod-openapi-hono': z.literal('ZodOpenAPIHono') })
    //   .openapi('ZodOpenAPIHono')

    // export const HonoXSchema = z.object({ honoX: z.literal('HonoX') }).openapi('HonoX')

    // export const HonoUnionSchema = z
    //   .object({ 'hono-union': z.union([HonoSchema, HonoXSchema, ZodOpenAPIHonoSchema]) })
    //   .openapi('HonoUnion')
    // `

    //       expect(index).toBe(indexExpected)
    //       expect(result).toStrictEqual({
    //         ok: true,
    //         value: `Generated schema code written to ${out}`,
    //       })
    //     } finally {
    //       fs.rmSync(dir, { recursive: true, force: true })
    //     }
    //   })

    //   it('generates schema (exportType: false, split: true)', async () => {
    //     const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-schema-'))
    //     try {
    //       const input = path.join(dir, 'openapi.json') as `${string}.yaml | ${string}.json`
    //       fs.writeFileSync(input, JSON.stringify(openapi))
    //       const outDir = path.join(dir, 'test')

    //       const result = await schemas(input, outDir, false, true)

    //       const index = fs.readFileSync(path.join(outDir, 'index.ts'), 'utf-8')
    //       const indexExpected = `export * from './hono'
    // export * from './honoUnion'
    // export * from './honoX'
    // export * from './zodOpenAPIHono'
    // `
    //       expect(index).toBe(indexExpected)

    //       const hono = fs.readFileSync(path.join(outDir, 'hono.ts'), 'utf-8')
    //       const honoExpected = `import { z } from '@hono/zod-openapi'

    // export const HonoSchema = z.object({ hono: z.literal('Hono') }).openapi('Hono')
    // `
    //       expect(hono).toBe(honoExpected)

    //       const honox = fs.readFileSync(path.join(outDir, 'honoX.ts'), 'utf-8')
    //       const honoxExpected = `import { z } from '@hono/zod-openapi'

    // export const HonoXSchema = z.object({ honoX: z.literal('HonoX') }).openapi('HonoX')
    // `
    //       expect(honox).toBe(honoxExpected)

    //       const zod = fs.readFileSync(path.join(outDir, 'zodOpenAPIHono.ts'), 'utf-8')
    //       const zodExpected = `import { z } from '@hono/zod-openapi'

    // export const ZodOpenAPIHonoSchema = z
    //   .object({ 'zod-openapi-hono': z.literal('ZodOpenAPIHono') })
    //   .openapi('ZodOpenAPIHono')
    // `
    //       expect(zod).toBe(zodExpected)

    //       expect(result).toStrictEqual({
    //         ok: true,
    //         value: `Generated schema code written to ${outDir}/*.ts (index.ts included)`,
    //       })
    //     } finally {
    //       fs.rmSync(dir, { recursive: true, force: true })
    //     }
    //   })

    //   it('generates schema (exportType: true, split: true)', async () => {
    //     const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-schema-'))
    //     try {
    //       const input = path.join(dir, 'openapi.json') as `${string}.yaml | ${string}.json`
    //       fs.writeFileSync(input, JSON.stringify(openapi))
    //       const outDir = path.join(dir, 'test')

    //       const result = await schemas(input, outDir, true, true)

    //       const index = fs.readFileSync(path.join(outDir, 'index.ts'), 'utf-8')
    //       const indexExpected = `export * from './hono'
    // export * from './honoUnion'
    // export * from './honoX'
    // export * from './zodOpenAPIHono'
    // `
    //       expect(index).toBe(indexExpected)

    //       const hono = fs.readFileSync(path.join(outDir, 'hono.ts'), 'utf-8')
    //       const honoExpected = `import { z } from '@hono/zod-openapi'

    // export const HonoSchema = z.object({ hono: z.literal('Hono') }).openapi('Hono')

    // export type Hono = z.infer<typeof HonoSchema>
    // `
    //       expect(hono).toBe(honoExpected)

    //       const honox = fs.readFileSync(path.join(outDir, 'honoX.ts'), 'utf-8')
    //       const honoxExpected = `import { z } from '@hono/zod-openapi'

    // export const HonoXSchema = z.object({ honoX: z.literal('HonoX') }).openapi('HonoX')

    // export type HonoX = z.infer<typeof HonoXSchema>
    // `
    //       expect(honox).toBe(honoxExpected)

    //       const zod = fs.readFileSync(path.join(outDir, 'zodOpenAPIHono.ts'), 'utf-8')
    //       const zodExpected = `import { z } from '@hono/zod-openapi'

    // export const ZodOpenAPIHonoSchema = z
    //   .object({ 'zod-openapi-hono': z.literal('ZodOpenAPIHono') })
    //   .openapi('ZodOpenAPIHono')

    // export type ZodOpenAPIHono = z.infer<typeof ZodOpenAPIHonoSchema>
    // `
    //       expect(zod).toBe(zodExpected)

    //       expect(result).toStrictEqual({
    //         ok: true,
    //         value: `Generated schema code written to ${outDir}/*.ts (index.ts included)`,
    //       })
    //     } finally {
    //       fs.rmSync(dir, { recursive: true, force: true })
    //     }
  })
})
