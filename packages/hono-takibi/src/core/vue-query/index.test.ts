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
  return {
    queryKey: getHonoQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHono({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useHono<TData = Awaited<ReturnType<typeof getHono>>, TError = Error>(options?: {
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

export function getHonoInfiniteQueryKey() {
  return ['hono', '/hono', 'infinite'] as const
}

export function getHonoInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getHonoInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHono({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteHono<TError = Error>(options: {
  query: UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof getHono>>,
    TError,
    Awaited<ReturnType<typeof getHono>>,
    ReturnType<typeof getHonoInfiniteQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getHonoInfiniteQueryOptions(clientOptions) })
}

export function getUsersQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', '/users', args] as const
}

export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$get(args, options))
}

export function getUsersQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = Error>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
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
      return getUsers(toValue(args), { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getUsersInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', '/users', args, 'infinite'] as const
}

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

export function useInfiniteUsers<TError = Error>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options: {
    query: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsers>>,
      TError,
      Awaited<ReturnType<typeof getUsers>>,
      ReturnType<typeof getUsersInfiniteQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getUsersInfiniteQueryOptions(args, clientOptions) })
}

export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$post(args, options))
}

export function getPostUsersMutationOptions<TError = Error>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return postUsers(args, options)
    },
  }
}

export function usePostUsers<TError = Error>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUsers>>,
    TError,
    InferRequestType<typeof client.users.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostUsersMutationOptions<TError>(clientOptions), ...mutationOptions })
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
      const keysExpected = `export function getHonoKey() {
  return ['hono'] as const
}

export function getUsersKey() {
  return ['users'] as const
}
`
      expect(keys).toBe(keysExpected)

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

export function getHonoQueryKey() {
  return ['hono', '/hono'] as const
}

export async function getHono(options?: ClientRequestOptions) {
  return await parseResponse(client.hono.$get(undefined, options))
}

export function getHonoQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getHonoQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHono({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useHono<TData = Awaited<ReturnType<typeof getHono>>, TError = Error>(options?: {
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

export function getHonoInfiniteQueryKey() {
  return ['hono', '/hono', 'infinite'] as const
}

export function getHonoInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getHonoInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHono({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteHono<TError = Error>(options: {
  query: UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof getHono>>,
    TError,
    Awaited<ReturnType<typeof getHono>>,
    ReturnType<typeof getHonoInfiniteQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getHonoInfiniteQueryOptions(clientOptions) })
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

export function getUsersQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', '/users', args] as const
}

export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$get(args, options))
}

export function getUsersQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = Error>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
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
      return getUsers(toValue(args), { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getUsersInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', '/users', args, 'infinite'] as const
}

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

export function useInfiniteUsers<TError = Error>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options: {
    query: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsers>>,
      TError,
      Awaited<ReturnType<typeof getUsers>>,
      ReturnType<typeof getUsersInfiniteQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getUsersInfiniteQueryOptions(args, clientOptions) })
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

export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$post(args, options))
}

export function getPostUsersMutationOptions<TError = Error>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return postUsers(args, options)
    },
  }
}

export function usePostUsers<TError = Error>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUsers>>,
    TError,
    InferRequestType<typeof client.users.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostUsersMutationOptions<TError>(clientOptions), ...mutationOptions })
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
  return {
    queryKey: getUsersQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = Error>(options?: {
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

export function getUsersInfiniteQueryKey() {
  return ['users', '/users', 'infinite'] as const
}

export function getUsersInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getUsersInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteUsers<TError = Error>(options: {
  query: UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof getUsers>>,
    TError,
    Awaited<ReturnType<typeof getUsers>>,
    ReturnType<typeof getUsersInfiniteQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getUsersInfiniteQueryOptions(clientOptions) })
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
  return {
    queryKey: getPingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getPing({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function usePing<TData = Awaited<ReturnType<typeof getPing>>, TError = Error>(options?: {
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

export function getPingInfiniteQueryKey() {
  return ['ping', '/ping', 'infinite'] as const
}

export function getPingInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getPingInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getPing({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfinitePing<TError = Error>(options: {
  query: UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof getPing>>,
    TError,
    Awaited<ReturnType<typeof getPing>>,
    ReturnType<typeof getPingInfiniteQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getPingInfiniteQueryOptions(clientOptions) })
}

export async function postPing(options?: ClientRequestOptions) {
  return await parseResponse(client.ping.$post(undefined, options))
}

export function getPostPingMutationOptions<TError = Error>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['ping', '/ping', 'POST'] as const,
    async mutationFn() {
      return postPing(options)
    },
  }
}

export function usePostPing<TError = Error>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof postPing>>, TError, void>
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostPingMutationOptions<TError>(clientOptions), ...mutationOptions })
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
  return {
    queryKey: getHonoXQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHonoX({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useHonoX<TData = Awaited<ReturnType<typeof getHonoX>>, TError = Error>(options?: {
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

export function getHonoXInfiniteQueryKey() {
  return ['hono-x', '/hono-x', 'infinite'] as const
}

export function getHonoXInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getHonoXInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHonoX({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteHonoX<TError = Error>(options: {
  query: UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof getHonoX>>,
    TError,
    Awaited<ReturnType<typeof getHonoX>>,
    ReturnType<typeof getHonoXInfiniteQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getHonoXInfiniteQueryOptions(clientOptions) })
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

export function getUsersKey() {
  return ['users'] as const
}

export function getUsersIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
) {
  return ['users', '/users/:id', args] as const
}

export async function getUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$get(args, options))
}

export function getUsersIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useUsersId<TData = Awaited<ReturnType<typeof getUsersId>>, TError = Error>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
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
      return getUsersId(toValue(args), {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export function getUsersIdInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
) {
  return ['users', '/users/:id', args, 'infinite'] as const
}

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

export function useInfiniteUsersId<TError = Error>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsersId>>,
      TError,
      Awaited<ReturnType<typeof getUsersId>>,
      ReturnType<typeof getUsersIdInfiniteQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getUsersIdInfiniteQueryOptions(args, clientOptions),
  })
}

export async function deleteUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$delete(args, options))
}

export function getDeleteUsersIdMutationOptions<TError = Error>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:id', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$delete']>) {
      return deleteUsersId(args, options)
    },
  }
}

export function useDeleteUsersId<TError = Error>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteUsersId>> | undefined,
    TError,
    InferRequestType<(typeof client.users)[':id']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...getDeleteUsersIdMutationOptions<TError>(clientOptions),
    ...mutationOptions,
  })
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

/** Full CRUD OpenAPI spec for split mode tests */
const openapiCrud: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'Test', version: '1.0.0' },
  paths: {
    '/users': {
      get: {
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

describe('vueQuery (split mode with full CRUD)', () => {
  it('should generate correct split files for full CRUD resource', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-vue-query-crud-split-'))
    try {
      const out = path.join(dir, 'hooks', 'index.ts')
      const result = await vueQuery(openapiCrud, out, '../client', true)

      if (!result.ok) {
        throw new Error(result.error)
      }

      // Check generated file list
      const files = fs.readdirSync(path.join(dir, 'hooks')).sort()
      expect(files).toStrictEqual([
        '_keys.ts',
        'deleteUsersId.ts',
        'getUsers.ts',
        'getUsersId.ts',
        'index.ts',
        'postUsers.ts',
        'putUsersId.ts',
      ])

      // Check index.ts barrel file
      const index = fs.readFileSync(path.join(dir, 'hooks', 'index.ts'), 'utf-8')
      const indexExpected = `export * from './_keys'
export * from './getUsers'
export * from './postUsers'
export * from './getUsersId'
export * from './putUsersId'
export * from './deleteUsersId'
`
      expect(index).toBe(indexExpected)

      // Check _keys.ts prefix key file
      const keys = fs.readFileSync(path.join(dir, 'hooks', '_keys.ts'), 'utf-8')
      const keysExpected = `export function getUsersKey() {
  return ['users'] as const
}
`
      expect(keys).toBe(keysExpected)

      // Check GET /users query file (has args with MaybeRefOrGetter/toValue)
      const getUsers = fs.readFileSync(path.join(dir, 'hooks', 'getUsers.ts'), 'utf-8')
      const getUsersExpected = `import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
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

export function getUsersQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', '/users', args] as const
}

export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$get(args, options))
}

export function getUsersQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = Error>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
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
      return getUsers(toValue(args), { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getUsersInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', '/users', args, 'infinite'] as const
}

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

export function useInfiniteUsers<TError = Error>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options: {
    query: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsers>>,
      TError,
      Awaited<ReturnType<typeof getUsers>>,
      ReturnType<typeof getUsersInfiniteQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getUsersInfiniteQueryOptions(args, clientOptions) })
}
`
      expect(getUsers).toBe(getUsersExpected)

      // Check POST /users mutation file (no query imports, no MaybeRefOrGetter/toValue)
      const postUsers = fs.readFileSync(path.join(dir, 'hooks', 'postUsers.ts'), 'utf-8')
      const postUsersExpected = `import { useMutation } from '@tanstack/vue-query'
import type { UseMutationOptions } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$post(args, options))
}

export function getPostUsersMutationOptions<TError = Error>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return postUsers(args, options)
    },
  }
}

export function usePostUsers<TError = Error>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUsers>>,
    TError,
    InferRequestType<typeof client.users.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostUsersMutationOptions<TError>(clientOptions), ...mutationOptions })
}
`
      expect(postUsers).toBe(postUsersExpected)

      // Check GET /users/{id} query file (path param with bracket notation)
      const getUsersId = fs.readFileSync(path.join(dir, 'hooks', 'getUsersId.ts'), 'utf-8')
      const getUsersIdExpected = `import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
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

export function getUsersIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
) {
  return ['users', '/users/:id', args] as const
}

export async function getUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$get(args, options))
}

export function getUsersIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useUsersId<TData = Awaited<ReturnType<typeof getUsersId>>, TError = Error>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
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
      return getUsersId(toValue(args), {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export function getUsersIdInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
) {
  return ['users', '/users/:id', args, 'infinite'] as const
}

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

export function useInfiniteUsersId<TError = Error>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsersId>>,
      TError,
      Awaited<ReturnType<typeof getUsersId>>,
      ReturnType<typeof getUsersIdInfiniteQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getUsersIdInfiniteQueryOptions(args, clientOptions),
  })
}
`
      expect(getUsersId).toBe(getUsersIdExpected)

      // Check PUT /users/{id} mutation file (path param, no query imports)
      const putUsersId = fs.readFileSync(path.join(dir, 'hooks', 'putUsersId.ts'), 'utf-8')
      const putUsersIdExpected = `import { useMutation } from '@tanstack/vue-query'
import type { UseMutationOptions } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export async function putUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$put(args, options))
}

export function getPutUsersIdMutationOptions<TError = Error>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:id', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$put']>) {
      return putUsersId(args, options)
    },
  }
}

export function usePutUsersId<TError = Error>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putUsersId>>,
    TError,
    InferRequestType<(typeof client.users)[':id']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPutUsersIdMutationOptions<TError>(clientOptions), ...mutationOptions })
}
`
      expect(putUsersId).toBe(putUsersIdExpected)

      // Check DELETE /users/{id} mutation file (204 with |undefined)
      const deleteUsersId = fs.readFileSync(path.join(dir, 'hooks', 'deleteUsersId.ts'), 'utf-8')
      const deleteUsersIdExpected = `import { useMutation } from '@tanstack/vue-query'
import type { UseMutationOptions } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export async function deleteUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$delete(args, options))
}

export function getDeleteUsersIdMutationOptions<TError = Error>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:id', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$delete']>) {
      return deleteUsersId(args, options)
    },
  }
}

export function useDeleteUsersId<TError = Error>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteUsersId>> | undefined,
    TError,
    InferRequestType<(typeof client.users)[':id']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...getDeleteUsersIdMutationOptions<TError>(clientOptions),
    ...mutationOptions,
  })
}
`
      expect(deleteUsersId).toBe(deleteUsersIdExpected)
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

export function getUsersKey() {
  return ['users'] as const
}

export async function putUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$put(args, options))
}

export function getPutUsersIdMutationOptions<TError = Error>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:id', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$put']>) {
      return putUsersId(args, options)
    },
  }
}

export function usePutUsersId<TError = Error>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putUsersId>>,
    TError,
    InferRequestType<(typeof client.users)[':id']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPutUsersIdMutationOptions<TError>(clientOptions), ...mutationOptions })
}

export async function patchUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$patch']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$patch(args, options))
}

export function getPatchUsersIdMutationOptions<TError = Error>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:id', 'PATCH'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$patch']>) {
      return patchUsersId(args, options)
    },
  }
}

export function usePatchUsersId<TError = Error>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchUsersId>>,
    TError,
    InferRequestType<(typeof client.users)[':id']['$patch']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...getPatchUsersIdMutationOptions<TError>(clientOptions),
    ...mutationOptions,
  })
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})
