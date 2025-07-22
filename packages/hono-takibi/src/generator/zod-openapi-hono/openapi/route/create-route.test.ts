import { describe, expect, it } from 'vitest'
import { createRoute } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/create-route.test.ts

describe('createRoute', () => {
  it.concurrent('createRoute Test', () => {
    const result = createRoute({
      routeName: 'deletePostsId',
      tags: '["Post"]',
      method: 'delete',
      path: '/posts/{id}',
      description: 'delete post',
      requestParams: 'request:{params:z.object({id:z.uuid()})},',
      responses: `204:{description:'No Content',},400:{description:'Bad Request',content:{'application/json':{schema:z.object({message:z.string()}),},},},500:{description:'Internal Server Error',content:{'application/json':{schema: z.object({message: z.string()}),},},},`,
    })
    const expected = `export const deletePostsId=createRoute({["Post"]delete/posts/{id}delete postrequest:{params:z.object({id:z.uuid()})},204:{description:'No Content',},400:{description:'Bad Request',content:{'application/json':{schema:z.object({message:z.string()}),},},},500:{description:'Internal Server Error',content:{'application/json':{schema: z.object({message: z.string()}),},},},})`
    expect(result).toBe(expected)
  })
})
