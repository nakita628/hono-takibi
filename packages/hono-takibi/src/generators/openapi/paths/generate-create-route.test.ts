import { describe, expect, it } from 'vitest'
import { generateCreateRoute } from './generate-create-route'

const generateCreateRouteTestCases = [
  {
    input: {
      routeName: 'deletePostsId',
      tagsCode: '["Post"]',
      methodCode: 'delete',
      pathCode: '/posts/{id}',
      descriptionCode: 'delete post',
      requestParams: `request:{params:z.object({id:z.string().uuid()})},`,
      responsesCode: `204:{description:'No Content',},400:{description:'Bad Request',content:{'application/json':{schema:z.object({message:z.string()}),},},},500:{description:'Internal Server Error',content:{'application/json':{schema: z.object({message: z.string()}),},},},`,
    },
    expected: `export const deletePostsId=createRoute({["Post"]delete/posts/{id}delete postrequest:{params:z.object({id:z.string().uuid()})},204:{description:'No Content',},400:{description:'Bad Request',content:{'application/json':{schema:z.object({message:z.string()}),},},},500:{description:'Internal Server Error',content:{'application/json':{schema: z.object({message: z.string()}),},},},})`,
  },
]

describe('generateCreateRoute', () => {
  it.concurrent.each(generateCreateRouteTestCases)(
    `generateCreateRoute(
     $input.routeName,
     $input.tagList, 
     $input.method, 
     $input.path, 
     $input.description, 
     $input.requestParams, 
     $input.responsesCode) 
     -> $expected`,
    async ({ input, expected }) => {
      const result = generateCreateRoute(input)
      expect(result).toBe(expected)
    },
  )
})
