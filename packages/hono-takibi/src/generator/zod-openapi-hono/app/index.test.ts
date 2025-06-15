import { describe, it, expect } from 'vitest'
import { generateApp } from './'
import { honoRestOpenAPI } from '../../../../data/hono-rest-openapi'
import type { OpenAPI } from '../../../openapi'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/app/index.test.ts

const generateAppTestCases: {
  openAPI: OpenAPI
  output: `${string}.ts`
  basePath: string | undefined
  expected: string
}[] = [
  {
    openAPI: honoRestOpenAPI,
    output: './hono-rest/openapi/hono-rest.ts',
    basePath: 'api',
    expected: `import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { getRoute,postPostsRoute,getPostsRoute,putPostsIdRoute,deletePostsIdRoute } from './hono-rest.ts';
import { getRouteHandler } from './handler/index-handler.ts';
import { postPostsRouteHandler,getPostsRouteHandler,putPostsIdRouteHandler,deletePostsIdRouteHandler } from './handler/posts-handler.ts';

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
    'generateApp($openAPI, $config) -> $expected',
    ({ openAPI, output, basePath, expected }) => {
      const result = generateApp(openAPI, output, basePath)
      expect(result).toEqual(expected)
    },
  )
})
