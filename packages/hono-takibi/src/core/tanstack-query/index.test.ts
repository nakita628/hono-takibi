import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../openapi/index.js'
import { tanstackQuery } from './index.js'

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

describe('tanstackQuery', () => {
  it('should generate the correct tanstack-query hooks code', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tanstack-query-'))
    try {
      const out = path.join(dir, 'index.ts')
      const result = await tanstackQuery(openapiSimple, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  useMutation,
  queryOptions,
  mutationOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates TanStack Query cache key for GET /hono
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
 * Returns TanStack Query query options for GET /hono
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetHonoQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetHonoQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHono({ ...options, init: { ...options?.init, signal } })
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
export function useGetHono(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getHono>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options ?? {}
  return useQuery({ ...getGetHonoQueryOptions(client), ...query })
}

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export function useSuspenseGetHono(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getHono>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options ?? {}
  return useSuspenseQuery({ ...getGetHonoQueryOptions(client), ...query })
}

/**
 * Generates TanStack Query infinite query cache key for GET /hono
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetHonoInfiniteQueryKey() {
  return ['hono', 'GET', '/hono', 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /hono
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
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export function useSuspenseInfiniteGetHono(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getHono>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options
  return useSuspenseInfiniteQuery({ ...getGetHonoInfiniteQueryOptions(client), ...query })
}

/**
 * Generates TanStack Query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
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
 * Returns TanStack Query query options for GET /users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersQueryOptions(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...options, init: { ...options?.init, signal } })
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
 * GET /users
 *
 * List users
 *
 * List users with pagination.
 */
export function useSuspenseGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query, client } = options ?? {}
  return useSuspenseQuery({ ...getGetUsersQueryOptions(args, client), ...query })
}

/**
 * Generates TanStack Query infinite query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetUsersInfiniteQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', 'GET', '/users', args, 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /users
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetUsersInfiniteQueryOptions(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...options, init: { ...options?.init, signal } })
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
 * GET /users
 *
 * List users
 *
 * List users with pagination.
 */
export function useSuspenseInfiniteGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options: {
    query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query, client } = options
  return useSuspenseInfiniteQuery({ ...getGetUsersInfiniteQueryOptions(args, client), ...query })
}

/**
 * Generates TanStack Query mutation key for POST /users
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
 * Returns TanStack Query mutation options for POST /users
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostUsersMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostUsersMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return postUsers(args, options)
    },
  })
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
        value: `Generated tanstack-query hooks written to ${out}`,
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('tanstackQuery (split mode)', () => {
  it('should generate correct split files', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tanstack-query-split-'))
    try {
      const out = path.join(dir, 'hooks', 'index.ts')
      const result = await tanstackQuery(openapiSimple, out, '../client', true)

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
      const useGetHonoExpected = `import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  queryOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates TanStack Query cache key for GET /hono
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
 * Returns TanStack Query query options for GET /hono
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetHonoQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetHonoQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHono({ ...options, init: { ...options?.init, signal } })
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
export function useGetHono(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getHono>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options ?? {}
  return useQuery({ ...getGetHonoQueryOptions(client), ...query })
}

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export function useSuspenseGetHono(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getHono>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options ?? {}
  return useSuspenseQuery({ ...getGetHonoQueryOptions(client), ...query })
}

/**
 * Generates TanStack Query infinite query cache key for GET /hono
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetHonoInfiniteQueryKey() {
  return ['hono', 'GET', '/hono', 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /hono
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
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export function useSuspenseInfiniteGetHono(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getHono>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options
  return useSuspenseInfiniteQuery({ ...getGetHonoInfiniteQueryOptions(client), ...query })
}
`
      expect(useGetHono).toBe(useGetHonoExpected)

      // Check GET hook file with args
      const useGetUsers = fs.readFileSync(path.join(dir, 'hooks', 'getUsers.ts'), 'utf-8')
      const useGetUsersExpected = `import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  queryOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates TanStack Query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
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
 * Returns TanStack Query query options for GET /users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersQueryOptions(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...options, init: { ...options?.init, signal } })
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
 * GET /users
 *
 * List users
 *
 * List users with pagination.
 */
export function useSuspenseGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query, client } = options ?? {}
  return useSuspenseQuery({ ...getGetUsersQueryOptions(args, client), ...query })
}

/**
 * Generates TanStack Query infinite query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetUsersInfiniteQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', 'GET', '/users', args, 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /users
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetUsersInfiniteQueryOptions(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...options, init: { ...options?.init, signal } })
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
 * GET /users
 *
 * List users
 *
 * List users with pagination.
 */
export function useSuspenseInfiniteGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options: {
    query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query, client } = options
  return useSuspenseInfiniteQuery({ ...getGetUsersInfiniteQueryOptions(args, client), ...query })
}
`
      expect(useGetUsers).toBe(useGetUsersExpected)

      // Check POST hook file (mutation)
      const usePostUsers = fs.readFileSync(path.join(dir, 'hooks', 'postUsers.ts'), 'utf-8')
      const usePostUsersExpected = `import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates TanStack Query mutation key for POST /users
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
 * Returns TanStack Query mutation options for POST /users
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostUsersMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostUsersMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return postUsers(args, options)
    },
  })
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
        value: `Generated tanstack-query hooks written to ${path.join(dir, 'hooks')}/*.ts (index.ts included)`,
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('tanstackQuery (custom client name)', () => {
  it('should generate code with custom client name', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tanstack-query-client-'))
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

      const result = await tanstackQuery(simpleOpenAPI, out, '../api', false, 'authClient')

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  queryOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { authClient } from '../api'

/**
 * Generates TanStack Query cache key for GET /users
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
 * Returns TanStack Query query options for GET /users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetUsersQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers({ ...options, init: { ...options?.init, signal } })
    },
  })
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
 * GET /users
 *
 * Get users
 */
export function useSuspenseGetUsers(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options ?? {}
  return useSuspenseQuery({ ...getGetUsersQueryOptions(client), ...query })
}

/**
 * Generates TanStack Query infinite query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetUsersInfiniteQueryKey() {
  return ['users', 'GET', '/users', 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /users
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

/**
 * GET /users
 *
 * Get users
 */
export function useSuspenseInfiniteGetUsers(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options
  return useSuspenseInfiniteQuery({ ...getGetUsersInfiniteQueryOptions(client), ...query })
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

describe('tanstackQuery (no args operations)', () => {
  it('should generate hooks without args correctly', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tanstack-query-noargs-'))
    try {
      const out = path.join(dir, 'index.ts')
      const result = await tanstackQuery(openapiNoArgs, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  useMutation,
  queryOptions,
  mutationOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates TanStack Query cache key for GET /ping
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
 * Returns TanStack Query query options for GET /ping
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPingQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetPingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getPing({ ...options, init: { ...options?.init, signal } })
    },
  })
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
 * GET /ping
 *
 * Ping
 */
export function useSuspenseGetPing(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getPing>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options ?? {}
  return useSuspenseQuery({ ...getGetPingQueryOptions(client), ...query })
}

/**
 * Generates TanStack Query infinite query cache key for GET /ping
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetPingInfiniteQueryKey() {
  return ['ping', 'GET', '/ping', 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /ping
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
 * GET /ping
 *
 * Ping
 */
export function useSuspenseInfiniteGetPing(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getPing>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options
  return useSuspenseInfiniteQuery({ ...getGetPingInfiniteQueryOptions(client), ...query })
}

/**
 * Generates TanStack Query mutation key for POST /ping
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
 * Returns TanStack Query mutation options for POST /ping
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostPingMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostPingMutationKey(),
    async mutationFn() {
      return postPing(options)
    },
  })
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

describe('tanstackQuery (path with special characters)', () => {
  it('should generate hooks for hyphenated paths', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tanstack-query-hyphen-'))
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

      const result = await tanstackQuery(hyphenOpenAPI, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  queryOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates TanStack Query cache key for GET /hono-x
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
 * Returns TanStack Query query options for GET /hono-x
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetHonoXQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetHonoXQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHonoX({ ...options, init: { ...options?.init, signal } })
    },
  })
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
 * GET /hono-x
 *
 * HonoX
 */
export function useSuspenseGetHonoX(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getHonoX>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options ?? {}
  return useSuspenseQuery({ ...getGetHonoXQueryOptions(client), ...query })
}

/**
 * Generates TanStack Query infinite query cache key for GET /hono-x
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetHonoXInfiniteQueryKey() {
  return ['hono-x', 'GET', '/hono-x', 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /hono-x
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

/**
 * GET /hono-x
 *
 * HonoX
 */
export function useSuspenseInfiniteGetHonoX(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getHonoX>>, Error>
  client?: ClientRequestOptions
}) {
  const { query, client } = options
  return useSuspenseInfiniteQuery({ ...getGetHonoXInfiniteQueryOptions(client), ...query })
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('tanstackQuery (path parameters)', () => {
  it('should generate hooks for path with parameters', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tanstack-query-params-'))
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

      const result = await tanstackQuery(paramOpenAPI, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  useMutation,
  queryOptions,
  mutationOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Generates TanStack Query cache key for GET /users/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersIdQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
) {
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
 * Returns TanStack Query query options for GET /users/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersIdQueryOptions(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
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
 * GET /users/{id}
 *
 * Get user
 */
export function useSuspenseGetUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query, client } = options ?? {}
  return useSuspenseQuery({ ...getGetUsersIdQueryOptions(args, client), ...query })
}

/**
 * Generates TanStack Query infinite query cache key for GET /users/{id}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetUsersIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
) {
  return ['users', 'GET', '/users/:id', args, 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /users/{id}
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetUsersIdInfiniteQueryOptions(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(args, { ...options, init: { ...options?.init, signal } })
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
 * GET /users/{id}
 *
 * Get user
 */
export function useSuspenseInfiniteGetUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options: {
    query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersId>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query, client } = options
  return useSuspenseInfiniteQuery({ ...getGetUsersIdInfiniteQueryOptions(args, client), ...query })
}

/**
 * Generates TanStack Query mutation key for DELETE /users/{id}
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
 * Returns TanStack Query mutation options for DELETE /users/{id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getDeleteUsersIdMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getDeleteUsersIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$delete']>) {
      return deleteUsersId(args, options)
    },
  })
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

describe('tanstackQuery (invalid paths)', () => {
  it('should return error for invalid OpenAPI paths', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tanstack-query-invalid-'))
    try {
      const out = path.join(dir, 'index.ts')
      const invalidOpenAPI: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        // paths is undefined
      }

      const result = await tanstackQuery(invalidOpenAPI, out, '../client', false)

      expect(result).toStrictEqual({
        ok: false,
        error: 'Invalid OpenAPI paths',
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})
