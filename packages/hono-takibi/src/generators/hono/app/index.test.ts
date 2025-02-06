import { describe, expect, it } from 'vitest'
import { generateApp } from './'
import { DEFAULT_CONFIG, type Config } from '../../../config'
import { honoRestOpenAPI } from '../../../data/hono-rest-openapi'
import type { OpenAPISpec } from '../../../types'

const generateAppTestCases: {
  openAPISpec: OpenAPISpec
  config: Config
  expected: string
}[] = [
  {
    openAPISpec: honoRestOpenAPI,
    config: {
      ...DEFAULT_CONFIG,
      output: './hono-rest/openapi/hono_rest.ts',
    },
    expected: `import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { getRoute,postPostsRoute,getPostsRoute,putPostsIdRoute,deletePostsIdRoute } from '././hono-rest/openapi/hono_rest.ts';


const app = new OpenAPIHono()

const api = app.openapi(getRoute,getRouteHandler)
.openapi(postPostsRoute,postPostsRouteHandler)
.openapi(getPostsRoute,getPostsRouteHandler)
.openapi(putPostsIdRoute,putPostsIdRouteHandler)
.openapi(deletePostsIdRoute,deletePostsIdRouteHandler)

const isDev = process.env.NODE_ENV === 'development'

if(isDev){
app.doc('/doc',{"openapi":"3.1.0","info":{"title":"Hono API","version":"v1"},"tags":[{"name":"Hono","description":"Endpoints related to general Hono operations"},{"name":"Post","description":"Endpoints for creating, retrieving, updating, and deleting posts"}]}).get('/ui',swaggerUI({url:'/doc'}))}

export type AddType = typeof api

export default app`,
  },
]

describe('generateApp', () => {
  it.concurrent.each(generateAppTestCases)(
    'generateApp($openAPISpec, $config) -> $expected',
    ({ openAPISpec, config, expected }) => {
      const result = generateApp(openAPISpec, config)
      expect(result).toEqual(expected)
    },
  )
})
