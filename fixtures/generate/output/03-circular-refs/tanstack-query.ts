import { useQuery, useMutation } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates TanStack Query cache key for GET /tree
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetTreeQueryKey() {
  return ['tree', 'GET', '/tree'] as const
}

/**
 * Returns TanStack Query query options for GET /tree
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTreeQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetTreeQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.tree.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /tree
 */
export function useGetTree(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.tree.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTreeQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /tree
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTreeMutationKey() {
  return ['tree', 'POST', '/tree'] as const
}

/**
 * Returns TanStack Query mutation options for POST /tree
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostTreeMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostTreeMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.tree.$post>) =>
    parseResponse(client.tree.$post(args, clientOptions)),
})

/**
 * POST /tree
 */
export function usePostTree(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.tree.$post>>>>>,
    Error,
    InferRequestType<typeof client.tree.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostTreeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query cache key for GET /graph
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetGraphQueryKey() {
  return ['graph', 'GET', '/graph'] as const
}

/**
 * Returns TanStack Query query options for GET /graph
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGraphQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetGraphQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.graph.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /graph
 */
export function useGetGraph(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.graph.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGraphQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
