import {
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
import { client } from './client'

/**
 * Generates Svelte Query cache key for GET /tree
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetTreeQueryKey() {
  return ['tree', 'GET', '/tree'] as const
}

/**
 * GET /tree
 */
export async function getTree(options?: ClientRequestOptions) {
  return await parseResponse(client.tree.$get(undefined, options))
}

/**
 * Returns Svelte Query query options for GET /tree
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetTreeQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetTreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTree({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /tree
 */
export function createGetTree(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getTree>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetTreeQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /tree
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetTreeInfiniteQueryKey() {
  return ['tree', 'GET', '/tree', 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /tree
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetTreeInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetTreeInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTree({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /tree
 */
export function createInfiniteGetTree(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getTree>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetTreeInfiniteQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query mutation key for POST /tree
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTreeMutationKey() {
  return ['tree', 'POST', '/tree'] as const
}

/**
 * POST /tree
 */
export async function postTree(
  args: InferRequestType<typeof client.tree.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.tree.$post(args, options))
}

/**
 * Returns Svelte Query mutation options for POST /tree
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostTreeMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostTreeMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.tree.$post>) {
      return postTree(args, options)
    },
  }
}

/**
 * POST /tree
 */
export function createPostTree(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postTree>>,
      Error,
      InferRequestType<typeof client.tree.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostTreeMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * Generates Svelte Query cache key for GET /graph
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetGraphQueryKey() {
  return ['graph', 'GET', '/graph'] as const
}

/**
 * GET /graph
 */
export async function getGraph(options?: ClientRequestOptions) {
  return await parseResponse(client.graph.$get(undefined, options))
}

/**
 * Returns Svelte Query query options for GET /graph
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGraphQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetGraphQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getGraph({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /graph
 */
export function createGetGraph(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getGraph>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetGraphQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /graph
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetGraphInfiniteQueryKey() {
  return ['graph', 'GET', '/graph', 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /graph
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetGraphInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetGraphInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getGraph({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /graph
 */
export function createInfiniteGetGraph(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getGraph>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetGraphInfiniteQueryOptions(clientOptions), ...query }
  })
}
