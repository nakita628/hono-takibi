import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../../openapi/index.js'
import { angularQuery } from './index.js'

const openapiSimple: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'Test', version: '1.0.0' },
  paths: {
    '/hono': {
      get: { responses: { '200': { description: 'OK' } } },
    },
    '/users': {
      get: {
        'x-pagination': true,
        parameters: [{ name: 'limit', in: 'query', schema: { type: 'integer' } }],
        responses: { '200': { description: 'OK' } },
      },
      post: {
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object' } } },
        },
        responses: { '201': { description: 'Created' } },
      },
    },
  },
}

describe('angularQuery', () => {
  it('should generate the correct angular-query hooks code', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-angular-query-'))
    try {
      const out = path.join(dir, 'index.ts')
      const result = await angularQuery(openapiSimple, out, '../client', false)

      if (!result.ok) throw new Error(result.error)

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import {
  injectQuery,
  injectInfiniteQuery,
  injectMutation,
  queryOptions,
  infiniteQueryOptions,
} from '@tanstack/angular-query-experimental'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  InfiniteData,
  CreateMutationOptions,
} from '@tanstack/angular-query-experimental'
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

export function injectHono<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getHonoQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.hono.$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
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

export function injectUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = unknown,
>(
  args: () => InferRequestType<typeof client.users.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getUsersQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.users.$get(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } }),
        )
      },
    }
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

export function injectInfiniteUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  args: () => InferRequestType<typeof client.users.$get>,
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
  options?: () => {
    query?: CreateInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError,
      TData,
      ReturnType<typeof getUsersInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  return injectInfiniteQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getUsersInfiniteQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.users.$get(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } }),
        )
      },
      initialPageParam: pagination.initialPageParam,
      getNextPageParam: pagination.getNextPageParam,
    }
  })
}

export function getPostUsersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return parseResponse(client.users.$post(args, options))
    },
  }
}

export function injectPostUsers<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
      TError,
      InferRequestType<typeof client.users.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return injectMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostUsersMutationOptions(clientOptions) }
  })
}
`

      expect(code).toBe(expected)
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated angular-query hooks written to ${out}`,
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  // Angular replaces suspense with Signal-based reactivity, so no suspense hooks are emitted.
  // This is a negative contract: the full toBe match below fixes the *absence* of any
  // injectSuspense* / useSuspense* symbol, guarding against an accidental future addition.
  it('does not emit any suspense hook (Signal-based reactivity replaces it)', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-angular-query-suspense-'))
    try {
      const out = path.join(dir, 'index.ts')
      const result = await angularQuery(
        {
          openapi: '3.1.0',
          info: { title: 'Test', version: '1.0.0' },
          paths: { '/hono': { get: { responses: { '200': { description: 'OK' } } } } },
        },
        out,
        '../client',
        false,
      )
      if (!result.ok) throw new Error(result.error)

      const code = fs.readFileSync(out, 'utf-8')
      expect(code)
        .toBe(`import { injectQuery, queryOptions } from '@tanstack/angular-query-experimental'
import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/angular-query-experimental'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getHonoKey() {
  return ['hono'] as const
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

export function injectHono<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getHonoQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.hono.$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}
`)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('angularQuery (split mode)', () => {
  it('should generate correct split files for the thunk config with no suspense', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-angular-query-split-'))
    try {
      const out = path.join(dir, 'hooks', 'index.ts')
      const result = await angularQuery(openapiSimple, out, '../client', true)

      if (!result.ok) throw new Error(result.error)

      const index = fs.readFileSync(path.join(dir, 'hooks', 'index.ts'), 'utf-8')
      expect(index).toBe(`export * from './_keys'
export * from './getHono'
export * from './getUsers'
export * from './postUsers'
`)

      const keys = fs.readFileSync(path.join(dir, 'hooks', '_keys.ts'), 'utf-8')
      expect(keys).toBe(`export function getHonoKey() {
  return ['hono'] as const
}

export function getUsersKey() {
  return ['users'] as const
}
`)

      // Query-only file: injectQuery, no suspense symbol
      const getHono = fs.readFileSync(path.join(dir, 'hooks', 'getHono.ts'), 'utf-8')
      expect(getHono)
        .toBe(`import { injectQuery, queryOptions } from '@tanstack/angular-query-experimental'
import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/angular-query-experimental'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

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

export function injectHono<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getHonoQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.hono.$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}
`)

      // Infinite query file: injectInfiniteQuery, still no suspense-infinite hook
      const getUsers = fs.readFileSync(path.join(dir, 'hooks', 'getUsers.ts'), 'utf-8')
      expect(getUsers).toBe(`import {
  injectQuery,
  injectInfiniteQuery,
  queryOptions,
  infiniteQueryOptions,
} from '@tanstack/angular-query-experimental'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  InfiniteData,
} from '@tanstack/angular-query-experimental'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

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

export function injectUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = unknown,
>(
  args: () => InferRequestType<typeof client.users.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getUsersQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.users.$get(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } }),
        )
      },
    }
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

export function injectInfiniteUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  args: () => InferRequestType<typeof client.users.$get>,
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
  options?: () => {
    query?: CreateInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError,
      TData,
      ReturnType<typeof getUsersInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  return injectInfiniteQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getUsersInfiniteQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.users.$get(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } }),
        )
      },
      initialPageParam: pagination.initialPageParam,
      getNextPageParam: pagination.getNextPageParam,
    }
  })
}
`)

      // Mutation-only file: injectMutation, plain-object factory (hasMutationOptionsHelper: false)
      const postUsers = fs.readFileSync(path.join(dir, 'hooks', 'postUsers.ts'), 'utf-8')
      expect(postUsers).toBe(`import { injectMutation } from '@tanstack/angular-query-experimental'
import type { CreateMutationOptions } from '@tanstack/angular-query-experimental'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getPostUsersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return parseResponse(client.users.$post(args, options))
    },
  }
}

export function injectPostUsers<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
      TError,
      InferRequestType<typeof client.users.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return injectMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostUsersMutationOptions(clientOptions) }
  })
}
`)

      expect(result).toStrictEqual({
        ok: true,
        value: `Generated angular-query hooks written to ${path.join(dir, 'hooks')}/*.ts (index.ts included)`,
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})
