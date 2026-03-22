import { useQuery, useInfiniteQuery, queryOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/** Key prefix for /health */
export function getHealthKey() {
  return ['health'] as const
}

/** GET /health query key */
export function getHealthQueryKey() {
  return ['health', '/health'] as const
}

/**
 * GET /health
 */
export async function getHealth(options?: ClientRequestOptions) {
  return await parseResponse(client.health.$get(undefined, options))
}

/**
 * GET /health query options
 */
export function getHealthQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getHealthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHealth({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /health
 */
export function useHealth(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getHealth>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getHealthQueryOptions(clientOptions), ...queryOptions })
}

/** GET /health infinite query key */
export function getHealthInfiniteQueryKey() {
  return ['health', '/health', 'infinite'] as const
}

/**
 * GET /health infinite query options
 */
export function getHealthInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getHealthInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHealth({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /health
 */
export function useInfiniteHealth(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getHealth>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getHealthInfiniteQueryOptions(clientOptions), ...queryOptions })
}
