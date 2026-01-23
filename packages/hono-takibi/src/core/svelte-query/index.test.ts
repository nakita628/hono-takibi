import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../openapi/index.js'
import { svelteQuery } from './index.js'

/** Simple OpenAPI spec for basic tests */
const openapiSimple: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'Test', version: '1.0.0' },
  paths: {
    '/hono': {
      get: {
        summary: 'Hono',
        description: 'Simple ping for Hono',
        responses: { '200': { description: 'OK' } },
      },
    },
    '/users': {
      get: {
        summary: 'List users',
        description: 'List users with pagination.',
        parameters: [{ name: 'limit', in: 'query', schema: { type: 'integer' } }],
        responses: { '200': { description: 'OK' } },
      },
      post: {
        summary: 'Create user',
        description: 'Create a new user.',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object' } } },
        },
        responses: { '201': { description: 'Created' } },
      },
    },
  },
}

describe('svelteQuery', () => {
  it('should generate the correct svelte-query hooks code', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-'))
    try {
      const out = path.join(dir, 'index.ts')
      const result = await svelteQuery(openapiSimple, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export function createGetHono(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.hono.$get>,
      Error,
      InferResponseType<typeof client.hono.$get>,
      readonly ['/hono']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetHonoQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.hono.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /hono
 */
export function getGetHonoQueryKey() {
  return ['/hono'] as const
}

/**
 * GET /users
 *
 * List users
 *
 * List users with pagination.
 */
export function createGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.users.$get>,
      Error,
      InferResponseType<typeof client.users.$get>,
      readonly ['/users', InferRequestType<typeof client.users.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users
 */
export function getGetUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['/users', args] as const
}

/**
 * POST /users
 *
 * Create user
 *
 * Create a new user.
 */
export function createPostUsers(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.users.$post> | undefined,
      Error,
      InferRequestType<typeof client.users.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.users.$post> | undefined,
    Error,
    InferRequestType<typeof client.users.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.users.$post(args, options?.client)),
    },
    queryClient,
  )
}
`

      expect(code).toBe(expected)
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated svelte-query hooks written to ${out}`,
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('svelteQuery (split mode)', () => {
  it('should generate correct split files', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-split-'))
    try {
      const out = path.join(dir, 'hooks', 'index.ts')
      const result = await svelteQuery(openapiSimple, out, '../client', true)

      if (!result.ok) {
        throw new Error(result.error)
      }

      // Check index.ts barrel file
      const index = fs.readFileSync(path.join(dir, 'hooks', 'index.ts'), 'utf-8')
      const indexExpected = `export * from './createGetHono'
export * from './createGetUsers'
export * from './createPostUsers'
`
      expect(index).toBe(indexExpected)

      // Check GET hook file without args
      const createGetHono = fs.readFileSync(path.join(dir, 'hooks', 'createGetHono.ts'), 'utf-8')
      const createGetHonoExpected = `import { createQuery } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions } from '@tanstack/svelte-query'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export function createGetHono(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.hono.$get>,
      Error,
      InferResponseType<typeof client.hono.$get>,
      readonly ['/hono']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetHonoQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.hono.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /hono
 */
export function getGetHonoQueryKey() {
  return ['/hono'] as const
}
`
      expect(createGetHono).toBe(createGetHonoExpected)

      // Check GET hook file with args
      const createGetUsers = fs.readFileSync(path.join(dir, 'hooks', 'createGetUsers.ts'), 'utf-8')
      const createGetUsersExpected = `import { createQuery } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * GET /users
 *
 * List users
 *
 * List users with pagination.
 */
export function createGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.users.$get>,
      Error,
      InferResponseType<typeof client.users.$get>,
      readonly ['/users', InferRequestType<typeof client.users.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users
 */
export function getGetUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['/users', args] as const
}
`
      expect(createGetUsers).toBe(createGetUsersExpected)

      // Check POST hook file (mutation)
      const createPostUsers = fs.readFileSync(
        path.join(dir, 'hooks', 'createPostUsers.ts'),
        'utf-8',
      )
      const createPostUsersExpected = `import { createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * POST /users
 *
 * Create user
 *
 * Create a new user.
 */
export function createPostUsers(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.users.$post> | undefined,
      Error,
      InferRequestType<typeof client.users.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.users.$post> | undefined,
    Error,
    InferRequestType<typeof client.users.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.users.$post(args, options?.client)),
    },
    queryClient,
  )
}
`
      expect(createPostUsers).toBe(createPostUsersExpected)

      expect(result).toStrictEqual({
        ok: true,
        value: `Generated svelte-query hooks written to ${path.join(dir, 'hooks')}/*.ts (index.ts included)`,
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('svelteQuery (custom client name)', () => {
  it('should generate code with custom client name', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-client-'))
    try {
      const out = path.join(dir, 'index.ts')
      const simpleOpenAPI: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        paths: {
          '/users': {
            get: {
              summary: 'Get users',
              responses: { '200': { description: 'OK' } },
            },
          },
        },
      }

      const result = await svelteQuery(simpleOpenAPI, out, '../api', false, 'authClient')

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import { createQuery } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions } from '@tanstack/svelte-query'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { authClient } from '../api'

/**
 * GET /users
 *
 * Get users
 */
export function createGetUsers(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof authClient.users.$get>,
      Error,
      InferResponseType<typeof authClient.users.$get>,
      readonly ['/users']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(authClient.users.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users
 */
export function getGetUsersQueryKey() {
  return ['/users'] as const
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

/** Test OpenAPI spec for operations without arguments */
const openapiNoArgs: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'No Args Test', version: '1.0.0' },
  paths: {
    '/ping': {
      get: {
        summary: 'Ping',
        responses: { '200': { description: 'OK' } },
      },
      post: {
        summary: 'Post ping',
        responses: { '200': { description: 'OK' } },
      },
    },
  },
}

describe('svelteQuery (no args operations)', () => {
  it('should generate hooks without args correctly', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-noargs-'))
    try {
      const out = path.join(dir, 'index.ts')
      const result = await svelteQuery(openapiNoArgs, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * GET /ping
 *
 * Ping
 */
export function createGetPing(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.ping.$get>,
      Error,
      InferResponseType<typeof client.ping.$get>,
      readonly ['/ping']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPingQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.ping.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /ping
 */
export function getGetPingQueryKey() {
  return ['/ping'] as const
}

/**
 * POST /ping
 *
 * Post ping
 */
export function createPostPing(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.ping.$post> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<InferResponseType<typeof client.ping.$post> | undefined, Error, void>(
    {
      ...options?.mutation,
      mutationFn: async () => parseResponse(client.ping.$post(undefined, options?.client)),
    },
    queryClient,
  )
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('svelteQuery (path with special characters)', () => {
  it('should generate hooks for hyphenated paths', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-hyphen-'))
    try {
      const out = path.join(dir, 'index.ts')
      const hyphenOpenAPI: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        paths: {
          '/hono-x': {
            get: {
              summary: 'HonoX',
              responses: { '200': { description: 'OK' } },
            },
          },
        },
      }

      const result = await svelteQuery(hyphenOpenAPI, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import { createQuery } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions } from '@tanstack/svelte-query'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * GET /hono-x
 *
 * HonoX
 */
export function createGetHonoX(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['hono-x']['$get']>,
      Error,
      InferResponseType<(typeof client)['hono-x']['$get']>,
      readonly ['/hono-x']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetHonoXQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['hono-x'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /hono-x
 */
export function getGetHonoXQueryKey() {
  return ['/hono-x'] as const
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('svelteQuery (path parameters)', () => {
  it('should generate hooks for path with parameters', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-params-'))
    try {
      const out = path.join(dir, 'index.ts')
      const paramOpenAPI: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        paths: {
          '/users/{id}': {
            get: {
              summary: 'Get user',
              parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
              responses: { '200': { description: 'OK' } },
            },
            delete: {
              summary: 'Delete user',
              parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
              responses: { '204': { description: 'Deleted' } },
            },
          },
        },
      }

      const result = await svelteQuery(paramOpenAPI, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * GET /users/{id}
 *
 * Get user
 */
export function createGetUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.users)[':id']['$get']>,
      Error,
      InferResponseType<(typeof client.users)[':id']['$get']>,
      readonly ['/users/:id', InferRequestType<(typeof client.users)[':id']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users[':id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users/{id}
 */
export function getGetUsersIdQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
) {
  return ['/users/:id', args] as const
}

/**
 * DELETE /users/{id}
 *
 * Delete user
 */
export function createDeleteUsersId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.users)[':id']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.users)[':id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.users)[':id']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':id']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.users[':id'].$delete(args, options?.client)),
    },
    queryClient,
  )
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('svelteQuery (invalid paths)', () => {
  it('should return error for invalid OpenAPI paths', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-invalid-'))
    try {
      const out = path.join(dir, 'index.ts')
      const invalidOpenAPI: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        // paths is undefined
      }

      const result = await svelteQuery(invalidOpenAPI, out, '../client', false)

      expect(result).toStrictEqual({
        ok: false,
        error: 'Invalid OpenAPI paths',
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('svelteQuery (PUT/PATCH methods)', () => {
  it('should generate hooks for PUT and PATCH methods', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-put-patch-'))
    try {
      const out = path.join(dir, 'index.ts')
      const putPatchOpenAPI: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        paths: {
          '/users/{id}': {
            put: {
              summary: 'Replace user',
              parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
              requestBody: {
                required: true,
                content: { 'application/json': { schema: { type: 'object' } } },
              },
              responses: { '200': { description: 'OK' } },
            },
            patch: {
              summary: 'Update user',
              parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
              requestBody: {
                required: true,
                content: { 'application/json': { schema: { type: 'object' } } },
              },
              responses: { '200': { description: 'OK' } },
            },
          },
        },
      }

      const result = await svelteQuery(putPatchOpenAPI, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import { createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * PUT /users/{id}
 *
 * Replace user
 */
export function createPutUsersId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.users)[':id']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.users)[':id']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.users)[':id']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':id']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.users[':id'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /users/{id}
 *
 * Update user
 */
export function createPatchUsersId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.users)[':id']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.users)[':id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.users)[':id']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':id']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.users[':id'].$patch(args, options?.client)),
    },
    queryClient,
  )
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('svelteQuery (multiple path parameters)', () => {
  it('should generate hooks for paths with multiple parameters', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-multi-params-'))
    try {
      const out = path.join(dir, 'index.ts')
      const multiParamOpenAPI: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        paths: {
          '/users/{userId}/posts/{postId}': {
            get: {
              summary: 'Get user post',
              parameters: [
                { name: 'userId', in: 'path', required: true, schema: { type: 'string' } },
                { name: 'postId', in: 'path', required: true, schema: { type: 'string' } },
              ],
              responses: { '200': { description: 'OK' } },
            },
          },
        },
      }

      const result = await svelteQuery(multiParamOpenAPI, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import { createQuery } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * GET /users/{userId}/posts/{postId}
 *
 * Get user post
 */
export function createGetUsersUserIdPostsPostId(
  args: InferRequestType<(typeof client.users)[':userId']['posts'][':postId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.users)[':userId']['posts'][':postId']['$get']>,
      Error,
      InferResponseType<(typeof client.users)[':userId']['posts'][':postId']['$get']>,
      readonly [
        '/users/:userId/posts/:postId',
        InferRequestType<(typeof client.users)[':userId']['posts'][':postId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersUserIdPostsPostIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.users[':userId'].posts[':postId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users/{userId}/posts/{postId}
 */
export function getGetUsersUserIdPostsPostIdQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['posts'][':postId']['$get']>,
) {
  return ['/users/:userId/posts/:postId', args] as const
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('svelteQuery (query + path parameters)', () => {
  it('should generate hooks for path with both query and path parameters', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-query-path-'))
    try {
      const out = path.join(dir, 'index.ts')
      const queryPathOpenAPI: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        paths: {
          '/users/{id}/posts': {
            get: {
              summary: 'Get user posts',
              parameters: [
                { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
                { name: 'page', in: 'query', schema: { type: 'integer' } },
                { name: 'limit', in: 'query', schema: { type: 'integer' } },
              ],
              responses: { '200': { description: 'OK' } },
            },
          },
        },
      }

      const result = await svelteQuery(queryPathOpenAPI, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import { createQuery } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * GET /users/{id}/posts
 *
 * Get user posts
 */
export function createGetUsersIdPosts(
  args: InferRequestType<(typeof client.users)[':id']['posts']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.users)[':id']['posts']['$get']>,
      Error,
      InferResponseType<(typeof client.users)[':id']['posts']['$get']>,
      readonly ['/users/:id/posts', InferRequestType<(typeof client.users)[':id']['posts']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersIdPostsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users[':id'].posts.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users/{id}/posts
 */
export function getGetUsersIdPostsQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['posts']['$get']>,
) {
  return ['/users/:id/posts', args] as const
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('svelteQuery (nested paths)', () => {
  it('should generate hooks for deeply nested paths', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-nested-'))
    try {
      const out = path.join(dir, 'index.ts')
      const nestedOpenAPI: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        paths: {
          '/api/v1/users': {
            get: {
              summary: 'List users v1',
              responses: { '200': { description: 'OK' } },
            },
          },
        },
      }

      const result = await svelteQuery(nestedOpenAPI, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import { createQuery } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions } from '@tanstack/svelte-query'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * GET /api/v1/users
 *
 * List users v1
 */
export function createGetApiV1Users(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.api.v1.users.$get>,
      Error,
      InferResponseType<typeof client.api.v1.users.$get>,
      readonly ['/api/v1/users']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApiV1UsersQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.api.v1.users.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /api/v1/users
 */
export function getGetApiV1UsersQueryKey() {
  return ['/api/v1/users'] as const
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('svelteQuery (split mode with custom client)', () => {
  it('should generate split files with custom client name', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-split-client-'))
    try {
      const out = path.join(dir, 'hooks', 'index.ts')
      const simpleOpenAPI: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        paths: {
          '/users': {
            get: {
              summary: 'Get users',
              responses: { '200': { description: 'OK' } },
            },
          },
        },
      }

      const result = await svelteQuery(simpleOpenAPI, out, '../api', true, 'apiClient')

      if (!result.ok) {
        throw new Error(result.error)
      }

      // Check GET hook file with custom client name
      const createGetUsers = fs.readFileSync(path.join(dir, 'hooks', 'createGetUsers.ts'), 'utf-8')
      const createGetUsersExpected = `import { createQuery } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions } from '@tanstack/svelte-query'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { apiClient } from '../api'

/**
 * GET /users
 *
 * Get users
 */
export function createGetUsers(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof apiClient.users.$get>,
      Error,
      InferResponseType<typeof apiClient.users.$get>,
      readonly ['/users']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(apiClient.users.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users
 */
export function getGetUsersQueryKey() {
  return ['/users'] as const
}
`
      expect(createGetUsers).toBe(createGetUsersExpected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('svelteQuery (all HTTP methods)', () => {
  it('should generate hooks for all HTTP methods on same path', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-all-methods-'))
    try {
      const out = path.join(dir, 'index.ts')
      const allMethodsOpenAPI: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        paths: {
          '/resources/{id}': {
            get: {
              summary: 'Get resource',
              parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
              responses: { '200': { description: 'OK' } },
            },
            post: {
              summary: 'Create resource',
              parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
              requestBody: {
                required: true,
                content: { 'application/json': { schema: { type: 'object' } } },
              },
              responses: { '201': { description: 'Created' } },
            },
            put: {
              summary: 'Replace resource',
              parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
              requestBody: {
                required: true,
                content: { 'application/json': { schema: { type: 'object' } } },
              },
              responses: { '200': { description: 'OK' } },
            },
            patch: {
              summary: 'Update resource',
              parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
              requestBody: {
                required: true,
                content: { 'application/json': { schema: { type: 'object' } } },
              },
              responses: { '200': { description: 'OK' } },
            },
            delete: {
              summary: 'Delete resource',
              parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
              responses: { '204': { description: 'Deleted' } },
            },
          },
        },
      }

      const result = await svelteQuery(allMethodsOpenAPI, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * GET /resources/{id}
 *
 * Get resource
 */
export function createGetResourcesId(
  args: InferRequestType<(typeof client.resources)[':id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.resources)[':id']['$get']>,
      Error,
      InferResponseType<(typeof client.resources)[':id']['$get']>,
      readonly ['/resources/:id', InferRequestType<(typeof client.resources)[':id']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetResourcesIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.resources[':id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /resources/{id}
 */
export function getGetResourcesIdQueryKey(
  args: InferRequestType<(typeof client.resources)[':id']['$get']>,
) {
  return ['/resources/:id', args] as const
}

/**
 * PUT /resources/{id}
 *
 * Replace resource
 */
export function createPutResourcesId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.resources)[':id']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.resources)[':id']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.resources)[':id']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.resources)[':id']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.resources[':id'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /resources/{id}
 *
 * Create resource
 */
export function createPostResourcesId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.resources)[':id']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.resources)[':id']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.resources)[':id']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.resources)[':id']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.resources[':id'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /resources/{id}
 *
 * Delete resource
 */
export function createDeleteResourcesId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.resources)[':id']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.resources)[':id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.resources)[':id']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.resources)[':id']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.resources[':id'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /resources/{id}
 *
 * Update resource
 */
export function createPatchResourcesId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.resources)[':id']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.resources)[':id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.resources)[':id']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.resources)[':id']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.resources[':id'].$patch(args, options?.client)),
    },
    queryClient,
  )
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})
