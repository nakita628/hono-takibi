import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../../openapi'
import { zodOpenAPIHono } from './index.js'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/index.test.ts

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
  // #1: exportSchema=true, exportType=true
  it.concurrent('zodOpenAPIHono exportSchema=true, exportType=true', () => {
    const result = zodOpenAPIHono(abcdeOpenAPI, true, true)
    const expected = `import { createRoute, z } from '@hono/zod-openapi'

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

    expect(result).toBe(expected)
  })
  // #2: exportSchema=true, exportType=false
  it.concurrent('zodOpenAPIHono exportSchema=true, exportType=false', () => {
    const result = zodOpenAPIHono(abcdeOpenAPI, true, false)
    const expected = `import { createRoute, z } from '@hono/zod-openapi'

export const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



export const BSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



export const CSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



export const DSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



export const ESchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')



export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:ASchema}},},}})`
    expect(result).toBe(expected)
  })
  // #3: exportSchema=false, exportType=true
  it.concurrent('zodOpenAPIHono exportSchema=false, exportType=true', () => {
    const result = zodOpenAPIHono(abcdeOpenAPI, false, true)
    const expected = `import { createRoute, z } from '@hono/zod-openapi'

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
  // #4: exportSchema=false, exportType=false
  it.concurrent('exportSchema=false, exportType=false', () => {
    const result = zodOpenAPIHono(abcdeOpenAPI, false, false)
    const expected = `import { createRoute, z } from '@hono/zod-openapi'

const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



const BSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



const CSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



const DSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



const ESchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')



export const getExampleRoute=createRoute({method:'get',path:'/example',summary:'Get example data',responses:{200:{description:'OK',content:{'application/json':{schema:ASchema}},},}})`
    expect(result).toBe(expected)
  })
})
