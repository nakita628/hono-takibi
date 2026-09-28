import { describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../../../openapi/index.js'
import { app } from './index.js'

const openapi = {
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
} as OpenAPI

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
import{honoHandler,honoXHandler,zodOpenAPIHonoHandler}from'./handlers'

const app=new OpenAPIHono().basePath('/api')

export const api=app.route('/',honoHandler).route('/',honoXHandler).route('/',zodOpenAPIHonoHandler)

export default app`
    expect(result).toBe(expected)
  })

  it.concurrent('app with routeHandler=false and no basePath', () => {
    const result = app(openapi, 'routes.ts', '/', undefined, undefined, false)
    const expected = `import{OpenAPIHono}from'@hono/zod-openapi'
import{honoHandler,honoXHandler,zodOpenAPIHonoHandler}from'./handlers'

const app=new OpenAPIHono()

export const api=app.route('/',honoHandler).route('/',honoXHandler).route('/',zodOpenAPIHonoHandler)

export default app`
    expect(result).toBe(expected)
  })

  it.concurrent('app with routeHandler=false and pathAlias', () => {
    const result = app(openapi, 'src/routes/index.ts', '/api', '@/src', undefined, false)
    const expected = `import{OpenAPIHono}from'@hono/zod-openapi'
import{honoHandler,honoXHandler,zodOpenAPIHonoHandler}from'@/src/handlers'

const app=new OpenAPIHono().basePath('/api')

export const api=app.route('/',honoHandler).route('/',honoXHandler).route('/',zodOpenAPIHonoHandler)

export default app`
    expect(result).toBe(expected)
  })

  it.concurrent('app with routeHandler=false and trailing slash pathAlias', () => {
    const result = app(openapi, 'src/routes.ts', '/api', '@/', undefined, false)
    const expected = `import{OpenAPIHono}from'@hono/zod-openapi'
import{honoHandler,honoXHandler,zodOpenAPIHonoHandler}from'@/handlers'

const app=new OpenAPIHono().basePath('/api')

export const api=app.route('/',honoHandler).route('/',honoXHandler).route('/',zodOpenAPIHonoHandler)

export default app`
    expect(result).toBe(expected)
  })

  it.concurrent('app with routeHandler=false and output ending in /index.ts', () => {
    const result = app(openapi, 'src/routes/index.ts', '/', undefined, undefined, false)
    const expected = `import{OpenAPIHono}from'@hono/zod-openapi'
import{honoHandler,honoXHandler,zodOpenAPIHonoHandler}from'./handlers'

const app=new OpenAPIHono()

export const api=app.route('/',honoHandler).route('/',honoXHandler).route('/',zodOpenAPIHonoHandler)

export default app`
    expect(result).toBe(expected)
  })

  it.concurrent('app with define=true registers routes via openapiRoutes with as const', () => {
    const result = app(openapi, 'src/index.ts', '/api', undefined, undefined, false, true)
    const expected = `import{OpenAPIHono}from'@hono/zod-openapi'
import{getHonoRoute,getHonoXRoute,getZodOpenapiHonoRoute}from'./handlers'

const app=new OpenAPIHono().basePath('/api')

export const api=app.openapiRoutes([getHonoRoute,getHonoXRoute,getZodOpenapiHonoRoute] as const)

export default app`
    expect(result).toBe(expected)
  })

  it.concurrent('app with define=true and pathAlias imports handlers from alias', () => {
    const result = app(openapi, 'src/index.ts', '/', '@/', undefined, false, true)
    const expected = `import{OpenAPIHono}from'@hono/zod-openapi'
import{getHonoRoute,getHonoXRoute,getZodOpenapiHonoRoute}from'@/handlers'

const app=new OpenAPIHono()

export const api=app.openapiRoutes([getHonoRoute,getHonoXRoute,getZodOpenapiHonoRoute] as const)

export default app`
    expect(result).toBe(expected)
  })

  it.concurrent('app with define=true uses handlerModuleOverride for the routes module', () => {
    const result = app(openapi, 'src/index.ts', '/', undefined, undefined, false, true, './routes')
    const expected = `import{OpenAPIHono}from'@hono/zod-openapi'
import{getHonoRoute,getHonoXRoute,getZodOpenapiHonoRoute}from'./routes'

const app=new OpenAPIHono()

export const api=app.openapiRoutes([getHonoRoute,getHonoXRoute,getZodOpenapiHonoRoute] as const)

export default app`
    expect(result).toBe(expected)
  })
})

describe('app (split)', () => {
  const ok = { '200': { description: 'OK' } }
  // `/` and `/api/status` name no group: the root names nothing, and `api` is the name the
  // generated app has taken.
  // `/` と `/api/status` はグループ名にならない。ルートパスは何も指さず、`api` は生成される
  // アプリがすでに使っている名前である。
  const spec = {
    openapi: '3.1.0',
    info: { title: 'Library', version: '1.0.0' },
    paths: {
      '/': { get: { responses: ok } },
      '/books': { get: { tags: ['Library'], responses: ok }, post: { responses: ok } },
      '/books/{id}': { get: { responses: ok } },
      '/v2-public/ping': { get: { responses: ok } },
      '/api/status': { get: { responses: ok } },
    },
  } as OpenAPI
  // Every route belongs to a group.
  // すべてのルートが、いずれかのグループに属する。
  const grouped = {
    openapi: '3.1.0',
    info: { title: 'Library', version: '1.0.0' },
    paths: { '/books': { get: { responses: ok } }, '/items': { get: { responses: ok } } },
  } as OpenAPI

  // Every group is the app registering its routes; api holds the routes of no group and stands where the first of them does.
  // すべてのグループは、アプリが自身のルートを登録したものである。api はどのグループにも属さないルートを持ち、その最初のルートの位置に置かれる。
  it('registers each group on the app with routeHandler', () => {
    expect(
      app(
        spec,
        'src/routes.ts',
        '/api',
        undefined,
        undefined,
        true,
        false,
        undefined,
        undefined,
        true,
      ),
    ).toBe(`import{OpenAPIHono}from'@hono/zod-openapi'
import{getRoute,getBooksRoute,postBooksRoute,getBooksIdRoute,getV2PublicPingRoute,getApiStatusRoute}from'./routes'
import{getRouteHandler,getBooksRouteHandler,postBooksRouteHandler,getBooksIdRouteHandler,getV2PublicPingRouteHandler,getApiStatusRouteHandler}from'./handlers'

const app=new OpenAPIHono().basePath('/api')

export const api=app.openapi(getRoute,getRouteHandler)
.openapi(getApiStatusRoute,getApiStatusRouteHandler)

export const books=app.openapi(getBooksRoute,getBooksRouteHandler)
.openapi(postBooksRoute,postBooksRouteHandler)
.openapi(getBooksIdRoute,getBooksIdRouteHandler)

export const v2Public=app.openapi(getV2PublicPingRoute,getV2PublicPingRouteHandler)

export default app`)
  })

  // The same with the routes a handler file defines.
  // ハンドラーファイルが定義するルートでも、同様である。
  it('registers each group on the app with define', () => {
    expect(
      app(
        spec,
        'src/index.ts',
        '/api',
        undefined,
        undefined,
        false,
        true,
        undefined,
        undefined,
        true,
      ),
    ).toBe(`import{OpenAPIHono}from'@hono/zod-openapi'
import{getRoute,getBooksRoute,postBooksRoute,getBooksIdRoute,getV2PublicPingRoute,getApiStatusRoute}from'./handlers'

const app=new OpenAPIHono().basePath('/api')

export const api=app.openapiRoutes([getRoute,getApiStatusRoute] as const)

export const books=app.openapiRoutes([getBooksRoute,postBooksRoute,getBooksIdRoute] as const)

export const v2Public=app.openapiRoutes([getV2PublicPingRoute] as const)

export default app`)
  })

  // A handler file goes by the first tag, so GET /books is mounted as library. __root and api name no group and are mounted as api.
  // ハンドラーファイルは最初のタグで決まるため、GET /books は library としてマウントされる。__root と api はグループ名にならず、api としてマウントされる。
  it('mounts each handler file as a group where the handlers register their routes', () => {
    expect(
      app(
        spec,
        'src/routes.ts',
        '/api',
        undefined,
        undefined,
        false,
        false,
        undefined,
        undefined,
        true,
      ),
    ).toBe(`import{OpenAPIHono}from'@hono/zod-openapi'
import{__rootHandler,libraryHandler,booksHandler,v2PublicHandler,apiHandler}from'./handlers'

const app=new OpenAPIHono().basePath('/api')

export const api=app.route('/',__rootHandler).route('/',apiHandler)

export const library=app.route('/',libraryHandler)

export const books=app.route('/',booksHandler)

export const v2Public=app.route('/',v2PublicHandler)

export default app`)
  })

  // The files are the ones the handlers landed in, a hand-written one included.
  // ファイルは、ハンドラーが実際に置かれたものである。手書きのファイルも含まれる。
  it('mounts the handler files it is given', () => {
    expect(
      app(
        spec,
        'src/routes.ts',
        '/',
        undefined,
        undefined,
        false,
        false,
        undefined,
        ['books.ts', '__root.ts', 'admin.ts'],
        true,
      ),
    ).toBe(`import{OpenAPIHono}from'@hono/zod-openapi'
import{booksHandler,__rootHandler,adminHandler}from'./handlers'

const app=new OpenAPIHono()

export const books=app.route('/',booksHandler)

export const api=app.route('/',__rootHandler)

export const admin=app.route('/',adminHandler)

export default app`)
  })

  // api is the app as it stands: there is no route for it to register.
  // api は、そのままのアプリである。登録するルートがない。
  it('writes api last when every route belongs to a group', () => {
    expect(
      app(
        grouped,
        'src/routes.ts',
        '/',
        undefined,
        undefined,
        true,
        false,
        undefined,
        undefined,
        true,
      ),
    ).toBe(`import{OpenAPIHono}from'@hono/zod-openapi'
import{getBooksRoute,getItemsRoute}from'./routes'
import{getBooksRouteHandler,getItemsRouteHandler}from'./handlers'

const app=new OpenAPIHono()

export const books=app.openapi(getBooksRoute,getBooksRouteHandler)

export const items=app.openapi(getItemsRoute,getItemsRouteHandler)

export const api=app

export default app`)
  })

  // The same with define.
  // define でも同様である。
  it('writes api last with define when every route belongs to a group', () => {
    expect(
      app(
        grouped,
        'src/index.ts',
        '/',
        undefined,
        undefined,
        false,
        true,
        undefined,
        undefined,
        true,
      ),
    ).toBe(`import{OpenAPIHono}from'@hono/zod-openapi'
import{getBooksRoute,getItemsRoute}from'./handlers'

const app=new OpenAPIHono()

export const books=app.openapiRoutes([getBooksRoute] as const)

export const items=app.openapiRoutes([getItemsRoute] as const)

export const api=app

export default app`)
  })

  // Without split the app is one chain.
  // split がなければ、アプリは1本のチェーンになる。
  it('registers every route on api when the app is not split', () => {
    expect(
      app(
        grouped,
        'src/routes.ts',
        '/',
        undefined,
        undefined,
        true,
        false,
        undefined,
        undefined,
        false,
      ),
    ).toBe(`import{OpenAPIHono}from'@hono/zod-openapi'
import{getBooksRoute,getItemsRoute}from'./routes'
import{getBooksRouteHandler,getItemsRouteHandler}from'./handlers'

const app=new OpenAPIHono()

export const api=app.openapi(getBooksRoute,getBooksRouteHandler)
.openapi(getItemsRoute,getItemsRouteHandler)

export default app`)
  })
})
