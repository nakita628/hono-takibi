import { describe, it, expect } from 'vitest'
import { generateRequestParameter } from './generate-request-parameter'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/params/generate-request-parameter.test.ts

describe('generateRequestParameters', () => {
  it.concurrent('generateRequestParameter parameters undefined', () => {
    const result = generateRequestParameter(
      undefined,
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
      {
        schema: {
          name: 'PascalCase',
          export: false,
        },
        type: {
          name: 'PascalCase',
          export: false,
        },
      },
    )

    const expected = `request:{body:{required:true,content:{'application/json':{schema:z.object({post:z.string().min(1).max(140)})}},},},`
    expect(result).toBe(expected)
  })

  it.concurrent('generateRequestParameter parameters requestBody undefined', () => {
    const result = generateRequestParameter(
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
      {
        schema: {
          name: 'PascalCase',
          export: false,
        },
        type: {
          name: 'PascalCase',
          export: false,
        },
      },
    )
    expect(result).toBe('request:{query:z.object({page:z.string(),rows:z.string()})},')
  })

  it.concurrent('generateRequestParameter parameters and requestBody not undefined', () => {
    const result = generateRequestParameter(
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
      {
        schema: {
          name: 'PascalCase',
          export: false,
        },
        type: {
          name: 'PascalCase',
          export: false,
        },
      },
    )

    const expected = `request:{body:{required:true,content:{'application/json':{schema:z.object({post:z.string().min(1).max(140)})}},},params:z.object({id:z.string().uuid().openapi({param:{in:"path",name:"id"}})})},`
    expect(result).toBe(expected)
  })

  it.concurrent('generateRequestParameter parameters and requestBody not undefined binary', () => {
    const result = generateRequestParameter(
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
      {
        schema: {
          name: 'PascalCase',
          export: false,
        },
        type: {
          name: 'PascalCase',
          export: false,
        },
      },
    )

    const expected = `request:{body:{required:false,content:{'application/octet-stream':{schema:z.instanceof(Uint8Array)}},},params:z.object({petId:z.number().int().openapi({param:{in:"path",name:"petId"}})}),query:z.object({additionalMetadata:z.string().optional()})},`
    expect(result).toBe(expected)
  })
})
