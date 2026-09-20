import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../../openapi/index.js'
import { runGenerator, runGeneratorError } from '../../testing/index.js'
import { hooks } from './index.js'

describe('swr hooks', () => {
  /** Simple OpenAPI spec for basic tests */
  const openapiSimple = {
    openapi: '3.1.0',
    info: { title: 'Test', version: '1.0.0' },
    paths: {
      '/hono': {
        get: {
          summary: 'Hono',
          description: 'Simple ping for Hono',
          'x-pagination': true,
          responses: { '200': { description: 'OK' } },
        },
      },
      '/users': {
        get: {
          summary: 'List users',
          description: 'List users with pagination.',
          'x-pagination': true,
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
  } as OpenAPI

  describe('swr', () => {
    it('should generate the correct swr hooks code', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-'))
      try {
        const out = path.join(dir, 'index.ts')
        const result = await runGenerator(hooks(openapiSimple, out, '../client', 'swr'))

        const code = fs.readFileSync(out, 'utf-8')

        expect(code).toBe(`import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration } from 'swr/infinite'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getHonoKey() {
  return ['hono'] as const
}

export function getUsersKey() {
  return ['users'] as const
}

export function getGetHonoKey() {
  return ['hono', '/hono'] as const
}

export function useGetHono<TError = unknown>(options?: {
  swr?: SWRConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetHonoKey()) : null
  return {
    swrKey,
    ...useSWR<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
      TError
    >(
      swrKey,
      async () => parseResponse(client.hono.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetHono<TError = unknown>(options?: {
  swr?: SWRConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetHonoKey()) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
      TError
    >(
      swrKey,
      async () => parseResponse(client.hono.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetHonoInfiniteKey() {
  return ['hono', '/hono', 'infinite'] as const
}

export function useInfiniteGetHono<TError = unknown>(options: {
  swr?: SWRInfiniteConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
    TError
  > & {
    swrKey?: (
      index: number,
      previousPageData: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>
      > | null,
    ) => readonly [...ReturnType<typeof getGetHonoInfiniteKey>, number] | null
  }
  options?: ClientRequestOptions
  pagination: { getRequestArgs: (index: number) => InferRequestType<typeof client.hono.$get> }
}) {
  const { swr: swrOptions, options: clientOptions, pagination } = options
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetHonoInfiniteKey(), index] as const)
  return useSWRInfinite(
    keyLoader,
    ([, , , index]: readonly [...ReturnType<typeof getGetHonoInfiniteKey>, number]) =>
      parseResponse(client.hono.$get(pagination.getRequestArgs(index), clientOptions)),
    restSwrOptions,
  )
}

export function getGetUsersKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args] as const
}

export function useGetUsers<TError = unknown>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    swr?: SWRConfiguration<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey(args)) : null
  return {
    swrKey,
    ...useSWR<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError
    >(swrKey, async () => parseResponse(client.users.$get(args, clientOptions)), restSwrOptions),
  }
}

export function useImmutableGetUsers<TError = unknown>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    swr?: SWRConfiguration<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError
    >(swrKey, async () => parseResponse(client.users.$get(args, clientOptions)), restSwrOptions),
  }
}

export function getGetUsersInfiniteKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', 'infinite', args] as const
}

export function useInfiniteGetUsers<TError = unknown>(
  args: InferRequestType<typeof client.users.$get>,
  options: {
    swr?: SWRInfiniteConfiguration<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError
    > & {
      swrKey?: (
        index: number,
        previousPageData: Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>
        > | null,
      ) => readonly [...ReturnType<typeof getGetUsersInfiniteKey>, number] | null
    }
    options?: ClientRequestOptions
    pagination: {
      getRequestArgs: (
        args: InferRequestType<typeof client.users.$get>,
        index: number,
      ) => InferRequestType<typeof client.users.$get>
    }
  },
) {
  const { swr: swrOptions, options: clientOptions, pagination } = options
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetUsersInfiniteKey(args), index] as const)
  return useSWRInfinite(
    keyLoader,
    ([, , , , index]: readonly [...ReturnType<typeof getGetUsersInfiniteKey>, number]) =>
      parseResponse(client.users.$get(pagination.getRequestArgs(args, index), clientOptions)),
    restSwrOptions,
  )
}

export function getPostUsersKey() {
  return ['users', '/users', 'POST'] as const
}

export function usePostUsers<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
    TError,
    Key,
    InferRequestType<typeof client.users.$post>
  > & { swrKey?: Key; throwOnError?: boolean }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostUsersKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.users.$post> }) =>
        parseResponse(client.users.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
`)

        expect(result).toStrictEqual(`Generated swr hooks written to ${out}`)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  describe('swr (custom client name)', () => {
    it('should generate code with custom client name', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-client-'))
      try {
        const out = path.join(dir, 'index.ts')
        const simpleOpenAPI = {
          openapi: '3.0.3',
          info: { title: 'Test', version: '1.0.0' },
          paths: {
            '/users': {
              get: {
                summary: 'Get users',
                'x-pagination': true,
                responses: { '200': { description: 'OK' } },
              },
            },
          },
        } as OpenAPI

        await runGenerator(
          hooks(simpleOpenAPI, out, '../api', 'swr', {
            clientName: 'authClient',
          }),
        )

        const code = fs.readFileSync(out, 'utf-8')

        expect(code).toBe(`import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration } from 'swr/infinite'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { authClient } from '../api'

export function getUsersKey() {
  return ['users'] as const
}

export function getGetUsersKey() {
  return ['users', '/users'] as const
}

export function useGetUsers<TError = unknown>(options?: {
  swr?: SWRConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>,
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey()) : null
  return {
    swrKey,
    ...useSWR<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>,
      TError
    >(
      swrKey,
      async () => parseResponse(authClient.users.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUsers<TError = unknown>(options?: {
  swr?: SWRConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>,
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey()) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>,
      TError
    >(
      swrKey,
      async () => parseResponse(authClient.users.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetUsersInfiniteKey() {
  return ['users', '/users', 'infinite'] as const
}

export function useInfiniteGetUsers<TError = unknown>(options: {
  swr?: SWRInfiniteConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>,
    TError
  > & {
    swrKey?: (
      index: number,
      previousPageData: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
      > | null,
    ) => readonly [...ReturnType<typeof getGetUsersInfiniteKey>, number] | null
  }
  options?: ClientRequestOptions
  pagination: { getRequestArgs: (index: number) => InferRequestType<typeof authClient.users.$get> }
}) {
  const { swr: swrOptions, options: clientOptions, pagination } = options
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetUsersInfiniteKey(), index] as const)
  return useSWRInfinite(
    keyLoader,
    ([, , , index]: readonly [...ReturnType<typeof getGetUsersInfiniteKey>, number]) =>
      parseResponse(authClient.users.$get(pagination.getRequestArgs(index), clientOptions)),
    restSwrOptions,
  )
}
`)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  /** Test OpenAPI spec for operations without arguments */
  const openapiNoArgs = {
    openapi: '3.1.0',
    info: { title: 'No Args Test', version: '1.0.0' },
    paths: {
      '/ping': {
        get: {
          summary: 'Ping',
          'x-pagination': true,
          responses: { '200': { description: 'OK' } },
        },
        post: {
          summary: 'Post ping',
          responses: { '200': { description: 'OK' } },
        },
      },
    },
  } as OpenAPI

  describe('swr (no args operations)', () => {
    it('should generate hooks without args correctly', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-noargs-'))
      try {
        const out = path.join(dir, 'index.ts')
        await runGenerator(hooks(openapiNoArgs, out, '../client', 'swr'))

        const code = fs.readFileSync(out, 'utf-8')

        expect(code).toBe(`import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration } from 'swr/infinite'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getPingKey() {
  return ['ping'] as const
}

export function getGetPingKey() {
  return ['ping', '/ping'] as const
}

export function useGetPing<TError = unknown>(options?: {
  swr?: SWRConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPingKey()) : null
  return {
    swrKey,
    ...useSWR<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
      TError
    >(
      swrKey,
      async () => parseResponse(client.ping.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetPing<TError = unknown>(options?: {
  swr?: SWRConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPingKey()) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
      TError
    >(
      swrKey,
      async () => parseResponse(client.ping.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetPingInfiniteKey() {
  return ['ping', '/ping', 'infinite'] as const
}

export function useInfiniteGetPing<TError = unknown>(options: {
  swr?: SWRInfiniteConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
    TError
  > & {
    swrKey?: (
      index: number,
      previousPageData: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>
      > | null,
    ) => readonly [...ReturnType<typeof getGetPingInfiniteKey>, number] | null
  }
  options?: ClientRequestOptions
  pagination: { getRequestArgs: (index: number) => InferRequestType<typeof client.ping.$get> }
}) {
  const { swr: swrOptions, options: clientOptions, pagination } = options
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetPingInfiniteKey(), index] as const)
  return useSWRInfinite(
    keyLoader,
    ([, , , index]: readonly [...ReturnType<typeof getGetPingInfiniteKey>, number]) =>
      parseResponse(client.ping.$get(pagination.getRequestArgs(index), clientOptions)),
    restSwrOptions,
  )
}

export function getPostPingKey() {
  return ['ping', '/ping', 'POST'] as const
}

export function usePostPing<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$post>>>>>,
    TError,
    Key,
    undefined
  > & { swrKey?: Key; throwOnError?: boolean }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPingKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client.ping.$post(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}
`)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  describe('swr (path with special characters)', () => {
    it('should generate hooks for hyphenated paths', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-hyphen-'))
      try {
        const out = path.join(dir, 'index.ts')
        const hyphenOpenAPI = {
          openapi: '3.0.3',
          info: { title: 'Test', version: '1.0.0' },
          paths: {
            '/hono-x': {
              get: {
                summary: 'HonoX',
                'x-pagination': true,
                responses: { '200': { description: 'OK' } },
              },
            },
          },
        } as OpenAPI

        await runGenerator(hooks(hyphenOpenAPI, out, '../client', 'swr'))

        const code = fs.readFileSync(out, 'utf-8')

        expect(code).toBe(`import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration } from 'swr/infinite'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getHonoXKey() {
  return ['hono-x'] as const
}

export function getGetHonoXKey() {
  return ['hono-x', '/hono-x'] as const
}

export function useGetHonoX<TError = unknown>(options?: {
  swr?: SWRConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
    >,
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetHonoXKey()) : null
  return {
    swrKey,
    ...useSWR<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
      >,
      TError
    >(
      swrKey,
      async () => parseResponse(client['hono-x'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetHonoX<TError = unknown>(options?: {
  swr?: SWRConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
    >,
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetHonoXKey()) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
      >,
      TError
    >(
      swrKey,
      async () => parseResponse(client['hono-x'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetHonoXInfiniteKey() {
  return ['hono-x', '/hono-x', 'infinite'] as const
}

export function useInfiniteGetHonoX<TError = unknown>(options: {
  swr?: SWRInfiniteConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
    >,
    TError
  > & {
    swrKey?: (
      index: number,
      previousPageData: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
      > | null,
    ) => readonly [...ReturnType<typeof getGetHonoXInfiniteKey>, number] | null
  }
  options?: ClientRequestOptions
  pagination: {
    getRequestArgs: (index: number) => InferRequestType<(typeof client)['hono-x']['$get']>
  }
}) {
  const { swr: swrOptions, options: clientOptions, pagination } = options
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetHonoXInfiniteKey(), index] as const)
  return useSWRInfinite(
    keyLoader,
    ([, , , index]: readonly [...ReturnType<typeof getGetHonoXInfiniteKey>, number]) =>
      parseResponse(client['hono-x'].$get(pagination.getRequestArgs(index), clientOptions)),
    restSwrOptions,
  )
}
`)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  describe('swr (path parameters)', () => {
    it('should generate hooks for path with parameters', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-params-'))
      try {
        const out = path.join(dir, 'index.ts')
        const paramOpenAPI = {
          openapi: '3.0.3',
          info: { title: 'Test', version: '1.0.0' },
          paths: {
            '/users/{id}': {
              get: {
                summary: 'Get user',
                'x-pagination': true,
                parameters: [
                  { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
                ],
                responses: { '200': { description: 'OK' } },
              },
              delete: {
                summary: 'Delete user',
                parameters: [
                  { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
                ],
                responses: { '204': { description: 'Deleted' } },
              },
            },
          },
        } as OpenAPI

        await runGenerator(hooks(paramOpenAPI, out, '../client', 'swr'))

        const code = fs.readFileSync(out, 'utf-8')

        expect(code).toBe(`import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration } from 'swr/infinite'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getUsersKey() {
  return ['users'] as const
}

export function getGetUsersIdKey(args: InferRequestType<(typeof client.users)[':id']['$get']>) {
  return ['users', '/users/:id', args] as const
}

export function useGetUsersId<TError = unknown>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersIdKey(args)) : null
  return {
    swrKey,
    ...useSWR<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      TError
    >(
      swrKey,
      async () => parseResponse(client.users[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUsersId<TError = unknown>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      TError
    >(
      swrKey,
      async () => parseResponse(client.users[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetUsersIdInfiniteKey(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
) {
  return ['users', '/users/:id', 'infinite', args] as const
}

export function useInfiniteGetUsersId<TError = unknown>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options: {
    swr?: SWRInfiniteConfiguration<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      TError
    > & {
      swrKey?: (
        index: number,
        previousPageData: Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>
          >
        > | null,
      ) => readonly [...ReturnType<typeof getGetUsersIdInfiniteKey>, number] | null
    }
    options?: ClientRequestOptions
    pagination: {
      getRequestArgs: (
        args: InferRequestType<(typeof client.users)[':id']['$get']>,
        index: number,
      ) => InferRequestType<(typeof client.users)[':id']['$get']>
    }
  },
) {
  const { swr: swrOptions, options: clientOptions, pagination } = options
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetUsersIdInfiniteKey(args), index] as const)
  return useSWRInfinite(
    keyLoader,
    ([, , , , index]: readonly [...ReturnType<typeof getGetUsersIdInfiniteKey>, number]) =>
      parseResponse(
        client.users[':id'].$get(pagination.getRequestArgs(args, index), clientOptions),
      ),
    restSwrOptions,
  )
}

export function getDeleteUsersIdKey() {
  return ['users', '/users/:id', 'DELETE'] as const
}

export function useDeleteUsersId<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$delete']>>>
        >
      >
    | undefined,
    TError,
    Key,
    InferRequestType<(typeof client.users)[':id']['$delete']>
  > & { swrKey?: Key; throwOnError?: boolean }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteUsersIdKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client.users)[':id']['$delete']> }) =>
        parseResponse(client.users[':id'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
`)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  describe('swr (invalid paths)', () => {
    it('should return error for invalid OpenAPI paths', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-invalid-'))
      try {
        const out = path.join(dir, 'index.ts')
        const invalidOpenAPI = {
          openapi: '3.0.3',
          info: { title: 'Test', version: '1.0.0' },
          // paths is undefined
        } as unknown as OpenAPI

        const error = await runGeneratorError(hooks(invalidOpenAPI, out, '../client', 'swr'))
        expect(error.message).toBe('Invalid OpenAPI paths')
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  /** Simple OpenAPI spec for immutable tests */
  const openapiImmutable = {
    openapi: '3.1.0',
    info: { title: 'Test', version: '1.0.0' },
    paths: {
      '/hono': {
        get: {
          summary: 'Hono',
          'x-pagination': true,
          responses: { '200': { description: 'OK' } },
        },
      },
    },
  } as OpenAPI

  describe('swr (immutable mode)', () => {
    it('should generate both useSWR and useSWRImmutable hooks by default', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-immutable-'))
      try {
        const out = path.join(dir, 'index.ts')
        await expect(
          runGenerator(hooks(openapiImmutable, out, '../client', 'swr')),
        ).resolves.toBeDefined()

        const code = fs.readFileSync(out, 'utf-8')

        const expected = `import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration } from 'swr/infinite'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getHonoKey() {
  return ['hono'] as const
}

export function getGetHonoKey() {
  return ['hono', '/hono'] as const
}

export function useGetHono<TError = unknown>(options?: {
  swr?: SWRConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetHonoKey()) : null
  return {
    swrKey,
    ...useSWR<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
      TError
    >(
      swrKey,
      async () => parseResponse(client.hono.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetHono<TError = unknown>(options?: {
  swr?: SWRConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetHonoKey()) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
      TError
    >(
      swrKey,
      async () => parseResponse(client.hono.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetHonoInfiniteKey() {
  return ['hono', '/hono', 'infinite'] as const
}

export function useInfiniteGetHono<TError = unknown>(options: {
  swr?: SWRInfiniteConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
    TError
  > & {
    swrKey?: (
      index: number,
      previousPageData: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>
      > | null,
    ) => readonly [...ReturnType<typeof getGetHonoInfiniteKey>, number] | null
  }
  options?: ClientRequestOptions
  pagination: { getRequestArgs: (index: number) => InferRequestType<typeof client.hono.$get> }
}) {
  const { swr: swrOptions, options: clientOptions, pagination } = options
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetHonoInfiniteKey(), index] as const)
  return useSWRInfinite(
    keyLoader,
    ([, , , index]: readonly [...ReturnType<typeof getGetHonoInfiniteKey>, number]) =>
      parseResponse(client.hono.$get(pagination.getRequestArgs(index), clientOptions)),
    restSwrOptions,
  )
}
`
        expect(code).toBe(expected)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  describe('swr (enabled priority)', () => {
    it('should prioritize enabled over swrKey - enabled:false means no fetch even with swrKey', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-enabled-'))
      try {
        const out = path.join(dir, 'index.ts')
        const simpleOpenAPI = {
          openapi: '3.0.3',
          info: { title: 'Test', version: '1.0.0' },
          paths: {
            '/users': {
              get: {
                summary: 'Get users',
                'x-pagination': true,
                responses: { '200': { description: 'OK' } },
              },
            },
          },
        } as OpenAPI

        await runGenerator(hooks(simpleOpenAPI, out, '../client', 'swr'))

        const code = fs.readFileSync(out, 'utf-8')

        expect(code).toBe(`import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration } from 'swr/infinite'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getUsersKey() {
  return ['users'] as const
}

export function getGetUsersKey() {
  return ['users', '/users'] as const
}

export function useGetUsers<TError = unknown>(options?: {
  swr?: SWRConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey()) : null
  return {
    swrKey,
    ...useSWR<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError
    >(
      swrKey,
      async () => parseResponse(client.users.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUsers<TError = unknown>(options?: {
  swr?: SWRConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey()) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError
    >(
      swrKey,
      async () => parseResponse(client.users.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetUsersInfiniteKey() {
  return ['users', '/users', 'infinite'] as const
}

export function useInfiniteGetUsers<TError = unknown>(options: {
  swr?: SWRInfiniteConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
    TError
  > & {
    swrKey?: (
      index: number,
      previousPageData: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>
      > | null,
    ) => readonly [...ReturnType<typeof getGetUsersInfiniteKey>, number] | null
  }
  options?: ClientRequestOptions
  pagination: { getRequestArgs: (index: number) => InferRequestType<typeof client.users.$get> }
}) {
  const { swr: swrOptions, options: clientOptions, pagination } = options
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetUsersInfiniteKey(), index] as const)
  return useSWRInfinite(
    keyLoader,
    ([, , , index]: readonly [...ReturnType<typeof getGetUsersInfiniteKey>, number]) =>
      parseResponse(client.users.$get(pagination.getRequestArgs(index), clientOptions)),
    restSwrOptions,
  )
}
`)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  describe('swr (no pagination)', () => {
    it('should NOT generate Infinite hooks when x-pagination is absent', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-no-pag-'))
      try {
        const out = path.join(dir, 'index.ts')
        const openAPI = {
          openapi: '3.1.0',
          info: { title: 'Test', version: '1.0.0' },
          paths: {
            '/items': {
              get: {
                summary: 'List',
                // NOTE: deliberately no x-pagination
                responses: { '200': { description: 'OK' } },
              },
            },
          },
        } as OpenAPI
        await runGenerator(hooks(openAPI, out, '../client', 'swr'))
        const code = fs.readFileSync(out, 'utf-8')
        // Assertion: must not contain Infinite-related symbols
        expect(code.includes('Infinite')).toBe(false)
        expect(code.includes('useSWRInfinite')).toBe(false)
        expect(code.includes('swr/infinite')).toBe(false)
        expect(code.includes('SWRInfiniteConfiguration')).toBe(false)
        expect(code.includes('SWRInfiniteKeyLoader')).toBe(false)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  describe('swr (query method)', () => {
    it('treats an OpenAPI 3.2 QUERY operation as a query hook named and keyed by its method', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-query-method-'))
      try {
        const out = path.join(dir, 'index.ts')
        const openAPI = {
          openapi: '3.2.0',
          info: { title: 'Test', version: '1.0.0' },
          paths: {
            '/users': {
              get: {
                summary: 'List users',
                responses: { '200': { description: 'OK' } },
              },
              query: {
                summary: 'Search users',
                description: 'A safe read whose parameters travel in the body.',
                'x-pagination': true,
                requestBody: {
                  required: true,
                  content: { 'application/json': { schema: { type: 'object' } } },
                },
                responses: { '200': { description: 'OK' } },
              },
            },
          },
        } as OpenAPI
        await runGenerator(hooks(openAPI, out, '../client', 'swr'))
        const code = fs.readFileSync(out, 'utf-8')
        expect(code).toBe(`import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration } from 'swr/infinite'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getUsersKey() {
  return ['users'] as const
}

export function getGetUsersKey() {
  return ['users', '/users'] as const
}

export function useGetUsers<TError = unknown>(options?: {
  swr?: SWRConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey()) : null
  return {
    swrKey,
    ...useSWR<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError
    >(
      swrKey,
      async () => parseResponse(client.users.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUsers<TError = unknown>(options?: {
  swr?: SWRConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey()) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError
    >(
      swrKey,
      async () => parseResponse(client.users.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getQueryUsersKey(args: InferRequestType<typeof client.users.$query>) {
  return ['users', '/users', 'QUERY', args] as const
}

export function useQueryUsers<TError = unknown>(
  args: InferRequestType<typeof client.users.$query>,
  options?: {
    swr?: SWRConfiguration<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getQueryUsersKey(args)) : null
  return {
    swrKey,
    ...useSWR<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>>,
      TError
    >(swrKey, async () => parseResponse(client.users.$query(args, clientOptions)), restSwrOptions),
  }
}

export function useImmutableQueryUsers<TError = unknown>(
  args: InferRequestType<typeof client.users.$query>,
  options?: {
    swr?: SWRConfiguration<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getQueryUsersKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>>,
      TError
    >(swrKey, async () => parseResponse(client.users.$query(args, clientOptions)), restSwrOptions),
  }
}

export function getQueryUsersInfiniteKey(args: InferRequestType<typeof client.users.$query>) {
  return ['users', '/users', 'QUERY', 'infinite', args] as const
}

export function useInfiniteQueryUsers<TError = unknown>(
  args: InferRequestType<typeof client.users.$query>,
  options: {
    swr?: SWRInfiniteConfiguration<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>>,
      TError
    > & {
      swrKey?: (
        index: number,
        previousPageData: Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>
        > | null,
      ) => readonly [...ReturnType<typeof getQueryUsersInfiniteKey>, number] | null
    }
    options?: ClientRequestOptions
    pagination: {
      getRequestArgs: (
        args: InferRequestType<typeof client.users.$query>,
        index: number,
      ) => InferRequestType<typeof client.users.$query>
    }
  },
) {
  const { swr: swrOptions, options: clientOptions, pagination } = options
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getQueryUsersInfiniteKey(args), index] as const)
  return useSWRInfinite(
    keyLoader,
    ([, , , , , index]: readonly [...ReturnType<typeof getQueryUsersInfiniteKey>, number]) =>
      parseResponse(client.users.$query(pagination.getRequestArgs(args, index), clientOptions)),
    restSwrOptions,
  )
}
`)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })
})

describe('tanstack-query hooks', () => {
  /** Simple OpenAPI spec for basic tests */
  const openapiSimple = {
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
  } as OpenAPI

  describe('tanstackQuery', () => {
    it('should generate the correct tanstack-query hooks code', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tanstack-query-'))
      try {
        const out = path.join(dir, 'index.ts')
        const result = await runGenerator(hooks(openapiSimple, out, '../client', 'tanstack-query'))

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
  DefaultError,
  QueryClient,
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

export function getHonoQueryOptions<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
  TError = DefaultError,
>(options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getHonoQueryKey>
  >({
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
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getHonoQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getHonoQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseHono<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getHonoQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getHonoQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function getHonoInfiniteQueryKey() {
  return ['hono', '/hono', 'infinite'] as const
}

export function getHonoInfiniteQueryOptions<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>
  >,
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof client.hono.$get>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getHonoInfiniteQueryKey>,
    TPageParam
  >({
    queryKey: getHonoInfiniteQueryKey(),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getHonoInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.hono.$get(pagination.getRequestArgs(pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
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
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof client.hono.$get>
  },
  options?: {
    query?: Omit<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getHonoInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery(
    {
      ...getHonoInfiniteQueryOptions<TData, TError, TPageParam>(pagination, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspenseInfiniteHono<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>
  >,
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof client.hono.$get>
  },
  options?: {
    query?: Omit<
      UseSuspenseInfiniteQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getHonoInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery(
    {
      ...getHonoInfiniteQueryOptions<TData, TError, TPageParam>(pagination, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args] as const
}

export function getUsersQueryOptions<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = DefaultError,
>(args: InferRequestType<typeof client.users.$get>, options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getUsersQueryKey>
  >({
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
  TError = DefaultError,
>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getUsersQueryOptions<TData, TError>(args, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = DefaultError,
>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getUsersQueryOptions<TData, TError>(args, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function getUsersInfiniteQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', 'infinite', args] as const
}

export function getUsersInfiniteQueryOptions<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getUsersInfiniteQueryKey>,
    TPageParam
  >({
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getUsersInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.users.$get(pagination.getRequestArgs(args, pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
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
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options?: {
    query?: Omit<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery(
    {
      ...getUsersInfiniteQueryOptions<TData, TError, TPageParam>(args, pagination, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspenseInfiniteUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options?: {
    query?: Omit<
      UseSuspenseInfiniteQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery(
    {
      ...getUsersInfiniteQueryOptions<TData, TError, TPageParam>(args, pagination, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPostUsersMutationKey() {
  return ['users', '/users', 'POST'] as const
}

export function getPostUsersMutationOptions<TError = DefaultError, TOnMutateResult = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
    TError,
    InferRequestType<typeof client.users.$post>,
    TOnMutateResult
  >({
    mutationKey: getPostUsersMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return parseResponse(client.users.$post(args, options))
    },
  })
}

export function usePostUsers<TError = DefaultError, TOnMutateResult = unknown>(
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
        TError,
        InferRequestType<typeof client.users.$post>,
        TOnMutateResult
      >,
      'mutationFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const mutationDefaults = getPostUsersMutationOptions<TError, TOnMutateResult>(clientOptions)
  return useMutation(
    {
      ...mutationOptions,
      ...mutationDefaults,
      mutationKey: mutationOptions?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}
`

        expect(code).toBe(expected)
        expect(result).toStrictEqual(`Generated tanstack-query hooks written to ${out}`)
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
        const simpleOpenAPI = {
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
        } as OpenAPI

        await runGenerator(
          hooks(simpleOpenAPI, out, '../api', 'tanstack-query', {
            clientName: 'authClient',
          }),
        )

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
  DefaultError,
  QueryClient,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { authClient } from '../api'

export function getUsersKey() {
  return ['users'] as const
}

export function getUsersQueryKey() {
  return ['users', '/users'] as const
}

export function getUsersQueryOptions<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
  >,
  TError = DefaultError,
>(options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getUsersQueryKey>
  >({
    queryKey: getUsersQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        authClient.users.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useUsers<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
  >,
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
        >,
        TError,
        TData,
        ReturnType<typeof getUsersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getUsersQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseUsers<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
  >,
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
        >,
        TError,
        TData,
        ReturnType<typeof getUsersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getUsersQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function getUsersInfiniteQueryKey() {
  return ['users', '/users', 'infinite'] as const
}

export function getUsersInfiniteQueryOptions<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof authClient.users.$get>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getUsersInfiniteQueryKey>,
    TPageParam
  >({
    queryKey: getUsersInfiniteQueryKey(),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getUsersInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        authClient.users.$get(pagination.getRequestArgs(pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfiniteUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof authClient.users.$get>
  },
  options?: {
    query?: Omit<
      UseInfiniteQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
        >,
        TError,
        TData,
        ReturnType<typeof getUsersInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery(
    {
      ...getUsersInfiniteQueryOptions<TData, TError, TPageParam>(pagination, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspenseInfiniteUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof authClient.users.$get>
  },
  options?: {
    query?: Omit<
      UseSuspenseInfiniteQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
        >,
        TError,
        TData,
        ReturnType<typeof getUsersInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery(
    {
      ...getUsersInfiniteQueryOptions<TData, TError, TPageParam>(pagination, clientOptions),
      ...queryOptions,
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

  /** Test OpenAPI spec for operations without arguments */
  const openapiNoArgs = {
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
  } as OpenAPI

  describe('tanstackQuery (no args operations)', () => {
    it('should generate hooks without args correctly', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tanstack-query-noargs-'))
      try {
        const out = path.join(dir, 'index.ts')
        await runGenerator(hooks(openapiNoArgs, out, '../client', 'tanstack-query'))

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
  DefaultError,
  QueryClient,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getPingKey() {
  return ['ping'] as const
}

export function getPingQueryKey() {
  return ['ping', '/ping'] as const
}

export function getPingQueryOptions<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
  TError = DefaultError,
>(options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getPingQueryKey>
  >({
    queryKey: getPingQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.ping.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function usePing<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getPingQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getPingQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspensePing<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getPingQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getPingQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function getPingInfiniteQueryKey() {
  return ['ping', '/ping', 'infinite'] as const
}

export function getPingInfiniteQueryOptions<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof client.ping.$get>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getPingInfiniteQueryKey>,
    TPageParam
  >({
    queryKey: getPingInfiniteQueryKey(),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getPingInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.ping.$get(pagination.getRequestArgs(pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfinitePing<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof client.ping.$get>
  },
  options?: {
    query?: Omit<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getPingInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery(
    {
      ...getPingInfiniteQueryOptions<TData, TError, TPageParam>(pagination, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspenseInfinitePing<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof client.ping.$get>
  },
  options?: {
    query?: Omit<
      UseSuspenseInfiniteQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getPingInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery(
    {
      ...getPingInfiniteQueryOptions<TData, TError, TPageParam>(pagination, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPostPingMutationKey() {
  return ['ping', '/ping', 'POST'] as const
}

export function getPostPingMutationOptions<TError = DefaultError, TOnMutateResult = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$post>>>>>,
    TError,
    void,
    TOnMutateResult
  >({
    mutationKey: getPostPingMutationKey(),
    async mutationFn() {
      return parseResponse(client.ping.$post(undefined, options))
    },
  })
}

export function usePostPing<TError = DefaultError, TOnMutateResult = unknown>(
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$post>>>>>,
        TError,
        void,
        TOnMutateResult
      >,
      'mutationFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const mutationDefaults = getPostPingMutationOptions<TError, TOnMutateResult>(clientOptions)
  return useMutation(
    {
      ...mutationOptions,
      ...mutationDefaults,
      mutationKey: mutationOptions?.mutationKey ?? mutationDefaults.mutationKey,
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

  describe('tanstackQuery (path with special characters)', () => {
    it('should generate hooks for hyphenated paths', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tanstack-query-hyphen-'))
      try {
        const out = path.join(dir, 'index.ts')
        const hyphenOpenAPI = {
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
        } as OpenAPI

        await runGenerator(hooks(hyphenOpenAPI, out, '../client', 'tanstack-query'))

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
  DefaultError,
  QueryClient,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getHonoXKey() {
  return ['hono-x'] as const
}

export function getHonoXQueryKey() {
  return ['hono-x', '/hono-x'] as const
}

export function getHonoXQueryOptions<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
  >,
  TError = DefaultError,
>(options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
    >,
    TError,
    TData,
    ReturnType<typeof getHonoXQueryKey>
  >({
    queryKey: getHonoXQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client['hono-x'].$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useHonoX<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
  >,
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
        >,
        TError,
        TData,
        ReturnType<typeof getHonoXQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getHonoXQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseHonoX<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
  >,
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
        >,
        TError,
        TData,
        ReturnType<typeof getHonoXQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getHonoXQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function getHonoXInfiniteQueryKey() {
  return ['hono-x', '/hono-x', 'infinite'] as const
}

export function getHonoXInfiniteQueryOptions<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
    >
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<(typeof client)['hono-x']['$get']>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
    >,
    TError,
    TData,
    ReturnType<typeof getHonoXInfiniteQueryKey>,
    TPageParam
  >({
    queryKey: getHonoXInfiniteQueryKey(),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getHonoXInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client['hono-x'].$get(pagination.getRequestArgs(pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfiniteHonoX<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
    >
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<(typeof client)['hono-x']['$get']>
  },
  options?: {
    query?: Omit<
      UseInfiniteQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
        >,
        TError,
        TData,
        ReturnType<typeof getHonoXInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery(
    {
      ...getHonoXInfiniteQueryOptions<TData, TError, TPageParam>(pagination, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspenseInfiniteHonoX<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
    >
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<(typeof client)['hono-x']['$get']>
  },
  options?: {
    query?: Omit<
      UseSuspenseInfiniteQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
        >,
        TError,
        TData,
        ReturnType<typeof getHonoXInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery(
    {
      ...getHonoXInfiniteQueryOptions<TData, TError, TPageParam>(pagination, clientOptions),
      ...queryOptions,
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

  describe('tanstackQuery (path parameters)', () => {
    it('should generate hooks for path with parameters', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tanstack-query-params-'))
      try {
        const out = path.join(dir, 'index.ts')
        const paramOpenAPI = {
          openapi: '3.0.3',
          info: { title: 'Test', version: '1.0.0' },
          paths: {
            '/users/{id}': {
              get: {
                'x-pagination': true,
                summary: 'Get user',
                parameters: [
                  { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
                ],
                responses: { '200': { description: 'OK' } },
              },
              delete: {
                summary: 'Delete user',
                parameters: [
                  { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
                ],
                responses: { '204': { description: 'Deleted' } },
              },
            },
          },
        } as OpenAPI

        await runGenerator(hooks(paramOpenAPI, out, '../client', 'tanstack-query'))

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
  DefaultError,
  QueryClient,
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

export function getUsersIdQueryOptions<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
  >,
  TError = DefaultError,
>(args: InferRequestType<(typeof client.users)[':id']['$get']>, options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
    >,
    TError,
    TData,
    ReturnType<typeof getUsersIdQueryKey>
  >({
    queryKey: getUsersIdQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.users[':id'].$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useUsersId<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
  >,
  TError = DefaultError,
>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>
          >
        >,
        TError,
        TData,
        ReturnType<typeof getUsersIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getUsersIdQueryOptions<TData, TError>(args, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseUsersId<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
  >,
  TError = DefaultError,
>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>
          >
        >,
        TError,
        TData,
        ReturnType<typeof getUsersIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getUsersIdQueryOptions<TData, TError>(args, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function getUsersIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
) {
  return ['users', '/users/:id', 'infinite', args] as const
}

export function getUsersIdInfiniteQueryOptions<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
    >
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<(typeof client.users)[':id']['$get']>,
      pageParam: unknown,
    ) => InferRequestType<(typeof client.users)[':id']['$get']>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
    >,
    TError,
    TData,
    ReturnType<typeof getUsersIdInfiniteQueryKey>,
    TPageParam
  >({
    queryKey: getUsersIdInfiniteQueryKey(args),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getUsersIdInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.users[':id'].$get(pagination.getRequestArgs(args, pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfiniteUsersId<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
    >
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<(typeof client.users)[':id']['$get']>,
      pageParam: unknown,
    ) => InferRequestType<(typeof client.users)[':id']['$get']>
  },
  options?: {
    query?: Omit<
      UseInfiniteQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>
          >
        >,
        TError,
        TData,
        ReturnType<typeof getUsersIdInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery(
    {
      ...getUsersIdInfiniteQueryOptions<TData, TError, TPageParam>(args, pagination, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspenseInfiniteUsersId<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
    >
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<(typeof client.users)[':id']['$get']>,
      pageParam: unknown,
    ) => InferRequestType<(typeof client.users)[':id']['$get']>
  },
  options?: {
    query?: Omit<
      UseSuspenseInfiniteQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>
          >
        >,
        TError,
        TData,
        ReturnType<typeof getUsersIdInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery(
    {
      ...getUsersIdInfiniteQueryOptions<TData, TError, TPageParam>(args, pagination, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getDeleteUsersIdMutationKey() {
  return ['users', '/users/:id', 'DELETE'] as const
}

export function getDeleteUsersIdMutationOptions<TError = DefaultError, TOnMutateResult = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$delete']>>>
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.users)[':id']['$delete']>,
    TOnMutateResult
  >({
    mutationKey: getDeleteUsersIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$delete']>) {
      return parseResponse(client.users[':id'].$delete(args, options))
    },
  })
}

export function useDeleteUsersId<TError = DefaultError, TOnMutateResult = unknown>(
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$delete']>>>
            >
          >
        | undefined,
        TError,
        InferRequestType<(typeof client.users)[':id']['$delete']>,
        TOnMutateResult
      >,
      'mutationFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const mutationDefaults = getDeleteUsersIdMutationOptions<TError, TOnMutateResult>(clientOptions)
  return useMutation(
    {
      ...mutationOptions,
      ...mutationDefaults,
      mutationKey: mutationOptions?.mutationKey ?? mutationDefaults.mutationKey,
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

        const error = await runGeneratorError(
          hooks(invalidOpenAPI, out, '../client', 'tanstack-query'),
        )
        expect(error.message).toBe('Invalid OpenAPI paths')
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  describe('tanstackQuery (header parameters excluded from query key)', () => {
    it('omits header field from queryKey arg across query/suspense/infinite hooks', async () => {
      const spec = {
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
      } as OpenAPI
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tq-header-'))
      try {
        const out = path.join(dir, 'index.ts')
        await expect(
          runGenerator(hooks(spec, out, '../client', 'tanstack-query')),
        ).resolves.toBeDefined()
        const code = fs.readFileSync(out, 'utf-8')
        expect(code).toBe(`import {
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
  DefaultError,
  QueryClient,
} from '@tanstack/react-query'
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

export function getUsersQueryOptions<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = DefaultError,
>(args: InferRequestType<typeof client.users.$get>, options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getUsersQueryKey>
  >({
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
  TError = DefaultError,
>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getUsersQueryOptions<TData, TError>(args, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = DefaultError,
>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getUsersQueryOptions<TData, TError>(args, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function getUsersInfiniteQueryKey(args: InferRequestType<typeof client.users.$get>) {
  const { header: _, ...keyArgs } = args
  return ['users', '/users', 'infinite', keyArgs] as const
}

export function getUsersInfiniteQueryOptions<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getUsersInfiniteQueryKey>,
    TPageParam
  >({
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getUsersInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.users.$get(pagination.getRequestArgs(args, pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
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
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options?: {
    query?: Omit<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery(
    {
      ...getUsersInfiniteQueryOptions<TData, TError, TPageParam>(args, pagination, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspenseInfiniteUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options?: {
    query?: Omit<
      UseSuspenseInfiniteQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery(
    {
      ...getUsersInfiniteQueryOptions<TData, TError, TPageParam>(args, pagination, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}
`)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  describe('tanstack-query (query method)', () => {
    it('treats an OpenAPI 3.2 QUERY operation as a query hook named and keyed by its method', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tanstack-query-method-'))
      try {
        const out = path.join(dir, 'index.ts')
        const openAPI = {
          openapi: '3.2.0',
          info: { title: 'Test', version: '1.0.0' },
          paths: {
            '/users': {
              get: {
                summary: 'List users',
                responses: { '200': { description: 'OK' } },
              },
              query: {
                summary: 'Search users',
                description: 'A safe read whose parameters travel in the body.',
                'x-pagination': true,
                requestBody: {
                  required: true,
                  content: { 'application/json': { schema: { type: 'object' } } },
                },
                responses: { '200': { description: 'OK' } },
              },
            },
          },
        } as OpenAPI
        await runGenerator(hooks(openAPI, out, '../client', 'tanstack-query'))
        const code = fs.readFileSync(out, 'utf-8')
        expect(code).toBe(`import {
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
  DefaultError,
  QueryClient,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getUsersKey() {
  return ['users'] as const
}

export function getUsersQueryKey() {
  return ['users', '/users'] as const
}

export function getUsersQueryOptions<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = DefaultError,
>(options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getUsersQueryKey>
  >({
    queryKey: getUsersQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.users.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getUsersQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getUsersQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function getQueryUsersQueryKey(args: InferRequestType<typeof client.users.$query>) {
  return ['users', '/users', 'QUERY', args] as const
}

export function getQueryUsersQueryOptions<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>
  >,
  TError = DefaultError,
>(args: InferRequestType<typeof client.users.$query>, options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>>,
    TError,
    TData,
    ReturnType<typeof getQueryUsersQueryKey>
  >({
    queryKey: getQueryUsersQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.users.$query(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useQueryUsers<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>
  >,
  TError = DefaultError,
>(
  args: InferRequestType<typeof client.users.$query>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>>,
        TError,
        TData,
        ReturnType<typeof getQueryUsersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getQueryUsersQueryOptions<TData, TError>(args, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseQueryUsers<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>
  >,
  TError = DefaultError,
>(
  args: InferRequestType<typeof client.users.$query>,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>>,
        TError,
        TData,
        ReturnType<typeof getQueryUsersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getQueryUsersQueryOptions<TData, TError>(args, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function getQueryUsersInfiniteQueryKey(args: InferRequestType<typeof client.users.$query>) {
  return ['users', '/users', 'QUERY', 'infinite', args] as const
}

export function getQueryUsersInfiniteQueryOptions<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>>
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  args: InferRequestType<typeof client.users.$query>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$query>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$query>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>>,
    TError,
    TData,
    ReturnType<typeof getQueryUsersInfiniteQueryKey>,
    TPageParam
  >({
    queryKey: getQueryUsersInfiniteQueryKey(args),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getQueryUsersInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.users.$query(pagination.getRequestArgs(args, pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfiniteQueryUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>>
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  args: InferRequestType<typeof client.users.$query>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$query>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$query>
  },
  options?: {
    query?: Omit<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>>,
        TError,
        TData,
        ReturnType<typeof getQueryUsersInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery(
    {
      ...getQueryUsersInfiniteQueryOptions<TData, TError, TPageParam>(
        args,
        pagination,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspenseInfiniteQueryUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>>
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  args: InferRequestType<typeof client.users.$query>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$query>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$query>
  },
  options?: {
    query?: Omit<
      UseSuspenseInfiniteQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$query>>>>>,
        TError,
        TData,
        ReturnType<typeof getQueryUsersInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery(
    {
      ...getQueryUsersInfiniteQueryOptions<TData, TError, TPageParam>(
        args,
        pagination,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}
`)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })
})

describe('preact-query hooks', () => {
  /** Simple OpenAPI spec for basic tests */
  const openapiSimple = {
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
  } as OpenAPI

  describe('preactQuery', () => {
    it('should generate the correct preact-query hooks code', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-preact-query-'))
      try {
        const out = path.join(dir, 'index.ts')
        const result = await runGenerator(hooks(openapiSimple, out, '../client', 'preact-query'))

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
  DefaultError,
  QueryClient,
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

export function getHonoQueryOptions<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
  TError = DefaultError,
>(options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getHonoQueryKey>
  >({
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
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getHonoQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getHonoQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseHono<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getHonoQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getHonoQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function getHonoInfiniteQueryKey() {
  return ['hono', '/hono', 'infinite'] as const
}

export function getHonoInfiniteQueryOptions<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>
  >,
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof client.hono.$get>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getHonoInfiniteQueryKey>,
    TPageParam
  >({
    queryKey: getHonoInfiniteQueryKey(),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getHonoInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.hono.$get(pagination.getRequestArgs(pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
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
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof client.hono.$get>
  },
  options?: {
    query?: Omit<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getHonoInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery(
    {
      ...getHonoInfiniteQueryOptions<TData, TError, TPageParam>(pagination, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspenseInfiniteHono<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>
  >,
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof client.hono.$get>
  },
  options?: {
    query?: Omit<
      UseSuspenseInfiniteQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getHonoInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery(
    {
      ...getHonoInfiniteQueryOptions<TData, TError, TPageParam>(pagination, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args] as const
}

export function getUsersQueryOptions<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = DefaultError,
>(args: InferRequestType<typeof client.users.$get>, options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getUsersQueryKey>
  >({
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
  TError = DefaultError,
>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getUsersQueryOptions<TData, TError>(args, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = DefaultError,
>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getUsersQueryOptions<TData, TError>(args, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function getUsersInfiniteQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', 'infinite', args] as const
}

export function getUsersInfiniteQueryOptions<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getUsersInfiniteQueryKey>,
    TPageParam
  >({
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getUsersInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.users.$get(pagination.getRequestArgs(args, pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
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
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options?: {
    query?: Omit<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery(
    {
      ...getUsersInfiniteQueryOptions<TData, TError, TPageParam>(args, pagination, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspenseInfiniteUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options?: {
    query?: Omit<
      UseSuspenseInfiniteQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery(
    {
      ...getUsersInfiniteQueryOptions<TData, TError, TPageParam>(args, pagination, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getPostUsersMutationKey() {
  return ['users', '/users', 'POST'] as const
}

export function getPostUsersMutationOptions<TError = DefaultError, TOnMutateResult = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
    TError,
    InferRequestType<typeof client.users.$post>,
    TOnMutateResult
  >({
    mutationKey: getPostUsersMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return parseResponse(client.users.$post(args, options))
    },
  })
}

export function usePostUsers<TError = DefaultError, TOnMutateResult = unknown>(
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
        TError,
        InferRequestType<typeof client.users.$post>,
        TOnMutateResult
      >,
      'mutationFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const mutationDefaults = getPostUsersMutationOptions<TError, TOnMutateResult>(clientOptions)
  return useMutation(
    {
      ...mutationOptions,
      ...mutationDefaults,
      mutationKey: mutationOptions?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}
`

        expect(code).toBe(expected)
        expect(result).toStrictEqual(`Generated preact-query hooks written to ${out}`)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  describe('preactQuery (header parameters excluded from query key)', () => {
    it('omits header field from queryKey arg across query/suspense/infinite hooks', async () => {
      const spec = {
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
      } as OpenAPI
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-pq-header-'))
      try {
        const out = path.join(dir, 'index.ts')
        await runGenerator(hooks(spec, out, '../client', 'preact-query'))
        const code = fs.readFileSync(out, 'utf-8')
        expect(code).toBe(`import {
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
  DefaultError,
  QueryClient,
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

export function getUsersQueryOptions<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = DefaultError,
>(args: InferRequestType<typeof client.users.$get>, options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getUsersQueryKey>
  >({
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
  TError = DefaultError,
>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getUsersQueryOptions<TData, TError>(args, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = DefaultError,
>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getUsersQueryOptions<TData, TError>(args, clientOptions), ...queryOptions },
    queryClient,
  )
}

export function getUsersInfiniteQueryKey(args: InferRequestType<typeof client.users.$get>) {
  const { header: _, ...keyArgs } = args
  return ['users', '/users', 'infinite', keyArgs] as const
}

export function getUsersInfiniteQueryOptions<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getUsersInfiniteQueryKey>,
    TPageParam
  >({
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getUsersInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.users.$get(pagination.getRequestArgs(args, pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
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
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options?: {
    query?: Omit<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery(
    {
      ...getUsersInfiniteQueryOptions<TData, TError, TPageParam>(args, pagination, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspenseInfiniteUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options?: {
    query?: Omit<
      UseSuspenseInfiniteQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery(
    {
      ...getUsersInfiniteQueryOptions<TData, TError, TPageParam>(args, pagination, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}
`)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })
})

describe('solid-query hooks', () => {
  const openapiSimple = {
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
  } as OpenAPI

  describe('solidQuery', () => {
    it('should generate the correct solid-query hooks code', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-solid-query-'))
      try {
        const out = path.join(dir, 'index.ts')
        const result = await runGenerator(hooks(openapiSimple, out, '../client', 'solid-query'))

        const code = fs.readFileSync(out, 'utf-8')
        const expected = `import {
  createQuery,
  createInfiniteQuery,
  createMutation,
  queryOptions,
  infiniteQueryOptions,
  mutationOptions,
} from '@tanstack/solid-query'
import type {
  UndefinedInitialDataOptions,
  QueryFunctionContext,
  UndefinedInitialDataInfiniteOptions,
  InfiniteData,
  CreateMutationOptions,
  DefaultError,
  QueryClient,
} from '@tanstack/solid-query'
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

export function getHonoQueryOptions<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
  TError = DefaultError,
>(options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getHonoQueryKey>
  >({
    queryKey: getHonoQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.hono.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function createHono<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
  TError = DefaultError,
>(
  options?: () => {
    query?: Omit<
      ReturnType<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
          TError,
          TData,
          ReturnType<typeof getHonoQueryKey>
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getHonoQueryOptions<TData, TError>(clientOptions), ...query }
  }, queryClient)
}

export function getUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args] as const
}

export function getUsersQueryOptions<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = DefaultError,
>(args: InferRequestType<typeof client.users.$get>, options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getUsersQueryKey>
  >({
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.users.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function createUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = DefaultError,
>(
  args: () => InferRequestType<typeof client.users.$get>,
  options?: () => {
    query?: Omit<
      ReturnType<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
          TError,
          TData,
          ReturnType<typeof getUsersQueryKey>
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getUsersQueryOptions<TData, TError>(args(), clientOptions), ...query }
  }, queryClient)
}

export function getUsersInfiniteQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', 'infinite', args] as const
}

export function getUsersInfiniteQueryOptions<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getUsersInfiniteQueryKey>,
    TPageParam
  >({
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getUsersInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.users.$get(pagination.getRequestArgs(args, pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function createInfiniteUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options?: () => {
    query?: Omit<
      ReturnType<
        UndefinedInitialDataInfiniteOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
          TError,
          TData,
          ReturnType<typeof getUsersInfiniteQueryKey>,
          TPageParam
        >
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getUsersInfiniteQueryOptions<TData, TError, TPageParam>(args(), pagination, clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getPostUsersMutationKey() {
  return ['users', '/users', 'POST'] as const
}

export function getPostUsersMutationOptions<TError = DefaultError, TOnMutateResult = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
    TError,
    InferRequestType<typeof client.users.$post>,
    TOnMutateResult
  >({
    mutationKey: getPostUsersMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return parseResponse(client.users.$post(args, options))
    },
  })
}

export function createPostUsers<TError = DefaultError, TOnMutateResult = unknown>(
  options?: () => {
    mutation?: Omit<
      ReturnType<
        CreateMutationOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
          TError,
          InferRequestType<typeof client.users.$post>,
          TOnMutateResult
        >
      >,
      'mutationFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    const mutationDefaults = getPostUsersMutationOptions<TError, TOnMutateResult>(clientOptions)
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}
`

        expect(code).toBe(expected)
        expect(result).toStrictEqual(`Generated solid-query hooks written to ${out}`)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })
})

describe('vue-query hooks', () => {
  /** Simple OpenAPI spec for basic tests */
  const openapiSimple = {
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
  } as OpenAPI

  describe('vueQuery', () => {
    it('should generate the correct vue-query hooks code', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-vue-query-'))
      try {
        const out = path.join(dir, 'index.ts')
        const result = await runGenerator(hooks(openapiSimple, out, '../client', 'vue-query'))

        const code = fs.readFileSync(out, 'utf-8')
        const expected = `import { useQuery, useInfiniteQuery, useMutation, mutationOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  InfiniteData,
  UseMutationOptions,
  DefaultError,
  QueryClient,
} from '@tanstack/vue-query'
import { computed, toValue } from 'vue'
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

export function getHonoQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getHonoQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.hono.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useHono<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
          TError,
          TData,
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
          ReturnType<typeof getHonoQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getHonoQueryKey(),
      queryFn({ signal }) {
        return parseResponse(
          client.hono.$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    },
    queryClient,
  )
}

export function getHonoInfiniteQueryKey() {
  return ['hono', '/hono', 'infinite'] as const
}

export function getHonoInfiniteQueryOptions<TPageParam = unknown>(
  pagination: { getRequestArgs: (pageParam: unknown) => InferRequestType<typeof client.hono.$get> },
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getHonoInfiniteQueryKey(),
    queryFn({ pageParam, signal }: QueryFunctionContext<readonly unknown[], TPageParam>) {
      return parseResponse(
        client.hono.$get(pagination.getRequestArgs(pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useInfiniteHono<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  pagination: { getRequestArgs: (pageParam: unknown) => InferRequestType<typeof client.hono.$get> },
  options: {
    query: Omit<
      Extract<
        UseInfiniteQueryOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
          TError,
          TData,
          ReturnType<typeof getHonoInfiniteQueryKey>,
          TPageParam
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery(
    {
      ...queryOptions,
      queryKey: getHonoInfiniteQueryKey(),
      queryFn({ pageParam, signal }) {
        return parseResponse(
          client.hono.$get(pagination.getRequestArgs(pageParam), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    },
    queryClient,
  )
}

export function getUsersQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', '/users', toValue(args)] as const
}

export function getUsersQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: computed(() => getUsersQueryKey(args)),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users.$get(toValue(args), { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = DefaultError,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
          TError,
          TData,
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
          ReturnType<typeof getUsersQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getUsersQueryKey(args)),
      queryFn({ signal }) {
        return parseResponse(
          client.users.$get(toValue(args), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    },
    queryClient,
  )
}

export function getUsersInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', '/users', 'infinite', toValue(args)] as const
}

export function getUsersInfiniteQueryOptions<TPageParam = unknown>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  pagination: {
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options?: ClientRequestOptions,
) {
  return {
    queryKey: computed(() => getUsersInfiniteQueryKey(args)),
    queryFn({ pageParam, signal }: QueryFunctionContext<readonly unknown[], TPageParam>) {
      return parseResponse(
        client.users.$get(pagination.getRequestArgs(toValue(args), pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useInfiniteUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  pagination: {
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options: {
    query: Omit<
      Extract<
        UseInfiniteQueryOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
          TError,
          TData,
          ReturnType<typeof getUsersInfiniteQueryKey>,
          TPageParam
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getUsersInfiniteQueryKey(args)),
      queryFn({ pageParam, signal }) {
        return parseResponse(
          client.users.$get(pagination.getRequestArgs(toValue(args), pageParam), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    },
    queryClient,
  )
}

export function getPostUsersMutationKey() {
  return ['users', '/users', 'POST'] as const
}

export function getPostUsersMutationOptions<TError = DefaultError, TOnMutateResult = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
    TError,
    InferRequestType<typeof client.users.$post>,
    TOnMutateResult
  >({
    mutationKey: getPostUsersMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return parseResponse(client.users.$post(args, options))
    },
  })
}

export function usePostUsers<TError = DefaultError, TOnMutateResult = unknown>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
          TError,
          InferRequestType<typeof client.users.$post>,
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const mutationDefaults = getPostUsersMutationOptions<TError, TOnMutateResult>(clientOptions)
  return useMutation(
    {
      ...mutationOptions,
      ...mutationDefaults,
      mutationKey: mutationOptions?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}
`

        expect(code).toBe(expected)
        expect(result).toStrictEqual(`Generated vue-query hooks written to ${out}`)
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
        const simpleOpenAPI = {
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
        } as OpenAPI

        await runGenerator(
          hooks(simpleOpenAPI, out, '../api', 'vue-query', {
            clientName: 'authClient',
          }),
        )

        const code = fs.readFileSync(out, 'utf-8')
        const expected = `import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  InfiniteData,
  DefaultError,
  QueryClient,
} from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { authClient } from '../api'

export function getUsersKey() {
  return ['users'] as const
}

export function getUsersQueryKey() {
  return ['users', '/users'] as const
}

export function getUsersQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getUsersQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        authClient.users.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useUsers<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
  >,
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
          >,
          TError,
          TData,
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
          >,
          ReturnType<typeof getUsersQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getUsersQueryKey(),
      queryFn({ signal }) {
        return parseResponse(
          authClient.users.$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    },
    queryClient,
  )
}

export function getUsersInfiniteQueryKey() {
  return ['users', '/users', 'infinite'] as const
}

export function getUsersInfiniteQueryOptions<TPageParam = unknown>(
  pagination: {
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof authClient.users.$get>
  },
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersInfiniteQueryKey(),
    queryFn({ pageParam, signal }: QueryFunctionContext<readonly unknown[], TPageParam>) {
      return parseResponse(
        authClient.users.$get(pagination.getRequestArgs(pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useInfiniteUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  pagination: {
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof authClient.users.$get>
  },
  options: {
    query: Omit<
      Extract<
        UseInfiniteQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
          >,
          TError,
          TData,
          ReturnType<typeof getUsersInfiniteQueryKey>,
          TPageParam
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery(
    {
      ...queryOptions,
      queryKey: getUsersInfiniteQueryKey(),
      queryFn({ pageParam, signal }) {
        return parseResponse(
          authClient.users.$get(pagination.getRequestArgs(pageParam), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
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

  /** Test OpenAPI spec for operations without arguments */
  const openapiNoArgs = {
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
  } as OpenAPI

  describe('vueQuery (no args operations)', () => {
    it('should generate hooks without args correctly', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-vue-query-noargs-'))
      try {
        const out = path.join(dir, 'index.ts')
        await runGenerator(hooks(openapiNoArgs, out, '../client', 'vue-query'))

        const code = fs.readFileSync(out, 'utf-8')
        const expected = `import { useQuery, useInfiniteQuery, useMutation, mutationOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  InfiniteData,
  UseMutationOptions,
  DefaultError,
  QueryClient,
} from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getPingKey() {
  return ['ping'] as const
}

export function getPingQueryKey() {
  return ['ping', '/ping'] as const
}

export function getPingQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getPingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.ping.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function usePing<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
          TError,
          TData,
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
          ReturnType<typeof getPingQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getPingQueryKey(),
      queryFn({ signal }) {
        return parseResponse(
          client.ping.$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    },
    queryClient,
  )
}

export function getPingInfiniteQueryKey() {
  return ['ping', '/ping', 'infinite'] as const
}

export function getPingInfiniteQueryOptions<TPageParam = unknown>(
  pagination: { getRequestArgs: (pageParam: unknown) => InferRequestType<typeof client.ping.$get> },
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPingInfiniteQueryKey(),
    queryFn({ pageParam, signal }: QueryFunctionContext<readonly unknown[], TPageParam>) {
      return parseResponse(
        client.ping.$get(pagination.getRequestArgs(pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useInfinitePing<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  pagination: { getRequestArgs: (pageParam: unknown) => InferRequestType<typeof client.ping.$get> },
  options: {
    query: Omit<
      Extract<
        UseInfiniteQueryOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
          TError,
          TData,
          ReturnType<typeof getPingInfiniteQueryKey>,
          TPageParam
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery(
    {
      ...queryOptions,
      queryKey: getPingInfiniteQueryKey(),
      queryFn({ pageParam, signal }) {
        return parseResponse(
          client.ping.$get(pagination.getRequestArgs(pageParam), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    },
    queryClient,
  )
}

export function getPostPingMutationKey() {
  return ['ping', '/ping', 'POST'] as const
}

export function getPostPingMutationOptions<TError = DefaultError, TOnMutateResult = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$post>>>>>,
    TError,
    void,
    TOnMutateResult
  >({
    mutationKey: getPostPingMutationKey(),
    async mutationFn() {
      return parseResponse(client.ping.$post(undefined, options))
    },
  })
}

export function usePostPing<TError = DefaultError, TOnMutateResult = unknown>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$post>>>>>,
          TError,
          void,
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const mutationDefaults = getPostPingMutationOptions<TError, TOnMutateResult>(clientOptions)
  return useMutation(
    {
      ...mutationOptions,
      ...mutationDefaults,
      mutationKey: mutationOptions?.mutationKey ?? mutationDefaults.mutationKey,
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

  describe('vueQuery (path with special characters)', () => {
    it('should generate hooks for hyphenated paths', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-vue-query-hyphen-'))
      try {
        const out = path.join(dir, 'index.ts')
        const hyphenOpenAPI = {
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
        } as OpenAPI

        await runGenerator(hooks(hyphenOpenAPI, out, '../client', 'vue-query'))

        const code = fs.readFileSync(out, 'utf-8')
        const expected = `import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  InfiniteData,
  DefaultError,
  QueryClient,
} from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getHonoXKey() {
  return ['hono-x'] as const
}

export function getHonoXQueryKey() {
  return ['hono-x', '/hono-x'] as const
}

export function getHonoXQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getHonoXQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['hono-x'].$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useHonoX<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
  >,
  TError = DefaultError,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
          >,
          TError,
          TData,
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
          >,
          ReturnType<typeof getHonoXQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getHonoXQueryKey(),
      queryFn({ signal }) {
        return parseResponse(
          client['hono-x'].$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    },
    queryClient,
  )
}

export function getHonoXInfiniteQueryKey() {
  return ['hono-x', '/hono-x', 'infinite'] as const
}

export function getHonoXInfiniteQueryOptions<TPageParam = unknown>(
  pagination: {
    getRequestArgs: (pageParam: unknown) => InferRequestType<(typeof client)['hono-x']['$get']>
  },
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getHonoXInfiniteQueryKey(),
    queryFn({ pageParam, signal }: QueryFunctionContext<readonly unknown[], TPageParam>) {
      return parseResponse(
        client['hono-x'].$get(pagination.getRequestArgs(pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useInfiniteHonoX<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
    >
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  pagination: {
    getRequestArgs: (pageParam: unknown) => InferRequestType<(typeof client)['hono-x']['$get']>
  },
  options: {
    query: Omit<
      Extract<
        UseInfiniteQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
          >,
          TError,
          TData,
          ReturnType<typeof getHonoXInfiniteQueryKey>,
          TPageParam
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery(
    {
      ...queryOptions,
      queryKey: getHonoXInfiniteQueryKey(),
      queryFn({ pageParam, signal }) {
        return parseResponse(
          client['hono-x'].$get(pagination.getRequestArgs(pageParam), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
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

  describe('vueQuery (path parameters)', () => {
    it('should generate hooks for path with parameters', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-vue-query-params-'))
      try {
        const out = path.join(dir, 'index.ts')
        const paramOpenAPI = {
          openapi: '3.0.3',
          info: { title: 'Test', version: '1.0.0' },
          paths: {
            '/users/{id}': {
              get: {
                'x-pagination': true,
                summary: 'Get user',
                parameters: [
                  { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
                ],
                responses: { '200': { description: 'OK' } },
              },
              delete: {
                summary: 'Delete user',
                parameters: [
                  { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
                ],
                responses: { '204': { description: 'Deleted' } },
              },
            },
          },
        } as OpenAPI

        await runGenerator(hooks(paramOpenAPI, out, '../client', 'vue-query'))

        const code = fs.readFileSync(out, 'utf-8')
        const expected = `import { useQuery, useInfiniteQuery, useMutation, mutationOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  InfiniteData,
  UseMutationOptions,
  DefaultError,
  QueryClient,
} from '@tanstack/vue-query'
import { computed, toValue } from 'vue'
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
  return ['users', '/users/:id', toValue(args)] as const
}

export function getUsersIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: computed(() => getUsersIdQueryKey(args)),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users[':id'].$get(toValue(args), { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useUsersId<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
  >,
  TError = DefaultError,
>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>
            >
          >,
          TError,
          TData,
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>
            >
          >,
          ReturnType<typeof getUsersIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getUsersIdQueryKey(args)),
      queryFn({ signal }) {
        return parseResponse(
          client.users[':id'].$get(toValue(args), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    },
    queryClient,
  )
}

export function getUsersIdInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
) {
  return ['users', '/users/:id', 'infinite', toValue(args)] as const
}

export function getUsersIdInfiniteQueryOptions<TPageParam = unknown>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  pagination: {
    getRequestArgs: (
      args: InferRequestType<(typeof client.users)[':id']['$get']>,
      pageParam: unknown,
    ) => InferRequestType<(typeof client.users)[':id']['$get']>
  },
  options?: ClientRequestOptions,
) {
  return {
    queryKey: computed(() => getUsersIdInfiniteQueryKey(args)),
    queryFn({ pageParam, signal }: QueryFunctionContext<readonly unknown[], TPageParam>) {
      return parseResponse(
        client.users[':id'].$get(pagination.getRequestArgs(toValue(args), pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useInfiniteUsersId<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
    >
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  pagination: {
    getRequestArgs: (
      args: InferRequestType<(typeof client.users)[':id']['$get']>,
      pageParam: unknown,
    ) => InferRequestType<(typeof client.users)[':id']['$get']>
  },
  options: {
    query: Omit<
      Extract<
        UseInfiniteQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>
            >
          >,
          TError,
          TData,
          ReturnType<typeof getUsersIdInfiniteQueryKey>,
          TPageParam
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getUsersIdInfiniteQueryKey(args)),
      queryFn({ pageParam, signal }) {
        return parseResponse(
          client.users[':id'].$get(pagination.getRequestArgs(toValue(args), pageParam), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    },
    queryClient,
  )
}

export function getDeleteUsersIdMutationKey() {
  return ['users', '/users/:id', 'DELETE'] as const
}

export function getDeleteUsersIdMutationOptions<TError = DefaultError, TOnMutateResult = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$delete']>>>
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.users)[':id']['$delete']>,
    TOnMutateResult
  >({
    mutationKey: getDeleteUsersIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$delete']>) {
      return parseResponse(client.users[':id'].$delete(args, options))
    },
  })
}

export function useDeleteUsersId<TError = DefaultError, TOnMutateResult = unknown>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          | Awaited<
              ReturnType<
                typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$delete']>>>
              >
            >
          | undefined,
          TError,
          InferRequestType<(typeof client.users)[':id']['$delete']>,
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const mutationDefaults = getDeleteUsersIdMutationOptions<TError, TOnMutateResult>(clientOptions)
  return useMutation(
    {
      ...mutationOptions,
      ...mutationDefaults,
      mutationKey: mutationOptions?.mutationKey ?? mutationDefaults.mutationKey,
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

        const error = await runGeneratorError(hooks(invalidOpenAPI, out, '../client', 'vue-query'))
        expect(error.message).toBe('Invalid OpenAPI paths')
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
        const putPatchOpenAPI = {
          openapi: '3.0.3',
          info: { title: 'Test', version: '1.0.0' },
          paths: {
            '/users/{id}': {
              put: {
                summary: 'Replace user',
                parameters: [
                  { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
                ],
                requestBody: {
                  required: true,
                  content: { 'application/json': { schema: { type: 'object' } } },
                },
                responses: { '200': { description: 'OK' } },
              },
              patch: {
                summary: 'Update user',
                parameters: [
                  { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
                ],
                requestBody: {
                  required: true,
                  content: { 'application/json': { schema: { type: 'object' } } },
                },
                responses: { '200': { description: 'OK' } },
              },
            },
          },
        } as OpenAPI

        await expect(
          runGenerator(hooks(putPatchOpenAPI, out, '../client', 'vue-query')),
        ).resolves.toBeDefined()

        const code = fs.readFileSync(out, 'utf-8')
        const expected = `import { useMutation, mutationOptions } from '@tanstack/vue-query'
import type { UseMutationOptions, DefaultError, QueryClient } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getUsersKey() {
  return ['users'] as const
}

export function getPutUsersIdMutationKey() {
  return ['users', '/users/:id', 'PUT'] as const
}

export function getPutUsersIdMutationOptions<TError = DefaultError, TOnMutateResult = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$put']>>>>
    >,
    TError,
    InferRequestType<(typeof client.users)[':id']['$put']>,
    TOnMutateResult
  >({
    mutationKey: getPutUsersIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$put']>) {
      return parseResponse(client.users[':id'].$put(args, options))
    },
  })
}

export function usePutUsersId<TError = DefaultError, TOnMutateResult = unknown>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$put']>>>
            >
          >,
          TError,
          InferRequestType<(typeof client.users)[':id']['$put']>,
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const mutationDefaults = getPutUsersIdMutationOptions<TError, TOnMutateResult>(clientOptions)
  return useMutation(
    {
      ...mutationOptions,
      ...mutationDefaults,
      mutationKey: mutationOptions?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchUsersIdMutationKey() {
  return ['users', '/users/:id', 'PATCH'] as const
}

export function getPatchUsersIdMutationOptions<TError = DefaultError, TOnMutateResult = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$patch']>>>>
    >,
    TError,
    InferRequestType<(typeof client.users)[':id']['$patch']>,
    TOnMutateResult
  >({
    mutationKey: getPatchUsersIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$patch']>) {
      return parseResponse(client.users[':id'].$patch(args, options))
    },
  })
}

export function usePatchUsersId<TError = DefaultError, TOnMutateResult = unknown>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$patch']>>>
            >
          >,
          TError,
          InferRequestType<(typeof client.users)[':id']['$patch']>,
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const mutationDefaults = getPatchUsersIdMutationOptions<TError, TOnMutateResult>(clientOptions)
  return useMutation(
    {
      ...mutationOptions,
      ...mutationDefaults,
      mutationKey: mutationOptions?.mutationKey ?? mutationDefaults.mutationKey,
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

  describe('vueQuery (header parameters excluded from query key)', () => {
    it('omits header field from queryKey arg and infinite queryKey arg', async () => {
      const spec = {
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
      } as OpenAPI
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-vq-header-'))
      try {
        const out = path.join(dir, 'index.ts')
        await runGenerator(hooks(spec, out, '../client', 'vue-query'))
        const code = fs.readFileSync(out, 'utf-8')
        expect(code).toBe(`import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  InfiniteData,
  DefaultError,
  QueryClient,
} from '@tanstack/vue-query'
import { computed, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getUsersKey() {
  return ['users'] as const
}

export function getUsersQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  const { header: _, ...keyArgs } = toValue(args)
  return ['users', '/users', keyArgs] as const
}

export function getUsersQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: computed(() => getUsersQueryKey(args)),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users.$get(toValue(args), { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = DefaultError,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
          TError,
          TData,
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
          ReturnType<typeof getUsersQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getUsersQueryKey(args)),
      queryFn({ signal }) {
        return parseResponse(
          client.users.$get(toValue(args), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    },
    queryClient,
  )
}

export function getUsersInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  const { header: _, ...keyArgs } = toValue(args)
  return ['users', '/users', 'infinite', keyArgs] as const
}

export function getUsersInfiniteQueryOptions<TPageParam = unknown>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  pagination: {
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options?: ClientRequestOptions,
) {
  return {
    queryKey: computed(() => getUsersInfiniteQueryKey(args)),
    queryFn({ pageParam, signal }: QueryFunctionContext<readonly unknown[], TPageParam>) {
      return parseResponse(
        client.users.$get(pagination.getRequestArgs(toValue(args), pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useInfiniteUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  pagination: {
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options: {
    query: Omit<
      Extract<
        UseInfiniteQueryOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
          TError,
          TData,
          ReturnType<typeof getUsersInfiniteQueryKey>,
          TPageParam
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getUsersInfiniteQueryKey(args)),
      queryFn({ pageParam, signal }) {
        return parseResponse(
          client.users.$get(pagination.getRequestArgs(toValue(args), pageParam), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    },
    queryClient,
  )
}
`)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })
})

describe('svelte-query hooks', () => {
  /** Simple OpenAPI spec for basic tests */
  const openapiSimple = {
    openapi: '3.1.0',
    info: { title: 'Test', version: '1.0.0' },
    paths: {
      '/pets': {
        get: {
          'x-pagination': true,
          summary: 'List pets',
          parameters: [{ name: 'limit', in: 'query', schema: { type: 'integer' } }],
          responses: { '200': { description: 'OK' } },
        },
        post: {
          summary: 'Create pet',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object' } } },
          },
          responses: { '201': { description: 'Created' } },
        },
      },
      '/pets/{petId}': {
        get: {
          'x-pagination': true,
          summary: 'Get pet',
          parameters: [{ name: 'petId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { '200': { description: 'OK' } },
        },
        put: {
          summary: 'Update pet',
          parameters: [{ name: 'petId', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object' } } },
          },
          responses: { '200': { description: 'OK' } },
        },
        delete: {
          summary: 'Delete pet',
          parameters: [{ name: 'petId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { '204': { description: 'Deleted' } },
        },
      },
    },
  } as OpenAPI

  describe('svelteQuery', () => {
    it('should generate the correct svelte-query hooks code', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-'))
      try {
        const out = path.join(dir, 'index.ts')
        const result = await runGenerator(hooks(openapiSimple, out, '../client', 'svelte-query'))

        const code = fs.readFileSync(out, 'utf-8')
        const expected = `import {
  createQuery,
  createInfiniteQuery,
  createMutation,
  queryOptions,
  infiniteQueryOptions,
  mutationOptions,
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  InfiniteData,
  CreateMutationOptions,
  DefaultError,
  QueryClient,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getPetsKey() {
  return ['pets'] as const
}

export function getPetsQueryKey(args: InferRequestType<typeof client.pets.$get>) {
  return ['pets', '/pets', args] as const
}

export function getPetsQueryOptions<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pets.$get>>>>>,
  TError = DefaultError,
>(args: InferRequestType<typeof client.pets.$get>, options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pets.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getPetsQueryKey>
  >({
    queryKey: getPetsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.pets.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function createPets<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pets.$get>>>>>,
  TError = DefaultError,
>(
  args: () => InferRequestType<typeof client.pets.$get>,
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pets.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getPetsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getPetsQueryOptions<TData, TError>(args(), clientOptions), ...query }
  }, queryClient)
}

export function getPetsInfiniteQueryKey(args: InferRequestType<typeof client.pets.$get>) {
  return ['pets', '/pets', 'infinite', args] as const
}

export function getPetsInfiniteQueryOptions<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pets.$get>>>>>
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  args: InferRequestType<typeof client.pets.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pets.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pets.$get>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.pets.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.pets.$get>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pets.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getPetsInfiniteQueryKey>,
    TPageParam
  >({
    queryKey: getPetsInfiniteQueryKey(args),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getPetsInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.pets.$get(pagination.getRequestArgs(args, pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function createInfinitePets<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pets.$get>>>>>
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  args: () => InferRequestType<typeof client.pets.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pets.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pets.$get>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.pets.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.pets.$get>
  },
  options?: () => {
    query?: Omit<
      CreateInfiniteQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pets.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getPetsInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getPetsInfiniteQueryOptions<TData, TError, TPageParam>(args(), pagination, clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getPostPetsMutationKey() {
  return ['pets', '/pets', 'POST'] as const
}

export function getPostPetsMutationOptions<TError = DefaultError, TOnMutateResult = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pets.$post>>>>>,
    TError,
    InferRequestType<typeof client.pets.$post>,
    TOnMutateResult
  >({
    mutationKey: getPostPetsMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.pets.$post>) {
      return parseResponse(client.pets.$post(args, options))
    },
  })
}

export function createPostPets<TError = DefaultError, TOnMutateResult = unknown>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pets.$post>>>>>,
        TError,
        InferRequestType<typeof client.pets.$post>,
        TOnMutateResult
      >,
      'mutationFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    const mutationDefaults = getPostPetsMutationOptions<TError, TOnMutateResult>(clientOptions)
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPetsPetIdQueryKey(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
) {
  return ['pets', '/pets/:petId', args] as const
}

export function getPetsPetIdQueryOptions<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$get']>>>>
  >,
  TError = DefaultError,
>(args: InferRequestType<(typeof client.pets)[':petId']['$get']>, options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$get']>>>>
    >,
    TError,
    TData,
    ReturnType<typeof getPetsPetIdQueryKey>
  >({
    queryKey: getPetsPetIdQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.pets[':petId'].$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function createPetsPetId<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$get']>>>>
  >,
  TError = DefaultError,
>(
  args: () => InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$get']>>>
          >
        >,
        TError,
        TData,
        ReturnType<typeof getPetsPetIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getPetsPetIdQueryOptions<TData, TError>(args(), clientOptions), ...query }
  }, queryClient)
}

export function getPetsPetIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
) {
  return ['pets', '/pets/:petId', 'infinite', args] as const
}

export function getPetsPetIdInfiniteQueryOptions<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$get']>>>>
    >
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$get']>>>
        >
      >,
      allPages: Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$get']>>>
        >
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
      pageParam: unknown,
    ) => InferRequestType<(typeof client.pets)[':petId']['$get']>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$get']>>>>
    >,
    TError,
    TData,
    ReturnType<typeof getPetsPetIdInfiniteQueryKey>,
    TPageParam
  >({
    queryKey: getPetsPetIdInfiniteQueryKey(args),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getPetsPetIdInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.pets[':petId'].$get(pagination.getRequestArgs(args, pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function createInfinitePetsPetId<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$get']>>>>
    >
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  args: () => InferRequestType<(typeof client.pets)[':petId']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$get']>>>
        >
      >,
      allPages: Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$get']>>>
        >
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
      pageParam: unknown,
    ) => InferRequestType<(typeof client.pets)[':petId']['$get']>
  },
  options?: () => {
    query?: Omit<
      CreateInfiniteQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$get']>>>
          >
        >,
        TError,
        TData,
        ReturnType<typeof getPetsPetIdInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getPetsPetIdInfiniteQueryOptions<TData, TError, TPageParam>(
        args(),
        pagination,
        clientOptions,
      ),
      ...query,
    }
  }, queryClient)
}

export function getPutPetsPetIdMutationKey() {
  return ['pets', '/pets/:petId', 'PUT'] as const
}

export function getPutPetsPetIdMutationOptions<TError = DefaultError, TOnMutateResult = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$put']>>>>
    >,
    TError,
    InferRequestType<(typeof client.pets)[':petId']['$put']>,
    TOnMutateResult
  >({
    mutationKey: getPutPetsPetIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.pets)[':petId']['$put']>) {
      return parseResponse(client.pets[':petId'].$put(args, options))
    },
  })
}

export function createPutPetsPetId<TError = DefaultError, TOnMutateResult = unknown>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$put']>>>
          >
        >,
        TError,
        InferRequestType<(typeof client.pets)[':petId']['$put']>,
        TOnMutateResult
      >,
      'mutationFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    const mutationDefaults = getPutPetsPetIdMutationOptions<TError, TOnMutateResult>(clientOptions)
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getDeletePetsPetIdMutationKey() {
  return ['pets', '/pets/:petId', 'DELETE'] as const
}

export function getDeletePetsPetIdMutationOptions<TError = DefaultError, TOnMutateResult = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$delete']>>>
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.pets)[':petId']['$delete']>,
    TOnMutateResult
  >({
    mutationKey: getDeletePetsPetIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.pets)[':petId']['$delete']>) {
      return parseResponse(client.pets[':petId'].$delete(args, options))
    },
  })
}

export function createDeletePetsPetId<TError = DefaultError, TOnMutateResult = unknown>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$delete']>>>
            >
          >
        | undefined,
        TError,
        InferRequestType<(typeof client.pets)[':petId']['$delete']>,
        TOnMutateResult
      >,
      'mutationFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    const mutationDefaults = getDeletePetsPetIdMutationOptions<TError, TOnMutateResult>(
      clientOptions,
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}
`

        expect(code).toBe(expected)
        expect(result).toStrictEqual(`Generated svelte-query hooks written to ${out}`)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  /** OpenAPI spec for custom client name test */
  const openapiCustomClient = {
    openapi: '3.1.0',
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
  } as OpenAPI

  describe('svelteQuery (custom client name)', () => {
    it('should generate code with custom client name', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-client-'))
      try {
        const out = path.join(dir, 'index.ts')

        await runGenerator(
          hooks(openapiCustomClient, out, '../api', 'svelte-query', {
            clientName: 'authClient',
          }),
        )

        const code = fs.readFileSync(out, 'utf-8')
        const expected = `import {
  createQuery,
  createInfiniteQuery,
  queryOptions,
  infiniteQueryOptions,
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  InfiniteData,
  DefaultError,
  QueryClient,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { authClient } from '../api'

export function getUsersKey() {
  return ['users'] as const
}

export function getUsersQueryKey() {
  return ['users', '/users'] as const
}

export function getUsersQueryOptions<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
  >,
  TError = DefaultError,
>(options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getUsersQueryKey>
  >({
    queryKey: getUsersQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        authClient.users.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function createUsers<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
  >,
  TError = DefaultError,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
        >,
        TError,
        TData,
        ReturnType<typeof getUsersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getUsersQueryOptions<TData, TError>(clientOptions), ...query }
  }, queryClient)
}

export function getUsersInfiniteQueryKey() {
  return ['users', '/users', 'infinite'] as const
}

export function getUsersInfiniteQueryOptions<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof authClient.users.$get>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getUsersInfiniteQueryKey>,
    TPageParam
  >({
    queryKey: getUsersInfiniteQueryKey(),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getUsersInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        authClient.users.$get(pagination.getRequestArgs(pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function createInfiniteUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof authClient.users.$get>
  },
  options?: () => {
    query?: Omit<
      CreateInfiniteQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
        >,
        TError,
        TData,
        ReturnType<typeof getUsersInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getUsersInfiniteQueryOptions<TData, TError, TPageParam>(pagination, clientOptions),
      ...query,
    }
  }, queryClient)
}
`
        expect(code).toBe(expected)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  /** Test OpenAPI spec for operations without arguments */
  const openapiNoArgs = {
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
  } as OpenAPI

  describe('svelteQuery (no args operations)', () => {
    it('should generate hooks without args correctly', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-noargs-'))
      try {
        const out = path.join(dir, 'index.ts')
        await runGenerator(hooks(openapiNoArgs, out, '../client', 'svelte-query'))

        const code = fs.readFileSync(out, 'utf-8')
        const expected = `import {
  createQuery,
  createInfiniteQuery,
  createMutation,
  queryOptions,
  infiniteQueryOptions,
  mutationOptions,
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  InfiniteData,
  CreateMutationOptions,
  DefaultError,
  QueryClient,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getPingKey() {
  return ['ping'] as const
}

export function getPingQueryKey() {
  return ['ping', '/ping'] as const
}

export function getPingQueryOptions<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
  TError = DefaultError,
>(options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getPingQueryKey>
  >({
    queryKey: getPingQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.ping.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function createPing<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
  TError = DefaultError,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getPingQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getPingQueryOptions<TData, TError>(clientOptions), ...query }
  }, queryClient)
}

export function getPingInfiniteQueryKey() {
  return ['ping', '/ping', 'infinite'] as const
}

export function getPingInfiniteQueryOptions<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof client.ping.$get>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getPingInfiniteQueryKey>,
    TPageParam
  >({
    queryKey: getPingInfiniteQueryKey(),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getPingInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.ping.$get(pagination.getRequestArgs(pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function createInfinitePing<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof client.ping.$get>
  },
  options?: () => {
    query?: Omit<
      CreateInfiniteQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getPingInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getPingInfiniteQueryOptions<TData, TError, TPageParam>(pagination, clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getPostPingMutationKey() {
  return ['ping', '/ping', 'POST'] as const
}

export function getPostPingMutationOptions<TError = DefaultError, TOnMutateResult = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$post>>>>>,
    TError,
    void,
    TOnMutateResult
  >({
    mutationKey: getPostPingMutationKey(),
    async mutationFn() {
      return parseResponse(client.ping.$post(undefined, options))
    },
  })
}

export function createPostPing<TError = DefaultError, TOnMutateResult = unknown>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$post>>>>>,
        TError,
        void,
        TOnMutateResult
      >,
      'mutationFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    const mutationDefaults = getPostPingMutationOptions<TError, TOnMutateResult>(clientOptions)
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
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
        const hyphenOpenAPI = {
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
        } as OpenAPI

        await runGenerator(hooks(hyphenOpenAPI, out, '../client', 'svelte-query'))

        const code = fs.readFileSync(out, 'utf-8')
        const expected = `import {
  createQuery,
  createInfiniteQuery,
  queryOptions,
  infiniteQueryOptions,
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  InfiniteData,
  DefaultError,
  QueryClient,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getHonoXKey() {
  return ['hono-x'] as const
}

export function getHonoXQueryKey() {
  return ['hono-x', '/hono-x'] as const
}

export function getHonoXQueryOptions<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
  >,
  TError = DefaultError,
>(options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
    >,
    TError,
    TData,
    ReturnType<typeof getHonoXQueryKey>
  >({
    queryKey: getHonoXQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client['hono-x'].$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function createHonoX<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
  >,
  TError = DefaultError,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
        >,
        TError,
        TData,
        ReturnType<typeof getHonoXQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getHonoXQueryOptions<TData, TError>(clientOptions), ...query }
  }, queryClient)
}

export function getHonoXInfiniteQueryKey() {
  return ['hono-x', '/hono-x', 'infinite'] as const
}

export function getHonoXInfiniteQueryOptions<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
    >
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<(typeof client)['hono-x']['$get']>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
    >,
    TError,
    TData,
    ReturnType<typeof getHonoXInfiniteQueryKey>,
    TPageParam
  >({
    queryKey: getHonoXInfiniteQueryKey(),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getHonoXInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client['hono-x'].$get(pagination.getRequestArgs(pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function createInfiniteHonoX<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
    >
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<(typeof client)['hono-x']['$get']>
  },
  options?: () => {
    query?: Omit<
      CreateInfiniteQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
        >,
        TError,
        TData,
        ReturnType<typeof getHonoXInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getHonoXInfiniteQueryOptions<TData, TError, TPageParam>(pagination, clientOptions),
      ...query,
    }
  }, queryClient)
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
        const paramOpenAPI = {
          openapi: '3.0.3',
          info: { title: 'Test', version: '1.0.0' },
          paths: {
            '/users/{id}': {
              get: {
                'x-pagination': true,
                summary: 'Get user',
                parameters: [
                  { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
                ],
                responses: { '200': { description: 'OK' } },
              },
              delete: {
                summary: 'Delete user',
                parameters: [
                  { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
                ],
                responses: { '204': { description: 'Deleted' } },
              },
            },
          },
        } as OpenAPI

        await runGenerator(hooks(paramOpenAPI, out, '../client', 'svelte-query'))

        const code = fs.readFileSync(out, 'utf-8')
        const expected = `import {
  createQuery,
  createInfiniteQuery,
  createMutation,
  queryOptions,
  infiniteQueryOptions,
  mutationOptions,
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  InfiniteData,
  CreateMutationOptions,
  DefaultError,
  QueryClient,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getUsersKey() {
  return ['users'] as const
}

export function getUsersIdQueryKey(args: InferRequestType<(typeof client.users)[':id']['$get']>) {
  return ['users', '/users/:id', args] as const
}

export function getUsersIdQueryOptions<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
  >,
  TError = DefaultError,
>(args: InferRequestType<(typeof client.users)[':id']['$get']>, options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
    >,
    TError,
    TData,
    ReturnType<typeof getUsersIdQueryKey>
  >({
    queryKey: getUsersIdQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.users[':id'].$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function createUsersId<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
  >,
  TError = DefaultError,
>(
  args: () => InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>
          >
        >,
        TError,
        TData,
        ReturnType<typeof getUsersIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getUsersIdQueryOptions<TData, TError>(args(), clientOptions), ...query }
  }, queryClient)
}

export function getUsersIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
) {
  return ['users', '/users/:id', 'infinite', args] as const
}

export function getUsersIdInfiniteQueryOptions<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
    >
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<(typeof client.users)[':id']['$get']>,
      pageParam: unknown,
    ) => InferRequestType<(typeof client.users)[':id']['$get']>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
    >,
    TError,
    TData,
    ReturnType<typeof getUsersIdInfiniteQueryKey>,
    TPageParam
  >({
    queryKey: getUsersIdInfiniteQueryKey(args),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getUsersIdInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.users[':id'].$get(pagination.getRequestArgs(args, pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function createInfiniteUsersId<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
    >
  >,
  TError = DefaultError,
  TPageParam = unknown,
>(
  args: () => InferRequestType<(typeof client.users)[':id']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<(typeof client.users)[':id']['$get']>,
      pageParam: unknown,
    ) => InferRequestType<(typeof client.users)[':id']['$get']>
  },
  options?: () => {
    query?: Omit<
      CreateInfiniteQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>
          >
        >,
        TError,
        TData,
        ReturnType<typeof getUsersIdInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getUsersIdInfiniteQueryOptions<TData, TError, TPageParam>(
        args(),
        pagination,
        clientOptions,
      ),
      ...query,
    }
  }, queryClient)
}

export function getDeleteUsersIdMutationKey() {
  return ['users', '/users/:id', 'DELETE'] as const
}

export function getDeleteUsersIdMutationOptions<TError = DefaultError, TOnMutateResult = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$delete']>>>
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.users)[':id']['$delete']>,
    TOnMutateResult
  >({
    mutationKey: getDeleteUsersIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$delete']>) {
      return parseResponse(client.users[':id'].$delete(args, options))
    },
  })
}

export function createDeleteUsersId<TError = DefaultError, TOnMutateResult = unknown>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$delete']>>>
            >
          >
        | undefined,
        TError,
        InferRequestType<(typeof client.users)[':id']['$delete']>,
        TOnMutateResult
      >,
      'mutationFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    const mutationDefaults = getDeleteUsersIdMutationOptions<TError, TOnMutateResult>(clientOptions)
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
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
        const invalidOpenAPI = {
          openapi: '3.0.3',
          info: { title: 'Test', version: '1.0.0' },
          // paths is undefined
        } as unknown as OpenAPI

        const error = await runGeneratorError(
          hooks(invalidOpenAPI, out, '../client', 'svelte-query'),
        )
        expect(error.message).toBe('Invalid OpenAPI paths')
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  describe('svelteQuery (header parameters excluded from query key)', () => {
    it('omits header field from queryKey arg in createQuery and infinite hook', async () => {
      const spec = {
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
      } as OpenAPI
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-sv-header-'))
      try {
        const out = path.join(dir, 'index.ts')
        await runGenerator(hooks(spec, out, '../client', 'svelte-query'))
        const code = fs.readFileSync(out, 'utf-8')
        expect(code).toBe(`import {
  createQuery,
  createInfiniteQuery,
  queryOptions,
  infiniteQueryOptions,
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  InfiniteData,
  DefaultError,
  QueryClient,
} from '@tanstack/svelte-query'
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

export function getUsersQueryOptions<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = DefaultError,
>(args: InferRequestType<typeof client.users.$get>, options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getUsersQueryKey>
  >({
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.users.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function createUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = DefaultError,
>(
  args: () => InferRequestType<typeof client.users.$get>,
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getUsersQueryOptions<TData, TError>(args(), clientOptions), ...query }
  }, queryClient)
}

export function getUsersInfiniteQueryKey(args: InferRequestType<typeof client.users.$get>) {
  const { header: _, ...keyArgs } = args
  return ['users', '/users', 'infinite', keyArgs] as const
}

export function getUsersInfiniteQueryOptions<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getUsersInfiniteQueryKey>,
    TPageParam
  >({
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getUsersInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.users.$get(pagination.getRequestArgs(args, pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function createInfiniteUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options?: () => {
    query?: Omit<
      CreateInfiniteQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  queryClient?: () => QueryClient,
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getUsersInfiniteQueryOptions<TData, TError, TPageParam>(args(), pagination, clientOptions),
      ...query,
    }
  }, queryClient)
}
`)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })
})

describe('angular-query hooks', () => {
  const openapiSimple = {
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
  } as OpenAPI

  describe('angularQuery', () => {
    it('should generate the correct angular-query hooks code', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-angular-query-'))
      try {
        const out = path.join(dir, 'index.ts')
        const result = await runGenerator(hooks(openapiSimple, out, '../client', 'angular-query'))

        const code = fs.readFileSync(out, 'utf-8')
        const expected = `import {
  injectQuery,
  injectInfiniteQuery,
  injectMutation,
  queryOptions,
  infiniteQueryOptions,
  mutationOptions,
} from '@tanstack/angular-query-experimental'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  InfiniteData,
  CreateMutationOptions,
  DefaultError,
  InjectQueryOptions,
  InjectInfiniteQueryOptions,
  InjectMutationOptions,
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

export function getHonoQueryOptions<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
  TError = DefaultError,
>(options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getHonoQueryKey>
  >({
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
  TError = DefaultError,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getHonoQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getHonoQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}

export function getUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args] as const
}

export function getUsersQueryOptions<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = DefaultError,
>(args: InferRequestType<typeof client.users.$get>, options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getUsersQueryKey>
  >({
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
  TError = DefaultError,
>(
  args: () => InferRequestType<typeof client.users.$get>,
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getUsersQueryOptions<TData, TError>(args(), clientOptions), ...query }
  }, injectOptions)
}

export function getUsersInfiniteQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', 'infinite', args] as const
}

export function getUsersInfiniteQueryOptions<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>
  >,
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getUsersInfiniteQueryKey>,
    TPageParam
  >({
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getUsersInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.users.$get(pagination.getRequestArgs(args, pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
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
  TError = DefaultError,
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
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.users.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.users.$get>
  },
  options?: () => {
    query?: Omit<
      CreateInfiniteQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getUsersInfiniteQueryKey>,
        TPageParam
      >,
      'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >
    options?: ClientRequestOptions
  },
  injectOptions?: InjectInfiniteQueryOptions,
) {
  return injectInfiniteQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getUsersInfiniteQueryOptions<TData, TError, TPageParam>(args(), pagination, clientOptions),
      ...query,
    }
  }, injectOptions)
}

export function getPostUsersMutationKey() {
  return ['users', '/users', 'POST'] as const
}

export function getPostUsersMutationOptions<TError = DefaultError, TOnMutateResult = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
    TError,
    InferRequestType<typeof client.users.$post>,
    TOnMutateResult
  >({
    mutationKey: getPostUsersMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return parseResponse(client.users.$post(args, options))
    },
  })
}

export function injectPostUsers<TError = DefaultError, TOnMutateResult = unknown>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
        TError,
        InferRequestType<typeof client.users.$post>,
        TOnMutateResult
      >,
      'mutationFn'
    >
    options?: ClientRequestOptions
  },
  injectOptions?: InjectMutationOptions,
) {
  return injectMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    const mutationDefaults = getPostUsersMutationOptions<TError, TOnMutateResult>(clientOptions)
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, injectOptions)
}
`

        expect(code).toBe(expected)
        expect(result).toStrictEqual(`Generated angular-query hooks written to ${out}`)
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
        await runGenerator(
          hooks(
            {
              openapi: '3.1.0',
              info: { title: 'Test', version: '1.0.0' },
              paths: { '/hono': { get: { responses: { '200': { description: 'OK' } } } } },
            } as OpenAPI,
            out,
            '../client',
            'angular-query',
          ),
        )

        const code = fs.readFileSync(out, 'utf-8')
        expect(code)
          .toBe(`import { injectQuery, queryOptions } from '@tanstack/angular-query-experimental'
import type {
  CreateQueryOptions,
  DefaultError,
  InjectQueryOptions,
  InjectInfiniteQueryOptions,
  InjectMutationOptions,
} from '@tanstack/angular-query-experimental'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getHonoKey() {
  return ['hono'] as const
}

export function getHonoQueryKey() {
  return ['hono', '/hono'] as const
}

export function getHonoQueryOptions<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
  TError = DefaultError,
>(options?: ClientRequestOptions) {
  return queryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getHonoQueryKey>
  >({
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
  TError = DefaultError,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
        TError,
        TData,
        ReturnType<typeof getHonoQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: ClientRequestOptions
  },
  injectOptions?: InjectQueryOptions,
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getHonoQueryOptions<TData, TError>(clientOptions), ...query }
  }, injectOptions)
}
`)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })
})
