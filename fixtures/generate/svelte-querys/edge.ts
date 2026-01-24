import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/edge'

/**
 * POST /polymorphic
 *
 * Polymorphic object with discriminator
 */
export function createPostPolymorphic(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.polymorphic.$post>) =>
        parseResponse(client.polymorphic.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /search
 *
 * Search with complex query
 */
export function createGetSearch(
  args: InferRequestType<typeof client.search.$get>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.search.$get>,
      Error,
      InferResponseType<typeof client.search.$get>,
      readonly ['/search', InferRequestType<typeof client.search.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSearchQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.search.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /search
 */
export function getGetSearchQueryKey(args: InferRequestType<typeof client.search.$get>) {
  return ['/search', args] as const
}

/**
 * PUT /multi-step
 *
 * Multi-step object definition using allOf
 */
export function createPutMultiStep(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client)['multi-step']['$put']>) =>
        parseResponse(client['multi-step'].$put(args, options?.client)),
    },
    queryClient,
  )
}
