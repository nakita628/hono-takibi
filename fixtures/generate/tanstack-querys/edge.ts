import { useQuery, useMutation } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/edge'

/**
 * POST /polymorphic
 *
 * Polymorphic object with discriminator
 */
export function usePostPolymorphic(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.polymorphic.$post>>>>>,
    Error,
    InferRequestType<typeof client.polymorphic.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.polymorphic.$post>) =>
      parseResponse(client.polymorphic.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /search
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetSearchQueryKey(args: InferRequestType<typeof client.search.$get>) {
  return ['search', '/search', args] as const
}

/**
 * Returns TanStack Query query options for GET /search
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchQueryOptions = (
  args: InferRequestType<typeof client.search.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSearchQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.search.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /search
 *
 * Search with complex query
 */
export function useGetSearch(
  args: InferRequestType<typeof client.search.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.search.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSearchQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /multi-step
 *
 * Multi-step object definition using allOf
 */
export function usePutMultiStep(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-step']['$put']>>>>
      >
    | undefined,
    Error,
    InferRequestType<(typeof client)['multi-step']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['multi-step']['$put']>) =>
      parseResponse(client['multi-step'].$put(args, clientOptions)),
  })
}
