import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/21-extreme-status-content'

/**
 * GET /extreme-responses
 */
export function createGetExtremeResponses(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['extreme-responses']['$get']>,
      Error,
      InferResponseType<(typeof client)['extreme-responses']['$get']>,
      readonly ['/extreme-responses']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetExtremeResponsesQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client['extreme-responses'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /extreme-responses
 */
export function getGetExtremeResponsesQueryKey() {
  return ['/extreme-responses'] as const
}

/**
 * POST /multipart-variations
 */
export function createPostMultipartVariations(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client)['multipart-variations']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['multipart-variations']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client)['multipart-variations']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['multipart-variations']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['multipart-variations'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /charset-variations
 */
export function createPostCharsetVariations(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client)['charset-variations']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['charset-variations']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client)['charset-variations']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['charset-variations']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['charset-variations'].$post(args, options?.client)),
    },
    queryClient,
  )
}
