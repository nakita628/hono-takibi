import type { OpenAPISpec } from '../../../../types'
import { describe, expect, it } from 'vitest'
import { getRouteMaps } from './get-route-maps'
import { honoRestOpenAPI } from '../../../../../data/hono-rest-openapi'

// Test run
// pnpm vitest run /src/generator/zod-openapi-hono/app/helper/get-route-maps.test.ts

const getRouteMapsTestCases: {
  openAPISpec: OpenAPISpec
  expected: { routeName: string; handlerName: string; path: string }[]
}[] = [
  {
    openAPISpec: honoRestOpenAPI,
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
    'getRouteMaps($openAPISpec) -> $expected',
    ({ openAPISpec, expected }) => {
      const result = getRouteMaps(openAPISpec)
      expect(result).toEqual(expected)
    },
  )
})
