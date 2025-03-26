import { describe, expect, it } from 'vitest'
import { generateRequestParameter } from './generate-request-parameter'
import { DEFAULT_CONFIG } from '../../../../../../data/test-config'
import type { Parameters, RequestBody } from '../../../../../type'
import type { Config } from '../../../../../config'

const generateRequestParameterTestCases: {
  parameters: Parameters[] | undefined
  requestBody: RequestBody | undefined
  config: Config
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
    config: DEFAULT_CONFIG,
    expected: `request:{body:{required:true,content:{'application/json':{schema:z.object({post:z.string().min(1).max(140)})}},},},`,
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
    config: DEFAULT_CONFIG,
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
    config: DEFAULT_CONFIG,
    expected: `request:{body:{required:true,content:{'application/json':{schema:z.object({post:z.string().min(1).max(140)})}},},params:z.object({id:z.string().uuid()})},`,
  },
  {
    parameters: [
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
    requestBody: {
      content: {
        'application/octet-stream': {
          schema: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
    config: DEFAULT_CONFIG,
    expected: `request:{body:{required:false,content:{'application/octet-stream':{schema:z.string()}},},params:z.object({petId:z.number().int()}),query:z.object({additionalMetadata:z.string().optional()})},`,
  },
]

describe('generateRequestParameters', () => {
  it.concurrent.each(generateRequestParameterTestCases)(
    'generateRequestParameter($parameters, $requestBody, $config) -> $expected',
    async ({ parameters, requestBody, config, expected }) => {
      const result = generateRequestParameter(parameters, requestBody, config)
      expect(result).toBe(expected)
    },
  )
})
