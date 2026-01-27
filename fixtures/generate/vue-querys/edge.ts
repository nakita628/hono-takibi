import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/edge'

/**
 * POST /polymorphic
 *
 * Polymorphic object with discriminator
 */
export function usePostPolymorphic(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.polymorphic.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.polymorphic.$post>
      >,
      'mutationFn'
    >
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
 * Generates Vue Query cache key for GET /search
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetSearchQueryKey(args: MaybeRef<InferRequestType<typeof client.search.$get>>) {
  return ['search', '/search', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /search
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.search.$get>>>>>,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-step']['$put']>>>
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client)['multi-step']['$put']>
      >,
      'mutationFn'
    >
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
