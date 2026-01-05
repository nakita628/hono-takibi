import { describe, expect, it } from 'vitest'
import {
  makeCallbacks,
  makeContent,
  makeEncoding,
  makeExamples,
  makeHeaderResponses,
  makeHeadersAndReferences,
  makeLinkOrReference,
  makeMedia,
  makeOperationResponses,
  makeParameters,
  makeRef,
  makeRequest,
  makeRequestBody,
  makeRequestParams,
  makeResponses,
} from './openapi.js'

// Test run
// pnpm vitest run ./src/helper/openapi.test.ts

describe('openapi helper', () => {
  describe('makeRef', () => {
    it.concurrent(`makeRef('#/components/schemas/Test') -> 'TestSchema'`, () => {
      expect(makeRef('#/components/schemas/Test')).toBe('TestSchema')
    })
    it.concurrent(`makeRef('#/components/parameters/Test') -> 'TestParamsSchema'`, () => {
      expect(makeRef('#/components/parameters/Test')).toBe('TestParamsSchema')
    })
    it.concurrent(`makeRef('#/components/headers/Test') -> 'TestHeaderSchema'`, () => {
      expect(makeRef('#/components/headers/Test')).toBe('TestHeaderSchema')
    })
    it.concurrent(`makeRef('#/components/securitySchemes/Test') -> 'TestSecurityScheme'`, () => {
      expect(makeRef('#/components/securitySchemes/Test')).toBe('TestSecurityScheme')
    })
    it.concurrent(`makeRef('#/components/requestBodies/Test') -> 'TestRequestBody'`, () => {
      expect(makeRef('#/components/requestBodies/Test')).toBe('TestRequestBody')
    })
    it.concurrent(`makeRef('#/components/responses/Test') -> 'TestResponse'`, () => {
      expect(makeRef('#/components/responses/Test')).toBe('TestResponse')
    })
    it.concurrent(`makeRef('#/components/examples/Test') -> 'TestExample'`, () => {
      expect(makeRef('#/components/examples/Test')).toBe('TestExample')
    })
    it.concurrent(`makeRef('#/components/links/Test') -> 'TestLink'`, () => {
      expect(makeRef('#/components/links/Test')).toBe('TestLink')
    })
    it.concurrent(`makeRef('#/components/callbacks/Test') -> 'TestCallback'`, () => {
      expect(makeRef('#/components/callbacks/Test')).toBe('TestCallback')
    })
    it.concurrent('makeRef with URL encoded characters', () => {
      expect(makeRef('#/components/schemas/Test%20Name')).toBe('TestNameSchema')
    })
    it.concurrent(`makeRef with empty path returns 'Schema'`, () => {
      expect(makeRef('')).toBe('Schema')
    })
    it.concurrent('makeRef with suffix already present does not duplicate', () => {
      expect(makeRef('#/components/schemas/TestSchema')).toBe('TestSchema')
      expect(makeRef('#/components/parameters/TestParamsSchema')).toBe('TestParamsSchema')
    })
  })

  describe('makeExamples', () => {
    it.concurrent('generates example with value', () => {
      const result = makeExamples({
        example1: { value: 'test-value' },
      })
      expect(result).toBe(`{"example1":{value:"test-value"}}`)
    })
    it.concurrent('generates example with summary and description', () => {
      const result = makeExamples({
        example1: { summary: 'Sum', description: 'Desc' },
      })
      expect(result).toBe(`{"example1":{summary:"Sum",description:"Desc"}}`)
    })
    it.concurrent('generates example with $ref', () => {
      const result = makeExamples({
        example1: { $ref: '#/components/examples/MyExample' } as const,
      })
      // MyExample already ends with 'Example', so suffix is not duplicated
      expect(result).toBe(`{"example1":MyExample}`)
    })
  })

  describe('makeResponses', () => {
    it.concurrent('generates response with $ref', () => {
      const result = makeResponses({ $ref: '#/components/responses/NotFound' })
      expect(result).toBe('NotFoundResponse')
    })
    it.concurrent('generates response with description', () => {
      const result = makeResponses({ description: 'Success response' })
      expect(result).toBe('{description:"Success response"}')
    })
  })

  describe('makeLinkOrReference', () => {
    it.concurrent('generates link with operationId', () => {
      const result = makeLinkOrReference({ operationId: 'getUser' })
      expect(result).toBe('{operationId:"getUser"}')
    })
    it.concurrent('generates link with operationRef', () => {
      const result = makeLinkOrReference({ operationRef: '#/paths/users/get' })
      expect(result).toBe('{operationRef:"#/paths/users/get"}')
    })
  })

  describe('makeContent', () => {
    it.concurrent('generates content with schema', () => {
      const result = makeContent({
        'application/json': { schema: { type: 'string' } },
      })
      expect(result).toEqual([`'application/json':{schema:z.string().openapi({"type":"string"})}`])
    })
  })

  describe('makeRequestBody', () => {
    it.concurrent('generates request body with $ref', () => {
      const result = makeRequestBody({ $ref: '#/components/requestBodies/CreateUser' })
      expect(result).toBe('CreateUserRequestBody')
    })
    it.concurrent('generates request body with content', () => {
      const result = makeRequestBody({
        description: 'User data',
        content: { 'application/json': { schema: { type: 'string' } } },
        required: true,
      })
      expect(result).toBe(
        `{description:"User data",content:{'application/json':{schema:z.string().openapi({"type":"string"})}},required:true}`,
      )
    })
  })

  describe('makeMedia', () => {
    it.concurrent('generates media with schema', () => {
      const result = makeMedia({ schema: { type: 'string' } })
      expect(result).toBe('{schema:z.string().openapi({"type":"string"})}')
    })
    it.concurrent('generates media with example', () => {
      const result = makeMedia({ schema: { type: 'string' }, example: 'test' })
      expect(result).toBe('{schema:z.string().openapi({"type":"string"}),example:"test"}')
    })
  })

  describe('makeEncoding', () => {
    it.concurrent('generates encoding with contentType', () => {
      const result = makeEncoding({ contentType: 'application/json' })
      expect(result).toBe('contentType:"application/json"')
    })
  })

  describe('makeParameters', () => {
    it.concurrent('groups parameters by location', () => {
      const result = makeParameters([
        { name: 'id', in: 'path', schema: { type: 'string' } },
        { name: 'page', in: 'query', schema: { type: 'integer' } },
      ])
      expect(result).toHaveProperty('path')
      expect(result).toHaveProperty('query')
      expect(result.path).toHaveProperty('id')
      expect(result.query).toHaveProperty('page')
    })
    it.concurrent('handles $ref parameters', () => {
      const result = makeParameters([
        {
          name: 'id',
          in: 'path',
          schema: { type: 'string' },
          $ref: '#/components/parameters/UserId',
        },
      ])
      expect(result.path.id).toBe('UserIdParamsSchema')
    })
    it.concurrent('applies coercion for query number parameters', () => {
      const result = makeParameters([{ name: 'page', in: 'query', schema: { type: 'number' } }])
      expect(result.query.page).toContain('z.coerce.')
    })
    it.concurrent('applies stringbool for query boolean parameters', () => {
      const result = makeParameters([{ name: 'active', in: 'query', schema: { type: 'boolean' } }])
      expect(result.query.active).toContain('stringbool')
    })
  })

  describe('makeOperationResponses', () => {
    it.concurrent('generates responses with numeric status codes', () => {
      const result = makeOperationResponses({
        200: { description: 'Success' },
        404: { description: 'Not found' },
      })
      expect(result).toBe('{200:{description:"Success"},404:{description:"Not found"}}')
    })
    it.concurrent('generates responses with string status codes', () => {
      const result = makeOperationResponses({
        default: { description: 'Default response' },
      })
      expect(result).toBe(`{'default':{description:"Default response"}}`)
    })
    it.concurrent('generates responses with $ref', () => {
      const result = makeOperationResponses({
        200: { $ref: '#/components/responses/Success' },
      })
      expect(result).toBe('{200:SuccessResponse}')
    })
  })

  describe('makeHeaderResponses', () => {
    it.concurrent('generates header responses with schema', () => {
      const result = makeHeaderResponses({
        'X-Rate-Limit': { schema: { type: 'integer' } },
      })
      expect(result).toBe(
        `z.object({"X-Rate-Limit":{schema:z.int().exactOptional().openapi({"type":"integer"})}})`,
      )
    })
    it.concurrent('generates header responses with $ref', () => {
      const result = makeHeaderResponses({
        'X-Custom': { $ref: '#/components/headers/CustomHeader' },
      })
      expect(result).toBe('z.object({"X-Custom":CustomHeaderHeaderSchema})')
    })
  })

  describe('makeHeadersAndReferences', () => {
    it.concurrent('generates header with description', () => {
      const result = makeHeadersAndReferences({
        description: 'Rate limit header',
        schema: { type: 'integer' },
      })
      expect(result).toBe(
        '{description:"Rate limit header",schema:z.int().exactOptional().openapi({description:"Rate limit header","type":"integer"})}',
      )
    })
    it.concurrent('generates header with $ref', () => {
      const result = makeHeadersAndReferences({
        $ref: '#/components/headers/RateLimit',
      })
      expect(result).toBe('RateLimitHeaderSchema')
    })
    it.concurrent('generates header with required and deprecated', () => {
      const result = makeHeadersAndReferences({
        required: true,
        deprecated: true,
        schema: { type: 'string' },
      })
      expect(result).toBe(
        '{required:true,deprecated:true,schema:z.string().openapi({deprecated:true,"type":"string"})}',
      )
    })
  })

  describe('makeRequest', () => {
    it.concurrent('generates request with parameters only', () => {
      const result = makeRequest(
        [{ name: 'id', in: 'path', schema: { type: 'string' } }],
        undefined,
      )
      expect(result).toBe(
        '{params:z.object({id:z.string().exactOptional().openapi({param:{"name":"id","in":"path","schema":{"type":"string"}},"type":"string"})})}',
      )
    })
    it.concurrent('generates request with body only', () => {
      const result = makeRequest(undefined, {
        content: { 'application/json': { schema: { type: 'object' } } },
      })
      expect(result).toBe(
        `{body:{content:{'application/json':{schema:z.object({}).openapi({"type":"object"})}}}}`,
      )
    })
    it.concurrent('generates request with both parameters and body', () => {
      const result = makeRequest([{ name: 'id', in: 'path', schema: { type: 'string' } }], {
        content: { 'application/json': { schema: { type: 'object' } } },
      })
      expect(result).toBe(
        `{params:z.object({id:z.string().exactOptional().openapi({param:{"name":"id","in":"path","schema":{"type":"string"}},"type":"string"})}),body:{content:{'application/json':{schema:z.object({}).openapi({"type":"object"})}}}}`,
      )
    })
    it.concurrent('returns undefined for empty request', () => {
      const result = makeRequest(undefined, undefined)
      expect(result).toBeUndefined()
    })
    it.concurrent('returns undefined for empty parameters array', () => {
      const result = makeRequest([], undefined)
      expect(result).toBeUndefined()
    })
  })

  describe('makeRequestParams', () => {
    it.concurrent('generates params for path parameter', () => {
      const result = makeRequestParams([{ name: 'id', in: 'path', schema: { type: 'string' } }])
      expect(result).toBe(
        'params:z.object({id:z.string().exactOptional().openapi({param:{"name":"id","in":"path","schema":{"type":"string"}},"type":"string"})})',
      )
    })
    it.concurrent('generates query for query parameter', () => {
      const result = makeRequestParams([{ name: 'page', in: 'query', schema: { type: 'integer' } }])
      expect(result).toBe(
        'query:z.object({page:z.int().exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"}},"type":"integer"})})',
      )
    })
    it.concurrent('generates header for header parameter', () => {
      const result = makeRequestParams([
        { name: 'X-Token', in: 'header', schema: { type: 'string' } },
      ])
      expect(result).toBe(
        `headers:z.object({"X-Token":z.string().exactOptional().openapi({param:{"name":"X-Token","in":"header","schema":{"type":"string"}},"type":"string"})})`,
      )
    })
    it.concurrent('generates cookie for cookie parameter', () => {
      const result = makeRequestParams([
        { name: 'session', in: 'cookie', schema: { type: 'string' } },
      ])
      expect(result).toBe(
        'cookies:z.object({session:z.string().exactOptional().openapi({param:{"name":"session","in":"cookie","schema":{"type":"string"}},"type":"string"})})',
      )
    })
    it.concurrent('returns undefined for empty parameters', () => {
      const result = makeRequestParams([])
      expect(result).toBeUndefined()
    })
  })

  describe('makeCallbacks', () => {
    it.concurrent('generates callback with $ref', () => {
      const result = makeCallbacks({
        onEvent: { $ref: '#/components/callbacks/EventCallback' },
      })
      expect(result).toBe('"onEvent":EventCallback')
    })
    it.concurrent('generates callback with operation', () => {
      const result = makeCallbacks({
        '{$request.body#/callbackUrl}': {
          post: {
            responses: {
              200: { description: 'Success' },
            },
          },
        },
      })
      expect(result).toBe(
        '"{$request.body#/callbackUrl}":{post:{responses:{200:{description:"Success"}}}}',
      )
    })
  })
})
