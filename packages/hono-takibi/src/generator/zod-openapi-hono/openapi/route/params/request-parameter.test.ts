import { describe, expect, it } from 'vitest'
import { requestParameter } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/params/request-parameter.test.ts

describe('requestParameter', () => {
  it.concurrent('requestParameter parameters undefined', () => {
    const result = requestParameter(undefined, {
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
    const expected = `request:{body:{required:true,content:{'application/json':{schema:z.object({post:z.string().min(1).max(140)})}},},},`
    expect(result).toBe(expected)
  })

  it.concurrent('requestParameter parameters requestBody undefined', () => {
    const result = requestParameter(
      [
        {
          schema: { type: 'string' },
          required: true,
          name: 'page',
          in: 'query',
        },
        {
          schema: { type: 'string' },
          required: true,
          name: 'rows',
          in: 'query',
        },
      ],
      undefined,
    )

    const expected = `request:{query:z.object({page:z.string().openapi({param:{in:"query",name:"page",required:false}}),rows:z.string().openapi({param:{in:"query",name:"rows",required:false}})})},`
    expect(result).toBe(expected)
  })

  it.concurrent('requestParameter parameters and requestBody not undefined', () => {
    const result = requestParameter(
      [
        {
          schema: { type: 'string', format: 'uuid' },
          required: true,
          name: 'id',
          in: 'path',
        },
      ],
      {
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
      },
    )

    const expected = `request:{body:{required:true,content:{'application/json':{schema:z.object({post:z.string().min(1).max(140)})}},},params:z.object({id:z.uuid().openapi({param:{in:"path",name:"id",required:true}})})},`
    expect(result).toBe(expected)
  })

  it.concurrent('requestParameter parameters and requestBody not undefined binary', () => {
    const result = requestParameter(
      [
        {
          name: 'petId',
          in: 'path',
          description: 'ID of pet to update',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64',
          },
        },
        {
          name: 'additionalMetadata',
          in: 'query',
          description: 'Additional Metadata',
          required: false,
          schema: {
            type: 'string',
          },
        },
      ],
      {
        content: {
          'application/octet-stream': {
            schema: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      },
    )

    const expected = `request:{body:{required:false,content:{'application/octet-stream':{schema:z.file()}},},params:z.object({petId:z.int64().openapi({param:{in:"path",name:"petId",required:true}})}),query:z.object({additionalMetadata:z.string().openapi({param:{in:"query",name:"additionalMetadata",required:false}}).optional()})},`
    expect(result).toBe(expected)
  })
})
