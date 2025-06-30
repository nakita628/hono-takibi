import { describe, it, expect } from 'vitest'
import { groupHandlersByFileName } from './group-handlers-by-file-name'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/handler/helper/group-handlers-by-file-name.test.ts

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
