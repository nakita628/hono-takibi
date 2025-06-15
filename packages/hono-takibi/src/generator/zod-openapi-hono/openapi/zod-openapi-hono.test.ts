import { describe, it, expect } from 'vitest'
import { zodOpenAPIHono } from './zod-openapi-hono'
import type { OpenAPI } from '../../../openapi'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/zod-openapi-hono.test.ts

const abcdeOpenAPI: OpenAPI = {
  openapi: '3.1.0',
  info: {
    title: 'Sample API',
    version: '1.0.0',
  },
  paths: {
    '/example': {
      get: {
        summary: 'Get example data',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/A',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      A: {
        type: 'object',
        required: ['a'],
        properties: {
          a: {
            type: 'string',
            example: 'a',
          },
        },
      },
      B: {
        type: 'object',
        required: ['b'],
        properties: {
          b: {
            type: 'string',
            example: 'b',
          },
        },
      },
      C: {
        type: 'object',
        required: ['c'],
        properties: {
          c: {
            type: 'string',
            example: 'c',
          },
        },
      },
      D: {
        type: 'object',
        required: ['d'],
        properties: {
          d: {
            type: 'string',
            example: 'd',
          },
        },
      },
      E: {
        type: 'object',
        required: ['e'],
        properties: {
          e: {
            type: 'string',
            example: 'e',
          },
        },
      },
    },
  },
}

describe('zodOpenAPIHono', () => {
  // 1. schema: PascalCase, export: false; type: PascalCase, export: false
  it.concurrent('zodOpenAPIHono PascalCase PascalCase false false', () => {
    const result = zodOpenAPIHono(abcdeOpenAPI, false, false, 'PascalCase', 'PascalCase')
    const expected = `import { createRoute, z } from '@hono/zod-openapi';

const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



const BSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



const CSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



const DSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



const ESchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')



export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:ASchema}},},}})`
  })
  // 2. schema: PascalCase, export: true; type: PascalCase, export: false
  it.concurrent('zodOpenAPIHono PascalCase PascalCase true false', () => {
    const result = zodOpenAPIHono(abcdeOpenAPI, true, false, 'PascalCase', 'PascalCase')
    const expected = `import { createRoute, z } from '@hono/zod-openapi';

export const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



export const BSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



export const CSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



export const DSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



export const ESchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')



export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:ASchema}},},}})`
    expect(result).toBe(expected)
  })

  // 3. schema: PascalCase, export: false; type: PascalCase, export: true
  it.concurrent('zodOpenAPIHono PascalCase PascalCase false true', () => {
    const result = zodOpenAPIHono(abcdeOpenAPI, false, true, 'PascalCase', 'PascalCase')
    const expected = `import { createRoute, z } from '@hono/zod-openapi';

const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

export type A = z.infer<typeof ASchema>

const BSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')

export type B = z.infer<typeof BSchema>

const CSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')

export type C = z.infer<typeof CSchema>

const DSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')

export type D = z.infer<typeof DSchema>

const ESchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')

export type E = z.infer<typeof ESchema>

export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:ASchema}},},}})`
    expect(result).toBe(expected)
  })
  // 4. schema: PascalCase, export: true; type: PascalCase, export: true
  it.concurrent('zodOpenAPIHono PascalCase PascalCase true true', () => {
    const result = zodOpenAPIHono(abcdeOpenAPI, true, true, 'PascalCase', 'PascalCase')
    const expected = `import { createRoute, z } from '@hono/zod-openapi';

export const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

export type A = z.infer<typeof ASchema>

export const BSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')

export type B = z.infer<typeof BSchema>

export const CSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')

export type C = z.infer<typeof CSchema>

export const DSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')

export type D = z.infer<typeof DSchema>

export const ESchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')

export type E = z.infer<typeof ESchema>

export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:ASchema}},},}})`
  })
  // 5. schema: PascalCase, export: false; type: camelCase, export: false
  it.concurrent('zodOpenAPIHono PascalCase camelCase false false', () => {
    const result = zodOpenAPIHono(abcdeOpenAPI, false, false, 'PascalCase', 'camelCase')
    const expected = `import { createRoute, z } from '@hono/zod-openapi';

const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



const BSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



const CSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



const DSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



const ESchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')



export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:ASchema}},},}})`
    expect(result).toBe(expected)
  })

  // 6. schema: PascalCase, export: true; type: camelCase, export: false
  it.concurrent('zodOpenAPIHono PascalCase camelCase true false', () => {
    const result = zodOpenAPIHono(abcdeOpenAPI, true, false, 'PascalCase', 'camelCase')
    const expected = `import { createRoute, z } from '@hono/zod-openapi';

export const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



export const BSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



export const CSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



export const DSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



export const ESchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')



export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:ASchema}},},}})`
    expect(result).toBe(expected)
  })

  // 7. schema: PascalCase, export: false; type: camelCase, export: true
  it.concurrent('zodOpenAPIHono PascalCase camelCase false true', () => {
    const result = zodOpenAPIHono(abcdeOpenAPI, false, true, 'PascalCase', 'camelCase')
    const expected = `import { createRoute, z } from '@hono/zod-openapi';

const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

export type a = z.infer<typeof ASchema>

const BSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')

export type b = z.infer<typeof BSchema>

const CSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')

export type c = z.infer<typeof CSchema>

const DSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')

export type d = z.infer<typeof DSchema>

const ESchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')

export type e = z.infer<typeof ESchema>

export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:ASchema}},},}})`
    expect(result).toBe(expected)
  })

  // 8. schema: PascalCase, export: true; type: camelCase, export: true
  it.concurrent('zodOpenAPIHono PascalCase camelCase true true', () => {
    const result = zodOpenAPIHono(abcdeOpenAPI, true, true, 'PascalCase', 'camelCase')
    const expected = `import { createRoute, z } from '@hono/zod-openapi';

export const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

export type a = z.infer<typeof ASchema>

export const BSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')

export type b = z.infer<typeof BSchema>

export const CSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')

export type c = z.infer<typeof CSchema>

export const DSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')

export type d = z.infer<typeof DSchema>

export const ESchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')

export type e = z.infer<typeof ESchema>

export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:ASchema}},},}})`
    expect(result).toBe(expected)
  })

  // 9. schema: camelCase, export: false; type: camelCase, export: false
  it.concurrent('zodOpenAPIHono camelCase camelCase false false', () => {
    const result = zodOpenAPIHono(abcdeOpenAPI, false, false, 'camelCase', 'camelCase')
    const expected = `import { createRoute, z } from '@hono/zod-openapi';

const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



const bSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



const cSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



const dSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



const eSchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')



export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:aSchema}},},}})`
    expect(result).toBe(expected)
  })

  // 10. schema: camelCase, export: true; type: camelCase, export: false
  it.concurrent('zodOpenAPIHono camelCase camelCase true false', () => {
    const result = zodOpenAPIHono(abcdeOpenAPI, true, false, 'camelCase', 'camelCase')
    const expected = `import { createRoute, z } from '@hono/zod-openapi';

export const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



export const bSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



export const cSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



export const dSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



export const eSchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')



export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:aSchema}},},}})`
    expect(result).toBe(expected)
  })

  // 11. schema: camelCase, export: false; type: camelCase, export: true
  it.concurrent('zodOpenAPIHono camelCase camelCase false true', () => {
    const result = zodOpenAPIHono(abcdeOpenAPI, false, true, 'camelCase', 'camelCase')
    const expected = `import { createRoute, z } from '@hono/zod-openapi';

const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

export type a = z.infer<typeof aSchema>

const bSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')

export type b = z.infer<typeof bSchema>

const cSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')

export type c = z.infer<typeof cSchema>

const dSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')

export type d = z.infer<typeof dSchema>

const eSchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')

export type e = z.infer<typeof eSchema>

export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:aSchema}},},}})`
    expect(result).toBe(expected)
  })

  // 12. schema: camelCase, export: true; type: camelCase, export: true
  it.concurrent('zodOpenAPIHono camelCase camelCase true true', () => {
    const result = zodOpenAPIHono(abcdeOpenAPI, true, true, 'camelCase', 'camelCase')
    const expected = `import { createRoute, z } from '@hono/zod-openapi';

export const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

export type a = z.infer<typeof aSchema>

export const bSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')

export type b = z.infer<typeof bSchema>

export const cSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')

export type c = z.infer<typeof cSchema>

export const dSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')

export type d = z.infer<typeof dSchema>

export const eSchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')

export type e = z.infer<typeof eSchema>

export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:aSchema}},},}})`
    expect(result).toBe(expected)
  })

  // 13. schema: camelCase, export: false; type: PascalCase, export: false
  it.concurrent('zodOpenAPIHono camelCase PascalCase false false', () => {
    const result = zodOpenAPIHono(abcdeOpenAPI, false, false, 'camelCase', 'PascalCase')
    const expected = `import { createRoute, z } from '@hono/zod-openapi';

const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



const bSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



const cSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



const dSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



const eSchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')



export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:aSchema}},},}})`
    expect(result).toBe(expected)
  })

  // 14. schema: camelCase, export: true; type: PascalCase, export: false
  it.concurrent('zodOpenAPIHono camelCase PascalCase true false', () => {
    const result = zodOpenAPIHono(abcdeOpenAPI, true, false, 'camelCase', 'PascalCase')
    const expected = `import { createRoute, z } from '@hono/zod-openapi';

export const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



export const bSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



export const cSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



export const dSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



export const eSchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')



export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:aSchema}},},}})`
    expect(result).toBe(expected)
  })

  // 15. schema: camelCase, export: false; type: PascalCase, export: true
  it.concurrent('zodOpenAPIHono camelCase PascalCase false true', () => {
    const result = zodOpenAPIHono(abcdeOpenAPI, false, true, 'camelCase', 'PascalCase')
    const expected = `import { createRoute, z } from '@hono/zod-openapi';

const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

export type A = z.infer<typeof aSchema>

const bSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')

export type B = z.infer<typeof bSchema>

const cSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')

export type C = z.infer<typeof cSchema>

const dSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')

export type D = z.infer<typeof dSchema>

const eSchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')

export type E = z.infer<typeof eSchema>

export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:aSchema}},},}})`
    expect(result).toBe(expected)
  })

  // 16. schema: camelCase, export: true; type: PascalCase, export: true
  it.concurrent('zodOpenAPIHono camelCase PascalCase true true', () => {
    const result = zodOpenAPIHono(abcdeOpenAPI, true, true, 'camelCase', 'PascalCase')
    const expected = `import { createRoute, z } from '@hono/zod-openapi';

export const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

export type A = z.infer<typeof aSchema>

export const bSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')

export type B = z.infer<typeof bSchema>

export const cSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')

export type C = z.infer<typeof cSchema>

export const dSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')

export type D = z.infer<typeof dSchema>

export const eSchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')

export type E = z.infer<typeof eSchema>

export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:aSchema}},},}})`
    expect(result).toBe(expected)
  })
})
