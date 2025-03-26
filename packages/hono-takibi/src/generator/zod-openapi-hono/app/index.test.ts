import { describe, expect, it } from 'vitest'
import { generateApp } from './'
import { honoRestOpenAPI } from '../../../../data/hono-rest-openapi'
import { DEFAULT_CONFIG } from '../../../../data/test-config'
import type { OpenAPISpec } from '../../../type'
import type { Config } from '../../../config'

const generateAppTestCases: {
  openAPISpec: OpenAPISpec
  config: Config
  basePath: string | undefined
  expected: string
}[] = [
  {
    openAPISpec: honoRestOpenAPI,
    config: {
      ...DEFAULT_CONFIG,
      output: './hono-rest/openapi/hono_rest.ts',
    },
    basePath: 'api',
    expected: `import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { getRoute,postPostsRoute,getPostsRoute,putPostsIdRoute,deletePostsIdRoute } from './hono_rest.ts';
import { getRouteHandler } from './handler/index_handler.ts';
import { postPostsRouteHandler,getPostsRouteHandler,putPostsIdRouteHandler,deletePostsIdRouteHandler } from './handler/posts_handler.ts';

const app = new OpenAPIHono().basePath('api')

export const api = app.openapi(getRoute,getRouteHandler)
.openapi(postPostsRoute,postPostsRouteHandler)
.openapi(getPostsRoute,getPostsRouteHandler)
.openapi(putPostsIdRoute,putPostsIdRouteHandler)
.openapi(deletePostsIdRoute,deletePostsIdRouteHandler)

if(process.env.NODE_ENV === 'development'){
app.doc('/doc',{"openapi":"3.1.0","info":{"title":"Hono API","version":"v1"},"tags":[{"name":"Hono","description":"Endpoints related to general Hono operations"},{"name":"Post","description":"Endpoints for creating, retrieving, updating, and deleting posts"}]}).get('/ui',swaggerUI({url:'/api/doc'}))}

export type AddType = typeof api

export default app`,
  },
]

describe('generateApp', () => {
  it.concurrent.each(generateAppTestCases)(
    'generateApp($openAPISpec, $config) -> $expected',
    ({ openAPISpec, config, basePath, expected }) => {
      const result = generateApp(openAPISpec, config, basePath)
      expect(result).toEqual(expected)
    },
  )
})
