import { describe, it, expect } from 'vitest'
import { generateCreateRoute } from './generate-create-route'

const generateCreateRouteTestCases = [
  {
    args: {
      routeName: 'deletePostsId',
      tagsCode: '["Post"]',
      methodCode: 'delete',
      pathCode: '/posts/{id}',
      descriptionCode: 'delete post',
      requestParams: 'request:{params:z.object({id:z.string().uuid()})},',
      responsesCode: `204:{description:'No Content',},400:{description:'Bad Request',content:{'application/json':{schema:z.object({message:z.string()}),},},},500:{description:'Internal Server Error',content:{'application/json':{schema: z.object({message: z.string()}),},},},`,
    },
    expected: `export const deletePostsId=createRoute({["Post"]delete/posts/{id}delete postrequest:{params:z.object({id:z.string().uuid()})},204:{description:'No Content',},400:{description:'Bad Request',content:{'application/json':{schema:z.object({message:z.string()}),},},},500:{description:'Internal Server Error',content:{'application/json':{schema: z.object({message: z.string()}),},},},})`,
  },
]

describe('generateCreateRoute', () => {
  it.concurrent.each(generateCreateRouteTestCases)(
    `generateCreateRoute(
     $args.routeName,
     $args.tagList, 
     $args.method, 
     $args.path, 
     $args.description, 
     $args.requestParams, 
     $args.responsesCode) 
     -> $expected`,
    async ({ args, expected }) => {
      const result = generateCreateRoute(args)
      expect(result).toBe(expected)
    },
  )
})
