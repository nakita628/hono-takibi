import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../../openapi/index.js'
import { app } from './index.js'

const openapi: OpenAPI = {
  openapi: '3.1.0',
  info: {
    title: 'HonoTakibi',
    version: 'v1',
  },
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
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Hono',
                    },
                  },
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
                  properties: {
                    message: {
                      type: 'string',
                      example: 'HonoX',
                    },
                  },
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
                  properties: {
                    message: {
                      type: 'string',
                      example: 'ZodOpenAPIHono',
                    },
                  },
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

describe('app', () => {
  it.concurrent('app Test', () => {
    const result = app(openapi, 'app.ts', '/api', undefined, undefined, true)
    const expected = `import{OpenAPIHono}from'@hono/zod-openapi'
import{getHonoRoute,getHonoXRoute,getZodOpenapiHonoRoute}from'./app'
import{getHonoRouteHandler,getHonoXRouteHandler,getZodOpenapiHonoRouteHandler}from'./handlers'

const app=new OpenAPIHono().basePath('/api')

export const api=app.openapi(getHonoRoute,getHonoRouteHandler)
.openapi(getHonoXRoute,getHonoXRouteHandler)
.openapi(getZodOpenapiHonoRoute,getZodOpenapiHonoRouteHandler)

export default app`
    expect(result).toBe(expected)
  })

  it.concurrent('app with output ending in /index.ts uses directory name for import', () => {
    const result = app(openapi, 'src/routes/index.ts', '/api', undefined, undefined, true)
    const expected = `import{OpenAPIHono}from'@hono/zod-openapi'
import{getHonoRoute,getHonoXRoute,getZodOpenapiHonoRoute}from'./routes'
import{getHonoRouteHandler,getHonoXRouteHandler,getZodOpenapiHonoRouteHandler}from'./handlers'

const app=new OpenAPIHono().basePath('/api')

export const api=app.openapi(getHonoRoute,getHonoRouteHandler)
.openapi(getHonoXRoute,getHonoXRouteHandler)
.openapi(getZodOpenapiHonoRoute,getZodOpenapiHonoRouteHandler)

export default app`
    expect(result).toBe(expected)
  })

  it.concurrent('app with output ending in /index.ts and pathAlias', () => {
    const result = app(openapi, 'src/routes/index.ts', '/api', '@/src', undefined, true)
    const expected = `import{OpenAPIHono}from'@hono/zod-openapi'
import{getHonoRoute,getHonoXRoute,getZodOpenapiHonoRoute}from'@/src/routes'
import{getHonoRouteHandler,getHonoXRouteHandler,getZodOpenapiHonoRouteHandler}from'@/src/handlers'

const app=new OpenAPIHono().basePath('/api')

export const api=app.openapi(getHonoRoute,getHonoRouteHandler)
.openapi(getHonoXRoute,getHonoXRouteHandler)
.openapi(getZodOpenapiHonoRoute,getZodOpenapiHonoRouteHandler)

export default app`
    expect(result).toBe(expected)
  })

  it.concurrent('app with routeImport overrides route module specifier', () => {
    const result = app(openapi, 'src/routes.ts', '/api', '@/', '@packages/routes', true)
    const expected = `import{OpenAPIHono}from'@hono/zod-openapi'
import{getHonoRoute,getHonoXRoute,getZodOpenapiHonoRoute}from'@packages/routes'
import{getHonoRouteHandler,getHonoXRouteHandler,getZodOpenapiHonoRouteHandler}from'@/handlers'

const app=new OpenAPIHono().basePath('/api')

export const api=app.openapi(getHonoRoute,getHonoRouteHandler)
.openapi(getHonoXRoute,getHonoXRouteHandler)
.openapi(getZodOpenapiHonoRoute,getZodOpenapiHonoRouteHandler)

export default app`
    expect(result).toBe(expected)
  })

  it.concurrent('app with routeImport without pathAlias uses relative handler path', () => {
    const result = app(openapi, 'src/routes.ts', '/api', undefined, '@packages/routes', true)
    const expected = `import{OpenAPIHono}from'@hono/zod-openapi'
import{getHonoRoute,getHonoXRoute,getZodOpenapiHonoRoute}from'@packages/routes'
import{getHonoRouteHandler,getHonoXRouteHandler,getZodOpenapiHonoRouteHandler}from'./handlers'

const app=new OpenAPIHono().basePath('/api')

export const api=app.openapi(getHonoRoute,getHonoRouteHandler)
.openapi(getHonoXRoute,getHonoXRouteHandler)
.openapi(getZodOpenapiHonoRoute,getZodOpenapiHonoRouteHandler)

export default app`
    expect(result).toBe(expected)
  })

  it.concurrent('app with trailing slash pathAlias normalizes to no double slash', () => {
    const result = app(openapi, 'src/routes.ts', '/api', '@/', undefined, true)
    const expected = `import{OpenAPIHono}from'@hono/zod-openapi'
import{getHonoRoute,getHonoXRoute,getZodOpenapiHonoRoute}from'@/routes'
import{getHonoRouteHandler,getHonoXRouteHandler,getZodOpenapiHonoRouteHandler}from'@/handlers'

const app=new OpenAPIHono().basePath('/api')

export const api=app.openapi(getHonoRoute,getHonoRouteHandler)
.openapi(getHonoXRoute,getHonoXRouteHandler)
.openapi(getZodOpenapiHonoRoute,getZodOpenapiHonoRouteHandler)

export default app`
    expect(result).toBe(expected)
  })

  it.concurrent('app with routeImport and routes/index.ts output', () => {
    const result = app(openapi, 'src/routes/index.ts', '/api', '@/', '@packages/routes', true)
    const expected = `import{OpenAPIHono}from'@hono/zod-openapi'
import{getHonoRoute,getHonoXRoute,getZodOpenapiHonoRoute}from'@packages/routes'
import{getHonoRouteHandler,getHonoXRouteHandler,getZodOpenapiHonoRouteHandler}from'@/handlers'

const app=new OpenAPIHono().basePath('/api')

export const api=app.openapi(getHonoRoute,getHonoRouteHandler)
.openapi(getHonoXRoute,getHonoXRouteHandler)
.openapi(getZodOpenapiHonoRoute,getZodOpenapiHonoRouteHandler)

export default app`
    expect(result).toBe(expected)
  })

  it.concurrent('app with routeHandler=false generates sub-router index', () => {
    const result = app(openapi, 'app.ts', '/api', undefined, undefined, false)
    const expected = `import{OpenAPIHono}from'@hono/zod-openapi'
import{honoHandler,honoXHandler,zodOpenapiHonoHandler}from'./handlers'

const app=new OpenAPIHono().basePath('/api')

export const api=app.route('/',honoHandler).route('/',honoXHandler).route('/',zodOpenapiHonoHandler)

export default app`
    expect(result).toBe(expected)
  })

  it.concurrent('app with routeHandler=false and no basePath', () => {
    const result = app(openapi, 'routes.ts', '/', undefined, undefined, false)
    const expected = `import{OpenAPIHono}from'@hono/zod-openapi'
import{honoHandler,honoXHandler,zodOpenapiHonoHandler}from'./handlers'

const app=new OpenAPIHono()

export const api=app.route('/',honoHandler).route('/',honoXHandler).route('/',zodOpenapiHonoHandler)

export default app`
    expect(result).toBe(expected)
  })

  it.concurrent('app with routeHandler=false and pathAlias', () => {
    const result = app(openapi, 'src/routes/index.ts', '/api', '@/src', undefined, false)
    const expected = `import{OpenAPIHono}from'@hono/zod-openapi'
import{honoHandler,honoXHandler,zodOpenapiHonoHandler}from'@/src/handlers'

const app=new OpenAPIHono().basePath('/api')

export const api=app.route('/',honoHandler).route('/',honoXHandler).route('/',zodOpenapiHonoHandler)

export default app`
    expect(result).toBe(expected)
  })

  it.concurrent('app with routeHandler=false and trailing slash pathAlias', () => {
    const result = app(openapi, 'src/routes.ts', '/api', '@/', undefined, false)
    const expected = `import{OpenAPIHono}from'@hono/zod-openapi'
import{honoHandler,honoXHandler,zodOpenapiHonoHandler}from'@/handlers'

const app=new OpenAPIHono().basePath('/api')

export const api=app.route('/',honoHandler).route('/',honoXHandler).route('/',zodOpenapiHonoHandler)

export default app`
    expect(result).toBe(expected)
  })

  it.concurrent('app with routeHandler=false and output ending in /index.ts', () => {
    const result = app(openapi, 'src/routes/index.ts', '/', undefined, undefined, false)
    const expected = `import{OpenAPIHono}from'@hono/zod-openapi'
import{honoHandler,honoXHandler,zodOpenapiHonoHandler}from'./handlers'

const app=new OpenAPIHono()

export const api=app.route('/',honoHandler).route('/',honoXHandler).route('/',zodOpenapiHonoHandler)

export default app`
    expect(result).toBe(expected)
  })
})
