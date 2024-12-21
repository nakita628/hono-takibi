import { describe, expect, it } from 'vitest'
import { generateRequestParameter } from './generate-request-parameter'
import type { Parameters, RequestBody } from '../../../types'

const generateRequestParameterTestCases: {
  parameters: Parameters[] | undefined
  requestBody: RequestBody | undefined
  expected: string
}[] = [
  {
    parameters: undefined,
    requestBody: {
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
    expected: `request:{body:{required:true,content:{'application/json':{schema:z.object({post: z.string().min(1).max(140)}),},},},},`,
  },
  {
    parameters: [
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
    requestBody: undefined,
    expected: 'request:{query:z.object({page:z.string(),rows:z.string()})},',
  },
  {
    parameters: [
      {
        schema: { type: 'string', format: 'uuid' },
        required: true,
        name: 'id',
        in: 'path',
      },
    ],
    requestBody: {
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
    expected: `request:{body:{required:true,content:{'application/json':{schema:z.object({post: z.string().min(1).max(140)}),},},},params:z.object({id:z.string().uuid()})},`,
  },
]

describe('generateRequestParameters', () => {
  it.concurrent.each(generateRequestParameterTestCases)(
    'generateRequestParameters($parameters, $requestBody) -> $expected',
    async ({ parameters, requestBody, expected }) => {
      const result = generateRequestParameter(parameters, requestBody)
      expect(result).toEqual(expected)
    },
  )
})
