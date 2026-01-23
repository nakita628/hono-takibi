import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/edge'

/**
 * POST /polymorphic
 *
 * Polymorphic object with discriminator
 */
export function usePostPolymorphic(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.polymorphic.$post> | undefined,
    Error,
    InferRequestType<typeof client.polymorphic.$post>
  >({ mutationFn: async (args) => parseResponse(client.polymorphic.$post(args, clientOptions)) })
}

/**
 * GET /search
 *
 * Search with complex query
 */
export function useGetSearch(
  args: InferRequestType<typeof client.search.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetSearchQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.search.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /search
 */
export function getGetSearchQueryKey(args: InferRequestType<typeof client.search.$get>) {
  return ['/search', args] as const
}

/**
 * PUT /multi-step
 *
 * Multi-step object definition using allOf
 */
export function usePutMultiStep(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['multi-step']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client)['multi-step']['$put']>
  >({ mutationFn: async (args) => parseResponse(client['multi-step'].$put(args, clientOptions)) })
}
