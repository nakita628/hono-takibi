import type { HandlerOutput } from '../generate-zod-openapi-hono-handler'
import { describe, it, expect } from 'vitest'
import { groupHandlersByFileNameHelper } from './group-handlers-by-file-name-helper'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/handler/helper/group-handlers-by-file-name-helper.test.ts

const groupHandlersByFileNameHelperTestCases: {
  handlers: HandlerOutput[]
  expected: HandlerOutput[]
}[] = [
  {
    handlers: [
      {
        fileName: 'index_handler.ts',
        testFileName: 'index_handler.test.ts',
        routeHandlerContents: [
          'export const getRouteHandler:RouteHandler<typeof getRoute>=async(c)=>{}',
        ],
        routeNames: ['getRoute'],
      },
      {
        fileName: 'posts_handler.ts',
        testFileName: 'posts_handler.test.ts',
        routeHandlerContents: [
          'export const postPostsRouteHandler:RouteHandler<typeof postPostsRoute>=async(c)=>{}',
        ],
        routeNames: ['postPostsRoute'],
      },
      {
        fileName: 'posts_handler.ts',
        testFileName: 'posts_handler.test.ts',
        routeHandlerContents: [
          'export const getPostsRouteHandler:RouteHandler<typeof getPostsRoute>=async(c)=>{}',
        ],
        routeNames: ['getPostsRoute'],
      },
      {
        fileName: 'posts_handler.ts',
        testFileName: 'posts_handler.test.ts',
        routeHandlerContents: [
          'export const putPostsIdRouteHandler:RouteHandler<typeof putPostsIdRoute>=async(c)=>{}',
        ],
        routeNames: ['putPostsIdRoute'],
      },
      {
        fileName: 'posts_handler.ts',
        testFileName: 'posts_handler.test.ts',
        routeHandlerContents: [
          'export const deletePostsIdRouteHandler:RouteHandler<typeof deletePostsIdRoute>=async(c)=>{}',
        ],
        routeNames: ['deletePostsIdRoute'],
      },
    ],
    expected: [
      {
        fileName: 'index_handler.ts',
        testFileName: 'index_handler.test.ts',
        routeHandlerContents: [
          'export const getRouteHandler:RouteHandler<typeof getRoute>=async(c)=>{}',
        ],
        routeNames: ['getRoute'],
      },
      {
        fileName: 'posts_handler.ts',
        testFileName: 'posts_handler.test.ts',
        routeHandlerContents: [
          'export const postPostsRouteHandler:RouteHandler<typeof postPostsRoute>=async(c)=>{}',
          'export const getPostsRouteHandler:RouteHandler<typeof getPostsRoute>=async(c)=>{}',
          'export const putPostsIdRouteHandler:RouteHandler<typeof putPostsIdRoute>=async(c)=>{}',
          'export const deletePostsIdRouteHandler:RouteHandler<typeof deletePostsIdRoute>=async(c)=>{}',
        ],
        routeNames: ['postPostsRoute', 'getPostsRoute', 'putPostsIdRoute', 'deletePostsIdRoute'],
      },
    ],
  },
]

describe('groupHandlersByFileNameHelper', () => {
  it.each(groupHandlersByFileNameHelperTestCases)(
    'groupHandlersByFileNameHelper($handlers) should return $expected',
    ({ handlers, expected }) => {
      const result = groupHandlersByFileNameHelper(handlers)
      expect(result).toEqual(expected)
    },
  )
})
