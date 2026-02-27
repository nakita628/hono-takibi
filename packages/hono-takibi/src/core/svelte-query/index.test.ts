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
      const expected = `import { createQuery, createMutation, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates Svelte Query cache key for GET /hono
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetHonoQueryKey() {
  return ['hono', 'GET', '/hono'] as const
}

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export async function getHono(options?: ClientRequestOptions) {
  return await parseResponse(client.hono.$get(undefined, options))
}

/**
 * Returns Svelte Query query options for GET /hono
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetHonoQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetHonoQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHono({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export function createGetHono(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getHono>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetHonoQueryOptions(opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersQueryKey(args: Parameters<typeof getUsers>[0]) {
  return ['users', 'GET', '/users', args] as const
}

/**
 * GET /users
 *
 * List users
 *
 * List users with pagination.
 */
export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$get(args, options))
}

/**
 * Returns Svelte Query query options for GET /users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersQueryOptions(
  args: Parameters<typeof getUsers>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /users
 *
 * List users
 *
 * List users with pagination.
 */
export function createGetUsers(
  args: Parameters<typeof getUsers>[0],
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetUsersQueryOptions(args, opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query mutation key for POST /users
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostUsersMutationKey() {
  return ['users', 'POST', '/users'] as const
}

/**
 * POST /users
 *
 * Create user
 *
 * Create a new user.
 */
export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$post(args, options))
}

/**
 * Returns Svelte Query mutation options for POST /users
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostUsersMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostUsersMutationKey(),
    async mutationFn(args: Parameters<typeof postUsers>[0]) {
      return postUsers(args, clientOptions)
    },
  }
}

/**
 * POST /users
 *
 * Create user
 *
 * Create a new user.
 */
export function createPostUsers(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postUsers>>,
      Error,
      Parameters<typeof postUsers>[0]
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getPostUsersMutationOptions(opts?.client), ...opts?.mutation }
  })
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
      const indexExpected = `export * from './getHono'
export * from './getUsers'
export * from './postUsers'
`
      expect(index).toBe(indexExpected)

      // Check GET hook file without args
      const createGetHono = fs.readFileSync(path.join(dir, 'hooks', 'getHono.ts'), 'utf-8')
      const createGetHonoExpected = `import { createQuery, queryOptions } from '@tanstack/svelte-query'
import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates Svelte Query cache key for GET /hono
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetHonoQueryKey() {
  return ['hono', 'GET', '/hono'] as const
}

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export async function getHono(options?: ClientRequestOptions) {
  return await parseResponse(client.hono.$get(undefined, options))
}

/**
 * Returns Svelte Query query options for GET /hono
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetHonoQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetHonoQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHono({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export function createGetHono(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getHono>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetHonoQueryOptions(opts?.client), ...opts?.query }
  })
}
`
      expect(createGetHono).toBe(createGetHonoExpected)

      // Check GET hook file with args
      const createGetUsers = fs.readFileSync(path.join(dir, 'hooks', 'getUsers.ts'), 'utf-8')
      const createGetUsersExpected = `import { createQuery, queryOptions } from '@tanstack/svelte-query'
import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates Svelte Query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersQueryKey(args: Parameters<typeof getUsers>[0]) {
  return ['users', 'GET', '/users', args] as const
}

/**
 * GET /users
 *
 * List users
 *
 * List users with pagination.
 */
export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$get(args, options))
}

/**
 * Returns Svelte Query query options for GET /users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersQueryOptions(
  args: Parameters<typeof getUsers>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /users
 *
 * List users
 *
 * List users with pagination.
 */
export function createGetUsers(
  args: Parameters<typeof getUsers>[0],
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetUsersQueryOptions(args, opts?.client), ...opts?.query }
  })
}
`
      expect(createGetUsers).toBe(createGetUsersExpected)

      // Check POST hook file (mutation)
      const createPostUsers = fs.readFileSync(path.join(dir, 'hooks', 'postUsers.ts'), 'utf-8')
      const createPostUsersExpected = `import { createMutation } from '@tanstack/svelte-query'
import type { CreateMutationOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates Svelte Query mutation key for POST /users
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostUsersMutationKey() {
  return ['users', 'POST', '/users'] as const
}

/**
 * POST /users
 *
 * Create user
 *
 * Create a new user.
 */
export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$post(args, options))
}

/**
 * Returns Svelte Query mutation options for POST /users
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostUsersMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostUsersMutationKey(),
    async mutationFn(args: Parameters<typeof postUsers>[0]) {
      return postUsers(args, clientOptions)
    },
  }
}

/**
 * POST /users
 *
 * Create user
 *
 * Create a new user.
 */
export function createPostUsers(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postUsers>>,
      Error,
      Parameters<typeof postUsers>[0]
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getPostUsersMutationOptions(opts?.client), ...opts?.mutation }
  })
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
      const expected = `import { createQuery, queryOptions } from '@tanstack/svelte-query'
import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { authClient } from '../api'

/**
 * Generates Svelte Query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetUsersQueryKey() {
  return ['users', 'GET', '/users'] as const
}

/**
 * GET /users
 *
 * Get users
 */
export async function getUsers(options?: ClientRequestOptions) {
  return await parseResponse(authClient.users.$get(undefined, options))
}

/**
 * Returns Svelte Query query options for GET /users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetUsersQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /users
 *
 * Get users
 */
export function createGetUsers(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetUsersQueryOptions(opts?.client), ...opts?.query }
  })
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
      const expected = `import { createQuery, createMutation, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates Svelte Query cache key for GET /ping
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetPingQueryKey() {
  return ['ping', 'GET', '/ping'] as const
}

/**
 * GET /ping
 *
 * Ping
 */
export async function getPing(options?: ClientRequestOptions) {
  return await parseResponse(client.ping.$get(undefined, options))
}

/**
 * Returns Svelte Query query options for GET /ping
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPingQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetPingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getPing({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /ping
 *
 * Ping
 */
export function createGetPing(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPing>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetPingQueryOptions(opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query mutation key for POST /ping
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPingMutationKey() {
  return ['ping', 'POST', '/ping'] as const
}

/**
 * POST /ping
 *
 * Post ping
 */
export async function postPing(options?: ClientRequestOptions) {
  return await parseResponse(client.ping.$post(undefined, options))
}

/**
 * Returns Svelte Query mutation options for POST /ping
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostPingMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostPingMutationKey(),
    async mutationFn() {
      return postPing(clientOptions)
    },
  }
}

/**
 * POST /ping
 *
 * Post ping
 */
export function createPostPing(
  options?: () => {
    mutation?: CreateMutationOptions<Awaited<ReturnType<typeof postPing>>, Error, void>
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getPostPingMutationOptions(opts?.client), ...opts?.mutation }
  })
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
      const expected = `import { createQuery, queryOptions } from '@tanstack/svelte-query'
import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates Svelte Query cache key for GET /hono-x
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetHonoXQueryKey() {
  return ['hono-x', 'GET', '/hono-x'] as const
}

/**
 * GET /hono-x
 *
 * HonoX
 */
export async function getHonoX(options?: ClientRequestOptions) {
  return await parseResponse(client['hono-x'].$get(undefined, options))
}

/**
 * Returns Svelte Query query options for GET /hono-x
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetHonoXQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetHonoXQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHonoX({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /hono-x
 *
 * HonoX
 */
export function createGetHonoX(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getHonoX>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetHonoXQueryOptions(opts?.client), ...opts?.query }
  })
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
      const expected = `import { createQuery, createMutation, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates Svelte Query cache key for GET /users/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersIdQueryKey(args: Parameters<typeof getUsersId>[0]) {
  return ['users', 'GET', '/users/:id', args] as const
}

/**
 * GET /users/{id}
 *
 * Get user
 */
export async function getUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$get(args, options))
}

/**
 * Returns Svelte Query query options for GET /users/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersIdQueryOptions(
  args: Parameters<typeof getUsersId>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /users/{id}
 *
 * Get user
 */
export function createGetUsersId(
  args: Parameters<typeof getUsersId>[0],
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsersId>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetUsersIdQueryOptions(args, opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /users/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteUsersIdMutationKey() {
  return ['users', 'DELETE', '/users/:id'] as const
}

/**
 * DELETE /users/{id}
 *
 * Delete user
 */
export async function deleteUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$delete(args, options))
}

/**
 * Returns Svelte Query mutation options for DELETE /users/{id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getDeleteUsersIdMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getDeleteUsersIdMutationKey(),
    async mutationFn(args: Parameters<typeof deleteUsersId>[0]) {
      return deleteUsersId(args, clientOptions)
    },
  }
}

/**
 * DELETE /users/{id}
 *
 * Delete user
 */
export function createDeleteUsersId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof deleteUsersId>> | undefined,
      Error,
      Parameters<typeof deleteUsersId>[0]
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getDeleteUsersIdMutationOptions(opts?.client), ...opts?.mutation }
  })
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
import type { CreateMutationOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates Svelte Query mutation key for PUT /users/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutUsersIdMutationKey() {
  return ['users', 'PUT', '/users/:id'] as const
}

/**
 * PUT /users/{id}
 *
 * Replace user
 */
export async function putUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$put(args, options))
}

/**
 * Returns Svelte Query mutation options for PUT /users/{id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPutUsersIdMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPutUsersIdMutationKey(),
    async mutationFn(args: Parameters<typeof putUsersId>[0]) {
      return putUsersId(args, clientOptions)
    },
  }
}

/**
 * PUT /users/{id}
 *
 * Replace user
 */
export function createPutUsersId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof putUsersId>>,
      Error,
      Parameters<typeof putUsersId>[0]
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getPutUsersIdMutationOptions(opts?.client), ...opts?.mutation }
  })
}

/**
 * Generates Svelte Query mutation key for PATCH /users/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchUsersIdMutationKey() {
  return ['users', 'PATCH', '/users/:id'] as const
}

/**
 * PATCH /users/{id}
 *
 * Update user
 */
export async function patchUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$patch']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$patch(args, options))
}

/**
 * Returns Svelte Query mutation options for PATCH /users/{id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPatchUsersIdMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPatchUsersIdMutationKey(),
    async mutationFn(args: Parameters<typeof patchUsersId>[0]) {
      return patchUsersId(args, clientOptions)
    },
  }
}

/**
 * PATCH /users/{id}
 *
 * Update user
 */
export function createPatchUsersId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof patchUsersId>>,
      Error,
      Parameters<typeof patchUsersId>[0]
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getPatchUsersIdMutationOptions(opts?.client), ...opts?.mutation }
  })
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})
