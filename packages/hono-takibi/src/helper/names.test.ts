import { describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../openapi/index.js'
import { uniqueComponentNames } from './names.js'

// #368: component names that differ only in separators or case make one identifier
describe('uniqueComponentNames', () => {
  const spec = {
    openapi: '3.0.3',
    info: { title: 'Cloudflare', version: '1.0.0' },
    paths: {
      '/sinkholes': {
        get: {
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/api_response_common_failure' },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        'api-response-common-failure': {
          type: 'object',
          properties: { success: { type: 'boolean' } },
        },
        api_response_common_failure: {
          allOf: [{ $ref: '#/components/schemas/api-response-common-failure' }],
        },
        ApiResponseCommonFailure: {
          type: 'object',
          properties: {
            kind: { $ref: '#/components/schemas/api_response_common_failure/properties/success' },
          },
          discriminator: {
            propertyName: 'kind',
            mapping: { failure: '#/components/schemas/api_response_common_failure' },
          },
        },
        messages: { type: 'object' },
      },
      parameters: {
        'page-size': { name: 'page_size', in: 'query', schema: { type: 'integer' } },
        page_size: { name: 'page_size', in: 'query', schema: { type: 'integer' } },
      },
      securitySchemes: {
        'api-key': { type: 'apiKey', in: 'header', name: 'X-Key' },
        api_key: { type: 'apiKey', in: 'header', name: 'X-Key' },
      },
    },
  } as OpenAPI

  it.concurrent('numbers every later component that would share an identifier', () => {
    const result = uniqueComponentNames(spec)
    expect(Object.keys(result.components?.schemas ?? {})).toStrictEqual([
      'api-response-common-failure',
      'api_response_common_failure2',
      'ApiResponseCommonFailure3',
      'messages',
    ])
    expect(Object.keys(result.components?.parameters ?? {})).toStrictEqual([
      'page-size',
      'page_size2',
    ])
  })

  it.concurrent('rewrites every $ref to a renamed component, under paths and in a mapping', () => {
    const result = uniqueComponentNames(spec)
    expect(JSON.stringify(result.paths)).toContain(
      '"$ref":"#/components/schemas/api_response_common_failure2"',
    )
    expect(JSON.stringify(result.components?.schemas?.ApiResponseCommonFailure3)).toContain(
      '"$ref":"#/components/schemas/api_response_common_failure2/properties/success"',
    )
    expect(JSON.stringify(result.components?.schemas?.ApiResponseCommonFailure3)).toContain(
      '"mapping":{"failure":"#/components/schemas/api_response_common_failure2"}',
    )
    // The first keeps its name, and its reference is left alone.
    expect(JSON.stringify(result.components?.schemas?.api_response_common_failure2)).toBe(
      '{"allOf":[{"$ref":"#/components/schemas/api-response-common-failure"}]}',
    )
  })

  it.concurrent('numbers a security scheme too, and the requirements that name it (#434)', () => {
    const result = uniqueComponentNames({
      openapi: '3.0.3',
      info: { title: 'schemes', version: '1.0.0' },
      security: [{ ApiKeyAuth_: [] }],
      paths: {
        '/a': { get: { security: [{ ApiKeyAuth: [] }], responses: {} } },
        '/b': { get: { security: [{ ApiKeyAuth_: ['read'], ApiKeyAuth: [] }], responses: {} } },
      },
      components: {
        securitySchemes: {
          ApiKeyAuth: { type: 'apiKey', in: 'cookie', name: 'token' },
          ApiKeyAuth_: { type: 'apiKey', in: 'query', name: 'token' },
        },
      },
    } as OpenAPI)
    expect(result.components?.securitySchemes).toStrictEqual({
      ApiKeyAuth: { type: 'apiKey', in: 'cookie', name: 'token' },
      ApiKeyAuth_2: { type: 'apiKey', in: 'query', name: 'token' },
    })
    expect(result.security).toStrictEqual([{ ApiKeyAuth_2: [] }])
    expect(result.paths).toStrictEqual({
      '/a': { get: { security: [{ ApiKeyAuth: [] }], responses: {} } },
      '/b': { get: { security: [{ ApiKeyAuth_2: ['read'], ApiKeyAuth: [] }], responses: {} } },
    })
  })

  it.concurrent('returns the document itself when no identifier collides', () => {
    const plain = {
      openapi: '3.0.3',
      info: { title: 'plain', version: '1.0.0' },
      paths: {},
      components: { schemas: { A: { type: 'string' }, B: { type: 'string' } } },
    } as OpenAPI
    expect(uniqueComponentNames(plain)).toBe(plain)
  })
})
