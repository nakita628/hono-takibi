import { describe, it, expect } from 'vitest'
import { getRouteMaps } from './get-route-maps'
import { honoRestOpenAPI } from '../../../../../data/hono-rest-openapi'
import type { OpenAPI } from '../../../../openapi'

// Test run
// pnpm vitest run /src/generator/zod-openapi-hono/app/helper/get-route-maps.test.ts

const getRouteMapsTestCases: {
  openapi: OpenAPI
  expected: { routeName: string; handlerName: string; path: string }[]
}[] = [
  {
    openapi: honoRestOpenAPI,
    expected: [
      { routeName: 'getRoute', handlerName: 'getRouteHandler', path: '/' },
      {
        routeName: 'postPostsRoute',
        handlerName: 'postPostsRouteHandler',
        path: '/posts',
      },
      {
        routeName: 'getPostsRoute',
        handlerName: 'getPostsRouteHandler',
        path: '/posts',
      },
      {
        routeName: 'putPostsIdRoute',
        handlerName: 'putPostsIdRouteHandler',
        path: '/posts/{id}',
      },
      {
        routeName: 'deletePostsIdRoute',
        handlerName: 'deletePostsIdRouteHandler',
        path: '/posts/{id}',
      },
    ],
  },
]

describe('getRouteMaps', () => {
  it.concurrent.each(getRouteMapsTestCases)(
    'getRouteMaps($openAPI) -> $expected',
    ({ openapi, expected }) => {
      const result = getRouteMaps(openapi)
      expect(result).toEqual(expected)
    },
  )
})
