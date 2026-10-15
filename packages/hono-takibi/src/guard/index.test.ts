import { describe, expect, it } from 'vite-plus/test'

import {
  hasNoContentResponse,
  hasNotProperty,
  hasNoUserChain,
  hasNumericConstraint,
  hasRequestBodyContent,
  hasTypelessConstraint,
  isContentBody,
  isDiscriminableBranch,
  isExamplesInput,
  isHttpMethod,
  isInheritedName,
  isInlineMedia,
  isMedia,
  isMediaWithSchema,
  isOffsetTime,
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
  isResponses,
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

/* ═══════════════════════════════════ Responses Guards ═══════════════════════════════════ */

describe('isResponses', () => {
  it.concurrent('returns true for response with $ref', () => {
    expect(isResponses({ $ref: '#/components/responses/NotFound' })).toBe(true)
  })

  it.concurrent('returns true for response with description', () => {
    expect(isResponses({ description: 'Successful response' })).toBe(true)
  })

  it.concurrent('returns true for response with content', () => {
    expect(isResponses({ content: { 'application/json': { schema: { type: 'object' } } } })).toBe(
      true,
    )
  })

  it.concurrent('returns true for response with headers', () => {
    expect(isResponses({ headers: { 'X-Rate-Limit': { schema: { type: 'integer' } } } })).toBe(true)
  })

  it.concurrent('returns true for response with links', () => {
    expect(isResponses({ links: { GetUser: { operationId: 'getUser' } } })).toBe(true)
  })

  it.concurrent('returns true for response with description and content', () => {
    expect(
      isResponses({
        description: 'OK',
        content: { 'application/json': { schema: { type: 'string' } } },
      }),
    ).toBe(true)
  })

  it.concurrent('returns false for empty object', () => {
    expect(isResponses({})).toBe(false)
  })

  it.concurrent('returns false for null', () => {
    expect(isResponses(null)).toBe(false)
  })

  it.concurrent('returns false for array', () => {
    expect(isResponses([])).toBe(false)
  })

  it.concurrent('returns false for string', () => {
    expect(isResponses('response')).toBe(false)
  })

  it.concurrent('returns false for number', () => {
    expect(isResponses(200)).toBe(false)
  })

  it.concurrent('returns false for object without response keys', () => {
    expect(isResponses({ summary: 'test', type: 'object' })).toBe(false)
  })
})

describe('isDiscriminableBranch', () => {
  it.concurrent('should accept a bare object head that pins the discriminator to a const', () => {
    expect(
      isDiscriminableBranch(
        {
          type: 'object',
          properties: { kind: { type: 'string', const: 'circle' }, r: { type: 'number' } },
          required: ['kind'],
        },
        'kind',
      ),
    ).toBe(true)
  })

  it.concurrent('should accept an all-string enum on the discriminator', () => {
    expect(
      isDiscriminableBranch(
        {
          type: 'object',
          properties: { kind: { type: 'string', enum: ['circle', 'ellipse'] } },
          required: ['kind'],
        },
        'kind',
      ),
    ).toBe(true)
  })

  it.concurrent('should reject a branch that does not require the discriminator', () => {
    expect(
      isDiscriminableBranch(
        { type: 'object', properties: { kind: { type: 'string', const: 'circle' } } },
        'kind',
      ),
    ).toBe(false)
  })

  it.concurrent('should reject a branch whose discriminator is not pinned to a literal', () => {
    expect(
      isDiscriminableBranch(
        { type: 'object', properties: { kind: { type: 'string' } }, required: ['kind'] },
        'kind',
      ),
    ).toBe(false)
  })

  it.concurrent('should reject composed, record, nullable and defaulted heads', () => {
    const properties = { kind: { type: 'string', const: 'circle' } } as const
    const required = ['kind'] as const
    expect(
      isDiscriminableBranch({ allOf: [{ type: 'object', properties, required }] }, 'kind'),
    ).toBe(false)
    expect(
      isDiscriminableBranch(
        { type: 'object', properties, required, additionalProperties: { type: 'string' } },
        'kind',
      ),
    ).toBe(false)
    expect(
      isDiscriminableBranch({ type: 'object', properties, required, nullable: true }, 'kind'),
    ).toBe(false)
    expect(
      isDiscriminableBranch({ type: 'object', properties, required, default: {} }, 'kind'),
    ).toBe(false)
  })
})

/* ═══════════════════════════════════ Schema Predicates ═══════════════════════════════════ */

describe('hasTypelessConstraint', () => {
  it.concurrent('returns false for empty schema', () => {
    expect(hasTypelessConstraint({})).toBe(false)
  })

  it.concurrent('returns false for schema with only `type`', () => {
    expect(hasTypelessConstraint({ type: 'string' })).toBe(false)
  })

  it.concurrent('returns true for schema with `required`', () => {
    expect(hasTypelessConstraint({ required: ['x'] })).toBe(true)
  })

  it.concurrent('returns true for schema with `if`', () => {
    expect(hasTypelessConstraint({ if: { type: 'object' } })).toBe(true)
  })

  it.concurrent('returns true for schema with `contains`', () => {
    expect(hasTypelessConstraint({ contains: { type: 'string' } })).toBe(true)
  })
})

describe('isOffsetTime', () => {
  it.concurrent('returns true for a `time` format', () => {
    expect(isOffsetTime({ type: 'string', format: 'time' })).toBe(true)
  })

  it.concurrent('returns false when `x-isoOffset` is false', () => {
    expect(isOffsetTime({ type: 'string', format: 'time', 'x-isoOffset': false })).toBe(false)
  })

  it.concurrent('returns false for another format', () => {
    expect(isOffsetTime({ type: 'string', format: 'date' })).toBe(false)
  })
})

describe('hasNumericConstraint', () => {
  it.concurrent('returns false for a bare number', () => {
    expect(hasNumericConstraint({ type: 'number' })).toBe(false)
  })

  it.concurrent.each([
    { minimum: 0 },
    { maximum: 10 },
    { exclusiveMinimum: 0 },
    { exclusiveMaximum: 10 },
    { multipleOf: 2 },
  ])('returns true for %o', (constraint) => {
    expect(hasNumericConstraint({ type: 'number', ...constraint })).toBe(true)
  })
})

describe('hasNoUserChain', () => {
  it.concurrent('returns true for a plain schema', () => {
    expect(hasNoUserChain({ type: 'string' })).toBe(true)
  })

  it.concurrent.each(['x-preprocess', 'x-transform', 'x-pipe', 'x-codec'] as const)(
    'returns false with `%s`',
    (key) => {
      expect(hasNoUserChain({ type: 'string', [key]: 'v' })).toBe(false)
    },
  )
})

describe('hasNotProperty', () => {
  it.concurrent('returns true for an object with `not`', () => {
    expect(hasNotProperty({ not: false })).toBe(true)
  })

  it.concurrent('returns false for an object without `not`', () => {
    expect(hasNotProperty({ type: 'string' })).toBe(false)
  })

  it.concurrent('returns false for null', () => {
    expect(hasNotProperty(null)).toBe(false)
  })
})

describe('isExamplesInput', () => {
  it.concurrent('returns true for a map of example objects', () => {
    expect(isExamplesInput({ a: { value: 1 }, b: { $ref: '#/components/examples/B' } })).toBe(true)
  })

  it.concurrent('returns true for an empty map', () => {
    expect(isExamplesInput({})).toBe(true)
  })

  it.concurrent('returns false for an array', () => {
    expect(isExamplesInput([{ value: 1 }])).toBe(false)
  })

  it.concurrent('returns false when an entry is not an object', () => {
    expect(isExamplesInput({ a: 1 })).toBe(false)
  })
})

/* ═══════════════════════════════════ Operation Predicates ═══════════════════════════════════ */

describe('hasRequestBodyContent', () => {
  it.concurrent('returns true for a request body with content', () => {
    expect(hasRequestBodyContent({ requestBody: { content: {} }, responses: {} })).toBe(true)
  })

  it.concurrent('returns false for a request body without content', () => {
    expect(hasRequestBodyContent({ requestBody: { required: true }, responses: {} })).toBe(false)
  })

  it.concurrent('returns false without a request body', () => {
    expect(hasRequestBodyContent({ responses: {} })).toBe(false)
  })

  it.concurrent('returns false for null', () => {
    expect(hasRequestBodyContent(null)).toBe(false)
  })
})

describe('hasNoContentResponse', () => {
  it.concurrent('returns true for 204 response', () => {
    expect(hasNoContentResponse({ responses: { '204': {} } })).toBe(true)
  })

  it.concurrent('returns true for 205 response', () => {
    expect(hasNoContentResponse({ responses: { '205': {} } })).toBe(true)
  })

  it.concurrent('returns false for 200 response only', () => {
    expect(hasNoContentResponse({ responses: { '200': {} } })).toBe(false)
  })

  it.concurrent('returns false for no responses', () => {
    expect(hasNoContentResponse({})).toBe(false)
  })

  it.concurrent('returns true when 204 is among multiple responses', () => {
    expect(hasNoContentResponse({ responses: { '200': {}, '204': {} } })).toBe(true)
  })
})

describe('isInlineMedia', () => {
  it.concurrent('returns true for a media object', () => {
    expect(isInlineMedia({ schema: { type: 'string' } })).toBe(true)
  })

  it.concurrent('returns false for a reference', () => {
    expect(isInlineMedia({ $ref: '#/components/mediaTypes/Json' })).toBe(false)
  })
})

describe('isInheritedName', () => {
  // The request object answers to the name whether the parameter was sent or not.
  // リクエストオブジェクトは、パラメータが送信されたかどうかにかかわらず、この名前に応答する。
  it.concurrent('is true for a query parameter named like what every object inherits', () => {
    expect(isInheritedName({ name: 'constructor', in: 'query' })).toBe(true)
    expect(isInheritedName({ name: 'toString', in: 'query' })).toBe(true)
    expect(isInheritedName({ name: 'valueOf', in: 'query' })).toBe(true)
    expect(isInheritedName({ name: 'hasOwnProperty', in: 'query' })).toBe(true)
    expect(isInheritedName({ name: '__proto__', in: 'query' })).toBe(true)
  })

  // The same for a header and for a cookie.
  // ヘッダーと Cookie でも同様である。
  it.concurrent('is true for a header and for a cookie of such a name', () => {
    expect(isInheritedName({ name: 'constructor', in: 'header' })).toBe(true)
    expect(isInheritedName({ name: 'constructor', in: 'cookie' })).toBe(true)
  })

  // A path parameter is always sent: the route does not match without it.
  // パスパラメータは、必ず送信される。なければ、ルートが一致しない。
  it.concurrent('is false for a path parameter', () => {
    expect(isInheritedName({ name: 'constructor', in: 'path' })).toBe(false)
  })

  // A name no object inherits.
  // どのオブジェクトも継承しない名前。
  it.concurrent('is false for any other name', () => {
    expect(isInheritedName({ name: 'page', in: 'query' })).toBe(false)
    expect(isInheritedName({ name: 'x-request-id', in: 'header' })).toBe(false)
  })
})
