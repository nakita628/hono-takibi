import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../openapi/index.js'
import { vueQuery } from './index.js'

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

describe('vueQuery', () => {
  it('should generate the correct vue-query hooks code', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-vue-query-'))
    try {
      const out = path.join(dir, 'index.ts')
      const result = await vueQuery(openapiSimple, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import { useQuery, useInfiniteQuery, useMutation } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/vue-query'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates Vue Query cache key for GET /hono
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
 * Returns Vue Query query options for GET /hono
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetHonoQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetHonoQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHono({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export function useGetHono(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getHono>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options ?? {}
  return useQuery({ ...getGetHonoQueryOptions(client), ...query })
}

/**
 * Generates Vue Query infinite query cache key for GET /hono
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetHonoInfiniteQueryKey() {
  return ['hono', 'GET', '/hono', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /hono
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetHonoInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetHonoInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHono({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export function useInfiniteGetHono(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getHono>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options
  return useInfiniteQuery({ ...getGetHonoInfiniteQueryOptions(client), ...query })
}

/**
 * Generates Vue Query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', 'GET', '/users', toValue(args)] as const
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
 * Returns Vue Query query options for GET /users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /users
 *
 * List users
 *
 * List users with pagination.
 */
export function useGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query, client } = options ?? {}
  return useQuery({ ...getGetUsersQueryOptions(args, client), ...query })
}

/**
 * Generates Vue Query infinite query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetUsersInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', 'GET', '/users', toValue(args), 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /users
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetUsersInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /users
 *
 * List users
 *
 * List users with pagination.
 */
export function useInfiniteGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query, client } = options
  return useInfiniteQuery({ ...getGetUsersInfiniteQueryOptions(args, client), ...query })
}

/**
 * Generates Vue Query mutation key for POST /users
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
 * Returns Vue Query mutation options for POST /users
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostUsersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostUsersMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return postUsers(args, options)
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
export function usePostUsers(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUsers>>,
    Error,
    InferRequestType<typeof client.users.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation, client } = options ?? {}
  return useMutation({ ...getPostUsersMutationOptions(client), ...mutation })
}
`

      expect(code).toBe(expected)
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated vue-query hooks written to ${out}`,
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('vueQuery (split mode)', () => {
  it('should generate correct split files', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-vue-query-split-'))
    try {
      const out = path.join(dir, 'hooks', 'index.ts')
      const result = await vueQuery(openapiSimple, out, '../client', true)

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
      const useGetHono = fs.readFileSync(path.join(dir, 'hooks', 'getHono.ts'), 'utf-8')
      const useGetHonoExpected = `import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates Vue Query cache key for GET /hono
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
 * Returns Vue Query query options for GET /hono
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetHonoQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetHonoQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHono({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export function useGetHono(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getHono>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options ?? {}
  return useQuery({ ...getGetHonoQueryOptions(client), ...query })
}

/**
 * Generates Vue Query infinite query cache key for GET /hono
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetHonoInfiniteQueryKey() {
  return ['hono', 'GET', '/hono', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /hono
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetHonoInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetHonoInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHono({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export function useInfiniteGetHono(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getHono>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options
  return useInfiniteQuery({ ...getGetHonoInfiniteQueryOptions(client), ...query })
}
`
      expect(useGetHono).toBe(useGetHonoExpected)

      // Check GET hook file with args
      const useGetUsers = fs.readFileSync(path.join(dir, 'hooks', 'getUsers.ts'), 'utf-8')
      const useGetUsersExpected = `import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from '@tanstack/vue-query'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates Vue Query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', 'GET', '/users', toValue(args)] as const
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
 * Returns Vue Query query options for GET /users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /users
 *
 * List users
 *
 * List users with pagination.
 */
export function useGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query, client } = options ?? {}
  return useQuery({ ...getGetUsersQueryOptions(args, client), ...query })
}

/**
 * Generates Vue Query infinite query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetUsersInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', 'GET', '/users', toValue(args), 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /users
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetUsersInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /users
 *
 * List users
 *
 * List users with pagination.
 */
export function useInfiniteGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query, client } = options
  return useInfiniteQuery({ ...getGetUsersInfiniteQueryOptions(args, client), ...query })
}
`
      expect(useGetUsers).toBe(useGetUsersExpected)

      // Check POST hook file (mutation)
      const usePostUsers = fs.readFileSync(path.join(dir, 'hooks', 'postUsers.ts'), 'utf-8')
      const usePostUsersExpected = `import { useMutation } from '@tanstack/vue-query'
import type { UseMutationOptions } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates Vue Query mutation key for POST /users
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
 * Returns Vue Query mutation options for POST /users
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostUsersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostUsersMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return postUsers(args, options)
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
export function usePostUsers(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUsers>>,
    Error,
    InferRequestType<typeof client.users.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation, client } = options ?? {}
  return useMutation({ ...getPostUsersMutationOptions(client), ...mutation })
}
`
      expect(usePostUsers).toBe(usePostUsersExpected)

      expect(result).toStrictEqual({
        ok: true,
        value: `Generated vue-query hooks written to ${path.join(dir, 'hooks')}/*.ts (index.ts included)`,
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('vueQuery (custom client name)', () => {
  it('should generate code with custom client name', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-vue-query-client-'))
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

      const result = await vueQuery(simpleOpenAPI, out, '../api', false, 'authClient')

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { authClient } from '../api'

/**
 * Generates Vue Query cache key for GET /users
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
 * Returns Vue Query query options for GET /users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetUsersQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /users
 *
 * Get users
 */
export function useGetUsers(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options ?? {}
  return useQuery({ ...getGetUsersQueryOptions(client), ...query })
}

/**
 * Generates Vue Query infinite query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetUsersInfiniteQueryKey() {
  return ['users', 'GET', '/users', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /users
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetUsersInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetUsersInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /users
 *
 * Get users
 */
export function useInfiniteGetUsers(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options
  return useInfiniteQuery({ ...getGetUsersInfiniteQueryOptions(client), ...query })
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

describe('vueQuery (no args operations)', () => {
  it('should generate hooks without args correctly', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-vue-query-noargs-'))
    try {
      const out = path.join(dir, 'index.ts')
      const result = await vueQuery(openapiNoArgs, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import { useQuery, useInfiniteQuery, useMutation } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates Vue Query cache key for GET /ping
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
 * Returns Vue Query query options for GET /ping
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPingQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetPingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getPing({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /ping
 *
 * Ping
 */
export function useGetPing(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getPing>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options ?? {}
  return useQuery({ ...getGetPingQueryOptions(client), ...query })
}

/**
 * Generates Vue Query infinite query cache key for GET /ping
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetPingInfiniteQueryKey() {
  return ['ping', 'GET', '/ping', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /ping
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetPingInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetPingInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getPing({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /ping
 *
 * Ping
 */
export function useInfiniteGetPing(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPing>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options
  return useInfiniteQuery({ ...getGetPingInfiniteQueryOptions(client), ...query })
}

/**
 * Generates Vue Query mutation key for POST /ping
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
 * Returns Vue Query mutation options for POST /ping
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostPingMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostPingMutationKey(),
    async mutationFn() {
      return postPing(options)
    },
  }
}

/**
 * POST /ping
 *
 * Post ping
 */
export function usePostPing(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof postPing>>, Error, void>
  client?: ClientRequestOptions
}) {
  const { mutation, client } = options ?? {}
  return useMutation({ ...getPostPingMutationOptions(client), ...mutation })
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('vueQuery (path with special characters)', () => {
  it('should generate hooks for hyphenated paths', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-vue-query-hyphen-'))
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

      const result = await vueQuery(hyphenOpenAPI, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates Vue Query cache key for GET /hono-x
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
 * Returns Vue Query query options for GET /hono-x
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetHonoXQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetHonoXQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHonoX({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /hono-x
 *
 * HonoX
 */
export function useGetHonoX(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getHonoX>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options ?? {}
  return useQuery({ ...getGetHonoXQueryOptions(client), ...query })
}

/**
 * Generates Vue Query infinite query cache key for GET /hono-x
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetHonoXInfiniteQueryKey() {
  return ['hono-x', 'GET', '/hono-x', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /hono-x
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetHonoXInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetHonoXInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHonoX({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /hono-x
 *
 * HonoX
 */
export function useInfiniteGetHonoX(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getHonoX>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options
  return useInfiniteQuery({ ...getGetHonoXInfiniteQueryOptions(client), ...query })
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('vueQuery (path parameters)', () => {
  it('should generate hooks for path with parameters', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-vue-query-params-'))
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

      const result = await vueQuery(paramOpenAPI, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import { useQuery, useInfiniteQuery, useMutation } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/vue-query'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates Vue Query cache key for GET /users/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
) {
  return ['users', 'GET', '/users/:id', toValue(args)] as const
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
 * Returns Vue Query query options for GET /users/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /users/{id}
 *
 * Get user
 */
export function useGetUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query, client } = options ?? {}
  return useQuery({ ...getGetUsersIdQueryOptions(args, client), ...query })
}

/**
 * Generates Vue Query infinite query cache key for GET /users/{id}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetUsersIdInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
) {
  return ['users', 'GET', '/users/:id', toValue(args), 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /users/{id}
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetUsersIdInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /users/{id}
 *
 * Get user
 */
export function useInfiniteGetUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersId>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query, client } = options
  return useInfiniteQuery({ ...getGetUsersIdInfiniteQueryOptions(args, client), ...query })
}

/**
 * Generates Vue Query mutation key for DELETE /users/{id}
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
 * Returns Vue Query mutation options for DELETE /users/{id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getDeleteUsersIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getDeleteUsersIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$delete']>) {
      return deleteUsersId(args, options)
    },
  }
}

/**
 * DELETE /users/{id}
 *
 * Delete user
 */
export function useDeleteUsersId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteUsersId>> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation, client } = options ?? {}
  return useMutation({ ...getDeleteUsersIdMutationOptions(client), ...mutation })
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('vueQuery (invalid paths)', () => {
  it('should return error for invalid OpenAPI paths', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-vue-query-invalid-'))
    try {
      const out = path.join(dir, 'index.ts')
      const invalidOpenAPI: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        // paths is undefined
      }

      const result = await vueQuery(invalidOpenAPI, out, '../client', false)

      expect(result).toStrictEqual({
        ok: false,
        error: 'Invalid OpenAPI paths',
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('vueQuery (PUT/PATCH methods)', () => {
  it('should generate hooks for PUT and PATCH methods', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-vue-query-put-patch-'))
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

      const result = await vueQuery(putPatchOpenAPI, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import { useMutation } from '@tanstack/vue-query'
import type { UseMutationOptions } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates Vue Query mutation key for PUT /users/{id}
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
 * Returns Vue Query mutation options for PUT /users/{id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPutUsersIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPutUsersIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$put']>) {
      return putUsersId(args, options)
    },
  }
}

/**
 * PUT /users/{id}
 *
 * Replace user
 */
export function usePutUsersId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putUsersId>>,
    Error,
    InferRequestType<(typeof client.users)[':id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation, client } = options ?? {}
  return useMutation({ ...getPutUsersIdMutationOptions(client), ...mutation })
}

/**
 * Generates Vue Query mutation key for PATCH /users/{id}
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
 * Returns Vue Query mutation options for PATCH /users/{id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPatchUsersIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPatchUsersIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$patch']>) {
      return patchUsersId(args, options)
    },
  }
}

/**
 * PATCH /users/{id}
 *
 * Update user
 */
export function usePatchUsersId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchUsersId>>,
    Error,
    InferRequestType<(typeof client.users)[':id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation, client } = options ?? {}
  return useMutation({ ...getPatchUsersIdMutationOptions(client), ...mutation })
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})
