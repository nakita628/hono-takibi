import { createQuery, createInfiniteQuery, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Svelte Query cache key for GET /health
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetHealthQueryKey() {
  return ['health', 'GET', '/health'] as const
}

/**
 * GET /health
 */
export async function getHealth(options?: ClientRequestOptions) {
  return await parseResponse(client.health.$get(undefined, options))
}

/**
 * Returns Svelte Query query options for GET /health
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetHealthQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetHealthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHealth({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /health
 */
export function createGetHealth(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getHealth>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetHealthQueryOptions(clientOptions), ...query }
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
export function getGetHealthInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetHealthInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHealth({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /health
 */
export function createInfiniteGetHealth(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getHealth>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetHealthInfiniteQueryOptions(clientOptions), ...query }
  })
}
