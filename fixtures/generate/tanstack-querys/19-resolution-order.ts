import { useQuery, useMutation } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/19-resolution-order'

/**
 * Generates TanStack Query cache key for GET /entities
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetEntitiesQueryKey() {
  return ['entities', '/entities'] as const
}

/**
 * Returns TanStack Query query options for GET /entities
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEntitiesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetEntitiesQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.entities.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /entities
 */
export function useGetEntities(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.entities.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetEntitiesQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /process
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostProcessMutationKey() {
  return ['POST', '/process'] as const
}

/**
 * Returns TanStack Query mutation options for POST /process
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostProcessMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostProcessMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.process.$post>) =>
    parseResponse(client.process.$post(args, clientOptions)),
})

/**
 * POST /process
 */
export function usePostProcess(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.process.$post>>>>>,
    Error,
    InferRequestType<typeof client.process.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.process.$post>) =>
      parseResponse(client.process.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /graph
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetGraphQueryKey() {
  return ['graph', '/graph'] as const
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

/**
 * Generates TanStack Query mutation key for POST /transform
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostTransformMutationKey() {
  return ['POST', '/transform'] as const
}

/**
 * Returns TanStack Query mutation options for POST /transform
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostTransformMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostTransformMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.transform.$post>) =>
    parseResponse(client.transform.$post(args, clientOptions)),
})

/**
 * POST /transform
 */
export function usePostTransform(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.transform.$post>>>>>,
    Error,
    InferRequestType<typeof client.transform.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.transform.$post>) =>
      parseResponse(client.transform.$post(args, clientOptions)),
  })
}
