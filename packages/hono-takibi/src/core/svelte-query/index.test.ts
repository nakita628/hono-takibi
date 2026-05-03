import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../../openapi/index.js'
import { svelteQuery } from './index.js'

/** Simple OpenAPI spec for basic tests */
const openapiSimple: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'Test', version: '1.0.0' },
  paths: {
    '/pets': {
      get: {
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
      const result = await svelteQuery(openapiSimple, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import {
  createQuery,
  createInfiniteQuery,
  createMutation,
  queryOptions,
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
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

export async function getPets(
  args: InferRequestType<typeof client.pets.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pets.$get(args, options))
}

export function getPetsQueryOptions(
  args: InferRequestType<typeof client.pets.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getPetsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPets(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createPets<TData = Awaited<ReturnType<typeof getPets>>, TError = Error>(
  args: () => InferRequestType<typeof client.pets.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPets>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPetsQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return getPets(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getPetsInfiniteQueryKey(args: InferRequestType<typeof client.pets.$get>) {
  return ['pets', '/pets', args, 'infinite'] as const
}

export function getPetsInfiniteQueryOptions(
  args: InferRequestType<typeof client.pets.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPetsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPets(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfinitePets<TError = Error>(
  args: () => InferRequestType<typeof client.pets.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<
      Awaited<ReturnType<typeof getPets>>,
      TError,
      Awaited<ReturnType<typeof getPets>>,
      ReturnType<typeof getPetsInfiniteQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getPetsInfiniteQueryOptions(args(), clientOptions) }
  })
}

export async function postPets(
  args: InferRequestType<typeof client.pets.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pets.$post(args, options))
}

export function getPostPetsMutationOptions<TError = Error>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['pets', '/pets', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.pets.$post>) {
      return postPets(args, options)
    },
  }
}

export function createPostPets<TError = Error>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postPets>>,
      TError,
      InferRequestType<typeof client.pets.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostPetsMutationOptions<TError>(clientOptions), ...mutation }
  })
}

export function getPetsPetIdQueryKey(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
) {
  return ['pets', '/pets/:petId', args] as const
}

export async function getPetsPetId(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pets[':petId'].$get(args, options))
}

export function getPetsPetIdQueryOptions(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getPetsPetIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPetsPetId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createPetsPetId<TData = Awaited<ReturnType<typeof getPetsPetId>>, TError = Error>(
  args: () => InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPetsPetId>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPetsPetIdQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return getPetsPetId(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getPetsPetIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
) {
  return ['pets', '/pets/:petId', args, 'infinite'] as const
}

export function getPetsPetIdInfiniteQueryOptions(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPetsPetIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPetsPetId(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfinitePetsPetId<TError = Error>(
  args: () => InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<
      Awaited<ReturnType<typeof getPetsPetId>>,
      TError,
      Awaited<ReturnType<typeof getPetsPetId>>,
      ReturnType<typeof getPetsPetIdInfiniteQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getPetsPetIdInfiniteQueryOptions(args(), clientOptions) }
  })
}

export async function putPetsPetId(
  args: InferRequestType<(typeof client.pets)[':petId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pets[':petId'].$put(args, options))
}

export function getPutPetsPetIdMutationOptions<TError = Error>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['pets', '/pets/:petId', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.pets)[':petId']['$put']>) {
      return putPetsPetId(args, options)
    },
  }
}

export function createPutPetsPetId<TError = Error>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof putPetsPetId>>,
      TError,
      InferRequestType<(typeof client.pets)[':petId']['$put']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPutPetsPetIdMutationOptions<TError>(clientOptions), ...mutation }
  })
}

export async function deletePetsPetId(
  args: InferRequestType<(typeof client.pets)[':petId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pets[':petId'].$delete(args, options))
}

export function getDeletePetsPetIdMutationOptions<TError = Error>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['pets', '/pets/:petId', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.pets)[':petId']['$delete']>) {
      return deletePetsPetId(args, options)
    },
  }
}

export function createDeletePetsPetId<TError = Error>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof deletePetsPetId>> | undefined,
      TError,
      InferRequestType<(typeof client.pets)[':petId']['$delete']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getDeletePetsPetIdMutationOptions<TError>(clientOptions), ...mutation }
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
      const indexExpected = `export * from './_keys'
export * from './getPets'
export * from './postPets'
export * from './getPetsPetId'
export * from './putPetsPetId'
export * from './deletePetsPetId'
`
      expect(index).toBe(indexExpected)

      // Check _keys.ts prefix key file
      const keys = fs.readFileSync(path.join(dir, 'hooks', '_keys.ts'), 'utf-8')
      const keysExpected = `export function getPetsKey() {
  return ['pets'] as const
}
`
      expect(keys).toBe(keysExpected)

      // Check GET hook file with args (getPets)
      const createGetPets = fs.readFileSync(path.join(dir, 'hooks', 'getPets.ts'), 'utf-8')
      const createGetPetsExpected = `import { createQuery, createInfiniteQuery, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getPetsQueryKey(args: InferRequestType<typeof client.pets.$get>) {
  return ['pets', '/pets', args] as const
}

export async function getPets(
  args: InferRequestType<typeof client.pets.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pets.$get(args, options))
}

export function getPetsQueryOptions(
  args: InferRequestType<typeof client.pets.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getPetsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPets(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createPets<TData = Awaited<ReturnType<typeof getPets>>, TError = Error>(
  args: () => InferRequestType<typeof client.pets.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPets>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPetsQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return getPets(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getPetsInfiniteQueryKey(args: InferRequestType<typeof client.pets.$get>) {
  return ['pets', '/pets', args, 'infinite'] as const
}

export function getPetsInfiniteQueryOptions(
  args: InferRequestType<typeof client.pets.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPetsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPets(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfinitePets<TError = Error>(
  args: () => InferRequestType<typeof client.pets.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<
      Awaited<ReturnType<typeof getPets>>,
      TError,
      Awaited<ReturnType<typeof getPets>>,
      ReturnType<typeof getPetsInfiniteQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getPetsInfiniteQueryOptions(args(), clientOptions) }
  })
}
`
      expect(createGetPets).toBe(createGetPetsExpected)

      // Check GET hook file with args (getPetsPetId)
      const createGetPetsPetId = fs.readFileSync(
        path.join(dir, 'hooks', 'getPetsPetId.ts'),
        'utf-8',
      )
      const createGetPetsPetIdExpected = `import { createQuery, createInfiniteQuery, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getPetsPetIdQueryKey(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
) {
  return ['pets', '/pets/:petId', args] as const
}

export async function getPetsPetId(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pets[':petId'].$get(args, options))
}

export function getPetsPetIdQueryOptions(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getPetsPetIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPetsPetId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createPetsPetId<TData = Awaited<ReturnType<typeof getPetsPetId>>, TError = Error>(
  args: () => InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPetsPetId>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPetsPetIdQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return getPetsPetId(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getPetsPetIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
) {
  return ['pets', '/pets/:petId', args, 'infinite'] as const
}

export function getPetsPetIdInfiniteQueryOptions(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPetsPetIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPetsPetId(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfinitePetsPetId<TError = Error>(
  args: () => InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<
      Awaited<ReturnType<typeof getPetsPetId>>,
      TError,
      Awaited<ReturnType<typeof getPetsPetId>>,
      ReturnType<typeof getPetsPetIdInfiniteQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getPetsPetIdInfiniteQueryOptions(args(), clientOptions) }
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

export async function postPets(
  args: InferRequestType<typeof client.pets.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pets.$post(args, options))
}

export function getPostPetsMutationOptions<TError = Error>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['pets', '/pets', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.pets.$post>) {
      return postPets(args, options)
    },
  }
}

export function createPostPets<TError = Error>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postPets>>,
      TError,
      InferRequestType<typeof client.pets.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostPetsMutationOptions<TError>(clientOptions), ...mutation }
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

export async function putPetsPetId(
  args: InferRequestType<(typeof client.pets)[':petId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pets[':petId'].$put(args, options))
}

export function getPutPetsPetIdMutationOptions<TError = Error>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['pets', '/pets/:petId', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.pets)[':petId']['$put']>) {
      return putPetsPetId(args, options)
    },
  }
}

export function createPutPetsPetId<TError = Error>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof putPetsPetId>>,
      TError,
      InferRequestType<(typeof client.pets)[':petId']['$put']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPutPetsPetIdMutationOptions<TError>(clientOptions), ...mutation }
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

export async function deletePetsPetId(
  args: InferRequestType<(typeof client.pets)[':petId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pets[':petId'].$delete(args, options))
}

export function getDeletePetsPetIdMutationOptions<TError = Error>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['pets', '/pets/:petId', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.pets)[':petId']['$delete']>) {
      return deletePetsPetId(args, options)
    },
  }
}

export function createDeletePetsPetId<TError = Error>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof deletePetsPetId>> | undefined,
      TError,
      InferRequestType<(typeof client.pets)[':petId']['$delete']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getDeletePetsPetIdMutationOptions<TError>(clientOptions), ...mutation }
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

      const result = await svelteQuery(openapiCustomClient, out, '../api', false, 'authClient')

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import { createQuery, createInfiniteQuery, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
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

export function createUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = Error>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getUsersQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getUsers({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
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

export function createInfiniteUsers<TError = Error>(
  options: () => {
    query: CreateInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsers>>,
      TError,
      Awaited<ReturnType<typeof getUsers>>,
      ReturnType<typeof getUsersInfiniteQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getUsersInfiniteQueryOptions(clientOptions) }
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
      const expected = `import {
  createQuery,
  createInfiniteQuery,
  createMutation,
  queryOptions,
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
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

export function createPing<TData = Awaited<ReturnType<typeof getPing>>, TError = Error>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPing>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPingQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getPing({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
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

export function createInfinitePing<TError = Error>(
  options: () => {
    query: CreateInfiniteQueryOptions<
      Awaited<ReturnType<typeof getPing>>,
      TError,
      Awaited<ReturnType<typeof getPing>>,
      ReturnType<typeof getPingInfiniteQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getPingInfiniteQueryOptions(clientOptions) }
  })
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

export function createPostPing<TError = Error>(
  options?: () => {
    mutation?: CreateMutationOptions<Awaited<ReturnType<typeof postPing>>, TError, void>
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostPingMutationOptions<TError>(clientOptions), ...mutation }
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
      const expected = `import { createQuery, createInfiniteQuery, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
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

export function createHonoX<TData = Awaited<ReturnType<typeof getHonoX>>, TError = Error>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getHonoX>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getHonoXQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getHonoX({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
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

export function createInfiniteHonoX<TError = Error>(
  options: () => {
    query: CreateInfiniteQueryOptions<
      Awaited<ReturnType<typeof getHonoX>>,
      TError,
      Awaited<ReturnType<typeof getHonoX>>,
      ReturnType<typeof getHonoXInfiniteQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getHonoXInfiniteQueryOptions(clientOptions) }
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
      const expected = `import {
  createQuery,
  createInfiniteQuery,
  createMutation,
  queryOptions,
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
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

export function createUsersId<TData = Awaited<ReturnType<typeof getUsersId>>, TError = Error>(
  args: () => InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsersId>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getUsersIdQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return getUsersId(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getUsersIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
) {
  return ['users', '/users/:id', args, 'infinite'] as const
}

export function getUsersIdInfiniteQueryOptions(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteUsersId<TError = Error>(
  args: () => InferRequestType<(typeof client.users)[':id']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsersId>>,
      TError,
      Awaited<ReturnType<typeof getUsersId>>,
      ReturnType<typeof getUsersIdInfiniteQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getUsersIdInfiniteQueryOptions(args(), clientOptions) }
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

export function createDeleteUsersId<TError = Error>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof deleteUsersId>> | undefined,
      TError,
      InferRequestType<(typeof client.users)[':id']['$delete']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getDeleteUsersIdMutationOptions<TError>(clientOptions), ...mutation }
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

describe('svelteQuery (split mode with full CRUD)', () => {
  it('should generate correct split files for full CRUD resource', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-crud-split-'))
    try {
      const out = path.join(dir, 'hooks', 'index.ts')
      const result = await svelteQuery(openapiCrud, out, '../client', true)

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

      // Check GET /users query file (no MaybeRefOrGetter/toValue for svelte)
      const getUsers = fs.readFileSync(path.join(dir, 'hooks', 'getUsers.ts'), 'utf-8')
      const getUsersExpected = `import { createQuery, createInfiniteQuery, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
} from '@tanstack/svelte-query'
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

export function createUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = Error>(
  args: () => InferRequestType<typeof client.users.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getUsersQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return getUsers(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getUsersInfiniteQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args, 'infinite'] as const
}

export function getUsersInfiniteQueryOptions(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteUsers<TError = Error>(
  args: () => InferRequestType<typeof client.users.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsers>>,
      TError,
      Awaited<ReturnType<typeof getUsers>>,
      ReturnType<typeof getUsersInfiniteQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getUsersInfiniteQueryOptions(args(), clientOptions) }
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

export function createPostUsers<TError = Error>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postUsers>>,
      TError,
      InferRequestType<typeof client.users.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostUsersMutationOptions<TError>(clientOptions), ...mutation }
  })
}
`
      expect(postUsers).toBe(postUsersExpected)

      // Check GET /users/{id} query file (path param with bracket notation)
      const getUsersId = fs.readFileSync(path.join(dir, 'hooks', 'getUsersId.ts'), 'utf-8')
      const getUsersIdExpected = `import { createQuery, createInfiniteQuery, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
} from '@tanstack/svelte-query'
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

export function createUsersId<TData = Awaited<ReturnType<typeof getUsersId>>, TError = Error>(
  args: () => InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsersId>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getUsersIdQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return getUsersId(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getUsersIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
) {
  return ['users', '/users/:id', args, 'infinite'] as const
}

export function getUsersIdInfiniteQueryOptions(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteUsersId<TError = Error>(
  args: () => InferRequestType<(typeof client.users)[':id']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsersId>>,
      TError,
      Awaited<ReturnType<typeof getUsersId>>,
      ReturnType<typeof getUsersIdInfiniteQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getUsersIdInfiniteQueryOptions(args(), clientOptions) }
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

export function createPutUsersId<TError = Error>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof putUsersId>>,
      TError,
      InferRequestType<(typeof client.users)[':id']['$put']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPutUsersIdMutationOptions<TError>(clientOptions), ...mutation }
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

export function createDeleteUsersId<TError = Error>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof deleteUsersId>> | undefined,
      TError,
      InferRequestType<(typeof client.users)[':id']['$delete']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getDeleteUsersIdMutationOptions<TError>(clientOptions), ...mutation }
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
