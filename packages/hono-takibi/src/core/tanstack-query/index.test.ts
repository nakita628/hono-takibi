import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../../openapi/index.js'
import { tanstackQuery } from './index.js'

/** Simple OpenAPI spec for basic tests */
const openapiSimple: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'Test', version: '1.0.0' },
  paths: {
    '/hono': {
      get: {
        'x-pagination': true,
        summary: 'Hono',
        description: 'Simple ping for Hono',
        responses: { '200': { description: 'OK' } },
      },
    },
    '/users': {
      get: {
        'x-pagination': true,
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
  infiniteQueryOptions,
  mutationOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  InfiniteData,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getHonoKey() {
  return ['hono'] as const
}

export function getUsersKey() {
  return ['users'] as const
}

export function getHonoQueryKey() {
  return ['hono', '/hono'] as const
}

export async function getHono(options?: ClientRequestOptions) {
  return await parseResponse(client.hono.$get(undefined, options))
}

export function getHonoQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getHonoQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHono({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useHono<TData = Awaited<ReturnType<typeof getHono>>, TError = unknown>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getHono>>, TError, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getHonoQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHono({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseHono<
  TData = Awaited<ReturnType<typeof getHono>>,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getHono>>, TError, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getHonoQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHono({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getHonoInfiniteQueryKey() {
  return ['hono', '/hono', 'infinite'] as const
}

export function getHonoInfiniteQueryOptions<TPageParam = unknown>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getHono>>,
      allPages: Awaited<ReturnType<typeof getHono>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getHonoInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHono({ ...options, init: { ...options?.init, signal } })
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfiniteHono<
  TData = InfiniteData<Awaited<ReturnType<typeof getHono>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getHono>>,
      allPages: Awaited<ReturnType<typeof getHono>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getHono>>,
      TError,
      TData,
      ReturnType<typeof getHonoInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery({
    ...queryOptions,
    ...getHonoInfiniteQueryOptions(pagination, clientOptions),
  })
}

export function useSuspenseInfiniteHono<
  TData = InfiniteData<Awaited<ReturnType<typeof getHono>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getHono>>,
      allPages: Awaited<ReturnType<typeof getHono>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getHono>>,
      TError,
      TData,
      ReturnType<typeof getHonoInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getHonoInfiniteQueryOptions(pagination, clientOptions),
  })
}

export function getUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args] as const
}

export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$get(args, options))
}

export function getUsersQueryOptions(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = unknown>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = unknown>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getUsersInfiniteQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args, 'infinite'] as const
}

export function getUsersInfiniteQueryOptions<TPageParam = unknown>(
  args: InferRequestType<typeof client.users.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getUsers>>,
      allPages: Awaited<ReturnType<typeof getUsers>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...options, init: { ...options?.init, signal } })
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfiniteUsers<
  TData = InfiniteData<Awaited<ReturnType<typeof getUsers>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<typeof client.users.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getUsers>>,
      allPages: Awaited<ReturnType<typeof getUsers>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsers>>,
      TError,
      TData,
      ReturnType<typeof getUsersInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery({
    ...queryOptions,
    ...getUsersInfiniteQueryOptions(args, pagination, clientOptions),
  })
}

export function useSuspenseInfiniteUsers<
  TData = InfiniteData<Awaited<ReturnType<typeof getUsers>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<typeof client.users.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getUsers>>,
      allPages: Awaited<ReturnType<typeof getUsers>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsers>>,
      TError,
      TData,
      ReturnType<typeof getUsersInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getUsersInfiniteQueryOptions(args, pagination, clientOptions),
  })
}

export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$post(args, options))
}

export function getPostUsersMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<ReturnType<typeof postUsers>>,
    TError,
    InferRequestType<typeof client.users.$post>
  >({
    mutationKey: ['users', '/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return postUsers(args, options)
    },
  })
}

export function usePostUsers<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUsers>>,
    TError,
    InferRequestType<typeof client.users.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostUsersMutationOptions<TError>(clientOptions) })
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
      const indexExpected = `export * from './_keys'
export * from './getHono'
export * from './getUsers'
export * from './postUsers'
`
      expect(index).toBe(indexExpected)

      // Check _keys.ts prefix key file
      const keys = fs.readFileSync(path.join(dir, 'hooks', '_keys.ts'), 'utf-8')
      const keysExpected = `export function getHonoKey() {
  return ['hono'] as const
}

export function getUsersKey() {
  return ['users'] as const
}
`
      expect(keys).toBe(keysExpected)

      // Check GET hook file without args
      const useHono = fs.readFileSync(path.join(dir, 'hooks', 'getHono.ts'), 'utf-8')
      const useHonoExpected = `import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  queryOptions,
  infiniteQueryOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  InfiniteData,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getHonoQueryKey() {
  return ['hono', '/hono'] as const
}

export async function getHono(options?: ClientRequestOptions) {
  return await parseResponse(client.hono.$get(undefined, options))
}

export function getHonoQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getHonoQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHono({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useHono<TData = Awaited<ReturnType<typeof getHono>>, TError = unknown>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getHono>>, TError, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getHonoQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHono({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseHono<
  TData = Awaited<ReturnType<typeof getHono>>,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getHono>>, TError, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getHonoQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHono({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getHonoInfiniteQueryKey() {
  return ['hono', '/hono', 'infinite'] as const
}

export function getHonoInfiniteQueryOptions<TPageParam = unknown>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getHono>>,
      allPages: Awaited<ReturnType<typeof getHono>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getHonoInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHono({ ...options, init: { ...options?.init, signal } })
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfiniteHono<
  TData = InfiniteData<Awaited<ReturnType<typeof getHono>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getHono>>,
      allPages: Awaited<ReturnType<typeof getHono>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getHono>>,
      TError,
      TData,
      ReturnType<typeof getHonoInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery({
    ...queryOptions,
    ...getHonoInfiniteQueryOptions(pagination, clientOptions),
  })
}

export function useSuspenseInfiniteHono<
  TData = InfiniteData<Awaited<ReturnType<typeof getHono>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getHono>>,
      allPages: Awaited<ReturnType<typeof getHono>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getHono>>,
      TError,
      TData,
      ReturnType<typeof getHonoInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getHonoInfiniteQueryOptions(pagination, clientOptions),
  })
}
`
      expect(useHono).toBe(useHonoExpected)

      // Check GET hook file with args
      const useUsers = fs.readFileSync(path.join(dir, 'hooks', 'getUsers.ts'), 'utf-8')
      const useUsersExpected = `import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  queryOptions,
  infiniteQueryOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  InfiniteData,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args] as const
}

export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$get(args, options))
}

export function getUsersQueryOptions(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = unknown>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = unknown>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getUsersInfiniteQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args, 'infinite'] as const
}

export function getUsersInfiniteQueryOptions<TPageParam = unknown>(
  args: InferRequestType<typeof client.users.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getUsers>>,
      allPages: Awaited<ReturnType<typeof getUsers>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...options, init: { ...options?.init, signal } })
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfiniteUsers<
  TData = InfiniteData<Awaited<ReturnType<typeof getUsers>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<typeof client.users.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getUsers>>,
      allPages: Awaited<ReturnType<typeof getUsers>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsers>>,
      TError,
      TData,
      ReturnType<typeof getUsersInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery({
    ...queryOptions,
    ...getUsersInfiniteQueryOptions(args, pagination, clientOptions),
  })
}

export function useSuspenseInfiniteUsers<
  TData = InfiniteData<Awaited<ReturnType<typeof getUsers>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<typeof client.users.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getUsers>>,
      allPages: Awaited<ReturnType<typeof getUsers>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsers>>,
      TError,
      TData,
      ReturnType<typeof getUsersInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getUsersInfiniteQueryOptions(args, pagination, clientOptions),
  })
}
`
      expect(useUsers).toBe(useUsersExpected)

      // Check POST hook file (mutation)
      const usePostUsers = fs.readFileSync(path.join(dir, 'hooks', 'postUsers.ts'), 'utf-8')
      const usePostUsersExpected = `import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$post(args, options))
}

export function getPostUsersMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<ReturnType<typeof postUsers>>,
    TError,
    InferRequestType<typeof client.users.$post>
  >({
    mutationKey: ['users', '/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return postUsers(args, options)
    },
  })
}

export function usePostUsers<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUsers>>,
    TError,
    InferRequestType<typeof client.users.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostUsersMutationOptions<TError>(clientOptions) })
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
              'x-pagination': true,
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
  infiniteQueryOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  InfiniteData,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { authClient } from '../api'

export function getUsersKey() {
  return ['users'] as const
}

export function getUsersQueryKey() {
  return ['users', '/users'] as const
}

export async function getUsers(options?: ClientRequestOptions) {
  return await parseResponse(authClient.users.$get(undefined, options))
}

export function getUsersQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getUsersQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = unknown>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseUsers<
  TData = Awaited<ReturnType<typeof getUsers>>,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getUsersQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getUsersInfiniteQueryKey() {
  return ['users', '/users', 'infinite'] as const
}

export function getUsersInfiniteQueryOptions<TPageParam = unknown>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getUsers>>,
      allPages: Awaited<ReturnType<typeof getUsers>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getUsersInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers({ ...options, init: { ...options?.init, signal } })
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfiniteUsers<
  TData = InfiniteData<Awaited<ReturnType<typeof getUsers>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getUsers>>,
      allPages: Awaited<ReturnType<typeof getUsers>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsers>>,
      TError,
      TData,
      ReturnType<typeof getUsersInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery({
    ...queryOptions,
    ...getUsersInfiniteQueryOptions(pagination, clientOptions),
  })
}

export function useSuspenseInfiniteUsers<
  TData = InfiniteData<Awaited<ReturnType<typeof getUsers>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getUsers>>,
      allPages: Awaited<ReturnType<typeof getUsers>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsers>>,
      TError,
      TData,
      ReturnType<typeof getUsersInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getUsersInfiniteQueryOptions(pagination, clientOptions),
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
        'x-pagination': true,
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
  infiniteQueryOptions,
  mutationOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  InfiniteData,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getPingKey() {
  return ['ping'] as const
}

export function getPingQueryKey() {
  return ['ping', '/ping'] as const
}

export async function getPing(options?: ClientRequestOptions) {
  return await parseResponse(client.ping.$get(undefined, options))
}

export function getPingQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getPingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getPing({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function usePing<TData = Awaited<ReturnType<typeof getPing>>, TError = unknown>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getPing>>, TError, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getPing({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspensePing<
  TData = Awaited<ReturnType<typeof getPing>>,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getPing>>, TError, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getPingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getPing({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getPingInfiniteQueryKey() {
  return ['ping', '/ping', 'infinite'] as const
}

export function getPingInfiniteQueryOptions<TPageParam = unknown>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getPing>>,
      allPages: Awaited<ReturnType<typeof getPing>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getPingInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getPing({ ...options, init: { ...options?.init, signal } })
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfinitePing<
  TData = InfiniteData<Awaited<ReturnType<typeof getPing>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getPing>>,
      allPages: Awaited<ReturnType<typeof getPing>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getPing>>,
      TError,
      TData,
      ReturnType<typeof getPingInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery({
    ...queryOptions,
    ...getPingInfiniteQueryOptions(pagination, clientOptions),
  })
}

export function useSuspenseInfinitePing<
  TData = InfiniteData<Awaited<ReturnType<typeof getPing>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getPing>>,
      allPages: Awaited<ReturnType<typeof getPing>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getPing>>,
      TError,
      TData,
      ReturnType<typeof getPingInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getPingInfiniteQueryOptions(pagination, clientOptions),
  })
}

export async function postPing(options?: ClientRequestOptions) {
  return await parseResponse(client.ping.$post(undefined, options))
}

export function getPostPingMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<Awaited<ReturnType<typeof postPing>>, TError, void>({
    mutationKey: ['ping', '/ping', 'POST'] as const,
    async mutationFn() {
      return postPing(options)
    },
  })
}

export function usePostPing<TError = unknown>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof postPing>>, TError, void>
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostPingMutationOptions<TError>(clientOptions) })
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
              'x-pagination': true,
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
  infiniteQueryOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  InfiniteData,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getHonoXKey() {
  return ['hono-x'] as const
}

export function getHonoXQueryKey() {
  return ['hono-x', '/hono-x'] as const
}

export async function getHonoX(options?: ClientRequestOptions) {
  return await parseResponse(client['hono-x'].$get(undefined, options))
}

export function getHonoXQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getHonoXQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHonoX({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useHonoX<TData = Awaited<ReturnType<typeof getHonoX>>, TError = unknown>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getHonoX>>, TError, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getHonoXQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHonoX({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseHonoX<
  TData = Awaited<ReturnType<typeof getHonoX>>,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getHonoX>>, TError, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getHonoXQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHonoX({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getHonoXInfiniteQueryKey() {
  return ['hono-x', '/hono-x', 'infinite'] as const
}

export function getHonoXInfiniteQueryOptions<TPageParam = unknown>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getHonoX>>,
      allPages: Awaited<ReturnType<typeof getHonoX>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getHonoXInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHonoX({ ...options, init: { ...options?.init, signal } })
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfiniteHonoX<
  TData = InfiniteData<Awaited<ReturnType<typeof getHonoX>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getHonoX>>,
      allPages: Awaited<ReturnType<typeof getHonoX>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getHonoX>>,
      TError,
      TData,
      ReturnType<typeof getHonoXInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery({
    ...queryOptions,
    ...getHonoXInfiniteQueryOptions(pagination, clientOptions),
  })
}

export function useSuspenseInfiniteHonoX<
  TData = InfiniteData<Awaited<ReturnType<typeof getHonoX>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getHonoX>>,
      allPages: Awaited<ReturnType<typeof getHonoX>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getHonoX>>,
      TError,
      TData,
      ReturnType<typeof getHonoXInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getHonoXInfiniteQueryOptions(pagination, clientOptions),
  })
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
              'x-pagination': true,
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
  infiniteQueryOptions,
  mutationOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  InfiniteData,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getUsersKey() {
  return ['users'] as const
}

export function getUsersIdQueryKey(args: InferRequestType<(typeof client.users)[':id']['$get']>) {
  return ['users', '/users/:id', args] as const
}

export async function getUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$get(args, options))
}

export function getUsersIdQueryOptions(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useUsersId<TData = Awaited<ReturnType<typeof getUsersId>>, TError = unknown>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseUsersId<
  TData = Awaited<ReturnType<typeof getUsersId>>,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getUsersIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
) {
  return ['users', '/users/:id', args, 'infinite'] as const
}

export function getUsersIdInfiniteQueryOptions<TPageParam = unknown>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getUsersId>>,
      allPages: Awaited<ReturnType<typeof getUsersId>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getUsersIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(args, { ...options, init: { ...options?.init, signal } })
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfiniteUsersId<
  TData = InfiniteData<Awaited<ReturnType<typeof getUsersId>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getUsersId>>,
      allPages: Awaited<ReturnType<typeof getUsersId>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsersId>>,
      TError,
      TData,
      ReturnType<typeof getUsersIdInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery({
    ...queryOptions,
    ...getUsersIdInfiniteQueryOptions(args, pagination, clientOptions),
  })
}

export function useSuspenseInfiniteUsersId<
  TData = InfiniteData<Awaited<ReturnType<typeof getUsersId>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getUsersId>>,
      allPages: Awaited<ReturnType<typeof getUsersId>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsersId>>,
      TError,
      TData,
      ReturnType<typeof getUsersIdInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getUsersIdInfiniteQueryOptions(args, pagination, clientOptions),
  })
}

export async function deleteUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$delete(args, options))
}

export function getDeleteUsersIdMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<ReturnType<typeof deleteUsersId>> | undefined,
    TError,
    InferRequestType<(typeof client.users)[':id']['$delete']>
  >({
    mutationKey: ['users', '/users/:id', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$delete']>) {
      return deleteUsersId(args, options)
    },
  })
}

export function useDeleteUsersId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteUsersId>> | undefined,
    TError,
    InferRequestType<(typeof client.users)[':id']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getDeleteUsersIdMutationOptions<TError>(clientOptions),
  })
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('tanstackQuery (split mode - CRUD)', () => {
  it('should generate correct split files for full CRUD resource', async () => {
    const openapiCrud: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Test', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            'x-pagination': true,
            summary: 'List users',
            parameters: [{ name: 'limit', in: 'query', schema: { type: 'integer' } }],
            responses: { '200': { description: 'OK' } },
          },
          post: {
            summary: 'Create user',
            requestBody: {
              required: true,
              content: { 'application/json': { schema: { type: 'object' } } },
            },
            responses: { '201': { description: 'Created' } },
          },
        },
        '/users/{id}': {
          get: {
            'x-pagination': true,
            summary: 'Get user',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { '200': { description: 'OK' } },
          },
          put: {
            summary: 'Update user',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            requestBody: {
              required: true,
              content: { 'application/json': { schema: { type: 'object' } } },
            },
            responses: { '200': { description: 'OK' } },
          },
          delete: {
            summary: 'Delete user',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { '204': { description: 'No Content' } },
          },
        },
      },
    }

    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tanstack-query-crud-'))
    try {
      const out = path.join(dir, 'hooks', 'index.ts')
      const result = await tanstackQuery(openapiCrud, out, '../client', true)

      expect(result).toStrictEqual({
        ok: true,
        value: `Generated tanstack-query hooks written to ${path.join(dir, 'hooks')}/*.ts (index.ts included)`,
      })

      const hooksDir = path.join(dir, 'hooks')
      const files = fs.readdirSync(hooksDir).sort()
      expect(files).toStrictEqual([
        '_keys.ts',
        'deleteUsersId.ts',
        'getUsers.ts',
        'getUsersId.ts',
        'index.ts',
        'postUsers.ts',
        'putUsersId.ts',
      ])

      const indexContent = fs.readFileSync(path.join(hooksDir, 'index.ts'), 'utf-8')
      expect(indexContent).toBe(`export * from './_keys'
export * from './getUsers'
export * from './postUsers'
export * from './getUsersId'
export * from './putUsersId'
export * from './deleteUsersId'
`)

      const keysContent = fs.readFileSync(path.join(hooksDir, '_keys.ts'), 'utf-8')
      expect(keysContent).toBe(`export function getUsersKey() {
  return ['users'] as const
}
`)

      const postUsersContent = fs.readFileSync(path.join(hooksDir, 'postUsers.ts'), 'utf-8')
      expect(postUsersContent)
        .toBe(`import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$post(args, options))
}

export function getPostUsersMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<ReturnType<typeof postUsers>>,
    TError,
    InferRequestType<typeof client.users.$post>
  >({
    mutationKey: ['users', '/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return postUsers(args, options)
    },
  })
}

export function usePostUsers<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUsers>>,
    TError,
    InferRequestType<typeof client.users.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostUsersMutationOptions<TError>(clientOptions) })
}
`)

      const putUsersIdContent = fs.readFileSync(path.join(hooksDir, 'putUsersId.ts'), 'utf-8')
      expect(putUsersIdContent)
        .toBe(`import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export async function putUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$put(args, options))
}

export function getPutUsersIdMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<ReturnType<typeof putUsersId>>,
    TError,
    InferRequestType<(typeof client.users)[':id']['$put']>
  >({
    mutationKey: ['users', '/users/:id', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$put']>) {
      return putUsersId(args, options)
    },
  })
}

export function usePutUsersId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putUsersId>>,
    TError,
    InferRequestType<(typeof client.users)[':id']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPutUsersIdMutationOptions<TError>(clientOptions) })
}
`)

      const deleteUsersIdContent = fs.readFileSync(path.join(hooksDir, 'deleteUsersId.ts'), 'utf-8')
      expect(deleteUsersIdContent)
        .toBe(`import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export async function deleteUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$delete(args, options))
}

export function getDeleteUsersIdMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<ReturnType<typeof deleteUsersId>> | undefined,
    TError,
    InferRequestType<(typeof client.users)[':id']['$delete']>
  >({
    mutationKey: ['users', '/users/:id', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$delete']>) {
      return deleteUsersId(args, options)
    },
  })
}

export function useDeleteUsersId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteUsersId>> | undefined,
    TError,
    InferRequestType<(typeof client.users)[':id']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getDeleteUsersIdMutationOptions<TError>(clientOptions),
  })
}
`)

      const getUsersIdContent = fs.readFileSync(path.join(hooksDir, 'getUsersId.ts'), 'utf-8')
      expect(getUsersIdContent).toBe(`import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  queryOptions,
  infiniteQueryOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  InfiniteData,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getUsersIdQueryKey(args: InferRequestType<(typeof client.users)[':id']['$get']>) {
  return ['users', '/users/:id', args] as const
}

export async function getUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$get(args, options))
}

export function getUsersIdQueryOptions(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useUsersId<TData = Awaited<ReturnType<typeof getUsersId>>, TError = unknown>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseUsersId<
  TData = Awaited<ReturnType<typeof getUsersId>>,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getUsersIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
) {
  return ['users', '/users/:id', args, 'infinite'] as const
}

export function getUsersIdInfiniteQueryOptions<TPageParam = unknown>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getUsersId>>,
      allPages: Awaited<ReturnType<typeof getUsersId>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getUsersIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(args, { ...options, init: { ...options?.init, signal } })
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfiniteUsersId<
  TData = InfiniteData<Awaited<ReturnType<typeof getUsersId>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getUsersId>>,
      allPages: Awaited<ReturnType<typeof getUsersId>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsersId>>,
      TError,
      TData,
      ReturnType<typeof getUsersIdInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery({
    ...queryOptions,
    ...getUsersIdInfiniteQueryOptions(args, pagination, clientOptions),
  })
}

export function useSuspenseInfiniteUsersId<
  TData = InfiniteData<Awaited<ReturnType<typeof getUsersId>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getUsersId>>,
      allPages: Awaited<ReturnType<typeof getUsersId>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsersId>>,
      TError,
      TData,
      ReturnType<typeof getUsersIdInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getUsersIdInfiniteQueryOptions(args, pagination, clientOptions),
  })
}
`)

      const getUsersContent = fs.readFileSync(path.join(hooksDir, 'getUsers.ts'), 'utf-8')
      expect(getUsersContent).toBe(`import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  queryOptions,
  infiniteQueryOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  InfiniteData,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args] as const
}

export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$get(args, options))
}

export function getUsersQueryOptions(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = unknown>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = unknown>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getUsersInfiniteQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args, 'infinite'] as const
}

export function getUsersInfiniteQueryOptions<TPageParam = unknown>(
  args: InferRequestType<typeof client.users.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getUsers>>,
      allPages: Awaited<ReturnType<typeof getUsers>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...options, init: { ...options?.init, signal } })
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfiniteUsers<
  TData = InfiniteData<Awaited<ReturnType<typeof getUsers>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<typeof client.users.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getUsers>>,
      allPages: Awaited<ReturnType<typeof getUsers>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsers>>,
      TError,
      TData,
      ReturnType<typeof getUsersInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery({
    ...queryOptions,
    ...getUsersInfiniteQueryOptions(args, pagination, clientOptions),
  })
}

export function useSuspenseInfiniteUsers<
  TData = InfiniteData<Awaited<ReturnType<typeof getUsers>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<typeof client.users.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getUsers>>,
      allPages: Awaited<ReturnType<typeof getUsers>>[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsers>>,
      TError,
      TData,
      ReturnType<typeof getUsersInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getUsersInfiniteQueryOptions(args, pagination, clientOptions),
  })
}
`)
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
      const invalidOpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        // paths is undefined
      } as unknown as OpenAPI

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
