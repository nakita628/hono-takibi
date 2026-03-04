import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  queryOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates TanStack Query cache key for GET /health
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
 * Returns TanStack Query query options for GET /health
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
export function useGetHealth(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getHealth>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetHealthQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /health
 */
export function useSuspenseGetHealth(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getHealth>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getGetHealthQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query infinite query cache key for GET /health
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetHealthInfiniteQueryKey() {
  return ['health', 'GET', '/health', 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /health
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
export function useInfiniteGetHealth(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getHealth>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getGetHealthInfiniteQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /health
 */
export function useSuspenseInfiniteGetHealth(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getHealth>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getGetHealthInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}
