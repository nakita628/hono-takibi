import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../../openapi/index.js'
import { preactQuery } from './index.js'

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

describe('preactQuery', () => {
  it('should generate the correct preact-query hooks code', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-preact-query-'))
    try {
      const out = path.join(dir, 'index.ts')
      const result = await preactQuery(openapiSimple, out, '../client', false)

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
} from '@tanstack/preact-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  InfiniteData,
  UseMutationOptions,
} from '@tanstack/preact-query'
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

export function getHonoQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getHonoQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.hono.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useHono<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getHonoQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.hono.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
  })
}

export function useSuspenseHono<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getHonoQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.hono.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
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
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getHonoInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.hono.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfiniteHono<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
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
    queryKey: getHonoInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.hono.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useSuspenseInfiniteHono<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
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
    queryKey: getHonoInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.hono.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function getUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args] as const
}

export function getUsersQueryOptions(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.users.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = unknown,
>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
  })
}

export function useSuspenseUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = unknown,
>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
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
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfiniteUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<typeof client.users.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
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
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useSuspenseInfiniteUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<typeof client.users.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
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
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function getPostUsersMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
    TError,
    InferRequestType<typeof client.users.$post>
  >({
    mutationKey: ['users', '/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return parseResponse(client.users.$post(args, options))
    },
  })
}

export function usePostUsers<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
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
        value: `Generated preact-query hooks written to ${out}`,
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('preactQuery (header parameters excluded from query key)', () => {
  it('omits header field from queryKey arg across query/suspense/infinite hooks', async () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'T', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            'x-pagination': true,
            parameters: [
              { name: 'limit', in: 'query', schema: { type: 'integer' } },
              { name: 'x-tenant', in: 'header', schema: { type: 'string' }, required: true },
            ],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-pq-header-'))
    try {
      const out = path.join(dir, 'index.ts')
      const result = await preactQuery(spec, out, '../client', false)
      if (!result.ok) throw new Error(result.error)
      const code = fs.readFileSync(out, 'utf-8')
      expect(code)
        .toBe(`import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  queryOptions,
  infiniteQueryOptions,
} from '@tanstack/preact-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  InfiniteData,
} from '@tanstack/preact-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getUsersKey() {
  return ['users'] as const
}

export function getUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  const { header: _, ...keyArgs } = args
  return ['users', '/users', keyArgs] as const
}

export function getUsersQueryOptions(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.users.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = unknown,
>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
  })
}

export function useSuspenseUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = unknown,
>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
  })
}

export function getUsersInfiniteQueryKey(args: InferRequestType<typeof client.users.$get>) {
  const { header: _, ...keyArgs } = args
  return ['users', '/users', keyArgs, 'infinite'] as const
}

export function getUsersInfiniteQueryOptions<TPageParam = unknown>(
  args: InferRequestType<typeof client.users.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfiniteUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<typeof client.users.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
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
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useSuspenseInfiniteUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<typeof client.users.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
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
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}
`)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})
