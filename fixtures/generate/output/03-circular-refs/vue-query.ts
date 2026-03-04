import { useQuery, useInfiniteQuery, useMutation, queryOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Vue Query cache key for GET /tree
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
 * Returns Vue Query query options for GET /tree
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
export function useGetTree(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getTree>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetTreeQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /tree
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetTreeInfiniteQueryKey() {
  return ['tree', 'GET', '/tree', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /tree
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
export function useInfiniteGetTree(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getTree>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getGetTreeInfiniteQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query mutation key for POST /tree
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
 * Returns Vue Query mutation options for POST /tree
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
export function usePostTree(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTree>>,
    Error,
    InferRequestType<typeof client.tree.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostTreeMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * Generates Vue Query cache key for GET /graph
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
 * Returns Vue Query query options for GET /graph
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
export function useGetGraph(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getGraph>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetGraphQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /graph
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetGraphInfiniteQueryKey() {
  return ['graph', 'GET', '/graph', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /graph
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
export function useInfiniteGetGraph(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getGraph>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getGetGraphInfiniteQueryOptions(clientOptions), ...queryOptions })
}
