import { describe, expect, it } from 'vitest'
import {
  isContentBody,
  isHttpMethod,
  isMedia,
  isMediaWithSchema,
  isOpenAPIPaths,
  isOperation,
  isOperationLike,
  isOperationWithResponses,
  isParameter,
  isParameterArray,
  isParameterObject,
  isRecord,
  isRefObject,
  isRequestBody,
  isRequestBodyOrRef,
  isSchemaArray,
  isSchemaProperty,
  isSecurityArray,
  isSecurityScheme,
  isStringRef,
  isValidIdent,
} from './index.js'

/* ═══════════════════════════════════ Base Guards ═══════════════════════════════════ */

describe('isRecord', () => {
  it.concurrent('returns true for plain object', () => {
    expect(isRecord({})).toBe(true)
  })

  it.concurrent('returns true for object with properties', () => {
    expect(isRecord({ a: 1, b: 'test' })).toBe(true)
  })

  it.concurrent('returns false for null', () => {
    expect(isRecord(null)).toBe(false)
  })

  it.concurrent('returns false for undefined', () => {
    expect(isRecord(undefined)).toBe(false)
  })

  it.concurrent('returns false for array', () => {
    expect(isRecord([1, 2, 3])).toBe(false)
  })

  it.concurrent('returns false for string', () => {
    expect(isRecord('hello')).toBe(false)
  })

  it.concurrent('returns false for number', () => {
    expect(isRecord(42)).toBe(false)
  })

  it.concurrent('returns false for boolean', () => {
    expect(isRecord(true)).toBe(false)
  })
})

describe('isHttpMethod', () => {
  it.concurrent('returns true for get', () => {
    expect(isHttpMethod('get')).toBe(true)
  })

  it.concurrent('returns true for put', () => {
    expect(isHttpMethod('put')).toBe(true)
  })

  it.concurrent('returns true for post', () => {
    expect(isHttpMethod('post')).toBe(true)
  })

  it.concurrent('returns true for delete', () => {
    expect(isHttpMethod('delete')).toBe(true)
  })

  it.concurrent('returns true for patch', () => {
    expect(isHttpMethod('patch')).toBe(true)
  })

  it.concurrent('returns true for options', () => {
    expect(isHttpMethod('options')).toBe(true)
  })

  it.concurrent('returns true for head', () => {
    expect(isHttpMethod('head')).toBe(true)
  })

  it.concurrent('returns true for trace', () => {
    expect(isHttpMethod('trace')).toBe(true)
  })

  it.concurrent('returns false for GET (uppercase)', () => {
    expect(isHttpMethod('GET')).toBe(false)
  })

  it.concurrent('returns false for connect', () => {
    expect(isHttpMethod('connect')).toBe(false)
  })

  it.concurrent('returns false for empty string', () => {
    expect(isHttpMethod('')).toBe(false)
  })
})

describe('isValidIdent', () => {
  it.concurrent('returns true for simple identifier', () => {
    expect(isValidIdent('foo')).toBe(true)
  })

  it.concurrent('returns true for underscore prefix', () => {
    expect(isValidIdent('_private')).toBe(true)
  })

  it.concurrent('returns true for dollar prefix', () => {
    expect(isValidIdent('$var')).toBe(true)
  })

  it.concurrent('returns true for camelCase', () => {
    expect(isValidIdent('myVariable')).toBe(true)
  })

  it.concurrent('returns true for alphanumeric', () => {
    expect(isValidIdent('abc123')).toBe(true)
  })

  it.concurrent('returns false for number prefix', () => {
    expect(isValidIdent('123abc')).toBe(false)
  })

  it.concurrent('returns false for hyphenated', () => {
    expect(isValidIdent('my-var')).toBe(false)
  })

  it.concurrent('returns false for colon prefix', () => {
    expect(isValidIdent(':id')).toBe(false)
  })

  it.concurrent('returns false for empty string', () => {
    expect(isValidIdent('')).toBe(false)
  })
})

/* ═══════════════════════════════════ OpenAPI Guards ═══════════════════════════════════ */

describe('isOpenAPIPaths', () => {
  it.concurrent('returns true for valid paths object', () => {
    expect(
      isOpenAPIPaths({
        '/users': { get: { responses: {} } },
        '/posts': { post: { responses: {} } },
      }),
    ).toBe(true)
  })

  it.concurrent('returns true for empty object', () => {
    expect(isOpenAPIPaths({})).toBe(true)
  })

  it.concurrent('returns false for null', () => {
    expect(isOpenAPIPaths(null)).toBe(false)
  })

  it.concurrent('returns false for array', () => {
    expect(isOpenAPIPaths([])).toBe(false)
  })

  it.concurrent('returns false for object with non-object values', () => {
    expect(isOpenAPIPaths({ '/users': 'invalid' })).toBe(false)
  })

  it.concurrent('returns false for string', () => {
    expect(isOpenAPIPaths('paths')).toBe(false)
  })
})

describe('isRefObject', () => {
  it.concurrent('returns true for valid $ref object', () => {
    expect(isRefObject({ $ref: '#/components/schemas/User' })).toBe(true)
  })

  it.concurrent('returns false for object without $ref', () => {
    expect(isRefObject({ name: 'test' })).toBe(false)
  })

  it.concurrent('returns false for null', () => {
    expect(isRefObject(null)).toBe(false)
  })

  it.concurrent('returns false for array', () => {
    expect(isRefObject([])).toBe(false)
  })

  it.concurrent('returns false for $ref with non-string value', () => {
    expect(isRefObject({ $ref: 123 })).toBe(false)
  })

  it.concurrent('returns false for string', () => {
    expect(isRefObject('ref')).toBe(false)
  })
})

describe('isStringRef', () => {
  it.concurrent('returns true for object with string $ref', () => {
    expect(isStringRef({ $ref: '#/components/schemas/Pet' })).toBe(true)
  })

  it.concurrent('returns false for object without $ref', () => {
    expect(isStringRef({ name: 'test' })).toBe(false)
  })

  it.concurrent('returns false for object with non-string $ref', () => {
    expect(isStringRef({ $ref: 42 })).toBe(false)
  })
})

/* ═══════════════════════════════════ Parameter Guards ═══════════════════════════════════ */

describe('isParameterObject', () => {
  it.concurrent('returns true for path parameter', () => {
    expect(isParameterObject({ name: 'id', in: 'path', required: true })).toBe(true)
  })

  it.concurrent('returns true for query parameter', () => {
    expect(isParameterObject({ name: 'page', in: 'query' })).toBe(true)
  })

  it.concurrent('returns true for header parameter', () => {
    expect(isParameterObject({ name: 'X-API-Key', in: 'header' })).toBe(true)
  })

  it.concurrent('returns true for cookie parameter', () => {
    expect(isParameterObject({ name: 'session', in: 'cookie' })).toBe(true)
  })

  it.concurrent('returns false for missing name', () => {
    expect(isParameterObject({ in: 'path' })).toBe(false)
  })

  it.concurrent('returns false for missing in', () => {
    expect(isParameterObject({ name: 'id' })).toBe(false)
  })

  it.concurrent('returns false for invalid in value', () => {
    expect(isParameterObject({ name: 'id', in: 'body' })).toBe(false)
  })

  it.concurrent('returns false for null', () => {
    expect(isParameterObject(null)).toBe(false)
  })

  it.concurrent('returns false for array', () => {
    expect(isParameterObject([])).toBe(false)
  })

  it.concurrent('returns false for non-string name', () => {
    expect(isParameterObject({ name: 123, in: 'query' })).toBe(false)
  })
})

describe('isParameter', () => {
  it.concurrent('returns true for parameter with schema', () => {
    expect(isParameter({ name: 'id', in: 'path', schema: { type: 'string' } })).toBe(true)
  })

  it.concurrent('returns true for parameter with content', () => {
    expect(isParameter({ name: 'filter', in: 'query', content: {} })).toBe(true)
  })

  it.concurrent('returns false for parameter without schema or content', () => {
    expect(isParameter({ name: 'id', in: 'path' })).toBe(false)
  })

  it.concurrent('returns false for null', () => {
    expect(isParameter(null)).toBe(false)
  })

  it.concurrent('returns false for string', () => {
    expect(isParameter('param')).toBe(false)
  })
})

describe('isParameterArray', () => {
  it.concurrent('returns true for array', () => {
    expect(isParameterArray([{ name: 'id', in: 'path', schema: { type: 'string' } }])).toBe(true)
  })

  it.concurrent('returns true for empty array', () => {
    expect(isParameterArray([])).toBe(true)
  })

  it.concurrent('returns false for object', () => {
    expect(isParameterArray({})).toBe(false)
  })

  it.concurrent('returns false for null', () => {
    expect(isParameterArray(null)).toBe(false)
  })

  it.concurrent('returns false for undefined', () => {
    expect(isParameterArray(undefined)).toBe(false)
  })
})

/* ═══════════════════════════════════ Operation Guards ═══════════════════════════════════ */

describe('isOperationLike', () => {
  it.concurrent('returns true for object with responses', () => {
    expect(isOperationLike({ responses: { '200': {} } })).toBe(true)
  })

  it.concurrent('returns true for full operation', () => {
    expect(
      isOperationLike({
        summary: 'Get users',
        description: 'Get all users',
        parameters: [],
        requestBody: {},
        responses: { '200': {} },
      }),
    ).toBe(true)
  })

  it.concurrent('returns false for object without responses', () => {
    expect(isOperationLike({ summary: 'test' })).toBe(false)
  })

  it.concurrent('returns false for null', () => {
    expect(isOperationLike(null)).toBe(false)
  })

  it.concurrent('returns false for array', () => {
    expect(isOperationLike([])).toBe(false)
  })

  it.concurrent('returns false for string', () => {
    expect(isOperationLike('operation')).toBe(false)
  })
})

describe('isOperation', () => {
  it.concurrent('returns true for object with responses', () => {
    expect(isOperation({ responses: {} })).toBe(true)
  })

  it.concurrent('returns false for object without responses', () => {
    expect(isOperation({ summary: 'test' })).toBe(false)
  })

  it.concurrent('returns false for null', () => {
    expect(isOperation(null)).toBe(false)
  })

  it.concurrent('returns false for string', () => {
    expect(isOperation('op')).toBe(false)
  })
})

describe('isOperationWithResponses', () => {
  it.concurrent('returns true for operation with object responses', () => {
    expect(
      isOperationWithResponses({
        responses: { '200': { content: { 'application/json': { schema: { type: 'string' } } } } },
      }),
    ).toBe(true)
  })

  it.concurrent('returns false for null responses', () => {
    expect(isOperationWithResponses({ responses: null })).toBe(false)
  })

  it.concurrent('returns false for missing responses', () => {
    expect(isOperationWithResponses({ summary: 'test' })).toBe(false)
  })

  it.concurrent('returns false for null', () => {
    expect(isOperationWithResponses(null)).toBe(false)
  })
})

/* ═══════════════════════════════════ Schema Guards ═══════════════════════════════════ */

describe('isSchemaProperty', () => {
  it.concurrent('returns true for object with schema', () => {
    expect(isSchemaProperty({ schema: { type: 'string' } })).toBe(true)
  })

  it.concurrent('returns false for object without schema', () => {
    expect(isSchemaProperty({ name: 'test' })).toBe(false)
  })

  it.concurrent('returns false for null', () => {
    expect(isSchemaProperty(null)).toBe(false)
  })

  it.concurrent('returns false for array', () => {
    expect(isSchemaProperty([])).toBe(false)
  })

  it.concurrent('returns false for string', () => {
    expect(isSchemaProperty('schema')).toBe(false)
  })
})

describe('isSchemaArray', () => {
  it.concurrent('returns true for array of schemas', () => {
    expect(isSchemaArray([{ type: 'string' }, { type: 'number' }])).toBe(true)
  })

  it.concurrent('returns false for single schema', () => {
    expect(isSchemaArray({ type: 'string' })).toBe(false)
  })
})

describe('isMediaWithSchema', () => {
  it.concurrent('returns true for object with schema', () => {
    expect(isMediaWithSchema({ schema: { type: 'string' } })).toBe(true)
  })

  it.concurrent('returns false for object without schema', () => {
    expect(isMediaWithSchema({ example: {} })).toBe(false)
  })

  it.concurrent('returns false for null', () => {
    expect(isMediaWithSchema(null)).toBe(false)
  })

  it.concurrent('returns false for string', () => {
    expect(isMediaWithSchema('media')).toBe(false)
  })
})

describe('isMedia', () => {
  it.concurrent('returns true for media with schema', () => {
    expect(isMedia({ schema: { type: 'string' } })).toBe(true)
  })

  it.concurrent('returns false for reference object', () => {
    expect(isMedia({ $ref: '#/components/schemas/User' })).toBe(false)
  })
})

/* ═══════════════════════════════════ RequestBody / Response Guards ═══════════════════════════════════ */

describe('isRequestBody', () => {
  it.concurrent('returns true for request body with content', () => {
    expect(isRequestBody({ content: { 'application/json': {} } })).toBe(true)
  })

  it.concurrent('returns true for request body with required', () => {
    expect(isRequestBody({ required: true })).toBe(true)
  })

  it.concurrent('returns true for request body with description', () => {
    expect(isRequestBody({ description: 'Request body' })).toBe(true)
  })

  it.concurrent('returns false for null', () => {
    expect(isRequestBody(null)).toBe(false)
  })

  it.concurrent('returns false for empty object', () => {
    expect(isRequestBody({})).toBe(false)
  })

  it.concurrent('returns false for string', () => {
    expect(isRequestBody('body')).toBe(false)
  })
})

describe('isRequestBodyOrRef', () => {
  it.concurrent('returns true for $ref', () => {
    expect(isRequestBodyOrRef({ $ref: '#/components/requestBodies/UserBody' })).toBe(true)
  })

  it.concurrent('returns true for content body', () => {
    expect(isRequestBodyOrRef({ content: { 'application/json': {} } })).toBe(true)
  })

  it.concurrent('returns false for null', () => {
    expect(isRequestBodyOrRef(null)).toBe(false)
  })

  it.concurrent('returns false for array', () => {
    expect(isRequestBodyOrRef([])).toBe(false)
  })

  it.concurrent('returns false for empty object', () => {
    expect(isRequestBodyOrRef({})).toBe(false)
  })
})

describe('isContentBody', () => {
  it.concurrent('returns true for content body without $ref', () => {
    expect(isContentBody({ content: { 'application/json': { schema: { type: 'object' } } } })).toBe(
      true,
    )
  })

  it.concurrent('returns true for empty object', () => {
    expect(isContentBody({})).toBe(true)
  })

  it.concurrent('returns false for $ref object', () => {
    expect(isContentBody({ $ref: '#/components/requestBodies/UserBody' })).toBe(false)
  })

  it.concurrent('returns false for null', () => {
    expect(isContentBody(null)).toBe(false)
  })

  it.concurrent('returns false for string', () => {
    expect(isContentBody('body')).toBe(false)
  })
})

/* ═══════════════════════════════════ Security Guards ═══════════════════════════════════ */

describe('isSecurityScheme', () => {
  it.concurrent('returns true for bearer security scheme', () => {
    expect(isSecurityScheme({ type: 'http', scheme: 'bearer' })).toBe(true)
  })

  it.concurrent('returns true for apiKey security scheme', () => {
    expect(isSecurityScheme({ type: 'apiKey', name: 'X-API-Key', in: 'header' })).toBe(true)
  })

  it.concurrent('returns true for empty object (no $ref)', () => {
    expect(isSecurityScheme({})).toBe(true)
  })

  it.concurrent('returns false for $ref object', () => {
    expect(isSecurityScheme({ $ref: '#/components/securitySchemes/Bearer' })).toBe(false)
  })

  it.concurrent('returns false for null', () => {
    expect(isSecurityScheme(null)).toBe(false)
  })

  it.concurrent('returns false for string', () => {
    expect(isSecurityScheme('scheme')).toBe(false)
  })
})

describe('isSecurityArray', () => {
  it.concurrent('returns true for array of security requirements', () => {
    expect(isSecurityArray([{ bearerAuth: [] }])).toBe(true)
  })

  it.concurrent('returns true for empty array', () => {
    expect(isSecurityArray([])).toBe(true)
  })

  it.concurrent('returns false for object', () => {
    expect(isSecurityArray({})).toBe(false)
  })

  it.concurrent('returns false for null', () => {
    expect(isSecurityArray(null)).toBe(false)
  })

  it.concurrent('returns false for string', () => {
    expect(isSecurityArray('security')).toBe(false)
  })
})
