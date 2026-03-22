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
 * Key prefix for /health
 */
export function getHealthKey() {
  return ['health'] as const
}

/**
 * GET /health query key
 */
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
export function createHealth(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getHealth>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getHealthQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /health infinite query key
 */
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
export function createInfiniteHealth(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getHealth>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getHealthInfiniteQueryOptions(clientOptions), ...query }
  })
}
