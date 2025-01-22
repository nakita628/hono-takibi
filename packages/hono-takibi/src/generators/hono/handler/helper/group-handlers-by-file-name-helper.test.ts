import { describe, expect, it } from 'vitest'
import { groupHandlersByFileNameHelper } from './group-handlers-by-file-name-helper'
import type { HandlerOutput } from '../generate-zod-openapi-hono-handler'

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
      },
      {
        fileName: 'posts_handler.ts',
        testFileName: 'posts_handler.test.ts',
        routeHandlerContents: [
          'export const postPostsRouteHandler:RouteHandler<typeof postPostsRoute>=async(c)=>{}',
        ],
      },
      {
        fileName: 'posts_handler.ts',
        testFileName: 'posts_handler.test.ts',
        routeHandlerContents: [
          'export const getPostsRouteHandler:RouteHandler<typeof getPostsRoute>=async(c)=>{}',
        ],
      },
      {
        fileName: 'posts_handler.ts',
        testFileName: 'posts_handler.test.ts',
        routeHandlerContents: [
          'export const putPostsIdRouteHandler:RouteHandler<typeof putPostsIdRoute>=async(c)=>{}',
        ],
      },
      {
        fileName: 'posts_handler.ts',
        testFileName: 'posts_handler.test.ts',
        routeHandlerContents: [
          'export const deletePostsIdRouteHandler:RouteHandler<typeof deletePostsIdRoute>=async(c)=>{}',
        ],
      },
    ],
    expected: [
      {
        fileName: 'index_handler.ts',
        testFileName: 'index_handler.test.ts',
        routeHandlerContents: [
          'export const getRouteHandler:RouteHandler<typeof getRoute>=async(c)=>{}',
        ],
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
      },
    ],
  },
]

describe('groupHandlersByFileNameHelper', () => {
  it.each(groupHandlersByFileNameHelperTestCases)(
    'groupHandlersByFileNameHelper($handlers) should return $expected',
    ({ handlers, expected }) => {
      const result = groupHandlersByFileNameHelper(handlers)
      expect(result).toBe(expected)
    },
  )
})
