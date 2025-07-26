import { describe, expect, it } from 'vitest'
import { createRoute, formatRequestObject, insertRequestBody, requestParams } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/utils/index.test.ts

describe('utils', () => {
  // createRoute
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
  // requestParams
  describe('requestParams', () => {
    it.concurrent('requestParams("") -> "request:{},",', () => {
      const result = requestParams('')
      const expected = 'request:{},'
      expect(result).toBe(expected)
    })

    it.concurrent(`requestParams("key:'value',") -> "request:{key:'value',},"`, () => {
      const result = requestParams("key:'value',")
      const expected = "request:{key:'value',},"
      expect(result).toBe(expected)
    })

    it.concurrent(
      `requestParams("key1:'value1',key2:'value2',") -> "request:{key1:'value1',key2:'value2',},"`,
      () => {
        const result = requestParams("key1:'value1',key2:'value2',")
        const expected = "request:{key1:'value1',key2:'value2',},"
        expect(result).toBe(expected)
      },
    )

    it.concurrent(
      `requestParams("key:'value', // comment") -> "request:{key:'value', // comment},"`,
      () => {
        const result = requestParams("key:'value', // comment")
        const expected = "request:{key:'value', // comment},"
        expect(result).toBe(expected)
      },
    )

    it.concurrent(
      `requestParams("specialChars:'!@#$%^&*()',") -> "request:{specialChars:'!@#$%^&*()',},"`,
      () => {
        const result = requestParams("specialChars:'!@#$%^&*()',")
        const expected = "request:{specialChars:'!@#$%^&*()',},"
        expect(result).toBe(expected)
      },
    )
  })

  // insertRequestBody
  describe('insertRequestBody', () => {
    it.concurrent('insertRequestBody Test', () => {
      const result = insertRequestBody(
        'request:{params:z.object({id:z.string().uuid()})},',
        "body:{required:true,content:{'application/json':{schema:z.object({post:z.string().min(1).max(140)}),},},},",
      )
      const expected =
        "request:{body:{required:true,content:{'application/json':{schema:z.object({post:z.string().min(1).max(140)}),},},},params:z.object({id:z.string().uuid()})},"
      expect(result).toBe(expected)
    })

    it.concurrent('should throw an error when requestParams is undefined', () => {
      // biome-ignore lint: test
      const requestParams = undefined as any
      const requestBodyCode = 'edge case'

      expect(() => insertRequestBody(requestParams, requestBodyCode)).toThrow(
        `Cannot read properties of undefined (reading 'replace')`,
      )
    })
  })

  // formatRequestObject
  describe('formatRequestObject', () => {
    it.concurrent('formatRequestObject Test', () => {
      const result = formatRequestObject(['params:z.object({id:z.string().uuid()})'])
      const expected = 'request:{params:z.object({id:z.string().uuid()})},'
      expect(result).toBe(expected)
    })
  })
})
