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
  makeOperationCallbacks,
  makeOperationResponses,
  makeParameters,
  makeRef,
  makeRequest,
  makeRequestBody,
  makeRequestParams,
  makeResponses,
} from './openapi.js'

describe('openapi helper', () => {
  describe('makeRef', () => {
    it.concurrent.each([
      ['#/components/schemas/Test', 'TestSchema'],
      ['#/components/parameters/Test', 'TestParamsSchema'],
      ['#/components/headers/Test', 'TestHeaderSchema'],
      ['#/components/securitySchemes/Test', 'TestSecurityScheme'],
      ['#/components/requestBodies/Test', 'TestRequestBody'],
      ['#/components/responses/Test', 'TestResponse'],
      ['#/components/examples/Test', 'TestExample'],
      ['#/components/links/Test', 'TestLink'],
      ['#/components/callbacks/Test', 'TestCallback'],
      ['#/components/schemas/Test%20Name', 'TestNameSchema'],
      ['', 'Schema'],
      ['#/components/schemas/TestSchema', 'TestSchema'],
      ['#/components/parameters/TestParamsSchema', 'TestParamsSchema'],
      ['#/components/schemas/User/properties/parent', 'z.lazy(()=>UserSchema)'],
      ['#/components/schemas/UserSchema/properties/children', 'z.lazy(()=>UserSchema)'],
      ['#/unknown/path/Test', 'TestSchema'],
      ['#/components/schemas/my-test-schema', 'MyTestSchemaSchema'],
      ['#/components/schemas/my_test_schema', 'MyTestSchemaSchema'],
      ['#/components/schemas/Test%2FName%2FPath', 'TestNamePathSchema'],
      ['#/components/headers/RateLimitHeaderSchema', 'RateLimitHeaderSchema'],
      ['#/components/responses/ErrorResponse', 'ErrorResponse'],
      ['#/components/callbacks/EventCallback', 'EventCallback'],
      [
        '#/components/schemas/Category/properties/subcategories/items',
        'z.lazy(()=>CategorySchema)',
      ],
    ])('makeRef(%s) -> %s', ($ref, expected) => {
      expect(makeRef($ref)).toBe(expected)
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
      expect(result).toBe(`{"example1":MyExample}`)
    })
    it.concurrent('generates example with defaultValue', () => {
      const result = makeExamples({
        example1: { defaultValue: 'default-test' },
      })
      expect(result).toBe(`{"example1":{defaultValue:"default-test"}}`)
    })
    it.concurrent('generates example with serializedValue', () => {
      const result = makeExamples({
        example1: { serializedValue: 'serialized-test' },
      })
      expect(result).toBe(`{"example1":{serializedValue:"serialized-test"}}`)
    })
    it.concurrent('generates example with externalValue', () => {
      const result = makeExamples({
        example1: { externalValue: 'https://example.com/data.json' },
      })
      expect(result).toBe(`{"example1":{externalValue:"https://example.com/data.json"}}`)
    })
    it.concurrent('generates multiple examples', () => {
      const result = makeExamples({
        example1: { value: 'value1' },
        example2: { value: 'value2' },
      })
      expect(result).toBe(`{"example1":{value:"value1"},"example2":{value:"value2"}}`)
    })
    it.concurrent('generates example with all fields', () => {
      const result = makeExamples({
        full: { summary: 'Full example', description: 'Full description', value: 'test-value' },
      })
      expect(result).toBe(
        `{"full":{summary:"Full example",description:"Full description",value:"test-value"}}`,
      )
    })
    it.concurrent('generates example with numeric value', () => {
      const result = makeExamples({
        example1: { value: 123 },
      })
      expect(result).toBe(`{"example1":{value:123}}`)
    })
    it.concurrent('generates example with boolean value', () => {
      const result = makeExamples({
        example1: { value: true },
      })
      expect(result).toBe(`{"example1":{value:true}}`)
    })
    it.concurrent('generates example with null value', () => {
      const result = makeExamples({
        example1: { value: null },
      })
      expect(result).toBe(`{"example1":{value:null}}`)
    })
    it.concurrent('generates example with object value', () => {
      const result = makeExamples({
        example1: { value: { id: 1, name: 'test' } },
      })
      expect(result).toBe(`{"example1":{value:{"id":1,"name":"test"}}}`)
    })
    it.concurrent('generates example with array value', () => {
      const result = makeExamples({
        example1: { value: [1, 2, 3] },
      })
      expect(result).toBe(`{"example1":{value:[1,2,3]}}`)
    })
    it.concurrent('generates example with $ref to schemas', () => {
      const result = makeExamples({
        example1: { $ref: '#/components/schemas/User' } as const,
      })
      expect(result).toBe(`{"example1":UserSchema}`)
    })
    it.concurrent('generates example with empty object', () => {
      const result = makeExamples({})
      expect(result).toBe('{}')
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
    it.concurrent('generates response with summary', () => {
      const result = makeResponses({ summary: 'Success summary', description: 'Desc' })
      expect(result).toBe('{summary:"Success summary",description:"Desc"}')
    })
    it.concurrent('generates response with headers', () => {
      const result = makeResponses({
        description: 'Success',
        headers: { 'X-Rate-Limit': { schema: { type: 'integer' } } },
      })
      expect(result).toBe(
        '{description:"Success",headers:z.object({"X-Rate-Limit":{schema:z.int().exactOptional()}})}',
      )
    })
    it.concurrent('generates response with content', () => {
      const result = makeResponses({
        description: 'Success',
        content: { 'application/json': { schema: { type: 'string' } } },
      })
      expect(result).toBe(
        `{description:"Success",content:{'application/json':{schema:z.string()}}}`,
      )
    })
    it.concurrent('generates response with links', () => {
      const result = makeResponses({
        description: 'Success',
        links: { GetUser: { operationId: 'getUser' } },
      })
      expect(result).toBe('{description:"Success",links:{"GetUser":{operationId:"getUser"}}}')
    })
    it.concurrent('generates response with link $ref', () => {
      const result = makeResponses({
        description: 'Success',
        links: { GetUser: { $ref: '#/components/links/UserLink' } },
      })
      expect(result).toBe('{description:"Success",links:{"GetUser":UserLink}}')
    })
    it.concurrent('generates response with all fields', () => {
      const result = makeResponses({
        summary: 'Sum',
        description: 'Desc',
        headers: { 'X-Custom': { schema: { type: 'string' } } },
        content: { 'application/json': { schema: { type: 'object' } } },
        links: { Next: { operationId: 'getNext' } },
      })
      expect(result).toBe(
        `{summary:"Sum",description:"Desc",headers:z.object({"X-Custom":{schema:z.string().exactOptional()}}),content:{'application/json':{schema:z.object({})}},links:{"Next":{operationId:"getNext"}}}`,
      )
    })
    it.concurrent('generates empty response object', () => {
      const result = makeResponses({})
      expect(result).toBe('{}')
    })
    it.concurrent('generates response with multiple links', () => {
      const result = makeResponses({
        description: 'Success',
        links: {
          GetUser: { operationId: 'getUser' },
          UpdateUser: { operationId: 'updateUser' },
        },
      })
      expect(result).toBe(
        '{description:"Success",links:{"GetUser":{operationId:"getUser"},"UpdateUser":{operationId:"updateUser"}}}',
      )
    })
    it.concurrent('generates response with header $ref', () => {
      const result = makeResponses({
        description: 'Success',
        headers: { 'X-Rate-Limit': { $ref: '#/components/headers/RateLimit' } },
      })
      expect(result).toBe(
        '{description:"Success",headers:z.object({"X-Rate-Limit":RateLimitHeaderSchema})}',
      )
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
    it.concurrent('generates link with parameters', () => {
      const result = makeLinkOrReference({
        operationId: 'getUser',
        parameters: { userId: '$response.body#/id' },
      })
      expect(result).toBe('{operationId:"getUser",parameters:{"userId":"$response.body#/id"}}')
    })
    it.concurrent('generates link with requestBody', () => {
      const result = makeLinkOrReference({
        operationId: 'updateUser',
        requestBody: '$response.body',
      })
      expect(result).toBe('{operationId:"updateUser",requestBody:"$response.body"}')
    })
    it.concurrent('generates link with description', () => {
      const result = makeLinkOrReference({
        operationId: 'getUser',
        description: 'Link to get user',
      })
      expect(result).toBe('{operationId:"getUser",description:"Link to get user"}')
    })
    it.concurrent('generates link with server', () => {
      const result = makeLinkOrReference({
        operationId: 'getUser',
        server: { url: 'https://api.example.com' },
        // biome-ignore lint: test
      } as any)
      expect(result).toBe('{operationId:"getUser",server:{"url":"https://api.example.com"}}')
    })
    it.concurrent('generates link with summary', () => {
      const result = makeLinkOrReference({
        operationId: 'getUser',
        summary: 'Get user link',
      })
      expect(result).toBe('{operationId:"getUser",summary:"Get user link"}')
    })
    it.concurrent('generates link with $ref', () => {
      const result = makeLinkOrReference({
        $ref: '#/components/links/UserLink',
      })
      expect(result).toBe('{$ref:UserLink}')
    })
    it.concurrent('generates link with all fields', () => {
      const result = makeLinkOrReference({
        operationRef: '#/paths/users/get',
        operationId: 'getUser',
        parameters: { id: '123' },
        requestBody: { name: 'test' },
        description: 'Full link',
        server: { url: 'https://api.example.com' },
        summary: 'Summary',
        // biome-ignore lint: test
      } as any)
      expect(result).toBe(
        '{operationRef:"#/paths/users/get",operationId:"getUser",parameters:{"id":"123"},requestBody:{"name":"test"},description:"Full link",server:{"url":"https://api.example.com"},summary:"Summary"}',
      )
    })
  })

  describe('makeContent', () => {
    it.concurrent('generates content with schema', () => {
      const result = makeContent({
        'application/json': { schema: { type: 'string' } },
      })
      expect(result).toStrictEqual([`'application/json':{schema:z.string()}`])
    })
    it.concurrent('generates content with $ref', () => {
      const result = makeContent({
        'application/json': { $ref: '#/components/schemas/User' },
      })
      expect(result).toStrictEqual([`'application/json':UserSchema`])
    })
    it.concurrent('generates multiple content types', () => {
      const result = makeContent({
        'application/json': { schema: { type: 'string' } },
        'application/xml': { schema: { type: 'string' } },
      })
      expect(result).toStrictEqual([
        `'application/json':{schema:z.string()}`,
        `'application/xml':{schema:z.string()}`,
      ])
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
        `{description:"User data",content:{'application/json':{schema:z.string()}},required:true}`,
      )
    })
    it.concurrent('generates request body with description only', () => {
      const result = makeRequestBody({ description: 'Request description' })
      expect(result).toBe('{description:"Request description"}')
    })
    it.concurrent('generates request body with content only', () => {
      const result = makeRequestBody({
        content: { 'application/json': { schema: { type: 'object' } } },
      })
      expect(result).toBe(`{content:{'application/json':{schema:z.object({})}}}`)
    })
    it.concurrent('generates request body with required false', () => {
      const result = makeRequestBody({
        content: { 'application/json': { schema: { type: 'string' } } },
        required: false,
      })
      expect(result).toBe(`{content:{'application/json':{schema:z.string()}}}`)
    })
    it.concurrent('generates empty request body', () => {
      const result = makeRequestBody({})
      expect(result).toBe('{}')
    })
    it.concurrent('generates request body with multiple content types', () => {
      const result = makeRequestBody({
        content: {
          'application/json': { schema: { type: 'object' } },
          'application/xml': { schema: { type: 'object' } },
        },
      })
      expect(result).toBe(
        `{content:{'application/json':{schema:z.object({})},'application/xml':{schema:z.object({})}}}`,
      )
    })
  })

  describe('makeMedia', () => {
    it.concurrent('generates media with schema', () => {
      const result = makeMedia({ schema: { type: 'string' } })
      expect(result).toBe('{schema:z.string()}')
    })
    it.concurrent('generates media with example', () => {
      const result = makeMedia({ schema: { type: 'string' }, example: 'test' })
      expect(result).toBe('{schema:z.string(),example:"test"}')
    })
    it.concurrent('generates media with itemSchema', () => {
      const result = makeMedia({
        schema: { type: 'array', items: { type: 'string' } },
        itemSchema: { type: 'string' },
        // biome-ignore lint: test
      } as any)
      expect(result).toBe('{schema:z.array(z.string()),itemSchema:z.string()}')
    })
    it.concurrent('generates media with examples', () => {
      const result = makeMedia({
        schema: { type: 'string' },
        examples: { sample: { value: 'example-value' } },
      })
      expect(result).toBe('{schema:z.string(),examples:{"sample":{value:"example-value"}}}')
    })
    it.concurrent('generates media with encoding', () => {
      const result = makeMedia({
        schema: { type: 'object' },
        encoding: { file: { contentType: 'application/octet-stream' } },
      })
      expect(result).toBe(
        '{schema:z.object({}),encoding:{"file":{contentType:"application/octet-stream"}}}',
      )
    })
    it.concurrent('generates media with prefixEncoding', () => {
      const result = makeMedia({
        schema: { type: 'object' },
        prefixEncoding: { contentType: 'text/plain' },
      })
      expect(result).toBe('{schema:z.object({}),prefixEncoding:{contentType:"text/plain"}}')
    })
    it.concurrent('generates media with itemEncoding', () => {
      const result = makeMedia({
        schema: { type: 'array' },
        itemEncoding: { contentType: 'application/json' },
      })
      expect(result).toBe('{schema:z.array(z.any()),itemEncoding:{contentType:"application/json"}}')
    })
  })

  describe('makeEncoding', () => {
    it.concurrent('generates encoding with contentType', () => {
      const result = makeEncoding({ contentType: 'application/json' })
      expect(result).toBe('contentType:"application/json"')
    })
    it.concurrent('generates encoding with headers', () => {
      const result = makeEncoding({
        contentType: 'multipart/form-data',
        headers: { 'Content-Disposition': { schema: { type: 'string' } } },
      })
      expect(result).toBe(
        'contentType:"multipart/form-data",headers:{"Content-Disposition":{schema:z.string().exactOptional()}}',
      )
    })
    it.concurrent('generates encoding with nested encoding', () => {
      const result = makeEncoding({
        encoding: { nested: { contentType: 'text/plain' } },
      })
      expect(result).toBe('encoding:{"nested":{contentType:"text/plain"}}')
    })
    it.concurrent('generates encoding with prefixEncoding', () => {
      const result = makeEncoding({
        prefixEncoding: { contentType: 'application/octet-stream' },
      })
      expect(result).toBe('prefixEncoding:{contentType:"application/octet-stream"}')
    })
    it.concurrent('generates encoding with itemEncoding', () => {
      const result = makeEncoding({
        itemEncoding: { contentType: 'application/json' },
      })
      expect(result).toBe('itemEncoding:{contentType:"application/json"}')
    })
    it.concurrent('generates encoding with all fields', () => {
      const result = makeEncoding({
        contentType: 'multipart/form-data',
        headers: { 'X-Custom': { schema: { type: 'string' } } },
        encoding: { part: { contentType: 'text/plain' } },
        prefixEncoding: { contentType: 'text/csv' },
        itemEncoding: { contentType: 'application/xml' },
      })
      expect(result).toBe(
        'contentType:"multipart/form-data",headers:{"X-Custom":{schema:z.string().exactOptional()}},encoding:{"part":{contentType:"text/plain"}},prefixEncoding:{contentType:"text/csv"},itemEncoding:{contentType:"application/xml"}',
      )
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
    it.concurrent('handles parameters with content instead of schema', () => {
      const result = makeParameters([
        {
          name: 'filter',
          in: 'query',
          content: { 'application/json': { schema: { type: 'object' } } },
          // biome-ignore lint: test
        } as any,
      ])
      expect(result.query.filter).toBe(
        'z.object({}).exactOptional().openapi({param:{"name":"filter","in":"query","content":{"application/json":{"schema":{"type":"object"}}}}})',
      )
    })
    it.concurrent('handles parameters without schema returns z.any()', () => {
      // biome-ignore lint: test
      const result = makeParameters([{ name: 'unknown', in: 'query' }] as any)
      expect(result.query.unknown).toBe('z.any()')
    })
    it.concurrent('applies coercion for query date parameters', () => {
      const result = makeParameters([{ name: 'date', in: 'query', schema: { type: 'date' } }])
      expect(result.query.date).toContain('z.coerce.')
    })
    it.concurrent('generates multiple parameters in same location with exact string output', () => {
      const result = makeParameters([
        { name: 'page', in: 'query', schema: { type: 'integer' } },
        { name: 'limit', in: 'query', schema: { type: 'integer' } },
      ])
      expect(result.query.page).toBe(
        'z.int().exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"}}})',
      )
      expect(result.query.limit).toBe(
        'z.int().exactOptional().openapi({param:{"name":"limit","in":"query","schema":{"type":"integer"}}})',
      )
    })
    it.concurrent('generates path parameter with exact string output', () => {
      const result = makeParameters([{ name: 'userId', in: 'path', schema: { type: 'string' } }])
      expect(result.path.userId).toBe(
        'z.string().exactOptional().openapi({param:{"name":"userId","in":"path","schema":{"type":"string"}}})',
      )
    })
    it.concurrent('generates header parameter with exact string output', () => {
      const result = makeParameters([
        { name: 'Authorization', in: 'header', schema: { type: 'string' } },
      ])
      expect(result.header.Authorization).toBe(
        'z.string().exactOptional().openapi({param:{"name":"Authorization","in":"header","schema":{"type":"string"}}})',
      )
    })
    it.concurrent('generates cookie parameter with exact string output', () => {
      const result = makeParameters([
        { name: 'session_id', in: 'cookie', schema: { type: 'string' } },
      ])
      expect(result.cookie.session_id).toBe(
        'z.string().exactOptional().openapi({param:{"name":"session_id","in":"cookie","schema":{"type":"string"}}})',
      )
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
    it.concurrent('generates responses with mixed numeric and string status codes', () => {
      const result = makeOperationResponses({
        200: { description: 'Success' },
        default: { description: 'Error' },
      })
      expect(result).toBe(`{200:{description:"Success"},'default':{description:"Error"}}`)
    })
    it.concurrent('generates responses with 2XX status code pattern', () => {
      const result = makeOperationResponses({
        '2XX': { description: 'Success' },
      })
      expect(result).toBe(`{'2XX':{description:"Success"}}`)
    })
    it.concurrent('generates single response', () => {
      const result = makeOperationResponses({
        200: { description: 'OK' },
      })
      expect(result).toBe('{200:{description:"OK"}}')
    })
  })

  describe('makeHeaderResponses', () => {
    it.concurrent('generates header responses with schema', () => {
      const result = makeHeaderResponses({
        'X-Rate-Limit': { schema: { type: 'integer' } },
      })
      expect(result).toBe(`z.object({"X-Rate-Limit":{schema:z.int().exactOptional()}})`)
    })
    it.concurrent('generates header responses with $ref', () => {
      const result = makeHeaderResponses({
        'X-Custom': { $ref: '#/components/headers/CustomHeader' },
      })
      expect(result).toBe('z.object({"X-Custom":CustomHeaderHeaderSchema})')
    })
    it.concurrent('generates multiple header responses', () => {
      const result = makeHeaderResponses({
        'X-Rate-Limit': { schema: { type: 'integer' } },
        'X-Rate-Remaining': { schema: { type: 'integer' } },
        'X-Rate-Reset': { schema: { type: 'integer' } },
      })
      expect(result).toBe(
        `z.object({"X-Rate-Limit":{schema:z.int().exactOptional()},"X-Rate-Remaining":{schema:z.int().exactOptional()},"X-Rate-Reset":{schema:z.int().exactOptional()}})`,
      )
    })
    it.concurrent('generates header responses with mixed schema and $ref', () => {
      const result = makeHeaderResponses({
        'X-Rate-Limit': { schema: { type: 'integer' } },
        'X-Custom': { $ref: '#/components/headers/CustomHeader' },
      })
      expect(result).toBe(
        `z.object({"X-Rate-Limit":{schema:z.int().exactOptional()},"X-Custom":CustomHeaderHeaderSchema})`,
      )
    })
  })

  describe('makeHeadersAndReferences', () => {
    it.concurrent('generates header with description', () => {
      const result = makeHeadersAndReferences({
        description: 'Rate limit header',
        schema: { type: 'integer' },
      })
      expect(result).toBe(
        '{description:"Rate limit header",schema:z.int().exactOptional().openapi({description:"Rate limit header"})}',
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
        '{required:true,deprecated:true,schema:z.string().openapi({deprecated:true})}',
      )
    })
    it.concurrent('generates header with example', () => {
      const result = makeHeadersAndReferences({
        schema: { type: 'string' },
        example: 'example-value',
      })
      expect(result).toBe(
        '{example:"example-value",schema:z.string().exactOptional().openapi({example:"example-value"})}',
      )
    })
    it.concurrent('generates header with examples', () => {
      const result = makeHeadersAndReferences({
        schema: { type: 'string' },
        examples: { sample: { value: 'sample-value' } },
      })
      expect(result).toBe(
        '{examples:{"sample":{value:"sample-value"}},schema:z.string().exactOptional().openapi({examples:{"sample":{value:"sample-value"}}})}',
      )
    })
    it.concurrent('generates header with style', () => {
      const result = makeHeadersAndReferences({
        schema: { type: 'array', items: [{ type: 'string' }] },
        style: 'simple',
      })
      expect(result).toBe(
        '{style:"simple",schema:z.array(z.string().exactOptional().openapi({style:"simple"})).exactOptional().openapi({style:"simple"})}',
      )
    })
    it.concurrent('generates header with explode', () => {
      const result = makeHeadersAndReferences({
        schema: { type: 'array', items: [{ type: 'string' }] },
        explode: true,
      })
      expect(result).toBe(
        '{explode:true,schema:z.array(z.string().exactOptional().openapi({explode:true})).exactOptional().openapi({explode:true})}',
      )
    })
    it.concurrent('generates header with content', () => {
      const result = makeHeadersAndReferences({
        content: { 'application/json': { schema: { type: 'object' } } },
      })
      expect(result).toBe(`{content:'application/json':{schema:z.object({})}}`)
    })
  })

  describe('makeRequest', () => {
    it.concurrent('generates request with parameters only', () => {
      const result = makeRequest(
        [{ name: 'id', in: 'path', schema: { type: 'string' } }],
        undefined,
      )
      expect(result).toBe(
        '{params:z.object({id:z.string().exactOptional().openapi({param:{"name":"id","in":"path","schema":{"type":"string"}}})})}',
      )
    })
    it.concurrent('generates request with body only', () => {
      const result = makeRequest(undefined, {
        content: { 'application/json': { schema: { type: 'object' } } },
      })
      expect(result).toBe(`{body:{content:{'application/json':{schema:z.object({})}}}}`)
    })
    it.concurrent('generates request with both parameters and body', () => {
      const result = makeRequest([{ name: 'id', in: 'path', schema: { type: 'string' } }], {
        content: { 'application/json': { schema: { type: 'object' } } },
      })
      expect(result).toBe(
        `{params:z.object({id:z.string().exactOptional().openapi({param:{"name":"id","in":"path","schema":{"type":"string"}}})}),body:{content:{'application/json':{schema:z.object({})}}}}`,
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
    it.concurrent('generates request with $ref body', () => {
      const result = makeRequest(undefined, {
        $ref: '#/components/requestBodies/UserBody',
      })
      expect(result).toBe('{body:UserBodyRequestBody}')
    })
    it.concurrent('generates request with query parameters', () => {
      const result = makeRequest(
        [{ name: 'page', in: 'query', schema: { type: 'integer' } }],
        undefined,
      )
      expect(result).toBe(
        '{query:z.object({page:z.int().exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"}}})})}',
      )
    })
    it.concurrent('generates request with header parameters', () => {
      const result = makeRequest(
        [{ name: 'X-Api-Key', in: 'header', schema: { type: 'string' } }],
        undefined,
      )
      expect(result).toBe(
        `{headers:z.object({"X-Api-Key":z.string().exactOptional().openapi({param:{"name":"X-Api-Key","in":"header","schema":{"type":"string"}}})})}`,
      )
    })
    it.concurrent('generates request with multiple parameter types', () => {
      const result = makeRequest(
        [
          { name: 'id', in: 'path', schema: { type: 'string' } },
          { name: 'page', in: 'query', schema: { type: 'integer' } },
        ],
        undefined,
      )
      expect(result).toBe(
        '{params:z.object({id:z.string().exactOptional().openapi({param:{"name":"id","in":"path","schema":{"type":"string"}}})}),query:z.object({page:z.int().exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"}}})})}',
      )
    })
  })

  describe('makeRequestParams', () => {
    it.concurrent('generates params for path parameter', () => {
      const result = makeRequestParams([{ name: 'id', in: 'path', schema: { type: 'string' } }])
      expect(result).toBe(
        'params:z.object({id:z.string().exactOptional().openapi({param:{"name":"id","in":"path","schema":{"type":"string"}}})})',
      )
    })
    it.concurrent('generates query for query parameter', () => {
      const result = makeRequestParams([{ name: 'page', in: 'query', schema: { type: 'integer' } }])
      expect(result).toBe(
        'query:z.object({page:z.int().exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"}}})})',
      )
    })
    it.concurrent('generates header for header parameter', () => {
      const result = makeRequestParams([
        { name: 'X-Token', in: 'header', schema: { type: 'string' } },
      ])
      expect(result).toBe(
        `headers:z.object({"X-Token":z.string().exactOptional().openapi({param:{"name":"X-Token","in":"header","schema":{"type":"string"}}})})`,
      )
    })
    it.concurrent('generates cookie for cookie parameter', () => {
      const result = makeRequestParams([
        { name: 'session', in: 'cookie', schema: { type: 'string' } },
      ])
      expect(result).toBe(
        'cookies:z.object({session:z.string().exactOptional().openapi({param:{"name":"session","in":"cookie","schema":{"type":"string"}}})})',
      )
    })
    it.concurrent('returns undefined for empty parameters', () => {
      const result = makeRequestParams([])
      expect(result).toBeUndefined()
    })
    it.concurrent('generates multiple parameter types combined', () => {
      const result = makeRequestParams([
        { name: 'id', in: 'path', schema: { type: 'string' } },
        { name: 'page', in: 'query', schema: { type: 'integer' } },
        { name: 'Authorization', in: 'header', schema: { type: 'string' } },
      ])
      expect(result).toBe(
        'params:z.object({id:z.string().exactOptional().openapi({param:{"name":"id","in":"path","schema":{"type":"string"}}})}),query:z.object({page:z.int().exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"}}})}),headers:z.object({Authorization:z.string().exactOptional().openapi({param:{"name":"Authorization","in":"header","schema":{"type":"string"}}})})',
      )
    })
    it.concurrent('generates multiple query parameters', () => {
      const result = makeRequestParams([
        { name: 'page', in: 'query', schema: { type: 'integer' } },
        { name: 'limit', in: 'query', schema: { type: 'integer' } },
        { name: 'sort', in: 'query', schema: { type: 'string' } },
      ])
      expect(result).toBe(
        'query:z.object({page:z.int().exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"}}}),limit:z.int().exactOptional().openapi({param:{"name":"limit","in":"query","schema":{"type":"integer"}}}),sort:z.string().exactOptional().openapi({param:{"name":"sort","in":"query","schema":{"type":"string"}}})})',
      )
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
    it.concurrent('generates callback with full operation details', () => {
      const result = makeCallbacks({
        '{$request.body#/callbackUrl}': {
          post: {
            tags: ['callback'],
            summary: 'Callback summary',
            description: 'Callback description',
            operationId: 'callbackOp',
            requestBody: {
              content: { 'application/json': { schema: { type: 'object' } } },
            },
            responses: {
              200: { description: 'Success' },
            },
            deprecated: true,
          },
        },
      })
      expect(result).toBe(
        `"{$request.body#/callbackUrl}":{post:{tags:["callback"],summary:"Callback summary",description:"Callback description",operationId:"callbackOp",requestBody:{content:{'application/json':{schema:z.object({})}}},responses:{200:{description:"Success"}},deprecated:true}}`,
      )
    })
    it.concurrent('generates callback with multiple methods', () => {
      const result = makeCallbacks({
        '{$callback}': {
          get: {
            responses: { 200: { description: 'Get success' } },
          },
          post: {
            responses: { 201: { description: 'Post success' } },
          },
        },
      })
      expect(result).toBe(
        '"{$callback}":{get:{responses:{200:{description:"Get success"}}},post:{responses:{201:{description:"Post success"}}}}',
      )
    })
    it.concurrent('generates callback with parameters', () => {
      const result = makeCallbacks({
        '{$request.body#/url}': {
          post: {
            parameters: [{ name: 'id', in: 'path', schema: { type: 'string' } }],
            responses: { 200: { description: 'Success' } },
          },
        },
      })
      expect(result).toBe(
        '"{$request.body#/url}":{post:{parameters:[z.string().exactOptional().openapi({param:{"name":"id","in":"path","schema":{"type":"string"}}})],responses:{200:{description:"Success"}}}}',
      )
    })
    it.concurrent('generates callback with external docs', () => {
      const result = makeCallbacks({
        '{$callback}': {
          get: {
            externalDocs: { url: 'https://example.com/docs' },
            responses: { 200: { description: 'Success' } },
          },
        },
      })
      expect(result).toBe(
        '"{$callback}":{get:{externalDocs:{"url":"https://example.com/docs"},responses:{200:{description:"Success"}}}}',
      )
    })
    it.concurrent('generates callback with servers', () => {
      const result = makeCallbacks({
        '{$callback}': {
          post: {
            servers: [{ url: 'https://api.example.com' }],
            responses: { 200: { description: 'Success' } },
          },
        },
      })
      expect(result).toBe(
        '"{$callback}":{post:{responses:{200:{description:"Success"}},servers:[{"url":"https://api.example.com"}]}}',
      )
    })
    it.concurrent('generates multiple callbacks', () => {
      const result = makeCallbacks({
        onSuccess: { $ref: '#/components/callbacks/SuccessCallback' },
        onError: { $ref: '#/components/callbacks/ErrorCallback' },
      })
      expect(result).toBe('"onSuccess":SuccessCallback,"onError":ErrorCallback')
    })
  })

  describe('makeOperationCallbacks', () => {
    it.concurrent('returns undefined for undefined callbacks', () => {
      const result = makeOperationCallbacks(undefined)
      expect(result).toBeUndefined()
    })
    it.concurrent('generates operation callback with $ref', () => {
      const result = makeOperationCallbacks({
        onEvent: { $ref: '#/components/callbacks/EventCallback' },
      })
      expect(result).toBe('{"onEvent":EventCallback}')
    })
    it.concurrent('generates operation callback with summary and description', () => {
      const result = makeOperationCallbacks({
        onEvent: { summary: 'Event callback', description: 'Handles events' },
      })
      expect(result).toBe('{"onEvent":{summary:"Event callback",description:"Handles events"}}')
    })
    it.concurrent('generates operation callback with summary only', () => {
      const result = makeOperationCallbacks({
        onEvent: { summary: 'Event summary' },
      })
      expect(result).toBe('{"onEvent":{summary:"Event summary"}}')
    })
    it.concurrent('generates operation callback with description only', () => {
      const result = makeOperationCallbacks({
        onEvent: { description: 'Event description' },
      })
      expect(result).toBe('{"onEvent":{description:"Event description"}}')
    })
    it.concurrent('generates multiple operation callbacks', () => {
      const result = makeOperationCallbacks({
        onSuccess: { summary: 'Success' },
        onError: { summary: 'Error' },
      })
      expect(result).toBe('{"onSuccess":{summary:"Success"},"onError":{summary:"Error"}}')
    })
  })
})
