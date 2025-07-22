import { describe, it, expect } from 'vitest'
import { handlerName, handler, importHandlers, groupHandlersByFileName, getHandlerImports } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/handler/utils/index.test.ts

describe('utils', () => {
  // handlerName
  describe('handlerName', () => {
    it.concurrent(`handlerName('get', '/') -> 'getRouteHandler'`, () => {
      const result = handlerName('get', '/')
      const expected = 'getRouteHandler'
      expect(result).toBe(expected)
    })
    it.concurrent(`handlerName('post', '/posts') -> 'postPostsRouteHandler'`, () => {
      const result = handlerName('post', '/posts')
      const expected = 'postPostsRouteHandler'
      expect(result).toBe(expected)
    })
    it.concurrent(`handlerName('put', '/posts/{id}') -> 'putPostsIdRouteHandler'`, () => {
      const result = handlerName('put', '/posts/{id}')
      const expected = 'putPostsIdRouteHandler'
      expect(result).toBe(expected)
    })
    it.concurrent(`handlerName('delete', '/posts/{id}') -> 'deletePostsIdRouteHandler'`, () => {
      const result = handlerName('delete', '/posts/{id}')
      const expected = 'deletePostsIdRouteHandler'
      expect(result).toBe(expected)
    })
  })

  // handler
  describe('handler', () => {
    it.concurrent('generateHandler Test', () => {
      const result = handler('getRouteHandler', 'getRoute')
      const expected = 'export const getRouteHandler:RouteHandler<typeof getRoute>=async(c)=>{}'
      expect(result).toBe(expected)
    })
  })

  // importHandlers
  describe('importHandlers', () => {
    it.concurrent('importHandlers Test', () => {
      const result = importHandlers(
        {
          'honoHandler.ts': ['getHonoRouteHandler'],
          'honoXHandler.ts': ['getHonoXRouteHandler'],
          'zodOpenapiHonoHandler.ts': ['getZodOpenapiHonoRouteHandler'],
        },
        'src/routes.ts',
      )
      const expected = [
        "import { getHonoRouteHandler } from './handlers/honoHandler.ts';",
        "import { getHonoXRouteHandler } from './handlers/honoXHandler.ts';",
        "import { getZodOpenapiHonoRouteHandler } from './handlers/zodOpenapiHonoHandler.ts';",
      ]
      expect(result).toStrictEqual(expected)
    })
  })

  // groupHandlersByFileName
  describe('groupHandlersByFileName', () => {
    it.concurrent('groupHandlersByFileName Test', () => {
      const result = groupHandlersByFileName([
        {
          fileName: 'honoHandler.ts',
          testFileName: 'honoHandler.test.ts',
          routeHandlerContents: [
            'export const getHonoRouteHandler:RouteHandler<typeof getHonoRoute>=async(c)=>{}',
          ],
          routeNames: ['getHonoRoute'],
        },
        {
          fileName: 'honoXHandler.ts',
          testFileName: 'honoXHandler.test.ts',
          routeHandlerContents: [
            'export const getHonoXRouteHandler:RouteHandler<typeof getHonoXRoute>=async(c)=>{}',
          ],
          routeNames: ['getHonoXRoute'],
        },
        {
          fileName: 'zodOpenapiHonoHandler.ts',
          testFileName: 'zodOpenapiHonoHandler.test.ts',
          routeHandlerContents: [
            'export const getZodOpenapiHonoRouteHandler:RouteHandler<typeof getZodOpenapiHonoRoute>=async(c)=>{}',
          ],
          routeNames: ['getZodOpenapiHonoRoute'],
        },
      ])

      const expected = [
        {
          fileName: 'honoHandler.ts',
          testFileName: 'honoHandler.test.ts',
          routeHandlerContents: [
            'export const getHonoRouteHandler:RouteHandler<typeof getHonoRoute>=async(c)=>{}',
          ],
          routeNames: ['getHonoRoute'],
        },
        {
          fileName: 'honoXHandler.ts',
          testFileName: 'honoXHandler.test.ts',
          routeHandlerContents: [
            'export const getHonoXRouteHandler:RouteHandler<typeof getHonoXRoute>=async(c)=>{}',
          ],
          routeNames: ['getHonoXRoute'],
        },
        {
          fileName: 'zodOpenapiHonoHandler.ts',
          testFileName: 'zodOpenapiHonoHandler.test.ts',
          routeHandlerContents: [
            'export const getZodOpenapiHonoRouteHandler:RouteHandler<typeof getZodOpenapiHonoRoute>=async(c)=>{}',
          ],
          routeNames: ['getZodOpenapiHonoRoute'],
        },
      ]
      expect(result).toStrictEqual(expected)
    })
  })

  // importHandlers
  describe('getHandlerImports', () => {
    it.concurrent('getHandlerImports Test', () => {
      const result = getHandlerImports([
        {
          routeName: 'getHonoRoute',
          handlerName: 'getHonoRouteHandler',
          path: '/hono',
        },
        {
          routeName: 'getHonoXRoute',
          handlerName: 'getHonoXRouteHandler',
          path: '/hono-x',
        },
        {
          routeName: 'getZodOpenapiHonoRoute',
          handlerName: 'getZodOpenapiHonoRouteHandler',
          path: '/zod-openapi-hono',
        },
      ])
      const expected = {
        'honoHandler.ts': ['getHonoRouteHandler'],
        'honoXHandler.ts': ['getHonoXRouteHandler'],
        'zodOpenapiHonoHandler.ts': ['getZodOpenapiHonoRouteHandler'],
      }
      expect(result).toStrictEqual(expected)
    })
  })
})
