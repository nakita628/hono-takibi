import type { CreateMutationOptions, CreateQueryOptions, QueryClient } from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/edge'

/**
 * POST /polymorphic
 *
 * Polymorphic object with discriminator
 */
export function createPostPolymorphic(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.polymorphic.$post> | undefined,
      Error,
      InferRequestType<typeof client.polymorphic.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.polymorphic.$post> | undefined,
    Error,
    InferRequestType<typeof client.polymorphic.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.polymorphic.$post(args, options?.client)),
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
    query?: CreateQueryOptions<InferResponseType<typeof client.search.$get>, Error>
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
export function getGetSearchQueryKey(args?: InferRequestType<typeof client.search.$get>) {
  return ['/search', ...(args ? [args] : [])] as const
}

/**
 * PUT /multi-step
 *
 * Multi-step object definition using allOf
 */
export function createPutMultiStep(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client)['multi-step']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client)['multi-step']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client)['multi-step']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client)['multi-step']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client['multi-step'].$put(args, options?.client)),
    },
    queryClient,
  )
}
