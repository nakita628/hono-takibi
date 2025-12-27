import { describe, expect, it } from 'vitest'
import { request } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/routes/request/index.test.ts

describe('request', () => {
  it.concurrent('request parameters undefined', () => {
    const result = request(undefined, {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              post: {
                type: 'string',
                minLength: 1,
                maxLength: 140,
              },
            },
            required: ['post'],
          },
        },
      },
    })
    const expected = `request:{body:{content:{"application/json":{schema:z.object({post:z.string().min(1).max(140).optional().openapi({"type":"string","minLength":1,"maxLength":140})}).optional().openapi({"type":"object","properties":{"post":{"type":"string","minLength":1,"maxLength":140}}})}},required:true}},`
    expect(result).toBe(expected)
  })

  // it.concurrent('requestParameter parameters requestBody undefined', () => {
  //   const result = request(
  //     [
  //       {
  //         schema: { type: 'string' },
  //         required: true,
  //         name: 'page',
  //         in: 'query',
  //       },
  //       {
  //         schema: { type: 'string' },
  //         required: true,
  //         name: 'rows',
  //         in: 'query',
  //       },
  //     ],
  //     undefined,
  //   )

  //   const expected = `request:{query:z.object({page:z.string().openapi({param:{"name":"page","in":"query","required":true},"type":"string"}),rows:z.string().openapi({param:{"name":"rows","in":"query","required":true},"type":"string"})})},`
  //   expect(result).toBe(expected)
  // })

  // it.concurrent('requestParameter parameters and requestBody not undefined', () => {
  //   const result = request(
  //     [
  //       {
  //         schema: { type: 'string', format: 'uuid' },
  //         required: true,
  //         name: 'id',
  //         in: 'path',
  //       },
  //     ],
  //     {
  //       required: true,
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'object',
  //             properties: {
  //               post: {
  //                 type: 'string',
  //                 minLength: 1,
  //                 maxLength: 140,
  //               },
  //             },
  //             required: ['post'],
  //           },
  //         },
  //       },
  //     },
  //   )
  //   const expected = `request:{body:{required:true,content:{'application/json':{schema:z.object({post:z.string().min(1).max(140).optional().openapi({"type":"string","minLength":1,"maxLength":140})}).optional().openapi({"type":"object","properties":{"post":{"type":"string","minLength":1,"maxLength":140}}})}}},params:z.object({id:z.uuid().openapi({param:{"name":"id","in":"path","required":true},"type":"string","format":"uuid"})})},`
  //   expect(result).toBe(expected)
  // })

  // it.concurrent('request parameters and requestBody not undefined binary', () => {
  //   const result = request(
  //     [
  //       {
  //         name: 'petId',
  //         in: 'path',
  //         description: 'ID of pet to update',
  //         required: true,
  //         schema: {
  //           type: 'integer',
  //           format: 'int64',
  //         },
  //       },
  //       {
  //         name: 'additionalMetadata',
  //         in: 'query',
  //         description: 'Additional Metadata',
  //         required: false,
  //         schema: {
  //           type: 'string',
  //         },
  //       },
  //     ],
  //     {
  //       content: {
  //         'application/octet-stream': {
  //           schema: {
  //             type: 'string',
  //             format: 'binary',
  //           },
  //         },
  //       },
  //     },
  //   )
  //   const expected = `request:{body:{required:false,content:{'application/octet-stream':{schema:z.file().optional().openapi({"type":"string","format":"binary"})}}},params:z.object({petId:z.int64().openapi({param:{"name":"petId","in":"path","required":true},"type":"integer","format":"int64"})}),query:z.object({additionalMetadata:z.string().optional().openapi({param:{"name":"additionalMetadata","in":"query","required":false},"type":"string"})})},`
  //   expect(result).toBe(expected)
  // })
})
