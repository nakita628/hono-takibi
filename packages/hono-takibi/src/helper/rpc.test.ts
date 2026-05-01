import { describe, expect, it } from 'vite-plus/test'

import {
  formatPath,
  hasNoContentResponse,
  makeOperationDeps,
  makeParseResponseType,
  operationHasArgs,
  parsePathItem,
  resolveSplitOutDir,
} from './rpc.js'

/* ═══════════════════════════════════ formatPath ═══════════════════════════════════ */

describe('formatPath', () => {
  it.concurrent('handles root path without basePath', () => {
    expect(formatPath('/')).toStrictEqual({
      runtimePath: '.index',
      typeofPrefix: '.index',
      bracketSuffix: '',
      hasBracket: false,
    })
  })

  it.concurrent('handles root path with basePath', () => {
    expect(formatPath('/', true)).toStrictEqual({
      runtimePath: '',
      typeofPrefix: '',
      bracketSuffix: '',
      hasBracket: false,
    })
  })

  it.concurrent('handles simple path', () => {
    expect(formatPath('/users')).toStrictEqual({
      runtimePath: '.users',
      typeofPrefix: '.users',
      bracketSuffix: '',
      hasBracket: false,
    })
  })

  it.concurrent('handles nested path', () => {
    expect(formatPath('/api/users')).toStrictEqual({
      runtimePath: '.api.users',
      typeofPrefix: '.api.users',
      bracketSuffix: '',
      hasBracket: false,
    })
  })

  it.concurrent('handles path with parameter', () => {
    expect(formatPath('/users/{id}')).toStrictEqual({
      runtimePath: ".users[':id']",
      typeofPrefix: '.users',
      bracketSuffix: "[':id']",
      hasBracket: true,
    })
  })

  it.concurrent('handles path with multiple parameters', () => {
    expect(formatPath('/users/{userId}/posts/{postId}')).toStrictEqual({
      runtimePath: ".users[':userId'].posts[':postId']",
      typeofPrefix: '.users',
      bracketSuffix: "[':userId']['posts'][':postId']",
      hasBracket: true,
    })
  })

  it.concurrent('handles trailing slash', () => {
    expect(formatPath('/users/')).toStrictEqual({
      runtimePath: '.users.index',
      typeofPrefix: '.users.index',
      bracketSuffix: '',
      hasBracket: false,
    })
  })

  it.concurrent('handles deeply nested path', () => {
    expect(formatPath('/api/v1/users')).toStrictEqual({
      runtimePath: '.api.v1.users',
      typeofPrefix: '.api.v1.users',
      bracketSuffix: '',
      hasBracket: false,
    })
  })
})

/* ═══════════════════════════════════ hasNoContentResponse ═══════════════════════════════════ */

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

/* ═══════════════════════════════════ resolveSplitOutDir ═══════════════════════════════════ */

describe('resolveSplitOutDir', () => {
  it.concurrent('strips .ts extension and resolves index path', () => {
    const result = resolveSplitOutDir('src/output.ts')
    expect(result.outDir).toBe('src')
    expect(result.indexPath).toBe('src/index.ts')
  })

  it.concurrent('uses directory as-is when no .ts extension', () => {
    const result = resolveSplitOutDir('src/output')
    expect(result.outDir).toBe('src/output')
    expect(result.indexPath).toBe('src/output/index.ts')
  })

  it.concurrent('handles simple file name', () => {
    const result = resolveSplitOutDir('index.ts')
    expect(result.outDir).toBe('.')
    expect(result.indexPath).toBe('index.ts')
  })
})

/* ═══════════════════════════════════ parsePathItem ═══════════════════════════════════ */

describe('parsePathItem', () => {
  it.concurrent('parses path item with get operation', () => {
    const result = parsePathItem({
      get: { responses: { '200': {} } },
    })
    expect(result).toStrictEqual({
      parameters: undefined,
      get: { responses: { '200': {} } },
      put: undefined,
      post: undefined,
      delete: undefined,
      options: undefined,
      head: undefined,
      patch: undefined,
      trace: undefined,
    })
  })

  it.concurrent('parses path item with multiple operations', () => {
    const result = parsePathItem({
      get: { responses: { '200': {} } },
      post: { responses: { '201': {} } },
      delete: { responses: { '204': {} } },
    })
    expect(result.get).toStrictEqual({ responses: { '200': {} } })
    expect(result.post).toStrictEqual({ responses: { '201': {} } })
    expect(result.delete).toStrictEqual({ responses: { '204': {} } })
    expect(result.put).toBe(undefined)
  })

  it.concurrent('includes path-level parameters', () => {
    const params = [{ name: 'id', in: 'path', schema: { type: 'string' } }]
    const result = parsePathItem({
      parameters: params,
      get: { responses: {} },
    })
    expect(result.parameters).toStrictEqual(params)
  })

  it.concurrent('filters out non-operation properties', () => {
    const result = parsePathItem({
      summary: 'Not an operation',
      description: 'Also not an operation',
    })
    expect(result.get).toBe(undefined)
    expect(result.post).toBe(undefined)
  })
})

/* ═══════════════════════════════════ makeParseResponseType ═══════════════════════════════════ */

describe('makeParseResponseType', () => {
  it.concurrent('generates type for simple path', () => {
    const pathResult = {
      runtimePath: '.users',
      typeofPrefix: '.users',
      bracketSuffix: '',
      hasBracket: false,
    }
    expect(makeParseResponseType('client', pathResult, 'get')).toBe(
      'Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>',
    )
  })

  it.concurrent('generates type for bracket path', () => {
    const pathResult = {
      runtimePath: ".users[':id']",
      typeofPrefix: '.users',
      bracketSuffix: "[':id']",
      hasBracket: true,
    }
    expect(makeParseResponseType('api', pathResult, 'get')).toBe(
      "Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof api.users[':id']['$get']>>>>>",
    )
  })

  it.concurrent('generates type for post method', () => {
    const pathResult = {
      runtimePath: '.users',
      typeofPrefix: '.users',
      bracketSuffix: '',
      hasBracket: false,
    }
    expect(makeParseResponseType('client', pathResult, 'post')).toBe(
      'Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>',
    )
  })
})

/* ═══════════════════════════════════ makeOperationDeps ═══════════════════════════════════ */

describe('makeOperationDeps', () => {
  it.concurrent('creates deps with client name', () => {
    const deps = makeOperationDeps('client', {}, {})
    expect(deps.client).toBe('client')
    expect(typeof deps.toParameterLikes).toBe('function')
    expect(typeof deps.pickAllBodyInfo).toBe('function')
  })

  it.concurrent('toParameterLikes returns empty array for undefined', () => {
    const deps = makeOperationDeps('client', {}, {})
    expect(deps.toParameterLikes(undefined)).toStrictEqual([])
  })

  it.concurrent('toParameterLikes resolves inline parameters', () => {
    const deps = makeOperationDeps('client', {}, {})
    const result = deps.toParameterLikes([
      { name: 'id', in: 'path', required: true },
      { name: 'page', in: 'query' },
    ])
    expect(result).toStrictEqual([
      { name: 'id', in: 'path', required: true },
      { name: 'page', in: 'query' },
    ])
  })

  it.concurrent('toParameterLikes resolves $ref parameters', () => {
    const deps = makeOperationDeps(
      'client',
      { userId: { name: 'userId', in: 'path', required: true } },
      {},
    )
    const result = deps.toParameterLikes([{ $ref: '#/components/parameters/userId' }])
    expect(result).toStrictEqual([{ name: 'userId', in: 'path', required: true }])
  })

  it.concurrent('pickAllBodyInfo returns undefined for no requestBody', () => {
    const deps = makeOperationDeps('client', {}, {})
    const result = deps.pickAllBodyInfo({ responses: {} })
    expect(result).toBe(undefined)
  })

  it.concurrent('pickAllBodyInfo detects JSON body', () => {
    const deps = makeOperationDeps('client', {}, {})
    const result = deps.pickAllBodyInfo({
      requestBody: {
        content: {
          'application/json': { schema: { type: 'object' } },
        },
      },
      responses: {},
    })
    expect(result).toStrictEqual({
      form: [],
      json: [{ contentType: 'application/json' }],
    })
  })

  it.concurrent('pickAllBodyInfo detects form body', () => {
    const deps = makeOperationDeps('client', {}, {})
    const result = deps.pickAllBodyInfo({
      requestBody: {
        content: {
          'multipart/form-data': { schema: { type: 'object' } },
        },
      },
      responses: {},
    })
    expect(result).toStrictEqual({
      form: [{ contentType: 'multipart/form-data' }],
      json: [],
    })
  })

  it.concurrent('pickAllBodyInfo resolves $ref requestBody', () => {
    const deps = makeOperationDeps(
      'client',
      {},
      {
        UserBody: {
          content: {
            'application/json': { schema: { type: 'object' } },
          },
        },
      },
    )
    const result = deps.pickAllBodyInfo({
      requestBody: { $ref: '#/components/requestBodies/UserBody' },
      responses: {},
    })
    expect(result).toStrictEqual({
      form: [],
      json: [{ contentType: 'application/json' }],
    })
  })
})

/* ═══════════════════════════════════ operationHasArgs ═══════════════════════════════════ */

describe('operationHasArgs', () => {
  it.concurrent('returns true when path parameters exist', () => {
    const deps = makeOperationDeps('client', {}, {})
    const item = { parameters: [{ name: 'id', in: 'path', required: true }] }
    const op = { responses: {} }
    expect(operationHasArgs(item, op, deps)).toBe(true)
  })

  it.concurrent('returns true when query parameters exist', () => {
    const deps = makeOperationDeps('client', {}, {})
    const item = {}
    const op = { parameters: [{ name: 'page', in: 'query' }], responses: {} }
    expect(operationHasArgs(item, op, deps)).toBe(true)
  })

  it.concurrent('returns true when requestBody exists', () => {
    const deps = makeOperationDeps('client', {}, {})
    const item = {}
    const op = {
      requestBody: {
        content: { 'application/json': { schema: { type: 'object' } } },
      },
      responses: {},
    }
    expect(operationHasArgs(item, op, deps)).toBe(true)
  })

  it.concurrent('returns false when no parameters and no body', () => {
    const deps = makeOperationDeps('client', {}, {})
    const item = {}
    const op = { responses: {} }
    expect(operationHasArgs(item, op, deps)).toBe(false)
  })

  it.concurrent('returns true when header parameters exist', () => {
    const deps = makeOperationDeps('client', {}, {})
    const item = {}
    const op = { parameters: [{ name: 'X-API-Key', in: 'header' }], responses: {} }
    expect(operationHasArgs(item, op, deps)).toBe(true)
  })

  it.concurrent('returns true when cookie parameters exist', () => {
    const deps = makeOperationDeps('client', {}, {})
    const item = {}
    const op = { parameters: [{ name: 'session', in: 'cookie' }], responses: {} }
    expect(operationHasArgs(item, op, deps)).toBe(true)
  })

  it.concurrent('returns true when both path and op params exist', () => {
    const deps = makeOperationDeps('client', {}, {})
    const item = { parameters: [{ name: 'id', in: 'path', required: true }] }
    const op = { parameters: [{ name: 'page', in: 'query' }], responses: {} }
    expect(operationHasArgs(item, op, deps)).toBe(true)
  })

  it.concurrent('returns true for form body', () => {
    const deps = makeOperationDeps('client', {}, {})
    const item = {}
    const op = {
      requestBody: {
        content: { 'multipart/form-data': { schema: { type: 'object' } } },
      },
      responses: {},
    }
    expect(operationHasArgs(item, op, deps)).toBe(true)
  })

  it.concurrent('returns false for $ref requestBody with missing component', () => {
    const deps = makeOperationDeps('client', {}, {})
    const item = {}
    const op = {
      requestBody: { $ref: '#/components/requestBodies/NonExistent' },
      responses: {},
    }
    expect(operationHasArgs(item, op, deps)).toBe(false)
  })

  it.concurrent('returns true for $ref parameters resolved from components', () => {
    const deps = makeOperationDeps('client', { pageParam: { name: 'page', in: 'query' } }, {})
    const item = {}
    const op = {
      parameters: [{ $ref: '#/components/parameters/pageParam' }],
      responses: {},
    }
    expect(operationHasArgs(item, op, deps)).toBe(true)
  })

  it.concurrent('returns false when parameters array is empty', () => {
    const deps = makeOperationDeps('client', {}, {})
    const item = { parameters: [] }
    const op = { parameters: [], responses: {} }
    expect(operationHasArgs(item, op, deps)).toBe(false)
  })
})

/* ═══════════════════════════════════ Use Case: REST API CRUD ═══════════════════════════════════ */

describe('Use Case: REST API CRUD patterns', () => {
  it.concurrent('formats typical CRUD paths correctly', () => {
    // List endpoint
    expect(formatPath('/api/v1/users')).toStrictEqual({
      runtimePath: '.api.v1.users',
      typeofPrefix: '.api.v1.users',
      bracketSuffix: '',
      hasBracket: false,
    })

    // Single resource endpoint
    expect(formatPath('/api/v1/users/{id}')).toStrictEqual({
      runtimePath: ".api.v1.users[':id']",
      typeofPrefix: '.api.v1.users',
      bracketSuffix: "[':id']",
      hasBracket: true,
    })

    // Nested resource
    expect(formatPath('/api/v1/users/{userId}/posts/{postId}/comments')).toStrictEqual({
      runtimePath: ".api.v1.users[':userId'].posts[':postId'].comments",
      typeofPrefix: '.api.v1.users',
      bracketSuffix: "[':userId']['posts'][':postId']['comments']",
      hasBracket: true,
    })
  })

  it.concurrent('generates correct response types for various methods', () => {
    const pathResult = formatPath('/api/v1/users/{id}')

    expect(makeParseResponseType('client', pathResult, 'get')).toBe(
      "Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.api.v1.users[':id']['$get']>>>>>",
    )

    expect(makeParseResponseType('client', pathResult, 'put')).toBe(
      "Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.api.v1.users[':id']['$put']>>>>>",
    )

    expect(makeParseResponseType('client', pathResult, 'delete')).toBe(
      "Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.api.v1.users[':id']['$delete']>>>>>",
    )
  })

  it.concurrent('detects CRUD operations with bodies vs without', () => {
    const deps = makeOperationDeps('client', {}, {})

    // GET (no body) with path param → has args
    const getOp = { parameters: [{ name: 'id', in: 'path', required: true }], responses: {} }
    expect(operationHasArgs({ parameters: [] }, getOp, deps)).toBe(true)

    // POST with JSON body → has args
    const postOp = {
      requestBody: {
        content: { 'application/json': { schema: { type: 'object' } } },
      },
      responses: {},
    }
    expect(operationHasArgs({}, postOp, deps)).toBe(true)

    // DELETE with no params or body → no args
    const deleteOp = { responses: {} }
    expect(operationHasArgs({}, deleteOp, deps)).toBe(false)
  })

  it.concurrent('detects 204 No Content for DELETE operations', () => {
    expect(hasNoContentResponse({ responses: { '204': {} } })).toBe(true)
    expect(hasNoContentResponse({ responses: { '200': {} } })).toBe(false)
    expect(hasNoContentResponse({ responses: { '200': {}, '204': {} } })).toBe(true)
  })
})

/* ═══════════════════════════════════ Use Case: File Upload API ═══════════════════════════════════ */

describe('Use Case: File upload with multipart form', () => {
  it.concurrent('detects form-data and url-encoded body types', () => {
    const deps = makeOperationDeps('client', {}, {})

    // multipart/form-data
    const multipartOp = {
      requestBody: {
        content: { 'multipart/form-data': { schema: { type: 'object' } } },
      },
      responses: {},
    }
    const multipartResult = deps.pickAllBodyInfo(multipartOp)
    expect(multipartResult).toStrictEqual({
      form: [{ contentType: 'multipart/form-data' }],
      json: [],
    })

    // application/x-www-form-urlencoded
    const urlencodedOp = {
      requestBody: {
        content: { 'application/x-www-form-urlencoded': { schema: { type: 'object' } } },
      },
      responses: {},
    }
    const urlencodedResult = deps.pickAllBodyInfo(urlencodedOp)
    expect(urlencodedResult).toStrictEqual({
      form: [{ contentType: 'application/x-www-form-urlencoded' }],
      json: [],
    })
  })

  it.concurrent('handles mixed content types', () => {
    const deps = makeOperationDeps('client', {}, {})
    const mixedOp = {
      requestBody: {
        content: {
          'application/json': { schema: { type: 'object' } },
          'multipart/form-data': { schema: { type: 'object' } },
        },
      },
      responses: {},
    }
    const result = deps.pickAllBodyInfo(mixedOp)
    expect(result).toStrictEqual({
      form: [{ contentType: 'multipart/form-data' }],
      json: [{ contentType: 'application/json' }],
    })
  })
})

/* ═══════════════════════════════════ Use Case: parsePathItem for OpenAPI spec ═══════════════════════════════════ */

describe('Use Case: OpenAPI path item parsing', () => {
  it.concurrent('parses a complete RESTful resource path item', () => {
    const rawItem = {
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      get: { summary: 'Get resource', responses: { '200': {} } },
      put: { summary: 'Update resource', responses: { '200': {} } },
      delete: { summary: 'Delete resource', responses: { '204': {} } },
      // non-operation fields should be ignored
      summary: 'Resource operations',
      description: 'CRUD operations',
    }
    const result = parsePathItem(rawItem)

    expect(result.get).toStrictEqual({ summary: 'Get resource', responses: { '200': {} } })
    expect(result.put).toStrictEqual({ summary: 'Update resource', responses: { '200': {} } })
    expect(result.delete).toStrictEqual({ summary: 'Delete resource', responses: { '204': {} } })
    expect(result.post).toBe(undefined)
    expect(result.patch).toBe(undefined)
    expect(result.options).toBe(undefined)
    expect(result.head).toBe(undefined)
    expect(result.trace).toBe(undefined)
    expect(result.parameters).toStrictEqual([
      { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
    ])
  })

  it.concurrent('parses empty path item', () => {
    const result = parsePathItem({})
    expect(result).toStrictEqual({
      parameters: undefined,
      get: undefined,
      put: undefined,
      post: undefined,
      delete: undefined,
      options: undefined,
      head: undefined,
      patch: undefined,
      trace: undefined,
    })
  })

  it.concurrent('ignores invalid operation values', () => {
    const result = parsePathItem({
      get: 'not an operation',
      post: 42,
      put: null,
      delete: [],
    })
    expect(result.get).toBe(undefined)
    expect(result.post).toBe(undefined)
    expect(result.put).toBe(undefined)
    expect(result.delete).toBe(undefined)
  })
})
