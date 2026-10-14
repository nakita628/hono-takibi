import { describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../../../openapi/index.js'
import { app, appGroups } from './index.js'

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
  // `/` is the group `__root`, and `/api/status` the group `api`.
  // `/` は `__root` グループ、`/api/status` は `api` グループになる。
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

  // Every group is the app registering its routes, in the order their first route stands in the document.
  // すべてのグループは、アプリが自身のルートを登録したものであり、最初のルートが文書に現れる順に並ぶ。
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

export const __root=app.openapi(getRoute,getRouteHandler)

export const books=app.openapi(getBooksRoute,getBooksRouteHandler)
.openapi(postBooksRoute,postBooksRouteHandler)
.openapi(getBooksIdRoute,getBooksIdRouteHandler)

export const v2Public=app.openapi(getV2PublicPingRoute,getV2PublicPingRouteHandler)

export const api=app.openapi(getApiStatusRoute,getApiStatusRouteHandler)

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

export const __root=app.openapiRoutes([getRoute] as const)

export const books=app.openapiRoutes([getBooksRoute,postBooksRoute,getBooksIdRoute] as const)

export const v2Public=app.openapiRoutes([getV2PublicPingRoute] as const)

export const api=app.openapiRoutes([getApiStatusRoute] as const)

export default app`)
  })

  // A handler file goes by the first tag, so GET /books is mounted as library. __root is mounted as __root, api.ts as api.
  // ハンドラーファイルは最初のタグで決まるため、GET /books は library としてマウントされる。__root.ts は __root、api.ts は api としてマウントされる。
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

export const __root=app.route('/',__rootHandler)

export const library=app.route('/',libraryHandler)

export const books=app.route('/',booksHandler)

export const v2Public=app.route('/',v2PublicHandler)

export const api=app.route('/',apiHandler)

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

export const __root=app.route('/',__rootHandler)

export const admin=app.route('/',adminHandler)

export default app`)
  })

  // There is no route of __root, so there is no __root.
  // ルートのパスはないので、__root もない。
  it('writes the groups alone when no route belongs to __root', () => {
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

export default app`)
  })

  // The same with define.
  // define でも同様である。
  it('writes the groups alone with define when no route belongs to __root', () => {
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

  // The shape of a studio API: /client is a group like /schema and /db, exported as client.
  // スタジオ API の形。/client は /schema や /db と同じグループであり、client として export される。
  it('exports the group client of a studio API under its name', () => {
    const studio = {
      openapi: '3.1.0',
      info: { title: 'Studio', version: '1.0.0' },
      paths: {
        '/schema': { get: { tags: ['schema'], responses: ok } },
        '/db/counts': { get: { tags: ['db'], responses: ok } },
        '/client': { get: { tags: ['client'], responses: ok } },
        '/client/run': { post: { tags: ['client'], responses: ok } },
      },
    } as OpenAPI
    expect(
      app(
        studio,
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
import{getSchemaRoute,getDbCountsRoute,getClientRoute,postClientRunRoute}from'./routes'
import{getSchemaRouteHandler,getDbCountsRouteHandler,getClientRouteHandler,postClientRunRouteHandler}from'./handlers'

const app=new OpenAPIHono().basePath('/api')

export const schema=app.openapi(getSchemaRoute,getSchemaRouteHandler)

export const db=app.openapi(getDbCountsRoute,getDbCountsRouteHandler)

export const client=app.openapi(getClientRoute,getClientRouteHandler)
.openapi(postClientRunRoute,postClientRunRouteHandler)

export default app`)
  })

  // The entry binds app and OpenAPIHono for itself; a group of one of these names keeps it, and the binding counts up. api is a group like any other.
  // エントリは app と OpenAPIHono を自分で束縛する。その名前のグループはそれを保ち、束縛側が数字を足す。api は他と同じグループである。
  it('yields app and OpenAPIHono to the groups of those names', () => {
    const taken = {
      openapi: '3.1.0',
      info: { title: 'Taken', version: '1.0.0' },
      paths: {
        '/': { get: { responses: ok } },
        '/app/x': { get: { responses: ok } },
        '/api/x': { get: { responses: ok } },
        '/OpenAPIHono/x': { get: { responses: ok } },
      },
    } as OpenAPI
    expect(
      app(
        taken,
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
    ).toBe(`import{OpenAPIHono as OpenAPIHono2}from'@hono/zod-openapi'
import{getRoute,getAppXRoute,getApiXRoute,getOpenAPIHonoXRoute}from'./routes'
import{getRouteHandler,getAppXRouteHandler,getApiXRouteHandler,getOpenAPIHonoXRouteHandler}from'./handlers'

const app2=new OpenAPIHono2()

export const __root=app2.openapi(getRoute,getRouteHandler)

export const app=app2.openapi(getAppXRoute,getAppXRouteHandler)

export const api=app2.openapi(getApiXRoute,getApiXRouteHandler)

export const OpenAPIHono=app2.openapi(getOpenAPIHonoXRoute,getOpenAPIHonoXRouteHandler)

export default app2`)
  })

  // The same names, where the handler files register their routes.
  // ハンドラーファイルがルートを登録する形でも、同じ名前になる。
  it('yields app to a handler file of that name', () => {
    expect(
      app(
        grouped,
        'src/routes.ts',
        '/',
        undefined,
        undefined,
        false,
        false,
        undefined,
        ['__root.ts', 'app.ts', 'api.ts'],
        true,
      ),
    ).toBe(`import{OpenAPIHono}from'@hono/zod-openapi'
import{__rootHandler,appHandler,apiHandler}from'./handlers'

const app2=new OpenAPIHono()

export const __root=app2.route('/',__rootHandler)

export const app=app2.route('/',appHandler)

export const api=app2.route('/',apiHandler)

export default app2`)
  })

  // The groups, as the merge of the entry asks for them: by path, or by handler file.
  // エントリのマージが求める形のグループ。パスによるものと、ハンドラーファイルによるもの。
  it('lists the groups of a split app', () => {
    expect(appGroups(spec, false, undefined, true)).toStrictEqual([
      '__root',
      'books',
      'v2Public',
      'api',
    ])
    expect(appGroups(spec, true, undefined, true)).toStrictEqual([
      '__root',
      'library',
      'books',
      'v2Public',
      'api',
    ])
    expect(appGroups(spec, true, ['books.ts', '__root.ts'], true)).toStrictEqual([
      'books',
      '__root',
    ])
    expect(appGroups(spec, false, undefined, false)).toStrictEqual([])
  })
})
