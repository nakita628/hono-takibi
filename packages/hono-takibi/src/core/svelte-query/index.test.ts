import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
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

/**
 * Generates Svelte Query cache key for GET /pets
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPetsQueryKey(args: InferRequestType<typeof client.pets.$get>) {
  return ['pets', 'GET', '/pets', args] as const
}

/**
 * GET /pets
 *
 * List pets
 */
export async function getPets(
  args: InferRequestType<typeof client.pets.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pets.$get(args, options))
}

/**
 * Returns Svelte Query query options for GET /pets
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPetsQueryOptions(
  args: InferRequestType<typeof client.pets.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetPetsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPets(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /pets
 *
 * List pets
 */
export function createGetPets(
  args: InferRequestType<typeof client.pets.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPets>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetPetsQueryOptions(args, opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /pets
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetPetsInfiniteQueryKey(args: InferRequestType<typeof client.pets.$get>) {
  return ['pets', 'GET', '/pets', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /pets
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetPetsInfiniteQueryOptions(
  args: InferRequestType<typeof client.pets.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPetsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPets(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /pets
 *
 * List pets
 */
export function createInfiniteGetPets(
  args: InferRequestType<typeof client.pets.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getPets>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const opts = options()
    return { ...getGetPetsInfiniteQueryOptions(args, opts?.client), ...opts.query }
  })
}

/**
 * Generates Svelte Query mutation key for POST /pets
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPetsMutationKey() {
  return ['pets', 'POST', '/pets'] as const
}

/**
 * POST /pets
 *
 * Create pet
 */
export async function postPets(
  args: InferRequestType<typeof client.pets.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pets.$post(args, options))
}

/**
 * Returns Svelte Query mutation options for POST /pets
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostPetsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostPetsMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.pets.$post>) {
      return postPets(args, options)
    },
  }
}

/**
 * POST /pets
 *
 * Create pet
 */
export function createPostPets(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postPets>>,
      Error,
      InferRequestType<typeof client.pets.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getPostPetsMutationOptions(opts?.client), ...opts?.mutation }
  })
}

/**
 * Generates Svelte Query cache key for GET /pets/{petId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPetsPetIdQueryKey(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
) {
  return ['pets', 'GET', '/pets/:petId', args] as const
}

/**
 * GET /pets/{petId}
 *
 * Get pet
 */
export async function getPetsPetId(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pets[':petId'].$get(args, options))
}

/**
 * Returns Svelte Query query options for GET /pets/{petId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPetsPetIdQueryOptions(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetPetsPetIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPetsPetId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /pets/{petId}
 *
 * Get pet
 */
export function createGetPetsPetId(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPetsPetId>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetPetsPetIdQueryOptions(args, opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /pets/{petId}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetPetsPetIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
) {
  return ['pets', 'GET', '/pets/:petId', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /pets/{petId}
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetPetsPetIdInfiniteQueryOptions(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPetsPetIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPetsPetId(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /pets/{petId}
 *
 * Get pet
 */
export function createInfiniteGetPetsPetId(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getPetsPetId>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const opts = options()
    return { ...getGetPetsPetIdInfiniteQueryOptions(args, opts?.client), ...opts.query }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /pets/{petId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutPetsPetIdMutationKey() {
  return ['pets', 'PUT', '/pets/:petId'] as const
}

/**
 * PUT /pets/{petId}
 *
 * Update pet
 */
export async function putPetsPetId(
  args: InferRequestType<(typeof client.pets)[':petId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pets[':petId'].$put(args, options))
}

/**
 * Returns Svelte Query mutation options for PUT /pets/{petId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPutPetsPetIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPutPetsPetIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.pets)[':petId']['$put']>) {
      return putPetsPetId(args, options)
    },
  }
}

/**
 * PUT /pets/{petId}
 *
 * Update pet
 */
export function createPutPetsPetId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof putPetsPetId>>,
      Error,
      InferRequestType<(typeof client.pets)[':petId']['$put']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getPutPetsPetIdMutationOptions(opts?.client), ...opts?.mutation }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /pets/{petId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeletePetsPetIdMutationKey() {
  return ['pets', 'DELETE', '/pets/:petId'] as const
}

/**
 * DELETE /pets/{petId}
 *
 * Delete pet
 */
export async function deletePetsPetId(
  args: InferRequestType<(typeof client.pets)[':petId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pets[':petId'].$delete(args, options))
}

/**
 * Returns Svelte Query mutation options for DELETE /pets/{petId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getDeletePetsPetIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getDeletePetsPetIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.pets)[':petId']['$delete']>) {
      return deletePetsPetId(args, options)
    },
  }
}

/**
 * DELETE /pets/{petId}
 *
 * Delete pet
 */
export function createDeletePetsPetId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof deletePetsPetId>> | undefined,
      Error,
      InferRequestType<(typeof client.pets)[':petId']['$delete']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getDeletePetsPetIdMutationOptions(opts?.client), ...opts?.mutation }
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
      const indexExpected = `export * from './getPets'
export * from './postPets'
export * from './getPetsPetId'
export * from './putPetsPetId'
export * from './deletePetsPetId'
`
      expect(index).toBe(indexExpected)

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

/**
 * Generates Svelte Query cache key for GET /pets
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPetsQueryKey(args: InferRequestType<typeof client.pets.$get>) {
  return ['pets', 'GET', '/pets', args] as const
}

/**
 * GET /pets
 *
 * List pets
 */
export async function getPets(
  args: InferRequestType<typeof client.pets.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pets.$get(args, options))
}

/**
 * Returns Svelte Query query options for GET /pets
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPetsQueryOptions(
  args: InferRequestType<typeof client.pets.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetPetsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPets(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /pets
 *
 * List pets
 */
export function createGetPets(
  args: InferRequestType<typeof client.pets.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPets>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetPetsQueryOptions(args, opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /pets
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetPetsInfiniteQueryKey(args: InferRequestType<typeof client.pets.$get>) {
  return ['pets', 'GET', '/pets', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /pets
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetPetsInfiniteQueryOptions(
  args: InferRequestType<typeof client.pets.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPetsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPets(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /pets
 *
 * List pets
 */
export function createInfiniteGetPets(
  args: InferRequestType<typeof client.pets.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getPets>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const opts = options()
    return { ...getGetPetsInfiniteQueryOptions(args, opts?.client), ...opts.query }
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

/**
 * Generates Svelte Query cache key for GET /pets/{petId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPetsPetIdQueryKey(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
) {
  return ['pets', 'GET', '/pets/:petId', args] as const
}

/**
 * GET /pets/{petId}
 *
 * Get pet
 */
export async function getPetsPetId(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pets[':petId'].$get(args, options))
}

/**
 * Returns Svelte Query query options for GET /pets/{petId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPetsPetIdQueryOptions(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetPetsPetIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPetsPetId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /pets/{petId}
 *
 * Get pet
 */
export function createGetPetsPetId(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPetsPetId>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetPetsPetIdQueryOptions(args, opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /pets/{petId}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetPetsPetIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
) {
  return ['pets', 'GET', '/pets/:petId', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /pets/{petId}
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetPetsPetIdInfiniteQueryOptions(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPetsPetIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPetsPetId(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /pets/{petId}
 *
 * Get pet
 */
export function createInfiniteGetPetsPetId(
  args: InferRequestType<(typeof client.pets)[':petId']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getPetsPetId>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const opts = options()
    return { ...getGetPetsPetIdInfiniteQueryOptions(args, opts?.client), ...opts.query }
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

/**
 * Generates Svelte Query mutation key for POST /pets
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPetsMutationKey() {
  return ['pets', 'POST', '/pets'] as const
}

/**
 * POST /pets
 *
 * Create pet
 */
export async function postPets(
  args: InferRequestType<typeof client.pets.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pets.$post(args, options))
}

/**
 * Returns Svelte Query mutation options for POST /pets
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostPetsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostPetsMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.pets.$post>) {
      return postPets(args, options)
    },
  }
}

/**
 * POST /pets
 *
 * Create pet
 */
export function createPostPets(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postPets>>,
      Error,
      InferRequestType<typeof client.pets.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getPostPetsMutationOptions(opts?.client), ...opts?.mutation }
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

/**
 * Generates Svelte Query mutation key for PUT /pets/{petId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutPetsPetIdMutationKey() {
  return ['pets', 'PUT', '/pets/:petId'] as const
}

/**
 * PUT /pets/{petId}
 *
 * Update pet
 */
export async function putPetsPetId(
  args: InferRequestType<(typeof client.pets)[':petId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pets[':petId'].$put(args, options))
}

/**
 * Returns Svelte Query mutation options for PUT /pets/{petId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPutPetsPetIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPutPetsPetIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.pets)[':petId']['$put']>) {
      return putPetsPetId(args, options)
    },
  }
}

/**
 * PUT /pets/{petId}
 *
 * Update pet
 */
export function createPutPetsPetId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof putPetsPetId>>,
      Error,
      InferRequestType<(typeof client.pets)[':petId']['$put']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getPutPetsPetIdMutationOptions(opts?.client), ...opts?.mutation }
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

/**
 * Generates Svelte Query mutation key for DELETE /pets/{petId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeletePetsPetIdMutationKey() {
  return ['pets', 'DELETE', '/pets/:petId'] as const
}

/**
 * DELETE /pets/{petId}
 *
 * Delete pet
 */
export async function deletePetsPetId(
  args: InferRequestType<(typeof client.pets)[':petId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pets[':petId'].$delete(args, options))
}

/**
 * Returns Svelte Query mutation options for DELETE /pets/{petId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getDeletePetsPetIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getDeletePetsPetIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.pets)[':petId']['$delete']>) {
      return deletePetsPetId(args, options)
    },
  }
}

/**
 * DELETE /pets/{petId}
 *
 * Delete pet
 */
export function createDeletePetsPetId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof deletePetsPetId>> | undefined,
      Error,
      InferRequestType<(typeof client.pets)[':petId']['$delete']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getDeletePetsPetIdMutationOptions(opts?.client), ...opts?.mutation }
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

/**
 * Generates Svelte Query cache key for GET /users
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
 * Returns Svelte Query query options for GET /users
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
export function createGetUsers(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetUsersQueryOptions(opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetUsersInfiniteQueryKey() {
  return ['users', 'GET', '/users', 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /users
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
export function createInfiniteGetUsers(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const opts = options()
    return { ...getGetUsersInfiniteQueryOptions(opts?.client), ...opts.query }
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

/**
 * Generates Svelte Query cache key for GET /ping
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
 * Returns Svelte Query query options for GET /ping
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
export function createGetPing(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPing>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetPingQueryOptions(opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /ping
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetPingInfiniteQueryKey() {
  return ['ping', 'GET', '/ping', 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /ping
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
export function createInfiniteGetPing(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getPing>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const opts = options()
    return { ...getGetPingInfiniteQueryOptions(opts?.client), ...opts.query }
  })
}

/**
 * Generates Svelte Query mutation key for POST /ping
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
 * Returns Svelte Query mutation options for POST /ping
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
export function createPostPing(
  options?: () => {
    mutation?: CreateMutationOptions<Awaited<ReturnType<typeof postPing>>, Error, void>
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getPostPingMutationOptions(opts?.client), ...opts?.mutation }
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

/**
 * Generates Svelte Query cache key for GET /hono-x
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
 * Returns Svelte Query query options for GET /hono-x
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
export function createGetHonoX(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getHonoX>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetHonoXQueryOptions(opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /hono-x
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetHonoXInfiniteQueryKey() {
  return ['hono-x', 'GET', '/hono-x', 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /hono-x
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
export function createInfiniteGetHonoX(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getHonoX>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const opts = options()
    return { ...getGetHonoXInfiniteQueryOptions(opts?.client), ...opts.query }
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

/**
 * Generates Svelte Query cache key for GET /users/{id}
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
 * Returns Svelte Query query options for GET /users/{id}
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
export function createGetUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsersId>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetUsersIdQueryOptions(args, opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /users/{id}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetUsersIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
) {
  return ['users', 'GET', '/users/:id', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /users/{id}
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
export function createInfiniteGetUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersId>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const opts = options()
    return { ...getGetUsersIdInfiniteQueryOptions(args, opts?.client), ...opts.query }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /users/{id}
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
 * Returns Svelte Query mutation options for DELETE /users/{id}
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
export function createDeleteUsersId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof deleteUsersId>> | undefined,
      Error,
      InferRequestType<(typeof client.users)[':id']['$delete']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getDeleteUsersIdMutationOptions(opts?.client), ...opts?.mutation }
  })
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
      const invalidOpenAPI: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        // paths is undefined
      }

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
