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
        summary: 'Create a pet',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object' } } },
        },
        responses: { '201': { description: 'Created' } },
      },
    },
    '/pets/{petId}': {
      get: {
        summary: 'Get a pet',
        parameters: [{ name: 'petId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK' } },
      },
      put: {
        summary: 'Update a pet',
        parameters: [{ name: 'petId', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object' } } },
        },
        responses: { '200': { description: 'OK' } },
      },
      delete: {
        summary: 'Delete a pet',
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
export function getGetPetsQueryKey(args: Parameters<typeof getPets>[0]) {
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
  args: Parameters<typeof getPets>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetPetsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPets(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /pets
 *
 * List pets
 */
export function createGetPets(
  args: Parameters<typeof getPets>[0],
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
export function getGetPetsInfiniteQueryKey(args: Parameters<typeof getPets>[0]) {
  return ['pets', 'GET', '/pets', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /pets
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetPetsInfiniteQueryOptions(
  args: Parameters<typeof getPets>[0],
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPetsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPets(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  }
}

/**
 * GET /pets
 *
 * List pets
 */
export function createInfiniteGetPets(
  args: Parameters<typeof getPets>[0],
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
 * Create a pet
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
export function getPostPetsMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostPetsMutationKey(),
    async mutationFn(args: Parameters<typeof postPets>[0]) {
      return postPets(args, clientOptions)
    },
  }
}

/**
 * POST /pets
 *
 * Create a pet
 */
export function createPostPets(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postPets>>,
      Error,
      Parameters<typeof postPets>[0]
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
export function getGetPetsPetIdQueryKey(args: Parameters<typeof getPetsPetId>[0]) {
  return ['pets', 'GET', '/pets/:petId', args] as const
}

/**
 * GET /pets/{petId}
 *
 * Get a pet
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
  args: Parameters<typeof getPetsPetId>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetPetsPetIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPetsPetId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /pets/{petId}
 *
 * Get a pet
 */
export function createGetPetsPetId(
  args: Parameters<typeof getPetsPetId>[0],
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
export function getGetPetsPetIdInfiniteQueryKey(args: Parameters<typeof getPetsPetId>[0]) {
  return ['pets', 'GET', '/pets/:petId', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /pets/{petId}
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetPetsPetIdInfiniteQueryOptions(
  args: Parameters<typeof getPetsPetId>[0],
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPetsPetIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPetsPetId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  }
}

/**
 * GET /pets/{petId}
 *
 * Get a pet
 */
export function createInfiniteGetPetsPetId(
  args: Parameters<typeof getPetsPetId>[0],
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
 * Update a pet
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
export function getPutPetsPetIdMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPutPetsPetIdMutationKey(),
    async mutationFn(args: Parameters<typeof putPetsPetId>[0]) {
      return putPetsPetId(args, clientOptions)
    },
  }
}

/**
 * PUT /pets/{petId}
 *
 * Update a pet
 */
export function createPutPetsPetId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof putPetsPetId>>,
      Error,
      Parameters<typeof putPetsPetId>[0]
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
 * Delete a pet
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
export function getDeletePetsPetIdMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getDeletePetsPetIdMutationKey(),
    async mutationFn(args: Parameters<typeof deletePetsPetId>[0]) {
      return deletePetsPetId(args, clientOptions)
    },
  }
}

/**
 * DELETE /pets/{petId}
 *
 * Delete a pet
 */
export function createDeletePetsPetId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof deletePetsPetId>> | undefined,
      Error,
      Parameters<typeof deletePetsPetId>[0]
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
export function getGetPetsQueryKey(args: Parameters<typeof getPets>[0]) {
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
  args: Parameters<typeof getPets>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetPetsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPets(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /pets
 *
 * List pets
 */
export function createGetPets(
  args: Parameters<typeof getPets>[0],
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
export function getGetPetsInfiniteQueryKey(args: Parameters<typeof getPets>[0]) {
  return ['pets', 'GET', '/pets', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /pets
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetPetsInfiniteQueryOptions(
  args: Parameters<typeof getPets>[0],
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPetsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPets(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  }
}

/**
 * GET /pets
 *
 * List pets
 */
export function createInfiniteGetPets(
  args: Parameters<typeof getPets>[0],
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
export function getGetPetsPetIdQueryKey(args: Parameters<typeof getPetsPetId>[0]) {
  return ['pets', 'GET', '/pets/:petId', args] as const
}

/**
 * GET /pets/{petId}
 *
 * Get a pet
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
  args: Parameters<typeof getPetsPetId>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetPetsPetIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPetsPetId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /pets/{petId}
 *
 * Get a pet
 */
export function createGetPetsPetId(
  args: Parameters<typeof getPetsPetId>[0],
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
export function getGetPetsPetIdInfiniteQueryKey(args: Parameters<typeof getPetsPetId>[0]) {
  return ['pets', 'GET', '/pets/:petId', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /pets/{petId}
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetPetsPetIdInfiniteQueryOptions(
  args: Parameters<typeof getPetsPetId>[0],
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPetsPetIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPetsPetId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  }
}

/**
 * GET /pets/{petId}
 *
 * Get a pet
 */
export function createInfiniteGetPetsPetId(
  args: Parameters<typeof getPetsPetId>[0],
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
 * Create a pet
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
export function getPostPetsMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostPetsMutationKey(),
    async mutationFn(args: Parameters<typeof postPets>[0]) {
      return postPets(args, clientOptions)
    },
  }
}

/**
 * POST /pets
 *
 * Create a pet
 */
export function createPostPets(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postPets>>,
      Error,
      Parameters<typeof postPets>[0]
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
 * Update a pet
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
export function getPutPetsPetIdMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPutPetsPetIdMutationKey(),
    async mutationFn(args: Parameters<typeof putPetsPetId>[0]) {
      return putPetsPetId(args, clientOptions)
    },
  }
}

/**
 * PUT /pets/{petId}
 *
 * Update a pet
 */
export function createPutPetsPetId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof putPetsPetId>>,
      Error,
      Parameters<typeof putPetsPetId>[0]
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
 * Delete a pet
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
export function getDeletePetsPetIdMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getDeletePetsPetIdMutationKey(),
    async mutationFn(args: Parameters<typeof deletePetsPetId>[0]) {
      return deletePetsPetId(args, clientOptions)
    },
  }
}

/**
 * DELETE /pets/{petId}
 *
 * Delete a pet
 */
export function createDeletePetsPetId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof deletePetsPetId>> | undefined,
      Error,
      Parameters<typeof deletePetsPetId>[0]
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

describe('svelteQuery (custom client name)', () => {
  it('should generate code with custom client name', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-svelte-query-client-'))
    try {
      const out = path.join(dir, 'index.ts')

      const result = await svelteQuery(openapiSimple, out, '../client', false, 'api')

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
import { api } from '../client'

/**
 * Generates Svelte Query cache key for GET /pets
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPetsQueryKey(args: Parameters<typeof getPets>[0]) {
  return ['pets', 'GET', '/pets', args] as const
}

/**
 * GET /pets
 *
 * List pets
 */
export async function getPets(
  args: InferRequestType<typeof api.pets.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(api.pets.$get(args, options))
}

/**
 * Returns Svelte Query query options for GET /pets
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPetsQueryOptions(
  args: Parameters<typeof getPets>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetPetsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPets(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /pets
 *
 * List pets
 */
export function createGetPets(
  args: Parameters<typeof getPets>[0],
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
export function getGetPetsInfiniteQueryKey(args: Parameters<typeof getPets>[0]) {
  return ['pets', 'GET', '/pets', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /pets
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetPetsInfiniteQueryOptions(
  args: Parameters<typeof getPets>[0],
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPetsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPets(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  }
}

/**
 * GET /pets
 *
 * List pets
 */
export function createInfiniteGetPets(
  args: Parameters<typeof getPets>[0],
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
 * Create a pet
 */
export async function postPets(
  args: InferRequestType<typeof api.pets.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(api.pets.$post(args, options))
}

/**
 * Returns Svelte Query mutation options for POST /pets
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostPetsMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostPetsMutationKey(),
    async mutationFn(args: Parameters<typeof postPets>[0]) {
      return postPets(args, clientOptions)
    },
  }
}

/**
 * POST /pets
 *
 * Create a pet
 */
export function createPostPets(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postPets>>,
      Error,
      Parameters<typeof postPets>[0]
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
export function getGetPetsPetIdQueryKey(args: Parameters<typeof getPetsPetId>[0]) {
  return ['pets', 'GET', '/pets/:petId', args] as const
}

/**
 * GET /pets/{petId}
 *
 * Get a pet
 */
export async function getPetsPetId(
  args: InferRequestType<(typeof api.pets)[':petId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(api.pets[':petId'].$get(args, options))
}

/**
 * Returns Svelte Query query options for GET /pets/{petId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPetsPetIdQueryOptions(
  args: Parameters<typeof getPetsPetId>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetPetsPetIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPetsPetId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /pets/{petId}
 *
 * Get a pet
 */
export function createGetPetsPetId(
  args: Parameters<typeof getPetsPetId>[0],
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
export function getGetPetsPetIdInfiniteQueryKey(args: Parameters<typeof getPetsPetId>[0]) {
  return ['pets', 'GET', '/pets/:petId', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /pets/{petId}
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetPetsPetIdInfiniteQueryOptions(
  args: Parameters<typeof getPetsPetId>[0],
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPetsPetIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPetsPetId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  }
}

/**
 * GET /pets/{petId}
 *
 * Get a pet
 */
export function createInfiniteGetPetsPetId(
  args: Parameters<typeof getPetsPetId>[0],
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
 * Update a pet
 */
export async function putPetsPetId(
  args: InferRequestType<(typeof api.pets)[':petId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(api.pets[':petId'].$put(args, options))
}

/**
 * Returns Svelte Query mutation options for PUT /pets/{petId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPutPetsPetIdMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPutPetsPetIdMutationKey(),
    async mutationFn(args: Parameters<typeof putPetsPetId>[0]) {
      return putPetsPetId(args, clientOptions)
    },
  }
}

/**
 * PUT /pets/{petId}
 *
 * Update a pet
 */
export function createPutPetsPetId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof putPetsPetId>>,
      Error,
      Parameters<typeof putPetsPetId>[0]
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
 * Delete a pet
 */
export async function deletePetsPetId(
  args: InferRequestType<(typeof api.pets)[':petId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(api.pets[':petId'].$delete(args, options))
}

/**
 * Returns Svelte Query mutation options for DELETE /pets/{petId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getDeletePetsPetIdMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getDeletePetsPetIdMutationKey(),
    async mutationFn(args: Parameters<typeof deletePetsPetId>[0]) {
      return deletePetsPetId(args, clientOptions)
    },
  }
}

/**
 * DELETE /pets/{petId}
 *
 * Delete a pet
 */
export function createDeletePetsPetId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof deletePetsPetId>> | undefined,
      Error,
      Parameters<typeof deletePetsPetId>[0]
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
    '/health': {
      get: {
        summary: 'Health check',
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
 * Generates Svelte Query cache key for GET /health
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetHealthQueryKey() {
  return ['health', 'GET', '/health'] as const
}

/**
 * GET /health
 *
 * Health check
 */
export async function getHealth(options?: ClientRequestOptions) {
  return await parseResponse(client.health.$get(undefined, options))
}

/**
 * Returns Svelte Query query options for GET /health
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetHealthQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetHealthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHealth({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /health
 *
 * Health check
 */
export function createGetHealth(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getHealth>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetHealthQueryOptions(opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /health
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetHealthInfiniteQueryKey() {
  return ['health', 'GET', '/health', 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /health
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetHealthInfiniteQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetHealthInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHealth({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  }
}

/**
 * GET /health
 *
 * Health check
 */
export function createInfiniteGetHealth(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getHealth>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const opts = options()
    return { ...getGetHealthInfiniteQueryOptions(opts?.client), ...opts.query }
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
          '/user-settings': {
            get: {
              summary: 'Get user settings',
              responses: { '200': { description: 'OK' } },
            },
            put: {
              summary: 'Update user settings',
              requestBody: {
                required: true,
                content: { 'application/json': { schema: { type: 'object' } } },
              },
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
 * Generates Svelte Query cache key for GET /user-settings
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetUserSettingsQueryKey() {
  return ['user-settings', 'GET', '/user-settings'] as const
}

/**
 * GET /user-settings
 *
 * Get user settings
 */
export async function getUserSettings(options?: ClientRequestOptions) {
  return await parseResponse(client['user-settings'].$get(undefined, options))
}

/**
 * Returns Svelte Query query options for GET /user-settings
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUserSettingsQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetUserSettingsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getUserSettings({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /user-settings
 *
 * Get user settings
 */
export function createGetUserSettings(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUserSettings>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetUserSettingsQueryOptions(opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /user-settings
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetUserSettingsInfiniteQueryKey() {
  return ['user-settings', 'GET', '/user-settings', 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /user-settings
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetUserSettingsInfiniteQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetUserSettingsInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getUserSettings({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  }
}

/**
 * GET /user-settings
 *
 * Get user settings
 */
export function createInfiniteGetUserSettings(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getUserSettings>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const opts = options()
    return { ...getGetUserSettingsInfiniteQueryOptions(opts?.client), ...opts.query }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /user-settings
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutUserSettingsMutationKey() {
  return ['user-settings', 'PUT', '/user-settings'] as const
}

/**
 * PUT /user-settings
 *
 * Update user settings
 */
export async function putUserSettings(
  args: InferRequestType<(typeof client)['user-settings']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['user-settings'].$put(args, options))
}

/**
 * Returns Svelte Query mutation options for PUT /user-settings
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPutUserSettingsMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPutUserSettingsMutationKey(),
    async mutationFn(args: Parameters<typeof putUserSettings>[0]) {
      return putUserSettings(args, clientOptions)
    },
  }
}

/**
 * PUT /user-settings
 *
 * Update user settings
 */
export function createPutUserSettings(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof putUserSettings>>,
      Error,
      Parameters<typeof putUserSettings>[0]
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getPutUserSettingsMutationOptions(opts?.client), ...opts?.mutation }
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
          '/users/{userId}/posts/{postId}': {
            get: {
              summary: 'Get user post',
              parameters: [
                { name: 'userId', in: 'path', required: true, schema: { type: 'string' } },
                { name: 'postId', in: 'path', required: true, schema: { type: 'string' } },
              ],
              responses: { '200': { description: 'OK' } },
            },
            put: {
              summary: 'Update user post',
              parameters: [
                { name: 'userId', in: 'path', required: true, schema: { type: 'string' } },
                { name: 'postId', in: 'path', required: true, schema: { type: 'string' } },
              ],
              requestBody: {
                required: true,
                content: { 'application/json': { schema: { type: 'object' } } },
              },
              responses: { '200': { description: 'OK' } },
            },
            delete: {
              summary: 'Delete user post',
              parameters: [
                { name: 'userId', in: 'path', required: true, schema: { type: 'string' } },
                { name: 'postId', in: 'path', required: true, schema: { type: 'string' } },
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
 * Generates Svelte Query cache key for GET /users/{userId}/posts/{postId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersUserIdPostsPostIdQueryKey(
  args: Parameters<typeof getUsersUserIdPostsPostId>[0],
) {
  return ['users', 'GET', '/users/:userId/posts/:postId', args] as const
}

/**
 * GET /users/{userId}/posts/{postId}
 *
 * Get user post
 */
export async function getUsersUserIdPostsPostId(
  args: InferRequestType<(typeof client.users)[':userId']['posts'][':postId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].posts[':postId'].$get(args, options))
}

/**
 * Returns Svelte Query query options for GET /users/{userId}/posts/{postId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersUserIdPostsPostIdQueryOptions(
  args: Parameters<typeof getUsersUserIdPostsPostId>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetUsersUserIdPostsPostIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersUserIdPostsPostId(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

/**
 * GET /users/{userId}/posts/{postId}
 *
 * Get user post
 */
export function createGetUsersUserIdPostsPostId(
  args: Parameters<typeof getUsersUserIdPostsPostId>[0],
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsersUserIdPostsPostId>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetUsersUserIdPostsPostIdQueryOptions(args, opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /users/{userId}/posts/{postId}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetUsersUserIdPostsPostIdInfiniteQueryKey(
  args: Parameters<typeof getUsersUserIdPostsPostId>[0],
) {
  return ['users', 'GET', '/users/:userId/posts/:postId', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /users/{userId}/posts/{postId}
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetUsersUserIdPostsPostIdInfiniteQueryOptions(
  args: Parameters<typeof getUsersUserIdPostsPostId>[0],
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersUserIdPostsPostIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersUserIdPostsPostId(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  }
}

/**
 * GET /users/{userId}/posts/{postId}
 *
 * Get user post
 */
export function createInfiniteGetUsersUserIdPostsPostId(
  args: Parameters<typeof getUsersUserIdPostsPostId>[0],
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersUserIdPostsPostId>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const opts = options()
    return {
      ...getGetUsersUserIdPostsPostIdInfiniteQueryOptions(args, opts?.client),
      ...opts.query,
    }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /users/{userId}/posts/{postId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutUsersUserIdPostsPostIdMutationKey() {
  return ['users', 'PUT', '/users/:userId/posts/:postId'] as const
}

/**
 * PUT /users/{userId}/posts/{postId}
 *
 * Update user post
 */
export async function putUsersUserIdPostsPostId(
  args: InferRequestType<(typeof client.users)[':userId']['posts'][':postId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].posts[':postId'].$put(args, options))
}

/**
 * Returns Svelte Query mutation options for PUT /users/{userId}/posts/{postId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPutUsersUserIdPostsPostIdMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPutUsersUserIdPostsPostIdMutationKey(),
    async mutationFn(args: Parameters<typeof putUsersUserIdPostsPostId>[0]) {
      return putUsersUserIdPostsPostId(args, clientOptions)
    },
  }
}

/**
 * PUT /users/{userId}/posts/{postId}
 *
 * Update user post
 */
export function createPutUsersUserIdPostsPostId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof putUsersUserIdPostsPostId>>,
      Error,
      Parameters<typeof putUsersUserIdPostsPostId>[0]
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getPutUsersUserIdPostsPostIdMutationOptions(opts?.client), ...opts?.mutation }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /users/{userId}/posts/{postId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteUsersUserIdPostsPostIdMutationKey() {
  return ['users', 'DELETE', '/users/:userId/posts/:postId'] as const
}

/**
 * DELETE /users/{userId}/posts/{postId}
 *
 * Delete user post
 */
export async function deleteUsersUserIdPostsPostId(
  args: InferRequestType<(typeof client.users)[':userId']['posts'][':postId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].posts[':postId'].$delete(args, options))
}

/**
 * Returns Svelte Query mutation options for DELETE /users/{userId}/posts/{postId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getDeleteUsersUserIdPostsPostIdMutationOptions(
  clientOptions?: ClientRequestOptions,
) {
  return {
    mutationKey: getDeleteUsersUserIdPostsPostIdMutationKey(),
    async mutationFn(args: Parameters<typeof deleteUsersUserIdPostsPostId>[0]) {
      return deleteUsersUserIdPostsPostId(args, clientOptions)
    },
  }
}

/**
 * DELETE /users/{userId}/posts/{postId}
 *
 * Delete user post
 */
export function createDeleteUsersUserIdPostsPostId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof deleteUsersUserIdPostsPostId>> | undefined,
      Error,
      Parameters<typeof deleteUsersUserIdPostsPostId>[0]
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getDeleteUsersUserIdPostsPostIdMutationOptions(opts?.client), ...opts?.mutation }
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
