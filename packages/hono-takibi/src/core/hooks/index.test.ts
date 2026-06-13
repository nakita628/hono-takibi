import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../../openapi/index.js'
import { hooks } from './index.js'

describe('swr hooks', () => {
  /** Simple OpenAPI spec for basic tests */
  const openapiSimple: OpenAPI = {
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
  }

  describe('swr', () => {
    it('should generate the correct swr hooks code', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-'))
      try {
        const out = path.join(dir, 'index.ts')
        const result = await hooks(openapiSimple, out, '../client', 'swr', { split: false })

        if (!result.ok) {
          throw new Error(result.error)
        }

        const code = fs.readFileSync(out, 'utf-8')

        expect(code).toBe(`import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
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

export function useGetHono(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetHonoKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.hono.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetHono(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetHonoKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
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
  > & { swrKey?: SWRInfiniteKeyLoader }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetHonoInfiniteKey(), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => parseResponse(client.hono.$get(undefined, clientOptions)),
    restSwrOptions,
  )
}

export function getGetUsersKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args] as const
}

export function useGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.users.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetUsersInfiniteKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args, 'infinite'] as const
}

export function useInfiniteGetUsers<TError = unknown>(
  args: InferRequestType<typeof client.users.$get>,
  options: {
    swr?: SWRInfiniteConfiguration<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError
    > & { swrKey?: SWRInfiniteKeyLoader }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetUsersInfiniteKey(args), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => parseResponse(client.users.$get(args, clientOptions)),
    restSwrOptions,
  )
}

export function usePostUsers<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
    TError,
    Key,
    InferRequestType<typeof client.users.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['users', '/users', 'POST'] as const)
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

        expect(result).toStrictEqual({
          ok: true,
          value: `Generated swr hooks written to ${out}`,
        })
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  describe('swr (split mode)', () => {
    it('should generate correct split files', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-split-'))
      try {
        const out = path.join(dir, 'swr', 'index.ts')
        const result = await hooks(openapiSimple, out, '../client', 'swr', { split: true })

        if (!result.ok) {
          throw new Error(result.error)
        }

        // Check index.ts barrel file
        const index = fs.readFileSync(path.join(dir, 'swr', 'index.ts'), 'utf-8')
        expect(index).toBe(`export * from './keys'
export * from './getHono'
export * from './getUsers'
export * from './postUsers'
`)

        // Check keys.ts file (prefix-only cache keys aggregated in split mode)
        const keys = fs.readFileSync(path.join(dir, 'swr', 'keys.ts'), 'utf-8')
        expect(keys).toBe(`export function getHonoKey() {
  return ['hono'] as const
}

export function getUsersKey() {
  return ['users'] as const
}
`)

        // Check GET hook file without args
        const useGetHono = fs.readFileSync(path.join(dir, 'swr', 'getHono.ts'), 'utf-8')
        expect(useGetHono).toBe(`import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getGetHonoKey() {
  return ['hono', '/hono'] as const
}

export function useGetHono(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetHonoKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.hono.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetHono(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetHonoKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
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
  > & { swrKey?: SWRInfiniteKeyLoader }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetHonoInfiniteKey(), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => parseResponse(client.hono.$get(undefined, clientOptions)),
    restSwrOptions,
  )
}
`)

        // Check GET hook file with args
        const useGetUsers = fs.readFileSync(path.join(dir, 'swr', 'getUsers.ts'), 'utf-8')
        expect(useGetUsers).toBe(`import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getGetUsersKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args] as const
}

export function useGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.users.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetUsersInfiniteKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args, 'infinite'] as const
}

export function useInfiniteGetUsers<TError = unknown>(
  args: InferRequestType<typeof client.users.$get>,
  options: {
    swr?: SWRInfiniteConfiguration<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError
    > & { swrKey?: SWRInfiniteKeyLoader }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetUsersInfiniteKey(args), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => parseResponse(client.users.$get(args, clientOptions)),
    restSwrOptions,
  )
}
`)

        // Check POST hook file (mutation)
        const usePostUsers = fs.readFileSync(path.join(dir, 'swr', 'postUsers.ts'), 'utf-8')
        expect(usePostUsers).toBe(`import type { Key } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function usePostUsers<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
    TError,
    Key,
    InferRequestType<typeof client.users.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['users', '/users', 'POST'] as const)
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

        expect(result).toStrictEqual({
          ok: true,
          value: `Generated swr hooks written to ${path.join(dir, 'swr')}/*.ts (index.ts included)`,
        })
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })

    it('should emit no keys.ts (and no barrel entry) when there are no prefixes', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-no-prefix-'))
      try {
        const out = path.join(dir, 'swr', 'index.ts')
        const result = await hooks(
          {
            openapi: '3.1.0',
            info: { title: 'Test', version: '1.0.0' },
            paths: {
              '/': {
                get: { operationId: 'getRoot', responses: { '200': { description: 'OK' } } },
              },
            },
          } as OpenAPI,
          out,
          '../client',
          'swr',
          { split: true },
        )
        expect(result.ok).toBe(true)
        const files = fs.readdirSync(path.join(dir, 'swr')).sort()
        expect(files).toStrictEqual(['get.ts', 'index.ts'])
        expect(fs.readFileSync(path.join(dir, 'swr', 'index.ts'), 'utf-8')).toBe(
          `export * from './get'\n`,
        )
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
        const simpleOpenAPI: OpenAPI = {
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
        }

        const result = await hooks(simpleOpenAPI, out, '../api', 'swr', {
          split: false,
          clientName: 'authClient',
        })

        if (!result.ok) {
          throw new Error(result.error)
        }

        const code = fs.readFileSync(out, 'utf-8')

        expect(code).toBe(`import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { authClient } from '../api'

export function getUsersKey() {
  return ['users'] as const
}

export function getGetUsersKey() {
  return ['users', '/users'] as const
}

export function useGetUsers(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(authClient.users.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUsers(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
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
  > & { swrKey?: SWRInfiniteKeyLoader }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetUsersInfiniteKey(), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => parseResponse(authClient.users.$get(undefined, clientOptions)),
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
  const openapiNoArgs: OpenAPI = {
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
  }

  describe('swr (no args operations)', () => {
    it('should generate hooks without args correctly', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-noargs-'))
      try {
        const out = path.join(dir, 'index.ts')
        const result = await hooks(openapiNoArgs, out, '../client', 'swr', { split: false })

        if (!result.ok) {
          throw new Error(result.error)
        }

        const code = fs.readFileSync(out, 'utf-8')

        expect(code).toBe(`import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getPingKey() {
  return ['ping'] as const
}

export function getGetPingKey() {
  return ['ping', '/ping'] as const
}

export function useGetPing(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPingKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.ping.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetPing(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPingKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
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
  > & { swrKey?: SWRInfiniteKeyLoader }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetPingInfiniteKey(), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => parseResponse(client.ping.$get(undefined, clientOptions)),
    restSwrOptions,
  )
}

export function usePostPing<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$post>>>>>,
    TError,
    Key,
    undefined
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['ping', '/ping', 'POST'] as const)
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
        const hyphenOpenAPI: OpenAPI = {
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
        }

        const result = await hooks(hyphenOpenAPI, out, '../client', 'swr', { split: false })

        if (!result.ok) {
          throw new Error(result.error)
        }

        const code = fs.readFileSync(out, 'utf-8')

        expect(code).toBe(`import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getHonoXKey() {
  return ['hono-x'] as const
}

export function getGetHonoXKey() {
  return ['hono-x', '/hono-x'] as const
}

export function useGetHonoX(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetHonoXKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['hono-x'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetHonoX(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetHonoXKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
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
  > & { swrKey?: SWRInfiniteKeyLoader }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetHonoXInfiniteKey(), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => parseResponse(client['hono-x'].$get(undefined, clientOptions)),
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
        const paramOpenAPI: OpenAPI = {
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
        }

        const result = await hooks(paramOpenAPI, out, '../client', 'swr', { split: false })

        if (!result.ok) {
          throw new Error(result.error)
        }

        const code = fs.readFileSync(out, 'utf-8')

        expect(code).toBe(`import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
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

export function useGetUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.users[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetUsersIdInfiniteKey(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
) {
  return ['users', '/users/:id', args, 'infinite'] as const
}

export function useInfiniteGetUsersId<TError = unknown>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options: {
    swr?: SWRInfiniteConfiguration<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      TError
    > & { swrKey?: SWRInfiniteKeyLoader }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetUsersIdInfiniteKey(args), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => parseResponse(client.users[':id'].$get(args, clientOptions)),
    restSwrOptions,
  )
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
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['users', '/users/:id', 'DELETE'] as const)
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

  /** Full CRUD resource OpenAPI spec for split mode tests */
  const openapiCrud: OpenAPI = {
    openapi: '3.1.0',
    info: { title: 'Test', version: '1.0.0' },
    paths: {
      '/users': {
        get: {
          summary: 'List users',
          'x-pagination': true,
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
          'x-pagination': true,
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

  describe('swr (split mode with full CRUD resource)', () => {
    it('should generate split files for GET list, GET by id, POST, PUT, DELETE', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-crud-'))
      try {
        const out = path.join(dir, 'hooks', 'index.ts')
        const result = await hooks(openapiCrud, out, '../client', 'swr', { split: true })

        expect(result).toStrictEqual({
          ok: true,
          value: `Generated swr hooks written to ${path.join(dir, 'hooks')}/*.ts (index.ts included)`,
        })

        const hooksDir = path.join(dir, 'hooks')
        const files = fs.readdirSync(hooksDir).sort()
        expect(files).toStrictEqual([
          'deleteUsersId.ts',
          'getUsers.ts',
          'getUsersId.ts',
          'index.ts',
          'keys.ts',
          'postUsers.ts',
          'putUsersId.ts',
        ])

        // getUsers.ts
        expect(fs.readFileSync(path.join(hooksDir, 'getUsers.ts'), 'utf-8'))
          .toBe(`import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getGetUsersKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args] as const
}

export function useGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.users.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetUsersInfiniteKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args, 'infinite'] as const
}

export function useInfiniteGetUsers<TError = unknown>(
  args: InferRequestType<typeof client.users.$get>,
  options: {
    swr?: SWRInfiniteConfiguration<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError
    > & { swrKey?: SWRInfiniteKeyLoader }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetUsersInfiniteKey(args), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => parseResponse(client.users.$get(args, clientOptions)),
    restSwrOptions,
  )
}
`)

        // getUsersId.ts
        expect(fs.readFileSync(path.join(hooksDir, 'getUsersId.ts'), 'utf-8'))
          .toBe(`import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getGetUsersIdKey(args: InferRequestType<(typeof client.users)[':id']['$get']>) {
  return ['users', '/users/:id', args] as const
}

export function useGetUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.users[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetUsersIdInfiniteKey(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
) {
  return ['users', '/users/:id', args, 'infinite'] as const
}

export function useInfiniteGetUsersId<TError = unknown>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options: {
    swr?: SWRInfiniteConfiguration<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      TError
    > & { swrKey?: SWRInfiniteKeyLoader }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetUsersIdInfiniteKey(args), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => parseResponse(client.users[':id'].$get(args, clientOptions)),
    restSwrOptions,
  )
}
`)

        // postUsers.ts
        expect(fs.readFileSync(path.join(hooksDir, 'postUsers.ts'), 'utf-8'))
          .toBe(`import type { Key } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function usePostUsers<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
    TError,
    Key,
    InferRequestType<typeof client.users.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['users', '/users', 'POST'] as const)
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

        // putUsersId.ts
        expect(fs.readFileSync(path.join(hooksDir, 'putUsersId.ts'), 'utf-8'))
          .toBe(`import type { Key } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function usePutUsersId<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$put']>>>>
    >,
    TError,
    Key,
    InferRequestType<(typeof client.users)[':id']['$put']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['users', '/users/:id', 'PUT'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client.users)[':id']['$put']> }) =>
        parseResponse(client.users[':id'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
`)

        // deleteUsersId.ts
        expect(fs.readFileSync(path.join(hooksDir, 'deleteUsersId.ts'), 'utf-8'))
          .toBe(`import type { Key } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

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
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['users', '/users/:id', 'DELETE'] as const)
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

        // index.ts
        expect(fs.readFileSync(path.join(hooksDir, 'index.ts'), 'utf-8'))
          .toBe(`export * from './keys'
export * from './getUsers'
export * from './postUsers'
export * from './getUsersId'
export * from './putUsersId'
export * from './deleteUsersId'
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

        const result = await hooks(invalidOpenAPI, out, '../client', 'swr', { split: false })

        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid OpenAPI paths',
        })
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  /** Simple OpenAPI spec for immutable tests */
  const openapiImmutable: OpenAPI = {
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
  }

  describe('swr (immutable mode)', () => {
    it('should generate both useSWR and useSWRImmutable hooks by default', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-immutable-'))
      try {
        const out = path.join(dir, 'index.ts')
        const result = await hooks(openapiImmutable, out, '../client', 'swr', { split: false })

        if (!result.ok) {
          throw new Error(result.error)
        }

        const code = fs.readFileSync(out, 'utf-8')

        const expected = `import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getHonoKey() {
  return ['hono'] as const
}

export function getGetHonoKey() {
  return ['hono', '/hono'] as const
}

export function useGetHono(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetHonoKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.hono.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetHono(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetHonoKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
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
  > & { swrKey?: SWRInfiniteKeyLoader }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetHonoInfiniteKey(), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => parseResponse(client.hono.$get(undefined, clientOptions)),
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
        const simpleOpenAPI: OpenAPI = {
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
        }

        const result = await hooks(simpleOpenAPI, out, '../client', 'swr', { split: false })

        if (!result.ok) {
          throw new Error(result.error)
        }

        const code = fs.readFileSync(out, 'utf-8')

        expect(code).toBe(`import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getUsersKey() {
  return ['users'] as const
}

export function getGetUsersKey() {
  return ['users', '/users'] as const
}

export function useGetUsers(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUsers(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
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
  > & { swrKey?: SWRInfiniteKeyLoader }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetUsersInfiniteKey(), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => parseResponse(client.users.$get(undefined, clientOptions)),
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
        const openAPI: OpenAPI = {
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
        }
        const result = await hooks(openAPI, out, '../client', 'swr', { split: false })
        if (!result.ok) throw new Error(result.error)
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
})

describe('tanstack-query hooks', () => {
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
        const result = await hooks(openapiSimple, out, '../client', 'tanstack-query', {
          split: false,
        })

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
        const result = await hooks(openapiSimple, out, '../client', 'tanstack-query', {
          split: true,
        })

        if (!result.ok) {
          throw new Error(result.error)
        }

        // Check index.ts barrel file
        const index = fs.readFileSync(path.join(dir, 'hooks', 'index.ts'), 'utf-8')
        const indexExpected = `export * from './keys'
export * from './getHono'
export * from './getUsers'
export * from './postUsers'
`
        expect(index).toBe(indexExpected)

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
`
        expect(useUsers).toBe(useUsersExpected)

        // Check POST hook file (mutation)
        const usePostUsers = fs.readFileSync(path.join(dir, 'hooks', 'postUsers.ts'), 'utf-8')
        const usePostUsersExpected = `import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

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

        const result = await hooks(simpleOpenAPI, out, '../api', 'tanstack-query', {
          split: false,
          clientName: 'authClient',
        })

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

export function getUsersQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
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
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        authClient.users.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseUsers<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getUsersQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        authClient.users.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
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
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getUsersInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        authClient.users.$get(undefined, { ...options, init: { ...options?.init, signal } }),
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
  TError = unknown,
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
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>,
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
    queryKey: getUsersInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        authClient.users.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useSuspenseInfiniteUsers<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>
  >,
  TError = unknown,
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
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>,
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
    queryKey: getUsersInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        authClient.users.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
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
        const result = await hooks(openapiNoArgs, out, '../client', 'tanstack-query', {
          split: false,
        })

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

export function getPingQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
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
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.ping.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
  })
}

export function useSuspensePing<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getPingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.ping.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
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
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getPingInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.ping.$get(undefined, { ...options, init: { ...options?.init, signal } }),
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
  TError = unknown,
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
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
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
    queryKey: getPingInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.ping.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useSuspenseInfinitePing<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>
  >,
  TError = unknown,
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
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
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
    queryKey: getPingInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.ping.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function getPostPingMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$post>>>>>,
    TError,
    void
  >({
    mutationKey: ['ping', '/ping', 'POST'] as const,
    async mutationFn() {
      return parseResponse(client.ping.$post(undefined, options))
    },
  })
}

export function usePostPing<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$post>>>>>,
    TError,
    void
  >
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

        const result = await hooks(hyphenOpenAPI, out, '../client', 'tanstack-query', {
          split: false,
        })

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

export function getHonoXQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
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
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getHonoXQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['hono-x'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseHonoX<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getHonoXQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['hono-x'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
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
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getHonoXInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['hono-x'].$get(undefined, { ...options, init: { ...options?.init, signal } }),
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
  TError = unknown,
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
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
      >,
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
    queryKey: getHonoXInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['hono-x'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useSuspenseInfiniteHonoX<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
    >
  >,
  TError = unknown,
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
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
      >,
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
    queryKey: getHonoXInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['hono-x'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
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
        }

        const result = await hooks(paramOpenAPI, out, '../client', 'tanstack-query', {
          split: false,
        })

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

export function getUsersIdQueryOptions(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
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
  TError = unknown,
>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseUsersId<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
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
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getUsersIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users[':id'].$get(args, { ...options, init: { ...options?.init, signal } }),
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
  TError = unknown,
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
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
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
    queryKey: getUsersIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useSuspenseInfiniteUsersId<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
    >
  >,
  TError = unknown,
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
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
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
    queryKey: getUsersIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function getDeleteUsersIdMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$delete']>>>
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.users)[':id']['$delete']>
  >({
    mutationKey: ['users', '/users/:id', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$delete']>) {
      return parseResponse(client.users[':id'].$delete(args, options))
    },
  })
}

export function useDeleteUsersId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$delete']>>>
        >
      >
    | undefined,
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
        const result = await hooks(openapiCrud, out, '../client', 'tanstack-query', { split: true })

        expect(result).toStrictEqual({
          ok: true,
          value: `Generated tanstack-query hooks written to ${path.join(dir, 'hooks')}/*.ts (index.ts included)`,
        })

        const hooksDir = path.join(dir, 'hooks')
        const files = fs.readdirSync(hooksDir).sort()
        expect(files).toStrictEqual([
          'deleteUsersId.ts',
          'getUsers.ts',
          'getUsersId.ts',
          'index.ts',
          'keys.ts',
          'postUsers.ts',
          'putUsersId.ts',
        ])

        const indexContent = fs.readFileSync(path.join(hooksDir, 'index.ts'), 'utf-8')
        expect(indexContent).toBe(`export * from './keys'
export * from './getUsers'
export * from './postUsers'
export * from './getUsersId'
export * from './putUsersId'
export * from './deleteUsersId'
`)

        const postUsersContent = fs.readFileSync(path.join(hooksDir, 'postUsers.ts'), 'utf-8')
        expect(postUsersContent)
          .toBe(`import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

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
`)

        const putUsersIdContent = fs.readFileSync(path.join(hooksDir, 'putUsersId.ts'), 'utf-8')
        expect(putUsersIdContent)
          .toBe(`import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getPutUsersIdMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$put']>>>>
    >,
    TError,
    InferRequestType<(typeof client.users)[':id']['$put']>
  >({
    mutationKey: ['users', '/users/:id', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$put']>) {
      return parseResponse(client.users[':id'].$put(args, options))
    },
  })
}

export function usePutUsersId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$put']>>>>
    >,
    TError,
    InferRequestType<(typeof client.users)[':id']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPutUsersIdMutationOptions<TError>(clientOptions) })
}
`)

        const deleteUsersIdContent = fs.readFileSync(
          path.join(hooksDir, 'deleteUsersId.ts'),
          'utf-8',
        )
        expect(deleteUsersIdContent)
          .toBe(`import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getDeleteUsersIdMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$delete']>>>
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.users)[':id']['$delete']>
  >({
    mutationKey: ['users', '/users/:id', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$delete']>) {
      return parseResponse(client.users[':id'].$delete(args, options))
    },
  })
}

export function useDeleteUsersId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$delete']>>>
        >
      >
    | undefined,
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

export function getUsersIdQueryOptions(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
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
  TError = unknown,
>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseUsersId<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
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
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getUsersIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users[':id'].$get(args, { ...options, init: { ...options?.init, signal } }),
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
  TError = unknown,
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
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
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
    queryKey: getUsersIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useSuspenseInfiniteUsersId<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
    >
  >,
  TError = unknown,
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
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
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
    queryKey: getUsersIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
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

        const result = await hooks(invalidOpenAPI, out, '../client', 'tanstack-query', {
          split: false,
        })

        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid OpenAPI paths',
        })
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  describe('tanstackQuery (header parameters excluded from query key)', () => {
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
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tq-header-'))
      try {
        const out = path.join(dir, 'index.ts')
        const result = await hooks(spec, out, '../client', 'tanstack-query', { split: false })
        if (!result.ok) throw new Error(result.error)
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
})

describe('preact-query hooks', () => {
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
        const result = await hooks(openapiSimple, out, '../client', 'preact-query', {
          split: false,
        })

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
        const result = await hooks(spec, out, '../client', 'preact-query', { split: false })
        if (!result.ok) throw new Error(result.error)
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
})

describe('solid-query hooks', () => {
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

  describe('solidQuery', () => {
    it('should generate the correct solid-query hooks code', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-solid-query-'))
      try {
        const out = path.join(dir, 'index.ts')
        const result = await hooks(openapiSimple, out, '../client', 'solid-query', { split: false })

        if (!result.ok) throw new Error(result.error)

        const code = fs.readFileSync(out, 'utf-8')
        const expected = `import {
  createQuery,
  createInfiniteQuery,
  createMutation,
  queryOptions,
  infiniteQueryOptions,
} from '@tanstack/solid-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  InfiniteData,
  CreateMutationOptions,
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

export function createHono<
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
  return createQuery(() => {
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

export function createUsers<
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
  return createQuery(() => {
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

export function createInfiniteUsers<
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
  return createInfiniteQuery(() => {
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

export function createPostUsers<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
      TError,
      InferRequestType<typeof client.users.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostUsersMutationOptions(clientOptions) }
  })
}
`

        expect(code).toBe(expected)
        expect(result).toStrictEqual({
          ok: true,
          value: `Generated solid-query hooks written to ${out}`,
        })
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  describe('solidQuery (split mode)', () => {
    it('should generate correct split files for the thunk (Accessor) config', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-solid-query-split-'))
      try {
        const out = path.join(dir, 'hooks', 'index.ts')
        const result = await hooks(openapiSimple, out, '../client', 'solid-query', { split: true })

        if (!result.ok) throw new Error(result.error)

        const index = fs.readFileSync(path.join(dir, 'hooks', 'index.ts'), 'utf-8')
        expect(index).toBe(`export * from './keys'
export * from './getHono'
export * from './getUsers'
export * from './postUsers'
`)

        // Query-only file: header imports createQuery (+ queryOptions) but no mutation/infinite symbols
        const getHono = fs.readFileSync(path.join(dir, 'hooks', 'getHono.ts'), 'utf-8')
        expect(getHono).toBe(`import { createQuery, queryOptions } from '@tanstack/solid-query'
import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/solid-query'
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

export function createHono<
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
  return createQuery(() => {
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

        // Infinite query file: header imports createInfiniteQuery + infiniteQueryOptions + InfiniteData
        const getUsers = fs.readFileSync(path.join(dir, 'hooks', 'getUsers.ts'), 'utf-8')
        expect(getUsers).toBe(`import {
  createQuery,
  createInfiniteQuery,
  queryOptions,
  infiniteQueryOptions,
} from '@tanstack/solid-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  InfiniteData,
} from '@tanstack/solid-query'
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

export function createUsers<
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
  return createQuery(() => {
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

export function createInfiniteUsers<
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
  return createInfiniteQuery(() => {
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

        // Mutation-only file: thunk createMutation, plain-object factory (hasMutationOptionsHelper falsy)
        const postUsers = fs.readFileSync(path.join(dir, 'hooks', 'postUsers.ts'), 'utf-8')
        expect(postUsers).toBe(`import { createMutation } from '@tanstack/solid-query'
import type { CreateMutationOptions } from '@tanstack/solid-query'
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

export function createPostUsers<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
      TError,
      InferRequestType<typeof client.users.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostUsersMutationOptions(clientOptions) }
  })
}
`)

        expect(result).toStrictEqual({
          ok: true,
          value: `Generated solid-query hooks written to ${path.join(dir, 'hooks')}/*.ts (index.ts included)`,
        })
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })
})

describe('vue-query hooks', () => {
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

  describe('vueQuery', () => {
    it('should generate the correct vue-query hooks code', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-vue-query-'))
      try {
        const out = path.join(dir, 'index.ts')
        const result = await hooks(openapiSimple, out, '../client', 'vue-query', { split: false })

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
    queryFn({ signal }) {
      return parseResponse(
        client.hono.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
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
      return parseResponse(
        client.hono.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useInfiniteHono<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
  TError = unknown,
  TPageParam = unknown,
>(options: {
  query: UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getHonoInfiniteQueryKey>,
    TPageParam
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getHonoInfiniteQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.hono.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
  })
}

export function getUsersQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', '/users', args] as const
}

export function getUsersQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users.$get(toValue(args), { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
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
    queryFn({ signal }) {
      return parseResponse(
        client.users.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
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
      return parseResponse(
        client.users.$get(toValue(args), { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useInfiniteUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options: {
    query: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError,
      TData,
      ReturnType<typeof getUsersInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.users.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
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

export function usePostUsers<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
    TError,
    InferRequestType<typeof client.users.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostUsersMutationOptions(clientOptions) })
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
        const result = await hooks(openapiSimple, out, '../client', 'vue-query', { split: true })

        if (!result.ok) {
          throw new Error(result.error)
        }

        // Check index.ts barrel file
        const index = fs.readFileSync(path.join(dir, 'hooks', 'index.ts'), 'utf-8')
        const indexExpected = `export * from './keys'
export * from './getHono'
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
    queryFn({ signal }) {
      return parseResponse(
        client.hono.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
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
      return parseResponse(
        client.hono.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useInfiniteHono<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
  TError = unknown,
  TPageParam = unknown,
>(options: {
  query: UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getHonoInfiniteQueryKey>,
    TPageParam
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getHonoInfiniteQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.hono.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
  })
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

export function getUsersQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users.$get(toValue(args), { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
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
    queryFn({ signal }) {
      return parseResponse(
        client.users.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
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
      return parseResponse(
        client.users.$get(toValue(args), { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useInfiniteUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options: {
    query: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError,
      TData,
      ReturnType<typeof getUsersInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.users.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
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

export function getPostUsersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return parseResponse(client.users.$post(args, options))
    },
  }
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
  return useMutation({ ...mutationOptions, ...getPostUsersMutationOptions(clientOptions) })
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
                'x-pagination': true,
                summary: 'Get users',
                responses: { '200': { description: 'OK' } },
              },
            },
          },
        }

        const result = await hooks(simpleOpenAPI, out, '../api', 'vue-query', {
          split: false,
          clientName: 'authClient',
        })

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
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
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
  })
}

export function getUsersInfiniteQueryKey() {
  return ['users', '/users', 'infinite'] as const
}

export function getUsersInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getUsersInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        authClient.users.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useInfiniteUsers<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>
  >,
  TError = unknown,
  TPageParam = unknown,
>(options: {
  query: UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getUsersInfiniteQueryKey>,
    TPageParam
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getUsersInfiniteQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        authClient.users.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
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

  describe('vueQuery (no args operations)', () => {
    it('should generate hooks without args correctly', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-vue-query-noargs-'))
      try {
        const out = path.join(dir, 'index.ts')
        const result = await hooks(openapiNoArgs, out, '../client', 'vue-query', { split: false })

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
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPingQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.ping.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
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
      return parseResponse(
        client.ping.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useInfinitePing<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
  TError = unknown,
  TPageParam = unknown,
>(options: {
  query: UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
    TError,
    TData,
    ReturnType<typeof getPingInfiniteQueryKey>,
    TPageParam
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getPingInfiniteQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.ping.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
  })
}

export function getPostPingMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['ping', '/ping', 'POST'] as const,
    async mutationFn() {
      return parseResponse(client.ping.$post(undefined, options))
    },
  }
}

export function usePostPing<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$post>>>>>,
    TError,
    void
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostPingMutationOptions(clientOptions) })
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
                'x-pagination': true,
                summary: 'HonoX',
                responses: { '200': { description: 'OK' } },
              },
            },
          },
        }

        const result = await hooks(hyphenOpenAPI, out, '../client', 'vue-query', { split: false })

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
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
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
  })
}

export function getHonoXInfiniteQueryKey() {
  return ['hono-x', '/hono-x', 'infinite'] as const
}

export function getHonoXInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getHonoXInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['hono-x'].$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useInfiniteHonoX<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
  >,
  TError = unknown,
  TPageParam = unknown,
>(options: {
  query: UseInfiniteQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
    >,
    TError,
    TData,
    ReturnType<typeof getHonoXInfiniteQueryKey>,
    TPageParam
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getHonoXInfiniteQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client['hono-x'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
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
        }

        const result = await hooks(paramOpenAPI, out, '../client', 'vue-query', { split: false })

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

export function getUsersIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersIdQueryKey(args),
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
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersIdQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.users[':id'].$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
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
      return parseResponse(
        client.users[':id'].$get(toValue(args), { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useInfiniteUsersId<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      TError,
      TData,
      ReturnType<typeof getUsersIdInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getUsersIdInfiniteQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.users[':id'].$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getDeleteUsersIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:id', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$delete']>) {
      return parseResponse(client.users[':id'].$delete(args, options))
    },
  }
}

export function useDeleteUsersId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$delete']>>>
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.users)[':id']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getDeleteUsersIdMutationOptions(clientOptions) })
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

  describe('vueQuery (split mode with full CRUD)', () => {
    it('should generate correct split files for full CRUD resource', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-vue-query-crud-split-'))
      try {
        const out = path.join(dir, 'hooks', 'index.ts')
        const result = await hooks(openapiCrud, out, '../client', 'vue-query', { split: true })

        if (!result.ok) {
          throw new Error(result.error)
        }

        // Check generated file list
        const files = fs.readdirSync(path.join(dir, 'hooks')).sort()
        expect(files).toStrictEqual([
          'deleteUsersId.ts',
          'getUsers.ts',
          'getUsersId.ts',
          'index.ts',
          'keys.ts',
          'postUsers.ts',
          'putUsersId.ts',
        ])

        // Check index.ts barrel file
        const index = fs.readFileSync(path.join(dir, 'hooks', 'index.ts'), 'utf-8')
        const indexExpected = `export * from './keys'
export * from './getUsers'
export * from './postUsers'
export * from './getUsersId'
export * from './putUsersId'
export * from './deleteUsersId'
`
        expect(index).toBe(indexExpected)

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

export function getUsersQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users.$get(toValue(args), { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
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
    queryFn({ signal }) {
      return parseResponse(
        client.users.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
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
      return parseResponse(
        client.users.$get(toValue(args), { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useInfiniteUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options: {
    query: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError,
      TData,
      ReturnType<typeof getUsersInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.users.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
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

export function getPostUsersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return parseResponse(client.users.$post(args, options))
    },
  }
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
  return useMutation({ ...mutationOptions, ...getPostUsersMutationOptions(clientOptions) })
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

export function getUsersIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersIdQueryKey(args),
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
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersIdQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.users[':id'].$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
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
      return parseResponse(
        client.users[':id'].$get(toValue(args), { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useInfiniteUsersId<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      TError,
      TData,
      ReturnType<typeof getUsersIdInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getUsersIdInfiniteQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.users[':id'].$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
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

export function getPutUsersIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:id', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$put']>) {
      return parseResponse(client.users[':id'].$put(args, options))
    },
  }
}

export function usePutUsersId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$put']>>>>
    >,
    TError,
    InferRequestType<(typeof client.users)[':id']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPutUsersIdMutationOptions(clientOptions) })
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

export function getDeleteUsersIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:id', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$delete']>) {
      return parseResponse(client.users[':id'].$delete(args, options))
    },
  }
}

export function useDeleteUsersId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$delete']>>>
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.users)[':id']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getDeleteUsersIdMutationOptions(clientOptions) })
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

        const result = await hooks(invalidOpenAPI, out, '../client', 'vue-query', { split: false })

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
        }

        const result = await hooks(putPatchOpenAPI, out, '../client', 'vue-query', { split: false })

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

export function getPutUsersIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:id', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$put']>) {
      return parseResponse(client.users[':id'].$put(args, options))
    },
  }
}

export function usePutUsersId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$put']>>>>
    >,
    TError,
    InferRequestType<(typeof client.users)[':id']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPutUsersIdMutationOptions(clientOptions) })
}

export function getPatchUsersIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:id', 'PATCH'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$patch']>) {
      return parseResponse(client.users[':id'].$patch(args, options))
    },
  }
}

export function usePatchUsersId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$patch']>>>>
    >,
    TError,
    InferRequestType<(typeof client.users)[':id']['$patch']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPatchUsersIdMutationOptions(clientOptions) })
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
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-vq-header-'))
      try {
        const out = path.join(dir, 'index.ts')
        const result = await hooks(spec, out, '../client', 'vue-query', { split: false })
        if (!result.ok) throw new Error(result.error)
        const code = fs.readFileSync(out, 'utf-8')
        expect(code).toBe(`import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
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
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users.$get(toValue(args), { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
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
    queryFn({ signal }) {
      return parseResponse(
        client.users.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getUsersInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  const { header: _, ...keyArgs } = toValue(args)
  return ['users', '/users', keyArgs, 'infinite'] as const
}

export function getUsersInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users.$get(toValue(args), { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useInfiniteUsers<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
  TError = unknown,
  TPageParam = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options: {
    query: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      TError,
      TData,
      ReturnType<typeof getUsersInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.users.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
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
  const openapiSimple: OpenAPI = {
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
  }

  describe('svelteQuery', () => {
    it('should generate the correct svelte-query hooks code', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-'))
      try {
        const out = path.join(dir, 'index.ts')
        const result = await hooks(openapiSimple, out, '../client', 'svelte-query', {
          split: false,
        })

        if (!result.ok) {
          throw new Error(result.error)
        }

        const code = fs.readFileSync(out, 'utf-8')
        const expected = `import {
  createQuery,
  createInfiniteQuery,
  createMutation,
  queryOptions,
  infiniteQueryOptions,
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  InfiniteData,
  CreateMutationOptions,
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

export function getPetsQueryOptions(
  args: InferRequestType<typeof client.pets.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
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
  TError = unknown,
>(
  args: () => InferRequestType<typeof client.pets.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pets.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPetsQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.pets.$get(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } }),
        )
      },
    }
  })
}

export function getPetsInfiniteQueryKey(args: InferRequestType<typeof client.pets.$get>) {
  return ['pets', '/pets', args, 'infinite'] as const
}

export function getPetsInfiniteQueryOptions<TPageParam = unknown>(
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
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getPetsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pets.$get(args, { ...options, init: { ...options?.init, signal } }),
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
  TError = unknown,
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
    ) => TPageParam | undefined | null
  },
  options?: () => {
    query?: CreateInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pets.$get>>>>>,
      TError,
      TData,
      ReturnType<typeof getPetsInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPetsInfiniteQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.pets.$get(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } }),
        )
      },
      initialPageParam: pagination.initialPageParam,
      getNextPageParam: pagination.getNextPageParam,
    }
  })
}

export function getPostPetsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['pets', '/pets', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.pets.$post>) {
      return parseResponse(client.pets.$post(args, options))
    },
  }
}

export function createPostPets<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pets.$post>>>>>,
      TError,
      InferRequestType<typeof client.pets.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostPetsMutationOptions(clientOptions) }
  })
}

export function getPetsPetIdQueryKey(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
) {
  return ['pets', '/pets/:petId', args] as const
}

export function getPetsPetIdQueryOptions(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
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
  TError = unknown,
>(
  args: () => InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$get']>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPetsPetIdQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.pets[':petId'].$get(args(), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

export function getPetsPetIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
) {
  return ['pets', '/pets/:petId', args, 'infinite'] as const
}

export function getPetsPetIdInfiniteQueryOptions<TPageParam = unknown>(
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
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getPetsPetIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pets[':petId'].$get(args, { ...options, init: { ...options?.init, signal } }),
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
  TError = unknown,
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
    ) => TPageParam | undefined | null
  },
  options?: () => {
    query?: CreateInfiniteQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$get']>>>
        >
      >,
      TError,
      TData,
      ReturnType<typeof getPetsPetIdInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPetsPetIdInfiniteQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.pets[':petId'].$get(args(), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
      initialPageParam: pagination.initialPageParam,
      getNextPageParam: pagination.getNextPageParam,
    }
  })
}

export function getPutPetsPetIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['pets', '/pets/:petId', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.pets)[':petId']['$put']>) {
      return parseResponse(client.pets[':petId'].$put(args, options))
    },
  }
}

export function createPutPetsPetId<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$put']>>>
        >
      >,
      TError,
      InferRequestType<(typeof client.pets)[':petId']['$put']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPutPetsPetIdMutationOptions(clientOptions) }
  })
}

export function getDeletePetsPetIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['pets', '/pets/:petId', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.pets)[':petId']['$delete']>) {
      return parseResponse(client.pets[':petId'].$delete(args, options))
    },
  }
}

export function createDeletePetsPetId<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$delete']>>>
          >
        >
      | undefined,
      TError,
      InferRequestType<(typeof client.pets)[':petId']['$delete']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getDeletePetsPetIdMutationOptions(clientOptions) }
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
        const result = await hooks(openapiSimple, out, '../client', 'svelte-query', { split: true })

        if (!result.ok) {
          throw new Error(result.error)
        }

        // Check index.ts barrel file
        const index = fs.readFileSync(path.join(dir, 'hooks', 'index.ts'), 'utf-8')
        const indexExpected = `export * from './keys'
export * from './getPets'
export * from './postPets'
export * from './getPetsPetId'
export * from './putPetsPetId'
export * from './deletePetsPetId'
`
        expect(index).toBe(indexExpected)

        // Check GET hook file with args (getPets)
        const createGetPets = fs.readFileSync(path.join(dir, 'hooks', 'getPets.ts'), 'utf-8')
        const createGetPetsExpected = `import {
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
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getPetsQueryKey(args: InferRequestType<typeof client.pets.$get>) {
  return ['pets', '/pets', args] as const
}

export function getPetsQueryOptions(
  args: InferRequestType<typeof client.pets.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
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
  TError = unknown,
>(
  args: () => InferRequestType<typeof client.pets.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pets.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPetsQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.pets.$get(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } }),
        )
      },
    }
  })
}

export function getPetsInfiniteQueryKey(args: InferRequestType<typeof client.pets.$get>) {
  return ['pets', '/pets', args, 'infinite'] as const
}

export function getPetsInfiniteQueryOptions<TPageParam = unknown>(
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
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getPetsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pets.$get(args, { ...options, init: { ...options?.init, signal } }),
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
  TError = unknown,
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
    ) => TPageParam | undefined | null
  },
  options?: () => {
    query?: CreateInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pets.$get>>>>>,
      TError,
      TData,
      ReturnType<typeof getPetsInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPetsInfiniteQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.pets.$get(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } }),
        )
      },
      initialPageParam: pagination.initialPageParam,
      getNextPageParam: pagination.getNextPageParam,
    }
  })
}
`
        expect(createGetPets).toBe(createGetPetsExpected)

        // Check GET hook file with args (getPetsPetId)
        const createGetPetsPetId = fs.readFileSync(
          path.join(dir, 'hooks', 'getPetsPetId.ts'),
          'utf-8',
        )
        const createGetPetsPetIdExpected = `import {
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
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getPetsPetIdQueryKey(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
) {
  return ['pets', '/pets/:petId', args] as const
}

export function getPetsPetIdQueryOptions(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
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
  TError = unknown,
>(
  args: () => InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$get']>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPetsPetIdQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.pets[':petId'].$get(args(), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

export function getPetsPetIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
) {
  return ['pets', '/pets/:petId', args, 'infinite'] as const
}

export function getPetsPetIdInfiniteQueryOptions<TPageParam = unknown>(
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
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getPetsPetIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pets[':petId'].$get(args, { ...options, init: { ...options?.init, signal } }),
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
  TError = unknown,
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
    ) => TPageParam | undefined | null
  },
  options?: () => {
    query?: CreateInfiniteQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$get']>>>
        >
      >,
      TError,
      TData,
      ReturnType<typeof getPetsPetIdInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPetsPetIdInfiniteQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.pets[':petId'].$get(args(), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
      initialPageParam: pagination.initialPageParam,
      getNextPageParam: pagination.getNextPageParam,
    }
  })
}
`
        expect(createGetPetsPetId).toBe(createGetPetsPetIdExpected)

        // Check POST hook file (mutation)
        const createPostPets = fs.readFileSync(path.join(dir, 'hooks', 'postPets.ts'), 'utf-8')
        const createPostPetsExpected = `import { createMutation } from '@tanstack/svelte-query'
import type { CreateMutationOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getPostPetsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['pets', '/pets', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.pets.$post>) {
      return parseResponse(client.pets.$post(args, options))
    },
  }
}

export function createPostPets<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pets.$post>>>>>,
      TError,
      InferRequestType<typeof client.pets.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostPetsMutationOptions(clientOptions) }
  })
}
`
        expect(createPostPets).toBe(createPostPetsExpected)

        // Check PUT hook file (mutation)
        const createPutPetsPetId = fs.readFileSync(
          path.join(dir, 'hooks', 'putPetsPetId.ts'),
          'utf-8',
        )
        const createPutPetsPetIdExpected = `import { createMutation } from '@tanstack/svelte-query'
import type { CreateMutationOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getPutPetsPetIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['pets', '/pets/:petId', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.pets)[':petId']['$put']>) {
      return parseResponse(client.pets[':petId'].$put(args, options))
    },
  }
}

export function createPutPetsPetId<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$put']>>>
        >
      >,
      TError,
      InferRequestType<(typeof client.pets)[':petId']['$put']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPutPetsPetIdMutationOptions(clientOptions) }
  })
}
`
        expect(createPutPetsPetId).toBe(createPutPetsPetIdExpected)

        // Check DELETE hook file (mutation)
        const createDeletePetsPetId = fs.readFileSync(
          path.join(dir, 'hooks', 'deletePetsPetId.ts'),
          'utf-8',
        )
        const createDeletePetsPetIdExpected = `import { createMutation } from '@tanstack/svelte-query'
import type { CreateMutationOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getDeletePetsPetIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['pets', '/pets/:petId', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.pets)[':petId']['$delete']>) {
      return parseResponse(client.pets[':petId'].$delete(args, options))
    },
  }
}

export function createDeletePetsPetId<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.pets)[':petId']['$delete']>>>
          >
        >
      | undefined,
      TError,
      InferRequestType<(typeof client.pets)[':petId']['$delete']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getDeletePetsPetIdMutationOptions(clientOptions) }
  })
}
`
        expect(createDeletePetsPetId).toBe(createDeletePetsPetIdExpected)

        expect(result).toStrictEqual({
          ok: true,
          value: `Generated svelte-query hooks written to ${path.join(dir, 'hooks')}/*.ts (index.ts included)`,
        })
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  /** OpenAPI spec for custom client name test */
  const openapiCustomClient: OpenAPI = {
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
  }

  describe('svelteQuery (custom client name)', () => {
    it('should generate code with custom client name', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-client-'))
      try {
        const out = path.join(dir, 'index.ts')

        const result = await hooks(openapiCustomClient, out, '../api', 'svelte-query', {
          split: false,
          clientName: 'authClient',
        })

        if (!result.ok) {
          throw new Error(result.error)
        }

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
} from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { authClient } from '../api'

export function getUsersKey() {
  return ['users'] as const
}

export function getUsersQueryKey() {
  return ['users', '/users'] as const
}

export function getUsersQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
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
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getUsersQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          authClient.users.$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

export function getUsersInfiniteQueryKey() {
  return ['users', '/users', 'infinite'] as const
}

export function getUsersInfiniteQueryOptions<TPageParam = unknown>(
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
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getUsersInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        authClient.users.$get(undefined, { ...options, init: { ...options?.init, signal } }),
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
  TError = unknown,
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
    ) => TPageParam | undefined | null
  },
  options?: () => {
    query?: CreateInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof authClient.users.$get>>>>>,
      TError,
      TData,
      ReturnType<typeof getUsersInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getUsersInfiniteQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          authClient.users.$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
      initialPageParam: pagination.initialPageParam,
      getNextPageParam: pagination.getNextPageParam,
    }
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

  describe('svelteQuery (no args operations)', () => {
    it('should generate hooks without args correctly', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-noargs-'))
      try {
        const out = path.join(dir, 'index.ts')
        const result = await hooks(openapiNoArgs, out, '../client', 'svelte-query', {
          split: false,
        })

        if (!result.ok) {
          throw new Error(result.error)
        }

        const code = fs.readFileSync(out, 'utf-8')
        const expected = `import {
  createQuery,
  createInfiniteQuery,
  createMutation,
  queryOptions,
  infiniteQueryOptions,
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  InfiniteData,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getPingKey() {
  return ['ping'] as const
}

export function getPingQueryKey() {
  return ['ping', '/ping'] as const
}

export function getPingQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
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
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPingQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.ping.$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

export function getPingInfiniteQueryKey() {
  return ['ping', '/ping', 'infinite'] as const
}

export function getPingInfiniteQueryOptions<TPageParam = unknown>(
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
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getPingInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.ping.$get(undefined, { ...options, init: { ...options?.init, signal } }),
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
  TError = unknown,
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
    ) => TPageParam | undefined | null
  },
  options?: () => {
    query?: CreateInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$get>>>>>,
      TError,
      TData,
      ReturnType<typeof getPingInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPingInfiniteQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.ping.$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
      initialPageParam: pagination.initialPageParam,
      getNextPageParam: pagination.getNextPageParam,
    }
  })
}

export function getPostPingMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['ping', '/ping', 'POST'] as const,
    async mutationFn() {
      return parseResponse(client.ping.$post(undefined, options))
    },
  }
}

export function createPostPing<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.ping.$post>>>>>,
      TError,
      void
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostPingMutationOptions(clientOptions) }
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
                'x-pagination': true,
                summary: 'HonoX',
                responses: { '200': { description: 'OK' } },
              },
            },
          },
        }

        const result = await hooks(hyphenOpenAPI, out, '../client', 'svelte-query', {
          split: false,
        })

        if (!result.ok) {
          throw new Error(result.error)
        }

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
} from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getHonoXKey() {
  return ['hono-x'] as const
}

export function getHonoXQueryKey() {
  return ['hono-x', '/hono-x'] as const
}

export function getHonoXQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
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
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getHonoXQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client['hono-x'].$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

export function getHonoXInfiniteQueryKey() {
  return ['hono-x', '/hono-x', 'infinite'] as const
}

export function getHonoXInfiniteQueryOptions<TPageParam = unknown>(
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
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getHonoXInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['hono-x'].$get(undefined, { ...options, init: { ...options?.init, signal } }),
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
  TError = unknown,
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
    ) => TPageParam | undefined | null
  },
  options?: () => {
    query?: CreateInfiniteQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
      >,
      TError,
      TData,
      ReturnType<typeof getHonoXInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getHonoXInfiniteQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client['hono-x'].$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
      initialPageParam: pagination.initialPageParam,
      getNextPageParam: pagination.getNextPageParam,
    }
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
        }

        const result = await hooks(paramOpenAPI, out, '../client', 'svelte-query', { split: false })

        if (!result.ok) {
          throw new Error(result.error)
        }

        const code = fs.readFileSync(out, 'utf-8')
        const expected = `import {
  createQuery,
  createInfiniteQuery,
  createMutation,
  queryOptions,
  infiniteQueryOptions,
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  InfiniteData,
  CreateMutationOptions,
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

export function getUsersIdQueryOptions(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
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
  TError = unknown,
>(
  args: () => InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getUsersIdQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.users[':id'].$get(args(), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
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
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getUsersIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users[':id'].$get(args, { ...options, init: { ...options?.init, signal } }),
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
  TError = unknown,
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
    ) => TPageParam | undefined | null
  },
  options?: () => {
    query?: CreateInfiniteQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      TError,
      TData,
      ReturnType<typeof getUsersIdInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getUsersIdInfiniteQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.users[':id'].$get(args(), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
      initialPageParam: pagination.initialPageParam,
      getNextPageParam: pagination.getNextPageParam,
    }
  })
}

export function getDeleteUsersIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:id', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$delete']>) {
      return parseResponse(client.users[':id'].$delete(args, options))
    },
  }
}

export function createDeleteUsersId<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$delete']>>>
          >
        >
      | undefined,
      TError,
      InferRequestType<(typeof client.users)[':id']['$delete']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getDeleteUsersIdMutationOptions(clientOptions) }
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

  describe('svelteQuery (split mode with full CRUD)', () => {
    it('should generate correct split files for full CRUD resource', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-crud-split-'))
      try {
        const out = path.join(dir, 'hooks', 'index.ts')
        const result = await hooks(openapiCrud, out, '../client', 'svelte-query', { split: true })

        if (!result.ok) {
          throw new Error(result.error)
        }

        // Check generated file list
        const files = fs.readdirSync(path.join(dir, 'hooks')).sort()
        expect(files).toStrictEqual([
          'deleteUsersId.ts',
          'getUsers.ts',
          'getUsersId.ts',
          'index.ts',
          'keys.ts',
          'postUsers.ts',
          'putUsersId.ts',
        ])

        // Check index.ts barrel file
        const index = fs.readFileSync(path.join(dir, 'hooks', 'index.ts'), 'utf-8')
        const indexExpected = `export * from './keys'
export * from './getUsers'
export * from './postUsers'
export * from './getUsersId'
export * from './putUsersId'
export * from './deleteUsersId'
`
        expect(index).toBe(indexExpected)

        // Check GET /users query file (no MaybeRefOrGetter/toValue for svelte)
        const getUsers = fs.readFileSync(path.join(dir, 'hooks', 'getUsers.ts'), 'utf-8')
        const getUsersExpected = `import {
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
} from '@tanstack/svelte-query'
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

export function createUsers<
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
  return createQuery(() => {
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

export function createInfiniteUsers<
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
  return createInfiniteQuery(() => {
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
`
        expect(getUsers).toBe(getUsersExpected)

        // Check POST /users mutation file (no query imports)
        const postUsers = fs.readFileSync(path.join(dir, 'hooks', 'postUsers.ts'), 'utf-8')
        const postUsersExpected = `import { createMutation } from '@tanstack/svelte-query'
import type { CreateMutationOptions } from '@tanstack/svelte-query'
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

export function createPostUsers<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
      TError,
      InferRequestType<typeof client.users.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostUsersMutationOptions(clientOptions) }
  })
}
`
        expect(postUsers).toBe(postUsersExpected)

        // Check GET /users/{id} query file (path param with bracket notation)
        const getUsersId = fs.readFileSync(path.join(dir, 'hooks', 'getUsersId.ts'), 'utf-8')
        const getUsersIdExpected = `import {
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
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getUsersIdQueryKey(args: InferRequestType<(typeof client.users)[':id']['$get']>) {
  return ['users', '/users/:id', args] as const
}

export function getUsersIdQueryOptions(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
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
  TError = unknown,
>(
  args: () => InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getUsersIdQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.users[':id'].$get(args(), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
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
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getUsersIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users[':id'].$get(args, { ...options, init: { ...options?.init, signal } }),
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
  TError = unknown,
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
    ) => TPageParam | undefined | null
  },
  options?: () => {
    query?: CreateInfiniteQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$get']>>>>
      >,
      TError,
      TData,
      ReturnType<typeof getUsersIdInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getUsersIdInfiniteQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.users[':id'].$get(args(), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
      initialPageParam: pagination.initialPageParam,
      getNextPageParam: pagination.getNextPageParam,
    }
  })
}
`
        expect(getUsersId).toBe(getUsersIdExpected)

        // Check PUT /users/{id} mutation file (path param, no query imports)
        const putUsersId = fs.readFileSync(path.join(dir, 'hooks', 'putUsersId.ts'), 'utf-8')
        const putUsersIdExpected = `import { createMutation } from '@tanstack/svelte-query'
import type { CreateMutationOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getPutUsersIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:id', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$put']>) {
      return parseResponse(client.users[':id'].$put(args, options))
    },
  }
}

export function createPutUsersId<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$put']>>>>
      >,
      TError,
      InferRequestType<(typeof client.users)[':id']['$put']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPutUsersIdMutationOptions(clientOptions) }
  })
}
`
        expect(putUsersId).toBe(putUsersIdExpected)

        // Check DELETE /users/{id} mutation file (204 with |undefined)
        const deleteUsersId = fs.readFileSync(path.join(dir, 'hooks', 'deleteUsersId.ts'), 'utf-8')
        const deleteUsersIdExpected = `import { createMutation } from '@tanstack/svelte-query'
import type { CreateMutationOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getDeleteUsersIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:id', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$delete']>) {
      return parseResponse(client.users[':id'].$delete(args, options))
    },
  }
}

export function createDeleteUsersId<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['$delete']>>>
          >
        >
      | undefined,
      TError,
      InferRequestType<(typeof client.users)[':id']['$delete']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getDeleteUsersIdMutationOptions(clientOptions) }
  })
}
`
        expect(deleteUsersId).toBe(deleteUsersIdExpected)
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

        const result = await hooks(invalidOpenAPI, out, '../client', 'svelte-query', {
          split: false,
        })

        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid OpenAPI paths',
        })
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  describe('svelteQuery (header parameters excluded from query key)', () => {
    it('omits header field from queryKey arg in createQuery and infinite hook', async () => {
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
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-sv-header-'))
      try {
        const out = path.join(dir, 'index.ts')
        const result = await hooks(spec, out, '../client', 'svelte-query', { split: false })
        if (!result.ok) throw new Error(result.error)
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

export function createUsers<
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
  return createQuery(() => {
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

export function createInfiniteUsers<
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
  return createInfiniteQuery(() => {
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
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })
})

describe('angular-query hooks', () => {
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
        const result = await hooks(openapiSimple, out, '../client', 'angular-query', {
          split: false,
        })

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
        const result = await hooks(
          {
            openapi: '3.1.0',
            info: { title: 'Test', version: '1.0.0' },
            paths: { '/hono': { get: { responses: { '200': { description: 'OK' } } } } },
          },
          out,
          '../client',
          'angular-query',
          { split: false },
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
        const result = await hooks(openapiSimple, out, '../client', 'angular-query', {
          split: true,
        })

        if (!result.ok) throw new Error(result.error)

        const index = fs.readFileSync(path.join(dir, 'hooks', 'index.ts'), 'utf-8')
        expect(index).toBe(`export * from './keys'
export * from './getHono'
export * from './getUsers'
export * from './postUsers'
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
        expect(postUsers)
          .toBe(`import { injectMutation } from '@tanstack/angular-query-experimental'
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
})
