import { describe, expect, it } from 'vite-plus/test'

import type { Schema } from '../openapi/index.js'
import {
  makeCallback,
  makeCallbacks,
  makeContent,
  makeEncoding,
  makeExamples,
  makeHeaderResponses,
  makeHeadersAndReferences,
  makeLinkOrReference,
  makeMedia,
  makeOperation,
  makeOperationResponses,
  makeParameterSchema,
  makeParameters,
  makePathItem,
  makePathParameters,
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
      ['#/components/pathItems/Test', 'TestPathItem'],
      ['#/components/pathItems/UserOperations', 'UserOperationsPathItem'],
      ['#/components/schemas/Test%20Name', 'TestNameSchema'],
      ['', 'Schema'],
      ['#/components/schemas/TestSchema', 'TestSchemaSchema'],
      ['#/components/parameters/TestParamsSchema', 'TestParamsSchemaParamsSchema'],
      ['#/components/schemas/User/properties/parent', 'z.lazy(()=>UserSchema)'],
      ['#/components/schemas/UserSchema/properties/children', 'z.lazy(()=>UserSchemaSchema)'],
      ['#/unknown/path/Test', 'TestSchema'],
      ['#/components/schemas/my-test-schema', 'MyTestSchemaSchema'],
      ['#/components/schemas/my_test_schema', 'MyTestSchemaSchema'],
      ['#/components/schemas/Test%2FName%2FPath', 'TestNamePathSchema'],
      ['#/components/headers/RateLimitHeaderSchema', 'RateLimitHeaderSchemaHeaderSchema'],
      ['#/components/responses/ErrorResponse', 'ErrorResponseResponse'],
      ['#/components/callbacks/EventCallback', 'EventCallbackCallback'],
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
      expect(result).toBe(`{"example1":MyExampleExample}`)
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
        '{description:"Success",headers:z.object({"X-Rate-Limit":{schema:z.int().exactOptional().openapi({param:{required:false}})}})}',
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
      expect(result).toBe('{description:"Success",links:{"GetUser":UserLinkLink}}')
    })
    it.concurrent('emits keys in Responses type order (summary, description, content, headers, links)', () => {
      const result = makeResponses({
        summary: 'Sum',
        description: 'Desc',
        headers: { 'X-Custom': { schema: { type: 'string' } } },
        content: { 'application/json': { schema: { type: 'object' } } },
        links: { Next: { operationId: 'getNext' } },
      })
      expect(result).toBe(
        `{summary:"Sum",description:"Desc",content:{'application/json':{schema:z.object({})}},headers:z.object({"X-Custom":{schema:z.string().exactOptional().openapi({param:{required:false}})}}),links:{"Next":{operationId:"getNext"}}}`,
      )
    })
    it.concurrent('generates empty response object with description fallback', () => {
      const result = makeResponses({})
      expect(result).toBe('{description:""}')
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
      })
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
      expect(result).toBe('{$ref:UserLinkLink}')
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
      })
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
    it.concurrent('escapes a malformed content type containing a single quote', () => {
      const result = makeContent({
        "application/json'malicious": { schema: { type: 'string' } },
      })
      expect(result).toStrictEqual([`"application/json'malicious":{schema:z.string()}`])
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
        'contentType:"multipart/form-data",headers:{"Content-Disposition":{schema:z.string().exactOptional().openapi({param:{required:false}})}}',
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
        'contentType:"multipart/form-data",headers:{"X-Custom":{schema:z.string().exactOptional().openapi({param:{required:false}})}},encoding:{"part":{contentType:"text/plain"}},prefixEncoding:{contentType:"text/csv"},itemEncoding:{contentType:"application/xml"}',
      )
    })
  })

  describe('makeParameters', () => {
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
      expect(result.query.page).toBe(
        String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.number()).exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"number"},"required":false}})`,
      )
    })
    it.concurrent('applies stringbool for query boolean parameters', () => {
      const result = makeParameters([{ name: 'active', in: 'query', schema: { type: 'boolean' } }])
      expect(result.query.active).toBe(
        'z.stringbool().exactOptional().openapi({param:{"name":"active","in":"query","schema":{"type":"boolean"},"required":false}})',
      )
    })
    it.concurrent('preserves z.coerce.boolean() for query boolean with x-coerce (no z.coerce.stringbool crash)', () => {
      const result = makeParameters([
        { name: 'flag', in: 'query', schema: { type: 'boolean', 'x-coerce': true } },
      ])
      expect(result.query.flag).toBe(
        'z.coerce.boolean().exactOptional().openapi({param:{"name":"flag","in":"query","schema":{"type":"boolean","x-coerce":true},"required":false}})',
      )
    })
    it.concurrent('handles parameters with content instead of schema', () => {
      const result = makeParameters([
        {
          name: 'filter',
          in: 'query',
          content: { 'application/json': { schema: { type: 'object' } } },
        },
      ])
      expect(result.query.filter).toBe(
        `z.preprocess((val)=>{if(typeof val!=='string')return val;try{return JSON.parse(val)}catch{return val}},z.object({})).exactOptional().openapi({param:{"name":"filter","in":"query","content":{"application/json":{"schema":{"type":"object"}}},"required":false}})`,
      )
    })
    it.concurrent('handles parameters without schema returns z.any()', () => {
      const result = makeParameters([{ name: 'unknown', in: 'query' }])
      expect(result.query.unknown).toBe('z.any()')
    })
    it.concurrent('applies coercion for query date parameters', () => {
      const result = makeParameters([{ name: 'date', in: 'query', schema: { type: 'date' } }])
      expect(result.query.date).toBe(
        'z.coerce.date().exactOptional().openapi({param:{"name":"date","in":"query","schema":{"type":"date"},"required":false}})',
      )
    })
    it.concurrent('generates a query parameter with exact string output', () => {
      const result = makeParameters([{ name: 'page', in: 'query', schema: { type: 'integer' } }])
      expect(result.query.page).toBe(
        String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"},"required":false}})`,
      )
    })
    it.concurrent('generates path parameter with exact string output', () => {
      const result = makeParameters([{ name: 'userId', in: 'path', schema: { type: 'string' } }])
      expect(result.path.userId).toBe(
        'z.string().exactOptional().openapi({param:{"name":"userId","in":"path","schema":{"type":"string"}}})',
      )
    })
    it.concurrent('applies coercion for path integer parameters', () => {
      const result = makeParameters([{ name: 'id', in: 'path', schema: { type: 'integer' } }])
      expect(result.path.id).toBe(
        String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional().openapi({param:{"name":"id","in":"path","schema":{"type":"integer"}}})`,
      )
    })
    // Regression: the array branch coerced items with `z.coerce.number()` before piping
    // them into `z.int64()`, which is a bigint schema — every request 422'd on arrival.
    it.concurrent('coerces array-of-int64 query items to bigint, not number', () => {
      const result = makeParameters([
        {
          name: 'ids',
          in: 'query',
          schema: { type: 'array', items: { type: 'integer', format: 'int64' } },
        },
      ])
      expect(result.query.ids).toContain(
        String.raw`z.preprocess((val)=>(val===undefined||Array.isArray(val)?val:[val]),z.array(z.preprocess((val)=>{if(typeof val!=='string'||!/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val))return val;if(/^-?\d+$/.test(val))return BigInt(val);const num=Number(val);return Number.isSafeInteger(num)?BigInt(num):val},z.int64()).openapi({type:"integer",format:"int64"}))).exactOptional().openapi({param:{"name":"ids","in":"query","schema":{"type":"array","items":{"type":"integer","format":"int64"}},"required":false}})`,
      )
    })
    // Regression: an exploded one-element array serialises to a single `?ids=1`, which
    // reaches the handler as a bare string — a plain `z.array(...)` rejected the request a
    // spec-compliant client had just made. An absent parameter stays `undefined`, so that
    // it is reported as missing rather than as an invalid first element.
    it.concurrent('accepts both arities for a query array parameter', () => {
      const result = makeParameters([
        { name: 'ids', in: 'query', schema: { type: 'array', items: { type: 'integer' } } },
      ])
      expect(result.query.ids).toContain(
        String.raw`z.preprocess((val)=>(val===undefined||Array.isArray(val)?val:[val]),z.array(z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()))).exactOptional().openapi({param:{"name":"ids","in":"query","schema":{"type":"array","items":{"type":"integer"}},"required":false}})`,
      )
    })
    // A cookie name appears once, so several values can only travel as one comma-separated
    // value.
    it.concurrent('splits a cookie array parameter on commas', () => {
      const result = makeParameters([
        { name: 'ids', in: 'cookie', schema: { type: 'array', items: { type: 'integer' } } },
      ])
      expect(result.cookie.ids).toContain(
        String.raw`z.preprocess((val)=>(val===undefined?val:(Array.isArray(val)?val:[val]).flatMap((item)=>(typeof item==='string'?item.split(","):[item]))),z.array(z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()))).exactOptional().openapi({param:{"name":"ids","in":"cookie","schema":{"type":"array","items":{"type":"integer"}},"required":false}})`,
      )
    })
    // A header array is `style: simple`: one header holding comma-separated values, with
    // optional whitespace after each comma. A header sent several times arrives joined by
    // ", ", the same shape.
    it.concurrent('splits a header array parameter on commas and trims each value', () => {
      const result = makeParameters([
        { name: 'ids', in: 'header', schema: { type: 'array', items: { type: 'integer' } } },
      ])
      expect(result.header.ids).toContain(
        String.raw`z.preprocess((val)=>(val===undefined?val:(Array.isArray(val)?val:[val]).flatMap((item)=>(typeof item==='string'?item.split(",").map((part)=>part.trim()):[item]))),z.array(z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()))).exactOptional().openapi({param:{"name":"ids","in":"header","schema":{"type":"array","items":{"type":"integer"}},"required":false}})`,
      )
    })
    // A path segment is `style: simple` — one comma-separated value, never a repetition.
    it.concurrent('splits a path array parameter on commas', () => {
      const result = makeParameters([
        { name: 'ids', in: 'path', schema: { type: 'array', items: { type: 'integer' } } },
      ])
      expect(result.path.ids).toContain(
        String.raw`z.preprocess((val)=>(typeof val==='string'?val.split(','):val),z.array(z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()))).exactOptional().openapi({param:{"name":"ids","in":"path","schema":{"type":"array","items":{"type":"integer"}}}})`,
      )
    })
    it.concurrent('coerces header parameters, which arrive as strings too', () => {
      const result = makeParameters([
        { name: 'x-count', in: 'header', schema: { type: 'integer' } },
        { name: 'x-flag', in: 'header', schema: { type: 'boolean' } },
        { name: 'x-big', in: 'header', schema: { type: 'integer', format: 'int64' } },
      ])
      // `makeSafeKey` quotes a name that is not an identifier, so the key carries them.
      expect(result.header["'x-count'"]).toContain(
        String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional().openapi({param:{"name":"x-count","in":"header","schema":{"type":"integer"},"required":false}})`,
      )
      expect(result.header["'x-flag'"]).toContain('z.stringbool()')
      expect(result.header["'x-big'"]).toContain(
        String.raw`z.preprocess((val)=>{if(typeof val!=='string'||!/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val))return val;if(/^-?\d+$/.test(val))return BigInt(val);const num=Number(val);return Number.isSafeInteger(num)?BigInt(num):val},z.int64())`,
      )
    })
    it.concurrent('coerces cookie parameters, which arrive as strings too', () => {
      const result = makeParameters([{ name: 'sid', in: 'cookie', schema: { type: 'integer' } }])
      expect(result.cookie.sid).toContain(
        String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional().openapi({param:{"name":"sid","in":"cookie","schema":{"type":"integer"},"required":false}})`,
      )
    })
    // Regression: the array coercion matched `int*` only, so `z.float64()` items kept a
    // plain number schema and 422'd on the string that actually arrives.
    it.concurrent('coerces array-of-double query items', () => {
      const result = makeParameters([
        {
          name: 'ratios',
          in: 'query',
          schema: { type: 'array', items: { type: 'number', format: 'double' } },
        },
      ])
      expect(result.query.ratios).toContain(
        String.raw`z.preprocess((val)=>(val===undefined||Array.isArray(val)?val:[val]),z.array(z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.float64()))).exactOptional().openapi({param:{"name":"ratios","in":"query","schema":{"type":"array","items":{"type":"number","format":"double"}},"required":false}})`,
      )
    })
    it.concurrent('keeps array-of-int32 query items on the number path', () => {
      const result = makeParameters([
        {
          name: 'ids',
          in: 'query',
          schema: { type: 'array', items: { type: 'integer', format: 'int32' } },
        },
      ])
      expect(result.query.ids).toContain(
        String.raw`z.preprocess((val)=>(val===undefined||Array.isArray(val)?val:[val]),z.array(z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int32()))).exactOptional().openapi({param:{"name":"ids","in":"query","schema":{"type":"array","items":{"type":"integer","format":"int32"}},"required":false}})`,
      )
    })
    it.concurrent('applies coercion for path int64 parameters', () => {
      const result = makeParameters([
        { name: 'id', in: 'path', schema: { type: 'integer', format: 'int64' } },
      ])
      expect(result.path.id).toBe(
        String.raw`z.preprocess((val)=>{if(typeof val!=='string'||!/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val))return val;if(/^-?\d+$/.test(val))return BigInt(val);const num=Number(val);return Number.isSafeInteger(num)?BigInt(num):val},z.int64()).exactOptional().openapi({param:{"name":"id","in":"path","schema":{"type":"integer","format":"int64"}}})`,
      )
    })
    it.concurrent('applies coercion for path number parameters', () => {
      const result = makeParameters([{ name: 'value', in: 'path', schema: { type: 'number' } }])
      expect(result.path.value).toBe(
        String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.number()).exactOptional().openapi({param:{"name":"value","in":"path","schema":{"type":"number"}}})`,
      )
    })
    it.concurrent('applies stringbool for path boolean parameters', () => {
      const result = makeParameters([{ name: 'flag', in: 'path', schema: { type: 'boolean' } }])
      expect(result.path.flag).toBe(
        'z.stringbool().exactOptional().openapi({param:{"name":"flag","in":"path","schema":{"type":"boolean"}}})',
      )
    })
    it.concurrent('generates header parameter with exact string output', () => {
      const result = makeParameters([
        { name: 'Authorization', in: 'header', schema: { type: 'string' } },
      ])
      expect(result.header.Authorization).toBe(
        'z.string().exactOptional().openapi({param:{"name":"Authorization","in":"header","schema":{"type":"string"},"required":false}})',
      )
    })
    it.concurrent('generates cookie parameter with exact string output', () => {
      const result = makeParameters([
        { name: 'session_id', in: 'cookie', schema: { type: 'string' } },
      ])
      expect(result.cookie.session_id).toBe(
        'z.string().exactOptional().openapi({param:{"name":"session_id","in":"cookie","schema":{"type":"string"},"required":false}})',
      )
    })

    // The properties of an object arrive like the fields of a form: nothing but the schema
    // describes them, so a boolean is read by a converter the document looks through.
    it.concurrent('applies coercion for nested integers in query object parameter', () => {
      const result = makeParameters([
        {
          name: 'filter',
          in: 'query',
          schema: {
            type: 'object',
            properties: {
              count: { type: 'integer' },
              active: { type: 'boolean' },
            },
          },
        },
      ])
      expect(result.query.filter).toBe(
        String.raw`z.object({count:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional(),active:z.preprocess(((read)=>(val:unknown)=>{const result=read.safeParse(val);return result.success?result.data:val})(z.stringbool()),z.boolean()).exactOptional()}).exactOptional().openapi({param:{"name":"filter","in":"query","schema":{"type":"object","properties":{"count":{"type":"integer"},"active":{"type":"boolean"}}},"required":false},"required":[]})`,
      )
    })

    it.concurrent('applies coercion for nested numbers in query array parameter', () => {
      const result = makeParameters([
        {
          name: 'ids',
          in: 'query',
          schema: {
            type: 'array',
            items: { type: 'number' },
          },
        },
      ])
      expect(result.query.ids).toBe(
        String.raw`z.preprocess((val)=>(val===undefined||Array.isArray(val)?val:[val]),z.array(z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.number()))).exactOptional().openapi({param:{"name":"ids","in":"query","schema":{"type":"array","items":{"type":"number"}},"required":false}})`,
      )
    })

    it.concurrent('applies stringbool replacement with default true in query boolean', () => {
      const result = makeParameters([
        {
          name: 'verbose',
          in: 'query',
          schema: { type: 'boolean', default: 'true' },
        },
      ])
      expect(result.query.verbose).toBe(
        'z.stringbool().default(true).exactOptional().openapi({param:{"name":"verbose","in":"query","schema":{"type":"boolean","default":"true"},"required":false}})',
      )
    })

    // Regression: a numeric or boolean `enum` / `const` emitted its literals bare, so the
    // string the wire delivers ("1", "true") never matched — every request 422'd.
    it.concurrent('coerces a query integer enum before matching its literals', () => {
      const result = makeParameters([
        { name: 'kind', in: 'query', schema: { type: 'integer', enum: [1, 2] } },
      ])
      expect(result.query.kind).toBe(
        String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.union([z.literal(1),z.literal(2)])).exactOptional().openapi({param:{"name":"kind","in":"query","schema":{"type":"integer","enum":[1,2]},"required":false}})`,
      )
    })
    it.concurrent('parses a path boolean enum with stringbool before matching', () => {
      const result = makeParameters([
        { name: 'flag', in: 'path', required: true, schema: { type: 'boolean', enum: [true] } },
      ])
      expect(result.path.flag).toBe(
        'z.stringbool().pipe(z.literal(true)).openapi({param:{"name":"flag","in":"path","required":true,"schema":{"type":"boolean","enum":[true]}}})',
      )
    })
    // `type: number` reads the text with the number grammar even though the literal is
    // whole, so "2.0" is the value 2 as much as "2" is.
    it.concurrent('coerces a query number const before matching its literal', () => {
      const result = makeParameters([
        { name: 'version', in: 'query', schema: { type: 'number', const: 2 } },
      ])
      expect(result.query.version).toBe(
        String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.literal(2)).exactOptional().openapi({param:{"name":"version","in":"query","schema":{"type":"number","const":2},"required":false}})`,
      )
    })
    it.concurrent('leaves a string enum on the wire as is', () => {
      const result = makeParameters([
        { name: 'sort', in: 'query', schema: { type: 'string', enum: ['asc', 'desc'] } },
      ])
      expect(result.query.sort).toBe(
        'z.enum(["asc","desc"]).exactOptional().openapi({param:{"name":"sort","in":"query","schema":{"type":"string","enum":["asc","desc"]},"required":false}})',
      )
    })
    // Regression: `type: [integer, 'null']` failed the `type === 'integer'` check, so the
    // integer arrived uncoerced.
    it.concurrent('coerces a query integer whose type list includes null', () => {
      const result = makeParameters([
        { name: 'limit', in: 'query', schema: { type: ['integer', 'null'] } },
      ])
      expect(result.query.limit).toBe(
        String.raw`z.preprocess((val)=>(val==='null'?null:val),z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).nullable()).exactOptional().openapi({param:{"name":"limit","in":"query","schema":{"type":["integer","null"]},"required":false}})`,
      )
    })
    // Regression: coercion stopped at the top-level type, so a numeric branch inside a
    // composition validated the raw string. The text is read once, around the whole
    // `oneOf`: reading it per branch lets "1" match an integer branch and a string branch
    // at once, which `oneOf` rejects.
    it.concurrent('reads a query oneOf from text once, around its branches', () => {
      const result = makeParameters([
        {
          name: 'page',
          in: 'query',
          schema: { oneOf: [{ type: 'integer' }, { type: 'string', enum: ['all'] }] },
        },
      ])
      expect(result.query.page).toContain(
        String.raw`((schema)=>z.union([z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),schema),schema]))(z.xor([z.int(),z.literal('all')])).exactOptional().openapi({param:{"name":"page","in":"query","schema":{"oneOf":[{"type":"integer"},{"type":"string","enum":["all"]}]},"required":false}})`,
      )
    })
    it.concurrent('coerces integer enum items of a query array', () => {
      const result = makeParameters([
        {
          name: 'kinds',
          in: 'query',
          schema: { type: 'array', items: { type: 'integer', enum: [1, 2] } },
        },
      ])
      expect(result.query.kinds).toContain(
        String.raw`z.preprocess((val)=>(val===undefined||Array.isArray(val)?val:[val]),z.array(z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.union([z.literal(1),z.literal(2)])))).exactOptional().openapi({param:{"name":"kinds","in":"query","schema":{"type":"array","items":{"type":"integer","enum":[1,2]}},"required":false}})`,
      )
    })
    // Regression: the arity wrapper sat outside `.default()`, so an absent parameter reached
    // the default as `[undefined]` and the default never applied.
    it.concurrent('keeps an array default outside the arity wrapper', () => {
      const result = makeParameters([
        {
          name: 'tags',
          in: 'query',
          schema: { type: 'array', items: { type: 'string' }, default: [] },
        },
      ])
      expect(result.query.tags).toBe(
        'z.preprocess((val)=>(val===undefined||Array.isArray(val)?val:[val]),z.array(z.string())).default([]).exactOptional().openapi({param:{"name":"tags","in":"query","schema":{"type":"array","items":{"type":"string"},"default":[]},"required":false}})',
      )
    })
    it.concurrent('does not coerce a body-like location', () => {
      const result = makeParameters([
        { name: 'kind', in: 'body' as 'query', schema: { type: 'integer', enum: [1, 2] } },
      ])
      expect(result.body.kind).toContain('z.union([z.literal(1),z.literal(2)])')
      expect(result.body.kind).not.toContain('z.coerce')
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
      expect(result).toBe(
        `z.object({"X-Rate-Limit":{schema:z.int().exactOptional().openapi({param:{required:false}})}})`,
      )
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
        `z.object({"X-Rate-Limit":{schema:z.int().exactOptional().openapi({param:{required:false}})},"X-Rate-Remaining":{schema:z.int().exactOptional().openapi({param:{required:false}})},"X-Rate-Reset":{schema:z.int().exactOptional().openapi({param:{required:false}})}})`,
      )
    })
    it.concurrent('generates header responses with mixed schema and $ref', () => {
      const result = makeHeaderResponses({
        'X-Rate-Limit': { schema: { type: 'integer' } },
        'X-Custom': { $ref: '#/components/headers/CustomHeader' },
      })
      expect(result).toBe(
        `z.object({"X-Rate-Limit":{schema:z.int().exactOptional().openapi({param:{required:false}})},"X-Custom":CustomHeaderHeaderSchema})`,
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
        '{description:"Rate limit header",schema:z.int().exactOptional().openapi({description:"Rate limit header",param:{required:false}})}',
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
        '{example:"example-value",schema:z.string().exactOptional().openapi({example:"example-value",param:{required:false}})}',
      )
    })
    it.concurrent('generates header with examples', () => {
      const result = makeHeadersAndReferences({
        schema: { type: 'string' },
        examples: { sample: { value: 'sample-value' } },
      })
      expect(result).toBe(
        '{examples:{"sample":{value:"sample-value"}},schema:z.string().exactOptional().openapi({examples:{"sample":{value:"sample-value"}},param:{required:false}})}',
      )
    })
    it.concurrent('generates header with style', () => {
      const result = makeHeadersAndReferences({
        schema: { type: 'array', items: [{ type: 'string' }] },
        style: 'simple',
      })
      expect(result).toBe(
        '{style:"simple",schema:z.array(z.string()).exactOptional().openapi({param:{required:false}})}',
      )
    })
    it.concurrent('generates header with explode', () => {
      const result = makeHeadersAndReferences({
        schema: { type: 'array', items: [{ type: 'string' }] },
        explode: true,
      })
      expect(result).toBe(
        '{explode:true,schema:z.array(z.string()).exactOptional().openapi({param:{required:false}})}',
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
        String.raw`{query:z.object({page:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"},"required":false}})})}`,
      )
    })
    it.concurrent('generates request with header parameters', () => {
      const result = makeRequest(
        [{ name: 'X-Api-Key', in: 'header', schema: { type: 'string' } }],
        undefined,
      )
      expect(result).toBe(
        `{headers:z.object({'X-Api-Key':z.string().exactOptional().openapi({param:{"name":"X-Api-Key","in":"header","schema":{"type":"string"},"required":false}})})}`,
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
        String.raw`{params:z.object({id:z.string().exactOptional().openapi({param:{"name":"id","in":"path","schema":{"type":"string"}}})}),query:z.object({page:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"},"required":false}})})}`,
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
        String.raw`query:z.object({page:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"},"required":false}})})`,
      )
    })
    it.concurrent('generates header for header parameter', () => {
      const result = makeRequestParams([
        { name: 'X-Token', in: 'header', schema: { type: 'string' } },
      ])
      expect(result).toBe(
        `headers:z.object({'X-Token':z.string().exactOptional().openapi({param:{"name":"X-Token","in":"header","schema":{"type":"string"},"required":false}})})`,
      )
    })
    it.concurrent('generates cookie for cookie parameter', () => {
      const result = makeRequestParams([
        { name: 'session', in: 'cookie', schema: { type: 'string' } },
      ])
      expect(result).toBe(
        'cookies:z.object({session:z.string().exactOptional().openapi({param:{"name":"session","in":"cookie","schema":{"type":"string"},"required":false}})})',
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
        String.raw`params:z.object({id:z.string().exactOptional().openapi({param:{"name":"id","in":"path","schema":{"type":"string"}}})}),query:z.object({page:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"},"required":false}})}),headers:z.object({Authorization:z.string().exactOptional().openapi({param:{"name":"Authorization","in":"header","schema":{"type":"string"},"required":false}})})`,
      )
    })
    it.concurrent('generates multiple query parameters', () => {
      const result = makeRequestParams([
        { name: 'page', in: 'query', schema: { type: 'integer' } },
        { name: 'limit', in: 'query', schema: { type: 'integer' } },
        { name: 'sort', in: 'query', schema: { type: 'string' } },
      ])
      expect(result).toBe(
        String.raw`query:z.object({page:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"},"required":false}}),limit:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional().openapi({param:{"name":"limit","in":"query","schema":{"type":"integer"},"required":false}}),sort:z.string().exactOptional().openapi({param:{"name":"sort","in":"query","schema":{"type":"string"},"required":false}})})`,
      )
    })
  })

  describe('makeCallbacks', () => {
    it.concurrent('generates callback with $ref', () => {
      const result = makeCallbacks({
        onEvent: { $ref: '#/components/callbacks/EventCallback' },
      })
      expect(result).toBe('"onEvent":EventCallbackCallback')
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
      expect(result).toBe('"onSuccess":SuccessCallbackCallback,"onError":ErrorCallbackCallback')
    })
  })

  describe('makeCallback', () => {
    it.concurrent('generates callback with $ref pathItem', () => {
      const result = makeCallback({
        '{$request.body#/callbackUrl}': { $ref: '#/components/pathItems/WebhookPath' },
      })
      expect(result).toBe('"{$request.body#/callbackUrl}":WebhookPathPathItem')
    })

    it.concurrent('generates callback with inline pathItem containing post operation', () => {
      const result = makeCallback({
        '{$callback}': {
          post: { responses: { 200: { description: 'OK' } } },
        },
      })
      expect(result).toBe('"{$callback}":{post:{responses:{200:{description:"OK"}}}}')
    })

    it.concurrent('generates multiple callbacks', () => {
      const result = makeCallback({
        onSuccess: { $ref: '#/components/pathItems/SuccessPath' },
        onFailure: {
          post: { responses: { 500: { description: 'Error' } } },
        },
      })
      expect(result).toBe(
        '"onSuccess":SuccessPathPathItem,"onFailure":{post:{responses:{500:{description:"Error"}}}}',
      )
    })
  })

  describe('makeOperation', () => {
    it.concurrent('generates minimal operation with responses only', () => {
      const result = makeOperation({
        responses: { 200: { description: 'Success' } },
      })
      expect(result).toBe('{responses:{200:{description:"Success"}}}')
    })

    it.concurrent('generates operation with tags and operationId', () => {
      const result = makeOperation({
        tags: ['users'],
        operationId: 'getUsers',
        responses: { 200: { description: 'Success' } },
      })
      expect(result).toBe(
        '{tags:["users"],operationId:"getUsers",responses:{200:{description:"Success"}}}',
      )
    })

    it.concurrent('generates operation with summary and description', () => {
      const result = makeOperation({
        summary: 'Get users',
        description: 'Returns a list of users',
        responses: { 200: { description: 'Success' } },
      })
      expect(result).toBe(
        '{summary:"Get users",description:"Returns a list of users",responses:{200:{description:"Success"}}}',
      )
    })

    // Empty strings are valid CommonMark per OpenAPI 3.2 §4.8.10.1 — they
    // must round-trip rather than being silently dropped by a truthy check.
    it.concurrent('preserves empty summary string', () => {
      const result = makeOperation({
        summary: '',
        responses: { 200: { description: 'OK' } },
      })
      expect(result).toBe('{summary:"",responses:{200:{description:"OK"}}}')
    })
    it.concurrent('preserves empty description string', () => {
      const result = makeOperation({
        description: '',
        responses: { 200: { description: 'OK' } },
      })
      expect(result).toBe('{description:"",responses:{200:{description:"OK"}}}')
    })
    it.concurrent('preserves empty operationId string', () => {
      const result = makeOperation({
        operationId: '',
        responses: { 200: { description: 'OK' } },
      })
      expect(result).toBe('{operationId:"",responses:{200:{description:"OK"}}}')
    })

    it.concurrent('generates operation with deprecated flag', () => {
      const result = makeOperation({
        deprecated: true,
        responses: { 200: { description: 'OK' } },
      })
      expect(result).toBe('{responses:{200:{description:"OK"}},deprecated:true}')
    })

    it.concurrent('generates operation with security', () => {
      const result = makeOperation({
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: 'OK' } },
      })
      expect(result).toBe('{responses:{200:{description:"OK"}},security:[{"bearerAuth":[]}]}')
    })

    it.concurrent('generates operation with externalDocs', () => {
      const result = makeOperation({
        externalDocs: { url: 'https://example.com/docs' },
        responses: { 200: { description: 'OK' } },
      })
      expect(result).toBe(
        '{externalDocs:{"url":"https://example.com/docs"},responses:{200:{description:"OK"}}}',
      )
    })

    it.concurrent('generates operation with servers', () => {
      const result = makeOperation({
        servers: [{ url: 'https://api.example.com' }],
        responses: { 200: { description: 'OK' } },
      })
      expect(result).toBe(
        '{responses:{200:{description:"OK"}},servers:[{"url":"https://api.example.com"}]}',
      )
    })

    it.concurrent('generates empty operation', () => {
      const result = makeOperation({} as any)
      expect(result).toBe('{}')
    })

    it.concurrent('generates operation with callbacks', () => {
      const result = makeOperation({
        operationId: 'subscribe',
        callbacks: {
          onEvent: {
            '{$request.body#/callbackUrl}': {
              post: {
                responses: { 200: { description: 'OK' } },
              },
            },
          },
        },
        responses: { 200: { description: 'OK' } },
      })
      expect(result).toBe(
        '{operationId:"subscribe",responses:{200:{description:"OK"}},callbacks:{"onEvent":{"{$request.body#/callbackUrl}":{post:{responses:{200:{description:"OK"}}}}}}}',
      )
    })

    it.concurrent('generates operation with parameters', () => {
      const result = makeOperation({
        parameters: [{ $ref: '#/components/parameters/UserId' }] as any,
        responses: { 200: { description: 'OK' } },
      })
      expect(result).toBe('{parameters:[UserIdParamsSchema],responses:{200:{description:"OK"}}}')
    })

    it.concurrent('generates operation with requestBody', () => {
      const result = makeOperation({
        operationId: 'createUser',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', properties: { name: { type: 'string' } } },
            },
          },
        },
        responses: { 201: { description: 'Created' } },
      })
      expect(result).toBe(
        `{operationId:"createUser",requestBody:{content:{'application/json':{schema:z.object({name:z.string().exactOptional()}).openapi({"required":[]})}},required:true},responses:{201:{description:"Created"}}}`,
      )
    })
  })

  describe('makePathItem', () => {
    it.concurrent('generates pathItem with single GET operation', () => {
      const result = makePathItem({
        get: { responses: { 200: { description: 'OK' } } },
      })
      expect(result).toBe('{get:{responses:{200:{description:"OK"}}}}')
    })

    it.concurrent('generates pathItem with multiple methods', () => {
      const result = makePathItem({
        get: { responses: { 200: { description: 'List' } } },
        post: { responses: { 201: { description: 'Created' } } },
      })
      expect(result).toBe(
        '{get:{responses:{200:{description:"List"}}},post:{responses:{201:{description:"Created"}}}}',
      )
    })

    it.concurrent('generates pathItem with summary and description', () => {
      const result = makePathItem({
        summary: 'Users endpoint',
        description: 'Manages users',
        get: { responses: { 200: { description: 'OK' } } },
      })
      expect(result).toBe(
        '{summary:"Users endpoint",description:"Manages users",get:{responses:{200:{description:"OK"}}}}',
      )
    })

    it.concurrent('generates pathItem with $ref', () => {
      const result = makePathItem({
        $ref: '#/components/pathItems/Users',
      })
      expect(result).toBe('{$ref:UsersPathItem}')
    })

    it.concurrent('generates pathItem with servers', () => {
      const result = makePathItem({
        servers: [{ url: 'https://api.example.com' }],
        get: { responses: { 200: { description: 'OK' } } },
      })
      expect(result).toBe(
        '{get:{responses:{200:{description:"OK"}}},servers:[{"url":"https://api.example.com"}]}',
      )
    })

    it.concurrent('generates empty pathItem', () => {
      const result = makePathItem({})
      expect(result).toBe('{}')
    })

    it.concurrent('generates pathItem with additionalOperations', () => {
      const result = makePathItem({
        get: { responses: { 200: { description: 'OK' } } },
        additionalOperations: {
          'x-custom-op': {
            operationId: 'customOp',
            responses: { 200: { description: 'Custom' } },
          },
        },
      })
      expect(result).toBe(
        '{get:{responses:{200:{description:"OK"}}},additionalOperations:{"x-custom-op":{operationId:"customOp",responses:{200:{description:"Custom"}}}}}',
      )
    })

    it.concurrent('generates pathItem with parameters array', () => {
      const result = makePathItem({
        parameters: [{ $ref: '#/components/parameters/UserId' }],
        get: { responses: { 200: { description: 'OK' } } },
      })
      expect(result).toBe(
        '{get:{responses:{200:{description:"OK"}}},parameters:[UserIdParamsSchema]}',
      )
    })
  })

  describe('makePathParameters', () => {
    it.concurrent('generates array with $ref parameter', () => {
      const result = makePathParameters([{ $ref: '#/components/parameters/UserId' }])
      expect(result).toBe('[UserIdParamsSchema]')
    })

    it.concurrent('generates array with inline parameter', () => {
      const result = makePathParameters([
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ])
      expect(result).toBe('[{"name":"id","in":"path","required":true,"schema":{"type":"string"}}]')
    })

    it.concurrent('generates array with mixed $ref and inline parameters', () => {
      const result = makePathParameters([
        { $ref: '#/components/parameters/UserId' },
        { name: 'page', in: 'query', schema: { type: 'integer' } },
      ])
      expect(result).toBe(
        '[UserIdParamsSchema,{"name":"page","in":"query","schema":{"type":"integer"}}]',
      )
    })

    it.concurrent('generates empty array', () => {
      const result = makePathParameters([])
      expect(result).toBe('[]')
    })

    it.concurrent('generates array with nested object parameter', () => {
      const result = makePathParameters([
        {
          name: 'filter',
          in: 'query',
          schema: { type: 'object', properties: { status: { type: 'string' } } },
        },
      ])
      expect(result).toBe(
        '[{"name":"filter","in":"query","schema":{"type":"object","properties":{"status":{"type":"string"}}}}]',
      )
    })
  })

  describe('readonly propagation', () => {
    describe('makeMedia with readonly', () => {
      it.concurrent('adds .readonly() to object schema', () => {
        const result = makeMedia(
          {
            schema: {
              type: 'object',
              properties: { name: { type: 'string' } },
              required: ['name'],
            },
          },
          true,
        )
        expect(result).toBe(
          '{schema:z.object({name:z.string()}).readonly().openapi({"required":["name"]})}',
        )
      })

      it.concurrent('adds .readonly() to array schema', () => {
        const result = makeMedia({ schema: { type: 'array', items: { type: 'string' } } }, true)
        expect(result).toBe('{schema:z.array(z.string()).readonly()}')
      })

      it.concurrent('does not add .readonly() when readonly is false', () => {
        const result = makeMedia(
          {
            schema: {
              type: 'object',
              properties: { name: { type: 'string' } },
              required: ['name'],
            },
          },
          false,
        )
        expect(result).toBe('{schema:z.object({name:z.string()}).openapi({"required":["name"]})}')
      })

      it.concurrent('does not add .readonly() when readonly is undefined', () => {
        const result = makeMedia({ schema: { type: 'array', items: { type: 'string' } } })
        expect(result).toBe('{schema:z.array(z.string())}')
      })

      it.concurrent('adds .readonly() to nested array items object', () => {
        const result = makeMedia(
          {
            schema: {
              type: 'array',
              items: { type: 'object', properties: { id: { type: 'integer' } }, required: ['id'] },
            },
          },
          true,
        )
        expect(result).toBe(
          '{schema:z.array(z.object({id:z.int()}).readonly().openapi({"required":["id"]})).readonly()}',
        )
      })
    })

    describe('makeContent with readonly', () => {
      it.concurrent('propagates readonly to media schema', () => {
        const result = makeContent(
          {
            'application/json': {
              schema: {
                type: 'object',
                properties: { status: { type: 'string' } },
                required: ['status'],
              },
            },
          },
          true,
        )
        expect(result).toStrictEqual([
          `'application/json':{schema:z.object({status:z.string()}).readonly().openapi({"required":["status"]})}`,
        ])
      })

      it.concurrent('does not add readonly when flag is false', () => {
        const result = makeContent(
          {
            'application/json': {
              schema: {
                type: 'object',
                properties: { status: { type: 'string' } },
                required: ['status'],
              },
            },
          },
          false,
        )
        expect(result).toStrictEqual([
          `'application/json':{schema:z.object({status:z.string()}).openapi({"required":["status"]})}`,
        ])
      })
    })

    describe('makeResponses with readonly', () => {
      it.concurrent('propagates readonly to content schema', () => {
        const result = makeResponses(
          {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { id: { type: 'integer' } },
                  required: ['id'],
                },
              },
            },
          },
          true,
        )
        expect(result).toBe(
          `{description:"OK",content:{'application/json':{schema:z.object({id:z.int()}).readonly().openapi({"required":["id"]})}}}`,
        )
      })

      it.concurrent('does not add readonly when flag is false', () => {
        const result = makeResponses(
          {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { id: { type: 'integer' } },
                  required: ['id'],
                },
              },
            },
          },
          false,
        )
        expect(result).toBe(
          `{description:"OK",content:{'application/json':{schema:z.object({id:z.int()}).openapi({"required":["id"]})}}}`,
        )
      })
    })

    describe('makeOperationResponses with readonly', () => {
      it.concurrent('propagates readonly through responses', () => {
        const result = makeOperationResponses(
          {
            200: {
              description: 'OK',
              content: {
                'application/json': { schema: { type: 'array', items: { type: 'string' } } },
              },
            },
          },
          true,
        )
        expect(result).toBe(
          `{200:{description:"OK",content:{'application/json':{schema:z.array(z.string()).readonly()}}}}`,
        )
      })

      it.concurrent('does not add readonly when flag is false', () => {
        const result = makeOperationResponses(
          {
            200: {
              description: 'OK',
              content: {
                'application/json': { schema: { type: 'array', items: { type: 'string' } } },
              },
            },
          },
          false,
        )
        expect(result).toBe(
          `{200:{description:"OK",content:{'application/json':{schema:z.array(z.string())}}}}`,
        )
      })
    })

    describe('makeRequestBody with readonly', () => {
      it.concurrent('propagates readonly to request body content', () => {
        const result = makeRequestBody(
          {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { name: { type: 'string' } },
                  required: ['name'],
                },
              },
            },
            required: true,
          },
          true,
        )
        expect(result).toBe(
          `{content:{'application/json':{schema:z.object({name:z.string()}).readonly().openapi({"required":["name"]})}},required:true}`,
        )
      })

      it.concurrent('does not add readonly when flag is false', () => {
        const result = makeRequestBody(
          {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { name: { type: 'string' } },
                  required: ['name'],
                },
              },
            },
            required: true,
          },
          false,
        )
        expect(result).toBe(
          `{content:{'application/json':{schema:z.object({name:z.string()}).openapi({"required":["name"]})}},required:true}`,
        )
      })
    })

    describe('makeRequest with readonly', () => {
      it.concurrent('propagates readonly to body content', () => {
        const result = makeRequest(
          undefined,
          {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { name: { type: 'string' } },
                  required: ['name'],
                },
              },
            },
          },
          true,
        )
        expect(result).toBe(
          `{body:{content:{'application/json':{schema:z.object({name:z.string()}).readonly().openapi({"required":["name"]})}}}}`,
        )
      })

      it.concurrent('does not add readonly when flag is false', () => {
        const result = makeRequest(
          undefined,
          {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { name: { type: 'string' } },
                  required: ['name'],
                },
              },
            },
          },
          false,
        )
        expect(result).toBe(
          `{body:{content:{'application/json':{schema:z.object({name:z.string()}).openapi({"required":["name"]})}}}}`,
        )
      })
    })

    describe('makeOperation with readonly', () => {
      it.concurrent('propagates readonly to responses', () => {
        const result = makeOperation(
          {
            operationId: 'getHealth',
            responses: {
              200: {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: { status: { type: 'string' } },
                      required: ['status'],
                    },
                  },
                },
              },
            },
          },
          true,
        )
        expect(result).toBe(
          `{operationId:"getHealth",responses:{200:{description:"OK",content:{'application/json':{schema:z.object({status:z.string()}).readonly().openapi({"required":["status"]})}}}}}`,
        )
      })

      it.concurrent('propagates readonly to requestBody', () => {
        const result = makeOperation(
          {
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: { name: { type: 'string' } },
                    required: ['name'],
                  },
                },
              },
              required: true,
            },
            responses: { 201: { description: 'Created' } },
          },
          true,
        )
        expect(result).toBe(
          `{requestBody:{content:{'application/json':{schema:z.object({name:z.string()}).readonly().openapi({"required":["name"]})}},required:true},responses:{201:{description:"Created"}}}`,
        )
      })

      it.concurrent('does not add readonly when flag is false', () => {
        const result = makeOperation(
          {
            responses: {
              200: {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: { status: { type: 'string' } },
                      required: ['status'],
                    },
                  },
                },
              },
            },
          },
          false,
        )
        expect(result).toBe(
          `{responses:{200:{description:"OK",content:{'application/json':{schema:z.object({status:z.string()}).openapi({"required":["status"]})}}}}}`,
        )
      })
    })

    describe('makeHeadersAndReferences with readonly', () => {
      it.concurrent('propagates readonly to header schema', () => {
        const result = makeHeadersAndReferences(
          {
            schema: {
              type: 'object',
              properties: { count: { type: 'integer' } },
              required: ['count'],
            },
          },
          true,
        )
        expect(result).toBe(
          '{schema:z.object({count:z.int()}).readonly().exactOptional().openapi({param:{required:false},"required":["count"]})}',
        )
      })

      it.concurrent('does not add readonly when flag is false', () => {
        const result = makeHeadersAndReferences(
          {
            schema: {
              type: 'object',
              properties: { count: { type: 'integer' } },
              required: ['count'],
            },
          },
          false,
        )
        expect(result).toBe(
          '{schema:z.object({count:z.int()}).exactOptional().openapi({param:{required:false},"required":["count"]})}',
        )
      })
    })

    describe('makeParameters with readonly', () => {
      it.concurrent('propagates readonly to parameter schema', () => {
        const result = makeParameters(
          [{ name: 'ids', in: 'query', schema: { type: 'array', items: { type: 'string' } } }],
          true,
        )
        expect(result).toStrictEqual({
          query: {
            ids: 'z.preprocess((val)=>(val===undefined||Array.isArray(val)?val:[val]),z.array(z.string()).readonly()).exactOptional().openapi({param:{"name":"ids","in":"query","schema":{"type":"array","items":{"type":"string"}},"required":false}})',
          },
        })
      })

      it.concurrent('does not add readonly when flag is false', () => {
        const result = makeParameters(
          [{ name: 'ids', in: 'query', schema: { type: 'array', items: { type: 'string' } } }],
          false,
        )
        expect(result).toStrictEqual({
          query: {
            ids: 'z.preprocess((val)=>(val===undefined||Array.isArray(val)?val:[val]),z.array(z.string())).exactOptional().openapi({param:{"name":"ids","in":"query","schema":{"type":"array","items":{"type":"string"}},"required":false}})',
          },
        })
      })
    })

    describe('makeCallbacks with readonly', () => {
      it.concurrent('propagates readonly to callback operations', () => {
        const result = makeCallbacks(
          {
            onEvent: {
              '{$request.body#/callbackUrl}': {
                post: {
                  responses: {
                    200: {
                      description: 'OK',
                      content: {
                        'application/json': {
                          schema: {
                            type: 'object',
                            properties: { ok: { type: 'boolean' } },
                            required: ['ok'],
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          } as any,
          true,
        )
        expect(result).toBe(
          `"onEvent":{"{$request.body#/callbackUrl}":{post:{responses:{200:{description:"OK",content:{'application/json':{schema:z.object({ok:z.boolean()}).readonly().openapi({"required":["ok"]})}}}}}}}`,
        )
      })
    })
  })
})

describe('makeContent / makeOperation no-schema paths', () => {
  it('makeContent drops a media entry that is neither $ref nor has a schema', () => {
    expect(makeContent({ 'application/json': {} })).toStrictEqual([])
  })
  it('makeContent binds a components.mediaTypes $ref as the schema of the media entry', () => {
    expect(
      makeContent({ 'application/json': { $ref: '#/components/mediaTypes/UserJson' } }),
    ).toStrictEqual(["'application/json':{schema:UserJsonMediaTypeSchema}"])
  })
  it('makeOperation serializes a schema-less parameter verbatim', () => {
    expect(
      makeOperation({
        parameters: [{ name: 'x', in: 'query' }],
        responses: { '200': { description: 'ok' } },
      }),
    ).toBe('{parameters:[{"name":"x","in":"query"}],responses:{200:{description:"ok"}}}')
  })
})

// The component schemas the references below point at.
// 以下の参照が指すコンポーネントスキーマ。
const schemas: { readonly [k: string]: Schema } = {
  Count: { type: 'integer', minimum: 0 },
  Flag: { type: 'boolean' },
  Name: { type: 'string' },
  Counts: { type: 'array', items: { type: 'integer' } },
  Names: { type: 'array', items: { type: 'string' } },
  Node: {
    type: 'object',
    properties: { size: { type: 'integer' }, next: { $ref: '#/components/schemas/Node' } },
  },
}

// A component schema is emitted for a typed value. A parameter that names one reads the
// text first.
// コンポーネントスキーマは、型付きの値を前提に出力される。コンポーネントを参照する
// パラメータは、先に文字列を読み取る。
describe('makeParameterSchema: a schema behind $ref', () => {
  // Count is `z.int().min(0)`, written for a typed value. The text is read around it. The
  // parameter metadata sits on the component itself: on the `z.preprocess` around it, it
  // would hide the component from the document, which would then name Count in the
  // parameter's `$ref` and never define it.
  // Count は `z.int().min(0)` であり、型付きの値を前提としている。文字列は、その外側で
  // 読み取られる。パラメータのメタデータは、コンポーネント自体に付く。外側の `z.preprocess`
  // に付けると、コンポーネントがドキュメントから見えなくなる。その場合、ドキュメントは
  // パラメータの `$ref` で Count を参照しながら、Count を定義しない。
  it.concurrent('reads an integer component from text', () => {
    expect(
      makeParameterSchema(
        { name: 'p', in: 'query', required: true, schema: { $ref: '#/components/schemas/Count' } },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),CountSchema.openapi({param:{"name":"p","in":"query","required":true,"schema":{"$ref":"#/components/schemas/Count"}}}))`,
    )
  })

  // `.exactOptional()` hides the component from the document as well, so it goes around the
  // metadata too.
  // `.exactOptional()` も、コンポーネントをドキュメントから見えなくする。そのため、
  // これもメタデータの外側に置かれる。
  it.concurrent('keeps an optional component visible to the document', () => {
    expect(
      makeParameterSchema(
        { name: 'p', in: 'query', schema: { $ref: '#/components/schemas/Count' } },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),CountSchema.openapi({param:{"name":"p","in":"query","schema":{"$ref":"#/components/schemas/Count"},"required":false}})).exactOptional()`,
    )
  })

  // A reference wrapped in `allOf` is emitted as the component too.
  // `allOf` で包んだ参照も、コンポーネントとして出力される。
  it.concurrent('keeps a component wrapped in allOf visible to the document', () => {
    expect(
      makeParameterSchema(
        {
          name: 'p',
          in: 'query',
          required: true,
          schema: { allOf: [{ $ref: '#/components/schemas/Count' }], description: 'A count.' },
        },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),CountSchema.openapi({param:{"name":"p","in":"query","required":true,"schema":{"allOf":[{"$ref":"#/components/schemas/Count"}],"description":"A count."}}}))`,
    )
  })

  // `.default()` on the component would be written into its definition, for every user of
  // Count, and around the component it would hide it from the document. A decorated
  // reference is written out in place, in the schema and in what the parameter documents.
  // コンポーネントに付けた `.default()` は、その定義に書き込まれ、Count のすべての利用箇所に
  // 影響する。一方、コンポーネントの外側に付けると、コンポーネントがドキュメントから
  // 見えなくなる。装飾された参照は、スキーマでもパラメータのドキュメントでも、
  // その場に展開される。
  it.concurrent('writes a component with a default out in place', () => {
    expect(
      makeParameterSchema(
        {
          name: 'p',
          in: 'query',
          schema: { $ref: '#/components/schemas/Count', default: 1 },
        },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int().min(0)).default(1).exactOptional().openapi({param:{"name":"p","in":"query","schema":{"type":"integer","minimum":0,"default":1},"required":false}})`,
    )
  })

  // Flag is `z.boolean()`. `z.stringbool()` is a pipe of its own, and the document reads a
  // pipe by its input: Flag behind it would be described as a string. Asked from inside a
  // `z.preprocess`, `z.stringbool()` still reads the text and Flag stays visible.
  // Flag は `z.boolean()` である。`z.stringbool()` はそれ自体が pipe であり、ドキュメントは
  // pipe を入力側で読む。その先にある Flag は、string として記述されてしまう。
  // `z.preprocess` の内側から呼び出せば、`z.stringbool()` が文字列を読み取りつつ、
  // Flag は見える状態に保たれる。
  it.concurrent('reads a boolean component with z.stringbool() inside a preprocess', () => {
    expect(
      makeParameterSchema(
        { name: 'p', in: 'query', required: true, schema: { $ref: '#/components/schemas/Flag' } },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`z.preprocess(((read)=>(val:unknown)=>{const result=read.safeParse(val);return result.success?result.data:val})(z.stringbool()),FlagSchema.openapi({param:{"name":"p","in":"query","required":true,"schema":{"$ref":"#/components/schemas/Flag"}}}))`,
    )
  })

  // Name is a string: there is nothing to read, so the reference stays as it is.
  // Name は string である。読み取るものがないため、参照はそのまま残る。
  it.concurrent('leaves a string component as a reference', () => {
    expect(
      makeParameterSchema(
        { name: 'p', in: 'query', required: true, schema: { $ref: '#/components/schemas/Name' } },
        undefined,
        schemas,
      ),
    ).toBe(
      `NameSchema.openapi({param:{"name":"p","in":"query","required":true,"schema":{"$ref":"#/components/schemas/Name"}}})`,
    )
  })

  // An array cannot be converted from outside: its elements are. The component is emitted
  // in place, reading each element, and takes the arity wrapper an inline array takes. The
  // parameter documents what it emits, the array written out: a `$ref` to Counts would
  // name a component the emitted schema never mentions.
  // 配列は外側からは変換できない。変換されるのは要素である。コンポーネントはその場に
  // 出力され、各要素を読み取る。インライン宣言の配列と同じく、単一値も受理する。
  // パラメータのドキュメントには、出力した内容、つまり展開された配列が記載される。
  // Counts への `$ref` を記載すると、出力されたスキーマに現れないコンポーネントを
  // 参照することになる。
  it.concurrent('emits an array component in place', () => {
    expect(
      makeParameterSchema(
        { name: 'p', in: 'query', required: true, schema: { $ref: '#/components/schemas/Counts' } },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`z.preprocess((val)=>(val===undefined||Array.isArray(val)?val:[val]),z.array(z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()))).openapi({param:{"name":"p","in":"query","required":true,"schema":{"type":"array","items":{"type":"integer"}}}})`,
    )
  })

  // Names holds nothing to read, so the reference stays as it is.
  // Names には読み取るべき要素がないため、参照はそのまま残る。
  it.concurrent('leaves an array of strings as a reference', () => {
    expect(
      makeParameterSchema(
        { name: 'p', in: 'query', required: true, schema: { $ref: '#/components/schemas/Names' } },
        undefined,
        schemas,
      ),
    ).toBe(
      `NamesSchema.openapi({param:{"name":"p","in":"query","required":true,"schema":{"$ref":"#/components/schemas/Names"}}})`,
    )
  })

  // The array is inline and its items name Count.
  // 配列はインライン宣言であり、その items が Count を指している。
  it.concurrent('reads elements that are a reference', () => {
    expect(
      makeParameterSchema(
        {
          name: 'p',
          in: 'query',
          required: true,
          schema: { type: 'array', items: { $ref: '#/components/schemas/Count' } },
        },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`z.preprocess((val)=>(val===undefined||Array.isArray(val)?val:[val]),z.array(z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),CountSchema))).openapi({param:{"name":"p","in":"query","required":true,"schema":{"type":"array","items":{"$ref":"#/components/schemas/Count"}}}})`,
    )
  })

  // Node has a property that is a Node. The first level is emitted in place; the reference
  // inside it is left, because emitting it in place again would never end.
  // Node は、Node 型のプロパティを持つ。1段目はその場に出力されるが、その内側の参照は
  // そのまま残る。再びその場に出力すると、終わりがなくなるためである。
  it.concurrent('stops at a component that refers to itself', () => {
    expect(
      makeParameterSchema(
        {
          name: 'p',
          in: 'query',
          required: true,
          content: { 'text/plain': { schema: { $ref: '#/components/schemas/Node' } } },
        },
        undefined,
        schemas,
      ),
    ).toContain(
      String.raw`z.object({size:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional(),next:NodeSchema.exactOptional()}).openapi({param:{"name":"p","in":"query","required":true,"content":{"text/plain":{"schema":{"$ref":"#/components/schemas/Node"}}}},"required":[]})`,
    )
  })

  // What Count is cannot be known without its definition, so the reference is emitted as it
  // is.
  // 定義がなければ Count が何であるかは分からないため、参照はそのまま出力される。
  it.concurrent('leaves a reference alone without the component schemas', () => {
    expect(
      makeParameterSchema({
        name: 'p',
        in: 'query',
        required: true,
        schema: { $ref: '#/components/schemas/Count' },
      }),
    ).toBe(
      `CountSchema.openapi({param:{"name":"p","in":"query","required":true,"schema":{"$ref":"#/components/schemas/Count"}}})`,
    )
  })
})

// A scalar is read from text once, around the whole schema, and everything inside is
// emitted as for a typed value.
// スカラーは、スキーマ全体の外側で1度だけ文字列から読み取られる。その内側は、
// 型付きの値を前提として出力される。
describe('makeParameterSchema: the text is read once', () => {
  // Reading per branch gives `z.preprocess(..., z.int()).and(...)`: the left side outputs 10
  // and the right side the text "10", which Zod cannot merge and throws on.
  // 分岐ごとに読み取ると `z.preprocess(..., z.int()).and(...)` になる。左辺は 10 を、
  // 右辺は文字列 "10" を出力するため、Zod はマージできずに例外を投げる。
  it.concurrent('reads an allOf once, around its branches', () => {
    expect(
      makeParameterSchema(
        {
          name: 'p',
          in: 'query',
          required: true,
          schema: { allOf: [{ type: 'integer' }, { minimum: 5 }] },
        },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int().and(z.unknown().superRefine((val,ctx)=>{if(typeof val==='number'){if(val<5){ctx.addIssue({code:'custom'})}}}))).openapi({param:{"name":"p","in":"query","required":true,"schema":{"allOf":[{"type":"integer"},{"minimum":5}]}}})`,
    )
  })

  // "1" spells a number and a boolean. Read once, it is the number 1, which one branch takes.
  // "1" は number と boolean の両方の表記である。1度だけ読み取れば number の 1 となり、
  // 1つの分岐だけが受理する。
  it.concurrent('reads a oneOf of integer and boolean once', () => {
    expect(
      makeParameterSchema(
        {
          name: 'p',
          in: 'query',
          required: true,
          schema: { oneOf: [{ type: 'integer' }, { type: 'boolean' }] },
        },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`((schema)=>z.union([z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),schema),z.preprocess(((read)=>(val:unknown)=>{const result=read.safeParse(val);return result.success?result.data:val})(z.stringbool()),schema)]))(z.xor([z.int(),z.boolean()])).openapi({param:{"name":"p","in":"query","required":true,"schema":{"oneOf":[{"type":"integer"},{"type":"boolean"}]}}})`,
    )
  })

  // An array cannot be read from outside, so each branch reads its own text.
  // 配列は外側からは読み取れないため、各分岐がそれぞれ文字列を読み取る。
  it.concurrent('reads per branch when a branch is not a scalar', () => {
    expect(
      makeParameterSchema(
        {
          name: 'p',
          in: 'query',
          required: true,
          schema: { anyOf: [{ type: 'integer' }, { type: 'array', items: { type: 'integer' } }] },
        },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`z.union([z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()),z.array(z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()))]).openapi({param:{"name":"p","in":"query","required":true,"schema":{"anyOf":[{"type":"integer"},{"type":"array","items":{"type":"integer"}}]}}})`,
    )
  })

  // `type: integer, not: { const: 0 }` is an integer other than 0. The value is read as an
  // integer and validated as one before the exclusion is checked.
  // `type: integer, not: { const: 0 }` は、0 以外の整数である。値は integer として読み取られ、
  // integer として検証されたうえで、除外条件が確認される。
  it.concurrent('keeps the type beside not', () => {
    expect(
      makeParameterSchema(
        { name: 'p', in: 'query', required: true, schema: { type: 'integer', not: { const: 0 } } },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int().refine((val) => val !== 0)).openapi({param:{"name":"p","in":"query","required":true,"schema":{"type":"integer","not":{"const":0}}}})`,
    )
  })

  // `minimum` applies to numbers only, so numeric text is read as one for it to apply.
  // `minimum` は数値にのみ適用されるため、適用できるよう数値の文字列は number として
  // 読み取られる。
  it.concurrent('reads numeric text for a typeless minimum', () => {
    expect(
      makeParameterSchema(
        { name: 'p', in: 'query', required: true, schema: { minimum: 1 } },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`((schema)=>z.union([z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),schema),z.preprocess((val)=>(val==='true'?true:val==='false'?false:val),schema),schema,z.preprocess((val)=>(val==='null'?null:val),schema)]))(z.unknown().superRefine((val,ctx)=>{if(typeof val==='number'){if(val<1){ctx.addIssue({code:'custom'})}}})).openapi({param:{"name":"p","in":"query","required":true,"schema":{"minimum":1}}})`,
    )
  })

  // "2" is a member as it stands, so it is handed on before digits are read as a number.
  // "2" はそのままでメンバーであるため、数字が number として読み取られる前に
  // そのまま渡される。
  it.concurrent('keeps the string members of a mixed enum as text', () => {
    expect(
      makeParameterSchema(
        { name: 'p', in: 'query', required: true, schema: { enum: [1, 'a', '2'] } },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`((schema)=>z.union([z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),schema),schema]))(z.union([z.literal(1),z.literal('a'),z.literal('2')])).openapi({param:{"name":"p","in":"query","required":true,"schema":{"enum":[1,"a","2"]}}})`,
    )
  })

  // A tuple is validated inside a refinement, which checks a value without replacing it, so
  // the elements are read first: the integer position as a number, the string position as it
  // is, and what follows the prefix as `items` declares.
  // タプルは refinement の中で検証される。refinement は値を検証するだけで置き換えないため、
  // 要素は先に読み取られる。integer の位置は number として、string の位置はそのまま、
  // prefixItems より後ろは `items` の宣言どおりに読み取られる。
  it.concurrent('reads each element of a tuple by its position', () => {
    expect(
      makeParameterSchema(
        {
          name: 'p',
          in: 'query',
          required: true,
          schema: {
            type: 'array',
            prefixItems: [{ type: 'integer' }, { type: 'string' }],
            items: { type: 'boolean' },
          },
        },
        undefined,
        schemas,
      ),
    ).toContain(
      String.raw`z.preprocess((val)=>(val===undefined||Array.isArray(val)?val:[val]),z.preprocess((val)=>{if(!Array.isArray(val))return val;const prefix=[(val:unknown)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),(val:unknown)=>val];const rest=((read)=>(val:unknown)=>{const result=read.safeParse(val);return result.success?result.data:val})(z.stringbool());return val.map((item,i)=>(prefix[i]??rest)(item))},z.array(z.unknown()).superRefine((arr,ctx)=>{const Prefix=[z.int(),z.string()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const result=Schema.safeParse(arr[i]);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[i,...issue.path]})}}};const Rest=z.boolean();for(const [i,val] of arr.slice(Prefix.length).entries()){const result=Rest.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[Prefix.length+i,...issue.path]})}}}}))).openapi({param:{"name":"p","in":"query","required":true,"schema":{"type":"array","prefixItems":[{"type":"integer"},{"type":"string"}],"items":{"type":"boolean"}}}})`,
    )
  })
})

// A parameter declared with `content` carries one encoded document as its value.
// `content` で宣言されたパラメータは、値として1つのエンコードされた文書を運ぶ。
describe('makeParameterSchema: content', () => {
  // The document has types of its own, so its schema is emitted as for a typed value: `page`
  // is `z.int()`, not a schema that reads text.
  // 文書は自身で型を持つため、そのスキーマは型付きの値を前提として出力される。`page` は
  // 文字列を読み取るスキーマではなく、`z.int()` である。
  it.concurrent('parses a JSON document before it validates', () => {
    expect(
      makeParameterSchema({
        name: 'p',
        in: 'query',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: { page: { type: 'integer' } },
              required: ['page'],
            },
          },
        },
      }),
    ).toBe(
      `z.preprocess((val)=>{if(typeof val!=='string')return val;try{return JSON.parse(val)}catch{return val}},z.object({page:z.int()})).openapi({param:{"name":"p","in":"query","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"page":{"type":"integer"}},"required":["page"]}}}},"required":["page"]})`,
    )
  })

  // The brackets make the array one value: it takes no arity wrapper.
  // 角括弧で囲まれた配列は1つの値である。単一値を配列に包む処理は付かない。
  it.concurrent('parses a JSON array without wrapping it', () => {
    expect(
      makeParameterSchema({
        name: 'p',
        in: 'query',
        required: true,
        content: {
          'application/vnd.api+json': { schema: { type: 'array', items: { type: 'integer' } } },
        },
      }),
    ).toContain(
      `z.preprocess((val)=>{if(typeof val!=='string')return val;try{return JSON.parse(val)}catch{return val}},z.array(z.int()))`,
    )
  })

  // A media type that is not JSON carries plain text, read like a parameter with a schema.
  // JSON でないメディアタイプは、プレーンテキストを運ぶ。schema を持つパラメータと
  // 同じように読み取られる。
  it.concurrent('reads a text/plain document from text', () => {
    expect(
      makeParameterSchema({
        name: 'p',
        in: 'query',
        required: true,
        content: { 'text/plain': { schema: { type: 'integer' } } },
      }),
    ).toBe(
      String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).openapi({param:{"name":"p","in":"query","required":true,"content":{"text/plain":{"schema":{"type":"integer"}}}}})`,
    )
  })
})

// The converter sits directly on the schema; everything else goes around it.
// 変換関数はスキーマの直前に置かれ、それ以外はすべてその外側に置かれる。
describe('makeParameterSchema: what goes around the converter', () => {
  // The converter hands `undefined` on as it is, so the schema behind it sees that the value
  // is missing. `z.coerce.number()` turned it into NaN first, and the message was never used.
  // 変換関数は `undefined` をそのまま渡すため、その先のスキーマは値の欠落を認識できる。
  // `z.coerce.number()` は先に NaN へ変換していたため、このメッセージは使われなかった。
  it.concurrent('reports a missing value with x-required-message', () => {
    expect(
      makeParameterSchema({
        name: 'p',
        in: 'query',
        required: true,
        schema: { type: 'integer', 'x-error-message': 'bad', 'x-required-message': 'need' },
      }),
    ).toBe(
      String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int({error:(issue)=>issue.input===undefined?"need":"bad"})).openapi({param:{"name":"p","in":"query","required":true,"schema":{"type":"integer","x-error-message":"bad","x-required-message":"need"}}})`,
    )
  })

  // `.default()` has to see `undefined`, so it sits outside the preprocess.
  // `.default()` は `undefined` を受け取る必要があるため、preprocess の外側に置かれる。
  it.concurrent('keeps nullable and default outside the converter', () => {
    expect(
      makeParameterSchema({
        name: 'p',
        in: 'query',
        schema: { type: ['integer', 'null'], default: 20 },
      }),
    ).toContain(
      String.raw`z.preprocess((val)=>(val==='null'?null:val),z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).nullable()).default(20).exactOptional().openapi({param:{"name":"p","in":"query","schema":{"type":["integer","null"],"default":20},"required":false}})`,
    )
  })

  // `x-coerce` asks for `z.coerce` by name, with everything `Number(text)` reads.
  // `x-coerce` は `z.coerce` を明示的に指定するものであり、`Number(text)` が読み取るものを
  // すべて受理する。
  it.concurrent('keeps z.coerce for a schema with x-coerce', () => {
    expect(
      makeParameterSchema({
        name: 'p',
        in: 'query',
        required: true,
        schema: { type: 'integer', 'x-coerce': true },
      }),
    ).toBe(
      `z.coerce.number().int().openapi({param:{"name":"p","in":"query","required":true,"schema":{"type":"integer","x-coerce":true}}})`,
    )
  })

  // `z.stringbool()` is the boolean schema itself; it takes the text as it is.
  // `z.stringbool()` は boolean スキーマそのものであり、文字列をそのまま受け取る。
  it.concurrent('keeps z.stringbool() for a boolean', () => {
    expect(
      makeParameterSchema({ name: 'p', in: 'query', required: true, schema: { type: 'boolean' } }),
    ).toBe(
      `z.stringbool().openapi({param:{"name":"p","in":"query","required":true,"schema":{"type":"boolean"}}})`,
    )
  })

  // The style is undone first and the value read second.
  // 先にスタイルが解除され、その後で値が読み取られる。
  it.concurrent('strips the prefix of a label scalar before it reads the value', () => {
    expect(
      makeParameterSchema({
        name: 'id',
        in: 'path',
        required: true,
        style: 'label',
        schema: { type: 'integer' },
      }),
    ).toContain(
      String.raw`z.preprocess((val)=>(typeof val!=='string'?val:val.startsWith(".")?val.slice(1):undefined),z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int())).openapi({param:{"name":"id","in":"path","required":true,"style":"label","schema":{"type":"integer"}}})`,
    )
  })
})

// An object parameter is spread over the request: one key per property for `deepObject`,
// the properties as keys of the query for an exploded `form`, one value of alternating names
// and values otherwise. A query gathers them; the parameter itself is emitted as the object.
// オブジェクトのパラメータは、リクエストに分散して送られる。`deepObject` ではプロパティごとに
// 1つのキー、explode された `form` ではプロパティ自体がクエリのキー、それ以外では名前と値を
// 交互に並べた1つの値になる。クエリ側がそれらをまとめ、パラメータ自体はオブジェクトとして
// 出力される。
describe('makeParameterSchema: an object parameter', () => {
  // The properties are read like the fields of a form: an array accepts both arities, and a
  // boolean is read by a converter.
  // プロパティは、フォームのフィールドと同じように読み取られる。配列は単一値と複数値の
  // 両方を受理し、boolean は変換関数で読み取られる。
  it('reads the properties of a deepObject parameter from text', () => {
    expect(
      makeParameterSchema({
        name: 'filter',
        in: 'query',
        style: 'deepObject',
        schema: {
          type: 'object',
          properties: {
            age: { type: 'integer' },
            active: { type: 'boolean' },
            ids: { type: 'array', items: { type: 'integer' } },
          },
        },
      }),
    ).toContain(
      String.raw`z.object({age:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional(),active:z.preprocess(((read)=>(val:unknown)=>{const result=read.safeParse(val);return result.success?result.data:val})(z.stringbool()),z.boolean()).exactOptional(),ids:z.preprocess((val)=>(val===undefined||Array.isArray(val)?val:[val]),z.array(z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()))).exactOptional()}).exactOptional().openapi({param:{"name":"filter","in":"query","style":"deepObject","schema":{"type":"object","properties":{"age":{"type":"integer"},"active":{"type":"boolean"},"ids":{"type":"array","items":{"type":"integer"}}}},"required":false},"required":[]})`,
    )
  })

  // `explode: false` sends `filter=age,5`: the value is split into pairs before the object
  // is validated.
  // `explode: false` では `filter=age,5` が送られる。値は、オブジェクトが検証される前に
  // 名前と値のペアに分割される。
  it('splits a form object that does not explode into pairs', () => {
    expect(
      makeParameterSchema({
        name: 'filter',
        in: 'query',
        explode: false,
        schema: { type: 'object', properties: { age: { type: 'integer' } } },
      }),
    ).toContain(
      String.raw`z.preprocess((val)=>{if(typeof val!=='string')return val;const parts=val.split(",");if(parts.length%2!==0)return val;return Object.fromEntries(parts.flatMap((part,i)=>(i%2===0?[[part,parts[i+1]]]:[])))},z.object({age:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional()})).exactOptional().openapi({param:{"name":"filter","in":"query","explode":false,"schema":{"type":"object","properties":{"age":{"type":"integer"}}},"required":false},"required":[]})`,
    )
  })

  // An exploded object with no declared property has keys that cannot be told from those of
  // other parameters, so nothing gathers them: the schema is the object the document declares.
  // プロパティを宣言していない explode されたオブジェクトは、そのキーを他のパラメータの
  // キーと区別できないため、何も集められない。スキーマはドキュメントが宣言したオブジェクトになる。
  it('reads an exploded form object that declares no properties as the document declares it', () => {
    expect(
      makeParameterSchema({ name: 'filter', in: 'query', schema: { type: 'object' } }),
    ).toContain('z.object({})')
  })

  // An object in a header is one value of alternating names and values.
  // ヘッダーのオブジェクトは、名前と値を交互に並べた1つの値である。
  it('splits a header object into pairs', () => {
    expect(
      makeParameterSchema({
        name: 'x-filter',
        in: 'header',
        schema: { type: 'object', properties: { age: { type: 'integer' } } },
      }),
    ).toContain(
      String.raw`z.preprocess((val)=>{if(typeof val!=='string')return val;const parts=val.split(",").map((part)=>part.trim());if(parts.length%2!==0)return val;return Object.fromEntries(parts.flatMap((part,i)=>(i%2===0?[[part,parts[i+1]]]:[])))},z.object({age:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional()})).exactOptional().openapi({param:{"name":"x-filter","in":"header","schema":{"type":"object","properties":{"age":{"type":"integer"}}},"required":false},"required":[]})`,
    )
  })

  // `allowEmptyValue: true` lets `?page=` say the same as leaving page out. The empty value
  // is read as absent outside `.default()`, which only applies to a value that is missing.
  // The default is stated again outside, for a parameter that is not sent at all and so
  // never reaches the one inside.
  // `allowEmptyValue: true` の場合、`?page=` は page を省略したのと同じ意味になる。
  // 空の値は `.default()` の外側で「指定なし」として読み取られる。`.default()` は、
  // 値が欠落している場合にのみ適用されるためである。
  // デフォルト値は外側にも記述される。まったく送信されなかったパラメータは、
  // 内側のデフォルト値に到達しないためである。
  it('reads an allowed empty value as absent, outside the default', () => {
    expect(
      makeParameterSchema({
        name: 'page',
        in: 'query',
        allowEmptyValue: true,
        schema: { type: 'integer', default: 1 },
      }),
    ).toContain(
      String.raw`z.preprocess((val)=>(val===''?undefined:val),z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).default(1)).default(1).exactOptional().openapi({param:{"name":"page","in":"query","allowEmptyValue":true,"schema":{"type":"integer","default":1},"required":false}})`,
    )
  })

  // Without a default the schema inside has to take the missing value it is handed.
  // デフォルト値がない場合、内側のスキーマは、渡された「値なし」を受理できなければならない。
  it('lets an optional parameter pass when its allowed empty value is read as absent', () => {
    expect(
      makeParameterSchema({
        name: 'page',
        in: 'query',
        allowEmptyValue: true,
        schema: { type: 'integer' },
      }),
    ).toContain(
      String.raw`z.preprocess((val)=>(val===''?undefined:val),z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).optional()).exactOptional().openapi({param:{"name":"page","in":"query","allowEmptyValue":true,"schema":{"type":"integer"},"required":false}})`,
    )
  })

  // A required parameter sent empty is a required parameter that is missing.
  // 空で送られた必須パラメータは、欠落している必須パラメータである。
  it('leaves a required parameter required when its empty value is read as absent', () => {
    expect(
      makeParameterSchema({
        name: 'page',
        in: 'query',
        required: true,
        allowEmptyValue: true,
        schema: { type: 'integer' },
      }),
    ).toContain(
      String.raw`z.preprocess((val)=>(val===''?undefined:val),z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int())).openapi({param:{"name":"page","in":"query","required":true,"allowEmptyValue":true,"schema":{"type":"integer"}}})`,
    )
  })
})

// `filter[age]=5` and an exploded `size=5` are keys of the query, not of the parameter they
// belong to, so the query gathers them before it validates.
// `filter[age]=5` や explode された `size=5` は、所属するパラメータのキーではなく、クエリの
// キーである。そのため、クエリは検証の前にそれらをまとめる。
describe('makeRequestParams: a query that gathers its objects', () => {
  // Without an object the query is a plain object.
  // オブジェクトがなければ、クエリは単純なオブジェクトである。
  it('emits a plain object for a query of scalars', () => {
    expect(
      makeRequestParams([{ name: 'q', in: 'query', required: true, schema: { type: 'string' } }]),
    ).toBe(
      'query:z.object({q:z.string().openapi({param:{"name":"q","in":"query","required":true,"schema":{"type":"string"}}})})',
    )
  })

  // The keys `filter[...]` are gathered under `filter`.
  // `filter[...]` のキーは、`filter` の下にまとめられる。
  it('gathers the keys of a deepObject parameter', () => {
    expect(
      makeRequestParams([
        {
          name: 'filter',
          in: 'query',
          required: true,
          style: 'deepObject',
          schema: { type: 'object', properties: { name: { type: 'string' } } },
        },
      ]),
    ).toBe(
      String.raw`query:z.looseObject({}).transform((val)=>{const rest:[string,unknown][]=[];const groups=new Map<string,Record<string,unknown>>();const group=(name:string)=>{const found=groups.get(name);if(found!==undefined)return found;const made:Record<string,unknown>=Object.create(null);groups.set(name,made);return made};const isGroup=(item:unknown):item is Record<string,unknown>=>typeof item==='object'&&item!==null&&!Array.isArray(item);const lists=new WeakSet<object>();const isIndex=(part:string|undefined)=>part!==undefined&&/^\d*$/.test(part);const child=(target:Record<string,unknown>,key:string,asList:boolean)=>{const held=target[key];if(isGroup(held))return held;const made:Record<string,unknown>=Object.create(null);if(asList)lists.add(made);target[key]=made;return made};const set=(root:Record<string,unknown>,path:readonly string[],item:unknown):void=>{const work:[Record<string,unknown>,number,unknown,boolean][]=[[root,0,item,false]];for(let job=work.pop();job!==undefined;job=work.pop()){const [target,at,value,split]=job;const head=path[at];if(head===undefined)continue;const next=path[at+1];if(head===''){if(!split&&Array.isArray(value)){for(let i=value.length-1;i>=0;i-=1)work.push([target,at,value[i],true]);continue}const size=Object.keys(target).length;if(next===undefined){target[String(size)]=value;continue}const free=next===''?-1:Object.values(target).findIndex((held)=>isGroup(held)&&!(next in held));work.push([child(target,String(free<0?size:free),isIndex(next)),at+1,value,false]);continue}if(next===undefined){target[head]=value;continue}work.push([child(target,head,isIndex(next)),at+1,value,false])}};const settle=(root:unknown):unknown=>{if(!isGroup(root))return root;const found:[Record<string,unknown>,string,Record<string,unknown>][]=[];const queue:Record<string,unknown>[]=[root];for(const node of queue){for(const [key,inner] of Object.entries(node)){if(isGroup(inner)){found.push([node,key,inner]);queue.push(inner)}}}const finish=(group:Record<string,unknown>):unknown=>lists.has(group)?Object.entries(group).sort((a,b)=>Number(a[0])-Number(b[0])).map(([,inner])=>inner):Object.assign(Object.create(null),group);for(const [parent,key,group] of found.reverse()){parent[key]=finish(group)}return finish(root)};const deep:string[]=["filter"];for(const [key,item] of Object.entries(val)){const match=/^([^\[\]]+)((?:\[[^\[\]]*\])+)$/.exec(key);const name=match?.[1];const path=match?.[2];if(name!==undefined&&path!==undefined&&deep.includes(name)){const parts=path.slice(1,-1).split('][');set(group(name),parts,item);continue};rest.push([key,item])};return Object.fromEntries([...rest,...[...groups].map(([name,held])=>[name,settle(held)] as const)])}).pipe(z.object({filter:z.object({name:z.string().exactOptional()}).openapi({param:{"name":"filter","in":"query","required":true,"style":"deepObject","schema":{"type":"object","properties":{"name":{"type":"string"}}}},"required":[]})}))`,
    )
  })

  // The properties of an exploded object are keys of the query. `page` is a parameter of its
  // own as well, so it is never read as the property of `opts`.
  // explode されたオブジェクトのプロパティは、クエリのキーである。`page` は独立した
  // パラメータでもあるため、`opts` のプロパティとして読み取られることはない。
  it('gathers the properties of an exploded form object, leaving other parameters alone', () => {
    expect(
      makeRequestParams([
        {
          name: 'opts',
          in: 'query',
          schema: {
            type: 'object',
            properties: { size: { type: 'string' }, page: { type: 'string' } },
          },
        },
        { name: 'page', in: 'query', schema: { type: 'string' } },
      ]),
    ).toContain('const spread=new Map<string,string[]>([["size",["opts"]]]);')
  })

  // `explode: false` is one key, so there is nothing to gather.
  // `explode: false` は1つのキーなので、まとめるものはない。
  it('emits a plain object for a form object that does not explode', () => {
    expect(
      makeRequestParams([
        {
          name: 'filter',
          in: 'query',
          explode: false,
          schema: { type: 'object', properties: { name: { type: 'string' } } },
        },
      ]),
    ).not.toContain('z.looseObject')
  })
})

// A form body carries every field as text, or as a file. Nothing describes a body but its
// schema, so what reads the text has to be something the document looks through: a
// converter, where a parameter takes `z.stringbool()`.
// フォームボディは、すべてのフィールドを文字列またはファイルとして運ぶ。ボディを記述する
// ものはスキーマしかないため、文字列を読み取る処理は、ドキュメントがその先を参照できる
// ものでなければならない。パラメータでは `z.stringbool()` を使う箇所で、変換関数を使う。
describe('makeRequestBody: a form body', () => {
  // An integer field is read from text.
  // integer のフィールドは、文字列から読み取られる。
  it.concurrent('reads an integer field of a urlencoded body from text', () => {
    expect(
      makeRequestBody({
        content: {
          'application/x-www-form-urlencoded': {
            schema: { type: 'object', properties: { age: { type: 'integer' } } },
          },
        },
      }),
    ).toBe(
      String.raw`{content:{'application/x-www-form-urlencoded':{schema:z.object({age:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional()}).openapi({"required":[]})}}}`,
    )
  })

  // `z.stringbool()` would be documented as a string, and the field is a boolean.
  // `z.stringbool()` はドキュメントに string として記載されるが、このフィールドは
  // boolean である。
  it.concurrent('reads a boolean field with a converter', () => {
    expect(
      makeRequestBody({
        content: {
          'multipart/form-data': {
            schema: { type: 'object', properties: { active: { type: 'boolean' } } },
          },
        },
      }),
    ).toBe(
      String.raw`{content:{'multipart/form-data':{schema:z.object({active:z.preprocess(((read)=>(val:unknown)=>{const result=read.safeParse(val);return result.success?result.data:val})(z.stringbool()),z.boolean()).exactOptional()}).openapi({"required":[]})}}}`,
    )
  })

  // A field sent once arrives as a bare string, so an array field accepts both arities.
  // 1回だけ送られたフィールドは素の文字列として届くため、配列のフィールドは単一値と
  // 複数値の両方を受理する。
  it.concurrent('accepts both arities for an array field', () => {
    expect(
      makeRequestBody({
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: { ids: { type: 'array', items: { type: 'integer' } } },
            },
          },
        },
      }),
    ).toBe(
      String.raw`{content:{'application/x-www-form-urlencoded':{schema:z.object({ids:z.preprocess((val)=>(val===undefined||Array.isArray(val)?val:[val]),z.array(z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()))).exactOptional()}).openapi({"required":[]})}}}`,
    )
  })

  // A file is a file on the wire; there is nothing to read.
  // ファイルは、ワイヤ上でもファイルである。読み取るものはない。
  it.concurrent('leaves a file field as it is', () => {
    expect(
      makeRequestBody({
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              required: ['file'],
              properties: { file: { type: 'string', format: 'binary' } },
            },
          },
        },
      }),
    ).toBe(
      `{content:{'multipart/form-data':{schema:z.object({file:z.file().openapi({type:"string",format:"binary"})}).openapi({"required":["file"]})}}}`,
    )
  })

  // A component that is the body is written out in place, with fields that read text: the
  // component itself is shared with the bodies that arrive typed.
  // ボディそのものであるコンポーネントは、文字列を読み取るフィールドを持つ形で、その場に
  // 展開される。コンポーネント自体は、型付きで届くボディと共有されているためである。
  it.concurrent('writes a component form body out in place', () => {
    expect(
      makeRequestBody(
        {
          content: {
            'application/x-www-form-urlencoded': { schema: { $ref: '#/components/schemas/Node' } },
          },
        },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`{content:{'application/x-www-form-urlencoded':{schema:z.object({size:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional(),next:NodeSchema.exactOptional()}).openapi({"required":[]})}}}`,
    )
  })

  // The media type is matched whatever its case and its parameters.
  // メディアタイプは、大文字小文字やパラメータの有無にかかわらず判定される。
  it.concurrent('recognises a form media type with a parameter', () => {
    expect(
      makeRequestBody({
        content: {
          'Multipart/Form-Data; boundary=x': {
            schema: { type: 'object', properties: { age: { type: 'integer' } } },
          },
        },
      }),
    ).toContain(
      String.raw`{content:{'Multipart/Form-Data; boundary=x':{schema:z.object({age:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional()}).openapi({"required":[]})}}}`,
    )
  })

  // A JSON body has types of its own.
  // JSON ボディは、自身で型を持つ。
  it.concurrent('leaves a JSON body typed', () => {
    expect(
      makeRequestBody({
        content: {
          'application/json': {
            schema: { type: 'object', properties: { age: { type: 'integer' } } },
          },
        },
      }),
    ).toBe(
      `{content:{'application/json':{schema:z.object({age:z.int().exactOptional()}).openapi({"required":[]})}}}`,
    )
  })
})

// A response is written by the server, which sends typed values whatever the media type.
// レスポンスはサーバーが書き出すものであり、メディアタイプにかかわらず型付きの値を送る。
describe('makeContent: a form media type outside a request body', () => {
  // Without the request marker nothing is read from text.
  // リクエストであることを示す指定がなければ、文字列から読み取るものはない。
  it.concurrent('leaves the content of a response typed', () => {
    expect(
      makeContent({
        'application/x-www-form-urlencoded': {
          schema: { type: 'object', properties: { age: { type: 'integer' } } },
        },
      }),
    ).toStrictEqual([
      `'application/x-www-form-urlencoded':{schema:z.object({age:z.int().exactOptional()}).openapi({"required":[]})}`,
    ])
  })
})

// Zod leaves a key named __proto__ out of every object it parses, so a parameter of that
// name is never read. The document is taken as it is, and the key is written so that it is
// a key and not the prototype of the object that holds the parameters.
// Zod は、パースするすべてのオブジェクトから __proto__ という名前のキーを除外する。そのため、
// この名前のパラメータは読み取られない。ドキュメントはそのまま扱われ、キーはパラメータを保持する
// オブジェクトのプロトタイプにならないように書き出される。
describe('makeParameters: a parameter named __proto__', () => {
  // The key is written as a computed one.
  // キーは計算されたキーとして書き出される。
  it('writes the parameter under a computed key', () => {
    const { query } = makeParameters([
      { name: '__proto__', in: 'query', schema: { type: 'integer' } },
    ])
    expect(Object.keys(query ?? {})).toStrictEqual(["['__proto__']"])
  })
})

// A parameter named like what every object inherits is read as absent when the request
// object answers with what it inherits.
// すべてのオブジェクトが継承するものと同じ名前のパラメータは、リクエストオブジェクトが
// 継承したものを返した場合に、存在しないものとして読まれる。
describe('makeParameterSchema: a name every object inherits', () => {
  // The reader stands outside the schema, around .optional(), so that what is inherited
  // becomes a missing value an optional parameter takes.
  // リーダーはスキーマの外側、.optional() の周りに置かれる。これにより、継承されたものは、
  // 任意パラメータが受理する欠落値になる。
  it('reads what is inherited as absent for an optional parameter', () => {
    expect(
      makeParameterSchema({ name: 'constructor', in: 'query', schema: { type: 'string' } }),
    ).toBe(
      `z.preprocess((val)=>(typeof val==='function'||val===Object.prototype?undefined:val),z.string().optional()).exactOptional().openapi({param:{"name":"constructor","in":"query","schema":{"type":"string"},"required":false}})`,
    )
  })

  // A required parameter stays required: what is inherited is a missing value it rejects.
  // 必須パラメータは、必須のままである。継承されたものは欠落値となり、拒否される。
  it('reads what is inherited as missing for a required parameter', () => {
    expect(
      makeParameterSchema({
        name: 'toString',
        in: 'header',
        required: true,
        schema: { type: 'string' },
      }),
    ).toBe(
      `z.preprocess((val)=>(typeof val==='function'||val===Object.prototype?undefined:val),z.string()).openapi({param:{"name":"toString","in":"header","required":true,"schema":{"type":"string"}}})`,
    )
  })

  // The default is stated outside the reader, where a missing value reaches it.
  // デフォルト値は、リーダーの外側に記述される。欠落値は、そこでデフォルト値に到達する。
  it('states the default outside the reader', () => {
    expect(
      makeParameterSchema({
        name: 'valueOf',
        in: 'cookie',
        schema: { type: 'string', default: 'a' },
      }),
    ).toBe(
      `z.preprocess((val)=>(typeof val==='function'||val===Object.prototype?undefined:val),z.string().default("a")).default("a").exactOptional().openapi({param:{"name":"valueOf","in":"cookie","schema":{"type":"string","default":"a"},"required":false}})`,
    )
  })

  // A path parameter is always sent, so there is nothing inherited to read.
  // パスパラメータは必ず送信されるため、読み取るべき継承値は存在しない。
  it('leaves a path parameter as it is', () => {
    expect(
      makeParameterSchema({
        name: 'constructor',
        in: 'path',
        required: true,
        schema: { type: 'string' },
      }),
    ).toBe(
      `z.string().openapi({param:{"name":"constructor","in":"path","required":true,"schema":{"type":"string"}}})`,
    )
  })
})
