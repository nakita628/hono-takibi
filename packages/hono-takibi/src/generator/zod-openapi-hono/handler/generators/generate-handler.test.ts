import { describe, it, expect } from 'vitest'
import { generateHandler } from './generate-handler'

// Test run
// pnpm vitet run ./src/generator/zod-openapi-hono/handler/generate-handler.test.ts

const generateHandlerTestCases: {
  handlerName: string
  routeName: string
  expected: string
}[] = [
  {
    handlerName: 'getRouteHandler',
    routeName: 'getRoute',
    expected: 'export const getRouteHandler:RouteHandler<typeof getRoute>=async(c)=>{}',
  },
  {
    handlerName: 'postPostsRouteHandler',
    routeName: 'postPostsRoute',
    expected: 'export const postPostsRouteHandler:RouteHandler<typeof postPostsRoute>=async(c)=>{}',
  },
  {
    handlerName: 'getPostsRouteHandler',
    routeName: 'getPostsRoute',
    expected: 'export const getPostsRouteHandler:RouteHandler<typeof getPostsRoute>=async(c)=>{}',
  },
  {
    handlerName: 'putPostsIdRouteHandler',
    routeName: 'putPostsIdRoute',
    expected:
      'export const putPostsIdRouteHandler:RouteHandler<typeof putPostsIdRoute>=async(c)=>{}',
  },
  {
    handlerName: 'deletePostsIdRouteHandler',
    routeName: 'deletePostsIdRoute',
    expected:
      'export const deletePostsIdRouteHandler:RouteHandler<typeof deletePostsIdRoute>=async(c)=>{}',
  },
]

describe('generateHandler', () => {
  it.concurrent.each(generateHandlerTestCases)(
    'generateHandler($handlerName, $routeName) -> $expected',
    async ({ handlerName, routeName, expected }) => {
      const result = generateHandler(handlerName, routeName)
      expect(result).toBe(expected)
    },
  )
})
