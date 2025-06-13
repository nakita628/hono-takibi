import type { OpenAPISpec } from '../../../types'
import type { Config } from '../../../config'
import { describe, it, expect } from 'vitest'
import { zodOpenAPIHono } from './zod-openapi-hono'
import { abcdeOpenAPI } from '../../../../data/abcde'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/zod-openapi-hono.test.ts

const generateZodOpenAPIHonoTestCases: {
  openAPISpec: OpenAPISpec
  config: Config
  expected: string
}[] = [
  // 1. schema: PascalCase, export: false; type: PascalCase, export: false
  {
    openAPISpec: abcdeOpenAPI,
    config: {
      schema: { name: 'PascalCase', export: false },
      type: { name: 'PascalCase', export: false },
    },
    expected: `import { createRoute, z } from '@hono/zod-openapi';

const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



const BSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



const CSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



const DSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



const ESchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')



export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:ASchema}},},}})`,
  },
  // 2. schema: PascalCase, export: true; type: PascalCase, export: false
  {
    openAPISpec: abcdeOpenAPI,
    config: {
      schema: { name: 'PascalCase', export: true },
      type: { name: 'PascalCase', export: false },
    },
    expected: `import { createRoute, z } from '@hono/zod-openapi';

export const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



export const BSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



export const CSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



export const DSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



export const ESchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')



export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:ASchema}},},}})`,
  },
  // 3. schema: PascalCase, export: false; type: PascalCase, export: true
  {
    openAPISpec: abcdeOpenAPI,
    config: {
      schema: { name: 'PascalCase', export: false },
      type: { name: 'PascalCase', export: true },
    },
    expected: `import { createRoute, z } from '@hono/zod-openapi';

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

export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:ASchema}},},}})`,
  },
  // 4. schema: PascalCase, export: true; type: PascalCase, export: true
  {
    openAPISpec: abcdeOpenAPI,
    config: {
      schema: { name: 'PascalCase', export: true },
      type: { name: 'PascalCase', export: true },
    },
    expected: `import { createRoute, z } from '@hono/zod-openapi';

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

export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:ASchema}},},}})`,
  },
  // 5. schema: PascalCase, export: false; type: camelCase, export: false
  {
    openAPISpec: abcdeOpenAPI,
    config: {
      schema: { name: 'PascalCase', export: false },
      type: { name: 'camelCase', export: false },
    },
    expected: `import { createRoute, z } from '@hono/zod-openapi';

const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



const BSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



const CSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



const DSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



const ESchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')



export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:ASchema}},},}})`,
  },
  // 6. schema: PascalCase, export: true; type: camelCase, export: false
  {
    openAPISpec: abcdeOpenAPI,
    config: {
      schema: { name: 'PascalCase', export: true },
      type: { name: 'camelCase', export: false },
    },
    expected: `import { createRoute, z } from '@hono/zod-openapi';

export const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



export const BSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



export const CSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



export const DSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



export const ESchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')



export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:ASchema}},},}})`,
  },
  // 7. schema: PascalCase, export: false; type: camelCase, export: true
  {
    openAPISpec: abcdeOpenAPI,
    config: {
      schema: { name: 'PascalCase', export: false },
      type: { name: 'camelCase', export: true },
    },
    expected: `import { createRoute, z } from '@hono/zod-openapi';

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

export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:ASchema}},},}})`,
  },
  // 8. schema: PascalCase, export: true; type: camelCase, export: true
  {
    openAPISpec: abcdeOpenAPI,
    config: {
      schema: { name: 'PascalCase', export: true },
      type: { name: 'camelCase', export: true },
    },
    expected: `import { createRoute, z } from '@hono/zod-openapi';

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

export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:ASchema}},},}})`,
  },
  // 9. schema: camelCase, export: false; type: camelCase, export: false
  {
    openAPISpec: abcdeOpenAPI,
    config: {
      schema: { name: 'camelCase', export: false },
      type: { name: 'camelCase', export: false },
    },
    expected: `import { createRoute, z } from '@hono/zod-openapi';

const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



const bSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



const cSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



const dSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



const eSchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')



export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:aSchema}},},}})`,
  },
  // 10. schema: camelCase, export: true; type: camelCase, export: false
  {
    openAPISpec: abcdeOpenAPI,
    config: {
      schema: { name: 'camelCase', export: true },
      type: { name: 'camelCase', export: false },
    },
    expected: `import { createRoute, z } from '@hono/zod-openapi';

export const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



export const bSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



export const cSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



export const dSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



export const eSchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')



export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:aSchema}},},}})`,
  },
  // 11. schema: camelCase, export: false; type: camelCase, export: true
  {
    openAPISpec: abcdeOpenAPI,
    config: {
      schema: { name: 'camelCase', export: false },
      type: { name: 'camelCase', export: true },
    },
    expected: `import { createRoute, z } from '@hono/zod-openapi';

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

export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:aSchema}},},}})`,
  },
  // 12. schema: camelCase, export: true; type: camelCase, export: true
  {
    openAPISpec: abcdeOpenAPI,
    config: {
      schema: { name: 'camelCase', export: true },
      type: { name: 'camelCase', export: true },
    },
    expected: `import { createRoute, z } from '@hono/zod-openapi';

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

export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:aSchema}},},}})`,
  },
  // 13. schema: camelCase, export: false; type: PascalCase, export: false
  {
    openAPISpec: abcdeOpenAPI,
    config: {
      schema: { name: 'camelCase', export: false },
      type: { name: 'PascalCase', export: false },
    },
    expected: `import { createRoute, z } from '@hono/zod-openapi';

const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



const bSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



const cSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



const dSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



const eSchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')



export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:aSchema}},},}})`,
  },
  // 14. schema: camelCase, export: true; type: PascalCase, export: false
  {
    openAPISpec: abcdeOpenAPI,
    config: {
      schema: { name: 'camelCase', export: true },
      type: { name: 'PascalCase', export: false },
    },
    expected: `import { createRoute, z } from '@hono/zod-openapi';

export const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



export const bSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



export const cSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



export const dSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



export const eSchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')



export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:aSchema}},},}})`,
  },
  // 15. schema: camelCase, export: false; type: PascalCase, export: true
  {
    openAPISpec: abcdeOpenAPI,
    config: {
      schema: { name: 'camelCase', export: false },
      type: { name: 'PascalCase', export: true },
    },
    expected: `import { createRoute, z } from '@hono/zod-openapi';

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

export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:aSchema}},},}})`,
  },
  // 16. schema: camelCase, export: true; type: PascalCase, export: true
  {
    openAPISpec: abcdeOpenAPI,
    config: {
      schema: { name: 'camelCase', export: true },
      type: { name: 'PascalCase', export: true },
    },
    expected: `import { createRoute, z } from '@hono/zod-openapi';

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

export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:aSchema}},},}})`,
  },
]

describe('generateZodOpenAPIHono', () => {
  it.concurrent.each(generateZodOpenAPIHonoTestCases)(
    'generateZodOpenAPIHono($openAPISpec, $config) -> $expected',
    async ({ openAPISpec, config, expected }) => {
      const result = zodOpenAPIHono(openAPISpec, config)
      expect(result).toBe(expected)
    },
  )
})
