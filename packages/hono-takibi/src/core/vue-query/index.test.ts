import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { describe, expect, it } from 'vite-plus/test'

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
      const expected = `import { useQuery, useInfiniteQuery, useMutation, queryOptions } from '@tanstack/vue-query'
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
 * Key prefix for /hono
 */
export function getHonoKey() {
  return ['hono'] as const
}

/**
 * Key prefix for /users
 */
export function getUsersKey() {
  return ['users'] as const
}

/**
 * GET /hono query key
 */
export function getHonoQueryKey() {
  return ['hono', '/hono'] as const
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
 * GET /hono query options
 */
export function getHonoQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getHonoQueryKey(),
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
export function useHono(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getHono>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getHonoQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /hono infinite query key
 */
export function getHonoInfiniteQueryKey() {
  return ['hono', '/hono', 'infinite'] as const
}

/**
 * GET /hono infinite query options
 */
export function getHonoInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getHonoInfiniteQueryKey(),
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
export function useInfiniteHono(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getHono>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getHonoInfiniteQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /users query key
 */
export function getUsersQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', '/users', args] as const
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
 * GET /users query options
 */
export function getUsersQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(toValue(args), { ...options, init: { ...options?.init, signal } })
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
export function useUsers(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getUsersQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * GET /users infinite query key
 */
export function getUsersInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', '/users', args, 'infinite'] as const
}

/**
 * GET /users infinite query options
 */
export function getUsersInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersInfiniteQueryKey(args),
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
export function useInfiniteUsers(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getUsersInfiniteQueryOptions(args, clientOptions), ...queryOptions })
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
 * POST /users
 */
export function getPostUsersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users'] as const,
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
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostUsersMutationOptions(clientOptions), ...mutationOptions })
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
      const indexExpected = `export * from './_keys'
export * from './getHono'
export * from './getUsers'
export * from './postUsers'
`
      expect(index).toBe(indexExpected)

      // Check _keys.ts prefix key file
      const keys = fs.readFileSync(path.join(dir, 'hooks', '_keys.ts'), 'utf-8')
      const keysExpected = `/**
 * Key prefix for /hono
 */
export function getHonoKey() {
  return ['hono'] as const
}

/**
 * Key prefix for /users
 */
export function getUsersKey() {
  return ['users'] as const
}
`
      expect(keys).toBe(keysExpected)

      // Check GET hook file without args
      const useGetHono = fs.readFileSync(path.join(dir, 'hooks', 'getHono.ts'), 'utf-8')
      const useGetHonoExpected = `import { useQuery, useInfiniteQuery, queryOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * GET /hono query key
 */
export function getHonoQueryKey() {
  return ['hono', '/hono'] as const
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
 * GET /hono query options
 */
export function getHonoQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getHonoQueryKey(),
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
export function useHono(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getHono>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getHonoQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /hono infinite query key
 */
export function getHonoInfiniteQueryKey() {
  return ['hono', '/hono', 'infinite'] as const
}

/**
 * GET /hono infinite query options
 */
export function getHonoInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getHonoInfiniteQueryKey(),
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
export function useInfiniteHono(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getHono>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getHonoInfiniteQueryOptions(clientOptions), ...queryOptions })
}
`
      expect(useGetHono).toBe(useGetHonoExpected)

      // Check GET hook file with args
      const useGetUsers = fs.readFileSync(path.join(dir, 'hooks', 'getUsers.ts'), 'utf-8')
      const useGetUsersExpected = `import { useQuery, useInfiniteQuery, queryOptions } from '@tanstack/vue-query'
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
 * GET /users query key
 */
export function getUsersQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', '/users', args] as const
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
 * GET /users query options
 */
export function getUsersQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(toValue(args), { ...options, init: { ...options?.init, signal } })
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
export function useUsers(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getUsersQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * GET /users infinite query key
 */
export function getUsersInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', '/users', args, 'infinite'] as const
}

/**
 * GET /users infinite query options
 */
export function getUsersInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersInfiniteQueryKey(args),
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
export function useInfiniteUsers(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getUsersInfiniteQueryOptions(args, clientOptions), ...queryOptions })
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
 * POST /users
 */
export function getPostUsersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users'] as const,
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
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostUsersMutationOptions(clientOptions), ...mutationOptions })
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
      const expected = `import { useQuery, useInfiniteQuery, queryOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { authClient } from '../api'

/**
 * Key prefix for /users
 */
export function getUsersKey() {
  return ['users'] as const
}

/**
 * GET /users query key
 */
export function getUsersQueryKey() {
  return ['users', '/users'] as const
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
 * GET /users query options
 */
export function getUsersQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getUsersQueryKey(),
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
export function useUsers(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getUsersQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /users infinite query key
 */
export function getUsersInfiniteQueryKey() {
  return ['users', '/users', 'infinite'] as const
}

/**
 * GET /users infinite query options
 */
export function getUsersInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getUsersInfiniteQueryKey(),
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
export function useInfiniteUsers(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getUsersInfiniteQueryOptions(clientOptions), ...queryOptions })
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
      const expected = `import { useQuery, useInfiniteQuery, useMutation, queryOptions } from '@tanstack/vue-query'
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
 * Key prefix for /ping
 */
export function getPingKey() {
  return ['ping'] as const
}

/**
 * GET /ping query key
 */
export function getPingQueryKey() {
  return ['ping', '/ping'] as const
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
 * GET /ping query options
 */
export function getPingQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getPingQueryKey(),
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
export function usePing(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getPing>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getPingQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /ping infinite query key
 */
export function getPingInfiniteQueryKey() {
  return ['ping', '/ping', 'infinite'] as const
}

/**
 * GET /ping infinite query options
 */
export function getPingInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getPingInfiniteQueryKey(),
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
export function useInfinitePing(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPing>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getPingInfiniteQueryOptions(clientOptions), ...queryOptions })
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
 * POST /ping
 */
export function getPostPingMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['ping', '/ping'] as const,
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
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostPingMutationOptions(clientOptions), ...mutationOptions })
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
      const expected = `import { useQuery, useInfiniteQuery, queryOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * Key prefix for /hono-x
 */
export function getHonoXKey() {
  return ['hono-x'] as const
}

/**
 * GET /hono-x query key
 */
export function getHonoXQueryKey() {
  return ['hono-x', '/hono-x'] as const
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
 * GET /hono-x query options
 */
export function getHonoXQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getHonoXQueryKey(),
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
export function useHonoX(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getHonoX>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getHonoXQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /hono-x infinite query key
 */
export function getHonoXInfiniteQueryKey() {
  return ['hono-x', '/hono-x', 'infinite'] as const
}

/**
 * GET /hono-x infinite query options
 */
export function getHonoXInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getHonoXInfiniteQueryKey(),
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
export function useInfiniteHonoX(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getHonoX>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getHonoXInfiniteQueryOptions(clientOptions), ...queryOptions })
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
      const expected = `import { useQuery, useInfiniteQuery, useMutation, queryOptions } from '@tanstack/vue-query'
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
 * Key prefix for /users
 */
export function getUsersKey() {
  return ['users'] as const
}

/**
 * GET /users/{id} query key
 */
export function getUsersIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
) {
  return ['users', '/users/:id', args] as const
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
 * GET /users/{id} query options
 */
export function getUsersIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /users/{id}
 *
 * Get user
 */
export function useUsersId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getUsersIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * GET /users/{id} infinite query key
 */
export function getUsersIdInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
) {
  return ['users', '/users/:id', args, 'infinite'] as const
}

/**
 * GET /users/{id} infinite query options
 */
export function getUsersIdInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersIdInfiniteQueryKey(args),
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
export function useInfiniteUsersId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getUsersIdInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
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
 * DELETE /users/{id}
 */
export function getDeleteUsersIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:id'] as const,
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
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getDeleteUsersIdMutationOptions(clientOptions), ...mutationOptions })
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
      const invalidOpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        // paths is undefined
      } as unknown as OpenAPI

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
 * Key prefix for /users
 */
export function getUsersKey() {
  return ['users'] as const
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
 * PUT /users/{id}
 */
export function getPutUsersIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:id'] as const,
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
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPutUsersIdMutationOptions(clientOptions), ...mutationOptions })
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
 * PATCH /users/{id}
 */
export function getPatchUsersIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:id'] as const,
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
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPatchUsersIdMutationOptions(clientOptions), ...mutationOptions })
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})
